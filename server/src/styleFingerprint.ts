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

/**
 * Expected feature ranges per artist. Each row is the *centroid* of
 * what we expect a "correct" imitation to land on — the matcher
 * computes distance from this centroid via tolerance bands.
 *
 * Calibration notes:
 *   • pitchMean Hz   — reflects vocal/instrumental range center.
 *                      Rappers ~200, contralto vocals ~250, sopranos ~400+,
 *                      bass instruments much lower (drummers 0).
 *   • pitchStd Hz    — pitch variance across a phrase. Bigger = more
 *                      melodic motion / wider range used.
 *   • rhythmDensity  — notes per beat. Soloists ~3-8, drummers 10-15.
 *   • ornamentRate   — ornaments per minute (gamak, bend, slide, etc.).
 *                      Hindustani classical typically 30+, jazz 10-20.
 *   • mfccCentroid   — timbre brightness 0..1. Brassy/metallic = high,
 *                      mellow/dark = low.
 *   • vibratoHz/Depth — only on instruments with vibrato (vocals,
 *                       strings, winds). Sub-5Hz = slow/lush, 6+ = fast.
 *
 * Real production tuning would re-calibrate from a labeled dataset
 * (~30s clips × 50+ artists). This is a hand-tuned 30-artist corpus —
 * enough to make the feature non-trivial across 5 traditions:
 *   Hindustani (5), Carnatic (3), Western classical (5), Jazz (8),
 *   Pop/Rock/Electronic (9).
 */
