# MusicLuv — Product Vision & Value Architecture

> **Build the thing worth paying for. Monetization follows value.**
>
> This doc replaces the earlier monetization-forward roadmap. We plan the pedagogy, the two-way feedback loop, the virtual instrument, the written exams, and the mastery path **first**. Paywalls get designed later, once the product earns the right.

---

## 1. The core belief

A musician is made by a feedback loop that closes **every single day**: try → hear yourself → notice the gap → adjust → try again. The loop takes years in the real world because teachers are rare and self-critique is hard.

MusicLuv exists to **close that loop in 60 seconds, 1,000 times a week.** Every interaction is structured so the learner knows exactly what to do, hears exactly what they did, sees exactly where they missed, and gets a clear path to the next try. That's the value. Everything else is scaffolding around that loop.

Three consequences follow:

1. **Completeness beats breadth.** One instrument taught all the way from novice to mastery is more valuable than twenty instruments dabbled in. We ship each instrument's full 9-level arc before we add the next.
2. **Skill is the gate, not the wallet.** Artist paths, advanced ragas, genius-tier material — all of it is visible and samplable from day 1. You can't *attempt* an artist path until you've passed the prerequisite level. The gate is pedagogical, not financial.
3. **Motivation is frontloaded, depth is earned.** You should see where you're going (Ravi Shankar's alap, Hendrix's bends, Rahman's modulations) on day 1. The lessons are the staircase to get there.

---

## 2. The learning unit — what every lesson actually contains

Every lesson is a complete arc. **Nine mandatory phases, in order.** A learner can't complete a lesson until all nine have happened.

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │ 1. CONCEPT      What am I learning, and why does it matter?         │
 │ 2. TEACH        Written + visual + audio explanation                │
 │ 3. DEMO         Watch & listen to the target performance            │
 │ 4. DISSECT      Every control/technique shown in close-up with sound│
 │ 5. VIRTUAL TRY  Play on the on-screen instrument — no real needed   │
 │ 6. GUIDED PLAY  Slow-motion play-along with ghost-hand + ghost-note │
 │ 7. ATTEMPT      Full-speed performance on real instrument (or virt) │
 │ 8. FEEDBACK     Overlay your recording on target; per-note breakdown│
 │ 9. MASTERY      Pass both the practical and theory gate to advance  │
 └─────────────────────────────────────────────────────────────────────┘
