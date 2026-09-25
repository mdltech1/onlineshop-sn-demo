/**
 * CATALOGUE DE DÉMONSTRATION
 * Noms, prix, disponibilités et photos sont fictifs : remplacez-les par les vrais produits d'Online Shop SN.
 *
 * Ajouter un produit :
 *  1. Copier un objet et changer `id` (unique, sans accents ni espaces : il sert d'adresse /produit/<id>).
 *  2. Mettre les photos dans /public/images/produits/ et renseigner leurs chemins dans `images`
 *     (ex. "/images/produits/ensemble-urban-1.jpg"). La première photo est la photo principale.
 *  3. `isNew: true` affiche le badge « Nouveau » et place le produit dans les nouveautés.
 */

export type Category = "homme" | "femme";
export type Availability = "en_stock" | "stock_limite" | "sur_commande";

export type ProductImage = { src: string; alt: string };
export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  category: Category;
  /** Type de pièce, affiché sur la carte (Ensemble, Chemise, Robe...). */
  type: string;
  /** Prix en FCFA. */
  price: number;
  images: ProductImage[];
  description: string;
  sizes: string[];
  colors: ProductColor[];
  isNew: boolean;
  availability: Availability;
};

const U = (id: string) => `https://images.unsplash.com/${id}`;

export const products: Product[] = [
  {
    id: "ensemble-urban",
    name: "Ensemble Urban",
    category: "homme",
    type: "Ensemble",
    price: 35000,
    images: [
      { src: U("photo-1776435303185-95be02310cff"), alt: "Homme en chemise à motifs et pantalon, vue de face" },
      { src: U("photo-1776435303294-ae487c8c28a5"), alt: "Homme en chemise à motifs devant un mur de briques" },
    ],
    description: "Chemise imprimée et pantalon léger. Un ensemble facile à porter en ville comme en sortie.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Motif", hex: "#6f5b45" },
      { name: "Sarcelle", hex: "#2f5d5a" },
    ],
    isNew: true,
    availability: "en_stock",
  },
  {
    id: "chemise-premium",
    name: "Chemise Premium",
    category: "homme",
    type: "Chemise",
    price: 25000,
    images: [
      { src: U("photo-1761957352808-6874e74cc94d"), alt: "Homme en chemise noire et lunettes de soleil" },
      { src: U("photo-1761957356728-f32a5cdbcc48"), alt: "Homme en chemise noire, autre angle" },
    ],
    description: "Coupe ajustée et tissu au tombé net. Se porte rentrée pour un look habillé, ouverte pour le week-end.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Noir", hex: "#1a1917" },
      { name: "Blanc cassé", hex: "#efe9df" },
    ],
    isNew: false,
    availability: "en_stock",
  },
  {
    id: "pantalon-casual",
    name: "Pantalon Casual",
    category: "homme",
    type: "Pantalon",
    price: 18000,
    images: [
      { src: U("photo-1644483878398-b57d19f84ff8"), alt: "Homme en chemise noire et pantalon noir" },
      { src: U("photo-1644483878392-2d7e7c00eb3f"), alt: "Jeune homme en tenue noire, vue en pied" },
    ],
    description: "Pantalon droit, taille confortable. La base d'une tenue simple, avec une chemise ou un t-shirt.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Noir", hex: "#1a1917" },
      { name: "Beige", hex: "#cbb89b" },
    ],
    isNew: false,
    availability: "stock_limite",
  },
  {
    id: "ensemble-elegance",
    name: "Ensemble Élégance",
    category: "femme",
    type: "Ensemble",
    price: 45000,
    images: [
      { src: U("photo-1604914509286-abc02036617c"), alt: "Femme en manteau beige, vue de face" },
      { src: U("photo-1604914509312-540348e66c81"), alt: "Femme en manteau beige devant un mur noir" },
      { src: U("photo-1604828737081-ab3421da20ed"), alt: "Femme en manteau assise sur une rambarde" },
    ],
    description: "Manteau léger et pantalon assorti. Une tenue soignée pour le bureau, les rendez-vous et les soirées.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sable", hex: "#cbb89b" },
      { name: "Noir", hex: "#1a1917" },
    ],
    isNew: true,
    availability: "en_stock",
  },
  {
    id: "t-shirt-oversize",
    name: "T-shirt Oversize",
    category: "homme",
    type: "T-shirt",
    price: 10000,
    images: [
      { src: U("photo-1778759335272-2aea6c337a63"), alt: "Homme en t-shirt noir et pantalon blanc" },
      { src: U("photo-1778759335271-91d85dacaf96"), alt: "Homme en t-shirt noir et pantalon clair, autre pose" },
    ],
    description: "Coupe large, coton épais. Le basique à associer à un pantalon clair ou à un jean.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Noir", hex: "#1a1917" },
      { name: "Blanc", hex: "#f3f1ec" },
      { name: "Sable", hex: "#cbb89b" },
    ],
    isNew: true,
    availability: "en_stock",
  },
  {
    id: "robe-satin",
    name: "Robe Satin",
    category: "femme",
    type: "Robe",
    price: 32000,
    images: [
      { src: U("photo-1621036570283-e270d46d3901"), alt: "Femme en robe noire à fines bretelles assise" },
      { src: U("photo-1621036570330-03534427225f"), alt: "Femme en robe noire allongée, autre angle" },
    ],
    description: "Satin fluide et fines bretelles. Pour les dîners, les cérémonies et les sorties.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Noir", hex: "#1a1917" },
      { name: "Caramel", hex: "#9a4f22" },
    ],
    isNew: true,
    availability: "stock_limite",
  },
  {
    id: "veste-street",
    name: "Veste Street",
    category: "homme",
    type: "Veste",
    price: 40000,
    images: [
      { src: U("photo-1620511469298-7c119cc6982c"), alt: "Homme en veste grise" },
      { src: U("photo-1620511450270-47162b983078"), alt: "Homme en veste grise, vue en pied" },
    ],
    description: "Veste structurée à porter sur un t-shirt ou une chemise. Chic sans être trop formelle.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Gris", hex: "#6b6862" },
      { name: "Noir", hex: "#1a1917" },
    ],
    isNew: false,
    availability: "sur_commande",
  },
  {
    id: "ensemble-minimal",
    name: "Ensemble Minimal",
    category: "femme",
    type: "Ensemble",
    price: 30000,
    images: [
      { src: U("photo-1619086303291-0ef7699e4b31"), alt: "Femme en chemise blanche et pantalon blanc" },
    ],
    description: "Chemise ample et pantalon large, ton sur ton. Une tenue fraîche et simple pour la journée.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc", hex: "#f3f1ec" },
      { name: "Sable", hex: "#cbb89b" },
    ],
    isNew: false,
    availability: "en_stock",
  },
];

export const categoryLabel: Record<Category, string> = { homme: "Homme", femme: "Femme" };

export const availabilityLabel: Record<Availability, string> = {
  en_stock: "En stock",
  stock_limite: "Stock limité",
  sur_commande: "Sur commande",
};

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

/** Produits mis en avant dans « Nouveautés de la semaine » (les 3 premiers marqués isNew). */
export const weeklyPicks = products.filter((p) => p.isNew).slice(0, 3);
