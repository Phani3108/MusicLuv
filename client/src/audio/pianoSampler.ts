/**
 * Piano sampler singleton — Tone.js + sampled-piano notes from the public
 * `tonejs-instruments` CDN. Lazy-initialized; call `ensurePianoReady()` before
 * the first `playPianoNote()` to wait for samples.
 *
 * Samples are interpolated: we load ~17 keys across the range and Tone.Sampler
 * pitches-up / pitches-down to cover the full 88-key keyboard.
 */
import * as Tone from "tone";

const BASE_URL = "https://nbrosowsky.github.io/tonejs-instruments/samples/piano/";

// Sparse set of samples — Tone.Sampler interpolates the rest.
const SAMPLE_MAP: Record<string, string> = {
  A1: "A1.mp3", "C2": "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3",
  "C3": "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3",
  "C4": "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3",
  "C5": "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", A5: "A5.mp3",
  "C6": "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", A6: "A6.mp3",
  "C7": "C7.mp3",
};

let sampler: Tone.Sampler | null = null;
let readyPromise: Promise<void> | null = null;
let audioStarted = false;
let sustainOn = false;

export interface LoadState {
  loaded: boolean;
  loading: boolean;
  error?: string;
}

export function getPianoSampler(): Tone.Sampler {
  if (!sampler) {
    sampler = new Tone.Sampler({
      urls: SAMPLE_MAP,
      baseUrl: BASE_URL,
      release: 1,
      attack: 0.002,
    }).toDestination();
  }
  return sampler;
}

export function ensurePianoReady(): Promise<void> {
  if (!readyPromise) {
    getPianoSampler();
    readyPromise = Tone.loaded().then(() => { /* loaded */ });
  }
  return readyPromise;
}

/** Start the Tone.js AudioContext — required after a user gesture. Safe to call multiple times. */
export async function unlockAudio(): Promise<void> {
  if (audioStarted) return;
  await Tone.start();
  audioStarted = true;
}

/** Play a note. Note is a scientific-pitch string like "C4", "F#3". */
export async function playPianoNote(note: string, durationSec = 0.8, velocity = 0.85): Promise<void> {
  await unlockAudio();
  await ensurePianoReady();
  const s = getPianoSampler();
  // If sustain is on, hold the note; otherwise use a timed release.
  if (sustainOn) {
    s.triggerAttack(note, undefined, velocity);
  } else {
    s.triggerAttackRelease(note, durationSec, undefined, velocity);
  }
}

/** Release a note (useful for keyboard key-up when simulating sustained play). */
export function releasePianoNote(note: string): void {
  if (!sampler) return;
  if (!sustainOn) return;
  sampler.triggerRelease(note);
}

export function setSustain(on: boolean): void {
  sustainOn = on;
  if (!on && sampler) sampler.releaseAll();
}

export function isSustain(): boolean {
  return sustainOn;
}