const ARTIST_TEMPLATES: Record<string, Partial<AttemptFeatures & { ornamentTagBonus: number }>> = {
  // ── Hindustani ──────────────────────────────────────────────────
  ravi_shankar:           { pitchMean: 300, pitchStd: 120, rhythmDensity: 3,  ornamentRate: 30, mfccCentroid: 0.45, vibratoHz: 5, vibratoDepthCents: 40 },
  hariprasad_chaurasia:   { pitchMean: 300, pitchStd: 110, rhythmDensity: 2,  ornamentRate: 35, mfccCentroid: 0.30, vibratoHz: 4, vibratoDepthCents: 50 },
  zakir_hussain:          { pitchMean: 0,   pitchStd: 0,   rhythmDensity: 12, ornamentRate: 60, mfccCentroid: 0.65 },
  bhimsen_joshi:          { pitchMean: 220, pitchStd: 140, rhythmDensity: 2,  ornamentRate: 40, mfccCentroid: 0.50, vibratoHz: 5, vibratoDepthCents: 55 },
  ali_akbar_khan:         { pitchMean: 280, pitchStd: 130, rhythmDensity: 4,  ornamentRate: 45, mfccCentroid: 0.40, vibratoHz: 5, vibratoDepthCents: 45 },

  // ── Carnatic ────────────────────────────────────────────────────
  m_s_subbulakshmi:       { pitchMean: 350, pitchStd: 130, rhythmDensity: 3,  ornamentRate: 50, mfccCentroid: 0.55, vibratoHz: 6, vibratoDepthCents: 50 },
  palghat_mani_iyer:      { pitchMean: 0,   pitchStd: 0,   rhythmDensity: 14, ornamentRate: 70, mfccCentroid: 0.60 },
  veena_doreswamy_iyengar:{ pitchMean: 260, pitchStd: 100, rhythmDensity: 4,  ornamentRate: 55, mfccCentroid: 0.40, vibratoHz: 5, vibratoDepthCents: 60 },

  // ── Indian film / fusion ────────────────────────────────────────
  ar_rahman:              { pitchMean: 280, pitchStd: 60,  rhythmDensity: 6,  ornamentRate: 15, mfccCentroid: 0.55 },
  lata_mangeshkar:        { pitchMean: 380, pitchStd: 90,  rhythmDensity: 4,  ornamentRate: 18, mfccCentroid: 0.55, vibratoHz: 5, vibratoDepthCents: 25 },

  // ── Western classical ──────────────────────────────────────────
  yo_yo_ma:               { pitchMean: 200, pitchStd: 80,  rhythmDensity: 5,  ornamentRate: 8,  mfccCentroid: 0.35, vibratoHz: 5, vibratoDepthCents: 30 },
  jacqueline_du_pre:      { pitchMean: 200, pitchStd: 95,  rhythmDensity: 5,  ornamentRate: 12, mfccCentroid: 0.35, vibratoHz: 6, vibratoDepthCents: 40 },
  hilary_hahn:            { pitchMean: 500, pitchStd: 110, rhythmDensity: 7,  ornamentRate: 10, mfccCentroid: 0.40, vibratoHz: 6, vibratoDepthCents: 25 },
  glenn_gould:            { pitchMean: 350, pitchStd: 120, rhythmDensity: 8,  ornamentRate: 5,  mfccCentroid: 0.50 },
  sabine_meyer:           { pitchMean: 400, pitchStd: 100, rhythmDensity: 6,  ornamentRate: 8,  mfccCentroid: 0.55, vibratoHz: 4, vibratoDepthCents: 15 },

  // ── Jazz ────────────────────────────────────────────────────────
  john_coltrane:          { pitchMean: 350, pitchStd: 110, rhythmDensity: 9,  ornamentRate: 25, mfccCentroid: 0.65 },
  miles_davis:            { pitchMean: 380, pitchStd: 75,  rhythmDensity: 4,  ornamentRate: 12, mfccCentroid: 0.55, vibratoHz: 5, vibratoDepthCents: 20 },
  bill_evans:             { pitchMean: 260, pitchStd: 90,  rhythmDensity: 5,  ornamentRate: 10, mfccCentroid: 0.50 },
  jaco_pastorius:         { pitchMean: 100, pitchStd: 60,  rhythmDensity: 8,  ornamentRate: 20, mfccCentroid: 0.45 },
  thelonious_monk:        { pitchMean: 280, pitchStd: 80,  rhythmDensity: 4,  ornamentRate: 15, mfccCentroid: 0.55 },
  charlie_parker:         { pitchMean: 400, pitchStd: 130, rhythmDensity: 11, ornamentRate: 30, mfccCentroid: 0.65 },
  ella_fitzgerald:        { pitchMean: 320, pitchStd: 85,  rhythmDensity: 4,  ornamentRate: 20, mfccCentroid: 0.55, vibratoHz: 5, vibratoDepthCents: 35 },
  pat_metheny:            { pitchMean: 320, pitchStd: 90,  rhythmDensity: 6,  ornamentRate: 18, mfccCentroid: 0.50 },

  // ── Pop / Rock / Electronic ─────────────────────────────────────
  jimi_hendrix:           { pitchMean: 300, pitchStd: 80,  rhythmDensity: 8,  ornamentRate: 45, mfccCentroid: 0.75, vibratoHz: 6, vibratoDepthCents: 50 },
  prince:                 { pitchMean: 380, pitchStd: 110, rhythmDensity: 7,  ornamentRate: 30, mfccCentroid: 0.65, vibratoHz: 6, vibratoDepthCents: 40 },
  freddie_mercury:        { pitchMean: 350, pitchStd: 130, rhythmDensity: 4,  ornamentRate: 25, mfccCentroid: 0.60, vibratoHz: 6, vibratoDepthCents: 60 },
  amy_winehouse:          { pitchMean: 290, pitchStd: 95,  rhythmDensity: 4,  ornamentRate: 22, mfccCentroid: 0.55, vibratoHz: 5, vibratoDepthCents: 45 },
  daft_punk:              { pitchMean: 220, pitchStd: 50,  rhythmDensity: 8,  ornamentRate: 5,  mfccCentroid: 0.70 },
  aphex_twin:             { pitchMean: 250, pitchStd: 130, rhythmDensity: 12, ornamentRate: 8,  mfccCentroid: 0.55 },
  brian_eno:              { pitchMean: 200, pitchStd: 70,  rhythmDensity: 1,  ornamentRate: 3,  mfccCentroid: 0.30 },
  taylor_swift:           { pitchMean: 330, pitchStd: 70,  rhythmDensity: 3,  ornamentRate: 8,  mfccCentroid: 0.55, vibratoHz: 5, vibratoDepthCents: 20 },
  billie_eilish:          { pitchMean: 280, pitchStd: 60,  rhythmDensity: 2,  ornamentRate: 5,  mfccCentroid: 0.45, vibratoHz: 4, vibratoDepthCents: 15 },
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
