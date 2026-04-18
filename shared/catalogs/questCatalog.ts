import type { Quest } from "./types";

export const QUESTS: Record<string, Quest> = {
  daily_10min: {
    id: "daily_10min",
    title: "Daily practice",
    blurb: "Play for 10 minutes today.",
    scope: "daily",
    goal: { type: "play_minutes", count: 10 },
    reward: { xp: 20, hearts: 1 },
    progress: 6,
  },
  pass_first_lesson: {
    id: "pass_first_lesson",
    title: "First lesson",
    blurb: "Pass your first piano lesson.",
    scope: "mastery",
    instrumentId: "piano",
    goal: { type: "complete_lesson", target: "piano_l1_01_hand_shape", count: 1 },
    reward: { xp: 40, badgeId: "first_lesson" },
    progress: 0,
  },
  master_cmajor_scale: {
    id: "master_cmajor_scale",
    title: "C-major 5-finger mastery",
    blurb: "Get a perfect run on the C-major 5-finger ascent.",
    scope: "mastery",
    instrumentId: "piano",
    goal: { type: "perfect_run", target: "piano_l1_01_scale5", count: 1 },
    reward: { xp: 100, badgeId: "cmajor_master" },
    progress: 0,
  },
  first_raga_yaman: {
    id: "first_raga_yaman",
    title: "First raga — Yaman",
    blurb: "Complete 3 Yaman lessons on sitar.",
    scope: "mastery",
    instrumentId: "sitar",
    goal: { type: "complete_lesson", target: "yaman", count: 3 },
    reward: { xp: 150, badgeId: "yaman_initiate" },
    progress: 1,
  },
  seven_day_streak: {
    id: "seven_day_streak",
    title: "7-day streak",
    blurb: "Practice every day for a week.",
    scope: "streak",
    goal: { type: "play_minutes", count: 7 },
    reward: { xp: 80, badgeId: "streak_7" },
    progress: 3,
  },
};

export const listDailyQuests = () =>
  Object.values(QUESTS).filter((q) => q.scope === "daily" || q.scope === "streak");

export const listMasteryQuests = (instrumentId?: string) =>
  Object.values(QUESTS).filter((q) => q.scope === "mastery" && (!instrumentId || q.instrumentId === instrumentId));
