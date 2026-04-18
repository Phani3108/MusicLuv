# MusicLuv — Platform & Monetization Roadmap

## Where we are today

Two phases shipped:

- **Phase 1 — UI mocks.** Full Vite + React + Jotai + Tailwind client with 8 instruments, 9-level tier structure, Practice Studio, 7 side panels, grading modal, mock API. Running at `localhost:5173`.
- **Phase 2 — Audio engine.** FastAPI + librosa (pYIN) + DTW + 5-dim scoring + lazy hooks for CREPE / Basic Pitch / Demucs. 14/14 tests passing. Running at `localhost:8001`. Client auto-switches from mock to real grading when `VITE_AUDIO_ENGINE_URL` is set.

What's missing to be a **real platform** (not a prototype): auth, persistence, payments, content at volume, mobile apps, community, creator tools, legal/compliance. This doc lays out how to get there and what it costs.

---

## Full-platform feature inventory

Organized by what's needed to satisfy the original vision:

### 1. Learning (the core product)

| Shipped | In progress | Not started |
|---|---|---|
| Mock practice loop | Real CREPE grading pipeline | **Complete L1–L2 content** (piano only; need all 20+) |
| Lesson catalog shape | Raga/taal catalog shape | **L3–L9 content** for every instrument |
| 9-level tier system | DTW scoring | Video lesson playback (instructor demos) |
| Piano visual | | 20 photoreal instrument visuals |
| Sitar visual (stylized) | | Interactive instrument dissection (X-ray) |
| Mic capture + WAV encode | | Polyphonic grading (Basic Pitch prod install) |
| | | Ear-training module (intervals, chords, rhythm dictation) |
| | | Sight-reading trainer |
| | | Composition tool (DAW-lite, 16-bar composer) |
| | | Ornament / gamaka pattern recognition |
| | | Backing tracks + play-along library |
| | | Song upload (Demucs + Basic Pitch prod install) |

### 2. Progression & gamification

| Shipped | Not started |
|---|---|
| XP + tier catalog | Hearts (atom exists, not enforced) |
| Streak display | Streak freeze / weekend pass |
| Quest catalog shape | Leagues (weekly bronze→diamond) |
| Mentor chat (mock) | Badges persistence |
| | Daily re-engagement notifications |
| | Weekly challenges (community-wide) |
| | Recital submissions |
| | Peer-review workflow |

### 3. Social / community

Zero shipped. All new:

- Public profiles with progress + recital feed
- Follow / subscribe mechanic
- Comments on recitals
- Global + per-instrument leaderboards
- Study groups / cohorts
- Teacher ↔ student linking (private teacher runs class through MusicLuv)
- Duet mode (real-time practice with another user over WebRTC)

### 4. Creator / teacher platform

Zero shipped. All new:

- Teacher dashboards (see student progress + assign lessons)
- Curriculum authoring tool (create lessons via catalog UI)
- Artist portal (labels/estates publish signature-lick libraries for revenue share)
- Revenue share payout (Stripe Connect)

### 5. Monetization infrastructure

Zero shipped. All new:

- Auth (email + Google + Apple OAuth)
- Real database (Postgres — Neon or Supabase managed)
- Stripe subscriptions + checkout + customer portal
- App Store / Play Store in-app purchase (StoreKit / Google Billing)
- Paywall logic per feature (locked lessons, locked instruments, gated artist paths)
- Free-trial flow + referral program + coupons + gift subscriptions
- Email (transactional + lifecycle: Resend + Postmark)

### 6. Platform infrastructure

| Shipped | Not started |
|---|---|
| Client on Vite | Real prod deploy (Vercel client + Render/Fly server + Railway audio-engine) |
| Python audio-engine | Cloud audio storage (S3 + signed URLs) |
| | CDN for lesson media (Cloudflare) |
| | Capacitor iOS + Android (App Store + Play Store) |
| | Push notifications (OneSignal / APNs / FCM) |
| | Analytics (PostHog) + A/B testing |
| | Error tracking (Sentry) |
| | Customer support (Intercom / Crisp) |
| | Admin dashboard |
| | Observability (logs + metrics + uptime) |
| | Accessibility (WCAG 2.1 AA) |
| | i18n (Hindi, Tamil, Spanish, Portuguese, Mandarin) |
| | Offline mode (service worker + lesson caching) |

