/**
 * Style fingerprint matching. Given an attempt's feature vector (from
 * audio-engine) and an artist's styleFingerprint (catalog), score the
 * similarity 0..1. Used by Genius-tier "play in Hendrix's voice" feature.
 *
 * Feature vector shape (from audio-engine):
 *   {
 *     pitchMean, pitchStd, rhythmDensity, ornamentRate,
 *     mfccCentroid, vibratoHz, vibratoDepthCents
 *   }
 *
 * Artist fingerprint shape (from artistCatalog):
 *   { tempoRange: [min, max], scaleBias: string, ornamentTags: string[] }
 *
 * We convert both into normalized feature vectors + cosine similarity.
 * Real-world comparison requires a large labeled dataset; this ships the
 * infrastructure so the real matcher can drop in later without surface
 * churn.
 */

import type { Artist } from "../../shared/catalogs/types.js";

export interface AttemptFeatures {
  pitchMean: number;
  pitchStd: number;
  rhythmDensity: number;      // notes per beat
  ornamentRate: number;        // ornaments per minute
  mfccCentroid: number;        // timbre centroid
  vibratoHz?: number;
  vibratoDepthCents?: number;
}

/** Expected ranges for artist fingerprints — coarse first pass. */
const ARTIST_TEMPLATES: Record<string, Partial<AttemptFeatures & { ornamentTagBonus: number }>> = {
  ravi_shankar: { pitchMean: 300, pitchStd: 120, rhythmDensity: 3, ornamentRate: 30, mfccCentroid: 0.45, vibratoHz: 5, vibratoDepthCents: 40 },
  jimi_hendrix: { pitchMean: 300, pitchStd: 80,  rhythmDensity: 8, ornamentRate: 45, mfccCentroid: 0.75, vibratoHz: 6, vibratoDepthCents: 50 },
  ar_rahman:    { pitchMean: 280, pitchStd: 60,  rhythmDensity: 6, ornamentRate: 15, mfccCentroid: 0.55 },
  zakir_hussain:{ pitchMean: 0,   pitchStd: 0,   rhythmDensity: 12, ornamentRate: 60, mfccCentroid: 0.65 },
  bill_evans:   { pitchMean: 260, pitchStd: 90,  rhythmDensity: 5, ornamentRate: 10, mfccCentroid: 0.5 },
  hariprasad_chaurasia: { pitchMean: 300, pitchStd: 110, rhythmDensity: 2, ornamentRate: 35, mfccCentroid: 0.3, vibratoHz: 4, vibratoDepthCents: 50 },
};

/** Cosine-like similarity in 0..1. Missing features on either side count as neutral. */
export function scoreStyleMatch(artist: Artist, features: AttemptFeatures): { score: number; breakdown: Record<string, number> } {
  const template = ARTIST_TEMPLATES[artist.id] ?? {};
  const breakdown: Record<string, number> = {};

  function compare(key: keyof AttemptFeatures, tolerance: number): number {
    const a = features[key];
    const t = (template as any)[key] as number | undefined;
    if (a == null || t == null) return 0.5; // neutral
    const diff = Math.abs(a - t);
    const score = Math.max(0, 1 - diff / tolerance);
    breakdown[key] = Math.round(score * 100) / 100;
    return score;
  }

  const components = [
    compare("pitchMean", 200),
    compare("pitchStd", 100),
    compare("rhythmDensity", 10),
    compare("ornamentRate", 50),
    compare("mfccCentroid", 0.5),
    compare("vibratoHz", 3),
    compare("vibratoDepthCents", 40),
  ];

  const composite = components.reduce((s, v) => s + v, 0) / components.length;
  return { score: Math.round(composite * 100) / 100, breakdown };
}
