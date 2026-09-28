import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { lastGradeAtom } from "@/atoms/practice";
import { OverlayPlayback } from "../OverlayPlayback";
import { CorrectiveDrillCard } from "../CorrectiveDrillCard";
import { GradeDimensionBars, GradeIssueList, SimulatedBanner } from "../GradeBreakdown";

/**
 * Feedback phase — OverlayPlayback (target vs student side-by-side) +
 * per-dimension scores + mentor commentary.
 */
export function PhaseFeedback({ onEngage }: { onEngage: () => void }) {
  const grade = useAtomValue(lastGradeAtom);

  useEffect(() => {
    if (grade) {
      const t = setTimeout(() => onEngage(), 5000);
      return () => clearTimeout(t);
    }
  }, [grade, onEngage]);

  if (!grade) {
    return (
      <div className="text-center text-white/50 py-12">
        No attempt yet. Go back to the Attempt phase and record a take.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <SimulatedBanner grade={grade} />
      <OverlayPlayback />

      <CorrectiveDrillCard />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="panel p-5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-white/40">Composite</div>
              <div className="display text-3xl font-semibold" style={{ color: grade.passed ? "#34d399" : "#fbbf24" }}>
                {Math.round(grade.composite * 100)}%
              </div>
            </div>
            <div className={`chip ${grade.passed
              ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
              : "bg-amber-500/15 text-amber-200 border border-amber-400/30"}`}>
              {grade.passed ? "passed" : "keep going"}
            </div>
          </div>

          <GradeDimensionBars grade={grade} />
        </div>

        <div className="panel p-4 bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎩</span>
            <div className="text-sm text-white/85 italic leading-relaxed">
              "{grade.feedback.mentor ?? grade.feedback.canned}"
            </div>
          </div>
          {(grade.issues.length > 0 || grade.warning) && (
            <div className="mt-4">
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">What to fix</div>
              <GradeIssueList grade={grade} limit={4} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
