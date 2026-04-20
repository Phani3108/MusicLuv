import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import type { Lesson } from "@catalogs/types";
import { PracticeStudio } from "../PracticeStudio";
import { currentLessonIdAtom } from "@/atoms/session";
import { practiceStatusAtom, lastGradeAtom } from "@/atoms/practice";
import { getLesson } from "@catalogs/lessonCatalog";

/**
 * PhaseAttempt — multi-take record + grade phase. The learner takes
 * multiple graded attempts per lesson (default 3 variations: warmup at
 * 50%, full-tempo graded, and either a perfect-run retry or a challenge
 * at 110% for L4+).
 *
 * The base PracticeStudio handles mic capture + real grading. This
 * wrapper adds the take-selector + progress bar so learners understand
 * they should do multiple takes before the phase completes. Engagement
 * fires after 2 graded takes (at least one full-tempo or challenge).
 */
export function PhaseAttempt({ onEngage }: { onEngage?: () => void }) {
  const lessonId = useAtomValue(currentLessonIdAtom);
  const lesson: Lesson | undefined = lessonId ? getLesson(lessonId) : undefined;
  const grade = useAtomValue(lastGradeAtom);
  const status = useAtomValue(practiceStatusAtom);
  const setStatus = useSetAtom(practiceStatusAtom);

  const takes = lesson?.drills?.attempt ?? [
    { id: "a_default", label: "Your attempt", description: "Record and submit.", tempoFactor: 1 },
  ];

  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [gradedAt, setGradedAt] = useState<Record<string, { composite: number; passed: boolean }>>({});

  // Reset on lesson change.
  useEffect(() => {
    setIndex(0);
    setDone(new Set());
    setGradedAt({});
  }, [lesson?.id]);

  // When a new grade lands, record it against the current take + advance
  // one step if there's another take to do.
  useEffect(() => {
    if (status === "graded" && grade) {
      const cur = takes[index];
      if (!cur) return;
      setDone((prev) => {
        const next = new Set(prev);
        next.add(cur.id);
        // Engagement: 2+ takes done AND at least one at tempoFactor >= 1.
        const anyFull = takes.some((t, i) => next.has(t.id) && (t.tempoFactor ?? 1) >= 1);
        if (next.size >= Math.min(2, takes.length) && anyFull) onEngage?.();
        return next;
      });
      setGradedAt((prev) => ({ ...prev, [cur.id]: { composite: grade.composite, passed: grade.passed } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, grade]);

  const startNextTake = () => {
    const nextIdx = Math.min(takes.length - 1, index + 1);
    setIndex(nextIdx);
    setStatus("idle");
  };

  const retryCurrent = () => {
    setStatus("idle");
  };

  const cur = takes[index];
  const completed = done.size;

  return (
    <div className="space-y-3 -mx-5 md:-mx-7 -my-6">
      {/* Take header */}
      <div className="panel p-3 bg-white/[0.02] mx-5 md:mx-7 mt-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              Take {index + 1} of {takes.length}
            </div>
            <div className="text-sm font-semibold">{cur.label}</div>
            {cur.description && (
              <div className="text-[11px] text-white/60 leading-relaxed mt-0.5">{cur.description}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">completed</div>
            <div className="font-mono text-xl font-semibold">
              {completed} / {takes.length}
            </div>
          </div>
        </div>

        {/* Take tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none mt-1">
          {takes.map((t, i) => {
            const passed = gradedAt[t.id]?.passed;
            const completedThis = done.has(t.id);
            const active = i === index;
            return (
              <button
                key={t.id}
                onClick={() => { setIndex(i); setStatus("idle"); }}
                disabled={status === "recording" || status === "scoring"}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] border transition-colors
                  ${active
                    ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                    : completedThis && passed
                      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
                      : completedThis
                        ? "bg-amber-500/10 border-amber-400/20 text-amber-200/80"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
              >
                {completedThis && (passed ? "✓ " : "· ")}
                {t.label}
                {gradedAt[t.id] && (
                  <span className="ml-1 font-mono text-[10px] opacity-70">
                    {Math.round(gradedAt[t.id].composite * 100)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Post-grade actions for the current take */}
        {status === "graded" && gradedAt[cur.id] && (
          <div className="flex gap-2 mt-3">
            {index < takes.length - 1 ? (
              <>
                <button onClick={retryCurrent} className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs border border-white/10">
                  Retry this take
                </button>
                <button onClick={startNextTake} className="flex-1 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-xs font-semibold">
                  Next take: {takes[index + 1].label} →
                </button>
              </>
            ) : (
              <button onClick={retryCurrent} className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs border border-white/10">
                Retry this take
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delegates to real mic capture + grading */}
      <PracticeStudio />
    </div>
  );
}
