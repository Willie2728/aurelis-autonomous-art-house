"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { ExperienceProvider, useExperience } from "./experience-provider";
import { SeraphinaConcierge } from "@/components/curator/seraphina-concierge";
import { CompareTray } from "@/components/artwork/compare-tray";

const nav = [
  ["Gallery", "/gallery"], ["Art", "/art"], ["Exhibitions", "/exhibitions"],
  ["Artists", "/artists"], ["Living Art", "/living-art"], ["Membership", "/membership"],
] as const;

function Header() {
  const pathname = usePathname();
  const { cart, favorites } = useExperience();
  const [open, setOpen] = useState(false);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0a09]/88 backdrop-blur-xl">
      <a href="#main-content" className="fixed -top-20 left-4 z-[100] bg-[#e9e3d7] px-4 py-2 text-[#0b0a09] focus:top-4">Skip to content</a>
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="AURELIS home">
          <span className="grid size-9 place-items-center rounded-full border border-[#c8a968]/70 font-display text-lg text-[#c8a968] transition group-hover:bg-[#c8a968] group-hover:text-[#0b0a09]">A</span>
          <span><span className="block font-display text-xl tracking-[.22em]">AURELIS</span><span className="hidden text-[8px] uppercase tracking-[.28em] text-white/45 sm:block">Autonomous Art House</span></span>
        </Link>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} className={`text-[11px] uppercase tracking-[.15em] transition hover:text-[#d9bd7a] ${pathname.startsWith(href) ? "text-[#d9bd7a]" : "text-white/68"}`}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/art" aria-label="Search art" title="Search art" className="grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/8 hover:text-white"><Search size={18}/></Link>
          <Link href="/account/favorites" aria-label={`${favorites.length} saved works`} title="Saved works" className="relative grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/8 hover:text-white"><Heart size={18}/>{favorites.length > 0 && <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[#c8a968] text-[9px] text-black">{favorites.length}</span>}</Link>
          <Link href="/account" aria-label="Account" title="Account" className="hidden size-10 place-items-center rounded-full text-white/65 hover:bg-white/8 hover:text-white sm:grid"><UserRound size={18}/></Link>
          <Link href="/cart" aria-label={`${cartCount} items in cart`} title="Cart" className="relative grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/8 hover:text-white"><ShoppingBag size={18}/>{cartCount > 0 && <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[#c8a968] text-[9px] text-black">{cartCount}</span>}</Link>
          <button onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-full xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#11100e] px-5 py-5 xl:hidden" aria-label="Mobile navigation">{nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b border-white/8 py-3 font-display text-2xl text-white/85">{label}</Link>)}<Link onClick={() => setOpen(false)} href="/concierge" className="mt-5 inline-flex bg-[#c8a968] px-5 py-3 text-xs font-bold uppercase tracking-widest text-black">Private concierge</Link></nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080706] px-5 pb-8 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-[1450px] gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div><p className="font-display text-3xl tracking-[.18em]">AURELIS</p><p className="mt-4 max-w-sm text-sm leading-7 text-white/50">Autonomous art research, living-edition prototypes, and private digital gallery experiences, curated continuously with human oversight.</p></div>
        <div><p className="eyebrow text-[#c8a968]">Discover</p><div className="mt-5 grid gap-3 text-sm text-white/55"><Link href="/gallery">The gallery</Link><Link href="/collections">Collections</Link><Link href="/studio">The studio</Link><Link href="/preview">Room preview</Link></div></div>
        <div><p className="eyebrow text-[#c8a968]">Visit</p><div className="mt-5 grid gap-3 text-sm text-white/55"><Link href="/about">About AURELIS</Link><Link href="/concierge">Concierge</Link><Link href="/contact">Contact</Link><Link href="/membership">Membership</Link></div></div>
        <div><p className="eyebrow text-[#c8a968]">Collector care</p><div className="mt-5 grid gap-3 text-sm text-white/55"><Link href="/account/orders">Orders</Link><Link href="/account/favorites">Saved works</Link><Link href="/contact">Shipping & care</Link><Link href="/contact">Accessibility</Link></div></div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1450px] flex-col gap-3 border-t border-white/8 pt-6 text-[10px] uppercase tracking-[.13em] text-white/35 sm:flex-row sm:justify-between"><span>© 2026 AURELIS. Demo experience.</span><span>Licensed demo media · Not production inventory</span></div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <ExperienceProvider><Header/><main id="main-content" className="min-h-[70vh]">{children}</main><Footer/><CompareTray/><SeraphinaConcierge/></ExperienceProvider>;
}
