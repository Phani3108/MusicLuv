import { useEffect, useRef, useState } from "react";
import type { Lesson } from "@catalogs/types";
import { DrillStepper } from "./DrillStepper";

/**
 * PhaseTeach — deep read phase. Walks the learner through multiple
 * teaching points (concept · technique · common mistakes). Each must be
 * acknowledged (scrolled to the bottom + "Got it" tap) before the next
 * unlocks. Phase engagement fires when every drill is cleared.
 *
 * Also keeps the legacy single-body `writtenContent` as the first
 * teaching point so existing lessons without `drills.teach` still work.
 */
export function PhaseTeach({ lesson, onEngage }: { lesson: Lesson; onEngage: () => void }) {
  const drills = lesson.drills?.teach ?? [];
  const steps = drills.length > 0
    ? drills
    : [{ id: "t_default", heading: "Read the lesson", body: lesson.writtenContent }];

  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset when lesson changes.
  useEffect(() => {
    setIndex(0);
    setDone(new Set());
    setScrolledToBottom(false);
  }, [lesson.id]);

  const cur = steps[index];

  // Check scroll for current drill.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    if (nearBottom) setScrolledToBottom(true);
  };

  useEffect(() => {
    // Reset scroll check when jumping between drills.
    setScrolledToBottom(false);
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
  }, [cur?.id]);

  const markRead = () => {
    const next = new Set(done);
    next.add(cur.id);
    setDone(next);
    if (next.size >= steps.length) {
      onEngage();
    } else if (index < steps.length - 1) {
      setIndex(index + 1);
    }
  };

  const jumpTo = (i: number) => { setIndex(i); };
  const canAdvanceInDrill = scrolledToBottom || done.has(cur.id);

  return (
    <DrillStepper
      index={index}
      total={steps.length}
      label={cur.heading}
      drillLabels={steps.map((s) => s.heading)}
      onPrev={() => setIndex(Math.max(0, index - 1))}
      onNext={() => setIndex(Math.min(steps.length - 1, index + 1))}
      onJump={jumpTo}
    >
      <div className="max-w-3xl mx-auto">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="prose prose-invert prose-sm max-w-none text-white/85 leading-relaxed
                     whitespace-pre-line max-h-[380px] overflow-y-auto p-5 panel bg-white/[0.02]
                     scrollbar-none"
        >
          {cur.body}
        </div>
        <div className="flex items-center justify-between mt-3 text-[11px]">
          <div className="text-white/40">
            {done.size} / {steps.length} read
          </div>
          <button
            disabled={!canAdvanceInDrill}
            onClick={markRead}
            className={`px-4 py-1.5 rounded-md font-semibold transition-colors
              ${canAdvanceInDrill
                ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                : "bg-white/5 text-white/30 cursor-not-allowed"}`}
          >
            {done.has(cur.id)
              ? index < steps.length - 1 ? "Next teach point →" : "✓ all read"
              : canAdvanceInDrill
                ? (index < steps.length - 1 ? "Got it · next →" : "Got it · finish")
                : "Scroll to continue"}
          </button>
        </div>
      </div>
    </DrillStepper>
  );
}
