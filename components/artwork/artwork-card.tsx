"use client";

import Link from "next/link";
import { Check, Heart, Plus, Scale } from "lucide-react";
import type { Artwork } from "@/types";
import { useExperience } from "@/components/site/experience-provider";
import { money } from "@/components/site/catalog";
import { LivingArtwork } from "@/components/motion/living-artwork";

export function ArtworkCard({ artwork, cinematic = false }: { artwork: Artwork; cinematic?: boolean }) {
  const { favorites, compare, toggleFavorite, toggleCompare, addToCart } = useExperience();
  const favored = favorites.includes(artwork.id);
  const comparing = compare.includes(artwork.id);
  return <article className={`group ${cinematic ? "md:grid md:grid-cols-[1.45fr_1fr] md:items-center" : ""}`}>
    <div className="relative">
      <LivingArtwork artwork={artwork} className={`${cinematic ? "min-h-[510px]" : artwork.orientation === "portrait" ? "min-h-[480px]" : "min-h-[340px]"} transition duration-700 group-hover:brightness-110`}/>
      <div className="absolute right-3 top-3 flex gap-1 opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <button onClick={() => toggleFavorite(artwork.id)} className="grid size-10 place-items-center rounded-full bg-black/65 backdrop-blur" aria-label={favored ? "Remove from favorites" : "Save to favorites"} title={favored ? "Saved" : "Save artwork"}><Heart size={16} className={favored ? "fill-[#d9bd7a] text-[#d9bd7a]" : ""}/></button>
        <button onClick={() => toggleCompare(artwork.id)} className="grid size-10 place-items-center rounded-full bg-black/65 backdrop-blur" aria-label={comparing ? "Remove from comparison" : "Compare artwork"} title="Compare up to three works"><Scale size={16} className={comparing ? "text-[#d9bd7a]" : ""}/></button>
      </div>
    </div>
    <div className={cinematic ? "bg-[#15130f] p-8 md:-ml-8 md:relative md:z-10 md:p-12" : "pt-5"}>
      <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.17em] text-[#c8a968]">{artwork.artist}</p><h3 className="mt-2 font-display text-3xl font-light"><Link href={`/art/${artwork.slug}`} className="hover:text-[#d9bd7a]">{artwork.title}</Link></h3></div><span className="shrink-0 text-sm text-white/65">{money(artwork.priceCents)}</span></div>
      <p className="mt-3 text-xs leading-6 text-white/45">{artwork.medium} · {artwork.dimensions}</p>
      {cinematic && <><p className="mt-6 text-sm leading-7 text-white/55">{artwork.curatorialStatement}</p><div className="mt-7 flex flex-wrap gap-3"><Link href={`/art/${artwork.slug}`} className="border border-white/20 px-5 py-3 text-[10px] uppercase tracking-widest hover:border-[#c8a968]">View details</Link><button onClick={() => addToCart(artwork)} disabled={!artwork.available} className="flex items-center gap-2 bg-[#c8a968] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-black disabled:opacity-40">{artwork.available ? <><Plus size={14}/>Add to cart</> : <><Check size={14}/>Join waitlist</>}</button></div></>}
    </div>
  </article>;
}
