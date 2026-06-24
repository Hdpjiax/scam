import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "../../../../lib/orders";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || searchParams.get("topic");
    const id = searchParams.get("data.id") || searchParams.get("id");

    if (type !== "payment" || !id) {
      return NextResponse.json({ received: true });
    }

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Mercado Pago not configured" },
        { status: 500 },
      );
    }

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: "No se pudo verificar el pago en Mercado Pago" },
        { status: 502 },
      );
    }

    const paymentData = await mpResponse.json();
    const orderId = paymentData.external_reference || paymentData.metadata?.order_id;
    const status = paymentData.status;

    if (orderId && (status === "approved" || status === "accredited")) {
      await markOrderPaid(orderId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error en Mercado Pago webhook handler", error);
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 },
    );
  }
}
