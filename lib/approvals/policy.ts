export type ControlledAction =
  | "ROUTINE_GENERATION"
  | "NEW_PROVIDER"
  | "NEW_FINANCIAL_ACCOUNT"
  | "MONEY_TRANSFER"
  | "NEW_AD_CHANNEL"
  | "CAMPAIGN_BUDGET"
  | "CAMPAIGN_BUDGET_INCREASE"
  | "REFUND"
  | "PUBLIC_STATEMENT"
  | "RIGHTS_WARNING"
  | "ORGANIC_POST"
  | "RESEARCH";

export interface ApprovalContext {
  action: ControlledAction;
  amountCents?: number;
  withinApprovedBudget?: boolean;
  rightsFlag?: boolean;
  reputationRisk?: "low" | "medium" | "high";
  providerApproved?: boolean;
  channelApproved?: boolean;
}

export interface ApprovalDecision {
  outcome: "AUTO_APPROVE" | "HUMAN_APPROVAL_REQUIRED" | "BLOCK";
  reason: string;
  approvalLevel: "routine" | "financial" | "vendor" | "legal-rights" | "reputation";
}

const alwaysHuman = new Set<ControlledAction>(["NEW_PROVIDER", "NEW_FINANCIAL_ACCOUNT", "MONEY_TRANSFER", "NEW_AD_CHANNEL", "CAMPAIGN_BUDGET", "CAMPAIGN_BUDGET_INCREASE", "PUBLIC_STATEMENT", "RIGHTS_WARNING"]);

export function evaluateApproval(context: ApprovalContext): ApprovalDecision {
  if (context.rightsFlag) return { outcome: "HUMAN_APPROVAL_REQUIRED", reason: "A rights or provenance flag must be resolved by a human.", approvalLevel: "legal-rights" };
  if (context.reputationRisk === "high") return { outcome: "HUMAN_APPROVAL_REQUIRED", reason: "High-risk public or reputational decisions require human review.", approvalLevel: "reputation" };
  if (alwaysHuman.has(context.action)) return { outcome: "HUMAN_APPROVAL_REQUIRED", reason: `${context.action} is a protected action.`, approvalLevel: context.action.includes("PROVIDER") ? "vendor" : context.action.includes("PUBLIC") ? "reputation" : "financial" };
  if (context.action === "REFUND" && (context.amountCents ?? 0) > 50000) return { outcome: "HUMAN_APPROVAL_REQUIRED", reason: "Refunds above $500 require human approval.", approvalLevel: "financial" };
  if (context.action === "ROUTINE_GENERATION" && !context.withinApprovedBudget) return { outcome: "HUMAN_APPROVAL_REQUIRED", reason: "Generation is outside the approved production budget.", approvalLevel: "financial" };
  if (context.providerApproved === false || context.channelApproved === false) return { outcome: "BLOCK", reason: "The provider or channel has not been approved.", approvalLevel: "vendor" };
  return { outcome: "AUTO_APPROVE", reason: "Routine low-risk action within existing policy and budget.", approvalLevel: "routine" };
}

