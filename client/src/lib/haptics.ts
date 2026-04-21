/**
 * Haptic feedback helper. Respects the user's `haptics` preference and
 * the OS-level Vibration API availability. No-op on desktop or when
 * disabled.
 */
import { getDefaultStore } from "jotai";
import { prefsAtom } from "@/atoms/prefs";

export function haptic(pattern: number | number[] = 15): void {
  try {
    const prefs = getDefaultStore().get(prefsAtom);
    if (!prefs.haptics) return;
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    navigator.vibrate(pattern);
  } catch {
    // ignore — haptics are non-critical
  }
}