```

**Why all nine.** If we skip (1) the learner doesn't know what they're doing. If we skip (4) they don't understand the instrument. If we skip (5) they can't progress without buying gear. If we skip (8) they never close the loop. If we skip (9) nothing sticks.

### What each phase looks like on screen

| Phase | Screen element | Shipped? |
|---|---|---|
| 1. Concept | Top-of-lesson card: 1-sentence goal + why it matters + what the next 5 min will teach | ✅ (lesson title + objectives exist; concept card is a new small addition) |
| 2. Teach | Markdown body with inline images + audio refs + interactive diagrams | ✅ (written content exists) |
| 3. Demo | Play-button on target audio synced to timeline + notation + piano-key highlights | ⚠️ Partial (audio references are placeholders) |
| 4. Dissect | Click-any-control overlay with close-up, description, audio sample, technique video | ⚠️ Partial (overlay exists, needs real samples) |
| 5. Virtual try | **Fully-playable on-screen instrument** — click/tap to sound real notes. Loop, record a sketch, hear it. | ❌ **New, critical.** |
| 6. Guided play | Metronome-synced playalong: target plays at 50% speed; ghost-hand shows next finger; student plays along | ⚠️ Partial (ghost-hand exists, slow playback + looped drill don't) |
| 7. Attempt | Full-speed take with mic (or MIDI) | ✅ (Phase 2 shipped) |
| 8. Feedback | **Overlay view:** waveform of student on top, target below, per-note diff spikes; scrub any point to hear both sides | ⚠️ Partial (grading modal shows dimensions + issues list; overlay + scrub not yet) |
| 9. Mastery | Practical pass threshold + short theory quiz (3-5 multiple-choice + 1 listening + 1 notation) | ❌ **New, critical.** |

---

## 3. The two-way feedback loop — specified in full

This is **the** value the user cited. Let me make it concrete enough to build.

### Direction A: System → Learner (what the app tells you)

Happens **before, during, and after** every attempt.

**Before** — set the learner up for success:
- **Slow demo mode:** the target plays at user-selectable speed (25% / 50% / 75% / 100%). At 25% you can hear every note decay.
- **Ghost-hand on the virtual instrument:** semi-transparent hand showing the next finger/key, synced to the timeline. Auto-fades at L3+ when reading is expected.
- **Click-to-hear:** every note in the timeline is clickable — tap it, hear just that note at the target pitch/duration/velocity. Scrub slowly through a phrase to internalize it.
- **Audio samples per control** — click the sustain pedal chip on a piano, hear a clip with and without pedal, see a text explanation, see a 15-second technique animation. Same for meend on sitar, bow-pressure on violin, chati-strike on tabla.
- **Virtual-instrument noodle:** user can click the on-screen instrument and play *any* notes (not just the lesson's notes). This lets them explore the instrument without committing. A "record sketch" button captures up to 30 seconds of noodling — replayable, savable as a composition seed.

**During** — guidance in real-time:
- **Pitch meter** (already shipped): shows live deviation in cents with color (green <15¢, amber 15-35¢, red >35¢).
- **Rhythm lane** (new): a horizontal line showing the click track; your onsets appear as dots. Dots drifting right = rushing.
- **Next-note highlight** on the instrument: the key/fret/pad you should hit next is softly glowing. This is how beginners read ahead without reading notation.
- **Finger hint** (new): which finger on which hand. For piano, a small digit over the key. For guitar, fret + string. For tabla, Dayan/Bayan + strike zone.
- **Dynamic pacing:** if the learner is clearly struggling mid-exercise (3+ red notes in a row), the system offers "slow down to 75%" via a non-blocking toast — never stops the take.

**After** — the critical feedback moment:
- **Overlay view:** your recording's waveform and pitch trace on top, target's on bottom. A diff ribbon between them shows where you diverged. Tap any point to scrub to that moment — both sides play back.
- **Per-note breakdown:** a list of every note, colored by pass/fail, with exact centsOff / msOff values. Click any note → jump to that moment in the overlay + explanation of the miss.
- **Dimension scores:** pitch / rhythm / tone / dynamics / consistency as bars with weighted contribution to composite. User learns which dimension is limiting them.
- **Corrective micro-drill** (new, critical): if pitch was <0.7, the system auto-generates a **5-note isolated drill** from your worst passage. If rhythm was <0.7, the drill becomes rhythm-only claps. If tone was poor, a "match the tone" imitation game. This closes the loop — the feedback turns directly into the next action.
- **Mentor commentary** (real Claude LLM in Phase 3): "Your third note was 32 cents flat — that's because you relaxed your finger before fully pressing. Try this three-note drill, focusing on keeping the weight in finger 3 until the next note starts."

### Direction B: Learner → System (what you tell the app)

- **Virtual tap** on the on-screen instrument (mouse or touch) — plays real audio + counts as an attempt for exercises that allow it (many L1-L2 lessons where the goal is note-recognition, not motor coordination)
- **Real instrument via mic** — Phase 2 pipeline already grades this
- **Real instrument via USB MIDI** (Phase 4) — perfect grading accuracy for keyboards, drum pads, MIDI controllers
- **Offline record + upload** (new, Phase 3) — record a take in the MusicLuv mobile app while offline (or on your phone voice memo, or uploaded from a desktop audio app), upload when back online, get graded async with full overlay feedback
- **Typed answer** — for theory quizzes and composition explanations
- **Composition submission** — the composition tool outputs MIDI + rendered audio, the learner writes a "what I was going for" note, the LLM mentor + peers review
- **Recital submission** — for L9, a 3-minute performance gets a deep review by a paid human reviewer

### What changes in the UI

The loop above requires **three new components** that don't exist yet:
1. **Virtual instrument layer** — clickable piano/fretboard/drum-pad/etc., with real sampled audio per note. Tone.js for the engine, sampled WAVs for the sounds.
2. **Overlay playback** — two waveforms + two pitch traces on the same scrubbable timeline, with click-anywhere playback from either side.
3. **Corrective micro-drill generator** — given a weak dimension + the failed exercise, synthesizes a shorter targeted exercise. Catalog-driven: every exercise declares which drills it can spawn.

---

## 4. The virtual instrument — specified per instrument

**Every instrument you can learn is also fully playable in-app, with real audio, before you own it.** This is how we solve "I'm curious about sitar but I don't own one" and "I want to try this lesson before pulling my piano out."

### Sound engine

- **Tone.js** as the synthesis/sampling engine. Web Audio API under the hood.
- **Per-instrument sample bank** — small (500KB-2MB) mono WAVs keyed by MIDI note. Sources (all CC / public-domain / licensed):
  - Piano: Salamander Grand Piano (CC-BY, already used by open projects; ~15MB full, ~3MB stripped)
  - Guitar: real acoustic guitar samples, nylon + steel (license-friendly alternatives: FreePats, Philharmonia)
  - Sitar: original recordings (we commission ~50 notes + 10 meend samples — $500 contractor cost)
  - Tabla: original recordings (7 bols × 3 velocities = 21 samples)
  - Violin: Philharmonia free samples
  - Flute / bansuri: Philharmonia + original bansuri
  - Drums: sampled full kit (kick, snare, hi-hat open/closed, 3 toms, crash, ride)
  - Vocals: n/a — the learner is the instrument
- Fall-back: Tone.js procedural synth patches. Cheaper, shippable on day 1, not as convincing.

### Piano virtual instrument (reference implementation)

- Full 88-key keyboard + compact 2-octave mode (mobile default)
- Click or touch any key → plays sampled note with velocity based on touch duration or mouse-down speed
- Sustain pedal on-screen toggle (or hold space bar)
- **Sandbox mode:** just noodle. Record 30s, replay, save as sketch
- **Target mode:** the currently-expected note glows; wrong key = red flash + dissonant ding; right key = green glow
- **Labels:** note names (C4) on every key, toggle on/off
- **Finger badges:** when a lesson specifies fingering, a small digit sits above the key
- **Alternate keyboards:** Indian users can flip to Sargam labels (Sa Re Ga Ma...) instead of C D E F G

### Guitar virtual instrument

- Fretboard: 6 strings × 12-15 frets
- Click a fret on a string → plays the resulting note
- **Chord shortcuts:** tap a chord chip (G, D, Em7, etc.) → all 6 strings strum together in order
- **Strum pattern grid:** 8 or 16 cells where you toggle up/down strokes — plays back as a pattern
- **Tuning knobs:** visual tuners at the headstock; click to retune alt tunings (DADGAD, drop D, etc.)

### Sitar virtual instrument

- Main string with 7 moveable frets + sympathetic strings (taraf) that resonate on their own
- Click a fret → pluck sound
- **Meend drag:** click-and-drag laterally on a fret to bend the pitch — we simulate the continuous pitch glide with Tone.js portamento
- **Mizrab stroke toggle:** Da (down) vs Ra (up) — changes attack brightness
- **Tanpura drone:** always-on Sa+Pa drone toggle, selectable scale (C, D, D#, etc.)

### Tabla virtual instrument

- Two drums rendered in large aerial view
- **Sweet spots** highlighted on each drum — click the center of Dayan for Na, the edge for Tin, etc.
- Every click = corresponding bol (Dha, Dhin, Na, Tin, Ta, Ti, Ge)
- **Theka looper:** set a taal (teentaal / rupak / jhaptal), press loop, listen to the full theka repeating; learner can mute / un-mute their own strikes

### Violin virtual instrument

- 4 strings + 4 visual positions per string
- Click a position → plays sampled note
- **Bow pressure slider:** changes sample velocity + timbre (bright → ponticello brittle)
- **Contact point slider:** sul tasto (airy) ↔ normale ↔ ponticello (glassy)

### Flute / bansuri / woodwind

- Finger chart view: 6 holes (bansuri) or key cluster (flute) — tap to cover/uncover
- Each combination maps to a note, sampled
- **Breath slider** (hold a key for "blow") — changes dynamics

### Drums virtual instrument

- Full kit top-down view: kick, snare, hi-hat, 3 toms, crash, ride
- Tap each for its sound
- **Pad velocity:** keyboard number 1-9 = velocity 1-9, or for touch: pressure + duration

### Vocals (not virtual — learner is the instrument)

- Instead, we give them:
- **Pitch pipe:** any starting note on demand
- **Drone tones:** tanpura C, D, D# for raga practice
- **Backing chords:** a loopable I-IV-V-I progression for simple melody practice

### Procedural dissection

For every control on every instrument, clicking the chip opens a **close-up cross-section** + a 20-second explainer (text + audio + animated diagram) + "hear it" sample. Our `instrumentCatalog.ts` already declares `controls[]` per instrument; dissection renders from that catalog entry.

---

## 5. The written-exam layer

Duolingo's genius isn't the streak — it's that **you have to demonstrate knowledge** to advance. We add the theory + listening + notation layer so "playing" alone can't fake mastery.

### Exam types

1. **Multiple choice (MCQ):** "Which interval is a major third?" · 4 options, 1 right.
2. **Listening (MCQ):** play a 3-second clip, ask "which scale?" / "which raga?" / "which chord quality?"
3. **Notation ID:** show a staff (Western) or sargam line (Indian), ask "name this note" / "name this phrase."
4. **Tap-the-rhythm:** a rhythm plays, learner taps along, timing graded (uses the same DTW engine).
5. **Short free-text:** "In 1-2 sentences, why does V7 resolve to I?" → AI-graded (Claude) with rubric.
6. **Practical spot-check:** "Play a G major scale right now." → flips into the practice engine.

### Exam placement in the progression

- **Mastery quiz at the end of every lesson** (2-3 questions, 30 seconds) — small, hard to skip, reinforces what you just learned
- **Level exam** at every level boundary (L1→L2, L2→L3, etc., 10-15 questions, ~5 min) — must pass 80% to advance
- **Grade exam** at tier boundaries (L3 → Standard Certificate, L6 → Pro Certificate, L9 → Genius Certificate) — 30-45 min, includes a recorded practical, reviewed by a human in addition to automated grading. These are **paid, proctored, certified** (Phase 7+).

### Exam catalog shape

```ts
// shared/catalogs/examCatalog.ts
Exam = {
  id, scope: "lesson" | "level" | "grade",
  instrumentId?, level?,
  questions: Array<
    | { type: "mcq", prompt, options[4], correctIndex, explanation }
    | { type: "listening", audioUrl, prompt, options[4], correctIndex }
    | { type: "notation", staffSvgOrSargam, prompt, correctAnswer }
    | { type: "tap_rhythm", onsets, tempoBpm }
    | { type: "free_text", prompt, rubric, expectedConcepts[] }
    | { type: "practical", exerciseId }
  >,
  passThreshold: 0.8,
  timeLimitMs?: 300000,
}
```

All plain TS, catalog-driven, same convention as every other catalog. Content editors add exams by editing one file.

---

## 6. The artist-inspired motivation layer

> "Learn like the genius" is what keeps an ambitious beginner showing up on day 90. We weave this into the journey from day 1, not as a paywall.

### What changes vs. the current Artists panel

Right now the panel is mostly a gallery. Let me make it the **aspiration engine** it needs to be.

**From day 1 (no skill prerequisite):**
- Full artist gallery visible with photo, era, origin, instruments, a short bio
- **Sample tracks** playable — a 30-60 second representative clip per artist, with a "why this matters" caption (e.g. "Notice how Ravi holds Sa for 20 seconds before moving. The patience is the technique.")
- **Style fingerprint** displayed: tempo range, scale/raga bias, signature ornaments, trademark moves
- **Signature lick gallery** — each artist has 10-30 bite-sized phrases, each labeled with difficulty (L2-L9) and a short "what makes it theirs" note

**When you hit the level prerequisite:**
- You can *attempt* the signature lick as a lesson — it drops right into the practice studio with the ghost-hand, slow-mo demo, and grading
- Passing the lick = **badge** tied to the artist (Pokemon-like collector motivation: "3/30 Hendrix licks mastered")
- Master all of an artist's signature licks → earn the **artist path completion** badge + unlock their **style exam** ("improvise 32 bars in Hendrix's vocabulary over a given backing track")

**What this unlocks pedagogically:**
- The aspirational artist becomes a **concrete skill tree** instead of an abstract goal
- Practice has stakes: each day brings you closer to *actually playing* a Hendrix bend, not just abstract "progress"
- The badges are authentic (you earned them by playing their actual music, not by watching a video about them)

### 10 founding artists (Phase 3-4)

Chosen for mix of instruments, cultures, eras, and accessibility:

| Artist | Instrument | Era | Why |
|---|---|---|---|
| Bill Evans | Piano | 1929-1980 | Jazz voicings accessible from L4 |
| Ryuichi Sakamoto | Piano | 1952-2023 | Minimalism + modern composition |
| Jimi Hendrix | Guitar | 1942-1970 | Blues + rock vocabulary from L3 |
| Andrés Segovia | Guitar | 1893-1987 | Classical guitar foundation |
| Pandit Ravi Shankar | Sitar | 1920-2012 | Hindustani raga alap + gat |
| Pandit Hariprasad Chaurasia | Bansuri/Flute | 1938- | Bansuri meend + raga vocabulary |
| Ustad Zakir Hussain | Tabla | 1951-2024 | Teentaal peshkar + tihai |
| A.R. Rahman | Piano + vocals | 1967- | Carnatic-fusion chord movement |
| M.S. Subbulakshmi | Vocals | 1916-2004 | Carnatic vocal technique |
| Bobby McFerrin | Vocals | 1950- | Pitch precision + vocal percussion |

Each artist = 20-30 signature licks + style fingerprint + 3 recommended lesson tie-ins + 5 sample tracks (all properly licensed or clearly excerpt/editorial use).

---

## 7. The audio sample system

Audio samples are the bedrock of the "hear-before-play" principle. Every lesson, every control, every artist, every note needs one.

### Sample inventory needed

| Category | Count | Source |
|---|---|---|
| Per-instrument note bank | ~50-88 notes × 8 instruments = ~500 | Salamander (piano), Philharmonia (strings, flute, some brass), original recording (sitar, tabla, bansuri) |
| Per-control demos (with / without) | ~3 per control × 8 controls × 8 instruments = ~200 | Original recording, educator or contractor |
| Per-lesson reference audio | ~60 lessons/instrument × 8 instruments = ~480 | Original recording, educator performs the target at tempo |
| Per-raga characteristic phrases | ~20 ragas × 5 phrases = ~100 | Contracted Hindustani/Carnatic musician recordings |
| Per-taal theka | ~10 taals × 3 tempos = ~30 | Contracted tabla player |
| Artist signature licks | ~10 artists × 20 licks = ~200 | Original re-performance by educator (avoids copyright — we're teaching vocabulary, not copying recordings) |
| Full artist sample tracks | ~10 × 5 = 50 | Licensed or clearly editorial/excerpt use |

**Total: ~1500 audio files.** At ~200KB average, ~300MB of content — trivial to CDN.

### Production plan

- **Piano / drums / vocals samples:** use existing CC/public-domain sources (Salamander, FreePats, sample swap communities)
- **Indian classical:** contract 2-3 Indian classical musicians (sitar player, tabla player, vocalist) for ~2 weeks each, ~$2-3k per contract. Get all notes, controls, raga phrases, taals, and the first 3 artist signature libraries
- **Educator-performed lesson reference audio:** the music educator on the team records all Western lesson references in-house as part of their content production role
- **Synthetic fallback:** for any sample we can't yet source, Tone.js FM synthesis generates a reasonable facsimile with a small "synthetic sample" watermark chip so the learner knows it's not final. Ships day 1; improves over time.

### Sample metadata

Every audio file has a catalog entry with:
- Source & license
- Musician credit (for attribution + potential later royalties)
- Key, tempo, instrument, articulation
- Alternative takes (slow, normal, fast)
- Clean loop points (for looping drills)

---

## 8. Offline record + upload workflow

**The learner should be able to practice anywhere** — on a plane, in a car, at a park bench with their sitar. They record; MusicLuv catches up when they're back online.

### Flow

1. Open lesson → tap "Offline attempt"
2. System downloads the target pattern + reference audio to device (one-time cache)
3. Learner plays their instrument, records a WAV locally (mobile audio encoder)
4. Take is saved to a local "pending uploads" queue with metadata (lessonId, exerciseId, attempt time)
5. When back online, queue drains: each upload hits `POST /grade` and the result slots into the learner's history just like a live take — with full overlay playback available
6. Notification: "Your offline take from Monday graded 78%. Tap to review."

### Implementation

- **Mobile:** Capacitor Filesystem + native audio recorder (iOS AVAudioRecorder, Android MediaRecorder) — full AAC/WAV capture even without network
- **Web:** MediaRecorder API writing to IndexedDB for persistence across session crashes
- **Backend:** the existing `POST /grade` works unchanged — the upload payload is identical. We just add a `recordedAt` timestamp to the metadata

### Side benefit — the "session history" feed

Every upload (live or offline) is stored with its take, target, and grade. Learners get a **listen-back timeline** of their own progress: today's C-scale vs. last week's vs. a month ago. Audible improvement is the best retention mechanic.

---

## 9. Per-instrument complete curriculum — piano reference spec

One flagship, fully specified. Every other instrument follows this template.

### Piano · all 9 levels · 60 lessons total

**L1 Foundations (7 lessons)** — can I make the right sound?
1. Hand shape & Middle C position ← shipped
2. Steady beat, quarters & halves ← shipped
3. First tune — Twinkle (right hand) ← shipped
4. Adding left hand — Twinkle bass
5. Two-hand coordination
6. Fingering economy (1-2-3-1-2-3-4-5 thumb under)
7. **L1 exam:** quiz + sight-read short phrase

**L2 Reading (7 lessons)** — can I read music?
1. Treble staff lines & spaces
2. Bass staff lines & spaces
3. Rests & ties
4. Sharps, flats, naturals
5. Key signatures (C, G, F)
6. Dynamics (p, mf, f, cresc., dim.)
7. **L2 exam + L2→L3 practical:** sight-read unseen 8-bar piece

**L3 First Repertoire (7 lessons)** — can I play a song?
1. Ode to Joy
2. Amazing Grace (arranged)
3. A Carnatic keertanam on piano (brings raga bhajan idea in)
4. A jazz standard theme (Autumn Leaves head, simplified)
5. Hanon #1 (finger independence)
6. Simple chord accompaniment (I-V)
7. **L3 exam + Standard Certificate practical:** perform one song end-to-end, pass theory quiz 80%+

**L4 Scales & Keys (7 lessons, Pro entry)** — can I play in any key?
1. C / G / F major scales two octaves
2. D / A / E majors
3. B♭ / E♭ majors
4. A / E / D minor scales
5. Arpeggios (I-IV-V)
6. Circle of fifths application
7. **L4 exam:** play any named scale on demand

**L5 Chords & Accompaniment (7 lessons)**
1. Triads (major, minor, dim, aug)
2. Inversions (root, 1st, 2nd)
3. I-V-vi-IV chord progression
4. Alberti bass
5. Chord-melody voicing
6. 7th chords (maj7, m7, dom7)
7. **L5 exam:** accompany a given melody with correct chords

**L6 Intermediate Repertoire (7 lessons)**
1. Clementi Sonatina Op.36 No.1 mvt. 1
2. A lighter Chopin piece (Prelude in E minor)
3. A Bill Evans voicing study
4. A raga Yaman piano adaptation (parallel Indian track)
5. Hanon 20-30 at 100 bpm
6. Sight-read grade-5 level piece
7. **L6 exam + Pro Certificate practical:** perform 2-min piece with expression, improvise 8 bars over I-V-vi-IV, theory 80%+

**L7 Advanced Technique (Genius entry, 6 lessons)**
1. Chopin Etude Op.10 No.1 (foundation for fluency)
2. Bach Inventions (two-voice independence)
3. Jazz chord voicings (Bill Evans rootless)
4. Raga Bhairav on piano — ornament simulation
5. Rubato grading + pedaling nuance
6. **L7 exam:** Chopin prelude with dynamic shaping ≥0.80 composite

**L8 Improvisation & Style (6 lessons)**
1. Blues 12-bar — melodic improv
2. Jazz ii-V-I vocabulary
3. Modal jazz improv (Bill Evans style path)
4. Carnatic fusion improvisation (A.R. Rahman style path)
5. Film-score modulation (Rahman / Sakamoto crossover)
6. **L8 exam:** 32-bar improv over unfamiliar changes, 3-min raga alap

**L9 Composition & Mastery (6 lessons)**
1. Melodic composition fundamentals
2. Harmonic progression design
3. Formal structure (ABA, sonata, bhajan form)
4. Orchestration lite (arranging for other instruments)
5. Final composition workshop (write original 2-min piece)
6. **L9 Genius Certificate:** submit original 2-min composition + perform 15-min recital, pass peer review + reviewer panel

### Time-to-completion estimates

- **L1-L3 (Standard Certificate):** ~3 months at 20 min/day
- **L4-L6 (Pro Certificate):** +6 months (~9 months total)
- **L7-L9 (Genius Certificate):** +9 months (~18 months total)

At full completion a learner has spent ~180 hours with MusicLuv. For comparison: ABRSM Grade 8 piano is typically 6-8 years of weekly lessons (~250-400 hours of lessons + practice). Our compression factor comes from feedback loop density (every practice minute is graded) + removing the scheduling friction (no 45-min-weekly-slot constraint).

### Template for other instruments

Every instrument's curriculum file exports the 9-level structure with the same pattern: **Foundations → Reading → First Repertoire → Scales/Ragas → Harmony/Ornaments → Repertoire → Technique → Improvisation/Style → Composition**. Drums skip the reading/scale slots (rudiments/grooves/polyrhythm instead); vocals replace technique with range/breath support. Same `curriculumTemplate.ts` shape.

**60 lessons × 20 instruments = 1,200 lessons** to fully specify. Current count: ~7 lessons shipped. We treat each instrument as a 6-8 week content sprint, shipped once fully complete (never half-done).

---

## 10. Quality bar — what "done" actually means

A feature or lesson is *not* done until:

### A lesson is done when
- [ ] All 9 phases of the learning unit are populated (concept → mastery)
- [ ] Reference audio exists at 100% and 50% speed
- [ ] All named controls/techniques have sample audio
- [ ] Virtual instrument mode exists and plays
- [ ] Ghost-hand/target highlighting is wired to the exercise's target pattern
- [ ] Grading passes the rubric round-trip with synthetic clean audio scoring ≥0.85
- [ ] Grading distinguishes deliberate failures (detuned / rushed / silent) correctly
- [ ] Overlay playback shows the student's take vs. target meaningfully
- [ ] Mastery quiz has 3-5 questions with explanations
- [ ] Corrective micro-drill spawning is wired for each dimension
- [ ] Works on web + iOS + Android
- [ ] Works offline for the attempt phase
- [ ] Takes an average learner ≤12 minutes to complete

### A level is done when
- All its lessons are done
- The level exam is written, reviewed by educator, calibrated against synthetic fakes
- The 4-6 artist signature licks at that level difficulty exist and pass grading end-to-end
- A paid beta learner completes the full level in ≤2 weeks of daily practice

### An instrument is done when
- All 9 levels done
- All 3 tier certificate exams calibrated
- Two real learners have completed L9 and earned the Genius Certificate through actual practice (dogfooding)

---

## 11. The value-first roadmap (replaces earlier phasing)

The re-sequenced plan: **prove depth with one instrument, then replicate.** Monetization is installed once the value is real.

### Phase 3 — Piano, done properly (10-12 weeks) · [IN FLIGHT next]

**The demo:** a fresh learner opens MusicLuv, sees no paywall, starts L1. Over 3 months of real practice (or a 45-minute beta walkthrough) they progress through L1-L3, earn Standard Certificate, and along the way:
- Play the on-screen piano freely (virtual instrument shipped)
- Watch slow-mo demos with ghost-hand (shipped)
- Record attempts via mic or upload offline takes
- See their recording overlaid on the target with scrub playback (new)
- Talk to the real Claude-backed mentor (ported from 3DWorld's `llm/`)
- Browse all 10 artists freely, hear samples, see signature licks (gated by skill not wallet)
- Attempt any artist lick they qualify for (L2+ unlocks Hendrix's easier bends, etc.)
- Pass every lesson's mastery quiz + the L1, L2, and L3 level exams
- Earn the Standard Certificate from the L3 grade exam (automated + mentor-reviewed in this phase)

**Engineering scope (weeks 1-6):**
- Virtual piano with Salamander samples (Tone.js + sampled loader)
- Overlay playback component (two waveforms + two pitch traces + scrubber)
- Corrective micro-drill generator (catalog-driven)
- Exam engine (MCQ / listening / notation / tap-rhythm / free-text)
- Offline record + upload queue (MediaRecorder + IndexedDB)
- Claude LLM mentor (port of 3DWorld's `llm/`)
- Real Node + Express + Socket.IO backend (minimal: grade proxy + attempts store + mentor chat)
- Supabase Postgres (replaces flat-file for multi-device sync; no auth yet)
- Sentry + PostHog

**Content scope (weeks 3-12, parallel with engineering):**
- All 60 piano lessons authored (educator)
- Reference audio recorded for every exercise at 100% + 50%
- Virtual-instrument sample banks loaded
- All 60 mastery quizzes + 3 level exams + 1 Standard-Certificate exam written
- 10 artist galleries assembled with 3 starter signature licks each (30 total for Phase 3)
- 10 artist sample tracks licensed/verified

### Phase 4 — Vocals, done properly (8-10 weeks)

Prove the pedagogy scales. Vocals is the best second instrument because:
- Zero hardware friction (everyone has a voice)
- Mic-only grading — CREPE works best here
- Different-but-complementary skill set
- Indian classical naturally lives in voice training (sargam, alap)

Content: all 60 vocals lessons + 10 more artist expansions (Bobby McFerrin, M.S. Subbulakshmi at minimum).

### Phase 5 — Indian classical (sitar + tabla), done properly (10-12 weeks)

The cultural differentiator. Now we bring:
- Sitar virtual instrument with meend drag
- Tabla virtual instrument with bol zones
- 60 sitar lessons + 60 tabla lessons (some overlap in raga/taal theory — reusable content)
- Raga catalog expanded to 20 ragas
- Taal catalog expanded to 10 taals
- Demucs + Basic Pitch prod install → song upload works
- Hindi UI translation
- Sargam mode for all instruments
- Ravi Shankar + Zakir Hussain full artist paths fleshed out

### Phase 6 — Mobile apps + MIDI (6-8 weeks)

Now that there are ~250 lessons worth of value, we ship the apps and real-instrument hardware integrations:
- Capacitor iOS + Android submissions
- USB MIDI for piano/drum-pad users (grading accuracy goes from 85% to 99%)
- Push notifications for practice reminders
- Apple Watch companion (metronome + streak)
- Bluetooth audio interface support

### Phase 7 — Monetization (4-6 weeks)

**Only now do we install paywalls.** By this point the product has:
- 3 instruments with full 9-level curricula (piano + vocals + one of sitar/tabla)
- 10 artists with real signature licks
- Virtual instruments, overlay playback, offline capture, theory exams, certifications — all working

The paywall design: Free = L1-L3 on any one instrument (full Standard tier, earn the Standard Certificate free). Pro = all instruments, L1-L6. Genius = L7-L9 + certified grade exams + reviewer-backed recital feedback. Full details in [platform-roadmap.md](platform-roadmap.md), but critically, **everything L1-L3 stays free**. We don't extract until we've delivered.

### Phase 8 — Community, creators, certification formalization (10-12 weeks)

- Public profiles, recital feeds, weekly challenges
- Creator portal for independent teachers (curriculum authoring + revenue share)
- Proctored remote grade exams (human reviewers, $29/$49/$99)
- Certificate generation (PDF + LinkedIn)

### Phase 9+ — The remaining 17 instruments (ongoing, 4-week content sprints each)

At steady state we add one fully-complete instrument every ~5 weeks. Guitar, bass, violin, flute, drums, bansuri, harmonium, mridangam, veena, cello, saxophone, ukulele, mandolin, accordion, synth, DJ controller, trumpet.

By month 24, the vision is live.

---

## 12. Monetization, as outcome of value

When monetization arrives in Phase 7, the model is:

- **Free: Standard tier complete** on the learner's chosen instrument. Every feature works. They can earn the Standard Certificate. They are a full, satisfied user of the free product.
- **Pro: breadth + depth.** All instruments. Levels 4-6. Song upload. All artist paths that fit L1-L6. Unlimited mentor chat. ~$9.99/mo or ~$79/yr.
- **Genius: mastery + recognition.** Levels 7-9. Composition tool. Human-reviewed recitals. Proctored grade exams and LinkedIn-shareable certificates. Style-fingerprint analysis. ~$19.99/mo or ~$159/yr.

The key word is **complete**. A free user gets a complete experience on one instrument through the Standard tier. They'll have invested 50-100 hours and earned a certificate before hitting a wall. That's when they're most likely to convert.

Unit economics + geographic pricing + marketplace revenue streams remain as in the earlier [platform-roadmap.md](platform-roadmap.md), but only as the way we fund the vision — not the thing we optimize.

---

## 13. What this plan asks of the team

| Role | Phase 3-4 (first 6 months) | Phase 5-6 (6-12 months) | Phase 7+ |
|---|---|---|---|
| Engineer 1 (full-stack) | Virtual instruments, overlay playback, exam engine, mentor LLM, backend | Mobile apps, MIDI, song upload pipeline | Community, marketplace, scale |
| Engineer 2 (ML + audio) | Grading pipeline hardening, offline sync, corrective drill generator | Basic Pitch + Demucs prod, stem separation UX, style fingerprint | Advanced ML: real-time coaching, AI-generated exercises |
| Music Educator | Piano + vocals content authoring + reference audio recording | Sitar + tabla content + Hindi localization coordination | Curriculum review for instruments 6-20 |
| Designer (part-time contractor) | Virtual-instrument visual polish, overlay UX, exam UX | Mobile responsive + Capacitor polish | Profiles, marketplace, certification UX |
| Indian classical contractor (Phase 5) | — | 2-3 weeks of sitar + tabla recording + raga phrase cataloging | — |

---

## 14. What I need from you before starting Phase 3

One simple decision: **is Phase 3 piano or vocals?**

- **Piano:** broadest appeal, most visual (the virtual keyboard is compelling), most sample banks freely available. Our Phase 2 pipeline is already tuned for it. Recommended.
- **Vocals:** zero hardware friction, highest conversion historically in music apps, easier pitch grading, cheaper to produce content for (no external musician contracts needed).

I'd recommend **piano** because we've already invested in the visual + Phase 2 grading + the user base is larger. But vocals is a defensible alternative if conversion-to-paid is the early KPI.

Everything else in this doc I'll take as direction and start executing against.
