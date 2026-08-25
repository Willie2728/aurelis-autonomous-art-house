import { trends } from "@/data";
import { apiSuccess } from "@/lib/security";

export async function GET() {
  return apiSuccess({ items: trends, researchedAt: "2026-08-04", note: "Seeded from permitted public reporting. Signals inform experimentation; they do not establish artistic quality or permission to copy.", liveResearchConnected: false });
}

