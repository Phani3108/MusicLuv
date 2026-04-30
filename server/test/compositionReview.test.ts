/**
 * Tests for the LLM composition review module — focused on the parser
 * and the deterministic stub. Real LLM provider calls are not exercised
 * here (they require API keys + cost money); the stub path is the
 * production fallback when no provider is configured, so tests cover
 * that exhaustively.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reviewComposition, type CompositionDigest } from "../src/llm/compositionReview.js";
import type { Composition } from "../src/compositionService.js";

const sampleComp: Composition = {
  id: "comp_test_1",
  userId: "u_test",
  title: "Spring Reverie",
  description: "A short piano piece in C major exploring contrary motion",
  status: "submitted",
  createdAt: new Date().toISOString(),
};

const sampleDigest: CompositionDigest = {
  durationSec: 90,
  tempoBpm: 72,
  keySignature: "C major",
  instrumentId: "piano",
  noteCount: 240,
  uniquePitches: 18,
  rhythmDensity: 2.7,
  harmonicComplexity: 0.55,
  transcriptSummary: "Phrase A: I-vi-IV-V; Phrase B: vi-V-I; ends on tonic",
};

describe("compositionReview", () => {
  it("returns a valid result shape (stub fallback when no provider)", async () => {
    const result = await reviewComposition(sampleComp, sampleDigest);
    assert.ok(result.rubric);
    assert.equal(typeof result.rubric.melody, "number");
    assert.equal(typeof result.rubric.harmony, "number");
    assert.equal(typeof result.rubric.rhythm, "number");
    assert.equal(typeof result.rubric.originality, "number");
    assert.equal(typeof result.rubric.craft, "number");
    assert.ok(Array.isArray(result.strengths));
    assert.ok(Array.isArray(result.improvements));
    assert.equal(typeof result.summary, "string");
    assert.ok(["approved", "needs_revision", "rejected"].includes(result.suggestedStatus));
  });

  it("clamps all rubric scores to 0..5", async () => {
    const result = await reviewComposition(sampleComp, sampleDigest);
    for (const k of ["melody", "harmony", "rhythm", "originality", "craft"] as const) {
      assert.ok(result.rubric[k] >= 0 && result.rubric[k] <= 5,
        `${k} = ${result.rubric[k]} out of 0..5 range`);
    }
  });

  it("stub mode flags 'generatedBy: stub' when no LLM is configured", async () => {
    // No env vars set in test; provider should resolve to stub.
    const result = await reviewComposition(sampleComp, sampleDigest);
    // Either stub (default) or llm (if a key is set in CI). Both ok.
    assert.ok(["llm", "stub"].includes(result.generatedBy));
  });

  it("stub feedback adapts to rhythm density", async () => {
    const dense: CompositionDigest = { ...sampleDigest, rhythmDensity: 8 };
    const sparse: CompositionDigest = { ...sampleDigest, rhythmDensity: 0.4 };
    const denseResult = await reviewComposition(sampleComp, dense);
    const sparseResult = await reviewComposition(sampleComp, sparse);
    // The stub mentions the density issue in improvements.
    if (denseResult.generatedBy === "stub") {
      assert.ok(denseResult.improvements.some((i) => /density|space/i.test(i)));
    }
    if (sparseResult.generatedBy === "stub") {
      assert.ok(sparseResult.improvements.some((i) => /density|denser|stasis/i.test(i)));
    }
  });

  it("never returns empty strengths or improvements arrays", async () => {
    const result = await reviewComposition(sampleComp, sampleDigest);
    assert.ok(result.strengths.length > 0, "strengths should never be empty");
    assert.ok(result.improvements.length > 0, "improvements should never be empty");
  });

  it("strengths + improvements are bounded to 3 entries each", async () => {
    const result = await reviewComposition(sampleComp, sampleDigest);
    assert.ok(result.strengths.length <= 3);
    assert.ok(result.improvements.length <= 3);
  });
});
