"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, BrainCircuit, Check, CirclePause, Crown, Play, RotateCcw } from "lucide-react";

export const guideSeed = [
  { id: "wisdom", name: "Seraphina Vale", role: "Wisdom Guide · Chief Orchestrator", status: "working", task: "Evaluate morning operating brief and approval dependencies", score: 98, runs: 12 },
  { id: "culture", name: "Amara Okoye", role: "Cultural Intelligence", status: "reviewing", task: "Context review · Crossroads in Cobalt", score: 96, runs: 7 },
  { id: "market", name: "Elliot Mercer", role: "Market Intelligence", status: "working", task: "Validate textured-neutral collector signal", score: 94, runs: 18 },
  { id: "creative", name: "Noor El-Amin", role: "Creative Director", status: "working", task: "Direct Edition 27 variation matrix", score: 97, runs: 11 },
  { id: "studio", name: "Mateo Silva", role: "Studio Production", status: "working", task: "Inspect six new print masters", score: 93, runs: 24 },
  { id: "motion", name: "Keiko Tan", role: "Motion Atelier", status: "waiting", task: "Await rights clearance · Tidal Memory", score: 95, runs: 8 },
  { id: "curatorial", name: "Celeste Moreau", role: "Curatorial", status: "reviewing", task: "Edit Seasonal Hall wall narrative", score: 98, runs: 9 },
  { id: "rights", name: "Avery Cole", role: "Rights & Provenance", status: "working", task: "Run similarity and provenance checks", score: 99, runs: 31 },
  { id: "experience", name: "Iris Bennett", role: "Gallery Experience", status: "working", task: "Test low-bandwidth salon transition", score: 92, runs: 14 },
  { id: "collector", name: "Julian Hart", role: "Collector Relations", status: "waiting", task: "Prepare three private-viewing briefs", score: 96, runs: 5 },
  { id: "growth", name: "Zara King", role: "Growth & Marketing", status: "reviewing", task: "Draft organic launch sequence", score: 91, runs: 27 },
  { id: "commerce", name: "Priya Shah", role: "Commerce", status: "working", task: "Audit edition margin floor", score: 97, runs: 16 },
  { id: "fulfillment", name: "Theo Grant", role: "Fulfillment", status: "waiting", task: "Monitor two simulated shipments", score: 94, runs: 6 },
  { id: "care", name: "Lena Brooks", role: "Customer Care", status: "working", task: "Resolve framing guidance request", score: 98, runs: 13 },
  { id: "finance", name: "Marcus Lin", role: "Finance & Compliance", status: "reviewing", task: "Reconcile demo spending ledger", score: 99, runs: 19 },
] as const;

export const workflowSteps = [
  "Observe", "Research", "Debate", "Ideate", "Generate", "Inspect", "Similarity", "Rights", "Curate",
  "Price", "Animate", "Exhibit", "Promote", "Sell", "Fulfill", "Support", "Measure", "Learn", "Repeat",
];

