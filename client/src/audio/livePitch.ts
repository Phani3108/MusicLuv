/**
 * Real-time pitch detection using autocorrelation over a ScriptProcessor
 * node. Zero external dependencies. Returns fundamental frequency (Hz)
 * + note name + cents-off for the closest 12-TET pitch.
 *
 * Quality note: autocorrelation is solid for monophonic, sustained
 * pitched content (piano, sustained vocals, sitar drone). It degrades on
 * noisy/percussive input. For production-grade accuracy + lower latency
 * we can swap in `pitchy` (McLeod pitch method) via npm install later
 * without changing the callsites — the `startLivePitch()` API is stable.
 *
 * Latency profile on 48kHz / 2048-sample buffer ≈ 42ms window + one
 * buffer of detection = ~85ms end-to-end. Well inside the 120ms p95
 * budget in the revamp plan.
 */

export type PitchFrame = {
  hz: number | null;
  note: string | null;        // e.g. "A4"
  cents: number;              // signed deviation from note center, -50..+50
  rms: number;                // frame RMS, for "are they actually playing?" gating
};

export type PitchHandle = {
  stop: () => void;
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/** Convert Hz → { note, cents } relative to A4=440 Hz 12-TET grid. */
export function hzToNoteCents(hz: number): { note: string; cents: number } {
  if (hz <= 0) return { note: "—", cents: 0 };
  const midi = 69 + 12 * Math.log2(hz / 440);
  const roundedMidi = Math.round(midi);
  const cents = Math.round((midi - roundedMidi) * 100);
  const noteName = NOTE_NAMES[((roundedMidi % 12) + 12) % 12];
  const octave = Math.floor(roundedMidi / 12) - 1;
  return { note: `${noteName}${octave}`, cents };
}

/**
 * Autocorrelation pitch detector with parabolic interpolation.
 * Returns fundamental in Hz, or null if signal is too quiet / unvoiced.
 */
function autocorrelate(buf: Float32Array, sampleRate: number): number | null {
  const SIZE = buf.length;
  // RMS gate — if signal is silence, skip detection.
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return null;

  // Trim silent edges to sharpen the fundamental.
  let r1 = 0;
  let r2 = SIZE - 1;
  const threshold = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < threshold) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  const trimmed = buf.slice(r1, r2);
  const N = trimmed.length;
  if (N < 64) return null;

  // Autocorrelation.
  const c = new Float32Array(N);
  for (let lag = 0; lag < N; lag++) {
    let sum = 0;
    for (let i = 0; i < N - lag; i++) sum += trimmed[i] * trimmed[i + lag];
    c[lag] = sum;
  }

  // Find first negative-slope zero-crossing, then the first peak after it.
  let d = 0;
  while (d < N - 1 && c[d] > c[d + 1]) d++;

  let maxVal = -Infinity;
  let maxPos = -1;
  for (let i = d; i < N; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i];
      maxPos = i;
    }
  }
  if (maxPos <= 0) return null;

  // Parabolic interpolation around the peak for sub-sample accuracy.
  const x1 = c[maxPos - 1];
  const x2 = c[maxPos];
  const x3 = c[maxPos + 1] ?? c[maxPos];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  const refined = a ? maxPos - b / (2 * a) : maxPos;

  const hz = sampleRate / refined;
  // Confidence gate — tiny peaks or absurd pitches are unvoiced.
  if (hz < 50 || hz > 1500) return null;
  return hz;
}

/**
 * Median filter over the last N Hz readings. Eliminates per-frame
 * outliers (octave jumps, transient spikes) without smearing legitimate
 * pitch slides — median preserves edges where mean would soften them.
 *
 * Crucial for ornamented playing (gamak, meend, vibrato, bends) where
 * the pitch is continuously moving and a single bad frame can otherwise
 * jiggle the displayed note flipping back and forth.
 */
class MedianHzFilter {
  private buf: number[] = [];
  constructor(private size = 5) {}
  push(hz: number): number {
    this.buf.push(hz);
    if (this.buf.length > this.size) this.buf.shift();
    const sorted = [...this.buf].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }
  reset(): void {
    this.buf = [];
  }
  get hasSamples(): boolean {
    return this.buf.length > 0;
  }
}

