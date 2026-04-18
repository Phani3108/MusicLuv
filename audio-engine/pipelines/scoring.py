"""Composite grading — matches the client's GradeResult shape exactly."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Optional
import random

from .dtw import Alignment


@dataclass
class Rubric:
    id: str
    weights: dict         # {'pitch': .4, 'rhythm': .3, 'tone': .15, 'dynamics': .1, 'consistency': .05}
    pass_threshold: float
    pitch_tolerance_cents: float
    rhythm_tolerance_ms: float


def _clamp01(x: float) -> float:
    return max(0.0, min(1.0, x))


def score(
    *,
    target: list[dict],
    user: list[dict],
    alignment: Alignment,
    rubric: Rubric,
    target_rms_env: Optional[list[float]] = None,
    user_rms_env: Optional[list[float]] = None,
    target_mfcc_mean: Optional[list[float]] = None,
    user_mfcc_mean: Optional[list[float]] = None,
) -> dict:
    """Compute per-dimension + composite and return the client-shaped dict."""
    n_target = len(target)
    n_user = len(user)

    # --- Pitch: fraction of aligned pairs within tolerance
    if not alignment.pairs:
        pitch_score = 0.0
    else:
        within = sum(1 for p in alignment.pairs if p.cents_diff <= rubric.pitch_tolerance_cents)
        # Penalty for missing / extra notes
        recovered = len(alignment.pairs) / max(1, max(n_target, n_user))
        pitch_score = _clamp01((within / len(alignment.pairs)) * recovered)

    # --- Rhythm: inverse median onset error (cap normalized to tolerance)
    if alignment.pairs:
        errs = [p.onset_ms_diff for p in alignment.pairs]
        median_err = sorted(errs)[len(errs) // 2]
        rhythm_score = _clamp01(1.0 - (median_err / (rubric.rhythm_tolerance_ms * 2.0)))
    else:
        rhythm_score = 0.0

    # --- Tone: MFCC cosine similarity if provided, else neutral 0.75
    if target_mfcc_mean and user_mfcc_mean and len(target_mfcc_mean) == len(user_mfcc_mean):
        import numpy as np
        t = np.array(target_mfcc_mean, dtype=float)
        u = np.array(user_mfcc_mean, dtype=float)
        cos = float((t @ u) / (np.linalg.norm(t) * np.linalg.norm(u) + 1e-9))
        tone_score = _clamp01((cos + 1.0) / 2.0)
    else:
        tone_score = 0.75

    # --- Dynamics: correlation of RMS envelopes if provided, else neutral
    if target_rms_env and user_rms_env and len(user_rms_env) > 4:
        import numpy as np
        tl = np.array(target_rms_env, dtype=float)
        ul = np.array(user_rms_env, dtype=float)
        n = min(len(tl), len(ul))
        if n > 4 and tl[:n].std() > 1e-6 and ul[:n].std() > 1e-6:
            corr = float(np.corrcoef(tl[:n], ul[:n])[0, 1])
            dynamics_score = _clamp01((corr + 1.0) / 2.0)
        else:
            dynamics_score = 0.5
    else:
        dynamics_score = 0.7

    # --- Consistency: 1 - stdev of onset diffs (normalized)
    if len(alignment.pairs) > 2:
        import numpy as np
        diffs = np.array([p.onset_ms_diff for p in alignment.pairs], dtype=float)
        consistency_score = _clamp01(1.0 - diffs.std() / (rubric.rhythm_tolerance_ms * 3.0))
    else:
        consistency_score = 0.85

    dims = {
        "pitch": pitch_score,
        "rhythm": rhythm_score,
        "tone": tone_score,
        "dynamics": dynamics_score,
        "consistency": consistency_score,
    }
    w = rubric.weights
    composite = _clamp01(
        dims["pitch"] * w["pitch"] + dims["rhythm"] * w["rhythm"]
        + dims["tone"] * w["tone"] + dims["dynamics"] * w["dynamics"]
        + dims["consistency"] * w["consistency"]
    )
    passed = bool(composite >= rubric.pass_threshold)

    # Build issues from worst aligned pairs
    issues: list[dict] = []
    for p in alignment.pairs:
        if p.cents_diff > rubric.pitch_tolerance_cents:
            issues.append({
                "at": int(target[p.target_idx]["startMs"]),
                "expected": target[p.target_idx]["pitch"],
                "detected": user[p.user_idx]["pitch"],
                "centsOff": int(round(p.cents_diff)),
                "severity": "major" if p.cents_diff > rubric.pitch_tolerance_cents * 2 else "minor",
            })
        if p.onset_ms_diff > rubric.rhythm_tolerance_ms:
            user_onset = user[p.user_idx]["startMs"]
            target_onset = target[p.target_idx]["startMs"]
            kind = "late" if user_onset > target_onset else "early"
            issues.append({
                "at": int(target_onset),
                "kind": kind,
                "msOff": int(round(p.onset_ms_diff)),
                "severity": "major" if p.onset_ms_diff > rubric.rhythm_tolerance_ms * 2 else "minor",
            })
    issues.sort(key=lambda i: i["at"])
    issues = issues[:8]

    return {
        "composite": float(composite),
        "passed": passed,
        "dimensions": {k: float(round(v, 4)) for k, v in dims.items()},
        "issues": issues,
        "xpAwarded": 12 if passed else 3,
    }


def build_feedback(result: dict, rubric_feedback_bank: dict | None) -> dict:
    """Pick a canned line from the rubric bank based on the weakest dimension."""
    dims = result["dimensions"]
    worst_dim = min(dims, key=lambda k: dims[k])
    severity = "major" if dims[worst_dim] < 0.7 else "minor"
    canned = "Nice work. Let's go again."
    if rubric_feedback_bank:
        bucket = rubric_feedback_bank.get(worst_dim, {})
        lines = bucket.get(severity) or bucket.get("minor") or []
        if lines:
            canned = random.choice(lines)
    return {"canned": canned, "worstDim": worst_dim, "severity": severity}
