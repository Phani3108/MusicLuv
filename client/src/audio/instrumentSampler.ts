/**
 * Instrument-aware sampler dispatcher. Per-instrument logic for:
 *   - Which sampler to use (piano / guitar / violin for pitched notes)
 *   - Drum-specific fallback (onset-triggered synth pads, not pitched)
 *   - Sitar / vocals fall back to piano sampler as a pitch reference
 *
 * Used by the guided-play phase so each instrument plays its own timbre
 * during slow-mo demo + play-along passes.
 */
import * as piano from "./pianoSampler";
import * as guitar from "./guitarSampler";
import * as violin from "./violinSampler";
import * as drums from "./drumSynth";

export type SupportedInstrument =
  | "piano" | "guitar" | "violin" | "drums"
  | "sitar" | "vocals" | "flute" | "tabla";

/** Best-effort mapping of a MIDI pitch to a drum part for onset-pattern guided play. */
const NOTE_TO_DRUM: Record<string, drums.DrumPart> = {
  "C2": "kick", "D2": "kick", "E2": "kick",
  "D3": "snare", "E3": "snare", "F3": "snare",
  "A4": "hihat_closed", "C5": "hihat_closed",
};

export async function unlockAudio(): Promise<void> {
  // Any unlock works — they all share the Tone.js context
  await piano.unlockAudio();
}

export async function ensureReady(instrumentId: string): Promise<void> {
  switch (instrumentId) {
    case "piano":
    case "sitar":
    case "vocals":
    case "flute":
      return piano.ensurePianoReady();
    case "guitar":
    case "tabla":
      return guitar.ensureGuitarReady();
    case "violin":
      return violin.ensureViolinReady();
    case "drums":
      // Drum synth loads lazily in playDrum, no warm-up needed
      return Promise.resolve();
    default:
      return piano.ensurePianoReady();
  }
}

/**
 * Play a pitched note on the appropriate instrument sampler.
 * For drums, maps the note to the closest drum part.
 */
export async function playNote(
  instrumentId: string,
  note: string,
  durationSec = 0.8
): Promise<void> {
  await unlockAudio();
  await ensureReady(instrumentId);

  switch (instrumentId) {
    case "piano":
    case "sitar":    // fallback to piano for now; Phase 4 adds sitar sampler
    case "vocals":   // piano as pitch reference
    case "flute":    // piano as fallback
      return piano.playPianoNote(note, durationSec);

    case "guitar":
      return guitar.playGuitarNote(note, durationSec);

    case "violin":
      return violin.playViolinNote(note, durationSec);

    case "drums":
    case "tabla":
      return drums.playDrum(NOTE_TO_DRUM[note] ?? "kick");

    default:
      return piano.playPianoNote(note, durationSec);
  }
}

/** For pure rhythm exercises (drums), play a default drum hit at an onset. */
export async function playOnset(instrumentId: string): Promise<void> {
  await unlockAudio();
  if (instrumentId === "drums" || instrumentId === "tabla") {
    await drums.playDrum("snare");
  } else {
    // Non-drums: a short piano tick as metronome-ish marker
    await piano.playPianoNote("C5", 0.1);
  }
}
