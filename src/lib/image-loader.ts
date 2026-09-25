type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Loader d'images.
 * - URLs Unsplash : redimensionnement et compression par le CDN Unsplash.
 * - Fichiers locaux (/images/...) : servis tels quels depuis /public.
 *   Pensez à exporter les photos en ~1600 px de large, JPG/WebP, < 400 Ko.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  return `${src}?w=${width}`;
}
