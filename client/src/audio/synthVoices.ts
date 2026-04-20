/**
 * Instrument-flavored synthesis using Tone.js. For instruments where we
 * don't yet ship a sample bank (sitar, flute, bansuri, vocals, etc.) we
 * synthesize a timbre that's recognizably *not* a piano — which is all
 * we need to stop the "everything sounds like piano" complaint.
 *
 * Each voice is lazy-constructed on first play + shared across subsequent
 * calls. Stereo widening + a shared reverb bus make the demos feel like
 * they share a musical space, not disconnected toy tones.
 */
import * as Tone from "tone";

type VoiceKey = "sitar" | "vocals" | "flute" | "bansuri" | "harmonium" | "veena" | "saxophone" | "trumpet" | "clarinet" | "accordion" | "cello" | "ukulele" | "mandolin" | "bass" | "synth";

let reverbBus: Tone.Reverb | null = null;
const voices: Partial<Record<VoiceKey, Tone.PolySynth>> = {};

function sharedReverb(): Tone.Reverb {
  if (!reverbBus) {
    reverbBus = new Tone.Reverb({ decay: 2.2, wet: 0.28 }).toDestination();
  }
  return reverbBus;
}

function buildVoice(key: VoiceKey): Tone.PolySynth {
  const rev = sharedReverb();
  switch (key) {
    // Plucked strings with sympathetic shimmer — sitar / veena
    case "sitar":
    case "veena":
    case "ukulele":
    case "mandolin": {
      // PolySynth<PluckSynth> needs a looser cast — the PluckSynth
      // option shape isn't in PolySynth's generic constraint.
      const v = new Tone.PolySynth(Tone.PluckSynth as any, {
        attackNoise: key === "sitar" || key === "veena" ? 2.5 : 0.8,
        resonance: 0.92,
        dampening: key === "ukulele" ? 4200 : 3000,
      } as any);
      v.connect(rev);
      return v;
    }
    // Continuous-pitch voices — vocals / flute / bansuri / harmonium / accordion
    case "vocals":
    case "flute":
    case "bansuri":
    case "harmonium":
    case "accordion": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: key === "vocals" ? "sine" : "triangle" },
        envelope: {
          attack: key === "bansuri" ? 0.15 : 0.05,
          decay: 0.1,
          sustain: 0.9,
          release: 0.35,
        },
      } as any);
      v.connect(rev);
      return v;
    }
    // Bowed — cello
    case "cello": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.15, decay: 0.1, sustain: 0.85, release: 0.5 },
      } as any);
      v.connect(rev);
      return v;
    }
    // Brass — trumpet
    case "trumpet": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.04, decay: 0.08, sustain: 0.8, release: 0.2 },
      } as any);
      v.connect(rev);
      return v;
    }
    // Woodwinds — saxophone / clarinet
    case "saxophone":
    case "clarinet": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: key === "saxophone" ? "sawtooth" : "square" },
        envelope: { attack: 0.08, decay: 0.1, sustain: 0.85, release: 0.3 },
      } as any);
      v.connect(rev);
      return v;
    }
    // Low + electronic
    case "bass": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "square" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.15 },
      } as any);
      v.connect(rev);
      return v;
    }
    case "synth": {
      const v = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.6, release: 0.4 },
      } as any);
      v.connect(rev);
      return v;
    }
  }
}

export async function playSynthNote(
  key: VoiceKey,
  note: string,
  durationSec = 0.8,
  velocity = 0.75,
): Promise<void> {
  if (!voices[key]) voices[key] = buildVoice(key);
  await Tone.start();
  const v = voices[key]!;
  // Use triggerAttackRelease so durations respect the requested length.
  v.triggerAttackRelease(note, durationSec, Tone.now(), velocity);
}

/** Map an instrument id to its synthesis voice key. Returns null if
 *  that instrument has a real sampler and shouldn't route here. */
export function synthVoiceFor(instrumentId: string): VoiceKey | null {
  const map: Record<string, VoiceKey> = {
    sitar: "sitar",
    vocals: "vocals",
    flute: "flute",
    bansuri: "bansuri",
    harmonium: "harmonium",
    veena: "veena",
    saxophone: "saxophone",
    trumpet: "trumpet",
    clarinet: "clarinet",
    accordion: "accordion",
    cello: "cello",
    ukulele: "ukulele",
    mandolin: "mandolin",
    bass: "bass",
    synth: "synth",
  };
  return map[instrumentId] ?? null;
}
