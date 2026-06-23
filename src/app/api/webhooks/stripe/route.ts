import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { markOrderPaid } from "../../../../lib/orders";

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
    return NextResponse.json(
      { error: "Missing signature or endpoint secret" },
      { status: 400 },
    );
  }

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId) await markOrderPaid(orderId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Fallo al procesar webhook de Stripe", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 },
    );
  }
}
