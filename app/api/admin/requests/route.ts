import { humanRequests } from "@/data";
import { apiError, apiSuccess, hasRole } from "@/lib/security";
import { z } from "zod";

const acknowledgements = new Map<string, { status: "ACKNOWLEDGED" | "RESOLVED"; acknowledgedAt: string; comment: string }>();
const schema = z.object({ id: z.string().regex(/^request-\d{2}$/), status: z.enum(["ACKNOWLEDGED", "RESOLVED"]), comment: z.string().min(3).max(1000) });

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ items: humanRequests.map((item) => ({ ...item, ...acknowledgements.get(item.id) })), openRequestsRepeatUntilAcknowledged: true, persistence: "in-memory demo" });
}

export async function POST(request: Request) {
  if (!hasRole(request, "FOUNDER")) return apiError("Founder access is required.", 403);
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid acknowledgement.", 400, parsed.error.issues);
  const item = humanRequests.find((requestItem) => requestItem.id === parsed.data.id);
  if (!item) return apiError("Human request not found.", 404);
  const acknowledgement = { status: parsed.data.status, acknowledgedAt: new Date().toISOString(), comment: parsed.data.comment };
  acknowledgements.set(item.id, acknowledgement);
  return apiSuccess({ ...item, ...acknowledgement, persisted: false });
}
