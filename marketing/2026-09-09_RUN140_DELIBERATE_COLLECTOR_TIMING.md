# RUN140 — AURELIS — Deliberate Collector Timing

## Customer Truth
The acquisition-preview funnel preselected `decision_window="exploring"`. Because timing was not part of `scopeReady`, a collector could appear to have selected an evaluation horizon without making a deliberate timing choice. For qualified acquisition intent, timing should be buyer-selected rather than silently defaulted.

The Art Basel and UBS Global Art Market Report 2026 reports that online-only sales represented 15% of total art-market sales in 2025, while Art Basel's 2026 collector coverage also describes renewed demand for deeper engagement around acquired objects. This supports designing digital acquisition funnels that move from online discovery into deliberate review; it does not establish AURELIS demand or performance.

## Creative Strategy
- `AUR-TXT-008`: **Timing is part of qualified collector intent, not a hidden default.**
- `AUR-DOC-008`: Deliberate Collector Timing Card.
- Buyer must choose a decision window, select the commercial unknown blocking a next step, state the decision question, and explicitly request private review before contact becomes available.
- Claim boundary: a review request is not a reservation, purchase, availability confirmation, rights determination, payment, or response-time promise.

## Production Readiness
Base44 `src/pages/Checkout.jsx` now initializes the decision window blank and requires it in `scopeReady`. The selector begins with `Choose a decision window`, preserving `Exploring / no fixed date yet` as an explicit choice rather than a default. The static aid is stored at `public/marketing/AUR-DOC-008-deliberate-collector-timing-card.html`.

Base44 build: exit 0. Checkpoint: `6aa2249c94ab9a5afc2f8249`. Base44 checkpoint commit: `5f3cefc302a7b18f45053563eabca7173b534a22`.

The expected GitHub application path `src/pages/Checkout.jsx` returned 404, so Base44↔GitHub application-source parity is not claimed for the touched funnel. This file is a durable marketing record only.

## Distribution Queue
Asset state: internally production-ready; not verified published. AURELIS has 0/81 Base44 connectors connected. LinkedIn, Instagram Business, Facebook Pages, Meta Ads, Google Analytics, Search Console and PostHog are unavailable on this reviewed surface; the TikTok connector does not support content/video upload.

## Analytics / Evaluation
Verified baseline: 0 `CollectorSignal` records and 0 `AcquisitionInquiry` records. No collector demand, transaction, conversion lift, or acquisition outcome is inferred.

## Winner Library
No promotion. No attributable downstream evidence exists for AUR-TXT-008/AUR-DOC-008.

## Build Liaison — Human Approvals Left Untouched
Four current AURELIS approvals remain pending and were not auto-approved: Gemini 3 image-provider addition; $1,200 Instagram launch budget increase; $3,400 refund for order #AUR-2041; and the Light & Memory exhibition press release.

## Verification State
- Video/image/audio rendered in RUN140: **no**
- External post/ad live: **no verified publication**
- Production deployment verified: **no**
- Winner declared: **no**
