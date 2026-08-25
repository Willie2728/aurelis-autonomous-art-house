import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArtistIdentity } from "@/types";
import { artworks } from "@/components/site/catalog";

export function ArtistCard({ artist, index }: { artist: ArtistIdentity; index: number }) {
  const art = artworks.find((item) => item.artistId === artist.id);
  return <Link href={`/artists/${artist.slug}`} className="group block border-t border-white/12 py-8 md:grid md:grid-cols-[1fr_1.1fr_auto] md:items-center md:gap-9"><div className="flex items-center gap-5"><span className="font-display text-2xl text-white/25">{String(index + 1).padStart(2,"0")}</span><div className="size-20 shrink-0 rounded-full bg-cover bg-center saturate-50 transition duration-700 group-hover:saturate-100" style={{ backgroundImage: `url(${art?.image})` }}/><div><h2 className="font-display text-3xl group-hover:text-[#d9bd7a]">{artist.name}</h2><p className="mt-2 text-[10px] uppercase tracking-wider text-[#c8a968]">{artist.region}</p></div></div><p className="mt-5 text-sm leading-7 text-white/48 md:mt-0">{artist.philosophy}</p><ArrowUpRight className="mt-5 text-white/35 group-hover:text-[#d9bd7a] md:mt-0"/></Link>;
}
