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
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category.name)
      .order("featured", { ascending: false })
      .order("id", { ascending: true });

    products = (data || []).map((product: any, index: number) =>
      normalizeProduct(product, index),
    );
  } catch (error) {
    console.error("Could not fetch category products from Supabase.", error);
  }

  if (products.length < seedCategoryProducts.length) {
    products = seedCategoryProducts;
  }

  return <CategoryPageClient category={category} products={products} />;
}
