"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, BadgeDollarSign, BarChart3, CalendarRange, Check, ChevronRight,
  CircleDollarSign, Clock3, Download, ExternalLink, Eye, FileCheck2, Filter, Gauge,
  ImageIcon, Megaphone, Pause, Play, Plus, RefreshCw, Search,
  ShieldCheck, ShoppingBag, Sparkles, TrendingUp, UserRoundCheck, Users, Video,
} from "lucide-react";
import { GuideMiniList, GuideRegistry, ObserveLearnWorkflow } from "@/components/agents/guide-registry";
import { ApprovalQueue, BudgetControls, EmergencyControls, ProviderConnections, SafetyPolicySummary } from "@/components/admin/operational-controls";

const sectionCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  command: { eyebrow: "Morning brief · Cycle 084", title: "The gallery never sleeps.", description: "Observe the autonomous art house, resolve founder decisions, and keep every Guide operating inside policy." },
  guides: { eyebrow: "15-agent operating team", title: "Guide Activity", description: "Seraphina coordinates fourteen Knowledge Guides. Pause, retry, or escalate any task while preserving a complete audit trail." },
  artwork: { eyebrow: "Studio production", title: "Artwork Pipeline", description: "From original concept to approved print master, with diversity, similarity, rights, and commercial readiness checks." },
  motion: { eyebrow: "Living art atelier", title: "Motion Pipeline", description: "Cinematic motion studies preserve each original composition while safety, cost, and human approvals remain visible." },
  exhibitions: { eyebrow: "Curatorial workspace", title: "Exhibition Builder", description: "Compose rooms, narratives, and launch readiness for AURELIS exhibitions across cinematic 2D and full 3D modes." },
  catalog: { eyebrow: "Collection governance", title: "Catalog", description: "Review provenance, editions, price position, inventory readiness, and living-art eligibility across the house." },
  research: { eyebrow: "Permitted public intelligence", title: "Research", description: "Evidence-led research from approved sources. Popularity informs decisions but never substitutes for artistic judgment." },
  trends: { eyebrow: "Market signal desk", title: "Trend Intelligence", description: "Compare confidence, momentum, evidence, and cultural-risk notes before a signal enters the creative brief." },
  campaigns: { eyebrow: "Growth atelier", title: "Campaigns", description: "Draft, review, test, and measure premium storytelling. Publishing and budget changes always require configured approval." },
  customers: { eyebrow: "Collector relations", title: "Customers", description: "A consent-aware view of collector journeys, private viewing requests, preferences, and service needs." },
  memberships: { eyebrow: "AURELIS circle", title: "Memberships", description: "Monitor Visitor, Circle, Collector, Patron, and Institutional memberships without conditioning rewards on positive reviews." },
  orders: { eyebrow: "Commerce operations", title: "Orders", description: "Track demo orders from checkout through production, shipment, and delivery. No live charges are enabled." },
  fulfillment: { eyebrow: "Edition delivery", title: "Fulfillment", description: "Coordinate production partners, quality review, packaging, and delivery milestones." },
  refunds: { eyebrow: "Customer resolution", title: "Refunds", description: "Routine small refunds can follow policy; larger or unusual requests remain human decisions." },
  finance: { eyebrow: "Founder-governed capital", title: "Finance", description: "Review allocations, simulated spend, reserves, and approval exposure. No money movement occurs in demo mode." },
  approvals: { eyebrow: "Human oversight", title: "Approval Queue", description: "Sensitive actions stop here until an authorized human reviews the context, exposure, and policy rationale." },
  providers: { eyebrow: "Credential-safe adapters", title: "API Connections", description: "Test LLM, image, motion, payments, research, and delivery adapters without exposing raw secrets to the browser." },
  safety: { eyebrow: "Operational guardrails", title: "Safety & Controls", description: "Pause individual capabilities or all autonomous operations. Emergency actions are immediate and fully audited." },
  settings: { eyebrow: "Policy configuration", title: "Settings", description: "Tune hard spending limits, retries, similarity thresholds, escalation timing, and provider constraints." },
  logs: { eyebrow: "Immutable operating record", title: "Audit Logs", description: "Inspect every Guide action, human decision, provider test, policy evaluation, retry, and escalation." },
};

const panelClass = "rounded-2xl border border-white/8 bg-[#10100f]";

function Header({ section }: { section: string }) {
  const copy = sectionCopy[section] ?? sectionCopy.command;
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-3xl"><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#c8a968]/65">{copy.eyebrow}</p><h2 className="mt-2 font-display text-3xl leading-tight text-[#f0e9da] sm:text-4xl">{copy.title}</h2><p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-white/38">{copy.description}</p></div>
      <div className="flex items-center gap-2 rounded-full border border-sky-300/10 bg-sky-300/[0.035] px-3 py-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-200" /><span className="text-[8px] font-bold uppercase tracking-[0.17em] text-sky-100/55">Simulated operations</span></div>
    </div>
  );
}

