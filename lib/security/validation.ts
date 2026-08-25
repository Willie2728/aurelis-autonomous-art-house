import { z } from "zod";

export const conciergeSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  mode: z.enum(["floating", "embodied", "voice-only"]).default("floating"),
  consentToMemory: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  artworkId: z.string().regex(/^art-\d{3}$/),
  amountCents: z.number().int().positive().max(100_000_000),
  orderReference: z.string().min(4).max(100),
  returnUrl: z.string().url(),
});

export const previewSchema = z.object({
  artworkId: z.string().regex(/^art-\d{3}$/),
  environmentId: z.string().regex(/^environment-\d{2}$/),
  wallColor: z.string().max(50).optional(),
  scale: z.number().min(0.2).max(3).default(1),
  frame: z.string().max(80).optional(),
});

const diversitySchema = z.object({
  subject: z.string().min(2).max(200), composition: z.string().min(2).max(200), cameraDistance: z.string().min(2).max(80), cameraAngle: z.string().min(2).max(80),
  palette: z.array(z.string().min(2).max(40)).min(2).max(8), lighting: z.string().min(2).max(100), medium: z.string().min(2).max(100), surfaceTexture: z.string().min(2).max(100),
  geographicInfluence: z.string().min(2).max(100), historicalInfluence: z.string().min(2).max(100), emotionalTone: z.string().min(2).max(100),
  complexity: z.enum(["restrained", "balanced", "dense"]), negativeSpace: z.enum(["low", "medium", "high"]), humanPresence: z.string().min(2).max(100),
  architecture: z.string().min(2).max(100), environment: z.string().min(2).max(100), timeOfDay: z.string().min(2).max(80),
});

export const generationSchema = z.object({
  prompt: z.string().trim().min(12).max(4000),
  negativePrompt: z.string().max(1000).optional(),
  aspectRatio: z.enum(["1:1", "4:5", "3:2", "16:9"]),
  operation: z.enum(["text-to-image", "image-to-image", "edit", "inpaint", "outpaint", "upscale", "background-replace", "mockup"]),
  diversity: diversitySchema,
  sourceAssetUrl: z.string().url().optional(),
  seed: z.number().int().min(0).max(2_147_483_647).optional(),
});

export async function parseJson<T>(request: Request, schema: z.ZodType<T>): Promise<{ success: true; data: T } | { success: false; error: string; issues?: z.core.$ZodIssue[] }> {
  try {
    const body: unknown = await request.json();
    const result = schema.safeParse(body);
    return result.success ? { success: true, data: result.data } : { success: false, error: "Validation failed.", issues: result.error.issues };
  } catch {
    return { success: false, error: "Request body must be valid JSON." };
  }
}

