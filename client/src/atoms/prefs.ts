import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/** User preferences that persist across sessions. */
export interface UserPrefs {
  /** Show Indian svara names (Sa Re Ga) instead of Western (C D E). */
  sargamMode: boolean;
  /** Preferred metronome click sound. */
  metronomeSound: "tick" | "wood" | "beep";
  /** Enable A/B microphone noise gate. */
  micNoiseGate: boolean;
  /** Auto-play the target note in the Demo phase. */
  autoPlayDemo: boolean;
  /** Show or hide the ghost-hand overlay (advanced learners often disable at L3+). */
  showGhostHand: boolean;
  /** Haptic feedback on mobile (Capacitor wrap). */
  haptics: boolean;
  /** Reduced motion for accessibility. */
  reducedMotion: boolean;
  /** Email opt-in for product updates + recital review notifications. */
  emailOptIn: boolean;
}

const DEFAULT_PREFS: UserPrefs = {
  sargamMode: false,
  metronomeSound: "tick",
  micNoiseGate: true,
  autoPlayDemo: true,
  showGhostHand: true,
  haptics: true,
  reducedMotion: false,
  emailOptIn: true,
};

export const prefsAtom = atomWithStorage<UserPrefs>("musicluv:prefs", DEFAULT_PREFS);

/** Settings panel open state. */
export const settingsPanelAtom = atom<boolean>(false);
