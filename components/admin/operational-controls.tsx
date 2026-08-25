"use client";

import { useState } from "react";
import { AlertOctagon, Check, CircleDollarSign, Gauge, LockKeyhole, PlugZap, ShieldAlert, X } from "lucide-react";

export type NoticeHandler = (message: string) => void;

const approvalSeed = [
  { id: "APR-1048", title: "Activate Pinterest publishing", owner: "Growth & Marketing", risk: "Public channel", cost: "$0", age: "18 min", status: "pending" },
  { id: "APR-1047", title: "Increase Provenance in Motion daily cap", owner: "Motion Atelier", risk: "Budget increase", cost: "$180/day", age: "42 min", status: "pending" },
  { id: "APR-1044", title: "Refund order AU-10382", owner: "Customer Care", risk: "Refund above limit", cost: "$1,240", age: "2 hr", status: "pending" },
  { id: "APR-1041", title: "Rights warning · Verdant Geometry", owner: "Rights & Provenance", risk: "Similarity 0.84", cost: "$0", age: "4 hr", status: "pending" },
] as const;

export function ApprovalQueue({ onNotice, expanded = false }: { onNotice: NoticeHandler; expanded?: boolean }) {
  const [items, setItems] = useState(approvalSeed.map((item) => ({ ...item, status: item.status as "pending" | "approved" | "rejected" })));
  const shown = expanded ? items : items.slice(0, 3);

  function decide(id: string, status: "approved" | "rejected") {
    const item = items.find((candidate) => candidate.id === id);
    setItems((current) => current.map((candidate) => candidate.id === id ? { ...candidate, status } : candidate));
    onNotice(`${item?.title ?? id} was ${status}. The decision and founder identity were added to the audit log.`);
  }

  return (
    <div className="space-y-2">
      {shown.map((item) => (
        <div key={item.id} className="rounded-xl border border-white/7 bg-white/[0.018] px-4 py-3.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><span className="text-[9px] font-bold tracking-[0.12em] text-[#c8a968]/65">{item.id}</span><span className="rounded-full bg-amber-300/[0.07] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-amber-200/70">{item.risk}</span></div>
              <p className="mt-2 text-[11px] font-semibold text-white/80">{item.title}</p>
              <p className="mt-1 text-[9px] text-white/30">{item.owner} · {item.age} ago · Exposure {item.cost}</p>
            </div>
            {item.status === "pending" ? (
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => decide(item.id, "rejected")} className="rounded-lg border border-white/8 p-2 text-white/35 transition hover:border-red-300/25 hover:bg-red-300/[0.05] hover:text-red-200" aria-label={`Reject ${item.title}`}><X className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => decide(item.id, "approved")} className="flex items-center gap-1.5 rounded-lg border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-200/75 transition hover:bg-emerald-300/10"><Check className="h-3.5 w-3.5" /> Approve</button>
              </div>
            ) : (
              <span className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] ${item.status === "approved" ? "bg-emerald-300/[0.07] text-emerald-200/70" : "bg-red-300/[0.07] text-red-200/70"}`}>{item.status}</span>
            )}
          </div>
        </div>
      ))}
      {items.filter((item) => item.status === "pending").length === 0 && <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-[11px] text-white/35">No approvals are waiting. Sensitive actions remain gated.</div>}
    </div>
  );
}

const stopLabels = [
  "Art generation", "Motion generation", "Public posting", "Advertising", "Refund processing", "Email automation", "Autonomous research",
];

export function EmergencyControls({ onNotice, detailed = false }: { onNotice: NoticeHandler; detailed?: boolean }) {
  const [stopped, setStopped] = useState<Record<string, boolean>>({});
  const [allStopped, setAllStopped] = useState(false);

  function toggle(label: string) {
    const next = !stopped[label];
    setStopped((current) => ({ ...current, [label]: next }));
    onNotice(`${label} was ${next ? "paused" : "resumed"} in simulated operations. This safety action was logged.`);
  }

  function toggleAll() {
    const next = !allStopped;
    setAllStopped(next);
    setStopped(Object.fromEntries(stopLabels.map((label) => [label, next])));
    onNotice(next ? "ALL autonomous operations were placed in emergency pause." : "Global pause was released; individual policies remain active.");
  }

  return (
    <div>
      <button type="button" onClick={toggleAll} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${allStopped ? "border-red-300/35 bg-red-400/10" : "border-red-300/15 bg-red-300/[0.045] hover:bg-red-300/[0.07]"}`}>
        <span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-300/[0.08]"><AlertOctagon className="h-4 w-4 text-red-200/80" /></span><span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-red-100/80">{allStopped ? "Release global pause" : "Emergency stop all"}</span><span className="mt-1 block text-[9px] text-white/30">Founder confirmation is recorded</span></span></span>
        <span className={`h-2 w-2 rounded-full ${allStopped ? "animate-pulse bg-red-300" : "bg-emerald-300"}`} />
      </button>
      <div className={`mt-3 grid gap-2 ${detailed ? "sm:grid-cols-2 xl:grid-cols-3" : ""}`}>
        {stopLabels.map((label) => (
          <button key={label} type="button" onClick={() => toggle(label)} className="flex items-center justify-between rounded-lg border border-white/7 bg-white/[0.018] px-3 py-2.5 text-left transition hover:border-white/12">
            <span className="text-[10px] text-white/55">{label}</span>
            <span className={`relative h-4 w-8 rounded-full transition ${stopped[label] ? "bg-red-300/40" : "bg-emerald-300/20"}`}><span className={`absolute top-0.5 h-3 w-3 rounded-full transition-all ${stopped[label] ? "left-0.5 bg-red-200" : "left-[18px] bg-emerald-200"}`} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BudgetControls({ onNotice }: { onNotice: NoticeHandler }) {
  const [daily, setDaily] = useState(600);
  const [generation, setGeneration] = useState(220);
  const [advertising, setAdvertising] = useState(200);

  function save() {
    onNotice(`Limits saved: $${daily}/day total, $${generation} generation, $${advertising} advertising. Increases still require approval.`);
  }

  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#c8a968]/10 bg-[#c8a968]/[0.035] p-4"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#d7ba78]" /><p className="text-[10px] leading-relaxed text-white/45">Hard limits are evaluated before provider calls. Lowering a limit applies immediately; increasing one creates a founder approval.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Daily operating ceiling", daily, setDaily, "$312 simulated today"],
          ["Generation provider cap", generation, setGeneration, "$94 simulated today"],
          ["Advertising allocation", advertising, setAdvertising, "$0 · publishing gated"],
        ].map(([label, value, setter, note]) => (
          <label key={String(label)} className="rounded-xl border border-white/7 bg-white/[0.02] p-4 text-[10px] text-white/40"><span className="block font-semibold text-white/65">{String(label)}</span><span className="mt-3 flex items-center rounded-lg border border-white/8 bg-black/20 px-3"><CircleDollarSign className="h-3.5 w-3.5 text-[#c8a968]/60" /><input type="number" min="0" value={Number(value)} onChange={(event) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(event.target.value))} className="w-full bg-transparent px-2 py-2.5 text-sm text-white/80 outline-none" /></span><span className="mt-2 block text-[9px] text-white/25">{String(note)}</span></label>
        ))}
      </div>
      <div className="mt-4 flex justify-end"><button type="button" onClick={save} className="rounded-lg bg-[#d2b46f] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#15110a] hover:bg-[#e0c684]">Save operating limits</button></div>
    </div>
  );
}

const providerSeed = [
  { name: "OpenAI", category: "Language + image", status: "Not connected", scope: "None", cost: "$0.04–0.18 / call" },
  { name: "Anthropic", category: "Language", status: "Not connected", scope: "None", cost: "$0.01–0.08 / call" },
  { name: "Google AI", category: "Language + media", status: "Not connected", scope: "None", cost: "$0.02–0.12 / call" },
  { name: "Runway", category: "Image to video", status: "Not connected", scope: "None", cost: "$0.40–2.20 / clip" },
  { name: "Stripe", category: "Payments", status: "Demo mode", scope: "Test data only", cost: "No live charges" },
  { name: "Firecrawl", category: "Research", status: "Not connected", scope: "None", cost: "$0.001 / page" },
] as const;

export function ProviderConnections({ onNotice }: { onNotice: NoticeHandler }) {
  const [statuses, setStatuses] = useState<Record<string, string>>(() => Object.fromEntries(providerSeed.map((provider) => [provider.name, provider.status])));

  function test(name: string) {
    setStatuses((current) => ({ ...current, [name]: "Testing" }));
    window.setTimeout(() => {
      const next = name === "Stripe" ? "Demo mode" : "Not connected";
      setStatuses((current) => ({ ...current, [name]: next }));
      onNotice(name === "Stripe" ? "Stripe demo adapter responded successfully. Live money movement remains disabled." : `${name} has no credential reference. Add a server-side key to connect it.`);
    }, 650);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/8">
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/7 bg-white/[0.025] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.16em] text-white/30 md:grid-cols-[1.1fr_.9fr_.7fr_.8fr_auto]"><span>Provider</span><span className="hidden md:block">Permission scope</span><span>Status</span><span className="hidden md:block">Estimated cost</span><span>Action</span></div>
      {providerSeed.map((provider) => {
        const status = statuses[provider.name];
        return (
          <div key={provider.name} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/6 px-4 py-4 last:border-0 md:grid-cols-[1.1fr_.9fr_.7fr_.8fr_auto]">
            <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]"><PlugZap className="h-3.5 w-3.5 text-white/45" /></span><span><span className="block text-[11px] font-semibold text-white/75">{provider.name}</span><span className="mt-0.5 block text-[9px] text-white/28">{provider.category}</span></span></div>
            <span className="hidden text-[9px] text-white/35 md:block">{provider.scope}</span>
            <span className={`w-fit rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] ${status === "Demo mode" ? "bg-sky-300/[0.07] text-sky-200/70" : status === "Testing" ? "animate-pulse bg-amber-300/[0.07] text-amber-200/70" : "bg-white/[0.04] text-white/35"}`}>{status}</span>
            <span className="hidden text-[9px] text-white/32 md:block">{provider.cost}</span>
            <button type="button" disabled={status === "Testing"} onClick={() => test(provider.name)} className="rounded-lg border border-white/8 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:border-[#c8a968]/25 hover:text-[#e5cc91] disabled:opacity-40">Test</button>
          </div>
        );
      })}
    </div>
  );
}

export function SafetyPolicySummary() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        [ShieldAlert, "Human-only", "Money transfers, provider activation, new channels, high-risk statements"],
        [Gauge, "Policy-gated", "Routine generation under $25, similarity below 0.82, approved providers"],
        [LockKeyhole, "Secret-safe", "Credentials stay server-side as encrypted references; never in browser state"],
      ].map(([Icon, title, body]) => {
        const Component = Icon as typeof ShieldAlert;
        return <div key={String(title)} className="rounded-xl border border-white/7 bg-white/[0.02] p-4"><Component className="h-4 w-4 text-[#d7ba78]" /><p className="mt-3 text-[11px] font-semibold text-white/70">{String(title)}</p><p className="mt-1.5 text-[9px] leading-relaxed text-white/32">{String(body)}</p></div>;
      })}
    </div>
  );
}
