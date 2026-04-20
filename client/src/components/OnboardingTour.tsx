import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/session";

/**
 * First-run tour that overlays the studio on initial entry and walks the
 * learner through the 9-phase lesson arc. Dismissible at any step;
 * "onboardedAt" on UserProfile is used to mark completion so subsequent
 * visits skip it.
 *
 * Works as a floating callout that points at successive surfaces:
 * phase progress → virtual instrument → pitch meter → mentor button →
 * nav drawer → practice CTA.
 */

interface TourStep {
  title: string;
  body: string;
  /** Optional CSS selector for the surface to point at. Fallbacks to centered. */
  anchor?: string;
  /** Where the callout sits relative to the anchor. */
  placement?: "top" | "bottom" | "left" | "right" | "center";
}

const STEPS: TourStep[] = [
  {
    title: "Welcome to the studio.",
    body: "Every lesson runs through the same 9-phase arc: concept → demo → play → attempt → feedback → mastery. You can't skip ahead — each phase has to click before the next unlocks.",
    placement: "center",
  },
  {
    title: "Your instrument, live.",
    body: "The hero in the middle is a playable instrument. Click or use your keyboard to try notes any time — even before a lesson starts.",
    anchor: "[data-piano-root]",
    placement: "bottom",
  },
  {
    title: "Your pitch, in real time.",
    body: "When you record, this meter shows how far off you are from the target note. Green = under 15¢, amber = 15–35¢, red = larger. It's honest feedback.",
    anchor: "[data-pitch-meter]",
    placement: "top",
  },
  {
    title: "Your mentor, any time.",
    body: "Stuck on a phrase? Tap the 💬 to ask a genre-specific mentor. They remember the last 10 turns of your conversation.",
    anchor: "[data-mentor-button]",
    placement: "bottom",
  },
  {
    title: "Navigate through the drawer.",
    body: "Tap the ☰ menu for progress, quests, song library, artists, and more. The drawer is where everything lives so the studio stays focused.",
    anchor: "[data-nav-drawer-button]",
    placement: "bottom",
  },
  {
    title: "Now make some noise.",
    body: "Start your first lesson from the 9-phase panel below. Record an attempt, watch your pitch vs. the target, and earn your first Standard certificate.",
    placement: "center",
  },
];

const LS_KEY = "musicluv:tourDismissed";

export function OnboardingTour() {
  const user = useAtomValue(userAtom);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Show on first login: user exists, but the tour hasn't been dismissed
  // AND the user hasn't been onboarded yet on this device.
  useEffect(() => {
    const dismissed = localStorage.getItem(LS_KEY) === "true";
    if (!user) return setVisible(false);
    if (dismissed) return setVisible(false);
    setVisible(true);
  }, [user]);

  // Measure the current step's anchor.
  useEffect(() => {
    if (!visible) return;
    const measure = () => {
      const s = STEPS[step];
      if (!s.anchor) {
        setRect(null);
        return;
      }
      const el = document.querySelector(s.anchor) as HTMLElement | null;
      setRect(el ? el.getBoundingClientRect() : null);
    };
    measure();
    const t = window.setInterval(measure, 400);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.clearInterval(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step, visible]);

  if (!visible) return null;

  const cur = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;
  const place = cur.placement ?? "bottom";

  const next = () => {
    if (isLast) finish();
    else setStep(step + 1);
  };
  const prev = () => setStep(Math.max(0, step - 1));
  const finish = () => {
    localStorage.setItem(LS_KEY, "true");
    setVisible(false);
  };

  // Compute callout position relative to anchor.
  let style: React.CSSProperties;
  if (!rect || place === "center") {
    style = { left: "50%", top: "50%", transform: "translate(-50%, -50%)" };
  } else {
    let left = rect.left + rect.width / 2;
    let top = rect.top + rect.height / 2;
    switch (place) {
      case "top":
        top = rect.top - 20;
        left = rect.left + rect.width / 2;
        style = { left, top, transform: "translate(-50%, -100%)" };
        break;
      case "bottom":
        top = rect.bottom + 16;
        left = rect.left + rect.width / 2;
        style = { left, top, transform: "translate(-50%, 0)" };
        break;
      case "left":
        top = rect.top + rect.height / 2;
        left = rect.left - 16;
        style = { left, top, transform: "translate(-100%, -50%)" };
        break;
      case "right":
        top = rect.top + rect.height / 2;
        left = rect.right + 16;
        style = { left, top, transform: "translate(0, -50%)" };
        break;
      default:
        style = { left, top, transform: "translate(-50%, -50%)" };
    }
  }

  return (
    <>
      {/* dim everything except the spotlighted anchor */}
      <div className="fixed inset-0 z-[70] pointer-events-none">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {rect && place !== "center" && (
          <div
            className="absolute border-2 border-amber-300/70 rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] pointer-events-none transition-all duration-300"
            style={{
              left: rect.left - 6,
              top: rect.top - 6,
              width: rect.width + 12,
              height: rect.height + 12,
            }}
          />
        )}
      </div>

      {/* callout */}
      <div
        className="fixed z-[71] max-w-sm pointer-events-auto"
        style={style}
      >
        <div className="panel p-5 bg-ink-800 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-widest text-indigo-300">
              Step {step + 1} of {STEPS.length}
            </div>
            <button
              onClick={finish}
              className="text-white/40 hover:text-white/70 text-sm"
              title="Dismiss tour"
            >
              Skip
            </button>
          </div>
          <h3 className="display text-lg font-semibold mb-2">{cur.title}</h3>
          <p className="text-sm text-white/75 leading-relaxed mb-4">{cur.body}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={isFirst}
              className="btn-ghost text-xs disabled:opacity-30"
            >
              ← Back
            </button>
            <div className="flex-1 flex gap-1 justify-center">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === step ? "bg-indigo-400" : i < step ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="btn-primary text-xs">
              {isLast ? "Start playing →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
