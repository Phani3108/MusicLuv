import type { Exercise } from "@catalogs/types";
import { getRubric } from "@catalogs/gradingRubricCatalog";
import { getMentor } from "@catalogs/mentorCatalog";
import type { GradeResult } from "@/atoms/practice";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * Simulated grade. Biases toward "almost passing" so the UX feels encouraging;
 * every 4th attempt biases toward a pass.
 */
export async function mockGrade(exercise: Exercise, opts?: { attemptNumber?: number }): Promise<GradeResult> {
  // Simulate server latency 1.2–2.2s
  await new Promise((r) => setTimeout(r, rand(1200, 2200)));

  const rubric = getRubric(exercise.gradingRubricId);
  const bias = (opts?.attemptNumber ?? 1) >= 2 ? 0.12 : 0;

  const dimensions = {
    pitch:       clamp01(rand(0.62, 0.92) + bias),
    rhythm:      clamp01(rand(0.60, 0.90) + bias),
    tone:        clamp01(rand(0.55, 0.88) + bias * 0.5),
    dynamics:    clamp01(rand(0.50, 0.85)),
    consistency: clamp01(rand(0.60, 0.95)),
  };

  const w = rubric.weights;
  const composite = clamp01(
    dimensions.pitch * w.pitch +
    dimensions.rhythm * w.rhythm +
    dimensions.tone * w.tone +
    dimensions.dynamics * w.dynamics +
    dimensions.consistency * w.consistency
  );

  const passed = composite >= rubric.passThreshold;

  const notes = exercise.targetPattern.notes ?? [];
  const issues: GradeResult["issues"] = [];
  if (dimensions.pitch < 0.85 && notes.length > 2) {
    const i = Math.floor(rand(0, notes.length - 1));
    const n = notes[i];
    issues.push({
      at: n.startMs, expected: n.pitch, detected: n.pitch,
      centsOff: Math.round(rand(-45, 45)),
      severity: dimensions.pitch < 0.7 ? "major" : "minor",
    });
  }
  if (dimensions.rhythm < 0.80 && notes.length > 2) {
    const i = Math.floor(rand(0, notes.length - 1));
    issues.push({
      at: notes[i].startMs, kind: "late", msOff: Math.round(rand(60, 180)),
      severity: dimensions.rhythm < 0.7 ? "major" : "minor",
    });
  }

  const worstDim = (Object.entries(dimensions) as Array<[keyof typeof dimensions, number]>)
    .sort((a, b) => a[1] - b[1])[0][0];
  const severity = dimensions[worstDim] < 0.7 ? "major" : "minor";
  const canned = rubric.feedbackBank[worstDim][severity][0] ?? "Nice work. Let's go again.";

  const mentor = getMentor("maestro_piano_western");
  const mentorLine = passed
    ? `${mentor.defaultLines[1]} Your ${worstDim} was the weakest — we'll tighten that next session.`
    : mentor.defaultLines[0];

  const xpAwarded = passed ? 12 : 3;

  return { composite, passed, dimensions, issues, feedback: { canned, mentor: mentorLine }, xpAwarded };
}

/** Simulated live pitch stream — ticks every 60ms with plausible values around a target note. */
export function startMockPitchStream(
  getTargetNote: () => string | null,
  onTick: (hz: number, note: string, centsOff: number) => void,
): () => void {
  const noteMap: Record<string, number> = {
    "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.0,
    "A4": 440.0, "B4": 493.88, "C5": 523.25,
  };
  const id = setInterval(() => {
    const target = getTargetNote();
    if (!target) return;
    const baseHz = noteMap[target] ?? 440;
    const driftCents = rand(-35, 35);
    const hz = baseHz * Math.pow(2, driftCents / 1200);
    onTick(hz, target, Math.round(driftCents));
  }, 60);
  return () => clearInterval(id);
}
