/**
 * Hand-authored L5-L9 overrides · fretted advanced expansion:
 * bass · ukulele · mandolin.
 *
 * Pro-tier through Genius-tier content. L5-L6 = Pro repertoire +
 * advanced technique. L7-L9 = concert-level mastery, original
 * composition, teaching readiness.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const FRETTED_ADVANCED_OVERRIDES: Record<string, Patch> = {
  // ═══ BASS · L5 ═══
  bass_l5_01_harmony: {
    id: "bass_l5_01_harmony",
    title: "Walking bass over a ii-V-I in F · jazz harmony",
    objectives: [
      "Outline Gm7 - C7 - Fmaj7 with a chromatic walking line",
      "Land the chord-tone on every downbeat",
      "Maintain swing eighth feel at 110 bpm",
    ],
    writtenContent:
      "## Bass = the harmonic floor\n\nA walking line is more than rhythm — it *spells the chord* note by note. Over Gm7, you outline G B♭ D F. Over C7, C E G B♭. Over Fmaj7, F A C E. Each downbeat is a chord tone; the off-beats are passing tones.\n\n## The chromatic approach\n\nThe last note before each chord change should sit a half-step above or below the next root. Heading from Gm7 to C7? End on D♭ or B. The ear *predicts* C7 before it arrives. That's a Ray Brown fingerprint.\n\n## Why ii-V-I matters\n\n70% of jazz standards are built on ii-V-I motion. Master this one progression and you can fake your way through a Real Book session.",
    drills: {
      teach: [
        { id: "t_why", heading: "Chord tones on downbeats", body: "If the listener can hum the chord by hearing only your bass line, you've succeeded. Beats 1 and 3 are sacred — root, third, fifth, or seventh, never an off-color note." },
        { id: "t_shape", heading: "Approach notes are the spice", body: "Beats 2 and 4 are where you sneak in chromatic passing notes — half-step approaches, scale fragments. They make the line feel inevitable rather than mechanical." },
        { id: "t_pitfall", heading: "Common mistake: roots-only walks", body: "A line that hits the root four times per chord is technically correct and emotionally dead. Vary the chord tone you start each bar on; ascend through one bar, descend through the next." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Walking ii-V-I in F · 80 bpm with chord pad" },
      { id: "demo_target", label: "Same line at 110 bpm swing" },
      { id: "demo_ray_brown", label: "Ray Brown reference fragment · 'Satin Doll'" },
    ],
  },
  bass_l5_02_fast: {
    id: "bass_l5_02_fast",
    title: "16th-note funk run · 120 bpm pocket",
    objectives: [
      "Play 16 consecutive 16th notes cleanly at 120 bpm",
      "Use index-middle alternating fingers — no rushing",
      "Mute open strings with the floating thumb",
    ],
    writtenContent:
      "## 16ths are where pluck-hand technique gets exposed\n\nAt 120 bpm, each 16th note is 125 ms apart. Your two fingers must alternate perfectly — index-middle-index-middle — or you'll hear an uneven stutter. This is Bernard Edwards (Chic) territory; this is 'Good Times.'\n\n## The pocket\n\nA 16-beat run isn't a flurry — it's a *groove*. Every note has the same volume, the same length, the same attack. Even 5% velocity variation between fingers will make the line sound amateur.\n\n## Floating thumb mute\n\nWhile your two fingers pluck, your plucking thumb rests on the lower strings to mute their sympathetic ringing. Without it, every E on the A string sets the open E string vibrating — a low rumble that muddies the take.",
    drills: {
      teach: [
        { id: "t_why", heading: "Why 120 specifically", body: "120 bpm is the disco/funk reference tempo. Master this and 'Get Lucky', 'Le Freak', and half the Marcus Miller catalog open up. It's also fast enough to expose finger-alternation flaws." },
        { id: "t_shape", heading: "Index-middle, never two-of-the-same", body: "Two consecutive plucks on the same finger guarantees a velocity bump. Train your hand to refuse it. If you mess up the pattern, restart — don't compensate by doubling a finger." },
        { id: "t_pitfall", heading: "Common mistake: tension creep", body: "By bar 8, beginners are gripping the bass like it might escape. Tension stops blood flow to your fingers; speed collapses. Reset shoulders + jaw every 4 bars." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "16-beat funk run · 80 bpm slow practice" },
      { id: "demo_target", label: "Same run at 120 bpm pocket" },
      { id: "demo_floating_thumb", label: "Isolated floating thumb mute technique" },
    ],
  },
  bass_l5_03_improv_1: {
    id: "bass_l5_03_improv_1",
    title: "4-bar improvisation over a blues turnaround",
    objectives: [
      "Improvise 4 bars over a I-VI-ii-V turnaround in B♭",
      "Use only chord tones + the blues scale",
      "Land beat 1 of bar 5 cleanly on the tonic",
    ],
    writtenContent:
      "## Improvisation is composition in real time\n\n4 bars is enough to say something. Open with a question (rising line, ends unresolved), answer with a statement (descending line, lands on the root). That's call-and-response, the architecture of every great solo.\n\n## The turnaround\n\nB♭ - Gm - Cm - F7 - back to B♭. Eight beats per bar, four bars total. Your improvisation must outline each chord *and* tell a story across the whole 4 bars.\n\n## The B♭ blues scale\n\nB♭ D♭ E♭ E F A♭ B♭. Six tension notes for a sad-sweet bass voice. Use them sparingly — chord tones are home, blue notes are vacation.",
    drills: {
      teach: [
        { id: "t_why", heading: "Improvisation is editing, not invention", body: "You don't invent every note from scratch. You play a phrase you've practiced 100 times, then alter one note. Then alter the rhythm. That's how Jaco Pastorius improvised — vocabulary first, edits second." },
        { id: "t_shape", heading: "Question + answer architecture", body: "Bars 1-2 ask. Bars 3-4 answer. The question rises and stays open; the answer descends and resolves. If your 4 bars don't have this shape, they're meandering — not improvising." },
        { id: "t_pitfall", heading: "Common mistake: too many notes", body: "Beginner improvisers fill every beat. Pros leave space. Aim for 8-12 notes across 4 bars on your first try, not 32. Silence is content." },
      ],
    },
    audioRefs: [
      { id: "demo_call_response", label: "4-bar improv example · Q+A shape" },
      { id: "demo_chord_pad", label: "B♭ turnaround chord pad · 90 bpm for practice" },
      { id: "demo_jaco", label: "Jaco-inspired chromatic walk reference" },
    ],
  },
  bass_l5_04_rep_2: {
    id: "bass_l5_04_rep_2",
    title: "'Come Together' · Lennon/McCartney · full 32-bar bass line",
    objectives: [
      "Play the entire 32-bar verse-chorus form without stops",
      "Capture Paul McCartney's hammer-on slide into bar 1",
      "Maintain the swampy half-time feel throughout",
    ],
    writtenContent:
      "## Why this song, why now\n\nPaul McCartney's bass line on 'Come Together' is one of the most quoted in rock history. It's syncopated, melodic, and built around a repeating riff that becomes hypnotic across 32 bars. If you can play this clean, you can play any classic-rock bass.\n\n## The signature lick\n\nDm7 base. The riff: D - D - F - G - G♭ - F - D, with a hammer-on slide between the G and F. The slide is *the song* — without it, the line sounds like a transcription. With it, it sounds like McCartney.\n\n## Form\n\nIntro (4 bars riff alone), Verse (8), Chorus (8), Verse (8), Chorus (4). 32 bars. No skipping, no restarting. The cert is the full 32, in time, with feel.",
    drills: {
      teach: [
        { id: "t_why", heading: "32 bars exposes endurance", body: "Anyone can play a 4-bar riff. 32 bars asks whether your hand stays relaxed, whether your time holds, whether your dynamics shift between verse and chorus. This is professional ground." },
        { id: "t_shape", heading: "The slide *is* the song", body: "Listen to McCartney's recording 5 times before you play. The G-to-F slide on each riff iteration is the soul of the song. A clean execution without the slide is a wrong execution." },
        { id: "t_pitfall", heading: "Common mistake: rushing the chorus", body: "The chorus opens up harmonically — new chords, more space. Beginners panic and rush. The tempo doesn't change; only the harmony does. Hold the click." },
      ],
    },
    audioRefs: [
      { id: "demo_riff", label: "Come Together · main riff isolated · 80 bpm" },
      { id: "demo_full", label: "Full 32-bar bass line · target tempo" },
      { id: "demo_mccartney", label: "Original recording reference · McCartney's tone" },
    ],
  },

  // ═══ BASS · L6 ═══
  bass_l6_01_adv_tech: {
    id: "bass_l6_01_adv_tech",
    title: "Slap and pop · Larry Graham technique",
    objectives: [
      "Slap with the side of the thumb on the E string",
      "Pop the G string with the index finger",
      "Combine slap-pop in a 4-bar funk pattern",
    ],
    writtenContent:
      "## Slap bass · the funk weapon\n\nLarry Graham (Sly & The Family Stone) invented slap because he didn't have a drummer. The thumb hits the low strings (kick drum); the index pops the high strings (snare). One bassist, one drum kit.\n\n## Thumb mechanics\n\nRotate from the wrist, not the elbow. Side of the thumb hits the E string at the end of the fretboard, bouncing immediately off so the string vibrates against the fret (the percussive 'slap' sound).\n\n## Pop mechanics\n\nIndex finger hooks under the G string, pulls outward, releases. The string snaps back against the fretboard with a sharp 'pop.' Combined: slap-pop is a kick-snare conversation — Marcus Miller, Flea, Victor Wooten built careers on it.",
    drills: {
      teach: [
        { id: "t_why", heading: "Slap is rotation, not force", body: "Beginners try to slap by hitting harder. Wrong — they end up bruised. Slap by rotating the wrist quickly; the thumb should bounce off the string like a drumstick off a snare." },
        { id: "t_shape", heading: "Pop with hook, not pull", body: "Don't yank the string upward. Hook your index under it; let the string release itself when you straighten the finger. This is wrist motion, not bicep motion." },
        { id: "t_pitfall", heading: "Common mistake: slapping too hard", body: "Hard slap = fret buzz, broken strings, sore thumb, and ironically *less* tone. Light, fast, repeated slaps — like Flea on 'Higher Ground' — produce the cleanest sound." },
      ],
    },
    audioRefs: [
      { id: "demo_slap", label: "Isolated slap on E string · 60 bpm" },
      { id: "demo_pop", label: "Isolated pop on G string · 60 bpm" },
      { id: "demo_combined", label: "4-bar slap-pop pattern · Flea-style funk" },
    ],
  },
  bass_l6_02_rep_3: {
    id: "bass_l6_02_rep_3",
    title: "'Teen Town' · Jaco Pastorius · the Pro-tier proof",
    objectives: [
      "Play the opening 16-bar head of Jaco's 'Teen Town'",
      "Execute 16th-note runs with consistent tone across all four strings",
      "Use ghost notes to keep the groove between chord stabs",
    ],
    writtenContent:
      "## The bass line that changed everything\n\nJaco Pastorius's 'Teen Town' (Weather Report, 1977) raised the ceiling for what bass could do. The melody is on the bass — fast, chromatic, articulated. Mastering even the first 16 bars puts you at upper-Pro level.\n\n## What makes it hard\n\n- 16th-note speed at 120 bpm with chromatic passing tones\n- Range spanning E1 to D4 (every fret matters)\n- Ghost notes (muted plucks for percussion) interleaved with pitched notes\n- A *singing* tone despite the speed\n\n## The Jaco approach\n\nFingers stay relaxed; pluck near the bridge for definition; mute aggressively with the fret hand. Slow practice (60 bpm) is mandatory for at least 2 weeks before attempting target tempo.",
    drills: {
      teach: [
        { id: "t_why", heading: "Why 'Teen Town' is the proof", body: "It demands every Pro-tier skill simultaneously: speed, ghost notes, range, articulation, swing feel. Anyone who can play the head plays bass at a serious level. This is the audition piece." },
        { id: "t_shape", heading: "Ghost notes are the groove", body: "The ghost notes (the muted 'tcch' between pitched notes) are what make Jaco's lines feel alive. Without them, even the right pitches sound robotic. Practice ghost-note patterns before the actual notes." },
        { id: "t_pitfall", heading: "Common mistake: starting at full tempo", body: "60 bpm for 2 weeks. 80 bpm for 1 week. 100 bpm for 1 week. Then 120. Don't skip stages — every tempo reveals different sloppy spots." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Teen Town head · 60 bpm slow practice" },
      { id: "demo_target", label: "Teen Town head · 120 bpm target tempo" },
      { id: "demo_jaco", label: "Original Weather Report recording reference" },
    ],
  },
  bass_l6_03_duet: {
    id: "bass_l6_03_duet",
    title: "Bass + drums duet · the rhythm section",
    objectives: [
      "Lock with a drum loop for 32 bars without drift",
      "Hit the kick drum on every downbeat",
      "Leave space — let the drums breathe",
    ],
    writtenContent:
      "## Bass and drums = one instrument\n\nIn every band, the rhythm section is one organism. The bass and kick drum hit together on beats 1 and 3; the bass and snare interact on 2 and 4. When this conversation locks, the band 'sounds tight.' When it doesn't, no amount of melody fixes it.\n\n## The kick lock\n\nEvery time the kick hits, your bass note begins. Not before, not after — *with*. This is the single most important micro-skill in pop and rock bass. James Jamerson + Benny Benjamin (Motown), Bootsy + Jab'o Starks (JB's), Pino + Steve Jordan (D'Angelo) — every great rhythm section is glued at the kick.\n\n## Leaving space\n\nThe kick has its own voice. If you play through every kick hit, you double it — and the listener can't hear either. Drop out for a beat. Let the kick speak. Come back in with the next phrase.",
    drills: {
      teach: [
        { id: "t_why", heading: "The kick is your duet partner", body: "Listen to the kick before your fingers move. If you can't sing the kick pattern, you can't lock with it. Every great bassist transcribes drum patterns mentally before plucking a note." },
        { id: "t_shape", heading: "Sync, don't compete", body: "Your job isn't to play notes everywhere — it's to play *with* the kick. If the kick plays only on 1 and 3, you mostly play only on 1 and 3. Match its energy; don't override it." },
        { id: "t_pitfall", heading: "Common mistake: playing across the drums", body: "If you ignore the drum pattern and just walk lines, the section sounds disjointed. The drummer is your collaborator, not your accompanist. Listen, then respond." },
      ],
    },
    audioRefs: [
      { id: "demo_drum_loop", label: "Drum loop · 90 bpm for practice" },
      { id: "demo_locked", label: "Bass + drums locked · target performance" },
      { id: "demo_unlocked", label: "Bass + drums unlocked · what 'wrong' sounds like" },
    ],
  },
  bass_l6_04_pro_cert: {
    id: "bass_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute bass performance",
    objectives: [
      "Perform a 5-minute set: one walking jazz piece + one funk piece",
      "Demonstrate slap, pop, ghost notes, dynamics, and articulation",
      "Hold the pocket against a backing track without drift",
    ],
    writtenContent:
      "## The Pro Cert is a recital\n\nFive minutes. Two pieces. No talking, no restarts. From the first note to the final fade, you're playing *for an audience*. This is what working bassists do five nights a week.\n\n## Programming\n\nPiece 1: a walking jazz tune (a blues, 'Autumn Leaves,' or 'Blue Bossa' — your choice). 2-3 minutes. Demonstrate harmonic walking + chord-tone awareness.\n\nPiece 2: a funk or slap tune ('Higher Ground,' 'Teen Town' head, or original). 2-3 minutes. Demonstrate slap, pop, ghost notes.\n\nThe two pieces should *contrast* — one cerebral, one visceral. Your range is the demonstration.\n\n## What passes\n\nNo restarts. No bail-outs. Each piece sounds like you've played it 100 times. Dynamics audible. Articulation deliberate. You're not 'trying' — you're performing.",
    drills: {
      teach: [
        { id: "t_why", heading: "Recital format builds stage muscle", body: "Performing for 5 unbroken minutes is harder than 5 separate 1-minute exercises. Endurance, focus, recovery — these only develop under continuous performance pressure. This cert is preparation for paid gigs." },
        { id: "t_shape", heading: "Contrast is the secret weapon", body: "Two similar pieces are boring. A walking jazz tune followed by a slap funk tune showcases your range. Programmers who pick *contrasting* pieces always sound better than those who pick two similar ones." },
        { id: "t_pitfall", heading: "Common mistake: under-rehearsed Piece 2", body: "Most students nail Piece 1 and panic on Piece 2. Equal time on both. The cert is the weaker piece, not the stronger one." },
      ],
    },
    audioRefs: [
      { id: "demo_jazz", label: "Reference · walking jazz piece · target performance" },
      { id: "demo_funk", label: "Reference · slap funk piece · target performance" },
      { id: "demo_full_set", label: "Full 5-minute Pro Cert recital example" },
    ],
  },

  // ═══ BASS · L7 ═══
  bass_l7_01_advanced_1: {
    id: "bass_l7_01_advanced_1",
    title: "Two-handed tapping · Stu Hamm / Victor Wooten technique",
    objectives: [
      "Tap a melody with the right hand while fretting bass with the left",
      "Maintain independence between the two hands",
      "Build a 4-bar tapped passage with chord-tone melody",
    ],
    writtenContent:
      "## Tapping unlocks polyphony on bass\n\nVictor Wooten's 'Classical Thump' and Stu Hamm's 'Country Music' established tapping as a serious bass vocabulary. By using both hands on the fretboard simultaneously, you play melody and bass at once — a one-person duet.\n\n## Right-hand tap mechanics\n\nIndex and middle fingers of your plucking hand 'hammer' the fretboard like piano keys. Each tap fingers a fret hard enough to ring the string without picking. The motion is from the knuckle, not the wrist.\n\n## Two-hand independence\n\nThe hard part: your left hand plays a bass groove while your right taps a melody on the higher strings. Each hand must function independently — like a pianist's two hands. Build this slowly with 4-note tap patterns first.",
    drills: {
      teach: [
        { id: "t_why", heading: "Tapping = bass becomes a piano", body: "A bass that taps gains polyphony — chords, counter-melodies, two voices at once. This is the Genius-tier door: from a single-line instrument to a self-accompanying one." },
        { id: "t_shape", heading: "Each tap is a hammer-on without a previous note", body: "You're already familiar with hammer-ons. Tapping is the same motion executed by the *other* hand, with no preceding pluck. The hammer alone produces the note." },
        { id: "t_pitfall", heading: "Common mistake: weak taps", body: "If your tap doesn't ring, you're tapping too softly. The finger must hit the fret with the same intensity as a drum stroke — not a button press. Practice taps at fortissimo first; pull back later." },
      ],
    },
    audioRefs: [
      { id: "demo_tap_basic", label: "Basic right-hand tap drill · 60 bpm" },
      { id: "demo_independence", label: "Two-hand independence pattern" },
      { id: "demo_wooten", label: "Victor Wooten tapping reference fragment" },
    ],
  },
  bass_l7_02_rep_4: {
    id: "bass_l7_02_rep_4",
    title: "'Donna Lee' · Jaco's bebop transcription",
    objectives: [
      "Play the head of 'Donna Lee' (Charlie Parker, transcribed by Jaco)",
      "Execute 16th-note bebop lines at 200+ bpm half-time feel",
      "Articulate every note with bebop swing — no straight eighths",
    ],
    writtenContent:
      "## Bebop on bass · Jaco's defining track\n\nCharlie Parker wrote 'Donna Lee' as a bop tune for alto sax. Jaco Pastorius arranged it for fretless electric bass on his self-titled 1976 debut. The result rewrote what bass could play. Speed, articulation, melody, swing — every parameter pushed to the limit.\n\n## Why this is Genius repertoire\n\n'Donna Lee' demands: full chromatic vocabulary, bebop articulation (swung 16ths, not straight), legato runs across all four strings, and stamina across an extended head. Most bassists never attempt it.\n\n## The approach\n\nLearn the head 4 bars at a time. Sing each line before you play. Bebop melodies are *vocal* — if you can't sing them, your fingers will play them mechanically. Then play *very slowly* (50 bpm) until clean.",
    drills: {
      teach: [
        { id: "t_why", heading: "Bebop is bass's hardest grammar", body: "Bebop's chromatic logic — enclosures, approach tones, ii-V phrases — is the most sophisticated harmonic language in jazz. Mastering even one head puts you in elite company." },
        { id: "t_shape", heading: "Sing it before you play it", body: "If you can sing 'Donna Lee' without instrument, your fingers will find it. If you can't, no amount of fret-board memorization will make it musical. Vocal first, fretboard second." },
        { id: "t_pitfall", heading: "Common mistake: fretless intonation drift", body: "Jaco played fretless. If you do too, intonation is ruthless — even 5 cents flat is audible. Use a tuner with visual feedback during slow practice; train your ear to the exact note position." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Donna Lee head · 80 bpm slow practice" },
      { id: "demo_target", label: "Donna Lee head · target tempo with swing" },
      { id: "demo_jaco_original", label: "Jaco's 1976 recording reference" },
    ],
  },
  bass_l7_03_improv_2: {
    id: "bass_l7_03_improv_2",
    title: "16-bar bass solo · 'Autumn Leaves' changes",
    objectives: [
      "Improvise a 16-bar solo over 'Autumn Leaves' chord changes (G minor / B♭ major)",
      "Build motivic development — repeat and vary phrases",
      "Resolve the solo on the tonic at bar 17",
    ],
    writtenContent:
      "## A real bass solo · 16 bars of statement\n\n'Autumn Leaves' (Joseph Kosma, 1945) is the most-played jazz standard for soloing because the chord changes are clear and pedagogically rich. Cm7 - F7 - B♭maj7 - E♭maj7 - Am7♭5 - D7 - Gm. Beautiful logic.\n\n## Motivic development\n\nDon't play 16 bars of constant new ideas. Pick one 4-note motif. Play it. Repeat it transposed. Repeat it rhythmically altered. Repeat it with one note changed. *Then* introduce a new idea. This is how Charlie Mingus built solos — through development, not through improvising new content every bar.\n\n## The arc\n\nBars 1-4: state your motif. Bars 5-8: develop it. Bars 9-12: introduce contrast. Bars 13-16: drive to resolution on Gm. The arc must be audible to a listener with no music theory.",
    drills: {
      teach: [
        { id: "t_why", heading: "Solos are mini-compositions", body: "A great solo isn't 16 bars of fast notes — it's a 16-bar composition you write live. The architectural thinking is identical to writing a song; only the time pressure differs." },
        { id: "t_shape", heading: "Develop one idea, don't generate ten", body: "Listen to Mingus, Charles Mingus, Niels-Henning Ørsted Pedersen — every great bass soloist returns to motifs. The solo's coherence comes from repetition with variation, not constant invention." },
        { id: "t_pitfall", heading: "Common mistake: scale-running", body: "Beginners playing solos run scales — up and down, beat after beat. Scale-running is the opposite of soloing; it's the absence of musical thought. Use scales as *vocabulary*, never as content." },
      ],
    },
    audioRefs: [
      { id: "demo_chord_pad", label: "Autumn Leaves chord pad · 100 bpm for solo practice" },
      { id: "demo_solo_example", label: "16-bar solo example with motivic development" },
      { id: "demo_mingus", label: "Mingus solo reference fragment for inspiration" },
    ],
  },

  // ═══ BASS · L8 ═══
  bass_l8_01_style_study: {
    id: "bass_l8_01_style_study",
    title: "Style study · Jaco Pastorius · 'Continuum' transcription",
    objectives: [
      "Transcribe 30 seconds of Jaco's 'Continuum' (Jaco Pastorius, 1976)",
      "Reproduce his fretless slides, harmonics, and melodic phrasing",
      "Match his tone settings — bridge pickup, treble rolled off",
    ],
    writtenContent:
      "## Why Jaco · why 'Continuum'\n\nJaco Pastorius redefined bass. 'Continuum' (track 7 of his self-titled 1976 debut) is a 4-minute meditation on the fretless instrument. It's slow enough to transcribe, technical enough to teach you everything: harmonics, slides, vibrato, sustain, dynamics.\n\n## The transcription process\n\n1. Listen to 30 seconds (suggested: 0:30-1:00) on loop. 50 times.\n2. Sing every note before touching the bass.\n3. Find the notes on the fretboard one by one.\n4. Notate (tab or notation) what you hear.\n5. Play your transcription against the recording. Adjust.\n\n## Reproducing the tone\n\nJaco played a 1962 Fender Jazz Bass, fretboard frets removed and filled with epoxy. Bridge pickup soloed. Treble rolled to about 50%. This warm, vocal, slightly mwah'd tone is the *sound* of fretless bass.",
    drills: {
      teach: [
        { id: "t_why", heading: "Transcription = ear becomes a master class", body: "Reading another bassist's transcription is studying. Doing your own transcription is *becoming* them. Every note you find by ear is a note your brain owns forever." },
        { id: "t_shape", heading: "Pick 30 seconds, not 30 minutes", body: "Don't try to transcribe the whole song. 30 seconds is the right scope — long enough for a complete musical thought, short enough to internalize. Pick a meaningful phrase, not a random snippet." },
        { id: "t_pitfall", heading: "Common mistake: chasing notes only", body: "Transcribing the pitches is half the work. The other half is the *feel* — slides, vibrato widths, dynamic curves. Without these, you've got the skeleton but not the body." },
      ],
    },
    audioRefs: [
      { id: "demo_continuum", label: "Continuum · 0:30-1:00 reference loop" },
      { id: "demo_transcription", label: "Sample student transcription · target reproduction" },
      { id: "demo_jaco_tone", label: "Jaco's tone setup demonstration" },
    ],
  },
  bass_l8_02_rep_5: {
    id: "bass_l8_02_rep_5",
    title: "'A Remark You Made' · Weather Report · 6-minute concert piece",
    objectives: [
      "Perform Jaco's bass line from 'A Remark You Made' end-to-end (~6 min)",
      "Execute fretless harmonics at the song's key transitions",
      "Maintain dynamic shape across the entire form",
    ],
    writtenContent:
      "## The concert-length proof\n\n'A Remark You Made' (Weather Report, 'Heavy Weather,' 1977) is a Joe Zawinul ballad with one of the most lyrical bass lines ever recorded. The piece runs 6:50. Jaco's bass moves from supportive walking to soloistic statements and back.\n\n## What 6 minutes asks of you\n\n- Endurance: your hand must stay relaxed for 6 unbroken minutes\n- Memory: 12 sections of the form, all distinct\n- Dynamic shape: pp during verses, mf during the bridge, f at the climax\n- Harmonics: clean execution of natural and artificial harmonics at section transitions\n\n## Why this piece is the L8 cert\n\nIt requires every L1-L7 skill: pocket, walking, dynamics, articulation, harmonics, slides, fretless intonation. And it requires *stamina* — the will to stay focused across a long arc.",
    drills: {
      teach: [
        { id: "t_why", heading: "6 minutes is concert ground", body: "Most pop songs are 3-4 minutes. Concert pieces are 5-10. The leap from 'song' to 'piece' is the leap from gigging musician to concert artist. This cert tests that leap." },
        { id: "t_shape", heading: "Memorize section anchors, not every note", body: "Don't try to memorize 600 individual notes. Memorize the 12 section anchors: 'verse 1 starts on F, bridge enters at 2:30 with the harmonic, climax hits at 4:15.' Notes hang from anchors." },
        { id: "t_pitfall", heading: "Common mistake: pacing", body: "Beginners blow their dynamic budget in the first 90 seconds. By minute 4, they've got nowhere to go. Hold back. Play *quieter* than you think for the first half. Save the climax." },
      ],
    },
    audioRefs: [
      { id: "demo_weather_report", label: "A Remark You Made · original Weather Report recording" },
      { id: "demo_section_map", label: "Section-by-section breakdown of the bass line" },
      { id: "demo_harmonics", label: "Isolated harmonic technique passages" },
    ],
  },
  bass_l8_03_accompany: {
    id: "bass_l8_03_accompany",
    title: "Lead vs. accompany · trading roles in a jam",
    objectives: [
      "Play 8 bars in support role, then 8 bars in lead role, then return",
      "Read the bandleader's cues — eye contact, head nods, dynamic shifts",
      "Drop volume + complexity when accompanying; add both when leading",
    ],
    writtenContent:
      "## Bass in a jam · two modes\n\nIn any jam session, you'll alternate between two roles: *accompanist* (support whoever's soloing) and *lead* (take the solo yourself). Switching between them gracefully is the social skill that separates jam-friendly bassists from solo-only ones.\n\n## Accompanist mode\n\n- Volume: drop to mp\n- Complexity: simplest line that holds the form\n- Notes: roots and fifths, mostly on downbeats\n- Eyes: on the soloist, not your bass\n\n## Lead mode\n\n- Volume: rise to mf or f\n- Complexity: full melodic line, with ornaments and motifs\n- Range: use the upper register (15th fret and above) for projection\n- Eyes: closed or focused inward — you're creating, not reacting\n\n## The trade signal\n\nIn most jams, the bandleader nods or makes eye contact when it's your turn. Watch the room. Don't take a solo because you feel like it; take it because the music asks for it.",
    drills: {
      teach: [
        { id: "t_why", heading: "Jamming = listening 80%, playing 20%", body: "The bassist who plays the most notes in a jam is rarely the most respected. The bassist who *listens* most carefully is. Your role shifts moment to moment based on what the music needs." },
        { id: "t_shape", heading: "Volume = role marker", body: "When you take a solo, get louder. When you accompany, get quieter. This single cue tells the room what's happening — no announcements needed." },
        { id: "t_pitfall", heading: "Common mistake: stealing focus", body: "Some bassists play too busy a line during another instrument's solo, drawing attention away. This is the cardinal jam sin. Simplify. Hold the floor for the soloist." },
      ],
    },
    audioRefs: [
      { id: "demo_accompany", label: "Bassist in accompany mode · supporting a guitar solo" },
      { id: "demo_lead", label: "Bassist in lead mode · taking a 16-bar solo" },
      { id: "demo_trade", label: "Trading 4s between bass and guitar" },
    ],
  },

  // ═══ BASS · L9 ═══
  bass_l9_01_compose: {
    id: "bass_l9_01_compose",
    title: "Compose a 32-bar original bass line",
    objectives: [
      "Write a 32-bar original instrumental piece featuring the bass as melody",
      "Use AABA or verse-chorus form with a clear B-section contrast",
      "Notate it (tab or staff) and record a final take",
    ],
    writtenContent:
      "## Composition is the Genius gate\n\nPlaying others' music is the apprentice's task. Writing your own — even imperfectly — is the master's. 32 bars is enough to say something complete: a theme, a development, a return.\n\n## Form options\n\n- **AABA (32 bars)**: A (8) - A (8) - B (8) - A (8). Used by 'Take the A Train,' 'Body and Soul,' 'I Got Rhythm.' The B-section provides contrast — usually a key change.\n- **Verse-Chorus (32 bars)**: V (8) - C (8) - V (8) - C (8). More pop. Choruses repeat with the same melodic hook.\n\n## Process\n\n1. Pick a key and tempo. Stay there.\n2. Write the A-melody. 8 bars. Hum it before you fret it.\n3. Write the B-section. Different chord, different feel.\n4. Notate the whole thing. Tab is fine.\n5. Record yourself playing it. Listen back. Edit.\n\n## What 'good' looks like\n\nA listener can hum your A-melody after one listen. The B-section feels distinct but related. The piece doesn't drag — every bar earns its place.",
    drills: {
      teach: [
        { id: "t_why", heading: "Composition uses every prior skill", body: "Writing 32 bars demands you've internalized form, harmony, melody, articulation, dynamics. Every weakness in your playing shows up in your writing. That's the point — this lesson exposes what's left to learn." },
        { id: "t_shape", heading: "Limit yourself to one key", body: "Beginners try to compose with key changes everywhere. Don't. Stay in one key for your first composition. Constraint forces creativity within the box; freedom paralyzes." },
        { id: "t_pitfall", heading: "Common mistake: too many ideas", body: "8 bars is enough for *one* idea, varied. Don't cram three motifs into 8 bars. Pick one. Repeat it. Vary it slightly. The B-section is where new ideas live, not the A." },
      ],
    },
    audioRefs: [
      { id: "demo_aaba", label: "Reference · sample AABA bass composition" },
      { id: "demo_verse_chorus", label: "Reference · sample verse-chorus bass composition" },
      { id: "demo_process", label: "Compositional process walkthrough · idea to finished piece" },
    ],
  },
  bass_l9_02_masterclass: {
    id: "bass_l9_02_masterclass",
    title: "Record a 10-minute masterclass · teach what you know",
    objectives: [
      "Record a 10-minute video lesson on a bass technique you've mastered",
      "Demonstrate the technique slowly, then at tempo",
      "Anticipate and address the most common student mistakes",
    ],
    writtenContent:
      "## Teaching is the final test of mastery\n\nIf you can play it but can't teach it, you don't fully understand it. A 10-minute masterclass forces you to break a technique into steps, name each step, and predict where students will fail. This is the Genius-tier crucible.\n\n## Format\n\n- 0:00-1:00: introduce the technique. Why it matters. Who uses it.\n- 1:00-3:00: demonstrate it slowly. Each motion isolated.\n- 3:00-6:00: build to target tempo with intermediate stages.\n- 6:00-8:00: common mistakes — show what goes wrong, fix it.\n- 8:00-10:00: practice plan for the student to take home.\n\n## Choosing a topic\n\nPick something you've drilled hundreds of times — slap, walking lines, fretless intonation, ghost notes. Don't pick what you think sounds impressive. Pick what you genuinely understand.\n\n## What 'good' looks like\n\nA beginner watches your 10 minutes and walks away with a clear practice plan. They know what to do tomorrow morning. If they don't, you taught for yourself, not for them.",
    drills: {
      teach: [
        { id: "t_why", heading: "Teaching exposes hidden gaps", body: "When you have to explain *why* slap works, you discover whether you've been doing it from understanding or from imitation. The cert is brutal but transformative." },
        { id: "t_shape", heading: "Predict the failure modes", body: "A great teacher knows exactly where students will mess up — wrong angle, wrong tension, wrong tempo jump. List the top 3 failure modes for your topic before you film. Address each." },
        { id: "t_pitfall", heading: "Common mistake: too much demo, too little teaching", body: "Beginners filming masterclasses spend 8 minutes playing impressively and 2 minutes explaining. Reverse it. Most viewers don't need to be wowed — they need to be guided." },
      ],
    },
    audioRefs: [
      { id: "demo_masterclass_excerpt", label: "Sample 10-minute student masterclass · slap technique" },
      { id: "demo_failure_modes", label: "Common mistake demonstration patterns" },
      { id: "demo_pro_class", label: "Reference · Victor Wooten teaching slap (excerpt)" },
    ],
  },
  bass_l9_03_genius_cert: {
    id: "bass_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute solo bass recital",
    objectives: [
      "Program and perform a 15-20 minute solo bass recital",
      "Include 4 contrasting works: standard, original, improvisation, virtuosic showcase",
      "Demonstrate complete artistic command — from quiet ballads to slap fireworks",
    ],
    writtenContent:
      "## The recital · the final demonstration\n\n15-20 minutes. You alone with the bass. No band, no backing tracks unless integral to a piece. The audience hears nothing but you for the duration.\n\n## Recommended program\n\n1. **Standard** (3-4 min): a jazz or pop tune from the canon — 'Donna Lee,' 'A Remark You Made,' 'Birdland' bass feature. Demonstrates repertoire mastery.\n2. **Original** (4-5 min): your L9 composition. Demonstrates voice.\n3. **Improvisation** (3-4 min): solo bass over a vamp or freely. Demonstrates spontaneous creation.\n4. **Showcase** (4-5 min): a virtuosic piece — Wooten's 'Classical Thump,' Hamm's 'Country Music,' or a transcription. Demonstrates technical ceiling.\n\n## Programming logic\n\nOpen strong but not strongest — save your best playing for the middle (energy peak). Close on something memorable. Contrast every piece with the next: don't program two slow pieces back-to-back. Pacing is the secret of good recitals.\n\n## What passing looks like\n\nThe audience doesn't notice your bass — they notice the music. No visible struggle, no restarts. You're not performing skills; you're communicating ideas. This is the Genius bar.",
    drills: {
      teach: [
        { id: "t_why", heading: "The recital is your portfolio", body: "Every musician who claims mastery has played at least one solo recital. It's the universal proof of artistic command. Pass this and you're not 'learning bass' anymore — you're a bassist." },
        { id: "t_shape", heading: "Pacing > virtuosity", body: "An audience tires of constant fireworks. Mix slow and fast, quiet and loud, simple and complex. The recital that breathes is the recital that holds attention for 20 minutes." },
        { id: "t_pitfall", heading: "Common mistake: technical pieces only", body: "Programming four virtuoso pieces is exhausting to listen to and signals insecurity. Include at least one slow, simple piece where every note matters. Restraint is the master's flex." },
      ],
    },
    audioRefs: [
      { id: "demo_recital_full", label: "Reference · full 18-minute solo bass recital" },
      { id: "demo_program_notes", label: "Program-note examples for solo bass recitals" },
      { id: "demo_wooten_recital", label: "Victor Wooten solo concert excerpt" },
    ],
  },

  // ═══ UKULELE · L5 ═══
  ukulele_l5_01_harmony: {
    id: "ukulele_l5_01_harmony",
    title: "Jazz chords on ukulele · 7ths, 9ths, and altered voicings",
    objectives: [
      "Play Cmaj7, Dm7, G7, Cmaj9 with clean voicings",
      "Switch between extended chords without buzzing",
      "Apply them to a ii-V-I in C major",
    ],
    writtenContent:
      "## Beyond C-F-G\n\nL2-L4 covered triads. L5 introduces 7ths and 9ths — the chord vocabulary of bossa nova, lounge jazz, and modern pop. Tony Bennett's 'I Left My Heart in San Francisco' on uke. Lyle Ritz's 'How About Uke?' (1957) opened this door.\n\n## The voicings\n\n- **Cmaj7**: 0-0-0-2 (G string open, C open, E open, A fret 2). Light, airy.\n- **Dm7**: 2-2-1-3. Slight stretch.\n- **G7**: 0-2-1-2. Already familiar.\n- **Cmaj9**: 0-2-0-2. Adds a D on top — opens the chord into a sigh.\n\n## Why extensions matter\n\nA basic C major says 'happy.' A Cmaj9 says 'happy, with a question.' Extended chords carry more emotional information per voicing — they're how you grow up from kids' songs to adult harmony.",
    drills: {
      teach: [
        { id: "t_why", heading: "Extensions = emotional vocabulary", body: "A 7th chord adds longing. A 9th chord adds shimmer. A 13th chord adds knowing-something-the-listener-doesn't. These aren't decorations — they're emotional content." },
        { id: "t_shape", heading: "Re-entrant tuning makes 4-note chords easy", body: "The ukulele's high G string sits *above* the C — so 4-note chords on a 4-string instrument actually contain 4 distinct notes. On guitar, you need 5+ strings. Uke has the natural advantage." },
        { id: "t_pitfall", heading: "Common mistake: barring everything", body: "Beginners apply barre fingerings to ukulele as if it were a small guitar. Don't. Most uke jazz voicings are open-fingered (single-finger or 3-finger shapes). Keep it light." },
      ],
    },
    audioRefs: [
      { id: "demo_voicings", label: "Cmaj7, Dm7, G7, Cmaj9 isolated chords" },
      { id: "demo_progression", label: "ii-V-I in C with extended chords · 80 bpm" },
      { id: "demo_lyle_ritz", label: "Lyle Ritz reference · jazz uke voicings" },
    ],
  },
  ukulele_l5_02_fast: {
    id: "ukulele_l5_02_fast",
    title: "16th-note strum · Jake Shimabukuro's 'Dragon' speed",
    objectives: [
      "Strum 16th notes (4 per beat) cleanly at 120 bpm",
      "Use 'split-stroke' technique — index down, thumb up",
      "Maintain dynamic control across the burst",
    ],
    writtenContent:
      "## The 16th-note ukulele strum\n\nJake Shimabukuro popularized the rapid-fire strum on ukulele. His 'While My Guitar Gently Weeps' cover (TED 2006) demonstrated 16th-note strumming as a melodic device, not just an accompaniment.\n\n## Split-stroke mechanics\n\n- Index finger plays down-strokes\n- Thumb plays up-strokes (yes, thumb up is unusual — it's the trick)\n- Together they alternate: i-t-i-t-i-t-i-t. Eight strokes per beat is achievable.\n\n## At 120 bpm\n\nYou're playing 16ths. That's 8 notes per beat, 32 per bar in 4/4. Each stroke must be even in volume. Variation reads as 'mistake.'\n\n## The right hand position\n\nHover above the strings between the soundhole and the fretboard's edge. Wrist relaxed, forearm steady. Don't strum from the elbow at this speed — only the wrist + fingers move.",
    drills: {
      teach: [
        { id: "t_why", heading: "Split-stroke = uke's speed unlock", body: "Pure index strumming caps at about 80 bpm of 16ths. Thumb-up strokes double your speed without doubling the strain. This is the technique behind every fast uke video on YouTube." },
        { id: "t_shape", heading: "Even volume across i and t", body: "Index down-strokes and thumb up-strokes naturally have different volumes. Train them to match. A clean burst sounds like *one* sound at high speed; uneven strokes sound like rapid stuttering." },
        { id: "t_pitfall", heading: "Common mistake: forearm tension", body: "If your forearm fires every stroke, you'll cramp at bar 8. Speed lives in the wrist and finger flick, not the arm. Loose elbow, fast fingers — Jake's whole secret." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Split-stroke · 60 bpm slow practice" },
      { id: "demo_target", label: "Split-stroke · 120 bpm 16ths" },
      { id: "demo_jake", label: "Jake Shimabukuro reference fragment" },
    ],
  },
  ukulele_l5_03_improv_1: {
    id: "ukulele_l5_03_improv_1",
    title: "4-bar improvisation over 'Five Foot Two' changes",
    objectives: [
      "Improvise 4 bars over a I-VI-II-V-I progression in C",
      "Use chord-tone melody plus the C major pentatonic",
      "Land on the tonic at bar 5",
    ],
    writtenContent:
      "## Improvising on uke · the Tin Pan Alley path\n\n'Five Foot Two, Eyes of Blue' (1925) is a classic Tin Pan Alley tune that uke players have been soloing over for nearly a century. The progression — C / E7 / A7 / D7 / G7 / C — is the 'rhythm changes light.' Easy to navigate, rich for soloing.\n\n## The pentatonic tool\n\nC major pentatonic: C D E G A C. Five notes that sound *good* over the entire progression. You can improvise without ever hitting a wrong note.\n\n## Phrasing on uke\n\nUke notes decay quickly — a fingerpicked C on the A string fades within a second. So your phrasing has to *use* this decay: short bursts, then rest. Don't try to sustain. Let the silence be musical.",
    drills: {
      teach: [
        { id: "t_why", heading: "Pentatonic is the bullet train", body: "Pentatonic scales sound good over almost any chord because they avoid the 'avoid notes' (the 4th and 7th degrees that clash with V and I chords). You can improvise without theory." },
        { id: "t_shape", heading: "Decay is your friend", body: "Uke's quick decay forces you into rhythmic phrasing. You can't drone notes; you must speak in bursts. This natural staccato is part of the instrument's voice." },
        { id: "t_pitfall", heading: "Common mistake: scale-running", body: "Don't run up and down the pentatonic. Pick one or two notes; play them with rhythmic interest. A good 4-bar solo can have only 6 notes." },
      ],
    },
    audioRefs: [
      { id: "demo_changes", label: "Five Foot Two chord pad · 100 bpm" },
      { id: "demo_solo", label: "4-bar improv example · pentatonic-based" },
      { id: "demo_tin_pan", label: "Reference · vintage uke solo style" },
    ],
  },
  ukulele_l5_04_rep_2: {
    id: "ukulele_l5_04_rep_2",
    title: "'I'm Yours' · Jason Mraz · full 32-bar arrangement",
    objectives: [
      "Play the full 32-bar form of 'I'm Yours'",
      "Maintain the reggae-influenced strum throughout",
      "Sing along (optional but recommended)",
    ],
    writtenContent:
      "## Why 'I'm Yours'\n\nJason Mraz's 2008 hit became the unofficial ukulele song of the 2010s. Four chords (C, G, Am, F), a reggae-pop strum, and a melody that fits any voice. It's a perfect L5 cert because it asks for 32 unbroken bars of feel.\n\n## The strum\n\nDown-down-up-up-down-up — but with emphasis on beats 2 and 4 to create the reggae lift. The chord changes happen on beat 1 of each new bar; the strum carries through.\n\n## The form\n\nVerse (8) - Chorus (8) - Verse (8) - Bridge (8). 32 bars. No restarts. The Bridge introduces an Am - F - C - G shift that students often fumble — practice this transition specifically.",
    drills: {
      teach: [
        { id: "t_why", heading: "32 bars of pop = real performance", body: "Anyone can play a 4-bar uke loop. 32 bars asks if you can sustain feel, dynamics, and accuracy through a full song. This is what gigging musicians do every set." },
        { id: "t_shape", heading: "The reggae lift on 2 and 4", body: "Your strumming hand naturally hits down-strokes harder. To get the reggae feel, deliberately *lighten* beats 1 and 3, *accent* 2 and 4. That backbeat lift is the song's pulse." },
        { id: "t_pitfall", heading: "Common mistake: tempo creep", body: "By bar 24, beginners are playing 5-10 bpm faster than bar 1. Drum machine on. Listen back. Tempo discipline at this length is a real skill." },
      ],
    },
    audioRefs: [
      { id: "demo_strum", label: "Reggae-pop strum pattern · isolated · 80 bpm" },
      { id: "demo_full", label: "Full 32-bar arrangement · target tempo" },
      { id: "demo_mraz", label: "Jason Mraz original recording reference" },
    ],
  },

  // ═══ UKULELE · L6 ═══
  ukulele_l6_01_adv_tech: {
    id: "ukulele_l6_01_adv_tech",
    title: "Tremolo and chord-melody · uke as a melodic instrument",
    objectives: [
      "Sustain a tremolo on a single string for 4 beats",
      "Play a melody on the A string while strumming chord shapes underneath",
      "Combine tremolo with chord-melody on a familiar tune",
    ],
    writtenContent:
      "## Tremolo · making the uke sing\n\nUke notes decay fast. Tremolo (rapid alternation of strokes on a single note) creates the illusion of sustain. It's the technique behind solo classical-style uke playing — Lyle Ritz, Herb Ohta Sr., John King.\n\n## The motion\n\nIndex finger nail rapidly alternates with thumb pad on a single string. Between 12 and 20 strokes per second. Even volume, no rhythmic clumps. The result is a 'shimmer' that feels like sustained tone.\n\n## Chord-melody\n\nWhile your tremolo plays the melody on the A string (highest, melody-friendly), your fret hand forms chord shapes that include the melody note as the top voice. Solo uke players (no singer, no band) build entire arrangements this way.",
    drills: {
      teach: [
        { id: "t_why", heading: "Tremolo creates the illusion of sustain", body: "Real sustain on uke is impossible — strings decay fast. Tremolo fakes it convincingly. The brain hears 16 quick strokes per second as one continuous tone." },
        { id: "t_shape", heading: "Chord-melody = self-accompaniment", body: "When the top note of every chord *is* the melody note, you don't need a singer or another instrument. Solo uke arrangements depend entirely on this trick." },
        { id: "t_pitfall", heading: "Common mistake: uneven tremolo", body: "If your strokes clump (3 fast then 1 slow), the tremolo sounds like a stutter, not a shimmer. Even spacing is everything. Practice with a metronome at 8 strokes per beat first." },
      ],
    },
    audioRefs: [
      { id: "demo_tremolo", label: "Isolated tremolo on A string · sustained" },
      { id: "demo_chord_melody", label: "Chord-melody arrangement of 'Aloha 'Oe'" },
      { id: "demo_ohta", label: "Herb Ohta Sr. reference · solo uke fragment" },
    ],
  },
  ukulele_l6_02_rep_3: {
    id: "ukulele_l6_02_rep_3",
    title: "'While My Guitar Gently Weeps' · Jake Shimabukuro arrangement",
    objectives: [
      "Play Jake's solo arrangement of George Harrison's tune",
      "Execute the rapid 16th-note runs in the solo section",
      "Maintain emotional dynamics — quiet verse, building solo, full climax",
    ],
    writtenContent:
      "## The arrangement that proved uke seriously\n\nJake Shimabukuro's 2006 performance of 'While My Guitar Gently Weeps' at TED went viral and reset expectations for the ukulele. Solo, no backing track, 4 minutes of melody-and-chord chord-melody work, with bursts of 16th-note solos.\n\n## What it requires\n\n- Chord-melody arrangement (you play melody + harmony simultaneously)\n- 16th-note solo bursts at 120+ bpm\n- Tremolo for sustained passages\n- Massive dynamic range — pp in the verses, ff at the climax\n\n## Why this is Pro repertoire\n\nIf you can play Jake's WMGGW arrangement, you can play any chord-melody piece on uke. It's the audition piece for solo uke seriousness.",
    drills: {
      teach: [
        { id: "t_why", heading: "Chord-melody is the Pro frontier", body: "Strumming covers L1-L4. Chord-melody — playing melody and harmony simultaneously, alone — is L6 and beyond. It's where solo uke artistry begins." },
        { id: "t_shape", heading: "Emotional dynamics carry the piece", body: "The notes alone are not enough. You must play the verses *quietly* (almost whispering) and build to the solo with audible volume increase. The contrast is the song." },
        { id: "t_pitfall", heading: "Common mistake: ignoring the solo bursts", body: "Some students play the chord-melody clean but skip the 16th-note solo runs because they're hard. The solo is half the song's emotional weight. Drill it separately at 60 bpm; build up." },
      ],
    },
    audioRefs: [
      { id: "demo_jake_ted", label: "Jake Shimabukuro · TED 2006 reference recording" },
      { id: "demo_chord_melody", label: "Chord-melody section · 80 bpm slow practice" },
      { id: "demo_solo_burst", label: "Isolated 16th-note solo run · slow + target" },
    ],
  },
  ukulele_l6_03_duet: {
    id: "ukulele_l6_03_duet",
    title: "Ukulele duet · trading lead and harmony",
    objectives: [
      "Play a 32-bar piece as a duet with another uke (or recorded second part)",
      "Take 8 bars of melody, then drop to harmony for 8 bars, then back",
      "Lock the strum patterns between the two parts",
    ],
    writtenContent:
      "## Two ukes · twice the conversation\n\nUkulele duets are the heart of Hawaiian music. One player handles melody (often fingerpicked); the other handles rhythm + harmony (strumming chord voicings). They trade roles mid-song.\n\n## The trade\n\nAt the bridge or middle 8, the melody ukulele drops to chord work and the rhythm uke takes the melody. This is musically polite — neither player monopolizes the spotlight. The audience hears two equals.\n\n## Locking strum patterns\n\nWhen both ukes are strumming, their patterns must align. If Player A is doing d-d-u-u-d-u and Player B is doing d-u-d-u-d-u, the result is mush. Pick one pattern per section; both players sync.",
    drills: {
      teach: [
        { id: "t_why", heading: "Duets force listening", body: "Solo playing lets you hear yourself. Duet playing demands you hear someone else *more* than yourself. This is the listening skill that makes you a band-friendly player." },
        { id: "t_shape", heading: "Trade with cues", body: "Use a chord change, a head nod, or a short pause as the cue to swap roles. Don't just suddenly take the melody mid-bar — telegraph the trade so your partner has time to adjust." },
        { id: "t_pitfall", heading: "Common mistake: both playing melody", body: "Beginners both want to play the melody because it's the fun part. Resist. The duet only works if one of you is in support mode at any moment." },
      ],
    },
    audioRefs: [
      { id: "demo_duet", label: "Two-uke duet · trading melody and harmony" },
      { id: "demo_locked_strum", label: "Two ukes locked on the same strum pattern" },
      { id: "demo_iz_brother", label: "Reference · Iz + Skippy Kamakawiwoʻole brother duet" },
    ],
  },
  ukulele_l6_04_pro_cert: {
    id: "ukulele_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute ukulele performance",
    objectives: [
      "Perform a 5-minute set: one chord-melody piece + one strummed song",
      "Demonstrate fingerpicking, tremolo, dynamic shifts, and Hawaiian feel",
      "Hold the audience's attention from first note to last",
    ],
    writtenContent:
      "## The 5-minute uke set\n\nFive minutes. Two pieces. Solo. This is what you'd play at an open mic, a wedding cocktail hour, or your friend's living room. The Pro Cert measures whether you're stage-ready.\n\n## Programming\n\nPiece 1: a chord-melody arrangement (Iz's 'Over the Rainbow,' a Beatles tune adapted, your L6 rep). 2-3 min. Solo uke as orchestra.\n\nPiece 2: a strummed song with optional vocals ('I'm Yours,' 'Riptide,' 'You Are My Sunshine'). 2-3 min. Solo uke as song accompaniment.\n\n## What passes\n\nNo restarts. The audience leans in. Dynamics audible. Two pieces feel different — chord-melody is intimate; strumming is celebratory. The contrast is the show.",
    drills: {
      teach: [
        { id: "t_why", heading: "Solo uke = the whole band", body: "Without a band to fall back on, every dropped note is yours alone. The Pro Cert builds the focus required to stand alone for 5 minutes. Working ukers do this nightly." },
        { id: "t_shape", heading: "Sequence the energy", body: "Start gentle. Build. Peak in the middle. Resolve. A 5-minute set isn't 5 1-minute exercises; it's an arc. Plan the arc before you walk on." },
        { id: "t_pitfall", heading: "Common mistake: same-feel programming", body: "Two slow chord-melody pieces is a sleep aid. Two strummed sing-alongs is a luau. Pick one of each. The contrast holds attention." },
      ],
    },
    audioRefs: [
      { id: "demo_chord_melody_set", label: "Reference chord-melody set piece" },
      { id: "demo_strum_song", label: "Reference strummed sing-along piece" },
      { id: "demo_full_set", label: "Full 5-minute Pro Cert example" },
    ],
  },

  // ═══ UKULELE · L7 ═══
  ukulele_l7_01_advanced_1: {
    id: "ukulele_l7_01_advanced_1",
    title: "Campanella style · cross-string pull-offs",
    objectives: [
      "Play a scale using a different string for every adjacent note",
      "Maintain the 'bell' effect — overlapping ringing strings",
      "Apply campanella to a Renaissance or Celtic melody",
    ],
    writtenContent:
      "## Campanella · the bells of the ukulele\n\nCampanella ('little bell' in Italian) is a fingering technique borrowed from Renaissance lute. Instead of playing a scale up one string, you play each adjacent note on a *different* string. The previous note keeps ringing while the next sounds — like overlapping bells.\n\n## On ukulele specifically\n\nThe re-entrant high G makes campanella natural on uke. The high G can serve as the upper note of many scale fragments without re-fingering. John King's 'Classical Ukulele' (2004) made this technique mainstream in the modern uke world.\n\n## The technique\n\nTo play C-D-E-F: C on C string fret 0, D on G string fret 7 (or A string fret 5), E on A string fret 7, F on E string fret 1. Each adjacent note on a different string. Strings ring through each other.\n\n## Why it works\n\nThe overlap creates a chordal halo — your scale sounds harmonically rich, not linearly traversed. It's the difference between marching up stairs and floating on a cloud.",
    drills: {
      teach: [
        { id: "t_why", heading: "Re-entrant tuning is the secret weapon", body: "On a guitar, campanella requires complex string skipping. On a re-entrant uke, the high G makes natural campanella patterns possible across simple shapes. The instrument was practically built for this." },
        { id: "t_shape", heading: "Plan fingerings before playing", body: "Each scale's campanella fingering is different. Don't improvise it — write the string + fret combinations down before you play. Once memorized, it becomes second nature." },
        { id: "t_pitfall", heading: "Common mistake: damping accidentally", body: "Beginners damp ringing notes by accidentally touching strings during shifts. Campanella demands clean finger lifts — strings must keep ringing through your transitions." },
      ],
    },
    audioRefs: [
      { id: "demo_scale", label: "C major campanella scale · isolated" },
      { id: "demo_renaissance", label: "Renaissance lute fragment in campanella style" },
      { id: "demo_john_king", label: "John King reference · classical uke" },
    ],
  },
  ukulele_l7_02_rep_4: {
    id: "ukulele_l7_02_rep_4",
    title: "Bach Bourrée in E minor · uke transcription",
    objectives: [
      "Play Bach's Bourrée from Lute Suite BWV 996 on ukulele",
      "Maintain Baroque articulation — clipped, dancing eighth notes",
      "Execute campanella fingerings throughout",
    ],
    writtenContent:
      "## Bach on the ukulele · the Genius repertoire\n\nJ.S. Bach's Bourrée in E minor (from Lute Suite BWV 996) is one of the most-played classical pieces on plucked instruments. It transcribes beautifully to ukulele using campanella technique. John King's recording opened this entire literature to uke players.\n\n## Why Bach for L7\n\nBaroque music demands: precise articulation, voice independence (melody + bass played simultaneously), tempo discipline, and ornament execution (mordents, trills). Mastering even one Bach piece on uke proves you can navigate any classical repertoire.\n\n## The challenge\n\nThe Bourrée moves at a brisk dance tempo (~100 bpm). The melody covers two octaves. The accompaniment (a counter-melody on lower strings) must be audible *underneath* the melody. Voice independence is everything.",
    drills: {
      teach: [
        { id: "t_why", heading: "Bach is the universal proof", body: "If you can play Bach cleanly, you can play anything. Baroque music has no margin for error — every note exposed, every articulation audible. It's the ultimate technique audit." },
        { id: "t_shape", heading: "Two voices, two volumes", body: "The melody is mp; the bass line is p. They must be distinct. Practice each voice alone, then combine slowly. Voice independence is what separates classical playing from folk strumming." },
        { id: "t_pitfall", heading: "Common mistake: rushing the dance", body: "Bourrée is a *dance*. The tempo must be steady. Beginners speed up at familiar passages and slow down at hard ones. Metronome on. Discipline first; expression after." },
      ],
    },
    audioRefs: [
      { id: "demo_bourree_slow", label: "Bach Bourrée · 60 bpm slow" },
      { id: "demo_bourree_target", label: "Bach Bourrée · target tempo with articulation" },
      { id: "demo_john_king", label: "John King reference recording" },
    ],
  },
  ukulele_l7_03_improv_2: {
    id: "ukulele_l7_03_improv_2",
    title: "16-bar uke solo · 'Honeysuckle Rose' changes",
    objectives: [
      "Improvise 16 bars over Fats Waller's 'Honeysuckle Rose' progression",
      "Use bebop vocabulary — chromatic approach tones, enclosures",
      "Build a coherent solo arc with motivic development",
    ],
    writtenContent:
      "## Real jazz soloing on uke\n\nUkulele is rarely heard as a serious jazz solo instrument — but Lyle Ritz, Benny Chong, and Abe Lagrimas Jr. have proven it can. 'Honeysuckle Rose' (Fats Waller, 1929) is the classic vehicle for jazz uke improvisation.\n\n## The progression\n\nF / Gm7 - C7 / F / F7 / B♭ / Bdim / F / C7 / F (16 bars). Standard ii-V-I motion in F. Easy navigation.\n\n## Bebop vocabulary on uke\n\n- **Enclosures**: surround the target note with chromatic neighbors (e.g., D♭ - E - D for landing on D)\n- **Approach tones**: chromatic tone a half-step above or below the chord tone\n- **Diminished arpeggios**: over Bdim, run B - D - F - A♭ - B\n\nThese tools turn a folksy uke solo into a jazz solo.",
    drills: {
      teach: [
        { id: "t_why", heading: "Bebop is universal jazz language", body: "Charlie Parker invented this vocabulary in the 1940s. Every jazz musician since has learned it. If you want to solo on uke at a jazz session, you must speak this language." },
        { id: "t_shape", heading: "Motif → variation → contrast", body: "Bars 1-4: state a 4-note motif. Bars 5-8: vary it. Bars 9-12: introduce contrast. Bars 13-16: drive to the F resolution. This architecture is the difference between solo and noodling." },
        { id: "t_pitfall", heading: "Common mistake: pentatonic-only soloing", body: "Pentatonics work, but they're folk vocabulary. To sound jazzy, add chromatic approach tones and enclosures. The uke can absolutely speak bebop — the player chooses." },
      ],
    },
    audioRefs: [
      { id: "demo_changes", label: "Honeysuckle Rose chord pad · 100 bpm" },
      { id: "demo_solo", label: "16-bar bebop solo example on uke" },
      { id: "demo_lyle_ritz", label: "Lyle Ritz reference · jazz uke soloing" },
    ],
  },

  // ═══ UKULELE · L8 ═══
  ukulele_l8_01_style_study: {
    id: "ukulele_l8_01_style_study",
    title: "Style study · Israel Kamakawiwoʻole · 'Over the Rainbow' transcription",
    objectives: [
      "Transcribe 30 seconds of Iz's 'Somewhere Over the Rainbow / What a Wonderful World' (1993)",
      "Reproduce his fingerpicking pattern, chord voicings, and feel",
      "Capture the slow, prayer-like Hawaiian phrasing",
    ],
    writtenContent:
      "## Why Iz · why this recording\n\nIsrael Kamakawiwoʻole's 1993 medley of 'Somewhere Over the Rainbow' and 'What a Wonderful World' is the most-played ukulele performance in history. It's also pedagogically perfect: simple chord vocabulary, clear fingerpicking, deep emotional content. 30 seconds of Iz contains a lifetime of feel.\n\n## The transcription target\n\nFocus on 0:15-0:45 — the first verse. C / Em / Am / F / C / G / Am / F. Iz fingerpicks: thumb on C string, index on E, middle on A, ring on G. The pattern is simple; the feel is irreplaceable.\n\n## Reproducing the feel\n\nIz played slowly. *Slower than feels comfortable*. The pulse drags slightly behind the click. This is the Hawaiian *mele* feel — unhurried, prayerful. Don't rush. The slowness is the song.\n\n## Tone settings\n\nIz played a Martin tenor uke. Soft fingerpicking, no fingernails — only finger pads. The tone is round, dark, unbright. Avoid bright strumming or aggressive picking.",
    drills: {
      teach: [
        { id: "t_why", heading: "Iz is feel pedagogy", body: "Every note in Iz's recording is technically simple. The genius is in the *feel* — the timing, the volume, the pause between notes. Transcribing Iz teaches feel in a way no exercise can." },
        { id: "t_shape", heading: "Slower than your instinct", body: "Your inner musician wants to push the tempo. Resist. Iz's tempo is unhurried — almost too slow. Play half as fast as you think is right. Then half again. That's where Iz lives." },
        { id: "t_pitfall", heading: "Common mistake: chasing technical fidelity over feel", body: "Beginners try to nail the exact notes. The notes are easy. The hard part is the *space between notes*. Listen for the silences as much as the sounds." },
      ],
    },
    audioRefs: [
      { id: "demo_iz_full", label: "Iz · Over the Rainbow full recording reference" },
      { id: "demo_target_30sec", label: "0:15-0:45 transcription target loop" },
      { id: "demo_student_attempt", label: "Sample student transcription with Iz feel" },
    ],
  },
  ukulele_l8_02_rep_5: {
    id: "ukulele_l8_02_rep_5",
    title: "'Spain' (Chick Corea) · Jake Shimabukuro arrangement · 7-minute concert piece",
    objectives: [
      "Perform Jake's solo uke arrangement of Chick Corea's 'Spain' (~7 min)",
      "Execute the rapid Spanish-influenced 16th-note runs",
      "Hold the dynamic arc across the long form",
    ],
    writtenContent:
      "## The concert showcase\n\nJake Shimabukuro's solo arrangement of Chick Corea's 'Spain' is a 7-minute uke tour de force. Originally a jazz fusion piece (Return to Forever, 1972), Jake's arrangement features the famous Aranjuez intro, the angular main theme, and extended solo improvisation.\n\n## What 7 minutes asks\n\n- Endurance: hand stays relaxed for the full duration\n- Memory: 5-6 distinct sections with different feels\n- Speed: 16th-note Spanish runs at 130+ bpm\n- Dynamic shape: from solo whisper to full strum climaxes\n\n## Programming logic\n\n'Spain' demonstrates: jazz harmony, Latin rhythm, virtuosic technique, and emotional storytelling. It's why this is the L8 cert piece — it asks for everything you've built.",
    drills: {
      teach: [
        { id: "t_why", heading: "7 minutes is the recital piece", body: "The leap from 5-minute Pro Cert to 7-minute concert piece is the leap from gigging to soloing. Stamina + memory + arc — all tested simultaneously." },
        { id: "t_shape", heading: "Memorize transitions, not measures", body: "You can't memorize 7 minutes bar by bar. Memorize the 5-6 transitions between sections — those are the hardest moments to recover from. The middle of each section will follow." },
        { id: "t_pitfall", heading: "Common mistake: front-loading energy", body: "Beginners blast through the first 2 minutes and have nothing left. Pace yourself. The climax is at minute 5, not minute 1." },
      ],
    },
    audioRefs: [
      { id: "demo_corea", label: "Original Chick Corea 'Spain' (Return to Forever) reference" },
      { id: "demo_jake_arrangement", label: "Jake Shimabukuro 'Spain' for solo uke" },
      { id: "demo_section_breakdown", label: "Section-by-section breakdown of the arrangement" },
    ],
  },
  ukulele_l8_03_accompany: {
    id: "ukulele_l8_03_accompany",
    title: "Lead vs. accompany · uke at a kanikapila",
    objectives: [
      "Play 8 bars accompanying a singer, then 8 bars taking a solo, then return",
      "Drop volume and complexity in support; raise both when leading",
      "Read room cues — when to take a turn, when to stay quiet",
    ],
    writtenContent:
      "## The kanikapila tradition\n\nA *kanikapila* (Hawaiian: 'play music') is an informal jam where players gather, sing, and trade leads. The ukulele is the central instrument. Mastering the kanikapila role means knowing when to lead, when to accompany, and how to switch.\n\n## Accompanist mode\n\n- Volume: drop to mp\n- Strum simply — chord per bar, no flashy patterns\n- Eyes on the singer; sync your strum to their phrasing\n- Don't sing if they're singing\n\n## Lead mode\n\n- Volume: rise to mf\n- Take the melody (or improvise over it)\n- Singer (or other player) drops to chord work\n- Eyes inward — you're driving now\n\n## The trade\n\nKanikapila etiquette: each player gets a verse or solo, then passes to the next. Watch the room. Take your turn when offered. Pass cleanly when done.",
    drills: {
      teach: [
        { id: "t_why", heading: "Kanikapila = listening culture", body: "The kanikapila isn't a gig — it's a conversation. The best players listen 80% of the time and play 20%. This shift from 'me playing' to 'us playing' is the social skill." },
        { id: "t_shape", heading: "Eyes are the cues", body: "When the bandleader's eyes find yours, it's your turn. When their eyes leave, you wrap up. No words needed. This is universal jam etiquette across cultures." },
        { id: "t_pitfall", heading: "Common mistake: hogging the lead", body: "Some players take a turn and won't pass. The kanikapila depends on rotation. Take your verse, then pass. Generosity makes you welcome at every jam." },
      ],
    },
    audioRefs: [
      { id: "demo_accompany", label: "Uke in support · backing a singer" },
      { id: "demo_lead", label: "Uke taking a solo · 8-bar showcase" },
      { id: "demo_kanikapila", label: "Reference · multi-uke kanikapila trade" },
    ],
  },

  // ═══ UKULELE · L9 ═══
  ukulele_l9_01_compose: {
    id: "ukulele_l9_01_compose",
    title: "Compose a 32-bar original ukulele piece",
    objectives: [
      "Write a 32-bar original uke composition with a clear melodic identity",
      "Use AABA or verse-chorus form with a distinct B-section",
      "Notate it (tab or staff) and record a final take",
    ],
    writtenContent:
      "## Composition · the master's gate\n\nPlaying others' songs is apprenticeship. Writing your own — even imperfectly — is artistry. 32 bars of original ukulele music is a complete musical statement.\n\n## Form options\n\n- **AABA**: 8 + 8 + 8 + 8 with a contrasting B (bridge). Used by Hawaiian standards like 'Aloha 'Oe.'\n- **Verse-Chorus**: 8 + 8 + 8 + 8 with the chorus as the memorable hook. Used by every Jason Mraz, Vance Joy, Twenty One Pilots uke-driven hit.\n\n## Process\n\n1. Pick a key + tempo. Stay there.\n2. Write the A-melody by humming, not by fretting. Hum first, find on uke second.\n3. Add chord voicings underneath the melody. Extended chords (maj7, m7, sus) for richer color.\n4. Write the B-section. Different chord, different feel. Should *contrast* with A.\n5. Notate. Record. Listen back. Edit ruthlessly.\n\n## What 'good' looks like\n\nA listener can hum your A-melody after one listen. The B-section feels distinct but related. Every bar earns its place.",
    drills: {
      teach: [
        { id: "t_why", heading: "Composing exposes every weakness", body: "32 bars of writing reveals where your harmonic, melodic, and rhythmic vocabulary is thin. Every weakness becomes a gap on the page. That's the point — composition is the diagnostic." },
        { id: "t_shape", heading: "Hum before you fret", body: "Most uke players compose by trying chord changes. That produces predictable music. Hum the melody first, find the chords second. Vocal melody first; instrument is the servant." },
        { id: "t_pitfall", heading: "Common mistake: borrowed melodies", body: "Beginners accidentally write melodies they've heard elsewhere. Sing your tune for someone unfamiliar. If they recognize it, it's not original. Edit until it's yours." },
      ],
    },
    audioRefs: [
      { id: "demo_aaba", label: "Reference · sample AABA uke composition" },
      { id: "demo_verse_chorus", label: "Reference · sample verse-chorus uke composition" },
      { id: "demo_process", label: "Compositional process walkthrough · idea to final take" },
    ],
  },
  ukulele_l9_02_masterclass: {
    id: "ukulele_l9_02_masterclass",
    title: "Record a 10-minute masterclass · teach what you know",
    objectives: [
      "Record a 10-minute video lesson on a uke technique you've mastered",
      "Demonstrate slowly, then at tempo, with clear narration",
      "Anticipate and address common student failure modes",
    ],
    writtenContent:
      "## Teaching = the deepest learning\n\nWhen you can play a technique but can't teach it, you don't fully own it. The 10-minute masterclass forces you to articulate what your fingers know wordlessly. This is where understanding becomes complete.\n\n## Format\n\n- 0:00-1:00: introduce the technique. Why it matters. Who pioneered it.\n- 1:00-3:00: demonstrate slowly. Each motion isolated and named.\n- 3:00-6:00: build to target tempo with intermediate stages.\n- 6:00-8:00: common mistakes — show what goes wrong, fix it on camera.\n- 8:00-10:00: practice plan. What the student does tomorrow morning.\n\n## Choosing a topic\n\nChord-melody. Tremolo. Campanella. Split-stroke. Reggae lift. Pick one technique you've drilled hundreds of times. Don't pick what you think is impressive — pick what you genuinely understand.\n\n## What 'good' looks like\n\nA student watches and walks away with a clear practice path. They know what to drill tomorrow. If your masterclass leaves them confused, you taught for yourself, not for them.",
    drills: {
      teach: [
        { id: "t_why", heading: "Teaching exposes hidden assumptions", body: "When you have to explain *why* the thumb-up split-stroke is faster than pure index strumming, you discover whether you understand the technique or just imitate it. Teaching reveals your gaps." },
        { id: "t_shape", heading: "Predict failure modes", body: "List the top 3 ways students will mess up your technique before filming. Address each on camera. The masterclass that anticipates failures is the one students actually use." },
        { id: "t_pitfall", heading: "Common mistake: too much demo, too little teaching", body: "Filming yourself playing impressively is not teaching. Half your time should be spent on slow demos + diagnosis, not showing off. The audience needs guidance, not awe." },
      ],
    },
    audioRefs: [
      { id: "demo_masterclass_excerpt", label: "Sample student masterclass · campanella technique" },
      { id: "demo_failure_modes", label: "Common failure modes for split-stroke strumming" },
      { id: "demo_jake_class", label: "Reference · Jake Shimabukuro teaching excerpt" },
    ],
  },
  ukulele_l9_03_genius_cert: {
    id: "ukulele_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute solo ukulele recital",
    objectives: [
      "Program and perform a 15-20 minute solo uke recital",
      "Include 4 contrasting works: traditional, classical/Bach, original, virtuosic",
      "Demonstrate complete artistic command — from prayer-slow Iz to full Shimabukuro",
    ],
    writtenContent:
      "## The recital · final demonstration\n\n15-20 minutes. Solo. The audience hears nothing but you and the ukulele for the duration. This is the test that working concert ukers face every night.\n\n## Recommended program\n\n1. **Traditional Hawaiian** (3-4 min): 'Aloha 'Oe,' 'Hi'ilawe,' or Iz's 'Over the Rainbow.' Demonstrates feel + heritage.\n2. **Classical** (4-5 min): your L7 Bach or another transcription. Demonstrates technical precision + repertoire breadth.\n3. **Original** (4-5 min): your L9 composition. Demonstrates voice.\n4. **Showcase** (4-5 min): a virtuosic piece — Jake's 'Spain,' a chord-melody jazz standard, or a campanella tour de force.\n\n## Programming logic\n\nOpen with a recognizable, accessible piece. Build to technical complexity. Include emotional contrast. Close on something memorable — maybe a return to a Hawaiian feel after the showcase, to ground the recital.\n\n## What passing looks like\n\nThe audience forgets they're watching a uke recital and just listens to music. No 'wow that's amazing on a uke' moment — just 'wow, that was beautiful.' The instrument disappears; the artistry remains.",
    drills: {
      teach: [
        { id: "t_why", heading: "Solo recital = your portfolio", body: "Every concert ukulelist has performed solo recitals. It's the universal proof of artistic command. Pass this and you're not 'learning uke' anymore — you're a ukulelist." },
        { id: "t_shape", heading: "Pacing > virtuosity", body: "The audience tires of constant fireworks. Mix slow + fast, simple + complex. The recital that breathes is the recital that holds attention for 20 minutes. Plan the breathing." },
        { id: "t_pitfall", heading: "Common mistake: ignoring the Hawaiian root", body: "Some uke players treat the instrument as a 'small guitar' and program no Hawaiian content. Don't. The uke's heart is Hawaiian. Even one piece in that tradition grounds your whole recital." },
      ],
    },
    audioRefs: [
      { id: "demo_recital_full", label: "Reference · full 18-minute solo uke recital" },
      { id: "demo_program_notes", label: "Program-note examples for solo uke recitals" },
      { id: "demo_jake_concert", label: "Jake Shimabukuro solo concert excerpt" },
    ],
  },

  // ═══ MANDOLIN · L5 ═══
  mandolin_l5_01_harmony: {
    id: "mandolin_l5_01_harmony",
    title: "Mandolin chord vocabulary · open chops + closed shapes",
    objectives: [
      "Play G, C, D, Am, Em chops cleanly",
      "Execute closed (movable) chord shapes for B♭, E♭, F",
      "Switch between chord types in a 4-bar progression",
    ],
    writtenContent:
      "## Chops + closed shapes · the bluegrass mandolinist's vocabulary\n\nL2-L4 covered the chop on basic chords. L5 expands to the *closed* shapes that move up and down the neck — letting you play any key without re-learning shapes.\n\n## Open chops (3-finger shapes)\n\nG, C, D, Am, Em — first-position shapes with at least one open string. Easy, sonorous, but stuck in 3-4 keys.\n\n## Closed shapes (4-finger movable)\n\nThe '2-finger G chop' shape (covering frets 4-5-7-3 across pairs) moves anywhere on the neck. Slide it up 1 fret = G♯/A♭. Slide up 3 = B♭. One shape, twelve keys.\n\n## Why both\n\nOpen chops = the bluegrass sound (loud, ringy). Closed shapes = key flexibility. A working mandolinist uses both, switching based on key and song requirements.",
    drills: {
      teach: [
        { id: "t_why", heading: "Closed shapes are key independence", body: "If you only know open chops, you can play in G, C, D, A, E. That's it. Closed shapes free you from the open-string keys — the difference between a hobbyist and a session-ready mandolinist." },
        { id: "t_shape", heading: "One shape, all 12 keys", body: "The 4-finger closed chord pattern is identical at every fret. Memorize it once; transpose by sliding. This single concept is what separates beginning and intermediate players." },
        { id: "t_pitfall", heading: "Common mistake: muddy chops", body: "If your chop has any string ringing instead of choking, the percussion is lost. Release fret pressure *before* the pick hits. Mute first, strike second — synchronize." },
      ],
    },
    audioRefs: [
      { id: "demo_open_chops", label: "G, C, D, Am chops · isolated" },
      { id: "demo_closed_shape", label: "Closed shape sliding through B♭, C, D" },
      { id: "demo_progression", label: "Mixed open/closed chord progression · 100 bpm" },
    ],
  },
  mandolin_l5_02_fast: {
    id: "mandolin_l5_02_fast",
    title: "16-beat fiddle tune run · 'Salt Creek' tempo",
    objectives: [
      "Play 16th-note runs cleanly at 120 bpm",
      "Maintain alternate picking (down-up-down-up) throughout",
      "Cross strings without losing tempo or volume",
    ],
    writtenContent:
      "## Mandolin speed · alternate picking at 120 bpm\n\n'Salt Creek' (Bill Monroe, 1965) is one of the canonical bluegrass speed tests. The A-part has a 16th-note run that crosses 3 strings. At 120 bpm, you're playing 8 notes per beat — every stroke must be clean and even.\n\n## Pick mechanics\n\nDown-up-down-up. Every note. No exceptions. If you accidentally double-down (two consecutive down-strokes), your timing collapses.\n\n## String crossing\n\nThe hard part isn't speed on one string — it's crossing from G string to D string mid-run. The pick angle changes slightly with each string. Practice string-crossing licks at 60 bpm before attempting target tempo.\n\n## Tone consistency\n\nEvery note must have the same volume. If your down-strokes are louder than up-strokes (the natural tendency), the run sounds uneven. Match volume between strokes. This is *the* technical challenge of mandolin.",
    drills: {
      teach: [
        { id: "t_why", heading: "120 bpm is bluegrass session speed", body: "Most jam tunes run at 110-130 bpm. Below 100 you're 'too slow'; above 140 you're 'showing off.' 120 is the universal session tempo. Master it and you're employable." },
        { id: "t_shape", heading: "Alternate picking is non-negotiable", body: "Single-down-stroke playing caps at about 60-70 bpm of 16ths. Alternate picking gets you to 140+. There's no shortcut — alternate is the path." },
        { id: "t_pitfall", heading: "Common mistake: tension creep", body: "By bar 8, beginners are gripping the pick like it might escape. Tension stops blood flow; speed collapses. Reset hand pressure every 4 bars. Loose grip = fast picking." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Salt Creek run · 80 bpm slow practice" },
      { id: "demo_target", label: "Salt Creek run · 120 bpm target" },
      { id: "demo_monroe", label: "Bill Monroe · Salt Creek reference recording" },
    ],
  },
  mandolin_l5_03_improv_1: {
    id: "mandolin_l5_03_improv_1",
    title: "4-bar improvisation over a bluegrass G run",
    objectives: [
      "Improvise 4 bars over a G - C - D - G progression",
      "Use the G major pentatonic plus the blue-note B♭",
      "End with the iconic 'G run' Lester Flatt cadence",
    ],
    writtenContent:
      "## The bluegrass G run · the universal cadence\n\nLester Flatt invented the G run, a 6-note descending lick that ends nearly every bluegrass solo. It's so common that not playing it sounds *wrong*. Mastering it = entering the bluegrass conversation.\n\n## The G run\n\nB - A - G (on D string fret 4-2-0) - F♯ - E - G. Six notes, descending, lands on G. Plays at the end of every 8-bar phrase. Predictable on purpose — it's the punctuation mark.\n\n## Pentatonic plus B♭\n\nG major pentatonic: G A B D E G. Add B♭ (the blue note) for the bluegrass flavor. That's your improv vocabulary for 4 bars.\n\n## The arc\n\nBars 1-2: short rising phrase using pentatonic. Bar 3: introduce the blue note B♭. Bar 4: the G run, ending the solo definitively.",
    drills: {
      teach: [
        { id: "t_why", heading: "The G run is bluegrass grammar", body: "Every soloist plays it. Every audience expects it. Not playing it confuses the listener. Mastering it = speaking the language fluently. It's the period at the end of the sentence." },
        { id: "t_shape", heading: "Pentatonic + 1 blue note = improv vocabulary", body: "5 pentatonic notes + 1 blue note = 6 notes. That's enough for endless variation. You don't need more vocabulary; you need more *combinations* of these 6." },
        { id: "t_pitfall", heading: "Common mistake: too many ideas", body: "4 bars is enough for one motif developed. Don't cram 3 musical ideas into 4 bars. Pick one phrase. Vary it. End with the G run." },
      ],
    },
    audioRefs: [
      { id: "demo_g_run", label: "Lester Flatt G run · isolated" },
      { id: "demo_changes", label: "G - C - D - G chord pad · 100 bpm" },
      { id: "demo_solo_example", label: "4-bar solo example · pentatonic + G run" },
    ],
  },
  mandolin_l5_04_rep_2: {
    id: "mandolin_l5_04_rep_2",
    title: "'Blackberry Blossom' · 32-bar fiddle tune mastery",
    objectives: [
      "Play the full AABB form of 'Blackberry Blossom' at 110 bpm",
      "Execute the rapid descending arpeggios in the A-part",
      "Switch keys cleanly between the G major A-part and the E minor B-part",
    ],
    writtenContent:
      "## The mandolinist's gauntlet\n\n'Blackberry Blossom' is one of the most-tested tunes in bluegrass jams. It's tricky: the A-part is in G major with rapid arpeggio runs; the B-part shifts to E minor for a different harmonic feel. Anyone who can play it cleanly at 110 bpm has earned their spot in the circle.\n\n## The A-part challenge\n\nThe A-part has descending arpeggios that move quickly across all four string pairs. Each arpeggio descends G - D - B - G across strings. Picking direction matters: the standard arrangement is down-down-up-down.\n\n## The B-part shift\n\nB-part starts on E minor and walks back to G. The mood shift is part of the song's appeal — bright A-part, wistful B-part. Dynamics should reflect this.\n\n## Form\n\nAABB AABB. 32 bars. No restarts. The cert is the full AABB twice through, in time, with feel.",
    drills: {
      teach: [
        { id: "t_why", heading: "32 bars exposes endurance", body: "Anyone can play 4 bars of Blackberry Blossom. 32 bars asks if your hand stays relaxed, your time holds, and your dynamics shift between A and B sections. This is professional ground." },
        { id: "t_shape", heading: "The arpeggios *are* the song", body: "Without the descending arpeggios in the A-part, this isn't 'Blackberry Blossom' — it's a generic G tune. Drill the arpeggios separately at 60 bpm; build to 110." },
        { id: "t_pitfall", heading: "Common mistake: rushing the B-part", body: "The B-part is in minor and feels darker. Beginners speed up to 'compensate' — but the minor mood needs space. Hold the tempo. The contrast is the song's beauty." },
      ],
    },
    audioRefs: [
      { id: "demo_a_part", label: "Blackberry Blossom A-part · 80 bpm slow" },
      { id: "demo_full", label: "Full AABB · 110 bpm target" },
      { id: "demo_thile", label: "Chris Thile reference · Blackberry Blossom" },
    ],
  },

  // ═══ MANDOLIN · L6 ═══
  mandolin_l6_01_adv_tech: {
    id: "mandolin_l6_01_adv_tech",
    title: "Tremolo · the mandolinist's signature sustain",
    objectives: [
      "Sustain a tremolo on a single pair for 4 beats",
      "Maintain even volume across all strokes",
      "Apply tremolo to a slow-tempo melodic passage",
    ],
    writtenContent:
      "## Tremolo · the mandolin's voice\n\nMandolin notes decay in under a second. Tremolo (rapid alternation of pick strokes on a single note) creates the illusion of sustained tone. It's the technique behind every classical mandolin recording — Vivaldi, Beethoven, Hummel mandolin works all rely on tremolo.\n\n## The motion\n\nDown-up-down-up at 12-20 strokes per second. From the wrist, not the elbow. Pick strikes both strings of the pair simultaneously each time.\n\n## Even volume\n\nThe hardest part: every stroke must have identical volume. Down-strokes naturally hit harder; you must train the up-strokes to match. Uneven tremolo sounds like a stutter; even tremolo sounds like a sustained note.\n\n## Speed targets\n\nClassical tremolo: 15-18 strokes per second. Bluegrass tremolo: 8-12 strokes per second (slower, more rhythmic). Both are valid — pick based on style.",
    drills: {
      teach: [
        { id: "t_why", heading: "Tremolo unlocks classical repertoire", body: "Without tremolo, mandolin can't sustain a long melodic note. The Vivaldi mandolin concertos, Beethoven's mandolin sonatas — all unplayable without tremolo. This is the gateway to classical mandolin." },
        { id: "t_shape", heading: "Wrist motion, not arm motion", body: "Tremolo from the elbow burns out in 4 seconds. From the wrist, it can run indefinitely. Plant your forearm; let only the wrist + fingers move. Fast, light, relaxed." },
        { id: "t_pitfall", heading: "Common mistake: uneven volume", body: "If your tremolo has audible 'thump-tick-thump-tick' character, the down-strokes are too loud. Practice up-strokes alone (yes, alone, in mid-air) until they have the same force as down-strokes. Then combine." },
      ],
    },
    audioRefs: [
      { id: "demo_tremolo", label: "Sustained tremolo on G pair · 4 beats" },
      { id: "demo_classical", label: "Vivaldi tremolo passage · slow practice" },
      { id: "demo_thile", label: "Chris Thile tremolo reference fragment" },
    ],
  },
  mandolin_l6_02_rep_3: {
    id: "mandolin_l6_02_rep_3",
    title: "'Cherokee Shuffle' · Bill Monroe Pro repertoire",
    objectives: [
      "Play the full AABB form of 'Cherokee Shuffle' at 130 bpm",
      "Execute Bill Monroe's three-finger picking-hand patterns",
      "Maintain swing 8th-note feel throughout",
    ],
    writtenContent:
      "## Bill Monroe's masterpiece\n\n'Cherokee Shuffle' (also known as 'Lost Indian') is a Bill Monroe-popularized fiddle tune that became a bluegrass mandolin staple. The melody dances; the rhythm swings; the Pro mandolinist must master both.\n\n## The signature feel\n\nUnlike most bluegrass tunes (straight 16ths), 'Cherokee Shuffle' has a *swing* feel. The off-beats are slightly delayed, creating a loping, dance-like motion. Get the swing right and the tune comes alive; get it straight and it sounds wrong.\n\n## Three-finger picking-hand patterns\n\nMonroe's signature: down-up-down on consecutive 16ths, then a clipped down-up to anchor the next beat. This rhythmic phrasing is the Bill Monroe fingerprint.\n\n## Tempo\n\nReal session tempo is 130-150 bpm. For L6, target 130. Cleanness first; speed second.",
    drills: {
      teach: [
        { id: "t_why", heading: "Cherokee Shuffle = Monroe's grammar", body: "Bill Monroe is bluegrass mandolin. Mastering one of his showcase tunes places you in the lineage. Every working bluegrass mandolinist has played this tune in jams hundreds of times." },
        { id: "t_shape", heading: "Swing 8ths feel different from straight", body: "On a straight 8th, the off-beat lands at exactly 50% of the beat. On a swing 8th, it lands at 60-67%. The off-beat is slightly *late*. This is what gives the music its loping character." },
        { id: "t_pitfall", heading: "Common mistake: straightening the swing", body: "Beginners default to straight 8ths because they're easier. The result sounds wrong — like a metronome instead of music. Listen to Monroe; feel the lope; then play." },
      ],
    },
    audioRefs: [
      { id: "demo_a_part", label: "Cherokee Shuffle A-part · 100 bpm with swing" },
      { id: "demo_full", label: "Full AABB · 130 bpm target tempo" },
      { id: "demo_monroe", label: "Bill Monroe original recording reference" },
    ],
  },
  mandolin_l6_03_duet: {
    id: "mandolin_l6_03_duet",
    title: "Mandolin + fiddle duet · trading the lead",
    objectives: [
      "Play a 32-bar tune as a duet with another mandolin or fiddle",
      "Take 8 bars of melody, then drop to chop for 8 bars, then return",
      "Lock the chops cleanly when accompanying",
    ],
    writtenContent:
      "## The bluegrass twin instrument · mandolin + fiddle\n\nIn a bluegrass band, mandolin and fiddle frequently trade leads. While one plays the melody, the other supports with chops or harmony. Mastering this trade is the social heart of bluegrass.\n\n## The trade\n\nPlayer A takes the A-part melody. Player B chops on 2 and 4. Then Player B takes the B-part melody. Player A chops. Then they may trade 4 bars at a time, or play the melody together (in unison or third-harmony).\n\n## Chop discipline\n\nWhen accompanying, your chop must be *exactly* on 2 and 4. Even 30ms off is audible. The mandolinist who can't chop accurately while another player solos is not invited back to the jam.\n\n## Listening cues\n\nThe melody player drives. Watch their bow (fiddle) or pick hand (mandolin). When they nod or look up, it's your turn for the lead.",
    drills: {
      teach: [
        { id: "t_why", heading: "Duets force listening", body: "Solo playing lets you hear yourself. Duet playing demands you hear someone else *more* than yourself. This is the listening skill that makes bluegrass jams function." },
        { id: "t_shape", heading: "Chop accuracy is the test", body: "Your melody can be flashy; your chop *must* be precise. The chop is the rhythm section's heartbeat. A loose chop kills the band. Your accuracy when accompanying is more important than your flash when leading." },
        { id: "t_pitfall", heading: "Common mistake: over-playing in support", body: "Beginners playing chops add ornaments because they're bored. Don't. The chop is one note (the chord), one duration (clipped), on two beats (2 and 4). That's it. Discipline." },
      ],
    },
    audioRefs: [
      { id: "demo_duet", label: "Mandolin + fiddle duet · trading lead" },
      { id: "demo_chop_under_solo", label: "Mandolin chops under fiddle solo · target lock" },
      { id: "demo_monroe_band", label: "Reference · Bill Monroe band trade" },
    ],
  },
  mandolin_l6_04_pro_cert: {
    id: "mandolin_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute mandolin performance",
    objectives: [
      "Perform a 5-minute set: one fiddle tune + one chord-melody piece",
      "Demonstrate tremolo, chops, alternate picking, and swing feel",
      "Hold the pocket against a backing track without drift",
    ],
    writtenContent:
      "## The 5-minute mandolin set\n\nFive minutes. Two pieces. Solo or with backing. This is the bluegrass open-mic standard, the festival workshop format, the working mandolinist's daily reality.\n\n## Programming\n\nPiece 1: a fiddle tune ('Soldier's Joy,' 'Salt Creek,' 'Cherokee Shuffle'). 2-3 min. Demonstrates speed + alternate picking + tradition.\n\nPiece 2: a chord-melody piece (an arrangement of a standard or your L6 tremolo work). 2-3 min. Demonstrates tone + sustain + harmonic awareness.\n\nThe two pieces should *contrast* — one fast traditional, one melodic + harmonic.\n\n## What passes\n\nNo restarts. Tempo holds. Each piece sounds played 100 times. Tremolo even. Chops accurate. The set has shape — fast opener, contemplative closer.",
    drills: {
      teach: [
        { id: "t_why", heading: "5 minutes builds stage muscle", body: "Performing 5 unbroken minutes is harder than 5 separate 1-minute exercises. Endurance, focus, recovery — only develop under continuous performance pressure. This cert prepares you for paid gigs." },
        { id: "t_shape", heading: "Contrast is the secret weapon", body: "Two fiddle tunes is repetitive. A fiddle tune + chord-melody piece showcases your range. Programmers who pick contrasting pieces always sound better than those who pick similar ones." },
        { id: "t_pitfall", heading: "Common mistake: under-rehearsed Piece 2", body: "Most students nail the fiddle tune and panic on the chord-melody. Equal time on both. The cert is the weaker piece, not the stronger one. Drill what scares you." },
      ],
    },
    audioRefs: [
      { id: "demo_fiddle_tune", label: "Reference fiddle tune · target performance" },
      { id: "demo_chord_melody", label: "Reference chord-melody piece · target performance" },
      { id: "demo_full_set", label: "Full 5-minute Pro Cert example" },
    ],
  },

  // ═══ MANDOLIN · L7 ═══
  mandolin_l7_01_advanced_1: {
    id: "mandolin_l7_01_advanced_1",
    title: "Cross-picking · Jesse McReynolds three-string roll",
    objectives: [
      "Execute the cross-pick pattern: down-down-up across three strings",
      "Maintain consistent tempo at 120 bpm",
      "Apply cross-picking to a melodic passage",
    ],
    writtenContent:
      "## Cross-picking · banjo on a mandolin\n\nJesse McReynolds invented cross-picking on mandolin in the 1950s by adapting Earl Scruggs's three-finger banjo roll. The mandolin pick mimics the three banjo fingers, creating a forward-rolling, hypnotic pattern.\n\n## The pattern\n\nDown-down-up. Three strokes, three strings: D string (down), A string (down), E string (up). Then repeat: D-A-E, D-A-E. The motion creates a rolling 16th-note texture.\n\n## What makes it hard\n\nUnlike alternate picking (down-up-down-up), cross-picking has *two consecutive down-strokes* across two different strings. The pick must travel further between notes, but smoothly. Practice slowly until the motion is fluid.\n\n## Why it's Genius-tier entry\n\nCross-picking is one of the few mandolin techniques that doesn't transfer naturally from any other instrument. It's mandolin-specific. Mastering it places you among elite players — McReynolds, David Grisman, Chris Thile.",
    drills: {
      teach: [
        { id: "t_why", heading: "Cross-picking is mandolin's banjo equivalent", body: "Banjo's defining sound is the three-finger roll. Mandolin's only equivalent is cross-picking. Mastering it gives the mandolin a banjo-like cascade without abandoning its native voice." },
        { id: "t_shape", heading: "Two consecutive downs is the trick", body: "The hard part is the second down-stroke crossing to a new string. Practice this single motion (down on D, then down on A) for 10 minutes before adding the up-stroke. Build the move first." },
        { id: "t_pitfall", heading: "Common mistake: rushing the third stroke", body: "Beginners hurry the up-stroke because the two downs felt slow. Don't. All three strokes must be evenly spaced. Metronome on; 8 strokes per beat at 80 bpm. Build slowly." },
      ],
    },
    audioRefs: [
      { id: "demo_cross_pick", label: "Basic cross-pick pattern · 80 bpm" },
      { id: "demo_target", label: "Cross-pick at 120 bpm with melodic application" },
      { id: "demo_mcreynolds", label: "Jesse McReynolds reference recording" },
    ],
  },
  mandolin_l7_02_rep_4: {
    id: "mandolin_l7_02_rep_4",
    title: "'Bach Partita No. 3 - Preludio' · classical mandolin Genius repertoire",
    objectives: [
      "Play the opening 32 bars of Bach's Preludio (BWV 1006)",
      "Execute consistent tremolo through the long melodic notes",
      "Maintain Baroque articulation and tempo",
    ],
    writtenContent:
      "## Bach on mandolin · the Genius repertoire\n\nJ.S. Bach's Partita No. 3 in E major (BWV 1006), originally for solo violin, transcribes brilliantly to mandolin. Chris Thile's recording (2013) brought this to mainstream mandolin attention. The Preludio is 4 minutes of relentless 16th notes — a tour de force.\n\n## Why this is L7\n\n- Tempo: ~80 bpm with constant 16th notes (320 notes per minute)\n- Range: spans 3 octaves\n- Articulation: each note crystal clear\n- Voice leading: implied counterpoint requires emphasizing certain notes\n\n## The approach\n\nPractice 4 bars at a time. Slow (50 bpm) for 2 weeks. Build to target. Don't try the full piece until you've mastered each 4-bar section in isolation.\n\n## Tone target\n\nBach's voice on mandolin is *clean, articulated, dancing*. No sloppy strokes; no ornaments not written. Discipline first; expression after.",
    drills: {
      teach: [
        { id: "t_why", heading: "Bach is universal proof of technique", body: "If you can play Bach cleanly, you can play anything. Baroque music has zero margin for error — every note exposed, every articulation audible. It's the ultimate technique audit." },
        { id: "t_shape", heading: "4-bar sections, then combine", body: "Don't attempt the full Preludio. Pick the first 4 bars. Master them. Add the next 4. Combine. This isolation-then-combination approach is how Thile and Marshall practice." },
        { id: "t_pitfall", heading: "Common mistake: rushing fast passages", body: "Beginners speed up at familiar passages and slow down at hard ones. Bach demands ironclad tempo. Metronome on. Discipline first; expression after." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Bach Preludio first 8 bars · 50 bpm" },
      { id: "demo_target", label: "Bach Preludio first 32 bars · target tempo" },
      { id: "demo_thile", label: "Chris Thile reference recording" },
    ],
  },
  mandolin_l7_03_improv_2: {
    id: "mandolin_l7_03_improv_2",
    title: "16-bar mandolin solo · 'Wheel Hoss' or original bluegrass changes",
    objectives: [
      "Improvise 16 bars over a fast bluegrass progression at 130 bpm",
      "Use chord-tone melody plus chromatic approach tones",
      "Build a coherent solo arc with motivic development",
    ],
    writtenContent:
      "## A real bluegrass solo · 16 bars of statement\n\n16 bars is enough for a complete musical thought. At 130 bpm bluegrass tempo, 16 bars passes in 30 seconds — but in those 30 seconds, you can demonstrate everything: chord-tone awareness, motif development, chromatic vocabulary, and the iconic G run cadence.\n\n## The progression\n\nG / G / C / G / D / G / D / G (16 bars repeated). Standard bluegrass I-IV-V. Easy navigation; rich for soloing.\n\n## Vocabulary\n\nBluegrass uses: G major pentatonic + the blue note B♭ + chromatic approach tones (the half-step below each chord tone). David Grisman built his career on adding jazz vocabulary (extensions, alterations) to this base.\n\n## The arc\n\nBars 1-4: state a motif. Bars 5-8: vary it. Bars 9-12: introduce contrast (perhaps a chromatic passage). Bars 13-16: drive to the G run cadence.",
    drills: {
      teach: [
        { id: "t_why", heading: "Solos are mini-compositions", body: "A great 16-bar solo isn't 16 bars of fast notes — it's a mini-composition you write in real time. The architectural thinking is identical to writing a song; only the time pressure differs." },
        { id: "t_shape", heading: "Develop one motif, don't generate ten", body: "Listen to Bill Monroe, David Grisman, Chris Thile — every great mandolin soloist returns to motifs. The solo's coherence comes from repetition with variation, not constant new ideas." },
        { id: "t_pitfall", heading: "Common mistake: scale-running", body: "Beginners playing solos run scales — up and down, beat after beat. Scale-running is the opposite of soloing; it's the absence of musical thought. Use scales as vocabulary, never as content." },
      ],
    },
    audioRefs: [
      { id: "demo_changes", label: "Wheel Hoss-style chord pad · 130 bpm" },
      { id: "demo_solo", label: "16-bar mandolin solo example with motivic development" },
      { id: "demo_grisman", label: "David Grisman solo reference fragment" },
    ],
  },

  // ═══ MANDOLIN · L8 ═══
  mandolin_l8_01_style_study: {
    id: "mandolin_l8_01_style_study",
    title: "Style study · Bill Monroe · 'Roanoke' transcription",
    objectives: [
      "Transcribe 30 seconds of Bill Monroe's 'Roanoke' (1954)",
      "Reproduce his three-finger picking-hand patterns",
      "Capture the bluegrass swing feel and Monroe's signature tone",
    ],
    writtenContent:
      "## Why Monroe · why 'Roanoke'\n\nBill Monroe is the founder of bluegrass mandolin. His 1954 recording of 'Roanoke' is one of the genre's defining tracks. Mastering 30 seconds of Monroe = entering the founder's lineage.\n\n## The transcription target\n\nFocus on 0:30-1:00 — Monroe's first solo. The tempo is fast (~140 bpm), the picking pattern is his signature down-up-down-clipped-up, the tone is the iconic Gibson F5 'chop and roll.'\n\n## Reproducing the feel\n\nMonroe's swing is unique — a slightly back-of-the-beat lope. He doesn't rush; he *anchors*. This grounded feel is what gives bluegrass its drive without being frantic.\n\n## Tone settings\n\nMonroe played a Gibson F5 (the classic bluegrass mandolin). Heavy strings, large pick (often homemade tortoiseshell). The tone is bright, percussive, woody. To approximate: choose a thick pick, play near the bridge, dig in.",
    drills: {
      teach: [
        { id: "t_why", heading: "Monroe is bluegrass's foundation", body: "Every bluegrass mandolinist who came after — Sam Bush, David Grisman, Chris Thile — built on Monroe's vocabulary. Transcribing Monroe is studying the source code of the genre." },
        { id: "t_shape", heading: "Pick the 30 seconds carefully", body: "Don't transcribe random 30 seconds. Pick a complete musical thought — usually a solo break or the head melody. A coherent passage is easier to study and more pedagogically rich." },
        { id: "t_pitfall", heading: "Common mistake: missing the swing", body: "Beginners transcribe Monroe's pitches accurately but play them straight (no swing). The result is technically correct but soulless. The swing is the song. Match Monroe's exact lope." },
      ],
    },
    audioRefs: [
      { id: "demo_monroe_full", label: "Bill Monroe · Roanoke full recording reference" },
      { id: "demo_target_30sec", label: "0:30-1:00 transcription target loop" },
      { id: "demo_student_attempt", label: "Sample student transcription with Monroe feel" },
    ],
  },
  mandolin_l8_02_rep_5: {
    id: "mandolin_l8_02_rep_5",
    title: "'Hartford's Real' (Mike Marshall) · 7-minute concert piece",
    objectives: [
      "Perform Mike Marshall's 'Hartford's Real' end-to-end (~7 min)",
      "Execute the rapid passages and tonal contrasts",
      "Hold dynamic shape across the long form",
    ],
    writtenContent:
      "## The concert showcase\n\nMike Marshall's 'Hartford's Real' (a tribute to John Hartford) is a 7-minute mandolin concerto-style piece that traverses bluegrass, classical, and jazz vocabulary. It's contemporary mandolin Genius repertoire.\n\n## What 7 minutes asks\n\n- Endurance: hand stays relaxed for 7 minutes\n- Memory: 5-6 distinct sections with different feels\n- Speed: 16th-note bluegrass passages at 130+ bpm\n- Tonal range: from bluegrass chop to classical tremolo\n\n## Why this piece is L8\n\nIt requires every L1-L7 skill: alternate picking, cross-picking, tremolo, chop discipline, swing feel, classical articulation. And it requires *stamina* — the will to stay focused across a long arc.\n\n## Programming logic\n\nMarshall's piece traverses bluegrass → classical → jazz → bluegrass. The full circle structure rewards listeners with closure. This is concert programming at its sophisticated best.",
    drills: {
      teach: [
        { id: "t_why", heading: "7 minutes is concert ground", body: "The leap from 5-minute Pro Cert to 7-minute concert piece is the leap from gigging to soloing. Stamina + memory + arc — all tested simultaneously." },
        { id: "t_shape", heading: "Memorize transitions, not measures", body: "You can't memorize 7 minutes bar by bar. Memorize the 5-6 transitions between sections — those are the hardest moments. The middle of each section will follow." },
        { id: "t_pitfall", heading: "Common mistake: pacing", body: "Beginners blow their dynamic budget in the first 90 seconds. By minute 4, they've nowhere to go. Pace yourself. Climax in the middle, not at the start." },
      ],
    },
    audioRefs: [
      { id: "demo_marshall", label: "Mike Marshall · Hartford's Real reference recording" },
      { id: "demo_section_breakdown", label: "Section-by-section breakdown of the piece" },
      { id: "demo_classical_passage", label: "Isolated classical-style passage at slow tempo" },
    ],
  },
  mandolin_l8_03_accompany: {
    id: "mandolin_l8_03_accompany",
    title: "Lead vs. accompany · mandolin in a bluegrass jam",
    objectives: [
      "Take 8 bars of solo, then drop to chops for 8 bars, then return",
      "Read jam etiquette cues — when to take a break, when to chop",
      "Maintain clean, accurate chops while another musician solos",
    ],
    writtenContent:
      "## Bluegrass jam etiquette\n\nIn a bluegrass jam, players rotate solos in a fixed order — usually around the circle. Each player takes a 'break' (a solo over the form) when their turn comes. Between breaks, you chop — accurately, on 2 and 4, every bar.\n\n## Accompanist mode\n\n- Volume: drop to mp\n- Chop on 2 and 4, every bar, no exceptions\n- Eyes on the soloist\n- No flashy ornaments — the chop is the chop\n\n## Lead mode\n\n- Volume: rise to mf\n- Take the melody (or improvise over it)\n- Other players drop to chops\n- Drive the band — your tempo is the band's tempo for these 8 or 16 bars\n\n## The trade signal\n\nIn most jams, the previous soloist nods or makes eye contact when it's your turn. Watch the room. Take your break when offered. Pass cleanly when done.",
    drills: {
      teach: [
        { id: "t_why", heading: "Jamming = listening 80%, playing 20%", body: "The mandolinist who plays the most notes in a jam is rarely the most respected. The one who *listens* most carefully is. Your role shifts moment to moment based on what the music needs." },
        { id: "t_shape", heading: "Chop accuracy is the test", body: "Your solo can be flashy; your chop *must* be precise. The chop is the rhythm section's heartbeat. A loose chop kills the band. Your accuracy when accompanying matters more than your flash when leading." },
        { id: "t_pitfall", heading: "Common mistake: hogging the lead", body: "Some players take a turn and won't pass. The bluegrass jam depends on rotation. Take your break, then pass. Generosity makes you welcome at every jam." },
      ],
    },
    audioRefs: [
      { id: "demo_accompany", label: "Mandolin chops under fiddle solo · target performance" },
      { id: "demo_lead", label: "Mandolin taking an 8-bar break" },
      { id: "demo_full_jam", label: "Reference · full bluegrass jam rotation" },
    ],
  },

  // ═══ MANDOLIN · L9 ═══
  mandolin_l9_01_compose: {
    id: "mandolin_l9_01_compose",
    title: "Compose a 32-bar original mandolin tune",
    objectives: [
      "Write a 32-bar original mandolin composition with a clear melodic identity",
      "Use AABB or AABA form with a contrasting B-section",
      "Notate it (tab or staff) and record a final take",
    ],
    writtenContent:
      "## Composition · the master's gate\n\nPlaying others' tunes is apprenticeship. Writing your own — even imperfectly — is artistry. 32 bars of original mandolin music is a complete musical statement.\n\n## Form options\n\n- **AABB (32 bars)**: 8 + 8 + 8 + 8. The default fiddle-tune form. A-part is the main melody; B-part contrasts in register or mood.\n- **AABA (32 bars)**: 8 + 8 + 8 + 8 with a bridge section. More common in jazz mandolin (Grisman, Thile).\n\n## Process\n\n1. Pick a key + tempo. Stay there.\n2. Write the A-melody by humming, not by fretting. Hum first, find on mandolin second.\n3. Write the B-section. Different register, different feel. Should *contrast* with A.\n4. Notate. Record. Listen back. Edit ruthlessly.\n\n## What 'good' looks like\n\nA listener hums your A-melody after one listen. The B-section feels distinct but related. The tune lives within the bluegrass tradition while saying something new.",
    drills: {
      teach: [
        { id: "t_why", heading: "Composing exposes every weakness", body: "32 bars of writing reveals where your harmonic, melodic, rhythmic vocabulary is thin. Every weakness becomes a gap on the page. That's the point — composition is the diagnostic." },
        { id: "t_shape", heading: "Hum before you fret", body: "Most mandolinists compose by trying picking patterns. That produces predictable music. Hum the melody first, find it on the mandolin second. Vocal melody first; instrument is the servant." },
        { id: "t_pitfall", heading: "Common mistake: too-fast B-section", body: "Beginners make the B-section the same tempo and complexity as the A. Don't. Contrast is the song's life. Slow the B, change the register, shift the mood. Make it feel like a different room." },
      ],
    },
    audioRefs: [
      { id: "demo_aabb", label: "Reference · sample AABB mandolin composition" },
      { id: "demo_aaba", label: "Reference · sample AABA mandolin composition" },
      { id: "demo_process", label: "Compositional process walkthrough · idea to final take" },
    ],
  },
  mandolin_l9_02_masterclass: {
    id: "mandolin_l9_02_masterclass",
    title: "Record a 10-minute masterclass · teach what you know",
    objectives: [
      "Record a 10-minute video lesson on a mandolin technique you've mastered",
      "Demonstrate slowly, then at tempo, with clear narration",
      "Anticipate and address common student failure modes",
    ],
    writtenContent:
      "## Teaching = the deepest learning\n\nWhen you can play a technique but can't teach it, you don't fully own it. The 10-minute masterclass forces you to articulate what your fingers know wordlessly.\n\n## Format\n\n- 0:00-1:00: introduce the technique. Why it matters. Who pioneered it (Monroe, McReynolds, Thile).\n- 1:00-3:00: demonstrate slowly. Each motion isolated and named.\n- 3:00-6:00: build to target tempo with intermediate stages.\n- 6:00-8:00: common mistakes — show what goes wrong, fix it on camera.\n- 8:00-10:00: practice plan. What the student does tomorrow morning.\n\n## Choosing a topic\n\nTremolo. Cross-picking. Chops. Alternate picking. Pick one technique you've drilled hundreds of times. Don't pick what's impressive — pick what you genuinely understand.\n\n## What 'good' looks like\n\nA student watches and walks away with a clear practice path. They know what to drill tomorrow. If your masterclass leaves them confused, you taught for yourself, not for them.",
    drills: {
      teach: [
        { id: "t_why", heading: "Teaching exposes hidden assumptions", body: "When you have to explain *why* alternate picking is non-negotiable for speed, you discover whether you understand or just imitate. Teaching reveals your gaps with brutal clarity." },
        { id: "t_shape", heading: "Predict failure modes", body: "List the top 3 ways students will mess up your technique before filming. Address each on camera. The masterclass that anticipates failures is the one students actually use." },
        { id: "t_pitfall", heading: "Common mistake: too much demo, too little teaching", body: "Filming yourself playing impressively is not teaching. Half your time should be slow demos + diagnosis, not flash. Audiences need guidance, not awe." },
      ],
    },
    audioRefs: [
      { id: "demo_masterclass_excerpt", label: "Sample student masterclass · cross-picking technique" },
      { id: "demo_failure_modes", label: "Common failure modes for tremolo" },
      { id: "demo_thile_class", label: "Reference · Chris Thile teaching excerpt" },
    ],
  },
  mandolin_l9_03_genius_cert: {
    id: "mandolin_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute solo mandolin recital",
    objectives: [
      "Program and perform a 15-20 minute solo mandolin recital",
      "Include 4 contrasting works: traditional fiddle tune, classical/Bach, original, virtuosic",
      "Demonstrate complete artistic command — Monroe-grounded, Thile-reaching",
    ],
    writtenContent:
      "## The recital · final demonstration\n\n15-20 minutes. Solo. The audience hears nothing but you and the mandolin for the duration. This is what Chris Thile, Mike Marshall, and Sierra Hull face every concert night.\n\n## Recommended program\n\n1. **Traditional fiddle tune** (3-4 min): 'Soldier's Joy,' 'Cherokee Shuffle,' 'Salt Creek.' Demonstrates lineage + speed.\n2. **Classical** (4-5 min): your L7 Bach Preludio or another transcription. Demonstrates technical precision + repertoire breadth.\n3. **Original** (4-5 min): your L9 composition. Demonstrates voice.\n4. **Showcase** (4-5 min): a virtuosic piece — Marshall's 'Hartford's Real,' Thile's 'Riddles in the Dark,' or a David Grisman composition.\n\n## Programming logic\n\nOpen with a recognizable, accessible piece. Build to technical complexity. Include emotional contrast. Close on something memorable. Pacing is the secret of good recitals.\n\n## What passing looks like\n\nThe audience forgets they're watching a mandolin recital and just listens to music. No 'wow that's amazing on a mandolin' — just 'wow, that was beautiful.' The instrument disappears; the artistry remains.",
    drills: {
      teach: [
        { id: "t_why", heading: "Solo recital = your portfolio", body: "Every concert mandolinist has performed solo recitals. It's the universal proof of artistic command. Pass this and you're not 'learning mandolin' anymore — you're a mandolinist." },
        { id: "t_shape", heading: "Pacing > virtuosity", body: "An audience tires of constant fireworks. Mix slow + fast, simple + complex, traditional + new. The recital that breathes is the recital that holds attention for 20 minutes." },
        { id: "t_pitfall", heading: "Common mistake: ignoring the bluegrass root", body: "Some mandolinists treat the instrument as a 'small classical instrument' and program no traditional content. Don't. The mandolin's heart in America is bluegrass. At least one piece in that tradition grounds your recital." },
      ],
    },
    audioRefs: [
      { id: "demo_recital_full", label: "Reference · full 18-minute solo mandolin recital" },
      { id: "demo_program_notes", label: "Program-note examples for solo mandolin recitals" },
      { id: "demo_thile_concert", label: "Chris Thile solo concert excerpt" },
    ],
  },
};
