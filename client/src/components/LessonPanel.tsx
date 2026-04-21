import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { lessonPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom, currentLessonIdAtom } from "@/atoms/session";
import { getLesson, listLessonsForInstrument } from "@catalogs/lessonCatalog";
import { getExercise } from "@catalogs/exerciseCatalog";
import { SidePanel } from "./SidePanel";
import { playNote, unlockAudio, ensureReady } from "@/audio/instrumentSampler";
import { MUSICLUV_SERVER_URL } from "@/lib/api";

export function LessonPanel() {
  const [open, setOpen] = useAtom(lessonPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const [lessonId, setLessonId] = useAtom(currentLessonIdAtom);
  const current = lessonId ? getLesson(lessonId) : null;
  const all = instrumentId ? listLessonsForInstrument(instrumentId) : [];
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playAudioRef = async (refUrl: string | undefined, refId: string) => {
    // Prefer the server-synthesized reference WAV when a URL is
    // available and VITE_SERVER_URL is configured — that matches
    // exactly what the grader aligns against. Fall back to in-browser
    // Tone.js synthesis if the server isn't reachable.
    if (!current || !instrumentId) return;
    const canUseServer = Boolean(refUrl && MUSICLUV_SERVER_URL);
    if (canUseServer) {
      try {
        if (!audioElRef.current) {
          audioElRef.current = new Audio();
          audioElRef.current.onended = () => setPlayingId(null);
        }
        const fullUrl = refUrl!.startsWith("http") ? refUrl! : `${MUSICLUV_SERVER_URL}${refUrl}`;
        audioElRef.current.src = fullUrl;
        await audioElRef.current.play();
        setPlayingId(refId);
        return;
      } catch {
        // fall through to in-browser synthesis
      }
    }
    // In-browser synthesis fallback.
    const exercise = getExercise(current.exercisePlanId);
    if (!exercise) return;
    await unlockAudio();
    await ensureReady(instrumentId);
    const notes = exercise.targetPattern.notes ?? [];
    setPlayingId(refId);
    for (const n of notes.slice(0, 16)) {
      setTimeout(() => {
        void playNote(instrumentId, n.pitch, n.durationMs / 1000);
      }, n.startMs);
    }
    const total = Math.max(...notes.slice(0, 16).map((n) => n.startMs + n.durationMs), 1000);
    setTimeout(() => setPlayingId(null), total + 200);
  };

  return (
    <SidePanel
      open={open}
      onClose={() => setOpen(false)}
      title={current?.title ?? "Lesson"}
      subtitle={current ? `Level ${current.level} · ${current.tier} · ~${current.estimatedMinutes} min` : undefined}
      side="right"
    >
      {current && (
        <>
          <section className="mb-6">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Objectives</div>
            <ul className="space-y-2">
              {current.objectives.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/80">
                  <span className="text-emerald-400 mt-0.5">✓</span> {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Lesson</div>
            <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed whitespace-pre-line">
              {current.writtenContent}
            </div>
          </section>

          <section className="mb-6">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Audio reference</div>
            <div className="space-y-2">
              {current.audioRefs.map((a) => (
                <button
                  key={a.id}
                  className="w-full panel p-3 flex items-center gap-3 text-left hover:bg-white/5"
                  onClick={() => playAudioRef(a.url, a.id)}
                >
                  <span className="w-9 h-9 rounded-full bg-indigo-400/20 flex items-center justify-center">
                    {playingId === a.id ? "◼" : "▶"}
                  </span>
                  <div className="flex-1 text-sm">{a.label}</div>
                  <span className="text-[10px] font-mono text-emerald-400/70">
                    {a.url ? "reference" : "preview"}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="mb-2">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
              All lessons for this instrument
            </div>
            <div className="space-y-1.5">
              {all.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLessonId(l.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-colors
                    ${l.id === lessonId ? "bg-indigo-500/15 border-indigo-400/30" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/40">L{l.level}</span>
                    <span className="text-sm flex-1">{l.title}</span>
                    <span className="text-[10px] text-white/40">{l.estimatedMinutes}m</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </SidePanel>
  );
}
