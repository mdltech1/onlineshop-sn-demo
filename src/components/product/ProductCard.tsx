"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Plus } from "@phosphor-icons/react";
import { categoryLabel, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/context/shop";

export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-6 items-center rounded-full bg-ivory px-2.5 text-[11px] font-semibold text-ink ${className}`}>
      Nouveau
    </span>
  );
}

export function ProductCard({ product, sizes }: { product: Product; sizes?: string }) {
  const { openProduct, addToCart } = useShop();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  const cover = product.images[0];

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
        <button type="button" onClick={() => openProduct(product)} className="absolute inset-0" aria-label={`Voir le produit ${product.name}`}>
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={sizes ?? "(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"}
            className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
          />
        </button>
        {product.isNew && <NewBadge className="pointer-events-none absolute left-2.5 top-2.5 md:left-3 md:top-3" />}
        <button
          type="button"
          onClick={() => {
            addToCart({ product });
            setAdded(true);
          }}
          aria-label={`Ajouter ${product.name} à ma sélection`}
          className={`absolute bottom-2.5 right-2.5 inline-flex size-10 items-center justify-center rounded-full shadow-[0_6px_16px_-6px_rgb(20_19_17/0.4)] transition-[background-color,color,transform] duration-300 active:scale-95 md:bottom-3 md:right-3 md:size-11 ${
            added ? "bg-ink text-ivory" : "bg-ivory text-ink hover:bg-ink hover:text-ivory"
          }`}
        >
          {added ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>

      <button type="button" onClick={() => openProduct(product)} className="mt-3 flex w-full flex-col gap-0.5 text-left md:mt-4">
        <span className="text-[12px] text-muted md:text-[13px]">
          {categoryLabel[product.category]} / {product.type}
        </span>
        <span className="text-[15px] font-medium leading-snug md:text-base">{product.name}</span>
        <span className="text-[15px] font-semibold tabular-nums md:text-base">{formatPrice(product.price)}</span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/80 underline decoration-ink/25 underline-offset-[5px] transition-colors group-hover:text-accent group-hover:decoration-accent">
          Voir le produit
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {added ? `${product.name} ajouté à la sélection` : ""}
      </span>
    </article>
  );
}
