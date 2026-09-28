/** Real audio-engine / MusicLuv server client. */
import { useEffect, useState } from "react";
import type { Exercise, Mentor } from "@catalogs/types";
import type { GradeResult } from "@/atoms/practice";
import { getRubric } from "@catalogs/gradingRubricCatalog";
import { getAccessToken } from "./supabase";
import { gradingModeFor } from "./exercise";

export { gradingModeFor, scaleExercise, type GradingMode } from "./exercise";

export const AUDIO_ENGINE_URL = (import.meta as any).env.VITE_AUDIO_ENGINE_URL as string | undefined;
export const MUSICLUV_SERVER_URL = (import.meta as any).env.VITE_SERVER_URL as string | undefined;

/** True when an audio engine is configured. Without one the app runs in demo
 *  mode: grades are simulated, clearly labelled, and never touch progress. */
export const isEngineConfigured = () => Boolean(AUDIO_ENGINE_URL);
export const isServerConnected = () => Boolean(MUSICLUV_SERVER_URL);

const GRADE_TIMEOUT_MS = 30_000;
const HEALTH_TIMEOUT_MS = 4_000;

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

/**
 * Auth headers used by every server call. When a Supabase JWT is
 * available, it's forwarded as the bearer token so the server can
 * verify the user's identity. x-user-id stays as a fallback for
 * anonymous / dev-mode sessions until Supabase is wired in production.
 */
export function serverAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "X-User-ID": getDeviceUserId(),
  };
  const token = getAccessToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function checkHealth(): Promise<{ ok: boolean; backends?: Record<string, string> }> {
  if (!AUDIO_ENGINE_URL) return { ok: false };
  try {
    const r = await fetchWithTimeout(`${AUDIO_ENGINE_URL}/health`, {}, HEALTH_TIMEOUT_MS);
    return r.ok ? await r.json() : { ok: false };
  } catch {
    return { ok: false };
  }
}

export type EngineHealth = "demo" | "checking" | "live" | "down";

/** Live engine status for the studio chip: re-checks on mount and when the
 *  browser comes back online. "demo" = no engine configured. */
export function useEngineHealth(): EngineHealth {
  const [state, setState] = useState<EngineHealth>(AUDIO_ENGINE_URL ? "checking" : "demo");
  useEffect(() => {
    if (!AUDIO_ENGINE_URL) return;
    let cancelled = false;
    const check = () => {
      checkHealth().then((h) => { if (!cancelled) setState(h.ok ? "live" : "down"); });
    };
    check();
    window.addEventListener("online", check);
    return () => { cancelled = true; window.removeEventListener("online", check); };
  }, []);
  return state;
}

export interface GradeContext {
  lessonId?: string;
  instrumentId?: string;
  /** Tempo of this take relative to the exercise (target times already scaled). */
  tempoFactor?: number;
}

/** The /grade `meta` payload. `exercise` must already be tempo-scaled. */
export function buildGradeMeta(exercise: Exercise, attemptId: string, ctx: GradeContext = {}) {
  const rubric = getRubric(exercise.gradingRubricId);
  const mode = gradingModeFor(exercise);
  const notes = exercise.targetPattern.notes ?? [];
  return {
    exerciseId: exercise.id,
    attemptId,
    lessonId: ctx.lessonId,
    instrumentId: ctx.instrumentId,
    mode,
    target: notes.map((n) => ({ pitch: n.pitch, startMs: n.startMs, durationMs: n.durationMs })),
    targetOnsets: mode === "onsets"
      ? (exercise.targetPattern.onsets?.length ? exercise.targetPattern.onsets : notes.map((n) => n.startMs))
      : undefined,
    tempoFactor: ctx.tempoFactor ?? 1,
    rubric: {
      id: rubric.id,
      weights: rubric.weights,
      passThreshold: rubric.passThreshold,
      pitchToleranceCents: rubric.pitchToleranceCents,
      rhythmToleranceMs: rubric.rhythmToleranceMs,
      feedbackBank: rubric.feedbackBank,
    },
  };
}

/** Map an engine /grade body to the client's GradeResult. */
export function toGradeResult(body: any): GradeResult {
  return {
    composite: body.composite,
    passed: body.passed,
    dimensions: body.dimensions ?? {},
    gradedDimensions: body.gradedDimensions,
    notGraded: body.notGraded,
    issues: body.issues ?? [],
    feedback: { canned: body.feedback?.canned ?? "Nice work." },
    xpAwarded: body.xpAwarded ?? 0,
    userNotesDetected: body.userNotesDetected ?? [],
    alignment: body.alignment,
    warning: body.warning,
    tempoFactor: body.tempoFactor ?? 1,
    source: "engine",
  };
}

/** Grading failed — `message` is safe to show the learner. */
export class GradeError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
  }
}

function gradeErrorMessage(status: number, detail: string): string {
  if (status === 413) return "That take is too long or too large to grade. Keep takes under 3 minutes.";
  if (status === 415) return "Your browser recorded audio in a format the grader can't read.";
  if (status === 422) return `This exercise has a problem in its target notes (${detail}). It's been logged.`;
  if (status === 429) return "Too many takes in a row — wait a moment and retry.";
  return `The grader returned an error (HTTP ${status}).`;
}

export async function realGrade(
  exercise: Exercise,
  audio: Blob,
  attemptId: string,
  ctx: GradeContext = {},
): Promise<GradeResult> {
  if (!AUDIO_ENGINE_URL) throw new GradeError("No audio engine is configured.");
  const form = new FormData();
  form.append("audio", audio, "attempt.wav");
  form.append("meta", JSON.stringify(buildGradeMeta(exercise, attemptId, ctx)));

  let r: Response;
  try {
    r = await fetchWithTimeout(`${AUDIO_ENGINE_URL}/grade`, { method: "POST", body: form }, GRADE_TIMEOUT_MS);
  } catch (e) {
    const timedOut = (e as Error)?.name === "AbortError";
    throw new GradeError(timedOut
      ? "The grader took too long to answer. Your take is kept — retry or save it for later."
      : "Couldn't reach the grader. Your take is kept — retry or save it for later.");
  }
  if (!r.ok) {
    const detail = (await r.text().catch(() => "")).slice(0, 120);
    throw new GradeError(gradeErrorMessage(r.status, detail), r.status);
  }
  return toGradeResult(await r.json());
}

// ---- Mentor chat against the MusicLuv server ----

export interface MentorMessageOpts {
  mentor: Mentor;
  userName?: string;
  /** The server looks the lesson up itself; client-supplied lesson text is not trusted. */
  lessonId?: string;
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
    lessonId: opts.lessonId,
    lesson: opts.lesson,
    recent: opts.recent,
    message: opts.message,
  };
  const r = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/mentor/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
    body: JSON.stringify(body),
  });
  if (!r.ok) return null;
  return (await r.json()) as MentorMessageResult;
}
