export type MaterialCode = "fine_art_paper" | "archival_paper" | "canvas" | "framed_canvas" | "metal" | "acrylic" | "glass" | "wood" | "textile" | "mixed_media" | "gold_leaf" | "digital" | "living_digital";
export type SizeCode = "small" | "medium" | "large" | "oversized" | "statement" | "custom";
export type LicenseCode = "personal" | "commercial_display" | "hospitality" | "corporate";

const materialMultipliers: Record<MaterialCode, number> = {
  fine_art_paper: 1, archival_paper: 1.12, canvas: 1.32, framed_canvas: 1.78, metal: 2.05, acrylic: 2.2, glass: 2.45,
  wood: 1.85, textile: 1.72, mixed_media: 3.2, gold_leaf: 4.1, digital: 0.34, living_digital: 1.3,
};
const sizeMultipliers: Record<SizeCode, number> = { small: 0.72, medium: 1, large: 1.65, oversized: 2.7, statement: 4.2, custom: 5.1 };
const licenseMultipliers: Record<LicenseCode, number> = { personal: 1, commercial_display: 2.4, hospitality: 4.2, corporate: 6.5 };

export interface PriceInput {
  baseProductionCostCents: number;
  material: MaterialCode;
  size: SizeCode;
  frameCostCents?: number;
  packagingCostCents?: number;
  shippingCostCents?: number;
  editionScarcity?: number;
  motionProductionCostCents?: number;
  license?: LicenseCode;
  marginTarget?: number;
  studioTier?: 1 | 2 | 3;
  demandIndex?: number;
  promotionPercent?: number;
}

export interface PriceQuote {
  productionCents: number;
  landedCostCents: number;
  prePromotionCents: number;
  finalPriceCents: number;
  marginCents: number;
  currency: "USD";
  configurable: true;
}

export function calculatePrice(input: PriceInput): PriceQuote {
  const values = [input.baseProductionCostCents, input.frameCostCents ?? 0, input.packagingCostCents ?? 0, input.shippingCostCents ?? 0, input.motionProductionCostCents ?? 0];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) throw new RangeError("Price costs must be finite non-negative numbers.");
  const margin = input.marginTarget ?? 0.58;
  if (margin < 0 || margin >= 0.9) throw new RangeError("Margin target must be at least 0 and below 0.9.");
  const scarcity = Math.max(1, Math.min(2.5, input.editionScarcity ?? 1));
  const demand = Math.max(0.8, Math.min(1.7, input.demandIndex ?? 1));
  const studio = [1, 1.18, 1.4][(input.studioTier ?? 1) - 1];
  const productionCents = Math.round(input.baseProductionCostCents * materialMultipliers[input.material] * sizeMultipliers[input.size]);
  const landedCostCents = productionCents + (input.frameCostCents ?? 0) + (input.packagingCostCents ?? 0) + (input.shippingCostCents ?? 0) + (input.motionProductionCostCents ?? 0);
  const license = licenseMultipliers[input.license ?? "personal"];
  const prePromotionCents = Math.ceil((landedCostCents / (1 - margin)) * scarcity * demand * studio * license / 100) * 100;
  const promotion = Math.max(0, Math.min(0.5, input.promotionPercent ?? 0));
  const finalPriceCents = Math.max(landedCostCents, Math.round(prePromotionCents * (1 - promotion) / 100) * 100);
  return { productionCents, landedCostCents, prePromotionCents, finalPriceCents, marginCents: finalPriceCents - landedCostCents, currency: "USD", configurable: true };
}

