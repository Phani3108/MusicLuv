import { useAtom, useAtomValue } from "jotai";
import {
  lessonPanelAtom, mentorPanelAtom, progressPanelAtom,
  questsPanelAtom, libraryPanelAtom, artistPanelAtom, songUploadAtom,
} from "@/atoms/panels";
import { navDrawerOpenAtom } from "@/atoms/session";
import { currentInstrumentAtom, progressAtom, userAtom } from "@/atoms/session";
import { authUserAtom, subscriptionAtom, planPickerOpenAtom, authPanelOpenAtom, launchStatusAtom } from "@/atoms/billing";
import {
  recitalFeedPanelAtom, profilePanelAtom, teacherDashboardPanelAtom,
  creatorPortalPanelAtom, proctoredExamPanelAtom, liveLessonsPanelAtom,
  compositionReviewPanelAtom,
} from "@/atoms/community";
import { settingsPanelAtom } from "@/atoms/prefs";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { tierForXp } from "@catalogs/tierCatalog";
import { getPlan } from "@catalogs/planCatalog";

/**
 * Grouped drawer navigation — replaces the 7-button TopBar clutter.
 * Groups panels by user intent:
 *   - LEARN: lesson (the only thing you open during active practice)
 *   - COACHING: mentor
 *   - PROGRESS: your stats, quests, certificates
 *   - DISCOVER: songs, artists, upload
 * Plus a compact user stats block at the top.
 */
