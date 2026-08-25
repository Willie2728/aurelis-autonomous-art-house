import type { ArtistIdentity, Artwork, GalleryRoom, Guide } from "@/types";

export const DEMO_PROVENANCE =
  "Original AURELIS concept and metadata; the displayed image is a licensed Unsplash demo placeholder, not AURELIS-generated artwork. Replace it through an approved image provider before sale. No real artist is represented.";

type RoomDefinition = Omit<GalleryRoom, "artworkIds">;

const artistSeeds = [
  ["amara-okafor", "Amara Okafor", "Lagos / London", "Layered acrylic and textile", "Memory can be mapped through pattern without reducing culture to ornament.", "Amara builds architectural abstractions from remembered thresholds, hand-woven geometry, and softened urban light.", "indigo, clay, citron", "interiors and collective memory"],
  ["theo-mercer", "Theo Mercer", "Detroit / Copenhagen", "Steel, glass, and generative light", "Industry is a vocabulary for tenderness.", "Theo translates machine-age materials into quiet kinetic studies shaped by the lakes and factories of his childhood.", "oxide, lake blue, pearl", "light, machinery, and water"],
  ["ines-valera", "Inés Valera", "Seville / Mexico City", "Oil and encaustic", "A portrait should reveal the weather around a person, not merely their likeness.", "Inés paints multigenerational portraits with spare gestures, luminous wax, and sun-warmed domestic color.", "saffron, teal, rose", "families and private rituals"],
  ["kenji-sato", "Kenji Sato", "Kyoto / Vancouver", "Ink, mineral pigment, and paper", "Restraint makes motion visible.", "Kenji’s works pair calligraphic economy with close observation of coastal climates and contemporary construction.", "charcoal, mist, persimmon", "weather and negative space"],
  ["celeste-baptiste", "Celeste Baptiste", "Port of Spain / Toronto", "Photography and painted collage", "Color is evidence of movement.", "Celeste layers original photography with painted transparencies to explore carnival engineering, public space, and migration.", "coral, ultramarine, lime", "movement and civic life"],
  ["mateo-ruiz", "Mateo Ruiz", "Santa Fe / Bogotá", "Ceramic relief and earth pigment", "Land is a collaborator, never a backdrop.", "Mateo creates tactile topographies informed by high-desert walks, geological archives, and vernacular building systems.", "adobe, sage, cobalt", "geology and built landscapes"],
  ["lena-voss", "Lena Voss", "Berlin / Marseille", "Watercolor and graphite", "The unfinished edge gives the viewer room to arrive.", "Lena’s works on paper capture ordinary gestures, ferry terminals, and fleeting Mediterranean reflections.", "sea glass, graphite, apricot", "transit and human gesture"],
  ["malik-johnson", "Malik Johnson", "Baltimore / Paris", "Oil, pastel, and found paper", "Everyday dignity deserves monumental scale.", "Malik composes contemporary figurative works from neighborhood archives, fashion silhouettes, and saturated fields of color.", "plum, ochre, sky", "community portraiture"],
  ["sofia-almeida", "Sofia Almeida", "Lisbon / São Paulo", "Glass and projected color", "Light changes an object by changing us.", "Sofia’s installations combine kiln-formed glass with slowly shifting projections inspired by tides and tiled facades.", "aqua, vermilion, clear", "tides and optical rhythm"],
  ["priya-nair", "Priya Nair", "Kochi / Singapore", "Fiber, embroidery, and digital print", "Systems become personal when a hand interrupts them.", "Priya joins computational pattern with hand embroidery to make soft maps of trade, gardens, and family correspondence.", "marigold, leaf, midnight", "networks and botanical forms"],
  ["rowan-ellis", "Rowan Ellis", "Cardiff / New York", "Charcoal, limestone, and sound", "Absence is an architectural material.", "Rowan makes hushed drawings and installations that examine abandoned civic spaces and the acoustics of memory.", "slate, chalk, rust", "architecture and absence"],
  ["noor-haddad", "Noor Haddad", "Amman / Montréal", "Digital painting and sculptural print", "A future can feel ancient without pretending to be history.", "Noor builds speculative landscapes from astronomical forms, water systems, and nonliteral references to regional geometry.", "violet, sand, ice blue", "speculative ecology"],
] as const;

