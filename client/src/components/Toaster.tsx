import { useAtom } from "jotai";
import { toastsAtom } from "@/atoms/toasts";

/**
 * Global toast portal. Mounted once in StudioPage; renders the
 * active toast stack in the bottom-right. Respects prefs.reducedMotion
 * for users who've opted out of animations.
 */
export function Toaster() {
  const [toasts, setToasts] = useAtom(toastsAtom);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const classFor = (level: string) => {
    switch (level) {
      case "success": return "border-emerald-400/40 bg-emerald-500/10 text-emerald-50";
      case "warning": return "border-amber-400/40 bg-amber-500/10 text-amber-50";
      case "error":   return "border-rose-400/40 bg-rose-500/10 text-rose-50";
      default:        return "border-indigo-400/30 bg-indigo-500/10 text-indigo-50";
    }
  };

  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto panel p-3 border ${classFor(t.level)} shadow-xl max-w-sm`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{t.title}</div>
              {t.body && <div className="text-xs opacity-85 mt-0.5">{t.body}</div>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-white/50 hover:text-white/80 text-sm leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
