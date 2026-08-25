import { workflowStages } from "@/data";
import { evaluateApproval, type ApprovalContext } from "@/lib/approvals";
import type { JobStore } from "./jobs";

export interface WorkflowRun {
  id: string;
  objective: string;
  currentStage: (typeof workflowStages)[number];
  completedStages: string[];
  status: "running" | "waiting_approval" | "paused" | "complete";
  nextAction?: string;
}

export async function advanceWorkflow(run: WorkflowRun, jobStore: JobStore, approval?: ApprovalContext) {
  if (run.status === "paused" || run.status === "complete") return run;
  if (approval) {
    const decision = evaluateApproval(approval);
    if (decision.outcome !== "AUTO_APPROVE") return { ...run, status: "waiting_approval" as const, nextAction: decision.reason };
  }
  const index = workflowStages.indexOf(run.currentStage);
  const next = workflowStages[index + 1];
  if (!next) return { ...run, completedStages: [...run.completedStages, run.currentStage], status: "complete" as const, nextAction: undefined };
  await jobStore.enqueue(`workflow.${next.toLowerCase().replaceAll(" ", "_")}`, { workflowId: run.id, objective: run.objective }, { idempotencyKey: `${run.id}:${next}` });
  return { ...run, currentStage: next, completedStages: [...run.completedStages, run.currentStage], status: "running" as const, nextAction: `Begin ${next}` };
}

