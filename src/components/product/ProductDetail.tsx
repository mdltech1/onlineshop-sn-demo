"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, WhatsappLogo } from "@phosphor-icons/react";
import { availabilityLabel, categoryLabel, type Availability, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { productMessage, whatsappLink } from "@/lib/whatsapp";
import { useShop } from "@/context/shop";
import { buttonClasses } from "@/components/ui/Button";
import { NewBadge } from "./ProductCard";

const availabilityDot: Record<Availability, string> = {
  en_stock: "bg-[#3f7a4f]",
  stock_limite: "bg-accent",
  sur_commande: "bg-muted",
};

function Gallery({ product, priority }: { product: Product; priority: boolean }) {
  const [index, setIndex] = useState(0);
  const current = product.images[index];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
        {product.images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={priority && i === 0}
            sizes="(min-width: 768px) 45vw, 100vw"
            className={`object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {product.isNew && <NewBadge className="absolute left-3 top-3" />}
        <span className="sr-only" aria-live="polite">
          {current.alt}
        </span>
      </div>
      {product.images.length > 1 && (
        <div className="mt-3 flex gap-2.5" role="group" aria-label="Galerie photos">
          {product.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-[4/5] w-16 overflow-hidden rounded-xl bg-paper ring-offset-2 ring-offset-ivory transition md:w-20 ${
                i === index ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product, context }: { product: Product; context: "modal" | "page" }) {
  const { addToCart } = useShop();
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>(product.colors.length === 1 ? product.colors[0].name : undefined);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

  const TitleTag = context === "page" ? "h1" : "h2";
  const orderLink = whatsappLink(productMessage(product, { size, color }));

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        <Gallery product={product} priority={context === "page"} />

        <div className="flex flex-col md:py-2">
          <p className="text-[13px] text-muted">
            {categoryLabel[product.category]} / {product.type}
          </p>
          <TitleTag className="display mt-2 text-4xl leading-[1] md:text-5xl">{product.name}</TitleTag>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xl font-semibold tabular-nums">{formatPrice(product.price)}</p>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <span className={`size-2 rounded-full ${availabilityDot[product.availability]}`} aria-hidden />
              {availabilityLabel[product.availability]}
            </p>
          </div>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">{product.description}</p>

          <fieldset className="mt-7">
            <legend className="text-[13px] font-medium">
              Couleur{color ? <span className="font-normal text-muted"> : {color}</span> : null}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.colors.map((c) => {
                const selected = color === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-pressed={selected}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    className={`flex size-10 items-center justify-center rounded-full border transition-colors ${selected ? "border-ink" : "border-line hover:border-ink/40"}`}
                  >
                    <span className="size-7 rounded-full ring-1 ring-ink/10" style={{ backgroundColor: c.hex }} />
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-[13px] font-medium">Taille</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const selected = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-12 rounded-full border px-4 text-sm transition-colors ${selected ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink/40"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-3">
            <a href={orderLink} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "accent", size: "lg", className: "w-full" })}>
              <WhatsappLogo size={20} />
              Commander sur WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                addToCart({ product, size, color });
                setAdded(true);
              }}
              className={buttonClasses({ variant: "outline", size: "lg", className: "w-full" })}
            >
              {added ? (
                <>
                  <Check size={18} /> Ajouté à ma sélection
                </>
              ) : (
                "Ajouter à ma sélection"
              )}
            </button>
            <p className="text-center text-[13px] text-muted" aria-live="polite">
              Pas de paiement en ligne : la boutique confirme la disponibilité sur WhatsApp.
            </p>
          </div>

          {context === "modal" && (
            <Link href={`/produit/${product.id}`} className="group mt-6 inline-flex items-center gap-2 self-start text-sm underline-offset-4 hover:underline">
              Voir la page produit
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Barre de commande toujours visible sur mobile */}
      <div
        className={`sticky z-10 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur md:hidden ${
          context === "modal" ? "-bottom-8 -mb-8" : "bottom-0"
        }`}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
        </div>
        <a href={orderLink} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "accent", className: "shrink-0" })}>
          <WhatsappLogo size={18} />
          Commander
        </a>
      </div>
    </>
  );
}
