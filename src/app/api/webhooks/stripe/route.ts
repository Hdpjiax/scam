import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "../../../../lib/supabase/admin";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10" as any,
    })
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    return NextResponse.json({ error: "Missing signature or endpoint secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Fallo al validar firma de Stripe Webhook", err);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();

  // Controlar eventos del checkout de Stripe
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      console.log(`Webhook Stripe: Procesando pago exitoso de Orden ${orderId}`);

      // 1. Actualizar el estado de la orden a 'paid'
      const { error: orderError } = await supabaseAdmin
        .from("orders")
        .update({ status: "paid" })
        .eq("id", orderId);

      if (orderError) {
        console.error("Error al actualizar estado del pedido en webhook", orderError);
      }

      // 2. Actualizar el pago a 'paid'
      const { error: paymentError } = await supabaseAdmin
        .from("payments")
        .update({ status: "paid", updated_at: new Date().toISOString() })
        .eq("order_id", orderId);

      if (paymentError) {
        console.error("Error al actualizar pago en webhook", paymentError);
      }

      // 3. Reducir stock del inventario para cada ítem comprado
      const { data: items, error: itemsError } = await supabaseAdmin
        .from("order_items")
        .select("product_id, quantity")
        .eq("order_id", orderId);

      if (!itemsError && items) {
        for (const item of items) {
          if (item.product_id) {
            // Leer el stock actual
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

  return NextResponse.json({ received: true });
}