/**
 * Note-name hysteresis. Only flip the displayed note name once we're
 * confident the user has crossed a note boundary — staying on the
 * current note until the new note has held for `flipFrames` frames in
 * a row.
 *
 * Without this, a vibrato that swings ±50 cents would bounce the
 * displayed note name twice per oscillation. With it, the note name
 * stays stable while `cents` continues to oscillate.
 */
class NoteHysteresis {
  private current: string | null = null;
  private candidate: string | null = null;
  private candidateCount = 0;
  constructor(private flipFrames = 3) {}
  step(rawNote: string): string {
    if (rawNote === this.current) {
      this.candidate = null;
      this.candidateCount = 0;
      return this.current;
    }
    if (this.current === null) {
      // First note: accept immediately.
      this.current = rawNote;
      return this.current;
    }
    if (rawNote === this.candidate) {
      this.candidateCount++;
      if (this.candidateCount >= this.flipFrames) {
        this.current = rawNote;
        this.candidate = null;
        this.candidateCount = 0;
      }
    } else {
      this.candidate = rawNote;
      this.candidateCount = 1;
    }
    return this.current;
  }
  reset(): void {
    this.current = null;
    this.candidate = null;
    this.candidateCount = 0;
  }
}

/**
 * Start streaming real pitch data. Attaches a ScriptProcessor to the
 * provided mic MediaStream and invokes `onFrame` ~every 40ms.
 *
 * Smoothing layers:
 *   1. Per-frame autocorrelation → raw Hz
 *   2. 5-frame median filter on Hz (kills outliers)
 *   3. 3-frame note-name hysteresis (steadies the displayed note
 *      during ornamented playing — gamak, vibrato, bends)
 *
 * The reported `cents` field uses the *smoothed* Hz so the pitch needle
 * remains responsive while the note label stays stable.
 *
 * Returns a handle whose `.stop()` tears down the audio graph.
 */
export async function startLivePitch(
  micStream: MediaStream,
  onFrame: (frame: PitchFrame) => void,
  opts: { bufferSize?: number; medianWindow?: number; hysteresisFrames?: number } = {},
): Promise<PitchHandle> {
  const AudioCtxCtor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ctx = new AudioCtxCtor();
  const source = ctx.createMediaStreamSource(micStream);
  const bufferSize = opts.bufferSize ?? 2048;

  // ScriptProcessor is deprecated but near-universally supported and
  // adequate for a 40ms-cadence pitch meter. If we hit iOS limits we'll
  // upgrade to AudioWorklet.
  const processor = ctx.createScriptProcessor(bufferSize, 1, 1);
  const silent = ctx.createGain();
  silent.gain.value = 0; // don't route mic back to speakers

  source.connect(processor);
  processor.connect(silent);
  silent.connect(ctx.destination);

  let lastEmitAt = 0;
  const median = new MedianHzFilter(opts.medianWindow ?? 5);
  const hysteresis = new NoteHysteresis(opts.hysteresisFrames ?? 3);

  processor.onaudioprocess = (ev: AudioProcessingEvent) => {
    const now = performance.now();
    if (now - lastEmitAt < 40) return;         // throttle to 25 fps
    lastEmitAt = now;

    const input = ev.inputBuffer.getChannelData(0);
    let rms = 0;
    for (let i = 0; i < input.length; i++) rms += input[i] * input[i];
    rms = Math.sqrt(rms / input.length);

    const rawHz = autocorrelate(input, ctx.sampleRate);
    if (rawHz == null) {
      // Reset smoothing state on silence so the next note enters clean.
      median.reset();
      hysteresis.reset();
      onFrame({ hz: null, note: null, cents: 0, rms });
      return;
    }
    const smoothedHz = median.push(rawHz);
    const { note: rawNote, cents } = hzToNoteCents(smoothedHz);
    const stableNote = hysteresis.step(rawNote);
    onFrame({ hz: smoothedHz, note: stableNote, cents, rms });
  };

  return {
    stop: () => {
      try { processor.disconnect(); } catch { /* ignore */ }
      try { source.disconnect(); } catch { /* ignore */ }
      try { silent.disconnect(); } catch { /* ignore */ }
      try { void ctx.close(); } catch { /* ignore */ }
    },
  };
}
