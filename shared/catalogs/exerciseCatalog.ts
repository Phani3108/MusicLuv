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
