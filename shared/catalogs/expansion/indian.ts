/**
 * Hand-authored L2-L4 overrides · Indian classical expansion:
 * bansuri · harmonium · mridangam · veena.
 *
 * Indian classical pedagogy differs from Western:
 *   - Ragas (not keys) define the melodic framework
 *   - Sargam (Sa Re Ga Ma Pa Dha Ni) is the solfege
 *   - Taal (rhythmic cycles) frame the time, not bars
 *   - Gurukul tradition values imitation → internalization → improvisation
 *
 * We preserve that philosophy in writtenContent while mapping lesson
 * keys to the same L2-L4 generator skeleton for UI uniformity.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const INDIAN_EXPANSION_OVERRIDES: Record<string, Patch> = {
  // ═══ BANSURI · L2 (scale shipped in expansionHandAuthored) ═══
  bansuri_l2_02_two_note: {
    id: "bansuri_l2_02_two_note",
    title: "Sa–Re alap · the first two notes of raga Bilawal",
    objectives: [
      "Oscillate between Sa and Re with a seamless breath",
      "Hold each note 4 beats with steady pitch",
      "Introduce meend (slide) between the two",
    ],
    writtenContent:
      "## Alap is where raga begins\n\nBefore composition, before rhythm, before virtuosity — there is *alap*. Unaccompanied, slow, exploratory. The raga introduces itself through its lowest notes, one at a time.\n\n## Sa and Re\n\nSa = tonic. Re = 2nd (C → D in Bilawal). That's all. Two notes. For 5 minutes if you can hold the concentration.\n\n## The meend\n\nBetween Sa and Re there's no jump — there's a *meend*, a slide. On bansuri, you achieve this by half-covering the hole that separates them, letting the pitch bend continuously. It should feel like your breath is painting a curve, not two dots.\n\nA Hindustani bansuri master can play an alap on 3 notes for 30 minutes and have you weeping. That's the goal. Not now. Later. Start here.",
    drills: {
      teach: [
        { id: "t_breath", heading: "Breath before fingers", body: "The fingers change the pitch. The breath *is* the note. Work on a single Sa for 30 seconds before you ever try Re. Pitch stability = breath stability." },
        { id: "t_meend", heading: "Meend is a roll, not a stab", body: "When moving Sa → Re, don't lift the finger — roll it off slowly. You should hear every micro-pitch between them. That's the meend. Lifting is a Western attack; rolling is Hindustani." },
        { id: "t_pitfall", heading: "Common mistake: over-blowing Re", body: "When you change notes, beginners blow harder. Don't. Keep breath pressure steady; let the fingers do the work. Volume constancy through pitch change = control." },
      ],
    },
    audioRefs: [
      { id: "demo_sa", label: "Sa sustain · 30 sec" },
      { id: "demo_meend", label: "Sa → Re with meend · slow" },
      { id: "demo_alap", label: "Full Sa-Re alap · 2 min" },
    ],
  },
  bansuri_l2_03_tempo: {
    id: "bansuri_l2_03_tempo",
    title: "Steady breath at vilambit tempo (slow teental)",
    objectives: [
      "Sustain Sa-Re-Ga-Ma at one note per 4 beats in teental (16-beat cycle)",
      "Land on sam (beat 1) every cycle",
      "Breathe without audible gaps",
    ],
    writtenContent:
      "## Teental, vilambit speed\n\nTeental = 16 beats per cycle. Vilambit = slow. One note every 4 beats means 4 notes per cycle. Sa, Re, Ga, Ma — then back to Sa.\n\n## Sam\n\nThe first beat of the cycle is called *sam*. It's where the tabla player plays their strongest stroke, where every phrase lands, where every listener's head nods. Your Sa must hit exactly on sam. If you're early or late by even half a second in vilambit, everyone hears it.\n\n## Breathing\n\nAt vilambit tempo, 4 beats is long. You must breathe *between* notes, not during them. Find the silence after beat 4, before the next beat 1 — that's your inhale window. Make it inaudible.\n\n## Why start slow?\n\nFast covers mistakes. Slow exposes them. If you can hold Sa for 16 beats at 40 bpm without drift or wobble, everything faster becomes trivial.",
    drills: {
      teach: [
        { id: "t_sam", heading: "Sam is sacred", body: "In Hindustani music, landing on sam is the moment the cycle 'completes.' Miss it, and the listener feels unresolved. Every note you play is a journey back to sam." },
        { id: "t_inhale", heading: "Inhale in the gap, not the note", body: "Plan your breathing. Between two 4-beat notes there's an implied micro-silence — take your breath there, silently, nose-only. Audible mouth-breathing breaks the meditation." },
        { id: "t_pitfall", heading: "Don't count in English", body: "Use the bol: 'Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha.' Internalize the cycle linguistically, not numerically." },
      ],
    },
    audioRefs: [
      { id: "tanpura", label: "Tanpura drone · 16 bars" },
      { id: "tabla_teental_slow", label: "Tabla teental · 40 bpm" },
      { id: "demo_target", label: "Sa-Re-Ga-Ma in teental · landing on sam" },
    ],
  },
  bansuri_l2_04_first_piece: {
    id: "bansuri_l2_04_first_piece",
    title: "Your first bandish · short composition in raga Yaman",
    objectives: [
      "Play an 8-bar bandish in raga Yaman with correct phrasing",
      "Observe the raga's characteristic movement (Ni-Re-Ga as ascending approach)",
      "Return to sam on the 16th beat each cycle",
    ],
    writtenContent:
      "## Raga Yaman\n\nYaman is the raga students learn first — not because it's easy, but because it's *beautiful enough* to hold attention while you work on fundamentals. Evening raga. All natural notes except sharp Ma.\n\n## The bandish\n\nA bandish is a fixed composition — melody + lyrics, usually 4-8 lines. You play it straight first, then embellish.\n\n## Yaman's identity phrase\n\nNi-Re-Ga (low Ni → Re → Ga). That's the raga's fingerprint. Any Yaman exposition starts by establishing this phrase. You'll hear it in every recording.\n\n## Sam again\n\nYour bandish is 8 bars. That's half a teental cycle if you're playing 2 beats per bar. Line 1 ends on sam. Line 2 starts from sam. Memorize where sam is; your breath + your fingers must arrive there together.",
    drills: {
      teach: [
        { id: "t_raga", heading: "The raga has a mood", body: "Yaman is peaceful, introspective, twilight. Play like that. Don't rush to prove technical skill — Yaman rewards patience. The notes are simple; the feel is everything." },
        { id: "t_phrase", heading: "Phrases, not notes", body: "When you learn a bandish, memorize phrases (3-5 notes at a time), not individual pitches. Your brain remembers shapes better than numbers. Ni-Re-Ga is one shape; Pa-Dha-Ni-Sa' is another." },
        { id: "t_pitfall", heading: "Don't embellish yet", body: "Students hear recordings with meends, taans, gamaks, and try to imitate. Don't. Play the bandish *clean* first. Embellishments come at L4+. Clean is already hard." },
      ],
    },
    audioRefs: [
      { id: "demo_bandish", label: "Bandish straight · 8 bars" },
      { id: "demo_ornament", label: "Same bandish with meends (advance preview)" },
      { id: "tanpura_yaman", label: "Tanpura drone tuned for Yaman" },
    ],
  },

  // ═══ BANSURI · L3 ═══
  bansuri_l3_01_first_song: {
    id: "bansuri_l3_01_first_song",
    title: "Raghupati Raghav Rajaram · your first devotional bhajan",
    objectives: [
      "Play the melody of a classic Hindustani bhajan from memory",
      "Hold each phrase with emotional intent, not just pitch",
      "Take 3 passes through the song — straight, with meend, with subtle variation",
    ],
    writtenContent:
      "## Why bhajans first\n\nBhajans are devotional folk songs. Simple melodies, powerful emotional core, accessible to beginners. 'Raghupati Raghav' is the most famous — Gandhi's favorite, sung across India daily.\n\n## The melody\n\n4 lines, each ~4 beats. Uses only 5 notes (Sa Re Ga Pa Dha — a pentatonic subset of raga Bhairavi). If you learned L1, you can already play every note.\n\n## The feel\n\nHere's the hard part: playing the *notes* is L1. Playing the *feel* is L3. You're invoking devotion. Your breath should slow. Your meends should linger. Your silences should breathe.\n\n## Three passes\n\nPass 1: melody straight, no ornament. Confirm you know it.\nPass 2: add meends between adjacent notes. You'll hear it become Hindustani.\nPass 3: vary — sustain one note longer, hint at a phrase variation. You're composing in real-time. That's what a Hindustani musician does.",
    drills: {
      teach: [
        { id: "t_intent", heading: "Bhajans are prayer", body: "Don't play this like an exercise. Even alone in your room, imagine someone who needs this song. Your breath is carrying intent. The melody is a vehicle." },
        { id: "t_space", heading: "Silence is a note", body: "Between phrases, leave space. Don't rush to the next note. A held rest in Hindustani music is as expressive as a held pitch." },
        { id: "t_pitfall", heading: "Don't 'perform' yet", body: "L3 is about internalization, not performance. Play slowly, with eyes half-closed, for yourself. When the melody lives in you, it's ready for others." },
      ],
    },
    audioRefs: [
      { id: "demo_clean", label: "Raghupati Raghav · clean melody" },
      { id: "demo_ornament", label: "Raghupati Raghav · with Hindustani feel" },
      { id: "tanpura", label: "Tanpura for practice drone" },
    ],
  },
  bansuri_l3_02_dynamics: {
    id: "bansuri_l3_02_dynamics",
    title: "Dynamic control · soft Sa to loud Sa without breaking tone",
    objectives: [
      "Sustain Sa at pp (very soft) for 16 beats without pitch drop",
      "Crescendo from pp to f over 8 beats; decrescendo back",
      "Preserve tone quality across the full dynamic range",
    ],
    writtenContent:
      "## The bansuri dynamics problem\n\nA violin gets louder with more bow. A piano gets louder with harder keys. Bansuri? More breath = more pitch sharp. Less breath = pitch flat. The moment you try to vary dynamics, your pitch breaks.\n\n## The fix: embouchure compensation\n\nAs you blow harder, tilt the flute slightly *into* your face (covering more of the hole). As you blow softer, tilt it slightly *away*. This compensates for the pitch drift.\n\n## The drill\n\nHold Sa. Start pp (barely audible). Slowly crescendo to f over 8 beats. Listen: did the pitch rise? If yes, you didn't compensate. Practice until you can crescendo with zero pitch change.\n\n## Why this matters\n\nEvery great bansuri recording uses dynamics. Hariprasad Chaurasia will play a Sa so soft you lean in, then explode into a taan. That dynamic range is earned through this exact exercise. Hours of it.",
    drills: {
      teach: [
        { id: "t_lip", heading: "Embouchure is a fourth hand", body: "Your fingers, your breath, your body — and your lips. Lip position is a continuous control parameter. Most beginners lock their lips; experts roll the flute microscopically with each dynamic." },
        { id: "t_listen", heading: "Record and listen", body: "You cannot judge your own pitch while playing. Record every dynamics session. Play back. Use a tuner app to map where your pitch drifts. That's your practice diagnostic." },
        { id: "t_pitfall", heading: "Don't hold your breath for pp", body: "Soft isn't less air — it's slower air. Your abdomen still drives; your lips restrict the output. Breath holding creates tension, which kills tone." },
      ],
    },
    audioRefs: [
      { id: "demo_dynamics", label: "Sa · pp → f → pp with stable pitch" },
      { id: "demo_bad", label: "Pitch drift during crescendo (wrong example)" },
    ],
  },
  bansuri_l3_03_articulation: {
    id: "bansuri_l3_03_articulation",
    title: "Gamak vs meend · two expressive ornaments",
    objectives: [
      "Execute a clean meend (slide) between Sa and Ga",
      "Execute a clean gamak (oscillation) on a single note",
      "Combine both in a short 4-bar phrase",
    ],
    writtenContent:
      "## Two ornaments, two meanings\n\n**Meend** = slide. A continuous pitch journey from note A to note B. The ear hears the destination and the path.\n\n**Gamak** = oscillation. A rapid wavering *within* a note, giving it emphasis and 'weight.' The ear hears the note, but with emotion attached.\n\n## How to meend on bansuri\n\nRoll your finger slowly off the hole while maintaining breath. The pitch bends continuously. Practice Sa → Re (adjacent notes) first. Then Sa → Ga. Longer meends are harder — your breath must sustain throughout.\n\n## How to gamak\n\nMore advanced. The effect is created by rapid diaphragmatic pulses plus a slight jaw wobble — the pitch oscillates ±15 cents at ~5Hz. Think of shivering a note. Do not confuse this with a Western vibrato; gamak is *stronger*, more visceral, often around a specific interval (e.g., gamak on Ga might dip toward Re).\n\n## Combining\n\nA phrase like Sa – meend to Ga – gamak on Ga – meend back to Sa is pure Hindustani. Practice that 4-note phrase until it's seamless.",
    drills: {
      teach: [
        { id: "t_meend_control", heading: "Meend speed = expression", body: "A slow meend is meditative; a fast meend is urgent. Same notes, different feel. Practice both speeds. The tempo of the meend is a musical choice, not a technical accident." },
        { id: "t_gamak_energy", heading: "Gamak comes from the belly", body: "Don't try to gamak with your fingers. It's a breath pulse, originating in the diaphragm. Feel it as a series of small pushes, like laughter. Your finger barely moves; your breath does all the work." },
        { id: "t_pitfall", heading: "Ornaments serve the phrase", body: "Don't ornament every note. A master ornaments the *emotional peak* of a phrase, not the arrival. Plan where the meend goes before you play it." },
      ],
    },
    audioRefs: [
      { id: "demo_meend", label: "Meend · Sa to Ga · slow" },
      { id: "demo_gamak", label: "Gamak on Ga · 4 oscillations" },
      { id: "demo_phrase", label: "4-bar phrase combining both" },
    ],
  },
  bansuri_l3_04_standard_cert: {
    id: "bansuri_l3_04_standard_cert",
    title: "Standard Certificate · 2-minute bandish performance",
    objectives: [
      "Perform a 2-minute composition in raga Yaman or Bilawal",
      "Land on sam each cycle without prompting",
      "Include at least 2 meends and 1 gamak organically",
    ],
    writtenContent:
      "## The cert performance\n\nYou've spent L2-L3 learning fundamentals. Now demonstrate them under pressure.\n\n## Format\n\n2 minutes. Solo (with tanpura drone backing track provided). Raga Yaman or Bilawal. Any bandish from the teaching repertoire, or a traditional one you've learned elsewhere.\n\n## What the grader listens for\n\n1. **Pitch stability** — Sa should be rock solid throughout. If your Sa drifts, everything on top drifts.\n2. **Sam arrival** — does your 16th beat land? Misses = deductions.\n3. **Tone** — is your breath supporting clean tone, or are there wobbles and breaks?\n4. **Ornamentation** — meends and gamaks applied musically, not mechanically.\n5. **Overall feel** — does it *sound* Hindustani, or does it sound like scale practice?\n\n## Record, review, resubmit\n\nYou can submit this lesson as many times as you want. A failure teaches you more than a pass. Record, watch yourself critically, identify one thing to fix, rerecord.",
    drills: {
      teach: [
        { id: "t_nerves", heading: "Record button nerves", body: "Something breaks the moment you hit record. Practice performing *knowing* the button is on. Record every practice session. Familiarity dissolves the nerves." },
        { id: "t_warmup", heading: "Warm up with Sa", body: "Before the performance, play Sa for 3 minutes straight. Tune your ear, tune your breath, tune your nerves. Skipping warmup = unstable Sa = failed cert." },
        { id: "t_pitfall", heading: "Don't rush the exposition", body: "Beginners blow through the bandish to demonstrate speed. Don't. A slow, confident exposition scores higher than a rushed virtuosic one. Hindustani judges patience." },
      ],
    },
    audioRefs: [
      { id: "tanpura_yaman", label: "Tanpura for Yaman performance" },
      { id: "tanpura_bilawal", label: "Tanpura for Bilawal performance" },
      { id: "demo_reference", label: "2-min bandish · reference standard" },
    ],
  },

  // ═══ BANSURI · L4 ═══
  bansuri_l4_01_scale_two: {
    id: "bansuri_l4_01_scale_two",
    title: "Raga Bhairav · the dawn raga's asymmetric scale",
    objectives: [
      "Play Bhairav ascending + descending: Sa re Ga Ma Pa dha Ni Sa",
      "Observe komal (flat) Re and Dha",
      "Recognize the raga by phrase, not just scale",
    ],
    writtenContent:
      "## Bhairav · raga of dawn\n\nPlayed at sunrise. Grave, serious, slightly tense. Uses komal Re (flat 2nd) and komal Dha (flat 6th) — the rest natural.\n\n## The scale\n\n| Western | C | Db | E | F | G | Ab | B | C |\n| Sargam | Sa | re | Ga | Ma | Pa | dha | Ni | Sa |\n\n(Lowercase = komal, flat.)\n\n## Identity phrase\n\nGa-Ma-dha-Pa (the approach from below to Pa via flat 6th) is a Bhairav fingerprint. Also Sa-re-Sa with a heavy meend on re — that flat second pulled toward Sa is unmistakably Bhairav.\n\n## Practice\n\nThree passes: (1) ascending slowly, savoring each interval, (2) descending, (3) the identity phrase over and over until your hand knows it without your brain.",
    drills: {
      teach: [
        { id: "t_komal", heading: "Flat notes need stronger breath", body: "Komal re and komal dha sit between holes on bansuri — half-covering is required. Your breath must be confident to keep them in tune; hesitation makes them too flat or too sharp." },
        { id: "t_mood", heading: "Bhairav is solemn", body: "Don't play it like Yaman (peaceful) or Bhairavi (devotional). Bhairav has weight. Play slower. Let the komal notes ache. Before technique comes mood." },
        { id: "t_pitfall", heading: "Don't confuse Bhairav with Bhairavi", body: "Two different ragas. Bhairav = dawn, komal re + dha only. Bhairavi = all komal notes + closing raga (Bilawal's shadow). The names sound similar; the ragas are opposites." },
      ],
    },
    audioRefs: [
      { id: "demo_scale", label: "Bhairav scale · ascending and descending" },
      { id: "demo_phrase", label: "Identity phrase · Ga Ma dha Pa" },
      { id: "tanpura_bhairav", label: "Tanpura tuned for Bhairav" },
    ],
  },
  bansuri_l4_02_ornament: {
    id: "bansuri_l4_02_ornament",
    title: "Kan · grace note, the Hindustani mini-ornament",
    objectives: [
      "Execute a kan (quick grace note) before Sa, Ga, Pa",
      "Place the kan so briefly it's felt more than heard",
      "Apply kan to a 4-bar Bhairav phrase",
    ],
    writtenContent:
      "## Kan · the hidden ornament\n\nKan = a fraction-of-a-second grace note before a main note. Not a full meend, not a gamak — a *shadow*. The listener hears the main note but feels the approach.\n\n## How to play it\n\nIf your target is Ga, play Re for ~50ms, then Ga. The Re is the kan. It should feel like a finger *brushing* the preceding hole before committing to the target.\n\n## Where kan belongs\n\nBefore notes that need emphasis. Before the sam arrival. Before a phrase peak. Not everywhere — that sounds neurotic. A master places kan sparingly; you feel them rather than notice them.\n\n## Bhairav practice\n\nTake the Bhairav identity phrase (Ga-Ma-dha-Pa). Add a kan-Ma before the dha. Feel the difference — the dha now *aches* because the approach highlighted it.",
    drills: {
      teach: [
        { id: "t_brief", heading: "Kan must be brief", body: "If the kan lasts too long, it becomes a full note and you're playing Re-Ga instead of kan-Ga. 30-70ms is the sweet spot. Faster than your brain can deliberately time — it must be reflexive." },
        { id: "t_select", heading: "Select kan locations intentionally", body: "Kan goes on phrase peaks, before sam, before notes that want emphasis. Don't kan every note. Sparse placement makes each kan meaningful." },
        { id: "t_pitfall", heading: "Don't kan AND meend to the same note", body: "Both ornaments approach a target. Doing both makes the target mushy. Pick one ornament per note — or leave it clean." },
      ],
    },
    audioRefs: [
      { id: "demo_kan_isolated", label: "Kan before Sa, Ga, Pa · isolated examples" },
      { id: "demo_phrase", label: "Bhairav phrase with kan on peak" },
    ],
  },
  bansuri_l4_03_rep_1: {
    id: "bansuri_l4_03_rep_1",
    title: "Raga Bhupali bandish · pentatonic evening raga piece",
    objectives: [
      "Learn a 16-bar bandish in Bhupali",
      "Play it with meends + 2 kan ornaments",
      "Sustain through 2 full teental cycles",
    ],
    writtenContent:
      "## Bhupali\n\nEvening pentatonic raga — Sa, Re, Ga, Pa, Dha. No Ma, no Ni. Five notes, infinite possibilities. Often the first raga after Yaman in a musician's study.\n\n## The bandish\n\n'Jab se tum bichhade mose piya' — 16 bars, teental. You'll learn the first stanza here.\n\n## What's hard\n\n1. The leaps are wider (no Ma means Ga → Pa is a minor third, feels exposed).\n2. Two teental cycles (32 beats) of breath planning.\n3. Ornaments must feel organic — you've drilled them in L3-L4; now they must *appear* without thought.\n\n## Pacing\n\nWeek 1: straight melody, metronome.\nWeek 2: add meends.\nWeek 3: add kan at 2 peaks.\nWeek 4: record, self-critique, refine.",
    drills: {
      teach: [
        { id: "t_pentatonic", heading: "Pentatonic = emotional palette", body: "Five notes force you to be *expressive* rather than clever. You can't hide behind complexity. Each note must land with intent." },
        { id: "t_breath_long", heading: "Plan breath for 32 beats", body: "Mark the 3-4 places where you can inhale. Commit. Don't improvise breaths mid-piece — you'll crash. The breath plan is as important as the note plan." },
        { id: "t_pitfall", heading: "Don't over-ornament pentatonic", body: "Pentatonic ragas shine with *space*. Excess meends and kan clutter the melody. Let notes sit. Trust them." },
      ],
    },
    audioRefs: [
      { id: "demo_clean", label: "Bhupali bandish · clean melody · 16 bars" },
      { id: "demo_ornament", label: "Same with meends + 2 kan placements" },
      { id: "tanpura_bhupali", label: "Tanpura for Bhupali practice" },
    ],
  },
  bansuri_l4_04_practice_rout: {
    id: "bansuri_l4_04_practice_rout",
    title: "The 15-minute Hindustani riyaz block",
    objectives: [
      "Structure a 15-min session: Sa (3) + scale (5) + bandish (7)",
      "Record the session and review",
      "Commit to this routine daily for a week",
    ],
    writtenContent:
      "## Riyaz · Indian classical practice\n\nRiyaz isn't practice-in-English. It's a sacred daily ritual. Hindustani musicians riyaz for 2-4 hours daily across their career. We can't ask that; we can ask 15 minutes.\n\n## The block\n\n**3 min · Sa** — sustain the tonic. No scale, no melody. Just Sa. Listen to your breath, tune to the tanpura, become present.\n\n**5 min · Scale of the day** — pick a raga, play its scale ascending + descending. Slow. Every note should be perfect, not fast.\n\n**7 min · Bandish** — pick a piece you're working on. Play it 2-3 times, each pass focused on one thing: pitch, then rhythm, then ornament.\n\n## Record every session\n\nYour ear changes between sessions. Yesterday's 'good' Sa is today's 'slightly sharp.' Only recordings tell the truth. Review before next session.\n\n## Daily > intense\n\n15 minutes daily > 2 hours once a week. Neurologically not even close. Build the habit.",
    drills: {
      teach: [
        { id: "t_ritual", heading: "Make it ritual", body: "Same time, same place, tanpura on first. This consistency builds a psychological 'enter mode' trigger. After 2 weeks, just hearing the tanpura makes you focus." },
        { id: "t_one_focus", heading: "One focus per session", body: "You can't fix pitch + rhythm + ornament + dynamics in one 15-min block. Pick one. Next session, pick another. Rotate daily." },
        { id: "t_pitfall", heading: "Don't skip Sa", body: "Beginners think Sa is boring and skip to the bandish. You'll learn the bandish faster *with* Sa than without. Sa tunes your ear for everything after." },
      ],
    },
    audioRefs: [
      { id: "tanpura_c", label: "Tanpura in C · 15 min loop" },
      { id: "demo_routine", label: "Reference riyaz · Sa + scale + bandish · 15 min" },
    ],
  },

  // ═══ HARMONIUM · L2 (scale shipped elsewhere or TBD) ═══
  harmonium_l2_01_scale: {
    id: "harmonium_l2_01_scale",
    title: "Harmonium major scale · right hand only, bellows steady",
    objectives: [
      "Play C major scale with right hand, two octaves",
      "Pump the bellows with steady pressure — no surges",
      "Maintain even volume across the whole scale",
    ],
    writtenContent:
      "## The harmonium paradox\n\nLeft hand pumps. Right hand plays. The coordination looks simple — until you try it. Your bellows hand will speed up when the melody gets dramatic; your playing hand will hesitate when the bellows flag. Both must operate independently, like drumming.\n\n## Bellows first\n\nBefore you touch a key, pump the bellows alone for 1 minute. Feel the rhythm — in, out, in, out. Smooth. No stops. That's your backbone.\n\n## The scale\n\nC D E F G A B C — C D E F G A B C. Two octaves, ascending + descending. Right hand uses thumb-index-middle-thumb-index-middle-ring-pinky on C-D-E-F-G-A-B-C (the thumb-under technique).\n\n## Even volume\n\nListen to each note. The bellows pressure should be identical from C to C. If the 7th note is louder, your bellows surged on that beat. Rewind. Try again.",
    drills: {
      teach: [
        { id: "t_bellows", heading: "Bellows is the breath", body: "Think of harmonium like bansuri — the air is your breath. Constant, steady, never surging. The fingers are the fingers; the bellows is the singer." },
        { id: "t_thumb", heading: "Thumb-under for 8 notes", body: "On C-D-E, use thumb-index-middle. After E, pass thumb under middle to F — now you have thumb on F with 4 more fingers available for G-A-B-C. Classical piano fingering, imported to harmonium." },
        { id: "t_pitfall", heading: "Don't let bellows pause", body: "The harmonium makes zero sound without bellows motion. Even during a held note, the bellows keeps going slowly. A pause = silence = broken line." },
      ],
    },
    audioRefs: [
      { id: "demo_bellows", label: "Bellows pumping rhythm · bare" },
      { id: "demo_scale_slow", label: "C major scale · 50 bpm slow" },
      { id: "demo_scale_target", label: "C major scale · 80 bpm with even volume" },
    ],
  },
  harmonium_l2_02_two_note: {
    id: "harmonium_l2_02_two_note",
    title: "Sa-Pa drone · the harmonium's most ancient voice",
    objectives: [
      "Hold Sa (C) + Pa (G) together as a sustained drone",
      "Pump bellows without altering the held chord",
      "Maintain for 2 minutes without drift or fatigue",
    ],
    writtenContent:
      "## Drone = Indian music's foundation\n\nBefore melody, before rhythm, there's drone. In Hindustani music, the tanpura provides it. In a home practice setting, the harmonium can substitute — if you hold Sa + Pa (tonic + fifth) while you hum or play melody over it.\n\n## Holding the chord\n\nPress C and G with thumb + middle finger of the right hand. Hold. The bellows must not stop. The fingers must not release.\n\n## Why 2 minutes?\n\nThis is meditation practice disguised as technique. In 2 minutes, your shoulder wants to tense, your bellows wants to slow, your mind wants to wander. Practice holding the drone without any of those breakdowns. When you can hold a steady drone for 2 minutes, you've earned the right to play melody over it.\n\n## Sa-Pa variants\n\nOnce Sa-Pa is locked, try Sa-Ma (C+F) for ragas that emphasize the 4th. Different ragas prefer different drones.",
    drills: {
      teach: [
        { id: "t_hand_shape", heading: "Relaxed claw", body: "Your right hand should form a loose claw — thumb on C, middle on G. Not a tense grip. Tension after 30 seconds = fatigue. Relax the wrist. Let gravity hold the keys, not muscle." },
        { id: "t_body", heading: "Sit upright", body: "A slumped posture kills bellows efficiency. Shoulders down, back straight, harmonium at sternum height. Your body is a bellows too." },
        { id: "t_pitfall", heading: "Don't stare at the keys", body: "Close your eyes once your fingers are in position. This is a drone, not a virtuosic passage. Let your ears take over. Your fingers already know the task." },
      ],
    },
    audioRefs: [
      { id: "demo_sa_pa", label: "Sa-Pa drone · 2 min sustain" },
      { id: "demo_sa_ma", label: "Sa-Ma drone · alternate for Yaman" },
    ],
  },
  harmonium_l2_03_tempo: {
    id: "harmonium_l2_03_tempo",
    title: "Teental pulsing · right hand Sa on every beat 1",
    objectives: [
      "Play Sa (C) on beat 1 of each 4-beat group, 16 bars",
      "Drone Sa-Pa sustained underneath with left hand",
      "Lock to a tabla teental track",
    ],
    writtenContent:
      "## Harmonium in Hindustani rhythm\n\nThe harmonium is usually an accompaniment instrument — pumping chords while the sitar or vocalist takes the melody. But even as accompaniment, you must lock to the tabla.\n\n## The exercise\n\nBackground: tabla playing teental (16-beat cycle, 4 groups of 4).\nLeft hand: Sa-Pa drone, sustained, bellows steady.\nRight hand: strike Sa on beat 1 of each 4-beat group. That's 4 strikes per cycle.\n\n## Why only beat 1?\n\nBecause landing on beat 1 is the entire job of a harmonium accompanist in vilambit. The sam (beat 1 of the cycle) gets extra emphasis. The other 3 group-starts are subtler. This drill builds that reflex.\n\n## Listen for flams\n\nSame principle as bass — your Sa strike and the tabla's dha must be one attack. If you hear two attacks, you're off by 40+ms. Adjust.",
    drills: {
      teach: [
        { id: "t_sam_weight", heading: "Sam gets weight", body: "The first beat of the cycle — the true sam — should land a hair louder than the other beat-1s. This is the 'resolution' feeling. Your audience hears it as relief." },
        { id: "t_left_hand", heading: "Left hand keeps droning", body: "Beginners interrupt the drone to help the right hand. Don't. The drone never stops. It's the cushion the melody lies on." },
        { id: "t_pitfall", heading: "Don't anticipate beat 1", body: "Harmonium accompanists rush sam because they feel its importance. Relax. Wait for it. Arriving exactly on sam is better than arriving 30ms before it." },
      ],
    },
    audioRefs: [
      { id: "tabla_teental_slow", label: "Tabla teental · 60 bpm" },
      { id: "tabla_teental_target", label: "Tabla teental · 80 bpm target" },
      { id: "demo_combined", label: "Harmonium drone + Sa strike · with tabla" },
    ],
  },
  harmonium_l2_04_first_piece: {
    id: "harmonium_l2_04_first_piece",
    title: "Simple Yaman bandish · harmonium as primary voice",
    objectives: [
      "Play the melody of a short Yaman bandish with right hand",
      "Sustain Sa-Pa drone with left hand",
      "Complete 2 full teental cycles (32 beats) without losing time",
    ],
    writtenContent:
      "## Harmonium carries melody here\n\nWhile typically accompaniment, in this piece the harmonium is *the voice*. Right hand plays the bandish melody; left hand drones.\n\n## Coordination\n\nRight hand moves through Yaman's notes: Sa Re Ga Ma♯ Pa Dha Ni Sa. Left hand stays on Sa-Pa the whole time.\n\n## What's hard\n\n- Right-hand independence while left hand sustains\n- Bellows supplies air for *both* voices continuously\n- Landing phrase ends on sam\n\n## The melody\n\nYou'll learn an 8-bar bandish phrase that uses notes: Ga-Ma♯-Pa-Ma♯-Ga-Re-Sa (ascending then descending). Repeat for 2 cycles of teental.\n\n## Practice path\n\n1. Right hand only, counting beats out loud.\n2. Left hand drone only, with tabla track.\n3. Combined, slowly, at 50 bpm.\n4. Ramp up to 80 bpm.",
    drills: {
      teach: [
        { id: "t_independence", heading: "Hand independence is the skill", body: "The 8 bars you play are simple. Playing them *while* the left hand drones is the whole game. Don't be surprised if it takes a week to unite the hands." },
        { id: "t_breath_bellows", heading: "Bellows budget", body: "Two voices = twice the air. Pump slightly harder, slightly faster. If the sound dies mid-phrase, your bellows under-budgeted." },
        { id: "t_pitfall", heading: "Don't play melody with ornaments yet", body: "This is L2 — melody first, clean. L3 adds ornaments. If you try meend-like slides between keys now, you'll lose time + hand independence simultaneously." },
      ],
    },
    audioRefs: [
      { id: "demo_melody", label: "Right-hand melody alone · 8 bars" },
      { id: "demo_drone", label: "Left-hand drone alone · 8 bars" },
      { id: "demo_combined", label: "Combined · 80 bpm with tabla" },
    ],
  },

  // ═══ HARMONIUM · L3 ═══
  harmonium_l3_01_first_song: {
    id: "harmonium_l3_01_first_song",
    title: "Bhajan accompaniment · 'Vaishnava jana to'",
    objectives: [
      "Play the classic Narsinh Mehta bhajan melody",
      "Switch between melody (right hand) and accompaniment role",
      "Recognize the phrase repetition pattern",
    ],
    writtenContent:
      "## 'Vaishnava jana to'\n\n15th-century Gujarati bhajan. Gandhi's favorite alongside Raghupati Raghav. Plays in every household satsang. Melody is disarmingly simple and profound.\n\n## Two modes\n\n**Lead mode:** you play the melody, someone else sings OR you sing and match your right hand to your voice.\n\n**Accompany mode:** someone else sings; you hold the drone + occasional chord punctuation.\n\nThis lesson: lead mode. You play the melody.\n\n## The pattern\n\nLine 1 (mukhda): establishes the theme.\nLine 2 (antara): raises the pitch.\nLine 3: returns to mukhda.\nLine 4: closes on Sa.\n\nThis AABA structure is universal in bhajans. Internalize it here.\n\n## Feeling\n\nThis is a *devotional* piece about the qualities of a true devotee. Play as prayer, not performance. Slow. Let the melody breathe. Sam arrivals should feel weighty, not rushed.",
    drills: {
      teach: [
        { id: "t_aaba", heading: "Structure = memory hook", body: "AABA means you only need to learn A and B. Line 3 is identical to line 1. Your hand should already know it. Focus memorization on the unique parts." },
        { id: "t_singing", heading: "Sing in your head", body: "Even if you don't sing aloud, mentally sing the lyrics. The melody makes more sense when aligned to words. Missing the words = playing it mechanically." },
        { id: "t_pitfall", heading: "Don't add piano-style chords", body: "Harmonium in bhajans plays melody + drone. Full Western chords sound wrong. One note at a time on the right hand; Sa-Pa drone on the left. Trust the sparseness." },
      ],
    },
    audioRefs: [
      { id: "demo_melody", label: "Vaishnava jana to · melody only" },
      { id: "demo_with_singer", label: "Harmonium + singer · accompaniment mode" },
      { id: "demo_drone_bhajan", label: "Drone for practice" },
    ],
  },
  harmonium_l3_02_dynamics: {
    id: "harmonium_l3_02_dynamics",
    title: "Bellows dynamics · whisper to wail",
    objectives: [
      "Play a single note from pp to ff and back using bellows alone",
      "Apply to a 4-bar bhajan phrase",
      "Maintain pitch stability across dynamic extremes",
    ],
    writtenContent:
      "## Harmonium dynamics = bellows technique\n\nUnlike piano, where key velocity controls volume, harmonium volume comes entirely from bellows pressure. Harder pump = louder. Softer pump = softer.\n\n## Why this is hard\n\nYour left hand is doing the bellows. Your right hand is playing melody. Varying bellows pressure while maintaining steady rhythm + melody = 3-way coordination.\n\n## The drill\n\nHold middle C with right hand. With left hand: pump ultra-softly (pp) for 4 beats → gradually increase to ff over 4 beats → sustain ff for 4 beats → decrease to pp over 4 beats. 16-beat dynamic arc.\n\n## Apply to phrase\n\nNow play the first 4 bars of 'Vaishnava jana to' with the same arc — soft start, swell on line 2, return to soft on line 3.\n\n## Pitch check\n\nDoes the pitch rise as you crescendo? Modern harmoniums drift less than bansuri, but old ones drift significantly. Use a tuner; train yourself to hear drift.",
    drills: {
      teach: [
        { id: "t_forearm", heading: "Use your forearm, not wrist", body: "Pumping from the wrist alone fatigues fast and gives jerky pressure. Engage the forearm — long, smooth motions from the elbow. Professional harmonium players barely move their wrist." },
        { id: "t_shape", heading: "Dynamic shape = emotion", body: "A bhajan with even volume is flat. A bhajan with a pp-ff-pp arc breathes. Dynamics *are* emotion in harmonium — they're your only expressive tool besides melody choice." },
        { id: "t_pitfall", heading: "Don't explode at ff", body: "Jumping from p to ff in one pump = spike. Listeners flinch. Crescendo over 4+ beats. Gradual swell is musical; sudden volume is startling." },
      ],
    },
    audioRefs: [
      { id: "demo_arc", label: "Dynamic arc · pp to ff to pp · single note" },
      { id: "demo_phrase_dyn", label: "Bhajan phrase with dynamic arc applied" },
    ],
  },
  harmonium_l3_03_articulation: {
    id: "harmonium_l3_03_articulation",
    title: "Staccato vs legato on harmonium · key release matters",
    objectives: [
      "Play a phrase legato (overlapping notes, no gap)",
      "Play the same phrase staccato (sharp releases, clear gaps)",
      "Combine both on a single bhajan line",
    ],
    writtenContent:
      "## The counter-intuitive harmonium articulation\n\nYou'd think articulation comes from how you *press* keys. Actually on harmonium, it comes from how you *release* them. The bellows supplies constant air; the keys open/close valves. A key held slightly longer = legato; a key released quickly = staccato.\n\n## Legato\n\nPlay C to D: press C, press D, release C (in that order). The two notes overlap briefly. No silence between them. That's legato.\n\n## Staccato\n\nPlay C to D: press C, release C, press D, release D. Each note isolated. Short holds. Crisp gaps between.\n\n## Musical use\n\nLegato = smooth, singing, devotional (bhajans).\nStaccato = rhythmic, dance-like, kirtan-style.\n\n## The mix\n\nIn a 4-bar phrase, you might play the first 2 bars legato (building intensity) and the last 2 bars staccato (kirtan climax). This contrast is the hallmark of skilled harmonium players.",
    drills: {
      teach: [
        { id: "t_release", heading: "Release is the new press", body: "Retrain your brain: the *release* is the articulation control. Same principle as organ. When you switch from piano to harmonium, this re-wiring takes weeks." },
        { id: "t_overlap", heading: "Legato overlap is ~50ms", body: "If you overlap too long, it sounds muddy. If not enough, gap creates staccato. Aim for a brief intentional overlap where the new note is already speaking before the old one stops." },
        { id: "t_pitfall", heading: "Don't staccato a bhajan", body: "Bhajans are singing. Singing is legato. If you use staccato on a devotional melody, it loses soul. Match articulation to genre: bhajans legato, kirtans can be staccato on climax." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "Phrase · legato articulation" },
      { id: "demo_staccato", label: "Same phrase · staccato" },
      { id: "demo_mixed", label: "Combined · legato-then-staccato" },
    ],
  },
  harmonium_l3_04_standard_cert: {
    id: "harmonium_l3_04_standard_cert",
    title: "Standard Certificate · bhajan performance",
    objectives: [
      "Perform a 2-minute bhajan with melody + drone",
      "Include a dynamic arc",
      "Maintain tempo through both verses",
    ],
    writtenContent:
      "## Your cert piece\n\nPick one of three bhajans: 'Vaishnava jana to', 'Raghupati Raghav', or 'Om Jai Jagdish Hare'.\n\n## What's graded\n\n1. **Melody accuracy** — right notes, right order, right rhythm.\n2. **Drone stability** — Sa-Pa held consistently throughout.\n3. **Bellows smoothness** — no pressure surges.\n4. **Dynamic arc** — at least one soft-loud-soft progression.\n5. **Sam alignment** — phrase endings land on teental beat 1.\n\n## Common failure modes\n\n- Hands un-coordinate halfway through (L2-L3 skill gap).\n- Bellows slows during melodic intensity.\n- Dynamic arc is missing or unconvincing.\n\n## Tip\n\nRecord with a metronome or tabla track at 70 bpm. Relisten. The recording tells you more than your in-the-moment feeling ever could.",
    drills: {
      teach: [
        { id: "t_goal", heading: "Musical > technical", body: "A technically clean but emotionally flat recording scores lower than a technically imperfect but soulful one. Play for the listener, not the grader." },
        { id: "t_breaths", heading: "Plan your breaths (and bellows)", body: "A bhajan is ~2 min; your arm will fatigue. Mark 2-3 spots in the score where the melody pauses briefly — these are your arm-rest moments. Pre-plan them." },
        { id: "t_pitfall", heading: "Don't rush the ending", body: "Students rush as they approach the end, relieved it's almost over. Don't. The final Sa return should be the weightiest, slowest moment of the piece. Savor it." },
      ],
    },
    audioRefs: [
      { id: "demo_vaishnava", label: "Vaishnava jana to · 2-min reference" },
      { id: "demo_raghupati", label: "Raghupati Raghav · 2-min reference" },
      { id: "demo_om_jai", label: "Om Jai Jagdish Hare · 2-min reference" },
    ],
  },

  // ═══ HARMONIUM · L4 ═══
  harmonium_l4_01_scale_two: {
    id: "harmonium_l4_01_scale_two",
    title: "Raga Kafi · the monsoon mode",
    objectives: [
      "Play Kafi: Sa Re ga Ma Pa Dha ni Sa (flat Ga, flat Ni)",
      "Recognize by phrase: Ga-Re-Sa descent feels especially Kafi",
      "Improvise 2 bars within the scale",
    ],
    writtenContent:
      "## Kafi\n\nRomantic, folksy. Played in rainy seasons. Kids' songs often use Kafi. Flat Ga and flat Ni; all else natural.\n\n## The scale\n\n| Western | C | D | Eb | F | G | A | Bb | C |\n| Sargam | Sa | Re | ga | Ma | Pa | Dha | ni | Sa |\n\n## Phrase fingerprint\n\nga-Re-Sa (E♭ → D → C) descending. This micro-phrase defines Kafi. You'll hear it in every Kafi recording you listen to. Drill this descending 3-note fragment until your hand owns it.\n\n## Why improvise now\n\nL2-L3 was imitation. L4 starts composition. Once you know Kafi's 7 notes + fingerprint, improvise 2 bars by rearranging them. This is how Hindustani musicians learn.",
    drills: {
      teach: [
        { id: "t_flat_keys", heading: "Flat notes on harmonium", body: "Unlike bansuri, flat notes on harmonium are just black keys. Eb is the 3rd black key from C; Bb is the black key between A and high C. Trivial *physically*; harder to internalize *aurally*." },
        { id: "t_folk_feel", heading: "Kafi is folk", body: "Don't play Kafi with classical gravitas. It's playful, melodic, approachable. The mood shapes your dynamics, your pacing, your ornament choices. Kafi wants buoyancy." },
        { id: "t_pitfall", heading: "Don't confuse Kafi with Bhairavi", body: "Kafi = flat Ga + flat Ni, else natural. Bhairavi = all flats (Re, Ga, Dha, Ni all komal). Different ragas. Different moods. Listen carefully to distinguish." },
      ],
    },
    audioRefs: [
      { id: "demo_kafi_scale", label: "Kafi scale · ascending and descending" },
      { id: "demo_phrase", label: "Kafi identity phrase · ga Re Sa" },
      { id: "demo_improv", label: "2-bar Kafi improvisation · reference" },
    ],
  },
  harmonium_l4_02_ornament: {
    id: "harmonium_l4_02_ornament",
    title: "Grace notes (kan) · harmonium-style",
    objectives: [
      "Play a kan before Sa, Pa, and sam arrivals",
      "Keep kan crisp — no drag into full note",
      "Apply on a Kafi bhajan phrase",
    ],
    writtenContent:
      "## Kan on harmonium\n\nYou learned kan on bansuri (a brushed adjacent note before the target). On harmonium, the effect is the same but the mechanism differs — you briefly press the adjacent key, then the target.\n\n## The timing\n\nkan = 30-60ms before the main note. Faster than your deliberate timing; muscle memory only. The adjacent key is pressed + released in one quick brush, then the target key presses firmly.\n\n## Where\n\nBefore sam. Before phrase peaks. Before long-held notes that want emphasis. Same rules as bansuri kan.\n\n## Common kan pairs\n\n- Before Sa: kan-Ni (low Ni → Sa). Feels like 'arriving home.'\n- Before Pa: kan-Ma (Ma → Pa). Classical approach.\n- Before sam: usually kan to the downbeat Sa.",
    drills: {
      teach: [
        { id: "t_finger_reflex", heading: "Kan is reflex, not plan", body: "You can't consciously time a 40ms gap. You drill until the hand does it automatically. Repeat kan-Sa 100 times in one sitting. Next day, it's muscle memory." },
        { id: "t_light_kan", heading: "Kan is feather-light", body: "Don't press the kan key as hard as the target. It should barely speak. The listener almost doesn't hear it — just a shadow. Hard kan = two notes = not kan." },
        { id: "t_pitfall", heading: "Don't kan every beat", body: "Overuse dilutes the effect. A good harmonium player kans 3-4 times per 16-bar phrase. Strategic, not decorative." },
      ],
    },
    audioRefs: [
      { id: "demo_kan_isolated", label: "Kan before Sa, Pa, sam · isolated" },
      { id: "demo_kan_phrase", label: "Kafi phrase with kan at peaks" },
    ],
  },
  harmonium_l4_03_rep_1: {
    id: "harmonium_l4_03_rep_1",
    title: "Raga Des bandish · harmonium-led performance",
    objectives: [
      "Learn a 24-bar bandish in Raga Des",
      "Apply bellows dynamics across the 3 sections",
      "Integrate meend (finger slide adjacent keys) on 2 phrases",
    ],
    writtenContent:
      "## Raga Des\n\nEvening/night raga. Komal Ni descending, natural Ni ascending — the raga is *asymmetric*. Playful, romantic, associated with monsoon songs.\n\n## The bandish\n\n24 bars = 1.5 teental cycles + a tihai close. Three sections: sthayi (establishes Des), antara (climbs high), return to sthayi.\n\n## Harmonium meend\n\nOn a keyed instrument, meend is an illusion — rapid alternation between two adjacent keys simulates a slide. It's called 'harmonium meend' or 'kirtan slide.' On Sa → Re, flutter between C and D fast enough that the ear hears a blur.\n\n## Bellows dynamics\n\n- Sthayi: mf (medium, anchoring).\n- Antara: build to f (loud climb).\n- Return: decrescendo to mp.\n\n## Practice stages\n\nWeek 1: melody straight, both hands, 50 bpm.\nWeek 2: add bellows dynamics.\nWeek 3: add harmonium meend on 2 phrases.\nWeek 4: full performance at 70 bpm.",
    drills: {
      teach: [
        { id: "t_asymmetry", heading: "Asymmetric ragas are the challenge", body: "Des uses natural Ni going up and komal Ni coming down. That asymmetry is the raga's personality. Miss it, and it's not Des anymore." },
        { id: "t_meend_blur", heading: "Harmonium meend requires speed", body: "The flutter between adjacent keys must be fast enough that individual notes blur into a single sliding sound. Drill with a metronome — 16th notes at 120 bpm flutter = convincing meend." },
        { id: "t_pitfall", heading: "Don't rush the antara climb", body: "The antara is the emotional peak. If you rush it, the climb feels abrupt. Take your time; let the build feel inevitable." },
      ],
    },
    audioRefs: [
      { id: "demo_sthayi", label: "Sthayi section · 8 bars" },
      { id: "demo_antara", label: "Antara section · 8 bars" },
      { id: "demo_full", label: "Full 24-bar bandish with dynamics" },
    ],
  },
  harmonium_l4_04_practice_rout: {
    id: "harmonium_l4_04_practice_rout",
    title: "Harmonium riyaz block · 15-min structured practice",
    objectives: [
      "Structure: Sa-Pa drone (3) + scale of day (5) + bandish (7)",
      "Record and review every session",
      "Maintain for a week",
    ],
    writtenContent:
      "## The 15-min riyaz, harmonium version\n\nMirrors bansuri's riyaz structure, adapted for harmonium:\n\n**3 min · Sa-Pa drone** — hold Sa-Pa, pump bellows smoothly. Close your eyes. Tune in.\n\n**5 min · Scale of the day** — pick Yaman, Bilawal, Kafi, Des, or Bhairav. Play scale ascending + descending twice. Focus on bellows evenness.\n\n**7 min · Bandish** — pick a piece from L2-L4 repertoire. Play 2-3 times, rotating focus: melody accuracy → bellows dynamics → ornaments (kan + meend).\n\n## Log progress\n\nKeep a notebook. After each session: one line on what was good, one line on what needs work. After a week, patterns emerge.\n\n## The fatigue question\n\nHarmonium requires arm endurance. 15 minutes daily builds it gradually. 2 hours once a week = sore wrist + no progress. Daily > intense.",
    drills: {
      teach: [
        { id: "t_drone_first", heading: "Always start with drone", body: "3 minutes of Sa-Pa before anything else. This tunes your ear, relaxes your body, settles your breath. Skipping it = showing up cold." },
        { id: "t_rotate_scales", heading: "Rotate scales daily", body: "Monday Yaman, Tuesday Bilawal, Wednesday Kafi, Thursday Des, Friday Bhairav. Weekend: bandish deep-work. This rotation builds breadth." },
        { id: "t_pitfall", heading: "Don't practice injured", body: "Harmonium's repetitive pumping motion can cause tendinitis. If your bellows arm aches, rest. Play another instrument, walk away, come back fresh tomorrow." },
      ],
    },
    audioRefs: [
      { id: "drone_15min", label: "Sa-Pa drone · 15 min continuous" },
      { id: "demo_routine", label: "Full 15-min riyaz · reference" },
    ],
  },

  // ═══ MRIDANGAM · L2 (scale shipped or TBD) ═══
  mridangam_l2_01_scale: {
    id: "mridangam_l2_01_scale",
    title: "Mridangam solkattu · syllable recitation basics",
    objectives: [
      "Recite the 5-syllable solkattu: Ta Ka Di Mi (4 syllables + rest)",
      "Synchronize recitation with hand strokes",
      "Maintain steady tempo at 80 bpm for 16 bars",
    ],
    writtenContent:
      "## Solkattu · Carnatic percussion language\n\nBefore you hit the mridangam, you *speak* what you'll play. Every stroke has a syllable: Ta, Ka, Di, Mi, Thom, Nam, etc. This language is called solkattu.\n\n## Why speak first?\n\n- It teaches rhythm independently of technique.\n- You can rehearse anywhere (commute, shower, bed).\n- When you play, the mouth and hand stay in sync — the brain already knows the pattern.\n\n## The basic 4-syllable cell\n\n**Ta Ka Di Mi** = 4 strokes.\n- Ta: right hand, open stroke on the treble head\n- Ka: left hand, closed stroke on the bass head\n- Di: right hand, rim tone\n- Mi: right hand, damped stroke\n\n## Recite + play\n\nRecite Ta Ka Di Mi for 2 bars. Then play Ta Ka Di Mi for 2 bars. Repeat. Eventually combine — speak while you play. That's real solkattu training.",
    drills: {
      teach: [
        { id: "t_language", heading: "Speak it, don't just think it", body: "Silent rhythm is weaker than spoken rhythm. Open your mouth. The tongue's muscle memory helps the hand's muscle memory. Both reinforce each other." },
        { id: "t_slow", heading: "Start at walking pace", body: "40-50 bpm initially. Once the syllables flow without effort, ramp to 80 bpm. Most beginners try 80 immediately and fail. Solkattu rewards patience." },
        { id: "t_pitfall", heading: "Don't slur the syllables", body: "Each syllable must be distinct. 'Takadimi' slurred is one sound. 'Ta.Ka.Di.Mi' clearly separated is four. Crispness in the mouth produces crispness in the hand." },
      ],
    },
    audioRefs: [
      { id: "solkattu_slow", label: "Ta Ka Di Mi recitation · 60 bpm" },
      { id: "solkattu_target", label: "Same · 80 bpm with mridangam strokes" },
    ],
  },
  mridangam_l2_02_two_note: {
    id: "mridangam_l2_02_two_note",
    title: "Tha-Dhin · two-stroke alternation",
    objectives: [
      "Alternate Tha (right open) and Dhin (left bass) cleanly",
      "Match volume between right and left strokes",
      "Sustain for 32 bars at 80 bpm",
    ],
    writtenContent:
      "## Tha-Dhin · the foundational alternation\n\nMost rhythmic patterns are built from alternations: left-right-left-right, strong-weak-strong-weak. Tha-Dhin is the mridangam's version.\n\n## The strokes\n\n- **Tha**: right hand, open stroke on treble (valanthalai). Ringing, higher-pitched.\n- **Dhin**: left hand, open bass stroke (thoppi). Deep, sustained, low.\n\n## Volume matching\n\nBeginners' right hand is usually stronger (dominant hand). So Tha booms; Dhin whispers. Drill the reverse: play Dhin a hair louder at first to compensate, until both hands are matched.\n\n## 32 bars\n\nOne bar = 4 beats (Tha-Dhin-Tha-Dhin). 32 bars = 128 strokes. That's where stamina + steadiness matter. Beginners fall apart at bar 20.",
    drills: {
      teach: [
        { id: "t_weight_shift", heading: "Shift weight between hands", body: "Sit with mridangam balanced in your lap. Each Tha shifts weight slightly right; each Dhin slightly left. This subtle motion connects your hands through your torso." },
        { id: "t_tone_target", heading: "Each hand has a tone target", body: "Tha should ring. Dhin should boom. If Tha is dead (not ringing) or Dhin is splatty (not booming), adjust hand position — closer to rim or closer to center." },
        { id: "t_pitfall", heading: "Don't grip the shell", body: "Mridangam rests in the lap; hands float above, not pressing into the shell. Tension in the forearms = uneven strokes. Loose shoulders = clean tone." },
      ],
    },
    audioRefs: [
      { id: "demo_isolated", label: "Tha alone · Dhin alone · tonal reference" },
      { id: "demo_alternation", label: "Tha-Dhin alternation · 80 bpm · 32 bars" },
    ],
  },
  mridangam_l2_03_tempo: {
    id: "mridangam_l2_03_tempo",
    title: "Adi tala · 8-beat cycle at 80 bpm",
    objectives: [
      "Play Ta Ka Di Mi Ta Ka Ta Ka (adi tala, 8 beats) for 16 cycles",
      "Land hard on beat 1 (tham) each cycle",
      "Lock to a metronome at 80 bpm",
    ],
    writtenContent:
      "## Adi tala\n\n8 beats per cycle. The most common Carnatic tala. Structure: 4 + 2 + 2 (a 4-beat laghu + two 2-beat drutam).\n\n## The pattern\n\n| Beat | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|---|---|\n| Syllable | Ta | Ka | Di | Mi | Ta | Ka | Ta | Ka |\n\n## Beat 1 emphasis\n\nBeat 1 of each cycle = tham. Hit it harder. The whole ensemble listens for your tham — it's where the melody realigns, the audience nods, the groove renews.\n\n## Lock tight\n\n16 cycles = 128 beats at 80 bpm = 96 seconds. That's a long time to hold tempo. Use a metronome. Adjust mentally when you drift. Note where the drift typically happens (beat 5? beat 8?). That's your weak point.",
    drills: {
      teach: [
        { id: "t_tham", heading: "Tham = anchor", body: "The ensemble orbits around your tham. If tham is weak or late, the piece destabilizes. Give tham 110% intensity, even if other beats are 85%." },
        { id: "t_clap", heading: "Clap the tala first", body: "Set down the mridangam. Clap: beat 1 (hand down), 2 (finger count), 3 (finger count), 4 (finger count) / 5 (hand down) / 6 (hand up) / 7 (hand down) / 8 (hand up). Internalize the structure before playing it." },
        { id: "t_pitfall", heading: "Don't accent beats 5 and 7", body: "Beats 5 and 7 also get hand-claps in tala gestures, but on the mridangam they should remain even with 2, 4, 6, 8. Only beat 1 gets the big emphasis." },
      ],
    },
    audioRefs: [
      { id: "demo_adi", label: "Adi tala · 80 bpm · 16 cycles" },
      { id: "metronome", label: "Metronome only · 80 bpm" },
    ],
  },
  mridangam_l2_04_first_piece: {
    id: "mridangam_l2_04_first_piece",
    title: "Korvai · a simple closing phrase in adi tala",
    objectives: [
      "Play a 4-beat korvai (rhythmic closure phrase) thrice",
      "Land the final tham exactly on beat 1 of next cycle",
      "Maintain tempo + accuracy through the sequence",
    ],
    writtenContent:
      "## Korvai · the rhythmic signature\n\nA korvai is a composed rhythmic phrase that ends a section. It's played three times (tihai), and the final stroke lands exactly on sam (beat 1). Mathematically designed to resolve.\n\n## Simple korvai\n\nTa Ka Di Mi Ta (5 strokes) × 3 = 15 strokes. Added to a 1-beat pause = 16 strokes = 2 adi tala cycles. Land the final Ta on beat 1 of cycle 3.\n\n## Why korvais matter\n\nEvery Carnatic percussion piece closes with a korvai. It's the exclamation point. Learning to *feel* when the 3-fold repetition will arrive on sam is the core rhythmic skill.\n\n## Practice path\n\n1. Recite the korvai aloud (solkattu).\n2. Clap the tala while reciting.\n3. Play it on the mridangam with no backing.\n4. Play it with a metronome.\n5. Record. Verify the final Ta lands on beat 1 exactly.",
    drills: {
      teach: [
        { id: "t_math", heading: "Korvai math is sacred", body: "The stroke count + pause count must exactly equal a multiple of the tala's beats. Off by one = the korvai doesn't resolve. Count the arithmetic; don't guess." },
        { id: "t_tihai", heading: "Three is the magic number", body: "Korvais are always played 3 times. Not 2, not 4 — 3. This comes from Hindu tradition (Trimurti). Accept it; feel it. The 3rd repetition is the resolution." },
        { id: "t_pitfall", heading: "Don't rush the final Ta", body: "As you approach the end, excitement makes you rush. The final Ta must hit *exactly* on sam, not before. Practice landing deliberately, almost late-feeling." },
      ],
    },
    audioRefs: [
      { id: "solkattu_korvai", label: "Korvai recitation · solkattu only" },
      { id: "demo_korvai_slow", label: "Korvai played · 60 bpm" },
      { id: "demo_korvai_target", label: "Korvai · 80 bpm with tala gestures" },
    ],
  },

  // ═══ MRIDANGAM · L3 ═══
  mridangam_l3_01_first_song: {
    id: "mridangam_l3_01_first_song",
    title: "Accompanying a simple Carnatic kriti",
    objectives: [
      "Play a thani avartanam (percussion solo cell) between sections",
      "Return seamlessly to the kriti's tempo",
      "Support the vocalist with clean adi tala throughout",
    ],
    writtenContent:
      "## Kriti · the Carnatic song form\n\nA kriti has 3 sections: pallavi (theme), anupallavi (development), charanam (close). The mridangam supports melody throughout + gets a solo (thani) between sections.\n\n## Your role\n\n80% of the time: steady adi tala underneath the vocalist. Soft dynamics; stay in the pocket.\n\n20%: thani avartanam. You get 2 cycles to show off — korvai, rhythmic flourish, cascading patterns.\n\n## The handoff\n\nBefore the vocalist's verse ends, they signal (often with a held note). You step up on cue. After 2 cycles, resolve on sam — vocalist picks up exactly where you left.\n\n## What's hard\n\n- Knowing when to play *loudly* vs *supportively*.\n- Returning to the original tempo after your solo.\n- Holding sam alignment when the vocalist takes liberties.\n\n## The practice mindset\n\nAccompaniment is not subordinate. The mridangam is an equal partner. Practice listening as much as playing.",
    drills: {
      teach: [
        { id: "t_listen", heading: "Listen more than you play", body: "Great percussionists spend 60% of their mental bandwidth listening to the melodic line. Your job is to serve the music, not fill space." },
        { id: "t_ego", heading: "Thani is disciplined, not showy", body: "Beginners treat the thani as 'finally my moment!' and over-play. Restrained, clean korvais land stronger than flashy scramble. Hold back." },
        { id: "t_pitfall", heading: "Don't lose tempo on return", body: "After the thani, the vocalist expects the original tempo. If you came in at 85 bpm and sped up to 95 during the solo, you'll pull the vocalist. Control the return." },
      ],
    },
    audioRefs: [
      { id: "demo_accompany", label: "Mridangam accompanying kriti · soft adi tala" },
      { id: "demo_thani", label: "Thani avartanam · 2 cycles" },
      { id: "demo_full", label: "Full kriti section with thani + return" },
    ],
  },
  mridangam_l3_02_dynamics: {
    id: "mridangam_l3_02_dynamics",
    title: "Soft, medium, loud · strike intensity control",
    objectives: [
      "Play Ta at pp, mf, and ff — distinct volumes, same tone",
      "Arc across 8 bars from pp to ff and back",
      "Apply to a supporting role behind a melody",
    ],
    writtenContent:
      "## Mridangam dynamics\n\nUnlike harmonium (bellows pressure) or bansuri (breath), mridangam dynamics come from strike force + hand shape. A soft Ta uses only fingertips; a loud Ta uses the full palm.\n\n## The three levels\n\n- **pp**: fingertips only, from the wrist. Quiet, crisp, almost whispered.\n- **mf**: half-palm strike, from the forearm. Solid, neutral, everyday volume.\n- **ff**: full-hand strike, from the shoulder. Loud, resonant, climactic.\n\n## Tone consistency\n\nThe challenge: as you change volume, the *tone* must stay consistent. A pp Ta should ring like an ff Ta, just quieter. If your pp is dead and your ff is splatty, you're compromising tone for volume.\n\n## Arc exercise\n\nPlay Ta for 8 bars: 2 bars pp → 2 bars mp → 2 bars mf → 2 bars ff. Then reverse. 16-bar dynamic journey. Record + critique.",
    drills: {
      teach: [
        { id: "t_source", heading: "Each volume has a different body source", body: "pp = wrist, mp = forearm, mf = elbow, ff = shoulder. As you crescendo, the engaged muscle group gets bigger. Decrescendo = retract progressively." },
        { id: "t_consistent_tone", heading: "Ring > boom", body: "A pp stroke must still *ring*. If it's dead, you're slapping instead of striking. Keep the fingers relaxed; the hand should rebound, not press in." },
        { id: "t_pitfall", heading: "Don't tense for ff", body: "Students tense their arm to hit loud. Actually, you release *from the shoulder*; the arm is mostly along for the ride. Tense arm = sloppy ff. Relaxed arm = loud + clean." },
      ],
    },
    audioRefs: [
      { id: "demo_pp_mf_ff", label: "Ta at pp, mf, ff · isolated" },
      { id: "demo_arc", label: "8-bar dynamic arc on Ta" },
    ],
  },
  mridangam_l3_03_articulation: {
    id: "mridangam_l3_03_articulation",
    title: "Open vs closed strokes · tonal palette",
    objectives: [
      "Play open Tha (ringing) vs closed Tham (damped)",
      "Use both in a single phrase to create contour",
      "Apply in a 4-bar mridangam pattern",
    ],
    writtenContent:
      "## Open vs closed strokes\n\nEvery percussion instrument has this duality. On mridangam:\n\n- **Open**: strike and lift — the head continues to resonate. Produces a ringing tone.\n- **Closed**: strike and keep the hand on the head — the hand damps the vibration. Produces a short, thudding tone.\n\n## Musical use\n\nAlternating open/closed creates tonal interest within a single pattern. Consider:\n\n- Tha-Tha-Tham-Tha (open-open-closed-open) — flowing with one damped accent.\n- Tham-Tham-Tha-Tha (closed-closed-open-open) — restrained opening, release at the end.\n\n## Technique\n\nOpen: fingers flick off the head after striking. 'Touch and go.'\nClosed: palm lands on the head and stays. 'Touch and press.'\n\n## The drill\n\nPlay 16 strokes of Tha (all open). Then 16 of Tham (all closed). Then alternate. Your hand must feel the difference in release intuitively — no thinking.",
    drills: {
      teach: [
        { id: "t_release", heading: "Release makes the stroke", body: "Open and closed differ only in what happens *after* the strike. The strike itself is identical. Train the release as a separate motor skill." },
        { id: "t_listen", heading: "Close your eyes and listen", body: "Can you tell open from closed by ear alone? If not, your open isn't ringing enough, or your closed isn't damped enough. The contrast must be audible from across a room." },
        { id: "t_pitfall", heading: "Don't over-press closed", body: "Beginners press too hard on closed, creating pain + no tone. Just touch and *rest* the hand. Gravity does most of the damping." },
      ],
    },
    audioRefs: [
      { id: "demo_open_closed", label: "Tha (open) vs Tham (closed) · isolated" },
      { id: "demo_pattern", label: "4-bar pattern mixing open + closed" },
    ],
  },
  mridangam_l3_04_standard_cert: {
    id: "mridangam_l3_04_standard_cert",
    title: "Standard Certificate · 2-min adi tala performance",
    objectives: [
      "Perform a 2-minute adi tala piece with at least one korvai",
      "Include open + closed stroke contrast",
      "Land all sam arrivals cleanly",
    ],
    writtenContent:
      "## The cert\n\n2 minutes in adi tala. Any level of complexity you feel confident with, but must include:\n\n1. A 16-cycle steady groove (80 bpm).\n2. At least one korvai with tihai resolution on sam.\n3. At least one dynamic arc (soft to loud or vice versa).\n4. At least one passage mixing open + closed strokes.\n\n## What's graded\n\n- **Tempo stability**: does 80 bpm hold throughout?\n- **Sam alignment**: do korvais land?\n- **Tone consistency**: are your open strokes ringing + closed strokes damped, throughout?\n- **Musical intent**: does it sound like a *piece*, or like a list of exercises?\n\n## The last point is subtle\n\nA performance strings together the techniques into a narrative. Start simple, develop, peak at a korvai, resolve. Don't present as a textbook index.",
    drills: {
      teach: [
        { id: "t_narrative", heading: "Your 2 min is a story", body: "Intro (steady groove, mp) → development (variations, mf) → climax (korvai, ff) → resolution (return to steady, mp). This arc makes 2 minutes feel like a piece." },
        { id: "t_rehearse", heading: "Rehearse 5 takes before recording", body: "First take will be nervous. Fifth take will be rote. Record takes 3-4 when your hands know it but your spirit is still fresh." },
        { id: "t_pitfall", heading: "Don't rush sam", body: "Nerves = rushing. Your pre-sam beats will accelerate unconsciously. Practice deliberately leaning slightly *behind* the click. You'll land on sam more cleanly." },
      ],
    },
    audioRefs: [
      { id: "demo_reference", label: "2-min adi tala performance · reference" },
      { id: "metronome_80", label: "Metronome · 80 bpm" },
    ],
  },

  // ═══ MRIDANGAM · L4 ═══
  mridangam_l4_01_scale_two: {
    id: "mridangam_l4_01_scale_two",
    title: "Rupaka tala · 6-beat cycle · odd-feel rhythm",
    objectives: [
      "Play a 6-beat rupaka cycle at 80 bpm",
      "Recognize the 'odd feel' of 6-beat compared to 4-beat",
      "Sustain 16 cycles without losing time",
    ],
    writtenContent:
      "## Rupaka tala\n\n6 beats per cycle. Unusual in Western ears (we think in 4s). Carnatic musicians love odd talas — they force the listener to engage more actively.\n\n## Structure\n\nRupaka = 1 + 2 + 3 — but played as 3 + 3 (two 3-beat groups). Or as 2 + 2 + 2. Different gurus emphasize different internal groupings.\n\n## Simple pattern\n\nTa Ka Di | Ta Ka Di (6 beats, repeated). Or Tha Dhin Thom | Tha Dhin Thom (mixed strokes).\n\n## The feel\n\n6 beats feels 'shorter' than 8, faster to resolve. Your body starts wanting beat 1 again early. Resist. Honor the full 6 before resolving.\n\n## Common mistake\n\nAlmost every student drifts rupaka back into 8-beat by adding two extra strokes. The metronome catches this. 80 bpm click, 6-beat pattern, 16 cycles. Record, verify.",
    drills: {
      teach: [
        { id: "t_count", heading: "Count 1-2-3-1-2-3", body: "Your foot taps beat 1. Your body internalizes the 3+3 or 2+2+2 structure. Speak the numbers aloud while playing until the body owns the cycle." },
        { id: "t_odd_joy", heading: "Odd talas create tension + release", body: "The 'odd feel' isn't a bug; it's the feature. Every cycle completes just when you'd expect 2 more beats. That constant unresolution is what makes Carnatic rhythm feel *vital*." },
        { id: "t_pitfall", heading: "Don't revert to 8-beat", body: "The brain wants 4+4. It will insert extra strokes. Metronome + counting aloud are your disciplines. If you fall out, stop, re-establish, continue." },
      ],
    },
    audioRefs: [
      { id: "demo_rupaka_slow", label: "Rupaka tala · 60 bpm · 4 cycles" },
      { id: "demo_rupaka_target", label: "Rupaka · 80 bpm · 16 cycles" },
    ],
  },
  mridangam_l4_02_ornament: {
    id: "mridangam_l4_02_ornament",
    title: "Chapu stroke · heavy accented downbeat",
    objectives: [
      "Execute a chapu (double-hand accented stroke) cleanly",
      "Place chapu on beat 1 of each cycle for 8 cycles",
      "Maintain tone quality — chapu should boom, not slap",
    ],
    writtenContent:
      "## Chapu · the big hit\n\nChapu is a strong stroke where both hands strike simultaneously, producing a low + high fused tone. It's the mridangam's 'thunder' — reserved for sam emphasis, climactic moments, or tihai resolutions.\n\n## Technique\n\nRight hand strikes the treble head as usual (Tha). Left hand simultaneously strikes the bass head (Dhin). Hands land *together*, not sequential. The two tones fuse into one big sound.\n\n## Where to use\n\nOnly on beat 1 of major cycle boundaries. Not every beat 1 — just the ones that matter structurally. A 16-cycle piece might have chapu on cycles 1, 8, and 16 (start, midpoint, end).\n\n## The challenge\n\nExact simultaneity. If your hands are off by even 30ms, you hear two strokes instead of one. Drill slowly — 40 bpm, perfect simultaneity, then ramp up.",
    drills: {
      teach: [
        { id: "t_together", heading: "Hands land together, not cascade", body: "The two hands must arrive at the same instant. Drop both from equal heights; gravity should deliver them simultaneously. If you can hear 'Ta... Dhin', you failed; you want 'TaDhin' as one event." },
        { id: "t_full_body", heading: "Chapu uses the whole body", body: "For a big chapu, you slightly lift your torso + shoulders + arms, then drop. The drop energy transfers through the hands into the drum. A wrist-only chapu is weak." },
        { id: "t_pitfall", heading: "Don't chapu too often", body: "Overused, chapu loses its weight. Imagine a movie with explosions every 30 seconds — numb. Place chapu strategically. 2-3 per piece is plenty." },
      ],
    },
    audioRefs: [
      { id: "demo_chapu_slow", label: "Chapu at 40 bpm · 4 strikes" },
      { id: "demo_chapu_in_cycle", label: "Chapu on sam · 8-cycle sequence" },
    ],
  },
  mridangam_l4_03_rep_1: {
    id: "mridangam_l4_03_rep_1",
    title: "Misra chapu korvai · advanced closure",
    objectives: [
      "Play a 7-beat misra chapu korvai with 3-fold tihai",
      "Land the final stroke on sam exactly",
      "Include at least one chapu stroke within the korvai",
    ],
    writtenContent:
      "## Misra chapu tala\n\n7 beats per cycle. Structure: 3 + 2 + 2 (or 3 + 4). Odd-feeling, often used in thematic sections of Carnatic music.\n\n## The korvai\n\nWe'll play a korvai in misra chapu that uses 7 strokes per repetition × 3 repetitions = 21 strokes. Plus a 0-beat pause = 21 = 3 cycles of misra chapu (7 × 3).\n\n## Chapu inside\n\nThe korvai's 4th stroke is a chapu — the emphasized midpoint. Hearing this chapu is your cue that you're halfway through the korvai.\n\n## Complexity step\n\nL2 korvais were simple tihai in adi tala. This is the same principle but in odd tala + with chapu inside. The math gets trickier; so does the feel.\n\n## Practice path\n\n1. Recite the korvai (solkattu).\n2. Clap the tala + recite simultaneously.\n3. Play on mridangam with a metronome at 60 bpm.\n4. Add chapu cleanly.\n5. Bring to 80 bpm.\n6. Record, verify final stroke on sam.",
    drills: {
      teach: [
        { id: "t_math_7", heading: "7 doesn't divide into 4", body: "Your 4-beat-trained brain will hiccup at 7. That's normal. Write out the beat count explicitly: '1-2-3 | 4-5 | 6-7 | 1-2-3 | 4-5 | 6-7...' on paper. Count aloud until your body adjusts." },
        { id: "t_chapu_place", heading: "Chapu placement is deliberate", body: "The chapu is exactly at the 4th stroke of each 7-stroke korvai repetition. Not the 3rd, not the 5th. Precision matters — the korvai's architecture depends on it." },
        { id: "t_pitfall", heading: "Don't shortcut the 3-fold count", body: "At the end, you want to be done; you'll rush the third repetition. Deliberate. Slower on the final pass if anything. The landing on sam matters most; everything before is preparation." },
      ],
    },
    audioRefs: [
      { id: "solkattu_korvai", label: "Misra chapu korvai · solkattu recitation" },
      { id: "demo_korvai_slow", label: "Played · 60 bpm" },
      { id: "demo_korvai_target", label: "Played · 80 bpm · with chapu" },
    ],
  },
  mridangam_l4_04_practice_rout: {
    id: "mridangam_l4_04_practice_rout",
    title: "Mridangam riyaz · 15 minutes structured",
    objectives: [
      "Structure: solkattu (3) + stroke drills (5) + korvai (7)",
      "Record + review each session",
      "Maintain for a week",
    ],
    writtenContent:
      "## The 15-min mridangam block\n\n**3 min · Solkattu** — recite and clap. No drum. Just voice + hand. Warm up the rhythmic mouth.\n\n**5 min · Stroke drills** — Ta Ka Di Mi at 80 bpm, 16 bars. Then Tha-Dhin, 16 bars. Then open-closed alternation.\n\n**7 min · Korvai** — pick a korvai from L2-L4 repertoire. Play 3 times, each rotation on a focus: tempo, tonal contrast, sam accuracy.\n\n## Stretch before playing\n\nWrists, forearms, shoulders. Mridangam is physical; cold hands = sloppy tone + injury risk. 60 seconds of wrist circles before each session.\n\n## Record and compare\n\nAfter a week, listen to day 1 vs day 7. Progress appears: tighter sam, cleaner open/closed contrast, steadier tempo. Quantify what you hear — 'sam was 50ms late on day 1, 10ms late on day 7.'\n\n## Daily cadence\n\nDaily 15 min > weekly 2 hr. Mridangam's motor skills compound with repetition; a weekly session wastes 80% of the benefit.",
    drills: {
      teach: [
        { id: "t_warmup_body", heading: "Stretch before you drum", body: "Drumming cold is how you get tendinitis. Wrist circles, forearm shakes, shoulder rolls. 60 seconds. Non-negotiable." },
        { id: "t_voice_first", heading: "Always start with solkattu", body: "Voice tunes the brain to rhythm. Drum tunes the body to rhythm. Voice first sets the mental framework; drum follows. Skipping solkattu = dis-coordinated practice." },
        { id: "t_pitfall", heading: "Don't force through pain", body: "If your forearm aches mid-session, stop. Push through = damage. Come back tomorrow. Slow injury kills progress faster than a missed session." },
      ],
    },
    audioRefs: [
      { id: "solkattu_routine", label: "3-min solkattu warmup · reference" },
      { id: "demo_routine", label: "Full 15-min riyaz · reference" },
    ],
  },

  // ═══ VEENA · L2 (scale shipped or TBD) ═══
  veena_l2_01_scale: {
    id: "veena_l2_01_scale",
    title: "Veena · Carnatic major scale, Shankarabharanam",
    objectives: [
      "Play Shankarabharanam ascending + descending across one octave",
      "Use the correct left-hand finger technique for gamakas",
      "Pluck with alternating right-hand fingers (index-middle)",
    ],
    writtenContent:
      "## Shankarabharanam · Carnatic's C major\n\nThe Carnatic equivalent of Western major. All natural notes. The base scale every Carnatic student learns first.\n\n## Scale\n\nSa Ri Ga Ma Pa Dha Ni Sa (C D E F G A B C) ascending, then descending.\n\n## Left hand: the gamak hand\n\nOn veena, left hand does more than fret — it *oscillates* each note. Even a simple scale has subtle gamakas on every note. Beginners often play veena like a guitar (clean, pitched notes) — but that's not veena. Each note must breathe with micro-oscillation.\n\n## Right hand: plucking\n\nIndex finger plucks on the beat; middle finger plucks on the offbeat. Alternating produces an even stream. A single-finger pluck is slower, choppier, beginner-sounding.\n\n## This lesson focuses on\n\n1. The correct note sequence.\n2. Alternating right-hand plucks.\n3. Introducing left-hand oscillation on the sustained notes.",
    drills: {
      teach: [
        { id: "t_oscillate", heading: "Every note breathes", body: "As soon as your finger presses a fret, slightly roll it side-to-side. Tiny — 3-5mm travel. This creates the gamaka. A note without oscillation sounds naked on veena." },
        { id: "t_alternate", heading: "Two-finger pluck is non-negotiable", body: "Even at 40 bpm, alternate. If you single-pluck during L2, you'll build a habit that holds you back for years. Alternate from day one, even if it's awkward." },
        { id: "t_pitfall", heading: "Don't pluck too hard", body: "Veena strings respond to subtle touch. Heavy plucking = boomy + distorted tone. Light, deliberate plucks = clear, resonant tone." },
      ],
    },
    audioRefs: [
      { id: "demo_scale_slow", label: "Shankarabharanam · 40 bpm, no gamaka" },
      { id: "demo_scale_gamaka", label: "Same · 60 bpm with gamakas" },
    ],
  },
  veena_l2_02_two_note: {
    id: "veena_l2_02_two_note",
    title: "Sa-Pa drone interaction · thalam string basics",
    objectives: [
      "Play Sa-Pa on the melody strings",
      "Simultaneously maintain thalam (timekeeping) strings",
      "Hold the drone underneath while Sa-Pa alternate",
    ],
    writtenContent:
      "## Veena has four sets of strings\n\n- 4 melody strings (main strings) — where melody happens\n- 3 thalam strings — tuned to tonic + fifth, plucked as drone/timekeepers\n\n## This lesson\n\nRight-hand index + middle fingers pluck melody strings. Right-hand ring finger (or thumb, depending on tradition) strums the thalam strings in rhythm.\n\n## Coordination\n\nYour fingers must do three different things simultaneously:\n1. Index + middle alternate on melody.\n2. Ring finger strums thalam at specific beats.\n3. Left hand frets + oscillates each melody note.\n\n## The drill\n\nPlay Sa-Pa alternating at 60 bpm. Thalam plucks on every 4th beat. Maintain for 16 bars.",
    drills: {
      teach: [
        { id: "t_right_hand_map", heading: "The right hand is a map", body: "Each right-hand finger has an assigned role — index = odd melody, middle = even melody, ring = thalam drone. Memorize the map. Don't let fingers wander into each other's territory." },
        { id: "t_thalam_role", heading: "Thalam is the timekeeper", body: "Think of thalam plucks as an internal metronome. They lock tempo even when melody gets complex. A veena without thalam is rudderless." },
        { id: "t_pitfall", heading: "Don't neglect thalam", body: "Beginners focus on melody strings and under-pluck thalam. Result: thalam fades, tempo drifts. Give thalam 50% of your attention. It's not ambient — it's structural." },
      ],
    },
    audioRefs: [
      { id: "demo_melody_alone", label: "Sa-Pa melody · no thalam" },
      { id: "demo_combined", label: "Melody + thalam · 60 bpm · 16 bars" },
    ],
  },
  veena_l2_03_tempo: {
    id: "veena_l2_03_tempo",
    title: "Adi tala on veena · 8-beat cycle lock",
    objectives: [
      "Play a Shankarabharanam scale across 2 adi tala cycles",
      "Thalam strums on beats 1, 5, 7 of each cycle",
      "Maintain 70 bpm throughout",
    ],
    writtenContent:
      "## Veena in Carnatic tala\n\nCarnatic melody instruments must align to tala at all times. Veena is no exception — your melody strings ascend/descend the scale while thalam strings mark tala beats.\n\n## Adi tala\n\n8 beats, split 4 + 2 + 2. Thalam hits on beat 1 (strong), beat 5 (medium), beat 7 (medium). That's 3 thalam plucks per cycle.\n\n## The pattern\n\nScale ascending (8 notes) fits into 1 cycle at a note-per-beat rate. Descending scale = second cycle.\n\n## What's hard\n\nThe simultaneous demands: left hand frets + oscillates, right-hand index/middle alternates melody, right-hand ring plucks thalam at specific beats. Three-layer coordination.\n\n## Tip\n\nClap the tala gestures first (without veena). Get beat 1 / 5 / 7 into your body. Then add veena.",
    drills: {
      teach: [
        { id: "t_clap_first", heading: "Always clap before you play", body: "Tala lives in your body. Clap the full 8-beat pattern 5 times before picking up the veena. Once your body knows it, your hands follow." },
        { id: "t_layer", heading: "Layer in, don't start combined", body: "First: melody alone (right index/middle). Second: add thalam (right ring) without melody. Third: combine. Fourth: add gamaka. One layer at a time; stack when ready." },
        { id: "t_pitfall", heading: "Don't drift tempo on the descent", body: "Ascending is harder (unfamiliar fingering). Descending feels easier and you'll speed up. Use the metronome strictly. Descent tempo must match ascent." },
      ],
    },
    audioRefs: [
      { id: "tala_claps", label: "Adi tala gestures · clap reference" },
      { id: "demo_slow", label: "Shankarabharanam + thalam · 50 bpm" },
      { id: "demo_target", label: "Same · 70 bpm" },
    ],
  },
  veena_l2_04_first_piece: {
    id: "veena_l2_04_first_piece",
    title: "First varnam · Sarali Varisai (beginner's scale piece)",
    objectives: [
      "Play one section of a Sarali Varisai in Shankarabharanam",
      "Apply oscillation (gamaka) on every note",
      "Complete 2 adi tala cycles",
    ],
    writtenContent:
      "## Varnam · the student's canonical piece\n\nVarnams are composed pieces that drill scale patterns. Sarali Varisai is a varnam explicitly for beginners — patterns like Sa-Ri-Ga-Ma / Ri-Ga-Ma-Pa / Ga-Ma-Pa-Dha (each pattern shifts up by one note).\n\n## What you'll play\n\nThe first 4 patterns: Sa-Ri-Ga-Ma | Ri-Ga-Ma-Pa | Ga-Ma-Pa-Dha | Ma-Pa-Dha-Ni. 16 notes = 2 adi tala cycles.\n\n## Gamakas\n\nEvery single note gets oscillation. This is where veena differs from bansuri or saxophone — the gamaka is ever-present, not occasional.\n\n## The arc\n\n- Pattern 1: play straight, no gamaka (get the notes right).\n- Pattern 2: add light gamaka on the last note.\n- Pattern 3: gamaka on every note.\n- Pattern 4: full gamaka + proper right-hand alternation.\n\n## Then combine\n\nPlay all 4 patterns back-to-back. This *is* the piece. 2 cycles of adi tala. Record.",
    drills: {
      teach: [
        { id: "t_teacher_note", heading: "Sarali Varisai was designed for you", body: "Purandara Dasa (16th century) composed this specifically as a first piece. The shape teaches note relationships. Respect it; don't skip it for something flashier." },
        { id: "t_start_small", heading: "Learn 1 pattern at a time", body: "Trying all 4 patterns on day 1 = 0 patterns solid. Day 1: pattern 1 perfect. Day 2: add pattern 2. Day 3: add pattern 3. Day 4: pattern 4. Day 5: combine all. This layered approach wins." },
        { id: "t_pitfall", heading: "Don't muscle through gamakas", body: "If your left hand tenses to oscillate, you'll fatigue + sound forced. Gamakas come from a relaxed hand rolling the finger. Tension = bad gamaka. Relaxation = musical gamaka." },
      ],
    },
    audioRefs: [
      { id: "demo_pattern_1", label: "Pattern 1 · Sa-Ri-Ga-Ma · with gamakas" },
      { id: "demo_full", label: "All 4 patterns · 2 adi tala cycles" },
      { id: "tala_track", label: "Adi tala backing · 60 bpm" },
    ],
  },

  // ═══ VEENA · L3 ═══
  veena_l3_01_first_song: {
    id: "veena_l3_01_first_song",
    title: "Geetham · short Carnatic composition",
    objectives: [
      "Play a simple geetham like 'Sri Gananatha' in Shankarabharanam",
      "Maintain thalam while melody moves",
      "Complete in 3 adi tala cycles",
    ],
    writtenContent:
      "## Geetham · the student's first 'real' piece\n\nSarali Varisai is pattern drill. Geetham is the next rung — a short *actual composition*, usually in praise of a deity. 'Sri Gananatha' is the classic first geetham.\n\n## What's new\n\nNot just ascending/descending patterns. The melody now has contour — some notes held, some repeated, some sequences varying. You're playing a *song*.\n\n## Structure\n\n3 lines, each 8 beats. Total 24 beats = 3 adi tala cycles.\n\n## Thalam discipline\n\nDuring the melody's contour, thalam still hits beats 1, 5, 7 every cycle. Even when melody goes off on a flourish, thalam stays mechanical. This is the hardest part of Carnatic technique.\n\n## Practice arc\n\nLine 1 alone → line 2 alone → line 3 alone → combine lines 1-2 → combine lines 2-3 → full piece. This progressive combination prevents overload.",
    drills: {
      teach: [
        { id: "t_song_feel", heading: "Geetham is emotion, not exercise", body: "Sarali Varisai was mechanical. Geetham is musical. Inject intent: 'Sri Gananatha' is a prayer to Ganesha. Play it reverently. Dynamics are subtle but present." },
        { id: "t_thalam_discipline", heading: "Thalam never misses", body: "The moment melody gets interesting, beginners forget thalam. That's the make-or-break. A dropped thalam beat = tempo drift = wasted practice. Treat thalam as sacred." },
        { id: "t_pitfall", heading: "Don't stop mid-piece to 'fix' a note", body: "If you hit a wrong note, keep going. Fix it on the next repetition. Stopping breaks thalam + tempo + the whole tala structure. Play through errors." },
      ],
    },
    audioRefs: [
      { id: "demo_line_1", label: "Line 1 · Sri Gananatha · 60 bpm" },
      { id: "demo_full", label: "Full geetham · 3 cycles" },
      { id: "tala_track", label: "Adi tala · 60 bpm backing" },
    ],
  },
  veena_l3_02_dynamics: {
    id: "veena_l3_02_dynamics",
    title: "Veena plucking dynamics · soft to loud",
    objectives: [
      "Pluck at pp, mf, ff — distinct volumes, same tone",
      "Arc a 4-bar phrase from pp to ff and back",
      "Maintain oscillation (gamaka) at all dynamic levels",
    ],
    writtenContent:
      "## Veena dynamics come from pluck force\n\nUnlike harmonium (bellows) or mridangam (hand velocity), veena dynamics are purely in the right hand's pluck. Harder pluck = louder + more percussive attack. Softer pluck = quieter + rounder attack.\n\n## Pluck depth\n\n- pp: fingernail just grazes string. Ghost-pluck.\n- mp: normal finger pluck.\n- mf: fingertip drives harder into string.\n- ff: full finger joint swings + releases.\n\n## The gamaka challenge\n\nAt pp, will your oscillation survive? Or will the string's vibration be too weak to audibly oscillate? Answer: yes, it survives — if your oscillation is large enough. pp dynamics require *bigger* left-hand oscillations to compensate for smaller right-hand energy.\n\n## Arc drill\n\nPlay 4 bars of Sa, Ri, Ga, Ma (4 notes). Start pp, grow to ff by the 3rd note, decrescendo to pp by the 4th. Loop 4 times.",
    drills: {
      teach: [
        { id: "t_fingernail", heading: "Fingernail shape is a variable", body: "Long nails give harder attack; short nails give rounder tone. Decide your nail length and stick with it — a given dynamic feels different with different nail lengths." },
        { id: "t_bigger_osc_soft", heading: "Soft pluck = bigger oscillation", body: "Counter-intuitive: pp phrases need bigger gamaka amplitude, not smaller. Because the note's energy is less, you must oscillate more to keep the gamaka audible." },
        { id: "t_pitfall", heading: "Don't tense for ff", body: "Loud doesn't mean tense. The pluck is a release — the string pushes your finger off. Tense fingers = dull tone. Relaxed finger + aggressive motion = loud + ringing." },
      ],
    },
    audioRefs: [
      { id: "demo_levels", label: "Sa at pp, mf, ff · isolated" },
      { id: "demo_arc", label: "4-bar dynamic arc with gamakas" },
    ],
  },
  veena_l3_03_articulation: {
    id: "veena_l3_03_articulation",
    title: "Jaaru · sliding between notes",
    objectives: [
      "Execute a jaaru (slide) between Sa and Pa",
      "Control the speed of the slide (fast vs slow)",
      "Apply in a musical phrase",
    ],
    writtenContent:
      "## Jaaru · the veena meend\n\nJaaru is the veena's slide — left-hand finger drags along the string from one pitch to another, producing a continuous pitch change. The veena's long fretboard + movable frets make this especially expressive.\n\n## Two jaaru types\n\n- **Ascending jaaru**: slide up (e.g., Sa to Ga).\n- **Descending jaaru**: slide down (e.g., Pa to Ga).\n\n## Speed\n\n- Slow jaaru (1-2 sec) = meditative, often in alap or slow passages.\n- Fast jaaru (<0.5 sec) = energetic, in quick melodic runs.\n\n## Technique\n\nPress the string firmly. Pluck. Slide the finger (don't lift) to the destination fret. Continuous pressure throughout = clean slide. Pressure break mid-slide = sudden drop in volume.\n\n## The drill\n\n1. Play Sa cleanly.\n2. Slide to Pa (5th) over 2 seconds.\n3. Play Pa cleanly.\n4. Slide back to Sa over 2 seconds.\n5. Repeat, gradually speeding up to 1-sec slides.",
    drills: {
      teach: [
        { id: "t_pressure", heading: "Pressure is constant", body: "The slide fails if pressure wavers. Finger must stay pressed with the same force the entire journey. Practice on a single note while sliding — the volume should not dip." },
        { id: "t_fret", heading: "Target the destination fret", body: "Don't slide 'approximately.' Know exactly where your finger must land. Aim at the destination fret's centerline. Slides that end off-pitch are amateur." },
        { id: "t_pitfall", heading: "Don't jaaru every movement", body: "A piece full of jaarus loses impact. Use jaarus sparingly — 2-3 per 8-bar phrase — and make each one count." },
      ],
    },
    audioRefs: [
      { id: "demo_slow_jaaru", label: "Sa to Pa slow jaaru · 2 sec" },
      { id: "demo_fast_jaaru", label: "Sa to Pa fast jaaru · 0.5 sec" },
      { id: "demo_phrase", label: "4-bar phrase with 2 jaarus" },
    ],
  },
  veena_l3_04_standard_cert: {
    id: "veena_l3_04_standard_cert",
    title: "Standard Certificate · 2-minute geetham performance",
    objectives: [
      "Perform a 2-minute Carnatic geetham with thalam",
      "Include gamaka on every note + 1-2 jaarus",
      "Maintain tempo + tala alignment throughout",
    ],
    writtenContent:
      "## The cert\n\n2 minutes of geetham — either 'Sri Gananatha' or 'Kundagowra' are acceptable. In Shankarabharanam. Adi tala at 70 bpm.\n\n## What's graded\n\n1. **Melody accuracy**: right notes, right duration.\n2. **Tala alignment**: thalam steady; beat 1/5/7 clean every cycle.\n3. **Gamaka presence**: oscillation audible on every sustained note.\n4. **Jaarus**: at least one used musically (not mechanically).\n5. **Overall feel**: does it sound Carnatic, or like generic Asian music?\n\n## The last point matters\n\nA technically correct but gamaka-less performance fails — it's not veena style. Judges listen first for *authenticity of idiom*. Get the gamaka right, even if other aspects are weaker.\n\n## Preparation\n\nOne week of daily 20-min sessions on the same piece. Record every session. Listen back. Note improvements. By day 7, muscle memory is solid; nerves are minimized.",
    drills: {
      teach: [
        { id: "t_gamaka_first", heading: "Gamaka is the pass/fail line", body: "Everything else is secondary. A veena without gamaka is a guitar. Make every sustained note breathe with oscillation. Over-oscillate if in doubt." },
        { id: "t_tala_anchor", heading: "Thalam is your lifeline", body: "If you get lost in the melody, thalam rescues you. Feel beat 1 coming; lock onto it. The melody realigns from sam." },
        { id: "t_pitfall", heading: "Don't submit take 1", body: "First takes are nervous, rushed. Record 3-5 takes. Submit the best one. You can re-record at any time; use that privilege." },
      ],
    },
    audioRefs: [
      { id: "demo_gananatha", label: "Sri Gananatha · 2-min reference" },
      { id: "demo_kundagowra", label: "Kundagowra · 2-min reference" },
      { id: "tala_backing", label: "Adi tala backing · 70 bpm · 2 min" },
    ],
  },

  // ═══ VEENA · L4 ═══
  veena_l4_01_scale_two: {
    id: "veena_l4_01_scale_two",
    title: "Raga Mohanam · pentatonic evening raga",
    objectives: [
      "Play Mohanam: Sa Ri Ga Pa Dha Sa (5 notes, no Ma or Ni)",
      "Recognize by phrase: Ga-Pa-Dha-Pa-Ga is identity",
      "Improvise a 4-bar phrase within Mohanam",
    ],
    writtenContent:
      "## Mohanam · the pentatonic delight\n\nCarnatic pentatonic raga. Five notes only: Sa Ri Ga Pa Dha. Maps to Hindustani Bhupali and Western pentatonic. Universally beloved — cross-cultural simplicity.\n\n## The scale\n\n| Western | C | D | E | G | A | C |\n| Sargam | Sa | Ri | Ga | Pa | Dha | Sa |\n\n(No Ma, no Ni.)\n\n## Identity phrase\n\nGa-Pa-Dha-Pa-Ga — ascending to Dha, returning to Ga via Pa. This undulation is Mohanam's signature. Plays in every Mohanam kriti.\n\n## Why pentatonic\n\nFewer notes = more space = each note carries more weight. Mohanam rewards slow, deliberate play. Ornaments + jaarus + gamakas all shine because the melodic skeleton is minimal.\n\n## Improvise\n\nOnce scale + identity phrase are solid, improvise 4 bars by rearranging the 5 notes. No wrong notes within Mohanam — it's forgiving. Build your confidence.",
    drills: {
      teach: [
        { id: "t_missing_notes", heading: "Feel the absence of Ma and Ni", body: "Leaving out Ma and Ni changes the mood entirely. Your ear will want to play F or B at first. Resist. The raga's identity comes as much from what's absent as what's present." },
        { id: "t_slow_pentatonic", heading: "Pentatonic wants patience", body: "5 notes means each note lingers. Don't rush. Let Pa ring for 2 beats before moving. Let Dha breathe. The space between notes is part of the music." },
        { id: "t_pitfall", heading: "Don't play Mohanam like a scale", body: "A scale goes 1-2-3-4-5-6-7-8. A raga is melodic — it leaps, it lingers, it returns. Rearrange the 5 notes musically, don't sequence them mechanically." },
      ],
    },
    audioRefs: [
      { id: "demo_scale", label: "Mohanam scale · ascending + descending" },
      { id: "demo_identity", label: "Ga-Pa-Dha-Pa-Ga · identity phrase" },
      { id: "demo_improv", label: "4-bar Mohanam improvisation · reference" },
    ],
  },
  veena_l4_02_ornament: {
    id: "veena_l4_02_ornament",
    title: "Sphurita · the veena's quick ornament",
    objectives: [
      "Execute a sphurita (quick grace note) before main notes",
      "Apply to Mohanam identity phrase",
      "Combine with gamaka on the same note",
    ],
    writtenContent:
      "## Sphurita · instantaneous grace\n\nCarnatic equivalent of Hindustani kan. A brief adjacent note before the main note, played on veena by a quick side-fret touch-and-release.\n\n## Technique\n\nTarget note: Pa. Sphurita: Ga. Press Ga for ~30ms. Release. Press Pa firmly. The Ga should feel like a breath before Pa.\n\n## Where to use\n\nBefore phrase climaxes. Before long-held notes. Before sam arrivals. Same principle as kan.\n\n## Combining with gamaka\n\nThe sphurita Ga → Pa → gamaka on Pa = a triple-ornament: grace note, arrival, oscillation. All in 1 note's lifecycle. This layering is what makes veena so expressive.\n\n## Caution\n\nSphurita is often misapplied. Overused = melody sounds nervous/stuttery. Applied once per 4-bar phrase on the peak = maximum impact.",
    drills: {
      teach: [
        { id: "t_brief_release", heading: "Sphurita is press-and-release", body: "Don't hold the sphurita. Press briefly (~30ms), release, press main note. If you hold sphurita, it becomes a full note and the phrase is wrong." },
        { id: "t_combined_layer", heading: "Stack ornaments deliberately", body: "Sphurita + gamaka together = 2 layers of expression on one note. But don't stack on every note. One or two per phrase. Layered ornaments are for peaks." },
        { id: "t_pitfall", heading: "Don't sphurita into a jaaru", body: "Sphurita + jaaru on same note = a smear of sounds. If you're going to slide (jaaru) into a note, don't also sphurita. Pick one approach." },
      ],
    },
    audioRefs: [
      { id: "demo_sphurita_isolated", label: "Sphurita before Sa, Pa, Dha · isolated" },
      { id: "demo_combined", label: "Mohanam phrase with sphurita + gamaka" },
    ],
  },
  veena_l4_03_rep_1: {
    id: "veena_l4_03_rep_1",
    title: "Kriti excerpt · 'Ninnu Vina' in Mohanam",
    objectives: [
      "Play the pallavi (theme) of 'Ninnu Vina' for 16 bars",
      "Apply gamakas + 2 jaarus + 1 sphurita musically",
      "Sustain thalam through all 16 bars",
    ],
    writtenContent:
      "## 'Ninnu Vina' kriti\n\nClassic Mohanam kriti by Syama Sastri. Devotional, moderately paced, 3 sections. We'll focus on the pallavi (theme) only — 16 bars in adi tala.\n\n## The melody\n\nOpens with Ga-Pa-Dha (identity phrase). Ascends to Sa' (high Sa) by bar 4. Descends back via Dha-Pa-Ga by bar 8. Repeats (with subtle variation) bars 9-16.\n\n## Ornaments to include\n\n- Gamakas: on every sustained note.\n- Jaarus: one ascending (bar 3, Ga to Pa slide), one descending (bar 7, Dha to Pa slide).\n- Sphurita: one before the peak Sa' at bar 4.\n\n## What's hard\n\nHolding thalam discipline while layering multiple ornaments in the melody. Three-fingered right hand must stay mapped + consistent.\n\n## Practice arc\n\nWeek 1: melody alone, no ornaments.\nWeek 2: add gamakas.\nWeek 3: add jaarus.\nWeek 4: add sphurita + full performance recording.",
    drills: {
      teach: [
        { id: "t_ornament_map", heading: "Plan ornament locations on paper", body: "Write the 16-bar melody. Mark every ornament by type + location. Without this map, ornaments get forgotten or misplaced. With it, you're deliberate." },
        { id: "t_devotion", heading: "Kriti is devotion", body: "'Ninnu Vina' = 'Without You' (addressed to the deity). Play like you mean it. Sentimentality makes veena sound cheap; restrained devotion makes it soar." },
        { id: "t_pitfall", heading: "Don't rush section 2", body: "Bars 9-16 (the variation) contains the piece's emotional peak. Beginners rush because they're familiar — 'second time, same thing.' It's not the same. It's the climax. Honor it." },
      ],
    },
    audioRefs: [
      { id: "demo_section_1", label: "Bars 1-8 · melody + gamakas" },
      { id: "demo_section_2", label: "Bars 9-16 · full ornamentation" },
      { id: "demo_full", label: "Full pallavi · 16 bars · reference" },
    ],
  },
  veena_l4_04_practice_rout: {
    id: "veena_l4_04_practice_rout",
    title: "Veena riyaz · 15-min Carnatic block",
    objectives: [
      "Structure: scale (3) + gamaka drill (5) + kriti (7)",
      "Thalam active throughout",
      "Record + review each session",
    ],
    writtenContent:
      "## The 15-min veena riyaz\n\n**3 min · Scale** — Shankarabharanam ascending + descending, then Mohanam. 60 bpm. Focus on oscillation on every note.\n\n**5 min · Gamaka drill** — pick one gamaka type (plain oscillation, kampita, nokku). Drill on Sa, Pa, and one random note. 5 variations.\n\n**7 min · Kriti** — pick a piece from L2-L4 (Sarali, geetham, or 'Ninnu Vina'). Play 3 passes. Each pass, focus on: melody → ornaments → thalam discipline.\n\n## Thalam throughout\n\nThalam doesn't pause between sections. Scale practice = thalam. Gamaka drill = thalam on beats. Kriti = thalam. You're training the right-hand ring finger to thalam as default.\n\n## Record + compare\n\nDay 1 vs day 7. Listen to: Is the gamaka tighter? Is the thalam steadier? Is the kriti more fluid? Quantify, don't just feel.\n\n## Daily cadence is king\n\n15 min × 7 days > 2 hours × 1 day. Mastery compounds daily. Skip a day = lose 20% of the compounding.",
    drills: {
      teach: [
        { id: "t_thalam_always", heading: "Thalam never rests", body: "Even during scale practice, thalam plucks on beats 1, 5, 7 of an imagined adi tala cycle. This builds the reflex — by the time you reach a performance, thalam is pure muscle memory." },
        { id: "t_rotate_ornaments", heading: "Rotate gamaka drills daily", body: "Monday: plain oscillation. Tuesday: kampita (rapid oscillation). Wednesday: nokku (touch above). Thursday: jaaru (slide). Friday: sphurita. Weekend: combined. This rotation builds breadth." },
        { id: "t_pitfall", heading: "Don't sit with a sore hand", body: "Veena's oscillating left-hand motion can strain wrist tendons. If your hand hurts, stop. Next day, gentle warmup, shorter session. Ignoring pain = injury." },
      ],
    },
    audioRefs: [
      { id: "scale_drill_ref", label: "Scale drill · 3 min reference" },
      { id: "gamaka_drill_ref", label: "Gamaka drill · 5 variations" },
      { id: "demo_routine", label: "Full 15-min riyaz · reference" },
    ],
  },
};
