"""Grade a teacher-labelled corpus of real recordings and report agreement.

    python scripts/eval_corpus.py tests/fixtures/real/manifest.json
    python scripts/eval_corpus.py manifest.json --min-agreement 0.9 --max-false-fail 0.05

Each take in the manifest is sent through the real /grade endpoint (decode,
pitch, segmentation, alignment, scoring) and compared with the teacher's
pass/fail label. Exit code is 1 when a threshold is missed, so this can gate CI.
See docs/recording-guide.md for how to record and label takes.
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


def _load_catalog(manifest_dir: Path) -> dict:
    path = manifest_dir / "exercises.json"
    if not path.exists():
        return {"exercises": {}, "rubrics": {}}
    return json.loads(path.read_text())


def _mode_for(exercise: dict | None) -> str:
    if not exercise:
        return "notes"
    pattern = exercise.get("targetPattern", {})
    if exercise.get("type") == "rhythm_clap" or (pattern.get("onsets") and not pattern.get("notes")):
        return "onsets"
    return "notes"


def build_meta(take: dict, catalog: dict) -> dict:
    exercise = catalog["exercises"].get(take.get("exerciseId", ""))
    mode = take.get("mode") or _mode_for(exercise)
    pattern = (exercise or {}).get("targetPattern", {})
    target = take.get("target") or pattern.get("notes") or []
    onsets = take.get("targetOnsets") or pattern.get("onsets")
    tempo = float(take.get("tempoFactor", 1.0))
    if tempo != 1.0:
        target = [dict(n, startMs=round(n["startMs"] / tempo), durationMs=round(n["durationMs"] / tempo))
                  for n in target]
        onsets = [round(ms / tempo) for ms in onsets] if onsets else onsets
    rubric = take.get("rubric") or catalog["rubrics"].get((exercise or {}).get("gradingRubricId", ""), {})
    rubric = {k: v for k, v in rubric.items() if k != "feedbackBank"}
    return {
        "exerciseId": take.get("exerciseId", "corpus"),
        "attemptId": take["file"],
        "mode": mode,
        "target": [{"pitch": n["pitch"], "startMs": n["startMs"], "durationMs": n["durationMs"]} for n in target],
        "targetOnsets": onsets,
        "tempoFactor": tempo,
        "rubric": rubric,
    }


def evaluate(manifest_path: Path) -> dict:
    from fastapi.testclient import TestClient
    from main import app

    manifest = json.loads(manifest_path.read_text())
    base = manifest_path.parent
    catalog = _load_catalog(base)
    client = TestClient(app)

    rows, skipped = [], []
    for take in manifest.get("takes", []):
        audio_path = base / take["file"]
        if not audio_path.exists():
            skipped.append(take["file"])
            continue
        meta = build_meta(take, catalog)
        started = time.perf_counter()
        r = client.post(
            "/grade",
            files={"audio": (audio_path.name, audio_path.read_bytes(), "audio/wav")},
            data={"meta": json.dumps(meta)},
        )
        elapsed = time.perf_counter() - started
        teacher = take.get("teacher", {})
        row = {"file": take["file"], "variant": take.get("variant", "?"), "device": take.get("device", "?"),
               "teacherPass": teacher.get("pass"), "teacherScore": teacher.get("score"),
               "status": r.status_code, "seconds": round(elapsed, 2)}
        if r.status_code == 200:
            body = r.json()
            row.update(enginePass=body["passed"], composite=round(body["composite"], 3),
                       dims=body["dimensions"], warning=body.get("warning"))
        else:
            row.update(enginePass=None, composite=None, error=r.text[:160])
        rows.append(row)

    labelled = [r for r in rows if r["teacherPass"] is not None and r["enginePass"] is not None]
    agree = sum(1 for r in labelled if r["enginePass"] == r["teacherPass"])
    teacher_passes = [r for r in labelled if r["teacherPass"]]
    teacher_fails = [r for r in labelled if not r["teacherPass"]]
    false_fail = sum(1 for r in teacher_passes if not r["enginePass"])
    false_pass = sum(1 for r in teacher_fails if r["enginePass"])

    spearman = None
    scored = [r for r in labelled if r["teacherScore"] is not None]
    if len(scored) >= 5:
        from scipy.stats import spearmanr
        spearman = float(spearmanr([r["composite"] for r in scored], [r["teacherScore"] for r in scored]).statistic)

    seconds = sorted(r["seconds"] for r in rows)
    return {
        "rows": rows,
        "skipped": skipped,
        "summary": {
            "takes": len(rows),
            "labelled": len(labelled),
            "errors": sum(1 for r in rows if r["status"] != 200),
            "agreement": agree / len(labelled) if labelled else None,
            "falseFailRate": false_fail / len(teacher_passes) if teacher_passes else None,
            "falsePassRate": false_pass / len(teacher_fails) if teacher_fails else None,
            "spearman": spearman,
            "p95Seconds": seconds[int(0.95 * (len(seconds) - 1))] if seconds else None,
        },
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("manifest", type=Path)
    ap.add_argument("--min-agreement", type=float, default=0.9)
    ap.add_argument("--max-false-fail", type=float, default=0.05)
    ap.add_argument("--json", action="store_true", help="print the full report as JSON")
    args = ap.parse_args()

    report = evaluate(args.manifest)
    if args.json:
        print(json.dumps(report, indent=2))
    else:
        for r in report["rows"]:
            verdict = "✓" if r["enginePass"] == r["teacherPass"] else "✗"
            print(f"{verdict} {r['file']:<48} teacher={r['teacherPass']!s:<5} engine={r['enginePass']!s:<5} "
                  f"composite={r['composite']} {r.get('warning') or r.get('error') or ''}")
        if report["skipped"]:
            print(f"(skipped {len(report['skipped'])} takes with missing audio files)")
        print(json.dumps(report["summary"], indent=2))

    s = report["summary"]
    if not s["labelled"]:
        print("No labelled takes with audio yet — see docs/recording-guide.md.")
        return 0
    ok = (s["agreement"] >= args.min_agreement and s["errors"] == 0
          and (s["falseFailRate"] is None or s["falseFailRate"] <= args.max_false_fail))
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
