# RUN128 — AURELIS: A Policy Is Not a Passed Review

## Customer Truth
The Studio surface was overclaiming operational state. It said the autonomous loop runs continuously and that every brief passes similarity + rights checks before exhibition, while the current UI actually returns a curated catalog result in demo mode. A buyer should be able to distinguish a demo, an intended control, and a review state that has durable evidence.

## Creative Strategy
**AUR-DOC-006 — Generation Review State Key**

Core message:

> A policy is not a passed review. Do not market a work as having passed similarity, provenance, rights, or curatorial review unless the specific work can be tied to a durable review receipt.

The state key separates:
1. Demo result — interface demonstration only.
2. Intended workflow — the controls the production architecture is designed to run.
3. Reviewed state — requires item-level run/review evidence.
4. Commercially ready — additionally requires verified availability, edition/terms, rights or licensing authority where applicable, payment/provider state, and fulfillment path.

## Production Readiness
- Base44 deployable artifact: `/marketing/AUR-DOC-006-generation-review-state-key.html`
- Base44 Studio CTA links directly to the state key.
- Studio button now says `Preview demo result` instead of `Generate original`.
- Demo loading copy now says `Preparing a catalog demo result…`.
- Unsupported continuous-loop and passed-review claims were replaced with explicit intended-workflow language.
- Base44 checkpoint: `6aa17b3f2931ac247fe24500`
- Base44 commit: `cd4f48f6cbab346949ae292b57edd28e99a3aa9c`
- Final sandbox build: exit `0`
- Non-blocking warnings: stale Browserslist/caniuse-lite data plus two existing ambiguous Tailwind duration utility warnings.

## Distribution Queue
Owned AURELIS Studio and static buyer-enablement page only. No social post, paid campaign, press release, sale, or external publication is claimed live.

## Analytics / Evaluation
Use CollectorSignal and AcquisitionInquiry only when attributable real buyer behavior exists. A demo preview, static provenance label, or configured review guide is not evidence that the production workflow ran.

## Winner Library
Not promoted. No attributable production conversion evidence exists for this asset yet.

## Claims boundary
This state key is not a certificate of authorship, copyright ownership, licensing authority, legal compliance, availability, appraisal, authenticity, payment, or fulfillment.