function Panel({ title, kicker, action, children, className = "" }: { title: string; kicker?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`${panelClass} ${className}`}>
      <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/7 px-5 py-4"><div><h3 className="text-[12px] font-semibold text-white/80">{title}</h3>{kicker && <p className="mt-1 text-[9px] text-white/28">{kicker}</p>}</div>{action}</div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function TinyButton({ children, onClick, active = false }: { children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return <button type="button" onClick={onClick} className={`rounded-lg border px-3 py-2 text-[8px] font-bold uppercase tracking-[0.13em] transition ${active ? "border-[#c8a968]/30 bg-[#c8a968]/10 text-[#e8d097]" : "border-white/8 text-white/38 hover:border-white/15 hover:text-white/65"}`}>{children}</button>;
}

function Stat({ label, value, change, icon: Icon, tone = "gold" }: { label: string; value: string; change: string; icon: React.ComponentType<{ className?: string }>; tone?: "gold" | "green" | "blue" | "amber" }) {
  const colors = { gold: "text-[#d7ba78] bg-[#c8a968]/[0.08]", green: "text-emerald-200 bg-emerald-300/[0.06]", blue: "text-sky-200 bg-sky-300/[0.06]", amber: "text-amber-200 bg-amber-300/[0.06]" };
  return <div className={`${panelClass} p-4`}><div className="flex items-start justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/28">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight text-white/90">{value}</p></div><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors[tone]}`}><Icon className="h-4 w-4" /></span></div><p className="mt-3 text-[9px] text-white/30">{change}</p></div>;
}

function Notice({ message, onClose }: { message: string; onClose: () => void }) {
  return <div role="status" className="fixed bottom-5 right-5 z-[70] max-w-sm rounded-xl border border-[#c8a968]/25 bg-[#181611] p-4 shadow-2xl shadow-black/50"><div className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" /><div className="flex-1"><p className="text-[10px] font-semibold text-[#ead9ae]">Control updated</p><p className="mt-1 text-[9px] leading-relaxed text-white/50">{message}</p></div><button type="button" onClick={onClose} className="text-white/30 hover:text-white/60" aria-label="Dismiss notification">×</button></div></div>;
}

function SparkBars({ values, color = "bg-[#c8a968]/55" }: { values: number[]; color?: string }) {
  return <div className="flex h-20 items-end gap-1.5">{values.map((value, index) => <span key={index} className={`min-w-1 flex-1 rounded-t-sm ${color}`} style={{ height: `${value}%` }} />)}</div>;
}

function CommandView({ notice }: { notice: (message: string) => void }) {
  return <>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Stat label="Revenue MTD" value="$48,620" change="72% of $67,500 target · simulated" icon={CircleDollarSign} tone="green" />
      <Stat label="Active workflows" value="23" change="18 on track · 5 awaiting review" icon={Activity} tone="blue" />
      <Stat label="Artworks in studio" value="46" change="12 passed rights + similarity" icon={ImageIcon} />
      <Stat label="Founder decisions" value="4" change="Oldest waiting 4 hours" icon={FileCheck2} tone="amber" />
    </div>
    <Panel title="Observe → Learn operating loop" kicker="Live demo cycle · click any stage to inspect" className="mt-4"><ObserveLearnWorkflow /></Panel>
    <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
      <Panel title="Founder attention" kicker="Sensitive actions stay paused until reviewed" action={<Link href="/admin/approvals" className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7ba78] hover:text-[#f1dca7]">Open queue →</Link>}><ApprovalQueue onNotice={notice} /></Panel>
      <div className="space-y-4">
        <Panel title="Emergency controls" kicker="Immediate operational pause"><EmergencyControls onNotice={notice} /></Panel>
        <Panel title="Guide pulse" kicker="6 of 15 shown" action={<Link href="/admin/guides" className="text-[9px] text-[#d7ba78]">View all</Link>}><GuideMiniList /></Panel>
      </div>
    </div>
    <div className="mt-4 grid gap-4 lg:grid-cols-3">
      <Panel title="Revenue pace" kicker="30-day simulated gross sales"><SparkBars values={[35,42,33,58,47,62,69,55,74,66,78,88,72,90]} /><div className="mt-4 flex items-end justify-between"><div><p className="text-xl font-semibold">$67.5k</p><p className="text-[9px] text-white/30">Monthly operating target</p></div><span className="text-[9px] text-emerald-200/65">+18.4% pace</span></div></Panel>
      <Panel title="Pipeline quality" kicker="Catalog acceptance gates"><div className="space-y-4">{[["Originality",96],["Rights confidence",99],["Print readiness",91],["Motion suitability",78]].map(([label,value]) => <div key={String(label)}><div className="mb-1.5 flex justify-between text-[9px]"><span className="text-white/38">{label}</span><span className="text-white/62">{value}%</span></div><div className="h-1 rounded-full bg-white/5"><div className="h-full rounded-full bg-[#c8a968]/65" style={{width:`${value}%`}} /></div></div>)}</div></Panel>
      <Panel title="Next checkpoints" kicker="Seraphina’s coordinated schedule"><div className="space-y-3">{[["09:30","Rights debate · Edition 27"],["11:00","Seasonal Hall curation"],["13:30","Campaign budget review"],["16:00","Daily founder report"]].map(([time,event]) => <div key={time} className="flex items-center gap-3"><span className="w-10 text-[9px] font-bold text-[#c8a968]/65">{time}</span><span className="h-1 w-1 rounded-full bg-white/25" /><span className="text-[10px] text-white/46">{event}</span></div>)}</div></Panel>
    </div>
  </>;
}

const artworkRows = [
  ["AU-2741", "Nocturne Above the Salt Flats", "Inspect", "0.31", "$14.80", "Noor El-Amin"],
  ["AU-2739", "Crossroads in Cobalt", "Rights", "0.68", "$9.20", "Amara Okoye"],
  ["AU-2738", "Verdant Geometry", "Similarity hold", "0.84", "$11.60", "Avery Cole"],
  ["AU-2734", "A River Remembers Rain", "Curate", "0.42", "$16.20", "Celeste Moreau"],
  ["AU-2727", "Market Morning, Oaxaca", "Price", "0.29", "$8.40", "Priya Shah"],
];

function PipelineView({ type, notice }: { type: "artwork" | "motion"; notice: (message: string) => void }) {
  const isMotion = type === "motion";
  const [paused, setPaused] = useState(false);
  const rows = isMotion ? [
    ["MO-411", "Tidal Memory", "Safety review", "12 sec", "$1.84", "Keiko Tan"],
    ["MO-408", "Nocturne Above the Salt Flats", "Rendering", "8 sec", "$1.12", "Keiko Tan"],
    ["MO-405", "Goldleaf Weather", "Founder approval", "15 sec", "$2.04", "Seraphina Vale"],
    ["MO-401", "A River Remembers Rain", "Quality check", "10 sec", "$1.48", "Noor El-Amin"],
  ] : artworkRows;
  return <>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="In pipeline" value={isMotion ? "19" : "46"} change="Across all active stages" icon={isMotion ? Video : ImageIcon} /><Stat label="Ready today" value={isMotion ? "5" : "12"} change="Passed mandatory checks" icon={Check} tone="green" /><Stat label="On hold" value={isMotion ? "3" : "4"} change="Needs human or rights review" icon={Pause} tone="amber" /><Stat label="Simulated spend" value={isMotion ? "$38.22" : "$94.60"} change="Inside daily provider cap" icon={Gauge} tone="blue" /></div>
    <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_300px]">
      <Panel title={isMotion ? "Motion jobs" : "Artwork jobs"} kicker="All provider calls are simulated" action={<div className="flex gap-2"><TinyButton onClick={() => notice("A filtered CSV export was prepared in demo memory.")}><Download className="mr-1 inline h-3 w-3" /> Export</TinyButton><TinyButton active={paused} onClick={() => {setPaused(!paused); notice(`${isMotion ? "Motion" : "Artwork"} pipeline ${!paused ? "paused" : "resumed"}.`);}}>{paused ? <Play className="mr-1 inline h-3 w-3" /> : <Pause className="mr-1 inline h-3 w-3" />}{paused ? "Resume" : "Pause"}</TinyButton></div>}>
        <DataTable headers={isMotion ? ["Job", "Artwork", "Stage", "Duration", "Cost", "Guide"] : ["Job", "Artwork", "Stage", "Similarity", "Cost", "Guide"]} rows={rows} onAction={(row) => notice(`${row[0]} opened in the simulated inspector.`)} />
      </Panel>
      <Panel title="Stage distribution" kicker="Current active inventory"><div className="space-y-4">{(isMotion ? [["Prepare",4],["Animate",7],["Inspect",3],["Approve",3],["Publish",2]] : [["Generate",12],["Inspect",10],["Similarity",6],["Rights",5],["Curate",8],["Price",5]]).map(([label,value], index) => <div key={String(label)}><div className="mb-1.5 flex justify-between text-[9px]"><span className="text-white/38">{label}</span><span className="text-white/65">{value}</span></div><div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-[#c8a968]/55" style={{width:`${18 + Number(value) * 6}%`, opacity: 1 - index*.07}} /></div></div>)}</div><button type="button" onClick={() => notice("A new batch draft was created. It remains unsubmitted until its brief and cost are reviewed.")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#c8a968]/10 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#e7cf96]"><Plus className="h-3.5 w-3.5" /> New batch</button></Panel>
    </div>
  </>;
}

function DataTable({ headers, rows, onAction }: { headers: string[]; rows: (readonly string[])[]; onAction: (row: readonly string[]) => void }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left"><thead><tr>{headers.map((header) => <th key={header} className="border-b border-white/7 px-3 py-3 text-[8px] font-bold uppercase tracking-[0.14em] text-white/25 first:pl-0">{header}</th>)}<th className="border-b border-white/7 py-3" /></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="group border-b border-white/5 last:border-0">{row.map((cell,index) => <td key={index} className={`px-3 py-4 text-[9px] first:pl-0 ${index === 1 ? "font-semibold text-white/70" : index === 2 && (cell.toLowerCase().includes("hold") || cell.toLowerCase().includes("approval")) ? "text-amber-200/65" : "text-white/36"}`}>{cell}</td>)}<td className="py-4 text-right"><button type="button" onClick={() => onAction(row)} className="rounded-md p-1.5 text-white/25 hover:bg-white/5 hover:text-white/60" aria-label={`Open ${row[0]}`}><ChevronRight className="h-3.5 w-3.5" /></button></td></tr>)}</tbody></table></div>;
}

const exhibitions = [
  ["Light Has a Memory", "Seasonal Exhibition Hall", "14 / 18 works", "92%", "Sep 12"],
  ["The New Materialists", "New Masters Wing", "10 / 12 works", "78%", "Oct 03"],
  ["Water, Waiting", "Living Art Salon", "8 / 10 works", "64%", "Oct 18"],
  ["Cartographies of Home", "Grand Atrium", "6 / 16 works", "38%", "Nov 08"],
];

function ExhibitionsView({ notice }: { notice: (message: string) => void }) {
  const [selected, setSelected] = useState(0);
  return <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
    <Panel title="Exhibition program" kicker="4 active builds" action={<button type="button" onClick={() => notice("A blank exhibition draft was created in demo memory.")} className="rounded-lg p-2 text-[#d7ba78] hover:bg-white/5" aria-label="Create exhibition"><Plus className="h-4 w-4" /></button>}><div className="space-y-2">{exhibitions.map((item,index) => <button key={item[0]} type="button" onClick={() => setSelected(index)} className={`w-full rounded-xl border p-4 text-left transition ${selected === index ? "border-[#c8a968]/25 bg-[#c8a968]/[0.07]" : "border-white/6 hover:bg-white/[0.025]"}`}><p className="text-[11px] font-semibold text-white/75">{item[0]}</p><p className="mt-1 text-[9px] text-white/30">{item[1]}</p><div className="mt-3 flex items-center justify-between"><span className="text-[8px] text-white/25">{item[2]}</span><span className="text-[9px] font-bold text-[#d7ba78]/70">{item[3]}</span></div></button>)}</div></Panel>
    <Panel title={exhibitions[selected][0]} kicker={`${exhibitions[selected][1]} · Launch ${exhibitions[selected][4]}`} action={<TinyButton onClick={() => notice("Exhibition preview opened in simulated curator mode.")}><Eye className="mr-1 inline h-3 w-3" /> Preview</TinyButton>}><div className="grid gap-4 lg:grid-cols-[1fr_260px]"><div className="rounded-xl border border-white/7 bg-[#0a0a09] p-4"><div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/8 bg-[radial-gradient(circle_at_50%_20%,rgba(218,193,139,.18),transparent_38%),linear-gradient(160deg,#23211d,#0b0b0a)]"><div className="absolute inset-x-[7%] bottom-[12%] top-[14%] border-x border-t border-white/8 bg-[#181715]"><div className="absolute inset-x-[8%] bottom-[10%] top-[15%] grid grid-cols-3 gap-[7%]">{["#5c6478","#9a704e","#63735d"].map((color,index) => <div key={color} className="relative shadow-2xl" style={{background:`linear-gradient(${120+index*20}deg, ${color}, #282620)`}}><span className="absolute -bottom-5 left-0 text-[6px] uppercase tracking-widest text-white/25">Work {index+1}</span></div>)}</div></div><span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2 py-1 text-[7px] uppercase tracking-widest text-white/40">2D curator preview</span></div><div className="mt-4 grid grid-cols-4 gap-2">{[["Works","14"],["Rooms","3"],["Rights","Clear"],["Readiness","92%"]].map(([label,value]) => <div key={label} className="rounded-lg bg-white/[0.025] p-3"><p className="text-[8px] text-white/25">{label}</p><p className="mt-1 text-[10px] font-semibold text-white/65">{value}</p></div>)}</div></div><div><h4 className="text-[10px] font-semibold text-white/65">Launch checklist</h4><div className="mt-3 space-y-2">{[["Wall narrative approved",true],["All works rights-cleared",true],["2D room tested",true],["3D lighting review",false],["Campaign founder approval",false]].map(([label,done]) => <button type="button" key={String(label)} onClick={() => notice(`${label} checkpoint opened.`)} className="flex w-full items-center gap-2.5 rounded-lg border border-white/6 px-3 py-2.5 text-left"><span className={`flex h-4 w-4 items-center justify-center rounded-full ${done ? "bg-emerald-300/10 text-emerald-200" : "border border-white/15 text-transparent"}`}>{done && <Check className="h-2.5 w-2.5" />}</span><span className="text-[9px] text-white/42">{label}</span></button>)}</div><button type="button" onClick={() => notice("Launch approval was added to the founder queue.")} className="mt-4 w-full rounded-lg bg-[#c8a968]/12 py-2.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#e4cb8f]">Request launch approval</button></div></div></Panel>
  </div>;
}

function CatalogView({ notice }: { notice: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const rows = artworkRows.filter((row) => row[1].toLowerCase().includes(query.toLowerCase()));
  return <Panel title="House catalog" kicker="100 seeded catalog studies · demo media labeled" action={<TinyButton onClick={() => notice("Catalog filters opened in demo mode.")}><Filter className="mr-1 inline h-3 w-3" /> Filters</TinyButton>}><div className="mb-4 flex flex-wrap items-center gap-3"><label className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-white/8 bg-black/15 px-3"><Search className="h-3.5 w-3.5 text-white/25" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, artist, medium…" className="w-full bg-transparent py-2.5 text-[10px] text-white/70 outline-none placeholder:text-white/20" /></label><span className="text-[9px] text-white/28">{rows.length} matching demonstration records</span></div><DataTable headers={["ID", "Title", "Readiness", "Similarity", "Cost", "Owner"]} rows={rows} onAction={(row) => notice(`${row[1]} opened for catalog review.`)} /></Panel>;
}

const researchRows = [
  ["RS-882", "Museum + gallery feeds", "Textured neutrals in large-format interiors", "High", "12 sources", "Reviewed"],
  ["RS-879", "Public search signals", "Increased interest in small kinetic sculpture", "Medium", "8 sources", "Needs review"],
  ["RS-874", "Interior publications", "Deep blue paired with natural wood", "High", "15 sources", "Reviewed"],
  ["RS-870", "Auction public results", "Works on paper gaining entry collectors", "Medium", "6 sources", "Needs review"],
];

function ResearchView({ notice }: { notice: (message: string) => void }) {
  const [running, setRunning] = useState(false);
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Approved sources" value="38" change="Compliant feeds and public APIs" icon={ShieldCheck} tone="green" /><Stat label="Signals this week" value="127" change="22 promoted to review" icon={Activity} /><Stat label="Evidence links" value="642" change="Every finding traceable" icon={ExternalLink} tone="blue" /><Stat label="Source warnings" value="2" change="Excluded from autonomous research" icon={AlertTriangle} tone="amber" /></div><Panel title="Research signal ledger" kicker="No paywall bypass, private data, or prohibited scraping" className="mt-4" action={<TinyButton active={running} onClick={() => {setRunning(!running); notice(`Research sweep ${!running ? "started" : "paused"}. Only approved demo sources are in scope.`);}}>{running ? <Pause className="mr-1 inline h-3 w-3" /> : <Play className="mr-1 inline h-3 w-3" />}{running ? "Pause sweep" : "Run sweep"}</TinyButton>}><DataTable headers={["Signal", "Source type", "Finding", "Confidence", "Evidence", "Review"]} rows={researchRows} onAction={(row) => notice(`${row[0]} evidence drawer opened.`)} /></Panel></>;
}

const trendCards = [
  { name: "Tactile restraint", confidence: 91, momentum: "+24%", category: "Mixed media", note: "Avoid flattening regional craft traditions into a visual trend." },
  { name: "Small kinetic objects", confidence: 78, momentum: "+18%", category: "Sculpture", note: "Demand signal is early; validate production and safety cost." },
  { name: "Ultramarine interiors", confidence: 84, momentum: "+13%", category: "Hospitality", note: "Use as placement context, not a mandatory palette." },
  { name: "Works on paper", confidence: 88, momentum: "+11%", category: "Entry collector", note: "Opportunity for accessible editions without artificial scarcity." },
];

function TrendsView({ notice }: { notice: (message: string) => void }) {
  return <div className="grid gap-4 md:grid-cols-2">{trendCards.map((trend) => <article key={trend.name} className={`${panelClass} p-5`}><div className="flex items-start justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c8a968]/55">{trend.category}</p><h3 className="mt-2 font-display text-xl text-white/85">{trend.name}</h3></div><span className="flex items-center gap-1 rounded-full bg-emerald-300/[0.06] px-2 py-1 text-[9px] font-semibold text-emerald-200/70"><TrendingUp className="h-3 w-3" />{trend.momentum}</span></div><div className="mt-5"><div className="mb-2 flex justify-between text-[9px]"><span className="text-white/30">Confidence</span><span className="text-white/60">{trend.confidence}%</span></div><div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-[#c8a968]/65" style={{width:`${trend.confidence}%`}} /></div></div><p className="mt-4 rounded-lg border border-amber-300/8 bg-amber-300/[0.025] p-3 text-[9px] leading-relaxed text-white/35">Risk note · {trend.note}</p><div className="mt-4 flex gap-2"><TinyButton onClick={() => notice(`${trend.name} evidence panel opened.`)}>View evidence</TinyButton><TinyButton onClick={() => notice(`${trend.name} was added to the briefing queue, not directly to production.`)}>Brief Guides</TinyButton></div></article>)}</div>;
}

const campaignRows = [
  ["CP-109", "Light Has a Memory · Preview", "Instagram · Email", "Awaiting approval", "$0 / $350", "Sep 07"],
  ["CP-106", "Collector Library Stories", "LinkedIn · YouTube", "Organic approved", "$0", "Active"],
  ["CP-102", "Living Art, Quietly", "Pinterest · Email", "Draft", "$0", "Unscheduled"],
  ["CP-098", "Works on Paper Edit", "Search · Instagram", "Completed", "$1,120", "4.8× ROAS"],
];

function CampaignsView({ notice }: { notice: (message: string) => void }) {
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Drafts" value="12" change="No unapproved publishing" icon={Megaphone} /><Stat label="Organic approved" value="4" change="Within named channels" icon={Check} tone="green" /><Stat label="Paid allocation" value="$3,200" change="$1,120 simulated spent" icon={BadgeDollarSign} tone="blue" /><Stat label="Experiments" value="6" change="Honest-participation rewards" icon={BarChart3} tone="amber" /></div><Panel title="Campaign studio" kicker="Publishing and spend are human-gated" className="mt-4" action={<TinyButton onClick={() => notice("A new campaign draft was created. It cannot publish until approved.")}><Plus className="mr-1 inline h-3 w-3" /> New draft</TinyButton>}><DataTable headers={["Campaign", "Name", "Channels", "Approval", "Spend", "Schedule"]} rows={campaignRows} onAction={(row) => notice(`${row[1]} opened in campaign review.`)} /><div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-300/8 bg-sky-300/[0.025] p-4"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-200/60" /><p className="text-[9px] leading-relaxed text-white/35">Participation rewards offer gallery points, previews, and wallpapers for honest feedback. They are never conditioned on a positive review.</p></div></Panel></>;
}

const customerRows = [
  ["CU-1948", "Naomi Reed", "Collector", "$8,420", "Private viewing", "Today"],
  ["CU-1882", "Harborline Hotel Group", "Institutional", "$24,800", "License review", "Yesterday"],
  ["CU-1761", "Daniel Cho", "Circle", "$1,280", "Framing question", "2 days"],
  ["CU-1694", "Sofia Martinez", "Patron", "$12,460", "No open case", "4 days"],
];

function CustomersView({ notice }: { notice: (message: string) => void }) {
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Collectors" value="1,284" change="Consent-aware profiles" icon={Users} /><Stat label="Member conversion" value="8.7%" change="+1.2 points this month" icon={UserRoundCheck} tone="green" /><Stat label="Private viewings" value="18" change="7 awaiting confirmation" icon={CalendarRange} tone="blue" /><Stat label="Open care cases" value="9" change="Median reply 14 minutes" icon={Clock3} tone="amber" /></div><Panel title="Collector relationships" kicker="Preferences are used only with consent" className="mt-4"><DataTable headers={["ID", "Collector", "Level", "Lifetime value", "Current need", "Last seen"]} rows={customerRows} onAction={(row) => notice(`${row[1]}'s consent-aware profile opened.`)} /></Panel></>;
}

function MembershipsView({ notice }: { notice: (message: string) => void }) {
  const tiers = [["Visitor","1,842","Free","Public gallery + saved works"],["Circle","826","$12/mo","Early previews + member edits"],["Collector","312","$49/mo","Private rooms + curator sessions"],["Patron","84","$195/mo","Priority sourcing + commissions"],["Institutional","21","Custom","Hospitality and corporate licensing"]];
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{tiers.map(([name,count,price,benefit],index) => <article key={name} className={`${panelClass} p-5 ${index===3 ? "border-[#c8a968]/20" : ""}`}><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c8a968]/60">{name}</p><p className="mt-4 text-3xl font-semibold text-white/88">{count}</p><p className="mt-1 text-[9px] text-white/30">active profiles</p><div className="my-4 h-px bg-white/7" /><p className="text-[11px] font-semibold text-white/65">{price}</p><p className="mt-2 min-h-10 text-[9px] leading-relaxed text-white/30">{benefit}</p><button type="button" onClick={() => notice(`${name} membership details opened.`)} className="mt-4 text-[8px] font-bold uppercase tracking-[0.14em] text-[#d7ba78]/70">Manage tier →</button></article>)}</div>;
}

const orderRows = [
  ["AU-10391", "Naomi Reed", "Nocturne Above the Salt Flats", "$2,840", "In production", "Sep 08"],
  ["AU-10388", "Daniel Cho", "Market Morning, Oaxaca", "$740", "Quality check", "Sep 06"],
  ["AU-10382", "M. Walker", "Verdant Geometry", "$1,240", "Refund requested", "Sep 02"],
  ["AU-10379", "Harborline Hotel Group", "Living Art license × 4", "$8,600", "Delivered", "Aug 30"],
];

function OrdersView({ notice }: { notice: (message: string) => void }) {
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Demo gross today" value="$9,540" change="No live charges" icon={CircleDollarSign} tone="green" /><Stat label="Open orders" value="28" change="12 currently in production" icon={ShoppingBag} /><Stat label="Average order" value="$1,284" change="Edition + shipping estimate" icon={BarChart3} tone="blue" /><Stat label="Needs attention" value="3" change="1 refund · 2 delivery risks" icon={AlertTriangle} tone="amber" /></div><Panel title="Order ledger" kicker="Safe demo checkout and fulfillment records" className="mt-4"><DataTable headers={["Order", "Customer", "Artwork / license", "Total", "Status", "Placed"]} rows={orderRows} onAction={(row) => notice(`${row[0]} order timeline opened.`)} /></Panel></>;
}

function FulfillmentView({ notice }: { notice: (message: string) => void }) {
  const rows = [["FL-529","AU-10391","Archival acrylic · 48 × 60","Atelier North","In production","Sep 08"],["FL-526","AU-10388","Fine-art paper · 24 × 30","Paper House","Quality check","Sep 06"],["FL-519","AU-10371","Framed canvas · 36 × 48","Atelier North","Carrier pickup","Sep 04"],["FL-514","AU-10366","Living digital edition","Digital vault","Delivered","Sep 03"]];
  return <><SafetyPolicySummary /><Panel title="Fulfillment queue" kicker="Production, QA, packaging, shipment" className="mt-4" action={<TinyButton onClick={() => notice("Partner SLA status refreshed from simulated records.")}><RefreshCw className="mr-1 inline h-3 w-3" /> Refresh</TinyButton>}><DataTable headers={["Job","Order","Configuration","Partner","Stage","Due"]} rows={rows} onAction={(row) => notice(`${row[0]} fulfillment checklist opened.`)} /></Panel></>;
}

function RefundsView({ notice }: { notice: (message: string) => void }) {
  const rows = [["RF-208","AU-10382","$1,240","Transit damage","Founder approval","2 hr"],["RF-207","AU-10374","$86","Shipping adjustment","Auto-approved","Yesterday"],["RF-204","AU-10351","$420","Edition exchange","Care review","3 days"]];
  return <div className="grid gap-4 xl:grid-cols-[1fr_340px]"><Panel title="Refund requests" kicker="Above $250 requires human approval"><DataTable headers={["Refund","Order","Amount","Reason","Status","Age"]} rows={rows} onAction={(row) => notice(`${row[0]} refund evidence opened.`)} /></Panel><Panel title="Refund policy" kicker="Current founder controls"><div className="space-y-4">{[["Automatic ceiling","$100"],["Care review","$101–$250"],["Founder approval","Above $250"],["Daily reserve","$4,500"]].map(([label,value]) => <div key={label} className="flex items-center justify-between border-b border-white/6 pb-3 text-[10px] last:border-0"><span className="text-white/35">{label}</span><span className="font-semibold text-white/65">{value}</span></div>)}</div><button type="button" onClick={() => notice("Refund policy editor opened in local demo state.")} className="mt-5 w-full rounded-lg border border-white/8 py-2.5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/45">Edit policy</button></Panel></div>;
}

function FinanceView({ notice }: { notice: (message: string) => void }) {
  const allocations = [["Production allocation","$18,000","$9,840",55],["Advertising allocation","$3,200","$1,120",35],["Fulfillment reserve","$12,500","$2,240",18],["Tax reserve","$8,600","$8,600",100],["Refund reserve","$4,500","$986",22],["Growth reserve","$7,000","$1,400",20]];
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Demo gross MTD" value="$48,620" change="72% of monthly target" icon={CircleDollarSign} tone="green" /><Stat label="Operating spend" value="$12,946" change="Within all hard limits" icon={BadgeDollarSign} /><Stat label="Reserved capital" value="$23,726" change="Tax, refund, fulfillment" icon={ShieldCheck} tone="blue" /><Stat label="Approval exposure" value="$1,420" change="2 financial decisions" icon={AlertTriangle} tone="amber" /></div><div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_.85fr]"><Panel title="Capital allocation" kicker="Simulated ledger · no money movement"><div className="space-y-5">{allocations.map(([label,total,used,percent]) => <div key={String(label)}><div className="mb-2 flex justify-between text-[9px]"><span className="text-white/45">{label}</span><span className="text-white/30">{used} / <span className="text-white/62">{total}</span></span></div><div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-[#c8a968]/60" style={{width:`${percent}%`}} /></div></div>)}</div></Panel><Panel title="30-day revenue" kicker="Target line $67,500"><SparkBars values={[30,42,38,51,49,60,65,58,72,69,75,83,78,89,86,92]} color="bg-emerald-300/45" /><div className="mt-6 flex justify-between"><span><span className="block text-xl font-semibold text-white/85">$48.6k</span><span className="text-[9px] text-white/28">Recorded MTD</span></span><button type="button" onClick={() => notice("Daily finance brief exported from simulated data.")} className="self-end rounded-lg border border-white/8 px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-white/40"><Download className="mr-1 inline h-3 w-3" /> Report</button></div></Panel></div></>;
}

function LogsView({ notice }: { notice: (message: string) => void }) {
  const [query,setQuery] = useState("");
  const logs = [["09:12:44","policy.approval.created","Seraphina Vale","APR-1048 · Pinterest publishing","Medium"],["09:08:17","guide.task.completed","Avery Cole","AU-2741 rights check passed","Info"],["08:57:02","provider.limit.checked","Studio Production","OpenAI demo · $14.80 estimated","Info"],["08:43:29","similarity.threshold.blocked","Avery Cole","AU-2738 · score 0.84","High"],["08:31:10","human.settings.updated","Founder","Motion cap changed to $180/day","Medium"],["08:00:00","system.daily_brief.created","Seraphina Vale","Cycle 084 operating brief","Info"]];
  const visible = logs.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <Panel title="Audit event stream" kicker="Append-only demonstration ledger" action={<TinyButton onClick={() => notice("Audit ledger export prepared in demo memory.")}><Download className="mr-1 inline h-3 w-3" /> Export</TinyButton>}><label className="mb-4 flex items-center gap-2 rounded-lg border border-white/8 bg-black/15 px-3"><Search className="h-3.5 w-3.5 text-white/25" /><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Filter event, actor, resource…" className="w-full bg-transparent py-2.5 text-[10px] text-white/70 outline-none placeholder:text-white/20" /></label><DataTable headers={["Time","Event","Actor","Resource","Severity"]} rows={visible} onAction={(row) => notice(`${row[1]} event detail opened.`)} /></Panel>;
}

function SettingsView({ notice }: { notice: (message: string) => void }) {
  const [retries,setRetries] = useState(3); const [similarity,setSimilarity] = useState(82); const [escalation,setEscalation] = useState(30);
  return <div className="space-y-4"><Panel title="Spending & provider limits" kicker="Hard ceilings apply before each simulated provider call"><BudgetControls onNotice={notice} /></Panel><Panel title="Reliability & escalation" kicker="Retries never bypass an approval or safety failure"><div className="grid gap-4 md:grid-cols-3">{[["Maximum retry attempts",retries,setRetries,"Failed provider tasks"],["Similarity ceiling",similarity,setSimilarity,"Percent · blocks at or above"],["Escalate after",escalation,setEscalation,"Minutes without progress"]].map(([label,value,setter,note]) => <label key={String(label)} className="rounded-xl border border-white/7 bg-white/[0.018] p-4"><span className="text-[10px] font-semibold text-white/60">{String(label)}</span><input type="number" value={Number(value)} min="0" onChange={(event)=>(setter as React.Dispatch<React.SetStateAction<number>>)(Number(event.target.value))} className="mt-3 w-full rounded-lg border border-white/8 bg-black/20 px-3 py-2.5 text-sm text-white/75 outline-none" /><span className="mt-2 block text-[9px] text-white/25">{String(note)}</span></label>)}</div><div className="mt-4 flex justify-end"><button type="button" onClick={() => notice(`Reliability settings saved: ${retries} retries, ${similarity}% similarity ceiling, ${escalation}-minute escalation.`)} className="rounded-lg bg-[#d2b46f] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#15110a]">Save reliability policy</button></div></Panel></div>;
}

export function AdminConsole({ section }: { section: string }) {
  const [message,setMessage] = useState("");
  const notice = (value:string) => { setMessage(value); window.setTimeout(() => setMessage(""), 5000); };
  const content = useMemo(() => {
    switch(section) {
      case "command": return <CommandView notice={notice} />;
      case "guides": return <div className="space-y-4"><Panel title="Observe → Learn operating loop" kicker="Seraphina coordinates every stage"><ObserveLearnWorkflow /></Panel><Panel title="Guide registry" kicker="Pause, retry, and escalate controls are active in demo state"><GuideRegistry onNotice={notice} /></Panel></div>;
      case "artwork": return <PipelineView type="artwork" notice={notice} />;
      case "motion": return <PipelineView type="motion" notice={notice} />;
      case "exhibitions": return <ExhibitionsView notice={notice} />;
      case "catalog": return <CatalogView notice={notice} />;
      case "research": return <ResearchView notice={notice} />;
      case "trends": return <TrendsView notice={notice} />;
      case "campaigns": return <CampaignsView notice={notice} />;
      case "customers": return <CustomersView notice={notice} />;
      case "memberships": return <MembershipsView notice={notice} />;
      case "orders": return <OrdersView notice={notice} />;
      case "fulfillment": return <FulfillmentView notice={notice} />;
      case "refunds": return <RefundsView notice={notice} />;
      case "finance": return <FinanceView notice={notice} />;
      case "approvals": return <div className="grid gap-4 xl:grid-cols-[1fr_360px]"><Panel title="Pending founder decisions" kicker="Every decision is timestamped and audited"><ApprovalQueue onNotice={notice} expanded /></Panel><div className="space-y-4"><Panel title="Approval policy" kicker="Sensitive boundaries"><SafetyPolicySummary /></Panel><Panel title="Decision SLA" kicker="Current queue health"><div className="space-y-4">{[["Under 30 min","1"],["30–120 min","2"],["Over 2 hours","1"],["Critical overdue","0"]].map(([label,value])=><div key={label} className="flex justify-between border-b border-white/6 pb-3 text-[10px] last:border-0"><span className="text-white/35">{label}</span><span className="font-semibold text-white/65">{value}</span></div>)}</div></Panel></div></div>;
      case "providers": return <div className="space-y-4"><SafetyPolicySummary /><Panel title="Provider adapters" kicker="Last checked locally · raw credentials are never displayed"><ProviderConnections onNotice={notice} /></Panel></div>;
      case "safety": return <div className="space-y-4"><SafetyPolicySummary /><Panel title="Emergency capability controls" kicker="Red controls apply immediately; all actions are logged"><EmergencyControls onNotice={notice} detailed /></Panel><Panel title="Operating limits" kicker="Provider and advertising boundaries"><BudgetControls onNotice={notice} /></Panel></div>;
      case "settings": return <SettingsView notice={notice} />;
      case "logs": return <LogsView notice={notice} />;
      default: return <CommandView notice={notice} />;
    }
  }, [section]);

  return <><Header section={section} />{content}{message && <Notice message={message} onClose={() => setMessage("")} />}</>;
}
