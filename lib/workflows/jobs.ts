export type JobStatus = "queued" | "running" | "waiting_approval" | "succeeded" | "failed" | "cancelled";

export interface DurableJob<TPayload = unknown, TResult = unknown> {
  id: string;
  type: string;
  payload: TPayload;
  result?: TResult;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  runAfter: string;
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
  lastError?: string;
}

export interface JobStore {
  enqueue<T>(type: string, payload: T, options?: { idempotencyKey?: string; runAfter?: Date; maxAttempts?: number }): Promise<DurableJob<T>>;
  claim(workerId: string, types?: string[]): Promise<DurableJob | null>;
  complete<TResult>(id: string, result: TResult): Promise<void>;
  fail(id: string, error: string, retryAt?: Date): Promise<void>;
  cancel(id: string): Promise<void>;
  list(): Promise<DurableJob[]>;
}

export class InMemoryJobStore implements JobStore {
  private jobs = new Map<string, DurableJob>();
  async enqueue<T>(type: string, payload: T, options: { idempotencyKey?: string; runAfter?: Date; maxAttempts?: number } = {}) {
    const idempotencyKey = options.idempotencyKey ?? crypto.randomUUID();
    const existing = [...this.jobs.values()].find((job) => job.idempotencyKey === idempotencyKey);
    if (existing) return existing as DurableJob<T>;
    const now = new Date().toISOString();
    const job: DurableJob<T> = { id: crypto.randomUUID(), type, payload, status: "queued", attempts: 0, maxAttempts: options.maxAttempts ?? 3, runAfter: (options.runAfter ?? new Date()).toISOString(), idempotencyKey, createdAt: now, updatedAt: now };
    this.jobs.set(job.id, job);
    return job;
  }
  async claim(_workerId: string, types?: string[]) {
    const now = Date.now();
    const job = [...this.jobs.values()].find((candidate) => candidate.status === "queued" && Date.parse(candidate.runAfter) <= now && (!types?.length || types.includes(candidate.type)));
    if (!job) return null;
    job.status = "running";
    job.attempts += 1;
    job.updatedAt = new Date().toISOString();
    return job;
  }
  async complete<TResult>(id: string, result: TResult) {
    const job = this.required(id);
    job.status = "succeeded";
    job.result = result;
    job.updatedAt = new Date().toISOString();
  }
  async fail(id: string, error: string, retryAt?: Date) {
    const job = this.required(id);
    job.lastError = error.slice(0, 1000);
    job.status = job.attempts < job.maxAttempts ? "queued" : "failed";
    job.runAfter = (retryAt ?? new Date(Date.now() + 30_000 * Math.max(1, job.attempts))).toISOString();
    job.updatedAt = new Date().toISOString();
  }
  async cancel(id: string) {
    const job = this.required(id);
    if (job.status === "succeeded") throw new Error("A completed job cannot be cancelled.");
    job.status = "cancelled";
    job.updatedAt = new Date().toISOString();
  }
  async list() { return [...this.jobs.values()]; }
  private required(id: string) {
    const job = this.jobs.get(id);
    if (!job) throw new Error(`Job ${id} was not found.`);
    return job;
  }
}

// Production should bind this interface to PostgreSQL/Redis or a managed queue.
// The in-memory implementation intentionally makes no durability claim.
export const demoJobStore = new InMemoryJobStore();

