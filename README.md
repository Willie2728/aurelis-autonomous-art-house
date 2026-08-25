# AURELIS Autonomous Art House

**Art That Lives. A Gallery That Never Sleeps.**

AURELIS is a Next.js demonstration of a cinematic AI art gallery, original-art studio, living-art collection, marketplace, and supervised autonomous operation. The application is usable without credentials in simulated mode. It does **not** move money, publish posts, buy advertising, scrape websites, or call live generation providers unless a reviewed live adapter is added later.

## What is included

- 100 varied demo artwork records, 12 clearly fictional AI studio identities, 30 distinct gallery rooms, 15 collections, 10 exhibitions, 25 living-art records, and 40 room-preview environments.
- LLM-, image-, motion-, TTS-, STT-, search-, storage-, and payment-agnostic provider contracts with safe simulated implementations.
- Pricing, prompt-rights review, similarity/diversity checks, print-readiness checks, human-approval policy, rate limiting, signed-webhook helper, role seam, and job-store abstraction.
- PostgreSQL-compatible Prisma schema for catalog, commerce, operations, approvals, research, consent, audit, and safety records.
- Demo APIs for catalog, Seraphina, room preview, pricing, checkout, studio generation, trends, campaigns, provider health, approvals, kill switches, and the Founder Command Center.
- Render Blueprint, Docker build, environment template, unit tests, and an explicit simulated-versus-live ledger in `BUILD_STATUS.md`.

## Local setup on Windows PowerShell

Prerequisites: Node.js 20.9+ (Node 22 recommended), Corepack, Git, and optionally PostgreSQL 16+.

```powershell
cd "C:\path\to\aurelis-autonomous-art-house"
corepack enable
pnpm install
Copy-Item .env.example .env.local
pnpm exec prisma generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Check [http://localhost:3000/api/health](http://localhost:3000/api/health) to see each adapter’s real mode. Leave `AURELIS_DEMO_MODE=true` for the credential-free experience.

If Node is not on `PATH` in the Codex Windows environment, use the bundled runtime:

```powershell
$env:Path = "C:\Users\wilke\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\wilke\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;$env:Path"
& "C:\Users\wilke\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" install
& "C:\Users\wilke\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" dev
```

### Optional PostgreSQL setup

The current demo reads deterministic TypeScript seed records and does not require a database. To prepare the schema for persistent mode:

1. Create an empty PostgreSQL database named `aurelis`.
2. Put its connection URL in `.env.local` as `DATABASE_URL`.
3. Run `pnpm exec prisma migrate dev --name initial`.
4. Implement a reviewed Prisma seed/import command before treating data as persistent. The checked-in demo arrays are the canonical seed fixture today.

Do not paste real keys into source files, browser code, commits, screenshots, or support messages. `.env.local` is local-only. On Render, use the Environment page.

## Validation commands

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec prisma validate
```

## Demo APIs

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/health` | GET | Runtime and provider-mode health |
| `/api/catalog?q=&room=&living=` | GET | Search/filter artwork |
| `/api/catalog/[slug]` | GET | Artwork plus living record |
| `/api/concierge` | POST | Simulated Seraphina text response |
| `/api/preview` | POST | Perspective-aware demo room placement |
| `/api/pricing` | POST | Configurable price quote |
| `/api/checkout` | POST | Safe demo checkout; no money movement |
| `/api/studio/generate` | POST | Simulated generation after policy review |
| `/api/research/trends` | GET | Dated, source-linked seed signals |
| `/api/campaigns` | GET/POST | Draft campaign proposals; no publication |
| `/api/admin/command` | GET | Founder dashboard seed snapshot |
| `/api/admin/approvals` | GET/POST | In-memory demo decisions |
| `/api/admin/kill-switches` | GET/POST | In-memory emergency-control demo |
| `/api/admin/providers` | GET | Sanitized provider connection status |
| `/api/admin/reports` | GET | Daily art, marketing, risk, and commerce report |
| `/api/admin/requests` | GET/POST | Repeat-until-acknowledged human tool/credential requests |

Admin and studio APIs use a replaceable role seam. With `AURELIS_DEMO_MODE=true`, they default to a demo Founder role. With demo mode off, they default to Visitor until a verified authentication/session adapter is installed. Never enable production financial or publishing adapters before that replacement.

## GitHub handoff

1. Create a new empty GitHub repository; do not initialize it with a README.
2. In this project folder, run:

```powershell
git init
git add .
git commit -m "Build AURELIS autonomous art house demo"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPOSITORY.git
git push -u origin main
```

3. In GitHub, open the repository and confirm `.env.local` and secret values are absent before connecting Render.

## Render deployment

1. Push the repository to GitHub.
2. Open [Render Dashboard](https://dashboard.render.com/) and select **New + → Blueprint**.
3. Connect the GitHub repository and select the repository’s `render.yaml`.
4. Review the proposed web service and PostgreSQL database, then apply the Blueprint.
5. On the web service’s **Environment** page, set `APP_URL` to the final Render URL. Leave provider secrets blank for demo mode.
6. Deploy. Wait until Render reports **Live**, then open `/api/health` and confirm the response says `status: ok` and provider modes are simulated.
7. If persistent database mode is later implemented, open Render Shell and run `pnpm exec prisma migrate deploy`. Do not run this merely to claim the current seed demo is database-backed.

The Blueprint uses paid Render Starter and Basic PostgreSQL plans by default for predictable availability; adjust the plan fields before applying if different pricing is desired. Render prices can change, so confirm them in the Render dashboard.

## Connecting live services safely

Live connections require four things: a server-side adapter implementation, credentials in the deployment secret store, a successful connection test, and Founder approval. Additional controls are mandatory for payment, advertising, refunds, public statements, email automation, and new vendors.

Never expose values without the `NEXT_PUBLIC_` prefix to client code. Even `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is only a publishable identifier; `STRIPE_SECRET_KEY` and webhook secrets remain server-only.

## Research and originality policy

Seed trend records are dated 2026-08-04 and link to public Art Basel/UBS, Artsy, Etsy, and Pinterest reporting. They are directional evidence, not automatic creative instructions. AURELIS prohibits protected-work copying, identifiable near-recreations, direct imitation of living artists, cultural stereotyping, paywall bypass, CAPTCHA circumvention, and terms-violating scraping.

All fictional artist identities and artwork metadata are labeled AI-generated. Demo images/videos are presentation placeholders and are not represented as generated originals available for fulfillment.
