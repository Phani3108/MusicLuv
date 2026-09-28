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


def detect_onsets(y: np.ndarray, sr: int, backtrack: bool = True) -> OnsetTrack:
    """Onset times + short-frame RMS envelope. Grading uses `backtrack=False`
    (the attack peak): backtracking can land tens of ms early, inside the
    previous note's sustain, which hides the re-attack from segmentation."""
    import librosa
    # The detector can't see an attack in its first frame, so a take that
    # starts on the first sample would lose its first note. Pad, then shift back.
    pad_s = 0.1
    padded = np.concatenate([np.zeros(int(sr * pad_s), dtype=y.dtype), y])
    onset_samples = librosa.onset.onset_detect(
        y=padded, sr=sr, units="time", backtrack=backtrack
    )
    onset_ms = [int(round((t - pad_s) * 1000)) for t in onset_samples if t >= pad_s - 0.02]
    onset_ms = [max(0, ms) for ms in onset_ms]

    # Short frames (23 ms, 6 ms hop) so the brief energy dip of a re-struck
    # note is visible; the 93 ms default frame smears it away.
    hop_length = 128
    rms = librosa.feature.rms(y=y, frame_length=512, hop_length=hop_length)[0]
    times = librosa.times_like(rms, sr=sr, hop_length=hop_length)
    return OnsetTrack(onset_ms=onset_ms, rms=rms, rms_times_s=times,
                      hop_s=hop_length / sr)


def rms_at(track: OnsetTrack, t_s: float) -> float:
    if len(track.rms) == 0:
        return 0.0
    idx = int(np.clip(np.searchsorted(track.rms_times_s, t_s), 0, len(track.rms) - 1))
    return float(track.rms[idx])
