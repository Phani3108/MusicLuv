import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { lastGradeAtom } from "@/atoms/practice";

const DIM_LABELS: Record<string, string> = {
  pitch: "Pitch", rhythm: "Rhythm", tone: "Tone", dynamics: "Dynamics", consistency: "Consistency",
};

/**
 * Placeholder feedback phase — shows last grade dimensions. Will be replaced by
 * OverlayPlayback (two-waveform scrubber + per-note diffs) in the next wedge.
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
    <div className="max-w-2xl mx-auto">
      <div className="panel p-5 bg-white/[0.02] mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40">Your score</div>
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

        <div className="space-y-2.5">
          {Object.entries(grade.dimensions).map(([dim, v]) => (
            <div key={dim}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">{DIM_LABELS[dim]}</span>
                <span className="font-mono text-white/50">{Math.round(v * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${v * 100}%`,
                    background: v >= 0.85 ? "#34d399" : v >= 0.7 ? "#fbbf24" : "#fb7185",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-4 bg-white/[0.02]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎩</span>
          <div className="text-sm text-white/85 italic leading-relaxed">
            "{grade.feedback.mentor ?? grade.feedback.canned}"
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-white/40 mt-4">
        Overlay playback + per-note scrub → next build wedge
      </div>
    </div>
  );
}
