import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { keyboardRangeFor, midiToNote, normalizeNote, noteToMidi, pitchClass } from "./notes.ts";

describe("noteToMidi", () => {
  it("parses sharps, flats and unicode accidentals", () => {
    assert.equal(noteToMidi("C4"), 60);
    assert.equal(noteToMidi("C#4"), 61);
    assert.equal(noteToMidi("Db4"), 61);
    assert.equal(noteToMidi("Eb4"), 63);
    assert.equal(noteToMidi("D♯4"), 63);
    assert.equal(noteToMidi("B♭3"), 58);
    assert.equal(noteToMidi("C2"), 36);
  });
  it("rejects non-notes", () => {
    for (const bad of ["", "H4", "Sa", "C", "4", null, undefined]) assert.equal(noteToMidi(bad), null);
  });
});

describe("normalizeNote / pitchClass", () => {
  it("spells flats as sharps so instrument keys match", () => {
    assert.equal(normalizeNote("Eb4"), "D#4");
    assert.equal(normalizeNote("Bb2"), "A#2");
    assert.equal(normalizeNote("hit"), "hit");
    assert.equal(midiToNote(61), "C#4");
  });
  it("matches enharmonics across octaves", () => {
    assert.equal(pitchClass("Eb4"), pitchClass("D#2"));
    assert.notEqual(pitchClass("E4"), pitchClass("F4"));
  });
});

describe("keyboardRangeFor", () => {
  it("defaults to C4–G5", () => {
    assert.deepEqual(keyboardRangeFor([]), { low: 60, high: 79 });
  });
  it("covers left-hand and bass lessons (C3, G2) the old fixed keyboard couldn't", () => {
    const lh = keyboardRangeFor(["C3", "G3", "A3"]);
    assert.equal(midiToNote(lh.low), "C3");
    assert.ok(lh.high >= noteToMidi("A3")!);
    const bass = keyboardRangeFor(["C3", "G2", "A2", "E2", "F2"]);
    assert.equal(midiToNote(bass.low), "C2");
    assert.ok(bass.high >= noteToMidi("C3")!);
  });
  it("snaps to whole octaves and keeps a playable minimum width", () => {
    const r = keyboardRangeFor(["E4", "G4"]);
    assert.equal(r.low % 12, 0);
    assert.ok(r.high - r.low >= 19);
  });
});
