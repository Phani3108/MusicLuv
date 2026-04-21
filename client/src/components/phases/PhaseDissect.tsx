import { useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import type { Instrument, Lesson, TargetNote } from "@catalogs/types";
import { dissectionAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { playNote, unlockAudio, ensureReady } from "@/audio/instrumentSampler";
import { ExpertNotesInline } from "../ExpertNotesInline";

/**
 * PhaseDissect — multiple dissection points the learner must explore
 * before moving on. A point is either:
 *   - An instrument control (mirrors the dissection overlay)
 *   - A musical key moment in the passage (opening, peak, transition)
 * Each entry can loop its own mini-phrase audio so the learner hears
 * the phrase in isolation.
 *
 * Engagement fires after at least 3 points have been viewed (or all,
 * whichever is smaller).
 */
export function PhaseDissect({ instrument, lesson, onEngage }: { instrument: Instrument; lesson?: Lesson; onEngage: () => void }) {
  const setOverlay = useSetAtom(dissectionAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom) ?? instrument.id;
  const drillPoints = lesson?.drills?.dissect ?? [];

  // Build fallback: one entry per instrument control so old lessons
  // without hand-authored drills still have something useful.
  const points = drillPoints.length > 0
    ? drillPoints
    : instrument.controls.map((c) => ({
        id: `ctrl_${c.id}`,
        label: c.name,
        description: c.description,
        controlRefId: c.id,
        notes: undefined as any,
      }));

  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [loopingId, setLoopingId] = useState<string | null>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeouts.current.forEach(clearTimeout); }, []);
  useEffect(() => {
    setViewed(new Set());
    setIndex(0);
    setLoopingId(null);
  }, [lesson?.id]);

  const requiredToEngage = Math.min(3, points.length);

  const openPoint = (i: number) => {
    const pt = points[i];
    setIndex(i);
    const next = new Set(viewed);
    next.add(pt.id);
    setViewed(next);
    if (next.size >= requiredToEngage) onEngage();

    // If the point references an instrument control, open the overlay.
    if (pt.controlRefId) {
      setOverlay(pt.controlRefId);
    }
  };

  const playSnippet = async (pt: (typeof points)[number]) => {
    if (!pt.notes || pt.notes.length === 0) return;
    await unlockAudio();
    await ensureReady(instrumentId);
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setLoopingId(pt.id);
    for (const n of pt.notes) {
      timeouts.current.push(setTimeout(() => {
        void playNote(instrumentId, n.pitch, (n.durationMs / 1000));
      }, n.startMs));
    }
    const total = Math.max(...pt.notes.map((n: TargetNote) => n.startMs + n.durationMs), 500);
    timeouts.current.push(setTimeout(() => setLoopingId(null), total + 120));
    // Mark as viewed.
    const next = new Set(viewed);
    next.add(pt.id);
    setViewed(next);
    if (next.size >= requiredToEngage) onEngage();
  };

  const cur = points[index];

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="text-sm text-white/70 text-center">
        Break the lesson apart. Explore at least {requiredToEngage} dissection points — instrument controls and musical key moments.
      </div>

      {/* Active drill card */}
      <div className="panel p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Point {index + 1} of {points.length}</div>
            <div className="font-semibold text-sm">{cur.label}</div>
          </div>
          {viewed.has(cur.id) && <span className="text-emerald-400 text-xs">✓ seen</span>}
        </div>
        <div className="text-xs text-white/70 leading-relaxed mb-3">{cur.description}</div>
        <div className="flex gap-2">
          {cur.controlRefId && (
            <button
              onClick={() => openPoint(index)}
              className="flex-1 py-1.5 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/40 text-xs font-semibold"
            >
              Open control close-up →
            </button>
          )}
          {cur.notes && cur.notes.length > 0 && (
            <button
              disabled={loopingId === cur.id}
              onClick={() => playSnippet(cur)}
              className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs disabled:opacity-50"
            >
              {loopingId === cur.id ? "Playing…" : "▶ Play this moment"}
            </button>
          )}
          {!cur.controlRefId && (!cur.notes || cur.notes.length === 0) && (
            <button
              onClick={() => openPoint(index)}
              className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs"
            >
              Mark as understood
            </button>
          )}
        </div>
      </div>

      {/* Grid of all points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {points.map((p, i) => {
          const seen = viewed.has(p.id);
          const active = i === index;
          return (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`panel p-3 text-left transition-all text-xs
                ${active
                  ? "bg-indigo-500/10 border-indigo-400/30"
                  : seen
                    ? "bg-emerald-500/5 border-emerald-400/20"
                    : "hover:bg-white/5"}`}
            >
              <div className="flex items-start justify-between mb-0.5">
                <div className="font-semibold">{p.label}</div>
                {seen && <span className="text-emerald-400 text-[10px]">✓</span>}
              </div>
              <div className="text-[11px] text-white/55 leading-snug line-clamp-2">{p.description}</div>
            </button>
          );
        })}
      </div>

      {lesson?.id && <ExpertNotesInline lessonId={lesson.id} phase="dissect" />}

      <div className="text-center text-[11px] text-white/40">
        {viewed.size === 0
          ? `Open at least ${requiredToEngage} to continue`
          : viewed.size < requiredToEngage
            ? `${viewed.size} / ${requiredToEngage} opened`
            : "✓ explored · move on to Virtual Try"}
      </div>
    </div>
  );
}
