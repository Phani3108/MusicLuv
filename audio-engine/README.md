# MusicLuv audio engine

FastAPI sidecar that does the actual audio work for MusicLuv:
- Monophonic pitch detection
- Onset / rhythm analysis
- DTW alignment against a target pattern
- Composite grading (pitch / rhythm / tone / dynamics / consistency)
- Song transcription (optional — Basic Pitch + Demucs)

## Setup

```bash
cd audio-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -e .[test]
pytest              # runs against synthetic audio fixtures
uvicorn main:app --reload --port 8001
```

## Heavy ML extras (install only when needed)

```bash
pip install -e .[ml-basic-pitch]   # polyphonic transcription
pip install -e .[ml-crepe]         # deep-learning pitch (CPU ok but slow)
pip install -e .[ml-demucs]        # stem separation (needs torch; ~2GB)
```

Set the backend env vars in `.env` once installed:

```
PITCH_BACKEND=crepe
POLYPHONIC_BACKEND=basic_pitch
STEMS_BACKEND=demucs
```

## Endpoints

- `GET /health` — backends report
- `POST /grade` — multipart: `audio` (wav/mp3), `meta` (JSON target pattern + rubric). Returns composite grade matching the client's `GradeResult` type.
- `POST /transcribe` — multipart: `audio`, `instrument_id`, `level`. Returns step timeline.

## Architecture

- `pipelines/pitch.py` — pYIN by default, CREPE when enabled
- `pipelines/onsets.py` — librosa onset detection + RMS envelope
- `pipelines/dtw.py` — weighted DTW on (pitch, onset) sequences
- `pipelines/scoring.py` — per-dimension + composite, matches `gradingRubricCatalog`
- `pipelines/simplify.py` — transcription → level-appropriate step timeline
- `pipelines/synth.py` — synthetic audio for tests
- `pipelines/polyphonic.py` — Basic Pitch lazy wrapper
- `pipelines/stems.py` — Demucs lazy wrapper
