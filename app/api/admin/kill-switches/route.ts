import { killSwitches } from "@/data";
import { apiError, apiSuccess, hasRole } from "@/lib/security";
import { z } from "zod";

const overrides = new Map<string, { engaged: boolean; changedAt: string; changedBy: string; reason: string }>();
const schema = z.object({ id: z.enum(["art_generation", "motion_generation", "public_posting", "advertising", "refund_processing", "email_automation", "autonomous_research", "all_operations"]), engaged: z.boolean(), reason: z.string().min(3).max(500) });

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ items: killSwitches.map((item) => ({ ...item, ...overrides.get(item.id) })), persistence: "in-memory demo" });
}

export async function POST(request: Request) {
  if (!hasRole(request, "FOUNDER")) return apiError("Founder access is required.", 403);
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid kill-switch request.", 400, parsed.error.issues);
  const state = { engaged: parsed.data.engaged, changedAt: new Date().toISOString(), changedBy: "demo-founder", reason: parsed.data.reason };
  overrides.set(parsed.data.id, state);
  if (parsed.data.id === "all_operations" && parsed.data.engaged) {
    for (const item of killSwitches) overrides.set(item.id, state);
  }
  return apiSuccess({ id: parsed.data.id, ...state, persisted: false, warning: "Connect PostgreSQL before relying on this state across restarts." });
}

