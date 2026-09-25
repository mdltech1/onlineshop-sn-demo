"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { media, type Media } from "@/data/media";
import { useShop, type Filter } from "@/context/shop";
import { Reveal } from "@/components/ui/Reveal";

const categories: { label: string; filter: Filter; image: Media }[] = [
  { label: "Homme", filter: "homme", image: media.categories.homme },
  { label: "Femme", filter: "femme", image: media.categories.femme },
  { label: "Nouveautés", filter: "nouveautes", image: media.categories.nouveautes },
  { label: "Sélection du moment", filter: "tout", image: media.categories.selection },
];

export function Categories() {
  const { setFilter } = useShop();

  return (
    <section aria-labelledby="categories-title" className="py-14 md:py-24">
      <Reveal className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 id="categories-title" className="display text-4xl leading-[1] md:text-6xl">
          Explorez la boutique
        </h2>
      </Reveal>

      {/* Mobile : défilement horizontal type stories. Desktop : 4 colonnes décalées. */}
      <ul className="no-scrollbar mx-auto mt-7 flex max-w-[1400px] snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 md:mt-12 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-8">
        {categories.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i * 70} className={`w-[64vw] shrink-0 snap-start sm:w-[44vw] md:w-auto ${i % 2 === 1 ? "md:mt-12" : ""}`}>
            <Link href="/#boutique" onClick={() => setFilter(c.filter)} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 768px) 24vw, 64vw"
                  className="object-cover transition-transform duration-[1300ms] ease-out-soft group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 md:mt-4">
                <h3 className="display text-xl leading-tight md:text-2xl">{c.label}</h3>
                <span className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-ink/20 px-3.5 text-[13px] font-medium transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                  Découvrir
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
