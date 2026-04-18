# 🎵 MusicLuv

> Learn any instrument — from your first note to mastery.

**Duolingo for musical instruments.** Bite-sized lessons, real-time feedback from your own mic, and a complete path from complete novice to genius-level performer.

---

## ✨ What it does

- 🎹 **Teaches 20+ instruments** — piano, guitar, violin, drums, sitar, tabla, vocals, and more
- 📚 **Nine-level arc** — Standard (L1–3) · Pro (L4–6) · Genius (L7–9)
- 🎧 **Grades how you actually play** — listens through your mic, scores pitch / rhythm / tone / dynamics / consistency
- 👋 **Shows you everything** — where to press, what to do, what it should sound like
- 🪞 **Two-way feedback loop** — plays the target, listens to your take, shows them side-by-side so you can see exactly where you missed
- 🇮🇳 **Indian classical is first-class** — sargam, raga, taal, meend — built in, not bolted on
- 🌟 **Learn like the greats** — Ravi Shankar, Hendrix, A.R. Rahman, Zakir Hussain, Bill Evans, and more
- 📴 **Practice anywhere** — record offline, get graded when you're back online
- 🏅 **Earn real certificates** — Standard · Pro · Genius grade exams, shareable on LinkedIn

---

## 🎯 Who it's for

- 👶 Absolute beginners who've never touched an instrument
- 🎸 Self-taught musicians who want real structure + honest feedback
- 🎓 Advanced players chasing a recognized mastery credential
- 🌍 Learners worldwide — starts in English, Hindi next

---

## 🚀 Progress

- ✅ **Phase 1 shipped** — Web app with 8 instruments, practice studio, live pitch meter, timeline ribbon, artist gallery, lesson + mentor + progress + quests + library panels
- ✅ **Phase 2 shipped** — Python audio engine (FastAPI + librosa pYIN + weighted DTW + 5-dimension grading). 14/14 tests passing. Real mic → real score.
- 🚧 **Phase 3 in flight** — Piano, Guitar, Violin, Drums all taken to Genius level with full written exams, virtual playable instruments, two-way feedback overlays, and the Claude AI mentor

---

## 🗺️ Roadmap

| Phase | What ships |
|---|---|
| ✅ 1 | UI mocks (web client, mock grading) |
| ✅ 2 | Real audio grading (Python + CREPE + DTW) |
| 🚧 3 | 🎹 Piano · 🎸 Guitar · 🎻 Violin · 🥁 Drums — all to L9 Genius |
| 4 | 🪕 Sitar · 🎤 Vocals — all to L9 Genius |
| 5 | 💳 Monetization · 📱 Mobile apps (iOS + Android) · 🎛️ USB MIDI |
| 6 | 👥 Community · 🎓 Creator marketplace · 📜 Certification |
| 7+ | 14 more instruments, on a 4-week sprint cadence |

**Free tier philosophy:** every learner gets a full Standard Certificate (L1–L3) on their chosen instrument, free forever. Paywalls only after the value is undeniable.

---

## 🛠️ Try it locally

### 1️⃣ Web app

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

### 2️⃣ Audio engine (optional — enables real mic grading)

```bash
cd audio-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[test]"
uvicorn main:app --port 8001
```

Then add `VITE_AUDIO_ENGINE_URL=http://127.0.0.1:8001` to `client/.env.local` and restart the dev server. You'll see **● audio-engine live** in the top bar.

### 3️⃣ Run the tests

```bash
cd audio-engine && pytest          # 14 tests, synthetic audio
cd client && npx tsc -b --noEmit   # type check
```

---

## 📚 Documentation

- 🎯 [`docs/product-vision.md`](docs/product-vision.md) — what every lesson must contain, the two-way feedback spec, virtual-instrument specs, written exam system
- 💰 [`docs/platform-roadmap.md`](docs/platform-roadmap.md) — tiers, pricing, unit economics (applies from Phase 5 onward)

---

## 🏗️ Tech stack

- **Frontend:** Vite + React + TypeScript + Jotai + Tailwind — one codebase for web + mobile (Capacitor later)
- **Backend:** Node + Express + Socket.IO (Phase 3+)
- **Audio engine:** Python FastAPI + librosa + CREPE + Basic Pitch + Demucs + weighted DTW
- **AI mentor:** Claude API (Phase 3)
- **Data:** plain TS catalogs + Postgres (Phase 3+)
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
