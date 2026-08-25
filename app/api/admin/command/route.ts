import { activity, approvals, budgets, campaigns, commandMetrics, dailyReports, guides, humanRequests, killSwitches, workflowStages } from "@/data";
import { apiError, apiSuccess, hasRole } from "@/lib/security";

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ metrics: commandMetrics, guides, workflowStages, activity, budgets, approvals, campaigns, killSwitches, dailyReports, humanRequests, mode: "simulated", persistence: "seed snapshot" });
}

