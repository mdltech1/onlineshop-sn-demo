import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { media } from "@/data/media";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";

const rise = "animate-[rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]";

export function Hero() {
  const [a, b] = media.hero;

  return (
    <section id="accueil" className="mx-auto max-w-[1400px] px-4 pb-14 pt-3 md:px-8 md:pb-24 md:pt-6">
      <div className="grid gap-7 lg:min-h-[calc(100dvh-68px-3rem)] lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Visuels */}
        <div className="order-1 grid grid-cols-2 gap-2.5 md:gap-4 lg:order-2 lg:col-span-7">
          <div className="relative h-[36svh] min-h-[250px] overflow-hidden rounded-2xl bg-paper md:h-[50svh] lg:mt-16 lg:h-auto lg:aspect-[3/4]">
            <Image
              src={a.src}
              alt={a.alt}
              fill
              priority
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="animate-[hero-zoom_2.2s_cubic-bezier(0.16,1,0.3,1)_both] object-cover"
            />
          </div>
          <div className="relative h-[36svh] min-h-[250px] overflow-hidden rounded-2xl bg-paper md:h-[50svh] lg:mb-16 lg:h-auto lg:aspect-[3/4]">
            <Image
              src={b.src}
              alt={b.alt}
              fill
              priority
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="animate-[hero-zoom_2.2s_cubic-bezier(0.16,1,0.3,1)_120ms_both] object-cover"
            />
          </div>
        </div>

        {/* Texte */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <p className={`${rise} text-[13px] font-medium text-muted`}>{site.heroMention}</p>
          <h1 className={`${rise} display mt-3 text-[48px] leading-[0.95] [animation-delay:80ms] sm:text-6xl lg:text-[84px]`}>
            Votre shopping, simplement.
          </h1>
          <p className={`${rise} mt-5 max-w-[40ch] text-[17px] leading-relaxed text-muted [animation-delay:160ms] md:text-lg`}>
            Découvrez nos dernières pièces, consultez les prix et contactez-nous directement pour commander.
          </p>
          <div className={`${rise} mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row`}>
            <ButtonLink href="/#boutique" variant="dark" size="lg">
              Découvrir la boutique
            </ButtonLink>
            <ButtonLink href={whatsappLink(generalMessage)} external variant="accent" size="lg">
              <WhatsappLogo size={20} />
              Commander sur WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