export const artists: ArtistIdentity[] = artistSeeds.map((artist, index) => ({
  id: `artist-${String(index + 1).padStart(2, "0")}`,
  slug: artist[0],
  name: artist[1],
  region: artist[2],
  medium: artist[3],
  philosophy: artist[4],
  biography: artist[5],
  palette: artist[6],
  subject: artist[7],
}));

const roomSeeds = [
  ["grand-atrium", "Grand Atrium", "Monumental and welcoming", "Triple-height limestone rotunda with a glass oculus", "limestone and smoked oak", "Dappled overhead daylight", "#b5a078"],
  ["living-art-salon", "Living Art Salon", "Intimate and animated", "Curved acoustic walls with recessed media bays", "plaster and aubergine wool", "Responsive edge lighting", "#8c5267"],
  ["new-masters-wing", "New Masters Wing", "Assured and exploratory", "Long clerestory gallery divided by sculptural fins", "travertine and brushed aluminum", "Cool northern light", "#7898a6"],
  ["contemporary-portrait-gallery", "Contemporary Portrait Gallery", "Human and contemplative", "Enfilade rooms with generous viewing distances", "chalk plaster and walnut", "Warm portrait spots", "#a56f5b"],
  ["abstract-expression-gallery", "Abstract Expression Gallery", "Energetic and expansive", "Sawtooth roof over broad uninterrupted walls", "concrete and pale ash", "Raking studio light", "#df6847"],
  ["african-diaspora-gallery", "African & African-American Gallery", "Layered and resonant", "Rhythmic brick piers surrounding a central forum", "handmade brick and bronze mesh", "Soft patterned daylight", "#a75c38"],
  ["latin-american-gallery", "Latin & Latin-American Gallery", "Vivid and civic", "Arcaded courtyard gallery with planted thresholds", "pigmented plaster and terrazzo", "Sunlit color wash", "#d16b43"],
  ["spanish-art-gallery", "Spanish Art Gallery", "Dramatic and precise", "Shadowed vaulted rooms opening to a bright patio", "lime plaster and dark stone", "High-contrast side light", "#a74632"],
  ["french-art-salon", "French Art Salon", "Collected and conversational", "Contemporary salon proportions with shallow arches", "linen wall panels and parquet", "Diffuse chandelier glow", "#9a879a"],
  ["asian-inspired-gallery", "Asian-Inspired Art Gallery", "Quiet and spacious", "Timber screens frame a sequence of garden views", "white oak and river stone", "Filtered morning light", "#8b9c7e"],
  ["american-art-gallery", "American Art Gallery", "Open and plural", "Daylit loft rooms connected by broad ramps", "reclaimed maple and steel", "Balanced gallery wash", "#879bb4"],
  ["southwest-art-gallery", "Southwest Art Gallery", "Earthen and luminous", "Thick curved walls around a desert light court", "rammed earth and clay tile", "Amber skylight", "#bd7852"],
  ["landscape-gallery", "Landscape Gallery", "Restorative and panoramic", "Low horizontal pavilion facing a planted horizon", "green stone and oak", "Seasonal daylight", "#73907a"],
  ["wildlife-animal-gallery", "Wildlife & Animal Gallery", "Observant and alive", "Branching timber structure with habitat alcoves", "cork and dark timber", "Canopy-filtered light", "#7d6f4e"],
  ["sculpture-court", "Sculpture Court", "Tactile and ceremonial", "Open-air court with ramps and shallow water", "basalt and pale concrete", "Moving natural sun", "#817d75"],
  ["glass-light-pavilion", "Glass & Light Pavilion", "Prismatic and weightless", "Faceted glass pavilion suspended above water", "structural glass and white steel", "Refracted spectrum light", "#7fbac4"],
  ["water-kinetic-hall", "Water & Kinetic Art Hall", "Rhythmic and meditative", "Linear hall crossed by narrow water channels", "black granite and stainless steel", "Glints and reflected light", "#507d91"],
  ["works-on-paper-room", "Drawings & Works on Paper", "Close and scholarly", "Cabinet gallery with pull-out study tables", "felt, maple, and parchment plaster", "Low-UV task light", "#a5957f"],
  ["watercolor-gallery", "Watercolor Gallery", "Airy and spontaneous", "Small daylit rooms around a mist garden", "pale plaster and birch", "Soft cloud light", "#9fb8bd"],
  ["oil-painting-gallery", "Oil Painting Gallery", "Rich and immersive", "Deep-walled rooms with framed axial views", "deep green fabric and oak", "Focused warm pools", "#526451"],
  ["acrylic-gallery", "Acrylic Gallery", "Crisp and chromatic", "White volumes punctured by colored portals", "resin floor and acoustic plaster", "Even luminous ceiling", "#ce694f"],
  ["gold-leaf-mixed-media", "Gold Leaf & Mixed Media", "Textural and restrained", "Dark mineral rooms with individual viewing niches", "charred wood and bronze", "Grazing pin light", "#a88a52"],
  ["women-in-art-gallery", "Women in Art Gallery", "Expansive and incisive", "Interlocking galleries arranged around a reading room", "rose stone and ash", "Warm diffuse daylight", "#a7727e"],
  ["emerging-visions", "Emerging Visions Gallery", "Experimental and changeable", "Modular walls beneath an exposed services canopy", "recycled panels and rubber", "Programmable neutral light", "#7e8ea8"],
  ["digital-generative-gallery", "Digital & Generative Gallery", "Responsive and atmospheric", "Black-box bays around a luminous circulation spine", "acoustic felt and matte steel", "Screen-responsive ambient light", "#685fa1"],
  ["immersive-chamber", "Immersive Chamber", "Enveloping and dreamlike", "Circular projection room with a continuous floor", "seamless resin and acoustic textile", "360-degree projection", "#405a70"],
  ["collectors-library", "Collector’s Library", "Private and learned", "Double-height library with fireside study bays", "walnut, leather, and green stone", "Library lamps and soft daylight", "#6e5b48"],
  ["private-viewing-vault", "Private Viewing Vault", "Secure and serene", "Subterranean oval gallery behind bronze doors", "limestone, felt, and bronze", "Conservation-grade spots", "#645f59"],
  ["hospitality-commercial", "Hospitality & Commercial Collection", "Polished and adaptable", "Full-scale room mockups connected by material galleries", "stone, textile, and timber", "Scenario-adjustable light", "#8e7565"],
  ["seasonal-exhibition-hall", "Seasonal Exhibition Hall", "Transformative and theatrical", "Column-free hall with movable overhead gantries", "polished concrete and fabric scrims", "Curator-programmable light", "#8c665b"],
] as const;

