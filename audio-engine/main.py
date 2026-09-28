"""MusicLuv audio-engine — FastAPI.

Endpoints
---------
GET  /health       — report which backends are live
POST /grade        — multipart: audio + meta JSON (target + rubric). Returns GradeResult.
POST /transcribe   — multipart: audio + instrument_id + level. Returns step timeline.
POST /render       — JSON notes[] → deterministic reference WAV.

The heavy endpoints are plain `def` so FastAPI runs them in its threadpool;
as `async def` they ran pYIN on the event loop and serialized every request.
"""
from __future__ import annotations

import io
import os
from contextlib import asynccontextmanager
from typing import Any, Literal

import numpy as np
import soundfile as sf
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError

from pipelines import pitch, onsets, dtw, scoring, simplify as simplify_mod, polyphonic, stems, synth

MAX_UPLOAD_BYTES = int(float(os.getenv("AUDIO_ENGINE_MAX_UPLOAD_MB", "20")) * 1024 * 1024)
MAX_AUDIO_SECONDS = float(os.getenv("AUDIO_ENGINE_MAX_SECONDS", "180"))
ENGINE_SR = 22050


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # pYIN's Viterbi is numba-compiled on first use (several seconds). Pay that
    # at boot instead of on some learner's first graded take.
    if os.getenv("AUDIO_ENGINE_WARMUP", "1") != "0":
        tone = synth.render_notes([{"pitch": "A4", "startMs": 0, "durationMs": 400}], sr=ENGINE_SR)
        pitch.extract_pitch(tone, ENGINE_SR)
    yield


