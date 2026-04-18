import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { mentorPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom, currentLessonIdAtom, userAtom } from "@/atoms/session";
import { lastGradeAtom } from "@/atoms/practice";
import { mentorsForInstrument } from "@catalogs/mentorCatalog";
import { getLesson } from "@catalogs/lessonCatalog";
import { SidePanel } from "./SidePanel";
import { isServerConnected, sendMentorMessage } from "@/lib/api";

interface Msg { from: "mentor" | "user"; text: string; channel?: "llm" | "fallback" | "mock" }

export function MentorChatPanel() {
  const [open, setOpen] = useAtom(mentorPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const lessonId = useAtomValue(currentLessonIdAtom);
  const user = useAtomValue(userAtom);
  const lastGrade = useAtomValue(lastGradeAtom);

  const mentor = instrumentId ? mentorsForInstrument(instrumentId)[0] : undefined;
  const lesson = lessonId ? getLesson(lessonId) : undefined;
  const [messages, setMessages] = useState<Msg[]>(() =>
    mentor ? [{ from: "mentor", text: mentor.defaultLines[0] }] : []
  );
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const serverOn = isServerConnected();

  if (!mentor) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const userMsg: Msg = { from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    // Try real backend first
    if (serverOn) {
      const recent = lastGrade
        ? [{
            lessonTitle: lesson?.title,
            composite: lastGrade.composite,
            weakestDim: Object.entries(lastGrade.dimensions).sort(([, a], [, b]) => a - b)[0][0],
            at: new Date().toISOString(),
          }]
        : undefined;
      try {
        const reply = await sendMentorMessage({
          mentor,
          userName: user?.displayName,
          lesson: lesson
            ? { title: lesson.title, level: lesson.level, tier: lesson.tier, objectives: lesson.objectives }
            : undefined,
          recent,
          message: text,
        });
        if (reply) {
          setMessages((m) => [...m, { from: "mentor", text: reply.text, channel: reply.channel }]);
          setSending(false);
          return;
        }
      } catch {
        // fall through to mock
      }
    }

    // Mock fallback
    setTimeout(() => {
      const mockReply = lastGrade
        ? `Your composite was ${(lastGrade.composite * 100).toFixed(0)}%. ${lastGrade.feedback.mentor ?? lastGrade.feedback.canned}`
        : mentor.defaultLines[Math.floor(Math.random() * mentor.defaultLines.length)];
      setMessages((m) => [...m, { from: "mentor", text: mockReply, channel: "mock" }]);
      setSending(false);
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
          <span className={`chip text-[10px] ${serverOn
            ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
            : "bg-white/5 text-white/50 border border-white/10"}`}>
            {serverOn ? "● claude live" : "○ mock"}
          </span>
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
                {m.from === "mentor" && m.channel && (
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mt-1.5">
                    {m.channel === "llm" ? "claude" : m.channel === "fallback" ? "canned" : "mock"}
                  </div>
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex gap-2">
              <div className="text-2xl flex-shrink-0">{mentor.photoGlyph}</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-3">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-3 border-t border-white/5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Ask your mentor anything…"
            className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400/50"
            disabled={sending}
          />
          <button className="btn-primary text-sm" onClick={send} disabled={sending}>Send</button>
        </div>
        <div className="text-[10px] text-white/30 mt-2 text-center">
          {serverOn ? "Real Claude mentor · set ANTHROPIC_API_KEY on server for non-stub answers" : "Mock mode · set VITE_SERVER_URL in client/.env.local to enable real mentor"}
        </div>
      </div>
    </SidePanel>
  );
}
