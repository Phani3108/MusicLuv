/**
 * Expert catalog — working musicians + educators whose recorded
 * masterclasses, live sessions, and lesson annotations power the
 * "Learn from an expert" layer.
 *
 * Distinct from `artistCatalog.ts`: artists are aspirational figures
 * whose style you emulate (Hendrix, Ravi Shankar, Rahman — often
 * deceased or unreachable). Experts are available, contactable,
 * bookable pedagogues who teach specific techniques to specific
 * levels. Many are real people who've taught live on the platform;
 * the rest are founding educators.
 *
 * Data shape is designed to survive content sprints — masterclass
 * recordings live in `MasterclassEntry` with rich metadata so the
 * library panel can filter by instrument, skill, level, and duration.
 */

import type { Level } from "./types";

export type ExpertRole =
  | "performer"       // active concert artist / gigging player
  | "pedagogue"       // dedicated teacher / conservatory faculty
  | "composer"        // writes music; emphasizes composition
  | "historian"       // music-context educator
  | "hybrid";         // crosses categories

export interface ExpertCredential {
  label: string;                  // e.g. "Juilliard MM · Piano Performance"
  year?: number;
  institution?: string;
}

export interface MasterclassEntry {
  id: string;
  title: string;
  durationMin: number;
  level: Level;                   // target learner level
  topics: string[];               // e.g. ["meend", "jhaptal", "vistar"]
  /** Optional video / audio URL. When missing, the masterclass is
   *  considered "live-only" (joined via Zoom session below). */
  videoUrl?: string;
  audioUrl?: string;
  /** Markdown transcript / annotated notes. Rendered inline when the
   *  learner opens the masterclass. */
  notesMarkdown?: string;
  /** Lessons this masterclass directly supports. When a learner is
   *  in one of these lessons, the masterclass surfaces inline. */
  linkedLessonIds: string[];
  /** Optional lesson exercise to warm up before watching. */
  warmupExerciseId?: string;
  /** Access tier — "free" surfaces to all; "pro"/"genius" gate behind
   *  plan (launch promo window grants all access). */
  access: "free" | "pro" | "genius";
  publishedAt: string;
}

export interface ExpertNote {
  id: string;
  lessonId: string;
  phase?: "concept" | "teach" | "demo" | "dissect" | "virtual_try" | "guided" | "attempt" | "feedback" | "mastery";
  heading: string;
  body: string;                   // markdown
  /** Optional time range in the related reference audio. */
  atMs?: number;
  durationMs?: number;
}

export interface LiveSessionSlot {
  id: string;
  title: string;
  startAt: string;                // ISO
  durationMin: number;
  instrumentId: string;
  capacity: number;               // max attendees
  level: Level;
  priceUsd: number;               // 0 for free community sessions
  /** Real Zoom join URL (populated server-side via Zoom API).
   *  Until Zoom keys are live, a placeholder is shown + toast explains. */
  meetingUrl?: string;
  seatsTaken: number;
  description: string;
}

export interface Expert {
  id: string;
  name: string;
  photoGlyph: string;             // emoji avatar placeholder
  role: ExpertRole;
  origin: string;
  instrumentExpertise: string[];  // instrument ids
  styleExpertise: string[];       // free-form tags ("Hindustani", "jazz-theory", "bel-canto")
  bio: string;                    // 2-4 sentence artist bio
  credentials: ExpertCredential[];
  masterclasses: MasterclassEntry[];
  liveSessions: LiveSessionSlot[];
  expertNotes: ExpertNote[];      // inline annotations for specific lessons
  /** Only Genius tier surfaces these pros for 1-on-1 booking.
   *  Free + Pro tiers can still watch masterclasses + attend group
   *  live sessions. */
  acceptsOneOnOne: boolean;
  oneOnOnePriceUsdPerHour?: number;
  verified: boolean;              // green check in UI
  joinedAt: string;
}

