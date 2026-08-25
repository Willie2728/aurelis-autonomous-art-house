import type { DiversityProfile } from "@/lib/providers";

export interface SimilarityCandidate {
  id: string;
  title?: string;
  subject: string;
  composition: string;
  palette: string[];
  environment: string;
  pose?: string;
  backgroundPattern?: string;
}

export interface SimilarityBreakdown {
  total: number;
  subject: number;
  composition: number;
  palette: number;
  environment: number;
  pose: number;
  backgroundPattern: number;
}

function tokenize(value: string) {
  return new Set(value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2));
}

export function jaccard(left: string, right: string) {
  const a = tokenize(left);
  const b = tokenize(right);
  if (!a.size && !b.size) return 1;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / new Set([...a, ...b]).size;
}

export function paletteSimilarity(left: string[], right: string[]) {
  if (!left.length && !right.length) return 1;
  const a = new Set(left.map((color) => color.toLowerCase()));
  const b = new Set(right.map((color) => color.toLowerCase()));
  const overlap = [...a].filter((color) => b.has(color)).length;
  return (2 * overlap) / Math.max(1, a.size + b.size);
}

export function similarityScore(left: SimilarityCandidate, right: SimilarityCandidate): SimilarityBreakdown {
  const result = {
    subject: jaccard(left.subject, right.subject),
    composition: jaccard(left.composition, right.composition),
    palette: paletteSimilarity(left.palette, right.palette),
    environment: jaccard(left.environment, right.environment),
    pose: jaccard(left.pose ?? "", right.pose ?? ""),
    backgroundPattern: jaccard(left.backgroundPattern ?? "", right.backgroundPattern ?? ""),
  };
  const weighted = result.subject * 0.25 + result.composition * 0.22 + result.palette * 0.18 + result.environment * 0.15 + result.pose * 0.1 + result.backgroundPattern * 0.1;
  return { ...result, total: Math.min(1, Math.max(0, Number(weighted.toFixed(6)))) };
}

export function profileToCandidate(id: string, profile: DiversityProfile): SimilarityCandidate {
  return {
    id,
    subject: profile.subject,
    composition: `${profile.composition} ${profile.cameraDistance} ${profile.cameraAngle} ${profile.negativeSpace}`,
    palette: profile.palette,
    environment: `${profile.environment} ${profile.architecture} ${profile.timeOfDay}`,
    pose: profile.humanPresence,
    backgroundPattern: `${profile.surfaceTexture} ${profile.historicalInfluence} ${profile.geographicInfluence}`,
  };
}

export function findNearDuplicates(candidate: SimilarityCandidate, catalog: SimilarityCandidate[], threshold = 0.78) {
  if (threshold < 0 || threshold > 1) throw new RangeError("Similarity threshold must be between 0 and 1.");
  return catalog
    .map((existing) => ({ candidate: existing, score: similarityScore(candidate, existing) }))
    .filter((match) => match.score.total >= threshold)
    .sort((a, b) => b.score.total - a.score.total);
}
