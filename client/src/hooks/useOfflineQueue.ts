import { useCallback, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { drainQueue, listAttempts, pendingCount, type OfflineAttempt } from "@/lib/offlineQueue";
import { AUDIO_ENGINE_URL, toGradeResult } from "@/lib/api";
import { applyGradeToProgress, applyGradeToUser, meetsPassCriteria } from "@/lib/progress";
import { progressAtom, userAtom } from "@/atoms/session";
import { getLesson } from "@catalogs/lessonCatalog";
import { useToast } from "@/lib/toast";

/**
 * React hook: exposes pending count, full attempt list, and a manual drain
 * trigger. Automatically attempts a drain when the browser transitions back
 * online. Real grades from drained takes are applied to progress exactly like
 * a live take (offline takes never get a placeholder grade).
 */
export function useOfflineQueue() {
  const [pending, setPending] = useState(0);
  const [all, setAll] = useState<OfflineAttempt[]>([]);
  const [draining, setDraining] = useState(false);
  const setProgress = useSetAtom(progressAtom);
  const setUser = useSetAtom(userAtom);
  const toast = useToast();

  const refresh = useCallback(async () => {
    setPending(await pendingCount());
    setAll(await listAttempts());
  }, []);

  const drain = useCallback(async () => {
    if (!AUDIO_ENGINE_URL || draining) return;
    setDraining(true);
    try {
      await drainQueue(AUDIO_ENGINE_URL, (attempt, result, body) => {
        if (result !== "graded" || !body) return;
        const grade = toGradeResult(body);
        const lesson = getLesson(attempt.lessonId);
        const instrumentId = attempt.instrumentId ?? lesson?.instrumentId;
        const passed = meetsPassCriteria(grade, lesson);
        if (instrumentId) {
          setProgress((prev) => applyGradeToProgress(prev, instrumentId, attempt.lessonId, grade, passed));
        }
        setUser((u) => applyGradeToUser(u, grade, passed));
        toast.info(
          `Offline take graded: ${Math.round(grade.composite * 100)}%`,
          lesson ? `${lesson.title} · ${passed ? "passed" : "keep going"}` : undefined,
        );
      });
    } finally {
      setDraining(false);
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draining, refresh, setProgress, setUser]);

  useEffect(() => {
    refresh();
    const onOnline = () => { drain(); };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [refresh, drain]);

  return { pending, all, draining, drain, refresh };
}
