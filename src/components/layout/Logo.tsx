import Link from "next/link";
import { site } from "@/config/site";

/** Logo texte. Pour un logo graphique : remplacer le <span> par <Image src="/logo.svg" ... />. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/#accueil" className={`inline-flex items-center ${className}`} aria-label={`${site.name}, accueil`}>
      <span className="display text-[17px] font-bold tracking-[-0.02em] md:text-lg">{site.logoText}</span>
    </Link>
  );
}
