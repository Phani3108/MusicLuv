import { useAtomValue } from "jotai";
import { screenAtom } from "@/atoms/session";
import { WelcomePage } from "@/pages/WelcomePage";
import { InstrumentPickerPage } from "@/pages/InstrumentPickerPage";
import { StudioPage } from "@/pages/StudioPage";
import { useBootstrapLaunchStatus } from "@/lib/launchStatus";

export default function App() {
  const screen = useAtomValue(screenAtom);

  // Fetch monetization/launch promo status once at boot so the paywall
  // middleware + plan picker can show "$7 ➜ $5 · Free for 200" correctly.
  useBootstrapLaunchStatus();

  return (
    <div className="min-h-screen text-white">
      {screen === "welcome" && <WelcomePage />}
      {screen === "picker" && <InstrumentPickerPage />}
      {screen === "studio" && <StudioPage />}
    </div>
  );
}
