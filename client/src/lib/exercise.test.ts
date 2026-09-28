import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { Exercise } from "@catalogs/types";
import { gradingModeFor, scaleExercise } from "./exercise.ts";

const base = (over: Partial<Exercise> = {}): Exercise => ({
  id: "x", type: "play_along", instrumentId: "piano", title: "x",
  targetPattern: { notes: [{ pitch: "C4", startMs: 0, durationMs: 500 }, { pitch: "D4", startMs: 500, durationMs: 500 }] },
  tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  ...over,
});

describe("gradingModeFor", () => {
  it("grades pitched exercises on notes", () => {
    assert.equal(gradingModeFor(base()), "notes");
  });
  it("grades clap exercises on onsets even when they carry note targets", () => {
    assert.equal(gradingModeFor(base({ type: "rhythm_clap" })), "onsets");
  });
  it("grades onset-only patterns (drums, tabla) on onsets", () => {
    assert.equal(gradingModeFor(base({ targetPattern: { onsets: [0, 500, 1000] } })), "onsets");
  });
});

describe("scaleExercise", () => {
  it("stretches the timeline for a half-speed take", () => {
    const slow = scaleExercise(base({ targetPattern: { notes: base().targetPattern.notes, onsets: [0, 500] } }), 0.5);
    assert.deepEqual(slow.targetPattern.notes!.map((n) => [n.startMs, n.durationMs]), [[0, 1000], [1000, 1000]]);
    assert.deepEqual(slow.targetPattern.onsets, [0, 1000]);
    assert.equal(slow.tempo.bpm, 30);
  });
  it("is the identity at full tempo", () => {
    const ex = base();
    assert.equal(scaleExercise(ex, 1), ex);
  });
});
