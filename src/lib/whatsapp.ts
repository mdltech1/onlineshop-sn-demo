import { site } from "@/config/site";
import { WHATSAPP_NUMBER } from "@/config/whatsapp";
import type { Product } from "@/data/products";

/** Construit un lien wa.me avec message prérempli. Tous les boutons WhatsApp passent par ici. */
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Bonjour ${site.name} 👋\nJe souhaite avoir des informations sur vos articles.`;

export type Choice = { size?: string; color?: string };

function withDetails(name: string, { size, color }: Choice) {
  const details = [size && `taille ${size}`, color].filter(Boolean).join(", ");
  return details ? `${name} (${details})` : name;
}

export function productMessage(product: Product, choice: Choice = {}) {
  return [
    `Bonjour ${site.name} 👋`,
    `Je suis intéressé(e) par ${withDetails(product.name, choice)}.`,
    "Pouvez-vous me confirmer la disponibilité et m'indiquer comment commander ?",
  ].join("\n");
}

export type SelectionLine = { product: Product; size?: string; color?: string; qty: number };

export function selectionMessage(lines: SelectionLine[]) {
  return [
    `Bonjour ${site.name} 👋`,
    "Je souhaite avoir des informations sur les articles suivants :",
    "",
    ...lines.map((l) => `- ${l.qty > 1 ? `${l.qty} x ` : ""}${withDetails(l.product.name, l)}`),
    "",
    "Pouvez-vous me confirmer les disponibilités et le montant total ?",
  ].join("\n");
}
