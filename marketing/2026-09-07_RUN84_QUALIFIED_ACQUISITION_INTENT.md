# AURELIS — RUN84

## Qualified Acquisition Intent

**Customer Truth**  
A collector inquiry is more commercially useful when it tells the house what the buyer is deciding, when they expect to decide, and how they intend to use the work. An email address by itself is not strong purchase intent, and a catalog configuration is not inventory, rights clearance, a reservation, or a completed transaction.

**Creative Strategy**  
Hook: **Tell us what you are deciding — not just your email.**

Body: Select the works you want to discuss, identify whether the request is an acquisition, private viewing, commission, licensing question, or other inquiry, then add your decision window and intended use. AURELIS records the inquiry without pretending that availability, edition allocation, rights, final price, payment, shipping, or fulfillment have already been verified.

CTA: **Select the works. Name the decision window and use. Record an acquisition inquiry.**

## Production Readiness
- `AcquisitionInquiry` now includes `inquiry_type`, `decision_window`, and `intended_use`.
- `src/pages/Checkout.jsx` records those buyer-selected fields before showing success.
- Current `AcquisitionInquiry` baseline: 0 records.
- Final sandbox build: exit `0`.
- Base44 checkpoint: `6a9f39cd28941a8f91393d30`.
- Base44 commit: `3c3ce4be57d87e2fb0bd11b5867beb99f269f1f4`.
- Matching GitHub `src/pages/Checkout.jsx` returned 404, so no guessed application-source path was written.
- Production deployment: not independently verified.

## Distribution Queue
WCL MarketingAsset `6a9f3a07173ad8adcbc21e19` is `approved` and unpublished. AURELIS has 0/81 Base44 OAuth connectors connected. No social post, ad, email, image, video, payment link, order, or external placement is claimed live.

## Analytics / Evaluation
There are currently 0 durable AcquisitionInquiry records. That is a newly instrumented commercial-intent baseline, not evidence that demand is zero. The next useful signal is a recorded inquiry with selected works plus buyer-selected inquiry type, decision window, and intended use, followed separately by verified human follow-up and commercial terms.

## Winner Library
No winner is declared. No attributable production traffic or acquisition-conversion sample exists for this RUN84 asset.

## Claims Boundary
The Art Basel & UBS Art Market Report 2026 says online sales represented 16% of dealer turnover in 2025 and that 40% of online dealer sales by value were to new buyers, while higher-value transactions continued moving back toward in-person channels. This supports using digital discovery to qualify new collectors and then moving serious buyers into a richer human acquisition path. It does not establish AURELIS sales performance.

No artwork availability, rights clearance, edition allocation, reservation, payment, shipment, fulfillment, revenue, ROI, or conversion lift is inferred from an inquiry form or sandbox build.
