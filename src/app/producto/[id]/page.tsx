import { createClient } from "../../../lib/supabase/server";
import ProductPageClient from "./ProductPageClient";
import { normalizeProduct, seedProducts } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  const seedProduct = seedProducts().find((product) => product.id === productId) || null;
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

    reviews = reviewsData || [];
  } catch (e) {
    console.error("Could not fetch product or reviews from Supabase.", e);
  }

  if (!product) {
    product = seedProduct;
  }

  if (product) {
    product = normalizeProduct(product, productId - 1);
    if (!reviews.length && product.reviews?.length) {
      reviews = product.reviews;
    }
  }

  return <ProductPageClient initialProduct={product} initialReviews={reviews} />;
}
