import { type ReactNode } from "react";

/**
 * Unified async UI — picks the right child based on state.
 *
 * Usage:
 *   <AsyncBoundary
 *     status={loading ? "loading" : error ? "error" : items.length ? "ready" : "empty"}
 *     loading={<LoadingSpinner label="Fetching recitals…" />}
 *     empty={<EmptyState glyph="🎼" title="No recitals yet" body="Record your first take to see it here." />}
 *     error={<ErrorState message={error} onRetry={refetch} />}
 *   >
 *     {items.map(r => <Row key={r.id} recital={r} />)}
 *   </AsyncBoundary>
 */
export type AsyncStatus = "idle" | "loading" | "ready" | "empty" | "error";

export function AsyncBoundary({
  status,
  loading,
  empty,
  error,
  children,
}: {
  status: AsyncStatus;
  loading: ReactNode;
  empty: ReactNode;
  error: ReactNode;
  children: ReactNode;
}) {
  if (status === "loading" || status === "idle") return <>{loading}</>;
  if (status === "error") return <>{error}</>;
  if (status === "empty") return <>{empty}</>;
  return <>{children}</>;
}

export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin" />
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}

export function EmptyState({
  glyph = "🎵",
  title,
  body,
  cta,
}: {
  glyph?: string;
  title: string;
  body?: string;
  cta?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
      <div className="text-5xl opacity-70">{glyph}</div>
      <div>
        <div className="font-semibold text-white/90">{title}</div>
        {body && <div className="text-xs text-white/50 mt-1 max-w-xs">{body}</div>}
      </div>
      {cta && (
        <button
          onClick={cta.onClick}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold"
        >
          {cta.label}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
      <div className="text-4xl">⚠️</div>
      <div>
        <div className="font-semibold text-rose-300">Something went wrong</div>
        <div className="text-xs text-white/50 mt-1 max-w-sm">{message}</div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm border border-white/10"
        >
          Try again
        </button>
      )}
    </div>
  );
}
