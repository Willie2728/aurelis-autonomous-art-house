import { providers } from "@/lib/providers";

export async function createSafeCheckout(input: { amountCents: number; currency?: string; orderReference: string; returnUrl: string }) {
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) throw new RangeError("Checkout amount must be a positive integer in cents.");
  return providers.payment.createCheckout({ ...input, currency: input.currency ?? "USD" });
}

