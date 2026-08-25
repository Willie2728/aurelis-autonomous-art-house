import { providerHealth } from "@/lib/providers";
import { apiSuccess } from "@/lib/security";

export async function GET() {
  const health = await providerHealth();
  return apiSuccess({ status: "ok", mode: process.env.AURELIS_DEMO_MODE === "false" ? "configured" : "demo", database: process.env.DATABASE_URL ? "configured-not-probed" : "not-configured", providers: health, checkedAt: new Date().toISOString() });
}

