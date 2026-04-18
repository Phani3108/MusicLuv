"""Onset detection and RMS envelope — for rhythm and dynamics scoring."""
from __future__ import annotations

from dataclasses import dataclass
import numpy as np


@dataclass
class OnsetTrack:
    onset_ms: list[int]
    rms: np.ndarray               # per-frame RMS
    rms_times_s: np.ndarray
    hop_s: float


def detect_onsets(y: np.ndarray, sr: int) -> OnsetTrack:
    import librosa
    onset_samples = librosa.onset.onset_detect(
        y=y, sr=sr, units="time", backtrack=True
    )
    onset_ms = [int(round(t * 1000)) for t in onset_samples]

    hop_length = 512
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    times = librosa.times_like(rms, sr=sr, hop_length=hop_length)
    return OnsetTrack(onset_ms=onset_ms, rms=rms, rms_times_s=times,
                      hop_s=hop_length / sr)


def rms_at(track: OnsetTrack, t_s: float) -> float:
    if len(track.rms) == 0:
        return 0.0
    idx = int(np.clip(np.searchsorted(track.rms_times_s, t_s), 0, len(track.rms) - 1))
    return float(track.rms[idx])
