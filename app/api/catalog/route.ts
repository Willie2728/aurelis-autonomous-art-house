import { artworks, galleryRooms, searchArtworks } from "@/data";
import { apiSuccess } from "@/lib/security";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? "";
  const room = params.get("room")?.toLowerCase();
  const living = params.get("living");
  const limit = Math.min(100, Math.max(1, Number(params.get("limit")) || 24));
  let results = query ? searchArtworks(query) : artworks;
  if (room) results = results.filter((artwork) => artwork.room.toLowerCase() === room || galleryRooms.find((candidate) => candidate.slug === room)?.name === artwork.room);
  if (living === "true") results = results.filter((artwork) => artwork.living);
  if (living === "false") results = results.filter((artwork) => !artwork.living);
  return apiSuccess({ items: results.slice(0, limit), total: results.length, limit, filters: { query, room: room ?? null, living: living ?? null }, simulated: true });
}

