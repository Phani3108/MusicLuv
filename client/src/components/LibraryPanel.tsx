import { useAtom, useAtomValue } from "jotai";
import { libraryPanelAtom, songUploadAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { songsForInstrument } from "@catalogs/songLibraryCatalog";
import { SidePanel } from "./SidePanel";

export function LibraryPanel() {
  const [open, setOpen] = useAtom(libraryPanelAtom);
  const [, setUploadOpen] = useAtom(songUploadAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);

  if (!instrumentId) return null;
  const songs = songsForInstrument(instrumentId);

  return (
    <SidePanel open={open} onClose={() => setOpen(false)} title="Song library" subtitle="Play-alongs, curated by difficulty" side="right">
      <button
        onClick={() => { setOpen(false); setUploadOpen(true); }}
        className="w-full panel p-4 flex items-center gap-3 text-left hover:bg-white/5 mb-5 border-dashed border border-indigo-400/30"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-400/15 flex items-center justify-center text-lg">⬆️</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Upload or paste any song</div>
          <div className="text-xs text-white/55">We'll analyze it and generate step-wise instructions.</div>
        </div>
        <div className="chip bg-white/5 border border-white/10 text-white/50 text-[10px]">beta</div>
      </button>

      <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Curated for this instrument</div>
      <div className="space-y-2">
        {songs.map((s) => (
          <div key={s.id} className="panel p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">♪</div>
            <div className="flex-1">
              <div className="font-semibold text-sm leading-tight">{s.title}</div>
              <div className="text-[11px] text-white/50">{s.genre} · {s.blurb}</div>
            </div>
            <div className="chip bg-white/5 border border-white/10 text-white/70 font-mono text-[10px]">
              L{s.difficultyByInstrument[instrumentId]}
            </div>
          </div>
        ))}
      </div>
    </SidePanel>
  );
}
