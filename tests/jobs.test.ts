import { describe, expect, it } from "vitest";
import { InMemoryJobStore } from "@/lib/workflows";

describe("durable job abstraction", () => {
  it("deduplicates enqueue requests and completes work", async () => {
    const store = new InMemoryJobStore();
    const first = await store.enqueue("research", { q: "light" }, { idempotencyKey: "one" });
    const second = await store.enqueue("research", { q: "different" }, { idempotencyKey: "one" });
    expect(second.id).toBe(first.id);
    const claimed = await store.claim("worker");
    expect(claimed?.status).toBe("running");
    await store.complete(first.id, { ok: true });
    expect((await store.list())[0].status).toBe("succeeded");
  });
});

