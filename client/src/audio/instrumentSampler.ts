/**
 * Instrument-aware sampler dispatcher.
 *
 * Hierarchy of sound sources (best → fallback):
 *   1. Real sample banks:   piano, guitar, violin
 *   2. Tone.js synth voices: sitar, vocals, flute, bansuri, harmonium,
 *      veena, saxophone, trumpet, clarinet, accordion, cello, ukulele,
 *      mandolin, bass, synth (see audio/synthVoices.ts)
 *   3. Drum synthesis:      drums, tabla, mridangam, dj_controller
 *   4. Piano fallback:      any unrecognized instrument id
 *
 * This replaces the previous behavior where sitar / flute / vocals all
 * routed to the piano sampler — which made every demo sound like a
 * piano regardless of the instrument picked.
 */
import * as piano from "./pianoSampler";
import * as guitar from "./guitarSampler";
import * as violin from "./violinSampler";
import * as drums from "./drumSynth";
import { playSynthNote, synthVoiceFor } from "./synthVoices";

export type SupportedInstrument =
  | "piano" | "guitar" | "violin" | "drums"
  | "sitar" | "vocals" | "flute" | "tabla"
  | "bass" | "ukulele" | "mandolin" | "bansuri"
  | "harmonium" | "mridangam" | "veena" | "cello"
  | "saxophone" | "trumpet" | "clarinet" | "accordion"
  | "synth" | "dj_controller";

const PERCUSSION_LIKE = new Set(["drums", "tabla", "mridangam", "dj_controller"]);

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
      return piano.ensurePianoReady();
    case "guitar":
      return guitar.ensureGuitarReady();
    case "violin":
      return violin.ensureViolinReady();
  }
  if (PERCUSSION_LIKE.has(instrumentId)) {
    // Drum synth loads lazily in playDrum — nothing to preload.
    return Promise.resolve();
  }
  // Tone.js PolySynth voices are tiny and build on-demand; nothing to
  // preload either. Warm up the audio context regardless so the first
  // note isn't silent on iOS.
  if (synthVoiceFor(instrumentId)) return Promise.resolve();
  // Unknown instrument — warm up piano as the ultimate fallback.
  return piano.ensurePianoReady();
}

/**
 * Play a pitched note on the appropriate instrument voice.
 * For drums, maps the note to the closest drum part.
 */
export async function playNote(
  instrumentId: string,
  note: string,
  durationSec = 0.8,
): Promise<void> {
  await unlockAudio();
  await ensureReady(instrumentId);

  // Real sampled instruments.
  if (instrumentId === "piano") return piano.playPianoNote(note, durationSec);
  if (instrumentId === "guitar") return guitar.playGuitarNote(note, durationSec);
  if (instrumentId === "violin") return violin.playViolinNote(note, durationSec);

  // Percussion.
  if (PERCUSSION_LIKE.has(instrumentId)) {
    return drums.playDrum(NOTE_TO_DRUM[note] ?? "kick");
  }

  // Synthesized voices for everything else.
  const voice = synthVoiceFor(instrumentId);
  if (voice) {
    return playSynthNote(voice, note, durationSec);
  }

  // Unknown instrument — use piano as absolute fallback.
  return piano.playPianoNote(note, durationSec);
}

/** For pure rhythm exercises (drums), play a default drum hit at an onset. */
export async function playOnset(instrumentId: string): Promise<void> {
  await unlockAudio();
  if (PERCUSSION_LIKE.has(instrumentId)) {
    await drums.playDrum("snare");
  } else {
    // Non-drums: a short piano tick as metronome-ish marker.
    await piano.playPianoNote("C5", 0.1);
  }
}
