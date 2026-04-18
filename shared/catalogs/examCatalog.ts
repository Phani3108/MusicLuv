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
