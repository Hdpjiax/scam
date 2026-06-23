import { createClient } from "../../../lib/supabase/server";
import ProductPageClient from "./ProductPageClient";
import { normalizeProduct, seedProducts } from "../../../lib/catalog";

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
    product = seedProducts().find((x) => x.id === productId) || null;
  }

  if (product) {
    product = normalizeProduct(product, productId - 1);
  }

  return <ProductPageClient initialProduct={product} />;
}
