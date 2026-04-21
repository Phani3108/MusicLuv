import { atom } from "jotai";

/**
 * Lightweight toast system. Components call useToast().push(...) and
 * the Toaster portal (mounted once in StudioPage) renders the stack.
 * Replaces alert() for production polish.
 */
export interface Toast {
  id: string;
  level: "info" | "success" | "warning" | "error";
  title: string;
  body?: string;
  durationMs?: number;
}

export const toastsAtom = atom<Toast[]>([]);
