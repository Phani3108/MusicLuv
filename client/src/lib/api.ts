/** Real audio-engine / MusicLuv server client. */
import type { Exercise, Mentor } from "@catalogs/types";
import type { GradeResult } from "@/atoms/practice";
import { getRubric } from "@catalogs/gradingRubricCatalog";

export const AUDIO_ENGINE_URL = (import.meta as any).env.VITE_AUDIO_ENGINE_URL as string | undefined;
export const MUSICLUV_SERVER_URL = (import.meta as any).env.VITE_SERVER_URL as string | undefined;

export const isRealBackend = () => Boolean(AUDIO_ENGINE_URL);
export const isServerConnected = () => Boolean(MUSICLUV_SERVER_URL);

/** Local device user id — persists across page loads. No auth, just a nanoid. */
export function getDeviceUserId(): string {
  const KEY = "musicluv:deviceId";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = "d_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    localStorage.setItem(KEY, id);
  }
  return id;
}

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
    userNotesDetected: body.userNotesDetected ?? [],
  };
}

// ---- Mentor chat against the MusicLuv server ----

export interface MentorMessageOpts {
  mentor: Mentor;
  userName?: string;
  lesson?: { title: string; level: number; tier: "standard" | "pro" | "genius"; objectives: string[] };
  recent?: Array<{ lessonTitle?: string; composite: number; weakestDim: string; at: string }>;
  message: string;
}

export interface MentorMessageResult {
  ok: boolean;
  text: string;
  channel: "llm" | "fallback";
  stub?: boolean;
  provider?: string;
  reason?: string;
}

export async function sendMentorMessage(opts: MentorMessageOpts): Promise<MentorMessageResult | null> {
  if (!MUSICLUV_SERVER_URL) return null;
  const body = {
    mentor: {
      id: opts.mentor.id,
      name: opts.mentor.name,
      bio: opts.mentor.bio,
      expertise: [...opts.mentor.instrumentExpertise, ...opts.mentor.styleExpertise],
      defaultLines: opts.mentor.defaultLines,
      registerPrompt: opts.mentor.registerPrompt,
    },
    userName: opts.userName,
    lesson: opts.lesson,
    recent: opts.recent,
    message: opts.message,
  };
  const r = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/mentor/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-ID": getDeviceUserId() },
    body: JSON.stringify(body),
  });
  if (!r.ok) return null;
  return (await r.json()) as MentorMessageResult;
}
