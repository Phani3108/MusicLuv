"""Monophonic pitch detection.

Default backend is librosa pYIN (always available; pure-python + C deps).
CREPE is a drop-in replacement when installed and PITCH_BACKEND=crepe.
"""
from __future__ import annotations

import os
from dataclasses import dataclass

import numpy as np

# ---- Note <-> Hz helpers ----

_NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
_NOTE_TO_MIDI = {f"{n}{o}": 12 * (o + 1) + i
                 for o in range(0, 9) for i, n in enumerate(_NOTE_NAMES)}


def note_to_hz(note: str) -> float:
    """'A4' -> 440.0, 'C4' -> 261.626..."""
    midi = _NOTE_TO_MIDI[note]
    return 440.0 * (2 ** ((midi - 69) / 12.0))


def hz_to_note(hz: float) -> tuple[str, int]:
    """Return (closest_note, cents_off). hz<=0 returns ('', 0)."""
    if hz is None or hz <= 0 or not np.isfinite(hz):
        return ("", 0)
    midi_exact = 69 + 12 * np.log2(hz / 440.0)
    midi = int(round(midi_exact))
    cents = int(round((midi_exact - midi) * 100))
    if midi < 0 or midi > 127:
        return ("", 0)
    name = _NOTE_NAMES[midi % 12]
    octave = (midi // 12) - 1
    return (f"{name}{octave}", cents)


@dataclass
class PitchTrack:
    frame_hz: np.ndarray          # fundamental Hz per frame (NaN where unvoiced)
    voiced: np.ndarray            # bool per frame
    times_s: np.ndarray           # frame timestamps in seconds
    hop_s: float                  # hop duration in seconds


# ---- pYIN backend (librosa) ----

def _extract_pyin(y: np.ndarray, sr: int, hop_ms: float = 10.0) -> PitchTrack:
    import librosa  # lazy
    hop_length = max(1, int(sr * hop_ms / 1000.0))
    fmin = librosa.note_to_hz("C2")
    fmax = librosa.note_to_hz("C7")
    f0, voiced_flag, _vp = librosa.pyin(
        y, fmin=fmin, fmax=fmax, sr=sr, hop_length=hop_length,
        fill_na=np.nan, frame_length=2048,
    )
    times = librosa.times_like(f0, sr=sr, hop_length=hop_length)
    return PitchTrack(frame_hz=f0, voiced=np.nan_to_num(voiced_flag).astype(bool),
                      times_s=times, hop_s=hop_length / sr)


# ---- CREPE backend (optional) ----

def _extract_crepe(y: np.ndarray, sr: int, hop_ms: float = 10.0) -> PitchTrack:
    import crepe  # lazy — only if installed
    time_s, frequency, confidence, _ = crepe.predict(
        y, sr, model_capacity="medium", viterbi=True, step_size=int(hop_ms),
        verbose=0,
    )
    voiced = confidence > 0.5
    f0 = frequency.astype(float).copy()
    f0[~voiced] = np.nan
    return PitchTrack(frame_hz=f0, voiced=voiced, times_s=time_s, hop_s=hop_ms / 1000.0)


def extract_pitch(y: np.ndarray, sr: int, hop_ms: float = 10.0) -> PitchTrack:
    backend = os.getenv("PITCH_BACKEND", "pyin").lower()
    if backend == "crepe":
        try:
            return _extract_crepe(y, sr, hop_ms)
        except ImportError:
            # Fall back silently; caller can inspect os.environ.
            pass
    return _extract_pyin(y, sr, hop_ms)


def segment_notes(track: PitchTrack, min_note_s: float = 0.08) -> list[dict]:
    """Group consecutive voiced frames with similar pitch into note segments.

    Returns list of {pitch: 'C4', startMs: int, durationMs: int, centsOff: int}.
    """
    out: list[dict] = []
    n = len(track.frame_hz)
    if n == 0:
        return out

    cur_start: int | None = None
    cur_midi: int | None = None
    for i in range(n):
        hz = track.frame_hz[i]
        voiced = track.voiced[i] and np.isfinite(hz) and hz > 0
        note_midi = None
        if voiced:
            note_midi = int(round(69 + 12 * np.log2(hz / 440.0)))
        if cur_start is None and voiced:
            cur_start = i
            cur_midi = note_midi
        elif cur_start is not None and (not voiced or note_midi != cur_midi):
            # Close current segment
            end = i
            start_s = track.times_s[cur_start]
            end_s = track.times_s[end - 1] + track.hop_s
            if end_s - start_s >= min_note_s and cur_midi is not None:
                midi_exact = 69 + 12 * np.log2(
                    np.nanmean(track.frame_hz[cur_start:end]) / 440.0
                )
                cents = int(round((midi_exact - cur_midi) * 100))
                name = _NOTE_NAMES[cur_midi % 12]
                octave = (cur_midi // 12) - 1
                out.append({
                    "pitch": f"{name}{octave}",
                    "startMs": int(start_s * 1000),
                    "durationMs": int((end_s - start_s) * 1000),
                    "centsOff": cents,
                })
            cur_start = i if voiced else None
            cur_midi = note_midi if voiced else None
    # Flush
    if cur_start is not None and cur_midi is not None:
        end_s = track.times_s[n - 1] + track.hop_s
        start_s = track.times_s[cur_start]
        if end_s - start_s >= min_note_s:
            midi_exact = 69 + 12 * np.log2(
                np.nanmean(track.frame_hz[cur_start:n]) / 440.0
            )
            cents = int(round((midi_exact - cur_midi) * 100))
            name = _NOTE_NAMES[cur_midi % 12]
            octave = (cur_midi // 12) - 1
            out.append({
                "pitch": f"{name}{octave}",
                "startMs": int(start_s * 1000),
                "durationMs": int((end_s - start_s) * 1000),
                "centsOff": cents,
            })
    return out
