/**
 * Applying a grade to local progress — shared by live takes (PracticeStudio)
 * and offline takes graded later (useOfflineQueue). Only engine grades count;
 * simulated (demo-mode) grades never reach these functions.
 */
import type { Lesson } from "@catalogs/types";
import type { GradeResult } from "@/atoms/practice";
import type { InstrumentProgress, UserProfile } from "@/atoms/session";

/**
 * The rubric's pass plus the lesson's own `passCriteria`. Dimensions the
 * engine didn't grade (tone/dynamics today) are skipped, not failed.
 */
export function meetsPassCriteria(grade: GradeResult, lesson?: Pick<Lesson, "passCriteria"> | null): boolean {
  if (!grade.passed) return false;
  const criteria = lesson?.passCriteria;
  if (!criteria) return true;
  if (grade.composite < criteria.minGradeOverall) return false;
  for (const [dim, min] of Object.entries(criteria.minPerDimension ?? {})) {
    const value = grade.dimensions[dim as keyof GradeResult["dimensions"]];
    if (value != null && min != null && value < min) return false;
  }
  return true;
}

export function applyGradeToProgress(
  prev: Record<string, InstrumentProgress>,
  instrumentId: string,
  lessonId: string,
  grade: GradeResult,
  passed: boolean,
): Record<string, InstrumentProgress> {
  const cur: InstrumentProgress = prev[instrumentId] ?? { xp: 0, level: 1, lessonsCompleted: [] };
  return {
    ...prev,
    [instrumentId]: {
      ...cur,
      xp: cur.xp + grade.xpAwarded,
      lessonsCompleted: passed && lessonId
        ? Array.from(new Set([...cur.lessonsCompleted, lessonId]))
        : cur.lessonsCompleted,
      lastGrade: { lessonId, composite: grade.composite, dimensions: grade.dimensions, at: new Date().toISOString() },
    },
  };
}

export function applyGradeToUser(user: UserProfile | null, grade: GradeResult, passed: boolean): UserProfile | null {
  if (!user) return user;
  return {
    ...user,
    totalXp: user.totalXp + grade.xpAwarded,
    currentStreak: user.currentStreak || 1,
    heartsToday: passed ? user.heartsToday : Math.max(0, user.heartsToday - 1),
    practiceMinutesToday: user.practiceMinutesToday + 1,
  };
}
