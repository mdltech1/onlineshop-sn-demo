import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les photos de démonstration sont servies par le CDN Unsplash (voir src/lib/image-loader.ts).
    // Pour des photos locales dans /public, le loader les renvoie telles quelles.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
