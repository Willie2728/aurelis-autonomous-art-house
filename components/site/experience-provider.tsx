"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Artwork } from "@/types";

type CartLine = { artwork: Artwork; quantity: number; material: string; size: string };
type ExperienceContextValue = {
  favorites: string[]; compare: string[]; cart: CartLine[]; recentlyViewed: string[];
  toggleFavorite: (id: string) => void; toggleCompare: (id: string) => void;
  addToCart: (artwork: Artwork, options?: Partial<Pick<CartLine, "material" | "size">>) => void;
  removeFromCart: (id: string) => void; updateQuantity: (id: string, quantity: number) => void;
  markViewed: (id: string) => void; clearCart: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);
const subscribeToHydration = () => () => undefined;

export function ExperienceProvider({ children }: { children: ReactNode }) {
  // Server and first hydration render stay deterministic; persisted browser state
  // becomes visible immediately after React has attached to the page.
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const readLocal = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") return fallback;
    try { return JSON.parse(window.localStorage.getItem(key) || "") as T; } catch { return fallback; }
  };
  const [favorites, setFavorites] = useState<string[]>(() => readLocal("aurelis:favorites", []));
  const [compare, setCompare] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>(() => readLocal("aurelis:cart", []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => readLocal("aurelis:recent", []));

  useEffect(() => { localStorage.setItem("aurelis:favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("aurelis:cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("aurelis:recent", JSON.stringify(recentlyViewed)); }, [recentlyViewed]);

  const value = useMemo<ExperienceContextValue>(() => ({
    favorites: hydrated ? favorites : [], compare, cart: hydrated ? cart : [], recentlyViewed: hydrated ? recentlyViewed : [],
    toggleFavorite: (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    toggleCompare: (id) => setCompare((items) => items.includes(id) ? items.filter((item) => item !== id) : items.length >= 3 ? [...items.slice(1), id] : [...items, id]),
    addToCart: (artwork, options) => setCart((lines) => {
      const existing = lines.find((line) => line.artwork.id === artwork.id);
      return existing ? lines.map((line) => line.artwork.id === artwork.id ? { ...line, quantity: line.quantity + 1 } : line) : [...lines, { artwork, quantity: 1, material: options?.material || "Museum canvas", size: options?.size || artwork.dimensions }];
    }),
    removeFromCart: (id) => setCart((lines) => lines.filter((line) => line.artwork.id !== id)),
    updateQuantity: (id, quantity) => setCart((lines) => quantity < 1 ? lines.filter((line) => line.artwork.id !== id) : lines.map((line) => line.artwork.id === id ? { ...line, quantity } : line)),
    markViewed: (id) => setRecentlyViewed((items) => [id, ...items.filter((item) => item !== id)].slice(0, 6)),
    clearCart: () => setCart([]),
  }), [favorites, compare, cart, recentlyViewed, hydrated]);

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience must be used inside ExperienceProvider");
  return context;
}
