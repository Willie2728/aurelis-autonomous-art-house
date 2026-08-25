export type ApprovalStatus = "AUTO_APPROVED" | "PENDING" | "APPROVED" | "REJECTED";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  artist: string;
  collection: string;
  room: string;
  medium: string;
  category: string;
  region: string;
  palette: string[];
  mood: string;
  orientation: "portrait" | "landscape" | "square";
  dimensions: string;
  priceCents: number;
  image: string;
  description: string;
  curatorialStatement: string;
  provenance: string;
  tags: string[];
  featured: boolean;
  living: boolean;
  livingDuration?: number;
  video?: string;
  commercialLicense: boolean;
  available: boolean;
};

export type ArtistIdentity = {
  id: string;
  slug: string;
  name: string;
  region: string;
  medium: string;
  philosophy: string;
  biography: string;
  palette: string;
  subject: string;
};

export type GalleryRoom = {
  id: string;
  slug: string;
  name: string;
  atmosphere: string;
  architecture: string;
  material: string;
  lighting: string;
  accent: string;
  description: string;
  artworkIds: string[];
};

export type Guide = {
  id: string;
  name: string;
  role: string;
  status: "working" | "reviewing" | "waiting" | "paused";
  currentTask: string;
  score: number;
};
