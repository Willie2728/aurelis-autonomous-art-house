import { generateArtwork } from "@/lib/ai";
import { apiError, apiSuccess, checkRateLimit, generationSchema, getClientKey, hasRole, parseJson } from "@/lib/security";

export async function POST(request: Request) {
  if (!hasRole(request, "CURATOR")) return apiError("Curator access is required.", 403);
  const rate = checkRateLimit(`generation:${getClientKey(request)}`, { limit: 6, windowMs: 60_000 });
  if (!rate.allowed) return apiError("Generation rate limit reached.", 429, { resetAt: rate.resetAt });
  const parsed = await parseJson(request, generationSchema);
  if (!parsed.success) return apiError(parsed.error, 400, parsed.issues);
  const result = await generateArtwork(parsed.data);
  return apiSuccess({ ...result, humanReviewRequiredBeforePublication: true, mode: "simulated" }, { status: result.status === "blocked" ? 422 : 200 });
}

