"use client";

import { useState, useSyncExternalStore } from "react";
import { Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { Artwork } from "@/types";

export function LivingArtwork({ artwork, className = "min-h-[420px]", priority = false }: { artwork: Artwork; className?: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const reduced = useSyncExternalStore(
    (notify) => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); media.addEventListener("change", notify); return () => media.removeEventListener("change", notify); },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const visual = <div className={`group relative overflow-hidden bg-[#1a1815] ${className}`} style={{ backgroundImage: `linear-gradient(180deg,transparent 55%,rgba(5,4,3,.72)),url(${artwork.image})`, backgroundPosition: "center", backgroundSize: "cover" }} role="img" aria-label={artwork.title} data-priority={priority || undefined}>
    {playing && <div aria-hidden className={`absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,235,193,.24),transparent_28%)] mix-blend-screen ${reduced ? "" : "animate-pulse"}`}/>} 
    {playing && !reduced && <div aria-hidden className="absolute inset-[-5%] bg-inherit bg-cover bg-center opacity-20 blur-md motion-safe:animate-pulse"/>}
    {artwork.living && <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 p-1.5 pr-3 backdrop-blur-md">
      <button onClick={() => setPlaying((value) => !value)} className="grid size-9 place-items-center rounded-full bg-[#e7dbc1] text-black" aria-label={playing ? `Pause ${artwork.title}` : `Play ${artwork.title} for ${artwork.livingDuration} seconds`} title={playing ? "Pause living art" : `Play living art · ${artwork.livingDuration}s`}>
        {playing ? <Pause size={15} fill="currentColor"/> : <Play size={15} fill="currentColor"/>}
      </button><span className="text-[10px] tracking-wider text-white/75">{playing ? "Living" : `${artwork.livingDuration}s`} · no audio</span>
    </div>}
    {playing && <div className="absolute bottom-4 right-4 flex gap-1 rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-md">
      <button onClick={() => setMuted((value) => !value)} className="grid size-8 place-items-center rounded-full hover:bg-white/10" aria-label={muted ? "Unmute" : "Mute"} title="Demo artwork contains no audio">{muted ? <VolumeX size={14}/> : <Volume2 size={14}/>}</button>
      <button onClick={() => setPlaying(false)} className="grid size-8 place-items-center rounded-full hover:bg-white/10" aria-label="Return to still" title="Return to still"><RotateCcw size={14}/></button>
      <button onClick={() => setExpanded(true)} className="grid size-8 place-items-center rounded-full hover:bg-white/10" aria-label="View full screen"><Maximize2 size={14}/></button>
    </div>}
    {playing && <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[9px] uppercase tracking-[.2em] text-white/75 backdrop-blur">Simulated motion study</div>}
  </div>;
  return <>{visual}{expanded && <div className="fixed inset-0 z-[90] grid place-items-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label={`Full screen view of ${artwork.title}`}><button onClick={() => setExpanded(false)} className="absolute right-6 top-6 border border-white/25 px-4 py-2 text-xs uppercase tracking-wider">Close</button><div className="h-[78vh] w-full max-w-6xl bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${artwork.image})` }}/></div>}</>;
}
