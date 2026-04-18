/** Real audio-engine client. Activated when VITE_AUDIO_ENGINE_URL is set. */
import type { Exercise } from "@catalogs/types";
import type { GradeResult } from "@/atoms/practice";
import { getRubric } from "@catalogs/gradingRubricCatalog";

export const AUDIO_ENGINE_URL = (import.meta as any).env.VITE_AUDIO_ENGINE_URL as string | undefined;
export const isRealBackend = () => Boolean(AUDIO_ENGINE_URL);

export async function checkHealth(): Promise<{ ok: boolean; backends?: Record<string, string> }> {
  if (!AUDIO_ENGINE_URL) return { ok: false };
  const r = await fetch(`${AUDIO_ENGINE_URL}/health`);
  return r.json();
}

export async function realGrade(
  exercise: Exercise,
  audio: Blob,
  attemptId: string,
): Promise<GradeResult> {
  if (!AUDIO_ENGINE_URL) throw new Error("AUDIO_ENGINE_URL not set");
  const rubric = getRubric(exercise.gradingRubricId);

  const meta = {
    exerciseId: exercise.id,
    userId: "local",
    attemptId,
    target: (exercise.targetPattern.notes ?? []).map((n) => ({
      pitch: n.pitch, startMs: n.startMs, durationMs: n.durationMs,
    })),
    rubric: {
      id: rubric.id,
      weights: rubric.weights,
      passThreshold: rubric.passThreshold,
      pitchToleranceCents: rubric.pitchToleranceCents,
      rhythmToleranceMs: rubric.rhythmToleranceMs,
      feedbackBank: rubric.feedbackBank,
    },
  };

  const form = new FormData();
  form.append("audio", audio, "attempt.wav");
  form.append("meta", JSON.stringify(meta));

  const r = await fetch(`${AUDIO_ENGINE_URL}/grade`, { method: "POST", body: form });
  if (!r.ok) throw new Error(`grade failed: HTTP ${r.status}`);
  const body = await r.json();

  return {
    composite: body.composite,
    passed: body.passed,
    dimensions: body.dimensions,
    issues: body.issues ?? [],
    feedback: { canned: body.feedback?.canned ?? "Nice work." },
    xpAwarded: body.xpAwarded ?? 0,
  };
}
