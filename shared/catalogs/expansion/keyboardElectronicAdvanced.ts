/**
 * Hand-authored L5-L9 overrides · keyboard + electronic advanced:
 * accordion · synth · dj_controller.
 *
 * Pro-tier (L5-L6) through Genius-tier (L7-L9). Folk/chanson
 * + electronic production + DJ performance traditions all reach
 * recital-grade by L9.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const KEYBOARD_ELECTRONIC_ADVANCED_OVERRIDES: Record<string, Patch> = {
  // ═══ ACCORDION · L5 ═══
  accordion_l5_01_harmony: {
    id: "accordion_l5_01_harmony",
    title: "Bass-line independence · walking bass under right-hand melody",
    objectives: [
      "Walk a bass line (C-E-G-A) under a fixed right-hand melody",
      "Decouple left-hand bass pattern from right-hand rhythm",
      "Hold steady bellows while both hands diverge",
    ],
    writtenContent:
      "## Beyond oom-pah\n\nL2-L4's left hand was locked: bass-chord-bass-chord. L5 breaks the lock. The left hand walks — bass moves through scale tones (C, E, G, A) while chord stabs syncopate against the right hand.\n\n## Walking bass on Stradella\n\nStradella bass system: the C row gives you C bass + C major chord, but adjacent rows give E, G, A. A walking line C → E → G → A → G → E → C climbs the C major arpeggio + neighboring tones across two button rows.\n\n## The independence drill\n\nRight hand plays a Galliano-style legato melody in straight quarter notes. Left hand walks bass in dotted-quarter + eighth syncopation. The two hands argue rhythmically — that's the point.\n\n## Reference\n\nRichard Galliano's 'New Musette' albums show this technique constantly: the left hand is a jazz bassist, not a polka pump.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why decouple", body: "Locked oom-pah is a beginner sound. Independent bass lines are how Galliano, Piazzolla, and modern accordionists turn the instrument into a small jazz combo." },
        { id: "t_shape",   heading: "Shape the walk", body: "A good walking bass passes through scale tones, lands on chord tones at strong beats, uses chromatic approach into the next chord. C → E → G → A → B → C lands on the downbeat." },
        { id: "t_pitfall", heading: "Don't lose the chord stab", body: "Walking bass replaces the bass button, not the chord button. Keep the chord stab on beats 2 and 4 even while bass walks. Drop the chord = drop the harmony." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Walking bass alone · 80 bpm" },
      { id: "demo_target", label: "Both hands · 110 bpm with melody" },
    ],
  },
  accordion_l5_02_fast: {
    id: "accordion_l5_02_fast",
    title: "Polka tempo · 140 bpm endurance pass",
    objectives: [
      "Hold oom-pah at 140 bpm for 32 bars without tempo drift",
      "Right-hand melody clean at quarter-note triplet density",
      "Bellows reversals every 2 bars without tonal popping",
    ],
    writtenContent:
      "## 140 bpm is fast accordion\n\nBeer Barrel was 120. 140 is competitive Czech / Bavarian polka tempo. Bellows reversals come every 2 bars; left hand's bass-chord alternates 8 times per second; right hand may sit on 16th-note runs.\n\n## What breaks at 140\n\n- Bellows lag: arm tires, pulling slows, pitch sags\n- Chord-button slop: index finger lands between rows\n- Right-hand drag: melody fingers fall behind the click\n\n## The drill\n\nMetronome at 110 bpm, play 16 bars clean. Bump 5 bpm. Repeat. Stop when oom-pah breaks down — that's your ceiling. Practice at ceiling-minus-10 daily; the ceiling rises.\n\n## Bellows efficiency\n\nAt 140 bpm your bellows must move minimally — open just enough to sustain, close just enough to reverse. Wasted bellows travel = wasted energy = arm fails by bar 24.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 140", body: "140 bpm is the line between hobbyist polka and dance-floor polka. Ensembles at festivals run 140-150. Below that, it sounds dragging in context." },
        { id: "t_shape",   heading: "Shape the bellows arc", body: "Plan reversals at musical seams (every 2 bars on phrase boundaries). Don't reverse mid-phrase — that's where pops happen." },
        { id: "t_pitfall", heading: "Don't tense up", body: "Tension at 140 = locked shoulder = arm fails fast. Stay loose, breathe, smile. The tempo is fast but the body must stay relaxed." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Polka · 120 bpm reference" },
      { id: "demo_target", label: "Polka · 140 bpm · 32 bars clean" },
    ],
  },
  accordion_l5_03_improv_1: {
    id: "accordion_l5_03_improv_1",
    title: "French musette improvisation · 8-bar solo over I-vi-ii-V",
    objectives: [
      "Improvise 8 bars over the musette I-vi-ii-V loop in C",
      "Use C major pentatonic + chromatic approach tones",
      "Phrase across the bar line, not into it",
    ],
    writtenContent:
      "## Your first improv\n\nMusette progression in C: Cmaj7 → Am7 → Dm7 → G7. Loop. You solo on top with right hand while left hand walks the changes.\n\n## The vocabulary\n\n- C major pentatonic (C D E G A) is the safe pool\n- Chromatic approach: hit a scale tone from a half-step below (B → C, D# → E)\n- Enclosure: D-B-C — neighbor-from-above, neighbor-from-below, target\n- Triplet pickups on the 'and' of beat 4 land you on the next chord\n\n## Listen to\n\nGus Viseur, Tony Murena, Gallliano's earlier records. The phrasing is conversational — short questions, short answers, occasional long answer. Not a wall of notes.\n\n## The drill\n\nLoop the changes (backing track or recorded chord-button vamp). Improvise 8 bars. Stop. Listen. Identify one weak bar. Fix it. Loop again.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why improvise", body: "Reading is half the instrument. Musette and tango traditions expect the player to spin variations live — that's where the soul lives." },
        { id: "t_shape",   heading: "Shape phrases", body: "Two bars of statement, one bar of rest, two bars of answer. Silence is part of the phrase. Don't fill every beat — leave breath." },
        { id: "t_pitfall", heading: "Don't camp on pentatonic", body: "Pentatonic-only sounds bluesy, not Parisian. Add chromatic approaches and 9ths to get the musette flavor." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Vamp · 90 bpm · slow chord changes" },
      { id: "demo_target", label: "Galliano-style improv · 110 bpm" },
    ],
  },
  accordion_l5_04_rep_2: {
    id: "accordion_l5_04_rep_2",
    title: "'La Foule' · second 32-bar chanson",
    objectives: [
      "Play full 32-bar A section of Edith Piaf's 'La Foule'",
      "Apply 3/4 valse-musette feel with rubato at phrase peaks",
      "Maintain dynamic arc from mp through f and back",
    ],
    writtenContent:
      "## 'La Foule' · the crowd waltz\n\nÁngel Cabral wrote 'Que Nadie Sepa Mi Sufrir' (1936); Piaf reworked it into 'La Foule' (1957). 3/4 waltz, romantic and driving. Definitive valse-musette repertoire.\n\n## The form\n\nA section: 32 bars, two 16-bar phrases that mirror. The melody climbs to high G in bar 12, returns, climbs higher to A in bar 28, then resolves.\n\n## Style points\n\n- Bellows shake on the climactic A in bar 28 (rapid bellows direction reversals to create tremolo)\n- Rubato across bars 14-16 (the breath before the second phrase)\n- Dynamics: bars 1-8 mp, 9-16 mf, 17-24 f, 25-32 ff then sudden p on the resolution\n\n## Compare to La Vie\n\nLa Vie en Rose was simpler, slower, more intimate. La Foule is theatrical — Piaf is performing for a crowd. Your accordion should match: bigger gestures, wider dynamics.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why La Foule", body: "It's the standard 'second chanson' for accordion students worldwide. It demands waltz feel, dynamic range, and bellows control all at once." },
        { id: "t_shape",   heading: "Shape the climb", body: "The melody is engineered to climb. Each phrase peak is higher and louder than the last. Don't peak too early — save the ff for bar 28." },
        { id: "t_pitfall", heading: "Don't rush the 3", body: "Valse-musette's 3/4 has a slight delay on beat 3 (the lift before beat 1). Straight even 3 = music-box. Lifted 3 = Parisian." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "La Foule A section · 90 bpm" },
      { id: "demo_target", label: "Full A · 130 bpm · with bellows shake" },
    ],
  },

  // ═══ ACCORDION · L6 ═══
  accordion_l6_01_adv_tech: {
    id: "accordion_l6_01_adv_tech",
    title: "Bellows-shake · the triplet tremolo",
    objectives: [
      "Execute bellows-shake at 8-12 Hz cleanly on a sustained note",
      "Maintain pitch stability during shake",
      "Apply shake to the climax of 'La Foule'",
    ],
    writtenContent:
      "## Bellows-shake (tremolo a mantice)\n\nThe signature advanced accordion technique: rapid bellows direction reversals on a sustained chord, producing a tremolo of accent waves. Used by Piazzolla, Galliano, Frosini.\n\n## Mechanics\n\nLeft wrist drives the shake (not the whole arm — too tiring). Wrist flexes in/out at 8-12 Hz. Bellows travel is tiny — maybe 2-3 cm per cycle. Right hand holds a chord; left thumb stays planted.\n\n## What it sounds like\n\nA pulsing, accented sustain. Each direction change creates a slight accent. At 10 Hz the ear perceives it as triplet-eighths over the underlying tempo — a shimmering, urgent texture.\n\n## Where to use\n\n- Climax of a tango (Piazzolla's 'Libertango' uses it constantly)\n- Held note before a key change\n- Final chord of a piece for dramatic ring-out\n\n## Don't overuse\n\nBellows-shake is dramatic. Used every phrase = exhausting + cheap. Used once or twice per piece = devastating.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why shake", body: "Sustaining a note on accordion is musically flat without bellows action. Shake is the accordion's vibrato — the way it keeps a long note alive." },
        { id: "t_shape",   heading: "Shape the wrist motion", body: "Tiny in-out wrist flicks. Not arm. The wrist is the metronome of the shake; the arm just stabilizes." },
        { id: "t_pitfall", heading: "Don't lurch the bellows", body: "If your bellows travel is too long (over 5 cm), each reversal becomes a lurch instead of a shake. Tighten the motion to 2-3 cm." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bellows-shake · 6 Hz building to 10 Hz" },
      { id: "demo_target", label: "Shake on La Foule climax · in context" },
    ],
  },
  accordion_l6_02_rep_3: {
    id: "accordion_l6_02_rep_3",
    title: "Piazzolla 'Oblivion' · tango fundamentals",
    objectives: [
      "Play 'Oblivion' melody at 60 bpm with full rubato",
      "Apply Piazzolla-style staccato chord stabs in left hand",
      "Bring out the iconic descending bass line",
    ],
    writtenContent:
      "## Astor Piazzolla\n\nThe Argentine bandoneonist (1921-1992) who reinvented tango. His 'nuevo tango' added jazz harmony and chamber-music structure. 'Oblivion' (1982) is his most haunting ballad.\n\n## Bandoneon vs accordion\n\nPiazzolla wrote for bandoneon (button-only, different button layout). On accordion you adapt: same melody, same harmony, but Stradella bass approximates bandoneon's left-hand chord patterns.\n\n## Style\n\n- Slow, mournful (60 bpm)\n- Heavy rubato at phrase peaks\n- Left hand alternates between sustained chords and staccato stabs (the 'marcato' tango feel)\n- Bellows is the singer — every dynamic shape lives there\n\n## The descending bass\n\n'Oblivion' is built on a chromatic descending bass: Dm → Dm/C# → Dm/C → Dm/B → Bbmaj7 → Am. This bass line is half the song's emotional weight. Bring it out in the left hand.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Piazzolla first", body: "Before tackling Libertango (L7), you need Oblivion. It's slower, the harmony is exposed, and you learn the tango feel without the speed pressure." },
        { id: "t_shape",   heading: "Shape the rubato", body: "Tango rubato is dramatic — pull tempo back hard at phrase peaks, accelerate hard into the next phrase. Not subtle French rubato." },
        { id: "t_pitfall", heading: "Don't smooth out the chords", body: "The staccato chord stabs are part of the tango feel. Sustained pretty chords = wrong genre. Stab. Stop. Stab. Stop." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Oblivion melody alone · 50 bpm" },
      { id: "demo_target", label: "Full Oblivion · 60 bpm with rubato" },
    ],
  },
  accordion_l6_03_duet: {
    id: "accordion_l6_03_duet",
    title: "Folk duet · accordion + violin or fiddle",
    objectives: [
      "Play 'Sous le Ciel de Paris' as accompanist behind a violin lead",
      "Drop into a melodic answer in bars 9-12",
      "Trade leads gracefully back to violin in bar 13",
    ],
    writtenContent:
      "## The duet tradition\n\nAccordion + violin is the bedrock of European folk: Parisian musette, klezmer, Norwegian gammeldans, Romanian taraf. The accordion provides the harmonic floor; the violin sings on top. Then they trade.\n\n## Your role this lesson · accompanist\n\n- Left hand: oom-pah or walking bass\n- Right hand: chord voicings, answer phrases, fills in violin's silences\n- Volume: 60% of solo level — you support, you don't compete\n\n## The lead trade\n\nBars 9-12 you take the melody (violin drops to long sustained notes underneath). Bars 13 onward you give it back. The handoff must be musical — overlap one bar, not abrupt.\n\n## Listening cues\n\nWhen the violin breathes (small rest at end of phrase), that's your invitation to fill. When violin sustains long, sit on the chord and wait. Reading the partner is the duet skill.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why duet matters", body: "Accordion solo is one mode. Accordion in ensemble is where most professional gigs live — café trios, folk bands, world-music projects. Duet is the entry to that life." },
        { id: "t_shape",   heading: "Shape your support", body: "Your job is to make the violinist sound great. Sub-mix yourself. Leave space. Fill tasteful answers, not solos that overshadow." },
        { id: "t_pitfall", heading: "Don't overplay fills", body: "Beginners fill every gap. Pros fill 1 in 4 gaps and let the others breathe. Restraint is the duet skill." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Accordion accompaniment · solo · 90 bpm" },
      { id: "demo_target", label: "Full duet with violin · trading leads" },
    ],
  },
  accordion_l6_04_pro_cert: {
    id: "accordion_l6_04_pro_cert",
    title: "Pro Certificate · accordion 5-min recital",
    objectives: [
      "Perform La Foule, Oblivion, and a polka in succession",
      "Demonstrate bellows-shake on at least one piece",
      "Hold tempo, dynamics, and feel across all three contrasting styles",
    ],
    writtenContent:
      "## The Pro cert\n\n5 minutes, three pieces. La Foule (chanson, 3/4), Oblivion (tango, 4/4 slow), Beer Barrel Polka or equivalent (polka, 2/4 fast). Three different feels, three different time signatures.\n\n## Grading criteria\n\n1. Technique: oom-pah independence, walking bass, bellows-shake, rubato\n2. Style differentiation: the chanson must sound French, the tango Argentine, the polka Bavarian\n3. Endurance: 5 minutes without arm collapse\n4. Musicality: dynamic range, phrasing, breath\n\n## Programming order\n\nOpen with La Foule (warm, romantic, gets the audience in). Middle Oblivion (slow, deep, emotional core). Close with the polka (high energy, send them out smiling). Standard recital arc.\n\n## Recovery between pieces\n\n5-10 second pause. Reset bellows. Reset mind. Start the new piece in its own world.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why three styles", body: "The Pro cert proves you're a working accordionist, not a one-genre player. A pro must cover chanson, tango, and polka at minimum — that's the gig market." },
        { id: "t_shape",   heading: "Shape the recital arc", body: "Programming matters. Don't open with the slowest. Don't close with the slowest. Energy curve: warm → deep → bright." },
        { id: "t_pitfall", heading: "Don't run the pieces together", body: "Each piece needs its own start and end. A breath between is professional. Continuous transition = you're afraid of silence." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min Pro cert performance · all three pieces" },
    ],
  },

  // ═══ ACCORDION · L7 ═══
  accordion_l7_01_advanced_1: {
    id: "accordion_l7_01_advanced_1",
    title: "Full-bellows technique · controlled long-form sustain",
    objectives: [
      "Sustain a full crescendo from pp to fff over 16 beats without reversal",
      "Manage bellows travel of 50+ cm in a single direction",
      "Reverse silently at the end with no tonal pop",
    ],
    writtenContent:
      "## Full-bellows technique\n\nMost accordion technique uses 30-40% of bellows travel. Full-bellows uses 90% — pulling the instrument open as wide as it goes, then reversing through a long close. This is the technique behind Piazzolla's slowest passages and concert-grade ballads.\n\n## Why\n\nA single direction over 16 beats lets you shape one continuous dynamic arc — pp to fff in one breath, like a singer's phrase. Two reversals would interrupt that arc.\n\n## Mechanics\n\n- Plant left thumb firmly on the strap — this is your anchor\n- Open arm slowly, increasing pressure linearly\n- Watch bellows travel — you have 60 cm of useful range, plan to use 50\n- Silent reversal: at peak open, ease pressure to near-zero, snap-reverse, restart pressure cleanly\n\n## Where you'll use this\n\nLibertango's middle B-section. Galliano's 'Vagabond.' Any concert ballad with a 16-beat sustained phrase.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why full-bellows", body: "Concert accordion lives or dies on long sustained phrases. Reversing every 4 beats sounds amateur in concert repertoire — full-bellows is the professional sound." },
        { id: "t_shape",   heading: "Shape the dynamic", body: "Plan the dynamic arc before you start. Bar 1 pp, bar 4 mp, bar 8 mf, bar 12 f, bar 16 fff. Each bar is a calibrated pressure increase." },
        { id: "t_pitfall", heading: "Don't run out of air", body: "If you mis-calibrate and reach max-open at bar 12, you're stuck. Practice the travel/pressure relationship until you can predict where you'll be at bar 16." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Full-bellows crescendo · single sustained chord" },
      { id: "demo_target", label: "Applied to Libertango B-section" },
    ],
  },
  accordion_l7_02_rep_4: {
    id: "accordion_l7_02_rep_4",
    title: "Piazzolla 'Libertango' · concert-grade tango",
    objectives: [
      "Play full Libertango at 132 bpm including the marcato A-section",
      "Execute bellows-shake on the iconic syncopated chord stabs",
      "Hold the B-section legato with full-bellows technique",
    ],
    writtenContent:
      "## 'Libertango'\n\nPiazzolla, 1974. The tango that broke into world consciousness — covered by Yo-Yo Ma, Grace Jones, Bond. The accordion/bandoneon part is iconic and physically demanding.\n\n## The two worlds\n\n- A-section: relentless syncopated chord stabs in 4/4, 132 bpm, marcato Argentine tango feel. Right hand hammers chords; left hand pumps eighth-note bass. Bellows-shake on every accented chord.\n- B-section: sudden contrast — long legato melody, full-bellows technique, rubato. The release after the A-section's tension.\n\n## Why this is L7 rep\n\nLibertango requires every advanced technique simultaneously: bellows-shake, full-bellows, walking bass, marcato chords, rapid dynamic shifts. It's the audition piece for any serious accordion gig.\n\n## Practice arc\n\nWeek 1-2: A section at 100 bpm.\nWeek 3-4: B section, full-bellows.\nWeek 5: Combine, 110 bpm.\nWeek 6-8: Push to 132 bpm target.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Libertango", body: "Every accordionist auditioning for a tango orchestra plays Libertango. It's the global standard. Master it = you can work in tango worldwide." },
        { id: "t_shape",   heading: "Shape the A-B contrast", body: "A is aggressive, B is tender. The contrast IS the piece. If A and B sound similar, you've missed the structure." },
        { id: "t_pitfall", heading: "Don't drag the A-section", body: "132 bpm is non-negotiable for Libertango. Below 125 it loses its drive. Build endurance before you record." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "A-section · 110 bpm" },
      { id: "demo_target", label: "Full Libertango · 132 bpm · concert-grade" },
    ],
  },
  accordion_l7_03_improv_2: {
    id: "accordion_l7_03_improv_2",
    title: "16-bar improvisation over a klezmer freylakh",
    objectives: [
      "Improvise 16 bars over a freylakh in D Phrygian dominant",
      "Use augmented seconds (the klezmer 'cry') across phrase peaks",
      "Build intensity from quarter-notes to 16th-note triplet runs",
    ],
    writtenContent:
      "## Klezmer freylakh\n\nFreylakh = 'joyful' in Yiddish. Wedding dance music. Tempo 130-150 bpm, 4/4, modal (Phrygian dominant or Mi Sheberach). The accordion is a primary klezmer instrument alongside clarinet and violin.\n\n## The Phrygian dominant scale\n\nD E♭ F# G A B♭ C D — the augmented second between E♭ and F# is the entire Eastern European cry. Use it.\n\n## Improv vocabulary\n\n- The 'krekht' (sob): a fast neighbor-tone wail (D-E♭-D, half-step ornament)\n- The 'kvetch' (squeeze): bending tempo at phrase ends\n- Triplet runs: A-G-F# or D-E♭-F# repeated as a riff\n- Long held notes with bellows-shake at phrase peaks\n\n## Listen to\n\nThe Klezmatics, Naftule Brandwein, David Krakauer (clarinet, but the phrasing transfers). The klezmer feel is dance-floor energy + tearful soul — both at once.\n\n## The 16-bar arc\n\nBars 1-4: stating the mode quietly. Bars 5-8: building density. Bars 9-12: peak intensity, triplet runs, bellows-shake. Bars 13-16: descent and resolution.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why klezmer", body: "Klezmer expands your modal vocabulary beyond Western major/minor. Phrygian dominant is the gateway to Eastern European, Balkan, and Middle Eastern improv." },
        { id: "t_shape",   heading: "Shape the cry", body: "The augmented second is the emotional center. Bend toward it from below, hold it, ornament around it. Don't just pass through." },
        { id: "t_pitfall", heading: "Don't play it 'jazz'", body: "Klezmer phrasing is not jazz. No swing, no chromaticism for chromaticism's sake. Modal, ornamental, tearful. Different aesthetic." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Freylakh vamp · 110 bpm · for practice" },
      { id: "demo_target", label: "Full 16-bar improv · 140 bpm" },
    ],
  },

  // ═══ ACCORDION · L8 ═══
  accordion_l8_01_style_study: {
    id: "accordion_l8_01_style_study",
    title: "Style study · Astor Piazzolla and Richard Galliano compared",
    objectives: [
      "Identify three Piazzolla signatures (marcato, descending bass, ostinato)",
      "Identify three Galliano signatures (legato, jazz harmony, free rubato)",
      "Play one short phrase in each style on the same chord progression",
    ],
    writtenContent:
      "## Two giants, two languages\n\nPiazzolla (1921-1992) and Galliano (1950-) both modernized accordion / bandoneon, but in opposite directions.\n\n## Piazzolla\n\n- Marcato attack: staccato chord stabs, sharp articulation\n- Ostinato bass: repeating syncopated bass figure\n- Descending chromatic bass lines (Oblivion, Adios Nonino)\n- Tempo: aggressive, locked, dance-floor\n- Mood: tragic, dramatic, urban Buenos Aires\n\n## Galliano\n\n- Legato sustain: long lines, full-bellows technique\n- Jazz harmony: ii-V-I substitutions, altered dominants, modal interchange\n- Free rubato: tempo flows like a vocalist\n- Mood: romantic, contemplative, Parisian café meets jazz club\n\n## The same chord progression\n\nDm-Bb-C-A7. Play it Piazzolla-style: marcato chord stabs, ostinato bass, no rubato. Then play it Galliano-style: legato right-hand line, walking bass, free time. Same chords, totally different music.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why study masters", body: "Listening replaces a thousand drills. Hearing how Piazzolla phrases vs how Galliano phrases teaches feel that no method book can transmit." },
        { id: "t_shape",   heading: "Shape your ear", body: "Listen to one Piazzolla and one Galliano track per day for a week. Compare them on the same musical questions: how do they handle a long note? a fast run? a chord change?" },
        { id: "t_pitfall", heading: "Don't blend them", body: "The temptation is to play 'a little Piazzolla, a little Galliano.' That's a muddled style. Pick one for any given piece, commit fully." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Same progression · Piazzolla style" },
      { id: "demo_target", label: "Same progression · Galliano style" },
    ],
  },
  accordion_l8_02_rep_5: {
    id: "accordion_l8_02_rep_5",
    title: "Concert tango · Piazzolla 'Adiós Nonino'",
    objectives: [
      "Play the full slow introduction with rubato",
      "Execute the fast middle section at 140 bpm with marcato attack",
      "Bring out the descending chromatic bass line throughout",
    ],
    writtenContent:
      "## 'Adiós Nonino'\n\nPiazzolla, 1959. Written days after his father's death. The most personal and structurally complex tango in his catalogue. 8 minutes long, multiple sections, virtuosic.\n\n## The architecture\n\n- Slow rubato introduction (60 bpm, free time)\n- Fast marcato A-section (140 bpm, locked tempo)\n- Lyrical B-section (110 bpm, full-bellows legato)\n- Recapitulation with intensified A-section\n- Coda: return to slow introduction material, full-bellows fade\n\n## What makes it L8\n\nUnlike Libertango (one feel, two textures), Adiós Nonino requires fluent navigation of four distinct moods within one piece. Each transition is musically engineered — rush them = lose the structure.\n\n## The descending bass\n\nThe foundational Em-D-C-B7 descending bass returns every section in different rhythmic guise. Bring it out always. It's the spine.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Adiós Nonino", body: "If Libertango proves you can play tango, Adiós Nonino proves you can interpret it. The piece demands judgment, structure, emotional arc — recital-grade material." },
        { id: "t_shape",   heading: "Shape transitions", body: "The four sections must each have their own world AND connect logically. Practice transitions specifically — last 2 bars of section N + first 2 bars of section N+1." },
        { id: "t_pitfall", heading: "Don't sentimentalize", body: "It's a grief piece, but Piazzolla wrote it with restraint. Over-emoting (excessive rubato, dragging tempos) cheapens it. Trust the writing." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Slow introduction · rubato study" },
      { id: "demo_target", label: "Full Adiós Nonino · 8-minute concert performance" },
    ],
  },
  accordion_l8_03_accompany: {
    id: "accordion_l8_03_accompany",
    title: "Accompany a singer · French chanson backing",
    objectives: [
      "Play backing for 'La Vie en Rose' under a vocalist",
      "Sub-mix to 50% of vocal level, fill only in vocal rests",
      "Modulate up a half-step at the bridge for the singer",
    ],
    writtenContent:
      "## The singer's accordionist\n\nIn chanson tradition, the accordion is the singer's partner. Edith Piaf's accordionists, Yves Montand's, Charles Aznavour's — they were named, credited, essential.\n\n## Your job\n\n- Set tempo and key in the intro (4 bars of vamp)\n- Hold the harmonic floor steady (left hand always there)\n- Fill vocal rests with brief melodic answers\n- Modulate when asked (singers often request keys up at the bridge)\n- Cue the ending (slow rubato in the final 4 bars)\n\n## Volume discipline\n\nYour bellows pressure stays at 50% of solo level. The singer is the lead. If they can't hear themselves over you, you've failed.\n\n## Modulation technique\n\nUp a half-step: insert a 2-bar V/V → V transition. From C major → D♭ major: 2 bars of A♭7 → D♭. From C major → D major: 2 bars of A7 → D. Plan modulations beforehand.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why accompany", body: "Most professional accordion gigs are accompaniment, not solo. Cabaret, café, weddings — the gig is supporting a vocalist. This is the bread-and-butter skill." },
        { id: "t_shape",   heading: "Shape your fills", body: "Fills should answer the singer's last phrase. If they sang a rising line, your fill descends. Conversation, not interruption." },
        { id: "t_pitfall", heading: "Don't drown the singer", body: "Beginner accordionists play too loud. Pros sub-mix themselves. If a singer asks you to play softer twice, take it as a serious note." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Backing track · solo · 84 bpm" },
      { id: "demo_target", label: "Full backing under vocalist · with modulation" },
    ],
  },

  // ═══ ACCORDION · L9 ═══
  accordion_l9_01_compose: {
    id: "accordion_l9_01_compose",
    title: "Compose an original chanson · 32 bars",
    objectives: [
      "Write a 32-bar AABA chanson in 3/4 or 4/4",
      "Use I-vi-ii-V harmony with at least one chromatic passing chord",
      "Score for accordion solo with idiomatic bellows-shake and rubato moments",
    ],
    writtenContent:
      "## Your own chanson\n\nL9 demands creation, not interpretation. You write 32 bars of original chanson — your own La Vie en Rose, Sous le Ciel, or La Foule.\n\n## Form\n\nAABA, 32 bars total: A (8) + A (8) + B (8) + A (8). The B-section contrasts — different key center (relative minor or IV), different melodic shape.\n\n## Harmony minimum\n\nI - vi - ii - V is the chanson backbone. Add one chromatic passing chord (e.g., #ivø7 between IV and V) to elevate it from generic to interesting.\n\n## Idiomatic writing\n\n- Plan bellows direction at composition stage (mark | for open, - for close)\n- Write a held note for bellows-shake at the climax of the B-section\n- Score one rubato moment (the bar before the final A returns)\n- Left hand: walking bass under the B-section, oom-pah on the A-sections\n\n## The deliverable\n\nLead sheet (melody + chords) + a recording of you performing it. The piece must sound like a chanson — singable, romantic, French in spirit.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose", body: "Composition forces you to understand what you've been imitating. Until you write one, you don't truly know how Piaf's writers shaped 'La Vie en Rose.'" },
        { id: "t_shape",   heading: "Shape the AABA", body: "The A theme must be memorable in 4 bars. Test it: can a stranger hum it back after one hearing? If not, simplify until they can." },
        { id: "t_pitfall", heading: "Don't over-harmonize", body: "Beginners writing originals add too many chord changes. Chanson harmony is simple. The melody and lyric carry — not the chord density." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Worked example · simple chanson sketch" },
      { id: "demo_target", label: "Full 32-bar original chanson · finished recording" },
    ],
  },
  accordion_l9_02_masterclass: {
    id: "accordion_l9_02_masterclass",
    title: "Masterclass · teach the bellows-shake to a beginner",
    objectives: [
      "Diagnose a student's failed bellows-shake from one short clip",
      "Prescribe two corrective drills with measurable goals",
      "Demonstrate the corrected technique yourself",
    ],
    writtenContent:
      "## Teaching is mastery's test\n\nL9 masterclass: you take a recorded clip of a student attempting bellows-shake (provided as part of the lesson) and you diagnose, prescribe, demonstrate.\n\n## Common failures of bellows-shake\n\n1. Whole-arm motion instead of wrist (slow, exhausting)\n2. Bellows travel too long (lurchy, popping)\n3. Pitch wobble (left thumb not anchored)\n4. Inconsistent rate (8 Hz, then 6 Hz, then 11 Hz)\n5. Over-applied (every chord shakes, no contrast)\n\n## The diagnostic loop\n\nWatch + listen 3 times. Identify the dominant failure. Pick the ONE drill that addresses that failure. Don't pile on five corrections — students implement one at a time.\n\n## The two-drill prescription\n\nDrill 1: address the dominant failure (technique).\nDrill 2: address the contextual application (musical use).\n\n## Demonstration standard\n\nYou record yourself doing the drill correctly so the student has a reference. Your demo must be clean — masterclass-grade.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach", body: "You don't fully own a technique until you can transmit it to someone else. Teaching exposes every gap in your own understanding." },
        { id: "t_shape",   heading: "Shape your feedback", body: "Praise what works, then prescribe the fix. Two compliments per critique. Students with crushed confidence stop practicing." },
        { id: "t_pitfall", heading: "Don't fix everything at once", body: "A masterclass is one diagnosis, one prescription, one demo. Pile-on feedback overwhelms. Trust the iteration loop." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Sample student clip · failed shake" },
      { id: "demo_target", label: "Your masterclass response · diagnosis + demo" },
    ],
  },
  accordion_l9_03_genius_cert: {
    id: "accordion_l9_03_genius_cert",
    title: "Genius Certificate · 25-min recital",
    objectives: [
      "Perform a 25-min program: chanson + tango + folk + original composition",
      "Open and close with original material",
      "Sustain technical and emotional standard across the full set",
    ],
    writtenContent:
      "## The Genius cert\n\n25 minutes, 5 pieces minimum, recital-grade. The program proves you are a complete accordionist — interpreter, technician, composer.\n\n## Required content\n\n- 1 chanson (La Foule, La Vie en Rose, or your composed original)\n- 1 Piazzolla tango (Libertango, Oblivion, or Adiós Nonino)\n- 1 folk piece in a non-Western mode (klezmer freylakh or Balkan kolo)\n- 1 Galliano-style legato ballad\n- 1 original composition (your L9 chanson)\n\n## Programming\n\nOpen with original (announce yourself as a composer). Build through chanson and folk. Mid-set Piazzolla as the technical centerpiece. Close with the Galliano ballad as emotional resolution.\n\n## What's graded\n\nTechnique (bellows-shake, full-bellows, walking bass, marcato), repertoire breadth, original composition quality, programming, stamina, audience presence.\n\n## The submission\n\nSingle continuous recording, 25 minutes, no edits. Live performance standard.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "The Genius cert is the highest accordion credential the app issues. Passing it means you can hold a 25-min concert at international standard." },
        { id: "t_shape",   heading: "Shape the program", body: "Energy curve matters: warm open, slow middle for depth, technical peak at minute 15, emotional resolution at the end. Plan minute by minute." },
        { id: "t_pitfall", heading: "Don't peak too early", body: "If you put Libertango first, the rest of the recital is downhill. Save the technical peak for minute 15-18." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 25-min Genius recital · all 5 pieces" },
    ],
  },

  // ═══ SYNTH · L5 ═══
  synth_l5_01_harmony: {
    id: "synth_l5_01_harmony",
    title: "Layered sounds · stacking patches into a single voice",
    objectives: [
      "Layer a sub bass + mid pad + high lead into one keyboard zone",
      "Balance the three layers so each is audible but unified",
      "Apply velocity-sensitive layer crossfade (bass loud at low velocity, lead at high)",
    ],
    writtenContent:
      "## Layering · the synth's harmonic move\n\nA single patch is fine. But the iconic synth sounds — the Vangelis 'Blade Runner' lead, the Vince Clarke pad, the Hans Zimmer 'Inception' brass — are all layers: 2-4 patches stacked and played as one.\n\n## The classic three-layer\n\n- Sub layer (octave below): sine or triangle wave, low-pass filtered. Anchors the low end.\n- Mid layer (root octave): sawtooth pad with slow attack and detune (3-7 cents). The body.\n- High layer (octave above): triangle or sine lead with vibrato. The shimmer.\n\n## Velocity crossfade\n\nMap velocity 0-63 to the sub + mid layers (soft = warm). Map velocity 64-127 to mid + high layers (hard = bright). Now your keyboard responds dynamically: gentle = warm pad, hard = cutting lead.\n\n## On most synths\n\nProphet, Moog Matriarch, Korg Kronos, Native Instruments Massive — all have layer/split modes. Modern DAW soft-synths (Serum, Diva, Massive X) layer infinitely.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why layer", body: "Single patches sound thin in a mix. Layered patches occupy more of the spectrum and sit better in production. It's the difference between demo and pro sound." },
        { id: "t_shape",   heading: "Shape the layers", body: "Each layer should serve a different frequency range. If two layers fight for the same Hz band, one wins, the other smears. Spread them: low/mid/high." },
        { id: "t_pitfall", heading: "Don't layer four sawtooths", body: "Beginners layer the same patch four times for 'thickness.' That's mud. Layer DIFFERENT timbres in DIFFERENT registers." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Each layer alone · solo'd" },
      { id: "demo_target", label: "All three layered · velocity crossfade demo" },
    ],
  },
  synth_l5_02_fast: {
    id: "synth_l5_02_fast",
    title: "Sequencer-driven arpeggios · 16th-notes at 128 bpm",
    objectives: [
      "Program a 16th-note arpeggio in C minor at 128 bpm",
      "Apply pattern rate, octave range, and gate length controls",
      "Modulate filter cutoff in real-time across the running pattern",
    ],
    writtenContent:
      "## Arpeggiator · the synth's secret weapon\n\nMost synths have an arpeggiator that turns held chords into running 16th-note patterns. Trance, techno, synthwave — the genre is built on arp patterns.\n\n## The controls\n\n- Pattern: up, down, up-down, random, played-order\n- Rate: 1/4, 1/8, 1/16, 1/32, with optional triplet (1/16T)\n- Octave range: 1, 2, 3, 4 octaves\n- Gate length: 25%-100% of step length (short = staccato, long = legato)\n\n## The C minor arp\n\nHold C-E♭-G-B♭ (Cm7). Pattern: up, 1/16 rate, 2-octave range, 50% gate. At 128 bpm you get C-E♭-G-B♭-C-E♭-G-B♭ across two octaves, looping every beat.\n\n## The performance move\n\nWhile the arp runs, sweep the filter cutoff manually. From dark (closed) to bright (open) over 4 bars, then back. This is the trance build — the listener is hooked on the rising filter.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why arpeggiate", body: "Arpeggios are the synth's rhythm engine. A good arp + a filter sweep = the entire EDM hook formula. Master the arp = master a genre." },
        { id: "t_shape",   heading: "Shape the gate", body: "Gate length transforms feel. 25% = staccato, danceable, urgent. 100% = legato, dreamy, ambient. Choose to fit the track." },
        { id: "t_pitfall", heading: "Don't auto-arp everything", body: "Arpeggiator is a tool, not a default. Some tracks need held chords or played lines. If every track is an arp, you sound formulaic." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Arp · 100 bpm · static cutoff" },
      { id: "demo_target", label: "Arp · 128 bpm · filter sweep over 4 bars" },
    ],
  },
  synth_l5_03_improv_1: {
    id: "synth_l5_03_improv_1",
    title: "Compositional improv · build a 16-bar idea over a drone",
    objectives: [
      "Improvise 16 bars over a sustained C minor drone",
      "Develop a 4-note motif across the improv (statement, repetition, variation, transformation)",
      "Bring filter cutoff in as an expressive parameter alongside notes",
    ],
    writtenContent:
      "## Compositional improv\n\nUnlike jazz improv (chord changes, rapid scale runs), synth improv is often slow and thematic — closer to ambient or modal music. You develop one idea over a drone or static harmony.\n\n## The 4-note motif\n\nPick four notes in C minor. Example: G-A♭-G-E♭. That's your seed. The 16-bar improv develops it.\n\n- Bars 1-4: state the motif twice, simple\n- Bars 5-8: repeat with rhythmic variation (slower, faster, displaced)\n- Bars 9-12: transformation — invert it, transpose it, fragment it\n- Bars 13-16: return to the original statement, but with filter cutoff opening\n\n## Listen to\n\nBrian Eno (Music for Airports), Steve Reich (Music for 18 Musicians — synth-adjacent), Tycho, Boards of Canada. The vocabulary is patient, modal, motivic.\n\n## The filter as a phrase\n\nIn ambient improv, the filter cutoff is an instrument. Slow open over 4 bars = building tension. Sudden close = phrase ending. Treat the cutoff knob like a violinist treats their bow.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this improv mode", body: "Synth improv differs from jazz piano improv. The instrument's strength is timbre and slow development, not rapid harmonic motion. Lean into that." },
        { id: "t_shape",   heading: "Shape the motif", body: "A 4-note motif should be memorable but transformable. Test: can you sing it back? Can you imagine it inverted, augmented, fragmented? If not, simpler." },
        { id: "t_pitfall", heading: "Don't change topic", body: "Beginners abandon their motif after bar 4 and start a new idea. Resist. Develop the original motif for all 16 bars. Discipline IS the improv." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Drone + motif statement" },
      { id: "demo_target", label: "Full 16-bar motivic development" },
    ],
  },
  synth_l5_04_rep_2: {
    id: "synth_l5_04_rep_2",
    title: "'Sandstorm' · Darude synth piece (32 bars)",
    objectives: [
      "Play the iconic 'Sandstorm' lead at 136 bpm",
      "Apply the supersaw lead patch (7 detuned saw oscillators)",
      "Layer pads and bass under the lead per the original arrangement",
    ],
    writtenContent:
      "## 'Sandstorm' · 1999\n\nDarude. Trance anthem. The lead is one of the most recognizable synth sounds ever recorded. Built on a supersaw — 7 detuned sawtooth oscillators stacked into a single massive lead.\n\n## The supersaw patch\n\n- 7 saw oscillators tuned to ±0, ±5, ±10, ±15 cents\n- Slow attack (10ms), no decay, full sustain\n- Filter cutoff at 60% with ~30% resonance\n- Reverb send: 30%, hall preset\n\nThis patch is now stock in Serum, Massive, Sylenth1, Diva — every modern soft-synth ships supersaw presets named 'Trance Lead' or 'Anthem Lead.'\n\n## The melody\n\n32 bars, builds in two 16-bar phrases. Notes are simple — the magic is in the patch and the rhythm. Play crisply, no rubato. Trance is locked-tempo music.\n\n## The arrangement\n\n- Lead supersaw on top\n- Pad layer (slower attack, lower in mix)\n- Sub bass on root every quarter note\n- 4-on-the-floor kick and offbeat hat (provided as backing)",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Sandstorm", body: "It's the canonical trance piece. Every electronic music student should be able to recreate it from scratch — patch, rhythm, arrangement. Reference point for the genre." },
        { id: "t_shape",   heading: "Shape the supersaw", body: "Detune amount matters. Too little (±2 cents) = thin. Too much (±25 cents) = out of tune. ±10 is the sweet spot. Tweak by ear." },
        { id: "t_pitfall", heading: "Don't add expressive timing", body: "Trance is locked-tempo. No rubato, no dragging, no rushing. The rhythm is part of the genre's identity. Play to the click." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Sandstorm lead alone · 100 bpm" },
      { id: "demo_target", label: "Full Sandstorm arrangement · 136 bpm" },
    ],
  },

  // ═══ SYNTH · L6 ═══
  synth_l6_01_adv_tech: {
    id: "synth_l6_01_adv_tech",
    title: "Sound design from scratch · build a custom lead patch",
    objectives: [
      "Initialize a blank patch, build a lead sound from oscillators up",
      "Configure ADSR envelope, filter cutoff, resonance, and LFO modulation",
      "Save as a custom preset playable across the keyboard",
    ],
    writtenContent:
      "## From init patch to your own sound\n\nUntil now you've used presets. L6 sound design: you start from an init patch (one sine oscillator, no filter, flat ADSR) and build a custom lead.\n\n## The build sequence\n\n1. Oscillators: 2 sawtooth + 1 square, octave-stacked, detuned ±5 cents\n2. Filter: 24dB low-pass, cutoff 800 Hz, resonance 30%\n3. Envelope (amplitude): A 5ms, D 200ms, S 70%, R 300ms\n4. Envelope (filter): A 0ms, D 400ms, S 30%, R 200ms — modulate cutoff +1500 Hz\n5. LFO 1: triangle, 4 Hz, modulate filter cutoff ±200 Hz (subtle wobble)\n6. LFO 2: sine, 6 Hz, modulate pitch ±5 cents (vibrato, gated by aftertouch)\n7. Effects: chorus 30%, hall reverb 25%\n\n## The sonic result\n\nA punchy lead with a filter sweep on each note attack, subtle wobble during sustain, vibrato available via aftertouch. Useful for melodic synthwave or modern pop.\n\n## Save and name\n\nSave as 'My Lead 1.' Future patches build on it. Over years, your preset folder becomes your sonic signature.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why build from scratch", body: "Presets are someone else's voice. Your own patches are your voice. Sound design is composition's other half — you're choosing the timbre as carefully as the notes." },
        { id: "t_shape",   heading: "Shape the envelope", body: "ADSR is the patch's shape. A short A + short D + low S = pluck. Long A + full S = pad. Internalize ADSR-to-feel mapping by experimenting." },
        { id: "t_pitfall", heading: "Don't over-modulate", body: "Beginners assign 12 LFOs and 8 envelopes. Result: chaos. 1-2 modulators, applied with intention, gives clarity. Restraint." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Init patch · sine wave only" },
      { id: "demo_target", label: "Final lead patch · played across the keyboard" },
    ],
  },
  synth_l6_02_rep_3: {
    id: "synth_l6_02_rep_3",
    title: "Daft Punk 'Around the World' · synth bass + lead",
    objectives: [
      "Play the iconic 'Around the World' bass line at 121 bpm",
      "Layer the squelchy lead synth on top during the chorus",
      "Apply talkbox-style filter modulation on the bass for the signature wobble",
    ],
    writtenContent:
      "## 'Around the World' · 1997\n\nDaft Punk, off Homework. A 7-minute hypnotic loop built on one bass line and one vocoded vocal phrase. The bass is the entire melody.\n\n## The bass patch\n\n- Single saw oscillator\n- 24dB low-pass filter, cutoff 600 Hz, resonance 60% (the squelch)\n- Filter envelope: short attack, fast decay, modulating cutoff +800 Hz on each note\n- Distortion: light overdrive\n- Side-chain compressor keyed off the kick\n\n## The bass line\n\n8-bar loop. Eighth notes mostly, with strategic rests creating the groove. The notes are simple; the patch + rhythm carry the piece.\n\n## The lead layer\n\nDuring chorus (every 16 bars), a squelchy lead joins on top. Same patch architecture as the bass, octave higher, filter slightly more open.\n\n## What this teaches\n\nFunk discipline. Daft Punk's bass line is a single loop for 7 minutes. Resist embellishing. The funk is in the locked groove, not in variation.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why Daft Punk", body: "French house is the textbook for synth bass design. Daft Punk + Justice + Cassius defined the sound. Cover one piece, you understand the genre." },
        { id: "t_shape",   heading: "Shape the squelch", body: "Resonance at 60% is the squelch sweet spot. Below 50% = polite. Above 75% = self-oscillating, painful. Tune by ear." },
        { id: "t_pitfall", heading: "Don't add notes", body: "The bass line is 8 bars repeated. Don't add fills, don't change notes mid-loop. Funk = repetition + microscopic groove variation, not new notes." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Bass line alone · 100 bpm" },
      { id: "demo_target", label: "Full Around the World loop · 121 bpm with chorus" },
    ],
  },
  synth_l6_03_duet: {
    id: "synth_l6_03_duet",
    title: "Synth + drum machine duet · live jam over a beat",
    objectives: [
      "Sync the synth's arp clock to a 124 bpm drum machine",
      "Trade 4-bar phrases between drum fills and synth lead",
      "Use real-time filter and pitch modulation as the conversation",
    ],
    writtenContent:
      "## The drum machine partner\n\nIn electronic music, the drum machine is your duet partner. TR-808, TR-909, Elektron Digitakt, software equivalents — all hold the rhythmic floor while the synth converses on top.\n\n## Clock sync\n\nMIDI clock from drum machine into synth. The synth's arpeggiator now locks to the drum machine's tempo. Press hold-chord on the synth = arp runs in time.\n\n## The trade\n\n- Bars 1-4: drum machine alone (pattern statement)\n- Bars 5-8: synth lead enters over drums\n- Bars 9-12: drum fill (high hats, snare rolls), synth drops out\n- Bars 13-16: synth answers with filter sweep + arp\n\nLoop. The conversation continues for as long as feels right.\n\n## The expressive tools\n\nFilter cutoff knob = your dynamics. Pitch bend wheel = expression. Arpeggiator on/off = phrasing. These are your microphone — perform with them, not just program them.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why drum-machine duet", body: "Solo synth is one mode. Synth + drums is where electronic music actually lives. Mastering the duet is mastering the genre's basic ensemble." },
        { id: "t_shape",   heading: "Shape the trade", body: "Listen to the drum pattern. Find its busy bars and its sparse bars. Play in the sparse bars, rest in the busy bars. Conversation, not overlap." },
        { id: "t_pitfall", heading: "Don't compete with the drums", body: "Drums occupy the rhythmic spotlight. Your synth should occupy the harmonic spotlight. Different lanes." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Drum loop alone · 124 bpm" },
      { id: "demo_target", label: "Full duet · synth + drums trading 4-bar phrases" },
    ],
  },
  synth_l6_04_pro_cert: {
    id: "synth_l6_04_pro_cert",
    title: "Pro Certificate · synth 5-min set",
    objectives: [
      "Perform 3 pieces in 5 minutes, each with a different self-built patch",
      "Demonstrate live arpeggio + filter sweep performance technique",
      "Submit at least one section using a custom-designed sound (not a preset)",
    ],
    writtenContent:
      "## The Pro cert\n\n5 minutes, three pieces, three different patches. The cert proves you're a producer/performer, not just a preset-player.\n\n## Required content\n\n- Piece 1: a Sandstorm-style trance lead (supersaw)\n- Piece 2: a Daft Punk-style squelchy bass line\n- Piece 3: an original ambient improv using YOUR custom patch from L6 sound-design lesson\n\n## What graders look for\n\n1. Patch quality: are your sounds professional? Especially the custom patch.\n2. Performance: live filter sweeps, arp toggling, pitch bend — actively performed.\n3. Variety: three patches, three feels, three roles (lead / bass / pad).\n4. Tempo: locked. Trance is 132-140, French house is 120-126, ambient is free.\n\n## The transition\n\nBetween pieces, 5-second pause to swap presets. Practice this transition specifically — fumbling with the synth's preset menu mid-recording is amateur.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why three patches", body: "A pro synthesist owns multiple voices. The cert proves you can switch sonic worlds within one set. One-patch players don't get studio gigs." },
        { id: "t_shape",   heading: "Shape the set arc", body: "Open with energy (trance), middle with funk (Daft Punk), close with depth (ambient original). Standard programming arc." },
        { id: "t_pitfall", heading: "Don't lean on presets only", body: "If all three pieces use stock presets, your custom patch from L6 didn't get used — you fail the 'sound designer' criterion. Showcase YOUR patch." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 5-min Pro cert set · three pieces" },
    ],
  },

  // ═══ SYNTH · L7 ═══
  synth_l7_01_advanced_1: {
    id: "synth_l7_01_advanced_1",
    title: "Modulation matrix mastery · routing 6 sources to 8 destinations",
    objectives: [
      "Configure a 6×8 mod matrix on a synth (LFOs, envelopes, MIDI sources to destinations)",
      "Build a patch where one knob (a 'macro') controls 4 simultaneous parameters",
      "Demonstrate gestural performance using the macro across a 16-bar phrase",
    ],
    writtenContent:
      "## The modulation matrix\n\nEvery serious synth has a mod matrix: a routing table where you assign sources (LFOs, envelopes, velocity, aftertouch, mod wheel) to destinations (filter cutoff, oscillator pitch, amplitude, FX parameters). This is where deep sound design lives.\n\n## The macro concept\n\nA macro is one knob that controls many parameters. Example: 'Brightness' macro might control:\n- Filter cutoff +2000 Hz\n- Oscillator detune ±10 cents\n- Reverb send +20%\n- LFO depth +15%\n\nTurning one knob = the patch transforms in 4 dimensions simultaneously. Gestural, expressive.\n\n## The 6×8 routing\n\n- Sources: LFO1, LFO2, ENV1, ENV2, mod wheel, aftertouch\n- Destinations: cutoff, resonance, oscillator pitch, oscillator level, FX sends, pan, amp, LFO rate\n\nWith 6 sources × 8 destinations + amount controls + bipolar/unipolar options, you have a sound design playground.\n\n## Where this matters\n\nAphex Twin's patches use 30+ modulation routes. Your advanced patches need 6-10 to feel alive vs static.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why the matrix", body: "Static patches are dead patches. Modulation makes a patch feel like a living instrument. The mod matrix is where life is added." },
        { id: "t_shape",   heading: "Shape one macro", body: "Don't add 8 macros. Add ONE devastating macro — a brightness, a movement, a tension knob — and rehearse using it expressively." },
        { id: "t_pitfall", heading: "Don't max all amounts", body: "Default mod amount is usually too high. Subtle modulation (10-30%) often feels alive without sounding cartoonish." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Static patch · no modulation" },
      { id: "demo_target", label: "Same patch · macro performance across 16 bars" },
    ],
  },
  synth_l7_02_rep_4: {
    id: "synth_l7_02_rep_4",
    title: "Modular Eurorack-style piece · 'West Coast' patch",
    objectives: [
      "Build a Buchla-style West Coast patch (complex oscillator + low-pass gate + slope)",
      "Generate a 2-minute generative piece with no fixed score",
      "Document the patch as a routing diagram",
    ],
    writtenContent:
      "## East Coast vs West Coast\n\n'East Coast' synthesis (Moog, Roland) = oscillator → filter → amp. Subtractive, classic.\n\n'West Coast' synthesis (Buchla, Make Noise) = complex oscillator (FM, wave-folding) + low-pass gate + slope generator. Additive/wave-shaping, generative.\n\n## The West Coast patch\n\n- Complex oscillator: VCO + wavefolder + FM index modulation\n- Slope generator (Maths-style): self-cycling envelope acts as both LFO and audio source\n- Low-pass gate (LPG): pings produce natural-decay 'plucks'\n- Random source (Marbles or Wogglebug): generates pitch + gate sequences\n\n## The performance\n\nNo MIDI keyboard. No fixed melody. You patch cables, set ranges, let the random source fire pitches and gates. You perform by adjusting probabilities, slope rates, FM index. The piece evolves on its own — your job is to shape its evolution.\n\n## Eurorack vs software\n\nVCV Rack is free and runs identical modules in software. You can practice this patch in VCV Rack today, then translate to hardware later.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why West Coast", body: "It's a totally different sound design philosophy. Mastering it expands your palette beyond subtractive synthesis. Aphex Twin, Tycho, Ricardo Villalobos all use Buchla-style techniques." },
        { id: "t_shape",   heading: "Shape the generative", body: "Generative music has no 'right' notes. Your job is to shape probabilities and rates so the music feels intentional even when individual notes are random." },
        { id: "t_pitfall", heading: "Don't fight the randomness", body: "The whole point is letting the patch surprise you. If you keep over-correcting, you're not doing West Coast — you're doing East Coast with extra steps." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Slope + LPG ping · isolated" },
      { id: "demo_target", label: "Full West Coast generative · 2 minutes" },
    ],
  },
  synth_l7_03_improv_2: {
    id: "synth_l7_03_improv_2",
    title: "16-bar live improvisation · synth performance",
    objectives: [
      "Improvise 16 bars over a live drum loop using one synth and one patch",
      "Perform with mod wheel, pitch bend, aftertouch, and one knob (filter)",
      "Build dynamic and harmonic intensity to a clear peak at bar 12",
    ],
    writtenContent:
      "## Live synth improv\n\nThis isn't sound design or programming. This is performance — you, one synth, one patch, one drum loop, 16 bars of real-time playing.\n\n## The constraints\n\n- One patch (you don't switch sounds mid-improv)\n- Pre-set drum loop at 120 bpm\n- Four expressive controllers: keyboard, mod wheel, pitch bend, filter cutoff knob\n- 16 bars, then stop\n\n## The arc\n\n- Bars 1-4: state a theme. Filter half-closed. Restraint.\n- Bars 5-8: develop. Open filter slightly. Add mod wheel vibrato.\n- Bars 9-12: peak. Filter wide open. Aggressive playing. This is the climax.\n- Bars 13-16: descent. Close filter. Long sustained final note with vibrato.\n\n## The pitfall\n\nMost beginner improvs are flat — same intensity throughout. The 16-bar arc shape is what separates performance from noodling.\n\n## Listen to\n\nNils Frahm live performances. Tycho. Floating Points. They construct intensity arcs in real time, not just pile notes.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why live improv", body: "Live performance is a different skill than studio production. You can't undo. You commit. The cert (L9) requires this skill, so practice it now." },
        { id: "t_shape",   heading: "Shape the peak", body: "Plan the bar-12 peak before you start. Know what 'peak' looks like for this patch — what does maximum mean? Then arrange the journey to it." },
        { id: "t_pitfall", heading: "Don't peak too early", body: "If you go full filter open at bar 4, you have nowhere to go. Save the climax. Restraint at bar 4 = power at bar 12." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Drum loop alone · 120 bpm" },
      { id: "demo_target", label: "Full 16-bar live improv · arc to bar-12 peak" },
    ],
  },

  // ═══ SYNTH · L8 ═══
  synth_l8_01_style_study: {
    id: "synth_l8_01_style_study",
    title: "Style study · Aphex Twin, Brian Eno, Daft Punk, Tycho compared",
    objectives: [
      "Identify each artist's signature patch / sound design tendencies",
      "Identify each artist's structural / compositional tendencies",
      "Reproduce a 16-bar pastiche in each style on the same chord progression",
    ],
    writtenContent:
      "## Four canonical electronic voices\n\n## Aphex Twin (Richard D. James)\n- Patches: complex FM, granular, glitched. Heavy modulation matrix.\n- Structure: angular rhythms, sudden tempo / time-signature shifts\n- Mood: paranoid, surreal, sometimes tender\n\n## Brian Eno\n- Patches: long-evolving pads, generative systems\n- Structure: loops of slightly different lengths drifting in/out of phase (Music for Airports method)\n- Mood: ambient, spacious, contemplative\n\n## Daft Punk\n- Patches: French house staples — squelchy bass, vocoder, supersaw\n- Structure: looped grooves, side-chain pumping, disco samples\n- Mood: euphoric, robotic-yet-human\n\n## Tycho (Scott Hansen)\n- Patches: warm pads, picked synth-guitar leads, soft tape saturation\n- Structure: post-rock builds, gradual layer addition\n- Mood: cinematic, sunset-on-the-coast melancholy\n\n## The pastiche drill\n\nSame progression: Am-F-C-G. Render in each style. The chords don't change — the patch and structure do. Same notes, totally different music.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why study these four", body: "They span the genre: experimental (Aphex), ambient (Eno), dance (Daft Punk), cinematic (Tycho). Owning all four = owning the electronic palette." },
        { id: "t_shape",   heading: "Shape your ear by listening", body: "Listen to one album per artist over a week. After each, write three sentences: what made it sound like THEM? Internalize the signatures." },
        { id: "t_pitfall", heading: "Don't blur the styles", body: "A track that's 30% each is bland. Pick one style per project, commit fully. Style identity comes from commitment." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Same Am-F-C-G in Aphex style + Eno style" },
      { id: "demo_target", label: "Same progression in Daft Punk + Tycho style" },
    ],
  },
  synth_l8_02_rep_5: {
    id: "synth_l8_02_rep_5",
    title: "Full-track production · 4-minute electronic piece",
    objectives: [
      "Produce a complete 4-minute track with intro, verse, chorus, bridge, outro",
      "Use at least 8 separate patches across the arrangement",
      "Mix the track to streaming-ready loudness (-14 LUFS integrated)",
    ],
    writtenContent:
      "## Full-track production\n\nL8 step up: not a loop, not a 32-bar piece. A FULL TRACK. Intro, verse, build, chorus, breakdown, second chorus, outro. 4 minutes. Streaming-ready.\n\n## The arrangement template\n\n- 0:00-0:16: Intro (atmosphere only, no kick)\n- 0:16-0:48: Verse 1 (kick + bass + simple lead)\n- 0:48-1:04: Build (riser, snare roll, filter sweep)\n- 1:04-1:36: Chorus 1 (full arrangement, hook melody)\n- 1:36-2:08: Verse 2 (variation of verse 1)\n- 2:08-2:24: Bridge (different chord, sparse, tension)\n- 2:24-3:00: Chorus 2 (extended, layers added)\n- 3:00-3:30: Breakdown (filter closed, vocals or pad only)\n- 3:30-4:00: Final chorus + outro\n\n## The 8 patches minimum\n\nKick, bass, lead, pad, pluck, FX riser, vocal chop, percussion. Each plays a role. The composition is patch + part.\n\n## The mix to -14 LUFS\n\nSpotify, Apple Music normalize to -14 LUFS. Mix below this and you sound quiet vs other tracks. Use a loudness meter (Youlean Loudness Meter is free).",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why full track", body: "Producing a complete track is a different skill than making loops. Arrangement, mixing, mastering — these are required for any actual release. L8 forces you through that gauntlet." },
        { id: "t_shape",   heading: "Shape the arc", body: "Tension-release is the architecture. Build → chorus is release. Verse → build is tension. Plan tension and release minute-by-minute." },
        { id: "t_pitfall", heading: "Don't skip the breakdown", body: "Beginners cut breakdowns to keep energy high. Pros include them — the moment of quiet at 3:00 is what makes the final chorus hit. Restraint creates impact." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Reference: a Tycho track structure mapped" },
      { id: "demo_target", label: "Full 4-min original track · mixed to -14 LUFS" },
    ],
  },
  synth_l8_03_accompany: {
    id: "synth_l8_03_accompany",
    title: "Accompany live drums · synth in a band setting",
    objectives: [
      "Perform synth bass + pad behind a live drummer (no click)",
      "Lock to the drummer's tempo, even when it micro-fluctuates",
      "Drop into a brief lead during a drum break, return to support",
    ],
    writtenContent:
      "## The band synthesist\n\nElectronic music is increasingly performed live with real drums (Rüfüs Du Sol, ODESZA, Bonobo). The synth player plays bass + pad + occasional lead — band-format roles.\n\n## No click, just the drummer\n\nUnlike DAW work, you can't lock to a click. You lock to the drummer's kick. They are the click. If they speed up, you speed up. If they push the snare, you push your bass.\n\n## The role distribution\n\n- Synth bass: replaces what a bass guitar would do. Locked to kick.\n- Pad: harmonic floor, fills the space between drum hits\n- Lead: sparse. Used during the drum break (drummer plays kit-only, you respond with melodic fill)\n\n## The communication\n\nEye contact + body language with the drummer. Most drummers cue transitions with a head nod or a snare crash. Watch them — you don't read music in this gig, you read the drummer.\n\n## Volume discipline\n\nIn a band, the synth is mid-mix, not headlining. The drummer + bass + vocals are usually louder. Sub-mix yourself.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why band-format synth", body: "Solo electronic production is one career path. Band-format synth (touring with a drummer + vocalist) is another, and increasingly common. Different skill set." },
        { id: "t_shape",   heading: "Shape your support", body: "When the drummer is busy, you simplify. When the drummer simplifies, you can fill. Inverse intensity — not parallel intensity." },
        { id: "t_pitfall", heading: "Don't ignore the drummer", body: "If you stare at your synth screen the entire set, you're not in a band — you're a DAW with a stage. Look up. Communicate." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Synth + click · controlled tempo" },
      { id: "demo_target", label: "Synth + live drums · trading the lead during break" },
    ],
  },

  // ═══ SYNTH · L9 ═══
  synth_l9_01_compose: {
    id: "synth_l9_01_compose",
    title: "Compose an original electronic track · 5-minute release",
    objectives: [
      "Write and produce a 5-minute electronic track from scratch",
      "Demonstrate identifiable original style (not a pastiche of one of the L8 artists)",
      "Master to streaming-ready loudness with proper headroom (-14 LUFS, -1 dB true peak)",
    ],
    writtenContent:
      "## Your release-ready track\n\n5 minutes. Original. Not a Daft Punk pastiche, not a Tycho pastiche — your sound. Identifiable as YOU.\n\n## What 'your style' means\n\nBy L9 you've consumed Aphex, Eno, Daft Punk, Tycho. Your taste has converged. Your originals naturally combine elements: maybe Tycho's warmth + Aphex's rhythmic surprise + Eno's patience. That blend IS your style.\n\n## Required elements\n\n- Original melody (no samples of others' work)\n- At least 3 self-designed patches (no stock presets as primary voices)\n- A clear emotional / structural arc (intro → development → climax → resolution)\n- Mastered to -14 LUFS integrated, -1 dB true peak\n\n## The process\n\n- Week 1: sketch ideas, record 5+ rough demos\n- Week 2: pick one, expand to full arrangement\n- Week 3: mix\n- Week 4: master, deliver\n\n## The deliverable\n\n5-minute WAV at 24-bit / 48 kHz, -14 LUFS, -1 dB peak. Streaming-platform ready.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose", body: "Until you write release-ready music, you're a learner. Composition + production + mastering are the three pillars of being an electronic musician — L9 demands all three." },
        { id: "t_shape",   heading: "Shape the original sound", body: "Your style is not a slogan — it's a sound. Listen to your demos and ask: 'What's recurrent across all of them?' That recurrent quality IS your sound." },
        { id: "t_pitfall", heading: "Don't pastiche", body: "If your track sounds 80% like a Daft Punk track, it's not original. Audit yourself. Make sure the influences are blended, not copied." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Worked example · sketch to mix" },
      { id: "demo_target", label: "Full 5-min original · mastered" },
    ],
  },
  synth_l9_02_masterclass: {
    id: "synth_l9_02_masterclass",
    title: "Masterclass · sound design lecture for intermediate students",
    objectives: [
      "Teach the modulation matrix concept in a 10-minute walkthrough",
      "Build one patch live from init to finished sound while narrating decisions",
      "Provide a take-home assignment with measurable success criteria",
    ],
    writtenContent:
      "## You as the teacher\n\nL9 masterclass: you record a 10-minute video lecture on a sound design topic. Topic for this lesson: modulation matrix.\n\n## The structure\n\n- Minutes 0-2: concept introduction. What is modulation? Why does it matter? Listen to a static patch vs a modulated patch.\n- Minutes 2-7: live build. Init patch on screen. Add oscillators. Add filter. Add LFO. Route it. Listen at every step. Narrate decisions.\n- Minutes 7-9: musical demo. Play the finished patch in context — over a beat or under a melody. Show why the modulation choices matter musically.\n- Minutes 9-10: take-home assignment. Give the student a specific challenge: 'Build a similar patch but use envelope instead of LFO. Submit by next session.'\n\n## What separates masterclass from tutorial\n\nTutorials show steps. Masterclasses show JUDGMENT. Why this LFO rate and not double? Why this filter type? Why this routing depth? Narrate the why.\n\n## Reference\n\nWatch Andrew Huang, Red Means Recording, Look Mum No Computer on YouTube. They teach by narrating decisions, not just demonstrating clicks.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach", body: "Teaching forces you to articulate what you've internalized. Until you can explain your sound design choices, you don't fully understand them yourself." },
        { id: "t_shape",   heading: "Shape the lecture", body: "Concept → demo → musical context → assignment. This four-part structure works for any audio masterclass. Memorize it." },
        { id: "t_pitfall", heading: "Don't dump information", body: "10 minutes can hold ONE big idea, not five. Teach modulation matrix deeply, not modulation + filter + envelope + FX shallowly." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Reference: a 10-min Andrew Huang masterclass" },
      { id: "demo_target", label: "Your masterclass · 10 min recorded" },
    ],
  },
  synth_l9_03_genius_cert: {
    id: "synth_l9_03_genius_cert",
    title: "Genius Certificate · 30-min live set or DJ-set recital",
    objectives: [
      "Perform a continuous 30-minute live set OR DJ-set",
      "Include at least 3 original tracks among any covers / edits",
      "Demonstrate live performance technique (knob automation, pad triggering, on-the-fly arrangement)",
    ],
    writtenContent:
      "## The Genius cert\n\n30 minutes, continuous. Live set (you perform tracks live with synths + drum machines + controllers) OR DJ-set (you mix tracks across genres with creative blending). One unbroken recording.\n\n## Required content\n\n- At least 3 of your own original tracks (from L8/L9 work)\n- Optional: edits, covers, remixes\n- Continuous transitions — no gaps, no awkward cuts\n- Live performance gestures throughout (filter sweeps, FX sends, pattern changes)\n\n## The technical reality\n\nLive electronic performance requires a setup: laptop with Ableton Live or Bitwig, MIDI controller, optional hardware synth or drum machine. A DJ set requires a DJ controller (Pioneer DDJ, Native Instruments S4) + Rekordbox or Serato.\n\n## What the graders judge\n\n1. Originality: 3+ of your tracks present\n2. Continuity: no gaps, smooth transitions\n3. Performance: live gestures visible/audible\n4. Programming: the set has a journey (not just one tempo for 30 min)\n5. Sound quality: the recording is mixed well, not lo-fi\n\n## Setup choice\n\nLive set if you're a producer/composer. DJ-set if you're a curator/performer. Both are valid. Pick the one that matches your career direction.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "30 minutes of continuous live electronic performance is the standard for a club booking, festival opener, or radio show. Passing this cert = you can be booked." },
        { id: "t_shape",   heading: "Shape the journey", body: "Plan minute by minute. Energy curve: warm open (110 bpm) → build (120) → peak (128) → comedown (115). Programming is half the set." },
        { id: "t_pitfall", heading: "Don't auto-pilot", body: "If you press play on a long mix and walk away, you've failed the 'live performance' criterion. Active gestures throughout — filter, FX, automation, swap patterns." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 30-min Genius live or DJ set" },
    ],
  },

  // ═══ DJ_CONTROLLER · L5 ═══
  dj_controller_l5_01_harmony: {
    id: "dj_controller_l5_01_harmony",
    title: "Harmonic mixing · Camelot wheel and key-compatible blends",
    objectives: [
      "Identify Camelot key codes for 8 tracks in your library",
      "Plan a 4-track sequence where each transition is harmonically compatible (±1 on the wheel or perfect-fifth jump)",
      "Execute the 4-track mix without dissonant overlaps in the blend zone",
    ],
    writtenContent:
      "## Why harmonic mixing matters\n\nWhen two tracks overlap in a blend, their key signatures stack. If they clash (e.g., D minor over E♭ major), the overlap sounds dissonant — listeners feel it even if they can't name it. Harmonic mixing prevents that by selecting key-compatible tracks.\n\n## The Camelot wheel\n\n12 hours, two rings (A = minor, B = major). Each track gets a code: 8A = A minor, 8B = C major. Compatible moves:\n- Same number, switch ring: 8A ↔ 8B (relative minor/major)\n- Adjacent number, same ring: 8A → 7A or 9A\n- Energy boost: +1 ring jump (8A → 9A) increases brightness\n\n## Tools\n\nMixed In Key, Rekordbox key analysis, Serato key tag — all auto-detect key. Tag every track in your library before this lesson.\n\n## The 4-track plan\n\nExample: 8A (A min) → 8B (C maj) → 9B (G maj) → 10B (D maj). Energy rising, harmony locked. The crowd feels lift across the four tracks without identifying why.\n\n## DJ Premier reference\n\nPremier's mixtape work demonstrates harmonic ear in hip-hop blends — same principle, different genre.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why harmonic mixing", body: "Random key transitions = unsettled listener. Harmonic mixing = the set feels musical even when tracks change. It's invisible craft, but everyone hears the result." },
        { id: "t_shape",   heading: "Shape the wheel route", body: "Plan the wheel walk before the set. Don't improvise harmonically mid-mix — that's how you accidentally land on a tritone clash." },
        { id: "t_pitfall", heading: "Don't trust key tags blindly", body: "Sometimes auto-detect mis-labels (especially modal tracks). Confirm by ear before relying on it. A wrong tag = a clash even when the wheel says compatible." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Two-track harmonic blend · 4-bar overlap" },
      { id: "demo_target", label: "Full 4-track wheel walk · 8A → 10B" },
    ],
  },
  dj_controller_l5_02_fast: {
    id: "dj_controller_l5_02_fast",
    title: "Fast cuts at 130+ bpm · short blends, hot-cue triggering",
    objectives: [
      "Mix 4 tracks at 130+ bpm using 4-bar blends (16 beats max overlap)",
      "Trigger hot cues to drop on the 1 of the next track",
      "Maintain phrase alignment across all transitions (16-bar phrases)",
    ],
    writtenContent:
      "## Fast-tempo DJing\n\nAt 130+ bpm (techno, hard house, drum-and-bass tempos halved), blends shrink. A 32-beat blend at 124 bpm becomes a 16-beat blend at 130+ — the crowd has less patience at higher BPM, transitions must be tighter.\n\n## Hot cues\n\nHot cues are pre-marked drop points in a track. When you hit pad 1 (your hot cue 1), the track instantly jumps to that point. Used to land on the kick drum of the next phrase precisely.\n\n## The technique\n\n1. Track A is playing. Phrase ending in 4 bars.\n2. Cue track B silently in headphones, line up its kick drum on the 1.\n3. Bring B's volume up over 4 bars (16 beats).\n4. At the start of B's new phrase (16 bars in), drop A's volume.\n5. Result: 4-bar blend, phrase-aligned, energy rising.\n\n## Carl Cox reference\n\nCarl Cox at Space Ibiza was famous for 3-deck blends at 132 bpm, with hot cues triggering on phrase boundaries. The crowd never knows the transition is happening.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why fast cuts", body: "At 130+ bpm, long blends bore the crowd. Fast cuts maintain energy. Mastering fast technique unlocks techno, hard house, DnB sets." },
        { id: "t_shape",   heading: "Shape the phrase", body: "Always blend on 16-bar phrase boundaries. Mid-phrase blends sound chaotic. If you miss the boundary, wait 16 more bars — don't force it." },
        { id: "t_pitfall", heading: "Don't ride the crossfader", body: "Crossfader is for scratching. For blends, use the channel faders. Channel faders give you per-deck volume + EQ control simultaneously." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Single 4-bar blend at 130 bpm" },
      { id: "demo_target", label: "4-track fast cut sequence · phrase-aligned" },
    ],
  },
  dj_controller_l5_03_improv_1: {
    id: "dj_controller_l5_03_improv_1",
    title: "Creative live remix · loop, FX, and re-trigger over a host track",
    objectives: [
      "Loop an 8-bar section of a host track and play over it for 32 bars",
      "Apply at least 2 FX (echo, reverb, filter) as performance gestures",
      "Re-trigger hot cues to chop the loop into a new arrangement",
    ],
    writtenContent:
      "## The remix performance\n\nDJing isn't just transitions. The L5 creative move: take ONE track and remix it live — loop sections, drop FX, re-trigger hot cues to create a new arrangement on the fly.\n\n## The loop\n\nSelect 8 bars of the track that work as a loop (usually a chorus or breakdown). Activate loop. The 8 bars repeat indefinitely. You now have a backing track to play over.\n\n## FX as performance\n\n- Echo / delay: hold the FX paddle for 4 bars at the end of a phrase — creates a wash that resolves into the next section\n- Reverb: tail out the loop into ambient texture during a breakdown\n- Filter: sweep cutoff up over 16 bars for a build\n- Roll / repeater: at phrase ends, double-time stutter for tension\n\n## Hot cue chopping\n\n8 hot cues across the track. Trigger them in non-original order to make a new beat: 1-1-3-2-1-4. The track is now your sample bank.\n\n## Reference\n\nDJ Shadow's live performances. He treats records as sample libraries, not playback. Same philosophy applies to digital DJing.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why live remix", body: "Pure transition DJing is ABCD. Live remix is creating new music in the moment. Festival DJs and turntablists both rely on this skill — it's where DJing becomes performance." },
        { id: "t_shape",   heading: "Shape the FX gesture", body: "FX should match phrase structure — apply at phrase peaks or breaks, not random moments. A 16-bar filter sweep that lands on the kick of bar 17 is a moment. Random sweep is just noise." },
        { id: "t_pitfall", heading: "Don't FX everything", body: "Beginners drown a track in FX. Apply ONE FX gesture per phrase, max. The dry track is the foundation; FX are highlights." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Loop + one filter sweep · 16 bars" },
      { id: "demo_target", label: "Full 32-bar live remix · loop + FX + hot cue chops" },
    ],
  },
  dj_controller_l5_04_rep_2: {
    id: "dj_controller_l5_04_rep_2",
    title: "30-minute mix · second extended set",
    objectives: [
      "Plan and record a continuous 30-minute mix at locked tempo (within ±2 bpm)",
      "Use 8-12 tracks with harmonic flow across the wheel",
      "Build a clear energy arc from minute 0 to minute 30",
    ],
    writtenContent:
      "## The 30-minute set\n\nL4 was your first 15-min mix. L5 doubles it. 30 minutes is the standard radio mix duration (BBC Radio 1 Essential Mix segments, podcast guest spots).\n\n## Track count\n\nAt 124 bpm with 4-min average tracks, 30 minutes = 8 tracks. With shorter blends and more layering, 12 tracks. Both are valid.\n\n## The energy arc\n\n- Minute 0-6: warm-up. Lower BPM (122-124), soulful, vocal\n- Minute 6-12: build. BPM up (124-126), more rhythmic\n- Minute 12-20: peak. BPM at 128, big tracks\n- Minute 20-26: extended peak with one breakdown moment\n- Minute 26-30: outro. Lower BPM, wind down, leave on a dreamy track\n\n## Recording standard\n\nRecord through the controller's audio output to a DAW or recorder. 24-bit, 48 kHz. Trim silence at start/end. Render to MP3 320 kbps for distribution.\n\n## Reference\n\nFour Tet's hour-long Boiler Room sets show the energy curve at scale. Compress that into 30 min and you have your L5 deliverable.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 30 min", body: "It's the duration that proves you can sustain creative + technical attention without tiring. Most DJ failures come at minute 20+, when concentration drops. L5 forces you through that wall." },
        { id: "t_shape",   heading: "Shape minute by minute", body: "Plan tempo and energy for each 6-minute block. Don't improvise the arc — design it before recording, then execute." },
        { id: "t_pitfall", heading: "Don't peak at minute 6", body: "Common error: bring out big tracks too early. Save the peak for minute 14-18. Restraint at minute 6 = power at minute 18." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "First 8-minute block · warm-up section" },
      { id: "demo_target", label: "Full 30-min mix · 8-12 tracks · energy arc" },
    ],
  },

  // ═══ DJ_CONTROLLER · L6 ═══
  dj_controller_l6_01_adv_tech: {
    id: "dj_controller_l6_01_adv_tech",
    title: "Scratching mastery · chirp, flare, transformer scratches",
    objectives: [
      "Execute a clean chirp scratch (in-out hand cut)",
      "Execute a 2-click flare scratch (mid-cut click into return)",
      "Execute a transformer scratch (hand still, crossfader chops)",
    ],
    writtenContent:
      "## The three scratches\n\n## Chirp\n- Push record forward, cut sound off mid-push with crossfader\n- Pull record back, cut sound off mid-pull\n- Result: 'eep' (forward) and 'ow' (back)\n- Foundational. Every scratch builds from this.\n\n## Flare\n- Like baby scratch (just push-pull) but with crossfader 'clicks' that cut the sound mid-motion\n- 2-click flare: cut once on push (creates 2 sounds in 1 motion)\n- 3-click flare: cut twice on push (3 sounds), advanced\n- Result: rhythmic, percussive, faster than baby scratch\n\n## Transformer\n- Record hand stays still. Crossfader does the chopping in rhythmic patterns.\n- Pulling sound on/off creates a 'transformer' robotic stutter\n- The crossfader is the instrument here, not the record\n\n## Reference\n\nDJ Q-Bert, A-Trak, DJ Craze. Watch their hands separately — record hand vs crossfader hand. The independence is the skill.\n\n## Practice loop\n\nLoop a single drum hit (kick, snare, or a vocal stab). Practice each scratch on the loop for 10 minutes. Speed up gradually.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why scratch", body: "Scratching is the turntablist's voice. Even in pure house DJing, knowing how to scratch lets you ornament transitions. Master the basics — every advanced scratch builds from chirp + flare + transformer." },
        { id: "t_shape",   heading: "Shape the hand independence", body: "Record hand and crossfader hand do different things at different rates. Practice each alone first. Then combine slowly. Speed comes from independence, not muscle." },
        { id: "t_pitfall", heading: "Don't speed up too fast", body: "Beginners try fast scratches and produce noise. Slow, accurate scratches at 60 bpm are better than fast sloppy ones. Build the motor pattern at slow tempo, then accelerate." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Chirp · slow demonstration" },
      { id: "demo_target", label: "Flare + transformer combination · 110 bpm" },
    ],
  },
  dj_controller_l6_02_rep_3: {
    id: "dj_controller_l6_02_rep_3",
    title: "1-hour set · full club-set duration",
    objectives: [
      "Plan and perform a continuous 60-minute set",
      "Use 12-16 tracks with energy arc across multiple peak / breakdown cycles",
      "Include at least one creative live remix moment (loop + FX) and one scratched transition",
    ],
    writtenContent:
      "## The hour\n\n60 minutes is the standard club opening slot or radio show length. It's the duration that proves you can sustain ideas, not just execute a 30-min sprint.\n\n## The architecture\n\n- 0-15 min: warm-up. 122-124 bpm. Soulful, melodic, vocal.\n- 15-25 min: building energy. 124-126 bpm. More rhythmic, fewer vocals.\n- 25-35 min: first peak. 128 bpm. Big tracks, full energy.\n- 35-40 min: breakdown. Drop tempo briefly to 122. Vocal track or ambient piece. Reset.\n- 40-50 min: second peak, higher than first. 128-130 bpm.\n- 50-60 min: comedown. 124 bpm. Memorable closing track.\n\n## Required gestures\n\n- One scratched transition (apply L6 scratch lesson)\n- One live remix moment (apply L5 loop + FX lesson)\n- Phrase-aligned blends throughout\n\n## Reference\n\nCarl Cox's 1-hour Tomorrowland sets show this arc. Watch the crowd — peaks come at minute 25-35, recovery at minute 35-40, second peak at minute 40-50.\n\n## Recording standard\n\n24-bit / 48 kHz, mixed to -14 LUFS, exported as 320 kbps MP3 for distribution.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 60 min", body: "It's the gateway to club work. Bookers want to hear a 60-min mix before booking you. Shorter mixes don't prove you can sustain a set." },
        { id: "t_shape",   heading: "Shape the two peaks", body: "One peak in 60 min = monotone. Two peaks separated by a breakdown = drama. The breakdown is the engine — without it, the second peak feels flat." },
        { id: "t_pitfall", heading: "Don't ignore the comedown", body: "The last 10 minutes are not throwaway. Many DJs fade at the end and leave the crowd flat. End on a memorable track, not just any track." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "First 15 min · warm-up arc" },
      { id: "demo_target", label: "Full 60-min set · two peaks · scratch transition included" },
    ],
  },
  dj_controller_l6_03_duet: {
    id: "dj_controller_l6_03_duet",
    title: "B2B (back-to-back) duet · trade decks with another DJ",
    objectives: [
      "Trade alternating tracks with a partner DJ for 30 minutes",
      "Match BPM, key, and energy of the partner's previous track",
      "Communicate transitions in real-time (gestures, headphone cues)",
    ],
    writtenContent:
      "## The B2B set\n\nB2B = back-to-back. Two DJs share the booth, alternating tracks. Each DJ plays one track while the other prepares the next. The transition is from DJ A's track into DJ B's track, cycling.\n\n## The communication\n\n- Headphone cue: use cue button on next deck so YOUR partner hears your incoming track in their headphones\n- Eye contact + nods: signal your transition is coming\n- Track count: usually 1-on-1-off, sometimes 2-on-2-off\n\n## The match game\n\nWhen your partner plays a track, your job is to match its tempo, key, and energy. If they pulled BPM down to 122, don't drop a 130 bpm slammer — match the energy first, raise it gradually.\n\n## The conversation\n\nB2B is a musical conversation. Your tracks should respond to your partner's. They play a vocal house track? Answer with another vocal house track that takes the idea further.\n\n## Reference\n\nDixon B2B Âme. Carl Cox B2B Sven Väth. The hallmark of skilled B2B is that you can't tell where one DJ stops and the other begins — perfect harmonic and energetic continuity.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why B2B", body: "B2B sets are increasingly the festival format (Resident Advisor data shows B2B billings up 40% in last 5 years). Mastering B2B = staying relevant in modern DJ booking." },
        { id: "t_shape",   heading: "Shape the trade", body: "Don't try to one-up your partner. Match-and-extend, don't compete. The set is the joint product — egos kill B2B sets." },
        { id: "t_pitfall", heading: "Don't ignore your partner's selection", body: "B2B failure mode: each DJ plays their own arc, ignoring the other. The result sounds like two separate sets jammed together. Listen, respond, build together." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Single B2B trade · 4 tracks · 16 min" },
      { id: "demo_target", label: "Full 30-min B2B · 8-10 trades · arc maintained" },
    ],
  },
  dj_controller_l6_04_pro_cert: {
    id: "dj_controller_l6_04_pro_cert",
    title: "Pro Certificate · DJ controller 1-hour set",
    objectives: [
      "Submit a continuous 1-hour mix demonstrating L5-L6 techniques",
      "Include harmonic mixing, fast cuts, scratching, live remix, and energy arc",
      "Provide tracklist with key codes for grader verification",
    ],
    writtenContent:
      "## The Pro cert\n\n60 minutes. Continuous. Demonstrates everything from L5-L6: harmonic mixing, fast cuts, scratching, live remix, B2B-quality awareness even when solo.\n\n## What graders verify\n\n1. Harmonic flow: tracklist with Camelot codes shows wheel walk\n2. Phrase alignment: every transition lands on phrase boundary\n3. At least one scratched transition\n4. At least one live-remix moment (loop + FX)\n5. Energy arc with 1-2 peaks and 1+ breakdown\n6. Recording quality: -14 LUFS, no clipping, no dead air\n\n## The submission\n\n- 60-min audio file (WAV or 320 kbps MP3)\n- Tracklist as text or PDF, with Camelot codes per track\n- 200-word self-assessment: what worked, what you'd improve\n\n## Format choices\n\nGenre is your choice (house, techno, drum-and-bass, hip-hop, etc.) but stick to ONE genre family for this cert. Mixed-genre sets come at L8.\n\n## Reference standard\n\nThis cert is benchmarked against Resident Advisor's RA Recommend submission quality. Pro means professional — the recording should be releasable on a podcast or radio show.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "It's the credential bookers want to see before offering paid gigs. Below this level you're a hobbyist; above this you're a working DJ." },
        { id: "t_shape",   heading: "Shape the deliverable", body: "The 200-word self-assessment is graded. Show you can listen to your own work critically. Self-aware DJs improve fastest." },
        { id: "t_pitfall", heading: "Don't submit a one-take improv", body: "Plan the set. Test the set. Re-record if needed. Pros submit polished work, not first attempts." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 60-min Pro cert mix · all techniques demonstrated" },
    ],
  },

  // ═══ DJ_CONTROLLER · L7 ═══
  dj_controller_l7_01_advanced_1: {
    id: "dj_controller_l7_01_advanced_1",
    title: "Turntablist routine · 90-second composed scratch piece",
    objectives: [
      "Compose a 90-second scratch routine with notation (or video reference)",
      "Use at least 4 different scratch techniques (chirp, flare, transformer, crab)",
      "Synchronize scratches to a beat track for a complete 'song' feel",
    ],
    writtenContent:
      "## The turntablist routine\n\nDistinct from DJ mixing, turntablism is composed scratch performance. The DMC World Championship is the apex — competitors perform 90-second routines with scratched melodies, percussive patterns, and tricks.\n\n## The crab scratch (advanced addition)\n\nFingers tap the crossfader rapidly (4-5 fingers, walking pattern) while the record hand pushes/pulls. Creates a fast machine-gun chop. Originated by DJ Q-Bert.\n\n## The 90-second structure\n\n- 0-15s: intro. Statement of the source sample.\n- 15-30s: simple scratches over beat (chirp, baby scratch).\n- 30-45s: developing patterns (flare, transformer).\n- 45-60s: peak — crabs, complex multi-finger patterns.\n- 60-75s: variation — re-trigger hot cues for new arrangement.\n- 75-90s: closing. Return to source sample, fade or punctuate.\n\n## Notation\n\nTurntablist notation (TTM) exists but is informal. Most learners use video references — record yourself, watch, refine.\n\n## Reference\n\nDJ Craze's DMC routines. DJ Q-Bert's 'Wave Twisters.' A-Trak's early routines. Study one minute-by-minute, recreate the structure, then write your own.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why turntablism", body: "It's the apex skill of DJ controller / turntable mastery. Even if you never compete, understanding turntablism informs every transition you make in a regular set." },
        { id: "t_shape",   heading: "Shape the routine arc", body: "Like any composition: introduction, development, climax, resolution. A 90-sec routine without an arc is just a string of tricks." },
        { id: "t_pitfall", heading: "Don't pile tricks", body: "Beginners cram every scratch they know into 90 seconds. Result: chaos. Pick 4-5 scratches and use them musically. Restraint." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Sample routine breakdown · 30s walkthrough" },
      { id: "demo_target", label: "Full 90-sec routine · 4+ scratch techniques" },
    ],
  },
  dj_controller_l7_02_rep_4: {
    id: "dj_controller_l7_02_rep_4",
    title: "Scratch composition · perform a known turntablist piece",
    objectives: [
      "Learn and perform a transcribed routine (DMC-style or DJ Premier scratch hook)",
      "Match the original's timing within ±10ms accuracy",
      "Submit a video showing hand independence and crossfader technique",
    ],
    writtenContent:
      "## The repertoire piece\n\nL7 rep: you perform an existing turntablist piece. Like classical performers play Bach, turntablists play the canon — DJ Premier hooks, DJ Shadow loops, DMC routines.\n\n## Suggested pieces\n\n- DJ Premier 'Mass Appeal' scratch hook (16 bars, accessible)\n- DJ Shadow 'Number Song' core scratch (32 bars, intermediate)\n- DJ Q-Bert 'Wave Twisters' opening (60 seconds, advanced)\n\nPick one matched to your current ability. Don't over-reach.\n\n## The learning process\n\n1. Watch the original at 0.5x speed. Identify each scratch.\n2. Practice each scratch in isolation. 1 min per scratch type.\n3. Combine slowly at 50% speed.\n4. Increase speed in 5% increments daily.\n5. Match the original at full tempo by week 4.\n\n## The submission\n\nVideo (mandatory — graders need to see hand independence). Audio + visual. Compare frame-by-frame to the original. Within ±10ms timing on key scratches.\n\n## Reference\n\nDJ Premier's 'Above the Clouds' chorus scratch is a beginner-accessible target. The hook scratches the word 'cloud' — chirp + flare combo over the beat.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why study repertoire", body: "Performing a known piece builds discipline and ear. You can't fudge it — the original is the reference, and your performance is graded against it." },
        { id: "t_shape",   heading: "Shape your practice", body: "Practice the WORST bar of the routine first (the one you can't yet do). Spending 80% of practice on the hard bar advances you faster than running easy bars." },
        { id: "t_pitfall", heading: "Don't pick too hard", body: "Q-Bert at L7 = frustration. Pick a Premier hook for L7, save Q-Bert for L8 or L9 self-challenge." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Reference piece · slowed to 50%" },
      { id: "demo_target", label: "Your performance · full tempo · video" },
    ],
  },
  dj_controller_l7_03_improv_2: {
    id: "dj_controller_l7_03_improv_2",
    title: "16-cycle live freestyle · improvised scratch over a beat",
    objectives: [
      "Improvise scratches for 16 four-bar cycles (64 bars total) over a single beat loop",
      "Build intensity from simple chirps to complex multi-finger flares",
      "Land the final scratch precisely on the beat-1 of cycle 17",
    ],
    writtenContent:
      "## The freestyle\n\n16 four-bar cycles = 64 bars at 96 bpm = ~2 minutes 40 seconds. Sustained scratch improvisation. No prepared routine — pure invention over a beat loop.\n\n## The arc\n\n- Cycles 1-2: simple. Baby scratch, chirp. Statement.\n- Cycles 3-6: developing. Flares, transformers.\n- Cycles 7-10: peak. Crabs, multi-finger.\n- Cycles 11-13: variation. Hot cue chops + scratches mixed.\n- Cycles 14-16: descent. Simpler patterns, return to chirp. Final scratch lands on cycle-17 beat-1.\n\n## The discipline\n\nImprov isn't 'random.' Each cycle should evolve from the previous. If cycle 4 is a flare, cycle 5 might extend it or contrast it — but it relates. Pure novelty bar after bar = chaos.\n\n## Reference\n\nDJ Craze's freestyle battles. He sustains 60+ seconds of pure scratch invention with clear arc. Study his videos cycle-by-cycle.\n\n## Practice protocol\n\nRecord every freestyle attempt. Play back. Find the cycle where you lost the arc. Practice transitioning at that cycle. Iterate weekly.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why freestyle", body: "Freestyle is improvisation under pressure. The cert (L9) requires it. Practice now or be unprepared then." },
        { id: "t_shape",   heading: "Shape the arc", body: "Plan the climax cycle (8-9). Plan the descent cycles (14-16). The middle improv is freer, but the structural anchors are pre-decided." },
        { id: "t_pitfall", heading: "Don't blank-mind", body: "Freestyle without a plan = panic = repeating the same scratch. Have a 4-cycle skeleton in mind even when 'improvising.'" },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Beat loop alone · 96 bpm" },
      { id: "demo_target", label: "Full 16-cycle freestyle · 2:40 arc" },
    ],
  },

  // ═══ DJ_CONTROLLER · L8 ═══
  dj_controller_l8_01_style_study: {
    id: "dj_controller_l8_01_style_study",
    title: "Style study · DJ Premier, DJ Shadow, Carl Cox, Skrillex compared",
    objectives: [
      "Identify each DJ's signature transition / blending style",
      "Identify each DJ's preferred scratch / FX vocabulary",
      "Reproduce a 4-track sequence in each style",
    ],
    writtenContent:
      "## Four canonical DJs\n\n## DJ Premier (hip-hop, boom-bap)\n- Transitions: scratched hooks, doubled-up chorus snippets\n- FX: minimal — the scratching IS the FX\n- Tempo: 88-95 bpm, locked\n- Mood: gritty, soulful, NYC streets\n\n## DJ Shadow (turntablist, instrumental hip-hop)\n- Transitions: long blends with samples layered\n- FX: heavy use of loop + filter for ambient stretches\n- Tempo: 80-100 bpm, often varying\n- Mood: cinematic, sample-collage, contemplative\n\n## Carl Cox (techno, house)\n- Transitions: 3-deck blends, EQ-killing, layered drops\n- FX: filter sweeps, echo pulls\n- Tempo: 128-132 bpm, locked\n- Mood: rolling, peak-time, dancefloor-driving\n\n## Skrillex (dubstep, bass music)\n- Transitions: big drops, abrupt genre shifts, vocal edits\n- FX: heavy — beat-rolls, gates, glitch effects\n- Tempo: 140-150 bpm (or 70-75 half-time feel)\n- Mood: aggressive, drop-focused, festival-scale\n\n## The pastiche drill\n\nSame 4 tracks (you pick). Mix them in each style — Premier's scratch hooks, Shadow's long blends, Cox's 3-deck stacking, Skrillex's drop-focused cuts. Same tracks, four totally different sets.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why study these four", body: "They span DJ history's modes: hip-hop turntablism (Premier), sample-art (Shadow), techno (Cox), bass music (Skrillex). Master all four = complete DJ vocabulary." },
        { id: "t_shape",   heading: "Shape the imitation", body: "Don't half-imitate. Pick one DJ's style and commit to ALL of their tendencies for the practice mix — tempo, transitions, FX, energy. Half-imitations teach nothing." },
        { id: "t_pitfall", heading: "Don't blend the styles", body: "Premier's scratching IN a Skrillex set = mismatched. Study them separately. Synthesis comes much later, after you can render each cleanly." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Same 4 tracks in Premier + Shadow style" },
      { id: "demo_target", label: "Same 4 tracks in Cox + Skrillex style" },
    ],
  },
  dj_controller_l8_02_rep_5: {
    id: "dj_controller_l8_02_rep_5",
    title: "90-minute set · headlining-slot duration",
    objectives: [
      "Plan and perform a continuous 90-minute set",
      "Multiple peaks (2-3) with breakdowns between",
      "Cross at least one tempo or genre boundary mid-set (e.g., house → techno)",
    ],
    writtenContent:
      "## The 90-minute headliner\n\n90 minutes is a club headlining slot. It's 50% longer than the L6 hour and demands genuinely sustained attention. Most DJ failures occur in the 60-75 minute window — this is the crux.\n\n## The architecture\n\n- 0-20 min: warm-up. 122-126 bpm.\n- 20-40 min: first peak. 126-128 bpm.\n- 40-50 min: breakdown. Drop tempo, vocal track, ambient breath.\n- 50-70 min: second peak (highest). 128-130 bpm.\n- 70-80 min: third peak — surprise tempo or genre shift (e.g., into 140 bpm techno or 95 bpm hip-hop).\n- 80-90 min: comedown. End on a memorable closer.\n\n## The genre crossing\n\nPros distinguish themselves at minute 70 by surprising the crowd — a tempo cut from house to drum-and-bass (124 → 174 bpm halved feels like a doubling), or a genre swerve from techno to bass music. The skill is doing it gracefully — usually via a half-tempo bridge or a scratched transition.\n\n## Reference\n\nCarl Cox's 90-min Tomorrowland mainstage sets show this arc precisely. Watch his crowd shots — peaks at minute 30, 55, and 75.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why 90 min", body: "It's the difference between opening DJ and headlining DJ. 90-min control is the credential for paid headlining work." },
        { id: "t_shape",   heading: "Shape the genre cross", body: "If you cross genres mid-set, plan WHERE and HOW. A scratched transition or a half-tempo bridge are the two clean options. Random drop = jarring." },
        { id: "t_pitfall", heading: "Don't fade in the third peak", body: "Many DJs run out of energy or ideas at minute 70+. The third peak is harder than the first — save your best track for here, not for the first peak." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "First 30 min · warm-up + first peak" },
      { id: "demo_target", label: "Full 90-min set · 3 peaks · genre cross at minute 70" },
    ],
  },
  dj_controller_l8_03_accompany: {
    id: "dj_controller_l8_03_accompany",
    title: "Peak-time accompaniment · DJ supporting an MC or live vocalist",
    objectives: [
      "Mix a 30-min set with a live MC / vocalist on top",
      "Drop and re-introduce beats around the vocalist's phrasing",
      "Use FX (echo, filter) to create vocal landing zones",
    ],
    writtenContent:
      "## The DJ + MC duet\n\nIn hip-hop, drum-and-bass, dancehall, and grime, the DJ supports a live MC. The DJ is no longer center stage — the MC is. The DJ creates a beat backdrop and shapes it around the MC's flow.\n\n## The technique\n\n- Drop the beat for MC's solo bars (no drums, just bassline + atmosphere)\n- Re-enter with a kick on the MC's phrase landing\n- Echo / filter the beat at MC's call-and-response moments\n- Cue the MC by raising your hand or pointing — they trigger their verse on your cue\n\n## Communication\n\nIn-ear monitor or stage monitor. You hear the MC clearly. Headphones for cue. Eye contact frequently — MCs cue you with nods.\n\n## Volume discipline\n\nMC needs to be 6-10 dB above the music. Sub-mix the music. The MC is the lead voice; you're the band.\n\n## Reference\n\nDJ Cash Money + MC Marvellous. DMX + DJ Whoo Kid. Skepta + DJ Maximum (grime). Watch how the DJ's beat dynamically responds to the MC's energy — that responsiveness is the skill.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why MC accompaniment", body: "Pure DJing is one path. DJ + MC sets are another, especially in hip-hop, grime, and dancehall scenes. The skills overlap but the role flips — you're now the band, not the front person." },
        { id: "t_shape",   heading: "Shape the drop", body: "MC verses peak with the kick re-entry. Drop kick for 4 bars before MC's punchline, re-enter on punchline beat-1. The drop creates anticipation, the re-entry lands the line." },
        { id: "t_pitfall", heading: "Don't compete with the MC", body: "If your beat is so loud or busy that the MC is buried, you've failed the gig. Step back, sub-mix, support." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Sample MC accompaniment · single verse" },
      { id: "demo_target", label: "Full 30-min DJ + MC set · peak-time" },
    ],
  },

  // ═══ DJ_CONTROLLER · L9 ═══
  dj_controller_l9_01_compose: {
    id: "dj_controller_l9_01_compose",
    title: "Compose an original mashup · 5-minute released-quality edit",
    objectives: [
      "Combine 2+ source tracks into an original mashup with new structure",
      "Use sample re-arrangement, key shifting, and added FX to create new music",
      "Master the mashup to streaming-ready loudness and submit as a release",
    ],
    writtenContent:
      "## The mashup as composition\n\nA professional mashup isn't 'two songs played at once.' It's a NEW composition — chord progression from track A, melody from track B, drums from track C, with key-shifting, time-stretching, EQ surgery, and original FX added.\n\n## The DAW tool\n\nMashups are made in Ableton Live, Logic, or FL Studio — not a DJ controller. You're moving from performer to producer for this lesson.\n\n## The arrangement\n\n- Intro (16 bars): track B's melody alone, atmospheric\n- Verse (32 bars): track A's chords + track C's drums + track B's vocal\n- Build (16 bars): risers, snare rolls, filter sweeps\n- Drop / Chorus (32 bars): all elements combined, full energy\n- Breakdown (16 bars): vocals only, ambient pads\n- Final chorus (32 bars): bigger than first, added FX layers\n\n## The technical requirements\n\n- Key-shift any track by up to ±2 semitones to align\n- Time-stretch any track by ±10% to match BPM\n- EQ-carve so each track occupies a different spectral lane\n- Master to -14 LUFS, -1 dB true peak\n\n## The legal note\n\nMashups using copyrighted source material are technically infringing. For your portfolio, this is fine. For commercial release, clear samples through Tracklib or similar service.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why compose mashups", body: "Top DJs (Diplo, A-Trak, Skrillex) are also producers. Mashups are the gateway from DJing to producing — same musical instinct, different toolset." },
        { id: "t_shape",   heading: "Shape the new music", body: "A mashup that just plays two tracks together is mediocre. A mashup that creates NEW emotional content from the combination is great. Aim for new content." },
        { id: "t_pitfall", heading: "Don't keyshift more than 2 semitones", body: "More than 2 semitones makes vocals sound chipmunked or muddy. If your tracks are too far apart in key, pick different tracks." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Each source track alone · before mashup" },
      { id: "demo_target", label: "Full 5-min original mashup · mastered" },
    ],
  },
  dj_controller_l9_02_masterclass: {
    id: "dj_controller_l9_02_masterclass",
    title: "Masterclass · teach transitions to intermediate DJs",
    objectives: [
      "Record a 12-minute masterclass on transition technique",
      "Cover phrase alignment, EQ swap, FX gestures, and harmonic compatibility",
      "Provide a take-home assignment with a measurable success criterion",
    ],
    writtenContent:
      "## You as the transition teacher\n\nL9 masterclass: a 12-minute video lecture on DJ transitions for intermediate students (post-L4, pre-L7).\n\n## The structure\n\n- Minutes 0-2: concept. What is a good transition? Listen to a bad transition, then a great one. Articulate the difference.\n- Minutes 2-6: phrase alignment + EQ swap. Demonstrate live with two tracks. Show the mistake (mid-phrase blend, no EQ swap), then the correction.\n- Minutes 6-9: FX gestures. Show filter sweep, echo pull, reverb tail as transition tools. Explain when to use each.\n- Minutes 9-11: harmonic compatibility. Camelot wheel quick refresh. Demonstrate compatible vs incompatible blend.\n- Minutes 11-12: take-home assignment. 'Mix three tracks, all phrase-aligned, with one EQ swap and one FX gesture per transition. Submit by next session.'\n\n## What separates masterclass from tutorial\n\nMasterclass = JUDGMENT. Tutorial shows steps. Masterclass shows why those steps. Narrate the why. 'I cut the highs at this moment because the incoming track has prominent hi-hats — keeping the outgoing highs would clash.'\n\n## Reference\n\nDJ TLM, DJ Tips, Digital DJ Tips on YouTube — they teach transitions well. Watch their pacing and language.",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why teach transitions", body: "Transitions are 90% of DJing. Teaching them tests if you've internalized the craft enough to articulate it. Most DJs can't — they 'feel' it but can't explain. L9 demands explanation." },
        { id: "t_shape",   heading: "Shape the lecture", body: "Concept → demonstration → corrective comparison → assignment. This is the standard pedagogical loop. Memorize and use it." },
        { id: "t_pitfall", heading: "Don't lecture, demonstrate", body: "12 minutes of you talking = boring. 12 minutes of you doing things and explaining as you go = engaging. Always be hands-on." },
      ],
    },
    audioRefs: [
      { id: "demo_slow",   label: "Reference: a Digital DJ Tips transition lesson" },
      { id: "demo_target", label: "Your masterclass · 12 min recorded with hands visible" },
    ],
  },
  dj_controller_l9_03_genius_cert: {
    id: "dj_controller_l9_03_genius_cert",
    title: "Genius Certificate · 2-hour club set recital",
    objectives: [
      "Perform a continuous 2-hour club set in a live or simulated club environment",
      "Include at least one of each: scratched transition, live remix, B2B-style trade with self (deck swap), genre cross",
      "Provide tracklist + 500-word self-assessment of the set",
    ],
    writtenContent:
      "## The Genius cert\n\n2 hours. Continuous. Club-grade. The credential of a working DJ ready for headlining slots and festival bookings.\n\n## Required content\n\n- 2 hours, no gaps, no dead air\n- 24-30 tracks (at average 4-5 min per track)\n- 3+ peaks with breakdowns between\n- At least one scratched transition\n- At least one live remix moment (8-bar loop + FX over 32 bars)\n- One deliberate genre or tempo cross\n- One closing track that resolves the entire arc\n\n## The architecture\n\n- 0-30 min: warm-up. 122-124 bpm. Soulful. Build interest without exhausting.\n- 30-60 min: first peak. 126-128 bpm. Dance-floor commits.\n- 60-75 min: breakdown. Vocal track. Reset crowd.\n- 75-105 min: second peak (highest). Big tracks. Most powerful 30 min.\n- 105-120 min: closing. Memorable, slightly slower, leaves crowd elated.\n\n## The deliverable\n\n- 2-hour audio file (WAV preferred, 320 kbps MP3 acceptable)\n- Full tracklist with Camelot codes\n- 500-word self-assessment (what worked, what didn't, what you'd change)\n- Optional: video of the booth performance (preferred for grader scrutiny of technique)\n\n## What this credential means\n\nPassing the Genius cert means you are bookable as a headlining DJ in clubs. The graders judge against current professional standard (Resident Advisor podcasts, Boiler Room sets, BBC Radio 1 mixes).",
    drills: {
      teach: [
        { id: "t_why",     heading: "Why this cert", body: "It's the highest credential the app issues for DJ controller. Above this, you're booking yourself. Below this, you're still credentialing." },
        { id: "t_shape",   heading: "Shape the 2-hour journey", body: "2 hours is a long arc. Plan in 15-min blocks, not 30-min. More granular planning = better-shaped set." },
        { id: "t_pitfall", heading: "Don't fade after minute 90", body: "Common 2-hour failure: DJ peaks at minute 60, then fades. Train for the 90-120 minute window specifically — that's where weak DJs fail." },
      ],
    },
    audioRefs: [
      { id: "demo_target", label: "Full 2-hour Genius set · all required techniques · club-grade recording" },
    ],
  },
};
