import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name}, ${formatPrice(product.price)}. ${product.description}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-6 md:px-8 md:pt-10">
      <Link href="/#boutique" className="group inline-flex h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        Retour à la boutique
      </Link>

      <div className="mt-4 md:mt-6">
        <ProductDetail product={product} context="page" />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-20 md:mt-28">
          <h2 id="related-title" className="display text-3xl md:text-5xl">
            Vous aimerez aussi
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
