# Recording guide — the real-audio grading corpus

Synthetic sine waves prove the pipeline runs; only real recordings prove the grade is right.
This corpus is the release gate for grading changes: **engine pass/fail must agree with a teacher on ≥ 90% of takes, and fail ≤ 5% of takes the teacher passed.**

## What to record (per exercise)

| Variant | How to play it | Teacher label (typical) |
|---|---|---|
| `clean` | As well as you can, at the lesson tempo | pass |
| `late_start` | Wait ~2 s after the count-in, then play cleanly | pass |
| `slow_steady` | Clean, ~85–90% of tempo | pass |
| `flat_30c` | Voice/violin: sing or play the whole line ~30¢ flat | teacher decides |
| `wrong_notes` | Two clearly wrong notes | fail |
| `rushed` | Rush the second half | teacher decides |
| `missed` | Skip 2–3 notes | fail |
| `noisy_room` | Clean take with TV/fan/conversation in the room | pass |

Start with the first six Phase 3 exercises for each wedge. Piano: `piano_l1_01_scale5`, `piano_l1_02_quarter_halves`, `piano_l1_03_twinkle_rh`, `piano_l1_04_twinkle_lh`, `piano_l1_06_cmaj_scale`, `piano_l2_04_accidentals`. Voice: the first sargam/alankar exercises once they exist.

## Devices × rooms

- At least 3 devices: a laptop's built-in mic, an iPhone, and a mid-range Android.
- At least 2 rooms: a quiet one and a normal living room.
- Hold the phone ~30 cm from the instrument. For voice, hold it at arm's length.
- Record through MusicLuv's capture path if you can (Practice Studio → "Play my take" → save). A phone voice-memo app is fine too, but convert to WAV (`ffmpeg -i take.m4a -ac 1 -ar 22050 take.wav`); the engine only decodes WAV/FLAC/OGG.

## Files and naming

```
audio-engine/tests/fixtures/real/
  manifest.json            ← committed
  exercises.json           ← generated, git-ignored
  piano/twinkle_rh__iphone13__livingroom__clean__01.wav   ← git-ignored
```

- Name each file `<exercise>__<device>__<room>__<variant>__<nn>.wav`.
- Audio is **git-ignored**: learner and teacher voices are personal data. Keep the audio in the team's private bucket and sync it locally before running the gate.

## Manifest entry

```json
{
  "file": "piano/twinkle_rh__iphone13__livingroom__clean__01.wav",
  "exerciseId": "piano_l1_03_twinkle_rh",
  "variant": "clean",
  "device": "iphone13",
  "room": "livingroom",
  "tempoFactor": 1.0,
  "teacher": { "pass": true, "score": 5, "notes": "slightly rushed bar 3" }
}
```

- `teacher.pass` is required: would you pass this student on this exercise?
- `teacher.score` (1–5) is optional. With ≥ 5 scored takes the report adds Spearman correlation against the composite.
- Optional overrides: `mode` (`notes` | `onsets`), `target`, `targetOnsets`, `rubric`.
- The teacher labels **before** seeing the engine's grade.

## Run it

```bash
cd server && npx tsx ../audio-engine/scripts/export_exercises.ts > ../audio-engine/tests/fixtures/real/exercises.json
cd ../audio-engine
python scripts/eval_corpus.py tests/fixtures/real/manifest.json   # per-take table + summary; exit 1 below thresholds
pytest tests/test_real_corpus.py                                  # same gate inside pytest (skips when empty)
```

Thresholds can be changed with `--min-agreement` / `--max-false-fail`, or with `REAL_CORPUS_MIN_AGREEMENT` / `REAL_CORPUS_MAX_FALSE_FAIL` for pytest.
