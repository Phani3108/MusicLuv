import { useEffect, useState } from "react";
import { ensureGuitarReady, playGuitarNote, strumChord, unlockAudio } from "@/audio/guitarSampler";

/** Standard guitar tuning, low-to-high (scientific pitch). */
const STRINGS = ["E2", "A2", "D3", "G3", "B3", "E4"];
const STRING_LABELS = ["6 · E", "5 · A", "4 · D", "3 · G", "2 · B", "1 · e"];

/** Named chords for the shortcut chips — frets are relative to strings bottom-up. */
const CHORDS: Array<{ id: string; label: string; notes: string[] }> = [
  { id: "Em",  label: "Em",  notes: ["E2", "B2", "E3", "G3", "B3", "E4"] },
  { id: "G",   label: "G",   notes: ["G2", "B2", "D3", "G3", "B3", "G4"] },
  { id: "C",   label: "C",   notes: ["C3", "E3", "G3", "C4", "E4"] },
  { id: "D",   label: "D",   notes: ["D3", "A3", "D4", "F#4"] },
  { id: "Am",  label: "Am",  notes: ["A2", "E3", "A3", "C4", "E4"] },
  { id: "E",   label: "E",   notes: ["E2", "B2", "E3", "G#3", "B3", "E4"] },
];

const FRET_COUNT = 12;
const FRET_MARKERS = [3, 5, 7, 9, 12];

function noteAtFret(openNote: string, fret: number): string {
  const SEMIS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const match = /^([A-G]#?)(\d)$/.exec(openNote);
  if (!match) return openNote;
  const [, n, o] = match;
  const midi = SEMIS.indexOf(n) + (Number(o) + 1) * 12 + fret;
  const targetN = SEMIS[midi % 12];
  const targetO = Math.floor(midi / 12) - 1;
  return `${targetN}${targetO}`;
}

export function VirtualGuitar({ showNoodleHints = true }: { showNoodleHints?: boolean }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] = useState<string | null>(null); // stringIdx:fret

  useEffect(() => {
    let mounted = true;
    ensureGuitarReady()
      .then(() => { if (mounted) { setReady(true); setLoading(false); } })
      .catch(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleFretClick = async (stringIdx: number, fret: number) => {
    const note = noteAtFret(STRINGS[stringIdx], fret);
    await unlockAudio();
    await playGuitarNote(note);
    const key = `${stringIdx}:${fret}`;
    setPressed(key);
    setTimeout(() => setPressed((cur) => (cur === key ? null : cur)), 180);
  };

  const handleChord = (chord: (typeof CHORDS)[number]) => {
    strumChord(chord.notes);
  };

  return (
    <div className="relative select-none">
      <div className="rounded-[28px] bg-gradient-to-b from-amber-900 via-amber-950 to-black p-4 pb-5 border border-amber-800/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80 font-mono flex items-center gap-2">
            Acoustic · Standard tuning
            {loading && <span className="inline-flex items-center gap-1 text-white/40 normal-case tracking-normal"><span className="w-1 h-1 rounded-full bg-amber-300 animate-pulse" />loading samples…</span>}
            {ready && <span className="inline-flex items-center gap-1 text-emerald-300/80 normal-case tracking-normal"><span className="w-1 h-1 rounded-full bg-emerald-400" />playable</span>}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Guitar
          </div>
        </div>

        {/* Fretboard */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-700/30 p-2">
          <div className="grid gap-[1px]" style={{ gridTemplateColumns: `60px repeat(${FRET_COUNT}, minmax(0, 1fr))` }}>
            {/* String labels + fretboard rows */}
            {STRING_LABELS.map((label, stringIdx) => (
              <div key={stringIdx} className="contents">
                <div className="text-[10px] font-mono text-amber-200/80 flex items-center justify-end pr-2 py-2">
                  {label}
                </div>
                {Array.from({ length: FRET_COUNT }).map((_, i) => {
                  const fret = i + 1;
                  const key = `${stringIdx}:${fret}`;
                  const isPressed = pressed === key;
                  const hasMarker = FRET_MARKERS.includes(fret);
                  return (
                    <button
                      key={fret}
                      onMouseDown={() => handleFretClick(stringIdx, fret)}
                      onTouchStart={(e) => { e.preventDefault(); handleFretClick(stringIdx, fret); }}
                      className={`relative h-9 border-r border-amber-600/30 transition-colors
                        ${isPressed
                          ? "bg-emerald-400/30"
                          : "bg-gradient-to-b from-amber-900/40 to-amber-950/40 hover:bg-amber-700/30"}
                      `}
                    >
                      {/* String line */}
                      <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-amber-200/50 pointer-events-none" />
                      {/* Fret marker dot */}
                      {stringIdx === 3 && hasMarker && (
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-300/40 pointer-events-none" />
                      )}
                      {isPressed && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-mono text-white bg-emerald-500 px-1 rounded">
                            {noteAtFret(STRINGS[stringIdx], fret)}
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            {/* Fret number row */}
            <div />
            {Array.from({ length: FRET_COUNT }).map((_, i) => (
              <div key={i} className="text-[9px] text-amber-200/40 text-center py-1 font-mono">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Chord chips */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <div className="text-[10px] uppercase tracking-widest text-amber-200/60 mr-1">Chords</div>
          {CHORDS.map((c) => (
            <button
              key={c.id}
              onClick={() => handleChord(c)}
              className="px-3 py-1.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-100 text-xs font-semibold hover:bg-amber-500/25 transition-colors"
            >
              {c.label}
            </button>
          ))}
        </div>

        {showNoodleHints && (
          <div className="mt-3 text-[10px] text-white/40 px-2 flex items-center justify-between">
            <span>🎵 Tap any fret to play that note</span>
            <span>Tap a chord chip to strum</span>
          </div>
        )}
      </div>
    </div>
  );
}
