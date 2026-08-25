import { providers } from "@/lib/providers";

const restrainedMotionTerms = ["subtle", "slow", "gentle", "restrained", "ambient", "natural", "quiet", "minimal"];

export function reviewMotionPrompt(prompt: string) {
  const normalized = prompt.toLowerCase();
  return {
    preservesComposition: !/new scene|cuts? to|transform into unrelated|explosion/i.test(normalized),
    restraintScore: restrainedMotionTerms.filter((term) => normalized.includes(term)).length / restrainedMotionTerms.length,
    audioDefault: "muted" as const,
  };
}

export async function createLivingArtwork(input: { imageUrl: string; prompt: string; durationSeconds?: number }) {
  const review = reviewMotionPrompt(input.prompt);
  if (!review.preservesComposition) return { status: "blocked" as const, reason: "COMPOSITION_PRESERVATION", review };
  const result = await providers.motion.create({ imageUrl: input.imageUrl, prompt: input.prompt, durationSeconds: input.durationSeconds ?? 12, preserveComposition: true });
  return { status: "created" as const, result, review };
}