app = FastAPI(title="MusicLuv audio-engine", version="0.2.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("AUDIO_ENGINE_CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- Request / response models ----

class TargetNote(BaseModel):
    pitch: str
    startMs: int
    durationMs: int


class RubricIn(BaseModel):
    id: str = "rubric_early_level"
    weights: dict[str, float] = Field(
        default_factory=lambda: {
            "pitch": 0.40, "rhythm": 0.30, "tone": 0.15,
            "dynamics": 0.10, "consistency": 0.05,
        }
    )
    passThreshold: float = 0.75
    pitchToleranceCents: float = 40.0
    rhythmToleranceMs: float = 120.0
    tuningMode: Literal["absolute", "relative"] = "absolute"
    feedbackBank: dict[str, Any] | None = None


class GradeMeta(BaseModel):
    exerciseId: str
    userId: str | None = None
    attemptId: str | None = None
    lessonId: str | None = None
    instrumentId: str | None = None
    # "notes": pitched events (pitch + timing). "onsets": timing only — claps,
    # drums, tabla, anything without a stable pitch.
    mode: Literal["notes", "onsets"] = "notes"
    target: list[TargetNote] = Field(default_factory=list)
    targetOnsets: list[int] | None = None
    # Take tempo the client asked for (0.5 = half speed). Target times are
    # expected to be already scaled by the client; this is echoed back.
    tempoFactor: float = 1.0
    rubric: RubricIn = Field(default_factory=RubricIn)


# ---- Helpers ----

def _read_audio(upload: UploadFile, target_sr: int = ENGINE_SR) -> tuple[np.ndarray, int]:
    raw = upload.file.read(MAX_UPLOAD_BYTES + 1)
    if len(raw) > MAX_UPLOAD_BYTES:
        raise HTTPException(413, f"audio_too_large: limit is {MAX_UPLOAD_BYTES // (1024 * 1024)} MB")
    try:
        data, sr = sf.read(io.BytesIO(raw), always_2d=False)
    except Exception as e:  # libsndfile can't decode (e.g. WebM/Opus, AAC)
        raise HTTPException(415, f"unsupported_audio: send WAV/FLAC/OGG ({e})")
    if data.ndim > 1:
        data = data.mean(axis=1)
    if len(data) / float(sr) > MAX_AUDIO_SECONDS:
        raise HTTPException(413, f"audio_too_long: limit is {int(MAX_AUDIO_SECONDS)} s")
    data = data.astype(np.float32)
    if sr != target_sr:
        import librosa
        data = librosa.resample(y=data, orig_sr=sr, target_sr=target_sr)
        sr = target_sr
    return data, sr


def _validate_pitches(names: list[str]) -> None:
    for name in names:
        try:
            pitch.parse_note(name)
        except ValueError:
            raise HTTPException(422, f"unknown_pitch: {name!r}")


# ---- Endpoints ----

@app.get("/health")
def health() -> dict:
    return {
        "ok": True,
        "service": "musicluv-audio-engine",
        "version": app.version,
        "backends": {
            "pitch":       os.getenv("PITCH_BACKEND", "pyin"),
            "polyphonic":  os.getenv("POLYPHONIC_BACKEND", "none"),
            "stems":       os.getenv("STEMS_BACKEND", "none"),
        },
        "limits": {"maxUploadMb": MAX_UPLOAD_BYTES // (1024 * 1024), "maxSeconds": MAX_AUDIO_SECONDS},
    }


@app.post("/grade")
def grade(
    audio: UploadFile = File(...),
    meta: str = Form(...),
) -> dict:
    """Grade one exercise attempt.

    `meta` is a JSON string of GradeMeta (sent as a form field so the whole
    request stays multipart and the client doesn't need to touch base64).
    """
    try:
        meta_obj = GradeMeta.model_validate_json(meta)
    except ValidationError as e:
        raise HTTPException(400, f"bad meta: {e}")

    target = [t.model_dump() for t in meta_obj.target]
    if meta_obj.mode == "notes":
        if not target:
            raise HTTPException(422, "empty_target")
        _validate_pitches([t["pitch"] for t in target])
    else:
        onset_ms = meta_obj.targetOnsets or [t["startMs"] for t in target]
        if not onset_ms:
            raise HTTPException(422, "empty_target")
        target = [{"startMs": int(ms)} for ms in sorted(onset_ms)]

    y, sr = _read_audio(audio)
    if len(y) < sr * 0.2:
        raise HTTPException(400, "audio too short (<200ms)")

    rub = meta_obj.rubric
    if meta_obj.mode == "notes":
        fmin, fmax = pitch.search_range_for([t["pitch"] for t in target])
        track = pitch.extract_pitch(y, sr, fmin=fmin, fmax=fmax)
        onset_track = onsets.detect_onsets(y, sr, backtrack=False)
        user_events = pitch.segment_notes(
            track,
            min_note_s=0.08,
            onset_times_s=[ms / 1000.0 for ms in onset_track.onset_ms],
            rms=onset_track.rms,
            rms_times_s=onset_track.rms_times_s,
        )
    else:
        onset_track = onsets.detect_onsets(y, sr, backtrack=False)
        user_events = [{"startMs": ms} for ms in onset_track.onset_ms]

    alignment = dtw.align(
        target, user_events,
        pitch_tolerance_cents=rub.pitchToleranceCents,
        rhythm_tolerance_ms=rub.rhythmToleranceMs,
        mode=meta_obj.mode,
        tuning_mode=rub.tuningMode,
    )

    result = scoring.score(
        target=target,
        user=user_events,
        alignment=alignment,
        rubric=scoring.Rubric(
            id=rub.id,
            weights=rub.weights,
            pass_threshold=rub.passThreshold,
            pitch_tolerance_cents=rub.pitchToleranceCents,
            rhythm_tolerance_ms=rub.rhythmToleranceMs,
            tuning_mode=rub.tuningMode,
        ),
        mode=meta_obj.mode,
    )

    fb = scoring.build_feedback(result, rub.feedbackBank)
    result["feedback"] = {"canned": fb["canned"]}
    result["attemptId"] = meta_obj.attemptId
    result["mode"] = meta_obj.mode
    result["tempoFactor"] = meta_obj.tempoFactor
    if meta_obj.mode == "notes":
        result["userNotesDetected"] = user_events[:200]
    else:
        result["userOnsetsMs"] = [e["startMs"] for e in user_events[:400]]
    if not user_events:
        result["warning"] = "no_notes_detected"
    return result


class TranscribeOut(BaseModel):
    steps: list[dict]
    confidence: float
    confidenceTier: str            # "high" | "medium" | "low"
    warning: str | None = None


@app.post("/transcribe", response_model=TranscribeOut)
def transcribe(
    audio: UploadFile = File(...),
    instrument_id: str = Form(...),
    level: int = Form(2),
) -> TranscribeOut:
    """URL/file → step timeline. Uses stem separation + polyphonic transcription if available."""
    y, sr = _read_audio(audio)
    target_stem = stems.STEM_FOR_INSTRUMENT.get(instrument_id, "other")
    isolated = stems.separate(y, sr, target_stem)

    notes = polyphonic.transcribe(isolated, sr)
    conf = polyphonic.confidence_summary(notes)
    tier = polyphonic.confidence_tier(conf)

    simplified = simplify_mod.simplify(notes, level=level)
    steps = simplify_mod.render_steps(simplified)

    # Tiered UX: high → no warning, medium → soft hint, low → strong warning.
    warning: str | None = None
    if tier == "low":
        warning = (
            "Auto-transcription confidence is low. The recording may be "
            "noisy, polyphonic, or in a stem we can't isolate cleanly — "
            "try a clean monophonic clip, or tap any step to correct."
        )
    elif tier == "medium":
        warning = (
            "Some notes were uncertain. Listen back and tap any step to "
            "fix what doesn't sound right before practising."
        )

    return TranscribeOut(steps=steps, confidence=conf, confidenceTier=tier, warning=warning)


# ---- Reference audio synthesis ----
#
# Renders a lesson's target pattern (or any notes[]) to a WAV so the
# client can play / download / share the reference. No real recording
# needed; the synthesis is deterministic + matches what the grading
# pipeline tests against, so what you hear is exactly what your take
# will be aligned to.


class RenderIn(BaseModel):
    notes: list[dict]           # [{pitch, startMs, durationMs}]
    sr: int = ENGINE_SR
    detune_cents: float = 0.0
    noise_level: float = 0.0
    harmonics: int = 3


@app.post("/render")
def render(req: RenderIn) -> Any:
    """Synthesize a target-pattern preview. Returns WAV bytes with
    Content-Type: audio/wav. Caches via Cache-Control; a given pattern
    always produces the same audio, so CDN caching is safe.
    """
    from fastapi.responses import Response
    if not req.notes:
        raise HTTPException(400, "empty_notes")
    _validate_pitches([str(n.get("pitch", "")) for n in req.notes])

    wave = synth.render_notes(
        req.notes,
        sr=req.sr,
        harmonics=req.harmonics,
        detune_cents=req.detune_cents,
        noise_level=req.noise_level,
    )

    buf = io.BytesIO()
    sf.write(buf, wave, req.sr, format="WAV", subtype="PCM_16")
    data = buf.getvalue()
    return Response(
        content=data,
        media_type="audio/wav",
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Length": str(len(data)),
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("AUDIO_ENGINE_HOST", "0.0.0.0"),
        port=int(os.getenv("AUDIO_ENGINE_PORT", "8001")),
        reload=False,
    )
