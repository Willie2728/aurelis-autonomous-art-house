# AURELIS Run 50 — Style, Not Credentials

**State:** Production-ready text / sales-enablement brief. No new media rendered. Not published.

## Customer Truth

A fictional studio persona can make an AI-generated collection more coherent, memorable, and navigable. It does not need an invented real-world résumé to do that job.

## Creative Strategy

**Hook:** A studio persona should carry a style, not a fake résumé.

AURELIS can tell a collector what matters in the catalog: the persona's aesthetic language, medium, palette, philosophy, gallery placement, artwork origin, and whether the catalog work is AI-generated. Degrees, museum holdings, awards, collector histories, prior gallery representation, and commissions should never be presented as real-world credentials for fictional personas.

**CTA:** Explore the work by style, origin, and collection—not by invented prestige.

## Production Readiness

The connected Base44 app now exports runtime artist data through a sanitization boundary that removes `education`, `institutions`, `public_collections`, `representation`, `collectors`, and `awards` fields before the artist catalog is consumed by the UI. The existing visible Fictional Studio Persona disclosure remains in Artist Detail.

Important residual boundary: the legacy fictional strings still exist inside the private source seed and should be deleted in a later source-data cleanup. This run reduces runtime re-exposure risk but does not claim the source literals were erased.

## Claims Boundary

Do not claim real museum holdings, degrees, awards, collectors, representation, commissions, C2PA certification, third-party provenance certification, or independently verified originality unless evidence exists for the specific work or party. No campaign publication or sales result is claimed in this brief.
