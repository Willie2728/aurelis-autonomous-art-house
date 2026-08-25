import { approvals } from "@/data";
import { apiError, apiSuccess, hasRole } from "@/lib/security";
import { z } from "zod";

const decisions = new Map<string, { status: "APPROVED" | "REJECTED"; comment: string; decidedAt: string }>();
const decisionSchema = z.object({ id: z.string().regex(/^approval-\d{2}$/), decision: z.enum(["APPROVED", "REJECTED"]), comment: z.string().trim().min(3).max(1000) });

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ items: approvals.map((approval) => ({ ...approval, ...decisions.get(approval.id) })), persistence: "in-memory demo" });
}

export async function POST(request: Request) {
  if (!hasRole(request, "FOUNDER")) return apiError("Founder approval is required.", 403);
  const parsed = decisionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid approval decision.", 400, parsed.error.issues);
  const approval = approvals.find((item) => item.id === parsed.data.id);
  if (!approval) return apiError("Approval request not found.", 404);
  const decision = { status: parsed.data.decision, comment: parsed.data.comment, decidedAt: new Date().toISOString() };
  decisions.set(approval.id, decision);
  return apiSuccess({ ...approval, ...decision, persisted: false, auditRequiredInLiveMode: true });
}

