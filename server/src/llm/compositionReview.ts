/**
 * LLM-powered composition review. Genius-tier learners submit original
 * pieces; this module asks Claude (or the configured provider) to
 * evaluate the composition against a 5-dimension rubric and return
 * structured feedback — same shape the human reviewer fills in, so the
 * UI stays uniform whether the review came from a model or a person.
 *
 * The model never sees raw audio; it sees a *structured digest*
 * produced by the audio-engine (note events, harmonic profile, rhythm
 * stats). This keeps prompt size bounded + makes the scoring
 * reproducible across re-reviews.
 *
 * Output shape:
 *   {
 *     rubric: { melody, harmony, rhythm, originality, craft },  // each 0..5
 *     strengths: string[],     // 1-3 specific positives
 *     improvements: string[],  // 1-3 specific actionable critiques
 *     summary: string,         // 1-2 sentence overall verdict
 *     suggestedStatus: "approved" | "needs_revision" | "rejected"
 *   }
 *
 * Behaviour matrix:
 *   • LLM_PROVIDER=anthropic|openai → real review
 *   • Provider stub or no API key   → deterministic placeholder review
 *     so the UX still has something to render in dev
 */

import { getActiveProvider } from "./providerCatalog.js";
import { captureError } from "../observability.js";
import type { Composition } from "../compositionService.js";

export interface CompositionDigest {
  durationSec: number;
  tempoBpm?: number;
  keySignature?: string;
  instrumentId: string;
  noteCount: number;
  uniquePitches: number;
  rhythmDensity: number;        // notes per beat
  harmonicComplexity?: number;  // 0..1, from chord variety
  /** Optional textual transcription summary from the audio-engine. */
  transcriptSummary?: string;
}

export interface CompositionReviewResult {
  rubric: NonNullable<Composition["rubric"]>;
  strengths: string[];
  improvements: string[];
  summary: string;
  suggestedStatus: "approved" | "needs_revision" | "rejected";
  generatedBy: "llm" | "stub";
  model?: string;
}

/**
 * Build the composition-review system prompt. Constants (rubric scale,
 * thresholds, output format) live here so the prompt is the single
 * source of truth — the parser below assumes this exact format.
 */
function buildSystemPrompt(): string {
  return [
    "You are a senior music-school faculty reviewer evaluating original",
    "student compositions for the MusicLuv Genius tier. You hold the bar",
    "high but you teach — never demoralize.",
    "",
    "Score the composition on five dimensions, integer scale 0-5:",
    "  • melody — singability, contour, motivic development",
    "  • harmony — voice-leading, function, tension/release",
    "  • rhythm — groove, variety, internal logic",
    "  • originality — novelty within the implied style",
    "  • craft — execution polish, structural coherence",
    "",
    "Status thresholds:",
    "  • mean ≥ 4.0 → approved",
    "  • mean 2.5-3.9 → needs_revision",
    "  • mean < 2.5 → rejected",
    "",
    "Return ONLY a single JSON object with these exact keys:",
    "  rubric: { melody, harmony, rhythm, originality, craft }  // ints 0-5",
    "  strengths: string[]                  // 1-3 entries, each ≤ 140 chars",
    "  improvements: string[]               // 1-3 entries, each ≤ 140 chars, actionable",
    "  summary: string                      // 1-2 sentences",
    "  suggestedStatus: 'approved' | 'needs_revision' | 'rejected'",
    "",
    "Rules:",
    "  • Cite specifics from the digest (e.g. 'the 7-bar phrase resolution', 'rhythm density 1.8')",
    "  • Do NOT use vague platitudes ('keep it up!', 'great work!')",
    "  • Improvements MUST be actionable — name a technique or section",
    "  • No prose around the JSON — JSON only, no markdown fences",
  ].join("\n");
}

