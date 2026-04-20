/**
 * Expansion instruments L2-L9 content — programmatically generated.
 *
 * Each of the 14 instruments gets a compact but complete curriculum:
 *   - L2-L6 (Pro tier): 4 lessons per level = 20 lessons
 *   - L7-L9 (Genius tier): 3 lessons per level = 9 lessons
 *   Total per instrument: 29 lessons
 *
 * The generator function produces both lesson + matching exercise
 * entries. These spread into LESSONS + EXERCISES in their respective
 * catalog files.
 *
 * Real content sprints will deepen each entry with pedagogy-authored
 * writtenContent, reference audio, and artist-specific signature
 * phrases. This scaffolding ensures every instrument is navigable from
 * L1 kickoff through the Genius Certificate arc and that mastery
 * quizzes + tier exams can reference real lesson IDs.
 */

import type { Lesson, Exercise, Level, Tier } from "./types";

interface InstrumentPlan {
  id: string;
  name: string;
  rhythmic?: boolean;            // percussion-family
  origin: "western" | "indian_classical" | "global";
  baseNote: string;              // tonic octave anchor for generated note patterns
  /** Short L1 terminology to carry into L2+ (e.g. "pluck", "strike", "bow", "blow"). */
  action: string;
}

const PLANS: InstrumentPlan[] = [
  { id: "bass",       name: "Bass guitar", origin: "western",          baseNote: "E2", action: "pluck" },
  { id: "ukulele",    name: "Ukulele",     origin: "global",           baseNote: "C4", action: "strum" },
  { id: "mandolin",   name: "Mandolin",    origin: "western",          baseNote: "G3", action: "pick" },
  { id: "bansuri",    name: "Bansuri",     origin: "indian_classical", baseNote: "C5", action: "blow" },
  { id: "harmonium",  name: "Harmonium",   origin: "indian_classical", baseNote: "C4", action: "press" },
  { id: "mridangam",  name: "Mridangam",   origin: "indian_classical", baseNote: "C3", action: "strike", rhythmic: true },
  { id: "veena",      name: "Veena",       origin: "indian_classical", baseNote: "C4", action: "pluck" },
  { id: "cello",      name: "Cello",       origin: "western",          baseNote: "C2", action: "bow" },
  { id: "saxophone",  name: "Saxophone",   origin: "western",          baseNote: "A4", action: "blow" },
  { id: "trumpet",    name: "Trumpet",     origin: "western",          baseNote: "Bb4", action: "buzz" },
  { id: "clarinet",   name: "Clarinet",    origin: "western",          baseNote: "C4", action: "blow" },
  { id: "accordion",  name: "Accordion",   origin: "global",           baseNote: "C4", action: "press" },
  { id: "synth",      name: "Synthesizer", origin: "western",          baseNote: "C4", action: "patch" },
  { id: "dj_controller", name: "DJ controller", origin: "western",     baseNote: "C4", action: "beatmatch", rhythmic: true },
];

