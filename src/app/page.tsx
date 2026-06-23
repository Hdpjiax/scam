import { createClient } from "../lib/supabase/server";
import ShopClient from "./page.client";
import { products as seed } from "../data/products";

export const dynamic = "force-dynamic";

export default async function Page() {
  let dbProducts: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });
    
    dbProducts = (data || []).map((p: any) => ({
      ...p,
      image: p.images?.[0] || "",
    }));
  } catch (e) {
    console.error("Fallo al obtener productos de Supabase, usando seed local.", e);
  }

  // Si no hay productos en la base de datos, usamos la semilla local
  const products = dbProducts.length > 0 ? dbProducts : seed.map((p, i) => ({
    ...p,
    stock: p.stock ?? 12,
    sku: p.sku ?? `NOM-${String(i + 1).padStart(4, "0")}`,
    rating: Number(p.rating ?? 4.8),
  }));

  return <ShopClient initialProducts={products} />;
}
