# AURELIS Build Status

Status date: 2026-08-04

## Complete in this repository

| Area | Status | Evidence |
| --- | --- | --- |
| Deterministic catalog | Complete | 100 works, 12 artists, 30 rooms, 15 collections, 10 exhibitions, 25 living records, 40 preview environments in `data/` |
| Catalog diversity | Complete for metadata | Varied subject, medium, region, category, palette, mood, room, and orientation; tests guard minimum diversity |
| Prisma data design | Complete as schema | PostgreSQL models cover requested catalog, commerce, Guide, approval, research, audit, consent, and safety domains |
| Provider architecture | Complete | Typed language, image, motion, TTS, STT, search, storage, and payment interfaces |
| Pricing and production helpers | Complete | Configurable pricing and print-readiness logic with tests |
| Originality/similarity policy | Complete for deterministic checks | Prompt policy, weighted metadata similarity, configurable threshold, human-review flag |
| Human approval policy | Complete for application logic | Financial, vendor, rights, public-statement, campaign, and large-refund gates |
| Background jobs | Complete as abstraction | Idempotent retry-aware interface and tested in-memory demo implementation |
| API validation and safety | Complete for demo | Zod input validation, rate limiting abstraction, role seam, safe errors, HMAC helper |
| Demo APIs | Complete | Catalog, concierge, room preview, pricing, safe checkout, studio, trends, campaign, command, providers, approvals, kill switches |
| Deployment files | Complete | Dockerfile, Render Blueprint, environment template, exact setup instructions |

## Simulated — functional demo, not live integration

| Capability | What works now | What is not claimed |
| --- | --- | --- |
| Seraphina | Deterministic text response through the LLM contract | No live LLM, persistent memory, realtime avatar, or vendor TTS/STT |
| Artwork generation | Validates requests, rights language, diversity profile, and returns a deterministic placeholder | No provider-generated pixel asset, upscaling, inpainting, or fulfillment file |
| Living art | 25 records and a licensed-host placeholder video reference | No generated composition-preserving video |
| Room preview | Configurable perspective-anchor response | No computer-vision wall detection or photorealistic compositing |
| Research | Dated, source-linked seed signals | No autonomous live search, crawling, Reddit, auction, or social listening |
| Checkout | Validates catalog price and returns a safe demo checkout ID | No Stripe Checkout Session, charge, tax, invoice, or order persistence |
| Campaigns | Creates draft proposals and approval decisions | No posting, email send, ad purchase, analytics ingestion, or budget spend |
| Approvals and kill switches | Interactive API state for the current server process | Not durable across deploys/restarts until PostgreSQL repositories are wired |
| Storage | Provider contract and safe demo URL | No upload, object-storage persistence, or signed vendor URL |
| Authentication | Role-based seam with explicit demo role | No NextAuth/Auth.js login, identity verification, MFA, or production session claims |

## Awaiting credentials and reviewed implementation

- OpenAI, Anthropic, or Google language adapter.
- Image, upscaling, background-removal, image-to-video, 3D, avatar, TTS, and STT providers.
- Approved search/Firecrawl/Reddit/social/auction/feed integrations with source-specific terms review.
- Stripe server adapter and webhook handling.
- Object storage, transactional email, analytics, and error monitoring.
- PostgreSQL repository implementations for the current deterministic seed and mutable operations.
- Production authentication, authorization claims, CSRF/session strategy, distributed rate limits, audit persistence, and secret manager.

## Human oversight that must remain mandatory

Money transfers, new financial accounts, new vendors, paid campaigns, advertising increases, large refunds, public high-risk statements, rights warnings, public posting scope, and any production kill-switch change require human authorization. The user’s broad project permission does not bypass these controls.

## Known limitations

- Demo media links are external presentation placeholders. They are not AURELIS-generated, not for product fulfillment, and may require replacement for offline use.
- Metadata similarity is useful as a first screen but cannot detect visual face/composition similarity in pixels; a reviewed embedding/perceptual-hash service is needed.
- The in-memory job store, approval decisions, rate limiter, and kill switches are single-process demonstrations.
- Prisma schema validation and application build are reported from the latest local validation run below; a local pass does not prove GitHub push, Render deployment, database migration, or vendor connectivity.

## Latest validation

Executed locally on 2026-08-04 with the bundled Node runtime:

- `pnpm typecheck`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm test`: 7 test files passed, 19 tests passed.
- `pnpm exec prisma validate`: schema valid under Prisma 7.9.1.
- `pnpm exec prisma generate`: client generated successfully.
- `pnpm build`: passed after the final reporting/request APIs were added; 228/228 static pages generated. Final build timing observed: compile 7.3 seconds, TypeScript 26.4 seconds, static generation 11.0 seconds.
- Production server started locally in 458 ms. `/`, `/gallery`, `/art/threshold-for-morning-01`, `/admin/command`, and `/api/health` each returned HTTP 200.

These checks prove the local snapshot built and served successfully. They do not prove a GitHub push, Render deployment, PostgreSQL migration, external media availability, or live provider connectivity.