/** Per-level curriculum templates. Titles + objectives scale by difficulty. */
const LEVEL_TEMPLATES: Record<Level, Array<{ key: string; title: string; objective: string }>> = {
  1: [],  // L1 kickoffs already ship; generator skips this level
  2: [
    { key: "scale",       title: "Major scale in the home key",            objective: "Play the full major scale ascending + descending in the tonic key." },
    { key: "two_note",    title: "Two-note phrase control",                objective: "Alternate two adjacent pitches cleanly at 80 bpm." },
    { key: "tempo",       title: "Steady tempo at 80 bpm",                 objective: "Maintain a rock-solid 80 bpm pulse through a 16-bar exercise." },
    { key: "first_piece", title: "First short piece",                      objective: "Perform a simple 16-bar piece end-to-end with no stops." },
  ],
  3: [
    { key: "first_song",   title: "First recognizable song",                objective: "Play a popular simple tune that demonstrates L1-L2 fundamentals." },
    { key: "dynamics",     title: "Dynamic control: soft / medium / loud", objective: "Sustain one pitch through pp → mf → f → pp without drift." },
    { key: "articulation", title: "Articulation: staccato vs legato",      objective: "Execute both articulations cleanly on the same phrase." },
    { key: "standard_cert",title: "Standard Certificate piece",            objective: "Submit a 2-minute performance for the Standard tier cert exam." },
  ],
  4: [
    { key: "scale_two",   title: "Second scale or mode",                   objective: "Master a second key's scale + common arpeggio forms." },
    { key: "ornament",    title: "First ornament (trill / slide / bend)", objective: "Add one stylistic ornament cleanly without losing the line." },
    { key: "rep_1",       title: "Intermediate repertoire #1",             objective: "Learn a 24-bar intermediate piece with varied dynamics." },
    { key: "practice_rout",title: "Build a daily practice routine",        objective: "Demonstrate a 15-minute warm-up → technical → repertoire loop." },
  ],
  5: [
    { key: "harmony",    title: "Harmonic context: chords or drones",     objective: "Play the melody while the appropriate harmony plays underneath." },
    { key: "fast",       title: "Fast technical run",                     objective: "Execute a 16-beat fast passage cleanly at 120 bpm." },
    { key: "improv_1",   title: "First improvisation: 4-bar phrase",      objective: "Improvise a coherent 4-bar phrase over the lesson backing." },
    { key: "rep_2",      title: "Intermediate repertoire #2",             objective: "Learn a 32-bar piece with contrast between sections." },
  ],
  6: [
    { key: "adv_tech",  title: "Advanced technique block",                objective: "Master the instrument-specific Pro-tier technique (e.g. jhala, bends, crossovers)." },
    { key: "rep_3",     title: "Pro-tier repertoire piece",              objective: "Perform a piece canonically associated with intermediate Pro-tier players." },
    { key: "duet",      title: "Play in a duet / accompaniment context", objective: "Hold your part through a duet exercise." },
    { key: "pro_cert",  title: "Pro Certificate piece",                   objective: "Submit a 5-minute performance for the Pro tier cert exam." },
  ],
  7: [
    { key: "advanced_1",  title: "Genius-entry technique",                 objective: "Introduce a technique specific to advanced players (e.g. taan, sweep-picking, circular breathing)." },
    { key: "rep_4",       title: "Advanced repertoire #1",                 objective: "Learn a piece from the standard Genius repertoire." },
    { key: "improv_2",    title: "Extended improvisation: 16 bars",        objective: "Improvise a full 16-bar solo with phrase arc." },
  ],
  8: [
    { key: "style_study", title: "Artist style study",                     objective: "Transcribe + perform 30 sec from an artist's recording; play it back in their style." },
    { key: "rep_5",       title: "Concert-length piece",                   objective: "Learn + perform a 5-8 minute concert piece with dynamics." },
    { key: "accompany",   title: "Lead or accompany in a jam",             objective: "Demonstrate ability to trade solos or accompany a melody instrument." },
  ],
  9: [
    { key: "compose",      title: "Compose an original 32-bar piece",       objective: "Notate + perform an original composition that demonstrates style fluency." },
    { key: "masterclass",  title: "Teach a 10-minute masterclass",          objective: "Record yourself teaching a technique to a peer with demonstration + correction." },
    { key: "genius_cert",  title: "Genius Certificate recital",             objective: "Submit a full 15-20 minute solo recital for Genius tier evaluation." },
  ],
};

