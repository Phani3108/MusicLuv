import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { GradeResult } from "@/atoms/practice";
import { applyGradeToProgress, applyGradeToUser, meetsPassCriteria } from "./progress.ts";

const grade = (over: Partial<GradeResult> = {}): GradeResult => ({
  composite: 0.8, passed: true, dimensions: { pitch: 0.9, rhythm: 0.7, consistency: 0.8 },
  issues: [], feedback: { canned: "" }, xpAwarded: 12, source: "engine", ...over,
});

describe("meetsPassCriteria", () => {
  it("requires the rubric pass first", () => {
    assert.equal(meetsPassCriteria(grade({ passed: false }), null), false);
  });
  it("applies the lesson's overall and per-dimension minimums", () => {
    const lesson = { passCriteria: { minGradeOverall: 0.75, minPerDimension: { pitch: 0.8, rhythm: 0.75 } } };
    assert.equal(meetsPassCriteria(grade(), lesson), false);                 // rhythm 0.70 < 0.75
    assert.equal(meetsPassCriteria(grade({ dimensions: { pitch: 0.9, rhythm: 0.8 } }), lesson), true);
    assert.equal(meetsPassCriteria(grade({ composite: 0.7 }), { passCriteria: { minGradeOverall: 0.72 } }), false);
  });
  it("skips dimensions the engine didn't grade instead of failing them", () => {
    const lesson = { passCriteria: { minGradeOverall: 0.7, minPerDimension: { tone: 0.9 } } };
    assert.equal(meetsPassCriteria(grade(), lesson), true);
  });
});

describe("applying a grade", () => {
  it("adds XP, completes the lesson only when passed, records the last grade", () => {
    const passed = applyGradeToProgress({}, "piano", "l1", grade(), true);
    assert.equal(passed.piano.xp, 12);
    assert.deepEqual(passed.piano.lessonsCompleted, ["l1"]);
    const failed = applyGradeToProgress({}, "piano", "l1", grade({ xpAwarded: 3 }), false);
    assert.deepEqual(failed.piano.lessonsCompleted, []);
    assert.equal(failed.piano.lastGrade?.lessonId, "l1");
  });
  it("only costs a heart on a failed take", () => {
    const user = { username: "u", displayName: "U", joinedAt: "", totalXp: 0, currentStreak: 0,
                   heartsToday: 5, heartsMax: 5, practiceMinutesToday: 0 };
    assert.equal(applyGradeToUser(user, grade(), true)!.heartsToday, 5);
    assert.equal(applyGradeToUser(user, grade(), false)!.heartsToday, 4);
  });
});
