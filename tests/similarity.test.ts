import { describe, expect, it } from "vitest";
import { findNearDuplicates, similarityScore, type SimilarityCandidate } from "@/lib/ai";

const first: SimilarityCandidate = { id: "a", subject: "elder reading beside window", composition: "waist-up figure left third", palette: ["blue", "clay"], environment: "quiet apartment morning", pose: "seated reading", backgroundPattern: "plain plaster" };

describe("similarity controls", () => {
  it("scores identical profiles as a duplicate", () => {
    expect(similarityScore(first, { ...first, id: "b" }).total).toBe(1);
    expect(findNearDuplicates(first, [{ ...first, id: "b" }], 0.78)).toHaveLength(1);
  });

  it("keeps unrelated profiles below the threshold", () => {
    const second: SimilarityCandidate = { id: "b", subject: "kinetic steel abstraction", composition: "suspended diagonal wide view", palette: ["silver", "red"], environment: "open water court dusk", pose: "no figures", backgroundPattern: "rippling water" };
    expect(similarityScore(first, second).total).toBeLessThan(0.4);
    expect(findNearDuplicates(first, [second], 0.78)).toHaveLength(0);
  });
});

