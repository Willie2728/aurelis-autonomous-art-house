import { environments, getArtwork } from "@/data";
import { apiError, apiSuccess, parseJson, previewSchema } from "@/lib/security";

export async function POST(request: Request) {
  const parsed = await parseJson(request, previewSchema);
  if (!parsed.success) return apiError(parsed.error, 400, parsed.issues);
  const artwork = getArtwork(parsed.data.artworkId);
  const environment = environments.find((item) => item.id === parsed.data.environmentId);
  if (!artwork || !environment) return apiError("Artwork or environment not found.", 404);
  return apiSuccess({ id: `preview-${artwork.id}-${environment.id}`, artwork, environment, configuration: parsed.data, placement: { xPercent: 50, yPercent: 42, scale: parsed.data.scale, method: "perspective-aware simulated anchor" }, advancedCvConnected: false, simulated: true });
}

