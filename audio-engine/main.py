"""MusicLuv audio-engine — FastAPI.

Endpoints
---------
GET  /health       — report which backends are live
POST /grade        — multipart: audio + meta JSON (target + rubric). Returns GradeResult.
POST /transcribe   — multipart: audio + instrument_id + level. Returns step timeline.
"""
from __future__ import annotations

import io
import json
import os
from typing import Any

import numpy as np
import soundfile as sf
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from pipelines import pitch, onsets, dtw, scoring, simplify as simplify_mod, polyphonic, stems


app = FastAPI(title="MusicLuv audio-engine", version="0.1.0")

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
    feedbackBank: dict[str, Any] | None = None


class GradeMeta(BaseModel):
    exerciseId: str
    userId: str | None = None
    attemptId: str | None = None
    target: list[TargetNote]
    rubric: RubricIn = Field(default_factory=RubricIn)


# ---- Helpers ----

def _read_audio(upload: UploadFile, target_sr: int = 22050) -> tuple[np.ndarray, int]:
    data, sr = sf.read(io.BytesIO(upload.file.read()), always_2d=False)
    if data.ndim > 1:
        data = data.mean(axis=1)
    data = data.astype(np.float32)
    if sr != target_sr:
        import librosa
        data = librosa.resample(y=data, orig_sr=sr, target_sr=target_sr)
        sr = target_sr
    return data, sr


# ---- Endpoints ----

@app.get("/health")
def health() -> dict:
    return {
        "ok": True,
        "service": "musicluv-audio-engine",
        "version": "0.1.0",
        "backends": {
            "pitch":       os.getenv("PITCH_BACKEND", "pyin"),
            "polyphonic":  os.getenv("POLYPHONIC_BACKEND", "none"),
            "stems":       os.getenv("STEMS_BACKEND", "none"),
        },
    }


@app.post("/grade")
async def grade(
    audio: UploadFile = File(...),
    meta: str = Form(...),
) -> dict:
    """Grade one exercise attempt.

    `meta` is a JSON string of GradeMeta (sent as a form field so the whole
    request stays multipart and the client doesn't need to touch base64).
    """
    try:
        meta_obj = GradeMeta.model_validate_json(meta)
    except Exception as e:  # pydantic validation
        raise HTTPException(400, f"bad meta: {e}")

    y, sr = _read_audio(audio)
    if len(y) < sr * 0.2:
        raise HTTPException(400, "audio too short (<200ms)")

    # Extract and segment the user's performance
    track = pitch.extract_pitch(y, sr)
    user_notes = pitch.segment_notes(track, min_note_s=0.08)

    onset_track = onsets.detect_onsets(y, sr)

    # Alignment & scoring
    target = [t.model_dump() for t in meta_obj.target]
    alignment = dtw.align(
        target, user_notes,
        pitch_tolerance_cents=meta_obj.rubric.pitchToleranceCents,
        rhythm_tolerance_ms=meta_obj.rubric.rhythmToleranceMs,
    )

    rubric = scoring.Rubric(
        id=meta_obj.rubric.id,
        weights=meta_obj.rubric.weights,
        pass_threshold=meta_obj.rubric.passThreshold,
        pitch_tolerance_cents=meta_obj.rubric.pitchToleranceCents,
        rhythm_tolerance_ms=meta_obj.rubric.rhythmToleranceMs,
    )

    result = scoring.score(
        target=target,
        user=user_notes,
        alignment=alignment,
        rubric=rubric,
        user_rms_env=onset_track.rms.tolist()[:400],
    )

    fb = scoring.build_feedback(result, meta_obj.rubric.feedbackBank)
    result["feedback"] = {"canned": fb["canned"]}
    result["attemptId"] = meta_obj.attemptId
    result["userNotesDetected"] = user_notes[:40]
    return result


class TranscribeOut(BaseModel):
    steps: list[dict]
    confidence: float
    warning: str | None = None


@app.post("/transcribe", response_model=TranscribeOut)
async def transcribe(
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

    simplified = simplify_mod.simplify(notes, level=level)
    steps = simplify_mod.render_steps(simplified)

    warning: str | None = None
    if conf < 0.55:
        warning = "Auto-transcription confidence is low. Try a cleaner recording, or tap any step to correct."

    return TranscribeOut(steps=steps, confidence=conf, warning=warning)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("AUDIO_ENGINE_HOST", "0.0.0.0"),
        port=int(os.getenv("AUDIO_ENGINE_PORT", "8001")),
        reload=False,
    )
