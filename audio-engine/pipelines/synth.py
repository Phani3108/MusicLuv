"""Synthetic audio generator — deterministic, no external samples needed.

We use this to seed the test fixtures so the pipeline is always verifiable
even when a real microphone isn't available.
"""
from __future__ import annotations

import numpy as np
from .pitch import note_to_hz


def render_notes(
    notes: list[dict],
    *,
    sr: int = 22050,
    harmonics: int = 3,
    detune_cents: float = 0.0,
    noise_level: float = 0.01,
    onset_jitter_ms: float = 0.0,
) -> np.ndarray:
    """Render a list of {'pitch','startMs','durationMs'} as a mono waveform.

    Parameters let tests synthesize 'detuned', 'rushed', or 'noisy' variants
    to prove the grader reacts.
    """
    if not notes:
        return np.zeros(1, dtype=np.float32)

    rng = np.random.default_rng(42)
    end_ms = max(n["startMs"] + n["durationMs"] for n in notes)
    total = int(sr * (end_ms + 500) / 1000)
    out = np.zeros(total, dtype=np.float32)

    for n in notes:
        pitch = n["pitch"]
        jitter = rng.normal(0.0, onset_jitter_ms) if onset_jitter_ms > 0 else 0.0
        start_s = max(0.0, (n["startMs"] + jitter) / 1000.0)
        dur_s = n["durationMs"] / 1000.0
        base_hz = note_to_hz(pitch) * (2 ** (detune_cents / 1200.0))
        t = np.arange(int(sr * dur_s)) / sr
        wave = np.zeros_like(t)
        for h in range(1, harmonics + 1):
            wave += (1.0 / h) * np.sin(2 * np.pi * base_hz * h * t)
        env = _adsr(len(t), sr)
        wave = wave * env * 0.4
        i0 = int(start_s * sr)
        i1 = i0 + len(wave)
        if i1 > len(out):
            wave = wave[: len(out) - i0]
            i1 = len(out)
        out[i0:i1] += wave

    if noise_level > 0:
        out += rng.normal(0.0, noise_level, size=out.shape).astype(np.float32)

    # Normalize peak to 0.9
    peak = np.max(np.abs(out)) or 1.0
    out *= (0.9 / peak)
    return out.astype(np.float32)


def _adsr(n: int, sr: int) -> np.ndarray:
    """Simple envelope so notes don't click at the boundaries."""
    attack = int(0.005 * sr)
    release = int(0.04 * sr)
    env = np.ones(n)
    if attack * 2 > n:
        attack = max(1, n // 4)
    if release * 2 > n:
        release = max(1, n // 4)
    env[:attack] = np.linspace(0, 1, attack)
    env[-release:] = np.linspace(1, 0, release)
    return env
