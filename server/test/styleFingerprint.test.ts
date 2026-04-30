/**
 * Pure-function tests for style fingerprint matching.
 *
 * Run with `node --test --experimental-strip-types test/`.
 * No extra deps — uses Node 20+ built-in node:test runner.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scoreStyleMatch, type AttemptFeatures } from "../src/styleFingerprint.js";

const ravi = {
  id: "ravi_shankar",
  name: "Pandit Ravi Shankar",
} as any;

const hendrix = {
  id: "jimi_hendrix",
  name: "Jimi Hendrix",
} as any;

const unknown = {
  id: "totally_made_up",
  name: "Made Up Artist",
} as any;

describe("styleFingerprint.scoreStyleMatch", () => {
  it("returns a 0..1 score with sub-scores per dimension", () => {
    const features: AttemptFeatures = {
      pitchMean: 300,
      pitchStd: 120,
      rhythmDensity: 3,
      ornamentRate: 30,
      mfccCentroid: 0.45,
      vibratoHz: 5,
      vibratoDepthCents: 40,
    };
    const result = scoreStyleMatch(ravi, features);
    assert.ok(result.score >= 0 && result.score <= 1);
    assert.ok(typeof result.breakdown === "object");
  });

  it("a perfect Ravi Shankar match scores higher than a Hendrix match", () => {
    // Perfect Ravi features.
    const raviFeatures: AttemptFeatures = {
      pitchMean: 300, pitchStd: 120, rhythmDensity: 3,
      ornamentRate: 30, mfccCentroid: 0.45, vibratoHz: 5, vibratoDepthCents: 40,
    };
    const raviScore = scoreStyleMatch(ravi, raviFeatures).score;
    const hendrixScore = scoreStyleMatch(hendrix, raviFeatures).score;
    assert.ok(raviScore > hendrixScore, `expected raviScore > hendrixScore, got ${raviScore} vs ${hendrixScore}`);
  });

  it("returns ~0.5 for unknown artists (neutral on every dimension)", () => {
    const features: AttemptFeatures = {
      pitchMean: 300, pitchStd: 120, rhythmDensity: 3,
      ornamentRate: 30, mfccCentroid: 0.45,
    };
    const result = scoreStyleMatch(unknown, features);
    // Mean of neutral 0.5s per dimension.
    assert.ok(Math.abs(result.score - 0.5) < 0.05);
  });

  it("missing optional features (vibrato) don't crash", () => {
    const features: AttemptFeatures = {
      pitchMean: 0, pitchStd: 0, rhythmDensity: 12, ornamentRate: 60, mfccCentroid: 0.65,
    };
    const zakir = { id: "zakir_hussain" } as any;
    const result = scoreStyleMatch(zakir, features);
    assert.ok(result.score > 0);
    assert.ok(result.score <= 1);
  });

  it("rounds the composite to 2 decimal places", () => {
    const features: AttemptFeatures = {
      pitchMean: 300, pitchStd: 120, rhythmDensity: 3,
      ornamentRate: 30, mfccCentroid: 0.45, vibratoHz: 5, vibratoDepthCents: 40,
    };
    const result = scoreStyleMatch(ravi, features);
    // Verify 2 decimal places by checking that score * 100 is an int.
    assert.equal(result.score * 100, Math.round(result.score * 100));
  });
});
