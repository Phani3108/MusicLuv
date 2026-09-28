# 🎵 MusicLuv

> Learn any instrument — from your first note to mastery.

**Duolingo for musical instruments.** Bite-sized lessons, real-time feedback from your own mic, and a complete path from complete novice to genius-level performer.

---

## ✨ What it does

- 🎹 **8 instruments today, 20+ planned** — piano, guitar, violin, drums, sitar, tabla, flute, vocals
- 📚 **Nine-level arc** — Standard (L1–3) · Pro (L4–6) · Genius (L7–9)
- 🎧 **Grades how you actually play** — listens through your mic, scores pitch (in cents), rhythm and consistency; tone and dynamics next
- 👋 **Shows you everything** — where to press, what to do, what it should sound like
- 🪞 **Two-way feedback loop** — plays the target, listens to your take, shows them side-by-side so you can see exactly where you missed
- 🇮🇳 **Indian classical is first-class** — sargam, raga, taal, meend — built in, not bolted on
- 🌟 **Learn like the greats** — Ravi Shankar, Hendrix, A.R. Rahman, Zakir Hussain, Bill Evans, and more
- 📴 **Practice anywhere** — record offline, get graded when you're back online
- 🏅 **Certificates (planned)** — Standard · Pro · Genius grade exams, once proctoring exists

---

## 🎯 Who it's for

- 👶 Absolute beginners who've never touched an instrument
- 🎸 Self-taught musicians who want real structure + honest feedback
- 🎓 Advanced players chasing a recognized mastery credential
- 🌍 Learners worldwide — starts in English, Hindi next

---

## 🚦 Status — what's real today

| Area | State |
|---|---|
| Grading (audio engine) | ✅ Real for single-line pitched playing and for timing (claps, drums, tabla via onsets): continuous-cents intonation, repeated notes, late starts and tempo handled. Needs the engine running. |
| Tone & dynamics | ⏳ Not graded yet — shown as "not graded", never faked into the score. |
| Chords / polyphony via mic | ⏳ Not graded (grader is single-line). MIDI input is next. |
| Without the engine | 🎭 Demo mode — grades are labelled **Simulated**, award no XP, never complete lessons. |
| Accuracy on real recordings | ⏳ Unmeasured until the teacher-labelled corpus exists — see [`docs/recording-guide.md`](docs/recording-guide.md). |
| Offline takes | ✅ Saved on-device and graded when back online (the app shell itself isn't offline yet). |
| Phone | ⚠️ Works in mobile browsers (touch fixed); native Capacitor builds not set up yet. |
| Server | ✅ Boots; identity from verified Supabase JWTs; routes authorized. Flat-file storage (Postgres/RLS next). |
| Content | Piano / guitar / violin / sitar / drums / tabla / flute / vocals hand-authored at L1–L3 to varying depth; 14 more instruments are generated scaffolding (hidden by default). Reference audio is synthesized, not recorded. |
| Community, creator, proctoring, live lessons, teacher dashboard | 🙈 Hidden behind feature flags (`VITE_FEATURES` / `FEATURES`) until the core loop is validated. |
| Certificates | ❌ Not a credential yet — needs proctoring, standards and anti-cheat. |

## 🗺️ Roadmap

| Phase | What ships |
|---|---|
| ✅ 0 | Grading, security and mobile fixes; real-audio test harness |
| 1 | Measure: teacher-labelled real recordings; releases gated on agreement with the teacher |
| 2 | On-device grading (laptop + phone, offline, live feedback) · MIDI for piano · Sa-relative intonation for Indian classical voice |
| 3 | Accounts (Supabase + RLS) · teacher layer: assign, listen, review |
| 4 | Piano L1–L3 + Hindustani voice L1–L2 with real recordings · beta with teachers and their students |
| Later | Monetization, more instruments, community — once the loop is proven with real learners |

**Free tier philosophy:** every learner gets a full Standard Certificate (L1–L3) on their chosen instrument, free forever. Paywalls only after the value is undeniable.

---

## 🛠️ Try it locally

### 1️⃣ Web app

```bash
npm ci                 # from the repo root (client is a workspace)
cd client && npm run dev
```

Open http://localhost:5173 — without the engine it runs in demo mode.

### 2️⃣ Audio engine (real grading)

```bash
cd audio-engine
python3 -m venv .venv && source .venv/bin/activate   # Python 3.10–3.12
pip install -e ".[test]"
uvicorn main:app --port 8001
```

Add `VITE_AUDIO_ENGINE_URL=http://127.0.0.1:8001` to `client/.env.local` and restart the dev server. The studio chip shows **● grader live** once `/health` answers.

### 3️⃣ Server (mentor chat, launch status)

```bash
cd server && npm ci && npm run dev    # http://localhost:8000
```

Add `VITE_SERVER_URL=http://127.0.0.1:8000` to `client/.env.local`. Set `SUPABASE_JWT_SECRET` for real identity (required with `NODE_ENV=production`); see `server/.env.example`.

### 4️⃣ Tests

```bash
cd audio-engine && pytest -q                         # grading edge cases + real-corpus gate
cd client && npm run typecheck && npm test           # Node 22.7+
cd server && npm run typecheck && npm test           # auth, quests, style, reviews
```

## 📚 Documentation

- 🎯 [`docs/product-vision.md`](docs/product-vision.md) — what every lesson must contain, the two-way feedback spec, virtual-instrument specs, written exam system
- 💰 [`docs/platform-roadmap.md`](docs/platform-roadmap.md) — tiers, pricing, unit economics (applies from Phase 5 onward)

---

## 🏗️ Tech stack

- **Frontend:** Vite + React + TypeScript + Jotai + Tailwind — one codebase for web + mobile (Capacitor later)
- **Backend:** Node + Express (`server/`)
- **Audio engine:** Python FastAPI + librosa pYIN + onset detection + order-preserving alignment with offset/tempo fit (CREPE, Basic Pitch, Demucs are optional extras)
- **AI mentor:** Claude via the server's mentor proxy (stub until `ANTHROPIC_API_KEY` is set)
- **Data:** shared TS catalogs (`shared/catalogs`) + flat-file JSON server storage (optional Postgres dual-write)
- **Architecture pattern:** borrowed from [3DWorld](https://github.com/Phani3108/3DWorld) — data-driven catalogs, atomic flat-file → Postgres migration, pluggable LLM providers with cost guards

---

## ❤️ Why this, why now

No existing app does all of these at once:

- 🎯 Takes a learner **all the way to mastery** (Yousician and Simply Piano plateau at intermediate)
- 🕉️ Treats **Indian classical** as first-class (nobody else does it well)
- 🎨 Lets you **learn a specific artist's style** (not just a genre)
- 🎹 Covers **20+ instruments** under one progression system

That's the wedge. That's why MusicLuv.

---

## 📝 License

MIT — see [LICENSE](LICENSE).

> Built with ☕ and stubbornness. Contributions welcome once Phase 3 ships.
