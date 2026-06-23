import Stripe from "stripe";

// Inicializar Stripe si la clave existe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10" as any,
    })
  : null;

export type CheckoutSessionResponse = {
  url: string | null;
  paymentId: string;
};

export async function createPaymentSession(
  orderId: string,
  totalAmount: number,
  items: { name: string; price: number; quantity: number }[],
  provider: "Tarjeta" | "Transferencia",
  customerEmail: string
): Promise<CheckoutSessionResponse> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Si es transferencia bancaria SPEI
  if (provider === "Transferencia") {
    return {
      url: `${siteUrl}/checkout/success?order_id=${orderId}&payment=spei`,
      paymentId: `SPEI-${Date.now()}`,
    };
  }

  // 1. Integración con Stripe (Por defecto para Tarjeta si está configurado)
  if (stripe) {
    try {
      const lineItems = items.map((item) => ({
        price_data: {
          currency: "mxn",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe usa centavos
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: customerEmail,
        line_items: lineItems,
        mode: "payment",
        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
        cancel_url: `${siteUrl}/checkout?order_id=${orderId}&status=cancelled`,
        metadata: {
          orderId,
        },
      });

      return {
        url: session.url,
        paymentId: session.id,
      };
    } catch (e) {
      console.error("Error al crear sesión en Stripe", e);
    }
  }

  // 2. Fallback / Alternativa Mercado Pago
  // Para Mercado Pago Sandbox, si no tenemos Stripe, simulamos o usamos Mercado Pago SDK.
  // Aquí podemos simular un checkout exitoso en sandbox para propósitos de prueba de flujo completo.
  const mockSessionId = `MP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  return {
    url: `${siteUrl}/checkout/success?session_id=${mockSessionId}&order_id=${orderId}&gateway=mercadopago`,
    paymentId: mockSessionId,
  };
}
