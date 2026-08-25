export const workflowStages = [
  "Observe", "Research", "Debate", "Ideate", "Generate", "Inspect", "Check similarity", "Check rights", "Curate",
  "Price", "Animate", "Exhibit", "Promote", "Sell", "Fulfill", "Support", "Measure", "Learn", "Repeat",
] as const;

export const activity = [
  { id: "activity-01", guide: "Seraphina Vale", action: "Assigned evidence review for Cool Blue signal", timestamp: "2026-08-04T22:04:00.000Z", level: "info" },
  { id: "activity-02", guide: "Rights & Provenance", action: "Passed originality checklist for four demo studies", timestamp: "2026-08-04T21:48:00.000Z", level: "success" },
  { id: "activity-03", guide: "Growth & Marketing", action: "Submitted paid launch budget for human approval", timestamp: "2026-08-04T21:17:00.000Z", level: "warning" },
  { id: "activity-04", guide: "Studio Production", action: "Paused batch at diversity threshold", timestamp: "2026-08-04T20:46:00.000Z", level: "warning" },
  { id: "activity-05", guide: "Market Intelligence", action: "Recorded accessible-price collector signal", timestamp: "2026-08-04T20:31:00.000Z", level: "info" },
  { id: "activity-06", guide: "Finance & Compliance", action: "Reconciled simulated production ledger", timestamp: "2026-08-04T20:05:00.000Z", level: "success" },
];

export const budgets = [
  { id: "budget-production", name: "Production", allocatedCents: 1200000, spentCents: 438200, approvalThresholdCents: 25000 },
  { id: "budget-advertising", name: "Advertising", allocatedCents: 800000, spentCents: 112500, approvalThresholdCents: 0 },
  { id: "budget-fulfillment", name: "Fulfillment reserve", allocatedCents: 900000, spentCents: 142000, approvalThresholdCents: 50000 },
  { id: "budget-tax", name: "Tax reserve", allocatedCents: 650000, spentCents: 0, approvalThresholdCents: 0 },
  { id: "budget-refund", name: "Refund reserve", allocatedCents: 300000, spentCents: 48000, approvalThresholdCents: 50000 },
  { id: "budget-growth", name: "Growth reserve", allocatedCents: 500000, spentCents: 72500, approvalThresholdCents: 25000 },
];

export const providerConnections = [
  { id: "provider-llm", name: "Language model", provider: "Simulated AURELIS", category: "llm", status: "CONNECTED", mode: "simulated", scope: "curation and concierge", estimatedCost: "$0 demo", lastChecked: "2026-08-04T22:00:00.000Z" },
  { id: "provider-image", name: "Image generation", provider: "Simulated Studio", category: "image", status: "CONNECTED", mode: "simulated", scope: "metadata-only demo generation", estimatedCost: "$0 demo", lastChecked: "2026-08-04T22:00:00.000Z" },
  { id: "provider-motion", name: "Motion generation", provider: "Not configured", category: "motion", status: "NOT_CONNECTED", mode: "live-required", scope: "image-to-video", estimatedCost: "provider dependent", lastChecked: null },
  { id: "provider-voice", name: "Speech", provider: "Browser fallback", category: "voice", status: "CONNECTED", mode: "fallback", scope: "accessibility narration", estimatedCost: "$0", lastChecked: "2026-08-04T22:00:00.000Z" },
  { id: "provider-search", name: "Research search", provider: "Seed evidence", category: "search", status: "CONNECTED", mode: "simulated", scope: "curated public links only", estimatedCost: "$0 demo", lastChecked: "2026-08-04T22:00:00.000Z" },
  { id: "provider-payment", name: "Payments", provider: "Stripe", category: "payment", status: "NOT_CONNECTED", mode: "safe-demo", scope: "checkout intent preview", estimatedCost: "Stripe rates", lastChecked: null },
  { id: "provider-storage", name: "Object storage", provider: "Local demo references", category: "storage", status: "CONNECTED", mode: "simulated", scope: "read-only demo assets", estimatedCost: "$0 demo", lastChecked: "2026-08-04T22:00:00.000Z" },
];

export const killSwitches = [
  "art_generation", "motion_generation", "public_posting", "advertising", "refund_processing", "email_automation", "autonomous_research", "all_operations",
].map((id) => ({ id, label: id.split("_").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(" "), engaged: false, changedAt: null, changedBy: null }));

export const commandMetrics = {
  monthlyRevenueTargetCents: 5000000,
  simulatedRevenueCents: 1734200,
  catalogReady: 100,
  livingReady: 25,
  approvalsPending: 3,
  activeGuides: 12,
  salesConversionRate: 0.024,
  status: "DEMO",
} as const;

export const dailyReports = [
  {
    id: "report-2026-08-04",
    date: "2026-08-04",
    art: { generated: 4, approved: 3, heldForSimilarity: 1, motionPrepared: 2 },
    marketing: { drafts: 3, organicApproved: 1, paidAwaitingApproval: 1, published: 0 },
    commerce: { simulatedOrders: 7, simulatedRevenueCents: 382400, refundsPending: 1 },
    risks: ["Motion provider is not connected.", "Paid YouTube campaign is awaiting Founder approval."],
    nextActions: ["Diversify works-on-paper batch.", "Review campaign budget evidence.", "Replace demo motion placeholder after provider approval."],
    mode: "simulated",
  },
];

export const humanRequests = [
  { id: "request-01", title: "Approve motion-provider sandbox evaluation", category: "provider", status: "OPEN", requestedAt: "2026-08-04T17:10:00.000Z", acknowledgedAt: null, reminderAfter: "2026-08-05T17:10:00.000Z", owner: "Founder", detail: "Vendor activation requires terms, data-use, price, and safety review before any API key is supplied." },
  { id: "request-02", title: "Confirm Stripe test-mode account", category: "commerce", status: "OPEN", requestedAt: "2026-08-04T18:45:00.000Z", acknowledgedAt: null, reminderAfter: "2026-08-05T18:45:00.000Z", owner: "Founder", detail: "Use test credentials only until checkout, tax, webhook, refund, and audit controls pass review." },
  { id: "request-03", title: "Acknowledge demo-media replacement requirement", category: "media", status: "ACKNOWLEDGED", requestedAt: "2026-08-03T16:00:00.000Z", acknowledgedAt: "2026-08-04T15:30:00.000Z", reminderAfter: null, owner: "Creative Director", detail: "External presentation placeholders cannot be used for product fulfillment." },
];
