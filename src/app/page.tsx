import { createClient } from "../lib/supabase/server";
import ShopClient from "./page.client";
import { normalizeProduct, seedProducts } from "../lib/catalog";

export const dynamic = "force-dynamic";

export default async function Page() {
  let dbProducts: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    dbProducts = (data || []).map((product: any, index: number) =>
      normalizeProduct(product, index),
    );
  } catch (e) {
    console.error("Fallo al obtener productos de Supabase, usando seed local.", e);
  }

  // Si no hay productos en la base de datos, usamos la semilla local
  const products = dbProducts.length > 0 ? dbProducts : seedProducts();

  let reviews: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, products(name)")
      .order("created_at", { ascending: false })
      .limit(6);
    reviews = data || [];
  } catch (e) {
    console.error("Fallo al obtener reseñas de Supabase", e);
  }

  const STATIC_REVIEWS = [
    {
      id: "s1",
      author_name: "Valeria M.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 5,
      content: "The quality of the materials is exceptional. I had been looking for decorative pieces that really brought calm to the space for a long time, and NŌMA achieved exactly that. The shipping was super fast and the packaging very careful.",
      is_verified_purchase: true,
    },
    {
      id: "s2",
      author_name: "Carlos T.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      rating: 5,
      content: "I bought a lamp for my studio and it completely changed the atmosphere. The light is super warm and the design is a sculpture in itself.",
      is_verified_purchase: true,
    },
    {
      id: "s3",
      author_name: "Sofía R.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026028d",
      rating: 5,
      content: "The ultrasonic diffuser not only smells great, but aesthetically it is minimalist and beautiful. Excellent after-sales service.",
      is_verified_purchase: true,
    }
  ];

  const finalReviews = reviews.length > 0 ? reviews : STATIC_REVIEWS;

  return <ShopClient initialProducts={products} initialReviews={finalReviews} />;
}
