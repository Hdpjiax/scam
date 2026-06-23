import { createClient } from "../../lib/supabase/server";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();

  // Obtener productos
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  // Obtener pedidos
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  // Obtener perfiles de clientes
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const mappedProducts = (products || []).map((p: any) => ({
    ...p,
    image: p.images?.[0] || "",
  }));

  return (
    <AdminClient
      initialProducts={mappedProducts}
      initialOrders={orders || []}
      initialProfiles={profiles || []}
    />
  );
}
