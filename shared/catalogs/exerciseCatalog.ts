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
      // A short unseen melody the student sees for the first time
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
      // At 80 bpm: beat = 750ms, 16th = 187.5ms
      // Bar 4 fill: 6 16th notes (T1 T1 T2 T2 T3 T3) starting at 9000ms
      onsets: [9000, 9187, 9375, 9562, 9750, 9937, 12000], // 6 fill hits + crash on next beat 1
    },
    tempo: { bpm: 80, meter: [4, 4] },
    gradingRubricId: "rubric_rhythm_only",
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
