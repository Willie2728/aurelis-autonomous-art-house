import { providers } from "@/lib/providers";
import type { ResearchQuery, TrendAssessment } from "./types";

export async function research(query: ResearchQuery) {
  if (!query.allowedDomains.length) throw new Error("Research must declare an allowed-domain list.");
  return providers.search.search({ query: query.query, allowedDomains: query.allowedDomains, limit: Math.min(query.maxResults, 20) });
}

export function assessTrend(name: string, evidenceCount: number, sourceDiversity: number, momentum: number): TrendAssessment {
  const confidence = Math.min(0.95, 0.35 + evidenceCount * 0.06 + sourceDiversity * 0.09);
  return {
    name,
    confidence,
    momentum: Math.max(-1, Math.min(1, momentum)),
    evidence: [],
    riskNotes: ["Verify evidence dates and source permission.", "Do not copy protected work or reduce a culture to a trend."],
    recommendation: confidence >= 0.75 && sourceDiversity >= 2 ? "prototype" : "observe",
  };
}

