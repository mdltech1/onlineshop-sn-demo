/**
 * ─────────────────────────────────────────────────────────────
 *  NUMÉRO WHATSAPP : unique point de configuration
 *  Format international, sans "+", sans espaces. Ex. : "221771234567"
 *
 *  Deux façons de le définir :
 *  1. Variable d'environnement NEXT_PUBLIC_WHATSAPP_NUMBER (fichier .env.local ou Vercel)
 *  2. Valeur par défaut ci-dessous
 *
 *  ⚠ La valeur par défaut est un numéro factice : remplacez-la avant de partager la démo.
 * ─────────────────────────────────────────────────────────────
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "221000000000";
