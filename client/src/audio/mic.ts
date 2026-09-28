/**
 * Mic capture → WAV.
 *
 * The mic opens at arm time (permission prompt + live level meter before the
 * take), but samples are only kept after `startCapture()` — the downbeat after
 * the count-in. Test notes and waiting time never reach the grader.
 */
export interface MicHandle {
  stream: MediaStream;
  /** The mic's AudioContext — share it for the count-in click and live pitch. */
  context: AudioContext;
  /** Begin keeping samples; anything captured before this is discarded. */
  startCapture: () => void;
  /** Stop, release the mic, and return the captured take as a WAV blob. */
  stop: () => Promise<Blob>;
  /** Release the mic without producing a take. */
  cancel: () => Promise<void>;
}

const PREFERRED_SAMPLE_RATE = 22050;

/**
 * A 22.05 kHz context keeps uploads small, but some browsers refuse to connect
 * a mic stream to a context whose rate differs from the hardware. Fall back to
 * the device rate; the engine resamples either way.
 */
function openContext(stream: MediaStream): { ctx: AudioContext; source: MediaStreamAudioSourceNode } {
  try {
    const ctx = new AudioContext({ sampleRate: PREFERRED_SAMPLE_RATE });
    try {
      return { ctx, source: ctx.createMediaStreamSource(stream) };
    } catch {
      void ctx.close();
    }
  } catch {
    // sampleRate option unsupported — use the device rate below.
  }
  const ctx = new AudioContext();
  return { ctx, source: ctx.createMediaStreamSource(stream) };
}

export async function startMicCapture(): Promise<MicHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });

  const { ctx, source } = openContext(stream);
  // Created after the permission prompt, the context can start suspended
  // (Safari) — and a suspended context captures nothing.
  if (ctx.state === "suspended") await ctx.resume().catch(() => {});

  const processor = ctx.createScriptProcessor(4096, 1, 1);
  const silent = ctx.createGain();
  silent.gain.value = 0; // keep the node graph pulling without echoing the mic
  const chunks: Float32Array[] = [];
  let capturing = false;

  processor.onaudioprocess = (e) => {
    if (capturing) chunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));
  };

  source.connect(processor);
  processor.connect(silent);
  silent.connect(ctx.destination);

  const release = async () => {
    capturing = false;
    processor.onaudioprocess = null;
    try { processor.disconnect(); } catch { /* already disconnected */ }
    try { source.disconnect(); } catch { /* already disconnected */ }
    try { silent.disconnect(); } catch { /* already disconnected */ }
    stream.getTracks().forEach((t) => t.stop());
    if (ctx.state !== "closed") await ctx.close().catch(() => {});
  };

  return {
    stream,
    context: ctx,
    startCapture: () => {
      chunks.length = 0;
      capturing = true;
    },
    stop: async () => {
      const sampleRate = ctx.sampleRate;
      await release();
      const totalLen = chunks.reduce((s, c) => s + c.length, 0);
      const merged = new Float32Array(totalLen);
      let off = 0;
      for (const c of chunks) { merged.set(c, off); off += c.length; }
      return encodeWav(merged, sampleRate);
    },
    cancel: release,
  };
}

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);       // PCM chunk size
  view.setUint16(20, 1, true);        // PCM
  view.setUint16(22, 1, true);        // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);        // block align
  view.setUint16(34, 16, true);       // bits/sample
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let off = 44;
  for (let i = 0; i < samples.length; i++, off += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}
