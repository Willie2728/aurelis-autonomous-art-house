import { PageHero, DemoNotice } from "@/components/site/page-elements";
import { RoomPreview } from "@/components/rooms/room-preview";
export const metadata = { title: "Room Preview" };
export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ art?: string }> }) { const query = await searchParams; return <><PageHero compact eyebrow="Environment rolodex" title="See the work where life happens." description="Try artwork across residential, hospitality, corporate, and civic rooms. Change wall, light, scale, frame, and placement in a responsive spatial mockup."/><DemoNotice>Perspective placement is simulated. Advanced camera matching is an explicit future integration boundary.</DemoNotice><RoomPreview initialSlug={query.art}/></>; }
