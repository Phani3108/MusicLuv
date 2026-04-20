import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentInstrumentAtom, currentLessonIdAtom, progressAtom, userAtom } from "@/atoms/session";
import {
  practiceStatusAtom, currentExerciseIdAtom, playheadMsAtom,
  livePitchHzAtom, livePitchNoteAtom, livePitchCentsAtom, lastGradeAtom,
  lastAttemptAudioUrlAtom,
} from "@/atoms/practice";
import { dissectionAtom, gradingModalAtom } from "@/atoms/panels";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { getLesson } from "@catalogs/lessonCatalog";
import { getExercise } from "@catalogs/exerciseCatalog";
import { PianoHero } from "./PianoHero";
import { SitarHero } from "./SitarHero";
import { GenericHero } from "./GenericHero";
import { VirtualGuitar } from "./VirtualGuitar";
import { VirtualViolin } from "./VirtualViolin";
import { VirtualDrums } from "./VirtualDrums";
import { PitchMeter } from "./PitchMeter";
import { TimelineRibbon } from "./TimelineRibbon";
import { GhostHand } from "./GhostHand";
import { mockGrade } from "@/mocks/api";
import { startMicCapture, type MicHandle } from "@/audio/mic";
import { startLivePitch, type PitchHandle } from "@/audio/livePitch";
import { isRealBackend, realGrade } from "@/lib/api";
import { enqueueAttempt } from "@/lib/offlineQueue";
import { getRubric } from "@catalogs/gradingRubricCatalog";

