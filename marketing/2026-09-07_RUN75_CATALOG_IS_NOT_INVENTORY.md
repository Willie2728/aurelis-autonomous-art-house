# AURELIS RUN75 — Catalog Is Not Inventory

## Customer Truth
A catalog label is not inventory, rights clearance, edition allocation, a final price, a license grant, resale representation, or fulfillment. A collector can experience the work digitally and record acquisition interest without AURELIS pretending that commerce infrastructure or rights evidence exists when it has not been verified.

## Creative Strategy
- Asset: `AUR-TXT-002`
- Hook: **A catalog label is not inventory, rights clearance, or fulfillment.**
- CTA: **Explore the work. Record acquisition interest. Verify the object, rights, edition, final terms, and fulfillment before payment.**
- Durable WCL MarketingAsset: `6a9ecae2d12d0ccfd1f8fa3b` (`approved`, not published)

Deployable copy:

> The gallery can make discovery immersive before commerce is live. Explore the work, learn the curatorial context, and record acquisition interest. Then verify the specific work: rights, edition, availability, final terms, licensing, and fulfillment. A catalog price is a planning figure until those receipts exist.

## Production Readiness
Changed Base44 surfaces:
- `src/components/Layout.jsx`: removed blanket “All works are original to AURELIS”; now discloses AI-generated catalog imagery unless labeled otherwise and requires item-level verification for rights, provenance, edition, availability, price, and fulfillment.
- `src/components/ArtworkCard.jsx`: price labeled `Catalog planning price`; cart action labeled demo cart; item-level verification reminder added.
- `src/lib/seraphina.js`: removed unsupported promises about payment plans, live fulfillment, shipping method, resale/appraisal/private-sale capability, granted licenses, external distribution, artist representation, and continuous rights-cleared autonomous production. Concierge now distinguishes modeled/planned paths from verified rights and handoffs.

Final sandbox build: `npx vite build` exit `0`.
Checkpoint: `6a9eca0712428e89a78981d3`.
Base44 commit: `40985f9be762e204063f518ac4f08396705e6924`.
A prior `npm run build` invocation was blocked by an upstream tool safety-status gate before execution; it was not an application build failure.
Production deployment is not independently verified.

GitHub source parity: exact `src/lib/seraphina.js` in this repository returned `404`, so no guessed application-source write was made.

## Distribution Queue
AURELIS Base44 connectors at RUN75: `0/81` connected. No authenticated social/ad/commerce distribution handoff was available and no post, sale, or shipment was claimed live.

## Analytics / Evaluation
`AcquisitionInquiry` records at evaluation: `0`.
This is an empty current inquiry baseline, not proof of zero demand or zero conversion.

## Winner Library
No verified published/attributed comparison set exists for this RUN75 asset. No winner decision was made.

## Research Signal
The Art Basel & UBS Art Market Report 2026 says online sales were 16% of dealer turnover in 2025 while 40% of online sales by value were to new buyers. This supports using digital discovery to source new collector relationships while treating higher-value acquisition as a separately verified transaction path. It does not establish AURELIS sales.

Source: https://theartmarket.artbasel.com/dealers

## Non-Claims
No new artwork, image, or video was rendered in RUN75. No post was published. No item-level rights clearance, edition allocation, live checkout, payment, sale, reservation, fulfillment, shipment, appraisal, consignment, resale representation, collector placement, revenue, or ROI was inferred from catalog data or sandbox success.