import { PageHero } from "@/components/site/page-elements";
import { ArtCatalog } from "@/components/gallery/art-catalog";
import { ComparisonView } from "@/components/artwork/comparison-view";
import { artworks } from "@/components/site/catalog";
export const metadata = { title: "Art" };
export default async function ArtPage({ searchParams }: { searchParams: Promise<{ compare?: string }> }) { const query = await searchParams; if (query.compare === "true") return <ComparisonView/>; return <><PageHero compact eyebrow="The collection" title="Find the work that changes the room." description="Explore one hundred simulated catalog studies across medium, mood, region, color, scale, and motion. Every record clearly identifies its licensed demo media and pre-sale provenance status."/><ArtCatalog initialArtworks={artworks}/></>; }