const roomDefinitions: RoomDefinition[] = roomSeeds.map((room, index) => ({
  id: `room-${String(index + 1).padStart(2, "0")}`,
  slug: room[0],
  name: room[1],
  atmosphere: room[2],
  architecture: room[3],
  material: room[4],
  lighting: room[5],
  accent: room[6],
  description: `${room[1]} is a ${room[2].toLowerCase()} setting. ${room[3]}, finished in ${room[4]}, supports an intentionally varied rotation of work.`,
}));

export const collections = [
  "Soft Monuments", "Weather of Memory", "Current / Countercurrent", "Shared Horizons", "Material Intelligence",
  "The Human Scale", "After the Garden", "Cities in Suspension", "Quiet Machines", "New Cartographies",
  "Chromatic Kinship", "Domestic Cosmos", "Edge of Water", "Hand / System", "Unfinished Futures",
].map((name, index) => ({
  id: `collection-${String(index + 1).padStart(2, "0")}`,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  statement: `A cross-medium AURELIS selection considering ${name.toLowerCase()} through original, AI-assisted studio practice.`,
  featured: index < 5,
}));

export const exhibitions = [
  ["Breathing Structures", "Architecture, bodies, and the space between"],
  ["Tidal Instruments", "Works shaped by water, rhythm, and time"],
  ["Portraits of the Near Future", "Contemporary identity without prediction clichés"],
  ["A Field Has Many Centers", "Landscape beyond the single viewpoint"],
  ["Useful Light", "Glass, projection, and optical memory"],
  ["Soft Power / Hard Material", "Textile gestures against industrial form"],
  ["The Unfinished City", "Civic space, repair, and imagined commons"],
  ["Botanical Signals", "Plant intelligence across paper, fiber, and code"],
  ["Night Is Not One Color", "Nocturnes beyond black and gold"],
  ["Small Acts, Monumental Scale", "Everyday gestures given room to resonate"],
].map(([name, subtitle], index) => ({
  id: `exhibition-${String(index + 1).padStart(2, "0")}`,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  subtitle,
  status: index < 3 ? "current" : index < 6 ? "upcoming" : "archive",
  roomIds: [roomDefinitions[index % 30].id, roomDefinitions[(index + 7) % 30].id],
  artworkIds: [] as string[],
}));

