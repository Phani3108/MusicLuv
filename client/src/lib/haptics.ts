/**
 * Haptic feedback helper. Respects the user's `haptics` preference and
 * the platform's haptic capability. On Capacitor builds (iOS/Android),
 * prefers the @capacitor/haptics plugin for richer feedback styles
 * (Light / Medium / Heavy + Success / Warning / Error). On web, falls
 * back to navigator.vibrate. No-op on desktop.
 *
 * The Capacitor plugin is loaded via dynamic import so the bundle stays
 * tree-shakable on web-only builds.
 */
import { getDefaultStore } from "jotai";
import { prefsAtom } from "@/atoms/prefs";

export type HapticIntent =
  | "light"      // tap a button, drill cue
  | "medium"     // engagement gate cleared, level up
  | "heavy"      // cert earned, streak milestone
  | "success"    // attempt passed
  | "warning"    // pitch off-target
  | "error";     // attempt failed badly

/** Cached Capacitor haptics module — null = not on Capacitor. */
let capacitorHaptics: any = null;
let capacitorHapticsResolved = false;

async function getCapacitorHaptics(): Promise<any> {
  if (capacitorHapticsResolved) return capacitorHaptics;
  capacitorHapticsResolved = true;
  // Detect Capacitor environment without importing the SDK on web
  // (where the plugin doesn't exist).
  const isCap = typeof (window as any)?.Capacitor?.isNativePlatform === "function"
    && (window as any).Capacitor.isNativePlatform();
  if (!isCap) return null;
  try {
    // Lazy import — only loaded on native shells. Constructed dynamically
    // so the TypeScript checker doesn't try to resolve the optional
    // native package, and Vite leaves the import alone for the bundler.
    const moduleName = "@capacitor/haptics";
    const mod = await import(/* @vite-ignore */ moduleName);
    capacitorHaptics = mod;
    return mod;
  } catch {
    return null;
  }
}

/** Web Vibration fallback patterns per intent (ms). */
const WEB_PATTERNS: Record<HapticIntent, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 35,
  success: [12, 30, 12],
  warning: [25, 60, 25],
  error: [40, 60, 40, 60, 40],
};

/**
 * Trigger haptic feedback. Prefers Capacitor's native haptics on iOS /
 * Android (smoother, more nuanced); falls back to navigator.vibrate on
 * web. Silent if the user disabled haptics in Settings or the platform
 * has no haptic capability.
 *
 * Backwards-compatible signature: `haptic()` and `haptic(15)` still
 * work. Pass an intent string for richer feedback on native shells.
 */
export function haptic(intentOrPattern: HapticIntent | number | number[] = "light"): void {
  try {
    const prefs = getDefaultStore().get(prefsAtom);
    if (!prefs.haptics) return;

    const intent: HapticIntent =
      typeof intentOrPattern === "string" ? intentOrPattern : "light";
    const webPattern: number | number[] =
      typeof intentOrPattern === "string"
        ? WEB_PATTERNS[intentOrPattern]
        : intentOrPattern;

    void getCapacitorHaptics().then((mod) => {
      if (mod) {
        // Native: dispatch the right plugin call per intent.
        try {
          if (intent === "success" || intent === "warning" || intent === "error") {
            mod.Haptics.notification({ type: intent.toUpperCase() });
          } else {
            mod.Haptics.impact({ style: intent.toUpperCase() });
          }
          return;
        } catch {
          // fall through to web vibration
        }
      }
      // Web fallback.
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(webPattern);
      }
    });
  } catch {
    // ignore — haptics are non-critical
  }
}
