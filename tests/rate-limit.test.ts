import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, clearRateLimitState } from "@/lib/security";

describe("rate limiting", () => {
  beforeEach(clearRateLimitState);
  it("blocks attempts above the configured window limit", () => {
    expect(checkRateLimit("person", { limit: 2, windowMs: 1000, now: 10 }).allowed).toBe(true);
    expect(checkRateLimit("person", { limit: 2, windowMs: 1000, now: 20 }).allowed).toBe(true);
    expect(checkRateLimit("person", { limit: 2, windowMs: 1000, now: 30 }).allowed).toBe(false);
    expect(checkRateLimit("person", { limit: 2, windowMs: 1000, now: 1011 }).allowed).toBe(true);
  });
});

