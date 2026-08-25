export interface PrintPreparation {
  pixelWidth: number;
  pixelHeight: number;
  targetWidthInches: number;
  targetHeightInches: number;
  dpi: number;
  ready: boolean;
  warnings: string[];
}

export function assessPrintReadiness(pixelWidth: number, pixelHeight: number, targetWidthInches: number, targetHeightInches: number, requiredDpi = 300): PrintPreparation {
  if ([pixelWidth, pixelHeight, targetWidthInches, targetHeightInches].some((value) => value <= 0)) throw new RangeError("Print dimensions must be positive.");
  const dpi = Math.floor(Math.min(pixelWidth / targetWidthInches, pixelHeight / targetHeightInches));
  const warnings = dpi < requiredDpi ? [`Resolution is ${dpi} DPI; upscale and inspect before production (${requiredDpi} DPI target).`] : [];
  return { pixelWidth, pixelHeight, targetWidthInches, targetHeightInches, dpi, ready: warnings.length === 0, warnings };
}

