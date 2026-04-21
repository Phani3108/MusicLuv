/**
 * Hand-authored L2-L4 overrides · keyboard + electronic:
 * accordion · synth · dj_controller.
 *
 * These instruments span genres — accordion (global folk),
 * synthesizer (electronic/experimental), DJ controller (electronic
 * performance). Each requires its own pedagogy, but L2-L4 builds
 * fundamentals before genre-specific technique.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const KEYBOARD_ELECTRONIC_EXPANSION_OVERRIDES: Record<string, Patch> = {
  // ═══ ACCORDION · L2 ═══
  accordion_l2_01_scale: {
    id: "accordion_l2_01_scale",
    title: "Right-hand C major scale · bellows steady",
    objectives: [
      "Play C major scale (8 notes) with right hand",
      "Bellows maintain even pressure across the scale",
      "Introduce left-hand bass button coordination",
    ],
    writtenContent:
      "## Accordion fundamentals\n\nAccordion = right hand (piano-style keys or button keys), left hand (bass + chord buttons), bellows (air supply).\n\nThree independent systems. Coordination is the core skill.\n\n## Right hand\n\nPiano-accordion: same as piano (keys of C major). Button-accordion: a 3-row grid; C scale requires specific button pattern.\n\nThis lesson assumes piano-accordion.\n\n## Bellows\n\nLike harmonium — constant, smooth bellows motion. Open (pulling apart) and close (pushing together). Both directions produce sound. Bellows direction is independent of note played.\n\n## Left hand\n\nBass buttons: each button produces a single bass note + chord. The C-row: C bass + C major chord. Most basic pattern for this lesson.\n\n## The drill\n\n1. Bellows alone: open/close smoothly for 30 seconds.\n2. Right hand: C major scale at 60 bpm.\n3. Combined: scale with bellows (no left hand yet).\n4. Full: add left-hand C bass on every downbeat.",
    drills: {
      teach: [
        { id: "t_bellows_smooth", heading: "Bellows smoothness is king", body: "Jerky bellows = tonal lurches. Smooth open/close = even tone. Practice bellows motion without any notes until it's reflexive." },
        { id: "t_three_systems", heading: "Three systems, learn separately", body: "Don't combine too fast. Bellows alone first (hand weight on bellows only). Right hand alone (bellows held). Then combine. Then add left hand. Layer." },
        { id: "t_pitfall", heading: "Don't slam bellows at direction change", body: "Open → close transition: smooth deceleration + reversal. Hard slam = pop + lurch. Deliberate slowing at each end of bellows travel." },
      ],
    },
    audioRefs: [
      { id: "demo_bellows", label: "Bellows only · open/close smoothness" },
      { id: "demo_scale_rh", label: "C scale right hand · with bellows" },
      { id: "demo_full", label: "C scale + left bass · 60 bpm" },
    ],
  },
  accordion_l2_02_two_note: {
    id: "accordion_l2_02_two_note",
    title: "C and G alternation · bass + chord coordination",
    objectives: [
      "Alternate C bass and G bass on left hand",
      "Right hand sustains C major chord",
      "Bellows steady throughout",
    ],
    writtenContent:
      "## Oom-pah · the accordion's signature\n\nLeft hand pattern: bass on downbeat, chord on upbeat. Bass note alternates between tonic (C) and dominant (G). This is 'oom-pah-oom-pah' — the bounce that makes accordion music dance.\n\n## Left hand\n\n- Beat 1: C bass button\n- Beat 2: C chord button\n- Beat 3: G bass button\n- Beat 4: C chord button\n\nRepeat.\n\n## Right hand\n\nSustains C major chord (C + E + G) throughout. Or plays a simple melody. For this lesson: chord.\n\n## The rhythmic feel\n\nOom (bass) is weighty. Pah (chord) is light. The contrast is the dance. Polka, waltz, French musette — all use this foundation.\n\n## What's hard\n\nCoordinating three things: right hand holds chord, left alternates bass/chord, bellows stays steady. If you focus on left hand, right hand drops. If you focus on bellows, left hand lurches.\n\nPractice each hand alone before combining.",
    drills: {
      teach: [
        { id: "t_oom_pah_feel", heading: "Oom-pah is a physical dance", body: "Your whole body should feel the bass beat. It's not just fingers — it's weight shifting slightly downward on oom, upward on pah. The instrument dances with you." },
        { id: "t_bass_button_finding", heading: "Left-hand button layout is not visual", body: "You can't see left-hand buttons. You find them by feel. Practice locating C and G bass buttons with eyes closed. Reference points: C has a dimple; G is 2 buttons below." },
        { id: "t_pitfall", heading: "Don't slam the oom", body: "Heavy bass = clumsy. Bass should feel like a firm, confident press — not a slap. The chord should feel like a gentle release." },
      ],
    },
    audioRefs: [
      { id: "demo_oom_pah", label: "Oom-pah · C and G alternating · 80 bpm" },
      { id: "demo_full", label: "Right-hand chord + oom-pah · complete feel" },
    ],
  },
  accordion_l2_03_tempo: {
    id: "accordion_l2_03_tempo",
    title: "Oom-pah at 100 bpm · 16 bars steady",
    objectives: [
      "Maintain oom-pah pattern for 16 bars at 100 bpm",
      "Right hand sustains chord changes (C to G to C)",
      "Bellows steady without fatigue",
    ],
    writtenContent:
      "## 16 bars of oom-pah\n\n100 bpm × 4 beats × 16 bars = 64 beats of left-hand pattern. That's ~38 seconds of continuous oom-pah-oom-pah.\n\n## Right-hand chord changes\n\nBars 1-4: C major.\nBars 5-8: G major.\nBars 9-12: C major.\nBars 13-16: G to C to G to C (half-bar changes).\n\nThe I-V-I-V pattern. Standard folk harmony.\n\n## Left hand syncs\n\nWhen right hand plays G, left hand's chord button must match (G chord on 'pah'). Coordination: right hand sets harmony, left hand follows.\n\n## The fatigue moment\n\nBar 10-12 is where students fatigue. Arm tires from bellows. Left hand loses precision. Keep bellows smooth; the discipline persists.\n\n## Listen for\n\nDrift. Are you behind the metronome at bar 12? That's bellows lag. Recover = slightly advance bellows speed.",
    drills: {
      teach: [
        { id: "t_harmony_sync", heading: "Harmonies must sync", body: "When right hand plays G, left hand's chord button plays G. They must match. Otherwise, dissonance. Drill chord changes slowly until both hands move together." },
        { id: "t_endurance", heading: "Endurance is practice", body: "16 bars feels long because accordion is physical. Shoulder, back, arms, bellows all working. Build endurance: 4 bars on day 1, 8 bars day 3, 16 bars day 5." },
        { id: "t_pitfall", heading: "Don't overbent right hand", body: "Piano-accordion's right hand is at an awkward angle. Don't contort wrist. Relaxed wrist + finger activity. Contorting = tendinitis risk." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Oom-pah + I-V-I-V · 80 bpm · 16 bars" },
      { id: "demo_target", label: "Oom-pah · 100 bpm target" },
    ],
  },
  accordion_l2_04_first_piece: {
    id: "accordion_l2_04_first_piece",
    title: "'La Vie en Rose' · classic accordion chanson",
    objectives: [
      "Play simplified melody of 'La Vie en Rose' with right hand",
      "Left hand oom-pah in 4/4",
      "Maintain romantic accordion feel throughout",
    ],
    writtenContent:
      "## 'La Vie en Rose'\n\nEdith Piaf classic. French. Quintessential accordion piece. Heard in every Paris café, every French film, every accordion recital.\n\n## Simplified melody\n\nUses C, D, E, G, A (C major pentatonic + F). Right hand plays the iconic melodic phrase while left hand maintains oom-pah.\n\n## Tempo\n\n84 bpm. Slower than oom-pah drill. Romantic, waltzing.\n\n## The feel\n\nNot mechanical. Accordion expressiveness comes from:\n- Subtle bellows dynamics (slight swells + dips)\n- Slight rubato (tempo flexibility on melody peaks)\n- Legato melody (no tongue, just fingers and bellows)\n\n## What's new\n\nFirst time combining melody + chord accompaniment + dynamics. This is the full accordion texture. Master this piece = you know what accordion playing feels like.\n\n## Practice arc\n\nWeek 1: right hand melody alone.\nWeek 2: left hand oom-pah alone (with chord changes).\nWeek 3: combined, 60 bpm.\nWeek 4: up to 84 bpm with feel.",
    drills: {
      teach: [
        { id: "t_romance", heading: "Play like Piaf", body: "Edith Piaf sings this with heartbreak + love. Try to channel that emotion. Romantic, melancholic, nostalgic. Your accordion should feel those moods." },
        { id: "t_bellows_dynamics", heading: "Subtle bellows swells", body: "At phrase peaks, slightly increase bellows pressure (crescendo). At phrase endings, slight decrease. This is how accordion 'sings.' Without it, the melody is flat." },
        { id: "t_pitfall", heading: "Don't rush to learn", body: "La Vie en Rose in a week = sloppy. 3-4 weeks of focused practice = professional-feeling. The romantic feel takes time to internalize." },
      ],
    },
    audioRefs: [
      { id: "demo_melody", label: "Right-hand melody · 60 bpm" },
      { id: "demo_full_slow", label: "Combined · 70 bpm" },
      { id: "demo_target", label: "La Vie en Rose · 84 bpm full feel" },
    ],
  },

  // ═══ ACCORDION · L3 ═══
  accordion_l3_01_first_song: {
    id: "accordion_l3_01_first_song",
    title: "'Beer Barrel Polka' · polka fundamentals",
    objectives: [
      "Play the main polka melody at 120 bpm",
      "Lively oom-pah feel",
      "Maintain energy across 16 bars",
    ],
    writtenContent:
      "## Polka feel\n\nPolka = fast, lively, 2/4 time. Oom-pah-oom-pah, but driving. Think: beer hall, dancing, celebration.\n\n## 'Beer Barrel Polka'\n\n1927 Czech-origin tune. Universally recognized. The accordion's ultimate crowd-pleaser.\n\n## Tempo\n\n120 bpm (fast). Compared to La Vie en Rose's 84 bpm, polka needs more energy + faster coordination.\n\n## What's hard\n\n- Fast bellows direction changes\n- Fast left-hand bass/chord alternation\n- Maintaining melodic clarity at speed\n\n## The energy\n\nPolka is joyous. Play with a smile. Tense arms = tight sound = failed polka. Relaxed + energized = right feel.\n\n## Arrangement\n\nMain theme: 8 bars.\nBridge: 4 bars.\nReturn: 4 bars.\n\n16 bars total. Loop as desired for extended performance.",
    drills: {
      teach: [
        { id: "t_energy", heading: "Polka is energy", body: "Think of polka as running, not walking. Every beat has drive. Even the 'pah' (chord) has buoyancy — not slumpy, but lifting toward the next bass." },
        { id: "t_fast_bellows", heading: "Fast bellows reversals", body: "At 120 bpm, bellows changes direction more often. Keep air flow even through reversals — instant deceleration + acceleration. Practice empty-air bellows reversals to build the motion." },
        { id: "t_pitfall", heading: "Don't get tense at 120 bpm", body: "Faster tempo + worry = shoulder tension + stiff fingers. Relax consciously. Smile if needed. Loose body = accurate + energized playing." },
      ],
    },
    audioRefs: [
      { id: "demo_theme", label: "Beer Barrel main theme · 120 bpm" },
      { id: "demo_full", label: "Full 16-bar arrangement" },
    ],
  },
  accordion_l3_02_dynamics: {
    id: "accordion_l3_02_dynamics",
    title: "Bellows dynamics · accordion's expressive range",
    objectives: [
      "Play a note from pp to ff using bellows pressure",
      "Apply across a La Vie en Rose phrase",
      "Maintain pitch stability",
    ],
    writtenContent:
      "## Accordion dynamics\n\nUnique to accordion: dynamics come entirely from bellows pressure, not key velocity (unlike piano).\n\n- **pp**: minimal bellows pressure. Barely any air moving. Note speaks delicately.\n- **ff**: heavy bellows pressure. Air rushing. Note booms.\n\n## The arc\n\nSustain C4 with right hand. Start pp (tiny pressure). Crescendo linearly over 4 beats to ff (maximum pressure). Decrescendo back over 4 beats.\n\n## Pitch check\n\nUnlike harmonium, accordion's pitch is very stable regardless of bellows pressure (it's mechanically regulated by valves). But tone quality shifts — pp is thin, ff is full. Embrace the timbre variation.\n\n## Apply to La Vie\n\nBars 1-4: mp.\nBars 5-8: crescendo to f at the peak phrase.\nBars 9-12: decrescendo back.\nBars 13-16: pp, whispered resolution.\n\n## Musical impact\n\nAccordion without dynamics = music box. Accordion with dynamics = living, breathing voice. Master bellows dynamics = master the instrument.",
    drills: {
      teach: [
        { id: "t_pressure_scale", heading: "Pressure = volume, linear", body: "Tiny pressure = tiny sound. Heavy pressure = huge sound. There's a direct, intuitive relationship. Feel it in your arms — the weight you apply translates directly." },
        { id: "t_mood_from_dynamics", heading: "Dynamics are mood", body: "ff = joy, excitement. pp = intimacy, secrecy. mp = conversation, storytelling. Choose dynamics based on the emotional arc you want to create." },
        { id: "t_pitfall", heading: "Don't sit at one dynamic", body: "A piece at constant mp = boring, even if technically correct. Vary. The smallest song should have a dynamic arc. Without it, no shape." },
      ],
    },
    audioRefs: [
      { id: "demo_arc", label: "Dynamic arc · pp to ff · 8 beats" },
      { id: "demo_la_vie_dyn", label: "La Vie with full dynamic arc" },
    ],
  },
  accordion_l3_03_articulation: {
    id: "accordion_l3_03_articulation",
    title: "Legato vs staccato · accordion-style",
    objectives: [
      "Play a phrase legato (smooth, sustained)",
      "Play same phrase staccato (detached, bouncy)",
      "Mix in one phrase for variety",
    ],
    writtenContent:
      "## Accordion articulation\n\n**Legato**: notes connect, overlap slightly. No break.\n\n**Staccato**: notes are short, detached. Clear air between.\n\n## How on accordion\n\nLegato: hold each key slightly past the next key's press. Bellows stays active. The two notes overlap ~50ms.\n\nStaccato: press key briefly (40% of beat duration). Release. Next note presses. Clear gap between notes.\n\n## Bellows accent\n\nFor emphatic staccato, match key release with slight bellows 'pause' (reduce pressure to near-zero, immediately restart). This creates stronger detachment.\n\n## Musical use\n\nLa Vie en Rose: legato melody (romantic).\nBeer Barrel Polka: staccato melody (bouncy).\nOr mix within one piece for variety.\n\n## Drill\n\nSame La Vie phrase, three ways:\n1. All legato.\n2. All staccato.\n3. Mixed: bars 1-2 legato, bars 3-4 staccato.",
    drills: {
      teach: [
        { id: "t_overlap", heading: "Legato = overlap", body: "The key is held briefly past the next. 50ms overlap = seamless legato. Zero overlap = detaché. Practice timing the release." },
        { id: "t_bounce_staccato", heading: "Staccato is bouncy, not abrupt", body: "Staccato notes should feel like raindrops — quick but musical. Not a stab. Short but round. Release swiftly, not forcefully." },
        { id: "t_pitfall", heading: "Don't change bellows during articulation", body: "Bellows stays steady throughout. Articulation = key-press timing, not bellows changes. Changing bellows for every note = exhausting + lurchy." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "La Vie phrase · legato" },
      { id: "demo_staccato", label: "La Vie phrase · staccato (unusual feel)" },
      { id: "demo_mixed", label: "Mixed articulation" },
    ],
  },
  accordion_l3_04_standard_cert: {
    id: "accordion_l3_04_standard_cert",
    title: "Standard Certificate · accordion 2-min",
    objectives: [
      "Perform 'La Vie en Rose' + opening of 'Beer Barrel Polka'",
      "Contrast: La Vie romantic, Polka energetic",
      "Maintain oom-pah coordination throughout",
    ],
    writtenContent:
      "## The cert\n\n2 minutes. 'La Vie en Rose' (1:15, romantic) + opening 45 seconds of 'Beer Barrel Polka' (energetic).\n\n## Grading\n\n1. **Coordination**: right + left hand + bellows synced.\n2. **Tempo**: 84 bpm on La Vie, 120 bpm on Polka.\n3. **Dynamics**: clear arc in La Vie.\n4. **Feel**: romantic vs polka distinction audible.\n5. **Stamina**: no breakdowns across the 2 minutes.\n\n## Transitions\n\nBetween pieces, 3-second pause. Reset mentally. Shift from romantic mode to polka mode. The grader expects contrast — give it to them.\n\n## Pre-cert prep\n\nWeek 1: polish La Vie.\nWeek 2: polish Polka.\nWeek 3: combined practice, transitions.\nWeek 4: record + submit.",
    drills: {
      teach: [
        { id: "t_mood_shift", heading: "Mode shift between pieces", body: "La Vie and Polka are emotional opposites. Don't carry romantic energy into Polka. Between pieces, mentally 'reset' — change your posture, breathing, mindset. Play the new mood fully." },
        { id: "t_coord_audit", heading: "Coordination = pass/fail", body: "If right + left + bellows are out of sync at any point, you lose points. Drill coordination to reflexive level before recording." },
        { id: "t_pitfall", heading: "Don't try fancy tricks", body: "Cert is about fundamentals done well, not creative flourishes. Play the pieces cleanly and with character. No improv, no extra ornaments." },
      ],
    },
    audioRefs: [
      { id: "demo_cert", label: "Full cert performance · La Vie + Polka" },
    ],
  },

  // ═══ ACCORDION · L4 ═══
  accordion_l4_01_scale_two: {
    id: "accordion_l4_01_scale_two",
    title: "G major scale · right hand with left-hand chord accompaniment",
    objectives: [
      "Play G major scale with right hand",
      "Left hand holds G major chord throughout",
      "Maintain bellows steadiness",
    ],
    writtenContent:
      "## Expanding to G major\n\nYou learned C major in L2. G major is the next step — adds one sharp (F#), but otherwise similar shape.\n\n## Right-hand scale\n\nG A B C D E F# G. On piano-accordion: start on G (5th white key from middle C), use finger 1-2-3-1-2-3-4-5 pattern (or thumb-under on F#).\n\n## Left-hand chord\n\nHold G major chord button. Don't change it. Sustain the chord through all 8 right-hand notes.\n\n## The drill\n\n1. Right hand alone, 60 bpm.\n2. Left hand G chord alone (hold 8 beats).\n3. Combined: scale over sustained chord.\n4. Repeat descending.\n\n## What's new\n\nTwo hands doing different things. Right hand moves; left hand holds. This independence is a step beyond L2's unified oom-pah.",
    drills: {
      teach: [
        { id: "t_independence", heading: "Hand independence", body: "The goal here isn't scale speed — it's independence. Your left hand should feel stable while right hand runs. If they interfere, slow down until they don't." },
        { id: "t_f_sharp", heading: "F# is piano black key", body: "F# is a black key. Finger it with 4th finger (ring), approaching from E via smooth keyboard motion. Don't avoid or hesitate — F# is fundamental to G major." },
        { id: "t_pitfall", heading: "Don't sustain left-hand loud", body: "Left hand holds the chord but softly. If you hold firm + bellows pressure is high, the chord dominates and drowns the scale. Balance: scale forward, chord behind." },
      ],
    },
    audioRefs: [
      { id: "demo_rh", label: "G major right hand · 60 bpm" },
      { id: "demo_full", label: "Scale + chord accompaniment · 72 bpm" },
    ],
  },
  accordion_l4_02_ornament: {
    id: "accordion_l4_02_ornament",
    title: "Trill · rapid alternation between two notes",
    objectives: [
      "Execute a trill between C and D (rapid alternation)",
      "Apply to a phrase-peak note",
      "Maintain tempo and bellows throughout",
    ],
    writtenContent:
      "## Trill · the shimmer ornament\n\nTrill = rapid alternation between the note you're playing + the note above. E.g., on C: trill = C-D-C-D-C-D at 8-12Hz.\n\n## Technique\n\nOn piano-accordion: 2nd and 3rd fingers rapidly alternate on adjacent keys. Finger motion small, rapid, relaxed.\n\n## Where\n\nBefore a phrase resolution. On a held high note for emphasis. Not too often — overused trills sound frantic.\n\n## Speed\n\nSlow trill: 4Hz (baroque feel).\nFast trill: 8-12Hz (romantic feel).\n\nChoose based on musical context.\n\n## Bellows\n\nBellows stays steady during trill. The shimmer is all in the fingers.",
    drills: {
      teach: [
        { id: "t_finger_relax", heading: "Relaxed fingers trill faster", body: "Tense fingers = slow trill + fatigue. Relax the hand, keep motion minimal. Let the finger bounce on the key, not press hard." },
        { id: "t_count_start", heading: "Count the trill start", body: "A trill usually starts on the upper neighbor (D if trilling on C). Then C, D, C, D alternates. Remember this convention — baroque + classical practice." },
        { id: "t_pitfall", heading: "Don't trill every phrase", body: "Trills are highlights. Sprinkle sparingly. 1-2 trills per 8-bar phrase maximum. More = sounds like trying too hard." },
      ],
    },
    audioRefs: [
      { id: "demo_trill", label: "Trill on C · 8Hz · 2 seconds" },
      { id: "demo_phrase", label: "La Vie phrase with trill on peak" },
    ],
  },
  accordion_l4_03_rep_1: {
    id: "accordion_l4_03_rep_1",
    title: "'Under Paris Skies' · French musette classic",
    objectives: [
      "Learn 16 bars of the musette theme",
      "Apply oom-pah + dynamics + subtle rubato",
      "Maintain romantic accordion style",
    ],
    writtenContent:
      "## French musette\n\nClassic Parisian café style. Romantic, wistful, often in 3/4 (waltz time) or 4/4.\n\n## 'Sous le Ciel de Paris' ('Under Paris Skies')\n\nHubert Giraud, 1951. Iconic musette. 16-bar main theme = most famous accordion phrase.\n\n## Style\n\n- Romantic but not cloying\n- Rubato: slight tempo flexibility on melody peaks\n- Bellows dynamics: subtle swells + dips\n- Legato melody with very clean oom-pah under\n\n## What's new\n\nRubato. Pushing and pulling tempo within bars. This is *musicality*, not sloppiness. Masters use rubato deliberately.\n\n## Technical path\n\nWeek 1: notes + rhythm, metronome 80 bpm.\nWeek 2: add dynamics.\nWeek 3: add rubato at phrase peaks.\nWeek 4: record, polish, submit.\n\n## The line between rubato and sloppy\n\nRubato = intentional push/pull for expression. Sloppy = accidental drift because you can't lock tempo. If you're at L4, you should already have steady tempo; now you can earn rubato by using it deliberately.",
    drills: {
      teach: [
        { id: "t_rubato", heading: "Rubato is a shaped delay", body: "A rubato phrase takes its time at the peak, arrives at resolution slightly late, but aligns to tempo by the next downbeat. It's a wave, not a drift." },
        { id: "t_paris_mood", heading: "Embody Paris", body: "This is music of cafés, rain, lovers, evening. Play with that melancholy + warmth. Not tragic, not cheerful — wistful. The mood makes the piece." },
        { id: "t_pitfall", heading: "Don't rubato every bar", body: "Rubato on every bar = drifting tempo = lost. Pick 2-3 strategic rubato moments per 16 bars. Hit them hard. Leave the rest metronomic." },
      ],
    },
    audioRefs: [
      { id: "demo_theme", label: "Sous le Ciel theme · 80 bpm" },
      { id: "demo_full_feel", label: "Full 16 bars with rubato + dynamics" },
    ],
  },
  accordion_l4_04_practice_rout: {
    id: "accordion_l4_04_practice_rout",
    title: "Accordion · 15-min practice block",
    objectives: [
      "Structure: bellows (2) + scales (5) + repertoire (8)",
      "Include one polka + one chanson each session",
      "Record + review weekly",
    ],
    writtenContent:
      "## The 15-min block\n\n**2 min · Bellows drill** — open/close smoothly, no notes. Warm up the motion.\n\n**5 min · Scales** — C major and G major scales. Right hand with left-hand chord accompaniment.\n\n**8 min · Repertoire** — alternate days: polka (Beer Barrel) and chanson (La Vie en Rose or Sous le Ciel).\n\n## Why 2 genres?\n\nAccordion's range is vast: polka, chanson, folk, classical, tango, klezmer. By rotating, you develop versatility. Focusing only on one style = narrow skill.\n\n## Posture check\n\nAccordion is heavy. Back strain is common. Sit upright. Shoulder straps adjusted. If your back aches after 15 min, your posture or straps are wrong.\n\n## Weekly recording\n\nSunday: record 1 minute of each style. Compare weeks. Progress across 4 weeks is visible.",
    drills: {
      teach: [
        { id: "t_bellows_warmup", heading: "Bellows warmup first", body: "Cold bellows + cold arm = tight sound + risk of strain. 2 minutes of smooth bellows (no notes) wakes up the motion. Always." },
        { id: "t_genre_rotation", heading: "Rotate genres", body: "Monday chanson, Tuesday polka, Wednesday chanson, Thursday polka. This rotation broadens skill. Focusing only on chanson = one-dimensional player." },
        { id: "t_pitfall", heading: "Don't ignore back", body: "Accordion's weight fatigues your back. If shoulder strap bites, adjust. If lower back aches, sit differently. Ignoring discomfort = chronic injury." },
      ],
    },
    audioRefs: [
      { id: "bellows_warmup", label: "2-min bellows warmup · reference" },
      { id: "demo_routine", label: "Full 15-min practice · polka + chanson" },
    ],
  },

  // ═══ SYNTH · L2 ═══
  synth_l2_01_scale: {
    id: "synth_l2_01_scale",
    title: "Synth · C major scale with patch exploration",
    objectives: [
      "Play C major scale with right hand",
      "Switch between 3 different patches (synth sounds)",
      "Hear how same notes sound different per patch",
    ],
    writtenContent:
      "## Synth = sound design instrument\n\nUnlike piano (one sound), synth produces hundreds of different sounds via *patches* (pre-programmed tones: bass, lead, pad, brass, strings, etc.).\n\n## The scale, three ways\n\n1. Play C D E F G A B C with a **bass patch** (deep, warm tone). Feel the weight.\n2. Same scale with a **lead patch** (bright, sharp, cutting). Feel the aggression.\n3. Same scale with a **pad patch** (lush, sustained). Feel the breath.\n\nSame notes. Totally different feelings. This is synth's magic — the *sound* is an instrument choice.\n\n## Your first patches\n\nMost synths ship with 100+ presets. Explore. Find 3 favorites. Bookmark them. These are your go-to sounds for L2.\n\n## Why patches before technique\n\nUnlike piano where technique defines sound, synth's sound is mostly the patch. So you must know the patches + choose well. This is why L2 focuses here.",
    drills: {
      teach: [
        { id: "t_patch_choice", heading: "Patch = 80% of the sound", body: "Your technique matters, but patch choice matters more. A great pianist can't make a bass patch sound like a lead. Choose your patch first; then play." },
        { id: "t_listen_patches", heading: "Explore the factory presets", body: "Spend 30 minutes listening to every factory preset. Note which ones inspire you. Label them. This library is your palette." },
        { id: "t_pitfall", heading: "Don't stick with preset 1", body: "Default preset is usually a simple piano. Move beyond. Try bass, lead, pad, brass — use the full range. Synth's strength is variety." },
      ],
    },
    audioRefs: [
      { id: "demo_bass", label: "C scale · bass patch" },
      { id: "demo_lead", label: "C scale · lead patch" },
      { id: "demo_pad", label: "C scale · pad patch" },
    ],
  },
  synth_l2_02_two_note: {
    id: "synth_l2_02_two_note",
    title: "Filter sweep · synthesis fundamentals",
    objectives: [
      "Play sustained C with filter cutoff knob",
      "Sweep filter from closed to open",
      "Understand filter's effect on timbre",
    ],
    writtenContent:
      "## Synthesis basics\n\nSynthesizers aren't just pre-made sounds. You can *shape* sounds in real-time using synth parameters. Most important: the **filter**.\n\n## The filter\n\nA filter removes high frequencies. 'Closed' filter = warm, muted. 'Open' filter = bright, shrill.\n\nSweeping the filter cutoff knob while playing = dynamic tone change. This is dub, techno, house, synth-pop's signature effect.\n\n## The drill\n\n1. Hold C on a bass patch.\n2. With the other hand, slowly turn the filter cutoff knob from min (closed) to max (open).\n3. Hear the sound 'open up.'\n4. Turn back to min. Hear it close.\n5. Repeat. Feel the timbral change.\n\n## Why this matters\n\nEvery electronic music piece uses filter sweeps. DJs ride the filter for tension + release. Understanding filter = unlocking 70% of synth expressiveness.",
    drills: {
      teach: [
        { id: "t_filter_is_voice", heading: "Filter is your voice", body: "Just as your mouth shape changes vowels in speech, the filter shapes timbre in synth. Closed filter = 'oo' sound. Open filter = 'ee' sound. Know your filter's response." },
        { id: "t_two_hands", heading: "Two hands, two tasks", body: "One hand plays notes. Other hand shapes sound via filter. This is the synthesist's basic skill. Doesn't feel natural at first — drill until both hands move independently." },
        { id: "t_pitfall", heading: "Don't over-sweep", body: "Constant filter movement = nervous, distracting. Filter sweeps should be intentional, musical moments — not nervous fidgeting." },
      ],
    },
    audioRefs: [
      { id: "demo_sweep", label: "Filter sweep · closed to open" },
      { id: "demo_musical", label: "Musical filter sweep · in context" },
    ],
  },
  synth_l2_03_tempo: {
    id: "synth_l2_03_tempo",
    title: "Arpeggiator at 120 bpm · sync'd to tempo",
    objectives: [
      "Activate synth arpeggiator",
      "Play C major chord; hear notes cascading",
      "Match BPM to metronome at 120",
    ],
    writtenContent:
      "## The arpeggiator\n\nSynth feature: press a chord (multiple keys). Instead of playing simultaneously, the synth plays each note in sequence — an arpeggio.\n\n## Set BPM\n\nYour synth has a BPM setting. Set to 120. Arp will play notes at 120 bpm's sixteenth notes (or whichever subdivision you choose).\n\n## The drill\n\n1. Set arp to 'on'.\n2. Set BPM to 120.\n3. Set note value: 1/16 (sixteenth notes).\n4. Press C major chord (C + E + G).\n5. Hear the arp play C-E-G-C-E-G at 120 bpm 16th notes.\n6. Change chord to G major. Arp follows.\n\n## Why this matters\n\nElectronic music = arpeggios everywhere. Trance leads, house basses, techno stabs — many use arpeggiators for driving rhythm.\n\n## Your first electronic sound\n\nRun this arp with a lead patch. Hold the chord. Congratulations — you're making trance.",
    drills: {
      teach: [
        { id: "t_arp_lock", heading: "Arp locks to BPM", body: "The arp plays exactly on the beat because it's synced to BPM. You just hold the chord. The synth handles rhythm. This is electronic music's foundational automation." },
        { id: "t_chord_change", heading: "Chord changes flow to arp", body: "When you change chords, arp adapts instantly. Practice chord changes (C → G → Am → F) with arp running. Smooth chord transitions = smooth arpeggiated music." },
        { id: "t_pitfall", heading: "Don't hold too many notes", body: "6+ notes in a chord with arp running = cluttered. 3-4 notes max for clean arp. Tight voicings sound best." },
      ],
    },
    audioRefs: [
      { id: "demo_arp_c", label: "Arpeggiator · C major chord · 120 bpm" },
      { id: "demo_arp_changes", label: "Arp with chord changes · C-G-Am-F" },
    ],
  },
  synth_l2_04_first_piece: {
    id: "synth_l2_04_first_piece",
    title: "'Axel F' (Beverly Hills Cop theme) · iconic synth riff",
    objectives: [
      "Play the 8-bar Axel F main riff",
      "Use a lead patch with slight filter modulation",
      "Maintain tempo at 135 bpm",
    ],
    writtenContent:
      "## Axel F\n\n1984 synth classic by Harold Faltermeyer. Defined synth lead sound. The riff is recognizable within 3 notes.\n\n## The riff\n\nQuarter + eighth + eighth rhythmic pattern, descending. Uses F minor pentatonic.\n\n8 bars of repeated variations. Memorize the core 2-bar figure; variations follow.\n\n## Patch\n\nUse a *synth lead* patch. Bright, cutting, slightly resonant filter. If you have a Moog-style lead, perfect. Otherwise, browse for 'Lead' presets.\n\n## Why this piece\n\nAxel F is synth's 'Mary Had a Little Lamb.' Universal. Every synth student plays it.\n\n## The feel\n\n135 bpm. Driving. Slightly cheeky. Play with attitude.",
    drills: {
      teach: [
        { id: "t_iconic", heading: "Iconic riffs teach phrasing", body: "Axel F's phrasing is part of its identity. Don't rewrite it. Play it as composed. Your interpretation comes later; first, play it *right*." },
        { id: "t_patch_match", heading: "Match the patch to the piece", body: "Axel F on a pad = wrong. Bass patch = wrong. Lead patch = right. Sound choice matters as much as notes. Choose intentionally." },
        { id: "t_pitfall", heading: "Don't rush 135 bpm", body: "Axel F at 150 = rushed. At 135 = right. Metronome + discipline. Right tempo ≠ maximum tempo." },
      ],
    },
    audioRefs: [
      { id: "demo_riff", label: "Axel F riff · 135 bpm · lead patch" },
      { id: "demo_full", label: "Full 8-bar Axel F arrangement" },
    ],
  },

  // ═══ SYNTH · L3 ═══
  synth_l3_01_first_song: {
    id: "synth_l3_01_first_song",
    title: "Simple ambient piece · pad + slow arpeggio",
    objectives: [
      "Create a 32-bar ambient piece using pad + arpeggio",
      "Apply slow filter sweeps",
      "Keep BPM at 80 for meditative feel",
    ],
    writtenContent:
      "## Ambient · your first compositional piece\n\nAmbient music emphasizes atmosphere over melody. Slow, spacious, textural.\n\n## The structure\n\n- Pad patch on left hand: holds sustained chord for 4 bars\n- Arp on right hand: plays 16th-note arpeggio over the chord\n- Slow filter sweep across the whole piece (closed → open → closed)\n\n## Chords\n\nBars 1-4: C minor (C + Eb + G)\nBars 5-8: Ab major (Ab + C + Eb)\nBars 9-12: F minor (F + Ab + C)\nBars 13-16: G major (G + B + D)\nRepeat for bars 17-32.\n\n## BPM\n\n80 bpm. Meditative.\n\n## The filter arc\n\nStart closed (dark, muted). Gradually open over 16 bars. Gradually close over 17-32. This 32-bar arc creates tension + release.\n\n## Why ambient\n\nTeaches you to *compose* with synth, not just play. The pad + arp combination is the foundation of many electronic styles — house, synthwave, ambient.",
    drills: {
      teach: [
        { id: "t_composition", heading: "Synth invites composition", body: "Unlike acoustic instruments, synth makes composition easy: loop a chord, add a lead, build layers. Embrace this. Compose, don't just replay." },
        { id: "t_filter_arc", heading: "Filter arc is structural", body: "A 32-bar filter sweep is a large gesture. It shapes the entire piece. Think of filter as architectural: one move over the whole piece." },
        { id: "t_pitfall", heading: "Don't add too many elements", body: "Ambient strength = restraint. Pad + arp + filter = enough. Adding drums + bass + leads = busy, not ambient." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_8", label: "Ambient · bars 1-8 · closed filter" },
      { id: "demo_full", label: "Full 32-bar ambient piece · filter arc" },
    ],
  },
  synth_l3_02_dynamics: {
    id: "synth_l3_02_dynamics",
    title: "Velocity dynamics · expression through touch",
    objectives: [
      "Play a melody with varying key velocity (soft to hard)",
      "Map velocity to filter or volume",
      "Observe how velocity shapes sound",
    ],
    writtenContent:
      "## Velocity · keyboard's dynamic variable\n\nMost synths are velocity-sensitive: harder key press = louder + often brighter. Soft press = quieter + darker.\n\nHow the synth responds depends on:\n- **Velocity to volume**: universal (like piano).\n- **Velocity to filter cutoff**: common on leads, basses.\n- **Velocity to envelope**: attack time varies with velocity.\n\n## The drill\n\n1. Play Axel F riff with soft velocity. Note the tone.\n2. Play with hard velocity. Note the tone difference.\n3. Alternate: soft-hard-soft-hard. Hear the dynamic expression.\n\n## Synth settings\n\nMost synths let you adjust 'velocity sensitivity' (low = uniform response, high = dramatic response). Set to medium for best expression.\n\n## Musical use\n\nA melody with varied velocity = expressive, alive. Uniform velocity = robotic, MIDI-feel. Electronic music often uses uniform velocity intentionally; acoustic-feel tracks need variation.",
    drills: {
      teach: [
        { id: "t_velocity_mapping", heading: "Velocity maps to multiple things", body: "Soft key = less volume + darker filter. Hard key = more volume + brighter filter + faster attack. This multi-dimensional response is synth's expressive depth." },
        { id: "t_learn_your_synth", heading: "Know your synth's response", body: "Play a sustained note at varying velocities. Listen. What changes? Volume only? Filter? Envelope? Knowing your instrument's velocity behavior = knowing its expressive vocabulary." },
        { id: "t_pitfall", heading: "Don't play flat", body: "Uniform velocity = robotic. Even subtle variations add humanity. Most electronic music now aims for 'slight human' feel rather than 'grid-lock perfect.'" },
      ],
    },
    audioRefs: [
      { id: "demo_velocity", label: "Axel F with dynamic velocity" },
      { id: "demo_flat", label: "Axel F with uniform velocity (robotic feel)" },
    ],
  },
  synth_l3_03_articulation: {
    id: "synth_l3_03_articulation",
    title: "ADSR envelope · shaping each note's character",
    objectives: [
      "Understand Attack, Decay, Sustain, Release",
      "Shape a note from pluck (short attack) to pad (long attack)",
      "Apply ADSR changes to a melody",
    ],
    writtenContent:
      "## ADSR · the envelope shape\n\nEvery note on a synth has an envelope — how volume (or filter) changes over time after you press a key.\n\n- **Attack (A)**: time for note to reach full volume.\n- **Decay (D)**: time to drop to sustain level.\n- **Sustain (S)**: volume level while key is held.\n- **Release (R)**: time to fade after key release.\n\n## The drill\n\n1. Short attack + short release = pluck (piano-like).\n2. Long attack + long release = pad (swells in, fades out).\n3. Short attack + long release = snare-like percussion + tail.\n\n## Apply\n\nPlay a melody 3 times, same notes, different envelopes:\n1. Pluck envelope (short A + short R).\n2. Pad envelope (long A + long R).\n3. Hybrid: short A + long R.\n\nListen to how the same melody changes character.\n\n## Musical implication\n\nEnvelope = articulation on synth. Fast envelope = staccato-like. Slow envelope = legato-like. Master envelope = master expression.",
    drills: {
      teach: [
        { id: "t_adsr_lives", heading: "ADSR lives in every note", body: "Every synth note has an envelope. Invisible but audible. Edit the envelope = edit the character. This is deeper than velocity; it's architectural." },
        { id: "t_envelope_for_mood", heading: "Envelope = mood", body: "Pluck = punchy, rhythmic. Pad = calm, sustained. Swell = ethereal, slow-building. Pick envelope to match the emotion you want." },
        { id: "t_pitfall", heading: "Don't use one envelope for all", body: "Most pieces use different envelopes for different parts. Bass = short A. Lead = medium A. Pad = long A. Layers need distinct envelope shapes to coexist." },
      ],
    },
    audioRefs: [
      { id: "demo_pluck", label: "Axel F · short pluck envelope" },
      { id: "demo_pad", label: "Axel F · pad envelope (wrong for piece)" },
      { id: "demo_hybrid", label: "Hybrid envelope" },
    ],
  },
  synth_l3_04_standard_cert: {
    id: "synth_l3_04_standard_cert",
    title: "Standard Certificate · 2-min synth performance",
    objectives: [
      "Perform Axel F + ambient piece back-to-back",
      "Demonstrate patch change between pieces",
      "Show filter + envelope manipulation live",
    ],
    writtenContent:
      "## The cert\n\n2 minutes total. 30 seconds Axel F (lead patch), pause to change patch, 1:30 ambient piece (pad + arp).\n\n## Grading\n\n1. **Note accuracy**: correct notes throughout.\n2. **Tempo**: steady on both pieces.\n3. **Patch choice**: appropriate for each piece.\n4. **Filter manipulation**: visible in ambient piece.\n5. **Overall musicality**: pieces sound intentional, not mechanical.\n\n## The synth difference\n\nCert not only about playing — also about sound design choices. Grader hears whether you *chose* your patch vs. accepted the default.\n\n## Transition\n\nBetween pieces, 10 seconds to change patch + set BPM for ambient. Make this transition seamless — practice it as part of the performance.\n\n## Recording\n\nMost synths have USB MIDI out. Record directly into DAW (Ableton, FL Studio). This gives cleanest cert audio. Alternative: mic the synth's audio output.",
    drills: {
      teach: [
        { id: "t_sound_design_matters", heading: "Grader hears patch choice", body: "Using a generic 'organ' patch for Axel F = fail. Finding a bright lead patch = success. Sound choice is half the grade." },
        { id: "t_smooth_transition", heading: "Patch transition is part of performance", body: "Practicing the patch switch is part of the cert. 10 seconds should be confident, not fumbling. Memorize which buttons/screens to press. Make it seamless." },
        { id: "t_pitfall", heading: "Don't change patch mid-piece", body: "Unless the piece specifically calls for it, stick with one patch per piece. Changing mid-piece = disrupts continuity." },
      ],
    },
    audioRefs: [
      { id: "demo_cert", label: "Full cert performance · Axel F + ambient" },
    ],
  },

  // ═══ SYNTH · L4 ═══
  synth_l4_01_scale_two: {
    id: "synth_l4_01_scale_two",
    title: "C minor scale + Dorian mode exploration",
    objectives: [
      "Play C minor scale (natural)",
      "Play C Dorian mode (minor with raised 6th)",
      "Recognize modal difference by ear",
    ],
    writtenContent:
      "## Beyond major + minor\n\nL2-L3 used C major. L4 introduces modes.\n\n## C minor (natural)\n\nC D Eb F G Ab Bb C. Melancholic, dark.\n\n## C Dorian\n\nC D Eb F G A Bb C. Minor, but with raised 6th (A instead of Ab). Gives a hopeful/jazzy quality to otherwise minor.\n\n## The difference\n\nPlay both scales back to back. The Dorian's raised 6th (A) is noticeable — gives a 'folk' or 'jazz' feel vs the minor's unambiguous sadness.\n\n## Why this matters on synth\n\nModes are huge in electronic music. Dorian is used in trance, house, techno. Phrygian (flatted 2nd) in dark/industrial. Mixolydian (dominant 7th) in rock/funk.\n\nKnowing modes = composing beyond basic major/minor.\n\n## Drill\n\nPlay Dorian scale ascending + descending. Then improvise a 4-bar melody using only Dorian notes. Record + listen.",
    drills: {
      teach: [
        { id: "t_mode_awareness", heading: "Each mode has a mood", body: "Dorian = hopeful minor. Phrygian = dark, exotic. Mixolydian = bluesy. Lydian = ethereal. Know the modes + their moods; compose accordingly." },
        { id: "t_learn_one_at_a_time", heading: "One mode per week", body: "Trying all 7 modes in a day = memorized none. One mode, one week of practice, internalize the feel. Then next mode. Build knowledge gradually." },
        { id: "t_pitfall", heading: "Don't ignore modes", body: "Most synth students stay in major/minor. But electronic music's richness comes from modes. Learning Dorian early opens genre options (trance, house)." },
      ],
    },
    audioRefs: [
      { id: "demo_minor", label: "C natural minor scale" },
      { id: "demo_dorian", label: "C Dorian scale" },
      { id: "demo_comparison", label: "Both scales back-to-back" },
    ],
  },
  synth_l4_02_ornament: {
    id: "synth_l4_02_ornament",
    title: "LFO modulation · adding wobble + rhythm",
    objectives: [
      "Assign an LFO to filter cutoff",
      "Create a wobble bass effect",
      "Control LFO rate for different feels",
    ],
    writtenContent:
      "## LFO · Low-Frequency Oscillator\n\nAn LFO is a slow oscillator (below audible range) that modulates a parameter. It *moves* something automatically.\n\n## Famous example: wobble bass\n\nDubstep's signature. An LFO modulates the filter cutoff at ~2-4Hz. The filter opens and closes automatically. Result: the bass 'wobbles.'\n\n## How to set up\n\n1. Pick bass patch.\n2. Route LFO 1 to filter cutoff.\n3. Set LFO shape: sine (smooth) or triangle.\n4. Set LFO rate: 2Hz (slow wobble) or 4Hz (fast wobble).\n5. Set LFO depth: 50% (moderate modulation).\n6. Play a sustained bass note. Hear it wobble.\n\n## Variations\n\n- LFO rate = 1/8 note (synced to tempo) = rhythmic wobble.\n- LFO square wave = stutter effect.\n- LFO random = chaos.\n\n## Musical use\n\nWobble bass: dubstep, drum-and-bass.\nSmooth LFO: tremolo on leads, beating pads.\nRandom LFO: experimental/glitch music.",
    drills: {
      teach: [
        { id: "t_lfo_is_automation", heading: "LFO is automation", body: "LFO automates what you'd otherwise do with your hand (filter sweep). This frees your hands for other things. Essential for electronic music production." },
        { id: "t_tempo_sync", heading: "Sync LFO to tempo", body: "Free-running LFO = slightly off-rhythm. Tempo-synced LFO (at 1/4 or 1/8 note rates) = rhythmically tight. Use temp sync for production-ready sound." },
        { id: "t_pitfall", heading: "Don't overdo LFO", body: "Every parameter modulated by LFOs = overwhelming. Use 1-2 modulations per patch, carefully chosen." },
      ],
    },
    audioRefs: [
      { id: "demo_wobble", label: "Wobble bass · 4Hz LFO" },
      { id: "demo_tremolo", label: "Lead with tremolo LFO" },
    ],
  },
  synth_l4_03_rep_1: {
    id: "synth_l4_03_rep_1",
    title: "'Strangers' (Kavinsky) · synthwave classic",
    objectives: [
      "Learn the 16-bar synth hook of 'Strangers'",
      "Use a synthwave-style lead patch",
      "Apply light LFO + filter sweep",
    ],
    writtenContent:
      "## Synthwave\n\nGenre born 2005, peaking 2010s. Retro 80s aesthetic — synth leads, arpeggios, reverb-drenched.\n\n## 'Strangers' by Kavinsky (2010)\n\nKey track of genre. Featured in 'Drive' movie. Hook is iconic.\n\n## The hook\n\n16-bar synth lead. Uses C# minor scale. Rhythmic + melodic.\n\n## Patch setup\n\nStart with a bright lead patch. Add:\n- Reverb: long, spacious.\n- Delay: 1/8 note, 30% feedback.\n- Slow LFO on filter cutoff (subtle movement).\n\nThis gives synthwave's signature sheen.\n\n## The feel\n\nDriving, nostalgic, cinematic. Night-drive mood. Play with that atmosphere.\n\n## Stages\n\nWeek 1: learn the notes.\nWeek 2: dial in the patch.\nWeek 3: add performance details (filter sweeps at phrase ends).\nWeek 4: record, polish, submit.",
    drills: {
      teach: [
        { id: "t_genre_patch", heading: "Synthwave has a sound", body: "Bright analog-emulating lead + heavy reverb + 1/8 delay = synthwave. Deviate from this formula = you'll sound different (could be good or bad). For this piece, stay faithful to the template." },
        { id: "t_cinematic", heading: "Play cinematically", body: "Synthwave is movie music. Imagine a driving scene, night, neon lights. That's the mood. Play every note like it's setting the scene." },
        { id: "t_pitfall", heading: "Don't over-process", body: "More reverb + more delay ≠ more synthwave. Balance. A clean note occasionally peeks through the haze. Over-processed = muddy." },
      ],
    },
    audioRefs: [
      { id: "demo_hook", label: "Strangers hook · 16 bars" },
      { id: "demo_full", label: "Full track section with LFO + delays" },
    ],
  },
  synth_l4_04_practice_rout: {
    id: "synth_l4_04_practice_rout",
    title: "Synth · 15-min practice block",
    objectives: [
      "Structure: patch exploration (3) + scales (3) + sound design (4) + repertoire (5)",
      "Record + review sessions",
      "Experiment with new sounds weekly",
    ],
    writtenContent:
      "## The 15-min block\n\n**3 min · Patch exploration** — browse presets, find a new sound, note what you like/dislike about it. Build your patch library.\n\n**3 min · Scales** — C major, C minor, Dorian, or a new mode. Ascend + descend 2x.\n\n**4 min · Sound design** — pick one parameter today (filter, LFO, envelope). Experiment. Make 2-3 variations of a patch.\n\n**5 min · Repertoire** — Axel F, ambient, Strangers, or new piece. Play 2-3 times.\n\n## Why patch exploration first\n\nSynth is a sound-design instrument. If you skip exploration, you limit yourself to preset 1 forever. 3 minutes a day = hundreds of patches over a year = deep library knowledge.\n\n## DAW integration\n\nConnect synth to a DAW. Record every session's best moments. Review. Use the best parts in compositions.\n\n## The synthesist's journey\n\nYou're not just a player — you're a composer + sound designer. 15 min daily, one year = fluent.",
    drills: {
      teach: [
        { id: "t_patch_library", heading: "Build your patch library", body: "Note 10-20 favorite patches. Label them by genre/mood. Over time, this becomes your quick-access palette. Faster composition + clearer taste." },
        { id: "t_one_parameter", heading: "One parameter per session", body: "Today: filter. Tomorrow: LFO. Next day: envelope. Depth over breadth. Each parameter has hundreds of hours of learning; respect that." },
        { id: "t_pitfall", heading: "Don't just play presets", body: "Presets are starting points. Real synth skill = modifying them. Even changing one parameter = your personal touch. Always edit, always experiment." },
      ],
    },
    audioRefs: [
      { id: "demo_routine", label: "Full 15-min synth routine · reference" },
    ],
  },

  // ═══ DJ_CONTROLLER · L2 ═══
  dj_controller_l2_01_scale: {
    id: "dj_controller_l2_01_scale",
    title: "Track loading + basic playback · 2-deck setup",
    objectives: [
      "Load tracks on Deck A + Deck B",
      "Cue playback of each deck",
      "Understand BPM + key readouts",
    ],
    writtenContent:
      "## DJ controller basics\n\nDJ controller has 2 or 4 virtual 'decks' — each deck plays one track. Your job: mix them together.\n\n## L2 starts with the fundamentals\n\n### Loading tracks\n\nIn your DJ software (Rekordbox, Serato, Traktor), import your music library. Browse. Select a track. Right-arrow to Deck A. Select another. Right-arrow to Deck B.\n\n### Cueing\n\nCueing = setting a start point on a track. Press the deck's 'Cue' button while the track plays — it sets a cue point. Jump to cue = play from that point.\n\n### Playing\n\nPress 'Play' on each deck. Listen to track 1 (Deck A). Switch to headphones (cue monitoring) + listen to track 2 (Deck B) privately while Deck A plays live.\n\n### BPM + key\n\nYour software shows BPM (beats per minute) + key (musical key) of each track. These are your most important mixing data points.\n\n## Why this matters\n\nBefore any 'mixing' happens, you must know your software + hardware. L2 is setup fluency. Without it, L3+ is impossible.",
    drills: {
      teach: [
        { id: "t_know_software", heading: "Master the software first", body: "DJ hardware is useless without software fluency. Spend an hour exploring menus, buttons, screens. Know where every function lives before trying to perform." },
        { id: "t_library_matters", heading: "Curate your music library", body: "A disorganized library = can't find tracks mid-set = disaster. Organize by genre, BPM, key, energy. Rate your favorites. This is 80% of DJ prep." },
        { id: "t_pitfall", heading: "Don't skip track analysis", body: "All DJ software auto-analyzes BPM + key on import. But check it — auto-analysis is sometimes wrong. A wrong BPM = failed beatmatching. Verify." },
      ],
    },
    audioRefs: [
      { id: "demo_loading", label: "Loading tracks + cueing · walkthrough" },
      { id: "demo_dual_decks", label: "Both decks playing · headphone monitoring" },
    ],
  },
  dj_controller_l2_02_two_note: {
    id: "dj_controller_l2_02_two_note",
    title: "Beatmatching · syncing 2 tracks' tempos",
    objectives: [
      "Match Deck A and Deck B BPMs",
      "Align the beats (downbeats sync)",
      "Listen for 'phasing' = sign of misalignment",
    ],
    writtenContent:
      "## Beatmatching · the DJ's foundational skill\n\nBeatmatching = making two tracks play at the same BPM + their beats aligned. Without this, a mix is chaos.\n\n## The task\n\nDeck A plays at 128 bpm. Deck B's track is 130 bpm. You must:\n1. Change Deck B's BPM to 128 (via pitch slider).\n2. Align Deck B's downbeat to Deck A's downbeat.\n3. Play both simultaneously. Beats should lock.\n\n## Pitch slider\n\nMoves a deck's BPM up or down. ±8% range typically. Moving to -1.5% changes 130 → 128.\n\n## Downbeat alignment\n\nPress Play on Deck B timed so its first beat lands on Deck A's current beat. This takes practice. Miss by half a beat = mess.\n\n## Phasing\n\nWhen beats are slightly misaligned, you hear a 'phasing' sound — kicks that echo or flam. Sign of bad alignment. Correct by slight pitch adjustment or re-cueing.\n\n## Sync button\n\nModern DJ software has a 'Sync' button that auto-matches. Use it to start, but learn manual beatmatching — understanding the mechanics builds real skill.",
    drills: {
      teach: [
        { id: "t_sync_vs_manual", heading: "Learn manual, use sync", body: "Sync button is convenient but hides the mechanics. First, learn manual beatmatching (takes a month). Then, use sync for live performance. You'll understand what sync is doing + catch its errors." },
        { id: "t_ear_train", heading: "Ear-train for alignment", body: "Phasing is audible. 'Kick-kick-kick' echo = misaligned. 'Kick' unified = aligned. Train your ear on this distinction. Record your mixes + listen for phasing." },
        { id: "t_pitfall", heading: "Don't rush to mix", body: "Beatmatching requires calm. If you rush, you'll miss the alignment + create phasing. Take your time. DJ sets have 2-3 minutes between track changes — use that time." },
      ],
    },
    audioRefs: [
      { id: "demo_phasing", label: "Phasing sound · misaligned beats" },
      { id: "demo_matched", label: "Matched beats · clean unison" },
    ],
  },
  dj_controller_l2_03_tempo: {
    id: "dj_controller_l2_03_tempo",
    title: "Holding BPM · 128 bpm consistent set",
    objectives: [
      "Mix 3 tracks at 128 bpm consecutively",
      "Each transition beat-matched",
      "Maintain energy + flow",
    ],
    writtenContent:
      "## 128 bpm · house music standard\n\nHouse music BPM is typically 120-130. 128 is the sweet spot. Most house tracks sit right at 128.\n\n## The drill\n\n1. Pick 3 house tracks, all at or near 128 bpm.\n2. Mix Track 1 → Track 2 → Track 3.\n3. Each transition: beatmatched.\n4. Total set: ~10 minutes.\n\n## The transition\n\nWhen Track 1 is halfway through, start mixing Track 2 in:\n- Cue Track 2 on Deck B.\n- Beatmatch to Track 1 (Deck A).\n- Bring Deck B's volume up slowly while lowering Deck A.\n- Both tracks play for ~30 seconds.\n- Deck A fades to silence; Deck B is now main.\n\nRepeat for Track 2 → Track 3.\n\n## BPM drift\n\nEven at 'same BPM,' tracks can drift over long plays. Check alignment every 30 seconds. Nudge pitch if needed.\n\n## Why house at 128\n\nHouse's 4-on-the-floor kick pattern at 128 = recognizable + danceable. Mastering 128 bpm house mixing = foundational DJ skill.",
    drills: {
      teach: [
        { id: "t_energy_flow", heading: "Energy matters as much as BPM", body: "Three tracks at 128 bpm can have different energy levels. Start mellow, build to peak, resolve. Energy arc across the 10 minutes is as important as tempo." },
        { id: "t_transition_windows", heading: "Transitions are 30 seconds", body: "Too fast (5 seconds) = abrupt. Too slow (2 minutes) = audience loses track. 30-60 seconds is DJ standard. Practice the timing." },
        { id: "t_pitfall", heading: "Don't forget the crossfader", body: "Crossfader controls volume balance between Deck A and Deck B. Practice smooth crossfades. Jerky crossfades = bad mixes." },
      ],
    },
    audioRefs: [
      { id: "demo_mix_1_2", label: "Transition Track 1 → Track 2 · 128 bpm" },
      { id: "demo_full_set", label: "10-min house set · 3 tracks" },
    ],
  },
  dj_controller_l2_04_first_piece: {
    id: "dj_controller_l2_04_first_piece",
    title: "First DJ set · 5-track 15-minute house mix",
    objectives: [
      "Mix 5 house tracks consecutively",
      "All transitions beatmatched",
      "Demonstrate energy flow across the set",
    ],
    writtenContent:
      "## Your first real set\n\n5 tracks. 15 minutes. 128 bpm house. This is a real DJ set, scaled down.\n\n## Track selection\n\n- Track 1: opening. Mellow, building.\n- Track 2: introducing main energy.\n- Track 3: peak track.\n- Track 4: slight drop, new vibe.\n- Track 5: closing, resolution.\n\nEach track ~3 minutes. Transitions 30-60 seconds.\n\n## Preparation\n\n1. Choose your 5 tracks carefully.\n2. Note each BPM + key.\n3. Mark cue points (drops, breaks, key moments).\n4. Sequence: opening → peak → closing.\n5. Write a set list on paper.\n\n## The performance\n\nSet list in front of you. Metronome off (you're the tempo now). Focus on:\n- Clean beatmatching each transition\n- Smooth volume crossfade\n- Reading the energy (would a crowd be dancing?)\n\n## Record the set\n\nRecord direct from DJ software (most have a 'Record' button). Playback. Identify: which transitions were clean? Which dragged? Which lost energy?\n\n## Why this matters\n\nThis 15 minutes is your first professional-scale experience. All future gigs build on these fundamentals.",
    drills: {
      teach: [
        { id: "t_curate", heading: "Curate > improvise", body: "A pre-planned set beats a random improvisation, especially early. Know exactly which 5 tracks, in which order. Surprises come later when you're fluent." },
        { id: "t_flow", heading: "Flow is the set's personality", body: "Start calm. Build. Peak. Release. This arc is what makes a 15-minute set feel like a journey, not 5 isolated tracks." },
        { id: "t_pitfall", heading: "Don't over-prepare effects", body: "You're beatmatching. That's enough. Save filters/FX for L3+. Adding complexity now = dropped beatmatching." },
      ],
    },
    audioRefs: [
      { id: "demo_set", label: "15-min house set · 5 tracks · beatmatched" },
    ],
  },

  // ═══ DJ_CONTROLLER · L3 ═══
  dj_controller_l3_01_first_song: {
    id: "dj_controller_l3_01_first_song",
    title: "EQ mixing · blending tracks with frequency separation",
    objectives: [
      "Cut Deck A bass while adding Deck B",
      "Crossover bass seamlessly",
      "Avoid bass collision (two kicks = mess)",
    ],
    writtenContent:
      "## EQ mixing · DJ's secret weapon\n\nTwo kicks playing simultaneously = thump. Muddy. Not danceable. Solution: EQ the bass.\n\n## The 3-band EQ\n\nEach deck has: Low (bass), Mid (mids), High (treble). Turn any to -infinity (full cut) or +6dB (full boost).\n\n## The EQ transition technique\n\n1. Deck A plays. All EQs neutral.\n2. Cue Deck B. Lower Deck B's Low to -inf (no bass).\n3. Beatmatch. Bring Deck B in via volume + crossfade.\n4. Both decks now playing: Deck A has bass, Deck B has no bass.\n5. Smoothly swap: as you lower Deck A's Low to -inf, raise Deck B's Low from -inf to neutral.\n6. Deck B now has bass; Deck A doesn't. Fade Deck A out.\n\nResult: clean bass transfer. No collision.\n\n## Other EQ moves\n\n- Cut Deck A mids to reveal Deck B melody.\n- Boost Deck A high for sparkle effect.\n- Gradually cut all Deck A bands to fade artistically.\n\n## Why this matters\n\nEQ mixing is the professional standard. Amateur DJs cross-fade volume only. Pros EQ. It's the difference between amateur and gig-ready.",
    drills: {
      teach: [
        { id: "t_bass_swap", heading: "Bass swap is the foundation", body: "Every transition should involve bass EQ. Never let two basslines play full. Always swap — one deck's bass out, other deck's bass in. Drill this movement until reflexive." },
        { id: "t_listen", heading: "Listen for collisions", body: "Collision sound = muddy, pumping, distorted. Clean transition = seamless, energy-flowing. Train your ear to detect collision immediately + EQ to fix." },
        { id: "t_pitfall", heading: "Don't EQ for no reason", body: "Every EQ move should be intentional. Random EQ fiddling = amateur. Plan your EQ moves: when bass swap? When mid cut? Know before you touch." },
      ],
    },
    audioRefs: [
      { id: "demo_no_eq", label: "Transition without EQ · collision" },
      { id: "demo_eq_mix", label: "Clean EQ-mixed transition" },
    ],
  },
  dj_controller_l3_02_dynamics: {
    id: "dj_controller_l3_02_dynamics",
    title: "Filter sweeps · building tension and release",
    objectives: [
      "Apply filter sweep on Deck A during breakdown",
      "Release filter at drop for max impact",
      "Use filter creatively in transitions",
    ],
    writtenContent:
      "## Filter · the tension builder\n\nDJ software's filter knob (or controller's dedicated filter knob) adds a high-pass or low-pass filter to the deck.\n\n- Low-pass (LPF): removes high frequencies. Bassy, muffled.\n- High-pass (HPF): removes low frequencies. Thin, hollow.\n\n## The tension move\n\nDuring a track's breakdown (typically ~1 min before a drop):\n1. Gradually turn on HPF — pitch climbs higher, bass disappears.\n2. As drop approaches, HPF continues climbing.\n3. At the exact drop moment, release HPF to neutral.\n4. Bass crashes back in full. Drop hits.\n\nThis is the classic electronic music dramatic moment. Every house/techno set uses it.\n\n## LPF variant\n\nSame principle with LPF for different effect:\n1. Apply LPF gradually.\n2. Sound gets muffled, distant.\n3. Release at drop.\n4. Sound crashes back bright + full.\n\n## How much?\n\nFilter applied too strong + too long = muddy section. Apply for 20-30 seconds max. Release on drop.\n\n## In a mix\n\nFilter can also be used during transitions — apply LPF to Deck A while Deck B enters. Deck A fades out muffled; Deck B comes in clean. Creative alternative to EQ mixing.",
    drills: {
      teach: [
        { id: "t_tension_release", heading: "Filter creates tension + release", body: "Filter closing = tension. Filter releasing at drop = release. This is fundamental electronic music dynamics. Every set uses it somewhere." },
        { id: "t_timing", heading: "Release filter at exact drop", body: "If you release filter 2 seconds before drop = weak. Exactly at drop = epic. Timing matters. Listen to the track intimately; know the drop timing by ear." },
        { id: "t_pitfall", heading: "Don't filter everywhere", body: "Filter used every track = boring. Reserve for peaks, drops, dramatic moments. 1-2 filter moves per 15-minute set maximum." },
      ],
    },
    audioRefs: [
      { id: "demo_hpf_buildup", label: "HPF buildup + release at drop" },
      { id: "demo_lpf_transition", label: "LPF-based transition" },
    ],
  },
  dj_controller_l3_03_articulation: {
    id: "dj_controller_l3_03_articulation",
    title: "Loop + hot cue · track manipulation",
    objectives: [
      "Set a 4-beat loop on Deck A",
      "Use a hot cue to jump to a drop",
      "Combine loop + cue in a transition",
    ],
    writtenContent:
      "## Loops · extend any section\n\nA loop = replaying a section endlessly. DJ controllers have dedicated loop buttons (1, 2, 4, 8, 16 beats).\n\n### How\n\n1. While track plays, press '4 beats' button.\n2. The current 4 beats start looping.\n3. Loop continues until you press 'Loop Out' or 'Exit Loop.'\n\n### Use\n\nLoop a breakdown while you mix in another track. Buy yourself time.\n\n## Hot cues · instant jump points\n\nHot cues = pre-set positions in a track. Press Hot Cue 1 during a drop = you save that spot. Later, press Hot Cue 1 = jump to the drop instantly.\n\n### Tactical use\n\n- Set Hot Cue 1 = intro.\n- Set Hot Cue 2 = first drop.\n- Set Hot Cue 3 = breakdown.\n- Set Hot Cue 4 = second drop.\n\nYou can now navigate the track instantly.\n\n## Loop + hot cue combo\n\nPress Hot Cue 2 (jump to drop). Immediately press 4-beat loop. The drop loops. Keep it running while you bring in the next track. Creative, dramatic.\n\n## Why this matters\n\nLoops + hot cues = track becomes modular. You can build custom versions of tracks live. This separates amateur (playing track straight) from professional (restructuring tracks in real-time).",
    drills: {
      teach: [
        { id: "t_modular_thinking", heading: "Tracks become modular", body: "Once you use loops + hot cues, tracks aren't 'play from start to finish.' They're palettes. You arrange in real-time. This is the DJ's composition skill." },
        { id: "t_plan_cues", heading: "Set cues before performing", body: "Pre-set hot cues during preparation. Don't try to set them during a live set. Labels: intro, drop 1, break, drop 2. Systematic." },
        { id: "t_pitfall", heading: "Don't over-loop", body: "Looping the same section for 2 minutes = boring. Loops are seasonings, not the meal. 8-16 beats of loop = ideal; beyond that = diminishing returns." },
      ],
    },
    audioRefs: [
      { id: "demo_loop", label: "4-beat loop · sustained + exited" },
      { id: "demo_hot_cue", label: "Hot cue jump · instant navigation" },
      { id: "demo_combo", label: "Loop + hot cue combined transition" },
    ],
  },
  dj_controller_l3_04_standard_cert: {
    id: "dj_controller_l3_04_standard_cert",
    title: "Standard Certificate · 10-minute DJ set with EQ + filter + hot cues",
    objectives: [
      "Mix 4-5 tracks over 10 minutes",
      "All transitions use EQ mixing",
      "Include at least one filter sweep + one hot cue",
    ],
    writtenContent:
      "## The cert\n\n10-minute DJ set. 4-5 tracks. Includes:\n\n1. **EQ mixing** on all transitions (bass swap + EQ moves).\n2. **Filter sweep** at least once (tension + release).\n3. **Hot cue** usage at least once.\n4. **Energy flow** (arc across the set).\n5. **Clean beatmatching** throughout.\n\n## Grading\n\n- Technical accuracy: no collisions, no beat drops.\n- Use of techniques: EQ, filter, hot cues all demonstrated.\n- Energy: set has arc, not flat.\n- Track selection: tracks work together harmonically + rhythmically.\n\n## Preparation\n\nWeek 1: choose tracks, plan set order.\nWeek 2: practice transitions individually.\nWeek 3: full run-throughs.\nWeek 4: record, self-critique, re-record.\n\n## The final recording\n\nRecord directly from DJ software. This gives cleanest audio. Submit that MP3.\n\n## DJ mindset\n\nYou're not performing isolated tricks; you're curating a 10-minute experience for a listener. Imagine a friend listening. Would they enjoy it? That's the test.",
    drills: {
      teach: [
        { id: "t_listener_focus", heading: "Mix for the listener, not the grader", body: "If you mix to show off techniques, you'll sound mechanical. Mix to give a listener a 10-minute journey. Techniques serve the journey. The grader is also a listener." },
        { id: "t_rehearse", heading: "Rehearse the set 3x", body: "First run = discovery. Second run = refinement. Third run = recorded take. Practice = performance readiness." },
        { id: "t_pitfall", heading: "Don't freestyle unfamiliar tracks", body: "Cert = the tracks you've practiced. Don't introduce a new track on cert day. Familiar tracks + familiar transitions = clean performance." },
      ],
    },
    audioRefs: [
      { id: "demo_cert", label: "10-min DJ set · cert-quality" },
    ],
  },

  // ═══ DJ_CONTROLLER · L4 ═══
  dj_controller_l4_01_scale_two: {
    id: "dj_controller_l4_01_scale_two",
    title: "Harmonic mixing · key-matched transitions",
    objectives: [
      "Use Camelot wheel to find key-compatible tracks",
      "Mix 3 tracks in compatible keys",
      "Hear why harmonic mixing sounds smooth",
    ],
    writtenContent:
      "## Harmonic mixing\n\nTracks in compatible keys blend smoothly. Incompatible keys clash. Harmonic mixing = matching keys for seamless transitions.\n\n## The Camelot wheel\n\nA simplified musical key map: 1A-12A (minor keys) + 1B-12B (major keys). Adjacent numbers = compatible.\n\nExample:\n- Track A in 8A (Am). Compatible: 7A, 9A, 8B.\n- Track B in 9A (Em). Plays smoothly after Track A.\n\n## How to mix harmonically\n\n1. Check each track's Camelot key in your DJ software.\n2. Sequence tracks so each follows a compatible key.\n3. Transitions will sound 'in tune' — no dissonance.\n\n## Why it matters\n\nListener can't articulate it, but they *feel* harmonic mixing. Incompatible keys create subtle discomfort. Harmonic mixing = satisfying, flowing sets.\n\n## Drill\n\nPick 3 house tracks all in the same or adjacent Camelot keys. Mix them in sequence. Compare with 3 random tracks. Hear the difference.",
    drills: {
      teach: [
        { id: "t_camelot", heading: "Camelot is simple", body: "Each track has a Camelot key. Adjacent numbers mix well. Same-side = smoothest. Across (+1A to +1B) = also compatible. Memorize the wheel; use your software's auto-key detection." },
        { id: "t_practice_keys", heading: "Practice with small pool", body: "Start with 10 tracks, all in 1 or 2 Camelot keys. Get fluent mixing those. Then expand to more keys. Small controlled pool > random library." },
        { id: "t_pitfall", heading: "Don't trust auto-key 100%", body: "DJ software auto-detects key, but errors happen. Listen yourself. Ear-check against software. Discrepancy = use your ear." },
      ],
    },
    audioRefs: [
      { id: "demo_compatible", label: "Compatible keys · smooth transition" },
      { id: "demo_incompatible", label: "Incompatible keys · dissonance" },
    ],
  },
  dj_controller_l4_02_ornament: {
    id: "dj_controller_l4_02_ornament",
    title: "Scratching · L4 introduction to turntablism",
    objectives: [
      "Perform a baby scratch (simple forward-backward)",
      "Apply on an acapella sample",
      "Integrate one scratch in a transition",
    ],
    writtenContent:
      "## Scratching · turntablism roots\n\nOriginally on vinyl turntables; now performed on jog wheels (DJ controllers have virtual jog wheels that simulate the feel).\n\n## Baby scratch\n\nSimplest scratch technique:\n1. Load an acapella (vocal sample) on Deck A.\n2. Press play.\n3. Put hand on Deck A's jog wheel.\n4. Move jog wheel forward, then backward, then forward. You're 'scratching' the sample.\n\n## Timing\n\nScratch to the beat. Forward on beat 1, backward on beat 2. Or forward-backward-forward on a triplet.\n\n## Musical integration\n\nPerform a baby scratch during a transition. Deck A (track ending) — scratch a sample over Deck B (track starting). Adds DJ flair.\n\n## Why L4\n\nScratching is L4 because it layers on fundamentals. Master mixing + EQ + filter first. Scratching without that foundation = just noise.\n\n## The deeper art\n\nBaby scratch is the tip of the iceberg. Turntablism has decades of technique depth — chirp scratches, flares, crabs, transforms. L4 introduces the doorway.",
    drills: {
      teach: [
        { id: "t_timing_first", heading: "Scratch timing matters", body: "Random scratching = noise. Scratching to the beat = music. Always scratch with rhythmic intent. If you can't feel the beat while scratching, slow down." },
        { id: "t_simple_first", heading: "Baby scratch first", body: "Don't attempt advanced scratches until baby is mastered. Baby = clean + rhythmic = 2 weeks of practice. Flares and chirps come after that." },
        { id: "t_pitfall", heading: "Don't scratch throughout set", body: "Scratching is a flavor. Over-used = annoying. One scratch per transition maximum. Less is more." },
      ],
    },
    audioRefs: [
      { id: "demo_baby", label: "Baby scratch · isolated" },
      { id: "demo_in_mix", label: "Scratch integrated in transition" },
    ],
  },
  dj_controller_l4_03_rep_1: {
    id: "dj_controller_l4_03_rep_1",
    title: "20-minute progressive house set · full production",
    objectives: [
      "Mix 6-8 tracks in progressive house style",
      "All techniques: EQ, filter, hot cue, harmonic mixing",
      "Demonstrate clear energy arc across 20 minutes",
    ],
    writtenContent:
      "## Your first substantial set\n\n20 minutes. 6-8 tracks. Progressive house.\n\n## What's progressive house\n\nSub-genre: 128 bpm, build-driven, melodic, emotional. Think: Deadmau5, Lane 8, Eric Prydz. Long builds, cathartic drops.\n\n## Track selection\n\n- Tracks 1-2: opening, subdued. Build energy.\n- Tracks 3-4: mid-set, energy building. First peak at ~8 min.\n- Tracks 5-6: peak zone. Biggest drops.\n- Tracks 7-8: resolution, cooldown.\n\n## Technique application\n\n- EQ mixing on every transition.\n- Filter sweep on at least 2 breakdowns.\n- 3+ hot cue jumps across the set.\n- Harmonic mixing throughout (verify keys).\n- 1-2 scratches (optional, for flair).\n\n## The arc\n\n20 minutes is a real set. Opening + build + peak + resolution. Like a story. Each track contributes a chapter.\n\n## Preparation\n\nWeek 1-2: track selection + Camelot key check.\nWeek 3: full run-through, self-critique.\nWeek 4: polish + record final.\n\n## The listener question\n\nImagine your best friend listening on a drive. Are they engaged the whole 20 minutes? If yes, you've made a real set.",
    drills: {
      teach: [
        { id: "t_arc_matters", heading: "Arc = 50% of set quality", body: "Technical perfection without energy arc = flat set. Raw energy without technique = sloppy set. Both needed. Arc is plan; technique is execution." },
        { id: "t_peak_timing", heading: "Peak lives at 60-70% of set", body: "Not at the middle, not at the end. ~13-15 minutes into a 20-min set = peak. Before: build. After: resolve. Classic dramatic structure." },
        { id: "t_pitfall", heading: "Don't peak too early", body: "Peak at track 3 = audience has 12 minutes of anticlimax. Patience in building is what makes progressive house 'progressive.'" },
      ],
    },
    audioRefs: [
      { id: "demo_set_20min", label: "20-min progressive house set · cert-quality" },
    ],
  },
  dj_controller_l4_04_practice_rout: {
    id: "dj_controller_l4_04_practice_rout",
    title: "DJ practice · 15-min block with critical listening",
    objectives: [
      "Structure: library curation (3) + technique drills (5) + full mix (5) + listening (2)",
      "Record sessions",
      "Review recorded sets weekly",
    ],
    writtenContent:
      "## The 15-min block\n\n**3 min · Library curation** — explore new tracks (download, buy, Beatport charts). Add to library with proper tagging (genre, BPM, key, energy).\n\n**5 min · Technique drills** — pick ONE: beatmatching practice, EQ transitions, filter sweeps, hot cue jumps, scratching. Drill it repeatedly.\n\n**5 min · Full mix** — 2-3 tracks in a mini-set. Apply the technique you drilled.\n\n**2 min · Listening** — play back what you just recorded. Critique: timing, energy, transitions.\n\n## Why listening\n\nMost DJs never listen to their own recordings. Massive miss. You'll hear issues you never noticed in-the-moment — phasing, tempo drift, clumsy transitions. Listen critically.\n\n## Library curation\n\nYour library is your weapon. 5 tracks a week = 260 tracks a year = professional library. Without fresh music, you stagnate.\n\n## Record every session\n\nDJ software has 'Record.' Use it. Every session generates a recording. Weekly: listen to 1-2 recordings critically.\n\n## The pro mindset\n\nDJing is 70% preparation (library, set planning) + 30% performance. Most beginners over-focus on performance. Balance.",
    drills: {
      teach: [
        { id: "t_record_everything", heading: "Record every session", body: "Recording = feedback = growth. Without recording, you don't know where you stand. DJ software makes it 1-click. Do it every time." },
        { id: "t_library_daily", heading: "Library work is practice", body: "15 minutes of curating tracks is as important as 15 minutes of mixing. Tag, sort, rate. Your library quality determines your set quality ceiling." },
        { id: "t_pitfall", heading: "Don't practice without recording", body: "Un-recorded practice is half practice. You practice; you don't hear yourself. Always record. 2 minutes of listening back > 10 minutes of un-reviewed practice." },
      ],
    },
    audioRefs: [
      { id: "demo_routine", label: "Full 15-min DJ practice · reference" },
    ],
  },
};
