/**
 * Mastery quiz items for the L2-L4 expansion lessons (the 168 hand-
 * authored lessons from Phase 7). Each quiz is 3-4 questions, mostly
 * MCQ, with at least one item that ties back to the lesson's specific
 * pedagogy.
 *
 * Two layers:
 *   1. Per-instrument-family question banks (FRETTED_QB, INDIAN_QB,
 *      BOWED_REED_QB, KEYBOARD_ELECTRONIC_QB) — questions keyed by the
 *      LEVEL_TEMPLATES key (scale, two_note, tempo, etc.) so each
 *      instrument in the family shares well-fit questions.
 *   2. The `buildExpansionExams()` function that walks every L2-L4
 *      hand-authored lesson and emits an Exam keyed by `<lessonId>_mastery`.
 *
 * Result merges into EXAMS in examCatalog.ts so the existing exam runner
 * picks them up without any code change.
 */
import type { Exam, ExamQuestion } from "./types";

/**
 * Question template — `prompt` and `options` are shared across all
 * instruments in a family for a given key. The `instrumentName`
 * placeholder gets substituted at build time so each lesson's quiz
 * mentions the actual instrument.
 */
interface QuestionTemplate {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface FamilyBank {
  byKey: Record<string, QuestionTemplate[]>;
  /** Generic questions used when a key isn't covered. */
  fallback: QuestionTemplate[];
}

// ── Fretted (bass / ukulele / mandolin) ─────────────────────────────
const FRETTED_QB: FamilyBank = {
  byKey: {
    scale: [
      {
        id: "q_root_relationship",
        prompt: "When practicing a major scale, why is starting on the *root* important?",
        options: [
          "It's the easiest finger position",
          "It anchors the ear to the tonic so every other note is heard relative to home",
          "It's required by music notation rules",
          "It produces the loudest sound on the instrument",
        ],
        correctIndex: 1,
        explanation: "Tonic-anchored practice trains the ear to hear scale-degree relationships, not just memorize finger patterns.",
      },
      {
        id: "q_alternation",
        prompt: "Why drill alternating right-hand picks (or pluck fingers) from day one?",
        options: [
          "To play louder",
          "To build a habit; single-finger picking caps your speed permanently",
          "Because the strings demand it",
          "It looks more impressive",
        ],
        correctIndex: 1,
        explanation: "Alternation is a motor skill. Lock it in early — retraining single-finger habits later is brutal.",
      },
    ],
    two_note: [
      {
        id: "q_interval_thinking",
        prompt: "Practicing root-fifth (or root-third) two-note shapes teaches you to think in…",
        options: [
          "Single notes",
          "Intervals",
          "Chord names",
          "Rhythm only",
        ],
        correctIndex: 1,
        explanation: "Interval-aware practice = instant transposition. You stop thinking 'where is C' and start hearing 'fifth above'.",
      },
    ],
    tempo: [
      {
        id: "q_metronome_drift",
        prompt: "If you play 32 bars of quarter notes against a click and consistently land 30ms early, you're…",
        options: ["Dragging", "Rushing", "In the pocket", "Off-key"],
        correctIndex: 1,
        explanation: "Rushing = ahead of the click. Most beginners rush; deliberately leaning slightly *behind* often lands you on time.",
      },
    ],
    first_piece: [
      {
        id: "q_walking_bass",
        prompt: "In a 12-bar blues bass line, the last beat of each bar should…",
        options: [
          "Be the same note as beat 1",
          "Lead chromatically/diatonically toward the next chord's root",
          "Be silent",
          "Be the highest note in the bar",
        ],
        correctIndex: 1,
        explanation: "Walking = anticipating the next chord. Beat 4 telegraphs the change — that's the 'walk'.",
      },
    ],
    first_song: [
      {
        id: "q_song_memorization",
        prompt: "When learning your first song by memory, the most reliable approach is…",
        options: [
          "Memorize each note individually",
          "Memorize the *shape* of each phrase as a hand pattern, not 8 isolated notes",
          "Read it from the page every time",
          "Speed through it 20 times",
        ],
        correctIndex: 1,
        explanation: "Hand muscle memory grabs *shapes* (3-5 notes) much faster than individual pitches.",
      },
    ],
    dynamics: [
      {
        id: "q_dynamics_exposure",
        prompt: "Why does a melody played at *constant* mf feel boring even with correct notes?",
        options: [
          "Mf is too quiet",
          "Without dynamic shape, the listener can't tell what's important — every note feels equal",
          "Strings only sound good at f",
          "It violates music theory",
        ],
        correctIndex: 1,
        explanation: "Dynamics are how you tell the listener which notes matter. Equal volume = equal importance = no story.",
      },
    ],
    articulation: [
      {
        id: "q_legato_vs_staccato",
        prompt: "What's the practical difference between legato and staccato?",
        options: [
          "Volume only",
          "Pitch only",
          "How long each note rings + the gap (or lack of gap) between notes",
          "Tempo only",
        ],
        correctIndex: 2,
        explanation: "Articulation = note duration + gap. Legato connects, staccato detaches — same notes, different mood.",
      },
    ],
    standard_cert: [
      {
        id: "q_cert_focus",
        prompt: "For a Standard cert recording, the highest-leverage focus is usually…",
        options: [
          "Maximum tempo",
          "Pitch + tempo stability — exposed errors hurt more than missed flourishes",
          "Adding ornaments",
          "Playing as long as possible",
        ],
        correctIndex: 1,
        explanation: "Cert grading rewards reliability. A clean simple take outscores a messy ambitious one every time.",
      },
    ],
    scale_two: [
      {
        id: "q_second_scale",
        prompt: "Learning a second scale (e.g. G major after C major) primarily teaches you to…",
        options: [
          "Play faster",
          "Transpose patterns — recognize the same relative shape in a new key",
          "Read music",
          "Tune your instrument",
        ],
        correctIndex: 1,
        explanation: "Scale 2 is when scales stop being 'memorized notes' and start being 'transposable shapes'.",
      },
    ],
    ornament: [
      {
        id: "q_ornament_purpose",
        prompt: "Ornaments (hammer-ons, slides, vibrato) work best when…",
        options: [
          "Applied to every note",
          "Used sparingly on phrase peaks where they emphasize meaning",
          "Replaced by louder dynamics",
          "Only used in fast tempos",
        ],
        correctIndex: 1,
        explanation: "Ornaments are highlights. Used everywhere = noise. Used at the peak of a phrase = expression.",
      },
    ],
    rep_1: [
      {
        id: "q_rep_method",
        prompt: "When learning a 24-bar intermediate piece, the most efficient practice path is…",
        options: [
          "Play it through 50 times at full tempo",
          "Slow practice on the hardest 4 bars, then connect to neighbors, then full piece",
          "Memorize the lyrics first",
          "Skip the difficult sections",
        ],
        correctIndex: 1,
        explanation: "Spot practice on the hard bars beats blanket repetition. Speed comes after accuracy.",
      },
    ],
    practice_rout: [
      {
        id: "q_routine_priority",
        prompt: "A 15-minute daily practice block beats a 2-hour weekly session because…",
        options: [
          "You get bored faster in long sessions",
          "Daily repetition reinforces motor memory; one long burst leaves your hands cold for 6 days",
          "It's easier to schedule",
          "There's no real difference",
        ],
        correctIndex: 1,
        explanation: "Motor learning compounds with daily repetition. A 6-day gap reverts ~30% of the previous gain.",
      },
    ],
  },
  fallback: [
    {
      id: "q_objective_check",
      prompt: "What's the *primary* skill this lesson is training?",
      options: [
        "Memorizing names",
        "Building reliable physical execution under tempo + tonal constraints",
        "Pure music theory",
        "Reading sheet music",
      ],
      correctIndex: 1,
      explanation: "Every L2-L4 lesson is fundamentally about building reliable physical execution. Theory + reading come later.",
    },
  ],
};

// ── Indian classical (bansuri / harmonium / mridangam / veena) ──────
const INDIAN_QB: FamilyBank = {
  byKey: {
    scale: [
      {
        id: "q_sargam",
        prompt: "Why do Indian classical students sing 'Sa Re Ga Ma Pa' aloud while playing?",
        options: [
          "Tradition only",
          "Sargam vocalization trains pitch internalization — the ear locks the ladder before the fingers do",
          "It's required for grades",
          "It's a warm-up",
        ],
        correctIndex: 1,
        explanation: "Vocal sargam is *the* foundational ear-training. Hand precision follows ear precision, not the other way around.",
      },
    ],
    two_note: [
      {
        id: "q_meend",
        prompt: "A meend (slide) on melodic Indian instruments differs from a Western 'slide' because…",
        options: [
          "It's faster",
          "It's a continuous, breath-paced *journey* between pitches, not a quick bend toward a target",
          "It uses different fingers",
          "It can only go up",
        ],
        correctIndex: 1,
        explanation: "Meend is the journey, not the destination. The continuous pitch motion *is* the musical content.",
      },
    ],
    tempo: [
      {
        id: "q_sam",
        prompt: "Sam (or beat 1) in a Hindustani / Carnatic taal cycle is the moment when…",
        options: [
          "The slowest note is played",
          "The cycle resolves; it's where every phrase aims to land",
          "The vocalist enters",
          "Dynamics peak",
        ],
        correctIndex: 1,
        explanation: "Sam = home. Phrases launch from sam, build, and *return* to sam. Missing sam = misalignment.",
      },
    ],
    first_piece: [
      {
        id: "q_bandish_feel",
        prompt: "Why is playing the bandish *clean* before adding ornaments important?",
        options: [
          "Ornaments are too hard",
          "The melody is the structural skeleton — ornaments serve the melody, not the other way around",
          "The teacher won't let you",
          "Ornaments add no musical value",
        ],
        correctIndex: 1,
        explanation: "Clean bandish first establishes the structural arc. Ornaments amplify what's already meaningful.",
      },
    ],
    first_song: [
      {
        id: "q_bhajan_intent",
        prompt: "A bhajan or kriti is fundamentally a…",
        options: [
          "Technical exercise",
          "Devotional / emotional vehicle — feel + intent come before virtuosity",
          "Speed challenge",
          "Music theory test",
        ],
        correctIndex: 1,
        explanation: "Bhajans/kritis are devotional. Play them with intent; mechanical rendition misses the point.",
      },
    ],
    dynamics: [
      {
        id: "q_breath_dynamics",
        prompt: "On a melodic Indian instrument, dynamics primarily come from…",
        options: [
          "Pressing keys harder",
          "Breath / bow / pluck force + pitch-stable embouchure or finger control",
          "Volume knob",
          "Number of notes per second",
        ],
        correctIndex: 1,
        explanation: "Dynamics are physical. The challenge is varying force *without* altering pitch — breath/bow/pluck control is everything.",
      },
    ],
    articulation: [
      {
        id: "q_gamak",
        prompt: "Gamak in Indian classical is best described as…",
        options: [
          "A slide between notes",
          "A rapid pitch oscillation that gives a single note 'weight' or expressive emphasis",
          "A dynamic accent",
          "A type of scale",
        ],
        correctIndex: 1,
        explanation: "Gamak = oscillation within a single note. Different from meend (slide between notes).",
      },
    ],
    standard_cert: [
      {
        id: "q_cert_authenticity",
        prompt: "For a 2-minute Indian classical cert, judges typically prioritize…",
        options: [
          "Speed",
          "Authenticity of idiom (gamak presence, sam alignment, raga adherence)",
          "Volume",
          "Length over 2 minutes",
        ],
        correctIndex: 1,
        explanation: "Idiomatic authenticity > technical pyrotechnics. A clean Yaman with proper gamakas beats a fast scale run.",
      },
    ],
    scale_two: [
      {
        id: "q_second_raga",
        prompt: "Adding a second raga to your repertoire teaches you that ragas differ in…",
        options: [
          "Notes only",
          "Mood + scale + characteristic phrases (pakad) + appropriate time of day",
          "Tempo only",
          "Volume only",
        ],
        correctIndex: 1,
        explanation: "A raga is more than a scale — it's notes + mood + pakad + time/season. Each is its own world.",
      },
    ],
    ornament: [
      {
        id: "q_kan",
        prompt: "Kan (grace note) on bansuri or harmonium is most effective when…",
        options: [
          "Applied before every note",
          "Placed sparingly before phrase peaks or sam arrivals to add 'breath' before emphasis",
          "Held for a full beat",
          "Ignored entirely",
        ],
        correctIndex: 1,
        explanation: "Kan is a shadow before a target. Sparse placement at peaks = maximum emphasis.",
      },
    ],
    rep_1: [
      {
        id: "q_indian_rep",
        prompt: "When learning an intermediate raga piece, the practice rotation should be…",
        options: [
          "Speed first, accuracy later",
          "Accuracy → tempo → ornament → expression (in order)",
          "Memorize lyrics only",
          "Skip difficult sections",
        ],
        correctIndex: 1,
        explanation: "Accuracy underpins tempo, tempo underpins ornament, ornament underpins expression. Stack in order.",
      },
    ],
    practice_rout: [
      {
        id: "q_riyaz_drone",
        prompt: "Why does a Hindustani riyaz session always start with Sa-Pa drone or sustained Sa?",
        options: [
          "Tradition only",
          "It tunes the ear, settles the breath, and creates the psychological 'enter mode' state",
          "It warms the instrument",
          "It's required by law",
        ],
        correctIndex: 1,
        explanation: "The drone is meditative + functional — without it, you start cold and your pitch drifts.",
      },
    ],
  },
  fallback: [
    {
      id: "q_objective_check",
      prompt: "What's the lesson primarily training?",
      options: [
        "Pure technique without context",
        "An idiomatically-correct skill grounded in raga / taal / breath / hand control",
        "Music theory abstraction",
        "Speed",
      ],
      correctIndex: 1,
      explanation: "Indian classical lessons train idiomatically-correct skill — context (raga + taal + breath) is inseparable from technique.",
    },
  ],
};

// ── Bowed + reed (cello / saxophone / trumpet / clarinet) ───────────
const BOWED_REED_QB: FamilyBank = {
  byKey: {
    scale: [
      {
        id: "q_long_tone_purpose",
        prompt: "Long tones build…",
        options: [
          "Speed",
          "Embouchure stability + breath control + pitch stability all at once",
          "Music theory knowledge",
          "Reading skill",
        ],
        correctIndex: 1,
        explanation: "Long tones are the bowed/reed family's most efficient single drill — every fundamental in one exercise.",
      },
    ],
    two_note: [
      {
        id: "q_breath_or_bow_consistency",
        prompt: "When transitioning between two notes on a wind/string instrument, the embouchure or bow position should…",
        options: [
          "Change radically per note",
          "Stay constant — the fingers (or valves) handle pitch change",
          "Loosen completely",
          "Be irrelevant",
        ],
        correctIndex: 1,
        explanation: "Embouchure/bow lock = consistent tone. Wandering embouchure = unpredictable tone shifts.",
      },
    ],
    tempo: [
      {
        id: "q_tonguing_articulation",
        prompt: "Tonguing on wind instruments produces note attacks by…",
        options: [
          "Striking a key",
          "Briefly stopping airflow with the tongue at note start",
          "Bowing harder",
          "Vibrato",
        ],
        correctIndex: 1,
        explanation: "Tongue = articulation control on wind. Light touch, not heavy thump.",
      },
    ],
    first_piece: [
      {
        id: "q_simple_first",
        prompt: "Why are 'Mary Had a Little Lamb' / 'Twinkle' / 'Saints' standard first pieces?",
        options: [
          "Famous composers wrote them",
          "Limited range + simple rhythm let you focus on tone production, not finger acrobatics",
          "Required by law",
          "They sound impressive",
        ],
        correctIndex: 1,
        explanation: "Constrained range = mental bandwidth available for tone, dynamics, articulation. Simple ≠ trivial.",
      },
    ],
    first_song: [
      {
        id: "q_genre_articulation",
        prompt: "Jazz vs classical articulation differs primarily in…",
        options: [
          "Pitch",
          "Tongue intensity + swing feel + ornament selection",
          "Volume",
          "Sheet music notation",
        ],
        correctIndex: 1,
        explanation: "Genre = articulation choice. Same notes, different feel; jazz tongue is softer + swung.",
      },
    ],
    dynamics: [
      {
        id: "q_bow_pressure_speed",
        prompt: "On cello, dynamics come from a *coupled* relationship between…",
        options: [
          "Bow pressure alone",
          "Bow pressure + bow speed (both scale together for clean tone change)",
          "Hand position",
          "Tuning peg adjustment",
        ],
        correctIndex: 1,
        explanation: "Pressure alone = scratchy. Speed alone = thin. Both must scale together for clean dynamic range.",
      },
    ],
    articulation: [
      {
        id: "q_legato_chamber",
        prompt: "In a chamber-music context, legato is used most often for…",
        options: [
          "Drum-like rhythms",
          "Lyrical, singing passages",
          "Loud climaxes",
          "Tuning",
        ],
        correctIndex: 1,
        explanation: "Legato = singing. Lyrical chamber passages live in legato; staccato = rhythmic emphasis.",
      },
    ],
    standard_cert: [
      {
        id: "q_cert_warmup",
        prompt: "Before recording a cert performance on a wind/bowed instrument, you should…",
        options: [
          "Skip warmup to save energy",
          "Warm up 10+ minutes (long tones + scales + one piece pass) to stabilize embouchure / bow / pitch",
          "Eat a heavy meal",
          "Tighten the strings/reed maximally",
        ],
        correctIndex: 1,
        explanation: "Cold embouchure / cold bow = unreliable tone. Warmup is non-negotiable for cert quality.",
      },
    ],
    scale_two: [
      {
        id: "q_shifting",
        prompt: "On cello, a 2-octave scale forces you to encounter…",
        options: [
          "Faster fingering",
          "Position shifts (sliding the whole hand along the fingerboard)",
          "Different bowing",
          "A new instrument",
        ],
        correctIndex: 1,
        explanation: "2-octave scales = position shifts. Silent shifts (no zhzhzh artifact) is the L4 skill.",
      },
    ],
    ornament: [
      {
        id: "q_vibrato_speed",
        prompt: "A slow, controlled vibrato is preferable to a fast frantic one because…",
        options: [
          "Slow is easier",
          "Slow vibrato sounds professional + lush; fast nervous vibrato sounds anxious",
          "Vibrato is bad",
          "Tempo demands it",
        ],
        correctIndex: 1,
        explanation: "Vibrato speed reflects emotional state. Master slow first; speed comes naturally with months of practice.",
      },
    ],
    rep_1: [
      {
        id: "q_bach_feel",
        prompt: "Bach's Cello Suite Prelude rewards…",
        options: [
          "Heavy vibrato on every note",
          "Clarity, evenness, baroque-style restraint (vibrato sparingly used)",
          "Maximum tempo",
          "Improvisation",
        ],
        correctIndex: 1,
        explanation: "Baroque ≠ Romantic. Bach style is clean + restrained. Vibrato on every note = wrong style.",
      },
    ],
    practice_rout: [
      {
        id: "q_long_tones_always",
        prompt: "In a wind/bowed instrument practice block, long tones should…",
        options: [
          "Be skipped if you're short on time",
          "Open every session — non-negotiable for embouchure/bow stability",
          "Only be done weekly",
          "Replace all other exercises",
        ],
        correctIndex: 1,
        explanation: "Long tones are the wind/bow family's pre-flight check. Skipping = compounding bad habits all session.",
      },
    ],
  },
  fallback: [
    {
      id: "q_tone_first",
      prompt: "Across the bowed/reed family, what's the *first* skill to lock in?",
      options: [
        "Speed",
        "Tone production — clean, consistent sound on a single note",
        "Reading sheet music",
        "Memorizing pieces",
      ],
      correctIndex: 1,
      explanation: "Tone is the foundation. Speed/range/repertoire all collapse without tone.",
    },
  ],
};

// ── Keyboard / electronic (accordion / synth / dj_controller) ────────
const KEYBOARD_ELECTRONIC_QB: FamilyBank = {
  byKey: {
    scale: [
      {
        id: "q_synth_patch",
        prompt: "On a synthesizer, the same notes sound completely different because…",
        options: [
          "The notes are wrong",
          "Patch (preset) choice changes timbre, envelope, and effect — sound design is half the instrument",
          "Tuning differs",
          "It depends on the BPM",
        ],
        correctIndex: 1,
        explanation: "Synth is a sound-design instrument. Patch choice affects 80% of the result.",
      },
    ],
    two_note: [
      {
        id: "q_filter",
        prompt: "On a synth, filter cutoff sweeps create musical movement by…",
        options: [
          "Changing pitch",
          "Removing high frequencies (closing) or restoring them (opening) — like a controlled timbre wave",
          "Changing rhythm",
          "Adjusting volume",
        ],
        correctIndex: 1,
        explanation: "Filter sweep = timbral motion. Foundational technique in dub, techno, house, synth-pop.",
      },
    ],
    tempo: [
      {
        id: "q_arp",
        prompt: "An arpeggiator on a synth or DJ controller…",
        options: [
          "Plays a chord all at once",
          "Sequences notes from a held chord into a rhythmic pattern locked to BPM",
          "Adjusts pitch",
          "Adds reverb",
        ],
        correctIndex: 1,
        explanation: "Arpeggiator = automated note sequencing. Free your hands for chord changes + sound design.",
      },
    ],
    first_piece: [
      {
        id: "q_iconic_riffs",
        prompt: "Why play iconic synth riffs (Axel F, Sandstorm) early?",
        options: [
          "They're harder than originals",
          "They teach genre-correct phrasing + sound design alongside the notes",
          "They're free",
          "Required by law",
        ],
        correctIndex: 1,
        explanation: "Iconic riffs come with built-in phrasing + patch expectations. Studying them = learning genre fluency.",
      },
    ],
    first_song: [
      {
        id: "q_polka_energy",
        prompt: "On accordion, polka feel requires…",
        options: [
          "Slow tempo",
          "Lively energy + steady oom-pah + relaxed body posture (tense = stiff sound)",
          "Heavy bellows pressure throughout",
          "Solo right hand only",
        ],
        correctIndex: 1,
        explanation: "Polka = energetic + relaxed. Tension produces a stiff, mechanical sound; loose body = right feel.",
      },
    ],
    dynamics: [
      {
        id: "q_velocity",
        prompt: "On a velocity-sensitive synth, harder key presses typically affect…",
        options: [
          "Pitch only",
          "Volume + filter cutoff + envelope attack (multiple parameters at once)",
          "Tuning",
          "Nothing",
        ],
        correctIndex: 1,
        explanation: "Velocity is a multi-dimensional control. Synth's expressive range comes from this coupling.",
      },
    ],
    articulation: [
      {
        id: "q_adsr",
        prompt: "ADSR (Attack, Decay, Sustain, Release) defines…",
        options: [
          "The pitch of a note",
          "How a note's volume (or filter) evolves over time after key press + release",
          "The chord progression",
          "BPM",
        ],
        correctIndex: 1,
        explanation: "ADSR = envelope shape. Pluck = short A. Pad = long A. Stab = short A + short R. Foundational.",
      },
    ],
    standard_cert: [
      {
        id: "q_dj_set_arc",
        prompt: "A 10-minute DJ set's energy should…",
        options: [
          "Stay flat",
          "Build to a peak around 60-70% of the set, then resolve",
          "Peak immediately",
          "Drop randomly",
        ],
        correctIndex: 1,
        explanation: "Classical dramatic arc — build, peak, resolve. Peak too early = anti-climactic finish.",
      },
    ],
    scale_two: [
      {
        id: "q_modes",
        prompt: "Modes (Dorian, Phrygian, Mixolydian) differ from major/minor in…",
        options: [
          "Number of notes",
          "Which scale degrees are altered, which produces a unique mood per mode",
          "Tempo",
          "Volume",
        ],
        correctIndex: 1,
        explanation: "Modes = same notes, different tonic — each mode emphasizes a unique 'mood' through scale-degree alterations.",
      },
    ],
    ornament: [
      {
        id: "q_lfo",
        prompt: "An LFO routed to filter cutoff at 4Hz with sine shape produces…",
        options: [
          "A pitch slide",
          "A wobble bass effect — the filter opens and closes rhythmically without your hand on the knob",
          "A volume change only",
          "A delay effect",
        ],
        correctIndex: 1,
        explanation: "LFO = automated parameter motion. Wobble bass is the canonical filter-LFO use case.",
      },
    ],
    rep_1: [
      {
        id: "q_synthwave",
        prompt: "Synthwave's signature sound comes from…",
        options: [
          "Heavy distortion only",
          "Bright analog leads + heavy reverb + 1/8 delays + slight LFO movement on filter",
          "Acoustic guitar",
          "No sound design",
        ],
        correctIndex: 1,
        explanation: "Synthwave is a *sound-design recipe*. Match the recipe; deviate at your peril.",
      },
    ],
    practice_rout: [
      {
        id: "q_dj_recording",
        prompt: "DJ practice without recording is…",
        options: [
          "Fine — performance is what matters",
          "Half-practice — you can't hear phasing, drift, or transition smoothness in real-time",
          "Better than recording",
          "Required to skip recording",
        ],
        correctIndex: 1,
        explanation: "DJ self-critique demands recordings. In-the-moment hearing misses the issues every time.",
      },
    ],
  },
  fallback: [
    {
      id: "q_sound_design",
      prompt: "Across keyboard / electronic instruments, what's a key skill beyond playing notes?",
      options: [
        "Reading sheet music",
        "Sound design / patch selection / signal flow understanding",
        "Tuning by ear",
        "Memorizing scales",
      ],
      correctIndex: 1,
      explanation: "Keyboard/electronic = sound + performance. Patch + filter + LFO knowledge is half the craft.",
    },
  ],
};

const FAMILY_FOR: Record<string, FamilyBank> = {
  bass: FRETTED_QB, ukulele: FRETTED_QB, mandolin: FRETTED_QB,
  bansuri: INDIAN_QB, harmonium: INDIAN_QB, mridangam: INDIAN_QB, veena: INDIAN_QB,
  cello: BOWED_REED_QB, saxophone: BOWED_REED_QB, trumpet: BOWED_REED_QB, clarinet: BOWED_REED_QB,
  accordion: KEYBOARD_ELECTRONIC_QB, synth: KEYBOARD_ELECTRONIC_QB, dj_controller: KEYBOARD_ELECTRONIC_QB,
};

/** L2-L4 lesson keys we author quizzes for. */
const L2_L4_KEYS = [
  "scale", "two_note", "tempo", "first_piece",                    // L2
  "first_song", "dynamics", "articulation", "standard_cert",      // L3
  "scale_two", "ornament", "rep_1", "practice_rout",              // L4
];

const L2_L4_NUM_FOR_KEY: Record<string, string> = {
  scale: "01", two_note: "02", tempo: "03", first_piece: "04",
  first_song: "01", dynamics: "02", articulation: "03", standard_cert: "04",
  scale_two: "01", ornament: "02", rep_1: "03", practice_rout: "04",
};

const L2_L4_LEVEL_FOR_KEY: Record<string, 2 | 3 | 4> = {
  scale: 2, two_note: 2, tempo: 2, first_piece: 2,
  first_song: 3, dynamics: 3, articulation: 3, standard_cert: 3,
  scale_two: 4, ornament: 4, rep_1: 4, practice_rout: 4,
};

/**
 * Build mastery quizzes for every L2-L4 hand-authored expansion lesson.
 * Each quiz has 3 questions: 2 from the family bank by key + 1 fallback
 * question shared across all lessons in the family.
 *
 * Returned record can be merged into EXAMS in examCatalog.ts via:
 *   Object.assign(EXAMS, buildExpansionQuizzes());
 */
export function buildExpansionQuizzes(): Record<string, Exam> {
  const exams: Record<string, Exam> = {};
  for (const instrumentId of Object.keys(FAMILY_FOR)) {
    const bank = FAMILY_FOR[instrumentId];
    for (const key of L2_L4_KEYS) {
      const lvl = L2_L4_LEVEL_FOR_KEY[key];
      const num = L2_L4_NUM_FOR_KEY[key];
      const lessonId = `${instrumentId}_l${lvl}_${num}_${key}`;
      const quizId = `${lessonId}_mastery`;

      const keyQuestions = bank.byKey[key] ?? [];
      const fallbackQuestions = bank.fallback;

      // 3 questions: prefer 2 from the key bank + 1 fallback, but fall
      // back gracefully if the key bank has fewer entries.
      const picked: ExamQuestion[] = [];
      for (const q of keyQuestions.slice(0, 2)) {
        picked.push({ id: q.id, type: "mcq", prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation });
      }
      for (const q of fallbackQuestions.slice(0, Math.max(1, 3 - picked.length))) {
        picked.push({ id: q.id, type: "mcq", prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation });
      }

      // Pad with one extra fallback if we still have <3 questions.
      while (picked.length < 3 && fallbackQuestions.length > 0) {
        const f = fallbackQuestions[picked.length % fallbackQuestions.length];
        picked.push({
          id: `${f.id}_extra_${picked.length}`,
          type: "mcq",
          prompt: f.prompt,
          options: f.options,
          correctIndex: f.correctIndex,
          explanation: f.explanation,
        });
      }

      exams[quizId] = {
        id: quizId,
        scope: "lesson",
        instrumentId,
        lessonId,
        title: `Mastery quiz · ${instrumentId} L${lvl} ${key.replace(/_/g, " ")}`,
        passThreshold: 0.67,
        questions: picked,
      };
    }
  }
  return exams;
}
