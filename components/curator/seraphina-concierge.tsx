"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Headphones, MessageCircle, Mic, Send, Sparkles, Volume2, X } from "lucide-react";

type Message = { role: "seraphina" | "visitor"; text: string };
const suggestions = ["Find calm blue works", "Show me living art", "I have a $5,000 budget", "Plan a private tour"];

function replyFor(input: string) {
  const text = input.toLowerCase();
  if (text.includes("blue") || text.includes("calm")) return "I would begin with Tidal Grammar, then move into the Glass & Light Pavilion. Both are restrained, contemplative, and especially effective in quiet rooms.";
  if (text.includes("living") || text.includes("motion")) return "The Living Art Salon is the right first stop. Every compatible work has a discreet play control; motion remains muted until you choose otherwise.";
  if (text.includes("budget") || text.includes("$")) return "Within that range, I can assemble a considered shortlist across archival paper, canvas, and living digital editions. The catalog can be sorted by price, and I can help evaluate scale for your room.";
  if (text.includes("tour") || text.includes("visit")) return "I recommend a 20-minute path: Grand Atrium, Living Art Salon, then the Glass & Light Pavilion. You can begin now or request a private human consultation.";
  if (text.includes("member")) return "Circle is ideal for early access and digital salons. Collector adds private previews and an annual advisory session. Patron is designed for active collection building.";
  return "I can help with the artist, provenance, scale, edition, placement, or acquisition of any work. Tell me what moved you, or describe the space you are considering.";
}

export function SeraphinaConcierge({ defaultOpen = false, embedded = false }: { defaultOpen?: boolean; embedded?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || embedded);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "seraphina", text: "Welcome. I’m Seraphina Vale, Chief Curator of AURELIS. Shall we begin with art, atmosphere, or the room you are creating?" }]);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);
  const send = (value = input) => {
    const cleaned = value.trim(); if (!cleaned) return;
    setMessages((items) => [...items, { role: "visitor", text: cleaned }]); setInput("");
    window.setTimeout(() => setMessages((items) => [...items, { role: "seraphina", text: replyFor(cleaned) }]), 350);
  };
  const speakLatest = () => {
    const latest = [...messages].reverse().find((message) => message.role === "seraphina");
    if (!("speechSynthesis" in window) || !latest) return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(latest.text); utterance.rate = .92; utterance.pitch = .95;
    utterance.onend = () => setSpeaking(false); setSpeaking(true); window.speechSynthesis.speak(utterance);
  };
  const startListening = () => { setListening(true); window.setTimeout(() => { setListening(false); setInput("Show me art for a quiet reading room"); }, 1100); };
  if (!open && !embedded) return <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-[#c8a968]/50 bg-[#15130f]/95 p-2 pr-5 shadow-2xl backdrop-blur-xl" aria-label="Meet Seraphina, AI chief curator"><span className="grid size-11 place-items-center rounded-full bg-[radial-gradient(circle_at_50%_30%,#ca7c58,#6d3128_55%,#24100e)] font-display text-xl">S</span><span className="text-left"><span className="block text-[10px] uppercase tracking-[.16em] text-[#d9bd7a]">Ask Seraphina</span><span className="block text-[10px] text-white/45">Curator online · demo</span></span></button>;
  return <section className={embedded ? "surface min-h-[620px]" : "fixed bottom-4 right-4 z-[70] flex h-[min(680px,calc(100vh-2rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden border border-[#c8a968]/30 bg-[#12100e] shadow-2xl"} aria-label="Seraphina curator conversation">
    <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_80%_10%,rgba(200,169,104,.2),transparent_40%),#181410] px-5 pb-5 pt-6">
      {!embedded && <button onClick={() => setOpen(false)} className="absolute right-4 top-4 grid size-8 place-items-center rounded-full hover:bg-white/10" aria-label="Close Seraphina"><X size={17}/></button>}
      <div className="flex items-center gap-4"><div className="grid size-16 shrink-0 place-items-center rounded-full border border-[#c8a968]/45 bg-[radial-gradient(circle_at_50%_25%,#d38e66,#73372c_50%,#1d0d0b)] font-display text-3xl shadow-xl">S</div><div><p className="font-display text-2xl">Seraphina Vale</p><p className="mt-1 text-[9px] uppercase tracking-[.17em] text-[#c8a968]">Chief Curator · AI Wisdom Guide</p><p className="mt-2 flex items-center gap-1.5 text-[10px] text-white/45"><span className="size-1.5 rounded-full bg-emerald-400"/>Simulated concierge online</p></div></div>
    </div>
    <div ref={listRef} className="scrollbar-none flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] px-4 py-3 text-sm leading-6 ${message.role === "visitor" ? "ml-auto bg-[#c8a968] text-black" : "border border-white/10 bg-white/5 text-white/75"}`}>{message.text}</div>)}
      <div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)} className="rounded-full border border-white/12 px-3 py-2 text-[10px] text-white/55 hover:border-[#c8a968]/60 hover:text-white">{suggestion}</button>)}</div>
    </div>
    <div className="border-t border-white/10 p-4"><div className="mb-3 flex items-center justify-between"><button onClick={speakLatest} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/45 hover:text-[#d9bd7a]" title="Uses your browser’s text-to-speech when available"><Volume2 size={14}/>{speaking ? "Stop voice" : "Read response"}</button><Link href="/concierge" className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#d9bd7a]">Full concierge<ChevronRight size={13}/></Link></div><form onSubmit={(event) => { event.preventDefault(); send(); }} className="flex items-center gap-2"><button type="button" onClick={startListening} className={`grid size-11 shrink-0 place-items-center rounded-full border ${listening ? "border-red-400 text-red-300" : "border-white/15 text-white/50"}`} aria-label="Try simulated voice input" title="Speech recognition provider is simulated"><Mic size={16}/></button><label className="sr-only" htmlFor={embedded ? "seraphina-embedded" : "seraphina-floating"}>Message Seraphina</label><input id={embedded ? "seraphina-embedded" : "seraphina-floating"} value={input} onChange={(event) => setInput(event.target.value)} placeholder={listening ? "Listening…" : "Ask about art, rooms, or membership"} className="min-w-0 flex-1 border border-white/15 bg-white/5 px-3 py-3 text-xs placeholder:text-white/30"/><button className="grid size-11 shrink-0 place-items-center bg-[#c8a968] text-black" aria-label="Send message"><Send size={16}/></button></form><p className="mt-3 flex items-center gap-1.5 text-[9px] leading-4 text-white/30"><Sparkles size={11}/>Demo guidance; acquisition decisions can be escalated to a human advisor.</p></div>
  </section>;
}

export function SeraphinaModes() {
  const [mode, setMode] = useState<"floating" | "embodied" | "voice">("floating");
  return <div className="surface p-5"><p className="eyebrow text-[#c8a968]">Presentation mode</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{([ ["floating", MessageCircle, "Floating concierge"], ["embodied", Sparkles, "Embodied guide"], ["voice", Headphones, "Voice accessible"] ] as const).map(([id, Icon, label]) => <button key={id} onClick={() => setMode(id)} className={`flex items-center gap-3 border p-4 text-left text-xs ${mode === id ? "border-[#c8a968] bg-[#c8a968]/10" : "border-white/10"}`}><Icon size={17}/>{label}</button>)}</div><p className="mt-4 text-xs leading-6 text-white/45">{mode === "floating" ? "A discreet guide that travels with you through the gallery." : mode === "embodied" ? "A full-height simulated presence for guided tours and private viewings." : "A reduced-visual interface centered on browser text-to-speech and keyboard navigation."}</p></div>;
}
