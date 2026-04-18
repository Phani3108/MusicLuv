import { ReactNode } from "react";

export function SidePanel({
  open, onClose, title, subtitle, children, side = "right", width = "w-full md:w-[28rem]",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  side?: "left" | "right";
  width?: string;
}) {
  const translateIn  = side === "right" ? "translate-x-0" : "translate-x-0";
  const translateOut = side === "right" ? "translate-x-full" : "-translate-x-full";
  const edge = side === "right" ? "right-0" : "left-0";

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40" onClick={onClose} />}
      <aside
        className={`fixed top-0 ${edge} h-full ${width} max-w-full z-50 p-3 md:p-5 transition-transform duration-300
          ${open ? translateIn : translateOut}`}
      >
        <div className="panel h-full flex flex-col overflow-hidden">
          <header className="flex items-start justify-between p-5 pb-3 border-b border-white/5">
            <div>
              <div className="display text-xl font-semibold">{title}</div>
              {subtitle && <div className="text-xs text-white/50 mt-0.5">{subtitle}</div>}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/70">✕</button>
          </header>
          <div className="flex-1 overflow-y-auto p-5 scrollbar-none">
            {children}
          </div>
        </div>
      </aside>
    </>
  );
}
