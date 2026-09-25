import { site } from "@/config/site";

/** 35000 -> "35 000 FCFA" */
export function formatPrice(value: number) {
  const n = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value);
  return `${n.replace(/\s/g, " ")} ${site.currency}`;
}
