import type { SongLibraryEntry } from "./types";

export const SONGS: Record<string, SongLibraryEntry> = {
  fur_elise_simple: {
    id: "fur_elise_simple",
    title: "Für Elise (simplified)",
    genre: "Classical",
    difficultyByInstrument: { piano: 3 },
    copyrightNote: "public_domain",
    blurb: "Beethoven's most famous melody, pared down to right hand only.",
  },
  vande_mataram_sitar: {
    id: "vande_mataram_sitar",
    title: "Vande Mataram (arrangement)",
    genre: "Indian classical",
    difficultyByInstrument: { sitar: 4, flute: 3 },
    copyrightNote: "public_domain",
    blurb: "An arrangement suitable for alap practice in raga Des.",
  },
  twinkle_piano: {
    id: "twinkle_piano",
    title: "Twinkle, Twinkle, Little Star",
    genre: "Traditional",
    difficultyByInstrument: { piano: 1, guitar: 2, violin: 2, vocals: 1 },
    copyrightNote: "public_domain",
    blurb: "The most forgiving first song in any instrument.",
  },
  blues_12bar_e: {
    id: "blues_12bar_e",
    title: "12-bar blues in E",
    genre: "Blues",
    difficultyByInstrument: { guitar: 3, piano: 4 },
    copyrightNote: "public_domain",
    blurb: "The chassis under a thousand songs. Learn it once, use it forever.",
  },
  ode_to_joy: {
    id: "ode_to_joy",
    title: "Ode to Joy",
    genre: "Classical",
    difficultyByInstrument: { piano: 2, violin: 3, flute: 2 },
    copyrightNote: "public_domain",
    blurb: "Beethoven's theme — seven notes, infinite arrangements.",
  },
};

export const listSongs = () => Object.values(SONGS);
export const songsForInstrument = (instrumentId: string) =>
  Object.values(SONGS).filter((s) => s.difficultyByInstrument[instrumentId]);
