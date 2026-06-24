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
      .order("created_at", { ascending: true });

    const layoutProduct = data?.find(p => p.sku === 'NOM-LAYOUT');
    let layoutConfig = { homepage: [] as number[], category_orders: {} as any };
    if (layoutProduct && layoutProduct.description) {
      try {
        layoutConfig = JSON.parse(layoutProduct.description);
      } catch (e) {
        console.error("Failed parsing homepage layout config", e);
      }
    }

    const regularData = data?.filter(p => p.sku !== 'NOM-LAYOUT') || [];

    dbProducts = regularData.map((product: any, index: number) =>
      normalizeProduct(product, index),
    );

    if (layoutConfig.homepage && layoutConfig.homepage.length > 0) {
      dbProducts.sort((a, b) => {
        const idxA = layoutConfig.homepage.indexOf(a.id);
        const idxB = layoutConfig.homepage.indexOf(b.id);
        if (idxA === -1 && idxB === -1) return 0;
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      });
    }
  } catch (e) {
    console.error("Could not fetch Supabase products. Using local seed.", e);
  }

  const seed = seedProducts();
  const products = dbProducts.length >= seed.length ? dbProducts : seed;

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
    console.error("Could not fetch Supabase reviews.", e);
  }

  const staticReviews = [
    {
      id: "s1",
      author_name: "Valeria M.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 5,
      content:
        "The quality of the materials is exceptional. I had been looking for decorative pieces that really brought calm to the space for a long time, and NŌMA achieved exactly that. The shipping was fast and the packaging was very careful.",
      is_verified_purchase: true,
    },
    {
      id: "s2",
      author_name: "Carlos T.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      rating: 5,
      content:
        "I bought a lamp for my studio and it completely changed the atmosphere. The light is warm and the design is a sculpture in itself.",
      is_verified_purchase: true,
    },
    {
      id: "s3",
      author_name: "Sofia R.",
      author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026028d",
      rating: 5,
      content:
        "The ultrasonic diffuser smells beautiful and looks calm on the shelf. Excellent after-sales service.",
      is_verified_purchase: true,
    },
  ];

  const finalReviews = reviews.length > 0 ? reviews : staticReviews;

  return <ShopClient initialProducts={products} initialReviews={finalReviews} />;
}
