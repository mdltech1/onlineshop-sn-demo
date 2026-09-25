"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { categoryLabel, weeklyPicks, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/context/shop";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NewBadge } from "@/components/product/ProductCard";

function Info({ product }: { product: Product }) {
  return (
    <>
      <p className="text-[13px] text-muted">
        {categoryLabel[product.category]} / {product.type}
      </p>
      <p className="display mt-1 text-2xl leading-tight md:text-3xl">{product.name}</p>
      <p className="mt-1 font-semibold tabular-nums">{formatPrice(product.price)}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium underline decoration-ink/25 underline-offset-[5px] transition-colors group-hover:text-accent group-hover:decoration-accent">
        Voir le produit
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </>
  );
}

export function WeeklyPicks() {
  const { openProduct, setFilter } = useShop();
  const [main, ...rest] = weeklyPicks;
  if (!main) return null;

  return (
    <section aria-labelledby="weekly-title" className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-24">
      <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 id="weekly-title" className="display text-4xl leading-[1] md:text-6xl">
          Nouveautés de la semaine
        </h2>
        <Link
          href="/#boutique"
          onClick={() => setFilter("tout")}
          className={buttonClasses({ variant: "outline", className: "self-start md:self-auto" })}
        >
          Voir toute la collection
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-12 lg:gap-8">
        {/* Pièce principale */}
        <Reveal className="lg:col-span-7">
          <button type="button" onClick={() => openProduct(main)} className="group block w-full text-left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper md:aspect-[5/4] lg:aspect-[6/5]">
              <Image
                src={main.images[0].src}
                alt={main.images[0].alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover transition-transform duration-[1300ms] ease-out-soft group-hover:scale-[1.03]"
              />
              <NewBadge className="absolute left-3 top-3" />
            </div>
            <div className="mt-4">
              <Info product={main} />
            </div>
          </button>
        </Reveal>

        {/* Deux pièces secondaires, en format horizontal */}
        <div className="flex flex-col gap-6 lg:col-span-5 lg:justify-between">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={100 + i * 90}>
              <button type="button" onClick={() => openProduct(p)} className="group grid w-full grid-cols-[42%_1fr] items-center gap-5 lg:grid-cols-[55%_1fr] text-left">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 42vw"
                    className="object-cover transition-transform duration-[1300ms] ease-out-soft group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <Info product={p} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
