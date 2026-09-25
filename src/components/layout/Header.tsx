"use client";

import Link from "next/link";
import { List, MagnifyingGlass, ShoppingBag, WhatsappLogo } from "@phosphor-icons/react";
import { navigation } from "@/config/site";
import { useShop, type Filter } from "@/context/shop";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const iconBtn =
  "relative inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-paper";

export function Header() {
  const { openPanel, cartCount, setFilter } = useShop();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[68px] md:px-8 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <div className="flex items-center lg:hidden">
          <button type="button" className={`${iconBtn} -ml-2.5`} aria-label="Ouvrir le menu" onClick={() => openPanel("menu")}>
            <List size={24} weight="light" />
          </button>
        </div>
        <Logo className="justify-self-center lg:justify-self-start" />

        <nav aria-label="Navigation principale" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-7 text-[14px] text-ink/75">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => "filter" in item && setFilter(item.filter as Filter)}
                  className="py-2 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-0.5 md:gap-1">
          <button type="button" className={iconBtn} aria-label="Rechercher un article" onClick={() => openPanel("search")}>
            <MagnifyingGlass size={22} weight="light" />
          </button>
          <button
            type="button"
            className={`${iconBtn} -mr-2.5 lg:mr-0`}
            aria-label={`Ma sélection, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
            onClick={() => openPanel("cart")}
          >
            <ShoppingBag size={22} weight="light" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-ivory tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-medium text-ivory transition-colors duration-300 hover:bg-charcoal active:scale-[0.98] lg:inline-flex"
          >
            <WhatsappLogo size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
