import { useAtom, useAtomValue } from "jotai";
import { artistPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom, progressAtom } from "@/atoms/session";
import { artistsForInstrument, listArtists } from "@catalogs/artistCatalog";
import { SidePanel } from "./SidePanel";

export function ArtistGalleryPanel() {
  const [open, setOpen] = useAtom(artistPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);

  const primary = instrumentId ? artistsForInstrument(instrumentId) : [];
  const others  = listArtists().filter((a) => !primary.includes(a));

  const instProg = instrumentId ? progress[instrumentId] : undefined;
  const unlocked = (instProg?.lessonsCompleted.length ?? 0) >= 3;  // mock gate

  return (
    <SidePanel open={open} onClose={() => setOpen(false)} title="Genius artists" subtitle="Learn their style — unlocks from Pro tier" side="right">
      {!unlocked && (
        <div className="panel p-4 bg-amber-400/5 border-amber-400/30 mb-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔒</div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">Finish the basics first</div>
              <div className="text-xs text-white/65 leading-relaxed">
                You'll get way more out of these artists once you've passed Level 3. Browse freely — the samples work — but attempting a style path will nudge you back to fundamentals.
              </div>
            </div>
          </div>
        </div>
      )}

      {primary.length > 0 && (
        <section className="mb-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">For this instrument</div>
          <div className="grid grid-cols-2 gap-2">{primary.map((a) => <ArtistCard key={a.id} {...a} />)}</div>
        </section>
      )}

      <section>
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Explore other styles</div>
        <div className="grid grid-cols-2 gap-2">{others.map((a) => <ArtistCard key={a.id} {...a} />)}</div>
      </section>
    </SidePanel>
  );
}

function ArtistCard({ name, photoGlyph, blurb, era, styleFingerprint, unlockTier }: any) {
  return (
    <div className="panel p-3">
      <div className="text-4xl mb-2">{photoGlyph}</div>
      <div className="font-semibold text-sm leading-tight">{name}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{era}</div>
      <div className="text-[11px] text-white/55 mt-2 leading-snug line-clamp-3">{blurb}</div>
      <div className="flex flex-wrap gap-1 mt-3">
        {styleFingerprint.ornamentTags.slice(0, 2).map((t: string) => (
          <span key={t} className="chip bg-white/5 border border-white/10 text-white/60 text-[9px]">{t}</span>
        ))}
        <span className="chip bg-amber-400/10 border border-amber-400/20 text-amber-200 text-[9px] uppercase">{unlockTier}</span>
      </div>
    </div>
  );
}
