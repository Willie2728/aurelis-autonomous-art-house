"use client";
import { useExperience } from "@/components/site/experience-provider";
import { artworks } from "@/components/site/catalog";
import { ArtworkCard } from "@/components/artwork/artwork-card";
import { EmptyState } from "@/components/site/page-elements";
export function FavoritesView() { const { favorites } = useExperience(); const saved = artworks.filter((artwork) => favorites.includes(artwork.id)); if (!saved.length) return <EmptyState title="No saved works yet" copy="Tap the heart on any artwork. Your private shortlist is kept locally in this demo." action="Discover art" href="/art"/>; return <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{saved.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork}/>)}</div>; }
