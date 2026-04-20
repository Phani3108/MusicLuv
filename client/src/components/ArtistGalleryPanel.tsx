import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { artistPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom, currentLessonIdAtom, progressAtom, screenAtom } from "@/atoms/session";
import { artistsForInstrument, listArtists } from "@catalogs/artistCatalog";
import { getExercise } from "@catalogs/exerciseCatalog";
import { LESSONS } from "@catalogs/lessonCatalog";
import type { Artist, Lesson } from "@catalogs/types";
import { SidePanel } from "./SidePanel";
import { playNote, unlockAudio } from "@/audio/instrumentSampler";
import { MUSICLUV_SERVER_URL, serverAuthHeaders } from "@/lib/api";
import { livePitchHzAtom, livePitchCentsAtom, lastGradeAtom } from "@/atoms/practice";

/**
 * Artist gallery. Tap an artist to open a demo modal that:
 *   1. Plays the first signature lick through the real instrument sampler
 *   2. Shows every lick with a "Practice this" CTA that routes into
 *      LessonPhaseRunner for the lick's linked exercise (if present).
 *
 * Lick→lesson routing: find the shortest lesson whose `exercisePlanId`
 * matches the lick's `exerciseId` and set it as the current lesson.
 */
export function ArtistGalleryPanel() {
  const [open, setOpen] = useAtom(artistPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);
  const [focus, setFocus] = useState<Artist | null>(null);

  const primary = useMemo(
    () => (instrumentId ? artistsForInstrument(instrumentId) : []),
    [instrumentId],
  );
  const others = useMemo(
    () => listArtists().filter((a) => !primary.includes(a)),
    [primary],
  );

  const instProg = instrumentId ? progress[instrumentId] : undefined;
  const unlocked = (instProg?.lessonsCompleted.length ?? 0) >= 3;

  return (
    <SidePanel
      open={open}
      onClose={() => setOpen(false)}
      title="Genius artists"
      subtitle="Learn their style — licks route into real practice"
    >
      {!unlocked && (
        <div className="panel p-4 bg-amber-400/5 border-amber-400/30 mb-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔒</div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">Finish the basics first</div>
              <div className="text-xs text-white/65 leading-relaxed">
                Browse freely — samples work. Once you've passed Level 3 on this
                instrument, "Practice this lick" routes you straight into a real
                lesson attempt.
              </div>
            </div>
          </div>
        </div>
      )}

      {primary.length > 0 && (
        <section className="mb-6">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">For this instrument</div>
          <div className="grid grid-cols-2 gap-2">
            {primary.map((a) => (
              <ArtistCard key={a.id} artist={a} onOpen={() => setFocus(a)} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Explore other styles</div>
        <div className="grid grid-cols-2 gap-2">
          {others.map((a) => (
            <ArtistCard key={a.id} artist={a} onOpen={() => setFocus(a)} />
          ))}
        </div>
      </section>

      {focus && (
        <ArtistFocusModal
          artist={focus}
          canPractice={unlocked}
          onClose={() => setFocus(null)}
          onCloseGallery={() => setOpen(false)}
        />
      )}
    </SidePanel>
  );
}

function ArtistCard({ artist, onOpen }: { artist: Artist; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="panel p-3 text-left transition-colors hover:bg-white/5"
    >
      <div className="text-4xl mb-2">{artist.photoGlyph}</div>
      <div className="font-semibold text-sm leading-tight">{artist.name}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{artist.era}</div>
      <div className="text-[11px] text-white/55 mt-2 leading-snug line-clamp-3">{artist.blurb}</div>
      <div className="flex flex-wrap gap-1 mt-3">
        {artist.styleFingerprint.ornamentTags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="chip bg-white/5 border border-white/10 text-white/60 text-[9px]"
          >
            {t}
          </span>
        ))}
        <span className="chip bg-amber-400/10 border border-amber-400/20 text-amber-200 text-[9px] uppercase">
          {artist.unlockTier}
        </span>
      </div>
    </button>
  );
}

/** Find a lesson that uses this exerciseId. First match wins. */
function lessonForExercise(exerciseId: string | undefined): Lesson | null {
  if (!exerciseId) return null;
  for (const lesson of Object.values(LESSONS)) {
    if (lesson.exercisePlanId === exerciseId) return lesson;
  }
  return null;
}

function ArtistFocusModal({
  artist,
  canPractice,
  onClose,
  onCloseGallery,
}: {
  artist: Artist;
  canPractice: boolean;
  onClose: () => void;
  onCloseGallery: () => void;
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [matchBreakdown, setMatchBreakdown] = useState<Record<string, number> | null>(null);
  const [matching, setMatching] = useState(false);
  const setCurrentInstrument = useSetAtom(currentInstrumentAtom);
  const setCurrentLesson = useSetAtom(currentLessonIdAtom);
  const setScreen = useSetAtom(screenAtom);
  const lastGrade = useAtomValue(lastGradeAtom);

  // Auto-play the first lick on open (if user has interacted with the page).
  useEffect(() => {
    // Not autoplay — require explicit click to avoid noise mid-navigation.
  }, []);

  const runStyleMatch = async () => {
    if (!MUSICLUV_SERVER_URL || !lastGrade) return;
    setMatching(true);
    try {
      // Derive coarse features from the last grade + detected notes. The
      // audio-engine returns richer timbre features when available; for
      // now we pass what we have.
      const notes = lastGrade.userNotesDetected ?? [];
      const pitchVals = notes.map((n: any) => n.hz ?? 0).filter((h: number) => h > 0);
      const mean = pitchVals.length ? pitchVals.reduce((s: number, h: number) => s + h, 0) / pitchVals.length : 0;
      const variance = pitchVals.length ? pitchVals.reduce((s: number, h: number) => s + (h - mean) ** 2, 0) / pitchVals.length : 0;
      const features = {
        pitchMean: mean,
        pitchStd: Math.sqrt(variance),
        rhythmDensity: notes.length / Math.max(1, (lastGrade as any).durationSec ?? 10),
        ornamentRate: 0,
        mfccCentroid: 0.5,
      };
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/style/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({ artistId: artist.id, features }),
      });
      const body = await res.json();
      if (body.ok) {
        setMatchScore(body.score);
        setMatchBreakdown(body.breakdown);
      }
    } finally {
      setMatching(false);
    }
  };

  const playLick = async (lickId: string, exerciseId?: string) => {
    if (playingId) return;
    setPlayingId(lickId);
    try {
      await unlockAudio();
      const ex = exerciseId ? getExercise(exerciseId) : undefined;
      const instrumentId = artist.instruments[0];
      const notes = ex?.targetPattern.notes ?? [];
      if (notes.length === 0) {
        // No target notes — play a styled 3-note arpeggio as fallback.
        const fallback = ["C4", "E4", "G4"];
        let t = 0;
        for (const n of fallback) {
          await new Promise((r) => setTimeout(r, t));
          void playNote(instrumentId, n, 0.6);
          t = 400;
        }
        await new Promise((r) => setTimeout(r, 1200));
        return;
      }
      const start = notes[0].startMs;
      const demo = notes.slice(0, Math.min(notes.length, 8));
      const duration = (demo[demo.length - 1].startMs + demo[demo.length - 1].durationMs - start) + 300;
      for (const n of demo) {
        setTimeout(() => {
          void playNote(instrumentId, n.pitch, n.durationMs / 1000);
        }, n.startMs - start);
      }
      await new Promise((r) => setTimeout(r, Math.min(duration, 6000)));
    } finally {
      setPlayingId(null);
    }
  };

  const practiceLick = (exerciseId?: string) => {
    if (!exerciseId) return;
    const lesson = lessonForExercise(exerciseId);
    if (!lesson) return;
    setCurrentInstrument(lesson.instrumentId);
    setCurrentLesson(lesson.id);
    setScreen("studio");
    onClose();
    onCloseGallery();
  };

  return (
    <div
      className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="panel max-w-lg w-full p-0 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-4 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="text-5xl mb-2">{artist.photoGlyph}</div>
            <h3 className="display text-xl font-semibold">{artist.name}</h3>
            <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{artist.era} · {artist.origin}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
          >✕</button>
        </div>

        <div className="p-5 pb-3 border-b border-white/5">
          <p className="text-sm text-white/80 leading-relaxed">{artist.blurb}</p>
          {lastGrade && (
            <div className="mt-3 p-3 rounded-lg bg-indigo-500/5 border border-indigo-400/20">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-indigo-300">Style fingerprint</div>
                  <div className="text-xs text-white/70">
                    How close was your last attempt to {artist.name.split(" ")[0]}'s voice?
                  </div>
                </div>
                <button
                  onClick={runStyleMatch}
                  disabled={matching}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-indigo-500/20 border border-indigo-400/40 hover:bg-indigo-500/30 disabled:opacity-50"
                >
                  {matching ? "Matching…" : matchScore !== null ? `${Math.round(matchScore * 100)}% match` : "Run match"}
                </button>
              </div>
              {matchBreakdown && (
                <div className="grid grid-cols-5 gap-1 mt-2 text-[9px] font-mono text-white/60">
                  {Object.entries(matchBreakdown).slice(0, 5).map(([k, v]) => (
                    <div key={k} className="text-center p-1 rounded-md bg-white/[0.02]">
                      <div className="text-white/90">{Math.round(v * 100)}%</div>
                      <div className="text-[8px] text-white/40 truncate">{k}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Signature licks</div>
          {artist.signatureLicks.map((lick) => {
            const lesson = lessonForExercise(lick.exerciseId);
            const playable = Boolean(lick.exerciseId);
            const practiceable = Boolean(lesson) && canPractice;
            return (
              <div
                key={lick.id}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{lick.label}</div>
                  {!canPractice && lesson && (
                    <span className="text-[9px] uppercase tracking-widest text-amber-300/70">
                      Pass L3 to try
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => playLick(lick.id, lick.exerciseId)}
                    disabled={!playable || playingId === lick.id}
                    className="flex-1 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-xs font-semibold disabled:opacity-40"
                  >
                    {playingId === lick.id ? "Playing…" : playable ? "▶ Play demo" : "Demo not ready"}
                  </button>
                  <button
                    onClick={() => practiceLick(lick.exerciseId)}
                    disabled={!practiceable}
                    className="flex-1 px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-xs font-semibold disabled:opacity-40 disabled:bg-none disabled:bg-white/5"
                  >
                    Practice this lick
                  </button>
                </div>
                {lesson && (
                  <div className="mt-2 text-[10px] text-white/40">
                    Opens {lesson.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
