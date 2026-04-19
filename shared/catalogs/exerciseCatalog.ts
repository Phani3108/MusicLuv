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
    title: "Sight-read: 8-bar folk melody (treble clef)",
    targetPattern: {
      notes: Array.from({ length: 8 }, (_, i) => ({
        pitch: ["C4", "E4", "G4", "A4", "G4", "E4", "D4", "C4"][i],
        startMs: i * 600, durationMs: 600,
      })),
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l2_02_bass_sightread: {
    id: "piano_l2_02_bass_sightread",
    type: "sight_read",
    instrumentId: "piano",
    title: "Sight-read: 8-bar bass line",
    targetPattern: {
      notes: [
        { pitch: "C3", startMs: 0,    durationMs: 700 },
        { pitch: "G2", startMs: 700,  durationMs: 700 },
        { pitch: "A2", startMs: 1400, durationMs: 700 },
        { pitch: "E2", startMs: 2100, durationMs: 700 },
        { pitch: "F2", startMs: 2800, durationMs: 700 },
        { pitch: "C3", startMs: 3500, durationMs: 700 },
        { pitch: "G2", startMs: 4200, durationMs: 700 },
        { pitch: "C3", startMs: 4900, durationMs: 1400 },
      ],
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l2_03_rest_phrase: {
    id: "piano_l2_03_rest_phrase",
    type: "sight_read",
    instrumentId: "piano",
    title: "Phrase with a tie and a quarter rest",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 500 },
        { pitch: "E4", startMs: 500,  durationMs: 500 },
        // rest at 1000–1500ms (silence in target)
        { pitch: "G4", startMs: 1500, durationMs: 500 },
        { pitch: "G4", startMs: 2000, durationMs: 1500 }, // tied (3 beats of G)
        { pitch: "E4", startMs: 3500, durationMs: 500 },
        { pitch: "C4", startMs: 4000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l2_04_accidentals: {
    id: "piano_l2_04_accidentals",
    type: "sight_read",
    instrumentId: "piano",
    title: "Phrase with sharps, flats, and a natural",
    targetPattern: {
      notes: [
        { pitch: "C4",  startMs: 0,    durationMs: 500 },
        { pitch: "C#4", startMs: 500,  durationMs: 500 },
        { pitch: "D4",  startMs: 1000, durationMs: 500 },
        { pitch: "Eb4", startMs: 1500, durationMs: 500 },
        { pitch: "E4",  startMs: 2000, durationMs: 500 },
        { pitch: "F4",  startMs: 2500, durationMs: 500 },
        { pitch: "F#4", startMs: 3000, durationMs: 500 },
        { pitch: "G4",  startMs: 3500, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l2_05_keysig_phrase: {
    id: "piano_l2_05_keysig_phrase",
    type: "sight_read",
    instrumentId: "piano",
    title: "G major phrase — one sharp (F♯)",
    targetPattern: {
      notes: [
        { pitch: "G4",  startMs: 0,    durationMs: 500 },
        { pitch: "A4",  startMs: 500,  durationMs: 500 },
        { pitch: "B4",  startMs: 1000, durationMs: 500 },
        { pitch: "C5",  startMs: 1500, durationMs: 500 },
        { pitch: "D5",  startMs: 2000, durationMs: 500 },
        { pitch: "C5",  startMs: 2500, durationMs: 500 },
        { pitch: "B4",  startMs: 3000, durationMs: 500 },
        { pitch: "A4",  startMs: 3500, durationMs: 500 },
        { pitch: "G4",  startMs: 4000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_01_triads_on_c: {
    id: "piano_l5_01_triads_on_c",
    type: "play_chord",
    instrumentId: "piano",
    title: "Four triad qualities rooted on C",
    targetPattern: {
      // Bass roots only; the student plays the full 3-note chords
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 1500 }, // major
        { pitch: "C4", startMs: 1500, durationMs: 1500 }, // minor
        { pitch: "C4", startMs: 3000, durationMs: 1500 }, // dim
        { pitch: "C4", startMs: 4500, durationMs: 1500 }, // aug
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_02_c_inversions: {
    id: "piano_l5_02_c_inversions",
    type: "play_chord",
    instrumentId: "piano",
    title: "C major in three inversions",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 1200 }, // root
        { pitch: "E4", startMs: 1200, durationMs: 1200 }, // 1st inv (bottom = E)
        { pitch: "G4", startMs: 2400, durationMs: 1200 }, // 2nd inv (bottom = G)
        { pitch: "C5", startMs: 3600, durationMs: 1500 }, // root octave up
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_03_pop_prog: {
    id: "piano_l5_03_pop_prog",
    type: "play_chord",
    instrumentId: "piano",
    title: "I-V-vi-IV in C major — 4 bars",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 2000 }, // C
        { pitch: "G3", startMs: 2000, durationMs: 2000 }, // G
        { pitch: "A3", startMs: 4000, durationMs: 2000 }, // Am
        { pitch: "F3", startMs: 6000, durationMs: 2000 }, // F
      ],
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_04_alberti: {
    id: "piano_l5_04_alberti",
    type: "play_along",
    instrumentId: "piano",
    title: "Alberti bass on C — bottom-top-middle-top",
    targetPattern: {
      notes: [
        { pitch: "C3", startMs: 0,    durationMs: 300 },
        { pitch: "G3", startMs: 300,  durationMs: 300 },
        { pitch: "E3", startMs: 600,  durationMs: 300 },
        { pitch: "G3", startMs: 900,  durationMs: 300 },
        { pitch: "C3", startMs: 1200, durationMs: 300 },
        { pitch: "G3", startMs: 1500, durationMs: 300 },
        { pitch: "E3", startMs: 1800, durationMs: 300 },
        { pitch: "G3", startMs: 2100, durationMs: 300 },
      ],
    },
    tempo: { bpm: 100, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_05_chord_melody: {
    id: "piano_l5_05_chord_melody",
    type: "play_along",
    instrumentId: "piano",
    title: "Twinkle melody with chord-tone fill",
    targetPattern: {
      // Only top melody line graded; chord tones below are the student's interpretation
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 500 },
        { pitch: "C4", startMs: 500,  durationMs: 500 },
        { pitch: "G4", startMs: 1000, durationMs: 500 },
        { pitch: "G4", startMs: 1500, durationMs: 500 },
        { pitch: "A4", startMs: 2000, durationMs: 500 },
        { pitch: "A4", startMs: 2500, durationMs: 500 },
        { pitch: "G4", startMs: 3000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 75, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l5_06_seventh_chords: {
    id: "piano_l5_06_seventh_chords",
    type: "play_chord",
    instrumentId: "piano",
    title: "Cmaj7 → Cm7 → C7",
    targetPattern: {
      notes: [
        { pitch: "C3", startMs: 0,    durationMs: 2000 }, // Cmaj7
        { pitch: "C3", startMs: 2000, durationMs: 2000 }, // Cm7
        { pitch: "C3", startMs: 4000, durationMs: 2000 }, // C7
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  piano_l6_01_clementi_opening: {
    id: "piano_l6_01_clementi_opening",
    type: "play_along",
    instrumentId: "piano",
    title: "Clementi Op. 36 No. 1, mvt 1 — opening melody",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 400 },
        { pitch: "E4", startMs: 400,  durationMs: 400 },
        { pitch: "G4", startMs: 800,  durationMs: 400 },
        { pitch: "C5", startMs: 1200, durationMs: 400 },
        { pitch: "E5", startMs: 1600, durationMs: 400 },
        { pitch: "G4", startMs: 2000, durationMs: 400 },
        { pitch: "C5", startMs: 2400, durationMs: 400 },
        { pitch: "E5", startMs: 2800, durationMs: 800 },
        { pitch: "F5", startMs: 3600, durationMs: 400 },
        { pitch: "D5", startMs: 4000, durationMs: 400 },
        { pitch: "B4", startMs: 4400, durationMs: 400 },
        { pitch: "G4", startMs: 4800, durationMs: 800 },
      ],
    },
    tempo: { bpm: 110, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l6_02_chopin_em: {
    id: "piano_l6_02_chopin_em",
    type: "play_along",
    instrumentId: "piano",
    title: "Chopin Prelude Op. 28 No. 4 — melody (simplified)",
    targetPattern: {
      notes: [
        { pitch: "B4", startMs: 0,    durationMs: 1600, velocity: 0.5 },
        { pitch: "B4", startMs: 1600, durationMs: 800,  velocity: 0.6 },
        { pitch: "A4", startMs: 2400, durationMs: 1600, velocity: 0.55 },
        { pitch: "G4", startMs: 4000, durationMs: 1600, velocity: 0.45 },
        { pitch: "F#4",startMs: 5600, durationMs: 2400, velocity: 0.4 },
      ],
    },
    tempo: { bpm: 50, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l6_03_rootless_iivi: {
    id: "piano_l6_03_rootless_iivi",
    type: "play_chord",
    instrumentId: "piano",
    title: "Rootless ii-V-I in C major",
    targetPattern: {
      // Bass roots for the grader (bassist's part); student plays the rootless upper voicing
      notes: [
        { pitch: "D3", startMs: 0,    durationMs: 2000 }, // Dm7
        { pitch: "G3", startMs: 2000, durationMs: 2000 }, // G7
        { pitch: "C3", startMs: 4000, durationMs: 2500 }, // Cmaj7 resolution
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l6_04_yaman_phrase: {
    id: "piano_l6_04_yaman_phrase",
    type: "improvise",
    instrumentId: "piano",
    title: "Raga Yaman — ascending characteristic phrase",
    targetPattern: {
      notes: [
        { pitch: "C4",  startMs: 0,    durationMs: 800 },   // Sa
        { pitch: "E4",  startMs: 800,  durationMs: 600 },   // Ga
        { pitch: "F#4", startMs: 1400, durationMs: 1000 },  // Ma♯
        { pitch: "A4",  startMs: 2400, durationMs: 800 },   // Dha
        { pitch: "B4",  startMs: 3200, durationMs: 600 },   // Ni
        { pitch: "C5",  startMs: 3800, durationMs: 2000 },  // Sa' (rest here)
      ],
    },
    tempo: { bpm: 50, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l6_05_hanon_20: {
    id: "piano_l6_05_hanon_20",
    type: "play_scale",
    instrumentId: "piano",
    title: "Hanon #20 — stretched pattern",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 200 },
        { pitch: "F4", startMs: 200,  durationMs: 200 },
        { pitch: "E4", startMs: 400,  durationMs: 200 },
        { pitch: "D4", startMs: 600,  durationMs: 200 },
        { pitch: "C4", startMs: 800,  durationMs: 200 },
        { pitch: "F4", startMs: 1000, durationMs: 200 },
        { pitch: "E4", startMs: 1200, durationMs: 200 },
        { pitch: "D4", startMs: 1400, durationMs: 200 },
        { pitch: "E4", startMs: 1600, durationMs: 200 },
        { pitch: "A4", startMs: 1800, durationMs: 200 },
        { pitch: "G4", startMs: 2000, durationMs: 200 },
        { pitch: "F4", startMs: 2200, durationMs: 200 },
        { pitch: "E4", startMs: 2400, durationMs: 200 },
        { pitch: "A4", startMs: 2600, durationMs: 200 },
        { pitch: "G4", startMs: 2800, durationMs: 200 },
        { pitch: "F4", startMs: 3000, durationMs: 400 },
      ],
    },
    tempo: { bpm: 100, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l6_06_unseen_piece: {
    id: "piano_l6_06_unseen_piece",
    type: "sight_read",
    instrumentId: "piano",
    title: "Sight-read a grade-5 level unseen piece (16 bars)",
    targetPattern: {
      notes: [
        { pitch: "D4", startMs: 0,    durationMs: 500 },
        { pitch: "F#4",startMs: 500,  durationMs: 500 },
        { pitch: "A4", startMs: 1000, durationMs: 500 },
        { pitch: "D5", startMs: 1500, durationMs: 1000 },
        { pitch: "C5", startMs: 2500, durationMs: 500 },
        { pitch: "A4", startMs: 3000, durationMs: 500 },
        { pitch: "F#4",startMs: 3500, durationMs: 500 },
        { pitch: "D4", startMs: 4000, durationMs: 1500 },
        { pitch: "E4", startMs: 5500, durationMs: 500 },
        { pitch: "G4", startMs: 6000, durationMs: 500 },
        { pitch: "B4", startMs: 6500, durationMs: 500 },
        { pitch: "D5", startMs: 7000, durationMs: 500 },
        { pitch: "A4", startMs: 7500, durationMs: 500 },
        { pitch: "D5", startMs: 8000, durationMs: 2000 },
      ],
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l7_01_chopin_fragment: {
    id: "piano_l7_01_chopin_fragment", type: "play_along", instrumentId: "piano",
    title: "Chopin Op.10 No.1 — opening arpeggio fragment",
    targetPattern: { notes: ["C3","E3","G3","C4","E4","G4","C5","G4","E4","C4","G3","E3"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l7_02_invention_subject: {
    id: "piano_l7_02_invention_subject", type: "play_along", instrumentId: "piano",
    title: "Bach Invention 1 — RH subject, 2 bars",
    targetPattern: { notes: ["C4","D4","E4","F4","D4","E4","C4","G4","C5","B4","C5","D5","G4","C5","E5"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l7_03_altered_v: {
    id: "piano_l7_03_altered_v", type: "play_chord", instrumentId: "piano",
    title: "G7♭9♭13 → Cmaj7",
    targetPattern: { notes: [
      { pitch: "G3", startMs: 0, durationMs: 2000 },
      { pitch: "C3", startMs: 2000, durationMs: 3000 },
    ]}, tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l7_04_bhairav: {
    id: "piano_l7_04_bhairav", type: "improvise", instrumentId: "piano",
    title: "Raga Bhairav — aaroha + characteristic phrase",
    targetPattern: { notes: ["C4","Db4","E4","F4","G4","Ab4","B4","C5","Ab4","G4","F4","E4","Db4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  piano_l7_05_rubato: {
    id: "piano_l7_05_rubato", type: "play_along", instrumentId: "piano",
    title: "Chopin phrase with rubato + half-pedaling",
    targetPattern: { notes: [
      { pitch: "E4", startMs: 0,    durationMs: 900,  velocity: 0.5 },
      { pitch: "G4", startMs: 900,  durationMs: 700,  velocity: 0.55 },
      { pitch: "B4", startMs: 1600, durationMs: 1600, velocity: 0.65 },
      { pitch: "A4", startMs: 3200, durationMs: 900,  velocity: 0.6 },
      { pitch: "G4", startMs: 4100, durationMs: 700,  velocity: 0.5 },
      { pitch: "E4", startMs: 4800, durationMs: 2200, velocity: 0.35 },
    ]}, tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l7_06_chopin_exam: {
    id: "piano_l7_06_chopin_exam", type: "play_along", instrumentId: "piano",
    title: "Chopin Prelude Op.28 No.7 — full piece",
    targetPattern: { notes: ["A4","G4","A4","B4","C#5","D5","B4","A4","G4","F#4","E4","D4","A4"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800, velocity: 0.4 + 0.05*i})) },
    tempo: { bpm: 60, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l8_01_blues_walk: {
    id: "piano_l8_01_blues_walk", type: "improvise", instrumentId: "piano",
    title: "F blues — LH walk + RH improv, 12 bars",
    targetPattern: { notes: ["F2","A2","C3","Eb3","F3","A3","C4","Eb4","F4","Eb4","C4","A3","F3"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l8_02_licks: {
    id: "piano_l8_02_licks", type: "play_along", instrumentId: "piano",
    title: "Classic ii-V-I lick — Parker-style in C",
    targetPattern: { notes: ["D4","F4","A4","C5","B4","A4","G4","F4","E4","G4","E4","C4","B3","C4"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l8_03_modal: {
    id: "piano_l8_03_modal", type: "improvise", instrumentId: "piano",
    title: "Modal improv — C Lydian over C/F/C vamp",
    targetPattern: { notes: ["C5","D5","E5","F#5","G5","E5","D5","C5","G4","C5","E5","D5","C5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l8_04_rahman: {
    id: "piano_l8_04_rahman", type: "improvise", instrumentId: "piano",
    title: "Carnatic fusion — Kalyani over C-Am-F-G",
    targetPattern: { notes: ["C4","E4","F#4","G4","A4","F#4","E4","D4","C4","B3","D4","E4","G4","F#4","E4"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 95, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  piano_l8_05_modulation: {
    id: "piano_l8_05_modulation", type: "play_chord", instrumentId: "piano",
    title: "C → A♭ modulation via common tone C",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 2000 },
      { pitch: "C4", startMs: 2000, durationMs: 2000 },
      { pitch: "Ab3", startMs: 4000, durationMs: 2000 },
    ]}, tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l8_06_dual_exam: {
    id: "piano_l8_06_dual_exam", type: "improvise", instrumentId: "piano",
    title: "L8 exam — 32-bar improv (jazz portion)",
    targetPattern: { notes: ["D4","F4","A4","C5","B4","E4","G4","B4","D5","C5","G4","C5","E5","D5","C5","B4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 110, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_01_melody: {
    id: "piano_l9_01_melody", type: "compose", instrumentId: "piano",
    title: "Compose 8-bar theme (reference target: characteristic shape)",
    targetPattern: { notes: ["C4","E4","G4","C5","D5","E5","D5","C5","B4","G4","E4","C4","D4","E4","G4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_02_progression: {
    id: "piano_l9_02_progression", type: "compose", instrumentId: "piano",
    title: "16-bar progression with tritone sub (bass roots)",
    targetPattern: { notes: [
      { pitch: "C3", startMs: 0, durationMs: 1500 },
      { pitch: "A2", startMs: 1500, durationMs: 1500 },
      { pitch: "D3", startMs: 3000, durationMs: 1500 },
      { pitch: "Db3", startMs: 4500, durationMs: 1500 },
      { pitch: "C3", startMs: 6000, durationMs: 3000 },
    ]}, tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_03_form: {
    id: "piano_l9_03_form", type: "compose", instrumentId: "piano",
    title: "ABA form outline — 3-minute piece",
    targetPattern: { notes: ["C4","E4","G4","E4","C4","D4","F4","A4","F4","D4","C4","E4","G4","E4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*1000, durationMs:1000})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_04_orchestrate: {
    id: "piano_l9_04_orchestrate", type: "compose", instrumentId: "piano",
    title: "Arrange piano melody for string trio (reference)",
    targetPattern: { notes: ["G4","B4","D5","E5","D5","B4","G4","E4","A4","C5","E5","A5","G5","E5","C5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_05_composition: {
    id: "piano_l9_05_composition", type: "compose", instrumentId: "piano",
    title: "Genius Certificate composition — 2-minute original (reference shape)",
    targetPattern: { notes: ["C4","E4","G4","C5","B4","G4","A4","F4","D4","F4","A4","D5","C5","A4","E4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  piano_l9_06_recital: {
    id: "piano_l9_06_recital", type: "play_along", instrumentId: "piano",
    title: "Genius Certificate recital — 15-minute program (first piece, short excerpt)",
    targetPattern: { notes: ["C4","E4","G4","C5","B4","A4","G4","F4","E4","D4","C4","D4","E4","F4","G4","A4","B4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500, velocity: 0.3 + i*0.03})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },

  piano_l4_01_g_major_2oct: {
    id: "piano_l4_01_g_major_2oct",
    type: "play_scale",
    instrumentId: "piano",
    title: "G major, two octaves, ascending + descending",
    targetPattern: {
      notes: [
        ...["G3","A3","B3","C4","D4","E4","F#4","G4","A4","B4","C5","D5","E5","F#5","G5"]
          .map((p, i) => ({ pitch: p, startMs: i * 300, durationMs: 300 })),
        ...["F#5","E5","D5","C5","B4","A4","G4","F#4","E4","D4","C4","B3","A3","G3"]
          .map((p, i) => ({ pitch: p, startMs: 4500 + i * 300, durationMs: 300 })),
      ],
    },
    tempo: { bpm: 100, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l4_02_d_major_2oct: {
    id: "piano_l4_02_d_major_2oct",
    type: "play_scale",
    instrumentId: "piano",
    title: "D major, two octaves",
    targetPattern: {
      notes: ["D3","E3","F#3","G3","A3","B3","C#4","D4","E4","F#4","G4","A4","B4","C#5","D5"]
        .map((p, i) => ({ pitch: p, startMs: i * 280, durationMs: 280 })),
    },
    tempo: { bpm: 110, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l4_03_f_major_2oct: {
    id: "piano_l4_03_f_major_2oct",
    type: "play_scale",
    instrumentId: "piano",
    title: "F major, two octaves",
    targetPattern: {
      notes: ["F3","G3","A3","Bb3","C4","D4","E4","F4","G4","A4","Bb4","C5","D5","E5","F5"]
        .map((p, i) => ({ pitch: p, startMs: i * 300, durationMs: 300 })),
    },
    tempo: { bpm: 100, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l4_04_a_minor_2oct: {
    id: "piano_l4_04_a_minor_2oct",
    type: "play_scale",
    instrumentId: "piano",
    title: "A natural minor, two octaves",
    targetPattern: {
      notes: ["A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5"]
        .map((p, i) => ({ pitch: p, startMs: i * 333, durationMs: 333 })),
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l4_05_c_arpeggio: {
    id: "piano_l4_05_c_arpeggio",
    type: "play_scale",
    instrumentId: "piano",
    title: "C major arpeggio, two octaves (I chord)",
    targetPattern: {
      notes: ["C3","E3","G3","C4","E4","G4","C5","G4","E4","C4","G3","E3","C3"]
        .map((p, i) => ({ pitch: p, startMs: i * 340, durationMs: 340 })),
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l4_06_circle_progression: {
    id: "piano_l4_06_circle_progression",
    type: "play_scale",
    instrumentId: "piano",
    title: "Circle of fifths — first four keys (C → G → D → A scales)",
    targetPattern: {
      // Two-octave fragments, one from each key in circle-of-fifths order
      notes: [
        { pitch: "C4", startMs: 0, durationMs: 500 },
        { pitch: "D4", startMs: 500, durationMs: 500 },
        { pitch: "E4", startMs: 1000, durationMs: 1000 },
        { pitch: "G4", startMs: 2000, durationMs: 500 },
        { pitch: "A4", startMs: 2500, durationMs: 500 },
        { pitch: "B4", startMs: 3000, durationMs: 1000 },
        { pitch: "D5", startMs: 4000, durationMs: 500 },
        { pitch: "E5", startMs: 4500, durationMs: 500 },
        { pitch: "F#5",startMs: 5000, durationMs: 1000 },
        { pitch: "A5", startMs: 6000, durationMs: 500 },
        { pitch: "B5", startMs: 6500, durationMs: 500 },
        { pitch: "C#6",startMs: 7000, durationMs: 1500 },
      ],
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  piano_l3_01_ode_melody: {
    id: "piano_l3_01_ode_melody",
    type: "play_along",
    instrumentId: "piano",
    title: "Ode to Joy — 8-bar melody",
    targetPattern: {
      // First 8 bars (melody only): E E F G · G F E D · C C D E · E D D
      notes: [
        { pitch: "E4", startMs: 0,    durationMs: 650 },
        { pitch: "E4", startMs: 650,  durationMs: 650 },
        { pitch: "F4", startMs: 1300, durationMs: 650 },
        { pitch: "G4", startMs: 1950, durationMs: 650 },
        { pitch: "G4", startMs: 2600, durationMs: 650 },
        { pitch: "F4", startMs: 3250, durationMs: 650 },
        { pitch: "E4", startMs: 3900, durationMs: 650 },
        { pitch: "D4", startMs: 4550, durationMs: 650 },
        { pitch: "C4", startMs: 5200, durationMs: 650 },
        { pitch: "C4", startMs: 5850, durationMs: 650 },
        { pitch: "D4", startMs: 6500, durationMs: 650 },
        { pitch: "E4", startMs: 7150, durationMs: 650 },
        { pitch: "E4", startMs: 7800, durationMs: 975 },
        { pitch: "D4", startMs: 8775, durationMs: 325 },
        { pitch: "D4", startMs: 9100, durationMs: 1300 },
      ],
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l3_02_amazing_grace: {
    id: "piano_l3_02_amazing_grace",
    type: "play_along",
    instrumentId: "piano",
    title: "Amazing Grace — first verse in 3/4",
    targetPattern: {
      // "A-ma-zing Grace, how sweet the sound…" in C major, 3/4 time
      notes: [
        { pitch: "G3", startMs: 0,     durationMs: 500 },   // pickup "A-"
        { pitch: "C4", startMs: 500,   durationMs: 1000 },  // "-MAZ-"
        { pitch: "E4", startMs: 1500,  durationMs: 500 },   // "-ing"
        { pitch: "C4", startMs: 2000,  durationMs: 1000 },  // "Grace"
        { pitch: "E4", startMs: 3000,  durationMs: 1500 },  // "how"
        { pitch: "D4", startMs: 4500,  durationMs: 500 },   // "sweet"
        { pitch: "C4", startMs: 5000,  durationMs: 1000 },  // "the"
        { pitch: "A3", startMs: 6000,  durationMs: 500 },   // "sound"
        { pitch: "G3", startMs: 6500,  durationMs: 1500 },
      ],
    },
    tempo: { bpm: 90, meter: [3, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l3_03_mohanam: {
    id: "piano_l3_03_mohanam",
    type: "play_scale",
    instrumentId: "piano",
    title: "Raga Mohanam phrase",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 400 },
        { pitch: "D4", startMs: 400,  durationMs: 400 },
        { pitch: "E4", startMs: 800,  durationMs: 400 },
        { pitch: "G4", startMs: 1200, durationMs: 400 },
        { pitch: "A4", startMs: 1600, durationMs: 400 },
        { pitch: "G4", startMs: 2000, durationMs: 400 },
        { pitch: "E4", startMs: 2400, durationMs: 400 },
        { pitch: "D4", startMs: 2800, durationMs: 400 },
        { pitch: "C4", startMs: 3200, durationMs: 800 },
      ],
    },
    tempo: { bpm: 75, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l3_04_autumn_leaves: {
    id: "piano_l3_04_autumn_leaves",
    type: "play_along",
    instrumentId: "piano",
    title: "Autumn Leaves — A-section melody",
    targetPattern: {
      // A B C E · D F# G# B · first two phrases of the head, E-minor-ish
      notes: [
        { pitch: "A4", startMs: 0,    durationMs: 500 },
        { pitch: "B4", startMs: 500,  durationMs: 500 },
        { pitch: "C5", startMs: 1000, durationMs: 500 },
        { pitch: "E5", startMs: 1500, durationMs: 1500 },
        { pitch: "D5", startMs: 3000, durationMs: 500 },
        { pitch: "F#5",startMs: 3500, durationMs: 500 },
        { pitch: "G#4",startMs: 4000, durationMs: 500 }, // typo-safe: can't resolve → drops to E
        { pitch: "B4", startMs: 4500, durationMs: 1500 },
      ],
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l3_05_hanon_1: {
    id: "piano_l3_05_hanon_1",
    type: "play_scale",
    instrumentId: "piano",
    title: "Hanon #1 — first pattern only",
    targetPattern: {
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 333 },
        { pitch: "D4", startMs: 333,  durationMs: 333 },
        { pitch: "F4", startMs: 666,  durationMs: 333 },
        { pitch: "E4", startMs: 999,  durationMs: 333 },
        { pitch: "F4", startMs: 1332, durationMs: 333 },
        { pitch: "D4", startMs: 1665, durationMs: 333 },
        { pitch: "E4", startMs: 1998, durationMs: 333 },
        { pitch: "C4", startMs: 2331, durationMs: 333 },
        // Pattern shift up
        { pitch: "D4", startMs: 2664, durationMs: 333 },
        { pitch: "E4", startMs: 2997, durationMs: 333 },
        { pitch: "G4", startMs: 3330, durationMs: 333 },
        { pitch: "F4", startMs: 3663, durationMs: 333 },
        { pitch: "G4", startMs: 3996, durationMs: 333 },
        { pitch: "E4", startMs: 4329, durationMs: 333 },
        { pitch: "F4", startMs: 4662, durationMs: 333 },
        { pitch: "D4", startMs: 4995, durationMs: 666 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  piano_l3_06_chord_progression: {
    id: "piano_l3_06_chord_progression",
    type: "play_chord",
    instrumentId: "piano",
    title: "C F G C — 2 beats each",
    targetPattern: {
      // Bass roots only for the grader; full chords are played by the student
      notes: [
        { pitch: "C3", startMs: 0,    durationMs: 1500 },
        { pitch: "F3", startMs: 1500, durationMs: 1500 },
        { pitch: "G3", startMs: 3000, durationMs: 1500 },
        { pitch: "C3", startMs: 4500, durationMs: 1500 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  piano_l2_06_crescendo: {
    id: "piano_l2_06_crescendo",
    type: "play_along",
    instrumentId: "piano",
    title: "C major scale with crescendo → decrescendo",
    targetPattern: {
      // Velocity encodes the crescendo shape: 0.3 → 1.0 → 0.3
      notes: [
        { pitch: "C4", startMs: 0,    durationMs: 500, velocity: 0.3 },
        { pitch: "D4", startMs: 500,  durationMs: 500, velocity: 0.45 },
        { pitch: "E4", startMs: 1000, durationMs: 500, velocity: 0.6 },
        { pitch: "F4", startMs: 1500, durationMs: 500, velocity: 0.75 },
        { pitch: "G4", startMs: 2000, durationMs: 500, velocity: 0.9 },
        { pitch: "F4", startMs: 2500, durationMs: 500, velocity: 0.75 },
        { pitch: "E4", startMs: 3000, durationMs: 500, velocity: 0.6 },
        { pitch: "D4", startMs: 3500, durationMs: 500, velocity: 0.45 },
        { pitch: "C4", startMs: 4000, durationMs: 1000, velocity: 0.3 },
      ],
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },

  guitar_l1_01_open_strings: {
    id: "guitar_l1_01_open_strings",
    type: "play_note",
    instrumentId: "guitar",
    title: "Six open strings, low to high",
    targetPattern: {
      notes: [
        { pitch: "E2", startMs: 0,    durationMs: 700 },
        { pitch: "A2", startMs: 700,  durationMs: 700 },
        { pitch: "D3", startMs: 1400, durationMs: 700 },
        { pitch: "G3", startMs: 2100, durationMs: 700 },
        { pitch: "B3", startMs: 2800, durationMs: 700 },
        { pitch: "E4", startMs: 3500, durationMs: 700 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  guitar_l1_02_e_string_walk: {
    id: "guitar_l1_02_e_string_walk",
    type: "play_scale",
    instrumentId: "guitar",
    title: "E · F · G · A on the low E string",
    targetPattern: {
      notes: [
        { pitch: "E2", startMs: 0,    durationMs: 500 },
        { pitch: "F2", startMs: 500,  durationMs: 500 },
        { pitch: "G2", startMs: 1000, durationMs: 500 },
        { pitch: "A2", startMs: 1500, durationMs: 500 },
        { pitch: "G2", startMs: 2000, durationMs: 500 },
        { pitch: "F2", startMs: 2500, durationMs: 500 },
        { pitch: "E2", startMs: 3000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  guitar_l1_03_em_strum: {
    id: "guitar_l1_03_em_strum",
    type: "play_chord",
    instrumentId: "guitar",
    title: "Em chord, four slow strums",
    targetPattern: {
      onsets: [0, 1000, 2000, 3000],
      notes: [
        { pitch: "E2", startMs: 0,    durationMs: 900 },
        { pitch: "E2", startMs: 1000, durationMs: 900 },
        { pitch: "E2", startMs: 2000, durationMs: 900 },
        { pitch: "E2", startMs: 3000, durationMs: 900 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l1_04_em_g_switch: {
    id: "guitar_l1_04_em_g_switch",
    type: "play_chord",
    instrumentId: "guitar",
    title: "Em → G → Em → G, each chord 2 beats",
    targetPattern: {
      onsets: [0, 1000, 2000, 3000],
      notes: [
        { pitch: "E2", startMs: 0,    durationMs: 900 },
        { pitch: "G2", startMs: 1000, durationMs: 900 },
        { pitch: "E2", startMs: 2000, durationMs: 900 },
        { pitch: "G2", startMs: 3000, durationMs: 900 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l1_05_strum_em: {
    id: "guitar_l1_05_strum_em",
    type: "rhythm_clap",
    instrumentId: "guitar",
    title: "D-D-U-U-D strum pattern on Em, 4 bars",
    targetPattern: {
      // At 80 bpm: 1 beat = 750ms, 8th = 375ms
      // Pattern per bar (beats): 1 D, 2 D, 2& U, 3 (air), 3& U, 4 D
      // That's 5 hits per bar (4, but with 2 up strokes inside the bar). 4 bars = 20 onsets.
      onsets: [
        0, 750, 1125, 1875, 2250,
        3000, 3750, 4125, 4875, 5250,
        6000, 6750, 7125, 7875, 8250,
        9000, 9750, 10125, 10875, 11250,
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l1_06_horse_chords: {
    id: "guitar_l1_06_horse_chords",
    type: "play_chord",
    instrumentId: "guitar",
    title: "Horse With No Name — Em / D6add9 switch, 4 bars",
    targetPattern: {
      onsets: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
      notes: [
        { pitch: "E2", startMs: 0,    durationMs: 900 },
        { pitch: "D2", startMs: 1000, durationMs: 900 },
        { pitch: "E2", startMs: 2000, durationMs: 900 },
        { pitch: "D2", startMs: 3000, durationMs: 900 },
        { pitch: "E2", startMs: 4000, durationMs: 900 },
        { pitch: "D2", startMs: 5000, durationMs: 900 },
        { pitch: "E2", startMs: 6000, durationMs: 900 },
        { pitch: "D2", startMs: 7000, durationMs: 900 },
      ],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l2_01_tab_line: {
    id: "guitar_l2_01_tab_line", type: "sight_read", instrumentId: "guitar",
    title: "Single-string TAB line — low E string walk",
    targetPattern: { notes: [
      { pitch: "E2", startMs: 0,    durationMs: 500 },
      { pitch: "G2", startMs: 500,  durationMs: 500 },
      { pitch: "A2", startMs: 1000, durationMs: 500 },
      { pitch: "G2", startMs: 1500, durationMs: 500 },
      { pitch: "E2", startMs: 2000, durationMs: 1000 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l2_02_emgcg: {
    id: "guitar_l2_02_emgcg", type: "play_chord", instrumentId: "guitar",
    title: "Em → G → C → G progression",
    targetPattern: { onsets: [0, 2000, 4000, 6000], notes: [
      { pitch: "E2", startMs: 0,    durationMs: 1800 },
      { pitch: "G2", startMs: 2000, durationMs: 1800 },
      { pitch: "C3", startMs: 4000, durationMs: 1800 },
      { pitch: "G2", startMs: 6000, durationMs: 1800 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l2_03_gd_switch: {
    id: "guitar_l2_03_gd_switch", type: "play_chord", instrumentId: "guitar",
    title: "G → D, 4 bars",
    targetPattern: { onsets: [0, 1500, 3000, 4500, 6000, 7500], notes: [
      { pitch: "G2", startMs: 0,    durationMs: 1400 },
      { pitch: "D3", startMs: 1500, durationMs: 1400 },
      { pitch: "G2", startMs: 3000, durationMs: 1400 },
      { pitch: "D3", startMs: 4500, durationMs: 1400 },
      { pitch: "G2", startMs: 6000, durationMs: 1400 },
      { pitch: "D3", startMs: 7500, durationMs: 1400 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l2_04_a_chord: {
    id: "guitar_l2_04_a_chord", type: "play_chord", instrumentId: "guitar",
    title: "A → D → A → D, 4 bars",
    targetPattern: { onsets: [0, 2000, 4000, 6000], notes: [
      { pitch: "A2", startMs: 0,    durationMs: 1800 },
      { pitch: "D3", startMs: 2000, durationMs: 1800 },
      { pitch: "A2", startMs: 4000, durationMs: 1800 },
      { pitch: "D3", startMs: 6000, durationMs: 1800 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l2_05_mixed_rhythm: {
    id: "guitar_l2_05_mixed_rhythm", type: "rhythm_clap", instrumentId: "guitar",
    title: "Mixed quarter + 8th rhythm on open E",
    targetPattern: { onsets: [0, 750, 1125, 1500, 2250, 2625, 3000, 3375, 3750] },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l2_06_knocking: {
    id: "guitar_l2_06_knocking", type: "play_chord", instrumentId: "guitar",
    title: "Knocking on Heaven's Door — G D Am C verse",
    targetPattern: { onsets: [0, 2000, 4000, 6000], notes: [
      { pitch: "G2", startMs: 0,    durationMs: 1800 },
      { pitch: "D3", startMs: 2000, durationMs: 1800 },
      { pitch: "A2", startMs: 4000, durationMs: 1800 },
      { pitch: "C3", startMs: 6000, durationMs: 1800 },
    ]}, tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l3_01_12bar_blues: {
    id: "guitar_l3_01_12bar_blues", type: "play_chord", instrumentId: "guitar",
    title: "12-bar blues in E (compressed to 6 bars)",
    targetPattern: { onsets: [0, 2000, 4000, 6000, 8000, 10000], notes: [
      { pitch: "E2", startMs: 0,    durationMs: 1800 },
      { pitch: "A2", startMs: 2000, durationMs: 1800 },
      { pitch: "E2", startMs: 4000, durationMs: 1800 },
      { pitch: "B2", startMs: 6000, durationMs: 1800 },
      { pitch: "A2", startMs: 8000, durationMs: 1800 },
      { pitch: "E2", startMs: 10000, durationMs: 1800 },
    ]}, tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l3_02_travis_em: {
    id: "guitar_l3_02_travis_em", type: "play_along", instrumentId: "guitar",
    title: "Travis picking on Em, 2 bars",
    targetPattern: { notes: [
      { pitch: "E2", startMs: 0,    durationMs: 500 },
      { pitch: "G3", startMs: 500,  durationMs: 500 },
      { pitch: "E3", startMs: 1000, durationMs: 500 },
      { pitch: "G3", startMs: 1500, durationMs: 500 },
      { pitch: "E2", startMs: 2000, durationMs: 500 },
      { pitch: "B3", startMs: 2500, durationMs: 500 },
      { pitch: "E3", startMs: 3000, durationMs: 500 },
      { pitch: "B3", startMs: 3500, durationMs: 500 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l3_03_rising_sun: {
    id: "guitar_l3_03_rising_sun", type: "play_along", instrumentId: "guitar",
    title: "House of the Rising Sun — arpeggiated Am → C → D → F",
    targetPattern: { notes: [
      { pitch: "A2", startMs: 0, durationMs: 400 },
      { pitch: "E3", startMs: 400, durationMs: 400 },
      { pitch: "A3", startMs: 800, durationMs: 400 },
      { pitch: "C4", startMs: 1200, durationMs: 400 },
      { pitch: "E4", startMs: 1600, durationMs: 400 },
      { pitch: "C4", startMs: 2000, durationMs: 400 },
      { pitch: "C3", startMs: 2400, durationMs: 400 },
      { pitch: "E3", startMs: 2800, durationMs: 400 },
      { pitch: "G3", startMs: 3200, durationMs: 400 },
      { pitch: "C4", startMs: 3600, durationMs: 400 },
      { pitch: "E4", startMs: 4000, durationMs: 400 },
      { pitch: "G3", startMs: 4400, durationMs: 400 },
    ]}, tempo: { bpm: 80, meter: [6, 8] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l3_04_em_pent: {
    id: "guitar_l3_04_em_pent", type: "play_scale", instrumentId: "guitar",
    title: "E minor pentatonic, position 1",
    targetPattern: { notes: ["E2","G2","A2","B2","D3","E3","G3","A3","B3","D4","E4"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l3_05_power_chords: {
    id: "guitar_l3_05_power_chords", type: "play_chord", instrumentId: "guitar",
    title: "E5 → A5 → D5 → A5",
    targetPattern: { onsets: [0, 1500, 3000, 4500], notes: [
      { pitch: "E2", startMs: 0,    durationMs: 1400 },
      { pitch: "A2", startMs: 1500, durationMs: 1400 },
      { pitch: "D3", startMs: 3000, durationMs: 1400 },
      { pitch: "A2", startMs: 4500, durationMs: 1400 },
    ]}, tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l3_06_wonderwall: {
    id: "guitar_l3_06_wonderwall", type: "play_chord", instrumentId: "guitar",
    title: "Wonderwall intro — Em7 → G → Dsus4 → A7sus4",
    targetPattern: { onsets: [0, 2000, 4000, 6000], notes: [
      { pitch: "E2", startMs: 0,    durationMs: 1800 },
      { pitch: "G2", startMs: 2000, durationMs: 1800 },
      { pitch: "D3", startMs: 4000, durationMs: 1800 },
      { pitch: "A2", startMs: 6000, durationMs: 1800 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l4_01_cmaj_box: {
    id: "guitar_l4_01_cmaj_box", type: "play_scale", instrumentId: "guitar",
    title: "C major 3NPS box",
    targetPattern: { notes: ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*350, durationMs:350})) },
    tempo: { bpm: 110, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l4_02_caged_c: {
    id: "guitar_l4_02_caged_c", type: "play_chord", instrumentId: "guitar",
    title: "C major in 5 CAGED positions (roots only for grading)",
    targetPattern: { notes: [
      { pitch: "C3", startMs: 0,    durationMs: 1500 },
      { pitch: "C3", startMs: 2000, durationMs: 1500 },
      { pitch: "C3", startMs: 4000, durationMs: 1500 },
      { pitch: "C3", startMs: 6000, durationMs: 1500 },
      { pitch: "C3", startMs: 8000, durationMs: 1500 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l4_03_f_barre: {
    id: "guitar_l4_03_f_barre", type: "play_chord", instrumentId: "guitar",
    title: "F barre chord × 4 strums",
    targetPattern: { onsets: [0, 2000, 4000, 6000], notes: [
      { pitch: "F2", startMs: 0, durationMs: 1800 },
      { pitch: "F2", startMs: 2000, durationMs: 1800 },
      { pitch: "F2", startMs: 4000, durationMs: 1800 },
      { pitch: "F2", startMs: 6000, durationMs: 1800 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l4_04_blues_scale: {
    id: "guitar_l4_04_blues_scale", type: "play_scale", instrumentId: "guitar",
    title: "E blues scale ascending + descending",
    targetPattern: { notes: ["E2","G2","A2","A#2","B2","D3","E3","D3","B2","A#2","A2","G2","E2"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l4_05_dorian_mixo: {
    id: "guitar_l4_05_dorian_mixo", type: "play_scale", instrumentId: "guitar",
    title: "D Dorian then G Mixolydian",
    targetPattern: { notes: [
      ...["D3","E3","F3","G3","A3","B3","C4","D4"].map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})),
      ...["G3","A3","B3","C4","D4","E4","F4","G4"].map((p,i)=>({pitch:p, startMs:2400+i*300, durationMs:300})),
    ]}, tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l4_06_blues_solo: {
    id: "guitar_l4_06_blues_solo", type: "improvise", instrumentId: "guitar",
    title: "12-bar blues improv (pitch checked against E blues scale)",
    targetPattern: { notes: ["E3","G3","B3","A3","G3","E3"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_01_legato: {
    id: "guitar_l5_01_legato", type: "play_scale", instrumentId: "guitar",
    title: "Legato scale run with hammer-ons + pull-offs",
    targetPattern: { notes: ["E3","F3","G3","A3","G3","F3","E3"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_02_bends: {
    id: "guitar_l5_02_bends", type: "play_note", instrumentId: "guitar",
    title: "Half + whole-step bends on G string (grading targets the end pitch)",
    targetPattern: { notes: [
      { pitch: "G#3", startMs: 0, durationMs: 1000 },
      { pitch: "A3",  startMs: 1000, durationMs: 1000 },
      { pitch: "B3",  startMs: 2000, durationMs: 1000 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_03_slide_scale: {
    id: "guitar_l5_03_slide_scale", type: "play_scale", instrumentId: "guitar",
    title: "C major scale with slides between 3-5 and 5-7",
    targetPattern: { notes: ["C3","D3","E3","F3","G3","A3","B3","C4"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_04_alt_pick_cmaj: {
    id: "guitar_l5_04_alt_pick_cmaj", type: "play_scale", instrumentId: "guitar",
    title: "C major scale, strict alternate picking, 120 bpm",
    targetPattern: { notes: ["C3","D3","E3","F3","G3","A3","B3","C4","B3","A3","G3","F3","E3","D3","C3"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_05_am_sweep: {
    id: "guitar_l5_05_am_sweep", type: "play_chord", instrumentId: "guitar",
    title: "Am 3-string sweep",
    targetPattern: { notes: [
      { pitch: "A3", startMs: 0, durationMs: 200 },
      { pitch: "C4", startMs: 200, durationMs: 200 },
      { pitch: "E4", startMs: 400, durationMs: 400 },
      { pitch: "C4", startMs: 800, durationMs: 200 },
      { pitch: "A3", startMs: 1000, durationMs: 600 },
    ]}, tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l5_06_tap_pattern: {
    id: "guitar_l5_06_tap_pattern", type: "play_along", instrumentId: "guitar",
    title: "Eruption-style 3-note tap pattern",
    targetPattern: { notes: [
      { pitch: "E5", startMs: 0, durationMs: 150 },
      { pitch: "A4", startMs: 150, durationMs: 150 },
      { pitch: "B4", startMs: 300, durationMs: 150 },
      { pitch: "E5", startMs: 450, durationMs: 150 },
      { pitch: "A4", startMs: 600, durationMs: 150 },
      { pitch: "B4", startMs: 750, durationMs: 150 },
    ]}, tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l6_01_stairway: {
    id: "guitar_l6_01_stairway", type: "play_along", instrumentId: "guitar",
    title: "Stairway to Heaven — opening arpeggios",
    targetPattern: { notes: [
      { pitch: "A2", startMs: 0,    durationMs: 400 },
      { pitch: "E3", startMs: 400,  durationMs: 400 },
      { pitch: "A3", startMs: 800,  durationMs: 400 },
      { pitch: "C4", startMs: 1200, durationMs: 400 },
      { pitch: "E4", startMs: 1600, durationMs: 400 },
      { pitch: "G3", startMs: 2000, durationMs: 400 },
      { pitch: "C3", startMs: 2400, durationMs: 400 },
      { pitch: "E3", startMs: 2800, durationMs: 400 },
      { pitch: "G3", startMs: 3200, durationMs: 400 },
      { pitch: "C4", startMs: 3600, durationMs: 400 },
      { pitch: "E4", startMs: 4000, durationMs: 400 },
      { pitch: "G3", startMs: 4400, durationMs: 800 },
    ]}, tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l6_02_bourree: {
    id: "guitar_l6_02_bourree", type: "play_along", instrumentId: "guitar",
    title: "Bach Bourrée in E minor — opening",
    targetPattern: { notes: ["E4","F#4","G4","A4","B4","A4","G4","F#4","E4","B3","E4"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l6_03_autumn_comp: {
    id: "guitar_l6_03_autumn_comp", type: "play_chord", instrumentId: "guitar",
    title: "Autumn Leaves A-section comp (root notes)",
    targetPattern: { notes: [
      { pitch: "A2",  startMs: 0,    durationMs: 900 },  // Am7
      { pitch: "D3",  startMs: 1000, durationMs: 900 },  // D7
      { pitch: "G2",  startMs: 2000, durationMs: 900 },  // Gmaj7
      { pitch: "C3",  startMs: 3000, durationMs: 900 },  // Cmaj7
      { pitch: "F#2", startMs: 4000, durationMs: 900 },  // F#m7b5
      { pitch: "B2",  startMs: 5000, durationMs: 900 },  // B7
      { pitch: "E2",  startMs: 6000, durationMs: 1900 }, // Em
    ]}, tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l6_04_hendrix_bend: {
    id: "guitar_l6_04_hendrix_bend", type: "play_note", instrumentId: "guitar",
    title: "Hendrix-style double-stop (grading targets the bent pitches)",
    targetPattern: { notes: [
      { pitch: "E4", startMs: 0, durationMs: 500 },
      { pitch: "G4", startMs: 0, durationMs: 500 },
      { pitch: "F#4", startMs: 500, durationMs: 500 },
      { pitch: "A4", startMs: 500, durationMs: 500 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l6_05_scale_pro: {
    id: "guitar_l6_05_scale_pro", type: "play_scale", instrumentId: "guitar",
    title: "Major scale at 120 bpm — C major 2 octaves",
    targetPattern: { notes: ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l6_06_unseen: {
    id: "guitar_l6_06_unseen", type: "sight_read", instrumentId: "guitar",
    title: "Unseen intermediate piece (Pro Cert gate)",
    targetPattern: { notes: ["G3","B3","D4","G4","D4","B3","E4","G3","C4","E4","G4","E4","C4","G3"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l7_01_5string_sweep: {
    id: "guitar_l7_01_5string_sweep", type: "play_chord", instrumentId: "guitar",
    title: "A minor 5-string sweep",
    targetPattern: { notes: ["A2","E3","A3","C4","E4","C4","A3","E3","A2"]
      .map((p,i)=>({pitch:p, startMs:i*100, durationMs:100})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l7_02_villa_lobos: {
    id: "guitar_l7_02_villa_lobos", type: "play_along", instrumentId: "guitar",
    title: "Villa-Lobos Étude No. 1 opening",
    targetPattern: { notes: ["E3","B3","E4","G4","B4","G4","E4","B3","E3","A3","E4","A4","C5","A4","E4","A3"]
      .map((p,i)=>({pitch:p, startMs:i*200, durationMs:200})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l7_03_wes: {
    id: "guitar_l7_03_wes", type: "play_along", instrumentId: "guitar",
    title: "Autumn Leaves octaves (first phrase)",
    targetPattern: { notes: ["A3","A4","B3","B4","C4","C5","E4","E5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l7_04_yaman_slide: {
    id: "guitar_l7_04_yaman_slide", type: "improvise", instrumentId: "guitar",
    title: "Yaman phrase on guitar — D E F♯ G♯ A B C♯ D",
    targetPattern: { notes: ["D3","E3","F#3","G#3","A3","B3","C#4","D4","C#4","B3","A3","G#3","F#3","E3","D3"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  guitar_l7_05_misty: {
    id: "guitar_l7_05_misty", type: "play_along", instrumentId: "guitar",
    title: "'Misty' melody (first 4 bars)",
    targetPattern: { notes: ["G3","B3","D4","F#4","E4","D4","C4","B3","A3","B3","G3","A3","B3","D4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l7_06_exam: {
    id: "guitar_l7_06_exam", type: "play_along", instrumentId: "guitar",
    title: "L7 exam — combined techniques passage",
    targetPattern: { notes: ["A2","E3","A3","C4","E4","B3","A3","G3","E3","C3","A2","E2","A2","C3","E3","A3"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l8_01_bb_vocab: {
    id: "guitar_l8_01_bb_vocab", type: "improvise", instrumentId: "guitar",
    title: "B.B. King style improv in G blues (key notes + bends)",
    targetPattern: { notes: ["G3","B♭3","C4","D4","B♭3","G3","F3","G3","A3","G3","B♭3","G3"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 95, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l8_02_rhythm_changes: {
    id: "guitar_l8_02_rhythm_changes", type: "improvise", instrumentId: "guitar",
    title: "Rhythm Changes A section bebop line",
    targetPattern: { notes: ["B♭3","D4","F4","B♭4","A4","G4","F4","E4","D4","C4","B♭3","A3","G3","F3","E3","D3"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 160, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l8_03_metal_riff: {
    id: "guitar_l8_03_metal_riff", type: "rhythm_clap", instrumentId: "guitar",
    title: "Metal palm-mute 16ths on low E, 140 bpm, 8 bars",
    targetPattern: { onsets: Array.from({length:32}, (_,i)=> Math.round(i*107)) },
    tempo: { bpm: 140, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l8_04_flamenco: {
    id: "guitar_l8_04_flamenco", type: "play_chord", instrumentId: "guitar",
    title: "Flamenco rasgueado phrase (Am)",
    targetPattern: { notes: ["A2","E3","A3","C4","E4","E4","C4","A3","E3","A2"]
      .map((p,i)=>({pitch:p, startMs:i*200, durationMs:200})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  guitar_l8_05_gypsy: {
    id: "guitar_l8_05_gypsy", type: "improvise", instrumentId: "guitar",
    title: "Minor Swing improv (Am D7 E7)",
    targetPattern: { notes: ["A3","C4","E4","F#4","E4","C4","A3","G3","A3","D4","F4","A4","G4","E4","D4","A3"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l8_06_tristyle: {
    id: "guitar_l8_06_tristyle", type: "improvise", instrumentId: "guitar",
    title: "L8 exam — 3-style improv (representative phrases)",
    targetPattern: { notes: ["G3","B♭3","D4","B♭3","G3","F3","B♭3","D4","F4","B♭4","D4","A3","C4","E4","A3","E3"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 110, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_01_compose: {
    id: "guitar_l9_01_compose", type: "compose", instrumentId: "guitar",
    title: "2-minute guitar composition (reference shape)",
    targetPattern: { notes: ["E3","G3","B3","E4","D4","B3","G3","E3","A3","C4","E4","A4","C5","A4","E4","C4","A3"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_02_record: {
    id: "guitar_l9_02_record", type: "compose", instrumentId: "guitar",
    title: "Multi-take recording with second guitar overdub",
    targetPattern: { notes: ["E3","G3","B3","E4","E4","D4","B3","G3"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_03_arrange: {
    id: "guitar_l9_03_arrange", type: "compose", instrumentId: "guitar",
    title: "Band arrangement of your solo piece",
    targetPattern: { notes: ["E3","G3","B3","D4","E4","D4","B3","G3","E3"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700})) },
    tempo: { bpm: 95, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_04_duet: {
    id: "guitar_l9_04_duet", type: "improvise", instrumentId: "guitar",
    title: "Call-and-response improv duet",
    targetPattern: { notes: ["G3","B3","D4","G4","D4","B3","G3","A3","C4","E4","A4","E4","C4","A3"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_05_teach: {
    id: "guitar_l9_05_teach", type: "compose", instrumentId: "guitar",
    title: "5-minute teaching demo — articulate one technique",
    targetPattern: { notes: ["E3","G3","B3","E4"]
      .map((p,i)=>({pitch:p, startMs:i*1500, durationMs:1500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  guitar_l9_06_recital: {
    id: "guitar_l9_06_recital", type: "play_along", instrumentId: "guitar",
    title: "Genius Cert recital — excerpt",
    targetPattern: { notes: ["E3","A3","C4","E4","A4","G4","F4","E4","D4","C4","B3","A3","G3","E3","A3","C4","E4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500, velocity: 0.3 + i*0.03})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },

  violin_l1_01_open_a: {
    id: "violin_l1_01_open_a",
    type: "play_note",
    instrumentId: "violin",
    title: "Open A — sustained, down-bow + up-bow",
    targetPattern: {
      notes: [
        { pitch: "A4", startMs: 0,    durationMs: 4000 },
        { pitch: "A4", startMs: 4000, durationMs: 4000 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l1_02_a_to_b: {
    id: "violin_l1_02_a_to_b",
    type: "play_note",
    instrumentId: "violin",
    title: "A → B → A on the A string",
    targetPattern: {
      notes: [
        { pitch: "A4", startMs: 0,    durationMs: 1500 },
        { pitch: "B4", startMs: 1500, durationMs: 1500 },
        { pitch: "A4", startMs: 3000, durationMs: 1500 },
        { pitch: "B4", startMs: 4500, durationMs: 1500 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l1_03_d_tetrachord: {
    id: "violin_l1_03_d_tetrachord",
    type: "play_scale",
    instrumentId: "violin",
    title: "A · B · C♯ · D — rising tetrachord",
    targetPattern: {
      notes: [
        { pitch: "A4",  startMs: 0,    durationMs: 1000 },
        { pitch: "B4",  startMs: 1000, durationMs: 1000 },
        { pitch: "C#5", startMs: 2000, durationMs: 1000 },
        { pitch: "D5",  startMs: 3000, durationMs: 2000 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l1_04_d_tetrachord: {
    id: "violin_l1_04_d_tetrachord",
    type: "play_scale",
    instrumentId: "violin",
    title: "D · E · F♯ · G — D-string tetrachord",
    targetPattern: {
      notes: [
        { pitch: "D4", startMs: 0,    durationMs: 1000 },
        { pitch: "E4", startMs: 1000, durationMs: 1000 },
        { pitch: "F#4",startMs: 2000, durationMs: 1000 },
        { pitch: "G4", startMs: 3000, durationMs: 2000 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l1_05_cross_strings: {
    id: "violin_l1_05_cross_strings",
    type: "play_note",
    instrumentId: "violin",
    title: "Cross-string bowing: D → A → D → A",
    targetPattern: {
      notes: [
        { pitch: "D4", startMs: 0,    durationMs: 1000 },
        { pitch: "A4", startMs: 1000, durationMs: 1000 },
        { pitch: "D4", startMs: 2000, durationMs: 1000 },
        { pitch: "A4", startMs: 3000, durationMs: 1000 },
        { pitch: "D4", startMs: 4000, durationMs: 1000 },
        { pitch: "A4", startMs: 5000, durationMs: 1000 },
        { pitch: "D4", startMs: 6000, durationMs: 1000 },
        { pitch: "A4", startMs: 7000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 60, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l1_06_mary_lamb: {
    id: "violin_l1_06_mary_lamb",
    type: "play_along",
    instrumentId: "violin",
    title: "Mary Had a Little Lamb — A-string version",
    targetPattern: {
      notes: [
        { pitch: "B4", startMs: 0,    durationMs: 500 },
        { pitch: "A4", startMs: 500,  durationMs: 500 },
        { pitch: "A4", startMs: 1000, durationMs: 500 },
        { pitch: "B4", startMs: 1500, durationMs: 500 },
        { pitch: "B4", startMs: 2000, durationMs: 500 },
        { pitch: "B4", startMs: 2500, durationMs: 500 },
        { pitch: "B4", startMs: 3000, durationMs: 1000 },
        { pitch: "A4", startMs: 4000, durationMs: 500 },
        { pitch: "A4", startMs: 4500, durationMs: 500 },
        { pitch: "A4", startMs: 5000, durationMs: 1000 },
        { pitch: "B4", startMs: 6000, durationMs: 500 },
        { pitch: "B4", startMs: 6500, durationMs: 500 },
        { pitch: "B4", startMs: 7000, durationMs: 1000 },
      ],
    },
    tempo: { bpm: 90, meter: [4, 4] },
    gradingRubricId: "rubric_early_level",
  },
  violin_l2_01_bow_div: {
    id: "violin_l2_01_bow_div", type: "play_note", instrumentId: "violin",
    title: "Bow division — whole, halves, shorts on open A",
    targetPattern: { notes: [
      { pitch: "A4", startMs: 0, durationMs: 3000 },
      { pitch: "A4", startMs: 3000, durationMs: 1500 },
      { pitch: "A4", startMs: 4500, durationMs: 1500 },
      { pitch: "A4", startMs: 6000, durationMs: 500 },
      { pitch: "A4", startMs: 6500, durationMs: 500 },
      { pitch: "A4", startMs: 7000, durationMs: 500 },
      { pitch: "A4", startMs: 7500, durationMs: 500 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l2_02_d_major: {
    id: "violin_l2_02_d_major", type: "play_scale", instrumentId: "violin",
    title: "D major, one octave",
    targetPattern: { notes: ["D4","E4","F#4","G4","A4","B4","C#5","D5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l2_03_three_strings: {
    id: "violin_l2_03_three_strings", type: "play_note", instrumentId: "violin",
    title: "G-D-A-D-G cross-string roll",
    targetPattern: { notes: [
      { pitch: "G3", startMs: 0, durationMs: 800 },
      { pitch: "D4", startMs: 800, durationMs: 800 },
      { pitch: "A4", startMs: 1600, durationMs: 800 },
      { pitch: "D4", startMs: 2400, durationMs: 800 },
      { pitch: "G3", startMs: 3200, durationMs: 800 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l2_04_sightread: {
    id: "violin_l2_04_sightread", type: "sight_read", instrumentId: "violin",
    title: "Short written melody from treble staff",
    targetPattern: { notes: ["A4","B4","C#5","B4","A4","G4","F#4","E4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l2_05_slurred: {
    id: "violin_l2_05_slurred", type: "play_scale", instrumentId: "violin",
    title: "D-E-F♯-G slurred under one bow",
    targetPattern: { notes: [
      { pitch: "D4", startMs: 0, durationMs: 500 },
      { pitch: "E4", startMs: 500, durationMs: 500 },
      { pitch: "F#4", startMs: 1000, durationMs: 500 },
      { pitch: "G4", startMs: 1500, durationMs: 1500 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l2_06_ode_to_joy: {
    id: "violin_l2_06_ode_to_joy", type: "play_along", instrumentId: "violin",
    title: "Ode to Joy in D major",
    targetPattern: { notes: ["F#4","F#4","G4","A4","A4","G4","F#4","E4","D4","D4","E4","F#4","F#4","E4","E4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l3_01_a_major: {
    id: "violin_l3_01_a_major", type: "play_scale", instrumentId: "violin",
    title: "A major, one octave",
    targetPattern: { notes: ["A4","B4","C#5","D5","E5","F#5","G#5","A5"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l3_02_d_minor: {
    id: "violin_l3_02_d_minor", type: "play_scale", instrumentId: "violin",
    title: "D natural minor",
    targetPattern: { notes: ["D4","E4","F4","G4","A4","Bb4","C5","D5"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l3_03_martele: {
    id: "violin_l3_03_martele", type: "rhythm_clap", instrumentId: "violin",
    title: "Martelé strokes on open A, 8 hits",
    targetPattern: { onsets: Array.from({length:8},(_,i)=>i*750) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  violin_l3_04_spiccato: {
    id: "violin_l3_04_spiccato", type: "rhythm_clap", instrumentId: "violin",
    title: "Spiccato, 8 bounces",
    targetPattern: { onsets: Array.from({length:8},(_,i)=>i*1000) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  violin_l3_05_twinkle: {
    id: "violin_l3_05_twinkle", type: "play_along", instrumentId: "violin",
    title: "Twinkle Twinkle in A major",
    targetPattern: { notes: ["A4","A4","E5","E5","F#5","F#5","E5","D5","D5","C#5","C#5","B4","B4","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l3_06_birthday: {
    id: "violin_l3_06_birthday", type: "play_along", instrumentId: "violin",
    title: "Happy Birthday in D major",
    targetPattern: { notes: ["D4","D4","E4","D4","G4","F#4","D4","D4","E4","D4","A4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_01_g_major_2oct: {
    id: "violin_l4_01_g_major_2oct", type: "play_scale", instrumentId: "violin",
    title: "G major, 2 octaves",
    targetPattern: { notes: ["G3","A3","B3","C4","D4","E4","F#4","G4","A4","B4","C5","D5","E5","F#5","G5"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_02_double_stop: {
    id: "violin_l4_02_double_stop", type: "play_chord", instrumentId: "violin",
    title: "D+A and D+B double-stops",
    targetPattern: { notes: [
      { pitch: "D4", startMs: 0, durationMs: 2000 },
      { pitch: "A4", startMs: 0, durationMs: 2000 },
      { pitch: "D4", startMs: 2000, durationMs: 2000 },
      { pitch: "B4", startMs: 2000, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_03_vibrato: {
    id: "violin_l4_03_vibrato", type: "play_note", instrumentId: "violin",
    title: "Held note with vibrato on B (A-string finger 2)",
    targetPattern: { notes: [{ pitch: "B4", startMs: 0, durationMs: 6000 }] },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_04_shift: {
    id: "violin_l4_04_shift", type: "play_scale", instrumentId: "violin",
    title: "Shift to 2nd position on A string",
    targetPattern: { notes: ["A4","B4","C#5","D5","E5","D5","C#5","B4","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_05_g_3oct: {
    id: "violin_l4_05_g_3oct", type: "play_scale", instrumentId: "violin",
    title: "G major, 3 octaves (sample — first octave shown)",
    targetPattern: { notes: ["G3","A3","B3","C4","D4","E4","F#4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l4_06_arpeggios: {
    id: "violin_l4_06_arpeggios", type: "play_chord", instrumentId: "violin",
    title: "D / A / E major arpeggios",
    targetPattern: { notes: [
      { pitch: "D4", startMs: 0, durationMs: 400 },
      { pitch: "F#4", startMs: 400, durationMs: 400 },
      { pitch: "A4", startMs: 800, durationMs: 400 },
      { pitch: "D5", startMs: 1200, durationMs: 800 },
      { pitch: "A4", startMs: 2000, durationMs: 400 },
      { pitch: "C#5", startMs: 2400, durationMs: 400 },
      { pitch: "E5", startMs: 2800, durationMs: 400 },
      { pitch: "A5", startMs: 3200, durationMs: 800 },
      { pitch: "E5", startMs: 4000, durationMs: 400 },
      { pitch: "G#5", startMs: 4400, durationMs: 400 },
      { pitch: "B5", startMs: 4800, durationMs: 400 },
      { pitch: "E6", startMs: 5200, durationMs: 800 },
    ]}, tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_01_vibrato_ctrl: {
    id: "violin_l5_01_vibrato_ctrl", type: "play_note", instrumentId: "violin",
    title: "Vibrato control — slow then fast",
    targetPattern: { notes: [
      { pitch: "A4", startMs: 0, durationMs: 4000 },
      { pitch: "A4", startMs: 4000, durationMs: 4000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_02_third_pos: {
    id: "violin_l5_02_third_pos", type: "play_scale", instrumentId: "violin",
    title: "E major in 3rd position",
    targetPattern: { notes: ["E5","F#5","G#5","A5","B5","A5","G#5","F#5","E5"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_03_crescendo: {
    id: "violin_l5_03_crescendo", type: "play_along", instrumentId: "violin",
    title: "pp → ff crescendo, 8 whole-bows on A",
    targetPattern: { notes: Array.from({length:8},(_,i)=>({
      pitch: "A4", startMs: i*3000, durationMs: 3000, velocity: 0.2 + i*0.1,
    })) }, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_04_trill: {
    id: "violin_l5_04_trill", type: "play_note", instrumentId: "violin",
    title: "Trill on C♯ (A-string)",
    targetPattern: { notes: [
      { pitch: "C#5", startMs: 0, durationMs: 2000 },
      { pitch: "D5", startMs: 0, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_05_harmonics: {
    id: "violin_l5_05_harmonics", type: "play_note", instrumentId: "violin",
    title: "Natural harmonics, midpoint each string",
    targetPattern: { notes: [
      { pitch: "G4", startMs: 0, durationMs: 1500 },
      { pitch: "D5", startMs: 1500, durationMs: 1500 },
      { pitch: "A5", startMs: 3000, durationMs: 1500 },
      { pitch: "E6", startMs: 4500, durationMs: 1500 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l5_06_thirds_sixths: {
    id: "violin_l5_06_thirds_sixths", type: "play_chord", instrumentId: "violin",
    title: "Thirds and sixths — D/A string double-stops",
    targetPattern: { notes: [
      { pitch: "D4", startMs: 0, durationMs: 1500 },
      { pitch: "F#4", startMs: 0, durationMs: 1500 },
      { pitch: "D4", startMs: 1500, durationMs: 1500 },
      { pitch: "B4", startMs: 1500, durationMs: 1500 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_01_minuet_g: {
    id: "violin_l6_01_minuet_g", type: "play_along", instrumentId: "violin",
    title: "Bach Minuet in G — opening",
    targetPattern: { notes: ["D5","G4","A4","B4","C5","D5","D5","B4","C5","D5","C5","B4","A4","D5","G4","A4","B4","C5","A4","D5","B4","A4","G4","F#4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 90, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_02_meditation: {
    id: "violin_l6_02_meditation", type: "play_along", instrumentId: "violin",
    title: "Meditation from Thaïs — opening",
    targetPattern: { notes: [
      { pitch: "D5", startMs: 0, durationMs: 2000, velocity: 0.4 },
      { pitch: "G5", startMs: 2000, durationMs: 3000, velocity: 0.7 },
      { pitch: "F#5", startMs: 5000, durationMs: 2000, velocity: 0.6 },
      { pitch: "E5", startMs: 7000, durationMs: 2000, velocity: 0.4 },
      { pitch: "D5", startMs: 9000, durationMs: 3000, velocity: 0.3 },
    ]}, tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_03_gavotte: {
    id: "violin_l6_03_gavotte", type: "play_along", instrumentId: "violin",
    title: "Gossec Gavotte opening",
    targetPattern: { notes: ["D5","D5","G4","G4","B4","B4","D5","D5","G4","F#4","E4","D4","C4","D4","B3","A3","G3","F#3"]
      .map((p,i)=>({pitch:p, startMs:i*350, durationMs:350})) },
    tempo: { bpm: 110, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_04_jig: {
    id: "violin_l6_04_jig", type: "play_along", instrumentId: "violin",
    title: "Celtic jig — Swallowtail, 8 bars",
    targetPattern: { notes: ["E5","D5","B4","E5","D5","B4","D5","B4","A4","D5","B4","A4"]
      .map((p,i)=>({pitch:p, startMs:i*250, durationMs:250})) },
    tempo: { bpm: 110, meter: [6, 8] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_05_wohlfahrt: {
    id: "violin_l6_05_wohlfahrt", type: "play_scale", instrumentId: "violin",
    title: "Wohlfahrt Op.45 #1 opening",
    targetPattern: { notes: ["C4","E4","G4","C5","E5","G5","E5","C5","G4","E4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l6_06_unseen: {
    id: "violin_l6_06_unseen", type: "sight_read", instrumentId: "violin",
    title: "Unseen intermediate piece (Pro Cert gate)",
    targetPattern: { notes: ["G4","B4","D5","G5","D5","B4","G4","A4","C5","E5","G5","E5","C5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l7_01_bach_adagio: {
    id: "violin_l7_01_bach_adagio", type: "play_along", instrumentId: "violin",
    title: "Bach G minor Adagio — opening phrase",
    targetPattern: { notes: ["G4","Bb4","D5","G5","F5","D5","Bb4","G4","F4","Eb4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700, velocity: 0.4 + 0.03*i})) },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l7_02_caprice_24: {
    id: "violin_l7_02_caprice_24", type: "play_along", instrumentId: "violin",
    title: "Paganini Caprice 24 theme opening",
    targetPattern: { notes: ["A4","E5","C5","A4","E5","C5","B4","A4","B4","C5","D5","E5","C5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [2, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l7_03_darbari: {
    id: "violin_l7_03_darbari", type: "improvise", instrumentId: "violin",
    title: "Raga Darbari characteristic phrase (with andolan approximation)",
    targetPattern: { notes: ["G4","Bb4","C5","D5","Eb5","D5","C5","Bb4","A4","G4","F4","Eb4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800})) },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  violin_l7_04_liebesfreud: {
    id: "violin_l7_04_liebesfreud", type: "play_along", instrumentId: "violin",
    title: "Kreisler Liebesfreud opening",
    targetPattern: { notes: ["C5","E5","G5","A5","G5","E5","C5","D5","F5","A5","C6","A5","F5","D5","C5"]
      .map((p,i)=>({pitch:p, startMs:i*400, durationMs:400})) },
    tempo: { bpm: 120, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l7_05_extended: {
    id: "violin_l7_05_extended", type: "play_note", instrumentId: "violin",
    title: "Col legno + ponticello demos",
    targetPattern: { notes: [
      { pitch: "G4", startMs: 0, durationMs: 2000 },
      { pitch: "D5", startMs: 2000, durationMs: 2000 },
      { pitch: "A5", startMs: 4000, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l7_06_exam: {
    id: "violin_l7_06_exam", type: "play_along", instrumentId: "violin",
    title: "L7 exam — Bach/Paganini excerpt",
    targetPattern: { notes: ["G4","Bb4","D5","G5","F#5","D5","Bb4","A4","G4","F#4","G4","A4","Bb4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500, velocity: 0.4})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l8_01_mendelssohn: {
    id: "violin_l8_01_mendelssohn", type: "play_along", instrumentId: "violin",
    title: "Mendelssohn Concerto E-minor opening theme",
    targetPattern: { notes: ["B4","G5","F#5","E5","D#5","E5","F#5","G5","B5","A5","G5","F#5","E5","D5","B4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600, velocity: 0.35 + 0.03*i})) },
    tempo: { bpm: 70, meter: [2, 2] }, gradingRubricId: "rubric_early_level",
  },
  violin_l8_02_improv: {
    id: "violin_l8_02_improv", type: "improvise", instrumentId: "violin",
    title: "Grappelli-style improv — All of Me chord tones",
    targetPattern: { notes: ["C5","E5","G5","E5","C5","B4","D5","F#5","A5","F#5","D5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l8_03_bageshri: {
    id: "violin_l8_03_bageshri", type: "improvise", instrumentId: "violin",
    title: "Raga Bageshri mini-alap phrase",
    targetPattern: { notes: ["D5","G5","Bb5","C6","Bb5","A5","G5","F5","Eb5","D5","C5","Bb4","A4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*900, durationMs:900})) },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  violin_l8_04_emperor: {
    id: "violin_l8_04_emperor", type: "play_along", instrumentId: "violin",
    title: "Haydn Emperor Op.76 No.3 — 2nd mov theme",
    targetPattern: { notes: ["G4","G4","A4","B4","A4","G4","F#4","E4","D4","G4","A4","B4","A4","G4","F#4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l8_05_fratres: {
    id: "violin_l8_05_fratres", type: "play_note", instrumentId: "violin",
    title: "Fratres opening sustained pattern",
    targetPattern: { notes: [
      { pitch: "A4", startMs: 0, durationMs: 3000, velocity: 0.3 },
      { pitch: "D5", startMs: 3000, durationMs: 3000, velocity: 0.35 },
      { pitch: "F5", startMs: 6000, durationMs: 3000, velocity: 0.4 },
      { pitch: "A5", startMs: 9000, durationMs: 3000, velocity: 0.45 },
    ]}, tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l8_06_tristyle: {
    id: "violin_l8_06_tristyle", type: "play_along", instrumentId: "violin",
    title: "L8 3-style exam — representative passage",
    targetPattern: { notes: ["B4","G5","E5","C5","A4","C5","E5","G5","A5","G5","E5","C5","A4","F5","D5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_01_compose: {
    id: "violin_l9_01_compose", type: "compose", instrumentId: "violin",
    title: "Original 3-min solo violin composition (reference shape)",
    targetPattern: { notes: ["D4","G4","Bb4","D5","F5","D5","Bb4","G4","A4","C5","E5","A5","G5","E5","C5","A4"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_02_transcribe: {
    id: "violin_l9_02_transcribe", type: "compose", instrumentId: "violin",
    title: "Violin transcription (Chopin-style nocturne adapted)",
    targetPattern: { notes: ["E5","G5","B5","E6","D6","B5","G5","E5","A5","C6","E6","C6","A5","E5"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_03_teach: {
    id: "violin_l9_03_teach", type: "compose", instrumentId: "violin",
    title: "Teaching demo — intonation lesson content",
    targetPattern: { notes: ["A4","A4","B4","B4","C5","C5","D5","D5"]
      .map((p,i)=>({pitch:p, startMs:i*1000, durationMs:1000})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_04_record: {
    id: "violin_l9_04_record", type: "play_along", instrumentId: "violin",
    title: "Studio-quality recording sample",
    targetPattern: { notes: ["G4","B4","D5","G5","D5","B4","G4","A4","C5","E5","A5","E5","C5","A4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700, velocity: 0.5})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_05_style_comparison: {
    id: "violin_l9_05_style_comparison", type: "play_along", instrumentId: "violin",
    title: "Baroque vs Romantic — same phrase, two styles",
    targetPattern: { notes: ["G4","A4","B4","C5","D5","C5","B4","A4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  violin_l9_06_recital: {
    id: "violin_l9_06_recital", type: "play_along", instrumentId: "violin",
    title: "Genius Cert recital — programme excerpt",
    targetPattern: { notes: ["G4","Bb4","D5","G5","F#5","E5","D5","C5","Bb4","A4","G4","A4","Bb4","D5","G5","D5","Bb4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500, velocity: 0.4 + 0.02*i})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },

  drums_l1_01_snare_4: {
    id: "drums_l1_01_snare_4",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "Four equal snare hits at 80 bpm",
    targetPattern: { onsets: [0, 750, 1500, 2250] },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l1_02_backbeat: {
    id: "drums_l1_02_backbeat",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "Kick on 1&3, snare on 2&4 — 4 bars",
    targetPattern: {
      // Each beat at 80 bpm = 750ms. 16 onsets total across 4 bars.
      onsets: Array.from({ length: 16 }, (_, i) => i * 750),
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l1_03_full_groove: {
    id: "drums_l1_03_full_groove",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "Full rock groove — hi-hat on every beat, 4 bars",
    targetPattern: {
      // Hi-hat plays every 8th note — 32 onsets across 4 bars at 80 bpm
      onsets: Array.from({ length: 32 }, (_, i) => i * 375),
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l1_04_8th_groove: {
    id: "drums_l1_04_8th_groove",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "8th-note hi-hat groove, 4 bars @ 70 bpm",
    targetPattern: {
      // 70 bpm: beat = ~857ms; 8th = ~429ms. 4 bars × 8 eighths = 32 onsets.
      onsets: Array.from({ length: 32 }, (_, i) => Math.round(i * 429)),
    },
    tempo: { bpm: 70, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l1_05_crash_on_one: {
    id: "drums_l1_05_crash_on_one",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "Crash on beat 1 of each new 4-bar phrase",
    targetPattern: {
      // At 80 bpm, 1 bar = 3000ms. Crash ONLY on beat 1 of each new phrase
      // (bars 1, 5, 9 of an 8-bar example — for grading, we just mark the crash hits)
      onsets: [0, 12000, 24000],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l1_06_tom_fill: {
    id: "drums_l1_06_tom_fill",
    type: "rhythm_clap",
    instrumentId: "drums",
    title: "1-bar tom fill at the end of a 4-bar phrase",
    targetPattern: {
      onsets: [9000, 9187, 9375, 9562, 9750, 9937, 12000],
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_01_16ths: {
    id: "drums_l2_01_16ths", type: "rhythm_clap", instrumentId: "drums",
    title: "16th-note hi-hat, 2 bars @ 60 bpm",
    targetPattern: { onsets: Array.from({length:32}, (_,i)=>i*250) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_02_swing_ride: {
    id: "drums_l2_02_swing_ride", type: "rhythm_clap", instrumentId: "drums",
    title: "Swing ride pattern, 4 bars @ 100 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=> {
      // Swing 8ths: quarter + 2/3 triplet positions
      const beat = Math.floor(i/2)*600;
      const sub = (i%2===0) ? 0 : 400;
      return beat + sub;
    }) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_03_funk: {
    id: "drums_l2_03_funk", type: "rhythm_clap", instrumentId: "drums",
    title: "Funk kick pattern — syncopated",
    targetPattern: { onsets: [0, 333, 666, 1333, 1666, 2000, 2666, 3000, 3333] },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_04_paradiddle: {
    id: "drums_l2_04_paradiddle", type: "rhythm_clap", instrumentId: "drums",
    title: "Paradiddle RLRR LRLL, 60 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*500) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_05_ghosts: {
    id: "drums_l2_05_ghosts", type: "rhythm_clap", instrumentId: "drums",
    title: "Groove with ghost notes, 85 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*176) },
    tempo: { bpm: 85, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l2_06_four_bar: {
    id: "drums_l2_06_four_bar", type: "rhythm_clap", instrumentId: "drums",
    title: "4-bar phrase with tom fill, 85 bpm",
    targetPattern: { onsets: Array.from({length:48},(_,i)=>i*176) },
    tempo: { bpm: 85, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_01_bossa: {
    id: "drums_l3_01_bossa", type: "rhythm_clap", instrumentId: "drums",
    title: "Bossa nova clave",
    targetPattern: { onsets: [0, 1000, 1666, 2666, 4000, 5000, 5666, 6666] },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_02_shuffle: {
    id: "drums_l3_02_shuffle", type: "rhythm_clap", instrumentId: "drums",
    title: "Blues shuffle, 100 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>{
      const beat = Math.floor(i/2)*600;
      const sub = (i%2===0) ? 0 : 400;
      return beat + sub;
    }) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_03_reggae: {
    id: "drums_l3_03_reggae", type: "rhythm_clap", instrumentId: "drums",
    title: "Reggae one-drop, 75 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*200) },
    tempo: { bpm: 75, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_04_samba: {
    id: "drums_l3_04_samba", type: "rhythm_clap", instrumentId: "drums",
    title: "Samba, 2 bars @ 100 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [2, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_05_seven_eight: {
    id: "drums_l3_05_seven_eight", type: "rhythm_clap", instrumentId: "drums",
    title: "7/8 groove (3+2+2), 100 bpm",
    targetPattern: { onsets: Array.from({length:14},(_,i)=>i*300) },
    tempo: { bpm: 100, meter: [7, 8] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l3_06_endurance: {
    id: "drums_l3_06_endurance", type: "rhythm_clap", instrumentId: "drums",
    title: "32-bar rock groove endurance, 140 bpm",
    targetPattern: { onsets: Array.from({length:64},(_,i)=>Math.round(i*214)) },
    tempo: { bpm: 140, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_01_double_bass: {
    id: "drums_l4_01_double_bass", type: "rhythm_clap", instrumentId: "drums",
    title: "Double-bass groove, 100 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_02_linear: {
    id: "drums_l4_02_linear", type: "rhythm_clap", instrumentId: "drums",
    title: "Linear pattern, 90 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*166) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_03_3on4: {
    id: "drums_l4_03_3on4", type: "rhythm_clap", instrumentId: "drums",
    title: "3-over-4 polyrhythm, 80 bpm",
    targetPattern: { onsets: Array.from({length:12},(_,i)=>Math.round(i*250)) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_04_broken_jazz: {
    id: "drums_l4_04_broken_jazz", type: "rhythm_clap", instrumentId: "drums",
    title: "Broken jazz ride, 100 bpm",
    targetPattern: { onsets: [0, 600, 1200, 1800, 2400, 3600, 4800, 5400] },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_05_solo_4bar: {
    id: "drums_l4_05_solo_4bar", type: "improvise", instrumentId: "drums",
    title: "4-bar drum solo",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*187) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l4_06_chart_read: {
    id: "drums_l4_06_chart_read", type: "sight_read", instrumentId: "drums",
    title: "Drum chart read-through, 100 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_01_flams: {
    id: "drums_l5_01_flams", type: "rhythm_clap", instrumentId: "drums",
    title: "Flam taps, snare, 60 bpm",
    targetPattern: { onsets: Array.from({length:8},(_,i)=>i*500) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_02_rolls: {
    id: "drums_l5_02_rolls", type: "rhythm_clap", instrumentId: "drums",
    title: "5-stroke + 9-stroke rolls",
    targetPattern: { onsets: [0, 75, 150, 225, 300, 1500, 1575, 1650, 1725, 1800, 1875, 1950, 2025, 2100] },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_03_funk_ghosts: {
    id: "drums_l5_03_funk_ghosts", type: "rhythm_clap", instrumentId: "drums",
    title: "Funk groove with ghost notes, 90 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>Math.round(i*166)) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_04_cross_stick: {
    id: "drums_l5_04_cross_stick", type: "rhythm_clap", instrumentId: "drums",
    title: "Ballad groove with cross-stick, 70 bpm",
    targetPattern: { onsets: Array.from({length:8},(_,i)=>i*857) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_05_solo_8bar: {
    id: "drums_l5_05_solo_8bar", type: "improvise", instrumentId: "drums",
    title: "8-bar drum solo with dynamic arc",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*187) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l5_06_independence: {
    id: "drums_l5_06_independence", type: "rhythm_clap", instrumentId: "drums",
    title: "Jazz independence pattern, 100 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_01_rosanna: {
    id: "drums_l6_01_rosanna", type: "rhythm_clap", instrumentId: "drums",
    title: "Rosanna half-time shuffle, 87 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>Math.round(i*172)) },
    tempo: { bpm: 87, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_02_funky_drummer: {
    id: "drums_l6_02_funky_drummer", type: "rhythm_clap", instrumentId: "drums",
    title: "Funky Drummer break, 100 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_03_bembe: {
    id: "drums_l6_03_bembe", type: "rhythm_clap", instrumentId: "drums",
    title: "Bembé 6/8, 120 bpm",
    targetPattern: { onsets: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750] },
    tempo: { bpm: 120, meter: [6, 8] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_04_metal: {
    id: "drums_l6_04_metal", type: "rhythm_clap", instrumentId: "drums",
    title: "Metal double-bass, 160 bpm, 16 bars",
    targetPattern: { onsets: Array.from({length:64},(_,i)=>Math.round(i*93)) },
    tempo: { bpm: 160, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_05_rudiments: {
    id: "drums_l6_05_rudiments", type: "rhythm_clap", instrumentId: "drums",
    title: "Rudiment workout — first 10 rudiments",
    targetPattern: { onsets: Array.from({length:80},(_,i)=>i*187) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l6_06_chart_pro: {
    id: "drums_l6_06_chart_pro", type: "sight_read", instrumentId: "drums",
    title: "Unseen drum chart (Pro Cert practical)",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_01_odd_grouping: {
    id: "drums_l7_01_odd_grouping", type: "rhythm_clap", instrumentId: "drums",
    title: "5/8 groove, 120 bpm",
    targetPattern: { onsets: Array.from({length:15},(_,i)=>Math.round(i*250)) },
    tempo: { bpm: 120, meter: [5, 8] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_02_tihai: {
    id: "drums_l7_02_tihai", type: "rhythm_clap", instrumentId: "drums",
    title: "4-bar cycle with tihai climax",
    targetPattern: { onsets: [
      ...Array.from({length:16},(_,i)=>i*250),
      6000, 6125, 6250, 6375, 6500, 6625, 6750, 6875, 7000, 7125, 7250, 7375, 7500,
    ]},
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_03_brush_sweep: {
    id: "drums_l7_03_brush_sweep", type: "rhythm_clap", instrumentId: "drums",
    title: "Jazz brush pattern",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*375) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_04_gospel: {
    id: "drums_l7_04_gospel", type: "rhythm_clap", instrumentId: "drums",
    title: "Gospel chops 32nd-note groove, 80 bpm",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>Math.round(i*94)) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_05_big_solo: {
    id: "drums_l7_05_big_solo", type: "improvise", instrumentId: "drums",
    title: "32-bar thematic drum solo",
    targetPattern: { onsets: Array.from({length:64},(_,i)=>i*187) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l7_06_exam: {
    id: "drums_l7_06_exam", type: "rhythm_clap", instrumentId: "drums",
    title: "L7 exam — odd-time + solo",
    targetPattern: { onsets: Array.from({length:28},(_,i)=>i*273) },
    tempo: { bpm: 110, meter: [7, 8] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_01_fusion: {
    id: "drums_l8_01_fusion", type: "rhythm_clap", instrumentId: "drums",
    title: "Linear fusion groove, 100 bpm",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_02_songo: {
    id: "drums_l8_02_songo", type: "rhythm_clap", instrumentId: "drums",
    title: "Afro-Cuban songo + mambo bell",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_03_trio: {
    id: "drums_l8_03_trio", type: "rhythm_clap", instrumentId: "drums",
    title: "Jazz trio ballad drumming",
    targetPattern: { onsets: Array.from({length:12},(_,i)=>i*300) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_04_amen: {
    id: "drums_l8_04_amen", type: "rhythm_clap", instrumentId: "drums",
    title: "Amen break played acoustically",
    targetPattern: { onsets: [0,125,250,375,500,625,750,875,1000,1250,1375,1500,1625,1750,1875,2000,2125,2250,2500,2625,2750,2875,3000,3125] },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_05_big_band: {
    id: "drums_l8_05_big_band", type: "sight_read", instrumentId: "drums",
    title: "Big band chart with setups, 110 bpm",
    targetPattern: { onsets: Array.from({length:24},(_,i)=>i*136) },
    tempo: { bpm: 110, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l8_06_fourstyle: {
    id: "drums_l8_06_fourstyle", type: "rhythm_clap", instrumentId: "drums",
    title: "L8 4-style exam representative segment",
    targetPattern: { onsets: Array.from({length:20},(_,i)=>i*200) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_01_compose: {
    id: "drums_l9_01_compose", type: "compose", instrumentId: "drums",
    title: "Composed drum part for a song",
    targetPattern: { onsets: Array.from({length:32},(_,i)=>i*187) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_02_record: {
    id: "drums_l9_02_record", type: "compose", instrumentId: "drums",
    title: "Multi-mic drum recording — reference take",
    targetPattern: { onsets: Array.from({length:16},(_,i)=>i*250) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_03_teach: {
    id: "drums_l9_03_teach", type: "compose", instrumentId: "drums",
    title: "Teaching demo rhythm content",
    targetPattern: { onsets: Array.from({length:8},(_,i)=>i*500) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_04_session: {
    id: "drums_l9_04_session", type: "sight_read", instrumentId: "drums",
    title: "Session simulation — unseen chart",
    targetPattern: { onsets: Array.from({length:24},(_,i)=>i*200) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_05_medley: {
    id: "drums_l9_05_medley", type: "improvise", instrumentId: "drums",
    title: "5-style medley representative segment",
    targetPattern: { onsets: Array.from({length:30},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  drums_l9_06_recital: {
    id: "drums_l9_06_recital", type: "improvise", instrumentId: "drums",
    title: "Genius Cert recital segment",
    targetPattern: { onsets: Array.from({length:40},(_,i)=>i*150) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
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
  sitar_l1_02_sargam: {
    id: "sitar_l1_02_sargam", type: "play_scale", instrumentId: "sitar",
    title: "Sargam ascending",
    targetPattern: { notes: ["C4","D4","E4","F4","G4","A4","B4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l1_03_descent: {
    id: "sitar_l1_03_descent", type: "play_scale", instrumentId: "sitar",
    title: "Sargam descending",
    targetPattern: { notes: ["C5","B4","A4","G4","F4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l1_04_alankar: {
    id: "sitar_l1_04_alankar", type: "play_scale", instrumentId: "sitar",
    title: "3-note alankar pattern ascending",
    targetPattern: { notes: ["C4","D4","E4","D4","E4","F4","E4","F4","G4","F4","G4","A4","G4","A4","B4","A4","B4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*300, durationMs:300})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l1_05_teentaal: {
    id: "sitar_l1_05_teentaal", type: "play_note", instrumentId: "sitar",
    title: "Sa on beat 1 of each teentaal cycle",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 800 },
      { pitch: "C4", startMs: 12000, durationMs: 800 },
    ]}, tempo: { bpm: 80, meter: [16, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l1_06_yaman_bandish: {
    id: "sitar_l1_06_yaman_bandish", type: "play_along", instrumentId: "sitar",
    title: "Simple Yaman bandish — sthayi",
    targetPattern: { notes: ["C4","D4","E4","F#4","A4","B4","C5","C5"]
      .map((p,i)=>({pitch:p, startMs:i*1500, durationMs:1500})) },
    tempo: { bpm: 80, meter: [16, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l2_01_bhupali: {
    id: "sitar_l2_01_bhupali", type: "play_scale", instrumentId: "sitar",
    title: "Bhupali aaroha + avaroha",
    targetPattern: { notes: ["C4","D4","E4","G4","A4","C5","A4","G4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l2_02_alap: {
    id: "sitar_l2_02_alap", type: "improvise", instrumentId: "sitar",
    title: "Mini Yaman alap, 2 minutes",
    targetPattern: { notes: ["C4","D4","E4","D4","E4","F#4","A4","F#4","E4","A4","B4","C5","B4","A4","F#4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*2500, durationMs:2500})) },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l2_03_bols: {
    id: "sitar_l2_03_bols", type: "rhythm_clap", instrumentId: "sitar",
    title: "Da Ra Diri Da pattern, 80 bpm",
    targetPattern: { onsets: [0, 750, 1125, 1500, 2250, 3000, 3375, 3750, 4500, 5250, 5625, 6000, 6750] },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_rhythm_only",
  },
  sitar_l2_04_meend: {
    id: "sitar_l2_04_meend", type: "play_note", instrumentId: "sitar",
    title: "Ma → Ga meend",
    targetPattern: { notes: [
      { pitch: "F4", startMs: 0, durationMs: 1500 },
      { pitch: "E4", startMs: 1500, durationMs: 2500 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l2_05_jhaptal: {
    id: "sitar_l2_05_jhaptal", type: "play_note", instrumentId: "sitar",
    title: "Sa on beat 1 of jhaptal cycle",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 600 },
      { pitch: "C4", startMs: 6666, durationMs: 600 },
    ]}, tempo: { bpm: 90, meter: [10, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l2_06_bandish: {
    id: "sitar_l2_06_bandish", type: "play_along", instrumentId: "sitar",
    title: "Bhupali bandish — sthayi + antara",
    targetPattern: { notes: ["C4","D4","E4","G4","E4","D4","C4","G4","A4","C5","D5","C5","A4","G4"]
      .map((p,i)=>({pitch:p, startMs:i*1000, durationMs:1000})) },
    tempo: { bpm: 90, meter: [16, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l3_01_bhairav: {
    id: "sitar_l3_01_bhairav", type: "play_scale", instrumentId: "sitar",
    title: "Bhairav aaroha + avaroha",
    targetPattern: { notes: ["C4","Db4","E4","F4","G4","Ab4","B4","C5","B4","Ab4","G4","F4","E4","Db4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l3_02_taan: {
    id: "sitar_l3_02_taan", type: "play_scale", instrumentId: "sitar",
    title: "16-svara taan in teentaal",
    targetPattern: { notes: ["C4","D4","E4","F#4","G4","F#4","E4","D4","C4","D4","E4","F#4","G4","F#4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*188, durationMs:188})) },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l3_03_gat: {
    id: "sitar_l3_03_gat", type: "play_along", instrumentId: "sitar",
    title: "Yaman gat — 4 cycles",
    targetPattern: { notes: ["C4","D4","E4","F#4","A4","F#4","E4","D4"]
      .map((p,i)=>({pitch:p, startMs:i*1500, durationMs:1500})) },
    tempo: { bpm: 90, meter: [16, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l3_04_alap_ext: {
    id: "sitar_l3_04_alap_ext", type: "improvise", instrumentId: "sitar",
    title: "5-minute Bhupali alap (reference phrases)",
    targetPattern: { notes: ["C4","D4","E4","D4","C4","G4","E4","C4","A4","G4","E4","C5","A4","G4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*3500, durationMs:3500})) },
    tempo: { bpm: 35, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l3_05_rupak: {
    id: "sitar_l3_05_rupak", type: "play_note", instrumentId: "sitar",
    title: "Sa on beat 2 of rupak cycles",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 667, durationMs: 500 },
      { pitch: "C4", startMs: 5333, durationMs: 500 },
    ]}, tempo: { bpm: 90, meter: [7, 4] }, gradingRubricId: "rubric_early_level",
  },
  sitar_l3_06_cert: {
    id: "sitar_l3_06_cert", type: "improvise", instrumentId: "sitar",
    title: "Standard Cert — alap + gat combined",
    targetPattern: { notes: ["C4","D4","E4","F#4","A4","B4","C5","A4","F#4","E4","D4","C4","G3"]
      .map((p,i)=>({pitch:p, startMs:i*2000, durationMs:2000})) },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l1_01_sustained_ah: {
    id: "vocals_l1_01_sustained_ah", type: "play_note", instrumentId: "vocals",
    title: "Sustained 'ah' on A4, 10 seconds",
    targetPattern: { notes: [{ pitch: "A4", startMs: 0, durationMs: 10000 }] },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l1_02_pitch_match: {
    id: "vocals_l1_02_pitch_match", type: "play_note", instrumentId: "vocals",
    title: "Pitch matching — 5 pitches",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 2000 },
      { pitch: "E4", startMs: 2500, durationMs: 2000 },
      { pitch: "G4", startMs: 5000, durationMs: 2000 },
      { pitch: "A4", startMs: 7500, durationMs: 2000 },
      { pitch: "D4", startMs: 10000, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l1_03_five_tone: {
    id: "vocals_l1_03_five_tone", type: "play_scale", instrumentId: "vocals",
    title: "5-tone ascending + descending",
    targetPattern: { notes: ["C4","D4","E4","F4","G4","F4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l1_04_vowels: {
    id: "vocals_l1_04_vowels", type: "play_note", instrumentId: "vocals",
    title: "5 pure vowels on A4",
    targetPattern: { notes: Array.from({length:5},(_,i)=>({pitch:"A4", startMs:i*3000, durationMs:3000})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l1_05_octave: {
    id: "vocals_l1_05_octave", type: "play_note", instrumentId: "vocals",
    title: "Octave jump: low Do → high Do → low Do",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 2000 },
      { pitch: "C5", startMs: 2500, durationMs: 2000 },
      { pitch: "C4", startMs: 5000, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l1_06_birthday: {
    id: "vocals_l1_06_birthday", type: "play_along", instrumentId: "vocals",
    title: "Happy Birthday in C major",
    targetPattern: { notes: ["C4","C4","D4","C4","F4","E4","C4","C4","D4","C4","G4","F4"]
      .map((p,i)=>({pitch:p, startMs:i*750, durationMs:750})) },
    tempo: { bpm: 90, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_01_range: {
    id: "vocals_l2_01_range", type: "play_scale", instrumentId: "vocals",
    title: "Range exploration — C4 chromatically down + up",
    targetPattern: { notes: ["C4","B3","Bb3","A3","Ab3","G3","A3","B3","C4","C#4","D4","E4","F4","G4","A4","B4","C5"]
      .map((p,i)=>({pitch:p, startMs:i*1000, durationMs:1000})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_02_major: {
    id: "vocals_l2_02_major", type: "play_scale", instrumentId: "vocals",
    title: "Major scale — Do Re Mi Fa Sol La Ti Do",
    targetPattern: { notes: ["C4","D4","E4","F4","G4","A4","B4","C5","B4","A4","G4","F4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_03_intervals: {
    id: "vocals_l2_03_intervals", type: "play_note", instrumentId: "vocals",
    title: "Sing 5th + 4th + 3rd intervals",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 1000 },
      { pitch: "G4", startMs: 1000, durationMs: 1000 },
      { pitch: "C4", startMs: 2500, durationMs: 1000 },
      { pitch: "F4", startMs: 3500, durationMs: 1000 },
      { pitch: "C4", startMs: 5000, durationMs: 1000 },
      { pitch: "E4", startMs: 6000, durationMs: 1000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_04_dynamics: {
    id: "vocals_l2_04_dynamics", type: "play_note", instrumentId: "vocals",
    title: "Dynamic arc on A4 — pp → f → pp",
    targetPattern: { notes: [
      { pitch: "A4", startMs: 0,    durationMs: 6000, velocity: 0.3 },
      { pitch: "A4", startMs: 6000, durationMs: 2000, velocity: 0.6 },
      { pitch: "A4", startMs: 8000, durationMs: 4000, velocity: 0.3 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_05_sargam: {
    id: "vocals_l2_05_sargam", type: "play_scale", instrumentId: "vocals",
    title: "Sargam ascending + descending",
    targetPattern: { notes: ["C4","D4","E4","F4","G4","A4","B4","C5","B4","A4","G4","F4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*700, durationMs:700})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l2_06_twinkle: {
    id: "vocals_l2_06_twinkle", type: "play_along", instrumentId: "vocals",
    title: "Twinkle Twinkle in C major",
    targetPattern: { notes: ["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l3_01_head: {
    id: "vocals_l3_01_head", type: "play_note", instrumentId: "vocals",
    title: "Chest-to-head slide on 'oo'",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0, durationMs: 2000 },
      { pitch: "E4", startMs: 2000, durationMs: 2000 },
      { pitch: "G4", startMs: 4000, durationMs: 2000 },
      { pitch: "C5", startMs: 6000, durationMs: 2000 },
      { pitch: "E5", startMs: 8000, durationMs: 2000 },
    ]}, tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l3_02_consonants: {
    id: "vocals_l3_02_consonants", type: "play_along", instrumentId: "vocals",
    title: "Phrase with clean consonants",
    targetPattern: { notes: ["C4","D4","E4","F4","G4","F4","E4","D4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*600, durationMs:600})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l3_03_amazing: {
    id: "vocals_l3_03_amazing", type: "play_along", instrumentId: "vocals",
    title: "Amazing Grace verse 1 in G major",
    targetPattern: { notes: ["D4","G4","B4","G4","B4","A4","G4","E4","G4","E4","D4"]
      .map((p,i)=>({pitch:p, startMs:i*900, durationMs:900})) },
    tempo: { bpm: 85, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l3_04_sarali: {
    id: "vocals_l3_04_sarali", type: "play_scale", instrumentId: "vocals",
    title: "Sarali Varisai pattern 1",
    targetPattern: { notes: ["C4","Db4","E4","F4","G4","Ab4","B4","C5","C5","B4","Ab4","G4","F4","E4","Db4","C4"]
      .map((p,i)=>({pitch:p, startMs:i*500, durationMs:500})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l3_05_phrasing: {
    id: "vocals_l3_05_phrasing", type: "play_along", instrumentId: "vocals",
    title: "Shaped 4-bar phrase",
    targetPattern: { notes: [
      { pitch: "C4", startMs: 0,    durationMs: 800, velocity: 0.4 },
      { pitch: "E4", startMs: 800,  durationMs: 800, velocity: 0.5 },
      { pitch: "G4", startMs: 1600, durationMs: 800, velocity: 0.7 },
      { pitch: "A4", startMs: 2400, durationMs: 1600, velocity: 0.85 },
      { pitch: "G4", startMs: 4000, durationMs: 800, velocity: 0.75 },
      { pitch: "E4", startMs: 4800, durationMs: 800, velocity: 0.6 },
      { pitch: "C4", startMs: 5600, durationMs: 2400, velocity: 0.45 },
    ]}, tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l3_06_cert: {
    id: "vocals_l3_06_cert", type: "play_along", instrumentId: "vocals",
    title: "Standard Cert — complete song with phrasing",
    targetPattern: { notes: ["D4","G4","B4","A4","G4","E4","D4","G4","B4","D5","B4","A4","G4","E4","D4"]
      .map((p,i)=>({pitch:p, startMs:i*800, durationMs:800, velocity: 0.4 + 0.04*i})) },
    tempo: { bpm: 80, meter: [3, 4] }, gradingRubricId: "rubric_early_level",
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

  sitar_l4_02_vistar: {
    id: "sitar_l4_02_vistar", type: "improvise", instrumentId: "sitar",
    title: "Yaman vistar — lower to upper octave",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Ga","Ma","Pa","Dha","Ni","Sa'","Ni","Dha","Pa","Ma","Ga","Sa"], gamakaHints: ["Pause on Ga and Ni", "Meend Ma→Ga"] } },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l4_03_bhairavi: {
    id: "sitar_l4_03_bhairavi", type: "play_scale", instrumentId: "sitar",
    title: "Bhairavi aaroha + avaroha",
    targetPattern: { ragaPhrase: { ragaId: "bhairavi", svaras: ["Sa","re","ga","ma","Pa","dha","ni","Sa'","Sa'","ni","dha","Pa","ma","ga","re","Sa"], gamakaHints: ["komal svaras"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l4_04_andolan: {
    id: "sitar_l4_04_andolan", type: "play_note", instrumentId: "sitar",
    title: "Andolan on komal Re + komal Dha",
    targetPattern: { ragaPhrase: { ragaId: "bhairavi", svaras: ["re~","dha~"], gamakaHints: ["slow 2Hz andolan ±30 cents"] } },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l4_05_ektaal: {
    id: "sitar_l4_05_ektaal", type: "play_along", instrumentId: "sitar",
    title: "Ektaal gat (12 matras)",
    targetPattern: { notes: ["C4","D4","E4","F#4","G4","A4","B4","A4","G4","F#4","E4","D4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 30, meter: [12, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l4_06_bhairavi_bandish: {
    id: "sitar_l4_06_bhairavi_bandish", type: "play_along", instrumentId: "sitar",
    title: "Bhairavi bandish sthayi + antara",
    targetPattern: { ragaPhrase: { ragaId: "bhairavi", svaras: ["ga","re","Sa","re","Sa","ni","Sa","re","ga","ma","ga","re","ma","dha","ni","Sa'","ni","dha","Pa","ma","ga","re","Sa"], gamakaHints: ["andolan komal Re, komal Dha"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_01_malkauns: {
    id: "sitar_l5_01_malkauns", type: "play_scale", instrumentId: "sitar",
    title: "Malkauns aaroha + avaroha",
    targetPattern: { ragaPhrase: { ragaId: "malkauns", svaras: ["Sa","ga","ma","dha","ni","Sa'","Sa'","ni","dha","ma","ga","Sa"], gamakaHints: ["deliberate pauses on Ma"] } },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_02_kan: {
    id: "sitar_l5_02_kan", type: "play_note", instrumentId: "sitar",
    title: "Kan-swara on Ma→Ga in Yaman",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Ma^Ga","Re^Sa","Ga^Re","Pa^Ma"], gamakaHints: ["kan touches <100ms"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_03_jor: {
    id: "sitar_l5_03_jor", type: "play_along", instrumentId: "sitar",
    title: "Jor section — steady pulse over Yaman phrases",
    targetPattern: { notes: ["D4","E4","F#4","G4","A4","B4","A4","G4","F#4","E4","D4","D4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_04_desh: {
    id: "sitar_l5_04_desh", type: "play_scale", instrumentId: "sitar",
    title: "Desh aaroha + avaroha + pakad",
    targetPattern: { ragaPhrase: { ragaId: "desh", svaras: ["Sa","Re","Ma","Pa","Ni","Sa'","Sa'","ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["komal Ni in avaroha"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_05_taan: {
    id: "sitar_l5_05_taan", type: "play_scale", instrumentId: "sitar",
    title: "Chhoti taan descending in Yaman",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa'","Ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["120 bpm, clean Da-Ra"] } },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l5_06_ajj: {
    id: "sitar_l5_06_ajj", type: "improvise", instrumentId: "sitar",
    title: "Alap-jor-jhala sequence in Yaman",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'","Sa'","Ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["5-min continuous, build intensity"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_01_kafi: {
    id: "sitar_l6_01_kafi", type: "play_scale", instrumentId: "sitar",
    title: "Kafi aaroha + avaroha",
    targetPattern: { ragaPhrase: { ragaId: "kafi", svaras: ["Sa","Re","ga","Ma","Pa","Dha","ni","Sa'","Sa'","ni","Dha","Pa","Ma","ga","Re","Sa"], gamakaHints: ["folk-like inflection"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_02_badi: {
    id: "sitar_l6_02_badi", type: "play_scale", instrumentId: "sitar",
    title: "Badi taan in teentaal — 16 matras landing on sam",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'","Sa'","Ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["land on sam exact"] } },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_03_drut: {
    id: "sitar_l6_03_drut", type: "play_along", instrumentId: "sitar",
    title: "Drut bandish in Yaman at 220 bpm",
    targetPattern: { notes: ["D4","E4","F#4","G4","A4","G4","F#4","E4","D4","E4","F#4","G4","F#4","E4","D4","D4"].map((p,i)=>({pitch:p,startMs:i*272,durationMs:272})) },
    tempo: { bpm: 220, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_04_ravi: {
    id: "sitar_l6_04_ravi", type: "play_note", instrumentId: "sitar",
    title: "Ravi Shankar Yaman signature phrase",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Ni","Re","Ga","Ma~Ga","Ga","Re","Sa","Ni","Re","Sa"], gamakaHints: ["meend + kan, slow"] } },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_05_sawal: {
    id: "sitar_l6_05_sawal", type: "improvise", instrumentId: "sitar",
    title: "Sawal-jawab with tabla — 4-beat phrases",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Ga","Re","Sa"], gamakaHints: ["repeat 8 times with variations"] } },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l6_06_pro_cert: {
    id: "sitar_l6_06_pro_cert", type: "improvise", instrumentId: "sitar",
    title: "Pro Cert — 10-min Yaman full sequence",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'"], gamakaHints: ["full alap-jor-jhala-bandish-taans"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },

  sitar_l7_01_darbari: {
    id: "sitar_l7_01_darbari", type: "improvise", instrumentId: "sitar",
    title: "Darbari Kanada alap with heavy andolan",
    targetPattern: { ragaPhrase: { ragaId: "darbari", svaras: ["Sa","Re","Sa","ga~","Re","ga~","Ma","Pa","dha~","ni","Sa'"], gamakaHints: ["heavy andolan on komal ga + komal dha"] } },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l7_02_laya: {
    id: "sitar_l7_02_laya", type: "play_along", instrumentId: "sitar",
    title: "Layakari 3:2 + 5:4 in teentaal",
    targetPattern: { notes: ["D4","E4","F#4","G4","A4","B4","A4","G4","F#4","E4","D4","E4"].map((p,i)=>({pitch:p,startMs:i*250,durationMs:250})) },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l7_03_todi: {
    id: "sitar_l7_03_todi", type: "improvise", instrumentId: "sitar",
    title: "Todi alap — challenging intonation",
    targetPattern: { ragaPhrase: { ragaId: "todi", svaras: ["Sa","re~","ga","Ma#","Pa","dha","Ni","Sa'"], gamakaHints: ["andolan komal re, tivra Ma"] } },
    tempo: { bpm: 40, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l7_04_krintan: {
    id: "sitar_l7_04_krintan", type: "play_note", instrumentId: "sitar",
    title: "Krintan pull-offs in Yaman phrases",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Ga^Re","Ni^Dha","Ma^Ga"], gamakaHints: ["left-hand pull-off, sympathetic shimmer"] } },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l7_05_tihai: {
    id: "sitar_l7_05_tihai", type: "play_along", instrumentId: "sitar",
    title: "Tihai — 3-matra phrase x3 landing on sam",
    targetPattern: { notes: ["D4","E4","F#4","D4","E4","F#4","D4","E4","F#4"].map((p,i)=>({pitch:p,startMs:i*375,durationMs:375})) },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l7_06_jugal: {
    id: "sitar_l7_06_jugal", type: "improvise", instrumentId: "sitar",
    title: "Extended jugalbandi with synchronized tihai",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa"], gamakaHints: ["4-min dialogue with tabla"] } },
    tempo: { bpm: 100, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_01_alap: {
    id: "sitar_l8_01_alap", type: "improvise", instrumentId: "sitar",
    title: "10-min Darbari alap",
    targetPattern: { ragaPhrase: { ragaId: "darbari", svaras: ["Sa","Re","ga~","Ma","Pa","dha~","ni","Sa'"], gamakaHints: ["all 3 octaves, 3 gamakas"] } },
    tempo: { bpm: 30, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_02_ravi_study: {
    id: "sitar_l8_02_ravi_study", type: "play_note", instrumentId: "sitar",
    title: "Ravi Shankar 30-sec phrase transcribe + perform",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Ga","Ma","Pa","Dha","Ni","Sa'","Ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["meend + kan + krintan precisely"] } },
    tempo: { bpm: 50, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_03_improv: {
    id: "sitar_l8_03_improv", type: "improvise", instrumentId: "sitar",
    title: "Free raga improvisation — 5 minutes",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'"], gamakaHints: ["zero out-of-raga notes"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_04_mala: {
    id: "sitar_l8_04_mala", type: "improvise", instrumentId: "sitar",
    title: "Raga mala — Yaman → Desh → Bhairavi",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Ga","Ma","Pa","Sa'"], gamakaHints: ["pivot on shared svaras"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_05_toda: {
    id: "sitar_l8_05_toda", type: "play_along", instrumentId: "sitar",
    title: "Gat + toda blending",
    targetPattern: { notes: ["D4","E4","F#4","G4","A4","B4","G4","F#4","E4","D4","E4","F#4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 90, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l8_06_concert: {
    id: "sitar_l8_06_concert", type: "improvise", instrumentId: "sitar",
    title: "25-min Yaman concert piece",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'"], gamakaHints: ["alap + jor + jhala + bandish + taans"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_01_compose: {
    id: "sitar_l9_01_compose", type: "compose", instrumentId: "sitar",
    title: "Compose original Yaman bandish",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa"], gamakaHints: ["sthayi + antara, teentaal"] } },
    tempo: { bpm: 90, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_02_nested: {
    id: "sitar_l9_02_nested", type: "play_along", instrumentId: "sitar",
    title: "Nested tihai — 27 matras landing on sam",
    targetPattern: { notes: Array.from({length:27}, (_,i)=>({pitch:["D4","E4","F#4"][i%3],startMs:i*180,durationMs:180})) },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_03_new_raga: {
    id: "sitar_l9_03_new_raga", type: "compose", instrumentId: "sitar",
    title: "Compose an original raga",
    targetPattern: { ragaPhrase: { ragaId: "original", svaras: ["Sa","Re","Ga","Ma","Pa"], gamakaHints: ["define aaroha, avaroha, vadi, samvadi, pakad"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_04_genre: {
    id: "sitar_l9_04_genre", type: "improvise", instrumentId: "sitar",
    title: "Sitar over 12-bar blues in E",
    targetPattern: { notes: ["E4","G4","A4","B4","A4","G4","E4","D4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_05_teach: {
    id: "sitar_l9_05_teach", type: "improvise", instrumentId: "sitar",
    title: "Masterclass — teach a 10-min sitar lesson",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa"], gamakaHints: ["explain + demonstrate"] } },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  sitar_l9_06_recital: {
    id: "sitar_l9_06_recital", type: "improvise", instrumentId: "sitar",
    title: "Genius Certificate — 45-min solo sitar recital",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'"], gamakaHints: ["2 ragas + original + raga mala close"] } },
    tempo: { bpm: 60, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },

  vocals_l4_01_minor: {
    id: "vocals_l4_01_minor", type: "play_scale", instrumentId: "vocals",
    title: "A natural minor scale",
    targetPattern: { notes: ["A3","B3","C4","D4","E4","F4","G4","A4","G4","F4","E4","D4","C4","B3","A3"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l4_02_melisma: {
    id: "vocals_l4_02_melisma", type: "play_note", instrumentId: "vocals",
    title: "3-note + 5-note melisma on 'ah'",
    targetPattern: { notes: ["C4","E4","C4","C4","E4","D4","C4","G4","F4","E4","D4","C4"].map((p,i)=>({pitch:p,startMs:i*250,durationMs:250})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l4_03_chromatic: {
    id: "vocals_l4_03_chromatic", type: "play_scale", instrumentId: "vocals",
    title: "Chromatic scale C4-C5",
    targetPattern: { notes: ["C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","B4","A#4","A4","G#4","G4","F#4","F4","E4","D#4","D4","C#4","C4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l4_04_ornaments: {
    id: "vocals_l4_04_ornaments", type: "play_note", instrumentId: "vocals",
    title: "Trill + mordent + turn",
    targetPattern: { notes: ["C4","D4","C4","D4","C4","D4","C4","B3","C4","D4","C4","B3","C4"].map((p,i)=>({pitch:p,startMs:i*200,durationMs:200})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l4_05_hello: {
    id: "vocals_l4_05_hello", type: "play_along", instrumentId: "vocals",
    title: "Hello chorus — F minor",
    targetPattern: { notes: ["F4","G4","Ab4","G4","F4","Eb4","Db4","F4","Ab4","Bb4","F5","Ab4","Bb4","C5","Ab4","F4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500,velocity:0.4+0.03*i})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l4_06_harmony: {
    id: "vocals_l4_06_harmony", type: "play_along", instrumentId: "vocals",
    title: "Hold a 3rd above the melody",
    targetPattern: { notes: ["E4","F4","G4","A4","B4","A4","G4","F4","E4"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l5_01_vibrato: {
    id: "vocals_l5_01_vibrato", type: "play_note", instrumentId: "vocals",
    title: "Vibrato on sustained A4",
    targetPattern: { notes: [{pitch:"A4",startMs:0,durationMs:6000}] },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l5_02_mix: {
    id: "vocals_l5_02_mix", type: "play_scale", instrumentId: "vocals",
    title: "Mixed voice across passaggio",
    targetPattern: { notes: ["D4","E4","F4","G4","A4","G4","F4","E4","D4"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l5_03_riff: {
    id: "vocals_l5_03_riff", type: "play_note", instrumentId: "vocals",
    title: "8-note R&B riff descending",
    targetPattern: { notes: ["G4","F4","E4","D4","C4","B3","A3","G3"].map((p,i)=>({pitch:p,startMs:i*200,durationMs:200})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l5_04_aria: {
    id: "vocals_l5_04_aria", type: "play_along", instrumentId: "vocals",
    title: "O Mio Babbino — opening 16 bars Ab major",
    targetPattern: { notes: ["Ab4","Bb4","C5","Ab4","C5","Db5","C5","Bb4","Ab4","F4","Eb4","F4","Ab4","Bb4","Ab4","F4"].map((p,i)=>({pitch:p,startMs:i*800,durationMs:800})) },
    tempo: { bpm: 72, meter: [6, 8] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l5_05_sanchari: {
    id: "vocals_l5_05_sanchari", type: "play_scale", instrumentId: "vocals",
    title: "Sancharis in Mayamalavagowla",
    targetPattern: { notes: ["C4","Db4","E4","F4","Db4","E4","F4","G4","E4","F4","G4","Ab4"].map((p,i)=>({pitch:p,startMs:i*400,durationMs:400})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l5_06_prayer: {
    id: "vocals_l5_06_prayer", type: "play_along", instrumentId: "vocals",
    title: "Livin on a Prayer chorus",
    targetPattern: { notes: ["E4","G4","A4","G4","E4","G4","A4","B4","C5","D5","E5","D5","C5","A4","G4"].map((p,i)=>({pitch:p,startMs:i*400,durationMs:400,velocity:0.5+0.02*i})) },
    tempo: { bpm: 124, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l6_01_hard_leaps: {
    id: "vocals_l6_01_hard_leaps", type: "play_note", instrumentId: "vocals",
    title: "Tritone + octave + minor 7th",
    targetPattern: { notes: ["C4","F#4","C4","C5","C4","Bb4","C4"].map((p,i)=>({pitch:p,startMs:i*1000,durationMs:1000})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l6_02_mozart: {
    id: "vocals_l6_02_mozart", type: "play_along", instrumentId: "vocals",
    title: "Hölle Rache — first 8 bars (transposed if needed)",
    targetPattern: { notes: ["D5","F5","A5","D6","A5","F5","D5","F5"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 140, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l6_03_whistle: {
    id: "vocals_l6_03_whistle", type: "play_note", instrumentId: "vocals",
    title: "Sustained whistle register",
    targetPattern: { notes: [{pitch:"G5",startMs:0,durationMs:3000}] },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l6_04_summertime: {
    id: "vocals_l6_04_summertime", type: "improvise", instrumentId: "vocals",
    title: "Summertime with improv verse 2",
    targetPattern: { notes: ["D4","F4","A4","F4","D4","C4","D4","F4","A4","F4","D4","A3"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l6_05_khayal: {
    id: "vocals_l6_05_khayal", type: "play_along", instrumentId: "vocals",
    title: "Khayal in Bhairavi (teentaal vilambit)",
    targetPattern: { ragaPhrase: { ragaId: "bhairavi", svaras: ["ga","re","Sa","re","Sa","ni","Sa","re","ga","ma","ga","re","ma","dha","ni","Sa'"], gamakaHints: ["andolan komal svaras"] } },
    tempo: { bpm: 50, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l6_06_cert: {
    id: "vocals_l6_06_cert", type: "play_along", instrumentId: "vocals",
    title: "Pro Cert — 3-song set",
    targetPattern: { notes: ["C4","E4","G4","C5","G4","E4","C4","A3","C4","E4","G4","C5"].map((p,i)=>({pitch:p,startMs:i*700,durationMs:700})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },

  vocals_l7_01_nessun: {
    id: "vocals_l7_01_nessun", type: "play_along", instrumentId: "vocals",
    title: "Nessun Dorma full aria",
    targetPattern: { notes: ["D4","F#4","A4","B4","A4","F#4","D4","A4","B4","C#5","D5","B4","A4","F#4","D4"].map((p,i)=>({pitch:p,startMs:i*900,durationMs:900,velocity:0.4+0.035*i})) },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l7_02_scat: {
    id: "vocals_l7_02_scat", type: "improvise", instrumentId: "vocals",
    title: "Scat over 12-bar blues",
    targetPattern: { notes: ["C4","E4","G4","Bb4","G4","F4","E4","D4","C4","E4","G4","F4"].map((p,i)=>({pitch:p,startMs:i*300,durationMs:300})) },
    tempo: { bpm: 120, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l7_03_taan: {
    id: "vocals_l7_03_taan", type: "play_scale", instrumentId: "vocals",
    title: "Hindustani taan in Yaman (16 matras)",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'","Sa'","Ni","Dha","Pa","Ma","Ga","Re","Sa"], gamakaHints: ["120 bpm, clean gamakas"] } },
    tempo: { bpm: 120, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l7_04_belt: {
    id: "vocals_l7_04_belt", type: "play_note", instrumentId: "vocals",
    title: "Sustained belt at C5",
    targetPattern: { notes: [{pitch:"C5",startMs:0,durationMs:4000,velocity:0.85}] },
    tempo: { bpm: 60, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l7_05_langs: {
    id: "vocals_l7_05_langs", type: "play_along", instrumentId: "vocals",
    title: "3 phrases in Italian, French, German",
    targetPattern: { notes: ["C4","E4","G4","A4","G4","E4","C4","D4","F4","A4","G4","E4"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l7_06_3part: {
    id: "vocals_l7_06_3part", type: "play_along", instrumentId: "vocals",
    title: "3-part harmony — hold any voice",
    targetPattern: { notes: ["C4","E4","G4","C5","G4","E4","C4"].map((p,i)=>({pitch:p,startMs:i*800,durationMs:800})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l8_01_full_aria: {
    id: "vocals_l8_01_full_aria", type: "play_along", instrumentId: "vocals",
    title: "Full operatic aria (chosen by Fach)",
    targetPattern: { notes: ["D4","F#4","A4","D5","A4","F#4","D4","A4","D5","F#5","E5","D5","A4","F#4","D4"].map((p,i)=>({pitch:p,startMs:i*700,durationMs:700})) },
    tempo: { bpm: 70, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l8_02_rahman: {
    id: "vocals_l8_02_rahman", type: "play_along", instrumentId: "vocals",
    title: "A.R. Rahman vocal transcription",
    targetPattern: { notes: ["D4","F4","G4","A4","G4","F4","D4","C4","D4","F4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l8_03_autumn: {
    id: "vocals_l8_03_autumn", type: "improvise", instrumentId: "vocals",
    title: "Autumn Leaves melody + 2 improv choruses",
    targetPattern: { notes: ["E4","F#4","G4","C5","D5","E5","F5","B4","E5","D5","C5","B4","A4","G4","F#4","E4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 100, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l8_04_khayal: {
    id: "vocals_l8_04_khayal", type: "improvise", instrumentId: "vocals",
    title: "15-min khayal in Bhairavi or Yaman",
    targetPattern: { ragaPhrase: { ragaId: "yaman", svaras: ["Sa","Re","Ga","Ma","Pa","Dha","Ni","Sa'"], gamakaHints: ["vilambit + drut + taans + sam"] } },
    tempo: { bpm: 50, meter: [16, 4] }, gradingRubricId: "rubric_raga_intermediate",
  },
  vocals_l8_05_compose: {
    id: "vocals_l8_05_compose", type: "compose", instrumentId: "vocals",
    title: "Compose + sing original 32-bar song",
    targetPattern: { notes: ["C4","E4","G4","E4","F4","A4","G4","E4","D4","F4","A4","G4","C4","E4","G4","C5"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 96, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l8_06_set: {
    id: "vocals_l8_06_set", type: "play_along", instrumentId: "vocals",
    title: "30-min solo concert set",
    targetPattern: { notes: ["C4","E4","G4","C5","A4","F4","D4","G4","B4","D5"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 90, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },

  vocals_l9_01_art_song: {
    id: "vocals_l9_01_art_song", type: "compose", instrumentId: "vocals",
    title: "Compose 5-min art song with sheet music",
    targetPattern: { notes: ["D4","F#4","A4","D5","C#5","B4","A4","F#4","D4","E4","F#4","A4","D5"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 72, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l9_02_recital: {
    id: "vocals_l9_02_recital", type: "play_along", instrumentId: "vocals",
    title: "45-min recital — 3 languages, 4 genres",
    targetPattern: { notes: ["C4","E4","G4","C5","G4","E4","C4","D4","F4","A4","D5","A4","F4","D4"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l9_03_improv: {
    id: "vocals_l9_03_improv", type: "improvise", instrumentId: "vocals",
    title: "Pure improvisation — 10 min continuous",
    targetPattern: { notes: ["C4","E4","G4","A4","G4","E4","C4","D4","F4","A4","G4","E4"].map((p,i)=>({pitch:p,startMs:i*500,durationMs:500})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l9_04_lang: {
    id: "vocals_l9_04_lang", type: "play_along", instrumentId: "vocals",
    title: "3-min song in 5th language",
    targetPattern: { notes: ["C4","D4","E4","G4","A4","G4","E4","D4","C4"].map((p,i)=>({pitch:p,startMs:i*600,durationMs:600})) },
    tempo: { bpm: 85, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l9_05_teach: {
    id: "vocals_l9_05_teach", type: "improvise", instrumentId: "vocals",
    title: "Masterclass — 15-min lesson",
    targetPattern: { notes: ["C4","E4","G4","C5"].map((p,i)=>({pitch:p,startMs:i*700,durationMs:700})) },
    tempo: { bpm: 80, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
  vocals_l9_06_recital: {
    id: "vocals_l9_06_recital", type: "play_along", instrumentId: "vocals",
    title: "Genius Cert — 60-min full recital",
    targetPattern: { notes: ["C4","E4","G4","C5","G4","E4","C4","D4","F4","A4","D5","A4","F4","D4","C4"].map((p,i)=>({pitch:p,startMs:i*800,durationMs:800})) },
    tempo: { bpm: 72, meter: [4, 4] }, gradingRubricId: "rubric_early_level",
  },
};

export const getExercise = (id: string) => EXERCISES[id];
