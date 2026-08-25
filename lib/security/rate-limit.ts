type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export interface RateLimitOptions { limit: number; windowMs: number; now?: number }

export function checkRateLimit(key: string, options: RateLimitOptions) {
  const now = options.now ?? Date.now();
  const existing = buckets.get(key);
  const entry = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + options.windowMs } : existing;
  entry.count += 1;
  buckets.set(key, entry);
  return { allowed: entry.count <= options.limit, remaining: Math.max(0, options.limit - entry.count), resetAt: entry.resetAt, limit: options.limit };
}

export function clearRateLimitState() { buckets.clear(); }

export function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

