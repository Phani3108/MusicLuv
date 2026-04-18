import { useEffect, useRef, useState } from "react";
import type { Lesson } from "@catalogs/types";

export function PhaseTeach({ lesson, onEngage }: { lesson: Lesson; onEngage: () => void }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    if (nearBottom && !scrolledToBottom) {
      setScrolledToBottom(true);
      onEngage();
    }
  };

  useEffect(() => {
    // Engage anyway after 15s so a short lesson isn't trapped
    const t = setTimeout(() => onEngage(), 15000);
    return () => clearTimeout(t);
  }, [lesson.id, onEngage]);

  return (
    <div className="max-w-3xl mx-auto">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="prose prose-invert prose-sm max-w-none text-white/85 leading-relaxed
                   whitespace-pre-line max-h-[420px] overflow-y-auto p-5 panel bg-white/[0.02]
                   scrollbar-none"
      >
        {lesson.writtenContent}
      </div>
      <div className="text-center text-[11px] text-white/40 mt-3">
        {scrolledToBottom ? "✓ read" : "Scroll to the bottom to continue"}
      </div>
    </div>
  );
}
