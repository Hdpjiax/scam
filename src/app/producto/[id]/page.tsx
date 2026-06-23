import { createClient } from "../../../lib/supabase/server";
import ProductPageClient from "./ProductPageClient";
import { products as seed } from "../../../data/products";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  let product: any = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    
    product = data;
  } catch (e) {
    console.error("Fallo al obtener producto de Supabase", e);
  }

  // Fallback a semilla si no se encontró en base de datos
  if (!product) {
    product = seed.find((x) => x.id === productId) || null;
  }

  if (product) {
    // Normalizar tipos
    product = {
      ...product,
      image: product.image || product.images?.[0] || "",
      stock: product.stock ?? 12,
      sku: product.sku ?? `NOM-${String(product.id).padStart(4, "0")}`,
      rating: Number(product.rating ?? 4.8),
    };
  }

  return <ProductPageClient initialProduct={product} />;
}
