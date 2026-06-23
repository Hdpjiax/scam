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

  return <ShopClient initialProducts={products} />;
}
