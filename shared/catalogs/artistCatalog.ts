import type { Artist } from "./types";

export const ARTISTS: Record<string, Artist> = {
  ravi_shankar: {
    id: "ravi_shankar",
    name: "Pandit Ravi Shankar",
    photoGlyph: "🕉️",
    era: "1920–2012",
    origin: "Varanasi, India",
    instruments: ["sitar"],
    signatureLicks: [
      { id: "yaman_alap_phrase", label: "Yaman alap opening", exerciseId: "sitar_l4_01_yaman_meend" },
      { id: "jhala_climax",     label: "Jhala climax pattern" },
    ],
    styleFingerprint: { tempoRange: [30, 120], scaleBias: "raga-yaman,raga-bhairavi", ornamentTags: ["meend", "gamaka", "krintan"] },
    sampleTracks: [{ title: "Raga Yaman — alap", licensedUse: "link_only" }],
    unlockTier: "pro",
    blurb: "The sitar voice that introduced Hindustani classical to the world.",
  },
  jimi_hendrix: {
    id: "jimi_hendrix",
    name: "Jimi Hendrix",
    photoGlyph: "🎸",
    era: "1942–1970",
    origin: "Seattle, USA",
    instruments: ["guitar"],
    signatureLicks: [
      { id: "double_stop_bends", label: "Double-stop minor-third bends" },
      { id: "thumb_over_chords", label: "Thumb-over E chord voicing" },
    ],
    styleFingerprint: { tempoRange: [80, 160], scaleBias: "blues-E,minor-pentatonic", ornamentTags: ["bend", "wah", "vibrato"] },
    sampleTracks: [{ title: "Little Wing (excerpt)", licensedUse: "excerpt" }],
    unlockTier: "pro",
    blurb: "Rewrote what the electric guitar could be.",
  },
  ar_rahman: {
    id: "ar_rahman",
    name: "A. R. Rahman",
    photoGlyph: "🎼",
    era: "1967–",
    origin: "Chennai, India",
    instruments: ["piano", "vocals"],
    signatureLicks: [
      { id: "carnatic_fusion", label: "Carnatic-over-pop chord movement" },
    ],
    styleFingerprint: { tempoRange: [70, 130], scaleBias: "carnatic-fusion,pop", ornamentTags: ["gamaka", "modulation"] },
    sampleTracks: [{ title: "Jai Ho (excerpt)", licensedUse: "excerpt" }],
    unlockTier: "pro",
    blurb: "Bridges Carnatic melody, global pop, and cinematic orchestration.",
  },
  zakir_hussain: {
    id: "zakir_hussain",
    name: "Ustad Zakir Hussain",
    photoGlyph: "👐",
    era: "1951–",
    origin: "Mumbai, India",
    instruments: ["tabla"],
    signatureLicks: [
      { id: "teentaal_peshkar", label: "Teentaal peshkar opening" },
      { id: "tihai_climax", label: "Tihai (3× repetition) climax" },
    ],
    styleFingerprint: { tempoRange: [60, 240], scaleBias: "teentaal,rupak,jhaptal", ornamentTags: ["tihai", "layakari"] },
    sampleTracks: [{ title: "Teentaal solo (excerpt)", licensedUse: "excerpt" }],
    unlockTier: "pro",
    blurb: "The virtuoso who made tabla a global concert instrument.",
  },
  bill_evans: {
    id: "bill_evans",
    name: "Bill Evans",
    photoGlyph: "🎹",
    era: "1929–1980",
    origin: "New Jersey, USA",
    instruments: ["piano"],
    signatureLicks: [
      { id: "rooted_voicings", label: "Rootless left-hand voicings" },
    ],
    styleFingerprint: { tempoRange: [60, 180], scaleBias: "modal-jazz,bebop", ornamentTags: ["voicing", "voice-leading"] },
    sampleTracks: [{ title: "Peace Piece (excerpt)", licensedUse: "excerpt" }],
    unlockTier: "pro",
    blurb: "Modal jazz at the piano, all touch and voice-leading.",
  },
  hariprasad_chaurasia: {
    id: "hariprasad_chaurasia",
    name: "Pt. Hariprasad Chaurasia",
    photoGlyph: "🪈",
    era: "1938–",
    origin: "Prayagraj, India",
    instruments: ["flute"],
    signatureLicks: [{ id: "bansuri_meend", label: "Bansuri meend across half-holes" }],
    styleFingerprint: { tempoRange: [30, 140], scaleBias: "raga-yaman,raga-bhimpalasi", ornamentTags: ["meend", "andolan"] },
    sampleTracks: [{ title: "Raga Yaman — bansuri", licensedUse: "link_only" }],
    unlockTier: "pro",
    blurb: "The bansuri voice of a generation.",
  },
};

export const listArtists = () => Object.values(ARTISTS);
export const getArtist = (id: string) => ARTISTS[id];
export const artistsForInstrument = (instrumentId: string) =>
  Object.values(ARTISTS).filter((a) => a.instruments.includes(instrumentId));
