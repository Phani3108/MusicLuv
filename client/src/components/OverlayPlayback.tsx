import { useMemo, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { currentExerciseIdAtom, lastGradeAtom, lastAttemptAudioUrlAtom } from "@/atoms/practice";
import { getExercise } from "@catalogs/exerciseCatalog";
import { playPianoNote, unlockAudio, ensurePianoReady } from "@/audio/pianoSampler";
import type { TargetNote } from "@catalogs/types";
import type { DetectedNote } from "@/atoms/practice";

const NOTE_TO_SEMITONE: Record<string, number> = {
  "C4": 0, "C#4": 1, "D4": 2, "D#4": 3, "E4": 4, "F4": 5, "F#4": 6,
  "G4": 7, "G#4": 8, "A4": 9, "A#4": 10, "B4": 11, "C5": 12, "D5": 14, "E5": 16, "F5": 17, "G5": 19,
};

/**
 * Student-vs-target comparison view.
 *  - Top lane: target notes (indigo)
 *  - Bottom lane: student's detected notes (green pass / amber minor / rose major)
 *  - Per-pair diff bar shows timing + pitch offsets
 *  - Click any note → plays it; scrubber over a shared time axis
 *  - Audio playback of captured take if the blob URL is available
 */
export function OverlayPlayback() {
  const exerciseId = useAtomValue(currentExerciseIdAtom);
  const grade = useAtomValue(lastGradeAtom);
  const audioUrl = useAtomValue(lastAttemptAudioUrlAtom);

  const exercise = exerciseId ? getExercise(exerciseId) : null;
  const target: TargetNote[] = exercise?.targetPattern.notes ?? [];
  const detected: DetectedNote[] = grade?.userNotesDetected ?? [];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playheadMs, setPlayheadMs] = useState(0);

  const maxMs = useMemo(() => {
    const t = target.length ? Math.max(...target.map((n) => n.startMs + n.durationMs)) : 0;
    const s = detected.length ? Math.max(...detected.map((n) => n.startMs + n.durationMs)) : 0;
    return Math.max(t, s, 4000);
  }, [target, detected]);

  const pxPerMs = 0.18; // same tempo-read rate as the timeline ribbon
  const width = Math.max(800, maxMs * pxPerMs + 40);

  const semitones = useMemo(() => {
    const all = [...target.map((n) => n.pitch), ...detected.map((n) => n.pitch)];
    const semis = all.map((p) => NOTE_TO_SEMITONE[p] ?? 7);
    return {
      min: Math.min(...semis, 0) - 2,
      max: Math.max(...semis, 12) + 2,
    };
  }, [target, detected]);

  const semiToY = (semi: number, laneH: number) => {
    const range = semitones.max - semitones.min || 1;
    return (1 - (semi - semitones.min) / range) * laneH;
  };

  const handlePlayAudio = () => {
    if (!audioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => { setPlaying(false); setPlayheadMs(0); };
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) setPlayheadMs(Math.round(audioRef.current.currentTime * 1000));
      };
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const handleNoteClick = async (pitch: string) => {
    await unlockAudio();
    await ensurePianoReady();
    await playPianoNote(pitch, 0.6);
  };

  if (!exercise || !grade) {
    return (
      <div className="panel p-8 text-center text-white/50">
        No attempt yet. Run an exercise first.
      </div>
    );
  }

  const laneH = 56;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-white/40">Side-by-side comparison</div>
          <div className="text-sm font-semibold">{exercise.title}</div>
        </div>
        <div className="flex items-center gap-2">
          {audioUrl && (
            <button className="btn-ghost text-xs" onClick={handlePlayAudio}>
              {playing ? "⏸ Pause my take" : "▶ Play my take"}
            </button>
          )}
          <button
            className="btn-ghost text-xs"
            onClick={async () => {
              await unlockAudio();
              await ensurePianoReady();
              target.forEach((n) => setTimeout(() => playPianoNote(n.pitch, n.durationMs / 1000), n.startMs));
            }}
          >
            🔊 Play target
          </button>
        </div>
      </div>

      <div className="panel bg-black/40 overflow-hidden">
        <div className="overflow-x-auto scrollbar-none">
          <svg
            width={width}
            height={laneH * 2 + 56}
            style={{ minWidth: "100%", cursor: "pointer" }}
            onClick={(e) => {
              const svg = e.currentTarget;
              const rect = svg.getBoundingClientRect();
              const x = e.clientX - rect.left - 20;
              const ms = Math.max(0, Math.round(x / pxPerMs));
              setPlayheadMs(ms);
              if (audioRef.current) {
                audioRef.current.currentTime = ms / 1000;
              }
            }}
          >
            {/* Bar lines every second */}
            {Array.from({ length: Math.ceil(maxMs / 1000) + 1 }).map((_, i) => (
              <line
                key={`b${i}`}
                x1={i * 1000 * pxPerMs + 20}
                y1={0}
                x2={i * 1000 * pxPerMs + 20}
                y2={laneH * 2 + 40}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}

            {/* Lane labels */}
            <text x={4} y={14} fill="rgba(165,180,252,0.8)" fontSize={10} fontFamily="monospace">TARGET</text>
            <text x={4} y={laneH + 30} fill="rgba(94,234,212,0.8)" fontSize={10} fontFamily="monospace">YOU</text>

            {/* Target notes — top lane */}
            <g transform="translate(20, 20)">
              {target.map((n, i) => {
                const semi = NOTE_TO_SEMITONE[n.pitch] ?? 7;
                const x = n.startMs * pxPerMs;
                const w = Math.max(n.durationMs * pxPerMs, 4);
                const y = semiToY(semi, laneH);
                return (
                  <g key={`t${i}`} onClick={() => handleNoteClick(n.pitch)} style={{ cursor: "pointer" }}>
                    <rect x={x} y={y - 4} width={w} height={8} rx={3} fill="rgba(129,140,248,0.85)" />
                    <text x={x} y={y - 8} fill="rgba(200,200,255,0.85)" fontSize={9} fontFamily="monospace">
                      {n.pitch}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Student notes — bottom lane */}
            <g transform={`translate(20, ${laneH + 36})`}>
              {detected.map((n, i) => {
                const semi = NOTE_TO_SEMITONE[n.pitch] ?? 7;
                const x = n.startMs * pxPerMs;
                const w = Math.max(n.durationMs * pxPerMs, 4);
                const y = semiToY(semi, laneH);
                const cents = Math.abs(n.centsOff ?? 0);
                const fill = cents < 15 ? "rgba(52,211,153,0.85)"
                           : cents < 35 ? "rgba(251,191,36,0.85)"
                           : "rgba(251,113,133,0.85)";
                return (
                  <g key={`s${i}`} onClick={() => handleNoteClick(n.pitch)} style={{ cursor: "pointer" }}>
                    <rect x={x} y={y - 4} width={w} height={8} rx={3} fill={fill} />
                    <text x={x} y={y + 18} fill="rgba(200,255,220,0.85)" fontSize={9} fontFamily="monospace">
                      {n.pitch}{n.centsOff !== undefined && n.centsOff !== 0 ? ` ${n.centsOff > 0 ? "+" : ""}${n.centsOff}¢` : ""}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Diff lines connecting target[i] → detected[i] when indices align */}
            <g transform="translate(20, 0)">
              {target.map((t, i) => {
                const s = detected[i];
                if (!s) return null;
                const semiT = NOTE_TO_SEMITONE[t.pitch] ?? 7;
                const semiS = NOTE_TO_SEMITONE[s.pitch] ?? 7;
                const x1 = t.startMs * pxPerMs;
                const x2 = s.startMs * pxPerMs;
                const y1 = 20 + semiToY(semiT, laneH);
                const y2 = laneH + 36 + semiToY(semiS, laneH);
                const drift = Math.abs((s.startMs - t.startMs)) + Math.abs(s.centsOff ?? 0);
                const stroke = drift < 30 ? "rgba(52,211,153,0.35)" : drift < 80 ? "rgba(251,191,36,0.45)" : "rgba(251,113,133,0.55)";
                return <line key={`d${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={1} strokeDasharray="2 2" />;
              })}
            </g>

            {/* Playhead — visible when playing OR when user has scrubbed */}
            {(playing || playheadMs > 0) && (
              <line
                x1={playheadMs * pxPerMs + 20}
                y1={0}
                x2={playheadMs * pxPerMs + 20}
                y2={laneH * 2 + 40}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={1.5}
              />
            )}
          </svg>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-white/40 p-2 border-t border-white/5">
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> target</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> you · in tune</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> minor</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> major</span>
          <span className="flex-1" />
          <span>click the timeline to scrub · click a note to hear it</span>
        </div>
      </div>
    </div>
  );
}