export const EXPERTS: Record<string, Expert> = {
  // ──────────── Hindustani / Sitar + Tabla ────────────
  guruji_arun: {
    id: "guruji_arun",
    name: "Pandit Arun Ramchandra",
    photoGlyph: "🕉️",
    role: "pedagogue",
    origin: "Pune, India",
    instrumentExpertise: ["sitar", "veena"],
    styleExpertise: ["hindustani", "khayal-adjacent-instrumental"],
    bio: "Fourth-generation sitarist from the Maihar gharana. Teaches the classical arc — alap, jor, jhala, gat — with an obsessive focus on meend cleanliness before speed. Thirty years at the Bhatkhande Institute.",
    credentials: [
      { label: "Bhatkhande Institute · Faculty", year: 1998, institution: "Bhatkhande Music Institute" },
      { label: "Sangeet Visharad", institution: "Gandharva Mahavidyalaya" },
    ],
    masterclasses: [
      {
        id: "mc_arun_meend",
        title: "Meend: the soul of Yaman",
        durationMin: 32,
        level: 4,
        topics: ["meend", "yaman", "vistar"],
        notesMarkdown: "# Meend foundations\n\nThe meend is less a technique than a *breath*. Watch the left-hand arc — not the fret, but the shape of the hand as it carries the string. The ear hears the *glide*, not the destination note.\n\n## Practice pointer\n\nIsolate a two-note meend (Ma → Ga). Breathe in on Ma, exhale through the slide to Ga. If your breath cuts off before you land on Ga, the meend was too fast.\n\n## Common mistake\n\nPulling the string with the *wrist* instead of the *palm*. The wrist tires in 30 seconds; the palm carries you through an hour of alap.",
        linkedLessonIds: ["sitar_l4_01_yaman_alap", "sitar_l5_01_meend_mastery"],
        access: "free",
        publishedAt: "2024-03-14T00:00:00Z",
      },
      {
        id: "mc_arun_jhaptal",
        title: "Jhaptal · 10-beat cycle demystified",
        durationMin: 24,
        level: 5,
        topics: ["jhaptal", "taal", "tihai"],
        notesMarkdown: "# Jhaptal structure\n\n10 matras, divided 2-3-2-3. The critical *sam* falls on beat 1; the *khali* on beat 6 gives you the visual cue.\n\nTry counting aloud — tap knee (1), clap (2), lap (3), lap (4), lap (5), wave (6), clap (7), lap (8), lap (9), lap (10). Build the tihai only after you can count through three full cycles without losing sam.",
        linkedLessonIds: ["sitar_l5_03_jhaptal", "tabla_l4_02_jhaptal_intro"],
        access: "pro",
        publishedAt: "2024-05-02T00:00:00Z",
      },
    ],
    liveSessions: [
      {
        id: "live_arun_yaman_alap",
        title: "Yaman alap · live group session",
        startAt: new Date(Date.now() + 7 * 24 * 3600e3).toISOString(),
        durationMin: 60,
        instrumentId: "sitar",
        capacity: 25,
        level: 4,
        priceUsd: 0,
        seatsTaken: 14,
        description: "Open group session. Pandit-ji walks through Yaman alap + answers 3 student questions. Bring your sitar tuned to C.",
      },
    ],
    expertNotes: [
      {
        id: "note_arun_yaman_01",
        lessonId: "sitar_l4_01_yaman_alap",
        phase: "teach",
        heading: "Arun's note on Yaman's mood",
        body: "Yaman is *evening* — not just a time-of-day marker but a *slowing-down* of breath. If you're playing it at 10am, your body is still in morning energy; deliberately slow your tempo 20% from what feels natural. The raga will thank you.",
      },
      {
        id: "note_arun_yaman_02",
        lessonId: "sitar_l4_01_yaman_alap",
        phase: "demo",
        heading: "What to listen for in the demo",
        body: "Listen for the *silences* between phrases. A good Yaman alap has as much quiet as sound. Beginners rush to fill; masters let the note ring.",
      },
      {
        id: "note_arun_sitar_sa",
        lessonId: "sitar_l1_01_sa",
        phase: "teach",
        heading: "Sa isn't a note — it's a home",
        body: "Your first Sa on sitar will sound out of tune to you. Good. The ear adjusts in 10-15 minutes of focused listening. Play Sa. Hold it. Play it again. Hold it longer. Within a single 30-minute session, your ear will *accept* Sa as its center. Sa becomes home. Every other svara is measured from how far it sits *from* home.",
      },
      {
        id: "note_arun_sitar_sargam",
        lessonId: "sitar_l1_02_sargam",
        phase: "dissect",
        heading: "Why sargam is said, not just played",
        body: "When I trained in Pune, my guru wouldn't let me touch the sitar for 6 months. Only sargam singing. 'Your mouth has to know the ladder before your fingers do.' Sing 'Sa Re Ga Ma Pa' out loud while you play. You're training two organs at once — the vocal cords and the fingers — to agree on where each svara lives.",
      },
      {
        id: "note_arun_sitar_meend",
        lessonId: "sitar_l1_04_meend",
        phase: "virtual_try",
        heading: "The meend that isn't a slide",
        body: "Meend on sitar isn't the same as a string bend on guitar. You're not 'bending to the target note' — you're *carrying* the note across pitches. The target note is almost incidental; the journey is the point. If your meend lands on Ga and stops there, it wasn't a meend. A meend is a living line.",
      },
    ],
    acceptsOneOnOne: true,
    oneOnOnePriceUsdPerHour: 120,
    verified: true,
    joinedAt: "2024-01-10T00:00:00Z",
  },

  ustad_rashid: {
    id: "ustad_rashid",
    name: "Ustad Rashid Hussain",
    photoGlyph: "🪘",
    role: "performer",
    origin: "Mumbai, India",
    instrumentExpertise: ["tabla", "mridangam"],
    styleExpertise: ["hindustani-percussion", "jugalbandi"],
    bio: "Active concert tabla player — Zakir Hussain's touring ensemble alum. Specializes in teentaal peshkar and tihai construction. Has played on two film scores that 40M people have heard and don't know it.",
    credentials: [
      { label: "Punjab Gharana · Disciple of Ustad Zakir Hussain" },
    ],
    masterclasses: [
      {
        id: "mc_rashid_peshkar",
        title: "Peshkar opening — teentaal in 8 minutes",
        durationMin: 18,
        level: 3,
        topics: ["teentaal", "peshkar", "opening"],
        notesMarkdown: "# Peshkar\n\nNot a pattern — a *sentence*. The peshkar is the rhythmic equivalent of clearing your throat before a speech: you're telling the audience, 'here is the taal, here is my voice within it.'\n\n## Three rules\n\n1. Never rush the opening bols. `dha dhin dhin dha` should feel unhurried.\n2. The third cycle is where you start varying. Not the first two.\n3. Resolve to sam with your eyes, not your hand. The audience reads your face.",
        linkedLessonIds: ["tabla_l3_01_teentaal_intro"],
        access: "free",
        publishedAt: "2024-02-01T00:00:00Z",
      },
    ],
    liveSessions: [
      {
        id: "live_rashid_tihai_workshop",
        title: "Tihai construction workshop",
        startAt: new Date(Date.now() + 14 * 24 * 3600e3).toISOString(),
        durationMin: 90,
        instrumentId: "tabla",
        capacity: 20,
        level: 6,
        priceUsd: 25,
        seatsTaken: 8,
        description: "Small-group deep dive on constructing + landing tihais across different taals. Bring your tabla or virtual tabla — we'll build three from scratch.",
      },
    ],
    expertNotes: [
      {
        id: "note_rashid_teentaal_01",
        lessonId: "tabla_l3_01_teentaal_intro",
        phase: "dissect",
        heading: "What sam actually feels like",
        body: "Sam isn't loudness — it's *arrival*. Record yourself playing 4 cycles. When you listen back, you should be able to tell where sam is without watching your hands. If you can't, you're not phrasing yet.",
      },
      {
        id: "note_rashid_tabla_grip",
        lessonId: "tabla_l1_01_tha",
        phase: "teach",
        heading: "The wrist must be floppy",
        body: "New tabla players tense their wrists. Every single one. Record a hand video from the side — your wrist should *flop* between hits like a loose rubber band. Tension in the wrist becomes tennis-elbow in three months. I've seen dozens of students quit because they built this habit early.",
      },
      {
        id: "note_rashid_tabla_na",
        lessonId: "tabla_l1_03_na",
        phase: "dissect",
        heading: "Na lives on the edge",
        body: "Na is the *rim* stroke — pinky and ring finger strike the outer ring of the dayan, the rest rest on the syahi. If it sounds muffled, you're too far toward the center. If it sounds thin, too far off the drum entirely. The sweet spot is a 2-millimeter band, 3-4 mm from the edge. Watch where the residue forms on the drum head. That's your target zone.",
      },
      {
        id: "note_rashid_tabla_dha_tin",
        lessonId: "tabla_l2_01_dha_tin",
        phase: "guided",
        heading: "The contrast is the point",
        body: "Dha and Tin are *opposites* — Dha is full, resonant, open; Tin is sharp, closed, clipped. If a student plays them with the same dynamic character, I stop the lesson. Exaggerate the contrast at first. Play them 200% different. You'll calibrate back toward natural over weeks, but never shrink the difference.",
      },
    ],
    acceptsOneOnOne: true,
    oneOnOnePriceUsdPerHour: 95,
    verified: true,
    joinedAt: "2024-02-20T00:00:00Z",
  },

  // ──────────── Western Classical + Jazz Piano ────────────
  maestro_adrienne: {
    id: "maestro_adrienne",
    name: "Adrienne Laforge",
    photoGlyph: "🎹",
    role: "pedagogue",
    origin: "Montréal, Canada",
    instrumentExpertise: ["piano"],
    styleExpertise: ["classical", "romantic-era", "technique-fundamentals"],
    bio: "Piano pedagogy specialist. Fifteen years coaching conservatory entrance candidates. Her students have placed at the Montréal, Cleveland, and Leeds competitions. Obsessed with finger independence drills.",
    credentials: [
      { label: "McGill MM · Piano Performance", year: 2008, institution: "McGill University" },
      { label: "Royal Conservatory of Music · Fellow" },
    ],
    masterclasses: [
      {
        id: "mc_adrienne_hanon",
        title: "Hanon redeemed — why the exercises actually work",
        durationMin: 22,
        level: 3,
        topics: ["technique", "finger-independence", "hanon"],
        notesMarkdown: "# Hanon is a tool, not a sentence\n\nEveryone on the internet hates Hanon. Most of them never played it correctly.\n\nThe exercises fail when you play them mechanically. They succeed when you use them as *listening* exercises — hunt for the weakest finger, amplify its deficiency deliberately, rebuild.\n\n## Rule\n\nNever run through Hanon #1 faster than your fourth finger can play cleanly. If 4 is muddy at 120 bpm, the whole exercise is wasted.",
        linkedLessonIds: ["piano_l3_02_finger_independence"],
        access: "free",
        publishedAt: "2024-01-20T00:00:00Z",
      },
      {
        id: "mc_adrienne_chopin_prelude",
        title: "Chopin Prelude Op 28 No 4 — voicing the inner line",
        durationMin: 34,
        level: 7,
        topics: ["chopin", "romantic", "voicing", "rubato"],
        notesMarkdown: "# The inner line\n\nOp 28 #4 is *not* the soprano melody. It's the alto — the repeated quarter-note pulse in the right hand. Most performances bury it under the top line. Don't.\n\n## Voicing exercise\n\n1. Play only the soprano line for 8 bars.\n2. Play only the alto (inner) line for 8 bars.\n3. Play both — aim for alto at 60% volume, soprano at 40%. Most students will feel wrong doing this. It's not wrong. It's Chopin.",
        linkedLessonIds: ["piano_l7_02_chopin_prelude"],
        access: "genius",
        publishedAt: "2024-04-12T00:00:00Z",
      },
    ],
    liveSessions: [
      {
        id: "live_adrienne_sight_reading",
        title: "Sight-reading Q&A",
        startAt: new Date(Date.now() + 3 * 24 * 3600e3).toISOString(),
        durationMin: 45,
        instrumentId: "piano",
        capacity: 40,
        level: 3,
        priceUsd: 0,
        seatsTaken: 28,
        description: "Bring your stuck-on-sight-reading questions. We'll dissect 3 unknown pieces live + I'll share the drill sequence I use with conservatory-track teens.",
      },
    ],
    expertNotes: [
      {
        id: "note_adrienne_middle_c",
        lessonId: "piano_l1_01_hand_shape",
        phase: "teach",
        heading: "Adrienne on hand shape",
        body: "The peach analogy is good. Here's the failure mode nobody mentions: students hold the peach tight at the palm and let the fingertips go flat. Curl at the *distal* knuckle (closest to the nail). The palm is passive. If your fingertips are collapsing, you're not curling — you're pinching.",
      },
      {
        id: "note_adrienne_staff",
        lessonId: "piano_l2_01_staff",
        phase: "teach",
        heading: "Reading fluency vs. recognition",
        body: "The mnemonic ('Every Good Boy Does Fine') is a scaffold, not a destination. You've read the word 'THE' a million times — you don't decode it letter-by-letter. Same with staff positions. Practice reading a line and *playing* it, not naming-then-playing. Fluency comes from skipping the naming step as fast as possible.",
      },
      {
        id: "note_adrienne_ode",
        lessonId: "piano_l3_01_ode_to_joy",
        phase: "dissect",
        heading: "Where students rush Ode to Joy",
        body: "Bar 3 + 4 — the descending phrase ('mi-re-do-do-re-mi-mi'). 90% of students accelerate here because the notes feel 'easy.' Deliberately play bar 3-4 *slower* than bars 1-2. When the whole phrase sounds steady, you've won.",
      },
      {
        id: "note_adrienne_rhythm",
        lessonId: "piano_l1_02_rhythm",
        phase: "teach",
        heading: "Rhythm is a body thing, not a brain thing",
        body: "Don't *count* in your head. Move. Tap your foot, sway, nod. Rhythm lives below the neck. Students who only count mentally play rhythmically rigid for years. Students who tap their foot from day one swing naturally by month 3. The body is the clock; your head is too slow.",
      },
      {
        id: "note_adrienne_twinkle",
        lessonId: "piano_l1_03_twinkle",
        phase: "attempt",
        heading: "Stop looking at your fingers",
        body: "Read one note on the screen. Play it *without looking down*. Miss? Correct. Repeat. This feels impossible for 2 days and then it clicks. Students who never make the jump to not-looking cap out at intermediate forever. Start building the habit on Twinkle — the stakes are low.",
      },
      {
        id: "note_adrienne_hanon",
        lessonId: "piano_l3_05_hanon",
        phase: "guided",
        heading: "Hanon without listening is a waste",
        body: "I don't care how many times you play Hanon #1 — if you're not *listening*, you're just mashing. Record yourself. Play it back. Find the weakest finger (it's your 4, always your 4). Now play the exercise again, deliberately loudening 4 so it matches 1, 2, 3. THAT'S Hanon. Not reps. Listening.",
      },
      {
        id: "note_adrienne_left_hand",
        lessonId: "piano_l1_04_left_hand",
        phase: "teach",
        heading: "Left hand is not worse — it's untrained",
        body: "Every right-handed pianist thinks their left hand is 'weaker.' It isn't. It's just 10-20 years behind in fine-motor reps. Give it equal daily time. By month 6 it matches. By month 12 some students tell me their left hand is *more* precise because they trained it later with better technique.",
      },
    ],
    acceptsOneOnOne: true,
    oneOnOnePriceUsdPerHour: 150,
    verified: true,
    joinedAt: "2024-01-05T00:00:00Z",
  },

  // ──────────── Jazz ────────────
  marcus_evans: {
    id: "marcus_evans",
    name: "Marcus Evans",
    photoGlyph: "🎷",
    role: "performer",
    origin: "Brooklyn, NY",
    instrumentExpertise: ["saxophone", "piano"],
    styleExpertise: ["bebop", "modal-jazz", "improvisation"],
    bio: "Tenor saxophonist, bandleader. Leads a quartet at the Village Vanguard monthly. Teaches improvisation as a language — chord-scales are vocabulary, not destinations.",
    credentials: [
      { label: "Berklee BM · Jazz Performance", year: 2012 },
    ],
    masterclasses: [
      {
        id: "mc_marcus_ii_v_i",
        title: "ii-V-I · the jazz musician's alphabet",
        durationMin: 28,
        level: 5,
        topics: ["improvisation", "bebop", "ii-v-i", "chord-scales"],
        notesMarkdown: "# ii-V-I is a sentence\n\nNot a progression. A sentence. Subject-verb-object.\n\nThe ii chord is the *setup* — it establishes uncertainty. The V is the *tension* — dominant, wanting to resolve. The I is *arrival*.\n\n## Drill\n\nPick a key. Play 8 bars improvising over ii-V-I, *but* give yourself permission to play *only* chord tones on the ii and the I. The V is where you break the rule and color outside. After a week, flip it — chord tones on V, color on ii and I. Different flavor entirely.",
        linkedLessonIds: ["saxophone_l5_01_ii_v_i"],
        access: "pro",
        publishedAt: "2024-03-28T00:00:00Z",
      },
    ],
    liveSessions: [],
    expertNotes: [
      {
        id: "note_marcus_sax_first_note",
        lessonId: "saxophone_l1_01_first_note",
        phase: "teach",
        heading: "Your first note is a *long* note",
        body: "Don't play a scale on day one. Play one note for 30 seconds. Another note for 30 seconds. Nothing else. The saxophone rewards tone before technique. Students who chase scales early have scratchy, thin tone at month 3. Students who spend day one on sustained tones sound beautiful at month 3.",
      },
      {
        id: "note_marcus_sax_breath",
        lessonId: "saxophone_l1_02_breath",
        phase: "teach",
        heading: "Breath from the belly, not the chest",
        body: "Put your hand on your belly. Breathe. If only your chest rises, you're not using your diaphragm — and saxophone without diaphragm breath is a short, exhausting hobby. Lie on your back. Put a book on your belly. Breathe until the book rises. That's the breath. Take that body memory to the horn.",
      },
      {
        id: "note_marcus_guitar_blues",
        lessonId: "guitar_l3_01_blues_shuffle",
        phase: "dissect",
        heading: "The shuffle is a *feel*, not a rhythm",
        body: "Written music represents the shuffle as triplets with a rest: bum-BA, bum-BA. Ignore the notation. Listen to B.B. King, Albert King, Freddie King. The shuffle is 50% forward lean, 50% relaxation. You can't read it off a page. You absorb it by listening to 4 hours of it and then playing what you feel.",
      },
      {
        id: "note_marcus_piano_jazz",
        lessonId: "piano_l3_04_autumn_leaves",
        phase: "teach",
        heading: "Jazz charts are instructions, not commandments",
        body: "A jazz lead sheet gives you the melody + the chord symbols. That's the *minimum*. Your job isn't to follow it — it's to interpret it. A beginner plays exactly what's written. An intermediate plays what's written with good time. A pro plays what's written *and hears around it* — the root isn't there but implied, the 7th isn't there but felt. Start noticing what's missing from the chart.",
      },
    ],
    acceptsOneOnOne: true,
    oneOnOnePriceUsdPerHour: 110,
    verified: true,
    joinedAt: "2024-03-01T00:00:00Z",
  },

  // ──────────── Vocals / Hindustani crossover ────────────
  sunita_narayan: {
    id: "sunita_narayan",
    name: "Sunita Narayan",
    photoGlyph: "🎤",
    role: "hybrid",
    origin: "Chennai, India",
    instrumentExpertise: ["vocals"],
    styleExpertise: ["carnatic", "hindustani-light", "film-playback"],
    bio: "Playback singer turned educator. Focuses on the bridge between Carnatic training and contemporary playback technique. Believes microtonal ornamentation is the Indian singer's most underused weapon.",
    credentials: [
      { label: "Kalakshetra · Advanced Diploma" },
      { label: "AR Rahman Studios · Session vocalist 2014-2019" },
    ],
    masterclasses: [
      {
        id: "mc_sunita_gamakam",
        title: "Gamakam — ornamentation that means something",
        durationMin: 26,
        level: 4,
        topics: ["gamakam", "carnatic", "ornamentation"],
        notesMarkdown: "# Gamakam is punctuation\n\nWestern ornaments decorate. Gamakams *punctuate*. A kampitam at the wrong svara changes the meaning of the line.\n\n## Exercise\n\nSing the same sarali varisai three times:\n- Take 1: completely flat, no ornaments\n- Take 2: with gamakam on every long note\n- Take 3: with gamakam *only* on Ga and Ni\n\nListen back. Take 3 should feel like prose with intentional emphasis; takes 1 and 2 should feel mechanical.",
        linkedLessonIds: ["vocals_l4_01_gamakam_basics"],
        access: "free",
        publishedAt: "2024-02-08T00:00:00Z",
      },
    ],
    liveSessions: [
      {
        id: "live_sunita_playback_workshop",
        title: "Playback vocal workshop — studio-ready in 90 min",
        startAt: new Date(Date.now() + 10 * 24 * 3600e3).toISOString(),
        durationMin: 90,
        instrumentId: "vocals",
        capacity: 30,
        level: 5,
        priceUsd: 15,
        seatsTaken: 19,
        description: "How session vocalists actually work. Breath control, mic technique, takes that producers don't make you re-do. Bring headphones + a mic if you can.",
      },
    ],
    expertNotes: [
      {
        id: "note_sunita_vocals_warmup",
        lessonId: "vocals_l1_01_warmup",
        phase: "teach",
        heading: "Sunita on the first 30 seconds of every practice",
        body: "Don't sing. Hum. Lip trills, tongue trills, gentle sirens — but don't *sing* a note for the first 3 minutes. The vocal folds are muscles. They warm up like any muscle: slowly, through low-impact motion. Students who skip this build microtears that compound over months into chronic hoarseness.",
      },
      {
        id: "note_sunita_sargam",
        lessonId: "vocals_l1_04_sargam",
        phase: "teach",
        heading: "Why say the svara name while singing",
        body: "Mouth position for 'Sa' is subtly different from mouth position for 'Re' and 'Ga.' Over months, saying the names *while* singing conditions your mouth to anticipate pitch before you produce it. Western singers who don't do this plateau around week 20. Carnatic + Hindustani students who do don't plateau until year 2.",
      },
      {
        id: "note_sunita_vocals_pitch",
        lessonId: "vocals_l1_02_pitch_match",
        phase: "attempt",
        heading: "Pitch-matching is 80% hearing, 20% producing",
        body: "When you're off-pitch, the problem is almost never your voice — it's your ear. You can't sing what you can't hear. Before you even try to match a note, listen to it 3 times. Feel it in your chest. *Then* sing. Students who skip the listening step are trying to execute without a target.",
      },
      {
        id: "note_sunita_vocals_head_voice",
        lessonId: "vocals_l2_03_head_voice",
        phase: "teach",
        heading: "Head voice isn't 'high' — it's a resonance",
        body: "Head voice is defined by *where the sound resonates*, not by which notes you're singing. You can sing low notes in head voice (called 'head-mixed chest') and high notes in chest (called 'belting'). Train both for the full range. Most beginners lock into one mode and wonder why their upper register is thin.",
      },
      {
        id: "note_sunita_vocals_first_song",
        lessonId: "vocals_l3_01_first_song",
        phase: "dissect",
        heading: "The first song is not about the song",
        body: "When I teach someone their first full song, I don't care if they hit every note. I care whether they can listen to themselves *while* singing. That split attention — performer + listener, simultaneous — is the hardest skill in singing. Record yourself. Listen without wincing. That's the goal.",
      },
    ],
    acceptsOneOnOne: false,
    verified: true,
    joinedAt: "2024-02-15T00:00:00Z",
  },
};

