import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { screenAtom, userAtom } from "@/atoms/session";
import { startLivePitch, type PitchHandle, type PitchFrame } from "@/audio/livePitch";

/**
 * Mic check — step 2 of onboarding. Request microphone permission, verify
 * the stream produces signal, show a live level meter so the learner can
 * adjust their distance/gain. This eliminates the #1 friction point: a
 * silent attempt because the user's mic wasn't granted or was muted.
 *
 * Does not persist mic capture — only a brief live probe. User can skip
 * if they plan to use the app read-only.
 */
export function MicCheckPage() {
  const [, setScreen] = useAtom(screenAtom);
  const [user, setUser] = useAtom(userAtom);

  const [state, setState] = useState<"idle" | "requesting" | "active" | "denied" | "error">("idle");
  const [level, setLevel] = useState(0);          // 0..1 RMS
  const [lastFrame, setLastFrame] = useState<PitchFrame | null>(null);
  const [signalOkSince, setSignalOkSince] = useState<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const handleRef = useRef<PitchHandle | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startCheck = async () => {
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      streamRef.current = stream;
      const handle = await startLivePitch(stream, (frame) => {
        setLevel(Math.min(1, frame.rms * 8));
        setLastFrame(frame);
        if (frame.rms > 0.04) {
          setSignalOkSince((prev) => prev ?? Date.now());
        }
      });
      handleRef.current = handle;
      setState("active");
    } catch (err) {
      const name = (err as Error)?.name ?? "";
      setState(name === "NotAllowedError" || name === "PermissionDeniedError" ? "denied" : "error");
    }
  };

  const confirmReady = () => {
    handleRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    const now = new Date().toISOString();
    setUser({
      ...(user ?? {
        username: "you",
        displayName: "You",
        joinedAt: now,
        totalXp: 0,
        currentStreak: 0,
        heartsToday: 5,
        heartsMax: 5,
        practiceMinutesToday: 0,
      }),
      micCheckedAt: now,
    });
    setScreen("picker");
  };

  const skip = () => {
    handleRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setScreen("picker");
  };

  const goodSignalForMs = signalOkSince ? Date.now() - signalOkSince : 0;
  const canProceed = state === "active" && goodSignalForMs > 1500;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="max-w-lg w-full text-center">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Step 2 of 3 · Mic check</div>
        <h1 className="display text-4xl md:text-5xl font-semibold mb-3">Let's make sure we can hear you.</h1>
        <p className="text-white/70 mb-8">
          MusicLuv uses your microphone to grade what you play. A quick check now
          means your first lesson doesn't fail on a muted mic.
        </p>

        <div className="panel p-6 space-y-5">
          {state === "idle" && (
            <button onClick={startCheck} className="btn-primary w-full py-3 text-base">
              Request microphone access
            </button>
          )}

          {state === "requesting" && (
            <div className="text-sm text-white/60">Waiting for permission…</div>
          )}

          {state === "denied" && (
            <>
              <div className="text-4xl">🎤</div>
              <div className="font-semibold">Mic permission blocked</div>
              <p className="text-xs text-white/60">
                Re-enable microphone access in your browser settings (look for the padlock
                icon in the address bar) and refresh. You can also skip for now — you'll be
                prompted again on your first recording attempt.
              </p>
              <div className="flex gap-2">
                <button onClick={skip} className="btn-ghost flex-1">Skip for now</button>
                <button onClick={startCheck} className="btn-primary flex-1">Try again</button>
              </div>
            </>
          )}

          {state === "error" && (
            <>
              <div className="text-4xl">⚠️</div>
              <div className="font-semibold">Mic unavailable</div>
              <p className="text-xs text-white/60">
                Your browser couldn't open a microphone. Check you're not on an insecure
                (http) URL and that no other app is using the mic.
              </p>
              <button onClick={skip} className="btn-ghost w-full">Continue anyway</button>
            </>
          )}

          {state === "active" && (
            <>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Live level</div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-75 ${level > 0.6 ? "bg-rose-400" : level > 0.1 ? "bg-emerald-400" : "bg-white/20"}`}
                  style={{ width: `${Math.min(100, level * 100)}%` }}
                />
              </div>
              <div className="text-xs text-white/60">
                {lastFrame?.hz
                  ? <>Hearing <span className="font-mono text-white/90">{lastFrame.note}</span> at {Math.round(lastFrame.hz)} Hz</>
                  : "Try a sustained note or sing an 'ah' for 2 seconds."}
              </div>
              <button
                onClick={confirmReady}
                disabled={!canProceed}
                className="btn-primary w-full py-3 text-base disabled:opacity-40"
              >
                {canProceed ? "Sounds great — let's go" : "Play or sing to verify…"}
              </button>
              <button onClick={skip} className="btn-ghost w-full text-sm">
                Skip mic check
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