export function ObserveLearnWorkflow({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(6);
  const visible = compact ? workflowSteps.slice(0, 12) : workflowSteps;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a968]/65">Autonomous operating loop</p>
          <p className="mt-1 text-xs text-white/40">Observe → learn, with founder gates at every sensitive boundary.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/45"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Cycle 084</div>
      </div>
      <div className="scrollbar-none flex overflow-x-auto pb-2">
        {visible.map((step, index) => {
          const complete = index < active;
          const current = index === active;
          return (
            <div key={step} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`group flex min-w-[68px] flex-col items-center gap-2 rounded-lg px-1 py-2 transition hover:bg-white/[0.03] ${current ? "text-[#ebd399]" : complete ? "text-emerald-200/65" : "text-white/28"}`}
                aria-label={`Inspect ${step} workflow stage`}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-semibold ${current ? "border-[#d7ba78] bg-[#c8a968]/15 shadow-[0_0_25px_rgba(200,169,104,.16)]" : complete ? "border-emerald-300/25 bg-emerald-300/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                  {complete ? <Check className="h-3 w-3" /> : index + 1}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.12em]">{step}</span>
              </button>
              {index < visible.length - 1 && <ArrowRight className={`mb-5 h-3 w-3 ${index < active ? "text-emerald-300/25" : "text-white/10"}`} />}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-start gap-3 rounded-lg border border-[#c8a968]/10 bg-[#c8a968]/[0.035] px-4 py-3">
        <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-[#d7ba78]" />
        <div><p className="text-[11px] font-semibold text-white/75">{workflowSteps[active]} checkpoint</p><p className="mt-1 text-[10px] leading-relaxed text-white/35">Seraphina is comparing composition similarity against the 0.82 ceiling. Any rights warning routes to founder review before curation.</p></div>
      </div>
    </div>
  );
}

type GuideState = "working" | "reviewing" | "waiting" | "paused";

export function GuideRegistry({ onNotice }: { onNotice?: (message: string) => void }) {
  const [states, setStates] = useState<Record<string, GuideState>>(() => Object.fromEntries(guideSeed.map((guide) => [guide.id, guide.status as GuideState])));
  const [filter, setFilter] = useState<"all" | GuideState>("all");
  const guides = useMemo(() => guideSeed.filter((guide) => filter === "all" || states[guide.id] === filter), [filter, states]);

  function changeState(id: string, state: GuideState, label: string) {
    setStates((current) => ({ ...current, [id]: state }));
    onNotice?.(`${label} is now ${state}. This demo action was written to the local activity timeline.`);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", "working", "reviewing", "waiting", "paused"] as const).map((value) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] transition ${filter === value ? "border-[#c8a968]/35 bg-[#c8a968]/10 text-[#ead49e]" : "border-white/8 text-white/35 hover:border-white/15 hover:text-white/60"}`}>{value}</button>
          ))}
        </div>
        <p className="text-[10px] text-white/35">15 guides · 1 Wisdom · 14 Knowledge</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {guides.map((guide) => {
          const status = states[guide.id];
          const isWisdom = guide.id === "wisdom";
          return (
            <article key={guide.id} className={`relative overflow-hidden rounded-xl border p-4 ${isWisdom ? "border-[#c8a968]/28 bg-gradient-to-br from-[#c8a968]/[0.10] to-white/[0.02]" : "border-white/8 bg-white/[0.025]"}`}>
              {isWisdom && <Crown className="absolute right-4 top-4 h-4 w-4 text-[#d7ba78]" />}
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm ${isWisdom ? "bg-[#c8a968]/15 text-[#efdba8]" : "bg-white/[0.045] text-white/55"}`}>{guide.name.split(" ").map((part) => part[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><h3 className="truncate text-[12px] font-semibold text-white/85">{guide.name}</h3><span className={`h-1.5 w-1.5 rounded-full ${status === "working" ? "bg-emerald-300" : status === "reviewing" ? "bg-amber-300" : status === "paused" ? "bg-red-300" : "bg-white/25"}`} /></div>
                  <p className="mt-1 truncate text-[9px] font-bold uppercase tracking-[0.12em] text-[#c8a968]/60">{guide.role}</p>
                </div>
                {!isWisdom && <span className="text-[11px] font-semibold text-emerald-200/70">{guide.score}%</span>}
              </div>
              <p className="mt-4 min-h-9 text-[10px] leading-relaxed text-white/42">{guide.task}</p>
              <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-3">
                <span className="text-[9px] uppercase tracking-[0.14em] text-white/25">{guide.runs} runs today</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => changeState(guide.id, status === "paused" ? "working" : "paused", guide.name)} title={status === "paused" ? "Resume guide" : "Pause guide"} className="rounded-md p-1.5 text-white/35 hover:bg-white/5 hover:text-white/70">{status === "paused" ? <Play className="h-3.5 w-3.5" /> : <CirclePause className="h-3.5 w-3.5" />}</button>
                  <button type="button" onClick={() => changeState(guide.id, "working", guide.name)} title="Retry current task" className="rounded-md p-1.5 text-white/35 hover:bg-white/5 hover:text-white/70"><RotateCcw className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => { changeState(guide.id, "reviewing", guide.name); onNotice?.(`${guide.name}'s task was escalated to Seraphina for review.`); }} title="Escalate to Wisdom Guide" className="rounded-md p-1.5 text-white/35 hover:bg-white/5 hover:text-amber-200"><AlertTriangle className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function GuideMiniList() {
  return (
    <div className="space-y-1">
      {guideSeed.slice(0, 6).map((guide) => (
        <div key={guide.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-white/[0.025]">
          <span className={`h-1.5 w-1.5 rounded-full ${guide.status === "working" ? "bg-emerald-300" : guide.status === "reviewing" ? "bg-amber-300" : "bg-white/25"}`} />
          <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-white/70">{guide.name}</p><p className="mt-0.5 truncate text-[9px] text-white/30">{guide.task}</p></div>
          <span className="text-[9px] font-bold text-white/30">{guide.score}</span>
        </div>
      ))}
    </div>
  );
}
