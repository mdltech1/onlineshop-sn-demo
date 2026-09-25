"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsappLogo } from "@phosphor-icons/react";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";

/** Bouton WhatsApp flottant : apparaît après le hero (qui a déjà son bouton), toujours visible ailleurs. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.3 });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      href={whatsappLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire sur WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-20 flex h-14 items-center rounded-full bg-ink px-4 text-ivory shadow-[0_12px_32px_-8px_rgb(20_19_17/0.5)] transition-[gap,background-color,transform,opacity] duration-500 ease-out-soft hover:gap-2.5 hover:bg-charcoal active:scale-[0.97] md:bottom-6 md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      } ${pathname.startsWith("/produit") ? "max-md:hidden" : ""}`}
    >
      <WhatsappLogo size={26} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 ease-out-soft group-hover:max-w-40 group-focus-visible:max-w-40">
        Écrire sur WhatsApp
      </span>
    </a>
  );
}
