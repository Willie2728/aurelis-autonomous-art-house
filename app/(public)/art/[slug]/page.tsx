import { notFound } from "next/navigation";
import { artBySlug, artworks } from "@/components/site/catalog";
import { ArtworkDetail } from "@/components/artwork/artwork-detail";
export function generateStaticParams() { return artworks.map((artwork) => ({ slug: artwork.slug })); }
export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const artwork = artBySlug(slug); if (!artwork) notFound(); const related = artworks.filter((item) => item.id !== artwork.id && (item.artistId === artwork.artistId || item.category === artwork.category || item.collection === artwork.collection)); return <ArtworkDetail artwork={artwork} related={related}/>; }
