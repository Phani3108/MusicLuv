/**
 * LLM provider abstraction — ported from 3DWorld/server/llm/providerCatalog.js.
 *
 * Three providers:
 *   • "anthropic" — Claude Sonnet 4.6 via /v1/messages
 *   • "openai"    — GPT-4o-mini via /v1/chat/completions
 *   • "stub"      — deterministic echo; used when no API key is set.
 *
 * Selection: env LLM_PROVIDER=anthropic|openai|stub
 *            env ANTHROPIC_API_KEY / OPENAI_API_KEY / LLM_API_KEY
 *            env LLM_MODEL
 */

const ANTHROPIC_DEFAULT_MODEL = "claude-sonnet-4-6";
const OPENAI_DEFAULT_MODEL = "gpt-4o-mini";
const MAX_ANSWER_TOKENS = 300;
const REQUEST_TIMEOUT_MS = 15_000;

export interface HistoryTurn {
  role: "user" | "mentor";
  text: string;
  at?: number;
}

export interface ProviderResult {
  ok: boolean;
  text?: string;
  error?: string;
  detail?: string;
  retryable?: boolean;
  usage?: { total_tokens?: number; input_tokens?: number; output_tokens?: number } | null;
  stub?: boolean;
}

export interface Provider {
  id: "anthropic" | "openai" | "stub";
  model: string;
  answer(args: { system: string; user: string; history?: HistoryTurn[] }): Promise<ProviderResult>;
}

const envKey = () =>
  process.env.LLM_API_KEY ||
  process.env.ANTHROPIC_API_KEY ||
  process.env.OPENAI_API_KEY ||
  "";
const envModel = () => process.env.LLM_MODEL || "";

const resolveProviderId = (): "anthropic" | "openai" | "stub" => {
  const raw = (process.env.LLM_PROVIDER || "").toLowerCase();
  if (raw === "anthropic" || raw === "openai" || raw === "stub") return raw;
  if (process.env.ANTHROPIC_API_KEY || /^sk-ant-/i.test(envKey())) return "anthropic";
  if (process.env.OPENAI_API_KEY || /^sk-[A-Za-z0-9]/i.test(envKey())) return "openai";
  return "stub";
};

const timedFetch = async (url: string, options: RequestInit, timeoutMs = REQUEST_TIMEOUT_MS) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
};

const anthropicProvider: Provider = {
  id: "anthropic",
  model: envModel() || ANTHROPIC_DEFAULT_MODEL,
  async answer({ system, user, history = [] }) {
    const apiKey = process.env.ANTHROPIC_API_KEY || envKey();
    if (!apiKey) return { ok: false, error: "no_api_key", retryable: false };

    const messages: Array<{ role: "assistant" | "user"; content: string }> = history.map((h) => ({
      role: h.role === "mentor" ? "assistant" : "user",
      content: h.text,
    }));
    messages.push({ role: "user", content: user });

    try {
      const res = await timedFetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: MAX_ANSWER_TOKENS,
          system,
          messages,
        }),
      });
      if (!res.ok) {
        const status = res.status;
        const txt = await res.text().catch(() => "");
        return {
          ok: false,
          error: `anthropic_${status}`,
          detail: txt.slice(0, 200),
          retryable: status >= 500 || status === 429,
        };
      }
      const data = (await res.json()) as { content?: Array<{ text?: string }>; usage?: any };
      const text = Array.isArray(data.content)
        ? data.content
            .map((b) => b.text)
            .filter(Boolean)
            .join("\n")
            .trim()
        : "";
      if (!text) return { ok: false, error: "empty_response", retryable: true };
      return { ok: true, text, usage: data.usage ?? null };
    } catch (e) {
      const err = e as Error;
      return {
        ok: false,
        error: err.name === "AbortError" ? "timeout" : "network_error",
        detail: err.message,
        retryable: true,
      };
    }
  },
};

const openaiProvider: Provider = {
  id: "openai",
  model: envModel() || OPENAI_DEFAULT_MODEL,
  async answer({ system, user, history = [] }) {
    const apiKey = process.env.OPENAI_API_KEY || envKey();
    if (!apiKey) return { ok: false, error: "no_api_key", retryable: false };
    const messages: Array<{ role: "system" | "assistant" | "user"; content: string }> = [
      { role: "system", content: system },
    ];
    for (const h of history) {
      messages.push({ role: h.role === "mentor" ? "assistant" : "user", content: h.text });
    }
    messages.push({ role: "user", content: user });

    try {
      const res = await timedFetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: MAX_ANSWER_TOKENS,
          temperature: 0.7,
          messages,
        }),
      });
      if (!res.ok) {
        const status = res.status;
        const txt = await res.text().catch(() => "");
        return {
          ok: false,
          error: `openai_${status}`,
          detail: txt.slice(0, 200),
          retryable: status >= 500 || status === 429,
        };
      }
      const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }>; usage?: any };
      const text = data.choices?.[0]?.message?.content?.trim() || "";
      if (!text) return { ok: false, error: "empty_response", retryable: true };
      return { ok: true, text, usage: data.usage ?? null };
    } catch (e) {
      const err = e as Error;
      return {
        ok: false,
        error: err.name === "AbortError" ? "timeout" : "network_error",
        detail: err.message,
        retryable: true,
      };
    }
  },
};

const stubProvider: Provider = {
  id: "stub",
  model: "stub-echo",
  async answer({ system, user }) {
    const personaCue = (system.match(/You are\s+([^.]+?)\.(?:\s|$)/i) || [])[1] || "your mentor";
    return {
      ok: true,
      text: `${personaCue} here — you asked "${user.slice(0, 120)}${user.length > 120 ? "…" : ""}". (Real Claude answer lands once ANTHROPIC_API_KEY is set.)`,
      usage: null,
      stub: true,
    };
  },
};

const PROVIDERS: Record<"anthropic" | "openai" | "stub", Provider> = {
  anthropic: anthropicProvider,
  openai: openaiProvider,
  stub: stubProvider,
};

export const getActiveProvider = (): Provider => PROVIDERS[resolveProviderId()];
export const listProviders = () => Object.values(PROVIDERS).map((p) => ({ id: p.id, model: p.model }));
export const MAX_LLM_ANSWER_TOKENS = MAX_ANSWER_TOKENS;
