import type { Exam } from "./types";

export const EXAMS: Record<string, Exam> = {
  // ---- Piano · Lesson-level mastery quiz for L1.1 ----
  piano_l1_01_mastery: {
    id: "piano_l1_01_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_01_hand_shape",
    title: "Quick check: hand shape & Middle C",
    passThreshold: 0.67,
    questions: [
      {
        id: "q1", type: "mcq",
        prompt: "Where is Middle C on a piano?",
        options: [
          "The very first white key on the far left",
          "The white key just to the left of the 2-black-key group near the center",
          "Any key to the right of a black key",
          "The same key as the lowest note",
        ],
        correctIndex: 1,
        explanation: "Middle C sits immediately to the left of the two-black-key group closest to the piano's name.",
      },
      {
        id: "q2", type: "mcq",
        prompt: "What does good hand shape feel like?",
        options: [
          "Flat fingers, straight wrist",
          "Curved fingers as if gently holding a peach",
          "Fingers pressed tight together",
          "Bent wrist, tense knuckles",
        ],
        correctIndex: 1,
        explanation: "Relaxed, curved fingers protect your tendons and give you control.",
      },
      {
        id: "q3", type: "listening",
        prompt: "Which note is this?",
        audioRef: { notes: [{ pitch: "C4", startMs: 0, durationMs: 1200 }] },
        options: ["A4", "C4", "G4", "E4"],
        correctIndex: 1,
        explanation: "That's Middle C (C4) — the 'home' note we're learning from.",
      },
    ],
  },

  // ---- Piano · Lesson 1.2 — Rhythm ----
  piano_l1_02_mastery: {
    id: "piano_l1_02_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_02_rhythm",
    title: "Quick check: steady beat",
    passThreshold: 0.67,
    questions: [
      { id: "q1", type: "mcq",
        prompt: "How many beats does a quarter note get in 4/4?",
        options: ["Half a beat", "One beat", "Two beats", "Four beats"],
        correctIndex: 1,
        explanation: "In 4/4, the quarter note gets one beat — the same as one metronome click." },
      { id: "q2", type: "mcq",
        prompt: "Best practice when starting a tricky rhythm?",
        options: ["Play it as fast as you can", "Slow the metronome down", "Skip the hard part", "Just feel it"],
        correctIndex: 1,
        explanation: "Slow tempo builds accuracy. Speed comes from clean repetitions, never the other way around." },
      { id: "q3", type: "listening",
        prompt: "Which pattern is on the beat?",
        audioRef: { notes: [
          { pitch: "C4", startMs: 0, durationMs: 500 },
          { pitch: "C4", startMs: 500, durationMs: 500 },
          { pitch: "C4", startMs: 1000, durationMs: 1000 },
        ] },
        options: ["Rushing the second note", "Quarter – quarter – half, all on the beat", "All half notes", "Random spacing"],
        correctIndex: 1,
        explanation: "That's quarter-quarter-half, exactly on the 120 bpm click." },
    ],
  },

  // ---- Piano · Lesson 1.3 — First tune ----
  piano_l1_03_mastery: {
    id: "piano_l1_03_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_03_twinkle",
    title: "Quick check: Twinkle melody",
    passThreshold: 0.67,
    questions: [
      { id: "q1", type: "mcq",
        prompt: "In C-position right hand, which finger plays G?",
        options: ["1 (thumb)", "3", "4", "5 (pinky)"],
        correctIndex: 3,
        explanation: "Finger 5 — your pinky — plays G when your thumb is on C." },
      { id: "q2", type: "mcq",
        prompt: "The first notes of Twinkle are…",
        options: ["C C F F G G F", "C C G G A A G", "C D E F G A B", "E E G G A A G"],
        correctIndex: 1,
        explanation: "Twinkle opens C C G G A A G — 'Twinkle, twinkle, little star'." },
      { id: "q3", type: "listening",
        prompt: "Which tune is this?",
        audioRef: { notes: [
          { pitch: "C4", startMs: 0, durationMs: 500 },
          { pitch: "C4", startMs: 500, durationMs: 500 },
          { pitch: "G4", startMs: 1000, durationMs: 500 },
          { pitch: "G4", startMs: 1500, durationMs: 500 },
          { pitch: "A4", startMs: 2000, durationMs: 500 },
          { pitch: "A4", startMs: 2500, durationMs: 500 },
          { pitch: "G4", startMs: 3000, durationMs: 1000 },
        ] },
        options: ["Twinkle, Twinkle, Little Star", "Happy Birthday", "Mary Had a Little Lamb", "Jingle Bells"],
        correctIndex: 0,
        explanation: "That's the opening of Twinkle, Twinkle." },
    ],
  },

  // ---- Piano · Lesson 1.4 — Left hand ----
  piano_l1_04_mastery: {
    id: "piano_l1_04_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_04_left_hand",
    title: "Quick check: adding the left hand",
    passThreshold: 0.67,
    questions: [
      { id: "q1", type: "mcq",
        prompt: "In the left hand, finger 5 is your…",
        options: ["Thumb", "Index finger", "Pinky", "Ring finger"],
        correctIndex: 2,
        explanation: "Same system as the right hand — 1 is always thumb, 5 is always pinky. The position is mirrored." },
      { id: "q2", type: "mcq",
        prompt: "Middle C minus one octave is…",
        options: ["C3", "C5", "B3", "D4"],
        correctIndex: 0,
        explanation: "C3 is one octave (12 keys) below Middle C." },
      { id: "q3", type: "mcq",
        prompt: "At L1, how loud should your left hand be compared to the right?",
        options: ["Much louder", "Equal volume", "Quieter — it's the foundation", "Absolutely silent"],
        correctIndex: 2,
        explanation: "The bass is the foundation. Keep it supportive; let the melody sing over it." },
    ],
  },

  // ---- Piano · Lesson 1.5 — Two hands ----
  piano_l1_05_mastery: {
    id: "piano_l1_05_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_05_two_hands",
    title: "Quick check: both hands together",
    passThreshold: 0.67,
    questions: [
      { id: "q1", type: "mcq",
        prompt: "Best practice tempo for your first two-hand attempt?",
        options: ["Performance tempo", "Half performance tempo", "As slow as you need — even 40 bpm", "Fast, to build muscle memory"],
        correctIndex: 2,
        explanation: "When coordination is new, speed is your enemy. 40–60 bpm is a fine starting point." },
      { id: "q2", type: "mcq",
        prompt: "The trick for two-hand coordination is…",
        options: [
          "Think about both hands at once",
          "Ignore the left hand entirely",
          "Focus on the rhythm both hands share",
          "Count out loud while playing",
        ],
        correctIndex: 2,
        explanation: "When both hands land on the same beat, you only have one timing to think about." },
      { id: "q3", type: "listening",
        prompt: "Which is the Twinkle melody?",
        audioRef: { notes: [
          { pitch: "C4", startMs: 0, durationMs: 400 },
          { pitch: "C4", startMs: 400, durationMs: 400 },
          { pitch: "G4", startMs: 800, durationMs: 400 },
          { pitch: "G4", startMs: 1200, durationMs: 400 },
          { pitch: "A4", startMs: 1600, durationMs: 400 },
          { pitch: "A4", startMs: 2000, durationMs: 400 },
          { pitch: "G4", startMs: 2400, durationMs: 800 },
        ] },
        options: ["Twinkle (bars 1-4)", "Mary Had a Little Lamb", "Frère Jacques", "A random scale"],
        correctIndex: 0,
        explanation: "Those are the opening bars of Twinkle." },
    ],
  },

  // ---- Piano · Lesson 1.6 — Full C-major scale ----
  piano_l1_06_mastery: {
    id: "piano_l1_06_mastery",
    scope: "lesson",
    instrumentId: "piano",
    lessonId: "piano_l1_06_thumb_under",
    title: "Quick check: thumb-under technique",
    passThreshold: 0.67,
    questions: [
      { id: "q1", type: "mcq",
        prompt: "Why do pianists use thumb-under?",
        options: [
          "It sounds louder",
          "So one hand plays long scales smoothly without running out of fingers",
          "Tradition",
          "Modern pianos require it",
        ],
        correctIndex: 1,
        explanation: "Five fingers, eight scale notes — thumb-under is how one hand keeps flowing up and down." },
      { id: "q2", type: "mcq",
        prompt: "Ascending C major RH, which finger plays F?",
        options: ["2", "3", "1 (thumb, via thumb-under)", "5"],
        correctIndex: 2,
        explanation: "After finger 3 on E, your thumb tucks under to land on F." },
      { id: "q3", type: "listening",
        prompt: "Which scale is this?",
        audioRef: { notes: [
          { pitch: "C4", startMs: 0, durationMs: 300 },
          { pitch: "D4", startMs: 300, durationMs: 300 },
          { pitch: "E4", startMs: 600, durationMs: 300 },
          { pitch: "F4", startMs: 900, durationMs: 300 },
          { pitch: "G4", startMs: 1200, durationMs: 300 },
          { pitch: "A4", startMs: 1500, durationMs: 300 },
          { pitch: "B4", startMs: 1800, durationMs: 300 },
          { pitch: "C5", startMs: 2100, durationMs: 600 },
        ] },
        options: ["C major, one octave", "C minor", "Chromatic scale", "G major"],
        correctIndex: 0,
        explanation: "All white keys, C to C — that's C major." },
    ],
  },

  // ---- Piano · Level 1 → Level 2 advancement exam ----
  piano_l1_level_exam: {
    id: "piano_l1_level_exam",
    scope: "level",
    instrumentId: "piano",
    level: 1,
    title: "Level 1 exam — Foundations",
    passThreshold: 0.8,
    questions: [
      {
        id: "q1", type: "mcq",
        prompt: "How many beats does a half note get in 4/4?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "A half note = 2 quarter notes = 2 beats.",
      },
      {
        id: "q2", type: "mcq",
        prompt: "In C-position right hand, which finger plays F?",
        options: ["1 (thumb)", "2", "3", "4"],
        correctIndex: 3,
        explanation: "Finger 4 (ring) plays F when thumb is on C.",
      },
      {
        id: "q3", type: "listening",
        prompt: "What scale pattern is this?",
        audioRef: {
          notes: [
            { pitch: "C4", startMs: 0, durationMs: 400 },
            { pitch: "D4", startMs: 400, durationMs: 400 },
            { pitch: "E4", startMs: 800, durationMs: 400 },
            { pitch: "F4", startMs: 1200, durationMs: 400 },
            { pitch: "G4", startMs: 1600, durationMs: 600 },
          ],
        },
        options: ["C to G ascending", "G to C descending", "Random notes", "The same note five times"],
        correctIndex: 0,
        explanation: "You heard C–D–E–F–G — the first five notes of C major ascending.",
      },
      {
        id: "q4", type: "mcq",
        prompt: "What's a steady tempo?",
        options: [
          "Playing as fast as possible",
          "Each beat lands the same time apart",
          "Slowing down in hard parts",
          "It doesn't matter for beginners",
        ],
        correctIndex: 1,
        explanation: "Steady tempo means equal time between beats — the backbone of all music.",
      },
      {
        id: "q5", type: "listening",
        prompt: "Which of these is in rhythm with a steady click?",
        audioRef: {
          notes: [
            { pitch: "C4", startMs: 0, durationMs: 500 },
            { pitch: "C4", startMs: 500, durationMs: 500 },
            { pitch: "C4", startMs: 1000, durationMs: 500 },
            { pitch: "C4", startMs: 1500, durationMs: 500 },
          ],
        },
        options: ["Rushing — the notes speed up", "Steady quarter notes", "Random timing", "Too slow to count"],
        correctIndex: 1,
        explanation: "Four equal quarter notes at steady 120 bpm.",
      },
    ],
  },

  // ---- Piano · Standard Certificate (L3) tier exam ----
  piano_standard_certificate: {
    id: "piano_standard_certificate",
    scope: "grade",
    instrumentId: "piano",
    tier: "standard",
    title: "Standard Certificate — Piano",
    passThreshold: 0.85,
    questions: [
      {
        id: "q1", type: "mcq",
        prompt: "Which sequence is a C major scale?",
        options: [
          "C D E F# G A B C",
          "C D E F G A B C",
          "C Db Eb F G Ab Bb C",
          "C D E F G A Bb C",
        ],
        correctIndex: 1,
        explanation: "C major has no sharps or flats — just the white keys from C to C.",
      },
      {
        id: "q2", type: "practical",
        prompt: "Play the C major 5-finger scale ascending and descending, steady at 60 bpm.",
        exerciseId: "piano_l1_01_scale5",
        minComposite: 0.75,
        explanation: "This is the gating practical — your live take is graded by the audio engine.",
      },
      {
        id: "q3", type: "listening",
        prompt: "Which pattern did you hear?",
        audioRef: {
          notes: [
            { pitch: "C4", startMs: 0, durationMs: 400 },
            { pitch: "E4", startMs: 400, durationMs: 400 },
            { pitch: "G4", startMs: 800, durationMs: 400 },
            { pitch: "C5", startMs: 1200, durationMs: 600 },
          ],
        },
        options: ["C major triad arpeggio", "C minor triad", "Descending scale", "C E G B"],
        correctIndex: 0,
        explanation: "C → E → G → C is a C major arpeggio.",
      },
    ],
  },
};

export const getExam = (id: string) => EXAMS[id];

export const examForLesson = (lessonId: string): Exam | undefined =>
  Object.values(EXAMS).find((e) => e.scope === "lesson" && e.lessonId === lessonId);

export const examForLevel = (instrumentId: string, level: number): Exam | undefined =>
  Object.values(EXAMS).find((e) => e.scope === "level" && e.instrumentId === instrumentId && e.level === level);

export const examForGrade = (instrumentId: string, tier: "standard" | "pro" | "genius"): Exam | undefined =>
  Object.values(EXAMS).find((e) => e.scope === "grade" && e.instrumentId === instrumentId && e.tier === tier);
