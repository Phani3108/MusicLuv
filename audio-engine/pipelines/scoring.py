"""Composite grading from an alignment.

Only dimensions the engine actually measures are graded and weighted into the
composite. Tone and dynamics are reported as `notGraded` until there is a
reference recording to compare against — returning a constant for them made
25% of every grade (and all tone/dynamics feedback) fiction.
"""
from __future__ import annotations

from dataclasses import dataclass
import random

import numpy as np

from .dtw import Alignment

ALL_DIMENSIONS = ("pitch", "rhythm", "tone", "dynamics", "consistency")
NOT_MEASURED = ("tone", "dynamics")
TEMPO_FREE_BAND = 0.10     # ±10% tempo is not penalized
TEMPO_MAX_PENALTY = 0.30   # rhythm loses at most 30% for tempo alone
EXTRA_NOTE_PENALTY = 0.5   # per interior extra note, as a fraction of one target note


@dataclass
class Rubric:
    id: str
    weights: dict         # {'pitch': .4, 'rhythm': .3, 'tone': .15, 'dynamics': .1, 'consistency': .05}
    pass_threshold: float
    pitch_tolerance_cents: float
    rhythm_tolerance_ms: float
    tuning_mode: str = "absolute"   # "absolute" (A440) | "relative" (forgive a global offset)


def _clamp01(x: float) -> float:
    return max(0.0, min(1.0, float(x)))


def graded_dimensions(mode: str, n_target: int) -> list[str]:
    dims = ["pitch", "rhythm"] if mode == "notes" else ["rhythm"]
    if n_target >= 3:
        dims.append("consistency")
    return dims


def score(
    *,
    target: list[dict],
    user: list[dict],
    alignment: Alignment,
    rubric: Rubric,
    mode: str = "notes",
) -> dict:
    """Per-dimension + composite, in the client's GradeResult shape."""
    n_target = len(target)
    pairs = alignment.pairs
    tol_c = max(1.0, rubric.pitch_tolerance_cents)
    tol_ms = max(1.0, rubric.rhythm_tolerance_ms)
    extra_pen = EXTRA_NOTE_PENALTY * len(alignment.extra_user_interior) / max(1, n_target)
    coverage = len(pairs) / max(1, n_target)

    dims: dict[str, float] = {}

    # Pitch: per target note, full credit inside tolerance, linear to 0 at 2x.
    if mode == "notes":
        per_note = np.zeros(max(1, n_target))
        for p in pairs:
            err = abs(p.cents_diff)
            per_note[p.target_idx] = _clamp01(1.0 - max(0.0, err - tol_c) / tol_c)
        dims["pitch"] = _clamp01(float(per_note.mean()) - extra_pen)

    # Rhythm: median timing residual on the learner's own clock, scaled by how
    # many target events were actually played; mild penalty for wrong tempo.
    residuals = np.array([p.onset_ms_diff for p in pairs], dtype=float)
    tempo_dev = abs(alignment.tempo_ratio - 1.0)
    tempo_pen = TEMPO_MAX_PENALTY * _clamp01((tempo_dev - TEMPO_FREE_BAND) / 0.40)
    if len(residuals):
        accuracy = _clamp01(1.0 - float(np.median(np.abs(residuals))) / (2.0 * tol_ms))
        dims["rhythm"] = _clamp01(accuracy * coverage * (1.0 - tempo_pen) - extra_pen)
    else:
        dims["rhythm"] = 0.0

    graded = graded_dimensions(mode, n_target)
    if "consistency" in graded:
        if len(residuals) >= 3:
            dims["consistency"] = _clamp01(1.0 - float(residuals.std()) / (3.0 * tol_ms)) * coverage
        else:
            dims["consistency"] = 0.0

    weights = {d: float(rubric.weights.get(d, 0.0)) for d in graded}
    total_w = sum(weights.values())
    if total_w <= 0:
        weights = {d: 1.0 for d in graded}
        total_w = float(len(graded))
    composite = _clamp01(sum(dims[d] * weights[d] for d in graded) / total_w)
    passed = bool(composite >= rubric.pass_threshold)

    issues = _issues(target, user, alignment, tol_c, tol_ms, mode)

    return {
        "composite": float(composite),
        "passed": passed,
        "dimensions": {d: float(round(dims[d], 4)) for d in graded},
        "gradedDimensions": graded,
        "notGraded": [d for d in ALL_DIMENSIONS if d not in graded],
        "issues": issues,
        "xpAwarded": 12 if passed else 3,
        "alignment": {
            "path": [[ti, ui] for ti, ui in alignment.path],
            "startOffsetMs": int(round(alignment.start_offset_ms)),
            "tempoRatio": round(alignment.tempo_ratio, 3),
            "tuningOffsetCents": int(round(alignment.tuning_offset_cents)),
            "matched": len(pairs),
            "missed": len(alignment.missed_targets),
            "extra": len(alignment.extra_user_interior),
        },
    }


def _issues(target, user, alignment: Alignment, tol_c: float, tol_ms: float, mode: str) -> list[dict]:
    issues: list[dict] = []
    for p in alignment.pairs:
        t = target[p.target_idx]
        if mode == "notes" and abs(p.cents_diff) > tol_c:
            issues.append({
                "at": int(t["startMs"]),
                "expected": t.get("pitch"),
                "detected": user[p.user_idx].get("pitch"),
                "centsOff": int(round(p.cents_diff)),
                "severity": "major" if abs(p.cents_diff) > 2 * tol_c else "minor",
            })
        if abs(p.onset_ms_diff) > tol_ms:
            issues.append({
                "at": int(t["startMs"]),
                "kind": "late" if p.onset_ms_diff > 0 else "early",
                "msOff": int(round(abs(p.onset_ms_diff))),
                "severity": "major" if abs(p.onset_ms_diff) > 2 * tol_ms else "minor",
            })
    for ti in alignment.missed_targets:
        t = target[ti]
        issues.append({"at": int(t["startMs"]), "expected": t.get("pitch"), "kind": "missed", "severity": "major"})
    a, b = alignment.tempo_ratio, alignment.start_offset_ms
    for ui in alignment.extra_user_interior:
        u = user[ui]
        issues.append({
            "at": int(round((u["startMs"] - b) / a)),
            "detected": u.get("pitch"),
            "kind": "extra",
            "severity": "minor",
        })
    issues.sort(key=lambda i: i["at"])
    tempo_dev = abs(a - 1.0)
    if alignment.pairs and tempo_dev > TEMPO_FREE_BAND:
        issues.insert(0, {
            "at": 0,
            "kind": "tempo",
            "tempoRatio": round(a, 2),
            "severity": "major" if tempo_dev > 0.25 else "minor",
        })
    return issues[:12]


def build_feedback(result: dict, rubric_feedback_bank: dict | None) -> dict:
    """Pick a canned line from the rubric bank based on the weakest graded dimension."""
    dims = result["dimensions"]
    if not dims:
        return {"canned": "We couldn't hear the exercise — check your mic and try again.",
                "worstDim": None, "severity": "major"}
    worst_dim = min(dims, key=lambda k: dims[k])
    severity = "major" if dims[worst_dim] < 0.7 else "minor"
    canned = "Nice work. Let's go again."
    if rubric_feedback_bank:
        bucket = rubric_feedback_bank.get(worst_dim, {})
        lines = [l for l in (bucket.get(severity) or bucket.get("minor") or []) if l]
        if lines:
            canned = random.choice(lines)
    return {"canned": canned, "worstDim": worst_dim, "severity": severity}
