import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col items-start justify-center px-4 py-20 md:px-8">
      <h1 className="display text-5xl leading-[1] md:text-7xl">Cette page n&apos;existe pas.</h1>
      <p className="mt-4 max-w-[40ch] text-muted md:text-lg">
        Le produit a peut-être été retiré. Le catalogue complet vous attend sur la page d&apos;accueil.
      </p>
      <ButtonLink href="/#boutique" variant="dark" size="lg" className="mt-8">
        Voir la boutique
      </ButtonLink>
    </section>
  );
}
