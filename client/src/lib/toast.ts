import { useSetAtom } from "jotai";
import { toastsAtom, type Toast } from "@/atoms/toasts";

/**
 * Toast helper — `const toast = useToast()` → `toast.success("Copied")`.
 * Automatically generates an id + triggers auto-dismiss via the Toaster
 * component. All alert() calls across the app route through this hook.
 */
export function useToast() {
  const setToasts = useSetAtom(toastsAtom);

  const push = (t: Omit<Toast, "id">) => {
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const toast: Toast = { id, durationMs: 4000, ...t };
    setToasts((prev) => [...prev, toast]);
    if (toast.durationMs && toast.durationMs > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, toast.durationMs);
    }
    return id;
  };

  return {
    push,
    info: (title: string, body?: string) => push({ level: "info", title, body }),
    success: (title: string, body?: string) => push({ level: "success", title, body }),
    warning: (title: string, body?: string) => push({ level: "warning", title, body }),
    error: (title: string, body?: string) => push({ level: "error", title, body, durationMs: 7000 }),
  };
}
