/**
 * Note-name helpers shared by the virtual instruments, timeline, overlay and
 * grading payload. Accepts sharps and flats ("Eb4", "D♯4"); canonical output
 * spelling uses sharps, matching the audio engine and the instrument keys.
 */

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const LETTER: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const NOTE_RE = /^\s*([A-Ga-g])([#b♯♭]{0,2})(-?\d+)\s*$/;

/** "C4" → 60, "Eb4" → 63. Returns null for anything that isn't a note. */
export function noteToMidi(note: string | null | undefined): number | null {
  const m = NOTE_RE.exec(note ?? "");
  if (!m) return null;
  let semi = LETTER[m[1].toUpperCase()];
  for (const ch of m[2]) semi += ch === "#" || ch === "♯" ? 1 : -1;
  return 12 * (Number(m[3]) + 1) + semi;
}

/** 61 → "C#4". */
export function midiToNote(midi: number): string {
  return `${NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

/** "Eb4" → "D#4"; non-notes pass through unchanged. */
export function normalizeNote(note: string): string;
export function normalizeNote(note: string | null | undefined): string | null;
export function normalizeNote(note: string | null | undefined): string | null {
  if (note == null) return null;
  const midi = noteToMidi(note);
  return midi == null ? note : midiToNote(midi);
}

/** 0–11, or null for non-notes. "Eb4" and "D#2" share pitch class 3. */
export function pitchClass(note: string): number | null {
  const midi = noteToMidi(note);
  return midi == null ? null : ((midi % 12) + 12) % 12;
}

/**
 * Keyboard span (MIDI, inclusive) covering `notes`, snapped to whole octaves
 * (C…B) and at least `minSemitones` wide. Default C4–G5 when there are no notes.
 */
export function keyboardRangeFor(notes: string[], minSemitones = 19): { low: number; high: number } {
  const midis = notes.map(noteToMidi).filter((m): m is number => m != null);
  if (midis.length === 0) return { low: 60, high: 79 };
  const low = 12 * Math.floor(Math.min(...midis) / 12);
  let high = 12 * Math.floor(Math.max(...midis) / 12) + 11;
  if (high - low < minSemitones) high = low + minSemitones;
  return { low, high };
}
