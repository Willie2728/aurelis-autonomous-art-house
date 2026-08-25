import { PageHero } from "@/components/site/page-elements";
import { CollectionManager } from "@/components/commerce/collection-manager";
export const metadata = { title: "Private Collections" };
export default function AccountCollectionsPage() { return <><PageHero compact eyebrow="Collector tool" title="Private collections" description="Group saved works around rooms, ideas, clients, or future acquisitions. Demo lists reset with the session."/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-5xl"><CollectionManager/></div></section></>; }
