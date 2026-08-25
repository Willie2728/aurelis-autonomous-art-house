import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyHmacSignature(payload: string, providedSignature: string, secret: string) {
  if (!secret || !providedSignature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const actualBuffer = Buffer.from(providedSignature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