const subjects = [
  "intergenerational breakfast", "rain crossing a civic plaza", "high desert geology", "migrating shorebirds", "night-blooming garden",
  "ferry commuters", "glasshouse botanicals", "restored wetland", "street musicians at noon", "quiet factory machinery",
  "coastal apartment interior", "children building a kite", "mountain weather station", "coral restoration lab", "elder reading by a window",
  "kinetic paper forms", "ceramic vessels in conversation", "subway reflections", "orchard after harvest", "speculative water archive",
];
const mediums = ["oil on linen", "watercolor and graphite", "layered acrylic", "archival pigment print", "woven textile", "ceramic relief", "brushed steel", "kiln-formed glass", "charcoal on paper", "generative digital edition", "encaustic collage", "carved wood"];
const categories = ["Figurative", "Cityscape", "Landscape", "Wildlife", "Botanical", "Cultural", "Architectural", "Abstract", "Still Life", "Digital", "Sculpture", "Drawing"];
const regions = ["West Africa", "Caribbean", "Andean", "Mediterranean", "East Asian", "South Asian", "Middle Eastern", "Northern European", "North American", "Global Contemporary"];
const palettes = [
  ["ultramarine", "clay", "warm white"], ["sage", "apricot", "graphite"], ["cobalt", "sand", "coral"], ["plum", "sky", "ochre"],
  ["sea glass", "rust", "chalk"], ["marigold", "midnight", "leaf"], ["violet", "ice blue", "umber"], ["vermillion", "aqua", "smoke"],
  ["indigo", "citron", "terracotta"], ["pearl", "lake blue", "oxide"],
];
const moods = ["contemplative", "joyful", "restorative", "curious", "resolute", "tender", "electric", "hushed", "expansive", "playful"];
const titleFirst = ["Threshold", "Drift", "Common", "Field", "Archive", "Afterlight", "Interval", "Assembly", "Weather", "Signal"];
const titleLast = ["for Morning", "in Blue Distance", "with Open Windows", "of Small Motions", "Before Rain", "at the Waterline", "Without a Center", "in Shared Air", "for Returning", "Under Soft Machines"];
const imageIds = [
  "1549490349-8643362247b5", "1541701494587-cb58502866ab", "1577083552431-6e5fd01aa342", "1579783902614-a3fb3927b6a5", "1561214115-f2f134cc4912",
  "1536924940846-227afb31e2a5", "1515405295579-ba7b45403062", "1547891654-e66ed7ebb968", "1578301978018-3005759f48f7", "1541961017774-22349e4a1262",
];

