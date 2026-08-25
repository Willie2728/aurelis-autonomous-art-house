import { notFound } from "next/navigation";
import { AdminConsole } from "@/components/admin/admin-console";

const sections = [
  "command",
  "guides",
  "artwork",
  "motion",
  "exhibitions",
  "catalog",
  "research",
  "trends",
  "campaigns",
  "customers",
  "memberships",
  "orders",
  "fulfillment",
  "refunds",
  "finance",
  "approvals",
  "providers",
  "safety",
  "settings",
  "logs",
] as const;

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section as (typeof sections)[number])) notFound();
  return <AdminConsole section={section} />;
}
