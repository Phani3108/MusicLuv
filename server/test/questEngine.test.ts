/**
 * Tests for the quest engine. The real catalog is injected via
 * __setQuestsForTest so we don't depend on tsx's --test runner being
 * able to see named exports of path-aliased TS modules (it can't,
 * reliably). The injection also gives us a fixed test universe.
 */
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import {
  recordEvent,
  getUserQuests,
  resetUserQuests,
  __setQuestsForTest,
} from "../src/questEngine.js";

const TEST_QUESTS = {
  daily_10min: {
    id: "daily_10min",
    title: "Daily practice",
    blurb: "10 minutes today",
    scope: "daily" as const,
    goal: { type: "play_minutes" as const, count: 10 },
    reward: { xp: 20, hearts: 1 },
  },
  pass_first_lesson: {
    id: "pass_first_lesson",
    title: "First lesson",
    blurb: "Pass piano L1.1",
    scope: "mastery" as const,
    instrumentId: "piano",
    goal: {
      type: "complete_lesson" as const,
      target: "piano_l1_01_hand_shape",
      count: 1,
    },
    reward: { xp: 40, badgeId: "first_lesson" },
  },
  master_cmajor_scale: {
    id: "master_cmajor_scale",
    title: "C major mastery",
    blurb: "Perfect run",
    scope: "mastery" as const,
    instrumentId: "piano",
    goal: {
      type: "perfect_run" as const,
      target: "piano_l1_01_scale5",
      count: 1,
    },
    reward: { xp: 100, badgeId: "cmajor_master" },
  },
};

const TEST_USER = `test_user_${Date.now()}_${Math.random().toString(36).slice(2)}`;

describe("questEngine", () => {
  before(() => {
    __setQuestsForTest(TEST_QUESTS);
  });

  it("returns initialized quest states for a new user", () => {
    const states = getUserQuests(TEST_USER);
    assert.equal(states.length, Object.keys(TEST_QUESTS).length);
    for (const s of states) {
      assert.equal(s.progress, 0);
      assert.equal(s.completed, false);
      assert.equal(s.rewardClaimed, false);
      assert.ok(s.goalCount > 0);
    }
  });

  it("recordEvent advances matching quests and ignores non-matching", () => {
    resetUserQuests(TEST_USER);
    recordEvent({
      userId: TEST_USER,
      type: "complete_lesson",
      target: "piano_l1_01_hand_shape",
    });
    const after = getUserQuests(TEST_USER);
    const passFirst = after.find((q) => q.questId === "pass_first_lesson");
    assert.ok(passFirst);
    assert.equal(passFirst!.progress, 1);
    assert.equal(passFirst!.completed, true);

    const masterScale = after.find((q) => q.questId === "master_cmajor_scale");
    assert.ok(masterScale);
    assert.equal(masterScale!.progress, 0);
  });

  it("does not double-reward on repeated events", () => {
    resetUserQuests(TEST_USER);
    recordEvent({ userId: TEST_USER, type: "complete_lesson", target: "piano_l1_01_hand_shape" });
    const completed1 = recordEvent({ userId: TEST_USER, type: "complete_lesson", target: "piano_l1_01_hand_shape" });
    assert.equal(completed1.length, 0, "completed list should be empty on replay");
  });

  it("matches type-only quests when no target is set", () => {
    resetUserQuests(TEST_USER);
    recordEvent({ userId: TEST_USER, type: "play_minutes", amount: 5 });
    recordEvent({ userId: TEST_USER, type: "play_minutes", amount: 5 });
    const after = getUserQuests(TEST_USER);
    const daily = after.find((q) => q.questId === "daily_10min");
    assert.ok(daily);
    assert.equal(daily!.progress, 10);
    assert.equal(daily!.completed, true);
  });

  it("ignores events for the wrong target", () => {
    resetUserQuests(TEST_USER);
    recordEvent({
      userId: TEST_USER,
      type: "complete_lesson",
      target: "piano_l9_99_imaginary",
    });
    const after = getUserQuests(TEST_USER);
    const passFirst = after.find((q) => q.questId === "pass_first_lesson");
    assert.equal(passFirst!.progress, 0);
  });

  it("clamps progress at goalCount", () => {
    resetUserQuests(TEST_USER);
    recordEvent({ userId: TEST_USER, type: "play_minutes", amount: 9999 });
    const daily = getUserQuests(TEST_USER).find((q) => q.questId === "daily_10min");
    assert.ok(daily!.progress <= daily!.goalCount);
  });
});
