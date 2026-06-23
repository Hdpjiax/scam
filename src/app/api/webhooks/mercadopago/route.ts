import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || searchParams.get("topic");
    const id = searchParams.get("data.id") || searchParams.get("id");

    if (type === "payment" && id) {
      console.log(`Webhook Mercado Pago recibido para pago ${id}`);
      
      // Consultar API de Mercado Pago para verificar el estado de la transacción
      const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      if (!accessToken) {
        return NextResponse.json({ error: "Mercado Pago not configured" }, { status: 500 });
      }

      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (mpResponse.ok) {
        const paymentData = await mpResponse.json();
        const orderId = paymentData.external_reference || paymentData.metadata?.order_id;
        const status = paymentData.status;

        // Si el estado es aprobado/pagado
        if (orderId && (status === "approved" || status === "accredited")) {
          console.log(`Mercado Pago verificado: Orden ${orderId} está pagada.`);

          const supabaseAdmin = createAdminClient();

          // 1. Actualizar orden
          await supabaseAdmin
            .from("orders")
            .update({ status: "paid" })
            .eq("id", orderId);

          // 2. Actualizar pago
          await supabaseAdmin
            .from("payments")
            .update({ status: "paid", updated_at: new Date().toISOString() })
            .eq("order_id", orderId);

          // 3. Reducir stock
          const { data: items } = await supabaseAdmin
            .from("order_items")
            .select("product_id, quantity")
            .eq("order_id", orderId);

          if (items) {
            for (const item of items) {
              if (item.product_id) {
                const { data: prod } = await supabaseAdmin
                  .from("products")
                  .select("stock")
                  .eq("id", item.product_id)
                  .single();
                
                if (prod) {
                  const newStock = Math.max(0, prod.stock - item.quantity);
                  await supabaseAdmin
                    .from("products")
                    .update({ stock: newStock })
                    .eq("id", item.product_id);
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error("Error en Mercado Pago webhook handler", e);
    return NextResponse.json({ error: e.message || "Fallo interno" }, { status: 500 });
  }
}
