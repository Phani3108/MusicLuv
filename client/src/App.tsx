import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { screenAtom, userAtom } from "@/atoms/session";
import { WelcomePage } from "@/pages/WelcomePage";
import { MicCheckPage } from "@/pages/MicCheckPage";
import { InstrumentPickerPage } from "@/pages/InstrumentPickerPage";
import { StudioPage } from "@/pages/StudioPage";
import { useBootstrapLaunchStatus } from "@/lib/launchStatus";

export default function App() {
  const [screen, setScreen] = useAtom(screenAtom);
  const user = useAtomValue(userAtom);

  // Fetch monetization/launch promo status once at boot so the paywall
  // middleware + plan picker can show "$7 ➜ $5 · Free for 200" correctly.
  useBootstrapLaunchStatus();

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
