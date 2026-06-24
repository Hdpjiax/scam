import { createClient } from "../../../lib/supabase/server";
import ProductPageClient from "./ProductPageClient";
import { normalizeProduct, seedProducts } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  let product: any = null;
  let reviews: any[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    
    product = data;

    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId);
    
    if (reviewsData) {
      reviews = reviewsData;
    }
  } catch (e) {
    console.error("Fallo al obtener producto o reseñas de Supabase", e);
  }

  // Fallback a semilla si no se encontró en base de datos
  if (!product) {
    product = seedProducts().find((x) => x.id === productId) || null;
  }

  if (product) {
    product = normalizeProduct(product, productId - 1);
  }

  return <ProductPageClient initialProduct={product} initialReviews={reviews} />;
}
