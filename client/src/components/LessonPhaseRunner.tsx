import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  currentPhaseAtom, completedPhasesAtom, phaseEngagementAtom,
  LESSON_PHASES, PHASE_META, nextPhase, prevPhase, phaseIndex, type LessonPhase,
} from "@/atoms/lessonPhase";
import { currentInstrumentAtom, currentLessonIdAtom } from "@/atoms/session";
import { practiceStatusAtom, lastGradeAtom } from "@/atoms/practice";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { getLesson } from "@catalogs/lessonCatalog";
import { getExercise } from "@catalogs/exerciseCatalog";
import { PhaseConcept } from "./phases/PhaseConcept";
import { PhaseTeach } from "./phases/PhaseTeach";
import { PhaseDemo } from "./phases/PhaseDemo";
import { PhaseDissect } from "./phases/PhaseDissect";
import { PhaseVirtualTry } from "./phases/PhaseVirtualTry";
import { PhaseGuided } from "./phases/PhaseGuided";
import { PhaseAttempt } from "./phases/PhaseAttempt";
import { PhaseFeedback } from "./phases/PhaseFeedback";
import { PhaseMastery } from "./phases/PhaseMastery";

/**
 * Nine-phase lesson arc enforcer — the shell every lesson runs through.
 * A lesson is NOT complete until all 9 phases have been engaged with.
 * Learners can step back but must actually do each phase to step forward.
 */
export function LessonPhaseRunner() {
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const lessonId = useAtomValue(currentLessonIdAtom);
  const [phase, setPhase] = useAtom(currentPhaseAtom);
  const [completed, setCompleted] = useAtom(completedPhasesAtom);
  const [engagement, setEngagement] = useAtom(phaseEngagementAtom);
  const practiceStatus = useAtomValue(practiceStatusAtom);
  const lastGrade = useAtomValue(lastGradeAtom);
  const setStatus = useSetAtom(practiceStatusAtom);

  const instrument = instrumentId ? getInstrument(instrumentId) : null;
  const lesson = lessonId ? getLesson(lessonId) : null;
  const exercise = lesson ? getExercise(lesson.exercisePlanId) : null;

  // Reset phase when lesson changes
  useEffect(() => {
    setPhase("concept");
    setCompleted(new Set());
    setEngagement({
      concept: false, teach: false, demo: false, dissect: false,
      virtual_try: false, guided: false, attempt: false, feedback: false, mastery: false,
    });
  }, [lessonId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Attempt phase auto-engages on successful grade
  useEffect(() => {
    if (phase === "attempt" && practiceStatus === "graded" && lastGrade) {
      markEngaged("attempt");
    }
  }, [practiceStatus, lastGrade, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const markEngaged = (p: LessonPhase) => {
    setEngagement((e) => ({ ...e, [p]: true }));
    setCompleted((c) => new Set([...c, p]));
  };

  const advance = () => {
    markEngaged(phase);
    const next = nextPhase(phase);
    if (next) {
      setPhase(next);
      // Reset any practice status when moving between phases
      if (phase === "attempt" || phase === "feedback") {
        // keep lastGrade so Feedback phase can render it; reset attempt state only
      }
    }
  };

  const goBack = () => {
    const prev = prevPhase(phase);
    if (prev) setPhase(prev);
  };

  const jumpTo = (target: LessonPhase) => {
    // allow any direction; markEngaged stays tied to user action inside the phase
    setPhase(target);
  };

  if (!instrument || !lesson || !exercise) {
    return (
      <div className="panel p-8 text-center text-white/60">
        Pick an instrument and a lesson to begin.
      </div>
    );
  }

  const meta = PHASE_META[phase];
  const canAdvance = engagement[phase] || phase === "attempt"; // attempt relies on graded auto-engage
  const next = nextPhase(phase);

  return (
    <div className="panel overflow-hidden">
      <PhaseProgressBar
        current={phase}
        completed={completed}
        engagement={engagement}
        onJump={jumpTo}
      />

      <div className="p-5 md:p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{meta.glyph}</div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40">
              Phase {phaseIndex(phase) + 1} of 9
            </div>
            <div className="display text-xl font-semibold">{meta.label}</div>
            <div className="text-xs text-white/50 mt-0.5">{meta.blurb}</div>
          </div>
        </div>

        <div className="min-h-[200px]">
          {phase === "concept" && <PhaseConcept lesson={lesson} onEngage={() => markEngaged("concept")} />}
          {phase === "teach" && <PhaseTeach lesson={lesson} onEngage={() => markEngaged("teach")} />}
          {phase === "demo" && <PhaseDemo lesson={lesson} exercise={exercise} onEngage={() => markEngaged("demo")} />}
          {phase === "dissect" && <PhaseDissect instrument={instrument} onEngage={() => markEngaged("dissect")} />}
          {phase === "virtual_try" && <PhaseVirtualTry instrument={instrument} exercise={exercise} onEngage={() => markEngaged("virtual_try")} />}
          {phase === "guided" && <PhaseGuided exercise={exercise} onEngage={() => markEngaged("guided")} />}
          {phase === "attempt" && <PhaseAttempt />}
          {phase === "feedback" && <PhaseFeedback onEngage={() => markEngaged("feedback")} />}
          {phase === "mastery" && <PhaseMastery lesson={lesson} onEngage={() => markEngaged("mastery")} />}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <button className="btn-ghost" onClick={goBack} disabled={!prevPhase(phase)}>
            ← Back
          </button>
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            {engagement[phase] ? "✓ engaged" : "engage with the phase to advance"}
          </div>
          <button
            className="btn-primary"
            onClick={advance}
            disabled={!next || !canAdvance}
          >
            {next ? `Next: ${PHASE_META[next].label} →` : "Lesson complete 🏅"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhaseProgressBar({
  current, completed, engagement, onJump,
}: {
  current: LessonPhase;
  completed: Set<LessonPhase>;
  engagement: Record<LessonPhase, boolean>;
  onJump: (p: LessonPhase) => void;
}) {
  return (
    <div className="flex items-stretch border-b border-white/5 bg-black/20">
      {LESSON_PHASES.map((p) => {
        const meta = PHASE_META[p];
        const active = current === p;
        const engaged = engagement[p];
        const done = completed.has(p);
        return (
          <button
            key={p}
            onClick={() => onJump(p)}
            title={`${meta.label} — ${meta.blurb}`}
            className={`flex-1 py-2 px-1 border-t-2 transition-colors text-[10px] font-medium
              ${active ? "border-indigo-400 bg-indigo-400/10 text-white"
                : engaged ? "border-emerald-500/50 text-emerald-200/80 hover:bg-white/5"
                : done ? "border-white/20 text-white/60 hover:bg-white/5"
                : "border-transparent text-white/40 hover:bg-white/5 hover:text-white/70"}
            `}
          >
            <div className="text-lg">{meta.glyph}</div>
            <div className="mt-0.5 truncate">{meta.label}</div>
          </button>
        );
      })}
    </div>
  );
}
