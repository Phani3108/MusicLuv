/**
 * One-bar count-in, clicked on the recorder's AudioContext clock so the
 * learner hears exactly where beat 1 is. Callbacks are driven by timers, so
 * capture is started a little *before* the downbeat — a late timer must never
 * clip the first note's attack. The grader fits the start offset anyway.
 */
export interface CountIn {
  /** Context time (s) of the downbeat the take starts on. */
  downbeatAt: number;
  cancel: () => void;
}

const CAPTURE_LEAD_S = 0.15;

export function startCountIn(
  ctx: AudioContext,
  opts: {
    bpm: number;
    beats: number;
    onBeat?: (beat: number) => void;
    /** Fires CAPTURE_LEAD_S before the downbeat — start recording here. */
    onCaptureStart?: () => void;
    onDownbeat?: () => void;
  },
): CountIn {
  const beatSec = 60 / Math.max(20, opts.bpm);
  const t0 = ctx.currentTime + 0.15;
  const clicks: OscillatorNode[] = [];

  for (let i = 0; i < opts.beats; i++) {
    const at = t0 + i * beatSec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = i === 0 ? 1760 : 1320;   // accent beat 1
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.35, at + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + 0.08);
    clicks.push(osc);
  }

  const downbeatAt = t0 + opts.beats * beatSec;
  const msUntil = (t: number) => Math.max(0, (t - ctx.currentTime) * 1000);
  const timers = [
    ...Array.from({ length: opts.beats }, (_, i) =>
      window.setTimeout(() => opts.onBeat?.(i + 1), msUntil(t0 + i * beatSec))),
    window.setTimeout(() => opts.onCaptureStart?.(), msUntil(downbeatAt - CAPTURE_LEAD_S)),
    window.setTimeout(() => opts.onDownbeat?.(), msUntil(downbeatAt)),
  ];

  return {
    downbeatAt,
    cancel: () => {
      timers.forEach((t) => window.clearTimeout(t));
      clicks.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    },
  };
}
