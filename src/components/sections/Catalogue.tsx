"use client";

import { useMemo } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { useShop, type Filter, type Sort } from "@/context/shop";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

const filters: { id: Filter; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "homme", label: "Homme" },
  { id: "femme", label: "Femme" },
  { id: "nouveautes", label: "Nouveautés" },
];

const sorts: { id: Sort; label: string }[] = [
  { id: "pertinence", label: "Pertinence" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
];

function SortSelect({ id, className = "" }: { id: string; className?: string }) {
  const { sort, setSort } = useShop();
  return (
    <div className={`relative shrink-0 ${className}`}>
      <label htmlFor={id} className="mr-2 text-sm text-muted">
        Trier par
      </label>
      <select
        id={id}
        value={sort}
        onChange={(e) => setSort(e.target.value as Sort)}
        className="h-10 appearance-none rounded-full border border-line bg-ivory pl-4 pr-9 text-sm outline-none transition-colors hover:border-ink/40 focus:border-ink"
      >
        {sorts.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <CaretDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function Catalogue() {
  const { filter, setFilter, sort } = useShop();

  const visible = useMemo(() => {
    let list = products;
    if (filter === "homme" || filter === "femme") list = list.filter((p) => p.category === filter);
    if (filter === "nouveautes") list = list.filter((p) => p.isNew);
    if (sort === "prix-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  return (
    <section id="boutique" aria-labelledby="boutique-title" className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-24">
      <Reveal>
        <h2 id="boutique-title" className="display text-4xl leading-[1] md:text-6xl">
          Les pièces du moment
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted md:text-lg">
          Découvrez notre sélection et contactez-nous directement pour connaître les disponibilités.
        </p>
      </Reveal>

      {/* Barre de filtres : reste accessible pendant le défilement */}
      <div className="sticky top-16 z-20 -mx-4 mt-7 border-b border-line/70 bg-ivory/90 px-4 py-3 backdrop-blur-md md:top-[68px] md:mx-0 md:mt-10 md:px-0">
        <div className="flex items-center justify-between gap-3">
          <div role="group" aria-label="Filtrer" className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`h-10 shrink-0 rounded-full border px-4 text-sm transition-colors duration-300 ${
                    active ? "border-ink bg-ink text-ivory" : "border-line bg-ivory text-ink/80 hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <SortSelect id="tri" className="hidden md:block" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 md:mt-5">
        <p className="text-[13px] text-muted" aria-live="polite">
          {visible.length} article{visible.length > 1 ? "s" : ""}
        </p>
        <SortSelect id="tri-mobile" className="md:hidden" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-14 lg:grid-cols-4">
        {visible.map((product, i) => (
          <Reveal key={`${filter}-${sort}-${product.id}`} delay={(i % 4) * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      {site.demo.enabled && <p className="mt-12 text-[13px] text-muted">{site.demo.catalogueNote}</p>}
    </section>
  );
}
