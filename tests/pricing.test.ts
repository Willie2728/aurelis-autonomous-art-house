import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/lib/commerce";

describe("pricing engine", () => {
  it("keeps final price above landed cost", () => {
    const quote = calculatePrice({ baseProductionCostCents: 20_000, material: "canvas", size: "large", frameCostCents: 8_000, packagingCostCents: 2_000, shippingCostCents: 4_000 });
    expect(quote.finalPriceCents).toBeGreaterThan(quote.landedCostCents);
    expect(quote.currency).toBe("USD");
    expect(quote.configurable).toBe(true);
  });

  it("charges more for a corporate license than personal use", () => {
    const base = { baseProductionCostCents: 10_000, material: "digital" as const, size: "medium" as const };
    expect(calculatePrice({ ...base, license: "corporate" }).finalPriceCents).toBeGreaterThan(calculatePrice({ ...base, license: "personal" }).finalPriceCents);
  });

  it("rejects invalid costs and unsafe margins", () => {
    expect(() => calculatePrice({ baseProductionCostCents: -1, material: "canvas", size: "medium" })).toThrow();
    expect(() => calculatePrice({ baseProductionCostCents: 10_000, material: "canvas", size: "medium", marginTarget: 0.95 })).toThrow();
  });
});

