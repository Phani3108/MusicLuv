import type { ReactNode } from "react";

/**
 * Shared header for phase components that step through multiple drills.
 * Renders "Drill N of M" + back/forward buttons + the list of drill
 * labels so the learner always sees the full set they need to cover.
 */
export function DrillStepper({
  index,
  total,
  label,
  onPrev,
  onNext,
  children,
  onJump,
  drillLabels,
}: {
  index: number;
  total: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  children: ReactNode;
  onJump?: (i: number) => void;
  drillLabels?: string[];
}) {
  return (
    <div className="space-y-3">
      <div className="panel p-3 bg-white/[0.02] flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-lg"
          aria-label="Previous drill"
        >←</button>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Drill {index + 1} of {total}
          </div>
          <div className="text-sm font-semibold truncate">{label}</div>
        </div>
        <button
          onClick={onNext}
          disabled={index >= total - 1}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-lg"
          aria-label="Next drill"
        >→</button>
      </div>

      {drillLabels && drillLabels.length > 1 && (
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
          {drillLabels.map((l, i) => (
            <button
              key={i}
              onClick={() => onJump?.(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] border transition-colors ${
                i === index
                  ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {i + 1}. {l}
            </button>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