export const artworks: Artwork[] = Array.from({ length: 100 }, (_, index) => {
  const artist = artists[index % artists.length];
  const room = roomDefinitions[(index * 7) % roomDefinitions.length];
  const collection = collections[(index * 4 + Math.floor(index / 10)) % collections.length];
  const subject = subjects[(index * 3 + Math.floor(index / 7)) % subjects.length];
  const medium = mediums[(index * 5 + Math.floor(index / 12)) % mediums.length];
  const palette = palettes[(index * 7) % palettes.length];
  const orientation = (["portrait", "landscape", "square"] as const)[index % 3];
  const title = `${titleFirst[index % titleFirst.length]} ${titleLast[(index * 3 + Math.floor(index / 10)) % titleLast.length]} ${String(index + 1).padStart(2, "0")}`;
  const imageId = imageIds[(index * 3) % imageIds.length];
  return {
    id: `art-${String(index + 1).padStart(3, "0")}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    title,
    artistId: artist.id,
    artist: artist.name,
    collection: collection.name,
    room: room.name,
    medium,
    category: categories[index % categories.length],
    region: regions[(index * 3) % regions.length],
    palette,
    mood: moods[(index * 7) % moods.length],
    orientation,
    dimensions: orientation === "portrait" ? "30 × 42 in" : orientation === "landscape" ? "48 × 32 in" : "36 × 36 in",
    priceCents: 72000 + ((index * 13700) % 728000),
    image: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=1400&q=82&sat=${(index % 5) - 2}`,
    description: `An original ${medium} study of ${subject}, balancing ${palette.join(", ")} with a ${moods[(index * 7) % moods.length]} visual cadence.`,
    curatorialStatement: `Rather than treating ${subject} as a fixed symbol, ${artist.name} uses scale, surface, and deliberate negative space to invite a slower reading.`,
    provenance: DEMO_PROVENANCE,
    tags: [subject, medium, categories[index % categories.length], regions[(index * 3) % regions.length], ...palette],
    featured: index % 11 === 0,
    living: index < 25,
    livingDuration: index < 25 ? 8 + (index % 5) * 3 : undefined,
    video: index < 25 ? "https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4" : undefined,
    commercialLicense: index % 4 !== 0,
    available: index % 17 !== 0,
  };
});

export const galleryRooms: GalleryRoom[] = roomDefinitions.map((room) => ({
  ...room,
  artworkIds: artworks.filter((artwork) => artwork.room === room.name).map((artwork) => artwork.id),
}));

for (const [index, exhibition] of exhibitions.entries()) {
  exhibition.artworkIds = artworks.slice(index * 8, index * 8 + 12).map((artwork) => artwork.id);
}

export const livingArtworks = artworks.slice(0, 25).map((artwork, index) => ({
  id: `living-${String(index + 1).padStart(2, "0")}`,
  artworkId: artwork.id,
  staticImage: artwork.image,
  posterImage: artwork.image,
  videoSource: "https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4",
  provider: "simulated-motion",
  durationSeconds: artwork.livingDuration ?? 12,
  aspectRatio: artwork.orientation === "portrait" ? "5:7" : artwork.orientation === "landscape" ? "3:2" : "1:1",
  hasAudio: false,
  loop: true,
  motionPrompt: ["restrained atmospheric movement", "slow parallax and natural light", "subtle material response", "quiet environmental motion"][index % 4],
  safetyStatus: "passed",
  approvalStatus: "approved-demo",
  generationCostCents: 0,
  createdAt: new Date(Date.UTC(2026, 6, 1 + index)).toISOString(),
}));

