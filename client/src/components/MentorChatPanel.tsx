import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { mentorPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { lastGradeAtom } from "@/atoms/practice";
import { mentorsForInstrument } from "@catalogs/mentorCatalog";
import { SidePanel } from "./SidePanel";

interface Msg { from: "mentor" | "user"; text: string; }

export function MentorChatPanel() {
  const [open, setOpen] = useAtom(mentorPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const lastGrade = useAtomValue(lastGradeAtom);

  const mentor = instrumentId ? mentorsForInstrument(instrumentId)[0] : undefined;
  const [messages, setMessages] = useState<Msg[]>(() =>
    mentor
      ? [{ from: "mentor", text: `${mentor.defaultLines[0]}` }]
      : []
  );
  const [input, setInput] = useState("");

  if (!mentor) return null;

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // Mock a mentor reply
    setTimeout(() => {
      const reply = lastGrade
        ? `Your composite was ${(lastGrade.composite * 100).toFixed(0)}%. ${lastGrade.feedback.mentor ?? lastGrade.feedback.canned}`
        : mentor.defaultLines[Math.floor(Math.random() * mentor.defaultLines.length)];
      setMessages((m) => [...m, { from: "mentor", text: reply }]);
    }, 700);
  };

  return (
    <SidePanel
      open={open}
      onClose={() => setOpen(false)}
      title={mentor.name}
      subtitle={mentor.bio}
      side="right"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 panel p-3 mb-4">
          <div className="text-3xl">{mentor.photoGlyph}</div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-1">
              {mentor.styleExpertise.slice(0, 4).map((s) => (
                <span key={s} className="chip bg-white/5 border border-white/10 text-white/70">{s}</span>
              ))}
            </div>
          </div>
          <span className="chip bg-emerald-500/15 text-emerald-200 border border-emerald-400/30 text-[10px]">● online</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pb-4 scrollbar-none">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
              {m.from === "mentor" && <div className="text-2xl flex-shrink-0">{mentor.photoGlyph}</div>}
              <div
                className={`max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed
                  ${m.from === "mentor"
                    ? "bg-white/5 border border-white/5 text-white/90 rounded-tl-sm"
                    : "bg-indigo-500/80 text-white rounded-tr-sm"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-3 border-t border-white/5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Ask your mentor anything…"
            className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400/50"
          />
          <button className="btn-primary text-sm" onClick={send}>Send</button>
        </div>
        <div className="text-[10px] text-white/30 mt-2 text-center">
          Mock replies — real LLM mentor lands in Phase 2.
        </div>
      </div>
    </SidePanel>
  );
}
