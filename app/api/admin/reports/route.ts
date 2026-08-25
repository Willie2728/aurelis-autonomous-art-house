import { dailyReports } from "@/data";
import { apiError, apiSuccess, hasRole } from "@/lib/security";

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ items: dailyReports, mode: "simulated", generatedAutomatically: false, note: "Connect persistent metrics and a scheduled job before treating these as live operating reports." });
}

