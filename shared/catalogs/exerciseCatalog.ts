import type { Exercise } from "./types";

export const EXERCISES: Record<string, Exercise> = {
  piano_l1_01_scale5: {
    id: "piano_l1_01_scale5",
    type: "play_scale",
    instrumentId: "piano",
    title: "C–D–E–F–G ascent and descent",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 500, finger: 1 },
        { pitch: "D4", startMs: 500,  durationMs: 500, finger: 2 },
        { pitch: "E4", startMs: 1000, durationMs: 500, finger: 3 },
        { pitch: "F4", startMs: 1500, durationMs: 500, finger: 4 },
        { pitch: "G4", startMs: 2000, durationMs: 500, finger: 5 },
        { pitch: "F4", startMs: 2500, durationMs: 500, finger: 4 },
        { pitch: "E4", startMs: 3000, durationMs: 500, finger: 3 },
        { pitch: "D4", startMs: 3500, durationMs: 500, finger: 2 },
        { pitch: "C4", startMs: 4000, durationMs: 1000, finger: 1 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l1_02_quarter_halves: {
    id: "piano_l1_02_quarter_halves",
    type: "rhythm_clap",
    instrumentId: "piano",
    title: "Quarter and half notes on C",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 750 },
        { pitch: "C4", startMs: 750,  durationMs: 750 },
        { pitch: "C4", startMs: 1500, durationMs: 1500 },
        { pitch: "C4", startMs: 3000, durationMs: 750 },
        { pitch: "C4", startMs: 3750, durationMs: 750 },
        { pitch: "C4", startMs: 4500, durationMs: 1500 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  piano_l1_03_twinkle_rh: {
    id: "piano_l1_03_twinkle_rh",
    type: "play_along",
    instrumentId: "piano",
    title: "Twinkle, Twinkle — right hand, bars 1–4",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0, durationMs: 500, finger: 1 },
        { pitch: "C4", startMs: 500, durationMs: 500, finger: 1 },
        { pitch: "G4", startMs: 1000, durationMs: 500, finger: 5 },
        { pitch: "G4", startMs: 1500, durationMs: 500, finger: 5 },
        { pitch: "A4", startMs: 2000, durationMs: 500, finger: 5 },
        { pitch: "A4", startMs: 2500, durationMs: 500, finger: 5 },
        { pitch: "G4", startMs: 3000, durationMs: 1000, finger: 5 },
        { pitch: "F4", startMs: 4000, durationMs: 500, finger: 4 },
        { pitch: "F4", startMs: 4500, durationMs: 500, finger: 4 },
        { pitch: "E4", startMs: 5000, durationMs: 500, finger: 3 },
        { pitch: "E4", startMs: 5500, durationMs: 500, finger: 3 },
        { pitch: "D4", startMs: 6000, durationMs: 500, finger: 2 },
        { pitch: "D4", startMs: 6500, durationMs: 500, finger: 2 },
        { pitch: "C4", startMs: 7000, durationMs: 1000, finger: 1 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l1_04_twinkle_lh: {
    id: "piano_l1_04_twinkle_lh",
    type: "play_along",
    instrumentId: "piano",
    title: "Twinkle, Twinkle — left hand bass, bars 1–4",
    targetPattern: {
      notes: [
        { pitch: "C3", startMs: 0, durationMs: 500, finger: 5 },
        { pitch: "C3", startMs: 500, durationMs: 500, finger: 5 },
        { pitch: "G3", startMs: 1000, durationMs: 500, finger: 1 },
        { pitch: "G3", startMs: 1500, durationMs: 500, finger: 1 },
        { pitch: "A3", startMs: 2000, durationMs: 500, finger: 1 },
        { pitch: "A3", startMs: 2500, durationMs: 500, finger: 1 },
        { pitch: "G3", startMs: 3000, durationMs: 1000, finger: 1 },
        { pitch: "F3", startMs: 4000, durationMs: 500, finger: 2 },
        { pitch: "F3", startMs: 4500, durationMs: 500, finger: 2 },
        { pitch: "E3", startMs: 5000, durationMs: 500, finger: 3 },
        { pitch: "E3", startMs: 5500, durationMs: 500, finger: 3 },
        { pitch: "D3", startMs: 6000, durationMs: 500, finger: 4 },
        { pitch: "D3", startMs: 6500, durationMs: 500, finger: 4 },
        { pitch: "C3", startMs: 7000, durationMs: 1000, finger: 5 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l1_05_twinkle_both: {
    id: "piano_l1_05_twinkle_both",
    type: "play_along",
    instrumentId: "piano",
    title: "Twinkle, Twinkle — both hands, bars 1–4",
    targetPattern: {
      // Simplified to melody-only for grading (the polyphonic hands-together
      // grader lands with Basic Pitch in Wave 3b). L1 students demonstrate
      // both hands at practice time; the grader scores the top line.
      notes: [
        { pitch: "C4", startMs: 0, durationMs: 500, finger: 1 },
        { pitch: "C4", startMs: 500, durationMs: 500, finger: 1 },
        { pitch: "G4", startMs: 1000, durationMs: 500, finger: 5 },
        { pitch: "G4", startMs: 1500, durationMs: 500, finger: 5 },
        { pitch: "A4", startMs: 2000, durationMs: 500, finger: 5 },
        { pitch: "A4", startMs: 2500, durationMs: 500, finger: 5 },
        { pitch: "G4", startMs: 3000, durationMs: 1000, finger: 5 },
        { pitch: "F4", startMs: 4000, durationMs: 500, finger: 4 },
        { pitch: "F4", startMs: 4500, durationMs: 500, finger: 4 },
        { pitch: "E4", startMs: 5000, durationMs: 500, finger: 3 },
        { pitch: "E4", startMs: 5500, durationMs: 500, finger: 3 },
        { pitch: "D4", startMs: 6000, durationMs: 500, finger: 2 },
        { pitch: "D4", startMs: 6500, durationMs: 500, finger: 2 },
        { pitch: "C4", startMs: 7000, durationMs: 1000, finger: 1 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l1_06_cmaj_scale: {
    id: "piano_l1_06_cmaj_scale",
    type: "play_scale",
    instrumentId: "piano",
    title: "C major scale, one octave — thumb-under, ascending + descending",
    targetPattern: {
      notes: [
        // Ascending
        { pitch: "C4", startMs: 0, durationMs: 375, finger: 1 },
        { pitch: "D4", startMs: 375, durationMs: 375, finger: 2 },
        { pitch: "E4", startMs: 750, durationMs: 375, finger: 3 },
        { pitch: "F4", startMs: 1125, durationMs: 375, finger: 1 },  // thumb-under
        { pitch: "G4", startMs: 1500, durationMs: 375, finger: 2 },
        { pitch: "A4", startMs: 1875, durationMs: 375, finger: 3 },
        { pitch: "B4", startMs: 2250, durationMs: 375, finger: 4 },
        { pitch: "C5", startMs: 2625, durationMs: 750, finger: 5 },
        // Descending
        { pitch: "B4", startMs: 3375, durationMs: 375, finger: 4 },
        { pitch: "A4", startMs: 3750, durationMs: 375, finger: 3 },
        { pitch: "G4", startMs: 4125, durationMs: 375, finger: 2 },
        { pitch: "F4", startMs: 4500, durationMs: 375, finger: 1 },
        { pitch: "E4", startMs: 4875, durationMs: 375, finger: 3 },  // finger-over
        { pitch: "D4", startMs: 5250, durationMs: 375, finger: 2 },
        { pitch: "C4", startMs: 5625, durationMs: 750, finger: 1 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  piano_l2_01_sightread: {
    id: "piano_l2_01_sightread",
    type: "sight_read",
    instrumentId: "piano",
    title: "Sight-read: 8-bar folk melody",
    targetPattern: {
      notes: Array.from({ length: 8 }, (_, i) => ({
        pitch: ["C4", "E4", "G4", "A4", "G4", "E4", "D4", "C4"][i],
        startMs: i * 600, durationMs: 600,
      })),
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  sitar_l1_01_sustain_sa: {
    id: "sitar_l1_01_sustain_sa",
    type: "play_note",
    instrumentId: "sitar",
    title: "Sustain Sa for 10 seconds",
    targetPattern: { notes: [{ pitch: "C4", startMs: 0, durationMs: 10000 }] },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  sitar_l4_01_yaman_meend: {
    id: "sitar_l4_01_yaman_meend",
    type: "improvise",
    instrumentId: "sitar",
    title: "Yaman opening — Sa → Ga with meend from Ma",
    targetPattern: {
      ragaPhrase: {
        ragaId: "yaman",
        svaras: ["Sa", "-", "Re", "Ga", "Ma~Ga", "Sa"],
        gamakaHints: ["hold Sa 3s", "meend Ma→Ga slowly", "land softly on Sa"],
      },
    },
    tempo: { bpm: 40, meter: [4, 4] },
    gradingRubricId: "rubric_raga_intermediate",
  },

  tabla_l1_01_dha_16: {
    id: "tabla_l1_01_dha_16",
    type: "rhythm_clap",
    instrumentId: "tabla",
    title: "Dha ×16 on the beat",
    targetPattern: {
      onsets: Array.from({ length: 16 }, (_, i) => i * 750),
    },
    tempo: { bpm: 80, meter: [16, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
};

export const getExercise = (id: string) => EXERCISES[id];
