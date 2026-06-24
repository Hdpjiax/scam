import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import {
  categoryBySlug,
  normalizeProduct,
  seedProducts,
} from "../../../lib/catalog";
import CategoryPageClient from "./CategoryPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | NŌMA Living Spaces`,
    description: category.copy,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  let products: any[] = [];
  const seedCategoryProducts = seedProducts().filter(
    (product) => product.category === category.name,
  );

  try {
    const supabase = await createClient();
    const { data: dbData } = await supabase
      .from("products")
      .select("*")
      .or(`category.eq."${category.name}",sku.eq.NOM-LAYOUT`);

    const layoutProduct = dbData?.find(p => p.sku === 'NOM-LAYOUT');
    let layoutConfig = { homepage: [] as number[], category_orders: {} as any };
    if (layoutProduct && layoutProduct.description) {
      try {
        layoutConfig = JSON.parse(layoutProduct.description);
      } catch (e) {
        console.error("Failed parsing category layout config", e);
      }
    }

    const categoryData = dbData?.filter(p => p.category === category.name) || [];

    products = categoryData.map((product: any, index: number) =>
      normalizeProduct(product, index),
    );

    const catOrder = layoutConfig.category_orders?.[category.name] || [];
    if (catOrder.length > 0) {
      products.sort((a, b) => {
        const idxA = catOrder.indexOf(a.id);
        const idxB = catOrder.indexOf(b.id);
        if (idxA === -1 && idxB === -1) return 0;
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      });
    }
  } catch (error) {
    console.error("Could not fetch category products from Supabase.", error);
  }

  if (products.length < seedCategoryProducts.length) {
    products = seedCategoryProducts;
  }

  return <CategoryPageClient category={category} products={products} />;
}
