/**
 * Hand-authored L5-L9 overrides · indian classical advanced:
 * bansuri · harmonium · mridangam · veena.
 *
 * Pro-tier (L5-L6) through Genius-tier (L7-L9) content. Honors
 * Hindustani (bansuri, harmonium) + Carnatic (mridangam, veena)
 * pedagogy: ragas, taals, gamakas, alap structure, gurukul
 * transmission ethos.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const INDIAN_ADVANCED_OVERRIDES: Record<string, Patch> = {
  // ═══════════════════════════════════════════════════════════════
  // BANSURI · L5-L9
  // ═══════════════════════════════════════════════════════════════

  bansuri_l5_01_harmony: {
    id: "bansuri_l5_01_harmony",
    title: "Tanpura as your second body · drone-aware phrasing in Bhimpalasi",
    objectives: [
      "Tune your Sa to match a tanpura set in C with audible perfect fifths",
      "Phrase Bhimpalasi (komal Ga, komal Ni) with the drone resolving every line",
      "Identify when Pa is sounding in the tanpura and lean into that consonance",
    ],
    writtenContent:
      "## Drone is not background\n\nIn Hindustani music, the tanpura is a co-performer. It plays Sa, Pa, and Sa-up — four strings cycling forever — and it tells you, every second, exactly where home is. Your job is to *listen to it more than yourself*.\n\n## Bhimpalasi over a tanpura\n\nBhimpalasi is an afternoon raga: komal Ga, komal Ni, full Re-Ma-Pa-Dha. Over a C tanpura, your komal Ga (Eb) will *fight* the Pa (G) string for a heartbeat — that tension is the raga. Lean into it; resolve down to Re or up to Ma.\n\n## Listen for the wolf\n\nWhen the tanpura's Pa string rings, hold a Pa or Sa on the bansuri — the room goes still. That's the moment you've found the drone. Train your ear to catch it, then phrase toward it.",
    drills: {
      teach: [
        { id: "t_why",     heading: "The drone is your tuning conscience", body: "Players without a tanpura drift sharp by 10 cents within a minute. Players with one stay locked. The drone is a continuous reference; ignoring it is willful blindness." },
        { id: "t_raga",    heading: "Bhimpalasi's komal Ga is the heart", body: "Every Bhimpalasi phrase lingers on komal Ga before resolving. Don't skim past it — sustain it, gamak on it, let the listener feel the flat third pulled toward Re." },
        { id: "t_pitfall", heading: "Don't drown out the tanpura", body: "Beginners blow louder thinking it adds presence. It hides the drone. The bansuri should sit *just above* the tanpura in volume — never overwhelm it." },
      ],
    },
    audioRefs: [
      { id: "tanpura_c",      label: "Tanpura · C base · 4 minutes" },
      { id: "demo_bhimpalasi", label: "Bhimpalasi alap over tanpura · 90 sec" },
      { id: "demo_resolve",    label: "Resolution phrase · komal Ga to Re to Sa" },
    ],
  },

  bansuri_l5_02_fast: {
    id: "bansuri_l5_02_fast",
    title: "First taan in raga Yaman · 16 notes per cycle, clean tongue",
    objectives: [
      "Execute a Sa-Re-Ga-Ma-Pa-Dha-Ni-Sa' taan at 120 bpm with no tongue articulation",
      "Maintain a single breath across 8 notes, taking inhales at phrase boundaries",
      "Run the descending taan Sa'-Ni-Dha-Pa-Ma-Ga-Re-Sa with equal evenness",
    ],
    writtenContent:
      "## Taan = the sprint of Hindustani music\n\nA *taan* is a fast melodic run, usually 8 or 16 notes per teental beat-group. It's where the alap's patience pays off: you've earned the right to fly because you proved you can hover.\n\n## The bansuri taan technique\n\nNo tongue. No 'tu-tu-tu' attack. Pure breath + rapid finger work. Each note gets one tiny pulse of breath; your fingers do everything else. If you tongue, the audience hears flute-flute-flute instead of *taan*.\n\n## Yaman's run\n\nSa Re Ga Ma' Pa Dha Ni Sa' — the iconic Yaman ascent (sharp Ma is Ma'). Practice it at 60 bpm first, every note even. Then 80. Then 100. Don't go faster until evenness is locked. Speed without evenness is noise.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Evenness > speed", body: "A 100 bpm taan with rock-solid evenness sounds faster than a 140 bpm taan with one sticky note. Train metronome-perfect at slow tempo before pushing. The ear forgives speed; it does not forgive bumps." },
        { id: "t_raga",    heading: "Sharp Ma is Yaman's identity", body: "In your taan, the Ma' (F#) must sing — not lurk. Many students brush past it. Hold it a fraction longer if needed; the raga lives there." },
        { id: "t_pitfall", heading: "Don't shorten the breath", body: "Half-breath taans wobble at note 5 or 6. Take a full diaphragmatic breath before launching — enough fuel for all 8 notes plus a sustain on Sa' at the end." },
      ],
    },
    audioRefs: [
      { id: "tanpura_yaman", label: "Tanpura · Yaman tuning · C-G-C" },
      { id: "demo_taan_slow", label: "Yaman taan · 80 bpm · pristine" },
      { id: "demo_taan_full", label: "Yaman taan · 120 bpm · concert speed" },
    ],
  },

  bansuri_l5_03_improv_1: {
    id: "bansuri_l5_03_improv_1",
    title: "First alap · 90 seconds extempore in raga Bhairav",
    objectives: [
      "Improvise 90 seconds of unaccompanied Bhairav alap, no metronome",
      "Stay within Bhairav's allowed notes (Sa, komal Re, Ga, Ma, Pa, komal Dha, Ni, Sa')",
      "Use at least 3 meends and 2 silences longer than 4 seconds",
    ],
    writtenContent:
      "## Alap is composition in real time\n\nNo bandish to lean on. Just you, the tanpura, and Bhairav. Most students panic at the silence; that panic is the lesson.\n\n## Structure your alap\n\nStart on Sa. Linger. Establish komal Re with a meend from Sa. Touch Ga, fall back to Sa. Slowly add Ma, then Pa. Only after Pa is established do you ascend to komal Dha and Ni. The dawn raga reveals itself patiently.\n\n## Silence is a phrase\n\nA 4-second pause after a phrase is not awkward — it's the raga breathing. Hindustani aesthetics value the *fermata* between phrases as much as the phrases themselves. Don't fill empty space with notes; fill it with attention.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Improvisation is constrained creativity", body: "You're not playing 'whatever' — you're playing *only what Bhairav allows*. The constraint is the freedom; without rules there's no raga, only noise." },
        { id: "t_raga",    heading: "Bhairav's pakad: Ga-Ma-dha-Pa", body: "That's the fingerprint. Drop it into your alap somewhere — when the listener hears komal Dha approaching Pa from above, they recognize the raga instantly." },
        { id: "t_pitfall", heading: "Don't perform — explore", body: "Beginners want to impress. Alap is not a performance; it's a conversation with the raga. Play softly, listen back to yourself, respond to your last phrase rather than racing to the next." },
      ],
    },
    audioRefs: [
      { id: "tanpura_bhairav", label: "Tanpura · Bhairav · komal Re emphasis" },
      { id: "demo_alap_short", label: "90-sec Bhairav alap · reference" },
      { id: "demo_pakad",      label: "Bhairav pakad · Ga-Ma-dha-Pa loop" },
    ],
  },

  bansuri_l5_04_rep_2: {
    id: "bansuri_l5_04_rep_2",
    title: "Second bandish · medium-tempo composition in raga Desh",
    objectives: [
      "Memorize a 4-line bandish in Desh (madhya laya, jhaptaal 10 beats)",
      "Land sthayi line on sam, antara on its own internal sam",
      "Play with one ornament per line — meend, kan, or murki — chosen musically",
    ],
    writtenContent:
      "## Raga Desh\n\nLate-evening, monsoon raga. Uses Sa, Re, Ma, Pa, Ni in ascent; full komal-Ni descent. Sweet, romantic, slightly nostalgic — Desh is where Hindi film composers live.\n\n## Jhaptaal\n\n10 beats, divided 2+3+2+3. Bol: Dhi Na | Dhi Dhi Na | Ti Na | Dhi Dhi Na. Less common than teental, but Desh bandishes love it.\n\n## Sthayi and antara\n\nA bandish has two halves: *sthayi* (the lower-octave verse, sung first and returned to) and *antara* (the upper-octave bridge). Move from sthayi to antara to sthayi — that's the song's emotional shape. Each half resolves to sam.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Memorize the lyric, not just the notes", body: "Hindustani bandishes have words. Even on bansuri, learn the lyric — it tells you where to breathe, where to emphasize, where the meaning sits. Notes without text are skeletal." },
        { id: "t_raga",    heading: "Desh's komal Ni in descent is the magic", body: "Sa-Ni'-Dha-Pa coming down — the Ni' must be flat in descent, natural in ascent. Get this asymmetry wrong and Desh becomes Khamaj. Same notes, different raga." },
        { id: "t_pitfall", heading: "Don't ornament every note", body: "One ornament per line. Choose where it serves the phrase. Over-ornamenting the bandish makes it feel anxious; restraint reads as mastery." },
      ],
    },
    audioRefs: [
      { id: "tanpura_desh", label: "Tanpura · Desh tuning" },
      { id: "demo_bandish", label: "Desh bandish · jhaptaal · 4 lines" },
      { id: "demo_lyric",   label: "Bandish with sung lyric · pronunciation guide" },
    ],
  },

  bansuri_l6_01_adv_tech: {
    id: "bansuri_l6_01_adv_tech",
    title: "Jhala on bansuri · sustained drone with melodic accents",
    objectives: [
      "Sustain Sa as a drone-like pulse while inserting melodic notes between pulses",
      "Maintain 4 Sa pulses per beat at 90 bpm without breath collapse",
      "Insert 4-note melodic figures from raga Malkauns between drone groups",
    ],
    writtenContent:
      "## Jhala on bansuri?\n\nJhala is traditionally a sitar/sarod technique: drone string + melody string alternating at high speed. On bansuri there are no strings — but you can simulate it. Pulse Sa rapidly, insert melodic notes briefly, return to Sa. The illusion: drone + melody from one breath.\n\n## Malkauns context\n\nMalkauns is a midnight raga, pentatonic: Sa, komal Ga, Ma, komal Dha, komal Ni. Heavy, otherworldly. Jhala over Malkauns sounds ritualistic — you're meant to feel it in the chest.\n\n## Breath economy\n\nJhala is brutal on breath. You can't pause for a clean inhale. Practice circular breathing exercises (separately) and apply micro-inhales between phrase groups. A 3-minute jhala is a feat of stamina.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Jhala creates ecstasy from repetition", body: "The drone-pulse hypnotizes the listener; the melodic flashes wake them. Together they generate the ritual trance Hindustani music aims for at jor and jhala stages." },
        { id: "t_raga",    heading: "Malkauns rewards heaviness", body: "Don't play Malkauns light. Komal Ga and komal Dha must drag — like the raga is in mourning. Light Malkauns is wrong Malkauns." },
        { id: "t_pitfall", heading: "Don't lose the pulse", body: "If your Sa pulses go uneven, the jhala collapses into mush. Metronome-lock the drone first; only then insert melody. Drone evenness is non-negotiable." },
      ],
    },
    audioRefs: [
      { id: "tanpura_malkauns", label: "Tanpura · Malkauns · komal Dha tuning" },
      { id: "demo_jhala_basic", label: "Bansuri jhala · 2 minutes · Malkauns" },
      { id: "demo_jhala_master", label: "Hariprasad-style jhala · reference" },
    ],
  },

  bansuri_l6_02_rep_3: {
    id: "bansuri_l6_02_rep_3",
    title: "Pro-tier bandish · Yaman tarana with fast taan section",
    objectives: [
      "Perform a tarana in Yaman, including a 16-bar fast taan in the second half",
      "Sustain teental cycle awareness across a 4-minute performance",
      "Land 4 separate tihais (3-fold cadences) on sam without slipping",
    ],
    writtenContent:
      "## Tarana\n\nA *tarana* is a syllable-driven composition — instead of poetry, the lyrics are bols like 'na dir dani tom' that imitate sitar/sarod strokes. Originated by Amir Khusro in the 13th century. On bansuri, you abstract the bols into pure melody, but the rhythmic urgency stays.\n\n## Yaman tarana shape\n\nSthayi (slow), antara (mid), drut taan section (fast). The performance accelerates: 3 minutes of slow build → 1 minute of fireworks. The contrast is the form.\n\n## Tihai\n\nA *tihai* is a phrase repeated 3 times, designed so the third repetition lands on sam. The audience claps when it lands — that's the cue. A 4-minute tarana has 3-4 tihais minimum; missing one is amateur.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Tarana proves command of cycle", body: "You can't play a tarana without internalizing teental at full speed. Each phrase must know exactly where sam is. Tarana is a performance of layakari (rhythm play)." },
        { id: "t_raga",    heading: "Yaman tarana stays bright", body: "Even in the drut section, Yaman remains peaceful. Don't let speed turn it aggressive. The taan should feel like quick brushstrokes, not slashes." },
        { id: "t_pitfall", heading: "Don't math the tihai", body: "Counting the tihai's 3 cycles consciously kills the feel. Internalize tihais by singing them with bols off the flute first; then the math becomes muscle." },
      ],
    },
    audioRefs: [
      { id: "tanpura_yaman", label: "Tanpura · Yaman" },
      { id: "tabla_teental_med", label: "Tabla teental · 90 bpm" },
      { id: "demo_tarana", label: "Yaman tarana · 4 minutes · full" },
    ],
  },

  bansuri_l6_03_duet: {
    id: "bansuri_l6_03_duet",
    title: "Jugalbandi prep · trading phrases with tabla in raga Kafi",
    objectives: [
      "Play a 4-bar phrase, leave 4 bars for tabla response, repeat 8 times",
      "Vary your phrases each round to give tabla fresh material to mirror",
      "Land both your phrases and tabla's responses on sam without overlap",
    ],
    writtenContent:
      "## Jugalbandi\n\n*Jugal* = pair, *bandi* = bond. Two musicians in dialogue, taking turns leading. Bansuri-tabla jugalbandi is one of the most loved formats in Hindustani concerts.\n\n## Raga Kafi for trading\n\nKafi (komal Ga, komal Ni, all else natural) is a folk-leaning raga, light enough for playful exchange. Heavy ragas like Darbari are bad for jugalbandi; Kafi was built for it.\n\n## Sawal-jawab (question-answer)\n\nYour 4 bars = sawal (question). Tabla's 4 bars = jawab (answer). The tabla *imitates* your rhythmic shape on the drums — same accents, same length. As leader, you set the architecture.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Jugalbandi is listening, not playing", body: "Your hardest job in jugalbandi is *listening to tabla* during their 4 bars. You're cataloguing what they did so your next phrase responds to it. Bad jugalbandi = two monologues." },
        { id: "t_raga",    heading: "Kafi's komal Ga is meend-friendly", body: "In sawal-jawab, lean on Ga-Re-Sa meends. They're memorable, easy for tabla to mirror in stroke patterns, and quintessentially Kafi." },
        { id: "t_pitfall", heading: "Don't speed up", body: "Excitement in jugalbandi tempts you to push tempo. Don't. Tabla and you must agree on tempo before starting and protect it; layakari is variation *within* the cycle, not the cycle itself." },
      ],
    },
    audioRefs: [
      { id: "tanpura_kafi", label: "Tanpura · Kafi tuning" },
      { id: "tabla_kafi_loop", label: "Tabla teental · 80 bpm · 8-bar loops" },
      { id: "demo_jugalbandi", label: "Jugalbandi · 4 rounds · reference" },
    ],
  },

  bansuri_l6_04_pro_cert: {
    id: "bansuri_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute kheyal performance in raga Bhimpalasi",
    objectives: [
      "Perform a complete kheyal: vilambit alap, sthayi-antara, drut taan section",
      "Hold tempo across 5 minutes without metronome, landing all sams",
      "Demonstrate 1 tihai, 2 meend phrases, and at least 1 gamak passage",
    ],
    writtenContent:
      "## Kheyal\n\nThe dominant Hindustani vocal form. 'Kheyal' = imagination. On bansuri you abstract the lyric, but the structure stays: alap → sthayi → antara → taans.\n\n## What graders score\n\nPitch stability across 5 minutes (no Sa drift). Sam landings (every cycle). Raga purity (no foreign notes — komal Ga and komal Ni only in Bhimpalasi). Ornamentation deployed musically. And the intangible: does it *feel* like Bhimpalasi?\n\n## How to walk in\n\nWarm up Sa for 5 minutes before the take. Tune the tanpura precisely. Play the alap unhurried — judges respect patience. Then build. The performance arc is non-negotiable: slow, slower-but-deeper, then fast.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Pro tier means you can sustain a raga", body: "L1-L4 demonstrated technique on small canvases. L6 says: can you hold a single raga's mood for 5 minutes? Sustainment is the hardest skill in Hindustani music." },
        { id: "t_raga",    heading: "Bhimpalasi's afternoon weight", body: "Don't play it bright. The raga sits heavy in the middle of the day — slightly drowsy, slightly contemplative. Komal Ga should drag, never skip." },
        { id: "t_pitfall", heading: "Don't peak too early", body: "Beginners go full intensity at minute 2. Save it. The drut section at minute 4-5 should be the climax. Pace yourself — alap is restraint, antara is unfolding, drut is release." },
      ],
    },
    audioRefs: [
      { id: "tanpura_bhimpalasi", label: "Tanpura · Bhimpalasi tuning" },
      { id: "tabla_teental_perf", label: "Tabla · vilambit + drut teental · 5 min" },
      { id: "demo_kheyal", label: "Reference Bhimpalasi kheyal · 5 min" },
    ],
  },

  bansuri_l7_01_advanced_1: {
    id: "bansuri_l7_01_advanced_1",
    title: "Vilambit alap in raga Darbari · the depth of slowness",
    objectives: [
      "Sustain a 4-minute alap with no note shorter than 8 seconds",
      "Use Darbari's heavy oscillating gamak on komal Ga and komal Dha",
      "Resolve every long phrase to Sa or Pa with a meend lasting 3+ seconds",
    ],
    writtenContent:
      "## Darbari Kanada\n\nA late-night raga of unmatched gravity — Tansen's invention for Akbar's court, the legend goes. Komal Ga and komal Dha, both played with a wide, slow oscillating gamak unique to this raga. Anyone can play the notes; only masters play the gamak.\n\n## Vilambit means deep, not boring\n\nVilambit alap is *not* a slow alap. It's a *deep* alap. Each note is investigated: its meend approaches, its gamak character, its resolution path. A single Sa can take 12 seconds and feel earned.\n\n## The oscillating gamak\n\nDarbari's signature gamak swings ~50 cents below the target, slowly, rhythmically. On bansuri, this is breath-and-finger micro-rolls, hypnotic. Practice on komal Ga alone for 10 minutes a session before applying to phrases.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Slow exposes everything", body: "At vilambit, every imperfection — pitch wobble, breath catch, intonation creep — is amplified. There's nowhere to hide. Vilambit mastery is a complete diagnostic of your fundamentals." },
        { id: "t_raga",    heading: "Darbari's gamak is the raga", body: "Without the heavy gamak, Darbari sounds like Asavari. The slow oscillation on komal Ga is Darbari's DNA. Skip it and you've played a different raga." },
        { id: "t_pitfall", heading: "Don't fill silence", body: "In vilambit, gaps of 6-10 seconds between phrases are correct. The tanpura fills the space. If you're nervous-noodling, you're not yet at vilambit consciousness." },
      ],
    },
    audioRefs: [
      { id: "tanpura_darbari", label: "Tanpura · Darbari · weight tuning" },
      { id: "demo_alap_vilambit", label: "Darbari vilambit alap · 4 min" },
      { id: "demo_gamak_isolated", label: "Darbari gamak on komal Ga · isolated" },
    ],
  },

  bansuri_l7_02_rep_4: {
    id: "bansuri_l7_02_rep_4",
    title: "Khayal exposition · Marwa with full vistar and bol-taan",
    objectives: [
      "Perform Marwa khayal: alap (3 min), sthayi+antara (2 min), bol-taan (2 min)",
      "Avoid Pa entirely (Marwa omits Pa) for the entire 7-minute performance",
      "Execute 2 bol-taans in the drut section, syllabically tied to the bandish lyric",
    ],
    writtenContent:
      "## Marwa\n\nDusk raga. Uses komal Re, sharp Ma, full Ga, Dha, Ni — but *no Pa*. The absence of the perfect fifth makes Marwa unstable, yearning, unresolved. The raga's emotional core lives in that absence.\n\n## Bol-taan\n\nA taan that follows the syllables of the bandish lyric. Instead of pure melodic runs, you ride the words at high speed — each syllable triggers a note. On bansuri, you abstract the syllable but preserve the rhythmic shape and accent pattern.\n\n## The vistar\n\n*Vistar* = unfolding. After alap, the bandish is sung once straight, then expanded line by line — every line becomes a launchpad for improvisation. The structure is: line, expand line, return to sam. Repeat for each line.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Marwa is the absence of Pa", body: "If you accidentally play Pa, you've broken Marwa. Your hand will reach for it from habit; train against the habit. The missing fifth is the raga's gravity." },
        { id: "t_raga",    heading: "Komal Re is Marwa's hero", body: "Marwa phrases lean heavily on komal Re, often approaching from sharp Ma above. The descent Ma'-Ga-Re-Sa with weight on Re is the pakad. Memorize that shape." },
        { id: "t_pitfall", heading: "Don't rush the vistar", body: "Each line of the bandish deserves its own expansion. If you race through 4 lines in 30 seconds, you've missed the form. Linger on each line; the expansion is the music." },
      ],
    },
    audioRefs: [
      { id: "tanpura_marwa", label: "Tanpura · Marwa · no Pa tuning" },
      { id: "tabla_teental",  label: "Tabla teental · 75 bpm" },
      { id: "demo_marwa_khayal", label: "Marwa khayal · 7 min · reference" },
    ],
  },

  bansuri_l7_03_improv_2: {
    id: "bansuri_l7_03_improv_2",
    title: "Bol-tan improvisation · 16-cycle extempore in Bageshri",
    objectives: [
      "Improvise 16 cycles of teental at madhya laya in raga Bageshri",
      "Vary phrase length: cycles 1-4 short, 5-8 medium, 9-16 elongated taans",
      "Land sam every cycle with no exceptions, even during fastest improvisation",
    ],
    writtenContent:
      "## Bageshri\n\nLate-night raga. Komal Ga, komal Ni, no Pa in ascent. Romantic, longing, often associated with separation poetry. Suited for slow exposition but rewards extempore in madhya laya.\n\n## 16-cycle improvisation\n\nThis is jazz-equivalent bandwidth: 16 teental cycles = 256 beats of pure improvisation. You can't memorize ahead; you must *think in raga*. The risk is real — you might get lost. Getting lost teaches you more than any safe practice run.\n\n## Phrase pacing\n\nDon't blow your wad early. Cycles 1-4 should be small, declarative, like sentences. Cycles 5-8 develop the sentences into paragraphs. Cycles 9-16 are paragraphs at speed. The arc is built, not improvised.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Improvisation is rehearsed restraint", body: "Pros don't improvise 'freely.' They draw from a deep vocabulary of raga phrases internalized over years. What looks free is recombination of memorized shapes. Build the vocabulary first." },
        { id: "t_raga",    heading: "Bageshri's no-Pa-ascent rule", body: "Going up: Sa Re Ga Ma Dha Ni Sa'. Pa is skipped. Coming down: Sa' Ni Dha Ma Pa Ga Re Sa. Pa appears only in descent. Violate this and Bageshri vanishes." },
        { id: "t_pitfall", heading: "Don't bail on sam", body: "Mid-improvisation, if you feel lost, the temptation is to stop or 'reset.' Don't. Keep moving toward sam — even a wrong-but-on-time sam is better than a right-but-late one." },
      ],
    },
    audioRefs: [
      { id: "tanpura_bageshri", label: "Tanpura · Bageshri" },
      { id: "tabla_teental_med", label: "Tabla teental · 95 bpm · 16 cycles" },
      { id: "demo_improv_16", label: "16-cycle Bageshri improvisation · reference" },
    ],
  },

  bansuri_l8_01_style_study: {
    id: "bansuri_l8_01_style_study",
    title: "Style study · Hariprasad Chaurasia · the bansuri language he built",
    objectives: [
      "Identify 3 Hariprasad-signature phrases in raga Hamsadhwani by ear",
      "Reproduce his slow meend across an octave (Sa to Sa') with breath stability",
      "Imitate his characteristic 'whisper-to-roar' dynamic arc in a 90-second alap",
    ],
    writtenContent:
      "## Hariprasad Chaurasia\n\nThe bansuri's modern voice. Pre-Hariprasad, the bansuri was a folk instrument; he and Pannalal Ghosh elevated it to Hindustani classical's front rank. Listen to his Hamsadhwani recordings — every phrase is a masterclass.\n\n## What to study\n\n1. His meends are *long*. He'll slide from Sa to Pa across 8 seconds. Most players can't sustain breath through that.\n2. His dynamic range is enormous. He starts at the threshold of audibility, climaxes at full force, returns. The arc is operatic.\n3. His silences are weaponized. He'll let 6 seconds pass before resolving a phrase. The audience holds its breath.\n\n## Imitation as transmission\n\nThis is gurukul tradition: imitate the master until your body learns. Don't analyze — copy. Hours of slow imitation rewrite your default phrasing. Originality comes after, not before, deep imitation.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Style is built from masters", body: "You don't invent your bansuri voice; you steal from 5 masters and the synthesis is yours. Hariprasad is non-optional for any serious bansuri student." },
        { id: "t_raga",    heading: "Hamsadhwani is his territory", body: "Sa Re Ga Pa Ni — 5-note ascending raga, evening, joyful. Hariprasad's recordings are abundant; pick one 30-min track and learn it phrase by phrase." },
        { id: "t_pitfall", heading: "Don't 'add Hariprasad-isms' randomly", body: "Style study isn't sprinkling someone's tricks into your playing. It's deeply imitating one piece for weeks. Surface-level imitation reads as parody." },
      ],
    },
    audioRefs: [
      { id: "ref_hariprasad_hamsa", label: "Hariprasad · Hamsadhwani · 30 min" },
      { id: "demo_meend_long", label: "Long meend Sa to Sa' · 8 seconds" },
      { id: "demo_dynamic_arc", label: "Whisper-to-roar arc · 90 sec" },
    ],
  },

  bansuri_l8_02_rep_5: {
    id: "bansuri_l8_02_rep_5",
    title: "Concert-length kheyal · Bhairavi with vilambit, drut, and tarana close",
    objectives: [
      "Sustain a 12-minute kheyal with consistent raga purity in Bhairavi",
      "Move through vilambit (4 min), madhya (4 min), drut (3 min), tarana close (1 min)",
      "Hold pitch within 5 cents of Sa for the entire performance",
    ],
    writtenContent:
      "## Bhairavi\n\nThe closing raga. By tradition, Hindustani concerts end with Bhairavi — the raga of all flat notes (komal Re, komal Ga, komal Dha, komal Ni). It's the raga that says farewell.\n\n## Concert pacing\n\n12 minutes is a real performance. Vilambit (4 min) sets emotional weight. Madhya (4 min) develops phrases at moderate tempo. Drut (3 min) ignites the audience. Tarana (1 min) closes with rhythmic celebration. Each section's tempo and intensity must escalate cleanly.\n\n## The Bhairavi license\n\nBhairavi is the only raga where 'foreign' notes are forgiven — masters borrow notes from related ragas freely. Use sparingly; the license is earned, not assumed. Stick to pure Bhairavi for this performance.",
    drills: {
      teach: [
        { id: "t_why",     heading: "12 minutes tests stamina", body: "Most students collapse around minute 8 — embouchure fatigue, breath shallowness, mind fog. Build to 12 minutes by 5-min, 8-min, 10-min, 12-min progression. Stamina is trained." },
        { id: "t_raga",    heading: "Bhairavi's komal Re is sweet, not heavy", body: "Unlike Darbari's grave komal Ga, Bhairavi's komal Re is intimate, melting. Approach it from Sa with a soft meend. The raga's sweetness depends on this delicacy." },
        { id: "t_pitfall", heading: "Don't lose Sa", body: "Across 12 minutes, your reference Sa drifts. Re-orient every 90 seconds: pause, listen to tanpura, sound a clean Sa. If your Sa drifts, the whole raga collapses." },
      ],
    },
    audioRefs: [
      { id: "tanpura_bhairavi", label: "Tanpura · Bhairavi · all-flat tuning" },
      { id: "tabla_concert", label: "Tabla · vilambit-madhya-drut · 12 min" },
      { id: "demo_concert_full", label: "Full Bhairavi concert · 12 min reference" },
    ],
  },

  bansuri_l8_03_accompany: {
    id: "bansuri_l8_03_accompany",
    title: "Accompanying a vocalist · serving the singer in raga Puriya Dhanashri",
    objectives: [
      "Shadow a vocalist's melodic line within 50ms, no leading",
      "Fill silences between vocal lines with brief, raga-appropriate phrases (2-4 notes)",
      "Match the singer's dynamics — soften when they soften, never overpower",
    ],
    writtenContent:
      "## Accompaniment is invisibility\n\nThe singer is the lead. You exist to support, not to be heard. In Puriya Dhanashri (twilight, komal Re, sharp Ma), your bansuri colors the raga without competing for attention.\n\n## Shadowing\n\nWhen the vocalist sings a phrase, you echo it a half-beat behind, an octave above or unison. The audience hears amplification, not duet. This is harder than soloing — your ego must vanish.\n\n## Filling silences\n\nBetween vocal lines, the singer breathes. That's your moment. Insert 2-4 notes of pure raga — never a melody, never a statement. A subtle Ga-Ma'-Ga descent fills the gap and signals 'still in raga' to the audience.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Great accompanists are humble", body: "If audiences notice your accompaniment, you've failed. The best accompaniment is felt, not heard. Your technical mastery serves the singer's expression — that's the deal." },
        { id: "t_raga",    heading: "Puriya Dhanashri's twilight tension", body: "Sharp Ma + komal Re creates an unresolved feeling. Lean into it — your fills should preserve the unresolved quality, not 'fix' it. The raga lives in suspension." },
        { id: "t_pitfall", heading: "Don't anticipate", body: "If you start a phrase a beat early, you're leading. Always wait for the singer's first note before you begin your shadow. Lag, don't lead. Lag is humility." },
      ],
    },
    audioRefs: [
      { id: "tanpura_puriya", label: "Tanpura · Puriya Dhanashri" },
      { id: "vocal_track", label: "Vocalist track · 6 min · for accompaniment" },
      { id: "demo_accompany", label: "Bansuri accompaniment · same track" },
    ],
  },

  bansuri_l9_01_compose: {
    id: "bansuri_l9_01_compose",
    title: "Compose your own bandish · 4-line composition in a raga of your choice",
    objectives: [
      "Compose a 4-line bandish (sthayi 2 lines + antara 2 lines) in a chosen raga",
      "Lyric or syllabic structure must align with a specific taal (teental or jhaptaal)",
      "Submit a clean 90-second performance of your composition with tanpura",
    ],
    writtenContent:
      "## Composition is the highest skill\n\nPlaying others' compositions is performance. Composing your own is *creation*. In Hindustani tradition, the line between composer and performer was never sharp — every guru had bandishes attributed to them, often improvised into permanence.\n\n## Constraints\n\nChoose a raga you've performed in this curriculum: Yaman, Bhairav, Bhimpalasi, Marwa, Bageshri, Darbari. Compose 4 lines: sthayi (lower octave, 2 lines) + antara (upper octave touching Sa', 2 lines). Each line must land on or near sam in your chosen taal.\n\n## Test it\n\nA bandish is ready when: (a) you can sing it in your head, (b) it has at least one phrase that 'sticks' on first listen, (c) it stays inside the raga's allowed notes, (d) it lands sam reliably. Drop it on three different musicians; if they remember a phrase by the next day, you've composed.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Composition forces deep listening", body: "Until you compose, you're consuming. Composition forces you to ask: what makes this raga work? Why does this phrase satisfy? You become a musical scientist." },
        { id: "t_raga",    heading: "Steal shapes, not phrases", body: "Listen to existing bandishes in your chosen raga. Borrow rhythmic shapes (3+3+2 against 4+4) but write fresh melodic content. Plagiarism is shape-and-content; influence is shape-only." },
        { id: "t_pitfall", heading: "Don't over-ornament your draft", body: "Compose the skeleton clean. Ornaments come at performance, not composition. A bandish that depends on heavy ornamentation to sound good is a weak bandish." },
      ],
    },
    audioRefs: [
      { id: "tanpura_choice", label: "Tanpura · multiple raga options" },
      { id: "demo_student_bandishes", label: "Past student compositions · 5 examples" },
      { id: "submission_template", label: "Submission template · 90-sec performance" },
    ],
  },

  bansuri_l9_02_masterclass: {
    id: "bansuri_l9_02_masterclass",
    title: "Teach the meend · transmit a technique to a junior student",
    objectives: [
      "Record a 5-minute video teaching the meend technique to a hypothetical L3 student",
      "Demonstrate at least 3 progressive exercises, each with a clear failure mode",
      "Articulate why the meend matters in Hindustani music, not just how to do it",
    ],
    writtenContent:
      "## Transmission is the test of mastery\n\nIn the gurukul tradition, you don't really know something until you can teach it. The shishya (student) becomes a guru by transmitting. This lesson asks: can you transmit?\n\n## The teaching arc\n\n1. **Why does the meend matter?** (1 min) — Connect it to raga's continuous-pitch aesthetic.\n2. **First exercise: Sa to Re** (1 min) — Slow finger roll, breath stability.\n3. **Second exercise: Sa to Pa** (1 min) — Long meend across 4 holes.\n4. **Third exercise: meend in raga phrase** (1 min) — Apply musically.\n5. **What goes wrong** (1 min) — Common failure modes and corrections.\n\n## Voice and presence\n\nA good teacher is patient, specific, and honest about difficulty. Don't pretend it's easy. Don't intimidate. The middle path: 'this is hard; here's exactly how to attack it.'",
    drills: {
      teach: [
        { id: "t_why",     heading: "Teaching reveals gaps", body: "When you try to teach the meend, you'll discover 5 things you do unconsciously and can't explain. Articulating them turns unconscious skill into transferable knowledge — a level-up for you, not just the student." },
        { id: "t_raga",    heading: "Tie technique to musical purpose", body: "Don't teach meend as a finger trick. Teach it as the soul of Hindustani phrasing. Students learn faster when they understand *why* before *how*." },
        { id: "t_pitfall", heading: "Don't show off", body: "The masterclass isn't your demo reel. Resist playing your fanciest meend; play the simplest, slowest one — that's what the student needs. Teaching humility = teaching effectiveness." },
      ],
    },
    audioRefs: [
      { id: "exemplar_masterclass", label: "Reference masterclass · meend teaching" },
      { id: "rubric_audio", label: "Grading rubric · what graders listen for" },
    ],
  },

  bansuri_l9_03_genius_cert: {
    id: "bansuri_l9_03_genius_cert",
    title: "Genius Certificate · full recital arc · 3 ragas across 25 minutes",
    objectives: [
      "Perform a 25-minute recital: opening raga (10 min), main raga (12 min), Bhairavi closer (3 min)",
      "Demonstrate alap, jor, jhala, gat, taan, tihai, and bandish forms across the recital",
      "Maintain pitch, raga purity, and emotional arc with no major slips",
    ],
    writtenContent:
      "## Genius tier\n\nThe full recital. This is what bansuri masters perform on stage. 25 minutes of focus, structure, and uninterrupted artistry.\n\n## The arc\n\n**Opening raga (10 min)** — choose Yaman, Bhimpalasi, or another evening raga. Full alap (3 min), bandish in vilambit teental (4 min), drut taan section (3 min).\n\n**Main raga (12 min)** — choose Darbari, Marwa, or Malkauns. Deeper, longer alap (5 min), kheyal bandish (4 min), jhala (3 min).\n\n**Closing raga (3 min)** — Bhairavi, always. Brief, melodic, farewell.\n\n## What graders score\n\nNot just technique. They score *artistry*: did the recital have an arc? Did each raga feel distinct? Did silence work as much as sound? Did you connect with the music — or just execute it?",
    drills: {
      teach: [
        { id: "t_why",     heading: "Recital is the form's apex", body: "Everything in this curriculum points here. A recital is your statement to the tradition: 'I belong.' It is humbling. It is earned. Don't rush submission — practice the full 25 minutes 10 times before recording." },
        { id: "t_raga",    heading: "Choose contrasting ragas", body: "Don't pick three evening ragas. Mix moods: a peaceful opener, a heavy main, a sweet closer. Contrast is the macro-structure of a great recital." },
        { id: "t_pitfall", heading: "Don't optimize for the camera", body: "Play for an imaginary audience of 100 listeners. Don't smile at the lens; don't pose. Play as if no one were watching except the raga itself." },
      ],
    },
    audioRefs: [
      { id: "tanpura_multi", label: "Tanpura · 3-raga tuning bank" },
      { id: "tabla_recital", label: "Tabla · full recital backing · 25 min" },
      { id: "demo_recital", label: "Reference recital · master · 25 min" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // HARMONIUM · L5-L9
  // ═══════════════════════════════════════════════════════════════

  harmonium_l5_01_harmony: {
    id: "harmonium_l5_01_harmony",
    title: "Drone-aware harmonium · holding Sa-Pa under a vocalist in Bhairav",
    objectives: [
      "Hold a sustained Sa-Pa drone with the left hand while the right hand sketches Bhairav phrases",
      "Match a vocalist's pitch within 5 cents during long-held komal Re",
      "Use bellows pressure to swell with the singer, never against them",
    ],
    writtenContent:
      "## Harmonium = breath of the room\n\nThe harmonium has supplanted the tanpura in many North Indian devotional and semi-classical contexts. Why? Because the same instrument can drone *and* sketch melody. Mastering the dual role is the harmonium's special challenge.\n\n## Bhairav drone\n\nLeft hand: low Sa + Pa, sustained. Bellows steady. Right hand: traces Bhairav phrases over the top — komal Re, full Ga, Ma, Pa, komal Dha, Ni.\n\n## Bellows IS your breath\n\nThe bellows control dynamics, sustain, and the vocalist's psychological air supply. A nervous bellows pumps fast and shallow; a confident bellows is slow and full. Match the singer's emotional breath.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Drone is the singer's safety net", body: "A vocalist drifts pitch in 30 seconds without a stable drone. Your held Sa-Pa is their compass. Mess up the drone and the whole performance derails — quietly but fatally." },
        { id: "t_raga",    heading: "Bhairav's komal Re needs harmonium care", body: "On harmonium, komal Re (Db) is right next to Sa (C). The temptation is to skim past it. Don't — press it deliberately, hold it, let the singer use it as a pitch reference." },
        { id: "t_pitfall", heading: "Don't over-melody", body: "Harmonium accompaniment is 80% drone, 20% melody-shadow. New players reverse the ratio and crowd the singer. Drone first, drone always; melody only when there's room." },
      ],
    },
    audioRefs: [
      { id: "drone_bhairav", label: "Sa-Pa drone · Bhairav · 4 min" },
      { id: "demo_accompany", label: "Vocalist + harmonium drone · Bhairav" },
      { id: "demo_solo_sketch", label: "Right-hand Bhairav sketch · solo" },
    ],
  },

  harmonium_l5_02_fast: {
    id: "harmonium_l5_02_fast",
    title: "Fast taan on harmonium · Yaman ascent at 130 bpm with finger evenness",
    objectives: [
      "Play Sa-Re-Ga-Ma'-Pa-Dha-Ni-Sa' taan at 130 bpm with crisp note separation",
      "Maintain even bellows pressure — speed must not change pressure",
      "Execute descending taan Sa'-Ni-Dha-Pa-Ma'-Ga-Re-Sa with same evenness",
    ],
    writtenContent:
      "## Harmonium taans are unique\n\nUnlike sitar (plucked) or bansuri (breath-driven), harmonium taans depend on finger lift speed. Each note is a key press; speed = press-and-release frequency. Bellows must stay steady — air flow doesn't speed up just because fingers do.\n\n## Yaman taan\n\nAscending: Sa Re Ga Ma' Pa Dha Ni Sa'. Sharp Ma is critical. Use 1-2-3-4-5-1-2-3 fingering or similar — what matters is consistency between hand positions.\n\n## The harmonium's hidden taan obstacle\n\nKey-release lag. If you don't fully lift a key before pressing the next, notes blur. At 130 bpm, you have ~115 ms per note — release must be ruthless.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Bellows steady, fingers fly", body: "The classic harmonium taan failure is bellows panic — players unconsciously pump faster as fingers move faster. Decouple them. Bellows = breath; fingers = articulation. Independent." },
        { id: "t_raga",    heading: "Yaman taan emphasizes Pa", body: "On the way up, Pa is the midpoint and a natural rest. Many taans pause briefly there before completing the ascent. Use Pa as a breath landmark." },
        { id: "t_pitfall", heading: "Don't blur with sustained pedal", body: "Harmoniums have no pedal, but the natural air retention can blur fast taans. Lift each finger fully — taan demands separation." },
      ],
    },
    audioRefs: [
      { id: "drone_yaman", label: "Yaman drone · 16 cycles" },
      { id: "demo_taan_slow", label: "Yaman taan · 80 bpm · finger detail" },
      { id: "demo_taan_full", label: "Yaman taan · 130 bpm · full speed" },
    ],
  },

  harmonium_l5_03_improv_1: {
    id: "harmonium_l5_03_improv_1",
    title: "First alap on harmonium · 90 seconds extempore in raga Yaman",
    objectives: [
      "Improvise 90 seconds of Yaman alap with right-hand melody and left-hand drone",
      "Use only Yaman's notes (Sa, Re, Ga, Ma', Pa, Dha, Ni)",
      "Include 3 distinct phrase ideas with returns to Sa between each",
    ],
    writtenContent:
      "## Alap on harmonium is harder than vocal alap\n\nNo continuous pitch. No meend (the harmonium has discrete keys). Yet within these constraints, you must create a flowing exposition of the raga. The trick: phrasing.\n\n## Yaman alap structure\n\nStart on Ni (low) → ascend to Sa with a hammer of authority. Establish Sa. Touch Re. Return to Sa. Touch Ga. Return. Slowly extend the range. Don't rush to upper Sa' — earn it through careful build.\n\n## Compensating for no meend\n\nUse the *kan* (grace note touch) — quickly tap the neighbor note before the target. Sa → quick Re → Sa creates a faux-slide effect. Combined with bellows swells, the harmonium can imply meends it can't actually play.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Alap teaches you the raga", body: "Composed bandishes give you the phrases pre-made. Alap forces you to invent phrases from raga DNA. Every alap improves your raga vocabulary permanently." },
        { id: "t_raga",    heading: "Yaman's Ni-Re-Ga signature", body: "This three-note ascent (low Ni up to Re, up to Ga) is Yaman's pakad. Use it early in your alap; the listener identifies the raga immediately." },
        { id: "t_pitfall", heading: "Don't crowd phrases", body: "Beginners stuff every breath with notes. Leave gaps. A 4-second silence between phrases is *correct* in alap. Bellows can hold a quiet drone in the gap; that's still music." },
      ],
    },
    audioRefs: [
      { id: "drone_yaman", label: "Yaman drone · 90 sec" },
      { id: "demo_alap_short", label: "90-sec Yaman alap · reference" },
      { id: "demo_kan_technique", label: "Kan grace notes · examples" },
    ],
  },

  harmonium_l5_04_rep_2: {
    id: "harmonium_l5_04_rep_2",
    title: "Second bandish · semi-classical thumri in raga Khamaj",
    objectives: [
      "Memorize a 4-line thumri in Khamaj (mixed komal/shuddha Ni)",
      "Play with right-hand melody and left-hand drone shifting between Sa and Pa",
      "Add 2 kan ornaments per line, placed at emotional peaks",
    ],
    writtenContent:
      "## Thumri\n\nA semi-classical, expressive form rooted in poetry. More flexible than khayal — thumris allow modulation and emotional liberty. Khamaj is a thumri-favorite raga: shuddha Ni in ascent, komal Ni in descent, soft and romantic.\n\n## Khamaj's mixed Ni\n\nGoing up: Sa Ga Ma Pa Dha Ni Sa'. Coming down: Sa' Ni' Dha Pa Ma Ga Re Sa. The flat Ni in descent is the raga's signature — it's why Khamaj feels like sunset.\n\n## Drone shifting\n\nOn harmonium, you can shift the left-hand drone from Sa-Pa to Sa-Ma to support melodic phrases that emphasize Ma. Subtle shifts; the drone never disappears, just rotates. This is harmonium-specific accompaniment art.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Thumri teaches expression", body: "Khayal is structural; thumri is emotional. Learning a thumri trains your harmonium to *speak* — to carry feeling, not just notes. Every Hindustani musician needs thumri in their hands." },
        { id: "t_raga",    heading: "Khamaj's komal Ni in descent", body: "Sa'-Ni'-Dha-Pa coming down — Ni' is flat, Dha is full. Get this exact descent right and Khamaj appears. Get it wrong and you've played some other raga." },
        { id: "t_pitfall", heading: "Don't ornament the lyric", body: "Even abstracted to harmonium, the thumri's lyric should breathe. Don't pile ornaments on the strong syllables of the original poem; let those words land cleanly." },
      ],
    },
    audioRefs: [
      { id: "drone_khamaj", label: "Khamaj drone" },
      { id: "demo_thumri", label: "Khamaj thumri · 4 lines" },
      { id: "demo_drone_shift", label: "Sa-Pa to Sa-Ma drone shift" },
    ],
  },

  harmonium_l6_01_adv_tech: {
    id: "harmonium_l6_01_adv_tech",
    title: "Pakad development · Marwa identity phrase elaborated 5 ways",
    objectives: [
      "Identify Marwa's pakad: Re-Ga-Ma'-Dha-Sa'-Re-Sa with komal Re emphasis",
      "Generate 5 distinct elaborations of the pakad, each 4-8 beats",
      "Maintain Marwa's no-Pa rule across all 5 elaborations",
    ],
    writtenContent:
      "## Pakad = the raga's fingerprint\n\nEvery raga has a 'pakad' — a phrase that captures its identity. Mastering a raga means being able to *develop* its pakad in many ways while preserving its essence.\n\n## Marwa's pakad\n\nNi'-Re-Ga-Ma'-Dha-Sa' (with sharp Ma, no Pa). Approach komal Re from below, swell to Dha, leap to upper Sa'. The phrase is asymmetric, hopeful, twilight.\n\n## Five elaborations\n\n1. Slow vilambit: each note 3 beats, full sustain.\n2. Madhya layered: pakad + return to Sa.\n3. Drut: pakad at speed, ending with a kan.\n4. Inverted: descend through pakad first, then ascend.\n5. Augmented: pakad with intermediate notes (Ga-Re-Ga, Ma'-Ga-Ma') filled in.\n\nThis is how a raga is *lived*, not just played.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Pakad mastery = raga mastery", body: "A musician who can elaborate a pakad 20 ways across 20 minutes has internalized the raga. A musician who plays scales has not. Pakad is the difference between scholar and artist." },
        { id: "t_raga",    heading: "Marwa's no-Pa is sacred", body: "Even when elaborating, never sneak in a Pa. The temptation is huge — your fingers know Pa from other ragas. Break the habit; Marwa's character depends on the absence." },
        { id: "t_pitfall", heading: "Don't memorize all 5 — generate them", body: "Don't memorize fixed elaborations. Train your mind to generate them on the fly. In performance, you'll need fresh ones. Pakad mastery is generative, not recall." },
      ],
    },
    audioRefs: [
      { id: "drone_marwa", label: "Marwa drone · komal Re" },
      { id: "demo_pakad_5", label: "5 pakad elaborations · annotated" },
      { id: "demo_master_marwa", label: "Master harmonium Marwa · 8 min" },
    ],
  },

  harmonium_l6_02_rep_3: {
    id: "harmonium_l6_02_rep_3",
    title: "Pro-tier raga piece · semi-classical bhajan in raga Bhairavi",
    objectives: [
      "Perform a 5-minute Bhairavi bhajan with right-hand melody and left-hand harmonic drone",
      "Use kan, andolan (gentle oscillation), and dynamic bellows swells",
      "Land each line on its appropriate sam in keherwa or dadra",
    ],
    writtenContent:
      "## Bhairavi bhajan\n\nDevotional, all flat notes (komal Re Ga Dha Ni). The closing raga but also the most accessible — folk roots, emotional simplicity, perfect for harmonium.\n\n## Keherwa or dadra\n\nKeherwa = 8 beats (Dha Ge Na Ti | Na Ka Dhi Na). Dadra = 6 beats (Dha Dhi Na | Ta Ti Na). Bhajans use both. The bhajan you perform will specify; your job is to lock to the cycle.\n\n## Bellows expression\n\nA bhajan lives or dies on bellows. Each line should swell-and-recede — never flat-line. The harmonium becomes the singer's heart; you breathe with the lyric.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Bhajan is people's music", body: "Bhajans are sung in homes, temples, gatherings — by people of all musical levels. Mastering bhajan harmonium means meeting people where they are. It's both humbling and essential." },
        { id: "t_raga",    heading: "Bhairavi's all-flat sweetness", body: "All four komal notes (Re, Ga, Dha, Ni) — but Bhairavi isn't sad. It's tender, intimate, devotional. Play it with care, not weight." },
        { id: "t_pitfall", heading: "Don't classicalize the bhajan", body: "Bhajans aren't kheyals. Don't pile alap and taan onto them. Stay simple, melodic, repetitive. Devotional repetition is the form's strength." },
      ],
    },
    audioRefs: [
      { id: "drone_bhairavi", label: "Bhairavi drone" },
      { id: "tabla_keherwa", label: "Tabla keherwa · 90 bpm" },
      { id: "demo_bhajan", label: "Bhairavi bhajan · 5 min" },
    ],
  },

  harmonium_l6_03_duet: {
    id: "harmonium_l6_03_duet",
    title: "Jugalbandi prep · trading lines with a vocalist in raga Tilak Kamod",
    objectives: [
      "Play 8 bars of melody, leave 8 bars for vocalist response, repeat 4 rounds",
      "Vary phrase shapes round to round — singer must have material to mirror",
      "Maintain Tilak Kamod's distinct identity (Re-Ga-Sa, Pa-Ni-Pa)",
    ],
    writtenContent:
      "## Tilak Kamod\n\nA bright, lyrical raga — late evening, joyful, often used in light classical. Pakad: Pa-Ni-Sa'-Re-Sa', Re-Ga-Sa. Both Ni's used (komal in descent, shuddha in ascent).\n\n## Sawal-jawab structure\n\nYou (harmonium) play 8 bars: a phrase developing Tilak Kamod's pakad. Singer responds 8 bars: imitates your shape with their voice. The roles alternate. Each round should escalate slightly — start simple, build complexity.\n\n## Listening across the silence\n\nDuring the singer's 8 bars, your hands are silent (left hand may hold a soft drone). You're cataloging their phrase shape, planning your response. Bad jugalbandi is two parallel monologues.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Jugalbandi is real-time composition", body: "You and the singer co-author a phrase architecture in real time. Each phrase reshapes what comes next. Predetermined material kills jugalbandi; live response creates it." },
        { id: "t_raga",    heading: "Tilak Kamod's Re-Ga-Sa lift", body: "The phrase Re-Ga-Sa (going up to Ga, falling back to Sa) is hummable, recognizable. Open with it; the singer will know exactly where they are." },
        { id: "t_pitfall", heading: "Don't crowd the singer's 8", body: "Some harmonium players soften but keep playing during the vocalist's response. Wrong. Stop entirely (or hold drone only). Give them air. Restraint is generosity." },
      ],
    },
    audioRefs: [
      { id: "drone_tilakkamod", label: "Tilak Kamod drone" },
      { id: "vocal_partner", label: "Vocalist track for jugalbandi · 4 rounds" },
      { id: "demo_jugalbandi", label: "Harmonium-vocal jugalbandi · reference" },
    ],
  },

  harmonium_l6_04_pro_cert: {
    id: "harmonium_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute kheyal accompaniment in raga Kedar",
    objectives: [
      "Accompany (or solo) a Kedar kheyal for 5 minutes with vilambit + drut sections",
      "Hold drone, shadow vocalist, fill silences — all three accompaniment functions",
      "Demonstrate Kedar's signature Sa-Ma-Sa fall and sharp Ma' tonality",
    ],
    writtenContent:
      "## Kedar\n\nLate-evening raga, mountainous, austere. Sharp Ma' (Ma#), full notes elsewhere with komal Ni in descent. The pakad Sa-Ma'-Sa-Ma'-Pa is unmistakable — there's no other raga with this fall pattern.\n\n## The performance\n\n5 minutes split: vilambit (2 min, slow), madhya (2 min, medium), drut (1 min, fast). Across all three, you (or the vocalist you accompany) must keep Kedar's identity at the front. Drift toward Yaman or Khamaj is the easy mistake.\n\n## Pro tier expectations\n\nGraders will check: tempo discipline (no drift), raga purity (no Pa skipped, no extra notes), bellows control (no breath gaps), and emotional consistency (Kedar's specific austerity). All four boxes ticked = pass.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Pro tier is consistency under pressure", body: "Five minutes feels long when you're the one playing. Stamina, focus, raga discipline — all tested. The cert is whether you can sustain quality across the duration, not whether you can play a brilliant 30-second clip." },
        { id: "t_raga",    heading: "Kedar's sharp Ma' is identity", body: "Sharp Ma' (F#) plus full Ma in some phrases makes Kedar tricky. Memorize where each appears in the pakad. Wrong Ma = wrong raga, every time." },
        { id: "t_pitfall", heading: "Don't experiment in the cert", body: "Save unfamiliar phrases for practice. In the cert, play what you've drilled. The cert tests command of the known, not exploration of the unknown." },
      ],
    },
    audioRefs: [
      { id: "drone_kedar", label: "Kedar drone" },
      { id: "tabla_concert", label: "Tabla · vilambit + drut · 5 min" },
      { id: "demo_kedar_kheyal", label: "Reference Kedar kheyal · 5 min" },
    ],
  },

  harmonium_l7_01_advanced_1: {
    id: "harmonium_l7_01_advanced_1",
    title: "Vilambit alap in raga Todi · the asymmetric morning gravitas",
    objectives: [
      "Sustain a 4-minute Todi alap with all four chromatic colors (komal Re, Ga, Dha + sharp Ma')",
      "Use andolan (oscillation between adjacent keys) to suggest meend on harmonium",
      "Resolve every long phrase to Sa or Pa with an unhurried fall",
    ],
    writtenContent:
      "## Todi\n\nMorning raga of unmatched complexity. Komal Re, komal Ga, sharp Ma', komal Dha, full Ni. Four chromatic alterations from C major — Todi is a fundamentally other-worldly scale. Few ragas demand more from the player.\n\n## Vilambit on harmonium\n\nKeyed instruments struggle with vilambit because there's no breath to hold a note. Bellows fill that gap — slow, full, swelling. Each note must seem to extend itself; bellows pressure peaks 2 seconds *into* the note, not at attack.\n\n## Andolan substitute for meend\n\nTodi's character includes oscillating gamak. On harmonium: alternate adjacent keys rapidly with controlled bellows. komal Ga (Eb) and Re (Db) trilled at moderate speed simulates the ondulation. Not identical to vocal andolan, but musically functional.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Vilambit reveals the harmonium's soul", body: "Most harmonium playing is medium-tempo bhajan or kheyal. Vilambit is rarer and harder. It's where harmonium musicians prove they can hold space, not just fill it." },
        { id: "t_raga",    heading: "Todi's komal Dha-Pa fall", body: "The descent komal Dha → Pa is Todi's gravity. The flat sixth pulled to the fifth carries the raga's weight. Practice this single interval before attempting full alap." },
        { id: "t_pitfall", heading: "Don't speed up at minute 3", body: "Vilambit alaps tend to accelerate as the player gains confidence. Resist. The discipline is to remain slow, even slower than feels natural. Slowness is the form." },
      ],
    },
    audioRefs: [
      { id: "drone_todi", label: "Todi drone · morning tuning" },
      { id: "demo_alap_todi", label: "Todi vilambit alap · 4 min" },
      { id: "demo_andolan", label: "Harmonium andolan · komal Ga to Re" },
    ],
  },

  harmonium_l7_02_rep_4: {
    id: "harmonium_l7_02_rep_4",
    title: "Khayal exposition · Multani with full vistar across 7 minutes",
    objectives: [
      "Perform Multani: alap (3 min) + sthayi-antara (2 min) + drut taan (2 min)",
      "Avoid Re entirely (Multani omits Re ascending) for the entire 7-minute set",
      "Execute 2 bol-taans tied to bandish syllabic shape",
    ],
    writtenContent:
      "## Multani\n\nAfternoon raga. Komal Ga, sharp Ma', komal Dha, full Ni, no Re in ascent. The asymmetry between aaroha (no Re) and avaroha (full Re) is Multani's complexity — you must remember which direction you're going.\n\n## Vistar discipline\n\nVistar = expansion. Each line of the bandish becomes a launchpad for development before returning to sam. A 7-minute Multani has time for 4-5 vistar passes, each developing different phrase angles.\n\n## Bol-taan precision\n\nThe bandish lyric drives the taan rhythm. If the lyric goes 'da-ra-ni-tom' across 4 beats, the taan distributes 16 notes across that pattern — accent on the syllable downbeats. The shape of language becomes the shape of melody.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Khayal is the vocal kingdom; you visit", body: "Khayal originated for voice. On harmonium, you reproduce its forms — but always remember you're translating. Stay close to vocal phrasing, not pianistic phrasing." },
        { id: "t_raga",    heading: "Multani's no-Re ascent is the trap", body: "Habit will reach for Re going up. Train against it. Aaroha: Sa Ga Ma' Pa Dha Ni Sa'. Burn this in. Re only on the way down." },
        { id: "t_pitfall", heading: "Don't bol-taan unless you've sung it", body: "Bol-taans need the lyric internalized. Sing the bandish text aloud first; then the taan rhythm makes physical sense. Skipping vocal practice = mechanical bol-taans." },
      ],
    },
    audioRefs: [
      { id: "drone_multani", label: "Multani drone" },
      { id: "tabla_vilambit", label: "Tabla teental · 75 bpm · 7 min" },
      { id: "demo_multani_khayal", label: "Multani khayal · 7 min · master" },
    ],
  },

  harmonium_l7_03_improv_2: {
    id: "harmonium_l7_03_improv_2",
    title: "Bol-taan improvisation · 16-cycle teental in raga Jaijaiwanti",
    objectives: [
      "Improvise 16 cycles of teental in Jaijaiwanti at madhya laya",
      "Vary phrase length: short (cycles 1-4), medium (5-10), elongated (11-16)",
      "Land sam every cycle; use both komal Ni and shuddha Ni correctly",
    ],
    writtenContent:
      "## Jaijaiwanti\n\nLate-evening, complex raga. Mixed Ga (komal in descent only) and mixed Ni. Often confused with Khamaj or Bageshri — Jaijaiwanti's specific identity comes from how Ga and Ni are deployed in different phrase contexts.\n\n## 16-cycle improv on harmonium\n\nThe right hand carries melody; the left hand maintains drone or simple Sa-Pa-Sa rhythmic articulation. Across 16 cycles, vary attack speed, phrase shape, register. Don't repeat material — improvisation is generative.\n\n## Sam discipline\n\nEvery 16th beat must land. Beginners cheat by elongating notes when they're lost; this works once but gets noticed by cycle 5. Better: shorter clean phrases that land than long fuzzy ones that miss.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Improv proves you've internalized", body: "Composed material proves memory. Improvisation proves *internalization* — that the raga has become part of how you think. The two skills are different tiers of mastery." },
        { id: "t_raga",    heading: "Jaijaiwanti's Ga-trick", body: "Ascending uses shuddha Ga; descending uses komal Ga in some phrases. Memorize which: aaroha 'Re Ga Re Sa' uses shuddha; phrase 'Pa Ma Ga Re Sa' descending may use komal Ga before Re. Context-dependent." },
        { id: "t_pitfall", heading: "Don't fly without an arc", body: "Sixteen cycles is enough rope to hang yourself. Plan an arc: build, peak around cycle 12, resolve by 16. Improv without arc is noodling." },
      ],
    },
    audioRefs: [
      { id: "drone_jaijaiwanti", label: "Jaijaiwanti drone" },
      { id: "tabla_teental_med", label: "Tabla teental · 95 bpm · 16 cycles" },
      { id: "demo_improv_16", label: "16-cycle Jaijaiwanti improv · reference" },
    ],
  },

  harmonium_l8_01_style_study: {
    id: "harmonium_l8_01_style_study",
    title: "Style study · Tulsidas Borkar · the harmonium as a soloist's voice",
    objectives: [
      "Identify Tulsidas Borkar's signature jhala-style on harmonium in raga Yaman",
      "Reproduce his bellows-driven dynamic phrasing across an 8-bar passage",
      "Imitate his characteristic short kan-clusters in fast taan sections",
    ],
    writtenContent:
      "## Tulsidas Borkar\n\nThe harmonium maestro who legitimized the harmonium as a solo concert instrument. Pre-Borkar, harmoniums accompanied; Borkar made them sing. His Yaman is canonical.\n\n## What to study\n\n1. Bellows are his soul. He uses dynamic swells unlike any other harmonium player — true crescendos and decrescendos, not just on/off.\n2. Kan-cluster taans. Where most players hit clean single notes in taan, Borkar adds rapid grace-note clusters around the target — adds shimmer.\n3. His silences. He's not afraid to lift both hands and let the drone breathe alone for 2-3 seconds before resuming. Earned silence.\n\n## Imitation drill\n\nPick one Borkar Yaman recording. Spend a week imitating one 30-second passage. Slow it down 50%, copy phrase by phrase. Then back to full speed. Then perform it from memory. This is gurukul transmission via recording.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Borkar = harmonium as voice", body: "Most harmonium players reduce the instrument to a chord-plus-drone tool. Borkar showed it can carry a full kheyal solo. To play harmonium seriously, you must study him." },
        { id: "t_raga",    heading: "Yaman is Borkar's home", body: "His Yaman recordings are abundant and definitive. Pick one (Sangeeth Sammelan recordings are gold). Don't sample 5 — go deep on one for a month." },
        { id: "t_pitfall", heading: "Don't imitate badly to claim mastery", body: "Imitating Borkar at half-quality and showing off is worse than not imitating. Either go all-in (week of slow study) or pick a different style. Half-imitation is parody." },
      ],
    },
    audioRefs: [
      { id: "ref_borkar_yaman", label: "Tulsidas Borkar · Yaman · 25 min" },
      { id: "demo_kan_cluster", label: "Borkar-style kan clusters · isolated" },
      { id: "demo_bellows_arc", label: "Borkar bellows arc · 8 bars" },
    ],
  },

  harmonium_l8_02_rep_5: {
    id: "harmonium_l8_02_rep_5",
    title: "Concert kheyal · Miyan ki Todi with vilambit, drut, and tarana",
    objectives: [
      "Sustain a 12-minute Miyan ki Todi performance with full khayal arc",
      "Move through vilambit (4 min), madhya (4 min), drut (3 min), tarana (1 min)",
      "Hold pitch within 5 cents of Sa across the entire performance",
    ],
    writtenContent:
      "## Miyan ki Todi\n\nLate morning raga, attributed to Miyan Tansen — the most prestigious Todi variant. Komal Re, komal Ga, sharp Ma', komal Dha, full Ni. Heavy and devotional.\n\n## Concert structure\n\nVilambit (4 min): slow, sustained alap with andolan on komal Ga. Madhya (4 min): bandish with vistar across each line. Drut (3 min): fast taans, layakari, tihais. Tarana (1 min): syllabic close that returns to Sa with celebration.\n\n## What 12 minutes demands\n\nFingers tire. Bellows arms tire. Pitch focus drifts. The discipline is to manage stamina across the arc — don't peak too early, save force for drut, breathe deliberately during vilambit (yes, harmonium players breathe along; it steadies the bellows).",
    drills: {
      teach: [
        { id: "t_why",     heading: "12 minutes is concert format", body: "Recordings often crop to 4-5 minutes. Real concerts are 15-30 per raga. To play professionally, 12-minute performances must feel comfortable — not exhausting." },
        { id: "t_raga",    heading: "Miyan ki Todi's komal Dha", body: "Komal Dha (Ab) is the raga's emotional center. The descent Dha-Pa-Ma'-Ga-Re-Sa is iconic; spend extra weight on Dha each time. Don't skim it." },
        { id: "t_pitfall", heading: "Don't crash drut to tarana", body: "The transition drut → tarana should be marked but not abrupt. A quick tihai bridges them; don't just stop and start. Smooth transitions = mature musicianship." },
      ],
    },
    audioRefs: [
      { id: "drone_todi", label: "Miyan ki Todi drone · 12 min" },
      { id: "tabla_concert", label: "Tabla · vilambit-madhya-drut-tarana · 12 min" },
      { id: "demo_concert_full", label: "Reference Miyan ki Todi concert · 12 min" },
    ],
  },

  harmonium_l8_03_accompany: {
    id: "harmonium_l8_03_accompany",
    title: "Accompanist as ghost · supporting a thumri singer in raga Pilu",
    objectives: [
      "Hold drone for the entire 5-minute Pilu thumri with no melodic interruption",
      "Shadow the vocalist's phrases at -10dB relative to their voice",
      "Insert melodic fills only in deliberate vocal silences (3+ seconds)",
    ],
    writtenContent:
      "## Pilu\n\nMixed-mood, semi-classical raga — uses notes from multiple ragas, perfect for thumris where emotional license trumps purity. Komal Ga, komal Ni, full Ma, occasional sharp Ma' borrowed.\n\n## Ghost accompaniment\n\nThe vocalist is the lead. The audience listens to her. Your harmonium exists to hold her up — drone, shadow, fill silences. Never compete. Never even draw attention. The best accompaniment evaporates into the singer's voice.\n\n## The 3-second rule\n\nFill silences only when she's clearly resting. Less than 3 seconds and you're stepping on her micro-breaths. More than 3 seconds and you've earned a brief 4-note Pilu fill. The fill should re-anchor the raga, not introduce new material.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Accompaniment is service", body: "Your job is the vocalist's job. If she sounds great, you succeeded. If she struggles, you failed — even if you played 'correctly.' Service-mindedness is the form's heart." },
        { id: "t_raga",    heading: "Pilu's loose boundaries", body: "Pilu allows borrowing because thumri allows emotion to override theory. But your accompaniment shouldn't drift; the singer drifts, you anchor. You're the gravity." },
        { id: "t_pitfall", heading: "Don't show off in fills", body: "A 4-note fill is plenty. Don't play 12 notes in a 3-second window. The temptation is enormous; resist. Restraint reads as taste; flourish reads as ego." },
      ],
    },
    audioRefs: [
      { id: "drone_pilu", label: "Pilu drone" },
      { id: "vocal_pilu", label: "Pilu thumri vocal track · 5 min" },
      { id: "demo_accompany", label: "Harmonium accompaniment · same track" },
    ],
  },

  harmonium_l9_01_compose: {
    id: "harmonium_l9_01_compose",
    title: "Compose your own bandish · 4-line bandish in a raga of your choice",
    objectives: [
      "Compose a 4-line bandish (sthayi 2 lines + antara 2 lines) in a chosen raga",
      "Set to teental, jhaptaal, or ektaal with sam landings on every line",
      "Submit a clean 90-second performance with right-hand melody and left-hand drone",
    ],
    writtenContent:
      "## Composition is internalization made tangible\n\nUntil you compose, the raga is borrowed. Composing puts your name on a phrase. Even small compositions — 4 lines — count as authorship in this tradition. Many gurus had hundreds of bandishes credited to them, often spontaneous.\n\n## Constraints\n\nChoose a raga from this curriculum: Yaman, Bhairav, Bhimpalasi, Marwa, Kedar, Todi, Bageshri, Multani, Jaijaiwanti, Bhairavi. Compose 4 lines: sthayi (lower octave) + antara (upper octave touching Sa'). Teental (16), jhaptaal (10), or ektaal (12) — pick one.\n\n## Test\n\nThe bandish is ready when it (a) lands sam reliably, (b) has a memorable phrase, (c) stays inside the raga, (d) survives a singer trying to perform it. Sing it yourself first; if your own voice can't carry it, no one's can.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Authoring deepens listening", body: "When you compose, you become a listener with skin in the game. You start hearing structure, motion, variation in others' compositions because you've now wrestled with those problems yourself." },
        { id: "t_raga",    heading: "Borrow shapes, not melodies", body: "Listen to existing bandishes in your chosen raga. Borrow rhythmic skeletons (3+5+3+5 syllable patterns) but write fresh melodies. This is influence, not theft." },
        { id: "t_pitfall", heading: "Don't over-engineer the antara", body: "The antara is just a higher-register variation of the sthayi mood. Don't pile new harmony or modulation. The antara is contrast through register, not content." },
      ],
    },
    audioRefs: [
      { id: "drone_choice", label: "Drone bank · multiple ragas" },
      { id: "demo_student_bandishes", label: "Past student compositions · 5 examples" },
      { id: "submission_template", label: "Submission template · 90 sec" },
    ],
  },

  harmonium_l9_02_masterclass: {
    id: "harmonium_l9_02_masterclass",
    title: "Teach the bellows · transmit dynamic control to a junior student",
    objectives: [
      "Record a 5-minute video teaching bellows control to a hypothetical L4 student",
      "Demonstrate 3 progressive exercises (steady, swell, swell-with-melody)",
      "Articulate why bellows are the harmonium's emotional engine",
    ],
    writtenContent:
      "## Bellows teaching is rare\n\nMost harmonium pedagogy obsesses over fingering. Bellows are taught poorly or not at all. Yet the difference between a beginner and a master harmonium player is 80% bellows. This masterclass corrects that gap.\n\n## Teaching arc\n\n1. **Why bellows matter** (1 min) — they are breath, dynamics, and sustain in one organ.\n2. **Steady bellows** (1 min) — sustain Sa with no flutter for 30 seconds.\n3. **Swell bellows** (1 min) — pp to f to pp on a held note.\n4. **Bellows + melody** (1 min) — steady bellows under a fast right-hand taan.\n5. **Common errors** (1 min) — pump panic, breath holding, asymmetric arm tension.\n\n## Voice\n\nTeach with patience and physicality. Demo with the student watching your shoulders and arm — the muscle pattern is half the lesson. Verbal explanation alone fails for bellows; show, then explain.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Teaching reveals your bellows habits", body: "When forced to articulate what you do with the bellows, you'll discover unconscious behaviors — both good and bad. The masterclass is as much for you as the student." },
        { id: "t_raga",    heading: "Use a simple raga in demo", body: "Don't demo bellows over Todi. Use Yaman or Bhupali — uncomplicated raga material lets the student focus on bellows alone. Right tool, right job." },
        { id: "t_pitfall", heading: "Don't conflate bellows with bellows-arm strength", body: "It's not about how hard you can pump. It's about how *steadily* and how *responsively*. Strength is overrated; control is everything. Communicate this clearly." },
      ],
    },
    audioRefs: [
      { id: "exemplar_masterclass", label: "Reference masterclass · bellows teaching" },
      { id: "rubric_audio", label: "Grading rubric · what graders listen for" },
    ],
  },

  harmonium_l9_03_genius_cert: {
    id: "harmonium_l9_03_genius_cert",
    title: "Genius Certificate · solo harmonium recital across 3 ragas, 25 minutes",
    objectives: [
      "Perform a 25-minute solo recital: opening raga (10 min), main raga (12 min), Bhairavi closer (3 min)",
      "Demonstrate full khayal forms: alap, vistar, bandish, taan, tihai, tarana",
      "Maintain pitch, raga purity, and emotional arc with no major breakdowns",
    ],
    writtenContent:
      "## Solo harmonium recital\n\nUntil Borkar, this format barely existed. Today, harmonium recitals are part of the Hindustani concert circuit — and you're entering it.\n\n## Three-raga arc\n\n**Opening (10 min)** — peaceful evening raga (Yaman, Kedar, Bhimpalasi). Full alap → bandish → drut.\n\n**Main (12 min)** — heavier raga (Todi, Marwa, Darbari, Multani). Deeper alap, layered vistar, full khayal arc.\n\n**Closer (3 min)** — Bhairavi, brief and devotional. Farewell.\n\n## What graders score\n\nArtistry, not just technique. Did each raga feel distinct? Did the recital have an overall arc? Did silence work alongside sound? Could a non-musician be moved? The intangible question: do you sound like you *belong* to the tradition?",
    drills: {
      teach: [
        { id: "t_why",     heading: "Recital is your statement", body: "Everything in this curriculum points to this 25-minute artifact. A recital is your portfolio piece, your CV, your legitimacy. Treat it accordingly. Practice it 10 times before recording." },
        { id: "t_raga",    heading: "Raga contrast = recital architecture", body: "Pick ragas that contrast: peaceful + heavy + tender. A recital of three evening ragas reads as monotone. Variety at the macro level is what holds attention across 25 minutes." },
        { id: "t_pitfall", heading: "Don't optimize for the camera", body: "Play to an imaginary audience of 200 listeners. Don't perform to the lens; perform to the music. The camera will catch any compromise." },
      ],
    },
    audioRefs: [
      { id: "drone_multi", label: "Drone bank · 3-raga tuning" },
      { id: "tabla_recital", label: "Tabla · full recital backing · 25 min" },
      { id: "demo_recital", label: "Reference harmonium recital · 25 min" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MRIDANGAM · L5-L9
  // ═══════════════════════════════════════════════════════════════

  mridangam_l5_01_harmony: {
    id: "mridangam_l5_01_harmony",
    title: "Accompanying a Carnatic vocalist · supporting a kriti in raga Mohanam",
    objectives: [
      "Lock to vocalist's tempo across a 4-minute Mohanam kriti in adi tala (8 beats)",
      "Soften strokes during pallavi sections; intensify during niraval",
      "Stay invisible during the opening exposition; only enter at the kriti's start",
    ],
    writtenContent:
      "## Mridangam as accompanist\n\nIn Carnatic concerts, the mridangam is the vocalist's pulse. You don't lead; you carry. The performance arc — pallavi, anupallavi, charanam, niraval, kalpana swaras — is the singer's; your job is to translate her time into your strokes.\n\n## Mohanam\n\nPentatonic raga (Sa Re Ga Pa Dha) — the major pentatonic. Light, joyful, common in beginner kritis like 'Vatapi Ganapatim.' Adi tala (8 beats: 4+2+2 with claps and waves) frames it.\n\n## Dynamic submission\n\nWhen she sings the pallavi (the refrain), play softly — let the lyric land. When she enters niraval (improvised expansion), she may want energy from you; bring it gradually. Never crash in. Volume is communication.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Accompaniment is the deepest skill", body: "Solo mridangam shows what you can do alone; accompaniment shows whether you can listen. Senior musicians pay accompanists more than soloists for a reason — it's harder, rarer, more valuable." },
        { id: "t_raga",    heading: "Mohanam's lightness needs lighter strokes", body: "Heavy Carnatic ragas (Bhairavi, Kalyani) tolerate stronger mridangam attack. Mohanam doesn't — its lightness can be crushed by aggressive accompaniment. Match the raga's density." },
        { id: "t_pitfall", heading: "Don't enter early", body: "If the singer is doing alapana before the kriti, do not play. Sit silent. The mridangam enters at the start of the composition itself, not before. Premature entry = amateur." },
      ],
    },
    audioRefs: [
      { id: "vocal_mohanam", label: "Vocalist · Mohanam kriti · 4 min" },
      { id: "demo_accompany_mohanam", label: "Mridangam accompaniment · same kriti" },
      { id: "demo_dynamic_arc", label: "Dynamic arc · pallavi to niraval" },
    ],
  },

  mridangam_l5_02_fast: {
    id: "mridangam_l5_02_fast",
    title: "Fast korvai · Ta-Ka-Di-Mi-Ta-Ka-Jhe-Nu at 240 bpm",
    objectives: [
      "Play Ta-Ka-Di-Mi-Ta-Ka-Jhe-Nu solkattu at 240 bpm with bell-clear strokes",
      "Maintain hand independence — left side (toppi) drone, right side (valanthalai) sharp",
      "Land beat 1 of every cycle on a strong stroke (Ta or Dhin)",
    ],
    writtenContent:
      "## Solkattu = the syllables of mridangam\n\nBefore you strike, you speak. Ta-Ka-Di-Mi (the 4-stroke pulse), Ta-Ka-Jhe-Nu (the chatusra group), Tha-Dhin-Gi-Na-Tom (the standard 5). Solkattu is the language; strokes are the realization.\n\n## 240 bpm chatusra\n\n240 bpm with 4 notes per beat = 960 strokes per minute = 16 strokes per second. That's brigha (Carnatic fast) territory. Hand independence is critical: each finger has its own stroke, each side its own role.\n\n## Bell clarity\n\nFast doesn't mean blurry. Each stroke must articulate. The valanthalai (treble side) hits with the index/middle fingers in succession; the toppi (bass side) provides occasional rumble. If both sides muddy together, you're hitting too hard.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Fast comes from relaxation, not effort", body: "Beginners try to play fast by tensing. Speed actually requires looseness — your wrists must hover, fingers must rebound. Tension caps your max speed at maybe 180 bpm. Looseness opens 280+." },
        { id: "t_raga",    heading: "Solkattu first, strokes second", body: "Always speak the solkattu before playing. If your mouth can't say Ta-Ka-Di-Mi cleanly at 240, your hands won't either. The voice is the prototype." },
        { id: "t_pitfall", heading: "Don't sacrifice clarity for speed", body: "A 200 bpm clean korvai sounds faster than a 260 bpm sloppy one. Train clean at 200 first; speed up only when 200 is bell-perfect. Clarity scales; sloppiness doesn't." },
      ],
    },
    audioRefs: [
      { id: "demo_korvai_slow", label: "Ta-Ka-Di-Mi · 120 bpm · clean" },
      { id: "demo_korvai_fast", label: "Ta-Ka-Di-Mi · 240 bpm · concert" },
      { id: "demo_solkattu_voice", label: "Solkattu spoken at 240 bpm" },
    ],
  },

  mridangam_l5_03_improv_1: {
    id: "mridangam_l5_03_improv_1",
    title: "First kalpana solkattu · 16-beat extempore pattern over adi tala",
    objectives: [
      "Improvise a 16-beat solkattu pattern (2 cycles of adi tala) extempore",
      "Use only 4 syllable groups (Ta-Ka-Di-Mi, Tha-Dhin, Ta-Ka, Tom)",
      "Land beat 1 of cycle 3 (the eduppu) cleanly",
    ],
    writtenContent:
      "## Kalpana solkattu\n\n*Kalpana* = imagination. *Kalpana solkattu* = improvised rhythmic patterns. Carnatic mridangam tradition demands fluency in this — the player creates rhythmic combinations on the fly, with the same constraints as melodic improvisation in raga.\n\n## The constraint\n\n16 beats. Adi tala. 4 syllable groups: Ta-Ka-Di-Mi (4 strokes), Tha-Dhin (2), Ta-Ka (2), Tom (1 with sustain). You can use them in any order, any combination, but the total must = 16 beats and land cleanly on the next eduppu.\n\n## Mathematical play\n\n16 = 4+4+4+4 = 4+2+4+2+4 = 6+6+4 = many options. Each combination is a phrase. Practice generating 5 different 16-beat patterns — you'll find your kalpana muscles firing.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Improv is rhythmic poetry", body: "Carnatic kalpana solkattu is the rhythmic equivalent of melodic alapana. Every soloist must do it; every accompanist should be able to. It's how rhythm becomes language." },
        { id: "t_raga",    heading: "Adi tala's 4+2+2 internal structure", body: "Adi = 8 beats, organized 4+2+2. Your 16-beat phrases (2 cycles) have 4 internal divisions per cycle. Phrasing across these divisions creates layakari (rhythmic play)." },
        { id: "t_pitfall", heading: "Don't math-cheat", body: "Counting beats consciously while improvising kills flow. Internalize the cycle through years of korvai practice; then improvisation becomes feeling, not arithmetic." },
      ],
    },
    audioRefs: [
      { id: "demo_kalpana_5", label: "5 example 16-beat solkattu patterns" },
      { id: "demo_eduppu_landing", label: "Eduppu landing · clean stroke" },
      { id: "tala_loop", label: "Adi tala loop · 80 bpm · 16 cycles" },
    ],
  },

  mridangam_l5_04_rep_2: {
    id: "mridangam_l5_04_rep_2",
    title: "Second composition · accompanying a varnam in raga Kalyani",
    objectives: [
      "Accompany a Kalyani varnam (Vanajakshi structure) for 6 minutes in adi tala",
      "Match the varnam's tempo escalation: pallavi (slow) to charanam (faster)",
      "Add 1 muktayi korvai at the closure of each major section",
    ],
    writtenContent:
      "## Varnam\n\nThe most rigorous Carnatic composition form. Combines lyric, swara, and rhythm in fixed structure: pallavi → anupallavi → muktayi swaras → charanam → chittaswaras. Used as concert opener and pedagogical bedrock.\n\n## Kalyani\n\nThe Carnatic equivalent of Yaman — sharp Ma' raga, evening, peaceful. Vanajakshi is a famous Kalyani varnam. Every Carnatic student plays it.\n\n## Tempo escalation\n\nVarnams progress through tempo: ekakalam (single speed) for pallavi, irukalam (double) for muktayi, sometimes mukkalam (triple) for chittaswara. As accompanist, you must lock to each transition — the singer signals it, you commit.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Varnam = Carnatic concert backbone", body: "Most Carnatic concerts begin with a varnam. Mastering varnam accompaniment makes you employable as a concert mridangist. Skip varnams and you skip the form's foundation." },
        { id: "t_raga",    heading: "Kalyani's brightness wants clean strokes", body: "Don't muddy Kalyani with heavy bass thumps. The raga is bright, evening, slightly noble. Mridangam should sparkle — clean valanthalai strokes, judicious toppi." },
        { id: "t_pitfall", heading: "Don't anticipate tempo shifts", body: "Wait for the singer's cue (often a pause or a stretched syllable). Pre-empting the shift = failed accompaniment. Listen, then commit." },
      ],
    },
    audioRefs: [
      { id: "vocal_kalyani_varnam", label: "Vanajakshi varnam · 6 min" },
      { id: "demo_accompany_varnam", label: "Mridangam accompaniment · same" },
      { id: "demo_muktayi", label: "Muktayi korvai · closure pattern" },
    ],
  },

  mridangam_l6_01_adv_tech: {
    id: "mridangam_l6_01_adv_tech",
    title: "Nadai shifts · moving between chatusra (4) and tisra (3) inside adi tala",
    objectives: [
      "Play 2 cycles of chatusra (4 strokes/beat) then 2 cycles of tisra (3 strokes/beat)",
      "Maintain the same beat duration during the shift — only the subdivision changes",
      "Return cleanly to chatusra and land sam on cycle 5",
    ],
    writtenContent:
      "## Nadai\n\n*Nadai* = the subdivision of the beat. Adi tala has 8 beats; how you subdivide each beat is the nadai. Chatusra (4 per beat), tisra (3), khanda (5), misra (7), sankirna (9). Most concerts use chatusra and tisra; advanced players shift between them mid-phrase.\n\n## The shift\n\nThe trick: tempo doesn't change, only stroke density. From 4-per-beat to 3-per-beat means strokes get longer (slower individually) but the beat remains. Your hand must feel both subdivisions simultaneously.\n\n## Why this matters\n\nIn solo segments (tani avartanam), the mridangist demonstrates nadai shifts as core skill. The audience claps when a clean shift lands; missing it is glaring. This is concert-level layakari.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Nadai shifts are virtuosity made formal", body: "Carnatic rhythm tradition has codified hundreds of nadai patterns. Your hand must know them as your ear knows ragas. Without nadai mastery, you cannot play tani avartanam at concert level." },
        { id: "t_raga",    heading: "(no raga — rhythm is the medium)", body: "Mridangam content is rhythmic, not melodic. The raga concept doesn't apply directly, but the *taal* concept dictates everything: cycle, subdivision, phrasing." },
        { id: "t_pitfall", heading: "Don't speed up during tisra", body: "Tisra (3 per beat) feels slower because there are fewer notes. Your hand may compensate by accelerating. Don't. Beat duration must remain constant; only stroke density changes." },
      ],
    },
    audioRefs: [
      { id: "demo_nadai_shift", label: "Nadai shift chatusra → tisra · clean" },
      { id: "demo_tisra_groove", label: "Tisra alone · 4 cycles" },
      { id: "tala_loop", label: "Adi tala metronome · 90 bpm" },
    ],
  },

  mridangam_l6_02_rep_3: {
    id: "mridangam_l6_02_rep_3",
    title: "Pro-tier composition · Thodi varnam with full nadai variations",
    objectives: [
      "Accompany a Thodi varnam (Sami Ninne) across 7 minutes in rupaka (3-beat) tala",
      "Demonstrate chatusra and tisra nadai within the chittaswara section",
      "Add 1 korvai of your own composition at the varnam's closure",
    ],
    writtenContent:
      "## Thodi\n\nA heavy Carnatic raga — komal Re, komal Ga, komal Dha, sharp Ma in some phrases. The Carnatic equivalent of Hindustani Bhairavi or Asavari. Sami Ninne is the canonical Thodi varnam.\n\n## Rupaka tala\n\n3 beats per cycle: 1 (clap) + 2 (wave) = 3. Less common than adi but used for varnams with specific feel. Half the cycle of adi means twice as many sams to land.\n\n## Composing your own korvai\n\nA *korvai* is a closure pattern, usually a 3-fold tihai-like phrase that resolves on sam. For this lesson, compose one yourself: 3 repetitions of an 8-beat pattern that totals 24 beats and lands sam in rupaka. Mathematical, satisfying, signature.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Composing korvais demonstrates fluency", body: "Memorized korvais show diligence. Composed korvais show internalization. By L6, your hand should know the math of rupaka well enough to invent korvais in real time." },
        { id: "t_raga",    heading: "Thodi's heaviness wants firmer strokes", body: "Unlike Mohanam or Kalyani, Thodi tolerates and benefits from solid bass thumps. Toppi side gets more emphasis. Play the gravity; respect the raga's mood." },
        { id: "t_pitfall", heading: "Don't extend beyond the singer", body: "Some mridangists, hearing applause, extend their korvai. The singer wants to come back in. Land the korvai precisely; trust the singer to take over from sam onward." },
      ],
    },
    audioRefs: [
      { id: "vocal_thodi_varnam", label: "Sami Ninne · Thodi varnam · 7 min" },
      { id: "demo_accompany_thodi", label: "Mridangam accompaniment · with korvai" },
      { id: "demo_korvai_24", label: "24-beat korvai in rupaka · example" },
    ],
  },

  mridangam_l6_03_duet: {
    id: "mridangam_l6_03_duet",
    title: "Jugalbandi prep · trading korvais with a kanjira player in adi tala",
    objectives: [
      "Play 4 cycles of solkattu, leave 4 cycles for kanjira response, repeat 4 rounds",
      "Vary korvai shapes round to round — give kanjira fresh material",
      "Sync sam with kanjira on cycle 32 (final landing)",
    ],
    writtenContent:
      "## Mridangam-kanjira jugalbandi\n\nIn Carnatic concerts, the upapakkavadyam (secondary percussion — kanjira, ghatam, morsing) trades phrases with the lead mridangist during tani avartanam. Two-percussion dialogue is high art.\n\n## Sawal-jawab (Carnatic style)\n\nYou play 4 cycles. Kanjira responds 4 cycles, ideally mirroring your shape. The mirror need not be exact — kanjira's stroke palette differs from mridangam — but the rhythmic skeleton (accents, total duration, eduppu) must match.\n\n## Round-by-round building\n\nRound 1: simple 4-cycle phrase. Round 2: more complex layakari. Round 3: nadai shift inside the phrase. Round 4: korvai-style climax. Build complexity; don't peak in round 1.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Jugalbandi is the percussionist's stage", body: "Tani avartanam is when the percussionists shine. Without jugalbandi skill, you're a mridangist who can only accompany — never co-perform. Trade-and-respond is the soloist's gateway." },
        { id: "t_raga",    heading: "Tala is the medium, not raga", body: "Both you and the kanjira player are in adi tala. Stay locked. Do not improvise in different talas; that's a different (advanced) format. For jugalbandi, share the cycle." },
        { id: "t_pitfall", heading: "Don't dominate the dialogue", body: "If your phrases are 8 cycles long while the kanjira plays 2-cycle responses, you're monologuing. Equal cycles, equal weight. Real duet, not lead-and-follow." },
      ],
    },
    audioRefs: [
      { id: "tala_adi", label: "Adi tala · 90 bpm · 32 cycles" },
      { id: "kanjira_partner", label: "Kanjira track · 4 rounds" },
      { id: "demo_jugalbandi", label: "Mridangam-kanjira jugalbandi · reference" },
    ],
  },

  mridangam_l6_04_pro_cert: {
    id: "mridangam_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute thillana accompaniment in raga Hamsanandi",
    objectives: [
      "Accompany a Hamsanandi thillana for 5 minutes in adi tala",
      "Match the thillana's rhythmic syllable patterns (taka-dhimi, tananane) on mridangam",
      "Land each pallavi return on a distinct emphasis stroke",
    ],
    writtenContent:
      "## Thillana\n\nA Carnatic dance and concert form — primarily rhythmic, with syllabic phrases (jathi) instead of poetic lyrics. Often closes a concert. Mridangam plays a central role; the syllables become strokes.\n\n## Hamsanandi\n\nUchasta sthayi raga, ascending Sa Re Ga Ma' Dha Ni Sa', no Pa. Bright, high-register, perfect for closing energy. Kalyani-adjacent but distinct.\n\n## Pro tier listening\n\nGraders check tempo discipline (no drift across 5 minutes), stroke clarity (each one articulate), syllable matching (your strokes echo the singer's jathi), and dynamic shape (build to thillana's climactic refrain). All boxes ticked = pass.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Thillana tests mridangam-syllable lock", body: "Other forms allow rhythmic flexibility. Thillana doesn't — the singer's jathi syllables must match your strokes. It's a tight test of rhythmic accompaniment skill." },
        { id: "t_raga",    heading: "Hamsanandi's no-Pa sparkle", body: "The missing Pa makes Hamsanandi feel airy, suspended. Don't ground it with heavy toppi; play lighter overall. Match the raga's elevation." },
        { id: "t_pitfall", heading: "Don't overplay the closing nadai", body: "Thillanas often end with rapid nadai shifts. The temptation is to flourish. Resist; the singer wants a clean landing, not a percussion solo." },
      ],
    },
    audioRefs: [
      { id: "vocal_thillana", label: "Hamsanandi thillana · 5 min" },
      { id: "demo_accompany_thillana", label: "Mridangam accompaniment · same" },
      { id: "demo_jathi_match", label: "Jathi-stroke matching · examples" },
    ],
  },

  mridangam_l7_01_advanced_1: {
    id: "mridangam_l7_01_advanced_1",
    title: "Complex tihai · 5+5+5 + 4 over a 19-beat span landing on sam in misra chapu",
    objectives: [
      "Compose a tihai using 5+5+5 + 4-beat connector over 19 beats",
      "Land cleanly on sam in misra chapu (3+4 = 7-beat tala)",
      "Demonstrate the math: 19 ÷ 7 = 2 cycles + 5 beats; the +5 places the resolution",
    ],
    writtenContent:
      "## Tihai math\n\nA *tihai* is a phrase repeated 3 times. The math: phrase length × 3 + connectors must = a multiple of the tala cycle, landing on sam. In misra chapu (7), this is mathematically beautiful.\n\n## 5+5+5 + 4 over 19\n\nYour core phrase = 5 beats. Three repetitions = 15. Add a 4-beat connector → 19 total. 19 mod 7 = 5; if you start your tihai 5 beats before sam, the 19th beat lands on sam. This is real Carnatic math at performance level.\n\n## Why misra chapu\n\nMisra chapu (7 beats) is the trickiest common Carnatic tala. Tihais here are harder — the cycle is asymmetric (3+4). Mastering tihai math in misra chapu = mastering Carnatic mridangam's mathematical apex.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Tihai math is what audiences applaud", body: "When a tihai lands sam after complex math, the audience claps. Not because they did the arithmetic — because their bodies feel the resolution. Math you can't articulate, audiences can hear." },
        { id: "t_raga",    heading: "(rhythm focus)", body: "Tihais are pure tala work. No raga; rhythm is the language and tihai is the punctuation." },
        { id: "t_pitfall", heading: "Don't approximate the math", body: "If you start a tihai 1 beat off, you miss sam. Carnatic tradition does not forgive this. Calculate exactly. Better: drill the specific tihai 50 times until your hand knows the eduppu." },
      ],
    },
    audioRefs: [
      { id: "tala_misra_chapu", label: "Misra chapu · 80 bpm · 14 cycles" },
      { id: "demo_tihai_19", label: "5+5+5+4 = 19 tihai · misra chapu · clean landing" },
      { id: "demo_math_breakdown", label: "Math breakdown · spoken solkattu" },
    ],
  },

  mridangam_l7_02_rep_4: {
    id: "mridangam_l7_02_rep_4",
    title: "Ragam-tanam-pallavi accompaniment · 12-minute RTP in raga Shankarabharanam",
    objectives: [
      "Accompany a full RTP performance: ragam (3 min, no tala), tanam (4 min), pallavi (5 min in misra chapu)",
      "Stay silent during ragam (no tala); enter for tanam with subtle pulse strokes",
      "Drive the pallavi cycle with full korvai support and clean trikalam (3-tempo) shifts",
    ],
    writtenContent:
      "## Ragam-tanam-pallavi (RTP)\n\nThe Carnatic concert centerpiece. Three sections of escalating rhythmic discipline. Ragam (free time, melodic exposition), tanam (pulsed, no fixed tala), pallavi (set in tala, single line elaborated extensively).\n\n## Shankarabharanam\n\nThe Carnatic equivalent of major scale (full Ma, no alterations). Bright, regal, often used for RTPs. Tyagaraja's 'Endaro Mahanubhavulu' is in this raga.\n\n## Trikalam\n\nIn pallavi, the singer cycles the line at 3 speeds: ekakalam (1x), irukalam (2x), mukkalam (3x). Mridangam must match each — not double the strokes randomly, but maintain proportional density. Trikalam transitions are the pallavi's climactic moments.",
    drills: {
      teach: [
        { id: "t_why",     heading: "RTP is Carnatic at its highest", body: "If a Carnatic concert is a meal, RTP is the main course. Mastering RTP accompaniment = mastering Carnatic mridangam's full breadth. There's no harder accompaniment context." },
        { id: "t_raga",    heading: "Shankarabharanam's brightness", body: "It's the major-scale raga — bright, declarative, optimistic. Mridangam strokes should feel sturdy, not heavy. Match the raga's confident clarity." },
        { id: "t_pitfall", heading: "Don't play during ragam", body: "Ragam (alapana) is unmetered. No mridangam. Sit still. Many beginner mridangists itch to fill silence; resist. Your entry is at tanam, not before." },
      ],
    },
    audioRefs: [
      { id: "vocal_rtp", label: "Shankarabharanam RTP · 12 min" },
      { id: "demo_accompany_rtp", label: "Mridangam accompaniment · same RTP" },
      { id: "demo_trikalam", label: "Trikalam shift · 1x → 2x → 3x" },
    ],
  },

  mridangam_l7_03_improv_2: {
    id: "mridangam_l7_03_improv_2",
    title: "Niraval improvisation · 16-cycle solo in misra chapu, your own korvai",
    objectives: [
      "Improvise 16 cycles of misra chapu (112 beats) as a solo segment",
      "Vary nadai across the 16 cycles: chatusra → tisra → khanda → misra → return",
      "Compose and land 1 climactic korvai across cycles 13-16",
    ],
    writtenContent:
      "## Niraval (mridangam style)\n\nNiraval in vocal music = improvising on a chosen lyric line. For mridangam, niraval becomes solo improvisation in tala — your own kalpana solkattu, expanded into a full segment.\n\n## 16 cycles, 4 nadai stations\n\nCycles 1-4: chatusra (4 per beat). Cycles 5-8: tisra (3 per beat). Cycles 9-12: khanda (5 per beat). Cycles 13-16: misra (7 per beat) — the home nadai. Each station gets airtime; transitions are clean.\n\n## Climactic korvai\n\nCycles 13-16 climax with a composed korvai (your own). It must use misra nadai, build from short to long phrases, and land sam on the final beat of cycle 16. The math is yours to invent.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Solo segment is your moment", body: "Tani avartanam (the percussion solo) is when the mridangist is alone with the tala and the audience. There's no singer to lean on. You must hold attention with rhythm alone — no melody, no harmony, just stroke." },
        { id: "t_raga",    heading: "(rhythm focus)", body: "No raga in tani avartanam. The mridangist works only in the tala domain. Mathematical play, nadai variation, korvai precision — these are the materials." },
        { id: "t_pitfall", heading: "Don't change tempo across nadai shifts", body: "When shifting from chatusra to tisra, the underlying beat stays constant. Stroke density changes; tempo does not. If your tempo drifts during shift, the tala collapses. Lock the beat first, then vary subdivision." },
      ],
    },
    audioRefs: [
      { id: "tala_misra_chapu", label: "Misra chapu · 80 bpm · 16 cycles" },
      { id: "demo_solo_16", label: "16-cycle solo · 4-nadai · reference" },
      { id: "demo_climactic_korvai", label: "Climactic korvai · cycles 13-16" },
    ],
  },

  mridangam_l8_01_style_study: {
    id: "mridangam_l8_01_style_study",
    title: "Style study · Palghat Mani Iyer · the modern mridangam grammar",
    objectives: [
      "Identify Palghat Mani Iyer's signature gumki (bass slide) technique by ear",
      "Reproduce his characteristic '5-stroke phrase' pattern (Tha-Dhin-Gi-Na-Tom)",
      "Imitate his clarity-over-power approach in a 90-second tani segment",
    ],
    writtenContent:
      "## Palghat Mani Iyer\n\nThe defining mridangist of the 20th century. Pre-Mani Iyer, mridangam was rougher, less articulated. He brought clarity, sophistication, and a mathematical refinement that defined modern Carnatic percussion. Every contemporary mridangist studies him.\n\n## What to study\n\n1. **Gumki** — his bass-side hand pressure to produce a sliding pitch. Iconic; few players match its expressive precision.\n2. **5-stroke phrase fluency** — Tha-Dhin-Gi-Na-Tom in countless variations. The phrase is everywhere in his playing.\n3. **Restraint** — he didn't overplay. His tani avartanams are full of silence and small phrases. Power was never his goal; clarity was.\n\n## Imitation drill\n\nPick a Palghat Mani Iyer tani avartanam recording (many on YouTube via heritage labels). Spend a week imitating one 30-second segment — slow it down, study the strokes, then play at full speed.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Mani Iyer is the gold standard", body: "Carnatic mridangam pedagogy explicitly references him. To skip his study is to skip the modern grammar of the instrument. Every senior mridangist will reference him in masterclasses." },
        { id: "t_raga",    heading: "His tonal palette is rich", body: "Mani Iyer played as if the mridangam had infinite shades. Use the gumki, vary stroke pressure, exploit the toppi for warm bass — these are not optional embellishments but core grammar." },
        { id: "t_pitfall", heading: "Don't play loud thinking it's masterful", body: "Mani Iyer played at moderate volume; clarity was his weapon. Loud playing is amateurish; quiet, articulate playing is mastery. Study his volume control." },
      ],
    },
    audioRefs: [
      { id: "ref_mani_iyer_tani", label: "Palghat Mani Iyer · tani avartanam · 15 min" },
      { id: "demo_gumki",          label: "Gumki technique · isolated" },
      { id: "demo_5stroke_phrase", label: "Tha-Dhin-Gi-Na-Tom · variations" },
    ],
  },

  mridangam_l8_02_rep_5: {
    id: "mridangam_l8_02_rep_5",
    title: "Concert pallavi · 12-minute Kambhoji pallavi with full tani avartanam",
    objectives: [
      "Accompany a Kambhoji pallavi (5 min) followed by your own tani (7 min) in adi tala",
      "Demonstrate trikalam (3-tempo) treatment of the pallavi line",
      "Execute a full tani: korvais, nadai variations, climactic korvai, sam landing",
    ],
    writtenContent:
      "## Pallavi + tani\n\nThe pallavi is the singer's. The tani is yours. After the singer's pallavi exposition, she gestures to you — your solo begins. 7 minutes alone with the tala. This is concert mridangam at full responsibility.\n\n## Kambhoji\n\nA major-scale-related Carnatic raga (Sa Re Ga Pa Dha Sa', with komal Ni in descent in some phrases). Royal, expansive, common in pallavi compositions.\n\n## Tani structure\n\n7 minutes ≈ 56 cycles of adi (8 beats). Plan: introduction (4 cycles, simple), build (12 cycles, complexity), nadai variations (16 cycles, 4 nadai stations), climax (16 cycles, escalating korvais), final korvai (8 cycles, mathematical resolution to sam). Architecture matters; don't improvise the architecture itself.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Tani is your concert moment", body: "When you play tani, you alone hold the audience. No singer to share the spotlight. 7 minutes of you. The pressure is real and earns you status — successful tanis make careers." },
        { id: "t_raga",    heading: "Kambhoji's regal mid-range", body: "Kambhoji loves the middle register. Your accompaniment should feel grounded, dignified — not overly bright (Kalyani) or heavy (Thodi). Mid-tone, mid-volume, mid-density." },
        { id: "t_pitfall", heading: "Don't blow your peak too early", body: "A 7-minute tani peaks in cycles 40-48, not cycles 8-16. Save your fastest, most complex korvais for the final third. Pacing is the art." },
      ],
    },
    audioRefs: [
      { id: "vocal_kambhoji_pallavi", label: "Kambhoji pallavi · 5 min" },
      { id: "tala_adi_concert",       label: "Adi tala · 80 bpm · 7-min tani backing" },
      { id: "demo_full_tani",          label: "Full pallavi + tani · 12 min · reference" },
    ],
  },

  mridangam_l8_03_accompany: {
    id: "mridangam_l8_03_accompany",
    title: "Lead in kutcheri · driving the laya across an entire concert set",
    objectives: [
      "Accompany a full 30-minute kutcheri set (3 kritis + RTP)",
      "Adjust dynamic and stroke density per piece without breaking flow",
      "Cue the upapakkavadyam (kanjira/ghatam) entries during tani avartanam",
    ],
    writtenContent:
      "## Kutcheri\n\nA Carnatic concert. Typically: varnam, 2-3 kritis, RTP, thillana, mangalam. As lead percussionist (mridangist), you're the laya backbone for 30+ minutes. Every piece, every transition, every dynamic level depends on your stroke.\n\n## Pacing across the set\n\nVarnam: bright, opening energy. Kritis: variable mood-matched. RTP: maximum complexity, your tani is the centerpiece. Thillana: rhythmic celebration. Mangalam: gentle close. Your stroke language adapts to each.\n\n## Cueing the others\n\nIn tani avartanam, you (mridangam) lead. Kanjira, ghatam, morsing follow your phrase initiations. A clear korvai-ending signals 'your turn'; a strong stroke cluster pulls them back in. The communication is musical — no verbal cues.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Kutcheri is the form's full test", body: "Single-piece accompaniment is a sprint. Kutcheri is a marathon. You sustain attention, energy, and discipline across 30+ minutes — that's what working concert mridangists do every weekend." },
        { id: "t_raga",    heading: "Match the raga to your stroke palette", body: "Mohanam wants light; Thodi wants weight; Kalyani wants brightness; Kambhoji wants dignity. Your stroke choice signals raga awareness — uniformity across ragas signals indifference." },
        { id: "t_pitfall", heading: "Don't dominate the upapakkavadyam", body: "In tani, give them clear space. If kanjira's solo cycle is 4 cycles, lay out for those 4. Returning early = stepping on their feature. Be a generous lead." },
      ],
    },
    audioRefs: [
      { id: "kutcheri_setlist", label: "Kutcheri setlist · 30 min · 5 pieces" },
      { id: "demo_full_kutcheri", label: "Mridangam through full kutcheri · reference" },
      { id: "demo_cueing", label: "Tani cueing · examples" },
    ],
  },

  mridangam_l9_01_compose: {
    id: "mridangam_l9_01_compose",
    title: "Compose your own korvai cycle · multi-part architecture for misra chapu",
    objectives: [
      "Compose a multi-part korvai for misra chapu (7 beats): 3 sections totaling 49 beats (7 cycles)",
      "Section 1 in chatusra, section 2 in tisra, section 3 climactic with own nadai",
      "Submit a clean recording of the korvai with metronome backing",
    ],
    writtenContent:
      "## Korvai composition\n\nMost mridangists memorize korvais. Composing your own is a gurukul-level achievement — it means you've internalized the math of laya and can generate new patterns.\n\n## Multi-part architecture\n\nYour korvai has 3 sections, each 7 cycles long, totaling 49 beats. Section 1 (chatusra, 4-stroke base), section 2 (tisra, 3-stroke), section 3 (your choice — khanda, misra, or hybrid). Total: 49 beats lands on cycle 7 sam in misra chapu.\n\n## Test\n\nThe korvai is ready when (a) it lands sam reliably, (b) the math survives a slow walk-through, (c) it's musically interesting (not just mathematically clean — phrases must feel rhythmic, not mechanical), (d) other mridangists can recognize and reproduce its skeleton.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Composing korvais is rhythmic poetry", body: "Just as melodic composers write bandishes, percussionists compose korvais. It's the rhythm tradition's authorship. Your name attaches to the pattern; future students may learn it." },
        { id: "t_raga",    heading: "(rhythm focus)", body: "Korvai composition is rhythmic. No raga involvement; the medium is tala and stroke. Music in a different dimension." },
        { id: "t_pitfall", heading: "Don't optimize math over music", body: "A korvai can be mathematically clean but musically dull. Test whether you'd want to *hear* this korvai if someone else played it. If not, revise. Music wins over math." },
      ],
    },
    audioRefs: [
      { id: "tala_misra_chapu", label: "Misra chapu metronome · 80 bpm" },
      { id: "demo_student_korvais", label: "Past student korvai compositions · 5 examples" },
      { id: "submission_template", label: "Submission template · 49-beat korvai" },
    ],
  },

  mridangam_l9_02_masterclass: {
    id: "mridangam_l9_02_masterclass",
    title: "Teach the gumki · transmit bass-slide technique to a junior student",
    objectives: [
      "Record a 5-minute video teaching gumki technique to a hypothetical L4 student",
      "Demonstrate 3 progressive exercises (static pressure, slow slide, applied in phrase)",
      "Articulate the gumki's role in mridangam expression, not just mechanics",
    ],
    writtenContent:
      "## Gumki teaching\n\nThe gumki is mridangam's most expressive technique. Bass-side hand pressure produces a sliding pitch — like a mridangam meend. Few teachers articulate it well; most students learn by imitation alone. This masterclass closes that gap.\n\n## Teaching arc\n\n1. **Why gumki matters** (1 min) — it's the bass voice's expressive vocabulary.\n2. **Static pressure** (1 min) — feel pitch change with palm pressure on the toppi.\n3. **Slow slide** (1 min) — slide pressure during a sustained bass stroke.\n4. **In phrase** (1 min) — apply gumki to a Tha-Dhin-Gi-Na-Tom phrase.\n5. **Common errors** (1 min) — over-pressing, under-pressing, wrong palm angle.\n\n## Voice\n\nDemonstrate physically. The student watches your hand; the lesson is half visual. Verbal alone is insufficient for gumki.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Teaching gumki forces articulation", body: "When you teach, you must explain what your hand does unconsciously. The articulation deepens your own gumki — a gift to yourself disguised as a service to the student." },
        { id: "t_raga",    heading: "Gumki is musical, not mechanical", body: "Don't teach gumki as a finger trick. Teach it as the bass voice's expressive grammar. Connect it to specific phrasings, specific moments where gumki adds weight." },
        { id: "t_pitfall", heading: "Don't show off complex gumki uses", body: "L4 students need basic gumki. Don't demo concert-grade Mani Iyer gumki — frustrating and irrelevant. Meet them at their level." },
      ],
    },
    audioRefs: [
      { id: "exemplar_masterclass", label: "Reference masterclass · gumki teaching" },
      { id: "rubric_audio",          label: "Grading rubric · what graders listen for" },
    ],
  },

  mridangam_l9_03_genius_cert: {
    id: "mridangam_l9_03_genius_cert",
    title: "Genius Certificate · full kutcheri set with extended tani avartanam",
    objectives: [
      "Lead a 25-minute kutcheri excerpt: varnam (5) + kriti (7) + RTP with full tani (13)",
      "Demonstrate all major mridangam grammar: gumki, nadai shifts, korvais, trikalam",
      "Maintain laya, stroke clarity, and emotional pacing across the full duration",
    ],
    writtenContent:
      "## Genius tier kutcheri\n\nA full concert excerpt at concert quality. 25 minutes of mridangam — every form (varnam, kriti, RTP), every technique (gumki, nadai, korvai), every dynamic (whisper to thunder), every transition (vocalist's cues, your cues).\n\n## What 25 minutes demands\n\nStamina (your hand fatigue is real), focus (attention drifts after 15 min for amateurs), pacing (peak in tani, not earlier), tradition-aware musicality (every choice should feel rooted in Carnatic grammar). And the intangible: do you sound like a *mridangist* — or a percussionist who plays mridangam?\n\n## Submission\n\nRecord a clean 25-minute take, ideally with a vocalist if available (otherwise solo with tanpura). Submit raw — graders want unedited evidence of stamina.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Genius tier means concert-ready", body: "After this lesson, you can be hired for a concert. The cert is the form's seal: this player belongs on stage. It's earned, not awarded — and it's the curriculum's culmination." },
        { id: "t_raga",    heading: "Match raga to phase", body: "Open with a bright raga (Mohanam, Hamsadhwani). Mid-set: a deeper raga (Bhairavi, Kalyani). RTP: a substantial raga (Shankarabharanam, Kambhoji). Variety holds attention." },
        { id: "t_pitfall", heading: "Don't burn out at the kriti", body: "Beginners overplay during kriti accompaniment, leaving nothing for tani. Conserve. The tani is your peak; bring power then, not before." },
      ],
    },
    audioRefs: [
      { id: "vocal_full_set", label: "Vocalist · varnam + kriti + RTP · 25 min" },
      { id: "tala_concert_loop", label: "Tala backing · 25-min concert" },
      { id: "demo_full_kutcheri_master", label: "Master kutcheri excerpt · 25 min · reference" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // VEENA · L5-L9
  // ═══════════════════════════════════════════════════════════════

  veena_l5_01_harmony: {
    id: "veena_l5_01_harmony",
    title: "Tanpura-veena lock · accompanying a vocalist in raga Shankarabharanam",
    objectives: [
      "Tune the veena's tala (drone) strings to the tanpura's Sa-Pa with audible beating elimination",
      "Sustain a Sa-Pa drone on the tala strings while right hand sketches Shankarabharanam phrases",
      "Adjust dynamics to support, not compete with, the vocalist's lyric line",
    ],
    writtenContent:
      "## Veena's drone strings\n\nThe Saraswati veena has three or four tala strings tuned to Sa, Pa, and Sa-up. They form a drone you pluck periodically while the main strings carry melody. Your veena is its own tanpura.\n\n## Locking with an external tanpura\n\nWhen accompanying a vocalist, your tala strings must beat-match the tanpura. Listen for a 'wah-wah' beating — that's mistuning. Tighten or loosen until the beating disappears. This is the veena player's pre-concert ritual.\n\n## Shankarabharanam accompaniment\n\nYour right-hand melodic phrases sketch the raga between vocal lines. Stay in mid-register; don't go to upper Sa' unless the singer goes there first. Veena fills are 4-8 notes max, never extended phrases that compete with the singer.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Tuning is half the performance", body: "A poorly tuned veena ruins everything that follows. Spend 10 minutes pre-concert on tuning. Beat elimination is non-negotiable; better players tune to 1-cent precision." },
        { id: "t_raga",    heading: "Shankarabharanam's dignity", body: "It's the major-scale raga — bright but regal, never frivolous. Your accompaniment should feel grounded, slightly formal. Avoid over-ornamentation; let the raga breathe with weight." },
        { id: "t_pitfall", heading: "Don't out-volume the singer", body: "Veena projects. Easy to drown a vocalist if you're not careful. Stay 5-8 dB below the singer's level. Use right-hand dampening to control attack volume." },
      ],
    },
    audioRefs: [
      { id: "tanpura_shankarabharanam", label: "Tanpura · Shankarabharanam · 4 min" },
      { id: "vocal_kriti", label: "Vocalist · Shankarabharanam kriti · 5 min" },
      { id: "demo_accompany", label: "Veena accompaniment · same kriti" },
    ],
  },

  veena_l5_02_fast: {
    id: "veena_l5_02_fast",
    title: "Brigha runs · fast melodic passages in Hamsadhwani at 200 bpm",
    objectives: [
      "Play Sa-Re-Ga-Pa-Ni-Sa' brigha pattern at 200 bpm with right-hand pluck precision",
      "Coordinate left-hand fret movement with right-hand pluck — no anticipation lag",
      "Maintain pluck strength evenness — first note and 8th note equal volume",
    ],
    writtenContent:
      "## Brigha\n\nThe Carnatic equivalent of Hindustani taan — fast melodic runs across the raga. Veena brighas demand exceptional left-right hand coordination because each note requires a fret position change AND a pluck.\n\n## Hamsadhwani\n\nFive-note ascending raga: Sa Re Ga Pa Ni Sa'. No Ma, no Dha, full Ni. Bright, joyful, common in Carnatic concerts and a brigha-friendly choice.\n\n## The coordination challenge\n\nLeft hand presses the next fret BEFORE the pluck arrives. If you press as you pluck, the previous note bleeds into the new one. Practice slowly: anticipate fret movement by 50-100ms before the pluck. At 200 bpm this becomes muscle memory, not conscious timing.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Brigha tests two-hand mastery", body: "On bansuri, fingers do nearly all the work. On veena, both hands have full responsibilities — pluck + fret. Brigha accelerates this dual demand to its limit. Master brigha and your veena foundation is solid." },
        { id: "t_raga",    heading: "Hamsadhwani's no-Ma sparkle", body: "The missing 4th makes Hamsadhwani feel airy, suspended. Brighas in this raga should sparkle, not weigh down. Light pluck pressure, clear note separation." },
        { id: "t_pitfall", heading: "Don't pluck harder for fast", body: "Fast playing = lighter pluck, not heavier. Heavy pluck creates string overshoot, blurring notes. Light, precise pluck with quick rebound = cleaner brigha." },
      ],
    },
    audioRefs: [
      { id: "tanpura_hamsa", label: "Hamsadhwani drone" },
      { id: "demo_brigha_slow", label: "Hamsadhwani brigha · 100 bpm · clean" },
      { id: "demo_brigha_fast", label: "Hamsadhwani brigha · 200 bpm · concert" },
    ],
  },

  veena_l5_03_improv_1: {
    id: "veena_l5_03_improv_1",
    title: "First kalpana swara · 8-bar improvisation in raga Mayamalavagowla",
    objectives: [
      "Improvise 8 bars of kalpana swara in Mayamalavagowla over adi tala",
      "Use only Mayamalavagowla's notes (Sa, komal Re, Ga, Ma, Pa, komal Dha, Ni, Sa')",
      "Land beat 1 of cycle 3 (the eduppu) cleanly",
    ],
    writtenContent:
      "## Mayamalavagowla\n\nThe foundational Carnatic raga — every Carnatic student starts here. Komal Re, full Ga, Ma, Pa, komal Dha, full Ni. Same notes as Hindustani Bhairav. Devotional, slightly austere, perfect for early kalpana practice.\n\n## Kalpana swara\n\nSinger or instrumentalist improvises melodic phrases using sargam (sa-ri-ga-ma...) within a chosen raga. The phrases must land on a designated landing note (the eduppu) on the next sam. Veena kalpana swaras are spoken in the player's mind and realized through hand.\n\n## 8 bars in adi tala\n\nAdi = 8 beats; 8 bars = 64 beats. Plan: phrase 1 (16 beats, simple), phrase 2 (16 beats, slightly extended), phrase 3 (32 beats, climactic, returns to eduppu). The math is implicit; the music is the point.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Kalpana swara is essential Carnatic improvisation", body: "Every Carnatic concert includes kalpana swaras. Without this skill, you cannot perform Carnatic music at any serious level. It's the form's rhythmic-melodic improvisation discipline." },
        { id: "t_raga",    heading: "Mayamalavagowla's signature komal Dha", body: "The phrase Pa-Dha-Pa with komal Dha is iconic. Use it early in your kalpana swara — the listener identifies the raga immediately." },
        { id: "t_pitfall", heading: "Don't lose the eduppu", body: "Eduppu (the landing) is non-negotiable. If you're improvising and feel lost, simplify your phrases — short, clean, sam-landing phrases beat long, elaborate, miss-the-eduppu phrases." },
      ],
    },
    audioRefs: [
      { id: "tanpura_mayamalavagowla", label: "Mayamalavagowla drone" },
      { id: "tala_adi", label: "Adi tala · 90 bpm · 8 bars" },
      { id: "demo_kalpana_swara", label: "Kalpana swara · 8 bars · reference" },
    ],
  },

  veena_l5_04_rep_2: {
    id: "veena_l5_04_rep_2",
    title: "Second varnam · Bhairavi varnam in adi tala",
    objectives: [
      "Perform a Bhairavi varnam (Viribhoni structure) for 6 minutes in adi tala",
      "Demonstrate Bhairavi's mixed Ga (komal in descent) and komal Ni",
      "Apply gamaka (oscillation) to all komal notes — never play them straight",
    ],
    writtenContent:
      "## Bhairavi (Carnatic)\n\nA major Carnatic raga distinct from Hindustani Bhairavi. Komal Ri, komal Ga in descent, full Ma, full Dha (some phrases use komal Dha), komal Ni. Heavy, devotional, deeply emotional.\n\n## Viribhoni varnam\n\nThe canonical Bhairavi varnam — Carnatic students all play it. Composed by Pacchimiriam Adiyappa. Structure: pallavi → anupallavi → muktayi swara → charanam → chittaswaras (sets 1-4).\n\n## Gamaka discipline\n\nIn Carnatic, gamaka is non-negotiable on komal notes. A 'straight' komal Ri is *not* Carnatic — it must oscillate, dip below, return. The gamaka *is* the note. Practice each komal note's gamaka in isolation before applying to varnam phrases.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Varnam is veena's foundation", body: "Every senior veena player can play 5-10 varnams from memory. Varnams encode raga grammar, tala discipline, and lyric feel in one form. Skipping varnam is skipping the foundation." },
        { id: "t_raga",    heading: "Bhairavi's gravity", body: "Don't play it light. The raga demands weight — slower phrasing, longer holds, heavier gamakas. Bhairavi rewards patience; rushing it is profanation." },
        { id: "t_pitfall", heading: "Don't skip gamaka on komal Ri", body: "The most common error: playing komal Ri straight in fast passages. Even at speed, the gamaka must register. Slow it down until the gamaka happens; then speed up while preserving it." },
      ],
    },
    audioRefs: [
      { id: "tanpura_bhairavi", label: "Bhairavi (Carnatic) drone" },
      { id: "demo_varnam_full", label: "Viribhoni varnam · 6 min · full" },
      { id: "demo_gamaka_komal_ri", label: "Komal Ri gamaka · isolated" },
    ],
  },

  veena_l6_01_adv_tech: {
    id: "veena_l6_01_adv_tech",
    title: "Gamaka chains · 5 different gamakas applied to a single phrase in Kalyani",
    objectives: [
      "Identify 5 distinct gamakas (kampita, ahata, andolitam, lina, ravam)",
      "Apply each to a single Kalyani phrase: Pa-Ma'-Ga-Re-Sa",
      "Maintain phrase integrity — gamakas decorate, never replace, the underlying notes",
    ],
    writtenContent:
      "## The gamakas\n\nCarnatic theory codifies dozens of gamakas; 5 are essential:\n\n1. **Kampita** — oscillation around the note (most common).\n2. **Ahata** — sliding into the note from below.\n3. **Andolitam** — slow swing between two pitches.\n4. **Lina** — note dissolves seamlessly into the next.\n5. **Ravam** — sustained held note with subtle pulse.\n\n## On veena\n\nGamakas are produced by left-hand finger movement on the fret — pull, push, slide, oscillate. Each gamaka has a specific physical motion. Practice each in isolation before chaining.\n\n## Kalyani phrase laboratory\n\nTake Pa-Ma'-Ga-Re-Sa. Apply kampita to Ma' first. Then ahata to Ga. Then lina between Ga and Re. The same skeleton phrase becomes 5 different musical experiences. Mastering this transformation is the heart of veena artistry.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Gamakas are veena's vocabulary", body: "Western music speaks with notes; Carnatic speaks with gamakated notes. Without gamaka mastery, you play scales, not Carnatic music. Each gamaka is a word in the language." },
        { id: "t_raga",    heading: "Kalyani's sharp Ma' is gamaka-friendly", body: "Kalyani's Ma' (sharp 4th) sits well for kampita and ahata. The neighbor notes (Ga below, Pa above) make for natural gamaka pivots. Use this as your gamaka workshop." },
        { id: "t_pitfall", heading: "Don't gamak every note", body: "Even masters use straight notes sometimes — to contrast against gamaka, to mark phrase boundaries. Gamaka everything = gamaka nothing. Choose where gamaka serves musical purpose." },
      ],
    },
    audioRefs: [
      { id: "tanpura_kalyani", label: "Kalyani drone" },
      { id: "demo_5_gamakas",  label: "5 gamakas · isolated · annotated" },
      { id: "demo_phrase_5x",  label: "Same phrase · 5 different gamaka treatments" },
    ],
  },

  veena_l6_02_rep_3: {
    id: "veena_l6_02_rep_3",
    title: "Pro-tier composition · Tyagaraja kriti in raga Saveri",
    objectives: [
      "Perform Tyagaraja's 'Daridrapu' kriti in Saveri for 7 minutes",
      "Apply gamakas to all komal notes (komal Ri, komal Dha) without exception",
      "Include 4 cycles of kalpana swara following the charanam, returning to eduppu",
    ],
    writtenContent:
      "## Saveri\n\nMorning Carnatic raga. Komal Ri, full Ga, Ma, Pa, komal Dha, full Ni. Devotional, slightly somber. Tyagaraja composed many kritis here.\n\n## Daridrapu\n\nA Tyagaraja kriti expressing devotional longing. The pallavi line is famous; charanam expands the theme. Adi tala throughout.\n\n## Kalpana swaras after charanam\n\nIn concert performance, after the charanam, you may insert kalpana swaras — improvised sargam phrases that return to the eduppu. Four cycles of swaras = 32 beats of improvisation. Each cycle escalates slightly in complexity.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Tyagaraja kritis are concert staples", body: "Tyagaraja, Dikshitar, Shyama Sastri — the Carnatic Trinity. Their kritis form the canon. A veena player must have several Tyagaraja kritis ready for any concert occasion." },
        { id: "t_raga",    heading: "Saveri's morning austerity", body: "Don't play Saveri bright like Mohanam. The raga has weight, dawn-light gravity. Komal Dha especially must drag — let it ache. Match the raga's mood." },
        { id: "t_pitfall", heading: "Don't rush kalpana swara return", body: "Kalpana swaras must land back on the eduppu. If you're ahead, you're rushing. Stay with the cycle; trust the time. The audience claps when the eduppu lands cleanly." },
      ],
    },
    audioRefs: [
      { id: "tanpura_saveri", label: "Saveri drone" },
      { id: "demo_kriti_full", label: "Daridrapu kriti · 7 min" },
      { id: "demo_kalpana_after_charanam", label: "Kalpana swaras after charanam · 4 cycles" },
    ],
  },

  veena_l6_03_duet: {
    id: "veena_l6_03_duet",
    title: "Jugalbandi prep · trading lines with a violin in raga Madhyamavati",
    objectives: [
      "Trade 4-bar phrases with a violin partner across 8 rounds in Madhyamavati",
      "Vary phrase shape and gamaka emphasis round to round",
      "Land cycle 32 (the final eduppu) in unison with the violin",
    ],
    writtenContent:
      "## Veena-violin jugalbandi\n\nA classic Carnatic duet format. Two melodic instruments trade phrases, mirroring and elaborating. The violin (introduced to Carnatic by Baluswami Dikshitar in the 19th century) is veena's natural duet partner.\n\n## Madhyamavati\n\nFive-note raga: Sa Re Ma Pa Ni Sa'. Closing raga, slightly auspicious. Often used for jugalbandi because its limited note set focuses the trading on phrase shape rather than scale exploration.\n\n## Round-by-round building\n\nRound 1: simple Sa-Re-Ma-Pa exposition. Round 2: add Ni in descent. Round 3: kampita gamakas. Round 4: brigha runs. Rounds 5-8: free trading with increasing complexity. Land the final eduppu together.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Veena-violin jugalbandi is heritage", body: "Some of the finest Carnatic recordings are veena-violin duets — Lalgudi Jayaraman with various veena masters. Mastering this format puts you in conversation with that heritage." },
        { id: "t_raga",    heading: "Madhyamavati's 5-note discipline", body: "Limited notes mean every phrase variation must come from rhythm, gamaka, register — not new pitches. The constraint forces creative phrasing. Use it." },
        { id: "t_pitfall", heading: "Don't anticipate the violin", body: "Wait for their phrase to fully complete before responding. If you start before they finish, you're stepping on them. Listen, then play. Always." },
      ],
    },
    audioRefs: [
      { id: "tanpura_madhyamavati", label: "Madhyamavati drone" },
      { id: "violin_partner", label: "Violin track · 8 rounds" },
      { id: "demo_jugalbandi", label: "Veena-violin jugalbandi · reference" },
    ],
  },

  veena_l6_04_pro_cert: {
    id: "veena_l6_04_pro_cert",
    title: "Pro Certificate · 5-minute kriti performance in raga Sahana",
    objectives: [
      "Perform a Sahana kriti for 5 minutes including alapana (1 min), kriti (3 min), kalpana swara (1 min)",
      "Apply gamakas faithfully to all phrases",
      "Land all eduppus and final sam cleanly",
    ],
    writtenContent:
      "## Sahana\n\nLate-evening Carnatic raga. Komal Ga, full Ma, Pa, full Dha, komal Ni. Smooth, contemplative, suited for kriti exposition.\n\n## Performance arc\n\nAlapana (1 min, no tala): exposition of raga's contour. Kriti (3 min, in tala): composition with pallavi-anupallavi-charanam. Kalpana swara (1 min): improvised sargam landing on eduppu. The arc echoes a full concert in compressed form.\n\n## Pro tier scoring\n\nGamaka faithfulness (correct on every komal note), tala discipline (no drift), raga purity (no foreign notes), gamaka tone quality (oscillations clean, not messy), and overall feel (does it sound Carnatic, not exercise-like).",
    drills: {
      teach: [
        { id: "t_why",     heading: "5 minutes proves sustained command", body: "Until L6, your veena work has been in shorter chunks. Pro tier proves: can you hold raga, tala, and emotional arc together for 5 minutes? That's where amateur becomes professional." },
        { id: "t_raga",    heading: "Sahana's contemplative pace", body: "Don't rush. The raga is slow-evolving by nature. Even in the kriti's faster sections, maintain Sahana's introspective character. Speed without weight is wrong Sahana." },
        { id: "t_pitfall", heading: "Don't skip alapana", body: "Some students go straight to the kriti to save time. Don't. The alapana sets the raga's mood for what follows. Skipping it is skipping the form." },
      ],
    },
    audioRefs: [
      { id: "tanpura_sahana", label: "Sahana drone" },
      { id: "tala_adi", label: "Adi tala · 80 bpm" },
      { id: "demo_kriti_5min", label: "Sahana kriti performance · 5 min" },
    ],
  },

  veena_l7_01_advanced_1: {
    id: "veena_l7_01_advanced_1",
    title: "Vilambit alapana in raga Kambhoji · sustained 4-minute exposition",
    objectives: [
      "Sustain a 4-minute Kambhoji alapana with no rhythmic backing (no tala)",
      "Demonstrate Kambhoji's mixed scale: full Ni in pallavi region, komal Ni in some descent phrases",
      "Use 4 distinct gamakas across the alapana, each tied to a specific phrase",
    ],
    writtenContent:
      "## Kambhoji alapana\n\nKambhoji is one of Carnatic's grandest ragas — major-pentatonic-derived, regal, expansive. A 4-minute alapana lets you walk through the raga's full register: lower octave touch, mid-octave development, upper octave (Sa') climax, descent.\n\n## No tala\n\nAlapana is unmetered. The tanpura drones; you wander. This frees the raga from beat constraints — phrases can be 30 seconds long, silences can be 5 seconds. Time bends to the raga.\n\n## Kambhoji's scale subtlety\n\nMostly major-scale-like, but in some descent phrases (especially around komal Ni), the raga uses flat 7th. The asymmetry is the raga's signature. Get this wrong and Kambhoji becomes Shankarabharanam.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Alapana is meditation in motion", body: "Kriti is composition. Kalpana swara is rhythmic improv. Alapana is melodic improv at the deepest level — pure raga exploration. It's where Carnatic musicians prove their internalization." },
        { id: "t_raga",    heading: "Kambhoji's komal Ni in descent", body: "In phrases like Sa'-Ni'-Dha-Pa coming down, the Ni' must be flat. Otherwise the descent loses Kambhoji's character. Memorize this asymmetric rule; let it guide every descent." },
        { id: "t_pitfall", heading: "Don't rush to upper Sa'", body: "Beginners arrive at Sa' in 30 seconds. In 4-minute alapana, you should reach Sa' around minute 2-3. The build is the music; rushing collapses the form." },
      ],
    },
    audioRefs: [
      { id: "tanpura_kambhoji", label: "Kambhoji drone · 4 min" },
      { id: "demo_alapana", label: "Kambhoji alapana · 4 min · master" },
      { id: "demo_descent_komal_ni", label: "Komal Ni descent · isolated phrases" },
    ],
  },

  veena_l7_02_rep_4: {
    id: "veena_l7_02_rep_4",
    title: "Ragam-tanam-pallavi · full 12-minute RTP in raga Reetigowla",
    objectives: [
      "Perform a complete Reetigowla RTP: ragam (3 min), tanam (4 min), pallavi (5 min)",
      "Stay in raga across all sections, demonstrating Reetigowla's mixed-Ga character",
      "Execute trikalam (3 tempos) in the pallavi section",
    ],
    writtenContent:
      "## Reetigowla\n\nA mid-evening Carnatic raga. Mixed Ga (full in some phrases, komal in others), full Ma, Pa, full Dha, komal Ni. Subtle, complex, beloved by senior musicians.\n\n## RTP structure\n\n**Ragam (3 min)**: alapana — unmetered, free. **Tanam (4 min)**: pulsed but not in fixed tala. Veena's tana is plucked rhythmically, simulating sitar tanam. **Pallavi (5 min)**: a single line in fixed tala, elaborated through trikalam.\n\n## Trikalam discipline\n\nThe pallavi line is sung at 1x, 2x, 3x speed. Each speed transition is announced by a clear cycle marker. As soloist, you must internalize the line so deeply that any speed feels natural — no fumbling at the tempo shift.",
    drills: {
      teach: [
        { id: "t_why",     heading: "RTP is Carnatic's apex form", body: "If kutcheri is the meal, RTP is the centerpiece. To play RTP at concert quality is to be a senior musician. Mastery of RTP = mastery of the whole tradition." },
        { id: "t_raga",    heading: "Reetigowla's mixed Ga", body: "Some phrases use full Ga; others (especially descents) use komal Ga. There's no shortcut — memorize the phrases, not just the scale. Reetigowla rewards exact phrase knowledge." },
        { id: "t_pitfall", heading: "Don't play tala during ragam", body: "Ragam is unmetered. No tala. Sit with the tanpura alone. The shift to tanam introduces pulse; only at pallavi does fixed tala enter. Respect the structural progression." },
      ],
    },
    audioRefs: [
      { id: "tanpura_reetigowla", label: "Reetigowla drone" },
      { id: "tala_adi_long", label: "Adi tala · 75 bpm · 5 min" },
      { id: "demo_rtp_full", label: "Reetigowla RTP · 12 min · master" },
    ],
  },

  veena_l7_03_improv_2: {
    id: "veena_l7_03_improv_2",
    title: "Niraval improvisation · 16-cycle expansion of a kriti line in raga Begada",
    objectives: [
      "Choose a kriti line in Begada; perform niraval over 16 cycles of adi tala",
      "Vary phrase length: cycles 1-4 short, 5-10 medium, 11-16 elongated",
      "Land the kriti line on eduppu at every cycle without exception",
    ],
    writtenContent:
      "## Niraval\n\nThe singer (or instrumentalist) takes a single line of a kriti and improvises around it — different gamakas, register variations, phrasing — while keeping the syllabic structure intact. The lyric stays; the melody rotates.\n\n## Begada\n\nMid-evening Carnatic raga. Mixed Ni (full ascending, komal descending in some phrases), gamaka-rich. Famous for niraval — the raga rewards melodic exploration.\n\n## 16-cycle architecture\n\nCycles 1-4: state the line straight. Cycles 5-10: small variations — shift gamaka emphasis, change register. Cycles 11-16: extended variations with brigha runs, climactic shape. Always return to the eduppu (the line's natural landing).",
    drills: {
      teach: [
        { id: "t_why",     heading: "Niraval is melodic improv with constraint", body: "Free improv is easy; niraval is hard. You must vary the melody while preserving the line's identity. The constraint forces creative phrasing — every variation must respect the source." },
        { id: "t_raga",    heading: "Begada's gamaka density", body: "Begada loves heavy gamakas. Use kampita generously on Ga and Ni. Andolitam works on Pa-Dha. The raga's character is its ornamentation; play it accordingly." },
        { id: "t_pitfall", heading: "Don't drift from the line", body: "Niraval keeps the original line's syllabic shape. If your variations stretch the syllables (extra notes, missing notes), you've broken niraval. The form requires line preservation under transformation." },
      ],
    },
    audioRefs: [
      { id: "tanpura_begada", label: "Begada drone" },
      { id: "tala_adi", label: "Adi tala · 85 bpm · 16 cycles" },
      { id: "demo_niraval_16", label: "Niraval over Begada line · 16 cycles" },
    ],
  },

  veena_l8_01_style_study: {
    id: "veena_l8_01_style_study",
    title: "Style study · Veena Doreswamy Iyengar · the Mysore school's lyrical voice",
    objectives: [
      "Identify Doreswamy Iyengar's signature kampita-heavy style in raga Bilahari by ear",
      "Reproduce his right-hand pluck technique with low attack and long sustain",
      "Imitate his characteristic 'floating' alapana style — sparse but long-held notes",
    ],
    writtenContent:
      "## Veena Doreswamy Iyengar\n\nMaestro of the Mysore veena school. Where Madras school veena is more rhythmic and forceful, Mysore is lyrical and contemplative. Doreswamy Iyengar's recordings define this lyricism.\n\n## What to study\n\n1. **Pluck technique** — soft attack, long sustain. He plucks lightly, lets the string ring, applies gamaka through the ring. Heavy pluck breaks his style.\n2. **Sparse phrasing** — fewer notes, longer holds. His alapanas use silence as much as sound.\n3. **Kampita depth** — his oscillations dig deeper than most, with slow swing speed. The note breathes.\n\n## Imitation drill\n\nPick a Doreswamy Iyengar Bilahari recording. Spend a week imitating one 30-second alapana phrase — slow it down, copy the pluck, copy the gamaka, copy the silence. The Mysore school enters your hand through this slow imitation.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Schools shape style", body: "Carnatic veena has multiple stylistic schools (Mysore, Madras, Tanjore, Andhra). Each player must know their lineage. Studying Doreswamy Iyengar = entering the Mysore lineage." },
        { id: "t_raga",    heading: "Bilahari's brightness through Mysore lens", body: "Bilahari is bright, joyful — most schools play it bright. Doreswamy Iyengar plays it with Mysore lyricism: still bright, but slower, more breathing. Lyrical Bilahari is his." },
        { id: "t_pitfall", heading: "Don't import other schools' habits", body: "If you've trained Madras style, your default pluck is firmer. Imitating Doreswamy Iyengar means changing your pluck — really changing it, not approximating. Old habits resist; train against them." },
      ],
    },
    audioRefs: [
      { id: "ref_doreswamy_bilahari", label: "Doreswamy Iyengar · Bilahari · 30 min" },
      { id: "demo_pluck_soft", label: "Soft pluck · long sustain · isolated" },
      { id: "demo_kampita_deep", label: "Deep kampita · Mysore style · isolated" },
    ],
  },

  veena_l8_02_rep_5: {
    id: "veena_l8_02_rep_5",
    title: "Concert pallavi · 12-minute RTP in raga Karaharapriya with full gamaka treatment",
    objectives: [
      "Sustain a 12-minute Karaharapriya RTP with full alapana, tanam, pallavi sections",
      "Apply gamakas faithfully to all komal notes (komal Ga, komal Ni)",
      "Demonstrate trikalam in pallavi section with clean tempo transitions",
    ],
    writtenContent:
      "## Karaharapriya\n\nA major Carnatic raga: Sa Re komal Ga Ma Pa Dha komal Ni Sa'. Equivalent to dorian mode. Substantial, used for full RTPs by senior musicians.\n\n## Concert RTP\n\n12 minutes, full structure. Alapana (4 min) — wander the raga. Tanam (4 min) — rhythmic but no fixed tala. Pallavi (4 min) — fixed in tala, with trikalam treatment. The full Carnatic apex form.\n\n## Gamaka faithfulness\n\nIn Karaharapriya, the komal Ga and komal Ni are gamakated heavily. Straight komal Ga is *wrong* Karaharapriya. Even in fast brigha sections, the gamaka must register — slow down if needed to preserve it.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Concert RTP is the form's full body", body: "All your veena training points here. RTP performance with concert duration and quality = senior musicianship. The cert recognizes this transition." },
        { id: "t_raga",    heading: "Karaharapriya's depth", body: "It's a heavy raga, suited for long form. Don't play it like Hamsadhwani (light, joyful). Match the raga's gravity — slower phrasing, deeper gamakas, heavier landings." },
        { id: "t_pitfall", heading: "Don't sacrifice gamaka for speed", body: "In drut sections of pallavi, the temptation is to drop gamakas to maintain speed. Wrong. Slow your tempo if necessary; never play straight komal notes in Karaharapriya." },
      ],
    },
    audioRefs: [
      { id: "tanpura_karaharapriya", label: "Karaharapriya drone · 12 min" },
      { id: "tala_concert", label: "Adi tala · 75 bpm · concert tempo" },
      { id: "demo_rtp_concert", label: "Karaharapriya RTP · 12 min · master" },
    ],
  },

  veena_l8_03_accompany: {
    id: "veena_l8_03_accompany",
    title: "Lead in jugalbandi · steering a veena-flute duet in raga Hindolam",
    objectives: [
      "Lead a 6-minute veena-flute duet in Hindolam (5-note raga)",
      "Initiate phrase architectures; let flute respond and elaborate",
      "Cue dynamic shifts and sectional transitions through phrase shape",
    ],
    writtenContent:
      "## Hindolam\n\nFive-note Carnatic raga: Sa komal Ga Ma komal Dha komal Ni. Heavy, dark, late-night. The Carnatic equivalent of Hindustani Malkauns.\n\n## Leading vs accompanying\n\nIn jugalbandi, one player is nominally the lead — they initiate phrase architectures, set tempo, signal dynamic shifts. The other responds and elaborates. As lead, you carry the form's structure.\n\n## Phrase architecture cues\n\nA simple 4-note phrase in low register signals 'we're in introductory mode.' A high-register brigha signals 'energy up.' A long held note signals 'pause and breathe.' Your phrase shapes are the conducting; the flute reads them.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Leading is nuanced authority", body: "The lead doesn't dominate — they architect. The flute should feel guided but free. If you're forceful, you've over-led. If you're invisible, you've under-led. The middle path is structural cuing through phrase shape." },
        { id: "t_raga",    heading: "Hindolam's heaviness", body: "Don't play Hindolam light. Komal Ga, komal Dha, komal Ni — three flat colors. The raga drags, mourns slightly. Match this in your tempo and gamaka choices." },
        { id: "t_pitfall", heading: "Don't over-lead", body: "If the flute can never elaborate freely because your phrases are too dense, you've smothered them. Leave space. Lead by example, not by domination. Pull back to let them shine." },
      ],
    },
    audioRefs: [
      { id: "tanpura_hindolam", label: "Hindolam drone" },
      { id: "flute_partner", label: "Flute (bansuri) partner track · 6 min" },
      { id: "demo_jugalbandi_lead", label: "Veena-flute duet · veena leading" },
    ],
  },

  veena_l9_01_compose: {
    id: "veena_l9_01_compose",
    title: "Compose your own kriti · 3-section composition in a raga of your choice",
    objectives: [
      "Compose a 3-section kriti (pallavi + anupallavi + charanam) in chosen raga",
      "Set to a chosen tala (adi, rupaka, or misra chapu); land sam every line",
      "Submit a clean 90-second performance with tanpura and tala backing",
    ],
    writtenContent:
      "## Kriti composition\n\nThe Carnatic Trinity (Tyagaraja, Dikshitar, Shyama Sastri) composed thousands of kritis. Composing even one — at student level, with care — is participation in that lineage.\n\n## Constraints\n\nChoose a raga from this curriculum: Mohanam, Kalyani, Bhairavi, Sahana, Saveri, Reetigowla, Begada, Karaharapriya, Hindolam, Madhyamavati. Compose 3 sections: pallavi (refrain), anupallavi (bridge), charanam (verse). Choose a tala. Each line lands sam.\n\n## Test\n\nThe kriti is ready when (a) it lands sam reliably, (b) the pallavi sticks on first listen, (c) it stays inside the raga, (d) gamaka opportunities are clear (a kriti without gamaka points is a weak kriti). Play it for another musician; if they can hum the pallavi back, you've composed.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Composing kritis = lineage participation", body: "The Trinity composed because they had to — devotion overflowed into music. Your kriti, however small, joins that practice. Composition is a humility, not a vanity." },
        { id: "t_raga",    heading: "Don't pick an unfamiliar raga", body: "Compose in a raga you've performed extensively in this curriculum. Composing in unfamiliar territory produces weak compositions. Deep familiarity = strong source material." },
        { id: "t_pitfall", heading: "Don't over-engineer the charanam", body: "The charanam is a single section — not three sub-sections. Keep it focused. Many students try to make the charanam too elaborate; simplicity is mastery." },
      ],
    },
    audioRefs: [
      { id: "tanpura_choice", label: "Drone bank · multiple ragas" },
      { id: "demo_student_kritis", label: "Past student kriti compositions · 5 examples" },
      { id: "submission_template", label: "Submission template · 90 sec" },
    ],
  },

  veena_l9_02_masterclass: {
    id: "veena_l9_02_masterclass",
    title: "Teach the kampita · transmit oscillation technique to a junior student",
    objectives: [
      "Record a 5-minute video teaching kampita gamaka to a hypothetical L4 student",
      "Demonstrate 3 progressive exercises (static fret pressure, slow oscillation, in raga phrase)",
      "Articulate kampita's role in Carnatic expression beyond mechanics",
    ],
    writtenContent:
      "## Kampita teaching\n\nKampita is the most common gamaka — the oscillation around a note. Few teachers articulate it well; most students copy by ear, often badly. This masterclass closes that gap.\n\n## Teaching arc\n\n1. **Why kampita matters** (1 min) — it's the soul of Carnatic phrasing.\n2. **Static fret pressure** (1 min) — feel the pitch shift with finger pressure.\n3. **Slow oscillation** (1 min) — controlled in/out at 2 oscillations per second.\n4. **In raga phrase** (1 min) — apply kampita to a Mayamalavagowla phrase.\n5. **Common errors** (1 min) — too fast, too shallow, wrong rhythm.\n\n## Voice\n\nPhysical demonstration is essential. The student watches your finger; the lesson is half visual. Verbal explanation alone fails for kampita.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Teaching kampita reveals your kampita", body: "When you must articulate what your finger does, you discover unconscious habits — both elegant and crude. The articulation deepens your own kampita over time." },
        { id: "t_raga",    heading: "Use Mayamalavagowla in demos", body: "It's the Carnatic foundation raga; every student knows it. Demoing kampita on Mayamalavagowla phrases means students can immediately apply what they learn." },
        { id: "t_pitfall", heading: "Don't show off complex kampita variants", body: "L4 students need basic, single-note kampita. Don't demonstrate concert-grade kampita chains — they'll be intimidated and lost. Meet them where they are." },
      ],
    },
    audioRefs: [
      { id: "exemplar_masterclass", label: "Reference masterclass · kampita teaching" },
      { id: "rubric_audio", label: "Grading rubric · what graders listen for" },
    ],
  },

  veena_l9_03_genius_cert: {
    id: "veena_l9_03_genius_cert",
    title: "Genius Certificate · solo veena recital across 3 ragas, 25 minutes",
    objectives: [
      "Perform a 25-minute solo recital: opening varnam (5 min), main RTP (15 min), thillana close (5 min)",
      "Demonstrate full Carnatic vocabulary: alapana, tanam, pallavi, kalpana swara, niraval, brigha",
      "Maintain pitch, raga purity, gamaka faithfulness across all 25 minutes",
    ],
    writtenContent:
      "## Solo veena recital\n\nThe Carnatic veena tradition has a long history of solo recitals — though duets and concert ensembles are more common. This cert performance is a full kutcheri-equivalent solo: varnam, RTP, thillana, full duration.\n\n## The arc\n\n**Varnam (5 min)** — choose a varnam from a raga you've mastered (Bhairavi, Kalyani, Thodi). Concert-style opener. **RTP (15 min)** — full ragam-tanam-pallavi in a substantial raga (Karaharapriya, Kambhoji, Reetigowla). **Thillana (5 min)** — fast, rhythmic, joyful close.\n\n## What graders score\n\nEverything: pitch (5-cent precision), raga purity (no foreign notes), gamaka (correct on every komal), tala (no drift), kalpana swara (eduppu landings), brigha (pluck evenness), and the intangible — does it sound like *Carnatic veena*, the way a tradition-trained ear knows it?",
    drills: {
      teach: [
        { id: "t_why",     heading: "Genius tier means lineage-ready", body: "After this lesson, you could be invited as a soloist for a small concert. The cert is the form's seal of: this player has internalized the tradition. It's earned, not awarded — and it's the curriculum's culmination." },
        { id: "t_raga",    heading: "Choose ragas with contrast", body: "Varnam in Bhairavi (heavy), RTP in Kambhoji (regal), thillana in Hamsadhwani (light) = arc of varied moods. Three same-mood ragas = monotone recital. Variety holds attention." },
        { id: "t_pitfall", heading: "Don't optimize for the camera", body: "Play to an imaginary audience of 100 listeners. Don't perform to the lens; perform to the music. The camera will catch any compromise. Authentic playing wins." },
      ],
    },
    audioRefs: [
      { id: "tanpura_multi", label: "Tanpura · 3-raga tuning" },
      { id: "tala_recital", label: "Tala backing · 25-min recital" },
      { id: "demo_recital", label: "Reference veena recital · 25 min · master" },
    ],
  },
};
