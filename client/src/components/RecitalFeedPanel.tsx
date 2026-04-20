import { useAtom, useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { recitalFeedPanelAtom, recitalsFeedCacheAtom, profilePanelAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { fetchRecitalFeed, likeRecital as apiLikeRecital } from "@/lib/communityApi";
import { MUSICLUV_SERVER_URL } from "@/lib/api";
import { getInstrument } from "@catalogs/instrumentCatalog";
import type { RecitalSubmission } from "@catalogs/communityTypes";

/**
 * Recital feed — public stream of learner submissions. Reads from
 * /api/v1/recitals via useAsync + AsyncBoundary; shows loading/empty/error
 * states properly. Like button hits /recitals/:id/like and optimistically
 * updates the cached feed.
 */
export function RecitalFeedPanel() {
  const [open, setOpen] = useAtom(recitalFeedPanelAtom);
  const [, setProfile] = useAtom(profilePanelAtom);
  const [, setFeedCache] = useAtom(recitalsFeedCacheAtom);
  const [liking, setLiking] = useState<Record<string, boolean>>({});

  // Don't fetch until the panel opens; refetch when it reopens.
  const { status, data, error, refetch } = useAsync<RecitalSubmission[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured (VITE_SERVER_URL)");
      const list = await fetchRecitalFeed();
      setFeedCache(list);
      return list;
    },
    [open],
    { isEmpty: (r) => r.length === 0 },
  );

  const items = data ?? [];
  const handleLike = async (id: string) => {
    if (liking[id]) return;
    setLiking((p) => ({ ...p, [id]: true }));
    try {
      const updated = await apiLikeRecital(id);
      setFeedCache((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      // keep quiet — next refetch will reconcile
    } finally {
      setLiking((p) => ({ ...p, [id]: false }));
    }
  };

  const handleOpenProfile = (uid: string) => {
    setOpen(false);
    setProfile(uid);
  };

  const body = useMemo(
    () => (
      <AsyncBoundary
        status={open ? status : "idle"}
        loading={<LoadingSpinner label="Loading recitals…" />}
        empty={
          <EmptyState
            glyph="🎼"
            title="No recitals yet"
            body="When learners share takes, they'll appear here. Be the first — record your best lesson attempt and submit it."
          />
        }
        error={<ErrorState message={error ?? "Unable to load feed."} onRetry={refetch} />}
      >
        <div className="space-y-3">
          {items.map((r) => (
            <RecitalCard
              key={r.id}
              recital={r}
              liking={Boolean(liking[r.id])}
              onLike={() => handleLike(r.id)}
              onOpenProfile={handleOpenProfile}
            />
          ))}
        </div>
      </AsyncBoundary>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, status, error, items, liking],
  );

  return (
    <SidePanel
      title="Recital feed"
      subtitle="Learners sharing their best takes"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[32rem]"
    >
      {body}
    </SidePanel>
  );
}

function RecitalCard({
  recital,
  liking,
  onLike,
  onOpenProfile,
}: {
  recital: RecitalSubmission;
  liking: boolean;
  onLike: () => void;
  onOpenProfile: (uid: string) => void;
}) {
  const instrument = getInstrument(recital.instrumentId);
  const tierColor =
    recital.tier === "genius"
      ? "text-amber-300"
      : recital.tier === "pro"
      ? "text-violet-300"
      : "text-emerald-300";
  return (
    <article className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
      <div className="aspect-video bg-ink-900 flex items-center justify-center text-4xl">
        {instrument?.glyph ?? "🎵"}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{recital.title}</div>
            <button
              onClick={() => onOpenProfile(recital.userId)}
              className="text-[11px] text-white/50 hover:text-white/80"
            >
              by {recital.userId}
            </button>
          </div>
          <span className={`text-[10px] uppercase tracking-widest flex-shrink-0 ${tierColor}`}>
            {recital.tier}
          </span>
        </div>
        {recital.description && (
          <p className="text-xs text-white/60 mb-3 line-clamp-2">{recital.description}</p>
        )}
        <div className="flex items-center gap-4 text-[11px] text-white/50 font-mono">
          <span>🎵 {instrument?.name}</span>
          <span>
            ⏱ {Math.floor(recital.durationSec / 60)}m
            {String(recital.durationSec % 60).padStart(2, "0")}s
          </span>
          <button
            onClick={onLike}
            disabled={liking}
            className="hover:text-rose-300 disabled:opacity-50 transition-colors"
          >
            ❤️ {recital.likes}
          </button>
          <span>💬 {recital.commentCount}</span>
        </div>
      </div>
    </article>
  );
}
