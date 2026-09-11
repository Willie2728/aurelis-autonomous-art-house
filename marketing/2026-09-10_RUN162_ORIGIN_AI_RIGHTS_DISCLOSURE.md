# RUN162 — AURELIS Origin, AI & Rights Disclosure

## Customer Truth
Collectors should not have to reverse-engineer whether a catalog name is a human artist, studio identity, fictional persona, or AI-assisted presentation. “Origin,” “provenance,” “AI-generated,” “copyright/licensing authority,” “edition,” and “availability” are separate facts. Collapsing them into one “original” claim creates avoidable trust friction.

## Creative Strategy
**AUR-TXT-011** — “Origin is not rights. Disclose both before the collector has to ask.”

The artwork-detail experience now labels AI-generated works presented through fictional AURELIS Studio Personas and directs collectors to an explicit disclosure card.

## Buyer Enablement
**AUR-DOC-011 — Origin, AI & Rights Disclosure Card**

The card separates:
- presented creator identity;
- creation origin and AI involvement;
- available provenance / Content Credential evidence;
- rights actually being offered and the authority to grant them;
- edition, availability, price, tax, shipping, licensing, and fulfillment facts that still require verification.

## Product / Attribution Changes
`src/pages/ArtworkDetail.jsx` now adds a visible fictional-Studio-Persona disclosure for AI-generated catalog works and states that origin evidence, AI-use disclosure, rights authority, edition status, and availability are separate facts.

`src/pages/Checkout.jsx` now attributes eligible anonymous collector signals to `AUR-TXT-011` and links the disclosure card from the private-review path.

## Production Readiness
Static artifact: `public/marketing/AUR-DOC-011-origin-ai-rights-disclosure-card.html`.
Final Base44 build exit code: 0.
Final checkpoint: `6aa34ae471d85888c90e1023`.
Final Base44 commit: `799b1f3919fbcd149df9cb3151e27d9ff9184dae`.
Build emitted only the stale Browserslist warning plus non-fatal Tailwind ambiguity warnings for `duration-[1.2s]` and `duration-[1500ms]`.

## Distribution Queue
No RUN162 AURELIS asset was published. Base44 connector readback: 0/81 connected. LinkedIn, Instagram Business, Facebook Pages, Meta Ads, Google Analytics, Google Search Console, and PostHog are disconnected; TikTok content/video upload is unsupported by the available connector.

## Analytics / Evaluation
Measurement-eligible production CollectorSignals attributed to AUR-TXT-011 at evaluation time: **0**.
AcquisitionInquiry count at evaluation time: **0**.
No sale, reservation, rights clearance, provenance certification, collector conversion, revenue, or winner is inferred.

## Winner Library
No promotion. AUR-TXT-011 and AUR-DOC-011 remain production-ready challengers.

## Claims Boundary
The disclosure card is not a certificate of authenticity, copyright or title opinion, C2PA credential, rights clearance, inventory reservation, checkout receipt, or legal advice.
