import type { Lesson } from "./types";

export const LESSONS: Record<string, Lesson> = {
  piano_l1_01_hand_shape: {
    id: "piano_l1_01_hand_shape",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "Hand shape & finding Middle C",
    objectives: [
      "Sit with a relaxed wrist, curved fingers",
      "Find Middle C on any piano (the C left of the two-black-key group nearest the name plate)",
      "Play C, D, E, F, G cleanly with fingers 1–5",
    ],
    writtenContent:
      "## Posture first\n\nSit tall. Feet flat. Elbows slightly above the keys. Your hand should look like it's gently holding a peach — curved, not flat.\n\n## Find Middle C\n\nLook at the keyboard. See the groups of two and three black keys? **Middle C is the white key immediately to the left of the two-black-key group closest to the piano's name.**\n\n## Play C–D–E–F–G\n\nPlace thumb (finger 1) on C, then a finger per white key. Press gently, count *one-and-two-and*. We'll go slow: 60 bpm.",
    audioRefs: [
      { id: "demo", label: "Your target (60 bpm)" },
      { id: "cmaj5_slow", label: "C-D-E-F-G, finger-by-finger" },
    ],
    exercisePlanId: "piano_l1_01_scale5",
    prerequisites: [],
    passCriteria: { minGradeOverall: 0.75, minPerDimension: { pitch: 0.8, rhythm: 0.6 } as any },
    estimatedMinutes: 8,
  },
  piano_l1_02_rhythm: {
    id: "piano_l1_02_rhythm",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "Steady beat — quarters & halves",
    objectives: [
      "Clap quarter notes at 80 bpm with <50ms drift",
      "Hold a half note for exactly 2 beats",
      "Mix quarters and halves on one note (C)",
    ],
    writtenContent:
      "## The beat is a promise\n\nEvery quarter note is one click of the metronome. Every half note is two. We're not playing *faster*, we're playing *in time*.\n\nTap your foot with the metronome. Now play C on every tap. Now hold C for two taps. That's it — that's rhythm.",
    audioRefs: [{ id: "demo", label: "Target: 8 bars at 80 bpm" }],
    exercisePlanId: "piano_l1_02_quarter_halves",
    prerequisites: ["piano_l1_01_hand_shape"],
    passCriteria: { minGradeOverall: 0.72 },
    estimatedMinutes: 6,
  },
  piano_l1_03_twinkle: {
    id: "piano_l1_03_twinkle",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "First tune — Twinkle, Twinkle (right hand)",
    objectives: [
      "Play the melody of Twinkle using fingers 1–5 in C-position",
      "Keep steady tempo through bar 4",
      "Release cleanly between notes",
    ],
    writtenContent:
      "## You already know this tune\n\n*Twinkle, twinkle, little star* = C C G G A A G. *How I wonder what you are* = F F E E D D C. Your fingers don't move — only which finger presses changes.",
    audioRefs: [{ id: "demo", label: "Twinkle — whole tune, slow" }],
    exercisePlanId: "piano_l1_03_twinkle_rh",
    prerequisites: ["piano_l1_01_hand_shape"],
    passCriteria: { minGradeOverall: 0.75 },
    estimatedMinutes: 10,
  },
  piano_l2_01_staff: {
    id: "piano_l2_01_staff",
    instrumentId: "piano",
    level: 2, tier: "standard",
    title: "Reading the treble staff",
    objectives: ["Name every line and space in treble clef", "Play a 4-bar sight-read", "Stay in time at 70 bpm"],
    writtenContent: "## Every Good Boy Does Fine\n\nLines from bottom up: **E G B D F** (Every Good Boy Does Fine). Spaces: **F A C E**. That's the entire treble staff.",
    audioRefs: [{ id: "demo", label: "Sight-read target" }],
    exercisePlanId: "piano_l2_01_sightread",
    prerequisites: ["piano_l1_03_twinkle"],
    passCriteria: { minGradeOverall: 0.72 },
    estimatedMinutes: 12,
  },

  sitar_l1_01_sa: {
    id: "sitar_l1_01_sa",
    instrumentId: "sitar",
    level: 1, tier: "standard",
    title: "Finding Sa & tuning the drone",
    objectives: [
      "Identify Sa (tonic) and Pa (fifth) on the main string",
      "Set the tanpura / drone to match",
      "Sustain a clean Sa for 10 seconds with the mizrab",
    ],
    writtenContent:
      "## Sa is home\n\nBefore any raga, there is Sa. It's the tonic, the anchor, the first breath of every phrase. The drone — tanpura or keyboard drone — gives you Sa and Pa forever. Listen first, play second.\n\n## Your mizrab\n\nWire plectrum, right index finger. Down-stroke = **Da**. Up-stroke = **Ra**. For Sa, just Da. Clean. Ringing. Ten seconds.",
    audioRefs: [{ id: "drone", label: "Tanpura drone in C" }, { id: "sa_demo", label: "Guruji plays Sa" }],
    exercisePlanId: "sitar_l1_01_sustain_sa",
    prerequisites: [],
    passCriteria: { minGradeOverall: 0.7, minPerDimension: { pitch: 0.8, tone: 0.65 } as any },
    estimatedMinutes: 10,
  },
  sitar_l4_01_yaman_alap: {
    id: "sitar_l4_01_yaman_alap",
    instrumentId: "sitar",
    level: 4, tier: "pro",
    title: "Raga Yaman — opening alap with meend",
    objectives: [
      "Sustain Sa then climb to Ga cleanly",
      "Execute meend from Ma down to Ga",
      "Breathe at the end of each phrase",
    ],
    writtenContent:
      "## The evening raga\n\nYaman is the gentlest welcome to Hindustani classical. Thaat: Kalyan. Vadi: Ga. Samvadi: Ni. Time: early evening.\n\n**Aaroha:** Ni Re Ga Ma Dha Ni Sa'  \n**Avaroha:** Sa' Ni Dha Pa Ma Ga Re Sa  \n**Pakad:** Ni Re Ga, Ma Dha Ni Sa'\n\nStart on Sa. Breathe. Climb slowly to Ga. From Ma, bend (meend) down to Ga in one continuous motion — that's the heart of Yaman.",
    audioRefs: [{ id: "demo", label: "Ustad's alap in Yaman" }],
    exercisePlanId: "sitar_l4_01_yaman_meend",
    prerequisites: ["sitar_l1_01_sa"],
    passCriteria: { minGradeOverall: 0.72, minPerDimension: { pitch: 0.75, tone: 0.7 } as any },
    estimatedMinutes: 15,
  },

  tabla_l1_01_dha: {
    id: "tabla_l1_01_dha",
    instrumentId: "tabla",
    level: 1, tier: "standard",
    title: "Your first bol — Dha",
    objectives: [
      "Strike Dha cleanly — right finger on the syahi + left hand open",
      "Produce a ringing, pitched sound",
      "Repeat 16 times on the beat at 80 bpm",
    ],
    writtenContent:
      "## Dha = Dha + Ge\n\n**Dha** is the sound of both hands together: Dha (right, ringing open stroke on the dayan) + Ge (left, open palm slap on the bayan). It's the first bol of teentaal.\n\nGet one clean Dha. Then 16 in a row.",
    audioRefs: [{ id: "demo", label: "Guruji plays 16x Dha" }],
    exercisePlanId: "tabla_l1_01_dha_16",
    prerequisites: [],
    passCriteria: { minGradeOverall: 0.72 },
    estimatedMinutes: 8,
  },
};

export const listLessonsForInstrument = (instrumentId: string) =>
  Object.values(LESSONS)
    .filter((l) => l.instrumentId === instrumentId)
    .sort((a, b) => a.level - b.level);

export const getLesson = (id: string) => LESSONS[id];
