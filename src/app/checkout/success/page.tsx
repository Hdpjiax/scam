"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "../../../providers/StoreProvider";

import { Suspense } from "react";

function SuccessContent() {
  const { clearCart } = useStore();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id") || "N/A";
  const paymentType = searchParams.get("payment");

  // Vaciar el carrito de forma automática al confirmar la orden
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="checkout-success">
      <div>
        <div className="success-icon-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: '#9d5037', color: '#fff', borderRadius: '50%', padding: '16px', display: 'inline-flex' }}>
            <Check size={32} />
          </div>
        </div>
        <small>Pedido confirmado</small>
        <h1>
          Gracias por
          <br />
          <em>elegir bonito.</em>
        </h1>
        <p>
          Tu pedido <b>#{orderId}</b> está{" "}
          {paymentType === "spei"
            ? "pendiente de verificación bancaria (SPEI)"
            : "pagado y listo para prepararse"}
          .
        </p>
        <Link href="/" className="ds-primary" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '20px' }}>
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
