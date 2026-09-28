import { useAtom, useAtomValue } from "jotai";
import { gradingModalAtom } from "@/atoms/panels";
import { lastGradeAtom, practiceStatusAtom, playheadMsAtom } from "@/atoms/practice";
import { useSetAtom } from "jotai";
import { GradeDimensionBars, GradeIssueList, SimulatedBanner } from "./GradeBreakdown";

export function GradingResultModal() {
  const [open, setOpen] = useAtom(gradingModalAtom);
  const grade = useAtomValue(lastGradeAtom);
  const setStatus = useSetAtom(practiceStatusAtom);
  const setPlayhead = useSetAtom(playheadMsAtom);

  if (!open || !grade) return null;

  const again = () => {
    setOpen(false);
    setStatus("idle");
    setPlayhead(0);
  };
  const next = () => {
    setOpen(false);
    setStatus("idle");
    setPlayhead(0);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="panel max-w-lg w-full overflow-hidden">
        <div className={`p-6 ${grade.passed ? "bg-gradient-to-br from-emerald-500/15 to-transparent" : "bg-gradient-to-br from-amber-500/10 to-transparent"}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Your performance</div>
              <div className="display text-4xl font-semibold">
                {grade.passed ? "Nicely done." : "Almost there."}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Composite</div>
              <div className="text-5xl font-mono font-bold" style={{
                color: grade.passed ? "#34d399" : "#fbbf24",
              }}>
                {Math.round(grade.composite * 100)}<span className="text-2xl text-white/40">%</span>
              </div>
            </div>
          </div>

          {grade.source === "engine" && (
            <div className="chip bg-amber-400/20 text-amber-100 border border-amber-400/30 mb-2">
              +{grade.xpAwarded} XP earned
            </div>
          )}
          <SimulatedBanner grade={grade} />
        </div>

        {/* Dimensions */}
        <div className="p-6 pt-4">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-3">Breakdown</div>
          <div className="mb-5">
            <GradeDimensionBars grade={grade} />
          </div>

          {/* Issues */}
          {(grade.issues.length > 0 || grade.warning) && (
            <div className="mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">What to fix</div>
              <GradeIssueList grade={grade} boxed />
            </div>
          )}

          {/* Mentor feedback */}
          <div className="panel p-4 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎩</span>
              <div className="flex-1 text-sm text-white/85 italic leading-relaxed">
                "{grade.feedback.mentor ?? grade.feedback.canned}"
                <div className="text-[11px] text-white/40 not-italic mt-2">— Maestro Adrienne</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-2">
          <button className="btn-ghost flex-1" onClick={again}>Try again</button>
          <button className="btn-primary flex-1" onClick={next}>{grade.passed ? "Next lesson →" : "Keep going"}</button>
        </div>
      </div>
    </div>
  );
}
