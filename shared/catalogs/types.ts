export type Tier = "standard" | "pro" | "genius";
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Origin = "western" | "indian_classical" | "global";
export type Family =
  | "keyboard" | "fretted" | "bowed" | "woodwind" | "brass"
  | "perc_pitched" | "perc_unpitched" | "voice" | "electronic";

export interface Instrument {
  id: string;
  name: string;
  family: Family;
  origin: Origin;
  accent: string;             // tailwind color class suffix, e.g. "keyboard"
  glyph: string;              // emoji or unicode for placeholder hero
  blurb: string;
  heroImage?: string;
  tuningRef: { hz: number; noteMap: "12-TET" | "sa-based-C" };
  controls: Array<{
    id: string; name: string; label: string;
    description: string; audioSample?: string;
  }>;
  sampleAudio: Array<{ id: string; label: string; url?: string; noteName?: string }>;
  pedagogyTrackId: string;
  difficultyFloor: 1 | 2 | 3;
  micSetupHints: string[];
}

export interface Lesson {
  id: string;
  instrumentId: string;
  level: Level;
  tier: Tier;
  title: string;
  objectives: string[];
  writtenContent: string;     // markdown
  audioRefs: Array<{ id: string; label: string; url?: string; transcript?: string }>;
  exercisePlanId: string;
  prerequisites: string[];
  passCriteria: { minGradeOverall: number; minPerDimension?: Partial<DimScores> };
  estimatedMinutes: number;
}

export type ExerciseType =
  | "play_note" | "play_scale" | "play_chord" | "rhythm_clap"
  | "sight_read" | "play_along" | "improvise" | "compose" | "ear_train";

export interface TargetNote { pitch: string; startMs: number; durationMs: number; velocity?: number; finger?: number; }
export interface TargetChord { root: string; quality: string; startMs: number; durationMs: number; }
export interface RagaPhrase { ragaId: string; svaras: string[]; gamakaHints: string[]; }

export interface Exercise {
  id: string;
  type: ExerciseType;
  instrumentId: string;
  title: string;
  targetPattern: {
    notes?: TargetNote[];
    chords?: TargetChord[];
    onsets?: number[];
    ragaPhrase?: RagaPhrase;
  };
  tempo: { bpm: number; meter: [number, number] };
  gradingRubricId: string;
  referenceAudioUrl?: string;
}

export interface DimScores {
  pitch: number; rhythm: number; tone: number; dynamics: number; consistency: number;
}

export interface Rubric {
  id: string;
  weights: DimScores;
  passThreshold: number;
  pitchToleranceCents: number;
  rhythmToleranceMs: number;
  feedbackBank: Record<keyof DimScores, { minor: string[]; major: string[] }>;
}

export interface Raga {
  id: string; name: string; thaat: string; time: string;
  aaroha: string[]; avaroha: string[];
  vadi: string; samvadi: string; pakad: string[];
  moodTags: string[];
  equivalentScale: { root: string; mode: string };
}

export interface Taal {
  id: string; name: string; matras: number;
  vibhag: number[]; theka: string[]; clapPattern: ("X" | "0" | number)[];
}

export interface TierEntry {
  levelId: Level; tier: Tier; label: string; xpThreshold: number; color: string;
}

export interface Mentor {
  id: string; name: string; photoGlyph: string; role: "maestro" | "coach" | "guru";
  bio: string;
  instrumentExpertise: string[];
  styleExpertise: string[];
  defaultLines: string[];
  registerPrompt: string;
}

export interface Artist {
  id: string; name: string; photoGlyph: string; era: string; origin: string;
  instruments: string[];
  signatureLicks: Array<{ id: string; label: string; exerciseId?: string }>;
  styleFingerprint: { tempoRange: [number, number]; scaleBias: string; ornamentTags: string[] };
  sampleTracks: Array<{ title: string; url?: string; licensedUse: "excerpt" | "link_only" }>;
  unlockTier: "pro" | "genius";
  blurb: string;
}

export interface Quest {
  id: string; title: string; blurb: string;
  scope: "daily" | "streak" | "mastery" | "cross_instrument";
  instrumentId?: string;
  goal: {
    type: "play_minutes" | "pass_exercise" | "complete_lesson" | "perfect_run" | "record_recital" | "compose_bars";
    target?: string; count: number;
  };
  reward: { xp: number; coins?: number; hearts?: number; badgeId?: string };
  giverMentorId?: string;
  progress?: number;
}

export interface SongLibraryEntry {
  id: string; title: string; artistId?: string; genre: string;
  difficultyByInstrument: Record<string, Level>;
  copyrightNote: "public_domain" | "licensed" | "user_performance";
  blurb: string;
}

// ---------- Exams ----------

export type ExamScope = "lesson" | "level" | "grade";

export type ExamQuestion =
  | {
      id: string;
      type: "mcq";
      prompt: string;
      options: string[];              // 2-4 options
      correctIndex: number;
      explanation: string;
    }
  | {
      id: string;
      type: "listening";
      prompt: string;                 // "Which scale is this?"
      audioRef: { notes: Array<{ pitch: string; startMs: number; durationMs: number }> };  // Tone.js-playable
      options: string[];
      correctIndex: number;
      explanation: string;
    }
  | {
      id: string;
      type: "notation";
      prompt: string;                 // "Name this note"
      staff: { noteOnStaff: string };  // simple: e.g. "E4" rendered on treble staff
      options: string[];
      correctIndex: number;
      explanation: string;
    }
  | {
      id: string;
      type: "tap_rhythm";
      prompt: string;
      targetOnsets: number[];          // ms timestamps for the correct tap pattern
      tempoBpm: number;
      toleranceMs: number;
      explanation: string;
    }
  | {
      id: string;
      type: "free_text";
      prompt: string;
      rubric: string;                  // what the AI grader looks for
      expectedConcepts: string[];
      explanation: string;
    }
  | {
      id: string;
      type: "practical";
      prompt: string;
      exerciseId: string;              // link into exerciseCatalog
      minComposite: number;
      explanation: string;
    };

export interface Exam {
  id: string;
  scope: ExamScope;
  instrumentId: string;
  lessonId?: string;                 // for "lesson" scope
  level?: Level;                     // for "level" scope
  tier?: Tier;                       // for "grade" scope
  title: string;
  questions: ExamQuestion[];
  passThreshold: number;             // fraction of questions correct, e.g. 0.67
}
