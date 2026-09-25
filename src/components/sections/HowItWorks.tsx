import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Parcourez", text: "Découvrez les produits disponibles." },
  { n: "02", title: "Choisissez", text: "Sélectionnez les articles qui vous intéressent." },
  { n: "03", title: "Contactez-nous", text: "Envoyez votre sélection directement sur WhatsApp." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="border-y border-line bg-paper/60">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-24">
        <Reveal>
          <h2 id="steps-title" className="display max-w-[14ch] text-4xl leading-[1] md:text-6xl">
            Commander en quelques étapes
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-0 md:mt-16 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 110}
              className="grid grid-cols-[4.5rem_1fr] items-baseline border-t border-ink/15 py-6 md:block md:border-l md:border-t-0 md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0"
            >
              <span className="display text-4xl text-accent md:text-7xl">{s.n}</span>
              <div className="md:mt-8">
                <h3 className="display text-2xl leading-tight md:text-3xl">{s.title}</h3>
                <p className="mt-1.5 max-w-[30ch] text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
