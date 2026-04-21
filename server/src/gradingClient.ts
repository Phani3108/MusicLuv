/**
 * HTTP proxy to the Python audio-engine. Keeps the Node side fast and lets the
 * client hit a single origin (the Node server) without CORS dance.
 */
const AUDIO_ENGINE_URL = process.env.AUDIO_ENGINE_URL || "http://127.0.0.1:8001";

export interface GradeResponseBody {
  composite?: number;
  passed?: boolean;
  dimensions?: Record<string, number>;
  issues?: Array<Record<string, unknown>>;
  feedback?: { canned?: string };
  xpAwarded?: number;
  attemptId?: string;
  userNotesDetected?: Array<{ pitch: string; startMs: number; durationMs: number; centsOff?: number }>;
  ok?: boolean;
  error?: string;
}

export const proxyGrade = async (
  audioBuffer: Buffer,
  filename: string,
  metaJson: string
): Promise<{ status: number; body: GradeResponseBody }> => {
  const form = new FormData();
  const blob = new Blob([audioBuffer], { type: "audio/wav" });
  form.append("audio", blob, filename);
  form.append("meta", metaJson);

  const res = await fetch(`${AUDIO_ENGINE_URL}/grade`, {
    method: "POST",
    body: form,
  });
  const body = (await res.json()) as GradeResponseBody;
  return { status: res.status, body };
};

export const audioEngineHealth = async () => {
  try {
    const res = await fetch(`${AUDIO_ENGINE_URL}/health`);
    return await res.json();
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
};

/**
 * Proxy the audio-engine's deterministic synthesis endpoint. Given a
 * notes[] payload, returns the raw WAV bytes for streaming back to
 * the client. Cacheable — same notes always produce the same audio.
 */
export const renderReferenceAudio = async (
  notes: Array<{ pitch: string; startMs: number; durationMs: number }>,
  opts?: { detuneCents?: number; noise?: number; harmonics?: number },
): Promise<{ status: number; body: Buffer | null; contentType?: string }> => {
  try {
    const res = await fetch(`${AUDIO_ENGINE_URL}/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
        detune_cents: opts?.detuneCents ?? 0,
        noise_level: opts?.noise ?? 0,
        harmonics: opts?.harmonics ?? 3,
      }),
    });
    if (!res.ok) return { status: res.status, body: null };
    const arr = await res.arrayBuffer();
    return {
      status: 200,
      body: Buffer.from(arr),
      contentType: res.headers.get("content-type") ?? "audio/wav",
    };
  } catch (e) {
    return { status: 502, body: null };
  }
};
