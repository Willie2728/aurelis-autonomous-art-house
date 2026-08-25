import { campaigns } from "@/data";
import { evaluateApproval } from "@/lib/approvals";
import { apiError, apiSuccess, hasRole } from "@/lib/security";
import { z } from "zod";

const campaignSchema = z.object({ name: z.string().min(3).max(140), channel: z.enum(["TikTok", "Instagram", "YouTube", "Pinterest", "Facebook", "LinkedIn", "Email", "Search"]), dailyBudgetCents: z.number().int().min(0).max(10_000_000), goal: z.string().min(3).max(300), content: z.string().min(3).max(5000) });

export async function GET() {
  return apiSuccess({ items: campaigns, publicationMode: "draft-only unless human-approved", rewardsPolicy: "Rewards are for honest participation and are never conditioned on a positive review." });
}

export async function POST(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  const parsed = campaignSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("Invalid campaign proposal.", 400, parsed.error.issues);
  const approval = evaluateApproval({ action: parsed.data.dailyBudgetCents > 0 ? "CAMPAIGN_BUDGET" : "ORGANIC_POST", amountCents: parsed.data.dailyBudgetCents, channelApproved: true });
  return apiSuccess({ id: crypto.randomUUID(), ...parsed.data, status: approval.outcome === "AUTO_APPROVE" ? "DRAFT" : "AWAITING_APPROVAL", approval, published: false, spentCents: 0, persistence: "not persisted in demo" }, { status: 201 });
}

