"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlass, Minus, Plus, ShoppingBag, Trash, WhatsappLogo, X } from "@phosphor-icons/react";
import { navigation, site } from "@/config/site";
import { categoryLabel, products } from "@/data/products";
import { useShop, type Filter } from "@/context/shop";
import { Sheet } from "@/components/ui/Sheet";
import { buttonClasses } from "@/components/ui/Button";
import { ProductDetail } from "@/components/product/ProductDetail";
import { formatPrice } from "@/lib/format";
import { generalMessage, selectionMessage, whatsappLink } from "@/lib/whatsapp";

function CloseButton({ onClick, label = "Fermer" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper"
    >
      <X size={22} weight="light" />
    </button>
  );
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function ShopOverlays() {
  const { panel, closePanel } = useShop();
  return (
    <>
      <ProductSheet open={panel === "product"} onClose={closePanel} />
      <CartSheet open={panel === "cart"} onClose={closePanel} />
      <SearchSheet open={panel === "search"} onClose={closePanel} />
      <MenuSheet open={panel === "menu"} onClose={closePanel} />
    </>
  );
}

function ProductSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { activeProduct } = useShop();
  if (!activeProduct) return null;
  return (
    <Sheet open={open} onClose={onClose} label={activeProduct.name}>
      <div className="sheet-panel relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl bg-ivory p-4 pb-8 md:max-h-[88dvh] md:max-w-5xl md:rounded-2xl md:p-8">
        <div className="sticky top-0 z-10 -mb-12 flex justify-end">
          <span className="rounded-full bg-ivory/90 backdrop-blur">
            <CloseButton onClick={onClose} />
          </span>
        </div>
        <ProductDetail product={activeProduct} context="modal" />
      </div>
    </Sheet>
  );
}

function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQty, removeLine, setFilter } = useShop();
  const total = cart.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <Sheet open={open} onClose={onClose} label="Ma sélection" side="right">
      <div className="sheet-panel flex h-full w-full flex-col bg-ivory md:max-w-[440px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-7">
          <h2 className="text-base font-medium">Ma sélection</h2>
          <CloseButton onClick={onClose} />
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-7">
            <ShoppingBag size={36} weight="thin" className="text-muted" />
            <p className="display text-3xl leading-tight">Votre sélection est vide.</p>
            <p className="max-w-[34ch] text-muted">
              Ajoutez les articles qui vous plaisent, puis envoyez toute votre sélection en un seul message WhatsApp.
            </p>
            <Link
              href="/#boutique"
              onClick={() => {
                setFilter("tout" as Filter);
                onClose();
              }}
              className={buttonClasses({ variant: "outline", className: "mt-2" })}
            >
              Parcourir la boutique
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 md:px-7">
              {cart.map((line, i) => (
                <li key={`${line.product.id}-${line.size}-${line.color}`} className="flex gap-4 py-5">
                  <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl bg-paper">
                    <Image src={line.product.images[0].src} alt={line.product.images[0].alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium leading-snug">{line.product.name}</p>
                      <button
                        type="button"
                        onClick={() => removeLine(i)}
                        aria-label={`Retirer ${line.product.name}`}
                        className="-mr-2 -mt-1.5 inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-ink"
                      >
                        <Trash size={17} weight="light" />
                      </button>
                    </div>
                    <p className="text-[13px] text-muted">
                      {[line.size && `Taille ${line.size}`, line.color].filter(Boolean).join(" / ") || "Taille et couleur à préciser"}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          aria-label="Diminuer la quantité"
                          onClick={() => updateQty(i, line.qty - 1)}
                          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-paper"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Augmenter la quantité"
                          onClick={() => updateQty(i, line.qty + 1)}
                          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-paper"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm tabular-nums">{formatPrice(line.product.price * line.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line bg-paper/60 px-5 py-5 md:px-7">
              <div className="flex items-baseline justify-between">
                <p className="text-sm text-muted">Total indicatif, à confirmer</p>
                <p className="text-lg font-medium tabular-nums">{formatPrice(total)}</p>
              </div>
              <a
                href={whatsappLink(selectionMessage(cart))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "accent", size: "lg", className: "mt-4 w-full" })}
              >
                <WhatsappLogo size={20} />
                Envoyer ma sélection sur WhatsApp
              </a>
              <details className="group mt-3 text-[13px] text-muted">
                <summary className="cursor-pointer list-none text-center underline decoration-ink/20 underline-offset-4 hover:text-ink">
                  Voir le message qui sera envoyé
                </summary>
                <p className="mt-3 whitespace-pre-line rounded-xl bg-ivory p-4 text-ink/85">{selectionMessage(cart)}</p>
              </details>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}

function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { openProduct } = useShop();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return products.slice(0, 4);
    return products.filter((p) => normalize(`${p.name} ${p.type} ${categoryLabel[p.category]}`).includes(q));
  }, [query]);

  return (
    <Sheet open={open} onClose={onClose} label="Rechercher" side="top">
      <div className="sheet-panel max-h-[100dvh] w-full overflow-y-auto bg-ivory md:max-h-[80dvh]">
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-4 md:px-8 md:pt-6">
          <div className="flex items-center justify-between">
            <label htmlFor="search" className="text-[13px] font-medium">
              Rechercher un article
            </label>
            <CloseButton onClick={onClose} />
          </div>
          <div className="relative mt-2">
            <MagnifyingGlass size={20} weight="light" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="search"
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ensemble, chemise, robe..."
              className="h-14 w-full rounded-full border border-line bg-white/60 pl-13 pr-5 text-base outline-none transition-colors placeholder:text-muted/80 focus:border-ink"
            />
          </div>

          <p className="mt-7 text-[13px] text-muted">{query.trim() ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : "Suggestions"}</p>

          {results.length === 0 ? (
            <p className="mt-4 text-muted">
              Aucun article ne correspond à « {query.trim()} ». Essayez ensemble, chemise ou robe.
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
              {results.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => openProduct(p)} className="group block w-full text-left">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
                      <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width: 640px) 180px, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                    <p className="mt-2 text-sm font-medium">{p.name}</p>
                    <p className="text-sm tabular-nums text-muted">{formatPrice(p.price)}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Sheet>
  );
}

function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setFilter } = useShop();
  return (
    <Sheet open={open} onClose={onClose} label="Menu" side="left">
      <div className="sheet-panel flex h-full w-full flex-col bg-ivory px-4 pb-8 pt-3 sm:max-w-sm">
        <div className="flex items-center justify-between">
          <span className="display text-[17px] font-bold">{site.logoText}</span>
          <CloseButton onClick={onClose} label="Fermer le menu" />
        </div>
        <nav aria-label="Menu mobile" className="mt-10">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if ("filter" in item) setFilter(item.filter as Filter);
                    onClose();
                  }}
                  className="display block py-2 text-[34px] leading-tight transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "accent", size: "lg", className: "w-full" })}
          >
            <WhatsappLogo size={20} />
            Commander sur WhatsApp
          </a>
          <p className="text-sm text-muted">{site.tagline}</p>
        </div>
      </div>
    </Sheet>
  );
}