export function PracticeStudio() {
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const lessonId = useAtomValue(currentLessonIdAtom);
  const [status, setStatus] = useAtom(practiceStatusAtom);
  const setExerciseId = useSetAtom(currentExerciseIdAtom);
  const [playhead, setPlayhead] = useAtom(playheadMsAtom);
  const setLivePitchHz = useSetAtom(livePitchHzAtom);
  const setLivePitchNote = useSetAtom(livePitchNoteAtom);
  const setLivePitchCents = useSetAtom(livePitchCentsAtom);
  const setLastGrade = useSetAtom(lastGradeAtom);
  const [lastAudioUrl, setLastAudioUrl] = useAtom(lastAttemptAudioUrlAtom);
  const setGradingModalOpen = useSetAtom(gradingModalAtom);
  const setDissection = useSetAtom(dissectionAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const [user, setUser] = useAtom(userAtom);

  const instrument = instrumentId ? getInstrument(instrumentId) : null;
  const lesson = lessonId ? getLesson(lessonId) : null;
  const exercise = lesson ? getExercise(lesson.exercisePlanId) : null;

  useEffect(() => {
    if (exercise) setExerciseId(exercise.id);
  }, [exercise, setExerciseId]);

  const playheadRef = useRef(0);
  useEffect(() => { playheadRef.current = playhead; }, [playhead]);

  const micHandleRef = useRef<MicHandle | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [offlineSaved, setOfflineSaved] = useState<string | null>(null);

  const usingRealBackend = isRealBackend();

  // Real live pitch detection: when the mic is open during recording, run a
  // client-side autocorrelation detector and pipe hz/note/cents into the
  // same atoms PitchMeter + TimelineRibbon already subscribe to.
  // Zero backend dependency — works offline.
  const pitchHandleRef = useRef<PitchHandle | null>(null);
  useEffect(() => {
    if (status !== "recording") {
      if (pitchHandleRef.current) {
        pitchHandleRef.current.stop();
        pitchHandleRef.current = null;
      }
      return;
    }
    const mic = micHandleRef.current;
    if (!mic) return;

    let cancelled = false;
    (async () => {
      try {
        const handle = await startLivePitch(mic.stream, (frame) => {
          if (cancelled) return;
          if (frame.hz == null) {
            // Unvoiced / silent frame — reset display without flickering.
            setLivePitchHz(0);
            setLivePitchNote(null);
            setLivePitchCents(0);
            return;
          }
          setLivePitchHz(frame.hz);
          setLivePitchNote(frame.note);
          setLivePitchCents(frame.cents);
        });
        if (cancelled) {
          handle.stop();
        } else {
          pitchHandleRef.current = handle;
        }
      } catch (err) {
        console.warn("[livePitch] failed to start:", err);
      }
    })();

    return () => {
      cancelled = true;
      if (pitchHandleRef.current) {
        pitchHandleRef.current.stop();
        pitchHandleRef.current = null;
      }
    };
  }, [status, setLivePitchHz, setLivePitchNote, setLivePitchCents]);

  // Playhead clock — during recording
  useEffect(() => {
    if (status !== "recording" || !exercise) return;
    const maxMs = Math.max(
      ...((exercise.targetPattern.notes?.map((n) => n.startMs + n.durationMs) ?? [4000])),
      ...((exercise.targetPattern.onsets ?? [4000]))
    );
    const interval = setInterval(() => {
      setPlayhead((prev) => {
        const next = prev + 60;
        if (next >= maxMs + 500) {
          setStatus("scoring");
          clearInterval(interval);
          return next;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [status, exercise, setPlayhead, setStatus]);

  // Trigger grade when status flips to "scoring"
  useEffect(() => {
    if (status !== "scoring" || !exercise) return;
    (async () => {
      let grade;
      try {
        if (usingRealBackend && micHandleRef.current) {
          const wav = await micHandleRef.current.stop();
          micHandleRef.current = null;
          if (lastAudioUrl) URL.revokeObjectURL(lastAudioUrl);
          setLastAudioUrl(URL.createObjectURL(wav));

          if (offlineMode || !navigator.onLine) {
            // Enqueue for later grading; optimistic mock in the UI for now.
            const rubric = getRubric(exercise.gradingRubricId);
            const meta = JSON.stringify({
              exerciseId: exercise.id,
              userId: "local",
              attemptId: `a_${Date.now()}`,
              target: (exercise.targetPattern.notes ?? []).map((n) => ({
                pitch: n.pitch, startMs: n.startMs, durationMs: n.durationMs,
              })),
              rubric: {
                id: rubric.id, weights: rubric.weights,
                passThreshold: rubric.passThreshold,
                pitchToleranceCents: rubric.pitchToleranceCents,
                rhythmToleranceMs: rubric.rhythmToleranceMs,
                feedbackBank: rubric.feedbackBank,
              },
              offlineMode: true,
            });
            const id = await enqueueAttempt({
              lessonId: lesson?.id ?? "",
              exerciseId: exercise.id,
              audio: wav,
              meta,
            });
            setOfflineSaved(id);
            // Return an optimistic mock so the user gets some feedback instantly.
            grade = await mockGrade(exercise, { attemptNumber: attemptCount + 1 });
          } else {
            grade = await realGrade(exercise, wav, `a_${Date.now()}`);
          }
        } else {
          if (lastAudioUrl) { URL.revokeObjectURL(lastAudioUrl); setLastAudioUrl(null); }
          grade = await mockGrade(exercise, { attemptNumber: attemptCount + 1 });
        }
      } catch (e) {
        console.error("Grading failed, falling back to mock:", e);
        grade = await mockGrade(exercise, { attemptNumber: attemptCount + 1 });
      }

      setLastGrade(grade);
      setAttemptCount((a) => a + 1);
      setProgress((prev) => {
        const cur = prev[instrumentId!] ?? { xp: 0, level: 1, lessonsCompleted: [] as string[] };
        return {
          ...prev,
          [instrumentId!]: {
            ...cur,
            xp: cur.xp + grade.xpAwarded,
            lessonsCompleted: grade.passed && lesson
              ? Array.from(new Set([...cur.lessonsCompleted, lesson.id]))
              : cur.lessonsCompleted,
            lastGrade: { lessonId: lesson?.id ?? "", composite: grade.composite, dimensions: grade.dimensions, at: new Date().toISOString() },
          } as any,
        };
      });
      setUser((u) => u && ({
        ...u,
        totalXp: u.totalXp + grade.xpAwarded,
        currentStreak: u.currentStreak || 1,
        heartsToday: grade.passed ? u.heartsToday : Math.max(0, u.heartsToday - 1),
        practiceMinutesToday: u.practiceMinutesToday + 1,
      }));
      setStatus("graded");
      setGradingModalOpen(true);
    })();
  }, [status, exercise]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!instrument || !lesson || !exercise) return null;

  const notes = exercise.targetPattern.notes ?? [];
  const activeNote = notes.find((n) => playhead >= n.startMs && playhead < n.startMs + n.durationMs);
  const nextNote = notes.find((n) => n.startMs > playhead);
  const upcoming = notes.filter((n) => n.startMs > playhead && n.startMs < playhead + 3000).map((n) => n.pitch);

  const armRecording = async () => {
    setMicError(null);
    if (usingRealBackend) {
      try {
        micHandleRef.current = await startMicCapture();
        setStatus("armed");
      } catch (e: any) {
        setMicError(e?.message ?? "Mic permission denied — falling back to simulated grading.");
        micHandleRef.current = null;
        setStatus("armed");
      }
    } else {
      setStatus("armed");
    }
  };

  const startRecording = () => {
    setPlayhead(0);
    setStatus("recording");
  };

  const cancelRecording = async () => {
    if (micHandleRef.current) {
      try { await micHandleRef.current.stop(); } catch {}
      micHandleRef.current = null;
    }
    setStatus("idle");
    setPlayhead(0);
  };

  return (
    <div className="grid-dots min-h-[calc(100vh-4rem)] px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
              {instrument.name} · Level {lesson.level} · {lesson.tier}
            </div>
            <h2 className="display text-2xl md:text-3xl font-semibold">{lesson.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="chip bg-white/5 border border-white/10 text-white/60">{exercise.title}</div>
            <div className={`chip ${usingRealBackend
              ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
              : "bg-white/5 text-white/50 border border-white/10"}`}>
              {usingRealBackend ? "● audio-engine live" : "○ mock grading"}
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <GhostHand targetFinger={activeNote?.finger ?? nextNote?.finger} visible={status === "recording"} />
          {instrument.id === "piano" && (
            <PianoHero
              highlight={status === "recording" ? (activeNote?.pitch ?? null) : null}
              target={nextNote?.pitch ?? null}
              upcoming={upcoming}
              onKeyClick={() => {}}
            />
          )}
          {instrument.id === "sitar" && <SitarHero highlight={null} />}
          {instrument.id === "guitar" && <VirtualGuitar />}
          {instrument.id === "violin" && <VirtualViolin />}
          {instrument.id === "drums" && <VirtualDrums />}
          {instrument.id !== "piano" && instrument.id !== "sitar" && instrument.id !== "guitar" && instrument.id !== "violin" && instrument.id !== "drums" && <GenericHero instrument={instrument} />}
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mr-2">Controls</div>
          {instrument.controls.map((c) => (
            <button
              key={c.id}
              onClick={() => setDissection(c.id)}
              className="chip bg-white/5 hover:bg-white/10 border border-white/10 text-white/80"
            >
              {c.label} <span className="text-white/40">▸</span>
            </button>
          ))}
          <div className="flex-1" />
          <PitchMeter />
        </div>

        <TimelineRibbon exercise={exercise} />

        {micError && (
          <div className="mt-3 panel p-3 text-xs text-amber-200 bg-amber-400/5 border-amber-400/30">
            ⚠️  {micError}
          </div>
        )}

        {offlineSaved && (
          <div className="mt-3 panel p-3 text-xs text-indigo-200 bg-indigo-400/5 border-indigo-400/30 flex items-center gap-2">
            📥 Saved offline — will grade when back online. Attempt id: <span className="font-mono">{offlineSaved}</span>
          </div>
        )}

        {usingRealBackend && (
          <div className="mt-3 flex items-center justify-center">
            <label className="flex items-center gap-2 text-[11px] text-white/50 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="accent-indigo-400"
              />
              <span>Offline mode — save WAV locally, grade later (useful on trains/planes)</span>
            </label>
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 justify-center flex-wrap">
          {status === "idle" && (
            <>
              <button className="btn-primary text-base" onClick={armRecording}>
                🎙️  Start exercise
              </button>
              <span className="text-xs text-white/40">
                {usingRealBackend
                  ? "— we'll record from your mic and grade with CREPE + DTW"
                  : "— mic check, then go"}
              </span>
            </>
          )}
          {status === "armed" && (
            <div className="panel p-4 flex items-center gap-4">
              <div className="text-sm">
                <div className="font-semibold mb-0.5">
                  {micHandleRef.current ? "Mic is live" : "Mic check"}
                </div>
                <div className="text-xs text-white/50">
                  {micHandleRef.current
                    ? "Play a test note, then hit go."
                    : "Play any note — we'll calibrate gain and noise floor."}
                </div>
              </div>
              <button className="btn-primary" onClick={startRecording}>Sounds good →</button>
              <button className="btn-ghost" onClick={cancelRecording}>Cancel</button>
            </div>
          )}
          {status === "recording" && (
            <>
              <div className="chip bg-rose-500/20 text-rose-200 border border-rose-400/30 animate-pulse-soft">
                ● {micHandleRef.current ? "recording live" : "recording"}
              </div>
              <button className="btn-ghost" onClick={cancelRecording}>Stop</button>
            </>
          )}
          {status === "scoring" && (
            <div className="chip bg-white/5 border border-white/10 text-white/70">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-soft mr-2" />
              {usingRealBackend ? "Running CREPE + DTW on your take…" : "Scoring…"}
            </div>
          )}
          {status === "graded" && (
            <>
              <button className="btn-primary" onClick={() => setGradingModalOpen(true)}>See result</button>
              <button className="btn-ghost" onClick={cancelRecording}>Try again</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
