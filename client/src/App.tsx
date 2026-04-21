import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { screenAtom, userAtom } from "@/atoms/session";
import { authUserAtom } from "@/atoms/billing";
import { prefsAtom } from "@/atoms/prefs";
import { WelcomePage } from "@/pages/WelcomePage";
import { MicCheckPage } from "@/pages/MicCheckPage";
import { InstrumentPickerPage } from "@/pages/InstrumentPickerPage";
import { StudioPage } from "@/pages/StudioPage";
import { useBootstrapLaunchStatus } from "@/lib/launchStatus";
import { absorbOAuthCallback, getStoredSession } from "@/lib/supabase";

export default function App() {
  const [screen, setScreen] = useAtom(screenAtom);
  const user = useAtomValue(userAtom);
  const setAuthUser = useSetAtom(authUserAtom);
  const prefs = useAtomValue(prefsAtom);

  // Wire reducedMotion preference + OS-level prefers-reduced-motion.
  // Adds/removes a `reduced-motion` class on <html> so animations can
  // be globally suppressed via CSS when the user opts out.
  useEffect(() => {
    const root = document.documentElement;
    const osPrefers = typeof window !== "undefined"
      && typeof window.matchMedia === "function"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefs.reducedMotion || osPrefers) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, [prefs.reducedMotion]);

  // Fetch monetization/launch promo status once at boot so the paywall
  // middleware + plan picker can show "$7 ➜ $5 · Free for 200" correctly.
  useBootstrapLaunchStatus();

  // On boot: (1) absorb Supabase OAuth redirect fragment into the auth
  // store; (2) hydrate authUserAtom from the persisted Supabase session
  // so refresh doesn't sign the user out.
  useEffect(() => {
    const fromRedirect = absorbOAuthCallback();
    const session = fromRedirect ?? getStoredSession();
    if (session) {
      setAuthUser({
        id: session.user.id,
        email: session.user.email,
        displayName: session.user.displayName,
        avatarUrl: session.user.avatarUrl,
        authProvider: session.user.provider,
      });
    }
  }, [setAuthUser]);

  // First-time routing: if the user is already onboarded, don't bounce
  // them through Welcome on every reload. Jump straight to studio.
  useEffect(() => {
    if (screen === "welcome" && user?.onboardedAt) {
      setScreen("studio");
    }
  }, [screen, user, setScreen]);

  return (
    <div className="min-h-screen text-white">
      {screen === "welcome" && <WelcomePage />}
      {screen === "mic_check" && <MicCheckPage />}
      {screen === "picker" && <InstrumentPickerPage />}
      {screen === "studio" && <StudioPage />}
    </div>
  );
}
