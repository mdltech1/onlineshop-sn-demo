"use client";

import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react";
import { media } from "@/data/media";
import { useShop } from "@/context/shop";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  const { setFilter } = useShop();

  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <div className="relative flex min-h-[460px] items-end overflow-hidden rounded-2xl bg-charcoal p-6 md:min-h-[580px] md:p-14">
          <Image src={media.finalCta.src} alt={media.finalCta.alt} fill sizes="(min-width: 1400px) 1340px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/25" />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="display text-[46px] leading-[0.95] text-ivory md:text-8xl">
              Trouvez votre prochain look.
            </h2>
            <p className="mt-5 max-w-[40ch] text-ivory/85 md:text-lg">
              Découvrez nos pièces et contactez-nous directement pour commander.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#boutique" onClick={() => setFilter("tout")} className={buttonClasses({ variant: "light", size: "lg" })}>
                Découvrir la boutique
              </Link>
              <a
                href={whatsappLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "ghostLight", size: "lg" })}
              >
                <WhatsappLogo size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
