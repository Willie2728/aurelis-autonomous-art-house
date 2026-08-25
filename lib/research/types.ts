export interface ResearchQuery { query: string; allowedDomains: string[]; maxResults: number; purpose: string }
export interface ResearchEvidence { title: string; url: string; source: string; observedAt: string; excerpt: string; permissionBasis: "public_page" | "licensed_api" | "approved_feed" }
export interface TrendAssessment { name: string; confidence: number; momentum: number; evidence: ResearchEvidence[]; riskNotes: string[]; recommendation: "observe" | "prototype" | "human_review" | "reject" }

export const researchPolicy = {
  prohibited: ["paywall bypass", "CAPTCHA circumvention", "private-data access", "terms-violating scraping"],
  allowed: ["licensed APIs", "permitted public pages", "approved feeds", "human-supplied research"],
  principle: "Popularity is a signal, not a measure of artistic quality and never permission to copy.",
} as const;

