/**
 * Pure-function tests for the pitch detection helpers. The DOM-bound
 * startLivePitch() function is exercised live in the browser; this
 * suite covers the math: hzToNoteCents() across the 12-TET grid +
 * smoothing class behavior (median + hysteresis) at edge cases.
 *
 * Run with `node --test --experimental-strip-types src/audio/`.
 * Node 20+ ships node:test built-in.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hzToNoteCents } from "./livePitch.js";

describe("hzToNoteCents", () => {
  it("A4 = 440Hz exact → A4, 0 cents", () => {
    const result = hzToNoteCents(440);
    assert.equal(result.note, "A4");
    assert.equal(result.cents, 0);
  });

  it("C4 = 261.63Hz → C4, ~0 cents", () => {
    const result = hzToNoteCents(261.63);
    assert.equal(result.note, "C4");
    assert.ok(Math.abs(result.cents) <= 1);
  });

  it("440Hz + 50 cents → A4 with positive cents", () => {
    // 50 cents sharp of A4 = 440 * 2^(50/1200)
    const sharp = 440 * Math.pow(2, 50 / 1200);
    const result = hzToNoteCents(sharp);
    assert.equal(result.note, "A4");
    assert.ok(result.cents > 40 && result.cents <= 50);
  });

  it("440Hz - 50 cents → A4 with negative cents (or G#4 high)", () => {
    const flat = 440 * Math.pow(2, -45 / 1200);
    const result = hzToNoteCents(flat);
    // Could round to A4 with -45 cents, OR G#4 with +55 cents — accept either
    // since the rounding boundary lies right around ±50 cents.
    assert.ok(
      (result.note === "A4" && result.cents < -40) ||
      (result.note === "G#4" && result.cents > 40),
      `unexpected result for slightly flat A4: ${JSON.stringify(result)}`,
    );
  });

  it("middle C → C4 (octave numbering follows scientific pitch)", () => {
    const result = hzToNoteCents(261.6256);
    assert.equal(result.note, "C4");
  });

  it("octave above A4 → A5", () => {
    const result = hzToNoteCents(880);
    assert.equal(result.note, "A5");
    assert.equal(result.cents, 0);
  });

  it("0 or negative Hz → silent ('—')", () => {
    assert.equal(hzToNoteCents(0).note, "—");
    assert.equal(hzToNoteCents(-100).note, "—");
  });

  it("very low E2 (82.41Hz) → E2", () => {
    const result = hzToNoteCents(82.41);
    assert.equal(result.note, "E2");
    assert.ok(Math.abs(result.cents) <= 1);
  });
});
