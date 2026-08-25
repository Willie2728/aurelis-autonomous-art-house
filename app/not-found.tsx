import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0a09] px-6 text-[#f5f1e9]">
      <div className="max-w-xl text-center">
        <p className="font-display text-8xl text-[#c8a968]/25">404</p>
        <h1 className="font-display text-5xl">This room is between exhibitions.</h1>
        <p className="mt-5 text-sm text-white/55">The work may have moved, or the address is no longer part of the current hanging.</p>
        <Link href="/gallery" className="mx-auto mt-8 flex w-fit items-center gap-2 border border-white/20 px-5 py-3 text-xs uppercase tracking-[.14em]"><ArrowLeft size={14} /> Return to the gallery</Link>
      </div>
    </main>
  );
}
