import { describe, expect, it } from "vitest";
import { evaluateApproval } from "@/lib/approvals";

describe("human approval policy", () => {
  it.each(["NEW_PROVIDER", "MONEY_TRANSFER", "CAMPAIGN_BUDGET_INCREASE", "RIGHTS_WARNING"] as const)("requires a human for %s", (action) => {
    expect(evaluateApproval({ action }).outcome).toBe("HUMAN_APPROVAL_REQUIRED");
  });

  it("allows routine generation only within budget", () => {
    expect(evaluateApproval({ action: "ROUTINE_GENERATION", withinApprovedBudget: true }).outcome).toBe("AUTO_APPROVE");
    expect(evaluateApproval({ action: "ROUTINE_GENERATION", withinApprovedBudget: false }).outcome).toBe("HUMAN_APPROVAL_REQUIRED");
  });

  it("requires review for a large refund", () => {
    expect(evaluateApproval({ action: "REFUND", amountCents: 50_001 }).outcome).toBe("HUMAN_APPROVAL_REQUIRED");
  });
});

