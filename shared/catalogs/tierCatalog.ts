import type { TierEntry, Tier } from "./types";

export const TIERS: TierEntry[] = [
  { levelId: 1, tier: "standard", label: "Absolute beginner",     xpThreshold: 0,     color: "#94a3b8" },
  { levelId: 2, tier: "standard", label: "Getting comfortable",   xpThreshold: 200,   color: "#a5b4fc" },
  { levelId: 3, tier: "standard", label: "First songs",           xpThreshold: 600,   color: "#818cf8" },
  { levelId: 4, tier: "pro",      label: "Pro entrant",           xpThreshold: 1500,  color: "#fbbf24" },
  { levelId: 5, tier: "pro",      label: "Pro player",            xpThreshold: 3500,  color: "#f59e0b" },
  { levelId: 6, tier: "pro",      label: "Pro advanced",          xpThreshold: 7000,  color: "#ea580c" },
  { levelId: 7, tier: "genius",   label: "Genius — technical",    xpThreshold: 12000, color: "#ec4899" },
  { levelId: 8, tier: "genius",   label: "Genius — interpretive", xpThreshold: 20000, color: "#d946ef" },
  { levelId: 9, tier: "genius",   label: "Maestro",               xpThreshold: 35000, color: "#a855f7" },
];

export const XP_EVENTS = {
  practice_minute:   1,
  exercise_pass:     5,
  lesson_complete:   12,
  perfect_run:       8,
  streak_day:        10,
  recital_submit:    50,
  peer_feedback:     6,
  first_scale:       15,
  first_raga:        25,
  first_composition: 40,
  teach_peer:        25,
} as const;

export const tierForXp = (xp: number): TierEntry => {
  let current = TIERS[0];
  for (const t of TIERS) if (xp >= t.xpThreshold) current = t;
  return current;
};

export const nextTier = (xp: number): TierEntry | undefined =>
  TIERS.find((t) => t.xpThreshold > xp);

export const tierLabel = (t: Tier) =>
  t === "standard" ? "Standard" : t === "pro" ? "Pro" : "Genius";