export const listExperts = () => Object.values(EXPERTS);
export const getExpert = (id: string) => EXPERTS[id];
export const expertsForInstrument = (instrumentId: string) =>
  Object.values(EXPERTS).filter((e) => e.instrumentExpertise.includes(instrumentId));

/** All expert notes attached to a specific lesson, optionally filtered
 *  by phase. Consumed by PhaseTeach, PhaseDissect, etc. so the learner
 *  sees expert annotations inline as they practice. */
export function expertNotesForLesson(
  lessonId: string,
  phase?: ExpertNote["phase"],
): Array<{ expert: Expert; note: ExpertNote }> {
  const results: Array<{ expert: Expert; note: ExpertNote }> = [];
  for (const expert of Object.values(EXPERTS)) {
    for (const note of expert.expertNotes) {
      if (note.lessonId !== lessonId) continue;
      if (phase && note.phase && note.phase !== phase) continue;
      results.push({ expert, note });
    }
  }
  return results;
}

/** All masterclasses whose `linkedLessonIds` include the given lesson. */
export function masterclassesForLesson(lessonId: string): Array<{ expert: Expert; masterclass: MasterclassEntry }> {
  const results: Array<{ expert: Expert; masterclass: MasterclassEntry }> = [];
  for (const expert of Object.values(EXPERTS)) {
    for (const mc of expert.masterclasses) {
      if (mc.linkedLessonIds.includes(lessonId)) {
        results.push({ expert, masterclass: mc });
      }
    }
  }
  return results;
}

/** All upcoming live sessions, optionally filtered by instrument. */
export function upcomingLiveSessions(instrumentId?: string): Array<{ expert: Expert; slot: LiveSessionSlot }> {
  const now = Date.now();
  const results: Array<{ expert: Expert; slot: LiveSessionSlot }> = [];
  for (const expert of Object.values(EXPERTS)) {
    for (const slot of expert.liveSessions) {
      if (instrumentId && slot.instrumentId !== instrumentId) continue;
      const startMs = new Date(slot.startAt).getTime();
      if (startMs < now - 60 * 60 * 1000) continue; // hide sessions older than 1h ago
      results.push({ expert, slot });
    }
  }
  return results.sort((a, b) => new Date(a.slot.startAt).getTime() - new Date(b.slot.startAt).getTime());
}
