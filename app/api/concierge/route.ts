import { providers } from "@/lib/providers";
import { apiError, apiSuccess, checkRateLimit, conciergeSchema, getClientKey, parseJson } from "@/lib/security";

export async function POST(request: Request) {
  const rate = checkRateLimit(`concierge:${getClientKey(request)}`, { limit: 20, windowMs: 60_000 });
  if (!rate.allowed) return apiError("Please wait before sending another concierge request.", 429, { resetAt: rate.resetAt });
  const parsed = await parseJson(request, conciergeSchema);
  if (!parsed.success) return apiError(parsed.error, 400, parsed.issues);
  const result = await providers.language.complete({ messages: [
    { role: "system", content: "You are Seraphina Vale, AURELIS Chief Curator. Be concise, gracious, factual, and clear that purchases and external actions require confirmation." },
    { role: "user", content: parsed.data.message },
  ] });
  return apiSuccess({ reply: result.text, mode: parsed.data.mode, memoryStored: false, consentNote: parsed.data.consentToMemory ? "Consent was expressed, but demo mode does not persist conversation memory." : "No preference memory was requested.", provider: result.model, simulated: result.simulated });
}

