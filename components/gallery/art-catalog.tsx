"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Artwork } from "@/types";
import { ArtworkCard } from "@/components/artwork/artwork-card";

export function ArtCatalog({ initialArtworks, title = "The complete catalog" }: { initialArtworks: Artwork[]; title?: string }) {
  const [query, setQuery] = useState("");
  const [medium, setMedium] = useState("All media");
  const [mood, setMood] = useState("All moods");
  const [livingOnly, setLivingOnly] = useState(false);
  const [sort, setSort] = useState("curated");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const media = ["All media", ...new Set(initialArtworks.map((artwork) => artwork.medium.split(" & ")[0]))];
  const moods = ["All moods", ...new Set(initialArtworks.map((artwork) => artwork.mood))];
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = initialArtworks.filter((artwork) => (!normalized || [artwork.title, artwork.artist, artwork.category, artwork.medium, artwork.region, ...artwork.tags].join(" ").toLowerCase().includes(normalized)) && (medium === "All media" || artwork.medium.startsWith(medium)) && (mood === "All moods" || artwork.mood === mood) && (!livingOnly || artwork.living));
    return [...list].sort((a, b) => sort === "price-low" ? a.priceCents - b.priceCents : sort === "price-high" ? b.priceCents - a.priceCents : sort === "new" ? Number(b.tags.includes("new")) - Number(a.tags.includes("new")) : Number(b.featured) - Number(a.featured));
  }, [initialArtworks, livingOnly, medium, mood, query, sort]);
  const reset = () => { setQuery(""); setMedium("All media"); setMood("All moods"); setLivingOnly(false); };
  return <section className="px-5 py-16 lg:px-10 lg:py-24">
    <div className="mx-auto max-w-[1450px]">
      <div className="flex flex-col gap-6 border-b border-white/12 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-[#c8a968]">Curated discovery</p><h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2><p className="mt-3 text-xs text-white/45" aria-live="polite">{results.length} simulated catalog studies</p></div><div className="flex flex-wrap gap-3"><label className="relative min-w-64 flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={17}/><span className="sr-only">Search artwork</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artist, color, place…" className="w-full border border-white/15 bg-white/5 py-3 pl-11 pr-10 text-sm placeholder:text-white/30"/>{query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Clear search"><X size={15}/></button>}</label><button onClick={() => setFiltersOpen((value) => !value)} className="flex items-center gap-2 border border-white/15 px-4 py-3 text-xs uppercase tracking-widest"><SlidersHorizontal size={15}/>Filters</button><select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-white/15 bg-[#15130f] px-4 py-3 text-xs" aria-label="Sort artworks"><option value="curated">Curator’s order</option><option value="new">Newest</option><option value="price-low">Price low to high</option><option value="price-high">Price high to low</option></select></div></div>
      {filtersOpen && <div className="grid gap-4 border-b border-white/10 bg-white/[.025] p-5 sm:grid-cols-3"><label className="text-[10px] uppercase tracking-widest text-white/45">Medium<select value={medium} onChange={(event) => setMedium(event.target.value)} className="mt-2 block w-full bg-[#15130f] p-3 text-xs normal-case text-white">{media.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-[10px] uppercase tracking-widest text-white/45">Mood<select value={mood} onChange={(event) => setMood(event.target.value)} className="mt-2 block w-full bg-[#15130f] p-3 text-xs normal-case text-white">{moods.map((item) => <option key={item}>{item}</option>)}</select></label><label className="flex items-center gap-3 self-end p-3 text-xs"><input type="checkbox" checked={livingOnly} onChange={(event) => setLivingOnly(event.target.checked)} className="accent-[#c8a968]"/>Living art only</label></div>}
      {results.length ? <div className="mt-12 grid items-start gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{results.map((artwork, index) => <div key={artwork.id} className={index % 5 === 1 ? "lg:mt-16" : index % 5 === 3 ? "lg:-mt-8" : ""}><ArtworkCard artwork={artwork}/></div>)}</div> : <div className="py-24 text-center"><p className="font-display text-4xl">No works answer that description yet.</p><p className="mt-4 text-sm text-white/45">Try a broader medium, mood, or phrase.</p><button onClick={reset} className="mt-6 border border-[#c8a968]/60 px-5 py-3 text-xs uppercase tracking-widest text-[#d9bd7a]">Clear filters</button></div>}
    </div>
  </section>;
}
