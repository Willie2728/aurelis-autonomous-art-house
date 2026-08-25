import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GalleryRoom } from "@/types";

export function RoomCard({ room, index = 0 }: { room: GalleryRoom; index?: number }) {
  return <Link href={`/gallery/rooms/${room.slug}`} className="group relative block min-h-[360px] overflow-hidden border border-white/10 p-7" style={{ background: `radial-gradient(circle at ${index % 2 ? "75% 25%" : "25% 20%"},${room.accent}42,transparent 35%),linear-gradient(${120 + index * 7}deg,#211e19,#0c0b0a 68%)` }}>
    <div aria-hidden className="absolute inset-x-[10%] bottom-0 top-[28%] border-x border-t border-white/10 transition duration-700 group-hover:inset-x-[7%] group-hover:top-[24%]"/><div aria-hidden className="absolute bottom-0 left-[22%] right-[22%] h-[45%] [clip-path:polygon(28%_0,72%_0,100%_100%,0_100%)]" style={{ background: `linear-gradient(180deg,${room.accent}12,${room.accent}35)` }}/>
    <div className="relative z-10 flex h-full min-h-[306px] flex-col justify-between"><div className="flex justify-between"><span className="eyebrow text-white/38">Room {String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={18} className="text-white/45 transition group-hover:text-[#d9bd7a]"/></div><div><p className="mb-4 text-[10px] uppercase tracking-[.16em]" style={{ color: room.accent }}>{room.atmosphere}</p><h3 className="max-w-sm font-display text-4xl font-light leading-none">{room.name}</h3><p className="mt-4 max-w-md text-xs leading-6 text-white/45">{room.architecture}</p><div className="mt-5 flex gap-4 text-[9px] uppercase tracking-wider text-white/35"><span>{room.material}</span><span>{room.lighting}</span></div></div></div>
  </Link>;
}
