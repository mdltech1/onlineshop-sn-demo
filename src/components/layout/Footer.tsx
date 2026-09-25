"use client";

import Link from "next/link";
import { navigation, site } from "@/config/site";
import { useShop, type Filter } from "@/context/shop";
import { Logo } from "./Logo";

const footerLinks = navigation.filter((n) => n.label !== "Accueil");

export function Footer() {
  const { setFilter } = useShop();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-10 pt-14 md:grid-cols-12 md:px-8 md:pt-20">
        <div className="md:col-span-6">
          <Logo />
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Liens du pied de page" className="md:col-span-3">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => "filter" in item && setFilter(item.filter as Filter)}
                  className="text-ink/75 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-5 text-sm md:col-span-3 md:flex-col md:gap-2.5">
          {site.socials.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink/75 transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-line/70 px-4 py-6 text-[12px] text-muted md:flex-row md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} {site.name}</p>
        {site.demo.enabled && <p>{site.demo.credit}</p>}
      </div>
    </footer>
  );
}
