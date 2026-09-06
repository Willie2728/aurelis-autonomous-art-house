# AURELIS — Run 31: Room Context Before Cart

Date: 2026-09-05
Status: Prompt Ready / production-ready text. Not published.

## Customer truth

For an art buyer, the catalog image is not the whole decision. Scale, wall tone, room context, and the story around the work can all affect whether a piece feels right.

The connected AURELIS product already exposes a useful pre-cart path:
`gallery room → artwork detail → configured material / size / license → room preview → Seraphina conversation → cart`

## Creative strategy

Hook: **Don’t choose art at catalog scale. Put it in a room first.**

Supporting line: **Context before cart.**

Suggested buyer post:

A piece can look completely different when the wall changes, the scale changes, or the room changes.

AURELIS is designed to keep that context in the buying journey.

Open the work. Compare material and size. Preview it inside an illustrative room environment. Then ask Seraphina about the piece or the room before you move toward the cart.

The current Room Preview is intentionally described as an **illustrative perspective mock** — not a photo or scan of the buyer’s actual room.

**CTA:** Explore a work, preview the room context, and decide with more of the environment visible.

## Product improvement completed in Base44

Run 31 improved the connected Room Preview surface:
- changed `See it on your wall` to `Preview it in a room`;
- added an explicit note that the preview is an illustrative perspective mock for scale, wall tone, and room context, not a photo or scan of the user’s real room;
- replaced the non-functional `Request design consultation` button with a working route to `/concierge`: `Ask Seraphina about this room`.

The connected checkout remains explicitly demo-only and says no payment is processed until Stripe is connected. Run 31 therefore makes no live-commerce or fulfillment claim.

## Claims boundary

No claim that Room Preview performs computer-vision placement, scans the customer’s actual room, guarantees visual scale accuracy, processes live payments, guarantees availability, or proves collector/investment outcomes.
