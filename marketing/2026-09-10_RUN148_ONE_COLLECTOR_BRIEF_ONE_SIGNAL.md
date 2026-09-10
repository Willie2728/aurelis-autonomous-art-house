# RUN148 — One Collector Brief, One Signal

## Customer Truth
Repeated acquisition-preview clicks are not repeated collector demand, and preview/internal activity should not enter commercial evaluation. AURELIS already required deliberate timing and a named commercial blocker, but `CollectorSignal` lacked production eligibility, anonymous session identity, creative attribution and deduplication.

## Creative Strategy
**AUR-TXT-009:** “Online discovery can start the relationship. One commercial question should earn the next step.”

AURELIS should turn browsing into a bounded collector brief: selected works, deliberate decision window, one commercial fact to verify, and one decision question. The brief does not imitate a completed transaction.

Supporting buyer aid: **AUR-DOC-009 — One Collector Brief, One Signal**.

## Production Readiness
`CollectorSignal` now supports anonymous `session_id`, `environment`, `measurement_eligible`, and `creative_asset_id`. The acquisition preview excludes preview/localhost runtime, writes only known production signals as measurement eligible, and deduplicates the same event + collector configuration + selected-work set within the same anonymous session with retry-safe release. Final Base44 build exited 0. Checkpoint: `6aa285907291ebeda4a65918`; Base44 commit: `6fdd790a51cfa8505069c7ec686cf8a3072a9790`.

## Distribution Queue
Production-ready, not externally published. AURELIS currently has 0/81 Base44 connectors connected. LinkedIn, Instagram Business, Facebook Pages, Meta Ads, Google Analytics, Google Search Console and PostHog are unavailable; the exposed TikTok connector does not support content/video uploading.

## Analytics / Evaluation
Verified measurement-eligible production CollectorSignals: **0**. AcquisitionInquiry records: **0**. No demand, transaction, reservation, conversion lift, or winner is inferred.

## Approval / Build Liaison
Four pending human approvals remain untouched: Gemini 3 image-provider addition; a $1,200 Instagram campaign budget increase request; a $3,400 refund for order #AUR-2041; and the Light & Memory exhibition press release. The installed GitHub repository does not contain Base44 `src/pages/Checkout.jsx`, so Base44↔GitHub application-source parity is not claimed.

## Winner Library
No promotion. A qualified anonymous signal is still not a sale, rights determination, availability confirmation, or customer outcome.