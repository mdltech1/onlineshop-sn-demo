# Online Shop SN : démonstration de catalogue web + WhatsApp

Démonstration conceptuelle réalisée par **MdlTech**. Ce n'est pas le site officiel d'Online Shop SN :
les produits, prix, disponibilités et photos sont des exemples à remplacer par le vrai catalogue.
Tant que `site.demo.enabled` vaut `true`, la mention MdlTech s'affiche dans le footer, une note accompagne le catalogue
et le site est marqué `noindex`.

## Le parcours démontré

Catalogue web → le client découvre les produits → consulte le prix → choisit (taille, couleur) →
bouton WhatsApp → message prérempli → commande / discussion. WhatsApp reste le canal de vente ; le site prépare la conversation.

## Lancer le projet

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_WHATSAPP_NUMBER
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
```

Node 20 ou plus récent. Stack : Next.js 16 (App Router), TypeScript, Tailwind CSS v4, icônes Phosphor.

## Fonctionnalités

- Catalogue filtrable (Tout, Homme, Femme, Nouveautés) et triable (pertinence, prix croissant, prix décroissant), barre de filtres qui reste visible au défilement.
- Cartes produits avec badge « Nouveau » et ajout rapide à la sélection.
- Fiche produit en fenêtre + page dédiée `/produit/<id>` (lien partageable sur WhatsApp) : galerie, tailles, couleurs, disponibilité, bouton « Commander sur WhatsApp » avec message prérempli. Sur mobile, une barre de commande reste visible.
- « Ma sélection » : plusieurs articles envoyés en un seul message (« Envoyer ma sélection sur WhatsApp »), avec aperçu du message. Pas de paiement en ligne. La sélection est conservée dans le navigateur.
- Recherche instantanée, menu mobile, bouton WhatsApp flottant (apparaît après le hero).
- Sections : hero, catégories, catalogue, « Commander en quelques étapes », nouveautés de la semaine, parcours site → WhatsApp (avec le vrai message généré), contact, appel à l'action final.

## Où modifier quoi

| Élément | Fichier |
|---|---|
| **Numéro WhatsApp** (`WHATSAPP_NUMBER`) | `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`) ou `src/config/whatsapp.ts` |
| Textes des messages WhatsApp | `src/lib/whatsapp.ts` |
| Nom, slogan, réseaux sociaux, mode démo | `src/config/site.ts` |
| Produits (id, name, category, price, images, description, sizes, colors, isNew, availability) | `src/data/products.ts` |
| Photos du hero, des catégories, du CTA final | `src/data/media.ts` |
| Couleurs et polices | `src/app/globals.css` (bloc `@theme`), `src/app/layout.tsx` |
| Logo | `src/components/layout/Logo.tsx` |

### Avant d'envoyer la démo

1. **Numéro WhatsApp** : la valeur par défaut `221000000000` est factice. Renseignez le numéro de la boutique (ou le vôtre pour la démo).
2. **Réseaux sociaux** : remplacez les URLs par les comptes de la boutique dans `site.ts`.
3. **Photos** : vérifiez-les dans le navigateur et remplacez celles qui ne conviennent pas. Idéalement, utilisez les photos produits de la boutique.

### Remplacer les photos

Déposez les fichiers dans `public/images/` puis indiquez le chemin :

```ts
images: [
  { src: "/images/produits/ensemble-urban-1.jpg", alt: "Ensemble Urban porté, vue de face" },
  { src: "/images/produits/ensemble-urban-2.jpg", alt: "Ensemble Urban, détail" },
],
```

Format conseillé : 1600 px de large, JPG ou WebP, moins de 400 Ko, cadrage vertical 4:5.

## Crédits photos

Photos de démonstration issues d'[Unsplash](https://unsplash.com) (licence Unsplash : usage libre, y compris commercial). Elles sont chargées depuis le CDN Unsplash, une connexion internet est nécessaire.
# onlineshop-sn-demo
