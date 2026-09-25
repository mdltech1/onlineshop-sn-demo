import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-24">
      <Reveal className="grid gap-6 rounded-2xl border border-line p-6 md:grid-cols-12 md:items-end md:gap-10 md:p-12">
        <h2 id="contact-title" className="display text-4xl leading-[1] md:col-span-6 md:text-6xl">
          Une question sur un article ?
        </h2>
        <div className="md:col-span-5 md:col-start-8">
          <p className="max-w-[40ch] text-muted md:text-lg">
            Notre équipe est disponible sur WhatsApp pour vous renseigner sur les produits et les commandes.
          </p>
          <ButtonLink href={whatsappLink(generalMessage)} external variant="dark" size="lg" className="mt-6 w-full sm:w-auto">
            <WhatsappLogo size={20} />
            Écrire sur WhatsApp
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
