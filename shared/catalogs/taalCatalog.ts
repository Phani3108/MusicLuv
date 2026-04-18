import type { Taal } from "./types";

export const TAALS: Record<string, Taal> = {
  teentaal: {
    id: "teentaal",
    name: "Teentaal",
    matras: 16,
    vibhag: [4, 4, 4, 4],
    theka: [
      "Dha", "Dhin", "Dhin", "Dha",
      "Dha", "Dhin", "Dhin", "Dha",
      "Dha", "Tin", "Tin", "Ta",
      "Ta", "Dhin", "Dhin", "Dha",
    ],
    clapPattern: ["X", 2, 3, 4, "X", 6, 7, 8, "0", 10, 11, 12, "X", 14, 15, 16],
  },
  rupak: {
    id: "rupak",
    name: "Rupak",
    matras: 7,
    vibhag: [3, 2, 2],
    theka: ["Tin", "Tin", "Na", "Dhin", "Na", "Dhin", "Na"],
    clapPattern: ["0", 2, 3, "X", 5, "X", 7],
  },
  jhaptal: {
    id: "jhaptal",
    name: "Jhaptal",
    matras: 10,
    vibhag: [2, 3, 2, 3],
    theka: ["Dhi", "Na", "Dhi", "Dhi", "Na", "Ti", "Na", "Dhi", "Dhi", "Na"],
    clapPattern: ["X", 2, "X", 4, 5, "0", 7, "X", 9, 10],
  },
};

export const getTaal = (id: string) => TAALS[id];
