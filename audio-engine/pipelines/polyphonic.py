"""Polyphonic transcription — lazy wrapper around Spotify Basic Pitch.

Only imported when POLYPHONIC_BACKEND=basic_pitch and basic-pitch is installed.
Falls back to monophonic pYIN segmentation when unavailable.
"""
from __future__ import annotations

import os
import numpy as np


def transcribe(y: np.ndarray, sr: int) -> list[dict]:
    """Return note events: [{'pitch','startMs','durationMs','velocity','confidence'}]"""
    backend = os.getenv("POLYPHONIC_BACKEND", "none").lower()

    if backend == "basic_pitch":
        try:
            from basic_pitch.inference import predict
            from basic_pitch import ICASSP_2022_MODEL_PATH
            # basic-pitch works on file paths — write a tmp WAV
            import tempfile, soundfile as sf
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
                sf.write(f.name, y, sr)
                _model_output, midi_data, note_events = predict(
                    f.name, model_or_model_path=ICASSP_2022_MODEL_PATH,
                )
            out: list[dict] = []
            for ne in note_events:
                start_s, end_s, pitch_midi, velocity, _confidence = ne
                from .pitch import _NOTE_NAMES  # type: ignore
                name = _NOTE_NAMES[int(pitch_midi) % 12]
                octave = (int(pitch_midi) // 12) - 1
                out.append({
                    "pitch": f"{name}{octave}",
                    "startMs": int(start_s * 1000),
                    "durationMs": int((end_s - start_s) * 1000),
                    "velocity": float(velocity),
                    "confidence": float(_confidence) if _confidence is not None else 0.8,
                })
            return out
        except ImportError:
            pass

    # Fallback: treat it as monophonic
    from .pitch import extract_pitch, segment_notes
    track = extract_pitch(y, sr)
    notes = segment_notes(track)
    for n in notes:
        n["velocity"] = 0.7
        n["confidence"] = 0.55
    return notes


def confidence_summary(notes: list[dict]) -> float:
    if not notes:
        return 0.0
    return float(np.mean([n.get("confidence", 0.0) for n in notes]))
