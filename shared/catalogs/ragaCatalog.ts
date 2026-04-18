import type { Raga } from "./types";

export const RAGAS: Record<string, Raga> = {
  yaman: {
    id: "yaman",
    name: "Yaman",
    thaat: "Kalyan",
    time: "early evening",
    aaroha: ["Ni", "Re", "Ga", "Ma#", "Dha", "Ni", "Sa'"],
    avaroha: ["Sa'", "Ni", "Dha", "Pa", "Ma#", "Ga", "Re", "Sa"],
    vadi: "Ga",
    samvadi: "Ni",
    pakad: ["Ni Re Ga", "Ma# Dha Ni Sa'"],
    moodTags: ["devotional", "serene", "romantic"],
    equivalentScale: { root: "C", mode: "lydian" },
  },
  bhairav: {
    id: "bhairav",
    name: "Bhairav",
    thaat: "Bhairav",
    time: "dawn",
    aaroha: ["Sa", "Re♭", "Ga", "Ma", "Pa", "Dha♭", "Ni", "Sa'"],
    avaroha: ["Sa'", "Ni", "Dha♭", "Pa", "Ma", "Ga", "Re♭", "Sa"],
    vadi: "Dha♭",
    samvadi: "Re♭",
    pakad: ["Ga Ma Dha♭ Pa", "Ma Pa Ga Ma Re♭ Sa"],
    moodTags: ["austere", "contemplative", "dawn"],
    equivalentScale: { root: "C", mode: "phrygian-dominant-ish" },
  },
  bhimpalasi: {
    id: "bhimpalasi",
    name: "Bhimpalasi",
    thaat: "Kafi",
    time: "afternoon",
    aaroha: ["Ni", "Sa", "Ga♭", "Ma", "Pa", "Ni", "Sa'"],
    avaroha: ["Sa'", "Ni", "Dha", "Pa", "Ma", "Ga♭", "Re", "Sa"],
    vadi: "Ma",
    samvadi: "Sa",
    pakad: ["Ni Sa Ga♭ Ma", "Pa Ga♭ Ma Ga♭ Re Sa"],
    moodTags: ["longing", "warm", "afternoon"],
    equivalentScale: { root: "C", mode: "dorian" },
  },
};

export const listRagas = () => Object.values(RAGAS);
export const getRaga = (id: string) => RAGAS[id];
