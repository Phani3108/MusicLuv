"""Shared test fixtures — synthetic audio only, no real samples needed."""
import sys
from pathlib import Path

# Make `pipelines` and `main` importable when running pytest from the audio-engine dir.
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import pytest
from pipelines.synth import render_notes


C_SCALE_5 = [
    {"pitch": "C4", "startMs": 0,    "durationMs": 500},
    {"pitch": "D4", "startMs": 500,  "durationMs": 500},
    {"pitch": "E4", "startMs": 1000, "durationMs": 500},
    {"pitch": "F4", "startMs": 1500, "durationMs": 500},
    {"pitch": "G4", "startMs": 2000, "durationMs": 500},
    {"pitch": "F4", "startMs": 2500, "durationMs": 500},
    {"pitch": "E4", "startMs": 3000, "durationMs": 500},
    {"pitch": "D4", "startMs": 3500, "durationMs": 500},
    {"pitch": "C4", "startMs": 4000, "durationMs": 1000},
]


@pytest.fixture
def c_scale_target():
    return [dict(n) for n in C_SCALE_5]


@pytest.fixture
def sr():
    return 22050


@pytest.fixture
def audio_clean(c_scale_target, sr):
    return render_notes(c_scale_target, sr=sr, noise_level=0.005), sr


@pytest.fixture
def audio_detuned(c_scale_target, sr):
    return render_notes(c_scale_target, sr=sr, detune_cents=60, noise_level=0.005), sr


@pytest.fixture
def audio_rushed(c_scale_target, sr):
    # onset_jitter is gaussian so some notes go early, some late
    return render_notes(c_scale_target, sr=sr, onset_jitter_ms=150, noise_level=0.005), sr
