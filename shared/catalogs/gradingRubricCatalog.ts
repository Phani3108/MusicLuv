import type { Rubric } from "./types";

export const RUBRICS: Record<string, Rubric> = {
  rubric_early_level: {
    id: "rubric_early_level",
    weights: { pitch: 0.40, rhythm: 0.30, tone: 0.15, dynamics: 0.10, consistency: 0.05 },
    passThreshold: 0.75,
    pitchToleranceCents: 40,
    rhythmToleranceMs: 120,
    feedbackBank: {
      pitch: {
        minor: ["Close! A couple of notes drifted a little sharp. Listen to the reference and match the top of each note."],
        major: ["Several notes were off-pitch. Try playing one note at a time, matching the reference exactly before moving on."],
      },
      rhythm: {
        minor: ["Your timing's almost there — tighten up the third bar, you got a touch rushed."],
        major: ["Rhythm came apart in the middle. Slow the metronome to 60 bpm and rebuild from the first beat."],
      },
      tone: {
        minor: ["Tone is clean — a little thin in the top half. Keep your fingers relaxed on the release."],
        major: ["Tone was uneven. Check your hand pressure — too light makes notes whisper, too heavy makes them thud."],
      },
      dynamics: {
        minor: ["Nice dynamic range. Push the *forte* section a touch more for contrast."],
        major: ["Everything was at the same volume. Try exaggerating the soft/loud marks — you can always dial it back."],
      },
      consistency: {
        minor: ["Very consistent — one bar wavered a bit. Nothing to worry about."],
        major: ["Some notes landed perfectly, others drifted. Isolate the bars you nailed and match the feel of those everywhere else."],
      },
    },
  },
  rubric_rhythm_only: {
    id: "rubric_rhythm_only",
    weights: { pitch: 0.0, rhythm: 0.8, tone: 0.1, dynamics: 0.05, consistency: 0.05 },
    passThreshold: 0.75,
    pitchToleranceCents: 1000,
    rhythmToleranceMs: 80,
    feedbackBank: {
      pitch: { minor: [""], major: [""] },
      rhythm: {
        minor: ["Solid groove! A hair late on beats 3 and 7."],
        major: ["You're fighting the metronome. Tap your foot. Breathe. Start again."],
      },
      tone: { minor: ["Clean strokes."], major: ["Strikes are muddy — re-check hand position."] },
      dynamics: { minor: [""], major: [""] },
      consistency: { minor: [""], major: [""] },
    },
  },
  rubric_raga_intermediate: {
    id: "rubric_raga_intermediate",
    weights: { pitch: 0.45, rhythm: 0.15, tone: 0.20, dynamics: 0.10, consistency: 0.10 },
    passThreshold: 0.72,
    pitchToleranceCents: 25,
    rhythmToleranceMs: 250,
    feedbackBank: {
      pitch: {
        minor: ["Your Ga landed a touch flat. Let the meend complete — don't release early."],
        major: ["The raga grammar slipped. You touched a Ma komal — in Yaman that's out. Practice the aaroha slowly."],
      },
      rhythm: {
        minor: ["Alap should breathe — no need to rush. Your pacing's actually a little fast."],
        major: ["Phrase length collapsed. Hold each note until the breath asks for the next."],
      },
      tone: {
        minor: ["Tone is gorgeous in the lower octave — lighten mizrab pressure in the top for evenness."],
        major: ["Mizrab is clicking. Re-angle it so the wire meets the string, not the back of the nail."],
      },
      dynamics: {
        minor: ["Beautiful swell on Dha. Let Sa come back softer at the close."],
        major: ["Everything's at full volume. The alap wants dynamic shape — start quiet, build, relax."],
      },
      consistency: {
        minor: ["Mostly steady."],
        major: ["Meend was inconsistent — some bends went up 2 frets, some 3. Aim for the same landing pitch every time."],
      },
    },
  },
};

export const getRubric = (id: string) => RUBRICS[id];
