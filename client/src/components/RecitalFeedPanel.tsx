import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { recitalFeedPanelAtom, recitalsFeedCacheAtom, profilePanelAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { getInstrument } from "@catalogs/instrumentCatalog";
import type { RecitalSubmission } from "@catalogs/communityTypes";

/**
 * Recital feed — public stream of learner submissions. Like "music-TikTok
 * but for real musicians." Each recital shows instrument + tier + duration +
 * like/comment counts. Tap to open detail (out of scope for scaffold).
 */
export function RecitalFeedPanel() {
  const [open, setOpen] = useAtom(recitalFeedPanelAtom);
  const [feed, setFeed] = useAtom(recitalsFeedCacheAtom);
  const [, setProfile] = useAtom(profilePanelAtom);

  useEffect(() => {
    if (!open || feed.length > 0) return;
    // Production: fetch("/api/v1/recitals?tab=feed").then(...)
    setFeed(MOCK_FEED);
  }, [open, feed.length, setFeed]);

  return (
    <SidePanel title="Recital feed" subtitle="Learners sharing their best takes" open={open} onClose={() => setOpen(false)} width="w-full md:w-[32rem]">
      <div className="space-y-3">
        {feed.map((r) => <RecitalCard key={r.id} recital={r} onOpenProfile={(uid) => { setOpen(false); setProfile(uid); }} />)}
        {feed.length === 0 && (
          <div className="text-center text-white/50 text-sm py-10">No recitals yet. Be the first to share!</div>
        )}
      </div>
    </SidePanel>
  );
}

function RecitalCard({ recital, onOpenProfile }: { recital: RecitalSubmission; onOpenProfile: (uid: string) => void }) {
  const instrument = getInstrument(recital.instrumentId);
  const tierColor = recital.tier === "genius" ? "text-amber-300" : recital.tier === "pro" ? "text-violet-300" : "text-emerald-300";
  return (
    <article className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
      <div className="aspect-video bg-ink-900 flex items-center justify-center text-4xl">{instrument?.glyph}</div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="font-semibold text-sm">{recital.title}</div>
            <button onClick={() => onOpenProfile(recital.userId)} className="text-[11px] text-white/50 hover:text-white/80">
              by {recital.userId}
            </button>
          </div>
          <span className={`text-[10px] uppercase tracking-widest ${tierColor}`}>{recital.tier}</span>
        </div>
        {recital.description && <p className="text-xs text-white/60 mb-3 line-clamp-2">{recital.description}</p>}
        <div className="flex items-center gap-4 text-[11px] text-white/50 font-mono">
          <span>🎵 {instrument?.name}</span>
          <span>⏱ {Math.floor(recital.durationSec / 60)}m{String(recital.durationSec % 60).padStart(2, "0")}s</span>
          <span>❤️ {recital.likes}</span>
          <span>💬 {recital.commentCount}</span>
        </div>
      </div>
    </article>
  );
}

const MOCK_FEED: RecitalSubmission[] = [
  { id: "r1", userId: "priya_m", instrumentId: "sitar", title: "Yaman alap — my first 10-minute take", durationSec: 612, audioUrl: "", createdAt: new Date().toISOString(), tier: "pro", likes: 42, commentCount: 7, isPublic: true, description: "Six months of L1-L6. Feedback welcome!" },
  { id: "r2", userId: "marcus_g", instrumentId: "guitar", title: "Hendrix 'Little Wing' — signature lick attempt", durationSec: 145, audioUrl: "", createdAt: new Date().toISOString(), tier: "pro", likes: 88, commentCount: 12, isPublic: true },
  { id: "r3", userId: "sofia_v", instrumentId: "vocals", title: "Nessun Dorma — Genius Cert submission", durationSec: 185, audioUrl: "", createdAt: new Date().toISOString(), tier: "genius", likes: 210, commentCount: 34, isPublic: true, reviewStatus: "approved" },
  { id: "r4", userId: "ethan_p", instrumentId: "piano", title: "Chopin Prelude Op. 28 No. 4", durationSec: 130, audioUrl: "", createdAt: new Date().toISOString(), tier: "genius", likes: 156, commentCount: 19, isPublic: true },
];
