import { PageHero } from "@/components/site/page-elements";
import { FavoritesView } from "@/components/commerce/favorites-view";
export const metadata = { title: "Saved Works" };
export default function FavoritesPage() { return <><PageHero compact eyebrow="Private shortlist" title="Saved works" description="A place for the pieces you want to see again. Demo favorites are stored only in this browser."/><section className="px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1350px]"><FavoritesView/></div></section></>; }