const residentialEnvironments = ["Living room", "Formal living room", "Bedroom", "Primary suite", "Dining room", "Kitchen", "Powder room", "Entryway", "Hallway", "Staircase", "Home office", "Library", "Nursery", "Loft", "Penthouse", "Modern estate", "Traditional estate", "Minimalist house", "Industrial loft", "Coastal home", "Southwest home"];
const commercialEnvironments = ["Executive office", "Corporate lobby", "Conference room", "Bank", "Hotel lobby", "Hotel suite", "Restaurant", "Private dining room", "Luxury retail store", "Technology office", "Healthcare lobby", "Wellness center", "Spa", "Law office", "University", "Gallery", "Airport lounge", "Model home", "Library"];

export const environments = [...residentialEnvironments, ...commercialEnvironments].map((name, index) => ({
  id: `environment-${String(index + 1).padStart(2, "0")}`,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  type: index < residentialEnvironments.length ? "residential" : "commercial",
  wallColors: index % 3 === 0 ? ["warm white", "deep olive", "clay"] : index % 3 === 1 ? ["limestone", "soft grey", "ink"] : ["plaster", "dusty blue", "umber"],
  flooring: ["wide-plank oak", "terrazzo", "limestone", "wool carpet"][index % 4],
  lighting: ["daylight", "gallery spots", "evening ambient", "soft indirect"][index % 4],
  perspectiveProfile: `simulated-${index % 5}`,
}));

export const trends = [
  ["Global art sales recovery", "Art Basel / UBS 2026", 0.94, 0.61, "Global Contemporary", "https://www.artbasel.com/stories/the-art-basel-and-ubs-global-art-market-report-2026?lang=en", "2025 global sales reported up 4% to $59.6B; direction is market context, not a demand guarantee."],
  ["Online discovery remains an entry point", "Art Basel / UBS 2026", 0.91, 0.57, "Digital", "https://www.artbasel.com/stories/the-art-basel-and-ubs-global-art-market-report-2026?lang=en", "Online sales reported at $9.2B and 15% share; useful for new-buyer experience design."],
  ["Collectors seek emerging work", "Artsy collector survey 2025", 0.84, 0.69, "Emerging", "https://www.artsy.net/article/artsy-editorial-art-market-trends-2025", "Survey reports 72% drawn to emerging art; platform audience may differ."],
  ["Accessible price points", "Artsy collector survey 2025", 0.83, 0.66, "Works on paper", "https://www.artsy.net/article/artsy-editorial-art-market-trends-2025", "Survey reports 61% typically consider work under $5,000; do not race pricing below sustainable margins."],
  ["Wall-art and gallery-print interest", "Etsy Spring / Summer 2026", 0.76, 0.78, "Print", "https://www.etsy.com/seller-handbook/article/1473931456647", "Reported search lifts include wall art decor +110% and gallery prints +80%; use lifestyle mockups and clear sizing."],
  ["Abstract art search momentum", "Etsy Spring / Summer 2026", 0.72, 0.62, "Abstract", "https://www.etsy.com/seller-handbook/article/1473931456647", "Reported abstract-art search lift of 38%; copying popular compositions remains prohibited."],
  ["Cool Blue", "Pinterest Predicts 2026", 0.67, 0.63, "Color", "https://business.pinterest.com/en-gb/pinterest-predicts/about/", "A palette signal, not a requirement; preserve catalog diversity."],
  ["Afrohemian Decor", "Pinterest Predicts 2026", 0.65, 0.71, "Interior placement", "https://business.pinterest.com/en-gb/pinterest-predicts/about/", "Reported +220%; cultural review is mandatory and stereotypes or extractive trend-copying are prohibited."],
].map(([name, source, confidence, momentum, category, evidenceLink, note], index) => ({
  id: `trend-${index + 1}`,
  name,
  source,
  observedAt: new Date(Date.UTC(2026, 6, 25 + index)).toISOString(),
  confidence,
  momentum,
  suggestedCategory: category,
  suggestedCollection: collections[(index + 4) % collections.length].name,
  riskNotes: `${note} Directional signal only; do not equate popularity with artistic quality.`,
  evidenceLinks: [evidenceLink as string],
  researchedAt: "2026-08-04T00:00:00.000Z",
  reviewStatus: index < 2 ? "reviewed" : "pending",
}));

