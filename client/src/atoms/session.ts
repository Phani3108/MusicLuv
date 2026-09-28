import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { DimScores } from "@catalogs/types";

export interface UserProfile {
  username: string;
  displayName: string;
  joinedAt: string;
  totalXp: number;                               // cross-instrument overall
  currentStreak: number;
  heartsToday: number;
  heartsMax: number;
  practiceMinutesToday: number;
  /** ISO timestamp of onboarding completion. If missing, re-run the flow. */
  onboardedAt?: string;
  /** Mic permission explicitly granted + gain-checked during onboarding. */
  micCheckedAt?: string;
}

export interface InstrumentProgress {
  xp: number;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  lessonsCompleted: string[];
  lastGrade?: { lessonId: string; composite: number; dimensions: Partial<DimScores>; at: string };
}

export const userAtom = atomWithStorage<UserProfile | null>("musicluv:user", null, undefined, { getOnInit: true });

export const progressAtom = atomWithStorage<Record<string, InstrumentProgress>>("musicluv:progress", {});

// Persisted so a reload lands back in the studio on the same lesson instead of
// a blank page. getOnInit reads storage on first render (no null flash).
export const currentInstrumentAtom = atomWithStorage<string | null>(
  "musicluv:currentInstrument", null, undefined, { getOnInit: true },
);
export const currentLessonIdAtom = atomWithStorage<string | null>(
  "musicluv:currentLesson", null, undefined, { getOnInit: true },
);

export type Screen = "welcome" | "mic_check" | "picker" | "studio";
export const screenAtom = atom<Screen>("welcome");

// Mobile-friendly nav drawer (grouped panel access)
export const navDrawerOpenAtom = atom<boolean>(false);
