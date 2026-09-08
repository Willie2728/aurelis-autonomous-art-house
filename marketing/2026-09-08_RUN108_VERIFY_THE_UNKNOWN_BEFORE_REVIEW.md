# AURELIS RUN108 — Verify the Unknown Before Review

## Customer Truth

A collector can be interested in a work and still be blocked by one commercial unknown: availability or edition, final price/terms, rights/licensing, shipping/installation, commission scope, or another issue. Qualified acquisition intent should expose that blocker before contact rather than treating an email address as the win.

Art Basel and UBS reported that global art sales rose 4% to an estimated $59.6 billion in 2025 and dealer sales reached $34.8 billion, up 2%. Art Basel's 2026 market coverage also describes online channels as important for sourcing new buyers while collectors continue to value deeper engagement and in-person/private experiences. That supports using digital acquisition surfaces to qualify the next conversation, not to imply an online click is a sale. It is not AURELIS performance evidence.
Sources:
- https://www.artbasel.com/stories/art-market-report-2026-global-sales
- https://www.artbasel.com/stories/art-market-report-online-sales-digital-art-market-2026

## Creative Strategy

**AUR-TXT-003 — Verify the Unknown Before Review**

Hook: **Which unknown is actually blocking the acquisition conversation?**

CTA: **Build the Collector Review Brief and mark the one item that must be verified before a second step.**

RUN108 adds an optional structured `verification_focus` category to the collector brief. It does not require extra PII and it does not claim that the selected item has already been verified.

## Product / Measurement Change

`CollectorSignal` now supports an optional non-PII `verification_focus` category:
- availability / edition
- final price / terms
- rights / licensing
- shipping / installation
- commission scope
- other commercial unknown

`AcquisitionInquiry` carries the same optional routing field after the collector explicitly requests a private review and then chooses to share contact information.

The active acquisition-preview UI includes the verification focus in the reusable Collector Review Brief and in privacy-minimized `brief_copy` / `review_request_click` telemetry. The free-text objective, name and email remain excluded from `CollectorSignal`.

## Production Readiness

- Base44 final build: PASS, exit 0.
- Checkpoint: `6aa07044686b6daf9ed471fe`.
- Base44 commit: `3d1a3cde45ff5fe7fee48bd378acf7368519efa2`.
- Non-blocking warnings: stale Browserslist/caniuse-lite data and existing Tailwind ambiguous-duration warnings.
- Current connected GitHub repository does not expose the active Base44 `src/pages/Checkout.jsx`; RUN108 therefore does not claim Base44↔GitHub application-source parity.

## Analytics / Winner Library

Post-change baseline:
- `CollectorSignal`: `0`
- `AcquisitionInquiry`: `0`

No sale, reservation, final availability, licensing right, payment, shipment, installation, commission acceptance, revenue, conversion lift or winner is inferred.

## Approval / Build Liaison Boundary

Four Base44 `Approval` records are currently pending and were not acted on in RUN108:
1. secondary Gemini image-provider proposal — medium risk, $0;
2. Instagram launch budget-increase request — high risk, $1,200;
3. refund request labelled order #AUR-2041 — high risk, $3,400;
4. exhibition press-release public-statement request — medium risk, $0.

These are internal app records only. RUN108 does not independently verify that the campaign, order, refund obligation, or press-release event exists in an external provider, payment system, or publication workflow.

## Distribution Queue

AURELIS has `0/81` Base44 connectors connected. Reviewed LinkedIn, Instagram Business, Facebook Pages, Meta Ads, Google Analytics, Search Console and PostHog destinations are disconnected. TikTok's available connector does not support content/video uploading. AUR-TXT-003 remains approved for the WCL content queue but unpublished.

## Claims Boundary

The Collector Review Brief is planning and routing context. A verification-focus selection does not establish availability, edition authenticity, pricing, rights, shipping, installation, commission acceptance, reservation, purchase or payment. Those facts require separate evidence and human/commercial review.