### 7. Legal / compliance

Zero shipped:

- Terms of service
- Privacy policy
- GDPR + CCPA
- COPPA (age-13+ gating for kids)
- Music rights (mechanical, synchronization licenses for covered songs)
- Artist likeness licenses for premium artist paths
- Payment regulations (PCI via Stripe, Indian regulations for ₹ billing)

### 8. Hardware / integrations

Zero shipped:

- USB MIDI controller support (read MIDI directly, skip mic for keyboard/drum-pad users — much better grading accuracy)
- Bluetooth audio interface support (iPad + Apogee Jam style)
- Apple Watch / WearOS companion (practice streak + metronome)
- Hardware partner bundles (Yamaha keyboard ships with 12 months MusicLuv Pro)

### 9. AI / ML depth

| Shipped | Not started |
|---|---|
| CREPE/pYIN pitch | **Claude LLM mentor** (the deferred Phase-2 from the original plan) |
| DTW grading | Real-time mid-performance corrective feedback (not just end-of-exercise) |
| Mock mentor | Personalized practice recommendations (find your weak dims, suggest next exercise) |
| | AI-generated exercises tailored to your weaknesses |
| | Style fingerprint matching (did your improvisation sound like Hendrix?) |
| | Voice commands ("slower", "repeat last bar") |

---

## Monetization model

**Recommended: freemium + tiered subscription + marketplace (Phase 7+).**

Matches the Standard / Pro / Genius naming you already chose — the tiers double as product tiers.

### Tier pricing (global default, adjusted per-geo via Stripe's adaptive pricing)

| Tier | Monthly | Annual | What you get |
|---|---|---|---|
| **Free (Standard L1–3)** | $0 | — | 1 instrument, Levels 1–3, 5 hearts/day, 10 songs from library, 1 mentor, mock-grade-only fallback when offline |
| **Pro ($9.99/mo)** | $9.99 | $79 ($6.58/mo effective) | All 20+ instruments, L1–L6 (Standard + Pro), unlimited hearts, full song library, song upload, all mentors, cross-instrument progression |
| **Genius ($19.99/mo)** | $19.99 | $159 ($13.25/mo effective) | L7–L9 (Genius tier), artist-style paths (Ravi Shankar, Hendrix, Rahman, etc.), composition tool, 4 human-reviewed recitals/month, MusicLuv-certified exam eligibility |
| **Family (Pro only)** | $15.99 | $119 | 4 learners, separate progress per learner |
| **Student (Pro)** | $4.99 | $39 | With .edu verification |
| **Lifetime Genius** | — | $399 one-time | All Genius features forever (capped promo tool, 500-unit drops for launch loyalty) |

**Geographic adjustment**: India tier is ~₹249/mo Pro, ₹499/mo Genius (roughly 30% of USD). Latam and SEA get ~50% discount. This is standard practice and materially expands TAM.

### Additional revenue streams (phased in)

1. **Microtransactions (Phase 6+):** Pay à la carte to unlock a single artist path ($4.99), single raga deep-dive ($2.99), or single song transcription ($1.99) — for free-tier users who want a specific thing without full Pro.
2. **MusicLuv Certified exams (Phase 8):** $29 proctored Level-3 / $49 Level-6 / $99 Level-9 exams. LinkedIn-shareable certificates. Upsell path for Pro users.
3. **Marketplace (Phase 7):** Third-party teachers publish courses; MusicLuv takes 20-30% platform fee. Also: 1:1 live video lessons brokered through the app (teacher lists availability, MusicLuv takes 15% + Stripe fees).
4. **B2B / schools (Phase 9):** Per-seat licenses for music schools ($3-5/student/month, 50+ seat minimums). Teacher dashboards are the hook.
5. **Hardware partnerships (Phase 9):** Yamaha/Fender/Casio bundles ("comes with 12 months MusicLuv Pro"). We get wholesale pricing + logo placement in their bundle landing pages; they get a stickier first-90-days for new instrument owners.
6. **Publishing / licensing (Phase 9):** Music publishers pay to get their catalog into MusicLuv's curated song library (they get promotion + royalties on play-alongs).
7. **Referrals (Phase 3):** Give 1 month free Pro for each friend who becomes paying. Drives organic growth, cheap CAC.

