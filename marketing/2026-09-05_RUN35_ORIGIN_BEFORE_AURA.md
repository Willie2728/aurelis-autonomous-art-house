# AURELIS — Growth Run 35 — Origin Before Aura

## Customer truth

**The collector should never have to guess whether an artist is a person, a persona, or an AI-assisted studio identity.**

AI-media ecosystems are adding provenance signals such as Content Credentials/C2PA and watermarking so viewers can understand origin. AURELIS should compete on explicit origin and curatorial context rather than fictional real-world credentials.

Market reference: OpenAI, May 19, 2026 (updated July 31, 2026), content provenance work using Content Credentials/C2PA, SynthID, and verification tooling: https://openai.com/index/advancing-content-provenance/

This reference is directional only. AURELIS does not claim that its current catalog embeds C2PA, SynthID, or another machine-verifiable provenance standard.

## Creative strategy

Campaign: **Origin Before Aura**

Hook: **The story can be fictional. The origin label cannot be.**

Buyer message: Meet a fictional AURELIS Studio persona, see the visual language it represents, see the AI-generated catalog work assigned to it, understand the room/collection context, and decide whether the work fits your space. Do not borrow real-world museums, degrees, awards, galleries, collectors, or commissions to manufacture authority.

CTA: **Explore the studio persona, then inspect how the work is presented before adding it to a collection.**

## Product-truth correction completed in connected Base44

Run 35 removed public presentation of fictional real-world credentials from the Artists and Artist Detail surfaces. The connected UI now:
- labels the roster as **AURELIS Studio Personas**;
- states that the personas are fictional curatorial devices, not biographies of real people;
- states that catalog works are AI-generated and curator-presented unless explicitly labeled otherwise;
- removes displayed education, representation, museum/institutional collection, collector, and award blocks;
- relabels internal exhibition placement as **AURELIS gallery placement**;
- documents in `galleryData.js` that legacy career fields are seed fiction and must not be presented as real-world facts.

A targeted source scan after the edit returned zero matches for the reviewed public labels: `Represented Artists`, `complete professional record`, `Institutions Holding Work`, `Selected Awards & Honors`, `Public & Institutional Collections`, and `Private Collectors`.

## Production / distribution state

Production-ready text only. No new AURELIS media was rendered. Nothing was published or marked live. Checkout remains separately bounded by the connected application's demo/payment state.

## Claims boundary

Do not claim real-world artist biographies, museum holdings, degrees, awards, former gallery representation, private collectors, commissions, C2PA/SynthID support, verified ownership, live payment, fulfillment, investment value, scarcity, or resale outcome unless independently verified.
