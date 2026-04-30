/**
 * Hand-authored L5-L9 overrides · bowed + reed advanced:
 * cello · saxophone · trumpet · clarinet.
 *
 * Pro-tier (L5-L6) through Genius-tier (L7-L9). Tone production
 * + repertoire mastery + genre fluency. Concert-hall + jazz-club
 * standards by L8-L9.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const BOWED_REED_ADVANCED_OVERRIDES: Record<string, Patch> = {
  // ═══════════════════════════════════════════════════════════
  // CELLO · L5 (Pro entry · harmony, fast runs, improv, rep)
  // ═══════════════════════════════════════════════════════════
  cello_l5_01_harmony: {
    id: "cello_l5_01_harmony",
    title: "Bach Prelude in G · arpeggiated harmony in single line",
    objectives: [
      "Outline I-IV-V chords on a single cello line",
      "Voice the bass note with extra weight on beat 1",
      "Play 16 bars of the Bach G-major Prelude opening",
    ],
    writtenContent:
      "## Cello as harmony machine\n\nA cello line is monophonic, but Bach's Cello Suite No. 1 Prelude in G fakes 4-voice counterpoint by *implying* harmony through arpeggios. The first bar — G D B D G D B D — outlines a G-major chord; bar 2 implies C/G; bar 3 returns to G.\n\n## Voice the bass\n\nBeat 1 of every bar carries the chord root. Lean an extra 10% bow weight on those notes so the ear hears 'G... C... G... D...' as a chord progression beneath the running 16ths.\n\n## Goal\n\nA listener should hear three voices: bass, middle, top. All from one bow.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this matters", body: "Every audition committee tests Bach Suite No. 1 Prelude. It's the cello equivalent of 'Stairway' — overplayed, but that's because it reveals everything: bow control, phrasing, harmonic intelligence." },
        { id: "t_shape",   heading: "Shape of the phrase", body: "Each 4-bar group is one harmonic gesture. Don't articulate every 16th equally — let beat 1 sing, beats 2-4 ripple beneath. Yo-Yo Ma's 1983 recording is the reference." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Beginners hammer every 16th note evenly = mechanical, no harmony heard. Voice the bass with weight; let the upper notes pass lightly. Differentiated touch = chord progression appears." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bach G-major Prelude bars 1-8 · 60 bpm · bass voiced" },
      { id: "demo_target", label: "Bach G-major Prelude bars 1-16 · target tempo · Yo-Yo Ma reference" },
      { id: "demo_pitfall", label: "Same passage played mechanically · what to avoid" },
    ],
  },
  cello_l5_02_fast: {
    id: "cello_l5_02_fast",
    title: "16-beat sixteenth-note run · 120 bpm precision drill",
    objectives: [
      "Play 16 sixteenth notes per beat at 120 bpm cleanly",
      "Use spiccato bow stroke for clarity",
      "Maintain pitch accuracy under speed pressure",
    ],
    writtenContent:
      "## Speed = bow + fingers in lockstep\n\nAt 120 bpm, each sixteenth note lasts 125ms. The bow must travel ~6cm in that window with a clean attack. Below 110 bpm, detaché works; above, you need spiccato — a bouncing bow that lets gravity do half the work.\n\n## The drill\n\nG-major scale ascending + descending, sixteenth notes, 120 bpm, two octaves. 16 beats = 64 notes total.\n\n## Listen for\n\nDropouts (a note that didn't speak), pitch smear (finger arrived late), and bow scrape (pressure too high). Slow it to 90 bpm if any of these appear; speed is earned, not forced.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why fast scales", body: "Brahms Sonata in E-minor, Dvořák Concerto, Elgar Concerto — all demand controlled velocity. If your scale is sloppy at 120, your repertoire will be sloppy at performance tempo." },
        { id: "t_shape",   heading: "Spiccato setup", body: "Bow about 5cm from the frog, balance point. Light grip. Drop the bow onto the string and let it bounce naturally; don't force the bounce. Wrist relaxed, forearm steady." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pushing tempo before pitch is locked. If even one note is 15 cents flat at 90 bpm, it'll be 30 cents flat at 120. Tune at slow tempo first; speed reveals what you already had." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "G-major sixteenths · 90 bpm · clean spiccato" },
      { id: "demo_target", label: "G-major sixteenths · 120 bpm · 16-beat run" },
    ],
  },
  cello_l5_03_improv_1: {
    id: "cello_l5_03_improv_1",
    title: "First improvisation · 4 bars over G drone",
    objectives: [
      "Improvise a 4-bar melodic phrase in G major",
      "Use stepwise motion + one melodic leap per bar",
      "Resolve the phrase ending on a chord tone (G/B/D)",
    ],
    writtenContent:
      "## Cellist improv tradition\n\nClassical cellists rarely improvise — but Bach did, and so did the great cadenza writers. Modern cellists (Vincent Segal, Erik Friedlander, Hank Roberts) prove the cello is fully improvisational.\n\n## Constraints\n\nDrone on G (use a low-G open string sustained, or app drone). 4 bars in 4/4. Stay in G major. Each bar = ~3-5 notes. Let space exist between phrases.\n\n## Resolution\n\nThe last note must land on G, B, or D — the chord tones. Resolution is what separates 'improv' from 'noodling.' Land the plane.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why improv on cello", body: "Bach's preludes were partly improvised. The cadenza tradition — Boccherini, Haydn — required cellists to invent on the spot. Improv builds your ear so you hear the music before you play it." },
        { id: "t_shape",   heading: "Shape of a phrase", body: "Think question-answer. Bars 1-2 ask (rising motion, unresolved). Bars 3-4 answer (descending, resolves to G). Mirror the human breath: rise + fall." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing too many notes. Improv beginners stuff each bar with 8 sixteenths to 'sound impressive.' 3-5 notes per bar with conviction beats 16 hesitant ones. Space is music." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "G drone · slow improv example · 60 bpm" },
      { id: "demo_target", label: "4-bar improv at 80 bpm · resolves to G" },
    ],
  },
  cello_l5_04_rep_2: {
    id: "cello_l5_04_rep_2",
    title: "Saint-Saëns 'The Swan' · 32-bar intermediate piece",
    objectives: [
      "Perform first 32 bars of 'Le Cygne' from memory",
      "Sustain the long phrasing in 6/4 meter",
      "Use vibrato selectively on held notes",
    ],
    writtenContent:
      "## 'The Swan' from Carnival of the Animals\n\nSaint-Saëns wrote it for the cellist Lebouc in 1886. It's the most-played intermediate cello piece on Earth — and the gateway to Romantic phrasing. 6/4 meter, key of G, broad lyrical lines.\n\n## The challenge\n\nBow distribution. Each phrase spans 4 bars = 24 beats. You don't have enough bow for 24 beats in one stroke; you must change direction *invisibly* mid-phrase. Plan the bowings before you play.\n\n## Reference\n\nJacqueline du Pré's 1962 recording. Listen to how the bow change at bar 5 is silent — pressure stays even, speed adjusts. That's the technique to chase.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 'The Swan'", body: "Every cellist plays this in their first decade. It tests legato bowing, phrase shaping, and emotional restraint. Overplay it and it's saccharine; underplay and it's dull. Find the middle." },
        { id: "t_shape",   heading: "Plan the bowings", body: "Mark every bow change in pencil before you play. Most performers use ~6 bows per phrase. Down-up alternation is wrong here; sometimes 2 down-bows in a row makes the phrase sing." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Vibrato on every note. Romantic doesn't mean constant vibrato. Use it on the long notes (beat 1 of each bar), straight tone on passing notes. Selective vibrato = mature phrasing." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "'The Swan' bars 1-16 · 50 bpm · bowings demonstrated" },
      { id: "demo_target", label: "'The Swan' full 32 bars · target tempo · du Pré-style phrasing" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CELLO · L6 (Pro · vibrato mastery, rep, duet, cert)
  // ═══════════════════════════════════════════════════════════
  cello_l6_01_adv_tech: {
    id: "cello_l6_01_adv_tech",
    title: "Vibrato mastery · arm vibrato + finger vibrato fluency",
    objectives: [
      "Produce wide arm vibrato (Russian school) on long tones",
      "Switch to narrow finger vibrato (French school) on fast passages",
      "Vary vibrato width by emotional context",
    ],
    writtenContent:
      "## Two vibrato schools\n\n**Arm vibrato** — the whole forearm oscillates from the elbow. Wide, slow (~5-6 Hz), warm. Heinrich Schiff, Rostropovich. Used for sustained Romantic lines.\n\n**Finger vibrato** — only the fingertip rocks on the string. Narrow, fast (~7-8 Hz), bright. Pierre Fournier, French school. Used for fast Baroque passages.\n\n## When to use which\n\nDvořák Concerto slow movement = arm. Bach Suite gigues = finger or none. Schumann Concerto cadenza = both, switching mid-phrase.\n\n## The drill\n\nLong G on D-string. 4 beats no vibrato → 4 beats arm vibrato → 4 beats finger vibrato → 4 beats no vibrato. Listen for the *character* difference, not just speed.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why two types", body: "Pro orchestral cellists shift between schools within a single phrase. The Berlin Philharmonic cello section uses arm vibrato in Brahms, finger vibrato in Mozart. Range = professional flexibility." },
        { id: "t_shape",   heading: "Shape of arm vibrato", body: "Hand pivots from the wrist; forearm rocks from the elbow. The fingertip stays planted; only the *pad* of the finger oscillates. Pitch goes flat → in tune → flat (never sharp)." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Goat vibrato — too fast, too narrow, sounds nervous. Cause: gripping the neck. Fix: drop your thumb pressure; let the hand hang loose. Vibrato is a *release* of tension, not a manufacture of it." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Arm vibrato · slow demonstration · long tone" },
      { id: "demo_target", label: "Arm + finger vibrato switching · 4-bar phrase" },
      { id: "demo_pitfall", label: "Goat vibrato · what to avoid" },
    ],
  },
  cello_l6_02_rep_3: {
    id: "cello_l6_02_rep_3",
    title: "Elgar Cello Concerto · opening declamation",
    objectives: [
      "Play the unaccompanied opening of Elgar Concerto Op. 85",
      "Execute the four-note chord with full bow weight",
      "Sustain the long E-minor phrase to bar 8",
    ],
    writtenContent:
      "## The Elgar opening\n\nFour-note E-minor chord, fortissimo, alone. Then a sweeping descending line. The 1965 du Pré recording (with Barbirolli) is the standard — a 20-year-old playing this opening with conviction that defined the work for generations.\n\n## The chord\n\nB-E-G-B (bottom to top), all four strings sounded together. Roll the bow from low B to high B in ~0.3 seconds. Full down-bow, frog to tip, weight from arm and shoulder. The chord must sound *announced*, not strummed.\n\n## The descent\n\nFrom the chord, descend through E natural minor. Bowing: long, weighted, no rush. Vibrato wide and slow. This is the moment that says 'this is a serious cellist.'",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Elgar", body: "Composed 1919, post-war Britain. Elgar was 62, his world was shattered. The concerto is autumn made audible. Playing it is not technique — it's psychology channeled through gut strings." },
        { id: "t_shape",   heading: "Shape of the chord", body: "Roll bottom-to-top in 250-300ms. Top note (B) should arrive on the downbeat with maximum weight. The lower notes are the launchpad; the top note is the declaration." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Cracking the chord. Cause: bow slips between strings, only 2-3 sound. Fix: practice the roll silently first (bow contact only, no sound), then add weight. Rolling is bow-arm choreography." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Elgar opening · 50% tempo · chord roll demonstrated" },
      { id: "demo_target", label: "Elgar opening · full tempo · du Pré-style declamation" },
    ],
  },
  cello_l6_03_duet: {
    id: "cello_l6_03_duet",
    title: "Bach Two-Cello Invention · chamber duet skills",
    objectives: [
      "Play cello 1 part of Bach BWV 772 transcription",
      "Match articulation with the second cellist",
      "Trade melodic leadership at phrase boundaries",
    ],
    writtenContent:
      "## Chamber music starts with two\n\nBach's Two-Part Inventions (BWV 772-786) were originally for keyboard but transcribe beautifully for two cellos. They teach the core chamber-music skill: *listening while playing*.\n\n## The two roles\n\nVoice 1 leads, then yields. Voice 2 imitates, then leads. The melodic line passes between players every 2-4 bars. You must hear when your line becomes accompaniment and adjust dynamics.\n\n## Match articulation\n\nIf cellist 2 plays staccato eighths, cellist 1 must too. Mismatched articulation in a duet sounds amateur. Discuss bowings before the first run-through; agree, then commit.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why duet now", body: "Solo playing is a monologue. Duets are conversation. The Cleveland Quartet, Borodin Quartet, Emerson — all built on the principle that ensemble playing is harder than solo. You're 50% of a sound." },
        { id: "t_shape",   heading: "Shape of leadership", body: "When you have the melody, project. When you yield, drop 6dB. The transition happens at the bar line — don't overlap. Listen with your ears, not just your part." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing your part as if alone. The cellist who treats duet as solo + accompaniment will be marked down. Eye contact, breath cues, dynamic balance — all must be visible." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bach Invention BWV 772 · two-cello arrangement · 60 bpm" },
      { id: "demo_target", label: "Full duet · target tempo · with phrase-leadership cues" },
    ],
  },
  cello_l6_04_pro_cert: {
    id: "cello_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute recital",
    objectives: [
      "Perform Bach Prelude (G major) + 'The Swan' back-to-back",
      "Demonstrate vibrato variation across both works",
      "Maintain stamina + tone for full 5 minutes",
    ],
    writtenContent:
      "## The Pro recital\n\nFive minutes of music, two contrasting styles: Baroque (Bach) and Romantic (Saint-Saëns). The committee evaluates intonation, tone, phrasing, and stage presence.\n\n## Programming\n\nOpen with Bach — establishes seriousness, technical command. Pause 5 seconds. Then 'The Swan' — shows lyricism, emotional range. Don't reverse the order; you want to end on the lyrical high.\n\n## Stamina\n\n5 minutes of continuous bowing fatigues the right shoulder. Practice the full set 3x per week the month before. Build the muscle memory and the muscle endurance simultaneously.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Conservatory entrance auditions are 5-10 minutes of contrasting work. This Pro cert mirrors that exact format. Pass it, and you're auditioning at the level of a music-school applicant." },
        { id: "t_shape",   heading: "Shape of the program", body: "Bach = head music. Swan = heart music. The committee wants to see both. Don't cheat the contrast — vibrato should differ visibly between the two works." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Skipping the dress rehearsal. Recording yourself in performance clothes, in performance position, with no second chances — this surfaces problems no practice room reveals. Do it twice, week before." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min recital · Bach + Swan · Pro standard" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CELLO · L7 (Genius entry · double-stops, repertoire, improv)
  // ═══════════════════════════════════════════════════════════
  cello_l7_01_advanced_1: {
    id: "cello_l7_01_advanced_1",
    title: "Double-stops · two-string fluency for Brahms sonata",
    objectives: [
      "Play sustained double-stops in thirds across two strings",
      "Maintain pitch on both notes simultaneously",
      "Apply to opening of Brahms Sonata in E-minor Op. 38",
    ],
    writtenContent:
      "## Two notes, one bow\n\nDouble-stops require the bow to weight two strings equally. The left hand presses two strings — same finger or different — with both notes in tune simultaneously. Brahms's E-minor Sonata opens with these in bars 1-4: rich, dark, autumnal.\n\n## The geometry\n\nBow contact point shifts to between the two strings. Bow pressure is split — each string gets ~50%. If you favor one string, the other goes thin or disappears.\n\n## Tuning\n\nBoth notes must lock. The interval (third, sixth, octave) tells you what to listen for. A clean third has zero beating; a dirty third has a wobble at ~5Hz. Train your ear on the wobble.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why double-stops now", body: "Bach Suite No. 5 (scordatura), Brahms Sonata, Beethoven Op. 69, Kodály Solo Sonata — all require double-stop fluency. This is the gate to Genius-tier repertoire." },
        { id: "t_shape",   heading: "Shape of the bow", body: "Bow flat on both strings. Hair tilted neutrally — not toward one string. Weight from the upper arm, distributed to both contact points. Slow practice reveals which string you're cheating." },
        { id: "t_pitfall", heading: "Common pitfall", body: "One note is in tune, the other is 10 cents off. Fix: practice each note separately first, memorize finger placement, then combine. Tuning each interval is a separate ear-training exercise — don't skip it." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Thirds in C major · 60 bpm · double-stop drill" },
      { id: "demo_target", label: "Brahms Op. 38 opening · double-stops in context" },
    ],
  },
  cello_l7_02_rep_4: {
    id: "cello_l7_02_rep_4",
    title: "Bach Cello Suite No. 1 · Allemande movement",
    objectives: [
      "Perform the full Allemande from Bach Suite No. 1 BWV 1007",
      "Realize implied 3-voice counterpoint within the single line",
      "Use historically informed bowing (no constant vibrato)",
    ],
    writtenContent:
      "## Bach Suite No. 1, second movement\n\nThe Allemande is a moderate dance in 4/4. Bach embeds three voices in one cello line: bass (downbeats), tenor (offbeats), soprano (sixteenth-note flourishes). Casals's 1936 recording revealed this counterpoint to the modern world — before that, the Suites were considered études.\n\n## Reference recordings\n\nPablo Casals (1936-39) — the original revelation. Anner Bylsma (period instrument). Yo-Yo Ma (1983, 1997, 2018). Listen to all three; each makes different choices.\n\n## Bowing decisions\n\nBaroque practice: hooked bowings, varied note lengths within a slur, breath between phrases. Modern practice: more sustained, more vibrato. Choose your camp before the first practice session.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this Allemande", body: "Universally tested in conservatory auditions. Reveals everything about a cellist: rhythm, phrasing, harmonic intelligence, taste. There's nowhere to hide in unaccompanied Bach." },
        { id: "t_shape",   heading: "Shape of the dance", body: "Allemande is a moderate German dance. Tempo around quarter = 70-80. Don't drag (= dirge), don't rush (= scherzo). Find the walking pace. Each downbeat is a footfall." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Romantic vibrato on every note. Bach didn't write for that. Selective vibrato on long notes; straight tone on passing tones. Hilary Hahn's Bach (Sonatas+Partitas) is the model for this approach." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Allemande bars 1-8 · 60 bpm · with voicing analysis" },
      { id: "demo_target", label: "Full Allemande · target tempo · Casals-informed reading" },
    ],
  },
  cello_l7_03_improv_2: {
    id: "cello_l7_03_improv_2",
    title: "16-bar improvisation · jazz cello over Autumn Leaves",
    objectives: [
      "Improvise 16 bars over the Autumn Leaves changes",
      "Outline ii-V-i progressions with chord-tone melody",
      "Use pizzicato + bowed phrases alternately",
    ],
    writtenContent:
      "## Cello in jazz\n\nThe lineage is short but mighty: Oscar Pettiford on bass, Ron Carter on cello (yes, he doubles), David Darling, Erik Friedlander, Hank Roberts, Stephan Braun, Ernst Reijseger. Jazz cello = bowed melodicism + pizzicato bass + harmonic awareness.\n\n## Autumn Leaves\n\nE-minor (or G-major depending on key choice). The bridge moves to relative major. Each ii-V-i is 4 bars. 16 bars = first A + second A.\n\n## Two textures\n\nBars 1-8: bowed, lyrical, like Coltrane balladic phrasing translated to bow. Bars 9-16: pizzicato, walking-bass-influenced, percussive. Switching textures = arranger's mind in real time.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why jazz on cello", body: "Genre fluency separates technicians from artists. A cellist who can swing on Autumn Leaves and play Bach Allemande the same week has uncommon range. That's hireable musicianship." },
        { id: "t_shape",   heading: "Shape of the chorus", body: "Build over 16 bars. Bars 1-4: state a simple idea. 5-8: develop. 9-12: peak. 13-16: resolve. Don't blow your best lick in bar 1; you have nowhere to go after." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing classical cello with jazz changes. Different rhythmic feel — swing eighths, not straight. Listen to Ron Carter's bass on Miles's Four & More to internalize the time feel before improvising." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Autumn Leaves changes · slow walk-through · bowed" },
      { id: "demo_target", label: "16-bar improv · bowed + pizz · medium swing 130 bpm" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CELLO · L8 (Genius · maestro study, concert rep, ensemble)
  // ═══════════════════════════════════════════════════════════
  cello_l8_01_style_study: {
    id: "cello_l8_01_style_study",
    title: "Yo-Yo Ma · phrasing analysis across three recordings",
    objectives: [
      "Compare Ma's 1983, 1997, and 2018 Bach Suite No. 1 recordings",
      "Identify how his phrasing evolved over 35 years",
      "Apply one Ma-style choice to your own playing",
    ],
    writtenContent:
      "## Why Yo-Yo Ma\n\nThree complete recordings of the Bach Suites: 1983 (CBS, age 28), 1997 ('Inspired by Bach', age 42), 2018 (age 63). Same notes, three different artists. Studying his evolution is graduate-school cello.\n\n## What changed\n\n1983: Romantic, lush vibrato, big sound. 1997: more dance-like, asymmetric phrasing, period awareness. 2018: spiritual, spacious, less is more. Each is valid; each is *him* at that age.\n\n## The exercise\n\nPick the Prelude from Suite No. 1. Listen to all three Ma recordings back-to-back with score in hand. Mark differences in tempo, vibrato use, phrase breath. Then play it three different ways yourself. Choose the version that fits *you* now.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why study a maestro", body: "Imitation is the first step to originality. Pablo Casals studied Bach scores for 12 years before recording. Ma's lifetime with these works is a roadmap. Use it." },
        { id: "t_shape",   heading: "Shape of comparison", body: "Use a stopwatch. Time bar 1, bar 16, bar 32. The 1983 version is 30 seconds shorter than 2018 — same notes. Tempo + breath = the artist's signature." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Copying Ma exactly. The goal isn't imitation — it's understanding why he made each choice. Then make your own choices, informed by his. Ma 2018 wouldn't sound like Ma 1983 even if he tried." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Yo-Yo Ma 1983 · Prelude G-major · phrasing markers" },
      { id: "demo_target", label: "Yo-Yo Ma 2018 · same Prelude · for comparison" },
    ],
  },
  cello_l8_02_rep_5: {
    id: "cello_l8_02_rep_5",
    title: "Dvořák Cello Concerto · first movement opening",
    objectives: [
      "Play the cello entry (bar 60) of Dvořák Op. 104",
      "Project against an imagined orchestral B-minor backdrop",
      "Sustain the long lyrical line through bar 100",
    ],
    writtenContent:
      "## The greatest cello concerto\n\nBrahms famously said, 'Had I known one could write a cello concerto like this, I would have written one long ago.' Dvořák Op. 104, composed in 1894-95 in New York. The cello entry doesn't come until bar 60 — long orchestral introduction sets the world up first.\n\n## The entry\n\nB-minor, fortissimo, full bow. Then a long lyrical descent through bars 60-72. Rostropovich's 1968 recording with Karajan/BPO is the reference — power without bombast.\n\n## Projection\n\nIn a concert hall, you must cut through 80-piece orchestra. Bow contact point: closer to the bridge. Pressure: 80% max. Speed: moderate, weighted. Project = bow physics + visualization.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Dvořák", body: "It's the audition piece. Music-school masters auditions, orchestra trial entries, competition first rounds — all use Dvořák Op. 104, first movement. Knowing it cold = ticket to the next stage of your career." },
        { id: "t_shape",   heading: "Shape of the entry", body: "Bar 60 is a declaration. Bar 65 begins the descent. Bar 72 is rest point. Don't sustain volume the whole time; let the line breathe. Rostropovich varies dynamics within each phrase." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Forcing the sound. Pushing for volume produces tension, ugly tone, and back pain. Project with bow physics, not muscle. Heavy bow + slow speed = loud + warm. Light bow + fast speed = loud + thin." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Dvořák cello entry · 60% tempo · breath markers" },
      { id: "demo_target", label: "Dvořák Op. 104 first movement · cello entry through bar 100" },
    ],
  },
  cello_l8_03_accompany: {
    id: "cello_l8_03_accompany",
    title: "String quartet · cello as bass voice + soloist",
    objectives: [
      "Play cello part of Beethoven Op. 18 No. 1, slow movement",
      "Provide harmonic foundation when violin/viola lead",
      "Take melodic lead in cello solo passages",
    ],
    writtenContent:
      "## The quartet cellist\n\nIn a string quartet, cello has two roles: bass instrument (foundation, root motion) and soloist (melodic lead in slow movements). Beethoven Op. 18 No. 1, Adagio (D-minor) gives the cellist the opening melody — rare and beautiful.\n\n## Two modes\n\n**Bass mode**: locked rhythm with second violin/viola, root-position bass lines, dynamic ~6dB below the lead voice. **Solo mode**: project, lead, the others accompany you.\n\n## The Beethoven\n\nBars 1-8: cello has the melody. Project. Bars 9-16: violin takes over; you become bass. Switching modes mid-piece without losing tone is the hard part.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why quartet now", body: "The Emerson, Borodin, Cleveland, Takács quartets — all built on the cellist's ability to switch between bass and soloist seamlessly. Quartet is the highest discipline in classical music." },
        { id: "t_shape",   heading: "Shape of the role-switch", body: "Watch the first violinist's bow. When their bow is on the string with melody, you're support. When their bow lifts and yours starts the phrase, you're the leader. Eye contact at every transition." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing soloist all the time, or accompanist all the time. Both wrong. The score tells you which mode each bar requires; mark it explicitly: 'BASS' or 'LEAD' above each phrase. No ambiguity." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Beethoven Op. 18 No. 1 Adagio · cello entry · 50% tempo" },
      { id: "demo_target", label: "Full slow movement · target tempo · with quartet" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CELLO · L9 (Genius cert · compose, masterclass, recital)
  // ═══════════════════════════════════════════════════════════
  cello_l9_01_compose: {
    id: "cello_l9_01_compose",
    title: "Original composition · 32-bar solo cello piece",
    objectives: [
      "Compose 32 bars for unaccompanied cello in your chosen key",
      "Use at least one double-stop passage",
      "Notate using standard notation or tablature",
    ],
    writtenContent:
      "## Why composers play\n\nKodály, Britten, Bach — all wrote for their instrument because they understood it from the inside. Composing forces you to confront every choice: key, range, bow, phrasing, voicing.\n\n## Constraints\n\n32 bars, unaccompanied. Any meter. Any key (C-major hardest because everything is exposed; B-major easiest because the cello rings sympathetically). Include one double-stop passage of at least 2 bars.\n\n## Process\n\nStart with a 4-bar motive. Develop it for bars 5-16. Contrast in bars 17-24 (new key area or texture). Recapitulate in bars 25-32. This is the simplest sonata-arch form — proven to work for 300 years.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose now", body: "After hundreds of hours playing other people's music, you need to write your own. It deepens phrase understanding more than any analysis class. You become the architect, not just the construction worker." },
        { id: "t_shape",   heading: "Shape of the form", body: "32 bars = 4 eight-bar phrases. Phrase 1: state. Phrase 2: develop. Phrase 3: contrast. Phrase 4: return. This is the cello suite movement form Bach used. It works because the brain expects it." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Writing what you can't play. Test every passage as you write. If your hand can't play it at the chosen tempo, no one's hand can. Or revise the tempo. Don't notate fantasy." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 32-bar composition · arch form · solo cello" },
    ],
  },
  cello_l9_02_masterclass: {
    id: "cello_l9_02_masterclass",
    title: "Masterclass · record yourself teaching the Bach Prelude",
    objectives: [
      "Record a 10-min teaching session on Bach Suite No. 1 Prelude",
      "Demonstrate AND verbalize at least 3 technical concepts",
      "Diagnose a hypothetical student error and prescribe a fix",
    ],
    writtenContent:
      "## Why teaching is the test\n\nIf you can't teach it, you don't fully understand it. Recording yourself teaching the Bach Prelude forces metacognition: why do I do this? Why does it work? How do I name it?\n\n## Format\n\nCamera on you, cello in hand. 10 minutes. Imaginary student is a Pro-tier player struggling with bar 5 (where the harmonic motion shifts to D-minor). Diagnose what's typically wrong, demonstrate the fix.\n\n## What to cover\n\n1. The harmonic intent of bar 5. 2. The bow distribution challenge. 3. A common mistake (overplaying the chord change). 4. A drill to fix it. Watch Janos Starker's masterclasses on YouTube — his economy of words is the model.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach to learn", body: "Feynman's principle: if you can't explain it simply, you don't understand it. Cellists who can teach are double-employed (perform + teach). Cellists who can't teach are single-employed at best." },
        { id: "t_shape",   heading: "Shape of a lesson", body: "Diagnose (15%), demonstrate (40%), drill (30%), reflect (15%). Don't lecture. Don't play through. Pick one specific bar, fix one specific issue, show one specific result." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Showing off. The student doesn't need your concert version; they need their bar 5 to work. Resist the urge to play more than the example demands. Less playing, more teaching." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 10-min masterclass · Bach Prelude bar 5 · Starker-style" },
    ],
  },
  cello_l9_03_genius_cert: {
    id: "cello_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute recital",
    objectives: [
      "Perform Bach Suite No. 1 Allemande + Brahms or Dvořák opening + your composition",
      "Sustain tone, intonation, and phrasing across 20 minutes",
      "Bow articulation flawless under recital pressure",
    ],
    writtenContent:
      "## The Genius recital\n\n15-20 minutes. Three works: Bach Allemande (Baroque), a Romantic concerto opening (Brahms Op. 38 first movement OR Dvořák Op. 104 cello entry), your original composition. Programming arc: head, heart, voice.\n\n## The bar\n\nThis is conservatory-graduate level. Intonation within 5 cents on every note. No audible bow noise. No memory slips. No tempo drift. The recital should be releasable, with light editing, as a portfolio recording.\n\n## Mental prep\n\nSix weeks of dress rehearsals before the cert recording. Simulate audience: phone playing crowd noise, performance clothes, stand-up bow. Rehearse mistakes — practice recovering, not pretending it didn't happen.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Master's-degree cello recitals run 30 minutes; Genius cert runs 20. You're 75% of the way to professional credentials. This recording goes in your portfolio for a decade." },
        { id: "t_shape",   heading: "Shape of the recital", body: "Bach (5 min) → 30s pause → Romantic excerpt (8 min) → 30s pause → Original (5 min) → bow. Don't talk. Don't apologize. Begin and end with confidence; the middle takes care of itself." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Peaking in practice, not performance. Cellists often play their best in the practice room and worse in recital. Fix: dress-rehearse with cameras and audience for 6 weeks. Performance becomes routine, not exception." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 18-min Genius recital · Bach + Dvořák + original" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SAXOPHONE · L5
  // ═══════════════════════════════════════════════════════════
  saxophone_l5_01_harmony: {
    id: "saxophone_l5_01_harmony",
    title: "Outlining ii-V-I · sax over a Bb blues changes",
    objectives: [
      "Play arpeggios outlining ii-V-I in F major",
      "Land on chord tones at each barline",
      "Phrase across 4 bars without running out of air",
    ],
    writtenContent:
      "## Sax = harmony narrator\n\nA monophonic sax line carries harmony by *implying* it through chord-tone choices. Coltrane's 'Giant Steps' is the extreme — every eighth note is a chord tone. For Pro-tier sax, ii-V-I outlining is the foundation.\n\n## In F major\n\nii = Gm7 (G Bb D F). V = C7 (C E G Bb). I = Fmaj7 (F A C E). One bar each, four bars total. Outline ascending arpeggios; land on the chord-third or chord-seventh at the bar line.\n\n## Goal\n\nA listener should hear the chord progression without piano accompaniment — your line tells them where the harmony is going. That's harmonic phrasing on a single-note instrument.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why harmonic outlining", body: "Every standard, every blues, every bebop head — built on ii-V-I. Charlie Parker, Sonny Rollins, Coltrane all internalized this in their teens. It's the air you breathe in jazz harmony." },
        { id: "t_shape",   heading: "Shape of the arpeggio", body: "Up the chord, down the next. Gm7 ascending → C7 descending → Fmaj7 ascending. Creates arch contour, voice leads through 3rds and 7ths. Smooth, not jagged." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Random scale runs that ignore chord changes. Cellists call it 'noodling.' Result: line floats over harmony, doesn't lock to it. Fix: target the chord tone on beat 1; rest is decoration." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "ii-V-I in F · 80 bpm · arpeggio outline" },
      { id: "demo_target", label: "ii-V-I in F · 140 bpm · over piano comping" },
      { id: "demo_pitfall", label: "Same changes with floating scales · what to avoid" },
    ],
  },
  saxophone_l5_02_fast: {
    id: "saxophone_l5_02_fast",
    title: "Bebop scale · 16 sixteenth notes at 120 bpm",
    objectives: [
      "Play F bebop scale ascending + descending in eighth-note triplets",
      "Maintain finger + tongue coordination at 120 bpm",
      "Land back on F at the downbeat after 16 beats",
    ],
    writtenContent:
      "## The bebop scale\n\nMixolydian + chromatic passing tone. F bebop = F G A Bb C D Eb E F. The added natural-7 (E) makes chord tones land on downbeats when you start the scale on F. Parker, Dexter Gordon, Stan Getz — all built lines from this scale.\n\n## The drill\n\n120 bpm. F bebop ascending + descending, sixteenth notes. 16 beats = 64 notes. Fingers must move *and* the tongue must articulate every other note (legato pairs).\n\n## Articulation\n\n'doo-dah doo-dah' — first eighth tongued, second eighth slurred. This is bebop's syncopated articulation. Without it, the scale sounds classical, not jazz.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why bebop scale", body: "Every bebop solo from 1945-2025 uses this scale somewhere. It's the alphabet of post-Parker jazz language. If you can't play it at 120, your bebop transcriptions will be approximate at best." },
        { id: "t_shape",   heading: "Shape of articulation", body: "doo-dah doo-dah. Tongue on the upbeats (and-of-1, and-of-2). Slur the downbeats. Counterintuitive at first — your classical training tells you to tongue downbeats. Reverse that habit." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Choking the throat at speed. Cause: trying to push air through tense embouchure. Fix: drop the jaw 2mm, relax the throat, let air flow. Speed comes from relaxation, not effort." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "F bebop scale · 80 bpm · doo-dah articulation" },
      { id: "demo_target", label: "F bebop scale · 120 bpm · 16-beat run" },
    ],
  },
  saxophone_l5_03_improv_1: {
    id: "saxophone_l5_03_improv_1",
    title: "First 4-bar improv · F blues over backing track",
    objectives: [
      "Improvise 4 bars over F dominant 7 vamp",
      "Use F blues scale (F Ab Bb B C Eb) as primary palette",
      "Resolve final note to F or A (chord tones)",
    ],
    writtenContent:
      "## Your first solo\n\nF7 vamp — one chord, four bars. F blues scale: F Ab Bb B C Eb F. Six notes that always 'work' over an F7. Junior Walker, King Curtis, Maceo Parker — all built careers on this scale alone for soul/funk solos.\n\n## Constraints\n\n4 bars. Don't cram. 8-12 notes total. Use space. Bend the Bb up to B (the 'blue note slide') — this is the soul move that distinguishes blues from scales.\n\n## Resolution\n\nLast note: F or A. Ending on Bb sounds unresolved (good if intentional, bad if accidental). Pick your landing before you start — the rest of the solo points toward it.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why F blues", body: "F is the friendliest sax key — first 5 notes sit naturally under the fingers. Cannonball, Hank Mobley, Houston Person all recorded landmark blues solos in F. Start where the masters started." },
        { id: "t_shape",   heading: "Shape of the phrase", body: "Bar 1: state idea (3-4 notes). Bar 2: rest (silence is music). Bar 3: develop the idea (similar shape, different notes). Bar 4: resolve to F. Q & A architecture." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing too many notes. Beginners fear silence and fill every beat. Listen to Lester Young's 'Lady Be Good' solo — 8 notes per bar maximum. Less = more soulful." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "F blues scale · ascending + descending · 80 bpm" },
      { id: "demo_target", label: "4-bar improv over F7 · medium swing 120 bpm" },
    ],
  },
  saxophone_l5_04_rep_2: {
    id: "saxophone_l5_04_rep_2",
    title: "'Autumn Leaves' head · 32-bar standard",
    objectives: [
      "Play the full 32-bar melody of 'Autumn Leaves' from memory",
      "Phrase across the AABA structure",
      "Vary articulation (legato + tongued) for character",
    ],
    writtenContent:
      "## The standard standard\n\n'Les Feuilles Mortes' (Joseph Kosma, 1945). Every saxophonist learns it. Cannonball Adderley's 1958 'Somethin' Else' recording with Miles is the reference. Form: AABA, 32 bars, key of E-minor (concert) / F#-minor (alto) / G-minor (tenor).\n\n## The phrasing\n\nA section: descending melodic line, end-of-phrase rest. B section: rising sequence, more rhythmic intensity. Final A: like the first, but with a tag. Each A is 8 bars; B is 8 bars.\n\n## Articulation\n\nFirst A: legato, song-like. Second A: vary slightly — add a ghost note or two. B section: more articulated, drives toward the climax. Final A: tender resolution. The melody is your composition lesson — *how* you play it tells your story.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Autumn Leaves", body: "It's the most-played jam-session standard in history. Knowing the head cold + having one chorus of improv ready means you're employable at any jazz jam, anywhere. Universal jazz currency." },
        { id: "t_shape",   heading: "Shape of the form", body: "AABA = exposition-exposition-contrast-resolution. Don't play all four sections the same. The B section should *feel* different — louder, more articulated, higher in register. The contrast is the song." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing the head too straight. Jazz melody = composed melody + your interpretation. Bend pitches slightly, vary articulation, anticipate or delay phrases by an eighth. Stan Getz's 'Autumn Leaves' is the model." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Autumn Leaves head · 90 bpm · phrase markers" },
      { id: "demo_target", label: "Full 32-bar head · medium swing 130 bpm · Cannonball-influenced phrasing" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SAXOPHONE · L6 (Pro · altissimo, rep, duet, cert)
  // ═══════════════════════════════════════════════════════════
  saxophone_l6_01_adv_tech: {
    id: "saxophone_l6_01_adv_tech",
    title: "Altissimo · top-line E above the staff",
    objectives: [
      "Produce altissimo F# (above high F) consistently",
      "Maintain tone quality + pitch in the altissimo range",
      "Apply altissimo to the climax of a Coltrane phrase",
    ],
    writtenContent:
      "## Above the saxophone\n\nThe horn officially ends at high F (palm key). Altissimo is everything above — produced by overtone manipulation, voicing, and embouchure pressure. Coltrane on 'Live at Birdland' (1963) regularly hit altissimo G; Brecker reached altissimo C. Every Pro saxophonist has at minimum a usable altissimo F# and G.\n\n## The technique\n\nAltissimo F# fingering: 1+2+3 left hand, palm key D, plus side B-flat. But the fingering is only 30% of the trick. The other 70% is *voicing* — tongue position, throat shape, embouchure firmness. Your tongue rises toward the soft palate; oral cavity shrinks.\n\n## The sound\n\nIt should be a clear, focused note — not a squeal. Reference: Brecker's altissimo on 'Some Skunk Funk.' Crystal clear, in tune, integrated with the line.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why altissimo", body: "Pro saxophone work — Broadway pit, studio session, jazz lead — frequently demands altissimo. Without it, you're locked out of half the modern repertoire. Sanborn, Brecker, Liebman, Bergonzi all live up there." },
        { id: "t_shape",   heading: "Shape of voicing", body: "Tongue position is everything. Whisper 'eee' — feel the tongue rise. That's altissimo voicing. 'aah' = low register, 'eee' = altissimo. Practice voicing without the horn first; lock the muscle memory, then add fingerings." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Biting the reed. Pressure produces squeals, not pitches. Fix: relax the embouchure 10%, raise the tongue more. Air speed (from diaphragm) does the work; jaw pressure ruins the tone." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Altissimo F# · slow attacks · voicing demonstrated" },
      { id: "demo_target", label: "Altissimo F# G A · in a melodic line · Brecker-style integration" },
      { id: "demo_pitfall", label: "Bitten altissimo · what to avoid" },
    ],
  },
  saxophone_l6_02_rep_3: {
    id: "saxophone_l6_02_rep_3",
    title: "Coltrane 'Naima' · ballad mastery",
    objectives: [
      "Play the head of 'Naima' from Giant Steps album",
      "Sustain long tones with vibrato + dynamic shape",
      "Navigate the unusual harmonic motion in the bridge",
    ],
    writtenContent:
      "## Coltrane's love song\n\n'Naima' (1959), written for his first wife. The melody is mostly long held tones — a test of breath, tone, intonation, and emotional commitment. Form: AABA, 32 bars, key of Ab.\n\n## The challenge\n\nLong tones. Each held note is 4-6 beats. Your reed, embouchure, breath all must hold steady. No articulation to hide behind. Pure tone-control test.\n\n## The harmony\n\nBridge contains pedal-point B in the bass under shifting upper harmony. Your melody must sing over this stable foundation. Reference: Coltrane's original Atlantic recording, then Pharoah Sanders's reading on 'Karma' for contrast.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Naima now", body: "Pro auditions test ballad playing. Anyone can play fast; few can sustain a tender ballad with shape and conviction. Naima reveals tone-control mastery in 4 minutes flat." },
        { id: "t_shape",   heading: "Shape of a long tone", body: "Don't hold flat dynamics. Each long note has internal shape: pp → mp → mf → mp. Coltrane's vibrato widens slightly toward the peak. Air pressure rises, then settles. Sing the line first; play it second." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Running out of air mid-phrase. Cause: starting too loud, no air left for the long tail. Fix: enter at mp, build, save air for the resolution. Plan breath points before you play; mark them in the score." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Naima head bars 1-8 · slow tempo · breath markers" },
      { id: "demo_target", label: "Full Naima head · target tempo · Coltrane-informed reading" },
    ],
  },
  saxophone_l6_03_duet: {
    id: "saxophone_l6_03_duet",
    title: "Sax + piano duet · 'My Funny Valentine'",
    objectives: [
      "Play the head of 'My Funny Valentine' over piano comping",
      "Negotiate dynamic balance with the pianist",
      "Trade 4s in the second chorus",
    ],
    writtenContent:
      "## The classic sax-piano duo\n\nGetz/Gilberto, Coltrane/Tyner, Bergonzi/Beirach — sax + piano duets are jazz's purest format. No drums, no bass — just melody + harmony, conversing.\n\n## My Funny Valentine\n\nC-minor, slow ballad. Chet Baker's vocal version is the melody guide; Miles's 1964 'My Funny Valentine' live recording is the instrumental reference. Tempo around quarter = 60-70.\n\n## Trading fours\n\nSecond chorus: alternate 4 bars of melody with 4 bars of piano improvisation. Listen to what they played; respond. Don't pre-plan your 4 bars — react in real time. That's the conversation.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why duet now", body: "Trio + quartet work hides players. Duo exposes everything — every phrase, every rest, every imperfection. If you can sustain a 12-minute duo set, you can play any larger ensemble work." },
        { id: "t_shape",   heading: "Shape of trading 4s", body: "Listen to the pianist's last bar of their 4. That's the lead-in to your 4. Pick up their motif if you hear one; subvert it if it bores you. The conversation requires ears wide open." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing your line over their line. In duo, hearing is half the gig. Your dynamic must sit 3-6 dB below theirs when they solo, above when you solo. Constant adjustment, no autopilot." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "My Funny Valentine head · slow ballad · sax + piano" },
      { id: "demo_target", label: "Full duo · head + chorus + 4s · medium ballad 65 bpm" },
    ],
  },
  saxophone_l6_04_pro_cert: {
    id: "saxophone_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute recital",
    objectives: [
      "Perform Naima head + Autumn Leaves head with one improv chorus",
      "Demonstrate altissimo on at least one phrase",
      "Sustain stylistic command across both works",
    ],
    writtenContent:
      "## The Pro recital\n\n5 minutes. Two contrasting standards: 'Naima' (ballad, slow, lyrical) and 'Autumn Leaves' (medium swing, harmonic motion). The second piece includes one improvised chorus.\n\n## Programming\n\nOpen with Naima — establishes tone, breath control, ballad sensitivity. Pause 5 seconds. 'Autumn Leaves' — head + 1 chorus improv + head out. Total ~3 minutes.\n\n## What's tested\n\n1. Tone quality across registers. 2. Intonation with backing track. 3. Phrase shaping. 4. Improvisational coherence. 5. Stylistic appropriateness (ballad vs swing). Don't play Coltrane sheets-of-sound on Naima.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Mid-level jazz gigs (clubs, weddings, restaurants) require exactly this skill set: known standards played with personality, with at least one chorus of personal improvisation. Pass this cert, you're gigging." },
        { id: "t_shape",   heading: "Shape of the program", body: "Slow first, faster second. Lyrical first, harmonic second. Showcases range without confusing the listener. The Coleman Hawkins/Stan Getz programming model — established repertoire, then range." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Over-improvising. The cert tests fundamentals + 1 chorus solo. Adding 4 choruses of altissimo squealing isn't impressive — it's amateur. Discipline = pro." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min recital · Naima + Autumn Leaves with 1 chorus" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SAXOPHONE · L7 (Genius entry · circular breathing, rep, improv)
  // ═══════════════════════════════════════════════════════════
  saxophone_l7_01_advanced_1: {
    id: "saxophone_l7_01_advanced_1",
    title: "Circular breathing · sustaining an unbroken line",
    objectives: [
      "Inhale through the nose while exhaling cheek-stored air",
      "Sustain a single note for 30+ seconds with no audible break",
      "Apply to a long ballad phrase",
    ],
    writtenContent:
      "## The endless breath\n\nRoland Kirk made it famous; Kenny G commercialized it; Brecker mastered it. Circular breathing = inhaling through the nose while pushing cheek-stored air through the horn. The result: no audible break in the line.\n\n## The mechanism\n\n1. Fill cheeks with air while still blowing.\n2. Squeeze cheeks to sustain horn airflow.\n3. Inhale through nose during the squeeze (~0.5 seconds).\n4. Resume diaphragm breathing seamlessly.\n\n## The drill\n\nStart without the horn — practice the cheek-squeeze + nose-inhale with a straw and a glass of water. Goal: continuous bubbles for 60 seconds. Then transfer to the horn on a long F (concert), then to musical phrases.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why circular breathing", body: "Top-tier session work, Broadway pit playing, classical sax repertoire (Decruck Sonata, Lacour Études) all assume it. Without it, you're cutting phrases the composer intended unbroken. Skill ceiling = Genius." },
        { id: "t_shape",   heading: "Shape of the squeeze", body: "Cheeks balloon out (~30ml of air). The squeeze is a slow press — 0.5 seconds — not a sudden pinch. During the squeeze, your jaw stays still; only the cheek muscles contract. Tongue + embouchure unchanged." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pitch wobble during the transition. Cause: cheek pressure differs from diaphragm pressure, so air speed changes, so pitch shifts. Fix: practice the squeeze at the same air pressure as your diaphragm provides. Match exactly." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Circular breathing · long F tone · 30 seconds" },
      { id: "demo_target", label: "Circular breathing · in a Brecker-style melodic phrase" },
    ],
  },
  saxophone_l7_02_rep_4: {
    id: "saxophone_l7_02_rep_4",
    title: "Coltrane 'Giant Steps' · the changes test",
    objectives: [
      "Play the head of 'Giant Steps' from memory at 240 bpm",
      "Outline the cycling key changes (B major, G major, Eb major)",
      "Land chord tones on every barline",
    ],
    writtenContent:
      "## The changes that broke jazz\n\nColtrane wrote 'Giant Steps' in 1959 and recorded it 1960. The harmonic motion cycles through three key centers separated by major thirds — B, G, Eb. Every two bars, you change key. Pianists struggled (Tommy Flanagan's solo on the original is famously rough). Players spent decades cracking it.\n\n## The pattern\n\nTwo-bar units: V7-I in B → V7-I in G → V7-I in Eb → repeat. The melody itself outlines arpeggios that voice-lead through the changes. Memorize the head before improvising.\n\n## Tempo\n\n240 bpm. Mind-bending fast. Coltrane Patterns (1024-7-2) by Greg Yasinitsky breaks down the digital patterns Coltrane used. Practice slow first — 120, 160, 200, 240 over weeks.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Giant Steps", body: "It's the rite of passage. If you can play one coherent chorus on Giant Steps changes, you've passed the modern-jazz initiation. Brecker, Liebman, Garzone, Bergonzi — every Genius-tier saxophonist conquered this." },
        { id: "t_shape",   heading: "Shape of the cycle", body: "B-G-Eb are 4 semitones apart (major third). The changes form an equilateral triangle in pitch space. Visualize the triangle; rotate through it. Coltrane's solo uses pure arpeggios — no scalar passing tones." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Trying to play 'jazz licks' over the changes. Doesn't work — the licks belong to one key, the changes go through three. Fix: arpeggio-only playing first. Lines come after the harmony is internalized." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Giant Steps head · 120 bpm · key centers labeled" },
      { id: "demo_target", label: "Giant Steps head · 240 bpm · target tempo" },
    ],
  },
  saxophone_l7_03_improv_2: {
    id: "saxophone_l7_03_improv_2",
    title: "16-bar jazz solo · over Autumn Leaves changes",
    objectives: [
      "Improvise 16 bars over Autumn Leaves AA section",
      "Outline ii-V-i in two key centers (E-minor, G-major)",
      "Build dynamic + rhythmic intensity across 16 bars",
    ],
    writtenContent:
      "## A real jazz chorus\n\n16 bars over real changes: Autumn Leaves AA. Two ii-V-i progressions per A section: ii-V-i in G major (bars 1-4 of A1) → ii-V-i in E minor (bars 5-8 of A1). Then repeat for A2.\n\n## Architecture\n\nBars 1-4: state idea (4-6 notes). Bars 5-8: develop (sequence the idea up a step or transpose). Bars 9-12: peak (highest note, fastest rhythm). Bars 13-16: resolve (descending line, land on E or B at the end).\n\n## Reference\n\nCannonball Adderley's solos on Somethin' Else (1958). Stan Getz on Stan Getz Plays (1955). Both are studies in 16-bar architecture. Transcribe one chorus before building yours.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 16 bars", body: "Most standards are 32 bars; 16 = half. A 16-bar solo is the minimum coherent statement in jazz — short enough to memorize, long enough to develop. Master 16, the 32 follows." },
        { id: "t_shape",   heading: "Shape of intensity", body: "Build over 16 bars. Don't peak in bar 4. Reserve your highest note + fastest rhythm for bars 9-12. Bars 13-16 release tension. This is musical sentence structure: setup, climax, resolution." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Memorizing licks instead of developing motifs. Memorized lick = recognizable, not personal. Motivic development = your own voice. Take 3 notes; vary them 8 ways. That's improvisation; the rest is recall." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "16-bar chorus · 100 bpm · motif development demonstrated" },
      { id: "demo_target", label: "16-bar chorus · 140 bpm · over Autumn Leaves AA" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SAXOPHONE · L8 (Genius · maestro study, concert rep, ensemble)
  // ═══════════════════════════════════════════════════════════
  saxophone_l8_01_style_study: {
    id: "saxophone_l8_01_style_study",
    title: "John Coltrane · sheets of sound transcription",
    objectives: [
      "Transcribe 8 bars of Coltrane's solo on 'Giant Steps'",
      "Identify the digital patterns Coltrane uses",
      "Play the transcription cleanly at 240 bpm",
    ],
    writtenContent:
      "## Coltrane's vocabulary\n\n'Sheets of sound' — Ira Gitler's term for Coltrane's 1959-60 style. Cascading sixteenth notes, every one a chord tone, no breath. The 'Giant Steps' solo is 16 bars × 4 choruses, each chorus more harmonically dense than the last.\n\n## The patterns\n\nColtrane's digital patterns: 1-2-3-5 (root-2nd-3rd-5th), 1-3-5-9, and pentatonic permutations. Greg Yasinitsky's 'Coltrane Patterns' book catalogs them. Memorize 5 patterns; transpose each through all 12 keys.\n\n## The transcription exercise\n\nPick 8 bars from Coltrane's 'Giant Steps' solo (Atlantic 1960 recording). Notate by ear. Play it cleanly at 240. This is jazz pedagogy at the highest level — same way Sonny Rollins learned, by transcribing Bird.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Coltrane", body: "He's the post-1960 saxophone center of gravity. Brecker, Liebman, Bergonzi, Garzone, every modern Pro — all built on Coltrane's foundation. To skip him is to skip the post-bop era entirely." },
        { id: "t_shape",   heading: "Shape of transcription", body: "Listen to the 8 bars 50 times before notating. Transcribe at half-speed via your DAW. Notate one phrase at a time. Then play. The notation is incidental; the *internalization* is the point." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Approximating instead of nailing. Coltrane's solo at 240 has no wrong notes — every sixteenth lands. Your transcription must too. 'Close enough' isn't transcription; it's wishful thinking." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Coltrane Giant Steps solo · 8 bars · 50% speed transcription guide" },
      { id: "demo_target", label: "Same 8 bars · at 240 bpm · target performance" },
    ],
  },
  saxophone_l8_02_rep_5: {
    id: "saxophone_l8_02_rep_5",
    title: "Glazunov Saxophone Concerto · classical Pro repertoire",
    objectives: [
      "Play the opening 32 bars of Glazunov Concerto Op. 109",
      "Adapt jazz tone to classical timbre (less spread, more focused)",
      "Sustain the legato line with classical vibrato",
    ],
    writtenContent:
      "## Sax in the concert hall\n\nGlazunov composed the Concerto in Eb (1934) for Sigurd Raschèr, the German classical sax virtuoso. It's the standard classical sax repertoire — every classical saxophonist plays it. Single-movement, ~14 minutes, lyrical.\n\n## Tone shift\n\nJazz tone (spread, vocal, flexible) doesn't fit Glazunov. Classical tone is focused, centered, Mozart-like. Reference: Claude Delangle (Conservatoire de Paris), Otis Murphy. Listen and adapt; the embouchure firms, the throat opens, the vibrato narrows.\n\n## The opening\n\nLyrical Eb-major theme. Sustained, classical phrasing — long bows on the analog. Dynamics: mp building to mf by bar 16, dropping to p at bar 24, returning to mf by bar 32.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why classical sax", body: "Pro sax work spans Broadway pit, recording session, jazz club AND classical recital. Saxophonists who can do all four are rare and well-employed. Glazunov is your classical credential." },
        { id: "t_shape",   heading: "Shape of classical phrasing", body: "Long sustained line. Vibrato narrow, slower than jazz. Articulation cleaner — every entrance crisp, every release intentional. Think Mozart clarinet concerto, not Coltrane solo." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Bringing jazz vibrato to Glazunov. Wide vibrato sounds wrong in classical context — like grunge guitar in a Bach prelude. Narrow it 50%; speed it 30%. Practice Mozart Clarinet Concerto as cross-training." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Glazunov opening · 60 bpm · classical phrasing markers" },
      { id: "demo_target", label: "Glazunov opening 32 bars · target tempo · Delangle-style" },
    ],
  },
  saxophone_l8_03_accompany: {
    id: "saxophone_l8_03_accompany",
    title: "Jazz quartet · sax in the rhythm section context",
    objectives: [
      "Play comping figures (background hits) under pianist's solo",
      "Trade 8s with the drums in the bridge",
      "Lay out (not play) for entire choruses when appropriate",
    ],
    writtenContent:
      "## When you don't play\n\nIn a jazz quartet (sax, piano, bass, drums), the saxophonist isn't the star for most of the gig. You play the head, take a chorus, then lay out for piano solo, bass solo, drum solo, and trades. Not playing is half the job.\n\n## Background figures\n\nWhen the piano solos, you might add 'background figures' — short rhythmic hits (bar 3, bar 7) that punctuate without distracting. Listen to Stitt or Cannonball with Miles for the model.\n\n## Trading 8s\n\nLast chorus: alternate 8 bars of sax improvisation with 8 bars of drum solo. Listen to what the drummer played; pick up rhythmic ideas from them. The trade is conversation, not parallel monologue.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why ensemble now", body: "Solo saxophone work is rare. Quartet work is the bread and butter. If you can't lay out gracefully, comp tastefully, and trade eights with a drummer, you're not a working sax player — you're a sax recital player." },
        { id: "t_shape",   heading: "Shape of comping", body: "Less is more. 2-3 short rhythmic hits per chorus, placed against the piano's phrasing. Don't compete; complement. Volume: 4-6 dB below the soloist. Always." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing constantly. New saxophonists in their first quartet gig don't know when to stop. Result: cluttered sound, frustrated rhythm section. Fix: count the bars you play vs. the bars you rest. Aim for 60% rest." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Background figures · slow tempo · over piano solo" },
      { id: "demo_target", label: "Quartet excerpt · trading 8s with drums · medium swing" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SAXOPHONE · L9 (Genius cert · compose, masterclass, recital)
  // ═══════════════════════════════════════════════════════════
  saxophone_l9_01_compose: {
    id: "saxophone_l9_01_compose",
    title: "Original composition · 32-bar jazz original",
    objectives: [
      "Compose 32-bar AABA tune with melody + chord changes",
      "Use voice leading through the bridge harmonic motion",
      "Notate lead sheet (melody + chord symbols)",
    ],
    writtenContent:
      "## Saxophonist as composer\n\nWayne Shorter, Cannonball Adderley, Joe Henderson — all wrote standards that other people now play. Sonny Stitt's 'Loose Walk,' Hank Mobley's 'Soul Station,' Sonny Rollins's 'Oleo.' Composing is the saxophonist's path to immortality.\n\n## Constraints\n\n32 bars AABA. Any key. A section: 8 bars, statement of melodic idea. B section: 8 bars, contrast (different key area, different rhythmic texture). Final A: variation on the first A.\n\n## The lead sheet\n\nMelody on staff, chord symbols above. Use Bb concert pitch if it's an alto piece, etc. Test: does another saxophonist read your chart and play it in one take? If not, revise.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose now", body: "Pro saxophonists with originals get more work — they have material to record on their own albums, perform on their own gigs, and license. Without originals, you're a sideman forever." },
        { id: "t_shape",   heading: "Shape of AABA", body: "A = the hook (memorable, repeats). B = the journey (different key, builds tension). Final A = the return (resolution). Songwriting form 101. Works for 'Body and Soul,' 'My Funny Valentine,' your tune too." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Melodies that aren't singable. If you can't sing your tune, no one will remember it. Test: hum the head 24 hours later. Still got it? Composition succeeded. Forgot? Revise." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 32-bar AABA original · sax + rhythm section" },
    ],
  },
  saxophone_l9_02_masterclass: {
    id: "saxophone_l9_02_masterclass",
    title: "Masterclass · record yourself teaching ii-V-I",
    objectives: [
      "Record a 10-min teaching session on ii-V-I improvisation",
      "Demonstrate AND verbalize 3 approaches to outlining changes",
      "Diagnose a hypothetical student error + prescribe a fix",
    ],
    writtenContent:
      "## Teach the changes\n\nii-V-I is the foundational progression of bebop and post-bop. If you can teach how to outline it three different ways, you've internalized the harmony. Watch David Liebman's masterclasses on YouTube for the model — clear, brief, specific.\n\n## Three approaches\n\n1. Pure arpeggios — chord tones on every downbeat. 2. Bebop scale — chromatic passing tones. 3. Side-slipping — temporarily playing 'wrong' notes for tension. Demonstrate each on a Bb ii-V-I.\n\n## Diagnosis\n\nImaginary student plays 'random scale' over the changes — line floats, doesn't lock. Diagnose: they're not targeting chord tones. Prescribe: arpeggio-only practice, 30 minutes/day, 2 weeks. Then re-evaluate.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach to learn", body: "Coltrane practiced 8 hours/day; he also taught at his apartment in the evenings. Teaching forces you to articulate what you do. Articulating it teaches *you* more than the student." },
        { id: "t_shape",   heading: "Shape of a lesson", body: "Diagnose (15%), demonstrate (40%), drill (30%), reflect (15%). The student needs a takeaway exercise, not a lecture. Always end with: 'practice this for the next week, then we revisit.'" },
        { id: "t_pitfall", heading: "Common pitfall", body: "Showing off your own playing. The masterclass isn't your concert. Play the example, stop, explain, drill. If you're playing more than the student is hearing, reverse the ratio." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 10-min masterclass · ii-V-I · Liebman-style" },
    ],
  },
  saxophone_l9_03_genius_cert: {
    id: "saxophone_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute recital",
    objectives: [
      "Perform Naima + Giant Steps (head + 1 chorus) + your original",
      "Demonstrate altissimo + circular breathing in performance context",
      "Sustain stamina + tone for full 18 minutes",
    ],
    writtenContent:
      "## The Genius recital\n\n18 minutes. Three works: Naima (ballad mastery), Giant Steps (changes mastery), your original (composer voice). Programming arc: tone, technique, voice.\n\n## The bar\n\nThis is conservatory-graduate jazz level. Intonation locked. Time feel impeccable. Improvisation coherent and motivically developed. The recording is portfolio material — usable for booking serious gigs.\n\n## Mental prep\n\nSix weeks of daily practice. Last two weeks: full run-throughs in performance attire, in performance posture. Record every run. The recording you submit should be the 30th attempt, not the 1st.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Top-tier jazz schools (Berklee, Manhattan School, New School) audition with this kind of program. Pass the cert, you're auditioning at music-school level. The recording follows you for a decade." },
        { id: "t_shape",   heading: "Shape of the recital", body: "Naima (5 min) → 30s pause → Giant Steps with 1 chorus (5 min) → 30s pause → original (6 min) → bow. Don't talk between. Don't apologize. Let the music speak." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Peaking in practice, not performance. Saxophonists often play their best alone in the practice room and worse in front of mics. Fix: dress-rehearse with cameras 6 weeks. Performance becomes routine." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 18-min Genius recital · Naima + Giant Steps + original" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUMPET · L5
  // ═══════════════════════════════════════════════════════════
  trumpet_l5_01_harmony: {
    id: "trumpet_l5_01_harmony",
    title: "Trumpet over a Bb blues · outlining I-IV-V harmony",
    objectives: [
      "Outline I-IV-V chord tones over a Bb blues progression",
      "Land on chord-third or fifth at each barline",
      "Phrase across 12 bars without forcing breath",
    ],
    writtenContent:
      "## Trumpet harmony\n\nMonophonic instrument, but harmonic narrator. Louis Armstrong's 1928 'West End Blues' opens with a 12-second cadenza that outlines the entire form's harmony before the band enters. That's harmonic phrasing on trumpet at the highest level.\n\n## The blues\n\nBb blues: Bb7-Bb7-Bb7-Bb7-Eb7-Eb7-Bb7-Bb7-F7-Eb7-Bb7-F7. 12 bars. Each chord = arpeggio outline. I = Bb D F Ab. IV = Eb G Bb Db. V = F A C Eb.\n\n## The phrasing\n\nLand on Ab (b7 of Bb) on bar 4 → resolution to Eb. Land on Db (b7 of Eb) on bar 6 → return to Bb. The b7 is the blues sound; target it.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why blues now", body: "Blues is trumpet's mother tongue. Louis, Roy Eldridge, Dizzy, Miles, Clifford Brown — all spoke it fluently. If you can't outline a Bb blues in your sleep, you're not a jazz trumpeter yet." },
        { id: "t_shape",   heading: "Shape of the b7", body: "The flat-7 of each chord (Ab on Bb7, Db on Eb7, Eb on F7) gives blues its sound. Target it on beat 4 of the bar before the chord change. Voice leads to the next chord's root or third." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing 'through' the blues without acknowledging chord changes. Result: line floats, doesn't lock. Fix: arpeggio-only chorus first; outline the changes purely. Decoration after harmony is internalized." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bb blues · 80 bpm · arpeggio outline" },
      { id: "demo_target", label: "Bb blues · 140 bpm · chord-tone phrasing" },
    ],
  },
  trumpet_l5_02_fast: {
    id: "trumpet_l5_02_fast",
    title: "Bb major scale · 16-beat sixteenth notes at 120 bpm",
    objectives: [
      "Play Bb major scale ascending + descending in sixteenths at 120",
      "Maintain valve coordination + tongue articulation",
      "Land on Bb at the downbeat after 16 beats",
    ],
    writtenContent:
      "## Trumpet at speed\n\nValve fingerings + tongue articulation must move in lockstep at 120 bpm. Reference: Maurice André's Bach concerto recordings (~140 bpm scalar passages, perfect clarity). Or Wynton Marsalis's Haydn — equally clean at speed.\n\n## The drill\n\nBb major scale, two octaves, sixteenth notes, 120 bpm. 16 beats = 64 notes. Articulation: 'doo-doo-doo-doo' (legato tongue) or 'tah-tah-tah-tah' (hard tongue).\n\n## The pitfall\n\nValve hesitation between notes — even 30ms causes audible gap. Fix: practice valve-only patterns silently, hands moving, no air. Build muscle memory in the fingers, then add air.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why fast scales", body: "Haydn Concerto, Hummel Concerto, Arutiunian — every Pro classical trumpet rep demands clean fast scales. Jazz too: Clifford Brown's 'Cherokee' is sixteenth notes at 320. Speed is non-negotiable." },
        { id: "t_shape",   heading: "Shape of articulation", body: "'doo-doo' = legato, 'tah-tah' = staccato, 'doo-tah-doo-tah' = jazz syncopation. Practice each at 120. The articulation choice is musical; the consistency is technical." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pressing valves too hard. At 120 bpm, valves should *flick* — light contact, fast release. Heavy press = slow return = next note misses. Fingers light as a typist's." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bb major scale · 80 bpm · sixteenths · clean valves" },
      { id: "demo_target", label: "Bb major scale · 120 bpm · 16-beat run" },
    ],
  },
  trumpet_l5_03_improv_1: {
    id: "trumpet_l5_03_improv_1",
    title: "First improv · 4 bars over a C drone",
    objectives: [
      "Improvise a 4-bar melodic phrase in C major",
      "Use chord-tone arpeggios (C E G) as anchor points",
      "Resolve to C at the final downbeat",
    ],
    writtenContent:
      "## Trumpet improv tradition\n\nLouis Armstrong on 'Cornet Chop Suey' (1926) was perhaps the first recorded improvisation that listened forward, not just back. Trumpet improv built on that lineage: Roy Eldridge, Dizzy, Fats Navarro, Clifford Brown, Miles, Lee Morgan, Wynton.\n\n## Constraints\n\n4 bars over C drone (sustained C). Stay in C major. ~10 notes total. Use space — silence is part of the phrase.\n\n## Resolution\n\nLast note must be C, E, or G — chord tones. Land cleanly on the downbeat of bar 4. The resolution is the punctuation; without it, the phrase is a fragment.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why improv on trumpet", body: "Classical and jazz both use improvisation: cadenzas in concertos, choruses in jazz. A trumpeter who can't improvise is a music-stand reader, not a musician. Build the muscle now." },
        { id: "t_shape",   heading: "Shape of a phrase", body: "Question (rising motion, unresolved) + answer (descending, resolves to C). 2 bars each. Mirror the singing voice: rising = inhale, falling = exhale." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing too many notes. Beginners stuff every bar with sixteenths. Reference: Miles Davis's 'Kind of Blue' — 4 notes per bar maximum, profound result. Less = more articulate." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "C drone · slow improv example · 60 bpm" },
      { id: "demo_target", label: "4-bar improv at 100 bpm · resolves to C" },
    ],
  },
  trumpet_l5_04_rep_2: {
    id: "trumpet_l5_04_rep_2",
    title: "Haydn Trumpet Concerto · second movement opening",
    objectives: [
      "Play opening 32 bars of Haydn Concerto Hob. VIIe:1 second movement",
      "Sustain the lyrical Andante line in Ab major",
      "Use classical vibrato sparingly and accurately",
    ],
    writtenContent:
      "## The trumpet concerto\n\nHaydn composed it 1796 for Anton Weidinger's keyed trumpet — the first instrument capable of full chromatic playing. The Andante (second movement) is lyrical, song-like, in Ab major. Maurice André's 1969 recording is the reference.\n\n## The challenge\n\nLyrical, sustained lines in Ab — a 'rare' trumpet key (3 flats). Valve combinations (1-3 for many notes) need flexibility. Tone must remain warm, centered, classical — not the bright Maynard Ferguson sound.\n\n## Vibrato\n\nClassical trumpet vibrato is narrow, fast (~6 Hz), used selectively on long notes. Not the wide jazz vibrato. Maurice André's vibrato is the model — present but never showy.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Haydn", body: "It's THE classical trumpet piece. Audition committees test it. Music school applicants play it. Knowing the second movement cold = passing the next gate of your trumpet career." },
        { id: "t_shape",   heading: "Shape of phrasing", body: "Andante = walking pace, ~quarter = 70. Each phrase is 4 bars. Breath at the end of bar 4, not mid-phrase. Plan breaths in pencil before playing; mark with apostrophes in the score." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing too loud. Andante is *gentle*. Volume: mp throughout, mf on phrase peaks only. Maurice André never overplays Haydn. Restraint is mature musicianship." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Haydn Andante · 60% tempo · breath markers" },
      { id: "demo_target", label: "Haydn Andante 32 bars · target tempo · André-style" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUMPET · L6 (Pro · lip slurs, rep, duet, cert)
  // ═══════════════════════════════════════════════════════════
  trumpet_l6_01_adv_tech: {
    id: "trumpet_l6_01_adv_tech",
    title: "Lip slurs · partial-to-partial fluency",
    objectives: [
      "Slur cleanly through 5 partials on each fingering",
      "Maintain tone quality across the slurs",
      "Apply to fast Clifford Brown-style lines",
    ],
    writtenContent:
      "## The trumpet's harmonic series\n\nWith no valves pressed, the trumpet plays the C harmonic series: C (low), G, C, E, G, Bb, C (high). Lip slurs move between these partials using only embouchure + air — no valve change. They're the foundation of trumpet flexibility.\n\n## The drill\n\nNo valves. Slur low C → G → C → E → G → C (high) → G → E → C → G → low C. 4-beat tones each, 60 bpm. Then repeat with valves 1-3, 1, 2, etc. Every fingering has its own harmonic series.\n\n## Reference\n\nClifford Brown's 'Cherokee' solo (1955) is full of lip-slur figures — fast partials motion that doesn't require fast valve work. The fluency separates Pro from Standard players.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why lip slurs", body: "Genius-tier rep (Hummel, Clifford Brown, Miles ballads) all assume lip-slur fluency. Without it, you're locked out of half the trumpet vocabulary. Pro = lip slurs as natural as scales." },
        { id: "t_shape",   heading: "Shape of the slur", body: "The aperture (lip opening) tightens for higher partials, opens for lower. Air speed increases for high, decreases for low. Tongue arches up for high ('eee'), drops for low ('aah'). Three coordinated changes per slur." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Using mouthpiece pressure to reach high partials. Pressure = bruised lips, no endurance, ugly tone. Fix: use air speed + lip aperture only. Pull mouthpiece *away* from face slightly while ascending — counterintuitive but works." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Lip slurs · no valves · 60 bpm · 5 partials" },
      { id: "demo_target", label: "Lip slurs · all valve combinations · 90 bpm" },
      { id: "demo_pitfall", label: "Pressed lip slurs · what to avoid" },
    ],
  },
  trumpet_l6_02_rep_3: {
    id: "trumpet_l6_02_rep_3",
    title: "Hummel Trumpet Concerto · first movement opening",
    objectives: [
      "Play opening 24 bars of Hummel Concerto E-major",
      "Execute the leaping Classical melodic line cleanly",
      "Sustain bright Pro tone in upper register",
    ],
    writtenContent:
      "## The other concerto\n\nHummel composed his Trumpet Concerto in E-major (1803), seven years after Haydn. Originally for keyed trumpet; modern performances use Bb or Eb trumpet. The first movement is bright, classical, technically demanding.\n\n## The challenge\n\nE-major is a *rare* trumpet key (4 sharps, requires lots of valve 1-2 combos). Leaping melodic line — octave jumps, sixths, thirds. Each leap requires lip-slur control + accurate intonation.\n\n## Reference\n\nWynton Marsalis's 1983 recording (with the National Philharmonic) is the gold standard — clean attacks, perfect intonation, classical taste. Maurice André's earlier recording is the lyrical alternative.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Hummel", body: "The other major classical trumpet concerto. Often paired with Haydn in graduation recitals — two concertos, two contrasting Classical-period voices. Pro tier requires both." },
        { id: "t_shape",   heading: "Shape of leaps", body: "Octave leaps: arc your air, don't blast. The high note arrives via lip aperture closing + air speed increasing simultaneously. Leap should sound effortless, not muscled. Wynton's the model." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Cracking high notes on the leaps. Cause: arriving with insufficient air speed. Fix: take a deeper breath before the leap; commit air fully. Half-committed = cracked note." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Hummel opening · 60% tempo · leap markers" },
      { id: "demo_target", label: "Hummel first movement opening · target tempo · Wynton-style" },
    ],
  },
  trumpet_l6_03_duet: {
    id: "trumpet_l6_03_duet",
    title: "Trumpet duet · Bach Two-Part Invention BWV 779",
    objectives: [
      "Play voice 1 of BWV 779 transcribed for two trumpets",
      "Lock rhythm + articulation with the second trumpeter",
      "Trade melodic leadership at phrase boundaries",
    ],
    writtenContent:
      "## Trumpet duet tradition\n\nNatural-trumpet pairs were standard in Baroque court music. Modern brass repertoire continues this: Vivaldi double-trumpet concerto, Bach's BWV 779 transcribed for two trumpets, Albinoni's two-trumpet works. Maurice André recorded extensively as a duo.\n\n## The Bach Invention\n\nVoice 1 leads bars 1-2; voice 2 imitates bars 3-4. Then voice 2 leads, voice 1 imitates. The conversation alternates every 2-4 bars. Articulation must match exactly.\n\n## Listening\n\nIn a duet, you hear *yourself* as half of the texture. Adjust dynamics constantly: loud when leading, 6dB softer when accompanying. The audience hears the whole; you hear your half + the whole.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why duet now", body: "Brass quintet, brass quartet, orchestral trumpet section — all built on duo skills. Two trumpeters who can play Bach Invention together can play anything together. Foundation laid here." },
        { id: "t_shape",   heading: "Shape of conversation", body: "Voice 1 = teacher's voice. Voice 2 = student's voice answering. Then they swap. Listen to the other trumpeter; match their articulation; respond, don't compete." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Both trumpeters fortissimo all the time. Result: muddy, undynamic. Fix: agree on dynamic levels before rehearsing. Mark in score: 'mp here, mf here, etc.' Plan, don't improvise dynamics." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "BWV 779 · two trumpets · 60 bpm · phrase markers" },
      { id: "demo_target", label: "Full Invention · target tempo · with leadership trades" },
    ],
  },
  trumpet_l6_04_pro_cert: {
    id: "trumpet_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute recital",
    objectives: [
      "Perform Haydn Andante + Bb blues with one improv chorus",
      "Demonstrate classical AND jazz tone within the program",
      "Sustain stamina + lip endurance for full 5 minutes",
    ],
    writtenContent:
      "## The Pro recital\n\n5 minutes. Two contrasting works: Haydn Andante (classical, lyrical, Ab) and Bb blues (jazz, rhythmic, with one improv chorus). The trumpet is the only instrument equally at home in concert hall and jazz club; the cert tests both.\n\n## Programming\n\nClassical first (Haydn) — 3 minutes. 5-second pause. Jazz second (blues) — 2 minutes. Don't reverse; jazz embouchure is brighter, harder to settle into classical tone after.\n\n## What's tested\n\n1. Tone (warm classical vs bright jazz). 2. Intonation. 3. Phrase shaping. 4. Improvisation coherence. 5. Style appropriateness. The grader hears both genres in 5 minutes — total range test.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Pro trumpet work spans symphony, chamber, jazz, Broadway, studio. The cert tests if you have range. A trumpeter who can't switch between Haydn and blues is half-employable." },
        { id: "t_shape",   heading: "Shape of the program", body: "Classical = restraint. Jazz = expression. The contrast is the program. If both pieces sound similar in approach, the grader marks down. Differentiate clearly: tone, vibrato, articulation all shift." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Tired lips by minute 4. Cause: practicing only short bursts in lessons; not building 5-minute stamina. Fix: 4 weeks of full run-throughs daily before the cert. Endurance is built, not summoned." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min recital · Haydn Andante + Bb blues with improv chorus" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUMPET · L7 (Genius entry · range, rep, improv)
  // ═══════════════════════════════════════════════════════════
  trumpet_l7_01_advanced_1: {
    id: "trumpet_l7_01_advanced_1",
    title: "Range extension · clean high C and beyond",
    objectives: [
      "Produce clean high C (above the staff) consistently",
      "Reach high E + F (Genius range) with controlled tone",
      "Apply to Maynard Ferguson-style lead-trumpet line",
    ],
    writtenContent:
      "## Trumpet range mastery\n\nThe staff ends at high C; Genius-tier players go beyond. Maynard Ferguson reached double-G (above double-C) regularly. Bud Herseth (Chicago Symphony) hit high E at age 70. Wynton's classical recordings cleanly reach F. Range = lip muscle + air support + visualization.\n\n## The technique\n\nLip muscle: build via daily long-tone studies. Air support: sustained diaphragm pressure. Visualization: hear the pitch in your inner ear *before* playing it. The note is in your head before it's in the horn.\n\n## The drill\n\nClarke Studies #1, ascending. Start low, reach the highest note you can play *cleanly* (no thin tone, no cracking). Add one half-step per week. Patience > brute force.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why range now", body: "Lead trumpet (big band, Broadway pit, studio session) demands high C minimum, often high E. Without range, you're a section player forever. Genius tier requires the upper range to be *musical*, not just possible." },
        { id: "t_shape",   heading: "Shape of high notes", body: "Aperture small, air speed maximum, tongue arched ('eee'). Mouthpiece pressure minimal — let air do the work. Maynard's high range was famous for sounding effortless. That's the model." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Forcing high notes via mouthpiece pressure. Result: bruised lips, short career, ugly tone. Fix: pull mouthpiece slightly away from face when ascending; force air speed up. Counterintuitive but works." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Range studies · ascending · clean high C" },
      { id: "demo_target", label: "Maynard-style lead line · high E demonstrated" },
    ],
  },
  trumpet_l7_02_rep_4: {
    id: "trumpet_l7_02_rep_4",
    title: "Hummel Trumpet Concerto · second movement",
    objectives: [
      "Perform the full second movement of Hummel Concerto",
      "Sustain the lyrical Andante line in C-minor",
      "Apply Classical vibrato + dynamic shaping",
    ],
    writtenContent:
      "## The Hummel Andante\n\nC-minor, lyrical, the emotional center of the concerto. The melody arches over 4-bar phrases; dynamics rise + fall like breath. Maurice André's 1973 recording with the Munich Bach Orchestra is the lyrical reference; Wynton's is the technical reference.\n\n## The challenge\n\nThis is a 4-minute movement of sustained lyricism. No flashy fireworks — just pure tone, pure phrasing, pure musicianship. The trumpet must *sing* like a soprano. Reference your singing voice; copy the contours.\n\n## Tone target\n\nWarm, centered, classical. Equipment: Bb trumpet with deep mouthpiece (Bach 1¼C or similar) for warmth. Resist the urge to use a brighter setup; this movement demands the deepest possible classical tone.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Hummel Andante", body: "Auditions test it. Recital programs feature it. Pro classical trumpet is half-defined by your Hummel Andante. Get this cold; the rest of your classical career follows." },
        { id: "t_shape",   heading: "Shape of phrasing", body: "Each 4-bar phrase: mp → mf (build) → mf → mp (release). Vibrato widens slightly at peak. Maurice André's vibrato is asymmetric — entrance straight, peak vibrato, exit straight. Practice this control." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing too brightly. C-minor lyricism wants warmth, not brilliance. If your tone has Maynard-edge brightness, it's wrong here. Switch mouthpiece, soften embouchure, breathe deeper. Re-listen to André." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Hummel Andante bars 1-16 · 60% tempo · phrase shape" },
      { id: "demo_target", label: "Full Hummel Andante · target tempo · André-informed reading" },
    ],
  },
  trumpet_l7_03_improv_2: {
    id: "trumpet_l7_03_improv_2",
    title: "16-bar trumpet solo · over Miles Davis 'So What' modal vamp",
    objectives: [
      "Improvise 16 bars over D dorian + Eb dorian vamps",
      "Use modal phrasing (not chord-tone targeting)",
      "Build dynamic + rhythmic shape over 16 bars",
    ],
    writtenContent:
      "## Modal jazz\n\nMiles Davis's 'Kind of Blue' (1959) introduced modal jazz: instead of fast chord changes, a single mode held for 8-16 bars. The improvisational challenge shifts from change-running to *melodic invention within constraints*.\n\n## So What\n\n16 bars D-dorian (D E F G A B C D), 8 bars Eb-dorian, 8 bars D-dorian. Miles's solo (Kind of Blue, take 1) is the model — sparse, melodic, every note placed with intention.\n\n## The architecture\n\nBars 1-4: state idea (4-6 notes total). Bars 5-8: develop (sequence the idea up a step). Bars 9-12: peak (more rhythm + altissimo + or higher register). Bars 13-16: resolve (descending, lands on D at bar 16 downbeat).",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why modal", body: "Modal jazz is half of post-1959 jazz. Without modal fluency, you can't play with current rhythm sections, can't navigate ECM-style records, can't sit in on most contemporary gigs. Genius tier demands it." },
        { id: "t_shape",   heading: "Shape of restraint", body: "Modal solos thrive on space. Miles's 'So What' solo has more rest than notes. Phrase, breathe, phrase. Resist running scales — that's what bebop wanted; modal wants melody." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing bebop lines over modal vamps. Bebop targets chord changes; modal has no changes to target. Result: bebop lines sound 'busy' and miss the meditative quality. Slow down, simplify, listen to Miles." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "D dorian vamp · slow modal phrases · 90 bpm" },
      { id: "demo_target", label: "16-bar solo over So What changes · medium 130 bpm · Miles-informed" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUMPET · L8 (Genius · maestro study, rep, ensemble)
  // ═══════════════════════════════════════════════════════════
  trumpet_l8_01_style_study: {
    id: "trumpet_l8_01_style_study",
    title: "Maurice André · French school phrasing study",
    objectives: [
      "Listen to 3 André recordings (Haydn, Hummel, Bach)",
      "Identify his signature phrasing + tone characteristics",
      "Apply one André-style choice to your own playing",
    ],
    writtenContent:
      "## Maurice André\n\nFrench trumpet virtuoso (1933-2012). Recorded over 300 albums. Defined the modern classical trumpet sound: warm, lyrical, never bombastic, always musical. Reference for every classical trumpet student since 1970.\n\n## What to study\n\nThree recordings: Haydn Concerto (1969 with Karajan), Hummel Concerto (1973), Bach Magnificat trumpet obbligato (1971). Each shows a facet — concerto soloist, lyrical operator, baroque ornamentalist.\n\n## The lessons\n\n1. Tone always warm, never aggressive. 2. Vibrato narrow, controlled, used selectively. 3. Articulation crisp but never harsh. 4. Phrase breath always musical, never gasping. 5. He plays *for the music*, not for himself. Watch his concert videos; he's almost still.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why André", body: "Generation-defining classical trumpeter. If you don't know his playing, you don't know modern classical trumpet. Berklee, Juilliard, Conservatoire de Paris — all teach his recordings as the standard." },
        { id: "t_shape",   heading: "Shape of restraint", body: "André never overplays. Even in Haydn's exposed solo lines, he stays within mp-mf range, lets the orchestra breathe under him. That self-restraint is the maturity. Copy it." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Imitating exactly. The goal isn't to *be* André — it's to absorb his approach. Take one specific element (phrase breath, vibrato width, articulation crispness) and apply it. The rest is your voice." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Maurice André Haydn 1969 · phrasing analysis" },
      { id: "demo_target", label: "Maurice André Hummel 1973 · for stylistic comparison" },
    ],
  },
  trumpet_l8_02_rep_5: {
    id: "trumpet_l8_02_rep_5",
    title: "Arutiunian Trumpet Concerto · concert-length showpiece",
    objectives: [
      "Perform the opening 3 minutes of Arutiunian Concerto in Ab-minor",
      "Sustain the Armenian-folk-influenced melodic line",
      "Project against an imagined orchestral backdrop",
    ],
    writtenContent:
      "## Arutiunian's masterpiece\n\nAlexander Arutiunian composed the Trumpet Concerto in 1950, drawing on Armenian folk music. It's the most-performed 20th-century trumpet concerto. Single movement, ~16 minutes, in Ab-minor. The opening trumpet entry sets the mood: dramatic, modal, Eastern-influenced.\n\n## Reference\n\nWynton Marsalis (1990s recording). Sergei Nakariakov (younger, more virtuosic). Both are Genius-tier readings. Listen to both; choose your camp.\n\n## The challenge\n\nAb-minor key (4 flats + lowered 6th sometimes). Modal scale degrees with augmented seconds (Armenian flavor). Wide leaps. Sustained lyricism + rhythmic intensity in different sections.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Arutiunian", body: "Modern Pro trumpet auditions test it. Symphony orchestra trumpet section auditions assume it. Pass this work, you're ready for major orchestra trial. Concert-hall standard." },
        { id: "t_shape",   heading: "Shape of the modal", body: "Ab-minor with augmented 2nd between 6 and 7 = Armenian flavor. Lean into that interval; let it sound exotic. The notes are not 'wrong' — they're stylistic. Listen to Armenian folk recordings to internalize the mode." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing it as if it's German Romantic. Arutiunian is Soviet-Armenian; the inflection is Eastern. Imagine Aram Khachaturian's 'Sabre Dance' world — that's the cultural context. Adjust phrasing accordingly." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Arutiunian opening · 70% tempo · modal markers" },
      { id: "demo_target", label: "Arutiunian first 3 minutes · target tempo · Wynton-style" },
    ],
  },
  trumpet_l8_03_accompany: {
    id: "trumpet_l8_03_accompany",
    title: "Big band lead trumpet · powering the section",
    objectives: [
      "Play the lead trumpet part of a Count Basie chart",
      "Project + lead the section in unison passages",
      "Phrase together with sax + trombone sections",
    ],
    writtenContent:
      "## Lead trumpet\n\nIn a big band, the lead trumpet sits at the top of the brass pyramid. They set pitch, articulation, dynamic — the section follows. Cat Anderson (Ellington), Maynard Ferguson, Snooky Young (Basie) — the lineage is mighty. Every band leader's first hire is a great lead.\n\n## The role\n\nProject above the section (you're the highest voice). Articulate cleanly (the others copy your articulation). Lead the dynamics (when you crescendo, they follow). Endurance through 90-minute sets.\n\n## A Basie chart\n\n'Corner Pocket' (Basie/Green). Lead trumpet plays high C and D regularly. Phrase 'in the pocket' — slightly behind the beat, never rushed. Section blends below you. Listen to the Basie 1957 Atomic recording for the model.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why lead now", body: "Big band gigs (touring, festival, theater pit) all hire lead trumpet first. If you can lead, you work. If you can't, you're 4th chair. Genius tier opens the lead chair." },
        { id: "t_shape",   heading: "Shape of leadership", body: "Project. Articulate first. Set the dynamic. Set the pitch (you're the section reference). Phrase clearly. The section locks to you; you don't lock to them. Confidence is non-optional." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Lead trumpeters who blast everything fortissimo. Result: they crack notes, lose endurance, the section can't hear themselves. Fix: most of the chart is mp-mf. Save fortissimo for shout choruses. Lead with restraint." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Big band lead · medium ballad · projection demonstrated" },
      { id: "demo_target", label: "Basie 'Corner Pocket' lead trumpet · with section" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // TRUMPET · L9 (Genius cert · compose, masterclass, recital)
  // ═══════════════════════════════════════════════════════════
  trumpet_l9_01_compose: {
    id: "trumpet_l9_01_compose",
    title: "Original composition · 32-bar piece (classical or jazz)",
    objectives: [
      "Compose 32-bar piece for solo or accompanied trumpet",
      "Choose tradition: classical concerto-style OR jazz original",
      "Notate full score (lead sheet for jazz, full notation for classical)",
    ],
    writtenContent:
      "## Trumpeter as composer\n\nClifford Brown wrote 'Daahoud' and 'Joy Spring.' Wynton wrote concertos and ballet scores. Ingrid Jensen writes for her own ensembles. Composing is the trumpeter's path beyond sideman work.\n\n## Two paths\n\n**Classical**: 32 bars, accompanied (piano or string ensemble), in the lyrical Hummel/Haydn tradition. **Jazz**: 32 bars AABA, lead sheet, in the Brown/Morgan tradition.\n\n## The test\n\nTest: does another trumpeter read your chart and play it in one take? If yes, the composition is functional. Then refine for musicality. Wayne Shorter wrote 'Footprints' in 30 minutes; the genius is in the editing.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose now", body: "Pro trumpet work + original material = bookings. Trumpeters with originals record their own albums, license their compositions, build careers. Without originals, you're playing other people's music forever." },
        { id: "t_shape",   heading: "Shape of AABA / sonata", body: "Jazz: A (8 bars hook) - A (8 bars same) - B (8 bars contrast) - A (8 bars return). Classical: introduction (4 bars) - exposition (12 bars) - development (8 bars) - recapitulation (8 bars). Either form works for 32 bars." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Composing what you can play but no one else can. Test: hand the chart to another trumpeter. If they struggle, simplify the unreasonable parts. Greats write *playable* music." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 32-bar trumpet composition · classical or jazz" },
    ],
  },
  trumpet_l9_02_masterclass: {
    id: "trumpet_l9_02_masterclass",
    title: "Masterclass · record yourself teaching range development",
    objectives: [
      "Record a 10-min teaching session on trumpet range building",
      "Demonstrate AND verbalize 3 range-building principles",
      "Diagnose hypothetical student's pressure problem + prescribe fix",
    ],
    writtenContent:
      "## Teach range\n\nThe most-asked trumpet question: 'How do I get higher?' Master teachers (Bud Herseth, Jens Lindemann, Rex Richardson) all have a method. Yours should too. Teaching it forces you to articulate your own approach.\n\n## Three principles\n\n1. Air speed (fast for high, slow for low). 2. Aperture size (small for high, open for low). 3. Tongue position (arched 'eee' for high, dropped 'aah' for low). Demonstrate each on the horn, with a hypothetical student in mind.\n\n## Diagnosis\n\nImaginary student: high notes are thin, lips bruise quickly. Diagnose: too much mouthpiece pressure. Prescribe: pull mouthpiece slightly away from face during ascending lip slurs, daily for 2 weeks. Re-evaluate after.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach to learn", body: "Articulating your range method forces you to understand it consciously. After the masterclass recording, your *own* playing improves — because you've explained it to yourself." },
        { id: "t_shape",   heading: "Shape of a lesson", body: "Diagnose (15%), demonstrate (40%), drill (30%), reflect (15%). Don't lecture. Don't play your concert. Pick one student error, demonstrate the fix, prescribe an exercise. Brief. Specific. Actionable." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Showing off your high notes. The masterclass isn't your audition. The student needs a fix to *their* problem; your high notes don't help them play higher. Teach the *technique*, not yourself." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 10-min masterclass · range building · Herseth-influenced" },
    ],
  },
  trumpet_l9_03_genius_cert: {
    id: "trumpet_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute recital",
    objectives: [
      "Perform Hummel Andante + Bb blues with one chorus + your original",
      "Demonstrate range, classical tone, jazz feel, and composer voice",
      "Sustain endurance + tone for full 18 minutes",
    ],
    writtenContent:
      "## The Genius recital\n\n18 minutes. Three works: Hummel Andante (classical lyricism, ~5 min), Bb blues with one chorus (jazz idiom, ~5 min), your original composition (composer voice, ~6 min). Programming arc: head, heart, voice.\n\n## The bar\n\nThis is conservatory-graduate trumpet level. Intonation locked. Endurance unbroken. Improvisation coherent. The recording is portfolio-grade for a decade of bookings.\n\n## Mental + physical prep\n\nSix weeks of daily practice. Range exercises every morning (10 min). Full run-throughs in the evening (last 3 weeks). Trumpet endurance is a physical condition; treat it like marathon training.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Top music schools (Juilliard, Curtis, Eastman) audition with this kind of program. Pass the cert, you're auditioning at the top. The recording goes in your portfolio for the rest of your career." },
        { id: "t_shape",   heading: "Shape of the recital", body: "Hummel (5 min) → 30s pause → blues with chorus (5 min) → 30s pause → original (6 min) → bow. Don't talk. Don't apologize. Begin and end with confidence." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Lip fatigue by minute 14. Cause: not training endurance. Fix: 6 weeks before, run the full program 3x/week. The cert recording is the 30th run, not the 1st. Fitness, not luck." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 18-min Genius recital · Hummel + Bb blues + original" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLARINET · L5
  // ═══════════════════════════════════════════════════════════
  clarinet_l5_01_harmony: {
    id: "clarinet_l5_01_harmony",
    title: "Mozart-style chord outlining over A-major drone",
    objectives: [
      "Outline I-IV-V-I in A major (concert) on the clarinet",
      "Land on chord-third or fifth at each barline",
      "Phrase across 16 bars without forced breath",
    ],
    writtenContent:
      "## Clarinet as Mozart's voice\n\nThe Mozart Clarinet Concerto K. 622 (1791) is the supreme test. The melody outlines harmony purely through stepwise + arpeggiated motion — no piano needed for the listener to hear the chord progression. That's the clarinet's harmonic gift.\n\n## In A major\n\nI = A C# E. IV = D F# A. V = E G# B. I = A C# E. Each chord one bar; four bars total; repeat to 16. Outline ascending arpeggios; land on chord-third on the bar line.\n\n## Goal\n\nThe drone (sustained A) supports your line; your line traces the harmony above. A listener with no other reference should hear the chord progression in your single melody.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why harmonic outlining", body: "Mozart Concerto K. 622, Brahms Quintet Op. 115, Weber Concertos — all assume harmonic awareness in the soloist. Without it, your phrasing floats over the band rather than locking to it." },
        { id: "t_shape",   heading: "Shape of arpeggios", body: "Ascending then descending alternation. Bar 1: A C# E (rising). Bar 2: F# A D (descending IV chord). Creates arch contour, voice leads through 3rds. Sabine Meyer's Mozart is the model." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Random scale runs that ignore chord shape. Result: line floats, doesn't anchor. Fix: arpeggio targets first; passing tones decoration only. Beat 1 chord tone is non-negotiable." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "A major harmonic outline · 70 bpm · arpeggio drill" },
      { id: "demo_target", label: "16-bar harmonic outline · 100 bpm · over A drone" },
    ],
  },
  clarinet_l5_02_fast: {
    id: "clarinet_l5_02_fast",
    title: "C major scale · 16-beat sixteenth-note run at 120 bpm",
    objectives: [
      "Play C major scale ascending + descending sixteenths at 120",
      "Maintain finger coordination across the throat tones (G-A-Bb-B)",
      "Land on C at the downbeat after 16 beats",
    ],
    writtenContent:
      "## Clarinet at speed\n\nThe clarinet's throat tones (G to B above middle C) are notorious for fingering complexity — each requires different combinations of register key + side keys. At 120 bpm, throat-tone transitions reveal every weakness.\n\n## The drill\n\nC major scale, 3 octaves (low E to high G), sixteenth notes, 120 bpm. 16 beats = 64 notes. 'doo-doo' legato articulation, even tongue.\n\n## The challenge zone\n\nThird-line B → throat-tone Bb → throat-tone A → throat-tone G — every fingering changes. Practice this transition slowly (60 bpm) until the fingers move automatically. Sabine Meyer's Mozart Concerto runs this section at 200 bpm with no rough edges. That's the target.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why fast scales", body: "Mozart Concerto, Brahms Quintet, Weber Concertos — every clarinet rep demands clean fast scales. If your scale stumbles at 120, your repertoire stumbles at performance tempo. Fix the scale first." },
        { id: "t_shape",   heading: "Shape of throat tones", body: "Throat tones use the register key + various side keys. Memorize the fingering chart for G-A-Bb-B until the fingers move without thought. Slow practice (60 bpm), repetition, automation." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pressing keys hard to ensure they seal. Hard pressing slows finger movement. Fix: light, fast finger contact. Pads should *kiss* the tone holes, not crush them. Fast = relaxed." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "C major scale · 80 bpm · sixteenths · throat tone clarity" },
      { id: "demo_target", label: "C major scale · 120 bpm · 16-beat run" },
    ],
  },
  clarinet_l5_03_improv_1: {
    id: "clarinet_l5_03_improv_1",
    title: "First improv · 4 bars over D drone (Klezmer-influenced)",
    objectives: [
      "Improvise 4-bar phrase using D harmonic minor scale",
      "Use ornamental turns + grace notes (Klezmer flavor)",
      "Resolve to D at the final downbeat",
    ],
    writtenContent:
      "## The Klezmer clarinet\n\nClarinet improv outside classical = Klezmer. Eastern European Jewish folk music; the clarinet is the lead voice. Naftule Brandwein, Dave Tarras, Giora Feidman, David Krakauer — the lineage. Ornamental, modal, emotionally direct.\n\n## D harmonic minor\n\nD E F G A Bb C# D. The augmented 2nd between Bb and C# = Klezmer's signature interval. Lean into it; don't smooth it out. The interval is the genre.\n\n## The drill\n\n4 bars over a D drone. Use D harmonic minor. Add Klezmer ornaments: 'krekhts' (sob — fast bend down then up), 'kneytsh' (trill ornament), 'tshok' (laugh — fast staccato repetition). Listen to Feidman's 'Klezmer Variations'; copy his ornaments.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Klezmer", body: "Genre fluency. Classical-only clarinetists are half-employed; clarinetists who can play Klezmer + Mozart + Brahms + Goodman jazz work constantly. The clarinet's range of styles is its career advantage." },
        { id: "t_shape",   heading: "Shape of ornaments", body: "Ornaments come *off* the main note, not as separate events. The 'krekhts' is a fast bend down and back up — sounds like a sob. The main pitch returns; the ornament colors it. Don't overdo." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Smoothing out the augmented 2nd. Many classical players sanitize Klezmer into 'minor with passing tones.' Wrong. The aug 2nd between Bb and C# is the *sound*. Lean into it. Cultural authenticity matters." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "D harmonic minor · slow Klezmer phrase · 80 bpm" },
      { id: "demo_target", label: "4-bar improv with ornaments · medium 110 bpm · Feidman-influenced" },
    ],
  },
  clarinet_l5_04_rep_2: {
    id: "clarinet_l5_04_rep_2",
    title: "Mozart Clarinet Concerto · second movement opening",
    objectives: [
      "Play opening 32 bars of Mozart Concerto K. 622 second movement",
      "Sustain the lyrical Adagio line in D major",
      "Apply Classical phrasing + selective vibrato",
    ],
    writtenContent:
      "## The Adagio of all Adagios\n\nMozart's K. 622 second movement (1791, his last completed instrumental work) is perhaps the most beautiful slow movement in clarinet repertoire. D major, 6/8 (or alla breve), serene. Sabine Meyer's recordings define it; Martin Fröst's 2006 recording is the modern reference.\n\n## The challenge\n\nLong sustained phrases. Each phrase = 4-8 bars without breath. Tone must stay even from beginning to end. No edge, no pinch — pure singing tone.\n\n## Vibrato\n\nClassical clarinet vibrato is *minimal*. Some players use almost none. If you use any, narrow + slow + only on long notes. Pure tone, not wobbly tone. Anton Stadler (Mozart's clarinetist) used straight tone; modern players follow his lead.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Mozart", body: "K. 622 is the clarinet centerpiece. Auditions, recitals, conservatory entrance — all test it. Pass it cold, you're at the gate of professional classical clarinet. The Adagio is the most-judged 8 minutes." },
        { id: "t_shape",   heading: "Shape of Adagio", body: "Six-eight feel = lilting, not heavy. Each phrase arcs over 4 bars. Breath at phrase ends, not mid-phrase. Plan breaths; mark in pencil before playing. Sabine Meyer's breaths are all phrase-end." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Adding too much vibrato. Modern clarinet is straighter than modern flute or oboe. If you vibrate every long note, you're playing flute style. Mozart wants Stadler tone — pure, centered, vibrato-light." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Mozart K. 622 Adagio · 60% tempo · breath markers" },
      { id: "demo_target", label: "Mozart Adagio bars 1-32 · target tempo · Sabine Meyer-style" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLARINET · L6 (Pro · register-break, rep, duet, cert)
  // ═══════════════════════════════════════════════════════════
  clarinet_l6_01_adv_tech: {
    id: "clarinet_l6_01_adv_tech",
    title: "Register-break fluency · seamless throat-to-clarion",
    objectives: [
      "Slur smoothly across the register break (Bb to B)",
      "Maintain tone consistency through the transition",
      "Apply to a Mozart concerto passage with frequent crossings",
    ],
    writtenContent:
      "## The clarinet's hardest gate\n\nThe register break: throat-tone Bb (using register key + thumb hole) to clarion B (using register key + opening). The fingering changes massively. The tone changes character (throat tones are slightly veiled; clarion is bright). Bridging this break smoothly is the Pro test.\n\n## The technique\n\n1. *Pre-finger* the next note before the previous one releases. 2. Air pressure stays constant — don't surge or drop at the break. 3. Embouchure firms slightly going up; relaxes slightly going down. 4. Practice slow, then add tempo.\n\n## Reference\n\nSabine Meyer's 'Mozart Concerto Adagio' has dozens of register-break crossings. Listen — you can't hear the break. That's the target. Listen to a less-skilled recording for contrast; the break audibly clunks.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why register break", body: "Every Pro-tier clarinet rep has register-break crossings. Mozart, Weber, Brahms, Copland, Bernstein — all assume seamless crossing. Fail it, the audience hears a clunk. Pro = no clunk." },
        { id: "t_shape",   heading: "Shape of pre-fingering", body: "Before the Bb releases, your fingers should already be on the B fingering — except the register key. Then: register key opens, Bb fingers lift simultaneously. Smooth, not staggered." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Air drop at the register break. Cause: anxiety, breath holds for an instant. Fix: practice the break with constant 'aaaaaa' vocalization (humming through nose) so air *cannot* stop. Then transfer to clarinet." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Register break drill · 60 bpm · slow crossings" },
      { id: "demo_target", label: "Mozart K. 622 register-break passage · target tempo · Meyer-style" },
      { id: "demo_pitfall", label: "Audible break · what to avoid" },
    ],
  },
  clarinet_l6_02_rep_3: {
    id: "clarinet_l6_02_rep_3",
    title: "Brahms Clarinet Quintet · first movement opening",
    objectives: [
      "Play the clarinet entry of Brahms Op. 115 first movement",
      "Sustain the lyrical opening over imagined string quartet",
      "Phrase across the 4-bar opening statement",
    ],
    writtenContent:
      "## Brahms's autumn voice\n\nBrahms came out of retirement (1891) to compose for clarinetist Richard Mühlfeld. The Clarinet Quintet Op. 115 (B-minor) is the result — autumnal, melancholy, the most lyrical Brahms ever wrote. Sabine Meyer's recording with the Cherubini Quartet is the modern reference.\n\n## The opening\n\nThe strings begin; clarinet enters in bar 14 with a sustained, sad melodic line. B-minor, sotto voce, deeply lyrical. Your entry is the emotional moment of the work.\n\n## The challenge\n\nTone control. The entry is *quiet* — pp. Your dynamic range must extend down to a whisper without thinning out. Then crescendo gradually through bars 18-22. Pure breath control + embouchure mastery.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Brahms Op. 115", body: "Chamber music's most-played clarinet work. Audition committees test it. Career-defining. Mühlfeld retired Brahms's pen; you should treat the work with the same gravity." },
        { id: "t_shape",   heading: "Shape of pp entry", body: "pp on clarinet = ~70 dB at 1m. Air pressure low, embouchure firm, reed responsive. Practice pp for 30 seconds, no wobble, no thinning. Then enter with confidence: quiet ≠ tentative." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pinched tone at pp. Cause: closing the embouchure to lower volume. Fix: lower air pressure, keep embouchure open. The reed should still vibrate freely; only the air supply differs." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Brahms Op. 115 clarinet entry · slow tempo · pp practice" },
      { id: "demo_target", label: "Full opening through bar 30 · target tempo · Meyer-style" },
    ],
  },
  clarinet_l6_03_duet: {
    id: "clarinet_l6_03_duet",
    title: "Clarinet duet · Poulenc Sonata for Two Clarinets",
    objectives: [
      "Play clarinet 1 part of Poulenc Sonata first movement",
      "Match articulation + phrasing with the second clarinetist",
      "Trade melodic leadership across phrase boundaries",
    ],
    writtenContent:
      "## Poulenc's chamber gem\n\nFrancis Poulenc wrote the Sonata for Two Clarinets (1918) at age 19. Three movements, ~7 minutes. Witty, rhythmic, distinctly French. Often programmed as the duo entry in chamber recitals.\n\n## The first movement\n\nFast, witty, conversational. Clarinet 1 leads, clarinet 2 imitates 2 bars later. Then they merge. Then clarinet 2 leads. Constant role-trading; both must listen actively.\n\n## Articulation matching\n\nIf clarinet 1 plays staccato, clarinet 2 must too. Mismatched articulation in a duo sounds amateur. Discuss bowings before rehearsal; agree, then commit.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why duet now", body: "Chamber music is half of a Pro clarinetist's work. Poulenc's two-clarinet sonata is the entry to clarinet chamber rep. Master it, and Mendelssohn duos, Crusell concertos, Brahms Trios all become accessible." },
        { id: "t_shape",   heading: "Shape of conversation", body: "Clarinet 1 = teacher's voice. Clarinet 2 = student's voice answering. Then they swap. Listen to the other clarinetist; match their articulation; respond, don't compete." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Both clarinetists at the same dynamic constantly. Result: undynamic. Fix: agree on dynamic levels before rehearsing. Mark in score: 'lead = mf, accomp = mp.' Plan, don't improvise dynamics." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Poulenc Sonata first movement · 70% tempo · phrase markers" },
      { id: "demo_target", label: "Full first movement · target tempo · with leadership trades" },
    ],
  },
  clarinet_l6_04_pro_cert: {
    id: "clarinet_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute recital",
    objectives: [
      "Perform Mozart Adagio + a Klezmer dance with one improv chorus",
      "Demonstrate classical AND folk-style command",
      "Sustain stamina + tone for full 5 minutes",
    ],
    writtenContent:
      "## The Pro recital\n\n5 minutes. Two contrasting works: Mozart Adagio (classical, sustained, lyrical) and a Klezmer dance (folk, ornamental, rhythmic — with one improvised chorus). The clarinet is uniquely capable of both; the cert tests the range.\n\n## Programming\n\nClassical first (Mozart) — 3 minutes. 5-second pause. Klezmer second — 2 minutes including improv. Don't reverse — Klezmer's bright tone is hard to settle from for Mozart's centered tone.\n\n## What's tested\n\n1. Tone (warm classical vs Klezmer-bright). 2. Intonation. 3. Phrase shape. 4. Improvisational coherence. 5. Stylistic appropriateness. The grader hears two musical worlds — both must be authentic.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Pro clarinetists work in symphony AND community AND wedding bands AND theater. The cert tests if you can switch styles. A clarinetist who only plays Mozart is half-employable." },
        { id: "t_shape",   heading: "Shape of contrast", body: "Mozart = restraint. Klezmer = expression. The contrast is the program. Differentiate clearly: tone, vibrato, articulation, ornament use. Same player, different soul." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing Klezmer with Mozart's tone (too sterile) or Mozart with Klezmer's tone (too edgy). Match style to genre. Mozart-Mozart, Klezmer-Klezmer; never mix styles within a piece." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min recital · Mozart Adagio + Klezmer dance with improv" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLARINET · L7 (Genius entry · circular breathing, rep, improv)
  // ═══════════════════════════════════════════════════════════
  clarinet_l7_01_advanced_1: {
    id: "clarinet_l7_01_advanced_1",
    title: "Circular breathing · sustaining unbroken legato lines",
    objectives: [
      "Inhale through the nose while exhaling cheek-stored air",
      "Sustain a single note for 30+ seconds with no audible break",
      "Apply to long Brahms Quintet phrases",
    ],
    writtenContent:
      "## The endless breath\n\nClassical clarinetists since the late 20th century have adopted circular breathing for sustained passages — Sabine Meyer, Andreas Ottensamer, Martin Fröst all use it. Brahms's Op. 115 has phrases of 12+ bars; without circular breathing, you must breathe in places that interrupt the line.\n\n## The mechanism\n\n1. Fill cheeks with air while still blowing.\n2. Squeeze cheeks to sustain horn airflow.\n3. Inhale through nose during the squeeze (~0.5 seconds).\n4. Resume diaphragm breathing seamlessly.\n\n## The drill\n\nStart without the clarinet — straw + glass of water. 60 seconds continuous bubbles. Then long F (concert) on the clarinet, 30 seconds. Then apply to the Brahms slow movement.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why circular breathing", body: "Modern Pro clarinet rep assumes it. Long Brahms phrases, contemporary works (Berio, Donatoni), some Mozart cadenzas — all benefit. Without it, you're cutting phrases the composer intended unbroken." },
        { id: "t_shape",   heading: "Shape of the squeeze", body: "Cheeks balloon ~30ml. Squeeze is slow, 0.5 seconds. Embouchure stays unchanged; only cheek muscles contract. Pitch must not waver — that requires matching cheek pressure to diaphragm pressure exactly." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Pitch wobble during transition. Cause: cheek pressure differs from diaphragm pressure. Fix: practice the squeeze at exactly the same air pressure your diaphragm provides. Match precisely." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Circular breathing · long F · 30 seconds" },
      { id: "demo_target", label: "Circular breathing · Brahms-style legato phrase · unbroken 12 bars" },
    ],
  },
  clarinet_l7_02_rep_4: {
    id: "clarinet_l7_02_rep_4",
    title: "Mozart Clarinet Concerto · first movement exposition",
    objectives: [
      "Perform the clarinet's first-movement exposition (bars 56-95)",
      "Execute the leaping Classical melodic line cleanly",
      "Sustain Mozartian lyricism + technical brilliance simultaneously",
    ],
    writtenContent:
      "## K. 622, the clarinet's Bach\n\nMozart's Clarinet Concerto in A major (1791). Three movements; the first movement exposition introduces the soloist with a virtuosic + lyrical statement. Bars 56-95 are the heart. Sabine Meyer's recording is the gold standard.\n\n## The challenge\n\nA major (3 sharps), basset clarinet range (some editions go below the modern clarinet's low E). Wide leaps. Fast scalar passages. All must sound *easy* — Mozart's classicism demands grace, not effort.\n\n## Tone\n\nWarm, centered, focused. Vibrato minimal or none. Anton Stadler's basset clarinet (the original) had a darker tone; modern Bb or A clarinet players approximate this with deeper mouthpieces. Sabine Meyer's setup is widely studied.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Mozart now", body: "K. 622 is the conservatory entrance audition piece. If you can play the exposition cleanly + musically, you're auditioning at the highest level. This work is your career pivot." },
        { id: "t_shape",   heading: "Shape of Mozart phrasing", body: "4-bar phrases. Each phrase: setup-statement-extension-resolution. Don't breathe mid-phrase. Plan all breaths in pencil before playing. Mozart's phrases are like conversations — interruption is rude." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Adding Romantic vibrato. Mozart is Classical, not Romantic. Vibrato should be minimal — pure tone, controlled, like a soprano's. If your Mozart sounds like Brahms, you're 100 years off-style." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Mozart K. 622 exposition · 70% tempo · phrase markers" },
      { id: "demo_target", label: "Bars 56-95 · target tempo · Sabine Meyer-style" },
    ],
  },
  clarinet_l7_03_improv_2: {
    id: "clarinet_l7_03_improv_2",
    title: "16-bar swing solo · Benny Goodman style over a Bb blues",
    objectives: [
      "Improvise 16 bars over Bb blues changes",
      "Use chord-tone melody + bluesy ornaments (Goodman vocabulary)",
      "Build dynamic + rhythmic shape across 16 bars",
    ],
    writtenContent:
      "## The clarinet in jazz\n\nBenny Goodman 'King of Swing' — clarinet was the lead voice of swing-era big bands. Goodman's solos on 'Sing Sing Sing,' 'Stompin' at the Savoy,' 'Avalon' are foundation. Later: Buddy DeFranco (bebop), Eddie Daniels (jazz-classical), Anat Cohen (modern).\n\n## The Bb blues\n\nStandard 12-bar form. Bb7-Bb7-Bb7-Bb7-Eb7-Eb7-Bb7-Bb7-F7-Eb7-Bb7-F7. 16 bars = 1.33 choruses or first 16 of a long-form blues.\n\n## Goodman vocabulary\n\nChord tones + chromatic enclosures + bluesy bends + ascending arpeggios with chromatic neighbors. Listen to Goodman's 1938 Carnegie Hall concert recording — clarinet jazz at its 1930s peak.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why jazz now", body: "Genre fluency. Classical-only clarinetists don't get session calls. Add jazz fluency, you're working twice as much. Goodman's vocabulary is the entry; Eddie Daniels takes it further." },
        { id: "t_shape",   heading: "Shape of the chorus", body: "Bars 1-4: state idea. Bars 5-8: develop. Bars 9-12: peak (highest note, most rhythm). Bars 13-16: resolve to Bb. Architecture matters in improvisation. Random notes = random impression." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing classical tone in jazz solos. Jazz tone is brighter, more 'vocal,' allows pitch bending. Loosen the embouchure 5%; let the sound 'spread' slightly. Classical purity in jazz = sterile." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bb blues · slow chorus · clarinet jazz vocabulary" },
      { id: "demo_target", label: "16-bar swing solo · medium 130 bpm · Goodman-style" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLARINET · L8 (Genius · maestro study, rep, ensemble)
  // ═══════════════════════════════════════════════════════════
  clarinet_l8_01_style_study: {
    id: "clarinet_l8_01_style_study",
    title: "Sabine Meyer · phrasing analysis across three Mozart recordings",
    objectives: [
      "Listen to Sabine Meyer's 1989, 1998, and 2010s K. 622 recordings",
      "Identify how her phrasing evolved over 25 years",
      "Apply one Meyer-style choice to your own playing",
    ],
    writtenContent:
      "## Sabine Meyer\n\nGerman clarinet virtuosa. Recorded Mozart's K. 622 multiple times across her career — different orchestras, different conductors, evolving interpretation. Studying her evolution is graduate-school clarinet.\n\n## Three recordings\n\n1989 (Karajan/BPO) — bold, broad, big sound. 1998 (Abbado/Berlin) — more refined, asymmetric phrasing. 2010s (chamber group) — spacious, period-aware. Same notes, three artists.\n\n## The exercise\n\nAdagio (second movement) only. Listen to all three back-to-back with score. Mark differences in tempo, vibrato use, breath placement. Then play Adagio three different ways. Choose the version that fits *you* now.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Sabine Meyer", body: "Defining clarinetist of her generation. Her recordings are taught in every conservatory. If you don't know her phrasing, you don't know modern Mozart clarinet style. Foundation, not optional." },
        { id: "t_shape",   heading: "Shape of comparison", body: "Time the Adagio in each recording. The 1989 is faster; the 2010s slower. Tempo + breath = the artist's signature evolving. Same notes, different worlds. Listen for what changed and ask: why?" },
        { id: "t_pitfall", heading: "Common pitfall", body: "Imitating exactly. Goal isn't to *be* Meyer — it's to absorb her approach. Take one element (breath placement, vibrato use, tempo choice) and apply it. The rest is your own voice." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Sabine Meyer K. 622 Adagio 1989 · phrasing markers" },
      { id: "demo_target", label: "Sabine Meyer K. 622 Adagio 2010s · for stylistic comparison" },
    ],
  },
  clarinet_l8_02_rep_5: {
    id: "clarinet_l8_02_rep_5",
    title: "Brahms Clarinet Quintet · slow movement",
    objectives: [
      "Perform the slow movement of Brahms Op. 115 (Adagio)",
      "Sustain the autumnal melodic line through 9-minute movement",
      "Project + blend with imagined string quartet",
    ],
    writtenContent:
      "## Brahms's autumn voice\n\nThe Adagio of Op. 115 (B-major as the relative major to B-minor). Nine minutes of pure lyricism. Brahms came out of retirement specifically to write this work for Mühlfeld; the slow movement is his most personal late-period statement.\n\n## The challenge\n\nSustained tone for 9 minutes. Long phrases, soft dynamics, no rushing. The clarinet must blend with the strings (sit *inside* their sound) and emerge as soloist in turn. Constant dynamic adjustment.\n\n## Reference\n\nKarl Leister with Amadeus Quartet (1968) — historical reference. Sabine Meyer with Cherubini Quartet — modern reference. Andreas Ottensamer with Schumann Quartet — youngest interpretation. All three teach different lessons.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Brahms slow movement", body: "It's the deepest lyrical clarinet work. Auditions, recitals, conservatory recitals — all program it. Pass it cold, you're at top-Pro standard. The Adagio takes a year to prepare properly." },
        { id: "t_shape",   heading: "Shape of 9 minutes", body: "Three sections: A (clarinet melody), B (development with strings), A (return). Section A is intimate; B builds; final A is resolution. Pace your dynamics across the full movement, not just bar by bar." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Volume creep. Players gradually get louder over 9 minutes from fatigue + adrenaline. Result: the final A is louder than the first, breaking the arch. Fix: record practice runs, listen back, adjust volume map." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Brahms Op. 115 Adagio · 70% tempo · phrase + dynamic map" },
      { id: "demo_target", label: "Full slow movement · target tempo · Meyer-Cherubini reading" },
    ],
  },
  clarinet_l8_03_accompany: {
    id: "clarinet_l8_03_accompany",
    title: "Wind quintet · clarinet in mixed-wind ensemble",
    objectives: [
      "Play clarinet part of a Reicha Wind Quintet",
      "Blend with flute, oboe, horn, bassoon",
      "Switch between melodic lead + harmonic support",
    ],
    writtenContent:
      "## The clarinet in mixed winds\n\nWind quintet (flute, oboe, clarinet, horn, bassoon) is chamber music's classic mixed-wind format. Reicha (1770-1836) wrote dozens of quintets that founded the genre. Modern quintets: Berlin Philharmonic Wind Quintet, Bergen Wind Quintet — all built on this rep.\n\n## The role\n\nClarinet's blend characteristics: warm in low register (with bassoon), bright in high (with flute), can lead the middle register. Constantly switching role: lead voice (4 bars) → harmonic 3rd (4 bars) → lead voice (4 bars).\n\n## Listening\n\nIn a quintet, every player must hear all 4 others. The clarinet timbre is the 'glue' — sits between the brilliance of flute/oboe and the warmth of horn/bassoon. Without good blending, the ensemble doesn't gel.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why wind quintet", body: "Pro orchestral wind playing demands quintet skills. Recital programs feature wind quintets. Without quintet experience, your section playing is amateur. Every Pro clarinetist has quintet on their resume." },
        { id: "t_shape",   heading: "Shape of blend", body: "When playing under flute, drop dynamic 6 dB; let flute lead. When playing with bassoon, match warmth, lock pitch tightly (the octave with bassoon is critical). Constant role-awareness, no autopilot." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Playing the same dynamic always. Result: undynamic ensemble, unbalanced texture. Fix: agree on dynamic levels in rehearsal; mark in score: 'sit, lead, sit, lead.' Plan, then commit." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Reicha Wind Quintet excerpt · slow tempo · clarinet role-switching" },
      { id: "demo_target", label: "Full Reicha first movement · target tempo · with full quintet" },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLARINET · L9 (Genius cert · compose, masterclass, recital)
  // ═══════════════════════════════════════════════════════════
  clarinet_l9_01_compose: {
    id: "clarinet_l9_01_compose",
    title: "Original composition · 32-bar work for clarinet",
    objectives: [
      "Compose 32 bars for solo or accompanied clarinet",
      "Choose tradition: classical, Klezmer, or jazz",
      "Notate full score with all dynamics + articulations",
    ],
    writtenContent:
      "## Clarinetist as composer\n\nGiora Feidman wrote his own Klezmer arrangements. Eddie Daniels composes jazz originals. Sabine Meyer commissioned new classical works. Composing is the path beyond interpretation.\n\n## Three paths\n\n**Classical**: 32 bars, accompanied (piano), in the lyrical Mozart/Brahms tradition. **Klezmer**: 32 bars in modal D harmonic minor, ornamental. **Jazz**: 32 bars AABA, lead sheet, in the Goodman/Daniels tradition.\n\n## The test\n\nDoes another clarinetist read your score and play it in one take? If yes, the composition is functional; refine for musicality. Wayne Shorter's 'Footprints' was written in 30 minutes; the genius is in editing.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose now", body: "Pro work + originals = bookings. Clarinetists with originals record their own albums, license compositions, build careers. Without originals, you're playing other people's music forever — ceiling lower." },
        { id: "t_shape",   heading: "Shape of forms", body: "Classical: A (statement) - A' (variation) - B (development) - A (return). Klezmer: doina (free intro) → bulgar (driving dance). Jazz: AABA. Choose form first; melody comes after." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Writing what only you can play. Test by handing the score to a peer. If they struggle, simplify. Greats write *playable* music. Your goal isn't to flex; it's to communicate." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 32-bar clarinet composition · classical/Klezmer/jazz" },
    ],
  },
  clarinet_l9_02_masterclass: {
    id: "clarinet_l9_02_masterclass",
    title: "Masterclass · record yourself teaching the register break",
    objectives: [
      "Record a 10-min teaching session on clarinet register break",
      "Demonstrate AND verbalize 3 register-break principles",
      "Diagnose hypothetical student's break clunk + prescribe fix",
    ],
    writtenContent:
      "## Teach the break\n\nThe register break is the clarinet's hardest gate. Master teachers (Robert Marcellus, Karl Leister, Yehuda Gilad) all have a method for it. Yours should too. Teaching it forces you to articulate your own approach.\n\n## Three principles\n\n1. Pre-fingering (next note's fingers ready before previous note ends). 2. Constant air pressure (no surge or drop at the break). 3. Slight embouchure firming on the way up. Demonstrate each on the clarinet.\n\n## Diagnosis\n\nImaginary student: audible clunk between Bb and B. Diagnose: air pressure drops at the transition. Prescribe: practice the break with continuous 'aaaaaa' vocalization (forces air to never stop). Daily for 2 weeks. Re-evaluate.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach to learn", body: "Articulating your method forces conscious understanding. After the masterclass recording, your *own* register-break playing improves — because you've explained it to yourself in plain words." },
        { id: "t_shape",   heading: "Shape of a lesson", body: "Diagnose (15%), demonstrate (40%), drill (30%), reflect (15%). Don't lecture. Pick one specific student error, demonstrate the fix, prescribe an exercise. Brief. Specific. Actionable." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Showing off your own playing. The masterclass isn't your concert. The student needs a fix to their problem; your perfect register break doesn't help them. Teach the *technique*, not yourself." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Sample 10-min masterclass · register break · Marcellus-style" },
    ],
  },
  clarinet_l9_03_genius_cert: {
    id: "clarinet_l9_03_genius_cert",
    title: "Genius Certificate · 15-20 minute recital",
    objectives: [
      "Perform Mozart Adagio + Klezmer/jazz piece + your original",
      "Demonstrate classical, folk, and composer voice",
      "Sustain stamina + tone for full 18 minutes",
    ],
    writtenContent:
      "## The Genius recital\n\n18 minutes. Three works: Mozart Adagio (classical lyricism, ~5 min), Klezmer or jazz piece with improvisation (~5 min), your original composition (~6 min). Programming arc: tradition, genre fluency, voice.\n\n## The bar\n\nThis is conservatory-graduate clarinet level. Intonation locked. Register-break crossings invisible. Improvisation coherent. The recording is portfolio-grade for a decade of bookings.\n\n## Mental + physical prep\n\nSix weeks of daily practice. Last two weeks: full run-throughs in performance attire, in performance posture. Record every run. The recording you submit should be the 30th attempt, not the 1st.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "Top music schools (Juilliard, Curtis, Eastman, Conservatoire de Paris) audition with this kind of program. Pass the cert, you're auditioning at the top. The recording follows you for a decade." },
        { id: "t_shape",   heading: "Shape of the recital", body: "Mozart (5 min) → 30s pause → Klezmer or jazz (5 min) → 30s pause → original (6 min) → bow. Don't talk. Don't apologize. Begin and end with confidence." },
        { id: "t_pitfall", heading: "Common pitfall", body: "Peaking in practice, not performance. Clarinetists often play their best alone in the practice room and worse in front of mics. Fix: dress-rehearse with cameras 6 weeks. Performance becomes routine." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 18-min Genius recital · Mozart + Klezmer/jazz + original" },
    ],
  },
};
