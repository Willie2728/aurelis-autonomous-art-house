"use client";

import Link from "next/link";
import { useState } from "react";
import { Accessibility, Info, MapPin } from "lucide-react";
import { rooms } from "@/components/site/catalog";

export function GalleryMap() {
  const [floor, setFloor] = useState(1);
  const floorRooms = rooms.filter((_, index) => index % 3 === floor - 1);
  return <section className="px-5 py-12 lg:px-10"><div className="mx-auto max-w-[1450px]"><div className="surface overflow-hidden"><div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow text-[#c8a968]">Estate map</p><p className="mt-2 text-xs text-white/45">Select a room to begin self-guided navigation.</p></div><div className="flex gap-2" role="group" aria-label="Select gallery floor">{[1,2,3].map((value) => <button key={value} onClick={() => setFloor(value)} className={`px-5 py-2 text-[10px] uppercase tracking-widest ${floor === value ? "bg-[#c8a968] text-black" : "border border-white/15"}`}>Floor {value}</button>)}</div></div>
      <div className="relative min-h-[650px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(200,169,104,.1),transparent_35%),#0e0d0b] p-5 md:p-12"><div aria-hidden className="absolute inset-[8%] border border-white/8"/><div className="relative z-10 grid min-h-[550px] gap-3 md:grid-cols-3">{floorRooms.map((room, index) => <Link key={room.id} href={`/gallery/rooms/${room.slug}`} className={`group relative flex min-h-40 flex-col justify-between border border-white/15 bg-white/[.025] p-5 hover:border-[#c8a968]/70 ${index % 4 === 0 ? "md:col-span-2" : ""}`}><div className="flex items-start justify-between"><MapPin size={16} style={{ color: room.accent }}/><span className="text-[9px] uppercase tracking-wider text-white/30">{room.artworkIds.length} works</span></div><div><h3 className="font-display text-2xl group-hover:text-[#d9bd7a]">{room.name}</h3><p className="mt-2 text-[10px] text-white/40">{room.atmosphere}</p></div></Link>)}</div></div>
      <div className="grid gap-3 border-t border-white/10 p-5 text-xs text-white/45 sm:grid-cols-3"><p className="flex items-center gap-2"><Accessibility size={15}/>All mapped routes are step-free</p><p className="flex items-center gap-2"><Info size={15}/>2D mode works on low-power devices</p><p className="flex items-center gap-2"><MapPin size={15}/>You are at the Grand Atrium</p></div></div></div></section>;
}
