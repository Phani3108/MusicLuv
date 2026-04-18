/** A stylized sitar hero — frets, main strings, tumba, taraf. Not photoreal but distinctive. */
export function SitarHero({ highlight }: { highlight?: string | null }) {
  const frets = Array.from({ length: 7 }, (_, i) => ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni"][i]);
  return (
    <div className="relative select-none">
      <div className="rounded-[28px] bg-gradient-to-b from-amber-950 via-amber-900 to-black p-6 border border-amber-700/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70 font-mono">
            Hindustani · Raga Yaman
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Sitar
          </div>
        </div>

        {/* Fretboard */}
        <div className="relative h-40 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-amber-600/30 overflow-hidden">
          {/* 3 main strings */}
          {[0.28, 0.5, 0.72].map((y) => (
            <div
              key={y}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-amber-200/40 via-amber-100/80 to-amber-200/40"
              style={{ top: `${y * 100}%` }}
            />
          ))}
          {/* Frets */}
          {frets.map((svara, i) => (
            <div
              key={i}
              className={`absolute top-0 bottom-0 flex flex-col items-center justify-between py-2 border-r border-amber-400/20
                ${highlight === svara ? "bg-amber-400/15" : ""}`}
              style={{ left: `${((i + 1) / (frets.length + 1)) * 100}%`, width: `${100 / (frets.length + 1)}%`, transform: "translateX(-50%)" }}
            >
              <span className="text-[10px] font-mono text-amber-200/90">{svara}</span>
              <span className="w-[2px] h-full bg-amber-600/40" />
            </div>
          ))}
          {/* Sympathetic string shimmer */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-black/40 flex items-end gap-1 px-2 pb-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-[1px] bg-amber-200/30" />
            ))}
          </div>
        </div>

        {/* Tumba (gourd) */}
        <div className="mt-4 flex items-center justify-center">
          <div className="w-36 h-10 rounded-b-full bg-gradient-to-b from-amber-800 to-black shadow-inner border-b border-amber-500/20" />
        </div>
      </div>
    </div>
  );
}
