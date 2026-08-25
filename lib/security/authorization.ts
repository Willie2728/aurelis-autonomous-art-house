export type AppRole = "VISITOR" | "MEMBER" | "CURATOR" | "OPERATOR" | "FOUNDER" | "ADMIN";
const rank: Record<AppRole, number> = { VISITOR: 0, MEMBER: 1, CURATOR: 2, OPERATOR: 3, FOUNDER: 4, ADMIN: 5 };

export function requestRole(request: Request): AppRole {
  // Replace this seam with verified session claims. The header is accepted only
  // in explicit demo mode so production cannot self-assert privileged roles.
  if (process.env.AURELIS_DEMO_MODE === "true") {
    const value = request.headers.get("x-aurelis-demo-role")?.toUpperCase();
    if (value && value in rank) return value as AppRole;
    return "FOUNDER";
  }
  return "VISITOR";
}

export function hasRole(request: Request, minimum: AppRole) {
  return rank[requestRole(request)] >= rank[minimum];
}

