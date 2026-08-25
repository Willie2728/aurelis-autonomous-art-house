import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function PageHero({ eyebrow, title, description, children, compact = false }: { eyebrow: string; title: string; description: string; children?: ReactNode; compact?: boolean }) {
  return <section className={`relative isolate overflow-hidden border-b border-white/10 px-5 lg:px-10 ${compact ? "py-16 md:py-24" : "py-24 md:py-36"}`}><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(200,169,104,.13),transparent_34%),linear-gradient(135deg,#15130f,#0b0a09_55%)]"/><div className="mx-auto max-w-[1450px]"><p className="eyebrow text-[#c8a968]">{eyebrow}</p><h1 className="mt-5 max-w-5xl font-display text-5xl font-light leading-[.93] tracking-[-.03em] text-[#f5f1e9] sm:text-7xl lg:text-[7rem]">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/55 md:text-lg">{description}</p>{children && <div className="mt-8">{children}</div>}</div></section>;
}

export function SectionHeading({ eyebrow, title, copy, link, linkLabel = "View all" }: { eyebrow?: string; title: string; copy?: string; link?: string; linkLabel?: string }) {
  return <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"> <div>{eyebrow && <p className="eyebrow text-[#c8a968]">{eyebrow}</p>}<h2 className="mt-3 max-w-3xl font-display text-4xl font-light leading-none md:text-6xl">{title}</h2>{copy && <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">{copy}</p>}</div>{link && <Link href={link} className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-[.16em] text-[#d9bd7a]">{linkLabel}<ArrowRight size={15}/></Link>}</div>;
}

export function EmptyState({ title, copy, action, href }: { title: string; copy: string; action: string; href: string }) {
  return <div className="surface mx-auto max-w-2xl px-7 py-16 text-center"><div className="mx-auto mb-6 size-12 rounded-full border border-[#c8a968]/40 bg-[#c8a968]/8"/><h2 className="font-display text-4xl">{title}</h2><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">{copy}</p><Link href={href} className="mt-8 inline-flex bg-[#c8a968] px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-black">{action}</Link></div>;
}

export function DemoNotice({ children }: { children: ReactNode }) { return <div className="border-y border-[#c8a968]/25 bg-[#c8a968]/8 px-5 py-3 text-center text-[10px] uppercase tracking-[.13em] text-[#d9bd7a]">{children}</div>; }
