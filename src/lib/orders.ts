import { createAdminClient } from "./supabase/admin";

export async function markOrderPaid(orderId: string) {
  const supabaseAdmin = createAdminClient();

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .single();

  if (order?.status === "paid" || order?.status === "processing") {
    return;
  }

  const { error: orderError } = await supabaseAdmin
    .from("orders")
    .update({ status: "paid" })
    .eq("id", orderId);

  if (orderError) throw orderError;

  const { error: paymentError } = await supabaseAdmin
    .from("payments")
    .update({ status: "paid", updated_at: new Date().toISOString() })
    .eq("order_id", orderId);

  if (paymentError) throw paymentError;

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("order_items")
    .select("product_id, quantity")
    .eq("order_id", orderId);

  if (itemsError) throw itemsError;

  for (const item of items || []) {
    if (!item.product_id) continue;

    const { data: product } = await supabaseAdmin
      .from("products")
      .select("stock")
      .eq("id", item.product_id)
      .single();

    if (!product) continue;

    await supabaseAdmin
      .from("products")
      .update({ stock: Math.max(0, product.stock - item.quantity) })
      .eq("id", item.product_id);
  }
}
