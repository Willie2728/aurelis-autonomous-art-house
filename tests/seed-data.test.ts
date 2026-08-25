import { describe, expect, it } from "vitest";
import { artists, artworks, collections, environments, exhibitions, galleryRooms, livingArtworks } from "@/data";

describe("AURELIS seed catalog", () => {
  it("meets required catalog volumes", () => {
    expect(artworks).toHaveLength(100);
    expect(artists).toHaveLength(12);
    expect(galleryRooms).toHaveLength(30);
    expect(collections).toHaveLength(15);
    expect(exhibitions).toHaveLength(10);
    expect(livingArtworks).toHaveLength(25);
    expect(environments).toHaveLength(40);
  });

  it("uses unique stable identifiers and slugs", () => {
    expect(new Set(artworks.map((item) => item.id)).size).toBe(100);
    expect(new Set(artworks.map((item) => item.slug)).size).toBe(100);
    expect(new Set(galleryRooms.map((item) => item.slug)).size).toBe(30);
  });

  it("shows catalog diversity beyond a single luxury look", () => {
    expect(new Set(artworks.map((item) => item.medium)).size).toBeGreaterThanOrEqual(10);
    expect(new Set(artworks.map((item) => item.category)).size).toBeGreaterThanOrEqual(10);
    expect(new Set(artworks.map((item) => item.region)).size).toBeGreaterThanOrEqual(8);
    expect(new Set(artworks.map((item) => item.palette.join("|"))).size).toBeGreaterThanOrEqual(8);
    expect(artworks.filter((item) => item.tags.some((tag) => /wine glass|glamorous woman/i.test(tag))).length).toBe(0);
  });
});