### Unit economics (targets, to validate in Phase 3)

- **Conversion free → paid:** 4% target (music-learning apps range 3-6%; Duolingo is ~8% but they've been optimizing for 10 years).
- **Pro / Genius mix** among paying users: ~75 / 25.
- **Blended ARPU:** ~$13/mo.
- **Average retention:** 9 months (ambitious; Yousician averages ~7).
- **Blended LTV:** ~$117 per paying user.
- **CAC target:** <$25 paid, <$5 organic/referral. App Store featuring + SEO + YouTube content + Indian-classical niche gives us an organic wedge.
- **Break-even:** ~50k paying users (~1.25M free signups). At 4% conversion and with the Indian classical + 20-instrument differentiation, this is achievable in 24 months with the right content velocity.

### Free-tier guardrails that drive conversion

Everything that's behind the paywall has to be **visible but locked** — browsing generates desire:

- Artist gallery: browse everyone, preview samples, but starting a path requires Pro.
- Library: see every song, preview 15 seconds, but loading into studio requires Pro beyond the first 10.
- Levels: see the whole 9-level ladder, but L4+ shows a "Pro to unlock" chip on each lesson card.
- Song upload: free users get 1 upload/month; Pro unlocks unlimited.
- Mentor chat: free users get 5 messages/day with canned replies; Pro unlocks unlimited LLM-backed.

---

## Phased roadmap (building on Phases 1 & 2 already shipped)

**Team assumed:** 2 engineers + 1 music educator + 1 part-time designer (contractor).
**Cadence:** each phase ends with a demo-able release; content track runs one phase behind engineering.

### Phase 3 — Minimum Shippable Product (MSP) · 8 weeks · **ship to first paying customers**

The minimum thing people will pay for. Web-only. One instrument (piano) taken through L1–L3 properly.

**Engineering:**
- Auth: Supabase (email + Google + Apple OAuth) — fastest path, managed Postgres included
- Real DB: migrate flat-file JSON persistence to Supabase Postgres behind the same interface
- Full Node backend (Express + Socket.IO) — port 3DWorld's persistence pattern + rate limiter + llm folder
- **LLM mentor** (Claude via Anthropic SDK) — the deferred Phase-2 from the original roadmap
- Stripe subscriptions (Pro monthly + annual; Genius shipped but gated until Phase 8 content exists)
- Paywall middleware (`requiresPaid(feature)` utility used by every locked route)
- Email: Resend for transactional + lifecycle
- Analytics: PostHog (free up to 1M events/month)
- Sentry error tracking
- Deploy: Vercel (client) + Render (Node server) + Railway (Python audio-engine)
- Public landing page (marketing site, shares `/client` design system)
- Legal: ToS + privacy policy (Termly or Iubenda templates, lawyer-reviewed before launch)

**Content (educator + contractors):**
- Piano L1–L3 complete: 18 lessons with recorded reference audio, proper written content, sight-read exercises
- Vocals L1–L3: ~12 lessons (singing is the cheapest 2nd instrument — zero hardware friction, highest conversion)
- 20 curated public-domain songs (Für Elise, Ode to Joy, Twinkle, scales, Ave Maria, etc.)

**Gamification:**
- Hearts enforcement (5/day, lose on failed level-up test, refill at midnight or daily-quest complete)
- Streaks hardened (real day-boundary logic, streak-freeze as Pro perk)
- 20+ daily/mastery quests

**Demo:** user signs up → gets 3 free lessons → hits paywall for L3.1 → pays $9.99 → finishes L3 → invites a friend.

**Success metric:** 100 paying customers in the 8 weeks after launch.

### Phase 4 — Mobile + second flagship · 6 weeks

Apps on the stores. Second serious instrument content.

**Engineering:**
- Capacitor iOS + Android builds, real App Store + Play Store submissions
- App Store / Play Store in-app purchase integration (StoreKit 2 + Google Billing) — can't use Stripe inside iOS apps for subscriptions
- Push notifications (OneSignal or per-store)
- Offline mode: service worker caches lesson content + last 3 exercises
- USB MIDI support: `navigator.requestMIDIAccess()` — for piano users, grading accuracy skyrockets because we read key events directly instead of mic
- Apple/Google Sign-In on mobile (same account, not a new auth)

**Content:**
- Guitar L1–L3 (18 lessons; chord library, strum patterns, sightreading tabs)

**Gamification:**
- Weekly leagues (bronze → silver → gold → diamond → legend)
- League promotion/demotion logic

**Demo:** iOS user signs up from App Store, practices on the train offline, progress syncs when back online. MIDI keyboard user plugs in a controller and the timeline shows perfect green ticks.

### Phase 5 — Indian classical as first-class + song upload · 6 weeks

The cultural differentiator. Marketing wedge for the Indian diaspora + global world-music learners.

**Engineering:**
- Deploy Demucs + Basic Pitch to prod audio-engine (heavier container, ~2.5GB — Railway can host; worst case, spin up on-demand)
- Song upload backend: yt-dlp with ToS disclaimer + direct file upload, async job queue (BullMQ on Redis), transcription results stored per-user
- Step timeline UI (the `/transcribe` → scrollable instruction list we mocked) productionized
- Hindi UI translation (60 UI strings; most important user-facing 200 strings Phase 5, deep content later)
- Sargam notation rendering (Sa Re Ga Ma …)

**Content:**
- Sitar L1–L3 (15 lessons, raga Yaman + Bhairav seeded, meend exercises)
- Tabla L1–L3 (12 lessons, teentaal + rupak + jhaptal, bol recognition)
- Full raga catalog expanded to 20 ragas
- 30 additional curated songs (bhajans, film music instrumentals — check licensing)

**Marketing:**
- Indian-classical-first landing page (`/hindustani`) for Indian diaspora acquisition
- YouTube/Instagram content: "learn raga Yaman on sitar in 30 days"

**Demo:** user pastes a Coldplay YouTube URL → sees stem separation progress → 15 seconds later plays along to piano L2-appropriate step timeline. Indian user switches to sitar, opens Yaman, plays Sa → gets graded by the same pipeline using Indian pitch-note mapping.

### Phase 6 — Pro content (L4–L6) + composition tool · 10 weeks

Make the Pro subscription worth paying for.

**Engineering:**
- Composition tool v1 (`client/src/pages/ComposerPage.tsx`): 16-bar grid composer, MIDI playback via Tone.js, export to WAV/MIDI, save to profile, share as recital
- Ear-training module: interval / chord / rhythm dictation drills, spaced repetition
- Sight-reading trainer (randomized unseen phrases at user's current level)
- Microtransactions: à-la-carte unlocks for free users (single artist, single raga, single deep-dive)

**Content:**
- L4–L6 complete for piano, guitar, sitar, tabla, vocals — the flagship five (150 lessons total at this stage)
- Interactive instrument dissection: close-up explosion views for 5 key controls per instrument

**Community (new):**
- Public user profiles
- Recital submission (record in browser, attach to profile, make public)
- Weekly community challenges ("compose 8 bars in raga Bhimpalasi")

**Demo:** Pro subscriber finishes piano L6, composes a 16-bar piece in raga Yaman, posts as a recital, gets 12 peer reactions.

### Phase 7 — Community & creator platform · 10 weeks

Turn learners into teachers. Turn the app into a network.

**Engineering:**
- Follow/subscribe + public activity feed
- Comment threads on recitals
- Teacher dashboards (see student progress, assign lessons)
- Curriculum authoring tool (non-engineers can add lessons via a CMS-style UI that writes to `lessonCatalog` + reviewer workflow)
- Stripe Connect for creator payouts (revenue share: teachers get 70%, MusicLuv 30%)
- Marketplace listing for third-party courses
- 1:1 live lessons (WebRTC-based video, teacher sets availability, MusicLuv takes 15% + Stripe fees)

**Content / operations:**
- Recruit first 10 creator-teachers (beta cohort)
- Publish creator-content guidelines + pedagogy standards

**Demo:** private teacher signs up as a creator, publishes a 20-lesson Carnatic violin course, gets 30 students the first month, earns $600 in royalties.

### Phase 8 — Genius tier launch (L7–L9 + artist paths + certification) · 12 weeks

The endgame for committed learners. Justifies the Genius subscription tier.

**Engineering:**
- Human-reviewed recital queue: submit a L7+ recital, assigned to a human reviewer (paid network), get feedback in 48h
- Style-fingerprint matcher: take a student improvisation, compute tempo + scale + ornament density, compare to artist fingerprint, score similarity
- Certification exam engine: proctored (remote) exam with human review + automated grading combined; issue cryptographic certificate (PDF + LinkedIn deeplink)

**Content:**
- L7–L9 complete for flagship 5 instruments (90 lessons)
- 10 artist paths: Ravi Shankar, Jimi Hendrix, A.R. Rahman, Bill Evans, Zakir Hussain, Hariprasad Chaurasia, M.S. Subbulakshmi, Herbie Hancock, Prince, Ustad Bismillah Khan (20-40 signature licks each, curated + licensed where possible)
- First set of MusicLuv Certified Level-3 / Level-6 exams (content + rubric + reviewer training materials)

**Ops:**
- Recruit + train human reviewer network (~20 certified teachers, paid per review)
- Legal: artist-likeness licensing deals for premium artist paths

**Demo:** Genius subscriber finishes Jimi Hendrix's signature blues bends path, submits a recital, passes the Level-6 certification exam, posts the certificate to LinkedIn.

### Phase 9 — Scale & geographic expansion · ongoing

What we do after the product is feature-complete.

- **Instruments 6–20** as quarterly content drops: bass, ukulele, mandolin, bansuri, harmonium, mridangam, veena, cello, saxophone, trumpet, clarinet, accordion, electronic drums, DJ controller, synth, etc. Each is ~4-week content sprint, ~100-150 lessons.
- **Localization:** Tamil, Spanish, Portuguese, Mandarin, Bahasa, Arabic (priority order: India regional first, then Latam, then SEA/MENA).
- **Hardware partnerships:** Yamaha keyboards, Fender guitars, Korg synths, Indian instrument makers (Rikhi Ram, Ali Akbar College store). Bundle deal: "new instrument comes with 12 months of MusicLuv Pro."
- **B2B / schools:** Per-seat licensing, teacher admin tooling, SSO for school districts.
- **Enterprise wellness:** Corporate learning budget programs (same model as Headspace for Work).
- **Publishing deals:** Licensed song catalog expansions (Disney songs, Bollywood hits) — major revenue unlock once we have scale.

**Total to full-vision platform:** ~60 weeks engineering + content parallelized. Realistic: **~14–18 months** with the 2-eng + 1-educator team if everything goes right, ~24 months accounting for life.

---

## Strategic decisions to lock in

These materially change the plan. Current working assumptions noted — override any of them and the plan shifts.

| Decision | Current assumption | Alternatives | Impact if changed |
|---|---|---|---|
| Launch geo | Global English with Hindi in Phase 5 | India-first (Hindi UI from Phase 3); US-only (drop i18n entirely) | India-first moves Phase 5 content into Phase 3 (+4 weeks to MSP). US-only drops ~40% of TAM but simplifies legal & payments. |
| Pricing | Pro $9.99 / Genius $19.99 | Lower ($4.99/$9.99 — more volume, less ARPU); Higher ($14.99/$29.99 — premium positioning like MasterClass) | Lower = faster growth, longer break-even. Higher = slower growth, richer unit economics, requires more polish before launch. |
| Monetization primary | Freemium + subscription | B2B-first (sell to schools/teachers before consumers); Marketplace-first (teachers bring students to us) | B2B-first flips Phase 7 and Phase 3; different sales-heavy hires. Marketplace-first delays auth/billing integration. |
| Platform primary | Web-first PWA + Capacitor mobile | Native iOS/Android (React Native or Swift + Kotlin) | Native = 1.5x engineering. Web-first = faster ship + cheaper, slightly worse mic latency on iOS Safari. |
| Content strategy | AI-drafted + educator-reviewed | 100% human-authored (expensive, slow, high quality); 100% AI (cheap, fast, risky) | Hybrid is the right default. Flip only if a specific investor pushes back. |
| Team shape | 2 eng + 1 educator (plan assumes this) | Solo; 4+ eng funded startup | Solo = 3x timeline, drop Phase 7–9 from 18-month horizon. Funded = 2x velocity, ship full vision in 10 months. |
| Audio-engine hosting | Railway (managed, ~$50/mo early scale) | Self-hosted (EC2/GPU, cheaper at scale); Replicate/HuggingFace inference APIs (no infra) | Self-host needed past ~1000 concurrent graders. Inference APIs are fastest but vendor-lock. |

---

## The questions I can't answer for you

These three are the ones where I'd genuinely like a direction before I start coding Phase 3:

1. **What's the launch geography?** Global-English with Hindi later, or Indian-classical-first (Hindi from day one)? The Indian-classical angle is a genuine differentiator and the Indian diaspora is a motivated paying audience; going Hindi-first costs ~4 weeks in Phase 3 but could dramatically improve early conversion.
2. **MSP scope: narrow or broad?** Narrow = piano + vocals L1–L3 only, ship paid MVP in 8 weeks (my current plan). Broad = add guitar L1–L3 too, ship in 12 weeks with a more complete first impression. The counterargument to narrow: "Duolingo for one instrument" isn't the pitch.
3. **How do we fund content production?** The 20-instrument vision needs ~$150-300k in content creation costs over 18 months (recorded audio refs + photos + educator review time). Options: bootstrap + AI drafting (slowest, cheapest), raise a seed round (fastest, needs story), partner with a music school for educator bandwidth in exchange for revenue share (middle path).

---

## Launch plan for Phase 3 (MSP) · concrete checklist

Assuming the current assumptions stick, here's what the next 8 weeks look like:

**Week 1 — infrastructure foundation**
- [ ] Supabase project + Postgres schema (users, progress, attempts, quests, mentor_memory)
- [ ] Auth (email + Google + Apple); landing page stub
- [ ] Stripe account + test products (Pro monthly/annual, Genius monthly/annual)
- [ ] Sentry + PostHog accounts
- [ ] Scaffold Node + Express + Socket.IO at `server/` (port 3DWorld's patterns)
- [ ] Port `persistence.ts`, `rateLimiter.ts`, `llm/*` from 3DWorld

**Week 2 — backend critical path**
- [ ] `POST /api/v1/auth/*` routes (Supabase-backed)
- [ ] `POST /api/v1/grade` (proxy to audio-engine, attach user + paywall check)
- [ ] `POST /api/v1/stripe/webhooks` for subscription lifecycle
- [ ] Progress / attempt / quest stores migrated from flat-JSON to Postgres
- [ ] Paywall middleware: `requiresPaid("song_upload" | "artist_paths" | "l4_plus")` etc.

**Week 3 — LLM mentor (deferred Phase-2)**
- [ ] `server/llm/` module: provider catalog, memory store, cost guards (verbatim port)
- [ ] `buildMentorPrompt()` — mentor.bio + expertise + current-lesson + recent-grades
- [ ] Claude API integration with daily token budgets + rate limits
- [ ] Mentor chat swaps mock responses for real LLM when Pro tier detected

**Week 4 — content production track kicks off**
- [ ] Educator starts drafting piano L1–L3 lessons (18 lessons)
- [ ] Record reference audio for every exercise (educator or contractor piano player)
- [ ] Parallel: vocals L1–L3 drafts (12 lessons)

**Week 5 — payments + paywall UX**
- [ ] Stripe checkout integration (hosted checkout first, then in-app in Phase 4)
- [ ] "Upgrade to Pro" modals everywhere (song upload, L4+ lessons, artist path start)
- [ ] Customer portal for subscription management
- [ ] Free-trial flow (7 days free, cancel anytime)
- [ ] Promo codes + referral program (`/r/<username>` URL → friend gets 1 month Pro free)

**Week 6 — gamification hardening**
- [ ] Hearts (real enforcement, not just display)
- [ ] Streaks (real day-boundary logic, freeze-as-Pro-perk)
- [ ] Daily quests that actually progress + reward XP + hearts
- [ ] Badge persistence

**Week 7 — launch polish**
- [ ] Landing page v1 (hero + 3 tiers + testimonials placeholder + waitlist)
- [ ] Onboarding email sequence (Resend): welcome, day 1 nudge, day 3 mentor intro, day 7 upgrade nudge
- [ ] Legal: ToS + privacy policy (Termly templates + $500 lawyer review)
- [ ] Analytics events wired across every significant action
- [ ] Accessibility audit (keyboard nav, screen reader labels, color contrast)

**Week 8 — beta → launch**
- [ ] Close beta to 50 users from your network (Friday week 7)
- [ ] Fix top 10 bugs from beta feedback (week 8 Mon-Wed)
- [ ] Public launch (Product Hunt + Hacker News + Indian-classical Reddit + piano YouTube + Instagram) — Thursday week 8
- [ ] First paying customer target: by end of Friday week 8

**Success criteria for the 8-week sprint:**
- 500+ free signups
- 25+ paying customers
- <2s p95 grading latency
- <1% error rate on `/grade`
- NPS >30 among paying users

---

## Risks & how they break the plan

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Audio ML accuracy degrades on real-world mics + rooms | High | High | 30-second mic-check onboarding; widen pitch tolerance to 50 cents at L1–L3; offer MIDI controller option for serious users |
| Content production falls behind engineering | Very high | Critical | AI-drafted first drafts; recruit 3-5 contractor music educators for specialist instruments; public-domain-first reference audio |
| Copyright strike on covered songs | Medium | Critical | Public-domain + user-performance songs only until a music rights lawyer is retained in Phase 5; avoid artist covers in free tier |
| iOS App Store rejection | Medium | High | Use StoreKit for all in-app subscriptions (no Stripe in-app on iOS); clean privacy manifests; no misleading "free" language |
| Stripe fraud / chargeback spike | Medium | Medium | Stripe Radar + 3D Secure + geographic blocks where appropriate |
| LLM cost runaway (Claude API) | High | Medium | Per-user daily token budgets (already built into 3DWorld's `costGuards.js` port); canned-fallback path; cache common responses |
| India payment friction (RuPay, UPI) | High for India launch | High for India launch | Razorpay for India + Stripe elsewhere; or Stripe India with UPI support (now live) |
| Yousician / Simply Piano add our differentiators (20 instruments, Indian classical) | Medium in 12mo | High | Velocity + community + creator marketplace are defensible; single-app experiences are harder to copy than single features |
| Apple / Google take 30% of subscription revenue | Certain | Known | Price accordingly on mobile (bump $9.99 → $12.99 on iOS to absorb the tax, or route users to web checkout where possible within store rules) |

---

## What success looks like in 18 months

- **100k+ paying subscribers** across web, iOS, Android
- **All 9 tiers live** for 5 flagship instruments (piano, guitar, sitar, tabla, vocals)
- **L1–L3 live** for 12+ additional instruments
- **10 artist paths** with licensed content (Ravi Shankar, Hendrix, Rahman headliners)
- **Indian classical as a recognized differentiator** — "the Duolingo for raga" as one of the press angles
- **Creator marketplace with 100+ teachers**, $500k+ annualized creator revenue through the platform
- **MusicLuv Certified** as a recognized credential — one or two prominent music schools accept it as L1 admission evidence
- **$8-12M ARR** on a blended $13/mo ARPU and ~85% gross margin after payment processing + ML infra

That's the platform. Getting there is 18 months of disciplined phase-shipping. The plan above is the path.
