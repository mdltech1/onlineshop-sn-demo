/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION DE LA BOUTIQUE
 *  Informations générales. Le numéro WhatsApp est dans src/config/whatsapp.ts.
 *  Produits : src/data/products.ts · Photos des sections : src/data/media.ts
 *  Couleurs et polices : src/app/globals.css (bloc @theme)
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Online Shop SN",
  logoText: "ONLINE SHOP SN",
  tagline: "Boutique mode · Dakar · Commande en ligne",
  heroMention: "Mode · Dakar · Commande en ligne",
  description:
    "Parcourez le catalogue Online Shop SN, consultez les prix et commandez directement sur WhatsApp.",
  city: "Dakar",

  /** Réseaux sociaux : remplacer par les comptes réels. Supprimer une ligne pour masquer un réseau. */
  socials: [
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
    { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/" },
  ] as const,

  /** Mode démonstration : mention MdlTech, note sous le catalogue et site non indexé. Passer à false en production. */
  demo: {
    enabled: true,
    credit: "Démonstration conceptuelle réalisée par MdlTech",
    catalogueNote: "Produits, prix et disponibilités présentés à titre de démonstration.",
  },

  currency: "FCFA",
} as const;

export const navigation = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Boutique", href: "/#boutique", filter: "tout" },
  { label: "Homme", href: "/#boutique", filter: "homme" },
  { label: "Femme", href: "/#boutique", filter: "femme" },
  { label: "Nouveautés", href: "/#boutique", filter: "nouveautes" },
  { label: "Contact", href: "/#contact" },
] as const;