function buildUserPrompt(comp: Composition, digest: CompositionDigest): string {
  return [
    `Title: ${comp.title}`,
    comp.description ? `Description: ${comp.description}` : null,
    `Instrument: ${digest.instrumentId}`,
    `Duration: ${digest.durationSec}s`,
    digest.tempoBpm ? `Tempo: ${digest.tempoBpm} bpm` : null,
    digest.keySignature ? `Key: ${digest.keySignature}` : null,
    `Notes: ${digest.noteCount} (${digest.uniquePitches} unique pitches)`,
    `Rhythm density: ${digest.rhythmDensity.toFixed(2)} notes/beat`,
    digest.harmonicComplexity != null
      ? `Harmonic complexity: ${digest.harmonicComplexity.toFixed(2)} (0..1)`
      : null,
    digest.transcriptSummary ? `\nTranscript summary:\n${digest.transcriptSummary}` : null,
    comp.lyrics ? `\nLyrics:\n${comp.lyrics.slice(0, 800)}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Run the LLM review. Returns a stub result when no provider is
 * configured (or when the provider call fails) so the caller always
 * gets a usable result and the UX doesn't break.
 */
export async function reviewComposition(
  comp: Composition,
  digest: CompositionDigest,
): Promise<CompositionReviewResult> {
  const provider = getActiveProvider();
  if (provider.id === "stub") return stubReview(digest);

  try {
    const result = await provider.answer({
      system: buildSystemPrompt(),
      user: buildUserPrompt(comp, digest),
    });
    if (!result.ok || !result.text) {
      captureError(`composition-review provider error: ${result.error}`, { compId: comp.id });
      return stubReview(digest);
    }
    const parsed = parseReviewJson(result.text);
    if (!parsed) {
      captureError("composition-review JSON parse failed", { compId: comp.id, text: result.text });
      return stubReview(digest);
    }
    return { ...parsed, generatedBy: "llm", model: provider.model };
  } catch (err) {
    captureError(err as Error, { where: "compositionReview.reviewComposition", compId: comp.id });
    return stubReview(digest);
  }
}

/** Lenient JSON extraction — handles markdown-fenced + leading text. */
function parseReviewJson(text: string): Omit<CompositionReviewResult, "generatedBy" | "model"> | null {
  // Strip markdown fences if the model added them despite instructions.
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  // Find the first { ... } block.
  const m = cleaned.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const obj = JSON.parse(m[0]);
    if (
      !obj.rubric ||
      typeof obj.rubric.melody !== "number" ||
      typeof obj.rubric.harmony !== "number" ||
      typeof obj.rubric.rhythm !== "number" ||
      typeof obj.rubric.originality !== "number" ||
      typeof obj.rubric.craft !== "number"
    ) return null;
    if (!Array.isArray(obj.strengths) || !Array.isArray(obj.improvements)) return null;
    if (typeof obj.summary !== "string") return null;
    const status = obj.suggestedStatus;
    if (status !== "approved" && status !== "needs_revision" && status !== "rejected") return null;
    // Clamp rubric scores to 0..5.
    for (const k of ["melody", "harmony", "rhythm", "originality", "craft"] as const) {
      obj.rubric[k] = Math.max(0, Math.min(5, Math.round(obj.rubric[k])));
    }
    return {
      rubric: obj.rubric,
      strengths: obj.strengths.slice(0, 3),
      improvements: obj.improvements.slice(0, 3),
      summary: obj.summary,
      suggestedStatus: status,
    };
  } catch {
    return null;
  }
}

/**
 * Deterministic placeholder when no LLM is configured. Scores everything
 * 3 ("on track but room to grow") and emits generic but on-rubric
 * feedback so the UI doesn't show empty fields.
 */
function stubReview(digest: CompositionDigest): CompositionReviewResult {
  const dense = digest.rhythmDensity > 4;
  const sparse = digest.rhythmDensity < 1;
  return {
    rubric: { melody: 3, harmony: 3, rhythm: 3, originality: 3, craft: 3 },
    strengths: [
      `Composition runs ${digest.durationSec}s with ${digest.uniquePitches} unique pitches — workable scope.`,
      "Structural completeness — the piece reaches a resolution rather than fading mid-idea.",
    ],
    improvements: [
      dense
        ? "Rhythm density is high; carve in some space — silence is a rhythmic event."
        : sparse
          ? "Rhythm density is low; add at least one passage of denser motion to break the stasis."
          : "Audit voice-leading: aim for stepwise motion in inner voices, leaps in the outer.",
      "Reach for one motif and develop it across at least 3 phrases — repetition with variation is the craft.",
    ],
    summary:
      "Solid foundational work. Tighten the rhythmic shape and strengthen motivic development for the next pass.",
    suggestedStatus: "needs_revision",
    generatedBy: "stub",
  };
}
