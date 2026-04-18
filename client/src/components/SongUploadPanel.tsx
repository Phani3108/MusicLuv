import { useState } from "react";
import { useAtom } from "jotai";
import { songUploadAtom } from "@/atoms/panels";
import { SidePanel } from "./SidePanel";

type Step = "input" | "separating" | "transcribing" | "done";

export function SongUploadPanel() {
  const [open, setOpen] = useAtom(songUploadAtom);
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");

  const go = async () => {
    setStep("separating");
    await new Promise((r) => setTimeout(r, 1400));
    setStep("transcribing");
    await new Promise((r) => setTimeout(r, 1600));
    setStep("done");
  };

  const reset = () => { setStep("input"); setUrl(""); };

  return (
    <SidePanel
      open={open}
      onClose={() => { setOpen(false); reset(); }}
      title="Upload a song"
      subtitle="URL or MP3 → step-by-step instructions"
      side="right"
    >
      {step === "input" && (
        <>
          <div className="panel p-4 mb-4 bg-amber-400/5 border-amber-400/20">
            <div className="flex gap-2 items-start">
              <span className="text-lg">⚠️</span>
              <div className="text-xs text-white/70 leading-relaxed">
                Auto-transcription accuracy varies with audio quality. You can edit any step after.
                <br />
                <span className="text-white/40">This is a mock — no real upload happens.</span>
              </div>
            </div>
          </div>

          <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Paste a URL</label>
          <input
            value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-indigo-400/50"
          />

          <div className="text-center text-xs text-white/40 mb-4">— or —</div>

          <button className="btn-ghost w-full mb-4" onClick={() => alert("Mock: file picker would open")}>
            📁 Choose a file
          </button>

          <button className="btn-primary w-full" disabled={!url} onClick={go}>
            Analyze →
          </button>
        </>
      )}

      {(step === "separating" || step === "transcribing") && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-4xl mb-4 animate-pulse-soft">
            {step === "separating" ? "🎚️" : "🎼"}
          </div>
          <div className="font-semibold mb-1">
            {step === "separating" ? "Separating stems…" : "Transcribing…"}
          </div>
          <div className="text-xs text-white/50 max-w-xs text-center">
            {step === "separating" ? "Isolating piano from drums, bass, vocals (Demucs)"
                                   : "Converting audio to note events (Basic Pitch)"}
          </div>
          <div className="mt-6 h-1 w-48 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 animate-pulse-soft" style={{ width: "70%" }} />
          </div>
        </div>
      )}

      {step === "done" && (
        <div>
          <div className="panel p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">✨</div>
              <div>
                <div className="font-semibold">Ready to play</div>
                <div className="text-xs text-white/50">Simplified to your level (L1–2) · avg confidence 0.73</div>
              </div>
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Steps (preview)</div>
          <div className="space-y-1.5">
            {["Press C4 · hold 1s", "Press E4 · short", "Press G4 · short", "Press E4 · short",
              "Press C4 · 2 beats", "Press D4 · short", "Press F4 · short", "Press A4 · short"].map((s, i) => (
              <div key={i} className="panel p-2.5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-400/15 text-indigo-200 text-xs font-mono flex items-center justify-center">{i + 1}</span>
                <span className="text-sm">{s}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-5" onClick={reset}>Load into studio →</button>
        </div>
      )}
    </SidePanel>
  );
}
