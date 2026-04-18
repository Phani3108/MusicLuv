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
    passCriteria: { minGradeOverall: 0.75, minPerDimension: { pitch: 0.8, rhythm: 0.6 } },
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
  piano_l1_04_left_hand: {
    id: "piano_l1_04_left_hand",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "Adding the left hand — Twinkle bass",
    objectives: [
      "Find Middle C, then drop an octave to C3 for the left-hand thumb",
      "Play the bass line of Twinkle — same rhythm, lower octave",
      "Keep both hands relaxed; the left isn't louder than the right",
    ],
    writtenContent:
      "## One octave down\n\nYour left-hand thumb sits on **C3** — that's Middle C minus 12 keys (one octave down). Same finger numbers as the right hand but **mirrored**: finger 1 is still the thumb; finger 5 is the pinky, which now lives on the LEFT side.\n\n## The bass line\n\nIdentical rhythm to the right hand melody. Keep it quiet — the left hand is the foundation, not the roof.\n\n`C3 C3 G3 G3 A3 A3 G3 · F3 F3 E3 E3 D3 D3 C3`",
    audioRefs: [{ id: "demo", label: "Left-hand Twinkle, slow" }],
    exercisePlanId: "piano_l1_04_twinkle_lh",
    prerequisites: ["piano_l1_03_twinkle"],
    passCriteria: { minGradeOverall: 0.72 },
    estimatedMinutes: 8,
  },
  piano_l1_05_two_hands: {
    id: "piano_l1_05_two_hands",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "Two hands together — full Twinkle",
    objectives: [
      "Play melody (RH) and bass (LH) simultaneously",
      "Keep steady tempo even when one hand is more interesting than the other",
      "Release both hands cleanly between phrases",
    ],
    writtenContent:
      "## The hardest thing in music\n\nThe first time you play two hands together, your brain will fight you. **That's normal.** Go stupid-slow — 40 bpm, one beat per breath if you need.\n\n## The secret\n\nDon't think about both hands at the same time. Think about the rhythm they share. When both hands land on beat 1, you only have to think about landing on beat 1.",
    audioRefs: [{ id: "demo", label: "Twinkle, both hands, 60 bpm" }],
    exercisePlanId: "piano_l1_05_twinkle_both",
    prerequisites: ["piano_l1_04_left_hand"],
    passCriteria: { minGradeOverall: 0.70 },
    estimatedMinutes: 12,
  },
  piano_l1_06_thumb_under: {
    id: "piano_l1_06_thumb_under",
    instrumentId: "piano",
    level: 1, tier: "standard",
    title: "Thumb under — the full C-major scale",
    objectives: [
      "Play C major one octave with fingering 1-2-3-1-2-3-4-5 ascending",
      "Thumb under for the 3→1 transition (on F going up, and F going down)",
      "Stay even — no gap when the thumb crosses",
    ],
    writtenContent:
      "## Why thumb-under exists\n\nYou have 5 fingers. The C-major scale has 8 notes. If you tried to use one finger per note, you'd run out after G. **Thumb-under** lets the same hand keep going smoothly up and down the keyboard forever.\n\n## The motion\n\nAscending: play E (finger 3), then sneak your thumb UNDER your hand to land on F (finger 1). Continue 2-3-4-5 up to C.\n\nDescending: play F (finger 1), then sneak finger 3 OVER your thumb to land on E. Continue down.\n\n## Even is everything\n\nIf you can hear the thumb-under, you're doing it too early or too late. The goal is invisible transitions.",
    audioRefs: [{ id: "demo", label: "C major scale, one octave, 80 bpm" }],
    exercisePlanId: "piano_l1_06_cmaj_scale",
    prerequisites: ["piano_l1_01_hand_shape"],
    passCriteria: { minGradeOverall: 0.72, minPerDimension: { pitch: 0.8, rhythm: 0.7 } },
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

  guitar_l1_01_hold: {
    id: "guitar_l1_01_hold",
    instrumentId: "guitar",
    level: 1, tier: "standard",
    title: "Holding the guitar & your first string",
    objectives: [
      "Sit or stand with the guitar's body flat against you, neck angled up slightly",
      "Identify the 6 strings by letter (low to high: E A D G B E)",
      "Pluck each open string cleanly and hear its pitch",
    ],
    writtenContent:
      "## The guitar is an armful\n\nBody flat against your ribs. Neck tilted up at about 10–15° — not pointing at the floor, not pointing at the ceiling. If your wrist hurts after 5 minutes, your posture is wrong; adjust before you continue.\n\n## Six strings, two Es\n\nFrom the thickest string (closest to your face) to the thinnest: **E - A - D - G - B - E**. The two Es are two octaves apart — low E2 and high E4. The rest run: A2, D3, G3, B3.\n\n## Just pluck\n\nWith your thumb or a pick, sound each open string one by one. Listen. A clean open string rings — if it buzzes, your finger is accidentally touching a fret.",
    audioRefs: [{ id: "demo", label: "Six open strings, low to high" }],
    exercisePlanId: "guitar_l1_01_open_strings",
    prerequisites: [],
    passCriteria: { minGradeOverall: 0.65 },
    estimatedMinutes: 8,
  },
  guitar_l1_02_first_fret: {
    id: "guitar_l1_02_first_fret",
    instrumentId: "guitar",
    level: 1, tier: "standard",
    title: "Your first fretted notes — the low E string",
    objectives: [
      "Press down just behind each fret (not on it, not in the middle)",
      "Play E (open) → F (1st fret) → G (3rd fret) → A (5th fret)",
      "Keep each note clean and ringing",
    ],
    writtenContent:
      "## Where to press\n\nThe fret itself is the metal bar. Press the string **just behind** the fret (on the headstock side) — not on the metal, not way back. Close to the fret = clean note with minimal pressure.\n\n## Four notes on one string\n\nLow E string: open = E · 1st fret = F · 3rd fret = G · 5th fret = A. That's the bottom half of an A-minor scale without moving to another string.",
    audioRefs: [{ id: "demo", label: "E · F · G · A on low E string" }],
    exercisePlanId: "guitar_l1_02_e_string_walk",
    prerequisites: ["guitar_l1_01_hold"],
    passCriteria: { minGradeOverall: 0.7, minPerDimension: { pitch: 0.75 } },
    estimatedMinutes: 10,
  },
  guitar_l1_03_first_chord: {
    id: "guitar_l1_03_first_chord",
    instrumentId: "guitar",
    level: 1, tier: "standard",
    title: "First chord — Em",
    objectives: [
      "Fret E minor: 2nd fret of the A and D strings, fingers 2 and 3",
      "Strum all six strings cleanly",
      "Release and re-fret 5 times in a row without buzzing",
    ],
    writtenContent:
      "## E minor, the welcoming chord\n\nEm uses just two fretted notes: **finger 2 on the 2nd fret of A**, **finger 3 on the 2nd fret of D**. Every other string rings open.\n\n## The strum\n\nRelax your pick hand. Let the pick fall through all 6 strings — don't stab, don't scrape. A full Em should sound lush; if it buzzes, check your finger tips aren't touching neighboring strings.",
    audioRefs: [{ id: "demo", label: "Em chord — strum x4" }],
    exercisePlanId: "guitar_l1_03_em_strum",
    prerequisites: ["guitar_l1_02_first_fret"],
    passCriteria: { minGradeOverall: 0.7 },
    estimatedMinutes: 10,
  },

  violin_l1_01_hold: {
    id: "violin_l1_01_hold",
    instrumentId: "violin",
    level: 1, tier: "standard",
    title: "Holding the violin & bowing an open string",
    objectives: [
      "Rest the violin on your collarbone; chin gently on the rest — not clamped",
      "Hold the bow with a relaxed grip: thumb curved, pinky on top, hair angled toward the bridge",
      "Draw a straight bow on the open A string for a clean, singing tone (4 seconds)",
    ],
    writtenContent:
      "## Where the violin lives\n\nThe violin's **body** rests on your collarbone. Your chin sits on the chinrest — **gently**. If your shoulder is raised or your neck is straining, you're holding it wrong; take it off, shake out, try again.\n\n## The bow is a breath\n\nBow grip: thumb curved like a hook, pinky balanced on top of the stick, other fingers draped. The bow moves parallel to the bridge — not swinging in an arc. A straight bow = a straight tone.\n\n## Your first note\n\nBow the open **A string** — that's the second-highest string. No fingers touching the fingerboard yet. Down-bow from frog to tip, slowly, 4 seconds. Then up-bow back. Clean tone, no scratching.",
    audioRefs: [{ id: "demo", label: "Open A, 4-second down-bow + up-bow" }],
    exercisePlanId: "violin_l1_01_open_a",
    prerequisites: [],
    passCriteria: { minGradeOverall: 0.65, minPerDimension: { tone: 0.65 } },
    estimatedMinutes: 10,
  },
  violin_l1_02_first_finger: {
    id: "violin_l1_02_first_finger",
    instrumentId: "violin",
    level: 1, tier: "standard",
    title: "First finger — playing B on the A string",
    objectives: [
      "Curl your first finger onto the A string about one inch from the nut",
      "Press firmly enough to stop the string cleanly; don't squeeze",
      "Bow the result: it should sound a whole step up from A — that's B",
    ],
    writtenContent:
      "## Intonation is everything\n\nThe violin has **no frets**. There's no 'right' spot — there's only 'in tune' and 'not in tune'. Your ear is the only judge. Start by listening to a reference B, then try to match it.\n\n## Where the finger goes\n\nLook at the fingerboard. About **one inch from the nut** (the bone at the top where the strings begin), press your first finger down firmly. Keep it curved, not flat. Bow slowly — if you hear a clean note, you found B. If it's buzzing, press harder or move slightly.",
    audioRefs: [{ id: "demo", label: "B on A string — reference tone" }],
    exercisePlanId: "violin_l1_02_a_to_b",
    prerequisites: ["violin_l1_01_hold"],
    passCriteria: { minGradeOverall: 0.68, minPerDimension: { pitch: 0.7 } },
    estimatedMinutes: 10,
  },
  violin_l1_03_first_phrase: {
    id: "violin_l1_03_first_phrase",
    instrumentId: "violin",
    level: 1, tier: "standard",
    title: "First phrase — A B C♯ D (D-major tetrachord)",
    objectives: [
      "Add finger 2 (C♯) and finger 3 (D) on the A string",
      "Play the four notes as a rising phrase, clean intonation",
      "Keep the bow steady — one note per bow stroke",
    ],
    writtenContent:
      "## Four notes, one bow each\n\nA (open) → B (finger 1) → C♯ (finger 2) → D (finger 3). That's a **tetrachord** — the lower half of a D major scale.\n\nFinger 2 sits **close to** finger 1 (only a half-step gap feels tight, but this is a whole step — about an inch). Finger 3 is a half-step from finger 2 — fingers almost touching.\n\n## Listen as you play\n\nIf the note sounds 'off', it IS off. Move the finger a millimeter. This is the whole game of violin — listen, adjust, repeat.",
    audioRefs: [{ id: "demo", label: "A B C# D rising, 60 bpm" }],
    exercisePlanId: "violin_l1_03_d_tetrachord",
    prerequisites: ["violin_l1_02_first_finger"],
    passCriteria: { minGradeOverall: 0.7, minPerDimension: { pitch: 0.72 } },
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
    passCriteria: { minGradeOverall: 0.7, minPerDimension: { pitch: 0.8, tone: 0.65 } },
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
    passCriteria: { minGradeOverall: 0.72, minPerDimension: { pitch: 0.75, tone: 0.7 } },
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
