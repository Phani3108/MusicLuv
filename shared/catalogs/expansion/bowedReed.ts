/**
 * Hand-authored L2-L4 overrides · bowed + reed expansion:
 * cello · saxophone · trumpet · clarinet.
 *
 * These instruments share a focus on tone production — the physical
 * coupling between player and instrument (bow, embouchure, breath)
 * determines whether the note sings or struggles. L2-L4 deepens that
 * foundation before tackling repertoire.
 */

import type { Lesson } from "../types";

type Patch = Partial<Lesson> & Pick<Lesson, "id">;

export const BOWED_REED_EXPANSION_OVERRIDES: Record<string, Patch> = {
  // ═══ CELLO · L2 (scale shipped in expansionHandAuthored) ═══
  cello_l2_02_two_note: {
    id: "cello_l2_02_two_note",
    title: "Open-string bowing · C and G alternation",
    objectives: [
      "Bow open C and open G with smooth detaché",
      "Maintain equal bow length + speed on each note",
      "Keep tone consistent across string crossings",
    ],
    writtenContent:
      "## Bow control before fingering\n\nBefore the left hand ever presses a string, the right arm must master the bow. Cello's voice is ~70% bow technique. Pressing wrong frets = wrong note (recoverable). Bad bow = ugly tone (not recoverable without a long detour).\n\n## Detaché\n\nFrench for 'detached.' Each note gets its own bow stroke — down-bow (pull), up-bow (push), alternating. Clean separation, no scratch.\n\n## The drill\n\nBow the open C string for 4 beats. Cross to open G for 4 beats. Cross back. Repeat 16 times. Listen for:\n\n- Consistent tone on both strings (no 'buzz' on C, no 'whine' on G)\n- Clean string crossings (no double-stops from touching both strings)\n- Equal bow speed + pressure\n\n## String crossing\n\nThe elbow does the work. Not the wrist. To go from C to G, raise the right elbow ~15cm. Let the bow follow gravity to the new string. Smooth.",
    drills: {
      teach: [
        { id: "t_arm_weight", heading: "Bow with arm weight", body: "The bow's pressure on the string comes from arm weight, not muscle. Let your right arm hang; let it *lean* into the string. Forearm muscle = tense = ugly tone." },
        { id: "t_elbow_crossing", heading: "String crossings use the elbow", body: "Wrist crossings are fast but unreliable. Elbow crossings are smoother. Drill: close your eyes; cross C-G 20 times with only elbow motion. Feel it." },
        { id: "t_pitfall", heading: "Don't rush the down-up cycle", body: "Beginners try to bow fast to 'sound professional.' Slow bowing reveals all tone flaws. Master 4-beat-per-bow first. Faster comes free after that." },
      ],
    },
    audioRefs: [
      { id: "demo_c_g", label: "Open C and G · alternating · 60 bpm" },
      { id: "demo_crossings", label: "C-G-C-G rapid crossings" },
      { id: "demo_bad", label: "Scratchy tone (wrong example · listen for what NOT to do)" },
    ],
  },
  cello_l2_03_tempo: {
    id: "cello_l2_03_tempo",
    title: "Locking bow with metronome · steady quarter notes",
    objectives: [
      "Play steady quarter notes on open C for 32 bars at 72 bpm",
      "Each bow stroke = exact 1 beat duration",
      "Lock to metronome without drift",
    ],
    writtenContent:
      "## The bow clock\n\nOn cello, bow speed *is* your tempo. If bows drift faster, notes get shorter, and tempo rushes. If bows drift slower, notes stretch, and tempo drags.\n\n## The exercise\n\nMetronome at 72 bpm. Play open C. Each bow stroke takes exactly one beat — down bow 1 beat, up bow 1 beat, alternating.\n\n## Bow budget\n\nYour bow is ~70cm long. At 72 bpm (one beat = ~830ms), you travel 70cm in 830ms = 84 cm/sec. If you move faster, you run out of bow mid-note. Slower, and the note has dead air.\n\n## Why 32 bars?\n\nShort = easy to fake. Long = stamina test. 32 bars = 128 beats = ~1.8 minutes of continuous quarter notes. Your arm will fatigue around bar 20. That's the training zone.\n\n## Listen\n\nIs every note the same duration? Same tone? Same volume? Record and compare bar 1 vs bar 28. If bar 28 is ragged, you fatigued. Work through it.",
    drills: {
      teach: [
        { id: "t_budget", heading: "Bow = time = space", body: "A 70cm bow at 72 bpm means you *must* move at 84 cm/sec. Memorize this physics. Slow mental math: tempo × bow distance = required speed. Fast tempos = less bow per note." },
        { id: "t_frog_tip", heading: "Frog-tip awareness", body: "Frog end of bow (nearest your hand) plays louder; tip end plays softer. On a full-bow 1-beat stroke, the volume naturally dips at the tip. Compensate with slight extra pressure." },
        { id: "t_pitfall", heading: "Don't drift slow", body: "Cello is famously 'draggy' — easy to drift 2-3 bpm slower than click. Once the piece resumes with others, you're noticeably late. Lean slightly ahead; on-time = victory." },
      ],
    },
    audioRefs: [
      { id: "metronome_72", label: "Metronome · 72 bpm" },
      { id: "demo_quarter_notes", label: "Quarter notes on open C · 32 bars locked" },
    ],
  },
  cello_l2_04_first_piece: {
    id: "cello_l2_04_first_piece",
    title: "'Twinkle Twinkle' · first bowed melody in C major",
    objectives: [
      "Play 'Twinkle Twinkle Little Star' from memory, bowed detaché",
      "Use left-hand 1st position fingerings",
      "Maintain 72 bpm across the full melody",
    ],
    writtenContent:
      "## The Suzuki starter\n\n'Twinkle Twinkle' is the classic first cello piece. Appears in the Suzuki method; used by every cello teacher. Melody is universally known, range fits 1st position, rhythm is straightforward.\n\n## The notes\n\nIn C major, 1st position on the A string:\n\n| Lyric | Twin | -kle | twin | -kle | lit | -tle | star |\n| Note | A | A | E | E | F# | F# | E (long) |\n| Finger | 0 | 0 | 0 | 0 | 1 | 1 | 0 |\n\n(0 = open A, 1 = first finger down.)\n\n## Bowing\n\nAll detaché. Down-up-down-up. Each note gets 1 beat except the last (long) — 2 beats.\n\n## What's hard\n\n1. The F# fingering — finger position must be exact, or pitch is off.\n2. The returning star note — long, with tone control.\n3. Emotional delivery — even this simple melody can be beautiful or wooden.\n\n## Why this piece\n\nBecause when grandma hears you play Twinkle, she cries. That's the whole point. Music is communication. Twinkle = your first communication.",
    drills: {
      teach: [
        { id: "t_first_finger", heading: "First finger has a home", body: "On A string, first finger lands half an inch from the nut to produce B. For F#, it's on D string, same distance. Memorize the physical location — sight-playing happens without thinking." },
        { id: "t_pitch_check", heading: "Check pitch with tuner", body: "Your F# sounds right if you play it cleanly; it sounds right if it's *in tune*. Use a tuner. Press the note, bow, observe cents deviation. Adjust finger position until tuner reads 0." },
        { id: "t_pitfall", heading: "Don't forget the last note", body: "The final 'star' note is a long E. Students rush it. Hold full 2 beats. The melody's arc lands on that held note — it's the emotional payoff." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Twinkle · 50 bpm · fingering demo" },
      { id: "demo_target", label: "Twinkle · 72 bpm · full piece" },
    ],
  },

  // ═══ CELLO · L3 ═══
  cello_l3_01_first_song: {
    id: "cello_l3_01_first_song",
    title: "'Ode to Joy' · recognizable melody in D major",
    objectives: [
      "Play the first 16 bars of Beethoven's 'Ode to Joy'",
      "Use 1st position on D + A strings",
      "Maintain dynamics across the phrase arc",
    ],
    writtenContent:
      "## 'Ode to Joy'\n\nBeethoven's 9th symphony finale. Universally known. Scale stepwise — no big leaps. Perfect for second-piece cello students.\n\n## Key: D major\n\nYou'll use D and A strings primarily. 2nd finger for F#, 3rd for G, etc. All in 1st position.\n\n## The melody\n\nMi Mi Fa Sol | Sol Fa Mi Re | Do Do Re Mi | Mi Re Re (first 4 bars).\n\nIn D major: F# F# G A | A G F# E | D D E F# | F# E E.\n\nRepeat the pattern for bars 5-8 (same). Then variation for 9-16.\n\n## What's new\n\n- 4 finger patterns (using all 4 left-hand fingers)\n- A melodic arc — the melody rises + falls, so dynamics should too\n- Bar 12 has a dotted rhythm — 'dotted-eighth + sixteenth.' New rhythm pattern.\n\n## Dynamics\n\nBars 1-4: mp (soft).\nBars 5-8: mf (medium).\nBars 9-12: f (loud climax).\nBars 13-16: mf (settling).\n\nThis arc makes the melody sing.",
    drills: {
      teach: [
        { id: "t_finger_ready", heading: "Left hand fingers pre-position", body: "Before each note, your target finger should already be hovering above the right spot. Reactive playing is too slow. Anticipate: see the note, position the finger, then bow." },
        { id: "t_vibrato_later", heading: "Save vibrato for L4", body: "You'll hear Ode to Joy played with vibrato on every note. Don't. Vibrato is L4 territory. For now: straight tones, clean pitch, good dynamics." },
        { id: "t_pitfall", heading: "Don't stop at dotted rhythm", body: "Bar 12's dotted rhythm trips everyone. Count 1-e-&-a, landing the sixteenth on 'a.' Slow it way down; feel the micro-beat. Then speed up." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_8", label: "Bars 1-8 · 72 bpm · no vibrato" },
      { id: "demo_full", label: "Full 16 bars · with dynamic arc" },
    ],
  },
  cello_l3_02_dynamics: {
    id: "cello_l3_02_dynamics",
    title: "Bow dynamics · pp to ff without breaking tone",
    objectives: [
      "Play 1 sustained note from pp to ff over 4 beats",
      "Reverse (ff to pp) over 4 beats",
      "Apply to an Ode to Joy phrase",
    ],
    writtenContent:
      "## Cello dynamics = bow pressure + speed\n\nTwo variables control volume:\n1. **Bow pressure** — how hard the bow presses into the string.\n2. **Bow speed** — how fast the bow moves.\n\n## The coupling\n\nHigher pressure + faster speed = louder (ff).\nLower pressure + slower speed = softer (pp).\n\n## Why both?\n\nPressure alone = scratchy if bow speed is slow. Speed alone = thin if pressure is too light. They must scale together.\n\n## The arc drill\n\nOpen D string. Down-bow, 4 beats. Start pp: very light pressure, slow speed. Grow linearly to ff: heavy pressure, fast speed. By beat 4, you're at ff.\n\nThen up-bow, 4 beats. Start ff, decrescendo to pp.\n\n## Apply to Ode to Joy\n\nYou already learned dynamic arcs in the piece. Now execute them with pressure + speed coupling awareness. Every crescendo = both variables increasing together.",
    drills: {
      teach: [
        { id: "t_coupled", heading: "Pressure + speed are coupled", body: "Don't adjust them independently. For a given volume, there's a correct combo. Crescendo = both increasing. Decrescendo = both decreasing. Desync = scratch or ghost tone." },
        { id: "t_weight_drop", heading: "Pressure = arm weight", body: "Don't press with forearm muscle. Drop arm weight into the bow. Less arm weight = pp. More arm weight = ff. Muscle tension is the enemy of dynamics." },
        { id: "t_pitfall", heading: "Don't run out of bow at ff", body: "Fast bow + full length = you hit the tip 1.5 beats in, scramble for the frog. Plan: big dynamics = use the whole bow. Small dynamics = use less." },
      ],
    },
    audioRefs: [
      { id: "demo_crescendo", label: "Open D · pp to ff over 4 beats" },
      { id: "demo_decrescendo", label: "Open D · ff to pp over 4 beats" },
      { id: "demo_phrase", label: "Ode to Joy bar 9-12 with dynamics" },
    ],
  },
  cello_l3_03_articulation: {
    id: "cello_l3_03_articulation",
    title: "Staccato vs legato · two bow moods",
    objectives: [
      "Play a phrase legato (long bows, no gaps)",
      "Play the same phrase staccato (short bows, crisp stops)",
      "Mix both in a single phrase",
    ],
    writtenContent:
      "## Bow articulation\n\n- **Legato**: long bows, no audible gaps between notes. The bow changes direction but sound continues.\n- **Staccato**: short bows, clear stops between notes. Each note is a 'dot' — crisp attack, sharp end.\n\n## Legato technique\n\nAt bow direction changes (end of down-bow → start of up-bow), keep pressure + speed constant through the change. The change is inaudible.\n\n## Staccato technique\n\nBow travels ~5cm per note, stops, then the next note. Wrist-driven. The stop is active (pressure + hold), not passive (drift + die).\n\n## Application\n\nBars 1-4 of Ode to Joy: play legato. Feels singing, flowing.\n\nBars 5-8: play staccato. Feels rhythmic, march-like.\n\nBars 9-12: mix — staccato on beat 1, legato on beats 2-4. Dance-like.\n\n## The musical choice\n\nArticulation shapes mood. Legato = tender. Staccato = assertive. Mix = dynamic. Your articulation choices are as musical as your note choices.",
    drills: {
      teach: [
        { id: "t_bow_change", heading: "Smooth bow change for legato", body: "The moment you change direction (frog → tip → frog), pressure dips and so does volume. Train to maintain pressure *through* the change. That's the legato skill." },
        { id: "t_wrist_flick", heading: "Staccato is a wrist flick", body: "Staccato doesn't move much bow. The wrist flicks 5cm, stops, flicks again. If your forearm is moving, you're playing detaché, not staccato." },
        { id: "t_pitfall", heading: "Don't play detaché when you mean legato", body: "Detaché has tiny gaps between notes. Legato has zero gaps. They sound different. If someone can't tell your legato from detaché, keep training. Zero gaps." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "Ode to Joy bar 1-4 · legato" },
      { id: "demo_staccato", label: "Same bars · staccato" },
      { id: "demo_mixed", label: "Bars 9-12 · mixed articulation" },
    ],
  },
  cello_l3_04_standard_cert: {
    id: "cello_l3_04_standard_cert",
    title: "Standard Certificate · 2-min recital",
    objectives: [
      "Perform Twinkle + first 8 bars of Ode to Joy back-to-back",
      "Include dynamic contrast",
      "Clean articulation choice (legato or mixed)",
    ],
    writtenContent:
      "## The cert\n\n2 minutes total. Play 'Twinkle' (1 minute) + first 8 bars of 'Ode to Joy' (1 minute). Natural break between them (set bow down, reset posture).\n\n## Grading\n\n1. **Pitch**: every note in tune (within 10 cents).\n2. **Rhythm**: steady 72 bpm, no drift.\n3. **Tone**: clean, no scratch, no wobble.\n4. **Dynamics**: at least one soft-loud-soft arc visible.\n5. **Articulation**: consistent choice within each piece.\n\n## Preparation\n\nOne week of daily 15-min sessions: 5 min Twinkle, 5 min Ode to Joy, 5 min dynamics drill. Record the final 3 days. Submit best take.\n\n## What to wear\n\nComfortable clothes. Cello is physical; tight clothes restrict bowing. Short sleeves let the grader see bow + left-hand technique clearly.\n\n## Don't practice sick\n\nTone suffers when you're sick. Reschedule the cert. Better to submit well than submit on time.",
    drills: {
      teach: [
        { id: "t_first_impression", heading: "First 3 seconds matter", body: "The first note tells the grader your level. Make it count. Intonation + tone locked from note 1. A shaky start colors everything after." },
        { id: "t_reset_between", heading: "Pause between pieces", body: "Set the bow down, breathe, reset. Running the pieces together creates nervous energy. A 3-second pause says 'I'm deliberate.'" },
        { id: "t_pitfall", heading: "Don't apologize at the end", body: "Some students smile sheepishly or say 'sorry for the mistakes' in the recording. Don't. End confidently. The grader assesses what they hear, not what you apologize for." },
      ],
    },
    audioRefs: [
      { id: "demo_recital", label: "Full 2-min recital · Twinkle + Ode to Joy" },
    ],
  },

  // ═══ CELLO · L4 ═══
  cello_l4_01_scale_two: {
    id: "cello_l4_01_scale_two",
    title: "G major scale · 2 octaves · introduces shifting",
    objectives: [
      "Play G major scale from G (open) to G above",
      "Use 1st position for bottom octave, shift to 4th for top",
      "Maintain tone through the shift",
    ],
    writtenContent:
      "## Beyond 1st position\n\nL2-L3 kept you in 1st position (fingers close to nut). G major 2-octave forces you out — the top G requires a *shift* to 4th position.\n\n## Shifting\n\nA shift = smooth movement of the whole hand up the fingerboard. Thumb + all 4 fingers move together. Destination: the exact fingerboard position where your 4th finger lands on G.\n\n## The G scale\n\nLower octave (1st position): G A B C D E F# G (8 notes).\nUpper octave (shift needed): G A B C D E F# G (same intervals, up one octave).\n\nFor upper octave, shift to 4th position on the A string around note 4 (C), then continue.\n\n## Listen for shift glitches\n\nDoes the shift produce a slide (zhzhzh)? Does it produce a gap (...silence...)? Goal: neither. Shift silently and accurately, with no audible artifact.\n\n## Practice\n\n1. Lower octave only, 10 times until perfect.\n2. Upper octave only (starting on shifted G), 10 times.\n3. Connected — full scale, 5 times slowly.",
    drills: {
      teach: [
        { id: "t_thumb_move", heading: "Thumb moves with hand", body: "When you shift, thumb slides up the back of the neck in sync with fingers. If thumb stays put, hand contorts. Thumb + hand = one unit during shifting." },
        { id: "t_silent_shift", heading: "Silent shifts take practice", body: "Lift pressure slightly during the shift (bow still moves, but quieter). Once in the new position, restore pressure. This keeps the shift inaudible — no zhzhzh." },
        { id: "t_pitfall", heading: "Don't shift mid-bow", body: "Coordinate the shift with a bow change. Shift during a bow change (end of down-bow) = invisible. Shift in the middle of a long bow = audible." },
      ],
    },
    audioRefs: [
      { id: "demo_lower", label: "G major · lower octave · 60 bpm" },
      { id: "demo_upper", label: "G major · upper octave · 60 bpm" },
      { id: "demo_full", label: "Full 2-octave scale · 72 bpm" },
    ],
  },
  cello_l4_02_ornament: {
    id: "cello_l4_02_ornament",
    title: "Vibrato · your first expressive ornament",
    objectives: [
      "Produce a slow, even vibrato on open A + D strings",
      "Apply vibrato to long notes in Ode to Joy",
      "Maintain pitch stability while vibrato oscillates",
    ],
    writtenContent:
      "## Vibrato · cello's voice\n\nVibrato is the slight oscillation of pitch that makes a note 'sing.' All great cellists vibrato on sustained notes. Without it, tone is sterile.\n\n## The motion\n\nPress a note (say D, second finger on A string). Without lifting, rock the finger up-and-down the string, producing a ~10 cent pitch wobble at ~5Hz.\n\n## Two vibrato styles\n\n- **Wrist vibrato**: wrist moves; finger stays stationary but rolls. Most common.\n- **Arm vibrato**: whole forearm moves; finger rolls more. Used for richer tone.\n\n## Start slow\n\nA fast, nervous vibrato sounds worse than no vibrato. Start at 3Hz (3 oscillations per second, *slow*). Build up to 5-6Hz over months.\n\n## Pitch stability\n\nVibrato should center on the correct pitch. Beginners vibrato sharp (pitch goes up from true center). Result: notes sound constantly sharp. Center your vibrato on the *note*, not the pitch above it.\n\n## Where to apply\n\nLong sustained notes only. Quarter notes or shorter = no vibrato (too fast). Half notes or longer = vibrato-worthy.",
    drills: {
      teach: [
        { id: "t_slow_wins", heading: "Slow beautiful vibrato > fast nervous vibrato", body: "3Hz controlled beats 6Hz frantic. Don't rush. A slow, lush vibrato sounds professional. A fast, tight vibrato sounds like anxiety." },
        { id: "t_center", heading: "Center on pitch", body: "Vibrato oscillates *above* and *below* the true pitch. Equal time on both sides. If you sit sharp, it sounds sharp. Train your ear: record + tune the center." },
        { id: "t_pitfall", heading: "Don't vibrato short notes", body: "Quarter notes at 72 bpm = 830ms. One vibrato cycle at 5Hz = 200ms. You'd squeeze in 4 cycles. Too frantic. Leave short notes straight; vibrato the longs." },
      ],
    },
    audioRefs: [
      { id: "demo_slow_vib", label: "Slow vibrato · open A · 3Hz" },
      { id: "demo_medium_vib", label: "Medium vibrato · 5Hz" },
      { id: "demo_phrase_vib", label: "Ode to Joy long notes with vibrato" },
    ],
  },
  cello_l4_03_rep_1: {
    id: "cello_l4_03_rep_1",
    title: "Bach Prelude from Cello Suite No. 1 · first 8 bars",
    objectives: [
      "Learn Bach's iconic opening phrases",
      "Use G string open + D string 1st position",
      "Apply steady detaché with appropriate phrasing",
    ],
    writtenContent:
      "## The most famous cello piece ever\n\nBach's 1st Cello Suite, G major, Prelude. You've heard it in movies, commercials, weddings. Even people who 'don't like classical' recognize it.\n\n## The opening\n\nFirst 2 bars are iterated G-major arpeggios: G-D-B-D-E-D-B-D. The pattern continues, shifting harmonically. 8 bars = 32 notes = 2 arpeggios/bar at 72 bpm.\n\n## Technique required\n\n- Consistent detaché\n- Perfect intonation (Bach's harmony rewards in-tune + punishes out-of-tune brutally)\n- Musical phrasing — each 2-bar unit is a phrase, with a mini-arc\n- No vibrato on the running 8ths (too fast); vibrato only on held notes\n\n## What's hard\n\nBach's density. Every note matters. Sloppy playing = muddy Bach. Clean playing = transcendent Bach. Your goal is transcendent.\n\n## Practice path\n\nWeek 1: notes correct, 50 bpm.\nWeek 2: up to 72 bpm.\nWeek 3: add phrasing dynamics.\nWeek 4: full 8 bars, recorded.",
    drills: {
      teach: [
        { id: "t_clarity", heading: "Clarity > speed", body: "Bach at 50 bpm perfectly clean beats 72 bpm sloppy. Work to clarity. When every note speaks cleanly, the tempo can rise. Don't invert the order." },
        { id: "t_phrase", heading: "Each 2-bar unit breathes", body: "Think of 2-bar phrases. The first bar sets up; the second bar resolves. Subtle volume arc within each phrase — swell on the first, relax on the second." },
        { id: "t_pitfall", heading: "Don't confuse Bach with romantic cello", body: "Bach is baroque. Clean, clear, not emotional like Romantic-era pieces. If you vibrato everything + drag tempo for emotion, you're playing Brahms, not Bach. Respect the style." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_4", label: "Bars 1-4 · 50 bpm practice tempo" },
      { id: "demo_full", label: "Bars 1-8 · 72 bpm with phrasing" },
    ],
  },
  cello_l4_04_practice_rout: {
    id: "cello_l4_04_practice_rout",
    title: "Cello practice routine · 15-min structured block",
    objectives: [
      "Structure: bow drills (3) + scales (5) + repertoire (7)",
      "Record + review sessions",
      "Commit to a week",
    ],
    writtenContent:
      "## The 15-min block\n\n**3 min · Bow drills** — long bows on open strings. C, G, D, A. Each string, 4 bars at 60 bpm. Focus on tone + pressure.\n\n**5 min · Scales** — G major 2-octave (from L4 lesson). Ascend + descend twice. Then a second scale of your choice (D major or C major).\n\n**7 min · Repertoire** — pick Bach Prelude or Ode to Joy. Play slowly, focus on one technical challenge: shifts → dynamics → intonation → vibrato.\n\n## Tuning first\n\nBefore any session, tune. Strings drift overnight. A detuned cello = out-of-tune practice = wasted hour. 60 seconds with a tuner solves this.\n\n## Record once per week\n\nDaily recording is overkill (you won't listen to 7 recordings). Weekly recording captures progress — and lets you hear the slow improvements that daily listening misses.\n\n## The stretch\n\nShoulder + wrist + back stretches before playing. Cellists are prone to back pain + shoulder issues. 60 seconds pre-session = 10 years added to your career.",
    drills: {
      teach: [
        { id: "t_tune_always", heading: "Always tune first", body: "A detuned practice is a wasted practice. Strings drift; temperature shifts them. Before any session, check pitches with a tuner. Non-negotiable." },
        { id: "t_one_focus", heading: "One focus per repertoire session", body: "7 minutes is tight. Don't try to fix everything. One focus: shifts today, intonation tomorrow, dynamics the day after. Rotation builds mastery." },
        { id: "t_pitfall", heading: "Don't skip bow drills", body: "Bow drills feel boring. You'll want to jump to repertoire. Resist. 3 minutes of bow work underpins the next 12 minutes. Skip it = rough tone all session." },
      ],
    },
    audioRefs: [
      { id: "bow_drills_ref", label: "3-min bow drill · reference" },
      { id: "demo_routine", label: "Full 15-min practice · reference" },
    ],
  },

  // ═══ SAXOPHONE · L2 (scale shipped in expansionHandAuthored) ═══
  saxophone_l2_02_two_note: {
    id: "saxophone_l2_02_two_note",
    title: "Long tones · C and D · embouchure steadiness",
    objectives: [
      "Hold C for 8 beats with steady tone",
      "Move to D, hold 8 beats",
      "Maintain constant embouchure across note change",
    ],
    writtenContent:
      "## Long tones · saxophone's foundation\n\nLong tones are the single most important sax exercise. Every pro plays long tones daily. They build: embouchure strength, breath control, pitch stability, tone quality.\n\n## The drill\n\nMetronome at 60 bpm. Breathe in for 4 beats. Play C for 8 beats (sustained, one breath). Breathe in for 4 beats. Play D for 8 beats. Continue up the scale (C, D, E, F, G...).\n\n## Embouchure\n\nYour lip position on the mouthpiece is your *embouchure*. It must stay *exactly* the same across all notes. If your embouchure shifts when moving C → D, your tone character changes — unacceptable.\n\n## Breath\n\nDiaphragmatic breath. Belly expands on inhale; ribs barely move. 8 beats at 60 bpm = 8 seconds. Easy first; your lungs fatigue by the 4th note (high G).\n\n## What to listen for\n\nTone stability. Does it wobble? Does volume dip mid-note? Does pitch drift? All three should be *constant* through the 8 beats.",
    drills: {
      teach: [
        { id: "t_embouchure_lock", heading: "Lock the embouchure", body: "Once you find the right lip position on the mouthpiece, it doesn't move. Notes change via fingering, not mouth. The embouchure is *the* fundamental. Lock it and don't touch it." },
        { id: "t_belly_breath", heading: "Breathe from the belly", body: "Lay on your back; feel your belly rise when you inhale. That's diaphragmatic breathing. Now sit up and do the same. Chest-only breathing runs out of air in 4 beats; belly breathing sustains 8+." },
        { id: "t_pitfall", heading: "Don't stop if tone cracks", body: "A cracked note happens. Don't stop — work through. Stopping builds the habit of giving up. Push through the crack to the next note; next time it won't crack." },
      ],
    },
    audioRefs: [
      { id: "demo_c_long", label: "C long tone · 8 beats" },
      { id: "demo_d_long", label: "D long tone · 8 beats" },
      { id: "demo_c_d", label: "C → D transition · smooth embouchure" },
    ],
  },
  saxophone_l2_03_tempo: {
    id: "saxophone_l2_03_tempo",
    title: "Quarter notes at 80 bpm · articulated with the tongue",
    objectives: [
      "Play C D E F G A B C as steady quarter notes at 80 bpm",
      "Articulate each note with a clean tongue stroke",
      "Maintain constant breath support",
    ],
    writtenContent:
      "## Tonguing\n\nEach note on sax starts with a brief tongue touch on the reed — 'tu' or 'du.' This is called articulation. Without it, notes slur together. With it, notes are clear + separated.\n\n## Technique\n\nTongue tip lightly touches the reed tip at the *start* of each note. Immediately withdraws. The touch stops airflow for ~20ms, then releases — creating a clean attack.\n\n## The drill\n\nMetronome at 80 bpm. Play ascending C scale (C to high C), one note per beat, each tongued.\n\n## Airflow\n\nYour breath flows continuously under the tonguing. Tongue = punctuation; breath = sentence. If you stop breathing between notes, you'll crack tones.\n\n## Common errors\n\n- Lazy tongue: notes connect, no attack → slurred.\n- Hard tongue: too much surface area → thumpy attack.\n- Timed wrong: tongue after breath starts → note comes in late.\n\nGoal: tongue and breath timed to the beat exactly.",
    drills: {
      teach: [
        { id: "t_tu", heading: "Say 'tu' for every note", body: "As you play, silently pronounce 'tu' at each beat. Your tongue physically makes that motion. Vocalizing trains the muscle memory." },
        { id: "t_breath_under", heading: "Breath flows underneath", body: "Tonguing doesn't interrupt breath. Air keeps pushing; tongue merely punctuates. If you're gasping between notes, you're breathing wrong — tongue, don't hold breath." },
        { id: "t_pitfall", heading: "Don't over-tongue", body: "Too much tongue contact = 'thu' sound (heavy). Minimal contact = 'tu' sound (clean). Light touch is the goal." },
      ],
    },
    audioRefs: [
      { id: "demo_c_scale", label: "C scale tongued · 80 bpm" },
      { id: "demo_slurred", label: "Same · slurred (no tongue, contrast)" },
    ],
  },
  saxophone_l2_04_first_piece: {
    id: "saxophone_l2_04_first_piece",
    title: "'Mary Had a Little Lamb' · first saxophone melody",
    objectives: [
      "Play the full 16-bar melody of 'Mary Had a Little Lamb'",
      "Tongue every note cleanly",
      "Maintain 72 bpm throughout",
    ],
    writtenContent:
      "## The universal starter\n\n'Mary' uses only 4 notes (E D C B in C major — mi re do ti). Range: 1st to 4th space of the staff. Rhythm: quarters and halves only. Perfect first melody.\n\n## The notes\n\n| Bar | 1 | 2 | 3 | 4 |\n| Melody | E D C D | E E E - | D D D - | E G G - |\n\n('—' = rest or sustain)\n\n## Fingerings\n\nAll 4 notes are in the lower register. C = all fingers + octave key up. D = lift right pinky. E = lift right ring. G = lift more.\n\n## Bring it to life\n\n1. First pass: just correct notes, 50 bpm.\n2. Second: add articulation, 65 bpm.\n3. Third: dynamics (bars 1-2 mp, bars 3-4 mf, return mp).\n4. Fourth: 72 bpm, full piece.\n\n## Why simple matters\n\nLearn to play Mary *beautifully*. A beautiful Mary is 90% of playing jazz well. Complexity comes later; beauty comes first.",
    drills: {
      teach: [
        { id: "t_short_melody", heading: "Internalize the tune", body: "Mary is so simple you can sing it. That's the test — can you sing it fluently before playing it? If yes, playing it is translation. If no, learn the tune first." },
        { id: "t_finger_pattern", heading: "Fingers learn patterns, not notes", body: "The shape of the melody (up, down, up, return) is a physical shape on the sax. Let your fingers feel the pattern, not mentally think each note. Muscle memory wins." },
        { id: "t_pitfall", heading: "Don't rush the rests", body: "Mary has several rests. Students play through them. Don't. Rests are music. Hold the silence. Then the next note lands with weight." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Mary · 50 bpm with clear fingerings" },
      { id: "demo_target", label: "Mary · 72 bpm with dynamics" },
    ],
  },

  // ═══ SAXOPHONE · L3 ═══
  saxophone_l3_01_first_song: {
    id: "saxophone_l3_01_first_song",
    title: "'When the Saints Go Marching In' · New Orleans classic",
    objectives: [
      "Play the 16-bar melody of 'Saints' in C major",
      "Use swung eighth notes (jazz feel)",
      "Maintain pitch accuracy across mid-range",
    ],
    writtenContent:
      "## 'Saints' = your first jazz-feel piece\n\n'When the Saints Go Marching In' is a Dixieland staple. Melody is simple, but the *feel* introduces you to swing — the jazz rhythmic language.\n\n## Swing feel\n\nWritten as even 8th notes; played as long-short-long-short. Ratio ~2:1. Notes on the beat held longer; off-beat notes shortened.\n\nThis feels strange at first. You'll want to play even. Resist. Swing is the foundation of jazz — get it now, it pays for life.\n\n## The melody\n\n| Phrase | Notes (C major) |\n| 1 | C E F G |\n| 2 | C E F G |\n| 3 | C E F G (higher) |\n| 4 | G F E C |\n\nMemorize these 4 phrases. Repeats + slight variations fill 16 bars.\n\n## Dynamics\n\nJazz is often played with more dynamic subtlety than classical. Build to loud across the 16 bars, then fade for an encore feeling.\n\n## Tongue lightly\n\nJazz articulation is softer than classical. Don't over-tongue. Let notes connect in a relaxed way — that's the genre.",
    drills: {
      teach: [
        { id: "t_swing", heading: "Swing is internal", body: "You can't swing by reading notation. Swing lives in your body. Listen to classic jazz (Armstrong, Coltrane); imitate the feel. Don't try to read it." },
        { id: "t_relaxed_tongue", heading: "Jazz tongue is lazy", body: "Classical tonguing is crisp and equal. Jazz tonguing is relaxed, softer. Say 'du' instead of 'tu.' Longer, rounder sound." },
        { id: "t_pitfall", heading: "Don't play jazz like a march", body: "Saints can sound like a march (very even, on-beat everything) or like jazz (swung, laid-back). If you play it like a march, it's technically right but stylistically wrong. Commit to swing." },
      ],
    },
    audioRefs: [
      { id: "demo_straight", label: "Saints · straight (even 8ths) · wrong feel" },
      { id: "demo_swung", label: "Saints · swung (jazz feel) · correct" },
    ],
  },
  saxophone_l3_02_dynamics: {
    id: "saxophone_l3_02_dynamics",
    title: "Breath pressure dynamics · pp to ff",
    objectives: [
      "Hold G from pp to ff over 8 beats",
      "Maintain pitch stability across the arc",
      "Apply to a phrase in 'Saints'",
    ],
    writtenContent:
      "## Sax dynamics = breath pressure + mouthpiece coupling\n\nLouder breath alone doesn't work — pitch rises sharp. You must counter-balance: more breath + slightly relaxed embouchure (lip tension) = louder + in tune.\n\n## pp technique\n\nMinimal breath. Lip pressure slightly increased to maintain pitch despite reduced airflow.\n\n## ff technique\n\nMaximum breath. Lip pressure slightly decreased (don't bite down harder) — the reed needs room to vibrate fully.\n\n## The arc\n\nG note, 8 beats. Start pp (barely audible, focused tone). Crescendo linearly. By beat 8, reach ff (full, rich, projecting).\n\n## Pitch check\n\nRecord + use a tuner. Does pitch rise from pp to ff? Slight rise (5-10 cents) is normal. Significant rise (20+ cents) means your embouchure didn't compensate. Drill.\n\n## Musical application\n\nIn 'Saints,' bars 1-8 = mp, bars 9-12 = f (the climb), bars 13-16 = mp again. Clear arc shapes the piece.",
    drills: {
      teach: [
        { id: "t_relaxed_ff", heading: "Don't bite for loud", body: "Biting down (increased lip tension) at ff chokes the reed. Counterintuitively, a loud note needs *more* reed vibration, which means *less* lip pressure. Relax into the volume." },
        { id: "t_pp_focus", heading: "pp requires more support", body: "Soft doesn't mean lazy breath. pp needs laser-focused air, aimed precisely. Diaphragm engaged, airstream narrow. Lazy breath at pp = wobble + pitch drop." },
        { id: "t_pitfall", heading: "Don't jump volumes", body: "ff appearing suddenly = startling. ff after a 4-beat crescendo = musical. Smooth transitions > abrupt changes." },
      ],
    },
    audioRefs: [
      { id: "demo_g_arc", label: "G · pp to ff over 8 beats" },
      { id: "demo_saints_dynamics", label: "'Saints' with dynamic arc" },
    ],
  },
  saxophone_l3_03_articulation: {
    id: "saxophone_l3_03_articulation",
    title: "Legato vs tongued · jazz articulation choices",
    objectives: [
      "Play a phrase with all legato (slurred) notes",
      "Play the same phrase tongued",
      "Mix legato + tongued within one phrase",
    ],
    writtenContent:
      "## Jazz articulation\n\nJazz players mix legato and tongued articulation on the same phrase for expressive contour. It's not one choice for the whole piece — it's a moment-by-moment decision.\n\n## Legato (slurred)\n\nTongue only the first note of a phrase. Subsequent notes connect directly — air flows continuously, fingers change pitch. The effect: singing, flowing.\n\n## Tongued\n\nEach note gets its own tongue stroke. Crisp, articulated. The effect: rhythmic, emphatic.\n\n## Mixing\n\nIn a phrase, you might tongue notes 1, 3, and 5; slur 2, 4, 6. This creates a 'slurred-tongued' pattern that's the hallmark of bebop jazz.\n\n## The practice\n\nTake a 4-bar phrase from 'Saints.' Play it three ways:\n1. All slurred (legato).\n2. All tongued.\n3. Tongue first and third beats of each bar; slur the rest.\n\nListen to the mood differences.",
    drills: {
      teach: [
        { id: "t_choice", heading: "Articulation is expression", body: "A bebop player might use 5 different articulations in 4 bars — each a musical choice. Train yourself to *choose* per note, not apply one blanket choice per piece." },
        { id: "t_listen_copies", heading: "Imitate recordings", body: "Pick a favorite sax recording. Listen to which notes are tongued vs slurred. Transcribe those choices. Apply them to your own phrases. This is how jazz style is learned." },
        { id: "t_pitfall", heading: "Don't slur everything", body: "Over-slurred jazz sounds muddy. Over-tongued jazz sounds stiff. A mix of both is what great players do. Experiment." },
      ],
    },
    audioRefs: [
      { id: "demo_slurred", label: "'Saints' phrase all slurred" },
      { id: "demo_tongued", label: "Same phrase all tongued" },
      { id: "demo_mixed", label: "Mixed articulation (bebop style)" },
    ],
  },
  saxophone_l3_04_standard_cert: {
    id: "saxophone_l3_04_standard_cert",
    title: "Standard Certificate · 2-min sax performance",
    objectives: [
      "Perform 'Mary' + 'Saints' back-to-back (1 min each)",
      "Include swing feel on 'Saints'",
      "Include dynamic arc",
    ],
    writtenContent:
      "## The cert\n\n2 minutes. 'Mary Had a Little Lamb' (1 min) + 'When the Saints Go Marching In' (1 min).\n\n## Grading\n\n1. **Pitch**: within 10 cents on held notes.\n2. **Rhythm**: steady tempo, correct swing on 'Saints'.\n3. **Tone**: clean, no squeaks, no wobbles.\n4. **Dynamics**: at least one clear crescendo arc.\n5. **Articulation**: appropriate style for each piece.\n\n## Weak point audit\n\nBefore the cert, self-record. Listen. What's your weakness?\n- Pitch drift on long notes? → Long-tone drill.\n- Rushed tempo? → Metronome drill.\n- Flat tone? → Reed check + embouchure drill.\n\nFix your #1 weakness this week. Cert next week.\n\n## Reed matters\n\nA tired reed gives flat tone + frustration. Have a fresh reed for the cert recording. Reed lifespan: 2-3 weeks of heavy practice.",
    drills: {
      teach: [
        { id: "t_fresh_reed", heading: "New reed for cert", body: "Old reeds are dead. Put on a fresh reed the night before the cert (let it wet in overnight). Fresh reed + good warmup = peak tone for the recording." },
        { id: "t_warmup", heading: "10-min warmup before cert", body: "Long tones + scale + one piece pass. Your embouchure needs wake-up time. Cold sax = tight tone + pitch problems. Warm sax = fluid + accurate." },
        { id: "t_pitfall", heading: "Don't rush 'Mary'", body: "Mary is easy. You'll be tempted to go fast. Don't. Mary at 72 bpm deliberate = beautiful. Mary at 100 bpm rushed = exercise, not music." },
      ],
    },
    audioRefs: [
      { id: "demo_cert", label: "2-min cert performance · reference" },
    ],
  },

  // ═══ SAXOPHONE · L4 ═══
  saxophone_l4_01_scale_two: {
    id: "saxophone_l4_01_scale_two",
    title: "G major scale · extended range",
    objectives: [
      "Play G major scale across 2 octaves",
      "Use the octave key fluently",
      "Maintain tone across the octave transition",
    ],
    writtenContent:
      "## 2-octave scale on sax\n\nThe octave key is sax's lifeline. Pressing it + same fingering = one octave up. Learning to use it fluently = accessing the upper range.\n\n## G major, 2 octaves\n\nLower: G A B C D E F# G.\nUpper: G A B C D E F# G.\n\nSame fingerings for both octaves — just add the octave key for upper.\n\n## The transition\n\nNote 8 of lower octave (G) and note 1 of upper octave (same G, but with octave key). The transition must be smooth:\n\n1. Finger: same G shape.\n2. Thumb: press octave key.\n3. Breath: slight increase (upper register needs more support).\n4. Embouchure: slight additional lip firmness.\n\nAll four adjustments happen simultaneously — that's the challenge.\n\n## Drill\n\n1. Lower octave only, 5 times.\n2. Upper octave (starting octave'd G), 5 times.\n3. Connected, slowly (40 bpm), 10 times.\n4. Connected at target (72 bpm), 5 times.",
    drills: {
      teach: [
        { id: "t_four_at_once", heading: "Four adjustments per transition", body: "Finger + octave key + breath + embouchure. Miss any one and the note cracks. Slow practice trains them to fire simultaneously. Fast practice reveals which one you're missing." },
        { id: "t_upper_tone", heading: "Upper register tone", body: "Upper notes can sound thin. Fix: more breath support, firmer lip. The tone should match lower register's warmth. Don't accept a thin upper register." },
        { id: "t_pitfall", heading: "Don't squeeze the octave key", body: "Gentle thumb press is enough. Squeezing tenses the whole hand, which then tenses embouchure. Light octave touch = relaxed body = clean upper register." },
      ],
    },
    audioRefs: [
      { id: "demo_lower", label: "G major lower octave" },
      { id: "demo_upper", label: "G major upper octave" },
      { id: "demo_full", label: "Full 2-octave scale · 72 bpm" },
    ],
  },
  saxophone_l4_02_ornament: {
    id: "saxophone_l4_02_ornament",
    title: "Scoop · jazz approach to a target note",
    objectives: [
      "Scoop into F from below (from E)",
      "Apply to a phrase in 'Saints'",
      "Differentiate scoop from slur",
    ],
    writtenContent:
      "## Scoop · jazz's sliding entry\n\nA scoop = bending up into a note from slightly below. Start the note below pitch, slide up to target pitch within 100-200ms. The effect is expressive — the note arrives with 'feeling.'\n\n## How to scoop\n\nFor F: start with embouchure slightly loose (producing E or Eb). As you play, firm up the lip + increase breath pressure. The pitch rises. Target F = destination.\n\n## Practice isolation\n\n1. Play F straight (no scoop). Observe pitch.\n2. Loosen embouchure; play F again. Now it's sharp-E or Eb.\n3. Start loose, firm up — the pitch glides from E to F.\n4. Repeat until scoop is reflexive.\n\n## Musical placement\n\nScoop at phrase starts. Before emphasized notes. After rests. Not every note — that sounds like you can't control pitch.\n\n## In 'Saints'\n\nApply scoops to the downbeats of bars 1 and 9. These are phrase-beginnings. The scoop adds jazz flavor to an otherwise straight melody.",
    drills: {
      teach: [
        { id: "t_scoop_arc", heading: "Scoop has a shape", body: "Scoop isn't binary (sharp or flat). It's a short *arc* — below pitch, rising. Make the arc audible, not a glitch. Slow scoops are more expressive than fast ones." },
        { id: "t_pitch_target", heading: "Land exactly on pitch", body: "Scoop's destination must be in tune. Starting flat is the setup; landing on pitch is the punchline. Under-shooting or over-shooting both ruin the effect." },
        { id: "t_pitfall", heading: "Don't scoop classical", body: "Scoops are jazz, blues, R&B. If you scoop in a classical piece, it sounds wrong. Genre matters. Use scoops in 'Saints' (Dixieland), not in Bach." },
      ],
    },
    audioRefs: [
      { id: "demo_scoop_slow", label: "Scoop into F · slow demo" },
      { id: "demo_saints_scoop", label: "'Saints' with 2 scoops added" },
    ],
  },
  saxophone_l4_03_rep_1: {
    id: "saxophone_l4_03_rep_1",
    title: "'Autumn Leaves' · jazz standard opening 16 bars",
    objectives: [
      "Learn the head (melody) of 'Autumn Leaves'",
      "Apply swing + scoops + dynamics",
      "Complete 16 bars at 120 bpm (swung)",
    ],
    writtenContent:
      "## The jazz standard\n\n'Autumn Leaves' by Joseph Kosma. 1945. Translated from French ('Les Feuilles Mortes'). Melancholic, accessible melody. A canonical starter piece for jazz musicians.\n\n## Key\n\nE minor for most common version. Later we'll learn it in G major (the relative major). For this lesson: E minor version.\n\n## The head\n\n16 bars. Opens with a descending line, resolves to E, repeats and modulates. Classic AABC form.\n\n## What's new\n\n- Minor key for the first time\n- More complex harmonic movement\n- Requires swing + scoops + dynamics integrated\n- Tempo: 120 bpm (fast enough that swing feel matters)\n\n## Practice stages\n\nWeek 1: melody straight, 80 bpm, no ornaments.\nWeek 2: add swing feel, 100 bpm.\nWeek 3: add scoops on 2 notes per A section.\nWeek 4: add dynamic arc across the form.\nWeek 5: record full 16 bars at 120 bpm.",
    drills: {
      teach: [
        { id: "t_minor_color", heading: "Minor has different mood", body: "Minor keys feel different from major. Autumn Leaves' melancholy is carried by the minor scale. Play *into* the mood: slightly slower attacks, more lingering on held notes." },
        { id: "t_head_first", heading: "Head is the melody; solo comes later", body: "In jazz, 'the head' = the composed melody. In later years you'll improvise over these chord changes. For now: play the head perfectly. Improvisation is L5+ territory." },
        { id: "t_pitfall", heading: "Don't rush at 120 bpm", body: "Many students push tempo to 'sound advanced.' Don't. 100 bpm clean > 120 bpm sloppy. If 120 feels rushed, stay at 100 until clean — then step up." },
      ],
    },
    audioRefs: [
      { id: "demo_a_section", label: "Autumn Leaves A section · 100 bpm" },
      { id: "demo_full", label: "Full 16-bar head · 120 bpm swung" },
      { id: "backing_track", label: "Autumn Leaves backing track · 120 bpm" },
    ],
  },
  saxophone_l4_04_practice_rout: {
    id: "saxophone_l4_04_practice_rout",
    title: "Sax practice · 15-min structured block",
    objectives: [
      "Structure: long tones (3) + scales (5) + repertoire (7)",
      "Record + review",
      "Maintain for a week",
    ],
    writtenContent:
      "## The 15-min block\n\n**3 min · Long tones** — C, D, E, F, G. Each held 8 beats at 60 bpm. Focus on embouchure stability + pitch.\n\n**5 min · Scales** — G major 2-octave (L4 lesson). Ascend + descend 3 times. Use tongue articulation.\n\n**7 min · Repertoire** — 'Autumn Leaves' or 'Saints'. Play 2-3 times. Each pass focuses: swing feel → scoops → dynamics.\n\n## Reed check\n\nBefore any practice: reed inspection. Dead reeds ruin the session. Have 2-3 reeds in rotation — rotate daily to extend lifespan.\n\n## Warmup matters\n\nLong tones first. Not optional. Skipping = tight embouchure + cracked notes all session. Your body needs 3 minutes to get ready.\n\n## Weekly checkpoint\n\nSunday evening: record yourself playing a favorite piece for 2 minutes. Next Sunday: same piece. Compare. Progress appears in subtle ways — tone, rhythm, articulation.",
    drills: {
      teach: [
        { id: "t_long_tones_always", heading: "Long tones every day", body: "Non-negotiable. Pros play long tones daily, year after year. They reset embouchure, check pitch, refocus breath. 3 minutes only. Every session starts here." },
        { id: "t_reed_rotation", heading: "Rotate reeds", body: "One reed dies in 2 weeks of heavy use. Rotating 3 reeds = each one gets 10 days of playing, 20 days of rest = double lifespan. Label them: 1, 2, 3." },
        { id: "t_pitfall", heading: "Don't skip warmup", body: "Cold embouchure = cracked notes. Your lips need 3 min to 'wake up.' Skipping warmup = bad tone for the whole session. Always warm." },
      ],
    },
    audioRefs: [
      { id: "long_tones_ref", label: "Long tones · 3-min reference" },
      { id: "demo_routine", label: "Full 15-min routine · reference" },
    ],
  },

  // ═══ TRUMPET · L2 ═══
  trumpet_l2_01_scale: {
    id: "trumpet_l2_01_scale",
    title: "Trumpet · Bb major scale with valve mapping",
    objectives: [
      "Play Bb major scale (1 octave) with correct valve fingerings",
      "Use clean tongue attacks",
      "Maintain tone across valve changes",
    ],
    writtenContent:
      "## Trumpet basics\n\nTrumpet uses 3 valves + lip tension (embouchure + air speed) to produce pitch. 7 fingering combinations × various lip tensions = full chromatic range.\n\n## Bb major scale fingerings\n\n| Note | Bb | C | D | Eb | F | G | A | Bb |\n| Valves | 0 | 0 | 1+2 | 1 | 0 | 0 | 1+2 | 0 |\n\n('0' = open, no valves pressed.)\n\nNote: same valve combos work at different lip tensions for different octaves. Same fingering for low Bb + middle Bb + high Bb — different lip.\n\n## The scale\n\nLeave valves open for Bb, C. Press 1+2 for D. Press 1 for Eb. Open for F, G. Press 1+2 for A. Open for Bb.\n\nSlow. 50 bpm. Tongue each note. Listen for clean tone on every note.\n\n## Common issue\n\nGoing from 1+2 (D) to 1 (Eb) — the valves change under the finger. Slow is your friend. Coordinate.",
    drills: {
      teach: [
        { id: "t_valves_snap", heading: "Valves snap, don't glide", body: "Valves must fully seat. Half-pressed valves = wrong pitch or airy tone. Snap each press decisively. 'Glide' between valves = sloppy sound." },
        { id: "t_air_speed", heading: "Air speed matters more than volume", body: "Trumpet needs fast air, not loud air. Imagine blowing hot breath on a mirror 6 feet away. That focused, rapid airstream produces clean tone. Soft/slow air = fuzzy tone." },
        { id: "t_pitfall", heading: "Don't blow through closed lips", body: "If your embouchure closes up under pressure, no sound comes out. Lips should vibrate against each other, not seal tight. Find the balance: closed enough to vibrate, open enough for air to escape." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "Bb major scale · 40 bpm with fingerings" },
      { id: "demo_target", label: "Bb scale · 72 bpm · tongued" },
    ],
  },
  trumpet_l2_02_two_note: {
    id: "trumpet_l2_02_two_note",
    title: "Lip slurs · Bb to F without tonguing",
    objectives: [
      "Slur from low Bb to F and back (same fingering, different lip)",
      "Maintain tone through the slur",
      "Repeat 8 times consecutively",
    ],
    writtenContent:
      "## Lip slurs · trumpet's secret weapon\n\nSame fingering, different pitch. Low Bb (open valves, relaxed lip) and F (open valves, firm lip). The pitch change is 100% in the embouchure + air speed.\n\n## Why this matters\n\nMost trumpet technique is lip control. Changing valves is easy; changing lip to hit the right *harmonic* is the real skill. Lip slurs train this.\n\n## How\n\n1. Play low Bb relaxed. Note the lip firmness.\n2. Slightly firm the lip + increase air speed. Pitch rises — you should find F.\n3. Relax back. Pitch drops — you should find Bb.\n4. Slur between them (don't tongue). Smooth pitch transition via lip.\n\n## Common issue\n\nStuck between Bb and F. The intermediate Cs, Ds, Es are not harmonics on open fingering; your lip must skip over them. If you're stuck in-between, your embouchure is changing too slowly.\n\n## Drill\n\n8 reps per minute. Consistency matters — every slur must find F cleanly on the first try.",
    drills: {
      teach: [
        { id: "t_harmonics", heading: "Trumpet produces harmonics", body: "Each fingering has multiple natural pitches (harmonics). Open fingering: low Bb → F → Bb → D → F → A. You choose which harmonic with your lip. Low lip = low harmonic; tight lip = high harmonic." },
        { id: "t_air_support", heading: "Lip slurs = air support shift", body: "Lip change alone isn't enough. Air speed must increase for F. Think: low Bb = breeze. F = hair dryer. Combined lip + air shift makes the slur happen cleanly." },
        { id: "t_pitfall", heading: "Don't tongue during slurs", body: "The whole point of the lip slur is no tongue. If you tongue, you're doing an articulated scale, not a slur. Slur = pure embouchure control." },
      ],
    },
    audioRefs: [
      { id: "demo_slur", label: "Bb to F lip slur · 8 reps" },
      { id: "demo_broken", label: "Failed slur (stuck in-between) · wrong example" },
    ],
  },
  trumpet_l2_03_tempo: {
    id: "trumpet_l2_03_tempo",
    title: "Steady quarters at 80 bpm · with fanfare articulation",
    objectives: [
      "Play C scale as quarter notes at 80 bpm",
      "Articulate crisply (trumpet-style ta-ta-ta)",
      "Maintain 32 bars of steady tempo",
    ],
    writtenContent:
      "## Trumpet articulation\n\nMore assertive than sax. 'Ta' with a firm tongue + quick release. Each note has a clear attack + clear end.\n\n## The exercise\n\nMetronome at 80 bpm. Play C scale (C D E F G A B C) quarter notes. Tongue each note. Maintain 32 bars (4 scales up + down).\n\n## Why 32 bars\n\nTrumpet fatigues fast — the embouchure muscles are small + powerful. 32 bars tests your stamina. If you fatigue by bar 20, take 30-sec rest + continue. This is endurance training.\n\n## Tone consistency\n\nEvery note should have the same brightness. If bar 20 sounds dull compared to bar 5, your embouchure is tiring. Rest.\n\n## Common trumpet death\n\nTrying to push through fatigue = bad habits + poor tone. Professional trumpeters *rest* as part of practice. 5-min on, 2-min off, 5-min on. This builds stamina faster than straight 12 min.",
    drills: {
      teach: [
        { id: "t_rest", heading: "Rest is practice", body: "Unlike other instruments, trumpet requires micro-rests. Play 5 minutes, rest 1-2 minutes. During rest, lip muscles recover. Total effective practice = more than straight playing." },
        { id: "t_firm_attack", heading: "Tongue is firm, not forceful", body: "Crisp attack comes from quick tongue movement, not heavy tongue. Minimal contact, fast release. If you hear 'thu' (heavy), back off. 'ta' is the goal." },
        { id: "t_pitfall", heading: "Don't push through fatigue", body: "Playing with tired lips = bad habits reinforced. If tone drops, rest immediately. Come back fresh. Quality > quantity." },
      ],
    },
    audioRefs: [
      { id: "demo_scale_slow", label: "C scale · 60 bpm · tongued" },
      { id: "demo_scale_target", label: "C scale · 80 bpm · 32 bars" },
    ],
  },
  trumpet_l2_04_first_piece: {
    id: "trumpet_l2_04_first_piece",
    title: "'Taps' · solemn bugle call",
    objectives: [
      "Play 'Taps' from memory using C-E-G-C pattern",
      "Hold long notes with steady tone",
      "Maintain emotional weight of the piece",
    ],
    writtenContent:
      "## 'Taps' · the soldier's farewell\n\nUS bugle call used at funerals, memorials, day's end on military bases. 24 notes. Universally recognized. Solemn + emotionally weighty.\n\n## Simplicity\n\nOnly 4 notes: low C, E, G, high C. Hand-tappable on piano. Rhythm: quarters, halves, dotted halves. Simple.\n\n## The weight\n\n'Taps' isn't played technically — it's played *emotionally*. A trumpeter at a funeral doesn't impress anyone with technique. They impress with the *feeling*.\n\n## Your job\n\nPlay the notes + rhythm correctly. Then, deliberate slowness on long notes. Slight swell on held notes (pp → mp → pp). Long silence between phrases. Let the weight arrive.\n\n## Practice arc\n\nWeek 1: notes correct, 60 bpm.\nWeek 2: add dynamic arc.\nWeek 3: find the emotion — play like you mean it.\nWeek 4: record. Listen back. Adjust.\n\n## Who to play it for\n\nYourself, for a week. Then someone meaningful. Playing Taps for another person changes the piece — you'll hear your own delivery differently.",
    drills: {
      teach: [
        { id: "t_emotion", heading: "Play with intent", body: "'Taps' is a funeral. Imagine who you're honoring. That person lives in each note. No technical drill replaces this mental work — emotion is musical content." },
        { id: "t_long_notes", heading: "Long notes must not waver", body: "Dotted half notes = 6 beats. Your lip will want to tire. Strengthen the embouchure so these notes are rock-steady. A wobbling long note breaks the spell." },
        { id: "t_pitfall", heading: "Don't rush phrases", body: "'Taps' is slow. Some students rush, finishing in 20 seconds. Real 'Taps' = 35-45 seconds. Use metronome + patience." },
      ],
    },
    audioRefs: [
      { id: "demo_taps", label: "Taps · solemn tempo · full piece" },
    ],
  },

  // ═══ TRUMPET · L3 ═══
  trumpet_l3_01_first_song: {
    id: "trumpet_l3_01_first_song",
    title: "'When the Saints' · on trumpet (Dixieland classic)",
    objectives: [
      "Play the melody of 'Saints' at 100 bpm",
      "Use assertive Dixieland-style articulation",
      "Project with forte dynamics",
    ],
    writtenContent:
      "## Saints on trumpet\n\nDixieland jazz lead instrument. Bright, brash, loud. 'Saints' is the ultimate Dixieland crowd-pleaser.\n\n## Style\n\nDifferent from sax 'Saints' (smoother, swung). Trumpet 'Saints' = bright, forceful, parade-feel. Articulation crisp. Dynamics projecting.\n\n## The melody\n\nSame notes as sax version (C E F G pattern). But attack each note with more conviction. Trumpet doesn't whisper Saints; trumpet announces it.\n\n## Stamina\n\n1 minute of 'Saints' at 100 bpm = significant embouchure load. Build up: day 1, 30 seconds. Day 3, 60 seconds. Day 7, 2 minutes at 100 bpm no fatigue.\n\n## The brass tradition\n\nDixieland trumpet is a specific sound: slightly rough, occasionally cracking, full of joy. Listen to Louis Armstrong; that's the model. Clean perfection isn't the goal — musical joy is.",
    drills: {
      teach: [
        { id: "t_brass_joy", heading: "Trumpet is joy", body: "Saints demands joy. Even when you're practicing, smile. Your body posture affects your tone. Tense, serious practice = tight tone. Loose, joyful practice = bright, projecting tone." },
        { id: "t_project", heading: "Project across the room", body: "Imagine you're playing to someone 30 feet away. Your air must reach them. This mental image naturally firms embouchure + increases air support. 'Room-filling' is the trumpet goal." },
        { id: "t_pitfall", heading: "Don't try for loud instead of bright", body: "'Loud' gets you volume but dull tone. 'Bright' gets you projection + carrying tone. Brightness comes from focused air, not force. Bright + controlled > loud + forced." },
      ],
    },
    audioRefs: [
      { id: "demo_saints_dixie", label: "'Saints' Dixieland style · 100 bpm" },
    ],
  },
  trumpet_l3_02_dynamics: {
    id: "trumpet_l3_02_dynamics",
    title: "pp to ff · embouchure dynamics on trumpet",
    objectives: [
      "Hold F from pp to ff over 8 beats",
      "Reverse (ff to pp) over 8 beats",
      "Apply to 'Saints' phrases",
    ],
    writtenContent:
      "## Trumpet dynamics\n\nLoud and soft, both are hard on trumpet.\n\n**pp**: requires focused embouchure + minimal but steady air. Easy to crack. Requires more control than volume.\n\n**ff**: requires maximum air + firm embouchure. Easy to over-blow and produce splat tone. Requires more *support* than force.\n\n## The arc\n\nF, 8 beats. Start pp — small breath, focused lip. Grow linearly. By beat 8, ff — full support, fully projecting.\n\n## Pitch issue\n\nAs you crescendo, pitch tends to rise sharp (tighter embouchure = higher pitch). Compensate: keep embouchure *position* steady; add air support without adding lip tension. Practice with a tuner; watch cents drift.\n\n## Musical use\n\n'Saints' bars 1-8 = mf (loud entry). Bars 9-12 = ff (climax). Bars 13-16 = return to mf. Clear arc over 16 bars.\n\n## The trumpet dynamics challenge\n\nUnlike bowed instruments, the trumpet's dynamic range is narrow compared to its volume ceiling. pp on trumpet is still loud vs pp on cello. Work within your instrument's range.",
    drills: {
      teach: [
        { id: "t_support_not_force", heading: "Support, don't force", body: "ff comes from increased *air support* (diaphragm engagement), not brute lip force. Air support adds projection without tension. Force adds volume but distorts tone." },
        { id: "t_pitch_watch", heading: "Pitch rises at ff by default", body: "Without correction, every crescendo rises pitch. Train the correction: embouchure position fixed, air scaled. Use a tuner to verify." },
        { id: "t_pitfall", heading: "Don't over-pp", body: "Playing too soft = airy tone + pitch drop. Trumpet pp should still be clean. If you have to go really quiet, back off the volume and play with proper focus instead." },
      ],
    },
    audioRefs: [
      { id: "demo_arc", label: "F · pp to ff · 8-beat arc" },
      { id: "demo_phrase", label: "'Saints' phrase with dynamic arc" },
    ],
  },
  trumpet_l3_03_articulation: {
    id: "trumpet_l3_03_articulation",
    title: "Legato vs staccato · trumpet contrast",
    objectives: [
      "Play a phrase legato (slurred, smooth)",
      "Play the same phrase staccato (short, punchy)",
      "Mix both in one phrase",
    ],
    writtenContent:
      "## Trumpet articulation contrast\n\n**Legato**: tongue only the first note; subsequent notes slur (lip slurs + valve changes, no tongue).\n\n**Staccato**: each note tongued with quick release. Between notes: air stops briefly.\n\n## Why contrast\n\nA phrase of all legato = smooth, flowing, lyrical. A phrase of all staccato = rhythmic, emphatic, marching. Mix = expressive variation.\n\n## The drill\n\nPick a 4-bar phrase from 'Saints'. Play 3 ways:\n1. All legato: tongue bar 1 downbeat, slur the rest of the bar.\n2. All staccato: tongue every note, ~50% note duration.\n3. Mixed: tongue beats 1 + 3 of each bar; slur 2 + 4.\n\n## Musical choices\n\nIn fanfares + marches: staccato dominates.\nIn lyrical pieces + ballads: legato dominates.\nIn jazz: mixed.\n\nKnow the genre; choose accordingly.",
    drills: {
      teach: [
        { id: "t_tongue_timing", heading: "Tongue timing is everything", body: "Staccato notes start and end with tongue. If you tongue on time at the start but let the note bleed (no end), it's not staccato. Both ends are active." },
        { id: "t_legato_lip", heading: "Legato slurs are lip-driven", body: "Between notes in a legato phrase, no tongue. The lip changes pitch (plus valves). This is trumpet's lip slur applied to melodies. Practice L2's Bb-to-F slurs to prepare." },
        { id: "t_pitfall", heading: "Don't over-tongue staccato", body: "Staccato = short + crisp, not short + thumped. Light tongue, quick release, move on. Heavy tongue produces 'thud' sound." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "'Saints' phrase · legato" },
      { id: "demo_staccato", label: "Same phrase · staccato" },
      { id: "demo_mixed", label: "Mixed articulation" },
    ],
  },
  trumpet_l3_04_standard_cert: {
    id: "trumpet_l3_04_standard_cert",
    title: "Standard Certificate · trumpet 2-min",
    objectives: [
      "Perform 'Taps' + 'Saints' back-to-back (1 min each)",
      "Contrast: 'Taps' solemn, 'Saints' bright",
      "Clean tone throughout",
    ],
    writtenContent:
      "## The cert\n\n2 minutes total. 'Taps' first (solemn, 40-45 seconds), then 'Saints' (bright, 60-75 seconds). Pause between.\n\n## Grading\n\n1. **Pitch**: in tune, no flat/sharp drift.\n2. **Rhythm**: steady tempo on both pieces.\n3. **Tone**: 'Taps' warm + steady; 'Saints' bright + projecting.\n4. **Contrast**: clear emotional difference between pieces.\n5. **Stamina**: no fatigue-related breakdown in the second piece.\n\n## The stamina test\n\n'Taps' = easy on lip (slow, held notes). 'Saints' = harder (faster, projecting). If you fatigue in Saints, it was 'Taps' that drained you — either through tension or over-support.\n\nPractice: play 'Taps' with *minimal* lip effort. Save energy. Then Saints has stamina available.\n\n## Don't skip warmup\n\n10 minutes before the cert: long tones + lip slurs + 'Taps' once + 'Saints' once. Then record. Warm lip = consistent tone + accurate pitch.",
    drills: {
      teach: [
        { id: "t_pacing", heading: "Pace the 2 minutes", body: "2 minutes feels short, but trumpet stamina is limited. Strategy: 'Taps' at easy dynamics (saves lip), 'Saints' with full projection (climax). Don't exhaust on 'Taps.'" },
        { id: "t_contrast_matters", heading: "Contrast is graded", body: "If 'Taps' and 'Saints' sound similar (both medium, both mechanical), you lose points. Grader listens for: Taps solemn, Saints joyous. Make the difference audible from 20 feet away." },
        { id: "t_pitfall", heading: "Don't crack notes in 'Taps'", body: "'Taps' is exposed — held notes, no cover. A cracked note in 'Taps' is very obvious. Extra breath support + relaxed embouchure = clean notes. Rehearse 'Taps' 10 times before recording." },
      ],
    },
    audioRefs: [
      { id: "demo_taps_cert", label: "Taps · cert-quality performance" },
      { id: "demo_saints_cert", label: "Saints · cert-quality performance" },
    ],
  },

  // ═══ TRUMPET · L4 ═══
  trumpet_l4_01_scale_two: {
    id: "trumpet_l4_01_scale_two",
    title: "Trumpet · F major scale · 2 octaves",
    objectives: [
      "Play F major scale, both lower + upper octaves",
      "Use the correct valve fingerings",
      "Maintain tone across octave transition",
    ],
    writtenContent:
      "## F major scale · 2 octaves\n\nFingerings:\n\n| Note | F | G | A | Bb | C | D | E | F |\n| Valves | 1 | 0 | 1+2 | 1 | 0 | 1+3 | 1+2 | 1 |\n\nLower octave: played with relaxed embouchure.\nUpper octave: same fingerings, firmer embouchure + faster air.\n\n## Octave transition\n\nNote 8 lower F → note 1 upper F. Same valves (first valve). Different embouchure + air support.\n\nThis is where lip strength matters. If upper F is weak or airy, your embouchure isn't strong enough yet. Drill lip slurs + long tones to build.\n\n## The challenge\n\nUpper register is where trumpet technique separates. Many students stall in the lower octave because upper requires discipline. Push through.\n\n## Practice\n\n1. Lower octave alone, 10 times at 60 bpm.\n2. Upper octave alone, 10 times at 60 bpm.\n3. Connected, 5 times at 50 bpm.\n4. Connected at 72 bpm, 5 times.",
    drills: {
      teach: [
        { id: "t_upper_air", heading: "Upper notes = more air, not tighter lip", body: "The instinct is to firm the lip for upper notes. Right to a point — but over-firming locks out air. Maintain moderate lip; increase air speed. Lip + air must scale together." },
        { id: "t_rest_build", heading: "Build stamina with rest cycles", body: "Upper register fatigues fast. Play 2 minutes, rest 1. Each cycle adds endurance. After a week, you can sustain longer without rest." },
        { id: "t_pitfall", heading: "Don't force high notes", body: "If upper F isn't coming out cleanly, don't brute-force. Back off, return to lower register, build again. Forcing produces bad habits that are hard to un-learn." },
      ],
    },
    audioRefs: [
      { id: "demo_lower", label: "F major · lower octave · 60 bpm" },
      { id: "demo_upper", label: "F major · upper octave · 60 bpm" },
      { id: "demo_full", label: "Full 2-octave · 72 bpm" },
    ],
  },
  trumpet_l4_02_ornament: {
    id: "trumpet_l4_02_ornament",
    title: "Fall · jazz descending slide",
    objectives: [
      "Execute a fall from high C to low G",
      "Control the fall speed (fast vs slow)",
      "Apply in a Dixieland phrase",
    ],
    writtenContent:
      "## The fall · trumpet's descending slide\n\nStart on a high note. Let pitch drop rapidly through a chromatic slide (mostly via lip relaxation). End on a lower note — or just drop off entirely into silence.\n\n## How\n\n1. Play high C clean + full.\n2. Quickly relax embouchure. Pitch drops. Simultaneously reduce air.\n3. Fingers can press valves randomly (3rd valve + 1st valve speeds the drop).\n4. End on low G (or just stop).\n\n## Speed\n\n- Slow fall (~1 sec): dramatic, emotive.\n- Fast fall (~200ms): punchy, jazzy.\n\n## Where to use\n\nAfter a long high note. At the end of a phrase. Dixieland loves falls for showmanship.\n\n## Common mistake\n\nStudents tongue the fall (tu-tu-tu as pitches descend). Don't. Fall is a slide, continuous pitch change, no articulation between.",
    drills: {
      teach: [
        { id: "t_relax_to_drop", heading: "Drop = relax", body: "The fall happens through embouchure relaxation. Fight the instinct to keep tension. Let everything go. Natural pitch drop follows." },
        { id: "t_air_reduce", heading: "Reduce air as pitch drops", body: "Dropping pitch with same air = loud splat. Simultaneously reduce air. The fall should be a tapering sound, not an explosion." },
        { id: "t_pitfall", heading: "Don't fall into nothing important", body: "Falls are flourishes. They mean: 'the end of an idea.' If you fall into nothing, you flag that there's nothing next. Save falls for legitimate phrase-ends." },
      ],
    },
    audioRefs: [
      { id: "demo_fall_slow", label: "Fall · slow · 1 sec" },
      { id: "demo_fall_fast", label: "Fall · fast · 200ms" },
      { id: "demo_saints_fall", label: "'Saints' ending with fall" },
    ],
  },
  trumpet_l4_03_rep_1: {
    id: "trumpet_l4_03_rep_1",
    title: "Haydn Trumpet Concerto · opening theme",
    objectives: [
      "Play the opening theme of Haydn's Trumpet Concerto",
      "Clean articulation + appropriate dynamics",
      "Maintain tone across 16 bars at 96 bpm",
    ],
    writtenContent:
      "## Haydn · the trumpet's star vehicle\n\nFranz Joseph Haydn's Trumpet Concerto (1796) is the most famous trumpet concerto ever written. Its opening theme is instantly recognizable + heard in movies, graduations, celebrations.\n\n## The theme\n\n16 bars. E flat major. Built on arpeggios + scalar passages. Medium-fast (96 bpm).\n\n## Technical demands\n\n1. Clean articulation on fast arpeggio notes.\n2. Accurate leaps (Eb to Bb = perfect 5th jump).\n3. Dynamic range from p to f across the phrase.\n4. Projecting tone throughout (Haydn wrote this for a large hall).\n\n## The style\n\nClassical trumpet — not Dixieland. Clean, polished, 'royal' feel. Not brash. Articulation crisp but refined. Think: string quartet member, not marching band leader.\n\n## Practice\n\nWeek 1: notes correct, 70 bpm.\nWeek 2: articulation + dynamics, 85 bpm.\nWeek 3: clean 96 bpm.\nWeek 4: record, self-critique.",
    drills: {
      teach: [
        { id: "t_classical_style", heading: "Classical ≠ Dixieland", body: "Haydn's trumpet should sound refined, not brash. Adjust your tone: slightly darker, slightly less edge, more uniform projection. Style awareness affects every note." },
        { id: "t_arpeggios", heading: "Arpeggios are lip slurs + valve sequences", body: "The opening arpeggio uses same-valve lip slurs. Practice the lip slurs isolated at 60 bpm first; then add the valves. Don't attack the full arpeggio cold." },
        { id: "t_pitfall", heading: "Don't play Haydn mechanically", body: "Haydn is expressive classical. Notes correct but robotic = failing. Add subtle phrasing — swells on peaks, relaxations on resolutions. Make it *music*." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_8", label: "Haydn opening · bars 1-8 · 96 bpm" },
      { id: "demo_full", label: "Full 16-bar theme · with phrasing" },
    ],
  },
  trumpet_l4_04_practice_rout: {
    id: "trumpet_l4_04_practice_rout",
    title: "Trumpet · 15-min practice with mandatory rest",
    objectives: [
      "Structure: warmup (3) + drills (5) + repertoire (5) + rest (2)",
      "Incorporate lip rest between blocks",
      "Record + review",
    ],
    writtenContent:
      "## The 15-min trumpet block · with rest\n\n**3 min · Warmup** — long tones + simple lip slurs. Loosen lip, wake up the muscles. Never skip.\n\n**5 min · Drills** — scales (Bb, C, F majors). Focus: clean valve changes + even tone.\n\n**2 min · REST** — put trumpet down. Stretch lips, drink water, relax. Non-negotiable.\n\n**5 min · Repertoire** — pick a piece (Taps, Saints, Haydn). Play 2-3 times.\n\n## Why the rest block\n\nTrumpet requires small-muscle stamina. Without rest, you reinforce tense, fatigued technique. 2 minutes off preserves the good habits + prevents injury.\n\n## Mouthpiece care\n\nAfter every session: empty water from the trumpet. Wipe mouthpiece. Store in case. Small habits, long instrument life.\n\n## Endurance tracking\n\nNote how long you can play at F4 without fatigue. Week 1 = 2 min. Week 4 = 5 min. Progress is measurable.",
    drills: {
      teach: [
        { id: "t_rest_is_sacred", heading: "Rest is part of practice", body: "Many students skip the rest block thinking it's 'lost time.' It isn't. Rested lip = better tone + longer session. Skipping rest = reinforcing tension = plateau." },
        { id: "t_warmup_always", heading: "Never skip warmup", body: "Cold trumpet-playing is the #1 cause of lip injury + bad habits. 3 minutes of long tones + simple lip slurs wake up the muscles. No exceptions." },
        { id: "t_pitfall", heading: "Don't push after fatigue", body: "If you feel lip tiredness mid-repertoire, stop. Rest. Don't push through. Pushed-through practice = reinforcing bad technique. Rested + repeated = reinforcing good technique." },
      ],
    },
    audioRefs: [
      { id: "warmup_ref", label: "3-min warmup · reference" },
      { id: "demo_routine", label: "Full 15-min practice · reference with rest" },
    ],
  },

  // ═══ CLARINET · L2 ═══
  clarinet_l2_01_scale: {
    id: "clarinet_l2_01_scale",
    title: "Clarinet · F major scale · entry register",
    objectives: [
      "Play F major scale (8 notes) with correct fingerings",
      "Use clean tongue attacks",
      "Maintain tone in the chalumeau (lower) register",
    ],
    writtenContent:
      "## Clarinet basics\n\nClarinet uses lip + breath + keys. Unlike saxophone, clarinet changes register (upper vs lower) via a thumb register key. Below: chalumeau register (dark, rich). Above: clarion (bright).\n\n## F major in chalumeau\n\n| Note | F | G | A | Bb | C | D | E | F |\n| Fingers | all + thumb | lift pinky | lift ring | lift middle | lift index | lift thumb | lift 1 upper | all lifted |\n\n(Exact fingerings vary by clarinet model; this is the standard.)\n\n## Tongue\n\nSame as saxophone — tongue touches reed briefly at each note start. Say 'tu' silently.\n\n## Common beginner issue\n\nReed doesn't vibrate = no sound. Check:\n1. Reed wet enough? (Should soak 1 min in water before playing.)\n2. Embouchure: lower lip tucked over bottom teeth; upper lip firm on mouthpiece.\n3. Air: steady, focused, flowing through the reed (not around it).",
    drills: {
      teach: [
        { id: "t_reed_soak", heading: "Reed must be wet", body: "Dry reeds don't vibrate. Soak reed 30-60 seconds in water before playing. Reed should bend slightly when wet; dry reed is stiff." },
        { id: "t_lip_tuck", heading: "Lower lip tucks over teeth", body: "Protect the reed from teeth. Bottom lip cushions the reed. Upper lip grips the mouthpiece. This is clarinet embouchure — different from sax." },
        { id: "t_pitfall", heading: "Don't bite the mouthpiece", body: "Biting = closed reed = no vibration. Gentle pressure + air. The reed needs to *flex*; biting locks it still." },
      ],
    },
    audioRefs: [
      { id: "demo_slow", label: "F major · 40 bpm with fingerings" },
      { id: "demo_target", label: "F major · 72 bpm tongued" },
    ],
  },
  clarinet_l2_02_two_note: {
    id: "clarinet_l2_02_two_note",
    title: "Long tones · F and G · breath + embouchure",
    objectives: [
      "Hold F for 8 beats with steady tone",
      "Transition to G, hold 8 beats",
      "Maintain consistent embouchure",
    ],
    writtenContent:
      "## Long tones · clarinet foundation\n\nSame principle as saxophone. Long tones build everything: embouchure, breath, pitch, tone.\n\n## The drill\n\nMetronome 60 bpm. Inhale 4 beats. Play F (chalumeau, all fingers + thumb) for 8 beats. Inhale 4 beats. Play G for 8 beats. Continue.\n\n## What to listen for\n\n- **Tone steadiness**: no wobble, no breathy fluctuation.\n- **Pitch stability**: use a tuner; cents deviation should be 0-5 throughout.\n- **Volume consistency**: note shouldn't grow/shrink mid-hold.\n\n## Breath\n\nDiaphragmatic. Belly expands on inhale, ribs minimal. Air flow through reed = steady pressure.\n\n## The note transition\n\nF → G: lift right pinky (or G-fingering-specific change). Embouchure stays *identical*. Only the finger moves.",
    drills: {
      teach: [
        { id: "t_stable_embouchure", heading: "Embouchure locks", body: "Find your embouchure; don't change it during note changes. If lip shifts when fingers move, tone breaks. Embouchure = one position; fingers do the rest." },
        { id: "t_pitch_center", heading: "Pitch center via lip + air", body: "Sharp? Slightly relax lip. Flat? Slightly firm lip + more air. Within a note, adjust tiny amounts. Between notes, your ear decides." },
        { id: "t_pitfall", heading: "Don't breathe shallow", body: "Shallow breathing = 4-beat holds max. Deep belly breathing = 8+ beats easy. Invest in the breath; the rest follows." },
      ],
    },
    audioRefs: [
      { id: "demo_f_long", label: "F chalumeau · 8-beat long tone" },
      { id: "demo_g_long", label: "G · 8-beat long tone" },
    ],
  },
  clarinet_l2_03_tempo: {
    id: "clarinet_l2_03_tempo",
    title: "Steady quarters at 80 bpm · articulated",
    objectives: [
      "Play F scale (F-G-A-Bb-C-D-E-F) as quarter notes at 80 bpm",
      "Tongue each note cleanly",
      "Maintain 32 bars of steady tempo",
    ],
    writtenContent:
      "## 80 bpm · quarter notes · clarinet\n\nSame principle as sax + trumpet. Articulation + tempo + tone = the three combined in one exercise.\n\n## The drill\n\nMetronome 80 bpm. F scale ascending and descending, 8 notes per scale, 4 scales up + 4 down = 32 bars total.\n\n## Clarinet tongue\n\nLight touch. Say 'tu' or 'du'. The tongue brushes the reed tip briefly — reed vibrates starts, tongue withdraws, note sounds.\n\n## Common drag\n\nClarinets can drag tempo. The long air column makes you want to linger. Lean slightly ahead of the click. Listen in the recording; you'll usually be slightly behind.\n\n## Tone check\n\nEvery note should have the same tonal quality. Bar 5 vs bar 25 = identical. Drift = inconsistency.",
    drills: {
      teach: [
        { id: "t_tongue_light", heading: "Tongue light, not hard", body: "Hard tongue on clarinet = honk. Soft tongue = clean articulation. Brush, don't thump." },
        { id: "t_anti_drag", heading: "Lean forward, not back", body: "Clarinet's warm tone invites lingering. Metronome + mental 'stay forward' = in-the-pocket. Otherwise you drift behind." },
        { id: "t_pitfall", heading: "Don't overblow", body: "Pushing air harder to be louder = choked reed. Focus air, don't force it. Tonal quality > volume for clarinet." },
      ],
    },
    audioRefs: [
      { id: "demo_scale_80", label: "F scale · 80 bpm · tongued" },
    ],
  },
  clarinet_l2_04_first_piece: {
    id: "clarinet_l2_04_first_piece",
    title: "'Mary Had a Little Lamb' · clarinet arrangement",
    objectives: [
      "Play 'Mary' in F major",
      "Use F, G, A, Bb notes",
      "Complete at 72 bpm",
    ],
    writtenContent:
      "## 'Mary' on clarinet\n\nSame melody, different key for clarinet ease. In F major: A G F G | A A A | G G G | A C C.\n\n## Fingerings (chalumeau)\n\n- A: lift right ring.\n- G: lift right pinky.\n- F: all down + thumb.\n- Bb: lift middle + register key.\n- C: lift index.\n\n## What's different from sax\n\nClarinet responds more to breath subtleties. Small changes in air = large changes in tone. Keep breath steady.\n\n## The style\n\nGentle, lyrical. Clarinet's natural voice is lyrical. Play Mary softly + sweetly. No need for sax's brightness or trumpet's projection.\n\n## Practice arc\n\nDay 1: notes correct, 50 bpm.\nDay 2: add tongue articulation.\nDay 3: add dynamics (mp → mf → mp).\nDay 4: 72 bpm, full piece.\nDay 5: record, self-critique.",
    drills: {
      teach: [
        { id: "t_lyrical", heading: "Clarinet is lyrical", body: "Unlike trumpet (bright) or sax (swinging), clarinet is lyrical. Think of it as singing. Melody should flow, not punch." },
        { id: "t_soft_tongue", heading: "Soft tongue for Mary", body: "This isn't a march. Light articulation, barely audible tongue attacks. Mary should sound sung, not spoken." },
        { id: "t_pitfall", heading: "Don't force volume", body: "Clarinet at loud volume becomes edgy. Keep volume moderate. Project through tone clarity, not loudness." },
      ],
    },
    audioRefs: [
      { id: "demo_mary", label: "Mary on clarinet · 72 bpm · lyrical" },
    ],
  },

  // ═══ CLARINET · L3 ═══
  clarinet_l3_01_first_song: {
    id: "clarinet_l3_01_first_song",
    title: "'Dance of the Sugar Plum Fairy' · simplified",
    objectives: [
      "Play 8-bar simplified version of Tchaikovsky's theme",
      "Use F major chalumeau + clarion register transition",
      "Maintain 90 bpm with staccato feel",
    ],
    writtenContent:
      "## Tchaikovsky · simplified\n\nThe 'Sugar Plum Fairy' theme (from The Nutcracker) is iconic. Simplified for clarinet L3, it introduces:\n- Register transitions (chalumeau to clarion via register key)\n- Staccato-style articulation\n- Light, delicate tone\n\n## The melody\n\nFirst 4 bars: C D C A | F A C -.\nBars 5-8: variation + resolution.\n\n## Register key\n\nAt bar 4's high C, press the register key (thumb). Fingering: F-major but with register key engaged. Same fingers, different octave.\n\nRegister transitions on clarinet are notoriously tricky — the pitch jumps a 12th (not an octave like sax). Practice L3 slowly.\n\n## Staccato feel\n\nDelicate, not aggressive. Light tongue. Notes ~40% of beat length.\n\n## The mood\n\nSprightly, magical, dance-like. Not heavy. Let notes dance off your tongue.",
    drills: {
      teach: [
        { id: "t_register_jump", heading: "Register key jumps a 12th", body: "Unlike sax octave key (jumps octave), clarinet register key jumps an octave + 5th = 12th interval. This is clarinet's famous 'break' — crossing from chalumeau to clarion." },
        { id: "t_delicate", heading: "Delicacy over force", body: "Sugar Plum Fairy is fragile. Force breaks the magic. Minimal air, tight focus, soft tongue. If you're loud, you're doing it wrong." },
        { id: "t_pitfall", heading: "Don't crack the break", body: "The register transition is notoriously crack-prone. Slow practice (50 bpm), deliberate breath support at the transition, firm but relaxed embouchure. Rehearse the crossing itself 20 times." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_4", label: "Sugar Plum bars 1-4 · slow" },
      { id: "demo_full", label: "Full 8-bar piece · 90 bpm" },
    ],
  },
  clarinet_l3_02_dynamics: {
    id: "clarinet_l3_02_dynamics",
    title: "Dynamic arc · pp to ff through a phrase",
    objectives: [
      "Hold F from pp to ff over 8 beats",
      "Maintain pitch stability across the arc",
      "Apply to 'Sugar Plum' phrase",
    ],
    writtenContent:
      "## Clarinet dynamics\n\nMore difficult than sax because clarinet's pitch is very breath-sensitive. Tiny air increase → pitch sharp. Need tight embouchure control during crescendos.\n\n## The arc\n\nF, 8 beats. Start pp (controlled, minimal). Grow to ff (full, projecting). Monitor pitch — typically sharps by 5-10 cents by ff.\n\n## Correction\n\nAs breath pressure rises: slightly relax embouchure to keep pitch stable. Or keep embouchure fixed but increase air speed rather than pressure.\n\n## Apply to 'Sugar Plum'\n\nBars 1-4: mp.\nBars 5-6: crescendo to f.\nBars 7-8: decrescendo to mp.\n\n## The musical goal\n\nClarinet is dynamic + expressive. A clarinet player who can't control dynamics sounds like MIDI. Dynamics are your voice.",
    drills: {
      teach: [
        { id: "t_relax_for_loud", heading: "Slightly relax for loud", body: "Counter-intuitive: to play louder, relax lip slightly while increasing air. Tight lip + extra air = choked tone + sharp pitch. Relax + support = full tone in tune." },
        { id: "t_pp_focus", heading: "pp needs focus", body: "Soft = less air, but very focused. Like blowing cold on a small spot. A lazy pp = airy + pitch drops. Focused pp = clear + stable." },
        { id: "t_pitfall", heading: "Don't crescendo via embouchure", body: "Trying to tighten lip as you crescendo = you'll go sharp. Use air support to crescendo; embouchure stays neutral." },
      ],
    },
    audioRefs: [
      { id: "demo_arc", label: "F · pp to ff · 8 beats" },
      { id: "demo_phrase", label: "Sugar Plum with dynamics" },
    ],
  },
  clarinet_l3_03_articulation: {
    id: "clarinet_l3_03_articulation",
    title: "Staccato + legato mix · classical style",
    objectives: [
      "Play phrase legato (slurred)",
      "Play same phrase staccato",
      "Mix both in one phrase with artistic choice",
    ],
    writtenContent:
      "## Classical clarinet articulation\n\nLegato is the default for lyrical passages. Staccato for lively, dance-like, or rhythmic moments. Mix for expressive phrasing.\n\n## Legato on clarinet\n\nTongue first note only. Subsequent notes slur — air continues, fingers change, no tongue. The effect: smooth flowing line.\n\n## Staccato on clarinet\n\nEach note tongued + short. ~30-40% of beat duration. Delicate attack (say 'tu' softly), short note body, clean end.\n\n## Mozart standard\n\nClassical music (Mozart, Haydn, Stamitz) mixes articulation constantly. Read the score — every slur mark, every staccato dot is a composer's instruction.\n\n## Drill\n\nTake 4 bars of Sugar Plum.\n1. All legato.\n2. All staccato.\n3. Mix: bars 1-2 legato (lyrical), bars 3-4 staccato (rhythmic).\n\nListen to the character difference.",
    drills: {
      teach: [
        { id: "t_slur_smoothness", heading: "Legato must be truly smooth", body: "Between notes in a slur, air must not interrupt. If you hear any tongue attack between notes, it's not legato. Practice slur segments until invisible." },
        { id: "t_staccato_short", heading: "Staccato is short, not abrupt", body: "Clarinet staccato stays sweet — short but not harsh. 'Tu' with quick release. Don't punch; dance." },
        { id: "t_pitfall", heading: "Don't over-articulate classical", body: "Mozart didn't intend rock-band attack. Classical staccato is refined. If you sound like a marching band, scale back the tongue force." },
      ],
    },
    audioRefs: [
      { id: "demo_legato", label: "Sugar Plum · all legato" },
      { id: "demo_staccato", label: "Sugar Plum · all staccato" },
      { id: "demo_mixed", label: "Sugar Plum · mixed" },
    ],
  },
  clarinet_l3_04_standard_cert: {
    id: "clarinet_l3_04_standard_cert",
    title: "Standard Certificate · clarinet 2-min",
    objectives: [
      "Perform 'Mary' + 'Sugar Plum' back-to-back",
      "Include register transition in Sugar Plum",
      "Clean tone + dynamic arc",
    ],
    writtenContent:
      "## The cert\n\n2 minutes. 'Mary' (1 min, simple) + 'Sugar Plum simplified' (1 min, with register transition).\n\n## Grading\n\n1. **Pitch**: within 10 cents.\n2. **Rhythm**: steady.\n3. **Register transition**: clean, no crack.\n4. **Dynamics**: visible arc in Sugar Plum.\n5. **Tone**: warm in chalumeau, brilliant in clarion.\n\n## The make-or-break\n\nRegister crossing in Sugar Plum. If it cracks in the recording, you fail the tone requirement. Practice the crossing 20+ times before the cert.\n\n## Reed freshness\n\nFresh reed = stable tone + reliable register transitions. Install fresh reed 24h before cert; let it wet overnight in a reed case.",
    drills: {
      teach: [
        { id: "t_register_practice", heading: "Drill the register crossing", body: "The single hardest moment in Sugar Plum. Practice crossing F to high C alone, 50 times. Then once in context. When the crossing is reflexive, the piece flows." },
        { id: "t_fresh_reed", heading: "Fresh reed for cert", body: "Install a new reed the day before. Old reed = unreliable. Fresh + soaked = peak performance." },
        { id: "t_pitfall", heading: "Don't rush Sugar Plum", body: "Sugar Plum at 90 bpm is quick. Don't push 100 bpm thinking it sounds better. 90 controlled > 100 sloppy." },
      ],
    },
    audioRefs: [
      { id: "demo_cert", label: "Full 2-min cert performance" },
    ],
  },

  // ═══ CLARINET · L4 ═══
  clarinet_l4_01_scale_two: {
    id: "clarinet_l4_01_scale_two",
    title: "C major scale · crossing the break (chalumeau to clarion)",
    objectives: [
      "Play C major scale across the break",
      "Clean register transition at A to B",
      "Maintain tone through the full scale",
    ],
    writtenContent:
      "## The break\n\nClarinet's infamous 'break' = the transition between chalumeau register and clarion. For C major scale: A (chalumeau) to B (clarion). The fingering change is major — you shift from open-fingered A to fingered + register-key B.\n\n## C major scale across the break\n\n| Note | C | D | E | F | G | A | B | C |\n| Register | chalumeau | chalumeau | chalumeau | chalumeau | chalumeau | chalumeau | clarion | clarion |\n\nFirst 6 notes: chalumeau. Last 2: clarion.\n\n## The transition\n\nA → B: dramatic fingering shift. Thumb register key engages. Multiple fingers move.\n\n## Common failures\n\n- Crack: fingers in wrong position, pitch breaks.\n- Delay: transition takes too long, creates a gap.\n- Wrong pitch: end up on the wrong register's note.\n\n## Solution\n\nDrill the A-to-B transition alone. 50 times. Same day, 20 times the next day. Until reflexive.",
    drills: {
      teach: [
        { id: "t_break_is_real", heading: "The break is a thing", body: "Every clarinetist struggles with the break. It's not a personal failing — it's clarinet physics. Acknowledge; drill; master. No shortcut." },
        { id: "t_register_key_timing", heading: "Register key timing is tight", body: "Thumb presses register key at same instant fingers change. Milliseconds off = crack. This is fine motor coordination — drill slowly, repeat until automatic." },
        { id: "t_pitfall", heading: "Don't skip the break", body: "Some students arrange pieces to avoid the break. Don't. Pieces across the break force the growth. Embrace; drill; conquer." },
      ],
    },
    audioRefs: [
      { id: "demo_transition", label: "A to B transition · isolated · 20 times" },
      { id: "demo_scale", label: "C major scale across break · 60 bpm" },
      { id: "demo_target", label: "C major · 72 bpm clean" },
    ],
  },
  clarinet_l4_02_ornament: {
    id: "clarinet_l4_02_ornament",
    title: "Grace notes · classical clarinet ornament",
    objectives: [
      "Play grace notes (fast brief notes before main notes)",
      "Apply in Mozart-style phrases",
      "Maintain rhythmic accuracy despite ornament",
    ],
    writtenContent:
      "## Grace notes · baroque + classical tradition\n\nGrace note = brief note before a main note. In notation: small note with slashed flag. In playing: ~50ms brief note + main note.\n\n## How\n\nBefore C, play B briefly (30-50ms). Then C. The B is the grace note. Should feel like a 'lift' into the main note.\n\n## Where\n\nOn emphasized beats. Before held notes. At phrase peaks. Not everywhere — overused grace notes sound nervous.\n\n## Apply\n\nIn a simplified Mozart phrase: add a grace note before each dotted note. This is authentic classical ornamentation.\n\n## The skill\n\nGrace note must be brief enough to not disturb rhythm. Played + resolved in less than 80ms. Requires finger agility.",
    drills: {
      teach: [
        { id: "t_grace_brief", heading: "Grace notes are lightning", body: "If you can hear the grace note as a distinct pitch, it's too long. Should feel like a shimmer before the main note, not a separate note in time." },
        { id: "t_sparse", heading: "Sparse placement", body: "3-4 grace notes per 8 bars is ideal. Over 5 and it sounds amateur — 'I just learned this technique and I'm showing off.' Classical taste prefers restraint." },
        { id: "t_pitfall", heading: "Don't grace every note", body: "Grace notes are emphasis. Used everywhere = no emphasis at all. Place them strategically — think of them as highlights, not decorations." },
      ],
    },
    audioRefs: [
      { id: "demo_grace_isolated", label: "Grace note + C · isolated" },
      { id: "demo_phrase", label: "Mozart-style phrase with graces" },
    ],
  },
  clarinet_l4_03_rep_1: {
    id: "clarinet_l4_03_rep_1",
    title: "Mozart Clarinet Concerto · theme (simplified)",
    objectives: [
      "Learn the opening 8 bars of Mozart's Clarinet Concerto",
      "Apply dynamics + grace notes + articulation mix",
      "Maintain tempo at 100 bpm",
    ],
    writtenContent:
      "## Mozart · K. 622\n\nThe most beloved clarinet piece ever written. Mozart's final concerto, composed 1791 (year of his death). Written specifically for clarinet — celebrates the instrument's lyrical range.\n\n## The opening\n\n8 bars. A major (simplified from original). Lyrical + flowing. Uses chalumeau + clarion registers.\n\n## Technique required\n\n- Register transitions (A ↔ B)\n- Graceful grace notes\n- Dynamic contour (p to mf to p across phrase)\n- Impeccable tone\n\n## The style\n\nMozart is *restrained*. Don't push volume. Don't over-ornament. Less is more. The notes are the music; flourishes ruin it.\n\n## Practice stages\n\nWeek 1: notes correct, 70 bpm.\nWeek 2: register transitions clean.\nWeek 3: add grace notes.\nWeek 4: full 8 bars, 100 bpm, with dynamics.\n\n## What makes Mozart hard\n\nEverything is exposed. Every flaw is audible. No place to hide. Perfect tone from note 1 is required.",
    drills: {
      teach: [
        { id: "t_mozart_restraint", heading: "Restraint is Mozart's gift", body: "Don't vibrato everything. Don't maximize dynamics. Don't ornament every note. Mozart is clean + clear + perfect. Let the notes breathe without your help." },
        { id: "t_exposed", heading: "Every note is exposed", body: "A cracked note in Mozart is a disaster. Practice relentlessly — 50+ reps per phrase. Confidence + reliability = Mozart-ready." },
        { id: "t_pitfall", heading: "Don't rush 100 bpm", body: "Mozart can feel 'fast' at 100 bpm. It's correct tempo — you're uncomfortable because the piece demands clean execution. Stay at 100; drill until clean." },
      ],
    },
    audioRefs: [
      { id: "demo_bars_1_4", label: "Mozart · bars 1-4 · 100 bpm" },
      { id: "demo_full", label: "Full 8-bar theme" },
    ],
  },
  clarinet_l4_04_practice_rout: {
    id: "clarinet_l4_04_practice_rout",
    title: "Clarinet · 15-min structured practice",
    objectives: [
      "Structure: long tones (3) + scales (5) + repertoire (7)",
      "Include register-break drill daily",
      "Record + review",
    ],
    writtenContent:
      "## The 15-min block\n\n**3 min · Long tones** — F, G, A, Bb, C. Each 8 beats at 60 bpm.\n\n**5 min · Scales + break drill** — F major (no break), then C major (with break). Focus on register-break crossing.\n\n**7 min · Repertoire** — Mary, Sugar Plum, or Mozart. Play 2-3 times, focused on one aspect each pass.\n\n## Register break daily\n\nPractice A-to-B transition alone, 20 reps, every day. Over 1 month = 600 reps = reflexive.\n\n## Reed rotation\n\nSame principle as sax. 2-3 reeds in rotation. Each gets rest days. Extends lifespan.\n\n## Fresh practice each day\n\nWeekly recording: Sunday play Sugar Plum; next Sunday same. Compare. Progress reveals.",
    drills: {
      teach: [
        { id: "t_daily_break", heading: "Daily break practice", body: "Even if you don't have Sugar Plum or Mozart in rotation, drill A-to-B daily. It's the single technique that unlocks upper range. Miss a day = regress." },
        { id: "t_long_tones_foundation", heading: "Long tones first", body: "Skipping long tones = tight embouchure + bad pitch. 3 minutes + no exceptions. Every session." },
        { id: "t_pitfall", heading: "Don't practice without reed", body: "Dry reed = no sound = wasted practice. Soak reed 60 sec before every session. Non-negotiable." },
      ],
    },
    audioRefs: [
      { id: "long_tones_ref", label: "3-min long tones · reference" },
      { id: "demo_routine", label: "Full 15-min practice · reference" },
    ],
  },
};
