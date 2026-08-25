import { calculatePrice } from "@/lib/commerce";
import { apiError, apiSuccess } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== "object") return apiError("Pricing input is required.");
    return apiSuccess(calculatePrice(input as Parameters<typeof calculatePrice>[0]));
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to calculate price.");
  }
}

