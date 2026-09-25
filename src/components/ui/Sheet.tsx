"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Panneau basé sur <dialog> natif : focus piégé, touche Échap, couche supérieure.
 * `side` définit la position du panneau sur desktop (sur mobile il occupe l'écran).
 */
export function Sheet({
  open,
  onClose,
  label,
  side = "center",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  side?: "center" | "right" | "top" | "left";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  const layout = {
    center: "items-end md:items-center justify-center md:p-6",
    right: "items-stretch justify-end",
    left: "items-stretch justify-start",
    top: "items-start justify-center",
  }[side];

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className="sheet"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Clic sur le fond (hors panneau) = fermeture
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop === "true") onClose();
      }}
    >
      <div data-backdrop="true" className={`flex h-full w-full ${layout}`}>
        {open ? children : null}
      </div>
    </dialog>
  );
}
