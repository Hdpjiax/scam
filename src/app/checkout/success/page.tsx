"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "../../../providers/StoreProvider";

function SuccessContent() {
  const { clearCart } = useStore();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id") || "N/A";
  const paymentType = searchParams.get("payment");
  const pending = paymentType === "spei" || paymentType === "pending";

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="checkout-success">
      <div>
        <span className="success-icon-wrap">
          <Check />
        </span>
        <small>{pending ? "Pedido recibido" : "Pedido confirmado"}</small>
        <h1>
          Gracias por
          <br />
          <em>elegir bonito.</em>
        </h1>
        <p>
          Tu pedido <b>#{orderId}</b>{" "}
          {pending
            ? "quedó pendiente de verificación bancaria."
            : "está pagado y listo para prepararse."}
        </p>
        <Link href="/" className="success-link">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="checkout-success">Cargando confirmación...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
