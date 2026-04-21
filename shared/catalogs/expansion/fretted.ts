/**
 * Hand-authored L2-L4 overrides · fretted expansion instruments:
 * bass · ukulele · mandolin.
 *
 * Each entry patches the generator's skeleton with real pedagogy —
 * meaningful writtenContent + 3 teach drill points + rich audio-ref
 * labels. Merged into LESSONS by lessonCatalog.ts after the expansion
 * generator + before drill hydration.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const FRETTED_EXPANSION_OVERRIDES: Record<string, Patch> = {
  // ═══ BASS · L2 (scale shipped in expansionHandAuthored) ═══
  bass_l2_02_two_note: {
    id: "bass_l2_02_two_note",
    title: "Two-note root-fifth pattern · bass fundamentals",
    objectives: [
      "Play root + fifth alternating on the E and A strings",
      "Walk the pattern through E, A, D, G (all open strings)",
      "Lock each beat against a click — no drift",
    ],
    writtenContent:
      "## The root-fifth is the bassist's first line\n\nIn country, reggae, polka, and half the bass lines ever written, you alternate the root with its fifth. On bass it's usually played on adjacent strings — root on one, fifth on the next string same fret.\n\n## Pattern\n\nE (open, low) → B (fifth, A string 2nd fret). Then A (open) → E (D string 2nd fret). Same shape, different starting string.\n\n## Why it matters\n\nRoot-fifth teaches your hands to *think relationally*. You stop seeing individual notes and start seeing intervals — the skill that separates a bass player from someone who knows where notes are.",
    drills: {
      teach: [
        { id: "t_why", heading: "Why root-fifth, not root-root", body: "Playing the root alone is muddy. Adding the fifth adds harmonic width — the bass hints at the chord without spelling it out. The drummer + guitarist thank you." },
        { id: "t_shape", heading: "It's a shape, not 4 notes", body: "The root + its fifth on the next string up is always 2 frets to the right. Memorize the *shape*, not the notes. You'll transpose automatically." },
        { id: "t_pitfall", heading: "Common mistake: anchor fatigue", body: "Your fret-hand thumb stays behind the neck in one spot. Don't let it wander as your fingers move. Anchored thumb = stable fingering." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Root-fifth · 60 bpm slow" },
      { id: "demo_target", label: "Root-fifth walking through E A D G · 80 bpm" },
    ],
  },
  bass_l2_03_tempo: {
    id: "bass_l2_03_tempo",
    title: "Locking with a metronome · the bassist's sacrament",
    objectives: [
      "Play quarter notes exactly on the click for 32 bars",
      "Notice when you drift ahead (rushing) or behind (dragging)",
      "Practice at 60, 80, 100 bpm",
    ],
    writtenContent:
      "## Bass = timekeeper\n\nEvery other instrument can be a little loose with time. Bass cannot. Guitar covers drift with dynamics; drums cover drift with fills. Bass is *exposed* — when you drift, the whole band drifts.\n\n## The metronome test\n\nSet a click. Play quarter notes on E. For 32 bars. Listen for *flams* — when your note doesn't hit exactly on the click, you hear two attacks (yours + the metronome). The goal is one attack. One sound. Locked.\n\n## Why 32 bars?\n\n8 bars is easy. 16 is a warmup. 32 bars shows whether you can *hold* the groove — where bassists get tired and start rushing. Record yourself. You'll be horrified at first. That's the diagnostic. Drill.",
    drills: {
      teach: [
        { id: "t_flam", heading: "Listen for the flam", body: "A flam = two attacks where there should be one. When your note is 20-40ms off the click, you hear both. Your job is to make them merge into a single attack event." },
        { id: "t_rush", heading: "Rushing is the default failure", body: "Beginners rush 9 times out of 10. If you can't tell whether you're rushing or dragging, you're rushing. Deliberately play slightly behind the click for a week. You'll land on it." },
        { id: "t_pitfall", heading: "Don't count in your head", body: "Counting is cognitive. Time is physical. Move your body — foot tap, head nod, small sway. The clock lives in your body, not your brain." },
      ],
    },
    audioRefs: [
      { id: "click_60", label: "Metronome only · 60 bpm" },
      { id: "click_80", label: "Metronome + locked bass E · 80 bpm target" },
      { id: "demo_drift", label: "What 'rushing' sounds like (wrong example)" },
    ],
  },
  bass_l2_04_first_piece: {
    id: "bass_l2_04_first_piece",
    title: "Your first 12-bar blues bass line in E",
    objectives: [
      "Play the I-IV-V (E, A, B) blues pattern through 12 bars",
      "Use root + fifth + flat-seventh on each chord",
      "Stay locked to the click at 90 bpm",
    ],
    writtenContent:
      "## 12-bar blues is bass 101\n\nEvery working bassist plays the 12-bar blues. It's the job interview. Two jobs: (1) establish the root, (2) walk to the next chord.\n\n## The form in E\n\n| Bar | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Chord | E | E | E | E | A | A | E | E | B | A | E | B |\n\nOn each chord, play: root, fifth, flat-seventh, fifth. That's 4 notes per bar, all playable on adjacent strings.\n\n## The walk\n\nThe last note of each bar should lead you to the next chord's root. That's the 'walk' — you're not stopping, you're arriving.",
    drills: {
      teach: [
        { id: "t_form", heading: "The form is the lesson", body: "You'll play the 12-bar blues thousands of times in your life. Understanding the *form* — the 12-bar structure, the I-IV-V pattern — matters more than the specific notes. Every blues tune is a variant of this." },
        { id: "t_walk", heading: "Walking = anticipation", body: "The last beat of each bar should point at the next chord. If you're in bar 4 (E) heading to bar 5 (A), your 4th beat should be a D or F# — not an E. You're telegraphing the change." },
        { id: "t_pitfall", heading: "Don't play all 12 bars the same", body: "Vary which fifth you use, vary the octave, add a chromatic approach every 2 bars. A 12-bar blues with identical bars is a boring 12-bar blues." },
      ],
    },
    audioRefs: [
      { id: "demo_full", label: "12-bar blues in E · 90 bpm with drums" },
      { id: "demo_walk", label: "Same form with chromatic walks" },
    ],
  },

  // ═══ BASS · L3 (first_song shipped in expansionHandAuthored) ═══
  bass_l3_02_dynamics: {
    id: "bass_l3_02_dynamics",
    title: "Dynamics with your plucking hand",
    objectives: [
      "Play the same 4-bar pattern at pp, mp, mf, f without changing tempo",
      "Move the plucking hand position (near bridge = bright; near neck = warm)",
      "Record + verify the dynamic range is actually audible",
    ],
    writtenContent:
      "## Volume control lives in your plucking fingers\n\nNew bassists think loud = loud amp. Wrong. Loud = *harder pluck*. Your amp should be set once, and your hand modulates everything.\n\n## Position matters more than force\n\n- **Near the bridge** → bright, thin, snappy (funk, slap, aggressive rock)\n- **Over the neck pickup** → round, warm, vocal (jazz, pop, Motown)\n- **Above the 12th fret on the fretboard** → extremely warm, almost upright-bass (ballads)\n\nMove your hand position *while* you play. Within one song, the same note can say three different things based on where you pluck.\n\n## The dynamics drill\n\nSame 4-bar pattern. Play it at whisper volume (pp). Then medium. Then loud. The NOTES don't change — only the plucking force + position. Record. Listen. If you can't hear a clear difference, you haven't found dynamics yet.",
    drills: {
      teach: [
        { id: "t_hand", heading: "Your hand is the volume knob", body: "Set the amp. Leave the amp alone. Everything else — volume, tone color, dynamics — comes from your plucking hand. Bassists who constantly reach for amp knobs are avoiding the real work." },
        { id: "t_position", heading: "3 positions, 3 voices", body: "Practice one phrase at near-bridge, neck, over-fretboard positions. Same notes, three different 'voices.' You're learning the bass has an acoustic palette, not just a volume slider." },
        { id: "t_pitfall", heading: "Don't crescendo everything", body: "The habit of getting louder into every note is called 'volume drift.' It kills grooves. Deliberately make some notes *quieter* than the previous one. Groove is about contrast, not buildup." },
      ],
    },
    audioRefs: [
      { id: "demo_pp", label: "Phrase at pianissimo · barely there" },
      { id: "demo_f", label: "Same phrase at forte" },
      { id: "demo_positions", label: "Three plucking positions, same notes" },
    ],
  },
  bass_l3_03_articulation: {
    id: "bass_l3_03_articulation",
    title: "Staccato vs legato · articulation on bass",
    objectives: [
      "Play a phrase with legato (connected) phrasing",
      "Play the same phrase with staccato (clipped) phrasing",
      "Switch between them mid-phrase deliberately",
    ],
    writtenContent:
      "## Articulation is how long a note rings\n\nLegato = let it ring. Staccato = cut it short. Both are tools. On bass, staccato is your fret-hand muting the string immediately after the pluck; legato is letting the note decay naturally.\n\n## Muting techniques\n\n- **Fret-hand mute**: release pressure (don't lift!) on the fret after plucking — string dampens\n- **Palm mute**: rest the side of your plucking hand against the strings near the bridge (classic rock tone)\n- **Floating thumb**: your plucking thumb rests on lower strings to mute them — enables active staccato\n\n## The mindset\n\nArticulation *is* the music on bass. Dynamics without articulation = just volume. Legato vs staccato is where personal voice lives. Find yours.",
    drills: {
      teach: [
        { id: "t_legato", heading: "Legato feels lazy · that's the point", body: "Legato bass playing sounds relaxed because your hand is relaxed. Let notes ring into each other. This is the Motown pocket — James Jamerson's entire career." },
        { id: "t_staccato", heading: "Staccato is syncopation's partner", body: "Short, clipped notes create *rhythmic clarity*. Reggae + funk depend on staccato — the spaces between notes are as important as the notes themselves." },
        { id: "t_pitfall", heading: "Don't always muffle with palm mute", body: "Palm mute is one technique among many, not the default. Beginners over-use it because it sounds 'cool.' Reserve it for specific passages. Let your bass breathe most of the time." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "Legato phrase · James Jamerson style" },
      { id: "demo_staccato", label: "Staccato phrase · funk style" },
      { id: "demo_both", label: "Phrase that mixes both within 4 bars" },
    ],
  },
  bass_l3_04_standard_cert: {
    id: "bass_l3_04_standard_cert",
    title: "Standard Certificate · play a full song end-to-end",
    objectives: [
      "Pick any song from the library (or one you know)",
      "Play the bass line through the entire song without stopping",
      "Lock to the click; stay in the pocket; dynamics + articulation applied",
    ],
    writtenContent:
      "## Your Standard Cert is a full song\n\nEverything you've done so far has been exercises. The cert is a *song*. From beat 1 to the final chord, no stopping, no restarts, no 'let me try again.' That's what professional bassists do every day.\n\n## Pick your song wisely\n\nChoose something you love and is *not* too fast. Tempo matters more than complexity. Miles Davis's 'So What' at 128 bpm is harder than Guns N' Roses's 'Sweet Child' at 124 because the note density is punishing.\n\nGood first songs: 'Billie Jean' (Michael Jackson, medium), 'Another One Bites the Dust' (Queen, low-medium), 'Stand By Me' (Ben E King, slow & simple).\n\n## What passing looks like\n\n- Every bar, the root arrives on beat 1\n- Dynamics audibly shift between verse + chorus\n- No restarts, no stops, no bail-outs\n- Playback sounds confident, not tentative",
    drills: {
      teach: [
        { id: "t_pick_song", heading: "Pick the song that scares you least", body: "The cert isn't a flex. Pick the song where you're 70% confident on day one. The practice week will bring you to 95%. Don't pick the ambitious option; pick the finishable option." },
        { id: "t_no_restart", heading: "Playing through mistakes is the skill", body: "Mistakes happen. The Standard Cert measures whether you recover. If you mess up bar 7, the difference between amateur and not-amateur is whether bar 8 still has a downbeat. Keep going." },
        { id: "t_record_first", heading: "Record yourself before you submit", body: "Every professional records themselves and listens back. It's the fastest way to find what's working. Do this before submitting. What you hear will improve it." },
      ],
    },
    audioRefs: [
      { id: "demo_billie_jean", label: "Bass line · Billie Jean (reference cover)" },
      { id: "demo_stand_by_me", label: "Bass line · Stand By Me" },
    ],
  },

  // ═══ BASS · L4 ═══
  bass_l4_01_scale_two: {
    id: "bass_l4_01_scale_two",
    title: "G major scale · second position",
    objectives: [
      "Play G major (G A B C D E F# G) across strings using 1-2-4 fingering",
      "Cross the D-string fingerboard transition smoothly",
      "Maintain intonation at 100 bpm",
    ],
    writtenContent:
      "## Your second scale · G major\n\nAfter E major, G major is a bassist's second most-used key. It covers ranges your first scale didn't + introduces an F# (fret 4 on D string) you haven't played yet.\n\n## Fingering\n\nStart G on the E string (fret 3, middle finger). Walk: A (open, A string) — B (fret 2) — C (fret 3) — D (open, D string) — E (fret 2) — F# (fret 4) — G (fret 5, pinky or slide).\n\nNote the *position shift* at F#. Your hand has to move. Practice the shift *slowly* — 30 BPM — until it's silent. Then build up.\n\n## Why G, why now\n\nG covers 60% of rock, 40% of country, and is the default jam-session key alongside E. Every note you'll learn in these scales is a note you'll use for the rest of your playing life. Master both, then move to harder keys.",
    drills: {
      teach: [
        { id: "t_position", heading: "Position shifts are the Pro-tier skill", body: "L1-L3 taught you to play within one hand position. L4 introduces the shift — moving your whole hand 3-4 frets without breaking tempo. Students who can't shift cleanly plateau at intermediate forever." },
        { id: "t_intonation", heading: "Intonation on bass is real (yes, frets)", body: "Yes, bass has frets. But finger pressure behind the fret can pull the string sharp. Press *lightly* — just enough to hold it. If your G sounds 10-15 cents sharp, you're mashing." },
        { id: "t_pitfall", heading: "Common mistake: hand cramping", body: "If your fret hand cramps in the first 5 minutes of a scale session, your thumb is squeezing. Relax it. The thumb is a pivot, not a vice grip." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "G major · 60 bpm" },
      { id: "demo_target", label: "G major · 100 bpm target" },
      { id: "demo_shift", label: "Isolated position-shift at F# · slow" },
    ],
  },
  bass_l4_02_ornament: {
    id: "bass_l4_02_ornament",
    title: "Hammer-ons, pull-offs, slides · your first ornaments",
    objectives: [
      "Hammer-on from open E to F# without re-plucking",
      "Pull-off from F# to E",
      "Slide up from G to A",
    ],
    writtenContent:
      "## Bass ornaments connect notes\n\nYou've been plucking every note. Now you start *connecting* them with left-hand techniques. Three fundamentals:\n\n- **Hammer-on** (h): pluck one note, then use your fret finger to 'hammer' the next note without re-plucking. The string rings with the new pitch.\n- **Pull-off** (p): the reverse — pluck a fretted note, then pull your finger off sideways so the note behind it sounds.\n- **Slide** (/ or \\): hold the note down, pluck once, then slide your finger along the string to the new pitch. The string never stops ringing.\n\n## Why ornaments matter\n\nYour bass line gains *voice*. Instead of 8 distinct notes, you can play 4 notes + 4 ornaments — and the line feels *sung* rather than typed.\n\nListen to Flea (Red Hot Chili Peppers), Bootsy Collins, Pino Palladino. Every phrase is full of connective tissue.",
    drills: {
      teach: [
        { id: "t_why", heading: "Why not just pluck every note?", body: "Every pluck is a *reset*. It interrupts the line. Hammer-ons, pull-offs, and slides keep the line *alive* — the string never stops vibrating. That's the difference between bass that sounds robotic and bass that sings." },
        { id: "t_hammer", heading: "Hammer-on technique", body: "Your finger should hit the fret with a crisp, downward motion — like a drum stroke, not a press. Students who press slowly get weak, muddy hammer-ons. Think percussion, not pressure." },
        { id: "t_pitfall", heading: "Common mistake: over-ornamenting", body: "New students, having learned ornaments, put them on every note. Don't. Ornaments work because they're *rare* — contrast with straight plucked notes. 70% plucked, 30% ornamented is the sweet spot." },
      ],
    },
    audioRefs: [
      { id: "demo_hammer", label: "Hammer-on drill · E → F#" },
      { id: "demo_pull", label: "Pull-off drill · F# → E" },
      { id: "demo_slide", label: "Slide drill · G → A" },
      { id: "demo_phrase", label: "4-bar phrase using all three" },
    ],
  },
  bass_l4_03_rep_1: {
    id: "bass_l4_03_rep_1",
    title: "Intermediate repertoire · 'Come Together' (The Beatles)",
    objectives: [
      "Play the full bass line — intro through chorus",
      "Use palm mute for the verse, open for the chorus",
      "Nail the iconic opening lick",
    ],
    writtenContent:
      "## Paul McCartney's masterpiece\n\n'Come Together' has one of the most recognizable bass lines in rock. If you play bass, you should be able to play this intro from memory.\n\n## The opening lick\n\nHammer-on D to F# (D string 5th fret → 4th fret, actually opposite direction), pause, sliding octave jump. The exact notes matter less than *feel*. Listen to the record 10 times before touching the bass.\n\n## Verse vs chorus\n\n- **Verse**: palm mute, staccato, quiet confidence. The bass is *lurking*.\n- **Chorus**: mute comes off, notes ring, driving. The bass *arrives*.\n\nThat contrast is the arrangement's secret. Miss it and the song goes flat.\n\n## Why this piece\n\nCome Together teaches you that bass lines can be *characters* — not just supporting harmony but carrying a mood. Every bassist should have 5 iconic lines in their back pocket. This is one.",
    drills: {
      teach: [
        { id: "t_listen_first", heading: "Listen 10 times before you play", body: "You can't play what you haven't heard clearly. Before you touch the bass, listen to 'Come Together' 10 times, paying attention only to the bass. You'll hear details you missed for years." },
        { id: "t_iconic", heading: "Iconic licks have *feel*, not just notes", body: "The notes of the opening lick are easy. The feel — the tiny delay before the second note, the way McCartney's finger slides just barely — that's why it sounds like the record. Match the feel, don't just match the notes." },
        { id: "t_pitfall", heading: "Common mistake: muting the chorus too", body: "Beginners over-mute. The verse is muted, yes — but when the chorus hits, the mute comes OFF. Your hand position physically changes. If the chorus still sounds muffled, the palm hasn't moved away from the bridge." },
      ],
    },
    audioRefs: [
      { id: "demo_intro", label: "Come Together intro lick · slow isolation" },
      { id: "demo_verse", label: "Verse bass · palm-muted" },
      { id: "demo_chorus", label: "Chorus bass · open, ringing" },
    ],
  },
  bass_l4_04_practice_rout: {
    id: "bass_l4_04_practice_rout",
    title: "Daily 20-minute practice routine",
    objectives: [
      "Structure a 20-minute practice block: warm-up · scale · repertoire · creative",
      "Maintain it for 2 weeks minimum",
      "Track progress via a single recording at the end of each session",
    ],
    writtenContent:
      "## The 20-minute block\n\nMore time = diminishing returns. Better to practice 20 focused minutes daily than 2 hours once a week. Studies show 15-25 minutes of *focused* practice beats 60-90 of distracted.\n\n## The structure\n\n- **Minutes 0-5**: Warm-up. Scale of the week, slowly. No click.\n- **Minutes 5-10**: Scale + metronome. Speed up in 10-bpm increments until you stumble, then back off.\n- **Minutes 10-15**: Repertoire. Current piece you're learning. Work the hardest bar. Slow. Slow. Slow. Then fast.\n- **Minutes 15-20**: Creative play. Improvise. Play along to a record. No goal. This is where real musicality grows.\n\n## The recording habit\n\nAt the end of each session, record 30 seconds of something. Anything. Date it. Listen back the next day. You'll hear progress you can't feel in the moment.\n\n## The anti-trap\n\nDon't do all 20 minutes on scales. Scales are maintenance, not growth. The creative 5 minutes at the end is where your *voice* develops.",
    drills: {
      teach: [
        { id: "t_consistency", heading: "Daily > marathon", body: "Muscle memory consolidates during sleep. 20 minutes daily = 7 cycles of consolidation per week. 2 hours once a week = 1 cycle. Mathematically, daily wins." },
        { id: "t_structure", heading: "The structure stops wandering", body: "Without a block structure, you'll drift. Same song 10 times. Same scale unconsciously. The structure forces variety. Variety is growth." },
        { id: "t_pitfall", heading: "Don't skip the creative block", body: "Students with strict structure + no creative time become technicians. Great technique, zero voice. The last 5 minutes — improvise, play along to records, be bad on purpose — that's where voice grows." },
      ],
    },
    audioRefs: [
      { id: "demo_warmup", label: "Sample 5-minute warm-up sequence" },
      { id: "demo_session", label: "Full 20-minute practice block · real-time audio" },
    ],
  },

  // ═══ UKULELE · L2-L4 ═══
  ukulele_l2_02_two_note: {
    id: "ukulele_l2_02_two_note",
    title: "C to G switch · your first chord change",
    objectives: [
      "Switch from C to G7 smoothly, both strums resonant",
      "Use the 'thumb anchor' to keep hand position between chords",
      "Target: 120 bpm switch with no hiccup",
    ],
    writtenContent:
      "## The hardest moment in ukulele\n\nEvery new ukulele player hits a wall at chord changes. Not the chords themselves — the *switch*. Here's the secret: you're switching too late. Start moving your hand to G7 *while* you're still strumming the last C.\n\n## Thumb anchor\n\nYour thumb stays behind the neck in one spot. Ring finger lifts off the A string for G7 while middle + index find new positions. The thumb doesn't move. Thousands of changes later, the thumb is still in the same spot.\n\n## The pattern\n\nStrum C for 4 beats. On beat 4, your fingers already leave C. On beat 1 of G7, they land. Your hand is in motion during the last half of beat 4 — that's the secret.\n\n## Practice drill\n\n30 seconds of C-G-C-G changes. Don't rush. Cleanness first. Speed emerges from cleanness, not the other way around.",
    drills: {
      teach: [
        { id: "t_anticipation", heading: "Change *before* you need to", body: "The biggest beginner mistake: waiting until the last beat to move. Your hand is already moving on beat 3. By beat 4.5, new fingers are hovering over new positions. This 'early start' is invisible to the listener and everything to the player." },
        { id: "t_anchor", heading: "The thumb anchor saves 40% of effort", body: "Without an anchor, your entire hand moves every chord. With an anchor (thumb behind neck, steady), only fingers move. 40% less motion = faster changes + less fatigue." },
        { id: "t_pitfall", heading: "Don't strum on every change", body: "Practice the change *without* strumming at all. Silent hand movement. Once your fingers find the new chord 10 times in a row silently, then add strumming. Most students skip this and wonder why their changes buzz." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "C → G7 change at 60 bpm" },
      { id: "demo_target", label: "Same change at 120 bpm" },
    ],
  },
  ukulele_l2_03_tempo: {
    id: "ukulele_l2_03_tempo",
    title: "Hawaiian strum pattern · 'the island lilt'",
    objectives: [
      "Play down-down-up-up-down-up (d-d-u-u-d-u)",
      "Maintain for 16 bars without rushing",
      "Feel the *lift* on the up-strokes",
    ],
    writtenContent:
      "## The Hawaiian strum is the ukulele's signature\n\nDown-Down-Up-Up-Down-Up. That's it. That's the pattern behind 80% of ukulele pop songs, 100% of beach music, and every cliché.\n\n## The motion\n\nYour strumming hand is a pendulum. Down swings it toward the floor. Up swings it back. The pattern is about which down-or-up you *connect with* the strings.\n\nd  d  u  u  d  u\n1  &  2  &  3  &\n\nNote: you skip some strings on the off-beats. That's the Hawaiian 'lilt' — hand keeps moving, strings aren't always hit.\n\n## Why it feels happy\n\nThe up-strokes on the 'and' of 2 and 3 create syncopation. Your ear expects *downbeats*. Getting offbeats between them = lift + joy. It's why ukulele music feels sunny.\n\n## Common mistake\n\nBeginners *stop the hand* between down and up. Don't. Hand swings continuously even when you skip a string. The motion is constant; your touch is intermittent.",
    drills: {
      teach: [
        { id: "t_pendulum", heading: "Hand as pendulum", body: "Your hand swings down-up-down-up continuously, like a metronome. The strumming is whether you *touch the strings* or not on each motion. Down-up is always happening; you decide when to make contact." },
        { id: "t_syncopation", heading: "The magic is the 'and' of 2", body: "The up-stroke on beat 2.5 (the 'and' of 2) is what makes this pattern Hawaiian. Remove it and it's just a dumb down-up. Keep it and it's an island." },
        { id: "t_pitfall", heading: "Don't lock your wrist", body: "If your wrist locks, your whole arm strums — that's tiring and sloppy. Wrist should flow like you're waving goodbye. Arm is mostly still." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Hawaiian strum at 60 bpm — each note clear" },
      { id: "demo_target", label: "Full pattern at 100 bpm" },
      { id: "demo_silence", label: "Silent strum motion · no strings touched, hand still moves" },
    ],
  },
  ukulele_l2_04_first_piece: {
    id: "ukulele_l2_04_first_piece",
    title: "Your first song · 'You Are My Sunshine'",
    objectives: [
      "Play the C-F-C-G7-C progression through the verse",
      "Use the Hawaiian strum pattern",
      "Sing along (optional but recommended)",
    ],
    writtenContent:
      "## Three chords, done\n\n'You Are My Sunshine' uses C, F, G7. You know C + G7 (last lesson). F is new: index on the G string fret 2, middle on the A string fret 1. Three fingers. Not a barre chord.\n\n## The progression\n\nVerse: C - F - C - G7 - C (4 bars each)\nChorus: F - C - G7 - C\n\nSwitch every 4 beats. Keep the Hawaiian strum pattern throughout. The strum doesn't care which chord you're on.\n\n## Why sing along\n\nUkulele is a *song accompaniment* instrument above all else. Sing. Even if you can't sing. The chord changes will sync with the lyrics in ways they can't when you're silent. 'You ARE my sunshine' — hit the chord change on ARE. That's how you learn song structure physically.\n\n## The first milestone\n\nWhen you can play + sing one full verse + chorus without stopping, you've crossed the 'real ukulele player' line. Most beginners never get here because they're stuck in chord-change drill mode forever.",
    drills: {
      teach: [
        { id: "t_sing", heading: "Sing even if you're bad at singing", body: "Ukulele + voice is one instrument. Playing without singing is playing half the instrument. Bad singing is fine — *consistent* singing is what matters. The ukulele supports your voice; your voice supports the ukulele. Synergy." },
        { id: "t_pick", heading: "Pick a song you know well", body: "Sunshine is first because everyone knows it — you've heard it a thousand times. Your ear already knows where the chord changes *should* be. Picking an unfamiliar song triples the difficulty because you're learning melody AND chords AND timing simultaneously." },
        { id: "t_pitfall", heading: "Don't obsess over F-chord buzz", body: "F chord will buzz at first. Your index finger isn't used to pressing a string at fret 1. That's fine. Play through it. It cleans up within a week. Students who stop to 'perfect' F before continuing lose momentum." },
      ],
    },
    audioRefs: [
      { id: "demo_sunshine", label: "You Are My Sunshine · ukulele + voice" },
      { id: "demo_chord_diagram", label: "F chord position clearly shown" },
    ],
  },
  ukulele_l3_01_first_song: {
    id: "ukulele_l3_01_first_song",
    title: "'Somewhere Over the Rainbow' · Iz's arrangement",
    objectives: [
      "Play Iz's medley of 'Rainbow' and 'What a Wonderful World'",
      "Use fingerpicking (thumb-index-middle) not strumming",
      "Land the iconic C-major opening chord cleanly",
    ],
    writtenContent:
      "## The most famous ukulele performance ever\n\nIsrael 'Iz' Kamakawiwoʻole's recording of 'Somewhere Over the Rainbow' is why a lot of people picked up a ukulele. It's also the first 'real' song a new player can learn because it's fingerpicked — not strummed — and the chords are accessible.\n\n## Fingerpicking pattern\n\nThumb plays the G string (highest! re-entrant).\nIndex plays the C string.\nMiddle plays the E string.\nRing finger plays the A string.\n\nPattern: Thumb-Middle-Index-Middle. Repeat. That's the 'picking hand choreography' underneath every Iz arrangement.\n\n## The chords\n\nC, Em, Am, F, G — five chords total. Em and Am are new. Em: middle on G string fret 4. Am: middle on C string fret 2. Both are single-finger chords.\n\n## The feel\n\nSlow, meditative, unhurried. Don't rush Iz. This piece teaches you that ukulele isn't just a strumming instrument — it's a melodic fingerpicking instrument. Different side of the same instrument.",
    drills: {
      teach: [
        { id: "t_fingerpicking", heading: "Fingerpicking = melody + harmony simultaneously", body: "When you fingerpick, your thumb provides the bass-like downbeat + your fingers provide the chord tones + sometimes the melody on top. You're suddenly a whole band. That complexity is why players who fingerpick often sound better than those who only strum." },
        { id: "t_iz", heading: "Learn from the master recording", body: "Iz's recording is in the public domain (freely available). Listen to it 20 times. Each time focus on a different layer: (1) bass line (thumb), (2) chord rhythm (fingers), (3) melody (voice). You'll hear things you missed." },
        { id: "t_pitfall", heading: "Don't rush the chord changes", body: "The arrangement has long, slow chord holds. Beginners rush them because silence feels awkward. It isn't awkward — it's the point. Hold the F chord for its full 4 beats before moving. The hold is as musical as the change." },
      ],
    },
    audioRefs: [
      { id: "demo_intro", label: "Iz's Rainbow intro · first 8 bars" },
      { id: "demo_full_verse", label: "First full verse · ukulele only" },
      { id: "demo_picking", label: "Isolated picking pattern · T-M-I-M" },
    ],
  },
  ukulele_l3_02_dynamics: {
    id: "ukulele_l3_02_dynamics",
    title: "Loud + soft on ukulele · a whispering instrument",
    objectives: [
      "Play the same chord progression at whisper (pp), medium (mf), and loud (f)",
      "Use palm position to control volume, not strumming force",
      "Record + verify the volume range is actually audible",
    ],
    writtenContent:
      "## Ukulele has ~15 dB of dynamic range\n\nCompared to a piano (80+ dB) or guitar (40 dB), ukulele is quiet across the board. But *relative* dynamics matter. A quiet passage before a louder one creates contrast — and contrast is what makes music feel alive.\n\n## Volume control\n\n- **Whisper (pp)**: thumb only, over the 12th fret, very soft\n- **Medium (mf)**: fingers over the soundhole\n- **Loud (f)**: fingers near the bridge, fuller downstrokes\n\nNotice: you're NOT just 'strumming harder.' You're changing *where* you strum + *which finger/thumb* contacts. Harder strumming past a certain point just produces fret buzz, not volume.\n\n## The compression problem\n\nRecord yourself. On most phone recordings, your dynamic range gets compressed to nothing (everything sounds the same volume). That's not your playing — that's the mic's auto-gain. Record with headphones on and a proper gain setting if you want to hear your real dynamics.",
    drills: {
      teach: [
        { id: "t_range", heading: "Small range is still a range", body: "Ukulele is quiet. That doesn't mean you can't play expressively. Within its 15 dB range, you can do everything a louder instrument does — just more subtly. The subtlety *is* the charm." },
        { id: "t_position", heading: "Position > force", body: "Once you learn that strumming position controls volume more than strumming force, you'll never play loud by 'mashing' again. You'll play loud by moving closer to the bridge." },
        { id: "t_pitfall", heading: "Don't over-strum to fake loud", body: "Over-strumming = buzzing, not loudness. Your ear interprets buzzing as *noise*, not volume. Play *cleaner* at soft dynamics; your brain adjusts and hears it as louder." },
      ],
    },
    audioRefs: [
      { id: "demo_pp", label: "Whisper-level chord progression" },
      { id: "demo_mf", label: "Medium volume chord progression" },
      { id: "demo_f", label: "Loud chord progression · near the bridge" },
    ],
  },
  ukulele_l3_03_articulation: {
    id: "ukulele_l3_03_articulation",
    title: "Muted strum · 'chuck' for percussive rhythm",
    objectives: [
      "Play a muted strum ('chuck') by resting fingers on the strings",
      "Alternate regular strum with chucks",
      "Build a chucka-chucka pattern: d-chuck-d-chuck",
    ],
    writtenContent:
      "## The chuck turns your ukulele into a drum\n\nLay your fingers flat across the fretboard — not pressing, just touching. Strum. You'll hear a percussive 'chuck' instead of a chord. This is the chuck.\n\n## Why it matters\n\nUkulele players *also* want rhythm. A song without chucks is uniformly strummed — and after 4 bars, it gets monotonous. Chucks break the pattern. They add a kick-drum feel.\n\n## Basic pattern\n\n**d-chuck-d-chuck-d-chuck-d-chuck** (4 bars of syncopated attack)\n\nor\n\n**D-D-U-chuck-D-U** (Hawaiian pattern with a chuck where beat 3 would be)\n\n## The physics\n\nThe muted strings can't vibrate. Your fingers are touching them lightly. The strum produces only the attack sound — no pitch. Your ear registers it as a drum hit.\n\n## Where you hear it\n\nJake Shimabukuro's performances are full of chucks. Jason Mraz's ukulele recordings. Every modern ukulele pop track. Listen for it. You'll hear it everywhere.",
    drills: {
      teach: [
        { id: "t_light", heading: "Light touch is the whole trick", body: "Press too hard on the mute, you'll get a partially-fretted note (ugly). Press too light, you'll get a normal chord (not percussive). Find the exact pressure where strings can't vibrate freely but aren't pressed into a fret. Week one takes patience." },
        { id: "t_pattern", heading: "Chuck on the off-beats", body: "Usually a chuck lives on beats 2 and 4 — the 'snare drum' positions. That's where your ear expects a snare in most pop music, so the chuck fills that role." },
        { id: "t_pitfall", heading: "Don't chuck on every beat", body: "A song where every beat is a chuck is not rhythmic — it's noisy. Chuck 25-50% of the time. Contrast between chucked + pitched beats is the musicality." },
      ],
    },
    audioRefs: [
      { id: "demo_chuck", label: "Isolated chuck · 4 beats" },
      { id: "demo_pattern", label: "Chuck pattern: d-chuck-d-chuck" },
      { id: "demo_song", label: "Chuck in a song context · 'I'm Yours' verse" },
    ],
  },
  ukulele_l3_04_standard_cert: {
    id: "ukulele_l3_04_standard_cert",
    title: "Standard Cert · Play a full song with strumming + chucks",
    objectives: [
      "Play a full song (2-3 minutes) without stopping",
      "Use at least 3 chords + at least 1 chuck pattern",
      "Sing along (or hum if you can't sing)",
    ],
    writtenContent:
      "## The threshold\n\nYour Standard Cert on ukulele is: *play and sing a full song from beginning to end*. Not perfectly — nobody plays perfectly. But *completely*. No stops, no restarts.\n\n## Suggested songs (from easiest)\n\n- **You Are My Sunshine** (C, F, G7)\n- **Stand By Me** (C, Am, F, G)\n- **I'm Yours** by Jason Mraz (G, D, Em, C · add chuck pattern)\n- **Over the Rainbow** (C, Em, F, G, Am — fingerpicked)\n\n## What we measure\n\n- Chord changes land on time (within 200ms of the downbeat)\n- Strum or chuck pattern is audible\n- Voice (or humming) is pitched correctly\n- Song has a beginning, middle, end\n\n## Before you submit\n\nRecord + listen back. If anything felt 'off,' listen specifically for it. Re-record. The cert isn't a one-shot; it's the best take you can produce in a week of daily practice.",
    drills: {
      teach: [
        { id: "t_pick_right", heading: "Pick a 2-3 minute song, not a 5-minute one", body: "Long songs = more places to mess up. For the cert, pick something compact. 'Stand By Me' is 2 minutes. 'Hey Jude' is 7. Don't pick Hey Jude for your first cert." },
        { id: "t_sing_or_hum", heading: "Hum if singing scares you", body: "Humming counts. It tells me you know the melody and can keep time while playing chords. Singing is preferred but not required — what matters is you're paying attention to melody, not just mindlessly strumming." },
        { id: "t_pitfall", heading: "Don't rush the chord changes out of anxiety", body: "Students nervous about mistakes rush through the change, which usually causes the mistake. Slow down *deliberately* going into a hard change. Give yourself time. The listener can't tell if you slowed down 100ms; they can tell if you fumbled." },
      ],
    },
    audioRefs: [
      { id: "demo_sunshine", label: "Sunshine full cover · ukulele + voice" },
      { id: "demo_stand_by_me", label: "Stand By Me · 2-minute version" },
    ],
  },
  ukulele_l4_01_scale_two: {
    id: "ukulele_l4_01_scale_two",
    title: "G major scale on ukulele",
    objectives: [
      "Play G major (G A B C D E F# G) across all 4 strings",
      "Map fingering that minimizes string crossings",
      "Maintain 100 bpm with metronome",
    ],
    writtenContent:
      "## Your second scale · G\n\nAfter C major, G major is the next most-used key. The only new note is F# (fret 4 on the E string). Everything else is notes you already know from C major.\n\n## Fingering\n\nOpen G (thumb on the G string) — A (C string, fret 2) — B (C string, fret 4, pinky) — C (E string, fret 0) — D (E string, fret 2) — E (A string, fret 0) — F# (A string, fret 4, pinky) — G (A string, fret 5, pinky).\n\nYour pinky works hard. Good. It should. Pinky avoidance caps you at beginner forever.\n\n## Re-entrant gotcha\n\nBecause the G string is tuned HIGH (not low), your scale *doesn't start at the lowest note*. It starts at the top. Your ear adjusts within 2-3 runs. Trust it.\n\n## Why G major on ukulele\n\nG is a natural key for the ukulele — three of your four open strings are in G major (G, C, E). Scales and chords in G flow easily. Master G after C, then you're 80% of the way to improvising over any pop song.",
    drills: {
      teach: [
        { id: "t_reentrant", heading: "Re-entrant scales feel weird · that's the feature", body: "On a guitar, the scale goes from lowest note to highest. On ukulele, the re-entrant G string breaks that pattern. Your ear adjusts. The upside: you get chord voicings that sound uniquely ukulele — bright, shimmering, never bass-heavy." },
        { id: "t_pinky", heading: "The pinky earns its place in G major", body: "F# and high G both require the pinky. No way around it. Students who avoid the pinky plateau at beginner. Two weeks of pinky drills is painful; it's also non-negotiable for progress." },
        { id: "t_pitfall", heading: "Don't press the fingerboard, squeeze around it", body: "Ukulele necks are thin. Beginners mash fingers straight down. Instead, 'squeeze' around the neck — thumb behind, fingers curved over the top. This lets the pinky reach high frets without contortion." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "G major scale · 60 bpm" },
      { id: "demo_target", label: "G major scale · 100 bpm" },
    ],
  },
  ukulele_l4_02_ornament: {
    id: "ukulele_l4_02_ornament",
    title: "Hammer-ons and pull-offs · adding melody",
    objectives: [
      "Hammer-on from open E to F (fret 1)",
      "Pull-off from F back to E",
      "String a melody together using h + p techniques",
    ],
    writtenContent:
      "## Ornaments on ukulele\n\nBass learns hammer-ons in L4. Ukulele too. Same mechanics: pluck one note, use your fret finger to 'hammer' (or 'pull') to the next note without re-plucking.\n\n## Why on ukulele\n\nUkulele is quiet. Each pluck is an *event* — loud-ish followed by a fast decay. If you pluck every note, the instrument sounds staccato no matter what. Hammer-ons + pull-offs let the note ring, creating *phrasing*.\n\n## Technique\n\n- **Hammer-on**: plucked E (open), then middle finger *drops* onto fret 1 (F). The string is already vibrating; the new finger just shortens the vibrating length → new pitch.\n- **Pull-off**: finger on F, plucked. Then the finger pulls *sideways* (not up) off fret 1. The open string (E) starts ringing again.\n\n## Why lateral, not upward\n\nIf you lift your finger straight up, the string stops vibrating. Pull sideways — it's like you're plucking the string with your left hand. The sideways motion gives the open string a tiny re-impulse, so it keeps ringing.\n\n## Where you hear this\n\nEddie Vedder. Twenty One Pilots. Taylor Swift's ukulele songs. Every modern ukulele pop production uses hammer-ons constantly. Once you hear them, you can't unhear them.",
    drills: {
      teach: [
        { id: "t_drop", heading: "Hammer, don't press", body: "The finger should fall on the fret like a tiny drum stroke — crisp, downward. Students who press slowly get weak hammers. Think percussion, not pressure." },
        { id: "t_pull_sideways", heading: "Pull-off is sideways, not up", body: "The #1 beginner mistake on pull-offs: lifting straight up. The string stops. Lateral motion re-plucks the open string lightly. Watch a video in slow-mo — the finger slides off; it doesn't lift." },
        { id: "t_pitfall", heading: "Don't over-use", body: "If every other note is a hammer-on, the song sounds noodly. Use ornaments to highlight specific phrases, not every bar. 30% of notes ornamented, max." },
      ],
    },
    audioRefs: [
      { id: "demo_hammer", label: "Hammer-on drill E → F" },
      { id: "demo_pull", label: "Pull-off drill F → E" },
      { id: "demo_phrase", label: "Melodic phrase using h + p" },
    ],
  },
  ukulele_l4_03_rep_1: {
    id: "ukulele_l4_03_rep_1",
    title: "Intermediate repertoire · 'Riptide' (Vance Joy)",
    objectives: [
      "Play the Am-G-C progression with Hawaiian strum",
      "Add chucks on beats 2 and 4",
      "Sing the hook line",
    ],
    writtenContent:
      "## The most-covered ukulele song of the 2010s\n\n'Riptide' is the song every ukulele student eventually plays. Three chords. Simple strum. Memorable melody. Yet most covers sound identical + boring — because most students skip the *groove* work.\n\n## The chords\n\nAm - G - C (repeated throughout verse + chorus). That's it. Nothing complicated.\n\n## The groove\n\nHere's where students separate. Vance Joy's recording has a distinct *lilt* — the G chord is held slightly longer than Am and C. Count: Am (4 beats), G (5 beats-ish), C (4 beats). That asymmetry is the *feel*. Most covers miss it.\n\n## The vocal hook\n\n'Lady running down to the riptide' — sing it. The melody goes up on 'riptide' and comes back down. Your strumming should support the vocal arc, not compete with it. Strum gently under sung notes.\n\n## What you learn\n\nMost covers of Riptide sound bad because the performer's *groove* is off. Work the feel — the rushed G, the slight pause before the chorus — and your cover will sound like Vance's. Ignore the feel and it's generic.",
    drills: {
      teach: [
        { id: "t_feel", heading: "Feel > technical accuracy", body: "You can get all three chords perfect and still sound wrong. Riptide's magic is the asymmetry of its chord lengths + the lilt. Listen to the original 5 times focusing only on rhythm — not melody. You'll hear what most covers miss." },
        { id: "t_singalong", heading: "Sing while you strum", body: "Riptide is a vocal song. Strumming without singing misses half the piece. If you can't sing, at least *mouth* the lyrics. Your chord changes will magically sync up with natural phrasing." },
        { id: "t_pitfall", heading: "Don't rush the chorus", body: "Beginners always speed up going into the chorus because the chorus feels 'bigger.' Vance doesn't speed up. He lets the chorus *arrive*. If your cover rushes into the chorus, you've flattened the dynamics." },
      ],
    },
    audioRefs: [
      { id: "demo_verse", label: "Riptide verse · Am-G-C pattern" },
      { id: "demo_chorus", label: "Riptide chorus · same chords, different energy" },
      { id: "demo_lilt", label: "Isolated: the G chord held slightly long (the 'lilt')" },
    ],
  },
  ukulele_l4_04_practice_rout: {
    id: "ukulele_l4_04_practice_rout",
    title: "Daily 20-minute ukulele practice routine",
    objectives: [
      "Structure: warm-up · scale · chord changes · song work · creative",
      "Commit for 14 consecutive days",
      "Record 30 seconds at end of each session",
    ],
    writtenContent:
      "## The ukulele 20-minute block\n\nSame structure as any instrument, adapted for ukulele's unique needs.\n\n## Structure\n\n- **Minutes 0-3**: Scale warm-up (C or G major, slow, no click).\n- **Minutes 3-8**: Chord change drills. Pick 3 chords, rotate 60 seconds each.\n- **Minutes 8-13**: Song work. Your current song, worked bar-by-bar.\n- **Minutes 13-18**: Free playing. Try to play a TV jingle. Improvise a new strum. Be silly.\n- **Minutes 18-20**: Record + listen back.\n\n## The recording habit\n\nEven 30 seconds. Date it. Keep a folder. After 2 weeks of daily recordings, you'll hear *massive* progress playing them back — progress you can't feel in the moment.\n\n## The ukulele advantage\n\nUkulele is portable + quiet. Practice anywhere. On the couch. At the park. 20 minutes a day is easy because the instrument never intrudes. Take advantage of this. It's why ukulele players improve faster than piano players — hours accumulate.",
    drills: {
      teach: [
        { id: "t_portability", heading: "Your ukulele should live out, not in the case", body: "The single biggest predictor of ukulele progress: is the instrument visible + reachable? Students who store it in a case behind a couch practice 5 minutes a week. Students who leave it on the couch practice 20 minutes a day. Friction is the enemy." },
        { id: "t_structure", heading: "Structure frees improvisation", body: "Counter-intuitive: a structured 20 minutes produces MORE creative playing than 20 unstructured minutes. Structure eliminates decision fatigue — you know exactly what to do next. Energy stays in the playing." },
        { id: "t_pitfall", heading: "Don't skip the 5 min of free play", body: "This is where your voice develops. If every practice session is mechanical, you'll technique your way into boredom. Free play = fun + creativity + retention." },
      ],
    },
    audioRefs: [
      { id: "demo_warmup", label: "Sample 3-minute warm-up" },
      { id: "demo_drill", label: "Chord change drill example" },
    ],
  },

  // ═══ MANDOLIN · L2-L4 ═══
  mandolin_l2_01_scale: {
    id: "mandolin_l2_01_scale",
    title: "G major scale on mandolin · two octaves",
    objectives: [
      "Play G major starting on the G string (open)",
      "Span two octaves ending on G, 5th fret E string",
      "Use alternate picking throughout",
    ],
    writtenContent:
      "## Mandolin's native key\n\nOpen G on the mandolin is your lowest note — and it happens to be the tonic of G major. Every scale begins as 'easy' and ends demanding as you climb. Welcome to the instrument.\n\n## Two octaves · the mandolinist's requirement\n\nMandolin strings are short (about 13 inches). That means two octaves fit on even the first position. You *cannot* skip this — a mandolinist who plays only one octave is a mandolinist who capped out at week 3.\n\n## Alternate picking\n\nDown-up-down-up, always. Never two downs in a row. This is the foundation of mandolin speed. Jazz manouche players (Django-derived) use pure down-strokes; bluegrass (Monroe-derived) uses pure alternate. We teach bluegrass first.\n\n## Why alternate\n\nYour pick sweeps through 10-12 notes at speed. If every stroke is down, your hand has to re-position between each → slow. Alternate means down-up-down-up: motion is continuous, no reset.\n\n## Practice drill\n\n60 bpm, alternate picking, two octaves. Slowly. Emphasis on *evenness* — every note should have identical volume. Speed comes last. Evenness first.",
    drills: {
      teach: [
        { id: "t_alternate", heading: "Alternate picking is non-negotiable", body: "If you only down-stroke, you'll cap at about 60-70 bpm on 16th notes. Alternate picking gets you to 140+ bpm with practice. It's the single technique difference between beginner and intermediate mandolinist." },
        { id: "t_short_strings", heading: "Short strings + big intervals", body: "Mandolin frets are tight together. A whole step is less than 2 cm. Your fingers learn precise placement in a small space — this is why mandolin technique transfers poorly to guitar (whose frets are spaced differently) and vice-versa." },
        { id: "t_pitfall", heading: "Don't squeeze the pick", body: "A tightly-gripped pick bounces off strings; a loosely-held pick flows through them. Grip the pick like you're holding a potato chip without crushing it. Tension in the hand = scratchy tone." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "G major 2-octave scale · 60 bpm" },
      { id: "demo_target", label: "G major 2-octave scale · 120 bpm with alternate picking" },
    ],
  },
  mandolin_l2_02_two_note: {
    id: "mandolin_l2_02_two_note",
    title: "Double stops · two notes at once",
    objectives: [
      "Play a two-string chord (double stop) cleanly",
      "Alternate between two double stops",
      "Understand mandolin as a chord-capable instrument",
    ],
    writtenContent:
      "## Mandolin = mini-orchestra\n\nMandolin strings come in *pairs*. Each pitched string has an identical twin an octave apart (or in unison). When you strike a string, you strike the pair. This is why mandolin chords sound so rich — you're not playing 2-note chords, you're playing 4-note (double-tracked) chords.\n\n## Double stop technique\n\nHold fret on two adjacent pairs. Pick both pairs in one sweeping motion. Result: a 4-note chord that sounds like 2 notes but feels *bigger* than a guitar dyad.\n\n## Why it matters\n\nBluegrass mandolin is built on double stops. You can fake a whole orchestra with tremolo + double stops. This is the instrument's superpower.\n\n## Drill\n\nPlay C (pair on G string fret 5) + E (pair on D string fret 2) simultaneously. Now slide up one fret on both. Now back down. That's a chord slide — one of the essential mandolin techniques.",
    drills: {
      teach: [
        { id: "t_pairs", heading: "Every 'string' is a pair", body: "This changes your mental model. You're not playing a 4-string instrument — you're playing an 8-string instrument. The 4 pairs are in unison (G & G) or octave (depending on the tuning). Strike one, get both." },
        { id: "t_sweep", heading: "Sweep, don't pluck individually", body: "To strike two pairs simultaneously, your pick sweeps across all 4 strings in one motion. One continuous down-stroke. If you pluck each pair individually, you get 2 separate events + a weaker chord." },
        { id: "t_pitfall", heading: "Don't mash the fret fingers", body: "Double stops require 2 fingers on different strings. If you mash, you accidentally touch adjacent pairs and mute them. Press with curved finger pads. Practice slow, clean, quiet." },
      ],
    },
    audioRefs: [
      { id: "demo_double_stop", label: "C + E double stop · clean" },
      { id: "demo_alternate", label: "Alternating between two double stops" },
    ],
  },
  mandolin_l2_03_tempo: {
    id: "mandolin_l2_03_tempo",
    title: "The chop · 2 and 4 on the mandolin",
    objectives: [
      "Play a muted strike on beats 2 and 4 through 16 bars",
      "Lock with the metronome at 100 bpm",
      "Feel the chop as rhythm, not just a strum",
    ],
    writtenContent:
      "## The chop · bluegrass backbone\n\nIn a bluegrass band, the mandolin's primary role is the *chop* — a muted strike on beats 2 and 4. It fills the role of a snare drum. The whole band relies on it.\n\n## Mechanics\n\n- Hold a chord shape (A, D, or G — pick one)\n- Strike the chord with a strong down-stroke\n- Immediately release fret-hand pressure (don't lift the fingers off; just reduce pressure)\n- The strings dampen; you get a *choked*, percussive 'chk'\n\n## Why it works\n\nIn a bluegrass band, the bass hits 1 and 3 (downbeats). The mandolin chops 2 and 4 (backbeats). Together they create a 'kick-snare-kick-snare' drum pattern without drums. Every chop mandolinist is a drummer.\n\n## The mistake that kills grooves\n\nBeginners play *too long* — they hold the chord ringing. The chop must be clipped, dead, percussive. If it sings even a 10th of a beat, it sounds like a chord — not a snare. Cut it short.",
    drills: {
      teach: [
        { id: "t_role", heading: "You are the drum", body: "When you chop, you're not playing a chord — you're playing a snare drum. This shift in *role* changes everything. Listen to your chop as percussion, not harmony. Pitch is secondary." },
        { id: "t_timing", heading: "Chop timing is ruthless", body: "The chop must land *exactly* on beats 2 and 4. Even 30ms off is audible as rushing or dragging. This is why mandolin players are obsessive about metronomes." },
        { id: "t_pitfall", heading: "Don't chop with ringing strings", body: "Release fret pressure *before* the pick hits. Otherwise you hear a half-second of chord ring before the mute kicks in. Synchronize: mute + strike happen in one motion." },
      ],
    },
    audioRefs: [
      { id: "demo_chop", label: "Chop pattern · G chord, beats 2+4, 100 bpm" },
      { id: "demo_in_context", label: "Chop with bass + guitar · full bluegrass feel" },
    ],
  },
  mandolin_l2_04_first_piece: {
    id: "mandolin_l2_04_first_piece",
    title: "'Soldier's Joy' · your first bluegrass tune",
    objectives: [
      "Play the A-part of Soldier's Joy (the first 8 bars)",
      "Use alternate picking throughout",
      "Maintain 100 bpm",
    ],
    writtenContent:
      "## The most-played fiddle tune ever · on mandolin\n\n'Soldier's Joy' is a fiddle tune from the late 1700s. It's been played every single day since. Every mandolinist learns it because (a) it's canonical, (b) it's in D major (easy), (c) it uses nearly every mandolin technique at entry level.\n\n## The form\n\nA-part (8 bars) + B-part (8 bars). A-part starts on D, climbs to A, comes back to D. B-part starts on D at a higher register, does the same climb.\n\nTraditional structure: AABB AABB (play each part twice, then both again). Tunes rarely go longer.\n\n## Tempo\n\nReal bluegrass Soldier's Joy is 120-140 bpm. For L2, target 100 bpm. Cleanness first. Every note distinct.\n\n## Why this tune\n\nBluegrass sessions happen weekly in most cities. When you attend one, the first tune will always be a standard — likely Soldier's Joy. Learning this = joining the conversation. You show up, you can play.",
    drills: {
      teach: [
        { id: "t_tradition", heading: "You're joining a 250-year conversation", body: "This tune has been played by millions of people across 250 years. When you play it, you're not inventing — you're *participating*. That weight is why traditional tunes feel different from pop — they're collective property." },
        { id: "t_AABB", heading: "The AABB form is everywhere", body: "95% of bluegrass + Celtic + old-time tunes are AABB structure. Learn to hear the A-part end + B-part begin. This musical literacy helps you follow tunes you've never heard in a session." },
        { id: "t_pitfall", heading: "Don't skip practicing slowly", body: "You'll want to play it at full tempo immediately. Resist. 60 bpm for a week. Then 80. Then 100. Each jump reveals sloppy spots the previous tempo hid." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Soldier's Joy A-part · 80 bpm" },
      { id: "demo_target", label: "Soldier's Joy AABB · 100 bpm full tune" },
      { id: "demo_pro", label: "Bill Monroe's recording (reference for feel)" },
    ],
  },
  mandolin_l3_01_first_song: {
    id: "mandolin_l3_01_first_song",
    title: "'Blackberry Blossom' · speed + articulation",
    objectives: [
      "Play Blackberry Blossom at 120 bpm",
      "Maintain alternate picking through the 16th-note runs",
      "Execute the characteristic triplets cleanly",
    ],
    writtenContent:
      "## The bluegrass mandolin anthem\n\n'Blackberry Blossom' is the test piece. If you can play it cleanly at 120 bpm, you're considered 'intermediate' in the bluegrass world. At 140+ you're 'advanced.' At 160 you're on a stage somewhere.\n\n## The form\n\nAABB like Soldier's Joy. Key of G. But the A-part is WHERE THE HARD PART IS — a descending run of 8 16th notes that tests alternate picking to its core.\n\n## The triplet\n\nBar 3-4 of the A-part has a characteristic triplet. Three notes in the time of two. It's tricky. Practice the triplet separately — just those 3 notes — 50 times before putting it in context.\n\n## The real goal\n\nClean at 120 BPM. Not 'close-ish' at 140. Find the tempo where every note is distinct + articulate, and camp there for a week before speeding up.",
    drills: {
      teach: [
        { id: "t_gateway", heading: "Blackberry Blossom is a threshold", body: "Learning this piece cleanly separates 'started mandolin' from 'plays mandolin.' It's your L3 → L4 gateway. Treat it accordingly — 4-6 weeks of daily practice is normal." },
        { id: "t_triplet", heading: "Triplets are rhythm, not speed", body: "Students play triplets too fast trying to 'fit them in.' Triplets are *specific* rhythms: 3 notes in the time of 2 quarter notes. Sing them: 'triplet · triplet.' Match the singing with your picking." },
        { id: "t_pitfall", heading: "Don't pick faster than you can hear", body: "At 120 bpm, 16th notes are 240 notes per minute. Your ear can distinguish notes up to about 600 nps. That means you should HEAR every note. If you can't tell how many notes you played, you're picking too fast for your ear." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Blackberry Blossom · 80 bpm" },
      { id: "demo_target", label: "Blackberry Blossom · 120 bpm" },
      { id: "demo_triplet", label: "Isolated triplet in slow mo" },
    ],
  },
  mandolin_l3_02_dynamics: {
    id: "mandolin_l3_02_dynamics",
    title: "Dynamics through pick attack",
    objectives: [
      "Play the same phrase at pp, mp, mf, f using only pick force",
      "Notice how pick angle affects both volume and timbre",
      "Alternate between dynamics within a single phrase",
    ],
    writtenContent:
      "## Mandolin dynamics live in your right hand\n\nMandolin volume comes from two things: how hard you hit, and where on the pick you strike. Both are pick-hand controls.\n\n## Pick technique\n\n- **Soft (pp)**: pick angled ~45° from strings, tip grazes the string\n- **Medium (mp-mf)**: pick perpendicular to strings, attacks directly\n- **Loud (f)**: pick angled opposite (-45°), digging into the string\n\n## The secondary effect: timbre\n\nPick angle changes not just volume but *tone color*. Soft = warmer, less harmonic content. Loud = brighter, more overtones. You're not just changing how loud — you're changing the instrument's voice.\n\n## The dynamics drill\n\nPlay the G scale at pp. Same scale at mp. Same scale at f. Record all three. The difference should be clear, not subtle. If the recordings sound similar, you're not yet using dynamic range — you're just playing mid-volume harder or softer.",
    drills: {
      teach: [
        { id: "t_angle", heading: "The pick angle is the volume knob", body: "New players think volume = arm force. Wrong. Volume = pick angle. Tilt 45° for quiet, -45° for loud. The physics: angled picks glance off strings (quiet); perpendicular picks transfer full energy (loud)." },
        { id: "t_timbre", heading: "Dynamics change timbre · use it", body: "Loud notes are brighter; soft notes are warmer. This isn't a bug, it's a feature. Use loud pick attack for climactic moments (bright, cutting), soft attack for intimate moments (warm, close)." },
        { id: "t_pitfall", heading: "Don't equate 'loud' with 'good'", body: "Beginners play loud default. Volume feels like commitment. But a song that's always loud is a song that's never actually intense — intensity requires contrast. Play soft 70% of the time. Save loud for when you mean it." },
      ],
    },
    audioRefs: [
      { id: "demo_pp", label: "Scale at pianissimo · whisper mandolin" },
      { id: "demo_f", label: "Scale at forte · mandolin full voice" },
      { id: "demo_range", label: "Same phrase at 4 dynamics" },
    ],
  },
  mandolin_l3_03_articulation: {
    id: "mandolin_l3_03_articulation",
    title: "Tremolo · the mandolin's sustained tone",
    objectives: [
      "Produce clean tremolo on a single note for 4 seconds",
      "Tremolo across two adjacent strings (double stop tremolo)",
      "Control tremolo speed — slower for ballads, faster for energy",
    ],
    writtenContent:
      "## Tremolo solves the mandolin's biggest problem\n\nMandolin notes decay fast. A plucked note is gone within 2 seconds. Every other instrument can sustain — piano pedals, bowed strings, wind instruments. Mandolin can't, unless you use tremolo.\n\n## What tremolo is\n\nRapid alternate picking on one (or two) strings. Instead of a single note event, you get 8-12 note events per second that the ear fuses into a *sustained tone*.\n\n## Physical technique\n\n- Grip the pick gently — loose enough that it bounces off strings\n- Move from the wrist, not the arm (arm = fast fatigue)\n- Target 6-10 strokes per second at first; work up to 12-16\n- Listen for evenness — every stroke should be equal volume\n\n## The real secret\n\nTremolo sounds *musical* when it's irregular. Perfectly even tremolo sounds mechanical. Great mandolinists add tiny accelerations and decelerations — the tremolo *breathes*. Learn the even tremolo first; then break it consciously.\n\n## Where you use it\n\nBallads. Long melodic notes. Chord holds. Any place you'd want a sustained tone but don't have one.",
    drills: {
      teach: [
        { id: "t_fusion", heading: "The ear fuses 8+ notes per second into 'a note'", body: "At 8 strokes/second, the gaps between notes are below the ear's temporal resolution. You stop hearing individual strokes and start hearing a sustained tone with a slight shimmer. That shimmer is the 'mandolin sound.'" },
        { id: "t_wrist", heading: "Wrist, not arm", body: "Arm tremolo looks like you're hitting a bongo with the pick — tires in 20 seconds. Wrist tremolo is like saying 'no no no no' with your hand — sustainable for minutes. Watch a Mandolin Orchestra concert — the wrist moves, arm stays still." },
        { id: "t_pitfall", heading: "Don't make it perfectly even", body: "Mechanical tremolo is robotic. Great tremolo has *micro-variation* — tiny speed fluctuations, slight volume waves. This is what makes classical mandolin orchestras sound warm. Master even first; then break it for musicality." },
      ],
    },
    audioRefs: [
      { id: "demo_basic", label: "Clean tremolo on one note · 4 seconds" },
      { id: "demo_double", label: "Tremolo across two-string double stop" },
      { id: "demo_song", label: "Tremolo in a ballad context" },
    ],
  },
  mandolin_l3_04_standard_cert: {
    id: "mandolin_l3_04_standard_cert",
    title: "Standard Cert · play Soldier's Joy through",
    objectives: [
      "AABB repeated (4 parts total) at 100 bpm, no stops",
      "Include chop on a bandmate's downbeats (or click)",
      "Apply dynamics at part boundaries",
    ],
    writtenContent:
      "## The bluegrass cert\n\nYour L3 standard cert for mandolin is a full Soldier's Joy. Two times through (AABB AABB). 100 bpm. Chops on beats 2 + 4. That's it.\n\n## What gets tested\n\n- Clean alternate picking through all 16 bars\n- Chops land on time, consistent volume\n- Dynamic contrast between repeats (play quieter second time, for example)\n- No stops, no restarts, smooth ending\n\n## The submission\n\nRecord yourself playing along with a metronome. The metronome is the jury — if you drift, the metronome shows it. Submit the best take from a week's worth of recordings.\n\n## The cert isn't the ceiling\n\nMost mandolinists play Soldier's Joy forever. It's the warmup tune at every session. Your L3 certified version becomes your *starting point* — you'll revisit this piece your entire musical life, each time playing it a little better than before.",
    drills: {
      teach: [
        { id: "t_repeats", heading: "AABB repeats with variation", body: "Playing the same part twice identically is boring. On repeats, change something — play quieter, add an ornament, change octave. Never bore the audience. Even your cert should show musical decisions." },
        { id: "t_chops", heading: "The chops are graded separately", body: "Your melody can be 70% and still pass if chops are 90%. In bluegrass, *rhythm* is the primary mandolin job. Hit your chops. The melody is the bonus." },
        { id: "t_pitfall", heading: "Don't rush the final bar", body: "Beginners speed up into the final bar out of nervous energy. The final bar should land with CALM confidence. Slightly slow down if anything. Finish strong, not fast." },
      ],
    },
    audioRefs: [
      { id: "demo_full", label: "Full Soldier's Joy with chops · 100 bpm" },
      { id: "demo_session", label: "Session-style Soldier's Joy (band context)" },
    ],
  },
  mandolin_l4_01_scale_two: {
    id: "mandolin_l4_01_scale_two",
    title: "A major scale · two octaves with position shift",
    objectives: [
      "Play A major from low A (open A) to A (fret 7 E string)",
      "Shift position smoothly mid-scale",
      "Alternate picking at 120 bpm",
    ],
    writtenContent:
      "## Your second scale\n\nA major after G major. You already know G; A is just one step higher — but it requires a *position shift* that G didn't. Get the shift clean, and you've added 60% more of the instrument's vocabulary.\n\n## Fingering\n\nOpen A (A string, thumb over) — B (A string fret 2) — C# (A string fret 4) — D (D string fret 0) — E (D string fret 2) — F# (D string fret 4) — **[position shift]** — G# (E string fret 4) — A (E string fret 5).\n\n## The shift\n\nYour whole hand moves a tiny amount between D string and E string. Your thumb slides forward, your fingers re-position. Most students make a tiny audible gap here. Don't. Practice the shift *silently* 20 times before incorporating it into the scale.\n\n## Why A major\n\nA is a classic bluegrass key alongside G. Every bluegrass session plays in G, A, or D. Knowing your scales in all 3 unlocks 80% of the repertoire.",
    drills: {
      teach: [
        { id: "t_shift", heading: "Position shifts are invisible when done right", body: "A perfect position shift has NO audible gap. The listener can't tell you moved your hand. This silence during the shift is what separates students from players." },
        { id: "t_silent", heading: "Practice the shift without strings", body: "Move your hand up + down the fretboard without touching strings. Feel the motion. Get it into muscle memory. Then add strings. The invisible-ness comes from the fact that your hand already 'knows' where to land." },
        { id: "t_pitfall", heading: "Don't visually check during shifts", body: "Students who look down during the shift = slow shifts. Your hand must find its target by *feel*. Eyes closed, play the scale. This is non-negotiable for speed work later." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "A major · 60 bpm" },
      { id: "demo_target", label: "A major · 120 bpm with clean shift" },
    ],
  },
  mandolin_l4_02_ornament: {
    id: "mandolin_l4_02_ornament",
    title: "Cross-picking · the thumbprint of advanced mandolin",
    objectives: [
      "Play a cross-picking pattern across three strings",
      "Use DOWN-DOWN-UP, not strict alternate",
      "Apply cross-picking to a real bluegrass phrase",
    ],
    writtenContent:
      "## Cross-picking is bluegrass mandolin's signature\n\nStrict alternate picking (down-up-down-up) works for single-string runs. But when a line spans three strings quickly, alternate picking forces your hand to reset direction too often — slow, scratchy.\n\nCross-picking uses a specific pattern — usually DOWN-DOWN-UP or DOWN-UP-UP — that matches the geometry of crossing strings.\n\n## Pattern: DOWN-DOWN-UP\n\n- DOWN on string 1\n- DOWN on string 2 (pick swept across)\n- UP back to string 1\n- Repeat\n\nThe arm makes a circular motion. Smoother than alternating for cross-string work.\n\n## Where you hear this\n\nBill Monroe, David Grisman, Chris Thile. Every single bluegrass solo. Listen for the liquid triplet-feel; that's cross-picking.\n\n## The learning curve\n\nExpect 2-3 weeks of feeling awkward. Your pick hand rebels against the new pattern. Then suddenly it clicks, and you wonder how you ever played alternating cross-string passages without it.",
    drills: {
      teach: [
        { id: "t_geometry", heading: "Pick patterns match string geometry", body: "Strict alternate picking works on one string. Cross-picking works on 2-3 strings. The pattern MATCHES the motion — that's why it's smoother. Learning both = knowing which to use when." },
        { id: "t_triplet", heading: "Cross-picking creates the 'triplet feel'", body: "Even when playing 16th notes, cross-picking produces a slight triplet shuffle because of the DOWN-DOWN-UP grouping. This is the 'bluegrass swing.' It's not written; it's produced by the picking pattern." },
        { id: "t_pitfall", heading: "Don't force alternate where cross-picking fits", body: "Your pick will tell you which works better. If alternate picking feels labored and slow on a passage, try cross-picking. Often the problem isn't technique — it's the wrong pattern for that line." },
      ],
    },
    audioRefs: [
      { id: "demo_cross", label: "Cross-picking pattern · DDU across G-D-A strings" },
      { id: "demo_phrase", label: "Cross-picked phrase in a bluegrass context" },
    ],
  },
  mandolin_l4_03_rep_1: {
    id: "mandolin_l4_03_rep_1",
    title: "Intermediate rep · 'Salt Creek' (Monroe-style)",
    objectives: [
      "Play the full A-part of Salt Creek at 130 bpm",
      "Incorporate cross-picking on the triple-string phrases",
      "Land the characteristic 'double stop hit' in bar 4",
    ],
    writtenContent:
      "## Bill Monroe's anthem\n\n'Salt Creek' is Bill Monroe's own composition — the founder of bluegrass mandolin. Playing Salt Creek well is a statement: 'I know where this music comes from.'\n\n## The distinctive feature\n\nBar 4 has a signature double-stop hit — two strings at once, crashing down — that gives the tune its character. Most covers play this as two separate notes. Monroe hit them simultaneously. That *impact* is the soul of the tune.\n\n## Cross-picking opportunity\n\nBars 6-7 have a three-string descending line. Perfect for cross-picking (last lesson's technique). Apply it here — your tune will sound 3x more fluid than a student using strict alternate.\n\n## Tempo\n\nMonroe played Salt Creek at 130-140 bpm consistently. Your L4 target is 130. Once there, push toward 140.\n\n## Why this piece matters\n\nSalt Creek is the gateway to intermediate bluegrass mandolin. Play it at tempo cleanly + you can walk into any bluegrass jam and fit in. Can't play it + you're still in the beginner room.",
    drills: {
      teach: [
        { id: "t_monroe", heading: "Monroe is the source", body: "Every modern bluegrass mandolinist plays some fraction of Monroe's vocabulary. You should know his recordings. Listen to his 1958 Decca recordings — especially Salt Creek — before you touch the mandolin. Style transfers through listening more than through score reading." },
        { id: "t_double_stop", heading: "The crash is the point", body: "In bar 4, don't sanitize the double-stop hit. Dig into the strings. Let it ring. The whole tune builds toward this moment. Beginners try to make it 'clean'; Monroe made it *mean* something." },
        { id: "t_pitfall", heading: "Don't rush the tempo", body: "130 bpm clean beats 150 bpm sloppy every time. At 130, your listeners hear every note; at 150 it becomes a blur, and what was interesting melody becomes generic fast-playing." },
      ],
    },
    audioRefs: [
      { id: "demo_monroe", label: "Bill Monroe's Salt Creek (reference)" },
      { id: "demo_student", label: "Student-ready Salt Creek · 130 bpm" },
    ],
  },
  mandolin_l4_04_practice_rout: {
    id: "mandolin_l4_04_practice_rout",
    title: "25-minute mandolin routine",
    objectives: [
      "Structure: warm-up · tremolo · scale · rep · creative",
      "Daily for 14 days",
      "Track tempo growth on a single scale weekly",
    ],
    writtenContent:
      "## Mandolin practice is about stamina\n\nMandolin hands tire fast — fret hand from tight spacing, pick hand from rapid movement. A 25-minute block pushes you to practice longer than comfortable, which is where real technique develops.\n\n## The block\n\n- **0-3**: Warm-up. Slow scales with metronome off.\n- **3-8**: Tremolo. 4-second sustains on every note of a chord.\n- **8-13**: Scale work with metronome. Track your top tempo.\n- **13-20**: Current repertoire. Slow work on hardest passages.\n- **20-25**: Free play. Improvise over a backing track. Try new chord shapes.\n\n## The tempo journal\n\nOnce per week, test your top tempo on the G major scale. Record it. After 4 weeks you'll see measurable improvement. This turns 'am I getting better?' anxiety into visible progress data.\n\n## The most-skipped block\n\nTremolo (minutes 3-8). It feels pointless — same note over and over. It's the single most important mandolin skill. Don't skip it.",
    drills: {
      teach: [
        { id: "t_stamina", heading: "Mandolin exhausts hands · train for it", body: "Fiddle tunes are 5 minutes continuous playing. If your hands can't sustain 25 minutes of practice, they can't sustain 5 minutes of performance. Build stamina gradually." },
        { id: "t_tempo_journal", heading: "Journal your tempo weekly", body: "'Am I improving?' feels impossible to know week-to-week. A tempo journal removes the anxiety. You SEE your max-clean-bpm increase from 100 to 112 to 125. Quantified progress is motivating." },
        { id: "t_pitfall", heading: "Don't skip tremolo", body: "Tremolo is the mandolin skill that improves EVERYTHING else — pick hand control, endurance, tone. 5 minutes daily for a year + you're an intermediate mandolinist. 0 minutes daily + you plateau." },
      ],
    },
    audioRefs: [
      { id: "demo_warmup", label: "3-minute mandolin warm-up" },
      { id: "demo_tremolo", label: "Tremolo session example" },
    ],
  },
};
