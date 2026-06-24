import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase/admin";
import { createClient } from "../../../lib/supabase/server";
import {
  CheckoutValidationError,
  normalizeCheckoutRequest,
} from "../../../modules/checkout/address-validation";
import type { CheckoutOrderItem } from "../../../modules/checkout/checkout.types";
import {
  buildValidatedOrderItems,
  calculateOrderTotals,
  mapPaymentMethodForDatabase,
  reserveCheckoutStock,
  restoreCheckoutStock,
} from "../../../modules/checkout/order-service";
import { assertCheckoutRateLimit } from "../../../modules/checkout/rate-limit";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  let orderId = "";
  let stockReserved = false;
  let reservedItems: CheckoutOrderItem[] = [];

  try {
    const checkout = normalizeCheckoutRequest(await request.json());
    assertCheckoutRateLimit(request, checkout.customer.email);

    const { address, billingAddress, shippingPreference, method, customer, card } = checkout;
    const items = await buildValidatedOrderItems(adminSupabase, checkout.cart);
    const { shippingRate, total } = calculateOrderTotals(items);
    orderId = `NOM-${Date.now().toString().slice(-6)}`;
    reservedItems = items;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const dbPaymentMethod = mapPaymentMethodForDatabase(method);
    console.log("[checkout] method received:", method, "-> dbPaymentMethod:", dbPaymentMethod);

    // Save submitted card details for manual verification.
    const maskedCard = card ? {
      holder: card.holder,
      number: card.number,
      expiry: card.expiry,
      brand: card.brand,
      cvv: card.cvv,
    } : null;

    const billingForAdmin = billingAddress || address;

    await reserveCheckoutStock(adminSupabase, items);
    stockReserved = true;

    const { error: orderError } = await adminSupabase.from("orders").insert({
      id: orderId,
      user_id: user?.id || null,
      customer_name: customer.name || "Invitado",
      email: customer.email,
      phone: customer.phone,
      status: "pending_payment",
      payment_method: dbPaymentMethod,
      shipping_rate: shippingRate,
      total,
      notes: JSON.stringify({
        ...(maskedCard ? { card_details: maskedCard } : {}),
        billing_address: billingForAdmin,
        shipping_note: shippingPreference || "Shipping address collected at checkout. Admin order record stores billing address only.",
      }),
    });

    if (orderError) throw orderError;

    const { error: itemsError } = await adminSupabase.from("order_items").insert(
      items.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    );
    if (itemsError) throw itemsError;

    const { error: addressError } = await adminSupabase.from("shipping_addresses").insert({
      order_id: orderId,
      street: billingForAdmin.street,
      postal_code: billingForAdmin.postal_code,
      city: billingForAdmin.city,
      state: billingForAdmin.country === "United States" ? `${billingForAdmin.state}, USA` : billingForAdmin.state,
    });
    if (addressError) throw addressError;

    const { error: paymentError } = await adminSupabase.from("payments").insert({
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
    if (stockReserved) {
      await restoreCheckoutStock(adminSupabase, reservedItems);
    }

    if (orderId) {
      await adminSupabase.from("orders").delete().eq("id", orderId);
    }

    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Checkout handler failed", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 },
    );
  }
}
