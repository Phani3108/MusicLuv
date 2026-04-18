import { useAtomValue } from "jotai";
import { screenAtom } from "@/atoms/session";
import { WelcomePage } from "@/pages/WelcomePage";
import { InstrumentPickerPage } from "@/pages/InstrumentPickerPage";
import { StudioPage } from "@/pages/StudioPage";

export default function App() {
  const screen = useAtomValue(screenAtom);

  return (
    <div className="min-h-screen text-white">
      {screen === "welcome" && <WelcomePage />}
      {screen === "picker" && <InstrumentPickerPage />}
      {screen === "studio" && <StudioPage />}
    </div>
  );
}
