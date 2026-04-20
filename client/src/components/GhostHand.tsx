import { useEffect, useState } from "react";

/**
 * Ghost hand — overlays a semi-transparent pointing hand over the piano
 * key the learner should press next. Unlike the original chip-above-the-
 * keyboard label, this positions a hand glyph directly above the correct
 * key by looking up its bounding rect via data-piano-note.
 *
 * Works against any instrument hero that tags its press targets with
 * `data-piano-note="NoteName"`. Currently PianoHero uses this; other
 * virtual instruments can adopt the same attribute to get the ghost-
 * hand overlay for free.
 *
 * Tracks the target via ResizeObserver + window resize so layout shifts
 * (mobile rotate, panel open, sidebar reflow) don't leave the hand
 * dangling.
 */
export function GhostHand({
  targetNote,
  targetFinger,
  visible,
}: {
  /** Exact note (e.g. "C4", "F#4") to point at. Must match a data-piano-note. */
  targetNote?: string | null;
  /** Optional fingering number to display in the badge (1=thumb, 5=pinky). */
  targetFinger?: number;
  visible: boolean;
}) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!visible || !targetNote) {
      setRect(null);
      return;
    }

    const measure = () => {
      const el = document.querySelector(
        `[data-piano-note="${cssEscape(targetNote)}"]`,
      ) as HTMLElement | null;
      if (!el) {
        setRect(null);
        return;
      }
      setRect(el.getBoundingClientRect());
    };

    measure();

    // Track layout changes.
    const ro = new ResizeObserver(measure);
    const root = document.querySelector("[data-piano-root]");
    if (root) ro.observe(root);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    const interval = window.setInterval(measure, 400); // catch dynamic shifts

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      window.clearInterval(interval);
    };
  }, [targetNote, visible]);

  if (!visible || !targetNote || !rect) return null;

  // Position hand just above the key, centered horizontally.
  const cx = rect.left + rect.width / 2;
  const top = rect.top - 42;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-all duration-200 ease-out"
      style={{ left: cx - 28, top, width: 56 }}
    >
      <div className="relative flex flex-col items-center">
        <div className="text-[34px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] -mb-1">👇</div>
        <div className="panel px-2 py-0.5 text-[10px] font-mono text-white/85 flex items-center gap-1.5 bg-black/80 border border-amber-400/40">
          <span className="text-amber-300">{targetNote}</span>
          {targetFinger && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/70">finger {targetFinger}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Guard against note names with special CSS characters (e.g., C#4 → C\#4). */
function cssEscape(s: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(s);
  }
  return s.replace(/([#])/g, "\\$1");
}
