import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createPaymentSession } from "../../../lib/payments/payment-provider";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart, address, method, customer } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    // Calcular montos
    const subtotal = cart.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0);
    const shippingRate = subtotal >= 1999 ? 0 : 199;
    const total = subtotal + shippingRate;

    // Generar un ID único de pedido
    const orderId = `NOM-${Date.now().toString().slice(-6)}`;

    const supabase = await createClient();

    // 1. Obtener la sesión del usuario si está autenticado
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Registrar el pedido en la base de datos
    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      user_id: user?.id || null,
      customer_name: customer.name || "Invitado",
      email: customer.email,
      phone: customer.phone,
      status: "pending_payment",
      payment_method: method,
      shipping_rate: shippingRate,
      total: total,
    });

    if (orderError) {
      console.error("Error al guardar el pedido en base de datos", orderError);
      return NextResponse.json({ error: "Fallo al registrar el pedido" }, { status: 500 });
    }

    // 3. Registrar los detalles de los productos del pedido (order_items)
    const itemsToInsert = cart.map((item: any) => ({
      order_id: orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
    if (itemsError) {
      console.error("Error al registrar items del pedido", itemsError);
    }

    // 4. Registrar la dirección de envío (shipping_addresses)
    const { error: addressError } = await supabase.from("shipping_addresses").insert({
      order_id: orderId,
      street: address.street,
      postal_code: address.postal_code,
      city: address.city,
      state: address.state,
    });
    if (addressError) {
      console.error("Error al registrar la dirección de envío", addressError);
    }

    // 5. Iniciar la sesión de pago
    const itemsFormatted = cart.map((item: any) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const sessionResponse = await createPaymentSession(
      orderId,
      total,
      itemsFormatted,
      method,
      customer.email
    );

    // 6. Registrar la transacción de pago
    const { error: paymentError } = await supabase.from("payments").insert({
      id: sessionResponse.paymentId,
      order_id: orderId,
      provider: method === "Tarjeta" ? "Stripe" : "Transferencia",
      amount: total,
      status: method === "Tarjeta" ? "pending" : "pending",
    });
    if (paymentError) {
      console.error("Error al registrar el pago inicial", paymentError);
    }

    return NextResponse.json({ url: sessionResponse.url, orderId });
  } catch (e: any) {
    console.error("Fallo general en checkout handler", e);
    return NextResponse.json({ error: e.message || "Fallo en el servidor" }, { status: 500 });
  }
}
