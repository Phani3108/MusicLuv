import { useAtomValue } from "jotai";
import { currentInstrumentAtom } from "@/atoms/session";
import { TopBar } from "@/components/TopBar";
import { PracticeStudio } from "@/components/PracticeStudio";
import { LessonPanel } from "@/components/LessonPanel";
import { MentorChatPanel } from "@/components/MentorChatPanel";
import { ProgressPanel } from "@/components/ProgressPanel";
import { QuestsPanel } from "@/components/QuestsPanel";
import { LibraryPanel } from "@/components/LibraryPanel";
import { ArtistGalleryPanel } from "@/components/ArtistGalleryPanel";
import { SongUploadPanel } from "@/components/SongUploadPanel";
import { GradingResultModal } from "@/components/GradingResultModal";
import { DissectionOverlay } from "@/components/DissectionOverlay";

export function StudioPage() {
  const instrumentId = useAtomValue(currentInstrumentAtom);
  if (!instrumentId) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 relative">
        <PracticeStudio />
        <LessonPanel />
        <MentorChatPanel />
        <ProgressPanel />
        <QuestsPanel />
        <LibraryPanel />
        <ArtistGalleryPanel />
        <SongUploadPanel />
        <GradingResultModal />
        <DissectionOverlay />
      </main>
    </div>
  );
}
