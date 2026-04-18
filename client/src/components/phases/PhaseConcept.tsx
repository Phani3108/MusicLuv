import { useEffect } from "react";
import type { Lesson } from "@catalogs/types";

export function PhaseConcept({ lesson, onEngage }: { lesson: Lesson; onEngage: () => void }) {
  // Auto-engage after 4s of viewing the concept card (minimum attention)
  useEffect(() => {
    const t = setTimeout(() => onEngage(), 4000);
    return () => clearTimeout(t);
  }, [lesson.id, onEngage]);

  return (
    <div className="max-w-2xl mx-auto text-center py-6">
      <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
        Level {lesson.level} · {lesson.tier}
      </div>
      <h2 className="display text-3xl md:text-4xl font-semibold mb-4 leading-tight">
        {lesson.title}
      </h2>
      <div className="text-white/70 text-base leading-relaxed mb-6 max-w-lg mx-auto">
        In about {lesson.estimatedMinutes} minutes you'll learn:
      </div>
      <ul className="space-y-2 max-w-md mx-auto text-left">
        {lesson.objectives.map((o, i) => (
          <li key={i} className="flex gap-2 items-start text-sm text-white/85">
            <span className="text-emerald-400 mt-0.5">◆</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-[11px] uppercase tracking-widest text-white/30">
        Take a breath. We'll go step by step.
      </div>
    </div>
  );
}
