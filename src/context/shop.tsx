"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/products";
import type { SelectionLine as CartLine } from "@/lib/whatsapp";

export type Filter = "tout" | "homme" | "femme" | "nouveautes";
export type Sort = "pertinence" | "prix-asc" | "prix-desc";
export type Panel = "product" | "cart" | "search" | "menu" | null;

type StoredLine = { id: string; size?: string; color?: string; qty: number };

type ShopState = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  sort: Sort;
  setSort: (s: Sort) => void;
  panel: Panel;
  openPanel: (p: Exclude<Panel, null>) => void;
  closePanel: () => void;
  activeProduct: Product | null;
  openProduct: (p: Product) => void;
  cart: CartLine[];
  cartCount: number;
  addToCart: (line: Omit<CartLine, "qty">) => void;
  updateQty: (index: number, qty: number) => void;
  removeLine: (index: number) => void;
};

const ShopContext = createContext<ShopState | null>(null);
const STORAGE_KEY = "osn-selection";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("tout");
  const [sort, setSort] = useState<Sort>("pertinence");
  const [panel, setPanel] = useState<Panel>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Sélection conservée dans le navigateur (confort uniquement, jamais bloquant).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredLine[];
        const lines = stored.flatMap((s) => {
          const product = getProduct(s.id);
          return product ? [{ product, size: s.size, color: s.color, qty: s.qty }] : [];
        });
        setCart(lines);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const stored: StoredLine[] = cart.map(({ product, size, color, qty }) => ({ id: product.id, size, color, qty }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {}
  }, [cart, hydrated]);

  const openPanel = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const closePanel = useCallback(() => setPanel(null), []);
  const openProduct = useCallback((p: Product) => {
    setActiveProduct(p);
    setPanel("product");
  }, []);

  const addToCart = useCallback((line: Omit<CartLine, "qty">) => {
    setCart((prev) => {
      const i = prev.findIndex(
        (l) => l.product.id === line.product.id && l.size === line.size && l.color === line.color,
      );
      if (i >= 0) return prev.map((l, j) => (j === i ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { ...line, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setCart((prev) => (qty <= 0 ? prev.filter((_, j) => j !== index) : prev.map((l, j) => (j === index ? { ...l, qty } : l))));
  }, []);

  const removeLine = useCallback((index: number) => setCart((prev) => prev.filter((_, j) => j !== index)), []);

  const value = useMemo<ShopState>(
    () => ({
      filter,
      setFilter,
      sort,
      setSort,
      panel,
      openPanel,
      closePanel,
      activeProduct,
      openProduct,
      cart,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      addToCart,
      updateQty,
      removeLine,
    }),
    [filter, sort, panel, openPanel, closePanel, activeProduct, openProduct, cart, addToCart, updateQty, removeLine],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop doit être utilisé dans <ShopProvider>");
  return ctx;
}
