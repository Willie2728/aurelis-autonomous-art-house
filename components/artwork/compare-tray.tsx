"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";
import { artworks, money } from "@/components/site/catalog";
import { useExperience } from "@/components/site/experience-provider";

export function CompareTray() {
  const { compare, toggleCompare } = useExperience();
  const selected = artworks.filter((artwork) => compare.includes(artwork.id));
  if (!selected.length) return null;
  return <aside className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 border border-[#c8a968]/40 bg-[#15130f]/95 p-3 shadow-2xl backdrop-blur-xl" aria-label="Artwork comparison tray">
    <div className="flex items-center gap-3"><Scale size={17} className="ml-2 shrink-0 text-[#c8a968]"/><div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">{selected.map((artwork) => <div key={artwork.id} className="flex shrink-0 items-center gap-2 bg-white/5 px-3 py-2"><span className="max-w-32 truncate text-[11px]">{artwork.title}</span><span className="hidden text-[10px] text-white/45 sm:inline">{money(artwork.priceCents)}</span><button onClick={() => toggleCompare(artwork.id)} aria-label={`Remove ${artwork.title}`}><X size={13}/></button></div>)}</div><Link href="/art?compare=true" className="shrink-0 bg-[#c8a968] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black">Compare {selected.length}</Link></div>
  </aside>;
}
