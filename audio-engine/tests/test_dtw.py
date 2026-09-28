import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest

from pipelines.dtw import align


def _notes(seq):
    return [{"pitch": p, "startMs": s, "durationMs": d} for p, s, d in seq]


SCALE3 = _notes([("C4", 0, 500), ("D4", 500, 500), ("E4", 1000, 500)])


def test_identity_alignment_zero_cost():
    user = [dict(n) for n in SCALE3]
    a = align(SCALE3, user)
    assert len(a.pairs) == 3
    assert a.total_cost == 0.0
    for p in a.pairs:
        assert p.cents_diff == 0
        assert p.onset_ms_diff == 0


def test_cents_are_continuous_not_semitone_quantized():
    user = [dict(n) for n in SCALE3]
    user[1]["centsOff"] = -30          # D4, 30 cents flat
    a = align(SCALE3, user)
    assert a.pairs[1].cents_diff == pytest.approx(-30)


def test_measured_hz_wins_over_note_name():
    user = [dict(n) for n in SCALE3]
    user[0]["hz"] = 261.626 * 2 ** (20 / 1200)   # C4 + 20 cents
    a = align(SCALE3, user)
    assert a.pairs[0].cents_diff == pytest.approx(20, abs=0.5)


def test_semitone_error_is_signed():
    user = _notes([("C#4", 0, 500), ("D4", 500, 500), ("E4", 1000, 500)])
    a = align(SCALE3, user)
    assert a.pairs[0].cents_diff == pytest.approx(100)
    assert a.pairs[1].cents_diff == 0


def test_flat_and_sharp_spellings_align():
    target = _notes([("Eb4", 0, 500), ("Bb4", 500, 500)])
    user = _notes([("D#4", 0, 500), ("A#4", 500, 500)])
    a = align(target, user)
    assert [p.cents_diff for p in a.pairs] == [0, 0]


def test_late_start_is_an_offset_not_a_timing_error():
    user = [dict(n, startMs=n["startMs"] + 1500) for n in SCALE3]
    a = align(SCALE3, user)
    assert a.start_offset_ms == pytest.approx(1500)
    assert all(p.onset_ms_diff == pytest.approx(0) for p in a.pairs)


def test_uniform_rush_is_a_tempo_ratio():
    target = _notes([(p, i * 500, 500) for i, p in enumerate(["C4", "D4", "E4", "F4", "G4"])])
    user = _notes([(p, i * 400, 400) for i, p in enumerate(["C4", "D4", "E4", "F4", "G4"])])
    a = align(target, user)
    assert a.tempo_ratio == pytest.approx(0.8, abs=0.01)
    assert max(abs(p.onset_ms_diff) for p in a.pairs) < 5


def test_one_early_note_shows_as_residual():
    target = _notes([(p, i * 500, 500) for i, p in enumerate(["C4", "D4", "E4", "F4", "G4"])])
    user = [dict(n) for n in target]
    user[2]["startMs"] = 850           # E4 150 ms early
    a = align(target, user)
    assert a.pairs[2].onset_ms_diff == pytest.approx(-150, abs=5)
    assert abs(a.pairs[1].onset_ms_diff) < 5


def test_leading_noise_is_free_and_not_paired():
    user = _notes([("A2", 0, 150)]) + [dict(n, startMs=n["startMs"] + 2000) for n in SCALE3]
    a = align(SCALE3, user)
    assert [(p.target_idx, p.user_idx) for p in a.pairs] == [(0, 1), (1, 2), (2, 3)]
    assert a.extra_user_interior == []
    assert a.path[0] == (-1, 0)


def test_interior_extra_note_is_reported():
    user = _notes([("C4", 0, 500), ("G4", 250, 200), ("D4", 500, 500), ("E4", 1000, 500)])
    a = align(SCALE3, user)
    assert a.extra_user_interior == [1]
    assert len(a.pairs) == 3


def test_missed_note_is_reported():
    user = _notes([("C4", 0, 500), ("E4", 1000, 500)])
    a = align(SCALE3, user)
    assert a.missed_targets == [1]


def test_repeated_notes_pair_in_order():
    target = _notes([("C4", 0, 500), ("C4", 500, 500), ("G4", 1000, 500), ("G4", 1500, 500)])
    user = [dict(n) for n in target]
    a = align(target, user)
    assert [(p.target_idx, p.user_idx) for p in a.pairs] == [(0, 0), (1, 1), (2, 2), (3, 3)]


def test_onsets_mode_ignores_pitch():
    target = [{"startMs": t} for t in (0, 500, 1000, 1500)]
    user = [{"startMs": t + 300} for t in (0, 500, 1000, 1500)]
    a = align(target, user, mode="onsets")
    assert len(a.pairs) == 4
    assert a.start_offset_ms == pytest.approx(300)


def test_relative_tuning_mode_removes_global_offset():
    user = [dict(n, centsOff=-30) for n in SCALE3]
    absolute = align(SCALE3, user)
    relative = align(SCALE3, user, tuning_mode="relative")
    assert absolute.pairs[0].cents_diff == pytest.approx(-30)
    assert relative.tuning_offset_cents == pytest.approx(-30)
    assert relative.pairs[0].cents_diff == pytest.approx(0)


def test_empty_inputs_do_not_crash():
    a = align(SCALE3, [])
    assert a.pairs == [] and a.missed_targets == [0, 1, 2]
