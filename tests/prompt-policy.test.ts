import { describe, expect, it } from "vitest";
import { reviewPrompt, transformNamedReference } from "@/lib/ai";

describe("prompt rights policy", () => {
  it("blocks direct living-artist imitation language", () => {
    expect(reviewPrompt("Paint a portrait in the style of Christian Hook").allowed).toBe(false);
  });

  it("allows broader original visual attributes", () => {
    expect(reviewPrompt("Original expressive portrait with fragmented planes, visible texture, teal light, and generous negative space").allowed).toBe(true);
  });

  it("can translate named examples into general attributes", () => {
    expect(transformNamedReference("Use Voka as a reference")).not.toMatch(/voka/i);
  });
});

