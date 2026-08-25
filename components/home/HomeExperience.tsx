"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock3, Menu, Moon, Sparkles, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";

const ArchitecturalScene = dynamic(() => import("./ArchitecturalScene").then((m) => m.ArchitecturalScene), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#171614]" aria-label="Loading the AURELIS exterior" />,
});

type Lighting = "day" | "dusk" | "evening";

const primaryLinks = [
  ["Current exhibition", "/exhibitions"],
  ["Living art", "/living-art"],
  ["Collections", "/collections"],
  ["Membership", "/membership"],
];

export function HomeExperience() {
  const [lighting, setLighting] = useState<Lighting>("dusk");
  const [ambient, setAmbient] = useState(false);
  const [menu, setMenu] = useState(false);
  const [entering, setEntering] = useState(false);
  const [clock, setClock] = useState("22:18");
  const router = useRouter();

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  function enterGallery() {
    if (entering) return;
    setEntering(true);
    if (ambient && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const line = new SpeechSynthesisUtterance("Welcome to AURELIS. The collection is awake.");
      line.rate = 0.88;
      line.pitch = 0.9;
      window.speechSynthesis.speak(line);
    }
    window.setTimeout(() => router.push("/enter"), 2200);
  }

  return (
    <main className="bg-[#0b0a09] text-[#f5f1e9]">
      <section className="noise relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <ArchitecturalScene lighting={lighting} entering={entering} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08)_0%,rgba(5,5,5,.08)_45%,rgba(5,5,5,.83)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/65 to-transparent" />
          <div className="cloud cloud-one absolute -top-8 left-[8%] h-32 w-80 rounded-full bg-white/[.05] blur-3xl" />
          <div className="cloud cloud-two absolute top-16 right-[5%] h-24 w-96 rounded-full bg-white/[.045] blur-3xl" />
        </div>

        <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10 lg:px-14">
          <Link href="/" className="group flex items-center gap-3" aria-label="AURELIS home">
            <span className="grid size-9 place-items-center border border-[#c8a968]/60 font-display text-xl text-[#d6bd84] transition group-hover:bg-[#c8a968] group-hover:text-black">A</span>
            <span><strong className="block font-display text-lg tracking-[.18em]">AURELIS</strong><small className="hidden text-[9px] uppercase tracking-[.22em] text-white/55 sm:block">Autonomous Art House</small></span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {primaryLinks.map(([label, href]) => <Link key={href} href={href} className="text-[11px] uppercase tracking-[.16em] text-white/72 transition hover:text-[#dbc28e]">{label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/admin/command" className="hidden border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[.14em] text-white/75 transition hover:border-[#c8a968] hover:text-[#e2ca97] md:block">Founder access</Link>
            <button onClick={() => setMenu(true)} className="grid size-10 place-items-center border border-white/20 bg-black/20" aria-label="Open menu"><Menu size={17} /></button>
          </div>
        </header>

        <div className="pointer-events-none absolute inset-x-0 top-[16%] z-10 text-center sm:top-[18%]">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="eyebrow text-[#dfc791]">New York · Paris · The digital frontier</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .9 }} className="mt-3 font-display text-5xl tracking-[.22em] text-white drop-shadow-2xl sm:text-7xl lg:text-[6.5rem]">AURELIS</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .75, duration: 1 }} className="mx-auto mt-4 h-px w-36 bg-[#d2b572]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 md:px-10 md:pb-9 lg:px-14">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-3 text-white/55">The collection is awake</p>
              <h2 className="max-w-2xl font-display text-4xl leading-[.95] sm:text-5xl lg:text-7xl">Art that lives.<br /><em className="font-light text-[#d8c49a]">A gallery that never sleeps.</em></h2>
            </div>
            <div className="hidden text-right md:block"><p className="font-display text-2xl">{clock}</p><p className="text-[10px] uppercase tracking-[.18em] text-white/45">Gallery local time</p></div>
          </div>
          <div className="flex flex-col gap-3 border-t border-white/16 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={enterGallery} className="group flex items-center gap-4 bg-[#f0eadf] px-6 py-3.5 text-xs font-bold uppercase tracking-[.15em] text-[#11100e] transition hover:bg-[#d9bd7e]">
                {entering ? "Opening the doors" : "Enter AURELIS"}<ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>
              <Link href="/exhibitions" className="flex items-center gap-3 border border-white/26 bg-black/20 px-5 py-3.5 text-[11px] uppercase tracking-[.14em] backdrop-blur-sm transition hover:border-[#c8a968]">Explore the exhibition</Link>
              <Link href="/concierge" className="flex items-center gap-3 border border-white/26 bg-black/20 px-5 py-3.5 text-[11px] uppercase tracking-[.14em] backdrop-blur-sm transition hover:border-[#c8a968]"><Sparkles size={14} /> Meet Seraphina</Link>
            </div>
            <div className="flex items-center gap-2">
              {(["day", "dusk", "evening"] as Lighting[]).map((mode) => <button key={mode} onClick={() => setLighting(mode)} aria-pressed={lighting === mode} className={`grid size-10 place-items-center border transition ${lighting === mode ? "border-[#c8a968] bg-[#c8a968] text-black" : "border-white/20 bg-black/20 text-white/70"}`} aria-label={`${mode} lighting`}>{mode === "day" ? <Sun size={15} /> : mode === "dusk" ? <Clock3 size={15} /> : <Moon size={15} />}</button>)}
              <button onClick={() => setAmbient((x) => !x)} aria-pressed={ambient} className={`grid size-10 place-items-center border transition ${ambient ? "border-[#c8a968] bg-[#c8a968] text-black" : "border-white/20 bg-black/20 text-white/70"}`} aria-label={`${ambient ? "Disable" : "Enable"} spoken welcome`}>{ambient ? <Volume2 size={15} /> : <VolumeX size={15} />}</button>
            </div>
          </div>
        </div>

        <AnimatePresence>{entering && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1, duration: 1.2 }} className="absolute inset-0 z-30 grid place-items-center bg-[#0b0a09]"><div className="text-center"><span className="mx-auto mb-5 block size-12 animate-spin rounded-full border border-[#c8a968]/20 border-t-[#c8a968]" /><p className="eyebrow text-[#d4bc88]">Entering the Grand Atrium</p><button onClick={() => router.push("/gallery/rooms/grand-atrium")} className="mt-5 text-xs text-white/50 underline underline-offset-4">Skip introduction</button></div></motion.div>}</AnimatePresence>
      </section>

      <section className="relative overflow-hidden bg-[#e9e3d7] px-5 py-24 text-[#171511] md:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1450px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div><p className="eyebrow text-[#7b5b35]">Now showing · Exhibition 01</p><h2 className="mt-5 font-display text-5xl leading-[.94] md:text-7xl">The architecture<br />of <em>memory</em></h2><p className="mt-7 max-w-md text-sm leading-7 text-black/60">One hundred curated demo studies. Thirty rooms. An exhibition that subtly changes as its audience discovers it.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Living Art Salon", "Motion, atmosphere, breath"],
              ["02", "New Masters Wing", "New voices, enduring forms"],
              ["03", "Glass & Light", "Refraction as material"],
            ].map(([n, title, desc], i) => <Link href={i === 0 ? "/living-art" : "/gallery"} key={n} className="group border-t border-black/25 py-5 transition hover:border-[#8b683d]"><span className="font-display text-4xl text-black/16">{n}</span><h3 className="mt-10 font-display text-2xl">{title}</h3><p className="mt-2 text-xs text-black/50">{desc}</p><ArrowRight className="mt-6 transition group-hover:translate-x-2" size={18} /></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-5 py-24 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-10 border-y border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="eyebrow text-[#c8a968]">A private cultural institution, always open</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Collect the still. Experience the living edition.</h2></div>
          <div className="flex flex-wrap gap-3"><Link href="/art" className="bg-[#c8a968] px-6 py-3 text-xs font-bold uppercase tracking-[.15em] text-black">Browse the collection</Link><Link href="/membership" className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[.15em]">Become a member</Link></div>
        </div>
      </section>

      <AnimatePresence>{menu && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#0b0a09]/98 px-6 py-6"><div className="mx-auto flex h-full max-w-5xl flex-col"><div className="flex items-center justify-between"><span className="font-display text-xl tracking-[.2em]">AURELIS</span><button onClick={() => setMenu(false)} className="grid size-11 place-items-center border border-white/20" aria-label="Close menu"><X /></button></div><nav className="my-auto grid gap-4">{[["Enter", "/enter"], ...primaryLinks, ["Art studio", "/studio"], ["Seraphina", "/concierge"], ["Founder control", "/admin/command"]].map(([label, href], i) => <motion.div key={href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .05 }}><Link href={href} onClick={() => setMenu(false)} className="font-display text-4xl text-white/80 transition hover:text-[#d5bb81] sm:text-6xl">{label}</Link></motion.div>)}</nav><p className="eyebrow text-white/35">Art That Lives · A Gallery That Never Sleeps</p></div></motion.div>}</AnimatePresence>
      <style jsx>{`
        .cloud-one { animation: drift-one 28s ease-in-out infinite alternate; }
        .cloud-two { animation: drift-two 34s ease-in-out infinite alternate; }
        @keyframes drift-one { to { transform: translateX(32vw) scale(1.2); } }
        @keyframes drift-two { to { transform: translateX(-28vw) scale(.85); } }
      `}</style>
    </main>
  );
}
