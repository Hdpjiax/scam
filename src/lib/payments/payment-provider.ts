import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10" as any,
    })
  : null;

export type PaymentMethod = "Stripe" | "MercadoPago" | "Transferencia";

export type CheckoutSessionResponse = {
  url: string | null;
  paymentId: string;
  provider: "Stripe" | "MercadoPago" | "Transferencia";
};

export async function createPaymentSession(
  orderId: string,
  totalAmount: number,
  items: { name: string; price: number; quantity: number }[],
  provider: PaymentMethod,
  customerEmail: string,
): Promise<CheckoutSessionResponse> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (provider === "Transferencia") {
    return {
      url: `${siteUrl}/checkout/success?order_id=${orderId}&payment=spei`,
      paymentId: `SPEI-${Date.now()}`,
      provider: "Transferencia",
    };
  }

  if (provider === "MercadoPago") {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Mercado Pago no está configurado.");
    }

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: "MXN",
        })),
        payer: {
          email: customerEmail,
        },
        external_reference: orderId,
        metadata: {
          order_id: orderId,
        },
        back_urls: {
          success: `${siteUrl}/checkout/success?order_id=${orderId}&gateway=mercadopago`,
          failure: `${siteUrl}/checkout?order_id=${orderId}&status=failed`,
          pending: `${siteUrl}/checkout/success?order_id=${orderId}&payment=pending`,
        },
        notification_url: `${siteUrl}/api/webhooks/mercadopago`,
        auto_return: "approved",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Mercado Pago rechazó la preferencia: ${error}`);
    }

    const preference = await response.json();

    return {
      url: preference.init_point || preference.sandbox_init_point,
      paymentId: String(preference.id),
      provider: "MercadoPago",
    };
  }

  if (!stripe) {
    throw new Error("Stripe no está configurado.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
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
    provider: "Stripe",
  };
}
