import { useAtomValue } from "jotai";
import { currentInstrumentAtom } from "@/atoms/session";
import { TopBar } from "@/components/TopBar";
import { NavDrawer } from "@/components/NavDrawer";
import { LessonPhaseRunner } from "@/components/LessonPhaseRunner";
import { LessonPanel } from "@/components/LessonPanel";
import { MentorChatPanel } from "@/components/MentorChatPanel";
import { ProgressPanel } from "@/components/ProgressPanel";
import { QuestsPanel } from "@/components/QuestsPanel";
import { LibraryPanel } from "@/components/LibraryPanel";
import { ArtistGalleryPanel } from "@/components/ArtistGalleryPanel";
import { SongUploadPanel } from "@/components/SongUploadPanel";
import { GradingResultModal } from "@/components/GradingResultModal";
import { DissectionOverlay } from "@/components/DissectionOverlay";
import { PaywallModal } from "@/components/PaywallModal";
import { PlanPickerPanel } from "@/components/PlanPickerPanel";
import { AuthPanel } from "@/components/AuthPanel";
import { RecitalFeedPanel } from "@/components/RecitalFeedPanel";
import { ProfilePanel } from "@/components/ProfilePanel";
import { TeacherDashboardPanel } from "@/components/TeacherDashboardPanel";
import { CreatorPortalPanel } from "@/components/CreatorPortalPanel";
import { ProctoredExamPanel } from "@/components/ProctoredExamPanel";
import { OnboardingTour } from "@/components/OnboardingTour";
import { SettingsPanel } from "@/components/SettingsPanel";

export function StudioPage() {
  const instrumentId = useAtomValue(currentInstrumentAtom);
  if (!instrumentId) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 relative px-4 md:px-8 py-6 md:py-10 grid-dots">
        <div className="max-w-5xl mx-auto">
          <LessonPhaseRunner />
        </div>
        <LessonPanel />
        <MentorChatPanel />
        <ProgressPanel />
        <QuestsPanel />
        <LibraryPanel />
        <ArtistGalleryPanel />
        <SongUploadPanel />
        <GradingResultModal />
        <DissectionOverlay />
        <PlanPickerPanel />
        <AuthPanel />
        <PaywallModal />
        <RecitalFeedPanel />
        <ProfilePanel />
        <TeacherDashboardPanel />
        <CreatorPortalPanel />
        <ProctoredExamPanel />
        <OnboardingTour />
        <SettingsPanel />
        <NavDrawer />
      </main>
    </div>
  );
}
