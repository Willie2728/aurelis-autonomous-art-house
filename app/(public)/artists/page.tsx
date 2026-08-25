import { PageHero } from "@/components/site/page-elements";
import { ArtistCard } from "@/components/gallery/artist-card";
import { artists } from "@/components/site/catalog";
export const metadata = { title: "Artists" };
export default function ArtistsPage() { return <><PageHero compact eyebrow="Fictional studio identities" title="Many voices. One transparent atelier." description="Meet the fictional artist identities that give AURELIS its breadth. Each has a distinct biography, material language, point of view, and clearly labeled AI-assisted provenance."/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-6xl">{artists.map((artist,index) => <ArtistCard key={artist.id} artist={artist} index={index}/>)}</div></section></>; }
