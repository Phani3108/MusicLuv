/**
 * Guitar sampler — Tone.js + sampled acoustic guitar from tonejs-instruments CDN.
 * Mirrors pianoSampler's lazy-init + unlock-on-first-gesture pattern.
 */
import * as Tone from "tone";

const BASE_URL = "https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-acoustic/";

const SAMPLE_MAP: Record<string, string> = {
  "E2":  "E2.mp3",  "A2":  "A2.mp3",
  "C3":  "C3.mp3",  "D3":  "D3.mp3",  "E3":  "E3.mp3",  "G3":  "G3.mp3",  "A3":  "A3.mp3",
  "C4":  "C4.mp3",  "D4":  "D4.mp3",  "E4":  "E4.mp3",  "G4":  "G4.mp3",  "A4":  "A4.mp3",
};

let sampler: Tone.Sampler | null = null;
let readyPromise: Promise<void> | null = null;
let audioStarted = false;

export function getGuitarSampler(): Tone.Sampler {
  if (!sampler) {
    sampler = new Tone.Sampler({
      urls: SAMPLE_MAP,
      baseUrl: BASE_URL,
      release: 0.6,
      attack: 0.002,
    }).toDestination();
  }
  return sampler;
}

export function ensureGuitarReady(): Promise<void> {
  if (!readyPromise) {
    getGuitarSampler();
    readyPromise = Tone.loaded().then(() => {});
  }
  return readyPromise;
}

export async function unlockAudio(): Promise<void> {
  if (audioStarted) return;
  await Tone.start();
  audioStarted = true;
}

export async function playGuitarNote(note: string, durationSec = 1.2, velocity = 0.85): Promise<void> {
  await unlockAudio();
  await ensureGuitarReady();
  getGuitarSampler().triggerAttackRelease(note, durationSec, undefined, velocity);
}

/** Play a chord as a rolled strum — notes 20ms apart bottom-to-top. */
export async function strumChord(notes: string[], durationSec = 1.2, velocity = 0.8): Promise<void> {
  await unlockAudio();
  await ensureGuitarReady();
  const s = getGuitarSampler();
  notes.forEach((n, i) => {
    setTimeout(() => s.triggerAttackRelease(n, durationSec, undefined, velocity), i * 22);
  });
}
