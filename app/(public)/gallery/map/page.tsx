import { PageHero } from "@/components/site/page-elements";
import { GalleryMap } from "@/components/rooms/gallery-map";
export const metadata = { title: "Gallery Map" };
export default function GalleryMapPage() { return <><PageHero compact eyebrow="Find your way" title="The AURELIS estate map" description="Thirty rooms across three conceptual floors, designed for accessible self-guided and curator-led exploration."/><GalleryMap/></>; }
