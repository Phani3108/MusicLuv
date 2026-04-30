/**
 * Per-user progress store — XP, level, streak, lesson completion.
 *
 * Flat-file JSON is the authoritative store for dev + local runs.
 * When PERSISTENCE_DRIVER=postgres + DATABASE_URL are set, the same
 * writes are mirrored to Postgres (`user_progress`, `instrument_progress`,
 * `attempts` tables) so analytics queries + durable backups work.
 * The dual-write is fire-and-forget — flatfile stays the source of
 * truth during the migration window.
 */
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import { getPgPool } from "./persistence/pgClient.js";
import { captureError } from "./observability.js";

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

  const result = updateProgress(userId, {
    totalXp: cur.totalXp + grade.xpAwarded,
    currentStreak: streak,
    heartsToday: grade.passed ? cur.heartsToday : Math.max(0, cur.heartsToday - 1),
    lastPracticeAt: new Date().toISOString(),
    byInstrument: { [instrumentId]: nextInst },
  });

  // Dual-write to Postgres when configured. Fire-and-forget so grading
  // latency isn't blocked on the database. Flatfile remains the source
  // of truth until the migration is finalized.
  void persistAttemptToPg(userId, instrumentId, lessonId, grade, nextInst, result);

  // Quest engine events. Lazy-imported to avoid a circular dependency
  // (questEngine imports progressStore via updateProgress to apply
  // rewards). Each event type only matches quests of the same type, so
  // firing all three is safe — at most one will advance any given quest.
  void emitQuestEvents(userId, instrumentId, lessonId, grade);

  return result;
};

async function emitQuestEvents(
  userId: string,
  _instrumentId: string,
  lessonId: string,
  grade: { composite: number; passed: boolean; dimensions: Record<string, number>; xpAwarded: number },
): Promise<void> {
  try {
    const { recordEvent } = await import("./questEngine.js");
    if (grade.passed) {
      recordEvent({ userId, type: "complete_lesson", target: lessonId });
      recordEvent({ userId, type: "pass_exercise", target: lessonId });
      // "Perfect run" = composite ≥ 0.95. Generous enough to be reachable
      // but tight enough that not every pass triggers the reward.
      if (grade.composite >= 0.95) {
        recordEvent({ userId, type: "perfect_run", target: lessonId });
      }
    }
  } catch (err) {
    captureError(err as Error, { where: "progressStore.emitQuestEvents", lessonId });
  }
}

async function persistAttemptToPg(
  userId: string,
  instrumentId: string,
  lessonId: string,
  grade: { composite: number; passed: boolean; dimensions: Record<string, number>; xpAwarded: number },
  nextInst: InstrumentProgress,
  totals: UserProgress,
): Promise<void> {
  const pool = await getPgPool();
  if (!pool) return;
  try {
    const attemptId = `att_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    await pool.query(
      `INSERT INTO user_progress (user_id, total_xp, current_streak, hearts_today, hearts_max, last_practice_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, now())
       ON CONFLICT (user_id) DO UPDATE SET
         total_xp = EXCLUDED.total_xp,
         current_streak = EXCLUDED.current_streak,
         hearts_today = EXCLUDED.hearts_today,
         hearts_max = EXCLUDED.hearts_max,
         last_practice_at = EXCLUDED.last_practice_at,
         updated_at = now()`,
      [userId, totals.totalXp, totals.currentStreak, totals.heartsToday, totals.heartsMax, totals.lastPracticeAt],
    );
    await pool.query(
      `INSERT INTO instrument_progress (user_id, instrument_id, xp, level, lessons_completed, exams_passed, last_grade, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, now())
       ON CONFLICT (user_id, instrument_id) DO UPDATE SET
         xp = EXCLUDED.xp,
         level = EXCLUDED.level,
         lessons_completed = EXCLUDED.lessons_completed,
         exams_passed = EXCLUDED.exams_passed,
         last_grade = EXCLUDED.last_grade,
         updated_at = now()`,
      [
        userId, instrumentId, nextInst.xp, nextInst.level,
        nextInst.lessonsCompleted, nextInst.examsPassed,
        JSON.stringify(nextInst.lastGrade ?? null),
      ],
    );
    await pool.query(
      `INSERT INTO attempts (id, user_id, instrument_id, lesson_id, composite, passed, dimensions, xp_awarded, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, now())`,
      [attemptId, userId, instrumentId, lessonId, grade.composite, grade.passed, JSON.stringify(grade.dimensions), grade.xpAwarded],
    );
  } catch (err) {
    captureError(err as Error, { where: "progressStore.persistAttemptToPg", userId, instrumentId });
  }
}

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
