import { providerConnections } from "@/data";
import { providerHealth } from "@/lib/providers";
import { apiError, apiSuccess, hasRole } from "@/lib/security";

export async function GET(request: Request) {
  if (!hasRole(request, "OPERATOR")) return apiError("Operator access is required.", 403);
  return apiSuccess({ connections: providerConnections, runtimeHealth: await providerHealth(), note: "Credential values are never included in this response." });
}

