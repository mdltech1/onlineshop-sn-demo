import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { site } from "@/config/site";
import { ShopProvider } from "@/context/shop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopOverlays } from "@/components/layout/ShopOverlays";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "./globals.css";

const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-standard-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Catalogue mode à Dakar`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Démonstration : ne pas indexer comme site officiel.
  robots: site.demo.enabled ? { index: false, follow: false } : undefined,
  openGraph: { title: site.name, description: site.description, locale: "fr_SN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f8f6f1" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <ShopProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
          >
            Aller au contenu
          </a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ShopOverlays />
        </ShopProvider>
      </body>
    </html>
  );
}
