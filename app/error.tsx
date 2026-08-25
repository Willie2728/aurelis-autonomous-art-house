"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0a09] px-6 text-[#f5f1e9]">
      <div className="max-w-lg text-center">
        <AlertTriangle className="mx-auto text-[#c8a968]" size={36} />
        <p className="eyebrow mt-6 text-[#c8a968]">A gallery system paused</p>
        <h1 className="mt-4 font-display text-5xl">This room needs a moment.</h1>
        <p className="mt-5 text-sm leading-7 text-white/55">No order or approval was submitted. You can safely retry the experience.</p>
        <button onClick={reset} className="mx-auto mt-8 flex items-center gap-2 bg-[#e9e3d7] px-6 py-3 text-xs font-bold uppercase tracking-[.14em] text-black"><RotateCcw size={14} /> Retry</button>
      </div>
    </main>
  );
}
