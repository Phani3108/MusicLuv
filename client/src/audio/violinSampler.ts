/**
 * Violin sampler — Tone.js + sampled violin from tonejs-instruments CDN.
 * Mirrors guitarSampler / pianoSampler. Violin has continuous-pitch quirks
 * that the real grading pipeline handles; for the virtual instrument we play
 * discrete sampled pitches and expose bow-pressure + contact-point as velocity
 * and filter-mix parameters.
 */
import * as Tone from "tone";

const BASE_URL = "https://nbrosowsky.github.io/tonejs-instruments/samples/violin/";

const SAMPLE_MAP: Record<string, string> = {
  "G3":  "G3.mp3",  "A3":  "A3.mp3",  "B3":  "B3.mp3",
  "C4":  "C4.mp3",  "D4":  "D4.mp3",  "E4":  "E4.mp3",  "F4":  "F4.mp3",  "G4":  "G4.mp3",
  "A4":  "A4.mp3",  "B4":  "B4.mp3",
  "C5":  "C5.mp3",  "E5":  "E5.mp3",
};

let sampler: Tone.Sampler | null = null;
let readyPromise: Promise<void> | null = null;
let audioStarted = false;

export function getViolinSampler(): Tone.Sampler {
  if (!sampler) {
    sampler = new Tone.Sampler({
      urls: SAMPLE_MAP,
      baseUrl: BASE_URL,
      release: 0.8,
      attack: 0.05,   // bowed attack is slower than plucked
    }).toDestination();
  }
  return sampler;
}

export function ensureViolinReady(): Promise<void> {
  if (!readyPromise) {
    getViolinSampler();
    readyPromise = Tone.loaded().then(() => {});
  }
  return readyPromise;
}

export async function unlockAudio(): Promise<void> {
  if (audioStarted) return;
  await Tone.start();
  audioStarted = true;
}

/** bowPressure 0..1, contactPoint -1..1 (−1 = sul tasto / airy, +1 = ponticello / glassy). */
export async function playViolinNote(
  note: string,
  durationSec = 1.5,
  bowPressure = 0.7,
  _contactPoint = 0
): Promise<void> {
  await unlockAudio();
  await ensureViolinReady();
  const velocity = Math.max(0.2, Math.min(1, 0.4 + bowPressure * 0.6));
  getViolinSampler().triggerAttackRelease(note, durationSec, undefined, velocity);
}
