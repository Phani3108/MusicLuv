import { useAtom } from "jotai";
import { settingsPanelAtom, prefsAtom, type UserPrefs } from "@/atoms/prefs";
import { authUserAtom, subscriptionAtom } from "@/atoms/billing";
import { userAtom } from "@/atoms/session";
import { SidePanel } from "./SidePanel";
import { signOut } from "@/lib/supabase";

/**
 * Settings panel. Centralizes user-level preferences — sargam mode,
 * metronome sound, mic noise gate, ghost-hand toggle, haptics,
 * accessibility, email opt-in — plus account actions (sign out,
 * delete data, export recitals).
 *
 * Any caller can toggle preferences globally: they're stored via
 * prefsAtom + persisted to localStorage. Consumers read prefsAtom
 * and react accordingly.
 */
export function SettingsPanel() {
  const [open, setOpen] = useAtom(settingsPanelAtom);
  const [prefs, setPrefs] = useAtom(prefsAtom);
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [sub, setSub] = useAtom(subscriptionAtom);
  const [user, setUser] = useAtom(userAtom);

  const toggle = (key: keyof UserPrefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSignOut = async () => {
    await signOut();
    setAuthUser(null);
    setSub({ plan: "free", status: "none" });
    setOpen(false);
  };

  const handleWipeLocalData = () => {
    if (!confirm("Wipe all local progress + preferences? Your account on the server is not affected. This cannot be undone on this device.")) return;
    localStorage.clear();
    setUser(null);
    setAuthUser(null);
    window.location.reload();
  };

  const handleExportData = () => {
    const blob = new Blob([JSON.stringify({ user, authUser, sub, prefs }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `musicluv-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <SidePanel title="Settings" open={open} onClose={() => setOpen(false)} width="w-full md:w-[28rem]">
      <div className="space-y-6">
        {authUser && (
          <section>
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Account</div>
            <div className="panel p-4 space-y-1">
              <div className="font-semibold">{authUser.displayName}</div>
              <div className="text-xs text-white/60">{authUser.email}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mt-2">
                {authUser.authProvider} · {sub.plan} plan
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Music preferences</div>
          <div className="space-y-1">
            <Row
              label="Sargam mode"
              desc="Show Indian svara names (Sa Re Ga Ma) instead of Western (C D E F)"
              checked={prefs.sargamMode}
              onChange={() => toggle("sargamMode")}
            />
            <Row
              label="Auto-play demo"
              desc="Play the target audio automatically when the Demo phase opens"
              checked={prefs.autoPlayDemo}
              onChange={() => toggle("autoPlayDemo")}
            />
            <Row
              label="Ghost hand overlay"
              desc="Shows the next key to press. Disable at L3+ to read from staff instead"
              checked={prefs.showGhostHand}
              onChange={() => toggle("showGhostHand")}
            />
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-sm mb-2">Metronome sound</div>
              <div className="grid grid-cols-3 gap-1">
                {(["tick", "wood", "beep"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPrefs((p) => ({ ...p, metronomeSound: opt }))}
                    className={`py-1.5 text-xs rounded-md border transition-colors ${
                      prefs.metronomeSound === opt
                        ? "bg-indigo-500/20 border-indigo-400/40"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Audio</div>
          <div className="space-y-1">
            <Row
              label="Microphone noise gate"
              desc="Suppress ambient room noise before grading"
              checked={prefs.micNoiseGate}
              onChange={() => toggle("micNoiseGate")}
            />
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Accessibility</div>
          <div className="space-y-1">
            <Row
              label="Reduced motion"
              desc="Disable decorative animations. Respects OS setting when enabled"
              checked={prefs.reducedMotion}
              onChange={() => toggle("reducedMotion")}
            />
            <Row
              label="Haptic feedback"
              desc="Short vibration on correct notes (mobile only)"
              checked={prefs.haptics}
              onChange={() => toggle("haptics")}
            />
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Notifications</div>
          <div className="space-y-1">
            <Row
              label="Email updates"
              desc="Lesson reminders, recital review notifications, product news"
              checked={prefs.emailOptIn}
              onChange={() => toggle("emailOptIn")}
            />
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your data</div>
          <div className="space-y-2">
            <button
              onClick={handleExportData}
              className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/10 text-sm text-left hover:bg-white/5"
            >
              ⤓ Export your data (JSON)
            </button>
            <button
              onClick={handleWipeLocalData}
              className="w-full p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 text-sm text-left text-rose-200 hover:bg-rose-500/10"
            >
              ⚠ Wipe local data on this device
            </button>
          </div>
        </section>

        {authUser && (
          <section>
            <button
              onClick={handleSignOut}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10"
            >
              Sign out
            </button>
          </section>
        )}

        <div className="text-[10px] text-white/30 text-center pt-4">MusicLuv · v0.1</div>
      </div>
    </SidePanel>
  );
}

function Row({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/5">
      <div className="flex-1 min-w-0">
        <div className="text-sm">{label}</div>
        <div className="text-[11px] text-white/50 leading-relaxed">{desc}</div>
      </div>
      <button
        onClick={onChange}
        className={`flex-shrink-0 w-10 h-6 rounded-full transition-colors relative ${
          checked ? "bg-indigo-500" : "bg-white/10"
        }`}
        role="switch"
        aria-checked={checked}
        type="button"
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
