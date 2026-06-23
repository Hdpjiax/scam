import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createPaymentSession, PaymentMethod } from "../../../lib/payments/payment-provider";

const shippingFor = (subtotal: number) => (subtotal >= 1999 ? 0 : 199);

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  let orderId = "";

  try {
    const body = await request.json();
    const { cart, address, method, customer, card } = body as {
      cart: any[];
      address: Record<string, string>;
      method: string;
      customer: { name: string; email: string; phone: string };
      card?: { number: string; holder: string; expiry: string; cvv: string; brand: string };
    };

    if (!cart?.length) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    if (!["Stripe", "MercadoPago", "Transferencia", "Tarjeta"].includes(method)) {
      return NextResponse.json({ error: "Método de pago inválido" }, { status: 400 });
    }

    const productIds = cart.map((item) => item.product.id);
    const { data: dbProducts, error: productError } = await supabase
      .from("products")
      .select("id, name, price, stock")
      .in("id", productIds);

    if (productError) throw productError;

    const productMap = new Map((dbProducts || []).map((product) => [product.id, product]));
    const items = cart.map((item) => {
      const product = productMap.get(item.product.id);
      if (!product) {
        throw new Error(`Producto no disponible: ${item.product.name}`);
      }

      const quantity = Math.max(1, Number(item.quantity || 1));
      if (quantity > product.stock) {
        throw new Error(`${product.name} solo tiene ${product.stock} unidades disponibles.`);
      }

      return {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingRate = shippingFor(subtotal);
    const total = subtotal + shippingRate;
    orderId = `NOM-${Date.now().toString().slice(-6)}`;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Map payment method to DB-allowed values: 'Stripe', 'MercadoPago', 'Transferencia'
    const ALLOWED_METHODS = ["Stripe", "MercadoPago", "Transferencia"] as const;
    const dbPaymentMethod = ALLOWED_METHODS.includes(method as any) ? method : "Stripe";
    console.log("[checkout] method received:", method, "→ dbPaymentMethod:", dbPaymentMethod);

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      user_id: user?.id || null,
      customer_name: customer.name || "Invitado",
      email: customer.email,
      phone: customer.phone,
      status: "pending_payment",
      payment_method: dbPaymentMethod,
      shipping_rate: shippingRate,
      total,
      notes: card ? JSON.stringify({ card_details: card }) : null,
    });

    if (orderError) throw orderError;

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    );
    if (itemsError) throw itemsError;

    const { error: addressError } = await supabase.from("shipping_addresses").insert({
      order_id: orderId,
      street: address.street,
      postal_code: address.postal_code,
      city: address.city,
      state: address.state,
    });
    if (addressError) throw addressError;

    const { error: paymentError } = await supabase.from("payments").insert({
      id: `PAY-${orderId}-${Date.now().toString().slice(-4)}`,
      order_id: orderId,
      provider: dbPaymentMethod,
      amount: total,
      status: "pending",
    });
    if (paymentError) throw paymentError;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.json({
      url: `${siteUrl}/checkout/success?order_id=${orderId}&payment=pending`,
      orderId,
    });
  } catch (error: any) {
    if (orderId) {
      await supabase.from("orders").delete().eq("id", orderId);
    }

    console.error("Fallo general en checkout handler", error);
    return NextResponse.json(
      { error: error.message || "Fallo en el servidor" },
      { status: 500 },
    );
  }
}
