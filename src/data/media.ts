/**
 * PHOTOS DES SECTIONS
 * Photos de démonstration Unsplash (licence Unsplash, usage commercial autorisé).
 * Remplacez chaque `src` par vos photos, ex. "/images/hero-1.jpg" (dossier /public/images).
 */

const U = (id: string) => `https://images.unsplash.com/${id}`;

export type Media = { src: string; alt: string };

export const media = {
  hero: [
    { src: U("photo-1605017283705-d15cb0346bf2"), alt: "Femme en manteau marron contre un mur de béton" },
    { src: U("photo-1776435303041-6aa933ddfacc"), alt: "Jeune homme en chemise à motifs" },
  ],

  categories: {
    homme: { src: U("photo-1586232902955-df204f34b36e"), alt: "Homme en veste noire" },
    femme: { src: U("photo-1590873802674-55bb8f947bc5"), alt: "Femme en blazer beige" },
    nouveautes: { src: U("photo-1769107805465-bfd41863f1a0"), alt: "Portant de vêtements aux tons neutres" },
    selection: { src: U("photo-1551232864-3f0890e580d9"), alt: "Vestes suspendues sur un portant" },
  },

  finalCta: { src: U("photo-1776000680544-ebf0989a71df"), alt: "" },
} satisfies Record<string, unknown>;
