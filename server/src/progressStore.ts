/**
 * Per-user progress store — XP, level, streak, lesson completion.
 * Flat-file JSON for now (3DWorld pattern). Postgres adapter lands in Phase 5.
 */
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";

export interface InstrumentProgress {
  xp: number;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  lessonsCompleted: string[];
  examsPassed: string[];
  lastGrade?: {
    lessonId: string;
    composite: number;
    dimensions: Record<string, number>;
    at: string;
  };
}

export interface UserProgress {
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalXp: number;
  currentStreak: number;
  heartsToday: number;
  heartsMax: number;
  lastPracticeAt?: string;
  byInstrument: Record<string, InstrumentProgress>;
}

const FILE = dataPath("progress.json");
type Store = Record<string, UserProgress>;

let store: Store = readJsonSafe<Store>(FILE, {});

const persist = (() => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      try {
        atomicWriteJson(FILE, store);
      } catch (e) {
        console.error("[progressStore] persist failed:", (e as Error).message);
      }
    }, 1500);
    timer.unref?.();
  };
})();

export const getProgress = (userId: string): UserProgress => {
  if (!store[userId]) {
    const now = new Date().toISOString();
    store[userId] = {
      userId,
      createdAt: now,
      updatedAt: now,
      totalXp: 0,
      currentStreak: 0,
      heartsToday: 5,
      heartsMax: 5,
      byInstrument: {},
    };
    persist();
  }
  return store[userId];
};

export const updateProgress = (userId: string, patch: Partial<UserProgress>): UserProgress => {
  const cur = getProgress(userId);
  const next: UserProgress = {
    ...cur,
    ...patch,
    byInstrument: { ...cur.byInstrument, ...(patch.byInstrument ?? {}) },
    updatedAt: new Date().toISOString(),
  };
  store[userId] = next;
  persist();
  return next;
};

export const recordAttempt = (
  userId: string,
  instrumentId: string,
  lessonId: string,
  grade: { composite: number; passed: boolean; dimensions: Record<string, number>; xpAwarded: number }
): UserProgress => {
  const cur = getProgress(userId);
  const prevInst = cur.byInstrument[instrumentId] ?? {
    xp: 0,
    level: 1 as const,
    lessonsCompleted: [],
    examsPassed: [],
  };
  const lessonsCompleted = grade.passed
    ? Array.from(new Set([...prevInst.lessonsCompleted, lessonId]))
    : prevInst.lessonsCompleted;

  const newXp = prevInst.xp + grade.xpAwarded;
  const nextInst: InstrumentProgress = {
    ...prevInst,
    xp: newXp,
    level: levelForXp(newXp),
    lessonsCompleted,
    lastGrade: {
      lessonId,
      composite: grade.composite,
      dimensions: grade.dimensions,
      at: new Date().toISOString(),
    },
  };

  const today = new Date().toISOString().slice(0, 10);
  const lastPracticeDay = cur.lastPracticeAt?.slice(0, 10);
  const streak =
    lastPracticeDay === today
      ? cur.currentStreak
      : isYesterday(cur.lastPracticeAt)
        ? cur.currentStreak + 1
        : 1;

  return updateProgress(userId, {
    totalXp: cur.totalXp + grade.xpAwarded,
    currentStreak: streak,
    heartsToday: grade.passed ? cur.heartsToday : Math.max(0, cur.heartsToday - 1),
    lastPracticeAt: new Date().toISOString(),
    byInstrument: { [instrumentId]: nextInst },
  });
};

/** Mirror of tierCatalog XP thresholds. Kept here to avoid a server-side
 *  import cycle with the shared catalogs package. If `tierCatalog.ts`
 *  thresholds change, update both places.
 *  Thresholds: L1=0 · L2=200 · L3=600 · L4=1500 · L5=3500 · L6=7000
 *              L7=12000 · L8=20000 · L9=35000
 */
const XP_THRESHOLDS: Array<[1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number]> = [
  [9, 35000], [8, 20000], [7, 12000], [6, 7000], [5, 3500],
  [4, 1500], [3, 600], [2, 200], [1, 0],
];
export const levelForXp = (xp: number): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 => {
  for (const [level, threshold] of XP_THRESHOLDS) {
    if (xp >= threshold) return level;
  }
  return 1;
};

const isYesterday = (iso?: string): boolean => {
  if (!iso) return false;
  const d = new Date(iso);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toISOString().slice(0, 10) === y.toISOString().slice(0, 10);
};
