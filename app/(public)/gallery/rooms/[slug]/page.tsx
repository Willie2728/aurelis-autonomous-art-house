import { notFound } from "next/navigation";
import { artworks, rooms, roomBySlug } from "@/components/site/catalog";
import { RoomExperience } from "@/components/rooms/room-experience";
export function generateStaticParams() { return rooms.map((room) => ({ slug: room.slug })); }
export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const room = roomBySlug(slug); if (!room) notFound(); const roomArtworks = artworks.filter((artwork) => room.artworkIds.includes(artwork.id) || artwork.room === room.name); return <RoomExperience room={room} roomArtworks={roomArtworks}/>; }
