"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export function EnterExperience() {
  const [voice, setVoice] = useState(false);
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  function welcome() {
    setVoice((value) => {
      const next = !value;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        if (next) {
          const utterance = new SpeechSynthesisUtterance("Good evening. I am Seraphina Vale, chief curator of AURELIS. Would you prefer a guided visit, or time to explore on your own?");
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      }
      return next;
    });
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#12100e] text-[#f5f1e9]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#5d4932_0%,#211c16_28%,#0c0b0a_70%)]" />
      <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }} className="absolute left-0 top-0 z-30 h-full w-1/2 origin-left bg-[#171819] shadow-2xl" />
      <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }} className="absolute right-0 top-0 z-30 h-full w-1/2 origin-right bg-[#171819] shadow-2xl" />
      <div className="relative z-10 grid min-h-screen place-items-center px-5 py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 1 }} className="max-w-3xl text-center">
          <p className="eyebrow text-[#d5bb82]">Grand Atrium · AURELIS</p>
          <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">Welcome. The gallery<br /><em className="font-light text-[#d4c6ad]">has been expecting you.</em></h1>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/58">Choose a guided arrival with Seraphina Vale, or move directly into the thirty-room collection in cinematic 2D mode. A lower-bandwidth experience is always available.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/concierge" className="flex items-center justify-center gap-3 bg-[#e9e3d7] px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-black">Begin guided visit <ArrowRight size={15} /></Link>
            <Link href="/gallery/rooms/grand-atrium" className="flex items-center justify-center gap-3 border border-white/22 px-6 py-4 text-xs uppercase tracking-[.14em]">Explore independently</Link>
          </div>
          <button onClick={welcome} className="mx-auto mt-7 flex items-center gap-2 text-[11px] uppercase tracking-[.14em] text-white/45 hover:text-white" aria-pressed={voice}>{voice ? <Volume2 size={14} /> : <VolumeX size={14} />} {voice ? "Spoken welcome active" : "Hear spoken welcome"}</button>
          <Link href="/gallery" className="mt-10 inline-block text-xs text-white/35 underline underline-offset-4">Skip arrival</Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-1/2 h-[42vh] w-[140vw] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-[#c8a968]/20 bg-[radial-gradient(ellipse_at_top,#57452f_0%,#211a13_28%,#080808_68%)] opacity-80" />
    </main>
  );
}
