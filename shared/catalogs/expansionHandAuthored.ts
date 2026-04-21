/**
 * Hand-authored overrides for expansion-instrument L2-L3 lessons.
 *
 * The programmatic generator in `expansionContent.ts` produces the
 * skeleton so all 14 expansion instruments have navigable L2-L9 arcs
 * from day one. This file selectively *overrides* the skeleton with
 * real pedagogy for the handful of instruments beginners pick most
 * (bass, ukulele, bansuri, saxophone). Each entry ships with:
 *   - meaningful writtenContent (200-400 chars of real teaching)
 *   - 3 hand-authored teach drill points (concept / technique / pitfall)
 *   - richer audioRefs metadata (so the audio-upload sprint can fill
 *     URLs in by label)
 *
 * Merge happens in lessonCatalog.ts *after* the generator runs, so
 * these writes win.
 */

import type { Lesson } from "./types";

export const HAND_AUTHORED_EXPANSION_LESSONS: Record<string, Partial<Lesson> & Pick<Lesson, "id">> = {
  // ─── Bass L2-L3 ─────────────────────────────────────────────────
  bass_l2_01_scale: {
    id: "bass_l2_01_scale",
    title: "E major scale · one-octave walk",
    objectives: [
      "Play the E major scale from open E to E (first fret, fourth string)",
      "Use 1-2-4 fingering on the thickest two strings, 1-3-4 on the thinner pair",
      "Keep every note the same volume — that's the bass player's discipline",
    ],
    writtenContent:
      "## The bass player's first scale\n\nE major on bass is *the* fundamental scale — it covers the open strings on all four strings + adds fretted notes. You'll use this shape everywhere: blues, rock, funk, jazz walking lines.\n\n## Fingering\n\n- Thick strings (E, A): index · middle · pinky (skip the ring finger — it's harder to stretch)\n- Thin strings (D, G): index · ring · pinky\n\nDon't mash. Bass strings are thick but they respond to *accuracy*, not force. If your note buzzes, you're not quite behind the fret — slide forward a millimeter, don't press harder.\n\n## The bass test\n\nRecord yourself walking up + down the scale. Listen back: are all 15 notes the same volume? If the thick E's boom and the G's whisper, your plucking fingers are working unevenly — the most common beginner-bass problem.",
    drills: {
      teach: [
        {
          id: "t_why",
          heading: "Why the E major scale",
          body: "Every bass line in rock, blues, reggae, and 40% of pop sits in E. Master this scale + you can find the root of most songs you'd want to jam along to. It's not a bass *exercise* — it's the bass vocabulary.",
        },
        {
          id: "t_fingering",
          heading: "Fingering economy",
          body: "Your pinky is weak. Train it from day one. On thick strings the pinky handles anything past fret 2; on thin strings you can use the ring finger for comfort but aim to eventually play 1-3-4 with the pinky on all strings. Conservatory bassists use the pinky on everything.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: volume imbalance",
          body: "Beginners pluck thick strings hard (to hear them) and thin strings softly (they're already bright). Flip it: pluck thick strings *gently* and thin strings *firmly*. The bass amp does the heavy-lifting; your job is even tone.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "E major scale · 60 bpm slow reference" },
      { id: "demo_target", label: "E major scale · 100 bpm target" },
      { id: "demo_walking", label: "How this scale sounds in a walking bass line" },
    ],
  },

  bass_l3_01_first_song: {
    id: "bass_l3_01_first_song",
    title: "Your first bass line — 'Seven Nation Army' riff",
    objectives: [
      "Play the E-G-B-A-B-A-G riff at tempo (124 bpm)",
      "Land every note on the beat",
      "Keep the pulse driving — bass carries the groove",
    ],
    writtenContent:
      "## The riff every bassist plays first\n\nThe White Stripes' 'Seven Nation Army' is technically a guitar line, but it's been adopted by every bassist on earth because it teaches you what a groove *feels like*. Seven notes. 2 bars. Dead simple.\n\n## The notes\n\nE · E · G · E · D · C · B (then back to E). All on the A string + E string, below fret 7.\n\n## Why this teaches you bass\n\nRock solid pulse. If you rush even one note, the groove collapses. You'll discover — maybe for the first time in your life — that *timing* is a skill, separate from pitch. This is why bassists are obsessed with the metronome.\n\n## Practice pointer\n\nRecord yourself playing along with the actual song. Listen back. If your bass is ahead of the kick drum by even 30ms, you sound rushed. 30ms behind and you sound sluggish. The pocket is ±10ms from the kick. That's tight but achievable.",
    drills: {
      teach: [
        {
          id: "t_groove",
          heading: "What 'groove' actually means",
          body: "Groove isn't loud or fast. Groove is the micro-placement of notes relative to a pulse. Behind the beat = lazy, relaxed. On the beat = tight, rock-solid. Ahead of the beat = pushing, urgent. Bass players live in the on-to-slightly-behind zone. Never ahead.",
        },
        {
          id: "t_pocket",
          heading: "Finding the pocket",
          body: "Play along to the song with the bass turned DOWN (monitor it low). Feel the kick drum. Your bass note should *lock* with the kick — not respond to it, not lead it, but sit *on top of it*. When you can feel your note and the kick as one event, you're in the pocket.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: wandering intonation",
          body: "Even on a fretted instrument, bassists drift sharp on the 3rd + 7th degree (G, D in E major). The frets handle pitch, but finger pressure behind the fret pushes the string slightly — especially on thick strings. Press *lightly*. Let the fret do the work.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_riff", label: "Seven Nation Army riff · 124 bpm clean" },
      { id: "demo_pocket", label: "Same riff locked with drums · pocket example" },
    ],
  },

  // ─── Ukulele L2-L3 ──────────────────────────────────────────────
  ukulele_l2_01_scale: {
    id: "ukulele_l2_01_scale",
    title: "C major scale on ukulele",
    objectives: [
      "Play C major scale starting on open C (3rd string)",
      "Use index + middle for most notes, pinky for the high F",
      "Say each note name as you play",
    ],
    writtenContent:
      "## Ukulele's home key\n\nC major is the ukulele's native tongue — the open strings (G-C-E-A, re-entrant tuning) are literally built around it. This scale will feel easier than it should. Good. Let it.\n\n## Fingering\n\nThe pattern crosses 3 strings. Open C → E → F → G on the C string. Then A → B → C on the E string. Then D → E on the A string. You'll naturally use the index for fret 1 + 2, pinky for fret 3.\n\n## The re-entrant trap\n\nUkulele's G string is tuned HIGH, not low — above the C string. This is called 're-entrant tuning.' When you play the scale, your ear expects the low note to be below the middle note, but on uke it's *above*. Beginners find this confusing; after a week it becomes the instrument's charm.\n\n## Say the names out loud\n\nC-D-E-F-G-A-B-C. Every ukulele player I've known who can improvise started by saying notes aloud while playing. Mute trainees plateau faster.",
    drills: {
      teach: [
        {
          id: "t_key",
          heading: "Why the uke loves C",
          body: "C is the easiest key on any instrument where the open strings are tuned to it. Piano's easiest key? C (no black keys). Uke's easiest? C. When you're figuring out a song on ukulele, try it in C first — 70% of the time you'll find the version that works.",
        },
        {
          id: "t_reentrant",
          heading: "Re-entrant tuning · the quirk",
          body: "The G string is higher than the C string. This makes chord voicings on ukulele sound bright + shimmery (there's no deep bass note holding them down). It also means scales feel 'upside down' for a few days. This is normal. Don't fight it.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: pinky avoidance",
          body: "Almost every new ukulele player uses only 3 fingers and contorts to reach fret 3 notes. Use your pinky. It's weak on day one, it's 70% as strong as your index by day 30, and it's essential for chord changes above fret 5.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "C major scale · slow" },
      { id: "demo_song", label: "How this scale appears in 'Somewhere Over the Rainbow'" },
    ],
  },

  // ─── Bansuri L2-L3 ──────────────────────────────────────────────
  bansuri_l2_01_scale: {
    id: "bansuri_l2_01_scale",
    title: "Sargam · Sa Re Ga Ma Pa Dha Ni Sa on bansuri",
    objectives: [
      "Play full sargam (all 7 svaras + upper Sa)",
      "Use half-holes for the microtonal svaras if needed",
      "Hold each svara for 4 beats — establish intonation before moving on",
    ],
    writtenContent:
      "## Bansuri speaks in sargam\n\nWestern scales name C-D-E-F-G. Hindustani names Sa-Re-Ga-Ma-Pa-Dha-Ni. Same seven-note scale, different names — but the names carry *meaning*. Sa is 'home.' Re is the 'departure.' Pa is the 'dominant tension.' You're not playing notes — you're saying words.\n\n## Finger-hole technique\n\nBansuri has 6 holes (the small 7th hole isn't fingered). Cover holes completely — partial coverage creates unintentional microtones. Work hole-by-hole:\n- All 6 covered → Sa (lowest)\n- Lift pinky → Re\n- Lift ring → Ga\n- Lift middle → Ma\n- Lift index → Pa\n- Top three fingers off → Dha, Ni, Sa' (upper)\n\n## Breath control is the technique\n\nBansuri isn't about fingering; it's about *breath*. Each svara needs consistent air pressure. If Sa is loud + Ni is weak, your breath is the issue, not the finger. Practice sustaining a single Sa for 30 seconds. That's the foundation.\n\n## The pitfall\n\nNew bansuri players blow *harder* on high notes. Wrong. Blow *faster* (narrower lip aperture, same volume). The embouchure for Sa' is tight + focused, not louder.",
    drills: {
      teach: [
        {
          id: "t_sargam",
          heading: "Why sargam, not do-re-mi",
          body: "Sargam is the vocabulary of Hindustani music. You can sing a raga in sargam (this is called 'sargam singing') and have it be a complete musical statement. Western do-re-mi is purely pedagogical. Sargam is performance-grade.",
        },
        {
          id: "t_breath",
          heading: "Breath is 80% of bansuri technique",
          body: "A student with great fingers + bad breath sounds terrible. A student with mediocre fingers + great breath sounds beautiful. Spend the first 3 months of bansuri study on breath: sustained Sa, crescendo/decrescendo on a single note, phrasing within one breath. Fingers can wait.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: over-blowing high notes",
          body: "The upper octave (Sa' and above) needs faster air, not stronger. Think of blowing out a candle from farther away — narrow the lip, don't pump harder. You'll hear yourself stop squeaking almost immediately.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Sargam · Sa to Sa' slow, vilambit" },
      { id: "demo_full", label: "Sargam with andolan on each note" },
    ],
  },

  // ─── Saxophone L2-L3 ────────────────────────────────────────────
  saxophone_l2_01_scale: {
    id: "saxophone_l2_01_scale",
    title: "Concert F (sax Bb) major scale — low to high",
    objectives: [
      "Play the F major scale across the middle register (low F to F above)",
      "Keep embouchure relaxed — looser than you think",
      "Control dynamics: every note the same volume, no swelling",
    ],
    writtenContent:
      "## The saxophone's home key\n\nAlto sax in Eb reads F major as 'D major' on the page. Tenor sax in Bb reads it as 'G major.' Concert-pitch musicians call it F. You're playing the same *sound* regardless of which sax you picked up — welcome to the most confusing naming convention in music.\n\n## Scale pattern\n\nStart on low F (index + middle + ring fingers on the left hand, plus octave key off). Walk up: G-A-Bb-C-D-E-F. Each note has a specific fingering — don't guess, look up the chart, memorize one fingering per day.\n\n## Embouchure relaxation\n\nEveryone bites down too hard at first. Your embouchure should be as relaxed as if you're pronouncing 'Vvvvv.' If your lower lip is sore after 20 minutes, you're biting. Relax. The reed does the work.\n\n## The dynamic test\n\nPlay the scale 8 times, trying to make every single note identical in volume. Record it. Listen back. You'll discover that low notes tend to pop loud and high notes tend to thin out. Fight both tendencies deliberately.\n\n## When to use vibrato\n\n*Not yet.* Master clean, vibrato-less tone first. Vibrato is a Pro-tier ornament. At L2, your goal is *boring, beautiful, consistent tone*.",
    drills: {
      teach: [
        {
          id: "t_transposition",
          heading: "The sax transposition trap",
          body: "If someone tells you 'play it in F,' they might mean (a) concert F, (b) the sax's F (which sounds Ab on alto, Eb on tenor), or (c) the written F on your score. Always ask: concert or written? For the first year, stay with your teacher's language. Don't try to figure it out yourself; you'll tie yourself in knots.",
        },
        {
          id: "t_embouchure",
          heading: "The 'Vvvvv' test",
          body: "Pronounce 'Vvvvv' slowly. Feel how your lower lip rests against your teeth, not pressing? That's your saxophone embouchure. When you put the mouthpiece in, keep that exact tension — don't add pressure. Students who bite can't play past 10 minutes without fatigue.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: swelling into notes",
          body: "New sax players crescendo involuntarily into every note because blowing harder feels like 'expressing.' It isn't — it's distracting. Boring scales with flat dynamics are a sign of real control. Save the dynamics for when you're playing a melody, not a scale.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "F major scale · slow reference (concert pitch)" },
      { id: "demo_target", label: "F major scale · target tempo, flat dynamics" },
      { id: "demo_bad", label: "How this sounds when you bite the reed (wrong example)" },
    ],
  },

  // ─── Cello L2-L3 ────────────────────────────────────────────────
  cello_l2_01_scale: {
    id: "cello_l2_01_scale",
    title: "D major scale · first position",
    objectives: [
      "Play D major scale on the D string (open D through D on the A string)",
      "Keep the bow perpendicular to the strings",
      "Intonation: the scale is fretless — trust your ear more than your eyes",
    ],
    writtenContent:
      "## The cellist's first scale\n\nD major in first position is cello's fundamental. Two whole octaves, mostly on the D + A strings, using fingers 1-2-3-4.\n\n## Fingering (first position)\n\nD (open) · E (finger 1 on D) · F# (finger 3) · G (finger 4)\nA (open) · B (finger 1 on A) · C# (finger 3) · D (finger 4)\n\nThe missing notes (the 'half-step' tones) come from half-step fingering — 1 is half a whole-step, so F# requires finger 3 because F natural is at finger 1+close.\n\n## Bow mechanics\n\nKeep the bow parallel to the bridge, NOT to the fingerboard. Most beginners let the bow drift — watch in a mirror. Draw the full length of the bow, hair flat on the string, weight from the elbow (not the wrist).\n\n## Intonation is ear-first, eye-second\n\nCello is fretless. There's no visual marker for 'here's D' on a string. Your ear learns where D lives. Practice with a drone (hum the tonic through headphones) — your ear will correct your finger within a week.\n\n## The patience threshold\n\nDaily cello practice for 2-3 weeks before intonation clicks. That's normal. Don't quit at week 2.",
    drills: {
      teach: [
        {
          id: "t_fretless",
          heading: "Fretless is the feature, not the bug",
          body: "The same thing that makes cello hard (no frets) makes it expressive. Singers have no frets either. Violins have no frets. Real musical expression *requires* microtonal adjustment — fretless instruments make it native.",
        },
        {
          id: "t_bow",
          heading: "Bow = speech, left hand = pitch",
          body: "Your right hand (bow) controls volume, articulation, phrasing, tone color. Your left hand (fingers) controls *only* pitch. Students who think the left hand is 'primary' build bad habits. Start every practice day with 5 minutes of open-string bow exercises — no fingers, just bow control.",
        },
        {
          id: "t_pitfall",
          heading: "Common mistake: gripping the neck",
          body: "If your thumb aches after 20 minutes, you're squeezing the neck between thumb + fingers. The thumb should rest *lightly* on the back of the neck as a pivot, not a clamp. Imagine you're holding a small bird — firm enough not to drop it, gentle enough not to crush it.",
        },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "D major scale · slow reference" },
      { id: "demo_with_drone", label: "Same scale with D drone underneath (intonation training)" },
    ],
  },
};
