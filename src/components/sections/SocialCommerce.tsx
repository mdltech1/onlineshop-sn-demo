import Image from "next/image";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { weeklyPicks, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { productMessage } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";

const flow = ["Site", "Produit", "WhatsApp", "Commande"];

/**
 * Explique le parcours site -> WhatsApp.
 * Le téléphone affiche le VRAI message généré par le site pour un produit du catalogue.
 */
export function SocialCommerce() {
  const product = weeklyPicks[0] ?? products[0];
  const message = productMessage(product, { size: product.sizes[1] ?? product.sizes[0] });

  return (
    <section aria-labelledby="social-title" className="bg-paper/60">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="social-title" className="display text-4xl leading-[1] md:text-6xl">
              Vous aimez un article ? Écrivez-nous directement.
            </h2>
            <p className="mt-5 max-w-[46ch] text-muted md:text-lg">
              Parcourez la collection en ligne puis contactez-nous sur WhatsApp pour vérifier la disponibilité et commander.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ol className="mt-10 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-0" aria-label="Parcours de commande">
              {flow.map((step, i) => {
                const isWa = step === "WhatsApp";
                return (
                  <li key={step} className="flex items-center">
                    <span
                      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium sm:w-auto ${
                        isWa ? "bg-ink text-ivory" : step === "Commande" ? "bg-accent text-ivory" : "border border-ink/20 bg-ivory"
                      }`}
                    >
                      {isWa && <WhatsappLogo size={18} />}
                      {step}
                    </span>
                    {i < flow.length - 1 && (
                      <ArrowRight size={18} className="mx-2.5 hidden shrink-0 text-muted sm:block" aria-hidden />
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-muted">
              Le client arrive sur WhatsApp en sachant déjà ce qu&apos;il veut : l&apos;article, la taille et le prix sont dans le message.
            </p>
          </Reveal>
        </div>

        {/* Téléphone : aperçu du message réellement envoyé */}
        <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
          <figure className="mx-auto w-full max-w-[340px]">
            <div className="overflow-hidden rounded-[2.4rem] border-[7px] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(20_19_17/0.55)]">
              <div className="flex items-center gap-3 bg-charcoal px-4 pb-3 pt-4 text-ivory">
                <span className="flex size-9 items-center justify-center rounded-full bg-ivory text-[11px] font-bold text-ink">OS</span>
                <div className="leading-tight">
                  <p className="text-sm font-medium">{site.name}</p>
                  <p className="text-[11px] text-ivory/60">WhatsApp</p>
                </div>
                <WhatsappLogo size={20} className="ml-auto text-ivory/70" />
              </div>
              <div className="flex min-h-[400px] flex-col justify-end gap-3 bg-[#ece5d8] p-3.5">
                <div className="ml-auto w-[88%] overflow-hidden rounded-2xl rounded-br-md bg-ivory shadow-sm">
                  <div className="flex gap-3 border-b border-line p-2.5">
                    <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-lg bg-paper">
                      <Image src={product.images[0].src} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 self-center">
                      <p className="truncate text-[13px] font-semibold">{product.name}</p>
                      <p className="text-[12px] tabular-nums text-muted">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <p className="whitespace-pre-line px-3 py-2.5 text-[13px] leading-snug text-ink">{message}</p>
                </div>
              </div>
            </div>
            <figcaption className="mt-4 text-center text-[13px] text-muted">
              Aperçu du message prérempli depuis la fiche produit.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
