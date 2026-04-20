import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { authPanelOpenAtom, authUserAtom, planPickerOpenAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { emailAuth, oauthRedirect, isConfigured as isSupabaseConfigured } from "@/lib/supabase";

/**
 * Auth panel. Supports: beta code (Phase 3/4), Google, Apple, email/password.
 * Production path wires to Supabase OAuth. Stubbed here for Phase 5 scaffolding.
 */
export function AuthPanel() {
  const [open, setOpen] = useAtom(authPanelOpenAtom);
  const setUser = useSetAtom(authUserAtom);
  const setPlanPicker = useSetAtom(planPickerOpenAtom);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [betaCode, setBetaCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const afterAuth = (user: { id: string; email: string; displayName: string; authProvider: "email" | "google" | "apple" | "beta-code"; avatarUrl?: string }) => {
    setUser(user);
    setOpen(false);
    setPlanPicker(true);
  };

  const supaConfigured = isSupabaseConfigured();

  const handleEmail = async () => {
    setBusy(true); setError(null);
    try {
      if (!email.includes("@")) throw new Error("Invalid email");
      if (supaConfigured) {
        const session = await emailAuth(mode, email, password);
        afterAuth({
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.displayName,
          authProvider: "email",
          avatarUrl: session.user.avatarUrl,
        });
      } else {
        // Dev-only fallback — no Supabase project configured. Useful for
        // local development without auth infra. In prod, set VITE_SUPABASE_URL.
        await new Promise((r) => setTimeout(r, 300));
        afterAuth({ id: `dev_${Date.now()}`, email, displayName: email.split("@")[0], authProvider: "email" });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setBusy(true); setError(null);
    try {
      if (supaConfigured) {
        // Redirects the browser — after sign-in the callback handler in
        // App boot (absorbOAuthCallback) populates authUserAtom.
        oauthRedirect(provider);
        return; // navigation happens
      }
      // Dev-only fallback.
      await new Promise((r) => setTimeout(r, 300));
      afterAuth({ id: `dev_${Date.now()}`, email: `${provider}@example.com`, displayName: `${provider} user`, authProvider: provider });
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  };

  const handleBetaCode = async () => {
    setBusy(true); setError(null);
    try {
      if (betaCode.length < 4) throw new Error("Beta code too short");
      // Production: validate against /api/v1/auth/beta-code
      await new Promise((r) => setTimeout(r, 300));
      afterAuth({ id: `beta_${betaCode}`, email: `beta+${betaCode}@musicluv.app`, displayName: `Beta ${betaCode}`, authProvider: "beta-code" });
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <SidePanel title={mode === "signin" ? "Sign in" : "Create account"} open={open} onClose={() => setOpen(false)} width="w-full md:w-[26rem]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button disabled={busy} onClick={() => handleOAuth("google")}
            className="py-2.5 rounded-lg bg-white/90 text-ink-900 text-sm font-semibold hover:bg-white disabled:opacity-40">
            Continue with Google
          </button>
          <button disabled={busy} onClick={() => handleOAuth("apple")}
            className="py-2.5 rounded-lg bg-black text-white text-sm font-semibold border border-white/20 hover:bg-white/5 disabled:opacity-40">
             Apple
          </button>
        </div>

        <div className="flex items-center gap-2 text-white/30 text-xs">
          <div className="flex-1 border-t border-white/10" />
          <span>or</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        <div className="space-y-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com"
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-indigo-400 focus:outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-indigo-400 focus:outline-none" />
          <button disabled={busy} onClick={handleEmail}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold disabled:opacity-40">
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </div>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-xs text-white/60 hover:text-white/80">
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>

        <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-amber-300">Private beta</div>
          <input value={betaCode} onChange={(e) => setBetaCode(e.target.value)} placeholder="Beta code"
            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm" />
          <button disabled={busy || !betaCode} onClick={handleBetaCode}
            className="w-full py-2 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm disabled:opacity-40">
            Enter with beta code
          </button>
        </div>

        {error && <div className="text-xs text-rose-400">{error}</div>}

        <p className="text-[10px] text-white/40 text-center">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </SidePanel>
  );
}
