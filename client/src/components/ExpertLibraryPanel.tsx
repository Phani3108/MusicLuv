import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { expertLibraryPanelAtom, focusedExpertAtom, focusedMasterclassAtom } from "@/atoms/experts";
import { currentInstrumentAtom, currentLessonIdAtom, screenAtom } from "@/atoms/session";
import { authUserAtom, planPickerOpenAtom } from "@/atoms/billing";
import {
  listExperts, getExpert, upcomingLiveSessions,
  type Expert, type MasterclassEntry, type LiveSessionSlot,
} from "@catalogs/expertCatalog";
import { SidePanel } from "./SidePanel";
import { useToast } from "@/lib/toast";
import { MUSICLUV_SERVER_URL, serverAuthHeaders } from "@/lib/api";
import { usePaywall } from "@/lib/paywall";

/**
 * Expert Library — the "learn from experts" hub.
 *
 * Three tabs:
 *   · Experts — browse/filter by instrument, open detail modal
 *   · Masterclasses — video + notes library, tap to watch inline
 *   · Live sessions — upcoming Zoom sessions, seat-gated booking
 *
 * When a lesson is open, inline expert notes surface via
 * `ExpertNotesInline` in PhaseTeach / PhaseDemo / PhaseDissect.
 * This panel is the full-library view.
 */
