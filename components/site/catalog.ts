import {
  artworks,
  artists,
  environments,
  galleryRooms,
  collections as seedCollections,
  exhibitions as seedExhibitions,
} from "@/data";

// Visitor-facing adapter for the shared platform catalog. Keeping this tiny adapter
// lets the public experience use semantic display fields without changing core seed data.
export { artworks, artists, environments };
export const rooms = galleryRooms;

export type CollectionRecord = { slug: string; title: string; subtitle: string; description: string; artworkIds: string[]; tone: string };
const collectionTones = ["#775342", "#42666c", "#8f6f3b", "#615876", "#6d754b"];
export const collections: CollectionRecord[] = seedCollections.map((collection, index) => ({
  slug: collection.slug,
  title: collection.name,
  subtitle: index < 5 ? "Curator's selection" : "AURELIS collection",
  description: collection.statement,
  artworkIds: artworks.filter((artwork) => artwork.collection === collection.name).map((artwork) => artwork.id),
  tone: collectionTones[index % collectionTones.length],
}));

export type ExhibitionRecord = { slug: string; title: string; dates: string; status: "Now open" | "Upcoming" | "Archive"; roomSlug: string; statement: string; artworkIds: string[] };
export const exhibitions: ExhibitionRecord[] = seedExhibitions.map((exhibition) => ({
  slug: exhibition.slug,
  title: exhibition.name,
  dates: exhibition.status === "current" ? "Now — October 18, 2026" : exhibition.status === "upcoming" ? "Opening this season" : "From the archive",
  status: exhibition.status === "current" ? "Now open" : exhibition.status === "upcoming" ? "Upcoming" : "Archive",
  roomSlug: rooms.find((room) => exhibition.roomIds.includes(room.id))?.slug || rooms[0].slug,
  statement: exhibition.subtitle,
  artworkIds: exhibition.artworkIds,
}));

export const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
export const artBySlug = (slug: string) => artworks.find((artwork) => artwork.slug === slug);
export const artistBySlug = (slug: string) => artists.find((artist) => artist.slug === slug);
export const roomBySlug = (slug: string) => rooms.find((room) => room.slug === slug);
