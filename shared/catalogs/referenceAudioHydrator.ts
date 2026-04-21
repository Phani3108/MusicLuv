/**
 * Hydrate every lesson's audioRefs[].url so the client has a real,
 * playable reference for every audio slot. URLs point at the server's
 * /api/v1/reference-audio/:lessonId[/:refId] endpoint, which in turn
 * calls the audio-engine's deterministic /render pipeline.
 *
 * We don't know the server URL at catalog-construction time, so URLs
 * are stored as relative paths. Client-side, `lib/api.ts` prefixes
 * MUSICLUV_SERVER_URL before playback.
 *
 * Safe to call repeatedly — the function checks for existing url
 * fields before overwriting, so hand-authored URLs (e.g. from a future
 * educator content sprint) are preserved.
 */
import type { Lesson } from "./types";

export function hydrateLessonAudioRefs(lessons: Record<string, Lesson>): void {
  for (const lesson of Object.values(lessons)) {
    // Top-level audioRefs — the "reference performance" clips shown in
    // LessonPanel. Point at the lesson-level endpoint.
    for (const ref of lesson.audioRefs) {
      if (!ref.url) {
        ref.url = `/api/v1/reference-audio/${lesson.id}`;
      }
    }
    // Demo clips inside drills — each gets its own synthesized preview
    // at the requested tempo.
    const demos = lesson.drills?.demo;
    if (demos && demos.length > 0) {
      for (const clip of demos) {
        if (!("audioUrl" in clip) || !(clip as any).audioUrl) {
          (clip as any).audioUrl = `/api/v1/reference-audio/${lesson.id}/${clip.id}`;
        }
      }
    }
  }
}
