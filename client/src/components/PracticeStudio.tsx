import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentInstrumentAtom, currentLessonIdAtom, progressAtom, userAtom } from "@/atoms/session";
import { prefsAtom } from "@/atoms/prefs";
import {
  practiceStatusAtom, currentExerciseIdAtom, playheadMsAtom,
  livePitchHzAtom, livePitchNoteAtom, livePitchCentsAtom, lastGradeAtom,
  lastAttemptAudioUrlAtom, gradeErrorAtom, type GradeResult,
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
import { startCountIn, type CountIn } from "@/audio/countIn";
import { buildGradeMeta, realGrade, scaleExercise, useEngineHealth } from "@/lib/api";
import { enqueueAttempt } from "@/lib/offlineQueue";
import { applyGradeToProgress, applyGradeToUser, meetsPassCriteria } from "@/lib/progress";
import { keyboardRangeFor, normalizeNote } from "@/lib/notes";

/** Keep recording this long after the last target note ends. */
const TAIL_MS = 1000;

/**
 * Record → grade loop for one take.
 *
 *   arm (mic + level meter, nothing kept) → 1-bar count-in → record from the
 *   downbeat → grade. A failed grade keeps the take and writes no progress;
 *   offline takes are queued and graded later. With no engine configured the
 *   app is in demo mode: grades are simulated, labelled, and never saved.
 */
export function PracticeStudio({ tempoFactor = 1 }: { tempoFactor?: number }) {
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const lessonId = useAtomValue(currentLessonIdAtom);
  const prefs = useAtomValue(prefsAtom);
  const [status, setStatus] = useAtom(practiceStatusAtom);
  const setExerciseId = useSetAtom(currentExerciseIdAtom);
  const [playhead, setPlayhead] = useAtom(playheadMsAtom);
  const setLivePitchHz = useSetAtom(livePitchHzAtom);
  const setLivePitchNote = useSetAtom(livePitchNoteAtom);
  const setLivePitchCents = useSetAtom(livePitchCentsAtom);
  const setLastGrade = useSetAtom(lastGradeAtom);
  const setLastAudioUrl = useSetAtom(lastAttemptAudioUrlAtom);
  const [gradeError, setGradeError] = useAtom(gradeErrorAtom);
  const setGradingModalOpen = useSetAtom(gradingModalAtom);
  const setDissection = useSetAtom(dissectionAtom);
  const setProgress = useSetAtom(progressAtom);
  const setUser = useSetAtom(userAtom);
  const engine = useEngineHealth();
  const demoMode = engine === "demo";

  const instrument = instrumentId ? getInstrument(instrumentId) : null;
  const lesson = lessonId ? getLesson(lessonId) : null;
  const baseExercise = lesson ? getExercise(lesson.exercisePlanId) : null;
  const exercise = useMemo(
    () => (baseExercise ? scaleExercise(baseExercise, tempoFactor) : null),
    [baseExercise, tempoFactor],
  );

  useEffect(() => {
    if (baseExercise) setExerciseId(baseExercise.id);
  }, [baseExercise, setExerciseId]);

  const micRef = useRef<MicHandle | null>(null);
  const demoCtxRef = useRef<AudioContext | null>(null);
  const pitchRef = useRef<PitchHandle | null>(null);
  const countInRef = useRef<CountIn | null>(null);
  const rafRef = useRef<number | null>(null);
  const takeRef = useRef<Blob | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [queuedId, setQueuedId] = useState<string | null>(null);
  const [countBeat, setCountBeat] = useState<number | null>(null);

  const notes = exercise?.targetPattern.notes ?? [];
  const endMs = Math.max(
    4000,
    ...notes.map((n) => n.startMs + n.durationMs),
    ...(exercise?.targetPattern.onsets ?? []),
  );

  // ---- teardown helpers ----
  const stopLivePitch = () => {
    pitchRef.current?.stop();
    pitchRef.current = null;
    setLivePitchHz(0);
    setLivePitchNote(null);
    setLivePitchCents(0);
  };
  const stopClock = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };
  const closeDemoContext = () => {
    void demoCtxRef.current?.close().catch(() => {});
    demoCtxRef.current = null;
  };
  const releaseAll = async () => {
    countInRef.current?.cancel();
    countInRef.current = null;
    stopClock();
    stopLivePitch();
    closeDemoContext();
    const mic = micRef.current;
    micRef.current = null;
    if (mic) await mic.cancel();
  };

  // Release the mic if the learner navigates away mid-take.
  useEffect(() => () => { void releaseAll(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!instrument || !lesson || !exercise) return null;

  const activeNote = notes.find((n) => playhead >= n.startMs && playhead < n.startMs + n.durationMs);
  const nextNote = notes.find((n) => n.startMs > playhead);
  const upcoming = notes.filter((n) => n.startMs > playhead && n.startMs < playhead + 3000).map((n) => n.pitch);
  const recordingLike = status === "counting_in" || status === "recording";

  // ---- the take ----
  const armRecording = async () => {
    setMicError(null);
    setGradeError(null);
    setQueuedId(null);
    if (demoMode) {
      setStatus("armed");
      return;
    }
    try {
      const mic = await startMicCapture();
      micRef.current = mic;
      try {
        pitchRef.current = await startLivePitch(mic.stream, (frame) => {
          if (frame.hz == null) {
            setLivePitchHz(0);
            setLivePitchNote(null);
            setLivePitchCents(0);
            return;
          }
          setLivePitchHz(frame.hz);
          setLivePitchNote(frame.note);
          setLivePitchCents(frame.cents);
        }, { context: mic.context });
      } catch (err) {
        console.warn("[livePitch] failed to start:", err);
      }
      setStatus("armed");
    } catch (e) {
      const name = (e as Error)?.name ?? "";
      setMicError(name === "NotAllowedError" || name === "PermissionDeniedError"
        ? "Microphone access is blocked. Allow it in your browser's site settings, then try again."
        : "Couldn't open a microphone. Check that no other app is using it, then try again.");
      setStatus("idle");
    }
  };

  const runClock = (nowMs: () => number) => {
    stopClock();
    let lastSet = -1;
    const tick = () => {
      const t = Math.max(0, nowMs());
      if (t - lastSet >= 30) {
        lastSet = t;
        setPlayhead(t);
      }
      if (t >= endMs + TAIL_MS) {
        void finishTake();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const startTake = () => {
    setPlayhead(0);
    setStatus("counting_in");
    const mic = micRef.current;
    const ctx = mic?.context ?? (demoCtxRef.current ??= new AudioContext());
    countInRef.current = startCountIn(ctx, {
      bpm: exercise.tempo.bpm,
      beats: exercise.tempo.meter?.[0] ?? 4,
      onBeat: setCountBeat,
      onCaptureStart: () => mic?.startCapture(),
      onDownbeat: () => {
        const downbeatAt = countInRef.current?.downbeatAt ?? ctx.currentTime;
        setCountBeat(null);
        setStatus("recording");
        runClock(() => (ctx.currentTime - downbeatAt) * 1000);
      },
    });
  };

  const showGrade = (grade: GradeResult) => {
    setLastGrade(grade);
    setAttemptCount((a) => a + 1);
    setStatus("graded");
    setGradingModalOpen(true);
  };

  const gradeTake = async (wav: Blob) => {
    setStatus("scoring");
    setGradeError(null);
    try {
      const raw = await realGrade(exercise, wav, `a_${Date.now()}`, {
        lessonId: lesson.id, instrumentId: instrument.id, tempoFactor,
      });
      const passed = meetsPassCriteria(raw, lesson);
      const grade: GradeResult = { ...raw, passed, xpAwarded: passed ? raw.xpAwarded : Math.min(raw.xpAwarded, 3) };
      setProgress((prev) => applyGradeToProgress(prev, instrument.id, lesson.id, grade, passed));
      setUser((u) => applyGradeToUser(u, grade, passed));
      showGrade(grade);
    } catch (e) {
      setGradeError((e as Error)?.message || "Grading failed.");
      setStatus("error");
    }
  };

  const queueTake = async (wav: Blob) => {
    const id = await enqueueAttempt({
      lessonId: lesson.id,
      exerciseId: exercise.id,
      instrumentId: instrument.id,
      audio: wav,
      meta: JSON.stringify(buildGradeMeta(exercise, `a_${Date.now()}`, {
        lessonId: lesson.id, instrumentId: instrument.id, tempoFactor,
      })),
    });
    setQueuedId(id);
    setGradeError(null);
    setStatus("queued");
  };

  async function finishTake() {
    countInRef.current?.cancel();
    countInRef.current = null;
    stopClock();
    stopLivePitch();
    setCountBeat(null);
    setStatus("scoring");

    const mic = micRef.current;
    micRef.current = null;
    if (!mic) {
      // Demo mode: nothing was recorded, so the grade is simulated and never saved.
      closeDemoContext();
      showGrade(await mockGrade(exercise!, { attemptNumber: attemptCount + 1 }));
      return;
    }

    const wav = await mic.stop();
    takeRef.current = wav;
    setLastAudioUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(wav);
    });
    if (offlineMode || !navigator.onLine) await queueTake(wav);
    else await gradeTake(wav);
  }

  const resetTake = async () => {
    await releaseAll();
    setCountBeat(null);
    setPlayhead(0);
    setGradeError(null);
    setStatus("idle");
  };

  const chip = {
    demo: { text: "○ demo mode · simulated grades", cls: "bg-white/5 text-white/50 border border-white/10" },
    checking: { text: "… checking grader", cls: "bg-white/5 text-white/50 border border-white/10" },
    live: { text: "● grader live", cls: "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30" },
    down: { text: "⚠ grader offline — takes will be saved", cls: "bg-amber-500/15 text-amber-200 border border-amber-400/30" },
  }[engine];

  return (
    <div className="grid-dots min-h-[calc(100vh-4rem)] px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
              {instrument.name} · Level {lesson.level} · {lesson.tier}
              {tempoFactor !== 1 && ` · ${Math.round(tempoFactor * 100)}% tempo`}
            </div>
            <h2 className="display text-2xl md:text-3xl font-semibold">{lesson.title}</h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="chip bg-white/5 border border-white/10 text-white/60">{exercise.title}</div>
            <div className={`chip ${chip.cls}`}>{chip.text}</div>
          </div>
        </div>

        <div className="relative mb-4">
          <GhostHand
            targetNote={normalizeNote(activeNote?.pitch ?? nextNote?.pitch ?? null)}
            targetFinger={activeNote?.finger ?? nextNote?.finger}
            visible={status === "recording" && prefs.showGhostHand}
          />
          {instrument.id === "piano" && (
            <PianoHero
              range={keyboardRangeFor(notes.map((n) => n.pitch))}
              highlight={status === "recording" ? (activeNote?.pitch ?? null) : null}
              target={nextNote?.pitch ?? null}
              upcoming={upcoming}
            />
          )}
          {instrument.id === "sitar" && <SitarHero highlight={activeNote?.pitch ?? null} target={nextNote?.pitch ?? null} />}
          {instrument.id === "guitar" && <VirtualGuitar />}
          {instrument.id === "violin" && <VirtualViolin />}
          {instrument.id === "drums" && <VirtualDrums />}
          {!["piano", "sitar", "guitar", "violin", "drums"].includes(instrument.id) && (
            <GenericHero instrument={instrument} target={nextNote?.pitch ?? null} />
          )}
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

        {demoMode && (
          <div className="mt-3 panel p-3 text-xs text-white/60 bg-white/[0.02]">
            Demo mode: no grader is connected, so scores are simulated and don't count toward progress.
          </div>
        )}

        {micError && (
          <div className="mt-3 panel p-3 text-xs text-amber-200 bg-amber-400/5 border-amber-400/30">
            ⚠️  {micError}
          </div>
        )}

        {status === "queued" && queuedId && (
          <div className="mt-3 panel p-3 text-xs text-indigo-200 bg-indigo-400/5 border-indigo-400/30">
            📥 Saved on this device — it will be graded automatically when you're back online.
          </div>
        )}

        {status === "error" && (
          <div className="mt-3 panel p-4 text-sm bg-rose-400/5 border-rose-400/30 space-y-3">
            <div className="text-rose-200">⚠️ {gradeError ?? "Grading failed."}</div>
            <div className="text-xs text-white/50">Nothing was added to your progress. Your take is kept.</div>
            <div className="flex gap-2 flex-wrap">
              <button className="btn-primary" onClick={() => takeRef.current && gradeTake(takeRef.current)}>Retry grading</button>
              <button className="btn-ghost" onClick={() => takeRef.current && queueTake(takeRef.current)}>Save for later</button>
              <button className="btn-ghost" onClick={resetTake}>Discard</button>
            </div>
          </div>
        )}

        {!demoMode && (status === "idle" || status === "armed") && (
          <div className="mt-3 flex items-center justify-center">
            <label className="flex items-center gap-2 text-[11px] text-white/50 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="accent-indigo-400"
              />
              <span>Offline mode — save the take on this device, grade later (trains, planes)</span>
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
                {demoMode ? "— demo: no recording, simulated grade" : "— we'll record your take and grade pitch + timing"}
              </span>
            </>
          )}
          {status === "armed" && (
            <div className="panel p-4 flex items-center gap-4 flex-wrap justify-center">
              <div className="text-sm">
                <div className="font-semibold mb-0.5">{micRef.current ? "Mic is live" : "Ready"}</div>
                <div className="text-xs text-white/50">
                  {micRef.current
                    ? "Play a test note — the meter should move. Nothing is recorded until the count-in ends."
                    : "A one-bar count-in plays, then the take starts."}
                </div>
              </div>
              <button className="btn-primary" onClick={startTake}>Count me in →</button>
              <button className="btn-ghost" onClick={resetTake}>Cancel</button>
            </div>
          )}
          {status === "counting_in" && (
            <>
              <div className="display text-5xl font-semibold tabular-nums w-16 text-center">{countBeat ?? "·"}</div>
              <button className="btn-ghost" onClick={resetTake}>Cancel</button>
            </>
          )}
          {status === "recording" && (
            <>
              <div className="chip bg-rose-500/20 text-rose-200 border border-rose-400/30 animate-pulse-soft">
                ● {micRef.current ? "recording" : "demo take"}
              </div>
              <button className="btn-primary" onClick={() => void finishTake()}>Done</button>
              <button className="btn-ghost" onClick={resetTake}>Cancel</button>
            </>
          )}
          {status === "scoring" && (
            <div className="chip bg-white/5 border border-white/10 text-white/70">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-soft mr-2" />
              {demoMode ? "Simulating a grade…" : "Grading your take…"}
            </div>
          )}
          {status === "graded" && (
            <>
              <button className="btn-primary" onClick={() => setGradingModalOpen(true)}>See result</button>
              <button className="btn-ghost" onClick={resetTake}>Try again</button>
            </>
          )}
          {status === "queued" && (
            <button className="btn-ghost" onClick={resetTake}>Record another take</button>
          )}
        </div>
        {recordingLike && <div className="sr-only" aria-live="polite">{status === "counting_in" ? `Beat ${countBeat ?? ""}` : "Recording"}</div>}
      </div>
    </div>
  );
}
