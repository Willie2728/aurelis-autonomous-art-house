import { getArtwork } from "@/data";
import { createSafeCheckout } from "@/lib/commerce";
import { apiError, apiSuccess, checkoutSchema, parseJson } from "@/lib/security";

export async function POST(request: Request) {
  const parsed = await parseJson(request, checkoutSchema);
  if (!parsed.success) return apiError(parsed.error, 400, parsed.issues);
  const artwork = getArtwork(parsed.data.artworkId);
  if (!artwork || !artwork.available) return apiError("Artwork is unavailable.", 409);
  if (artwork.priceCents !== parsed.data.amountCents) return apiError("Price changed. Refresh the product before checkout.", 409, { expectedAmountCents: artwork.priceCents });
  const result = await createSafeCheckout(parsed.data);
  return apiSuccess({ ...result, message: result.status === "demo" ? "Safe demo checkout created. No money moved and no order was charged." : "Checkout created." });
}

