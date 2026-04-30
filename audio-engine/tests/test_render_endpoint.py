"""Tests for the /render endpoint — deterministic reference-audio
synthesis used by the lesson reference player + drill demo clips.

The endpoint is the audio counterpart of /grade: same notes always
produce the same WAV bytes, so it's safe to cache the response at the
CDN edge.
"""
import io
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
import soundfile as sf
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_render_returns_wav_with_correct_headers():
    notes = [
        {"pitch": "C4", "startMs": 0,    "durationMs": 500},
        {"pitch": "E4", "startMs": 500,  "durationMs": 500},
        {"pitch": "G4", "startMs": 1000, "durationMs": 500},
    ]
    r = client.post("/render", json={"notes": notes})
    assert r.status_code == 200
    assert r.headers["content-type"] == "audio/wav"
    # CDN-cacheable since synthesis is deterministic.
    assert "max-age" in r.headers["cache-control"]
    assert "immutable" in r.headers["cache-control"]
    # Body should be a real WAV — round-trip via soundfile.
    y, sr = sf.read(io.BytesIO(r.content))
    assert sr == 22050
    assert len(y) > sr  # >1 sec of audio (3 × 500ms notes)


def test_render_is_deterministic():
    """Same notes -> identical WAV bytes. Required for cache safety."""
    notes = [{"pitch": "A4", "startMs": 0, "durationMs": 1000}]
    r1 = client.post("/render", json={"notes": notes})
    r2 = client.post("/render", json={"notes": notes})
    assert r1.status_code == 200 and r2.status_code == 200
    assert r1.content == r2.content


def test_render_rejects_empty_notes():
    r = client.post("/render", json={"notes": []})
    assert r.status_code == 400
    assert "empty_notes" in r.text


def test_render_supports_custom_harmonics_and_noise():
    """Optional knobs (harmonics, detune_cents, noise_level) should
    affect the rendered audio without crashing."""
    notes = [{"pitch": "C4", "startMs": 0, "durationMs": 500}]
    plain = client.post("/render", json={"notes": notes, "harmonics": 3})
    rich = client.post("/render", json={"notes": notes, "harmonics": 8, "noise_level": 0.01})
    assert plain.status_code == 200 and rich.status_code == 200
    # Different parameters should produce different bytes.
    assert plain.content != rich.content


def test_render_pitch_matches_request():
    """Render an A4 — the dominant frequency in the audio should be ~440Hz."""
    notes = [{"pitch": "A4", "startMs": 0, "durationMs": 1000}]
    r = client.post("/render", json={"notes": notes})
    assert r.status_code == 200
    y, sr = sf.read(io.BytesIO(r.content))
    # Crude FFT peak detection — should be close to 440Hz fundamental.
    spectrum = np.abs(np.fft.rfft(y))
    freqs = np.fft.rfftfreq(len(y), 1 / sr)
    # Restrict to <2kHz to avoid harmonics dominating.
    mask = freqs < 2000
    peak_freq = freqs[mask][np.argmax(spectrum[mask])]
    assert 430 < peak_freq < 450, f"expected ~440Hz, got {peak_freq:.1f}Hz"