export function NavDrawer() {
  const [open, setOpen] = useAtom(navDrawerOpenAtom);
  const user = useAtomValue(userAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);
  const instrument = instrumentId ? getInstrument(instrumentId) : null;
  const instProg = instrumentId ? progress[instrumentId] : undefined;
  const tier = tierForXp(instProg?.xp ?? 0);

  const [, setLessonOpen]   = useAtom(lessonPanelAtom);
  const [, setMentorOpen]   = useAtom(mentorPanelAtom);
  const [, setProgressOpen] = useAtom(progressPanelAtom);
  const [, setQuestsOpen]   = useAtom(questsPanelAtom);
  const [, setLibraryOpen]  = useAtom(libraryPanelAtom);
  const [, setArtistOpen]   = useAtom(artistPanelAtom);
  const [, setSongOpen]     = useAtom(songUploadAtom);
  const authUser = useAtomValue(authUserAtom);
  const sub = useAtomValue(subscriptionAtom);
  const [, setPlanPicker] = useAtom(planPickerOpenAtom);
  const [, setAuthPanel] = useAtom(authPanelOpenAtom);
  const [, setRecitalFeed] = useAtom(recitalFeedPanelAtom);
  const [, setProfile] = useAtom(profilePanelAtom);
  const [, setTeacherDash] = useAtom(teacherDashboardPanelAtom);
  const [, setCreatorPortal] = useAtom(creatorPortalPanelAtom);
  const [, setProctoredExam] = useAtom(proctoredExamPanelAtom);
  const [, setLiveLessons] = useAtom(liveLessonsPanelAtom);
  const [, setCompositionReview] = useAtom(compositionReviewPanelAtom);
  const [, setSettings] = useAtom(settingsPanelAtom);
  const launch = useAtomValue(launchStatusAtom);
  const plan = getPlan(sub.plan);
  const promoActive = !launch.active;

  const openPanel = (setter: (v: boolean) => void) => {
    setter(true);
    setOpen(false);
  };

  if (!instrument) return null;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[22rem] max-w-full z-[55] p-3 md:p-5
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="panel h-full flex flex-col overflow-hidden">
          {/* User + instrument header */}
          <div className="p-5 pb-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{instrument.glyph}</div>
                <div>
                  <div className="display text-lg font-semibold">{instrument.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    L{tier.levelId} · {tier.label}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
              >✕</button>
            </div>

            {/* Compact stat pills */}
            <div className="grid grid-cols-3 gap-2">
              <StatPill glyph="🔥" label="streak" value={user?.currentStreak ?? 0} />
              <StatPill glyph="❤️" label="hearts"  value={`${user?.heartsToday ?? 0}/${user?.heartsMax ?? 5}`} />
              <StatPill glyph="⚡" label="XP"      value={user?.totalXp ?? 0} />
            </div>
          </div>

          {/* Navigation groups */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-none space-y-5">
            <NavGroup label="Learn">
              <NavItem glyph="📖" title="Current lesson" onClick={() => openPanel(setLessonOpen)} />
              <NavItem glyph="💬" title="Ask your mentor" subtitle="Real-time coaching" onClick={() => openPanel(setMentorOpen)} />
            </NavGroup>

            <NavGroup label="Progress">
              <NavItem glyph="📈" title="Progress + certificates" subtitle="Your tier ladder + XP" onClick={() => openPanel(setProgressOpen)} />
              <NavItem glyph="⚔️" title="Quests" subtitle="Daily + mastery challenges" onClick={() => openPanel(setQuestsOpen)} />
            </NavGroup>

            <NavGroup label="Discover">
              <NavItem glyph="🎵" title="Song library" subtitle="Curated play-alongs" onClick={() => openPanel(setLibraryOpen)} />
              <NavItem glyph="⭐" title="Genius artists" subtitle="Study Hendrix, Ravi, Rahman…" onClick={() => openPanel(setArtistOpen)} />
              <NavItem glyph="⬆️" title="Upload a song" subtitle="Analyze → step-by-step" onClick={() => openPanel(setSongOpen)} />
            </NavGroup>

            <NavGroup label="Community">
              <NavItem glyph="🎼" title="Recital feed" subtitle="Learners sharing best takes" onClick={() => { setRecitalFeed(true); setOpen(false); }} />
              <NavItem glyph="👥" title="My profile" subtitle="Your public page" onClick={() => { if (authUser) { setProfile(authUser.id); setOpen(false); } else { setAuthPanel(true); setOpen(false); } }} />
              <NavItem glyph="🏆" title="Proctored exams" subtitle="Official certificate testing" onClick={() => { setProctoredExam(true); setOpen(false); }} />
              <NavItem glyph="🎤" title="Live 1-on-1 lessons" subtitle="Book a private session with a teacher" onClick={() => { setLiveLessons(true); setOpen(false); }} />
              <NavItem glyph="🎼" title="Composition review" subtitle="Submit an original for human review" onClick={() => { setCompositionReview(true); setOpen(false); }} />
              {authUser && <NavItem glyph="🎓" title="Teach" subtitle="Dashboard for teachers" onClick={() => { setTeacherDash(true); setOpen(false); }} />}
              {authUser && sub.plan === "genius" && <NavItem glyph="✍️" title="Creator portal" subtitle="Author lessons + earn" onClick={() => { setCreatorPortal(true); setOpen(false); }} />}
            </NavGroup>

            <NavGroup label="Preferences">
              <NavItem glyph="⚙️" title="Settings" subtitle="Sargam mode, mic, accessibility…" onClick={() => openPanel(setSettings)} />
            </NavGroup>

            <NavGroup label="Account">
              {authUser ? (
                <>
                  <NavItem glyph="👤" title={authUser.displayName} subtitle={authUser.email} onClick={() => {}} />
                  <NavItem
                    glyph={promoActive ? "🎁" : sub.plan === "genius" ? "💎" : sub.plan === "pro" ? "⚡" : "🎁"}
                    title={promoActive ? "Launch seat · free" : `${plan.label} plan`}
                    subtitle={
                      promoActive
                        ? `${launch.seatsRemaining}/${launch.maxFreeUsers} seats left · day ${launch.daysElapsed}/${launch.maxFreeDays}`
                        : sub.plan === "free"
                        ? "Upgrade for L4+ content"
                        : sub.status === "trialing"
                        ? "7-day trial"
                        : "Active"
                    }
                    onClick={() => openPanel(setPlanPicker)}
                  />
                </>
              ) : (
                <>
                  <NavItem glyph="🔑" title="Sign in" subtitle="Sync across devices" onClick={() => openPanel(setAuthPanel)} />
                  <NavItem
                    glyph="🎁"
                    title={promoActive ? "Claim free seat" : "See plans"}
                    subtitle={promoActive ? `Free for first ${launch.maxFreeUsers} users` : "Free · Pro · Genius"}
                    onClick={() => openPanel(setPlanPicker)}
                  />
                </>
              )}
            </NavGroup>
          </div>

          {/* Footer */}
          <div className="border-t border-white/5 p-4 text-[10px] text-white/30 text-center font-mono">
            MusicLuv · v0.1 Phase 3
          </div>
        </div>
      </aside>
    </>
  );
}

function StatPill({ glyph, label, value }: { glyph: string; label: string; value: number | string }) {
  return (
    <div className="panel p-2.5 text-center bg-white/[0.02]">
      <div className="text-base">{glyph}</div>
      <div className="font-mono text-sm font-semibold mt-0.5">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-white/40">{label}</div>
    </div>
  );
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 px-1">{label}</div>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function NavItem({ glyph, title, subtitle, onClick }: { glyph: string; title: string; subtitle?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors text-left"
    >
      <span className="text-xl">{glyph}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && <div className="text-[11px] text-white/50 truncate">{subtitle}</div>}
      </div>
      <span className="text-white/30">›</span>
    </button>
  );
}
