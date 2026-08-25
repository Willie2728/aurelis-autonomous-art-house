import { providers, type ImageGenerationRequest } from "@/lib/providers";
import { buildOriginalityNegativePrompt, reviewPrompt } from "./prompt-policy";
import { findNearDuplicates, profileToCandidate, type SimilarityCandidate } from "./similarity";

export async function generateArtwork(request: ImageGenerationRequest, catalogProfiles: SimilarityCandidate[] = [], threshold = 0.78) {
  const review = reviewPrompt(request.prompt);
  if (!review.allowed) return { status: "blocked" as const, reason: "PROMPT_RIGHTS_REVIEW", review };

  const candidate = profileToCandidate("pending", request.diversity);
  const matches = findNearDuplicates(candidate, catalogProfiles, threshold);
  if (matches.length) return { status: "blocked" as const, reason: "SIMILARITY_THRESHOLD", matches };

  const generated = await providers.image.generate({
    ...request,
    negativePrompt: [request.negativePrompt, buildOriginalityNegativePrompt()].filter(Boolean).join(", "),
  });
  return { status: "generated" as const, asset: generated, review, similarity: { threshold, matches: [] } };
}

