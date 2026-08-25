import { getArtwork, livingArtworks } from "@/data";
import { apiError, apiSuccess } from "@/lib/security";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return apiError("Artwork not found.", 404);
  return apiSuccess({ ...artwork, livingRecord: livingArtworks.find((living) => living.artworkId === artwork.id) ?? null });
}

