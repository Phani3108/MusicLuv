import { useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { songUploadAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { SidePanel } from "./SidePanel";
import { AUDIO_ENGINE_URL, MUSICLUV_SERVER_URL, serverAuthHeaders } from "@/lib/api";

type Step = "input" | "uploading" | "done" | "error";

interface TranscribedStep {
  instruction: string;
  atMs: number;
  durationMs: number;
  pitch?: string;
}

interface TranscribeResponse {
  steps: TranscribedStep[];
  confidence: number;
  warning?: string | null;
}

/**
 * Song upload panel. Real pipeline:
 *   1. User picks a local audio file (or drops one).
 *   2. POST multipart to /transcribe on the audio-engine with
 *      instrument_id + target level.
 *   3. Engine runs Demucs stem separation (if configured) + Basic
 *      Pitch polyphonic transcription + level-based simplification.
 *   4. Client renders the returned steps[] with confidence banner.
 *
 * If the audio-engine isn't configured (VITE_AUDIO_ENGINE_URL missing),
 * the panel shows a clear "server not connected" state — no more
 * setTimeout theater pretending to run Demucs.
 *
 * URL ingest is deferred: server-side yt-dlp is out-of-scope here;
 * until that ships, the UI surfaces the limitation honestly.
 */
export function SongUploadPanel() {
  const [open, setOpen] = useAtom(songUploadAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const [step, setStep] = useState<Step>("input");
  const [mode, setMode] = useState<"file" | "url">("file");
  const [url, setUrl] = useState("");
  const [level, setLevel] = useState(2);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TranscribeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressLabel, setProgressLabel] = useState("Separating stems…");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const engineReady = Boolean(AUDIO_ENGINE_URL);

  const analyzeUrl = async () => {
    if (!url.trim() || !instrumentId) return;
    setStep("uploading");
    setError(null);
    setProgressLabel("Fetching audio from URL…");

    try {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured (VITE_SERVER_URL)");
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/uploads/from-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({ url: url.trim(), instrumentId, level }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        throw new Error(body.message || body.error || `HTTP ${res.status}`);
      }
      // Stub: the real flow polls jobId until ready, then fills `result`.
      setResult({
        steps: [],
        confidence: 0,
        warning: "Server accepted the URL; transcription will complete server-side shortly. Refresh to check.",
      });
      setStep("done");
    } catch (e) {
      setError((e as Error).message);
      setStep("error");
    }
  };

  const analyze = async () => {
    if (mode === "url") return analyzeUrl();
    if (!file || !instrumentId) return;
    setStep("uploading");
    setError(null);
    setProgressLabel("Uploading audio…");

    try {
      const form = new FormData();
      form.append("audio", file, file.name);
      form.append("instrument_id", instrumentId);
      form.append("level", String(level));

      // Roll through labels while the request is in flight so it doesn't
      // feel like dead air. Steps map roughly to the backend pipeline.
      const steppers = [
        { at: 300, label: "Separating stems (Demucs)…" },
        { at: 2400, label: "Transcribing notes (Basic Pitch)…" },
        { at: 5500, label: "Simplifying to your level…" },
      ];
      const timers = steppers.map((s) => window.setTimeout(() => setProgressLabel(s.label), s.at));

      const res = await fetch(`${AUDIO_ENGINE_URL}/transcribe`, {
        method: "POST",
        body: form,
      });

      timers.forEach(window.clearTimeout);

      if (!res.ok) {
        throw new Error(`Engine returned HTTP ${res.status}`);
      }
      const data = (await res.json()) as TranscribeResponse;
      setResult(data);
      setStep("done");
    } catch (e) {
      setError((e as Error).message || "Analysis failed");
      setStep("error");
    }
  };

  const reset = () => {
    setStep("input");
    setFile(null);
    setResult(null);
    setError(null);
  };

  const close = () => {
    setOpen(false);
    reset();
  };

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const confidencePct = result ? Math.round(result.confidence * 100) : 0;
  const confidenceColor =
    result && result.confidence < 0.55
      ? "text-amber-300"
      : result && result.confidence < 0.75
      ? "text-indigo-300"
      : "text-emerald-300";

  return (
    <SidePanel
      open={open}
      onClose={close}
      title="Upload a song"
      subtitle="Your audio → step-by-step practice"
      side="right"
    >
      {step === "input" && (
        <>
          {!engineReady && (
            <div className="panel p-4 mb-4 bg-rose-500/5 border-rose-500/20">
              <div className="text-sm font-semibold mb-1">Audio engine not connected</div>
              <div className="text-xs text-white/65 leading-relaxed">
                Set <code className="text-white/80">VITE_AUDIO_ENGINE_URL</code> to point at
                a running audio-engine (default <code>http://127.0.0.1:8001</code>) to use
                this feature. Until then, song upload is disabled.
              </div>
            </div>
          )}

          <div className="panel p-4 mb-4 bg-amber-400/5 border-amber-400/20">
            <div className="flex gap-2 items-start">
              <span className="text-lg">ℹ️</span>
              <div className="text-xs text-white/75 leading-relaxed">
                Auto-transcription accuracy depends on the source audio. Clean, single-
                instrument recordings get the best results. You can edit any step after.
              </div>
            </div>
          </div>

          <div className="flex gap-1 mb-3 p-1 rounded-lg bg-white/5 border border-white/10">
            <button
              onClick={() => setMode("file")}
              className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${mode === "file" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"}`}
            >
              📁 File
            </button>
            <button
              onClick={() => setMode("url")}
              className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${mode === "url" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"}`}
            >
              🔗 URL
            </button>
          </div>

          {mode === "file" ? (
            <>
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">
                Audio file (mp3, wav, m4a)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handlePick}
                className="hidden"
              />
              <button
                className={`w-full py-3 rounded-xl border border-dashed text-sm transition-colors ${file ? "bg-white/5 border-emerald-400/40" : "bg-white/[0.02] border-white/15 hover:bg-white/5"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {file ? <>📁 {file.name}</> : "Choose an audio file"}
              </button>
            </>
          ) : (
            <>
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">
                YouTube / SoundCloud / direct audio URL
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://…"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm"
              />
              <div className="text-[10px] text-white/40 mt-1">
                The server fetches the audio via yt-dlp (when enabled) and runs the same
                Demucs + Basic Pitch pipeline. Accuracy varies by source quality.
              </div>
            </>
          )}

          <label className="text-xs uppercase tracking-widest text-white/40 mb-2 mt-5 block">
            Simplify to level
          </label>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { n: 1, label: "L1 · melody only" },
              { n: 3, label: "L3 · + rhythm" },
              { n: 6, label: "L6 · + harmony" },
            ].map((opt) => (
              <button
                key={opt.n}
                onClick={() => setLevel(opt.n)}
                className={`py-2 px-2 rounded-lg border text-xs text-center transition-colors ${
                  level === opt.n
                    ? "bg-indigo-500/20 border-indigo-400/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            className="btn-primary w-full mt-4"
            disabled={(mode === "file" && !file) || (mode === "url" && !url.trim()) || !engineReady}
            onClick={analyze}
          >
            Analyze →
          </button>
        </>
      )}

      {step === "uploading" && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-4xl mb-4 animate-pulse">🎼</div>
          <div className="font-semibold mb-1">{progressLabel}</div>
          <div className="text-xs text-white/50 max-w-xs text-center">
            Demucs + Basic Pitch runs server-side. This can take 30–90 seconds for
            a 3-minute song.
          </div>
          <div className="mt-6 h-1 w-48 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-violet-500"
              style={{ width: "65%", transition: "width 12s linear" }}
            />
          </div>
        </div>
      )}

      {step === "error" && (
        <div className="panel p-5 bg-rose-500/5 border-rose-500/20">
          <div className="text-3xl mb-2">⚠️</div>
          <div className="font-semibold mb-1">Analysis failed</div>
          <div className="text-xs text-white/70 mb-4">{error}</div>
          <button className="btn-primary w-full" onClick={reset}>
            Try again
          </button>
        </div>
      )}

      {step === "done" && result && (
        <div>
          <div className="panel p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">✨</div>
              <div className="flex-1">
                <div className="font-semibold">Ready to play</div>
                <div className="text-xs text-white/60">
                  Simplified to L{level} · confidence{" "}
                  <span className={`font-mono ${confidenceColor}`}>{confidencePct}%</span> ·
                  {" "}{result.steps.length} steps
                </div>
              </div>
            </div>
            {result.warning && (
              <div className="text-[11px] text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-md p-2">
                {result.warning}
              </div>
            )}
          </div>

          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Steps (preview)</div>
          <div className="space-y-1.5 max-h-[45vh] overflow-y-auto scrollbar-none">
            {result.steps.slice(0, 50).map((s, i) => (
              <div key={i} className="panel p-2.5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-400/15 text-indigo-200 text-xs font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm">{s.instruction}</span>
                <span className="text-[10px] text-white/40 font-mono">
                  {Math.round(s.atMs / 1000)}s
                </span>
              </div>
            ))}
            {result.steps.length > 50 && (
              <div className="text-[11px] text-white/40 text-center pt-2">
                + {result.steps.length - 50} more steps
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-5">
            <button className="btn-ghost flex-1" onClick={reset}>Upload another</button>
            <button className="btn-primary flex-1" onClick={close}>Load into studio →</button>
          </div>
        </div>
      )}
    </SidePanel>
  );
}