export const guides: Guide[] = ["Seraphina Vale", "Cultural Intelligence", "Market Intelligence", "Creative Director", "Studio Production", "Motion Atelier", "Curatorial", "Rights & Provenance", "Gallery Experience", "Collector Relations", "Growth & Marketing", "Commerce", "Fulfillment", "Customer Care", "Finance & Compliance"].map((name, index) => ({
  id: `guide-${String(index + 1).padStart(2, "0")}`,
  name,
  role: index === 0 ? "Wisdom Guide" : "Knowledge Guide",
  status: index % 5 === 4 ? "waiting" : index % 3 === 0 ? "reviewing" : "working",
  currentTask: ["Reviewing collection diversity", "Inspecting source permissions", "Evaluating motion restraint", "Preparing a human approval", "Monitoring demo operations"][index % 5],
  score: 86 + (index % 11),
}));

export const campaigns = [
  { id: "campaign-01", name: "Living Art, Quietly Alive", channel: "Instagram", status: "draft", dailyBudgetCents: 0, goal: "Exhibition discovery", requiresApproval: false },
  { id: "campaign-02", name: "A Field Has Many Centers", channel: "YouTube", status: "awaiting_approval", dailyBudgetCents: 12500, goal: "Guided-tour reservations", requiresApproval: true },
  { id: "campaign-03", name: "The Collector’s Room", channel: "Email", status: "approved_organic", dailyBudgetCents: 0, goal: "Membership conversion", requiresApproval: false },
  { id: "campaign-04", name: "Hospitality Light Editions", channel: "LinkedIn", status: "draft", dailyBudgetCents: 0, goal: "Institutional leads", requiresApproval: false },
];

export const approvals = [
  { id: "approval-01", type: "CAMPAIGN_BUDGET", title: "YouTube exhibition launch — $125/day", status: "PENDING", risk: "financial", requestedBy: "Growth & Marketing", createdAt: "2026-08-04T18:20:00.000Z" },
  { id: "approval-02", type: "NEW_PROVIDER", title: "Evaluate motion provider sandbox", status: "PENDING", risk: "vendor", requestedBy: "Motion Atelier", createdAt: "2026-08-04T17:10:00.000Z" },
  { id: "approval-03", type: "PUBLIC_STATEMENT", title: "Publish exhibition provenance explainer", status: "APPROVED", risk: "reputation", requestedBy: "Rights & Provenance", createdAt: "2026-08-03T21:05:00.000Z" },
  { id: "approval-04", type: "ROUTINE_GENERATION", title: "Generate four low-cost paper studies", status: "AUTO_APPROVED", risk: "low", requestedBy: "Studio Production", createdAt: "2026-08-04T16:40:00.000Z" },
  { id: "approval-05", type: "REFUND", title: "Refund request above $500 threshold", status: "PENDING", risk: "financial", requestedBy: "Customer Care", createdAt: "2026-08-04T15:22:00.000Z" },
];

export function getArtwork(slugOrId: string) {
  return artworks.find((artwork) => artwork.slug === slugOrId || artwork.id === slugOrId);
}

export function getArtist(slugOrId: string) {
  return artists.find((artist) => artist.slug === slugOrId || artist.id === slugOrId);
}

export function getRoom(slugOrId: string) {
  return galleryRooms.find((room) => room.slug === slugOrId || room.id === slugOrId);
}

export function searchArtworks(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return artworks;
  return artworks.filter((artwork) => [artwork.title, artwork.artist, artwork.collection, artwork.room, artwork.medium, artwork.category, artwork.region, artwork.mood, ...artwork.tags].some((value) => value.toLowerCase().includes(normalized)));
}
