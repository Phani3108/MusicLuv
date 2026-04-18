/**
 * Drum kit — Tone.js procedural synthesis (no CDN samples).
 * Good enough for virtual-kit noodling + L1–L3 practice. Real sampled kits
 * for Genius-tier recording land in Wave 3d polish.
 */
import * as Tone from "tone";

let initialized = false;
let audioStarted = false;
let kick: Tone.MembraneSynth;
let snare: Tone.NoiseSynth;
let hihatClosed: Tone.MetalSynth;
let hihatOpen: Tone.MetalSynth;
let tom1: Tone.MembraneSynth;
let tom2: Tone.MembraneSynth;
let tom3: Tone.MembraneSynth;
let crash: Tone.MetalSynth;
let ride: Tone.MetalSynth;

function init() {
  if (initialized) return;
  const compressor = new Tone.Compressor(-24, 4).toDestination();

  kick = new Tone.MembraneSynth({
    pitchDecay: 0.05, octaves: 6,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.7 },
  }).connect(compressor);

  snare = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
  }).connect(new Tone.Filter(1800, "highpass").connect(compressor));

  hihatClosed = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.08, release: 0.02 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).connect(compressor);
  hihatClosed.volume.value = -12;

  hihatOpen = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.5, release: 0.5 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).connect(compressor);
  hihatOpen.volume.value = -10;

  tom1 = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 3,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.5 } }).connect(compressor);
  tom2 = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 3,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.5 } }).connect(compressor);
  tom3 = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 3,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 0.5 } }).connect(compressor);

  crash = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 1.4, release: 1 },
    harmonicity: 8.5, modulationIndex: 40, resonance: 4000, octaves: 1.5,
  }).connect(compressor);
  crash.volume.value = -8;

  ride = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.9, release: 0.5 },
    harmonicity: 3.1, modulationIndex: 32, resonance: 7000, octaves: 1.5,
  }).connect(compressor);
  ride.volume.value = -10;

  initialized = true;
}

export async function unlockAudio(): Promise<void> {
  if (audioStarted) return;
  await Tone.start();
  audioStarted = true;
}

export type DrumPart =
  | "kick" | "snare" | "hihat_closed" | "hihat_open"
  | "tom1" | "tom2" | "tom3" | "crash" | "ride";

export async function playDrum(part: DrumPart, velocity = 0.9): Promise<void> {
  await unlockAudio();
  init();
  const now = Tone.now();
  switch (part) {
    case "kick":         kick.triggerAttackRelease("C2", "8n", now, velocity); break;
    case "snare":        snare.triggerAttackRelease("8n", now, velocity); break;
    case "hihat_closed": hihatClosed.triggerAttackRelease("C6", "32n", now, velocity * 0.7); break;
    case "hihat_open":   hihatOpen.triggerAttackRelease("C6", "8n", now, velocity * 0.8); break;
    case "tom1":         tom1.triggerAttackRelease("F2", "8n", now, velocity); break;
    case "tom2":         tom2.triggerAttackRelease("D2", "8n", now, velocity); break;
    case "tom3":         tom3.triggerAttackRelease("A1", "8n", now, velocity); break;
    case "crash":        crash.triggerAttackRelease("C5", "4n", now, velocity * 0.8); break;
    case "ride":         ride.triggerAttackRelease("C5", "8n", now, velocity * 0.6); break;
  }
}