export function ExpertLibraryPanel() {
  const [open, setOpen] = useAtom(expertLibraryPanelAtom);
  const [focusedId, setFocusedId] = useAtom(focusedExpertAtom);
  const [focusedMc, setFocusedMc] = useAtom(focusedMasterclassAtom);
  const currentInstrument = useAtomValue(currentInstrumentAtom);
  const [tab, setTab] = useState<"experts" | "masterclasses" | "live">("experts");
  const [instrumentFilter, setInstrumentFilter] = useState<string | null>(null);

  const focused = focusedId ? getExpert(focusedId) : null;

  const experts = useMemo(() => {
    const all = listExperts();
    const filter = instrumentFilter ?? currentInstrument;
    if (!filter) return all;
    return all.filter((e) => e.instrumentExpertise.includes(filter));
  }, [instrumentFilter, currentInstrument]);

  const allMasterclasses = useMemo(() =>
    listExperts().flatMap((e) => e.masterclasses.map((mc) => ({ expert: e, masterclass: mc }))),
  []);

  const liveSessions = useMemo(() =>
    upcomingLiveSessions(instrumentFilter ?? currentInstrument ?? undefined),
  [instrumentFilter, currentInstrument]);

  const close = () => {
    setOpen(false);
    setFocusedId(null);
  };

  return (
    <SidePanel
      open={open}
      onClose={close}
      title="Expert Library"
      subtitle="Learn from working musicians · masterclasses · live sessions"
      width="w-full md:w-[38rem]"
    >
      {!focused && !focusedMc && (
        <>
          <div className="grid grid-cols-3 gap-1 mb-4 p-1 rounded-lg bg-white/5 border border-white/10">
            <TabButton active={tab === "experts"} onClick={() => setTab("experts")}>
              👥 Experts
            </TabButton>
            <TabButton active={tab === "masterclasses"} onClick={() => setTab("masterclasses")}>
              🎬 Masterclasses
            </TabButton>
            <TabButton active={tab === "live"} onClick={() => setTab("live")}>
              🎤 Live ({liveSessions.length})
            </TabButton>
          </div>

          {currentInstrument && (
            <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
              <span>Filter:</span>
              <button
                onClick={() => setInstrumentFilter(null)}
                className={`px-2 py-0.5 rounded-full border text-[10px] ${instrumentFilter === null ? "bg-indigo-500/20 border-indigo-400/40 text-white" : "bg-white/5 border-white/10"}`}
              >
                All
              </button>
              <button
                onClick={() => setInstrumentFilter(currentInstrument)}
                className={`px-2 py-0.5 rounded-full border text-[10px] ${instrumentFilter === currentInstrument ? "bg-indigo-500/20 border-indigo-400/40 text-white" : "bg-white/5 border-white/10"}`}
              >
                {currentInstrument}
              </button>
            </div>
          )}

          {tab === "experts" && (
            <div className="space-y-2">
              {experts.map((e) => (
                <ExpertCard key={e.id} expert={e} onOpen={() => setFocusedId(e.id)} />
              ))}
              {experts.length === 0 && (
                <div className="text-xs text-white/50 text-center py-8">
                  No experts for this instrument yet — check back soon.
                </div>
              )}
            </div>
          )}

          {tab === "masterclasses" && (
            <div className="space-y-2">
              {allMasterclasses.map(({ expert, masterclass }) => (
                <MasterclassCard
                  key={masterclass.id}
                  expert={expert}
                  masterclass={masterclass}
                  onOpen={() => setFocusedMc(masterclass.id)}
                />
              ))}
            </div>
          )}

          {tab === "live" && (
            <div className="space-y-2">
              {liveSessions.map(({ expert, slot }) => (
                <LiveSessionCard key={slot.id} expert={expert} slot={slot} />
              ))}
              {liveSessions.length === 0 && (
                <div className="text-xs text-white/50 text-center py-8">
                  No live sessions on the calendar right now. Follow an expert to get notified.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {focused && !focusedMc && (
        <ExpertProfile
          expert={focused}
          onBack={() => setFocusedId(null)}
          onOpenMasterclass={(mcId) => setFocusedMc(mcId)}
          onClose={close}
        />
      )}

      {focusedMc && <MasterclassViewer masterclassId={focusedMc} onBack={() => setFocusedMc(null)} />}
    </SidePanel>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`py-1.5 text-xs rounded-md transition-colors ${active ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"}`}
    >
      {children}
    </button>
  );
}

function ExpertCard({ expert, onOpen }: { expert: Expert; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{expert.photoGlyph}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="font-semibold text-sm truncate">{expert.name}</div>
            {expert.verified && <span className="text-emerald-400 text-[10px]">✓</span>}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
            {expert.role} · {expert.origin}
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">{expert.bio}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {expert.instrumentExpertise.slice(0, 3).map((id) => (
              <span key={id} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                {id}
              </span>
            ))}
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200">
              {expert.masterclasses.length} masterclass{expert.masterclasses.length === 1 ? "" : "es"}
            </span>
            {expert.liveSessions.length > 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200">
                {expert.liveSessions.length} live
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function MasterclassCard({
  expert,
  masterclass,
  onOpen,
}: {
  expert: Expert;
  masterclass: MasterclassEntry;
  onOpen: () => void;
}) {
  const accessColor =
    masterclass.access === "free" ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/30"
    : masterclass.access === "pro" ? "text-indigo-300 bg-indigo-500/10 border-indigo-400/30"
    : "text-amber-300 bg-amber-500/10 border-amber-400/30";
  return (
    <button
      onClick={onOpen}
      className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-left"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl">🎬</span>
          <div className="font-semibold text-sm truncate">{masterclass.title}</div>
        </div>
        <span className={`shrink-0 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${accessColor}`}>
          {masterclass.access}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-white/60">
        <span>{expert.photoGlyph} {expert.name}</span>
        <span>·</span>
        <span>L{masterclass.level}</span>
        <span>·</span>
        <span>{masterclass.durationMin} min</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {masterclass.topics.slice(0, 3).map((t) => (
          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
            #{t}
          </span>
        ))}
      </div>
    </button>
  );
}

function LiveSessionCard({ expert, slot }: { expert: Expert; slot: LiveSessionSlot }) {
  const [booking, setBooking] = useState(false);
  const setBookingLiveSlot = useSetAtom(focusedExpertAtom);
  const authUser = useAtomValue(authUserAtom);
  const setAuthPanel = useSetAtom(planPickerOpenAtom);
  const toast = useToast();
  const gate = usePaywall();

  const startMs = new Date(slot.startAt).getTime();
  const delta = startMs - Date.now();
  const seatsLeft = slot.capacity - slot.seatsTaken;
  const full = seatsLeft <= 0;

  const book = async () => {
    if (!authUser) {
      toast.info("Sign in to book", "Live sessions require a free account so we can email you the Zoom link.");
      setAuthPanel(true);
      return;
    }
    if (slot.priceUsd > 0 && !gate.canAccess("live_1on1", `${slot.title} · $${slot.priceUsd}`)) {
      return;
    }
    setBooking(true);
    try {
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/live/${slot.id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({ studentId: authUser.id, meetingUrl: slot.meetingUrl ?? "" }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);
      toast.success(
        "Seat reserved",
        slot.meetingUrl
          ? "Zoom link is on your confirmation email."
          : "Link will arrive ~15 min before start (Zoom integration pending on server).",
      );
      // Kick off the consumer callback — typically refetch available slots.
      setBookingLiveSlot(null);
    } catch (e) {
      toast.error("Couldn't book", (e as Error).message);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{slot.title}</div>
          <div className="text-[11px] text-white/60 mt-0.5">
            {expert.photoGlyph} {expert.name} · L{slot.level} · {slot.durationMin} min
          </div>
        </div>
        <span className="shrink-0 text-xs font-mono">
          {slot.priceUsd === 0 ? <span className="text-emerald-300">FREE</span> : `$${slot.priceUsd}`}
        </span>
      </div>
      <div className="text-[11px] text-white/65 leading-relaxed mt-1">{slot.description}</div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-[10px] uppercase tracking-widest text-white/40">
          {new Date(slot.startAt).toLocaleString()} · {seatsLeft > 0 ? `${seatsLeft}/${slot.capacity} seats left` : "full"}
        </div>
        <button
          onClick={book}
          disabled={full || booking || delta < 0}
          className={`text-[11px] font-semibold px-3 py-1 rounded-md disabled:opacity-50 ${
            full
              ? "bg-white/5 text-white/40"
              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-ink-900"
          }`}
        >
          {full ? "Full" : booking ? "Booking…" : "Reserve seat"}
        </button>
      </div>
    </div>
  );
}

function ExpertProfile({
  expert,
  onBack,
  onOpenMasterclass,
  onClose,
}: {
  expert: Expert;
  onBack: () => void;
  onOpenMasterclass: (mcId: string) => void;
  onClose: () => void;
}) {
  const authUser = useAtomValue(authUserAtom);
  const gate = usePaywall();
  const toast = useToast();

  const bookOneOnOne = () => {
    if (!expert.acceptsOneOnOne) return;
    if (!authUser) {
      toast.info("Sign in first", "1-on-1 bookings need an account.");
      return;
    }
    if (!gate.canAccess("live_1on1", `1-on-1 with ${expert.name}`)) return;
    toast.info(
      "1-on-1 booking",
      `Email ${expert.name.split(" ")[0].toLowerCase()}@musicluv.app to schedule. Rate: $${expert.oneOnOnePriceUsdPerHour}/hr.`,
    );
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-[11px] text-white/50 hover:text-white/80">
        ← back to experts
      </button>

      <div className="flex items-start gap-4">
        <div className="text-6xl">{expert.photoGlyph}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="display text-2xl font-semibold">{expert.name}</h2>
            {expert.verified && <span className="text-emerald-400 text-sm">✓</span>}
          </div>
          <div className="text-[11px] uppercase tracking-widest text-white/50 mt-1">
            {expert.role} · {expert.origin}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {expert.instrumentExpertise.map((id) => (
              <span key={id} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">
                {id}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-white/80 leading-relaxed">{expert.bio}</p>

      {expert.credentials.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Credentials</div>
          <ul className="space-y-0.5">
            {expert.credentials.map((c, i) => (
              <li key={i} className="text-xs text-white/75">
                · {c.label}
                {c.year && <span className="text-white/40"> ({c.year})</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {expert.masterclasses.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Masterclasses</div>
          <div className="space-y-2">
            {expert.masterclasses.map((mc) => (
              <MasterclassCard
                key={mc.id}
                expert={expert}
                masterclass={mc}
                onOpen={() => onOpenMasterclass(mc.id)}
              />
            ))}
          </div>
        </section>
      )}

      {expert.liveSessions.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Upcoming live sessions</div>
          <div className="space-y-2">
            {expert.liveSessions.map((slot) => (
              <LiveSessionCard key={slot.id} expert={expert} slot={slot} />
            ))}
          </div>
        </section>
      )}

      {expert.acceptsOneOnOne && (
        <section className="panel p-4 bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-400/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-indigo-300 mb-0.5">
                1-on-1 coaching
              </div>
              <div className="text-sm font-semibold">Work directly with {expert.name.split(" ")[0]}</div>
              <div className="text-[11px] text-white/65 leading-relaxed mt-1">
                Private session — they review your last attempt + tune one technique.
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-lg font-semibold">${expert.oneOnOnePriceUsdPerHour}</div>
              <div className="text-[10px] text-white/40">per hour</div>
            </div>
          </div>
          <button
            onClick={bookOneOnOne}
            className="w-full mt-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold"
          >
            Request 1-on-1 →
          </button>
        </section>
      )}

      <div className="pt-2 text-center">
        <button onClick={onClose} className="text-[11px] text-white/40 hover:text-white/60">
          close library
        </button>
      </div>
    </div>
  );
}

function MasterclassViewer({ masterclassId, onBack }: { masterclassId: string; onBack: () => void }) {
  const setFocusedMc = useSetAtom(focusedMasterclassAtom);
  const setFocusedExpert = useSetAtom(focusedExpertAtom);
  const setScreen = useSetAtom(screenAtom);
  const setCurrentLesson = useSetAtom(currentLessonIdAtom);
  const setCurrentInstrument = useSetAtom(currentInstrumentAtom);

  // Find the masterclass across all experts.
  const found = listExperts().flatMap((e) =>
    e.masterclasses.filter((mc) => mc.id === masterclassId).map((mc) => ({ expert: e, masterclass: mc })),
  )[0];

  if (!found) return (
    <div className="text-center py-8 text-white/50">
      Masterclass not found.
      <button onClick={onBack} className="block mx-auto mt-4 btn-ghost">← back</button>
    </div>
  );

  const { expert, masterclass } = found;

  const openLinkedLesson = (lessonId: string) => {
    // Find the instrument for this lesson.
    const inst = lessonId.split("_")[0];
    setCurrentInstrument(inst);
    setCurrentLesson(lessonId);
    setScreen("studio");
    setFocusedMc(null);
  };

  return (
    <div className="space-y-3">
      <button onClick={onBack} className="text-[11px] text-white/50 hover:text-white/80">
        ← back to library
      </button>

      <div className="aspect-video rounded-xl bg-gradient-to-br from-ink-800 to-ink-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
        {masterclass.videoUrl ? (
          <video controls className="w-full h-full object-cover" src={masterclass.videoUrl} />
        ) : masterclass.audioUrl ? (
          <div className="w-full p-6 flex flex-col items-center justify-center gap-3">
            <div className="text-4xl">🎬</div>
            <audio controls src={masterclass.audioUrl} className="w-full" />
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="text-4xl mb-2">🎬</div>
            <div className="font-semibold">Video coming soon</div>
            <div className="text-[11px] text-white/50 mt-1 max-w-xs">
              Notes below capture the masterclass content while the recording is being produced.
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="display text-xl font-semibold">{masterclass.title}</h2>
        <button
          onClick={() => { setFocusedMc(null); setFocusedExpert(expert.id); }}
          className="text-[11px] text-indigo-300 hover:text-indigo-200 mt-1"
        >
          {expert.photoGlyph} {expert.name} · view profile →
        </button>
        <div className="flex flex-wrap gap-1 mt-2">
          {masterclass.topics.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {masterclass.notesMarkdown && (
        <article className="panel p-4 bg-white/[0.02]">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Masterclass notes</div>
          <div className="prose prose-invert prose-sm max-w-none whitespace-pre-line text-white/85 leading-relaxed">
            {masterclass.notesMarkdown}
          </div>
        </article>
      )}

      {masterclass.linkedLessonIds.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Practice in the linked lesson</div>
          <div className="space-y-1.5">
            {masterclass.linkedLessonIds.map((lid) => (
              <button
                key={lid}
                onClick={() => openLinkedLesson(lid)}
                className="w-full p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-left text-xs"
              >
                <span className="font-mono text-white/80">{lid}</span>
                <span className="text-white/40"> · open in studio →</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
