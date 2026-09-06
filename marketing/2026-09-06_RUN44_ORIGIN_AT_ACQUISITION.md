# AURELIS — Run 44

## Customer Truth

Origin disclosure belongs beside the acquisition decision, not buried in an artist biography or back-office provenance field.

## Creative Strategy

**Campaign:** Show the Origin Before the Cart

**Hook:** The buyer should see how the work originated before deciding whether to collect it.

## Deployable copy

Luxury does not require pretending the origin is something it is not.

AURELIS can present an AI-generated studio catalog through fictional Studio Personas and still make the acquisition experience clear: show the work, show the curatorial story, show the origin label, show the configured catalog price — and show whether checkout is actually connected.

The current artwork detail experience now places a visible origin disclosure beside the work before the collection-cart action. It identifies AI-generated AURELIS Studio catalog works and fictional Studio Personas where applicable. It also states that the visible catalog label is not a claim that the file carries machine-verifiable C2PA Content Credentials or third-party provenance certification.

**CTA:** Explore the catalog with the origin visible before the acquisition decision.

## Product Truth Boundary

The connected Base44 checkout remains safe demo mode until a payment provider is connected. Adding a work to the collection cart is not represented as a real charge. Payment-plan availability is conditional on a connected provider and approved commercial terms.

The current GitHub repository uses a different Next.js application tree; `src/pages/ArtworkDetail.jsx` is not present there. The newer Base44 React source was therefore not force-written into an incompatible GitHub path.

## Production Readiness

- Visible AI-origin disclosure added to Base44 artwork detail.
- `Provenance` relabeled `Origin / provenance label`.
- `Available` clarified as catalog status.
- `Add to Cart` clarified as `Add to Collection Cart` with demo-checkout notice.
- `cd /app && npm run build` completed with exit code 0.
- Build warnings were nonblocking (stale Browserslist data and two ambiguous Tailwind duration classes).
- No new media was rendered.
- Nothing was published.

## Distribution Queue

P0: collector/creative-industry organic post once an authenticated publishing channel is available → transparent catalog landing experience.

## Winner Rule

Promote only after attributable qualified behavior such as artwork-detail engagement, room-preview use, concierge engagement, or a verified commerce event once payments are truly connected.

**Status:** production-ready text + Base44 trust/conversion pass; not published.