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
 * Start streaming real pitch data. Attaches a ScriptProcessor to the
 * provided mic MediaStream and invokes `onFrame` ~every 40ms.
 *
 * Returns a handle whose `.stop()` tears down the audio graph.
 */
export async function startLivePitch(
  micStream: MediaStream,
  onFrame: (frame: PitchFrame) => void,
  opts: { bufferSize?: number } = {},
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

  processor.onaudioprocess = (ev: AudioProcessingEvent) => {
    const now = performance.now();
    if (now - lastEmitAt < 40) return;         // throttle to 25 fps
    lastEmitAt = now;

    const input = ev.inputBuffer.getChannelData(0);
    let rms = 0;
    for (let i = 0; i < input.length; i++) rms += input[i] * input[i];
    rms = Math.sqrt(rms / input.length);

    const hz = autocorrelate(input, ctx.sampleRate);
    if (hz == null) {
      onFrame({ hz: null, note: null, cents: 0, rms });
      return;
    }
    const { note, cents } = hzToNoteCents(hz);
    onFrame({ hz, note, cents, rms });
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