function semitonesFromNote(note: string): { pitch: string; octave: number } {
  const m = /^([A-G]#?b?)(\d)$/.exec(note);
  if (!m) return { pitch: "C", octave: 4 };
  return { pitch: m[1], octave: Number(m[2]) };
}

function tierFor(level: Level): Tier {
  if (level <= 3) return "standard";
  if (level <= 6) return "pro";
  return "genius";
}

function passCriteriaFor(level: Level): Lesson["passCriteria"] {
  if (level <= 3) return { minGradeOverall: 0.7 };
  if (level <= 6) return { minGradeOverall: 0.73, minPerDimension: { pitch: 0.75 } };
  return { minGradeOverall: 0.78, minPerDimension: { pitch: 0.82, tone: 0.78 } };
}

function writtenContentFor(plan: InstrumentPlan, level: Level, title: string, objective: string): string {
  const tier = tierFor(level);
  return `## ${title}\n\nLevel ${level} · ${tier} tier · ${plan.name}.\n\n${objective}\n\n## Practice pointer\n\nWork this in 10–15 minute focused blocks. Slow the tempo until every ${plan.action} is clean, then build up. The composite grade passes at ${tier === "standard" ? "0.70" : tier === "pro" ? "0.73" : "0.78"} — don't chase speed ahead of control.`;
}

function targetNotesFor(plan: InstrumentPlan, level: Level): { pitch: string; startMs: number; durationMs: number }[] {
  // Build a simple ascending run in the instrument's home key. Duration
  // scales by level — faster at higher levels.
  const base = plan.baseNote;
  const { pitch, octave } = semitonesFromNote(base);
  const majorOffsets = [0, 2, 4, 5, 7, 9, 11, 12];
  const SEMIS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const startIdx = SEMIS.indexOf(pitch);
  const durationMs = level <= 3 ? 500 : level <= 6 ? 375 : 250;
  return majorOffsets.map((off, i) => {
    const midi = startIdx + (octave + 1) * 12 + off;
    const noteName = SEMIS[midi % 12];
    const noteOct = Math.floor(midi / 12) - 1;
    return { pitch: `${noteName}${noteOct}`, startMs: i * durationMs, durationMs };
  });
}

function rubricIdFor(plan: InstrumentPlan): string {
  if (plan.rhythmic) return "rubric_rhythm_only";
  if (plan.origin === "indian_classical") return "rubric_raga_intermediate";
  return "rubric_early_level";
}

function tempoFor(level: Level): { bpm: number; meter: [number, number] } {
  const bpm = level <= 3 ? 80 : level <= 6 ? 100 : 130;
  return { bpm, meter: [4, 4] };
}

function exerciseTypeFor(plan: InstrumentPlan, level: Level, templateKey: string): Exercise["type"] {
  if (plan.rhythmic) return "rhythm_clap";
  if (templateKey === "compose") return "compose";
  if (templateKey.startsWith("improv")) return "improvise";
  if (templateKey.startsWith("rep") || templateKey === "first_song" || templateKey === "first_piece" || templateKey.endsWith("_cert") || templateKey === "duet") return "play_along";
  if (templateKey.includes("scale")) return "play_scale";
  return "play_note";
}

/** Generate the full expansion content set. */
export function buildExpansionContent(): { lessons: Record<string, Lesson>; exercises: Record<string, Exercise> } {
  const lessons: Record<string, Lesson> = {};
  const exercises: Record<string, Exercise> = {};

  for (const plan of PLANS) {
    let prevLessonId = `${plan.id}_l1_01_${plan.id === "dj_controller" ? "beatmatch" : "first"}`;

    for (let lvl = 2; lvl <= 9; lvl++) {
      const level = lvl as Level;
      const tier = tierFor(level);
      const entries = LEVEL_TEMPLATES[level];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const num = String(i + 1).padStart(2, "0");
        const lessonId = `${plan.id}_l${lvl}_${num}_${entry.key}`;
        const exerciseId = `${plan.id}_l${lvl}_${num}_${entry.key}_ex`;

        const rhythmicPattern = plan.rhythmic
          ? { onsets: Array.from({ length: level <= 3 ? 8 : level <= 6 ? 12 : 16 }, (_, j) => j * (60000 / tempoFor(level).bpm)) }
          : { notes: targetNotesFor(plan, level) };

        lessons[lessonId] = {
          id: lessonId,
          instrumentId: plan.id,
          level,
          tier,
          title: `${plan.name} L${lvl} · ${entry.title}`,
          objectives: [entry.objective, "Hold steady tempo throughout", "Record a clean take for grading"],
          writtenContent: writtenContentFor(plan, level, entry.title, entry.objective),
          audioRefs: [{ id: "demo", label: `${plan.name} L${lvl} reference` }],
          exercisePlanId: exerciseId,
          prerequisites: [prevLessonId],
          passCriteria: passCriteriaFor(level),
          estimatedMinutes: level <= 3 ? 12 : level <= 6 ? 18 : 25,
        };

        exercises[exerciseId] = {
          id: exerciseId,
          type: exerciseTypeFor(plan, level, entry.key),
          instrumentId: plan.id,
          title: `${entry.title} — ${plan.name}`,
          targetPattern: rhythmicPattern as Exercise["targetPattern"],
          tempo: tempoFor(level),
          gradingRubricId: rubricIdFor(plan),
        };

        prevLessonId = lessonId;
      }
    }
  }

  return { lessons, exercises };
}

/** Pre-built constants the catalog files spread into their main maps. */
export const EXPANSION_CONTENT = buildExpansionContent();
