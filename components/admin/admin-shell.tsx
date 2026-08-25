"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  Aperture,
  BadgeDollarSign,
  BookOpenCheck,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronLeft,
  ClipboardCheck,
  FlaskConical,
  GalleryHorizontalEnd,
  Menu,
  PackageCheck,
  PanelLeftClose,
  RefreshCw,
  Rocket,
  ScrollText,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navigation: { label: string; items: NavItem[] }[] = [
  {
    label: "Orchestration",
    items: [
      { href: "/admin/command", label: "Command Center", shortLabel: "Command", icon: Activity },
      { href: "/admin/guides", label: "Guide Activity", shortLabel: "Guides", icon: BrainCircuit },
      { href: "/admin/approvals", label: "Approvals", shortLabel: "Approvals", icon: ClipboardCheck },
      { href: "/admin/safety", label: "Safety & Controls", shortLabel: "Safety", icon: ShieldCheck },
    ],
  },
  {
    label: "Atelier",
    items: [
      { href: "/admin/artwork", label: "Artwork Pipeline", shortLabel: "Artwork", icon: Aperture },
      { href: "/admin/motion", label: "Motion Pipeline", shortLabel: "Motion", icon: Video },
      { href: "/admin/exhibitions", label: "Exhibition Builder", shortLabel: "Exhibits", icon: GalleryHorizontalEnd },
      { href: "/admin/catalog", label: "Catalog", shortLabel: "Catalog", icon: Boxes },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/admin/research", label: "Research", shortLabel: "Research", icon: FlaskConical },
      { href: "/admin/trends", label: "Trend Intelligence", shortLabel: "Trends", icon: ChartNoAxesCombined },
      { href: "/admin/campaigns", label: "Campaigns", shortLabel: "Campaigns", icon: Rocket },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/customers", label: "Customers", shortLabel: "Customers", icon: Users },
      { href: "/admin/memberships", label: "Memberships", shortLabel: "Members", icon: Sparkles },
      { href: "/admin/orders", label: "Orders", shortLabel: "Orders", icon: ShoppingBag },
      { href: "/admin/fulfillment", label: "Fulfillment", shortLabel: "Fulfill", icon: PackageCheck },
      { href: "/admin/refunds", label: "Refunds", shortLabel: "Refunds", icon: RefreshCw },
      { href: "/admin/finance", label: "Finance", shortLabel: "Finance", icon: BadgeDollarSign },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/providers", label: "API Connections", shortLabel: "Providers", icon: Zap },
      { href: "/admin/settings", label: "Settings", shortLabel: "Settings", icon: Settings2 },
      { href: "/admin/logs", label: "Audit Logs", shortLabel: "Logs", icon: ScrollText },
    ],
  },
];

const titles = Object.fromEntries(navigation.flatMap((group) => group.items.map((item) => [item.href, item.label])));

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const currentTitle = titles[pathname] ?? "Founder Control Center";

  const sidebar = (
    <>
      <div className="flex h-20 items-center justify-between border-b border-white/8 px-5">
        <Link href="/admin/command" className="group min-w-0" onClick={() => setMobileOpen(false)}>
          <p className="font-display text-[1.38rem] leading-none tracking-[0.18em] text-[#ead9ae]">{compact ? "A" : "AURELIS"}</p>
          {!compact && <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">Founder Control</p>}
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-full p-2 text-white/45 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-5" aria-label="Founder navigation">
        {navigation.map((group) => (
          <div key={group.label} className="mb-5">
            {!compact && <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/25">{group.label}</p>}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || (pathname === "/admin" && item.href === "/admin/command");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={compact ? item.label : undefined}
                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12px] transition ${
                      active ? "bg-[#c8a968]/12 text-[#ead9ae]" : "text-white/48 hover:bg-white/[0.035] hover:text-white/80"
                    }`}
                  >
                    {active && <span className="absolute bottom-2 left-0 top-2 w-px bg-[#d7ba78]" />}
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#d7ba78]" : "text-white/35 group-hover:text-white/65"}`} />
                    {!compact && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/8 p-4">
        <div className={`rounded-xl border border-emerald-300/10 bg-emerald-300/[0.035] ${compact ? "p-2" : "p-3"}`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            {!compact && <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/70">Demo operations healthy</span>}
          </div>
          {!compact && <p className="mt-2 text-[10px] leading-relaxed text-white/30">No live providers, posts, charges, or money movement.</p>}
        </div>
        <button
          type="button"
          onClick={() => setCompact((value) => !value)}
          className="mt-3 hidden w-full items-center justify-center gap-2 rounded-lg py-2 text-[10px] uppercase tracking-[0.16em] text-white/30 hover:bg-white/5 hover:text-white/60 lg:flex"
          aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
        >
          {compact ? <ChevronLeft className="h-3.5 w-3.5 rotate-180" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          {!compact && "Collapse"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#090909] text-[#f4f0e8]">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/8 bg-[#0d0d0c] transition-[width] lg:flex lg:flex-col ${compact ? "w-[76px]" : "w-[248px]"}`}>
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />
          <aside className="relative flex h-full w-[284px] flex-col border-r border-white/10 bg-[#0d0d0c]">{sidebar}</aside>
        </div>
      )}

      <div className={`transition-[padding] ${compact ? "lg:pl-[76px]" : "lg:pl-[248px]"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-[#090909]/92 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-white/60 hover:bg-white/5 lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a968]/65">AURELIS / Operations</p>
              <h1 className="mt-0.5 text-sm font-semibold text-white/90">{currentTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[#c8a968]/15 bg-[#c8a968]/[0.055] px-3 py-1.5 sm:flex">
              <BookOpenCheck className="h-3.5 w-3.5 text-[#d7ba78]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d7ba78]">Founder oversight on</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#211f1a] font-display text-sm text-[#e6cf98]" title="Founder profile">W</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
