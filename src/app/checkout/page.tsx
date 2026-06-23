"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Landmark,
  LockKeyhole,
  WalletCards,
} from "lucide-react";
import { useStore } from "../../providers/StoreProvider";
import { money } from "../../lib/utils";
import type { PaymentMethod } from "../../lib/payments/payment-provider";

export default function CheckoutPage() {
  const { cart, profile } = useStore();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<PaymentMethod>("Stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({
    street: "",
    postal_code: "",
    city: "",
    state: "Ciudad de México",
  });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shippingRate = subtotal >= 1999 ? 0 : 199;
  const total = subtotal + shippingRate;

  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    processOrder();
  };

  const processOrder = async () => {
    setLoading(true);
    setError("");

    const customerDetails = profile
      ? { name: profile.name, email: profile.email, phone: guest.phone }
      : guest;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          address,
          method,
          customer: customerDetails,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al procesar el checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e: any) {
      setError(e.message || "Fallo en la conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="access-denied">
        <h1>Tu bolsa está vacía</h1>
        <Link href="/">Explorar productos</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header>
        <Link href="/">
          <ArrowLeft /> Seguir comprando
        </Link>
        <b>NŌMA</b>
        <span>
          <LockKeyhole /> Pago seguro
        </span>
      </header>
      <main>
        <section className="checkout-form">
          <div className="checkout-steps">
            <span className={step >= 1 ? "on" : ""}>
              1 <i>Contacto</i>
            </span>
            <hr />
            <span className={step >= 2 ? "on" : ""}>
              2 <i>Entrega</i>
            </span>
            <hr />
            <span className={step >= 3 ? "on" : ""}>
              3 <i>Pago</i>
            </span>
          </div>

          <form onSubmit={handleNextStep}>
            {step === 1 && (
              <div className="checkout-block">
                <small>Paso 1 de 3</small>
                <h1>
                  ¿A dónde enviamos
                  <br />
                  tu confirmación?
                </h1>
                {!profile ? (
                  <>
                    <label>
                      Nombre completo
                      <input
                        required
                        value={guest.name}
                        onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                        placeholder="Nombre y apellidos"
                      />
                    </label>
                    <label>
                      Correo electrónico
                      <input
                        type="email"
                        required
                        value={guest.email}
                        onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                        placeholder="tu@email.com"
                      />
                    </label>
                  </>
                ) : (
                  <div className="signed-checkout">
                    Compras como <b>{profile.name}</b>
                    <span>{profile.email}</span>
                  </div>
                )}
                <label>
                  Teléfono
                  <input
                    required
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                    placeholder="+52 55 0000 0000"
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-block">
                <small>Paso 2 de 3</small>
                <h1>
                  Tu nuevo objeto
                  <br />
                  va hacia...
                </h1>
                <label>
                  Calle y número
                  <input
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Calle, número exterior e interior"
                  />
                </label>
                <div className="two">
                  <label>
                    Código postal
                    <input
                      required
                      value={address.postal_code}
                      onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                      placeholder="00000"
                    />
                  </label>
                  <label>
                    Ciudad
                    <input
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Ciudad"
                    />
                  </label>
                </div>
                <label>
                  Estado
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                  >
                    <option>Ciudad de México</option>
                    <option>Jalisco</option>
                    <option>Nuevo León</option>
                    <option>Estado de México</option>
                    <option>Otro</option>
                  </select>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-block">
                <small>Paso 3 de 3</small>
                <h1>Elige cómo pagar</h1>
                <div className="payment-methods three">
                  <button
                    type="button"
                    className={method === "Stripe" ? "on" : ""}
                    onClick={() => setMethod("Stripe")}
                  >
                    <CreditCard />
                    <b>Tarjeta</b>
                    <span>Stripe Checkout</span>
                  </button>
                  <button
                    type="button"
                    className={method === "MercadoPago" ? "on" : ""}
                    onClick={() => setMethod("MercadoPago")}
                  >
                    <WalletCards />
                    <b>Mercado Pago</b>
                    <span>Tarjeta, wallet y métodos locales</span>
                  </button>
                  <button
                    type="button"
                    className={method === "Transferencia" ? "on" : ""}
                    onClick={() => setMethod("Transferencia")}
                  >
                    <Landmark />
                    <b>Transferencia</b>
                    <span>Verificación manual SPEI</span>
                  </button>
                </div>

                {method === "Transferencia" ? (
                  <div className="bank-data">
                    <b>Transferencia SPEI</b>
                    <p>Banco: STP / CLABE: 646 180 0000000000</p>
                    <small>
                      El pedido llegará al panel como pendiente hasta verificar la
                      transferencia.
                    </small>
                  </div>
                ) : (
                  <div className="safe-card">
                    <b>Procesamiento bancario seguro</b>
                    <p>
                      Te llevaremos a la pasarela elegida. NŌMA nunca almacena
                      datos bancarios y el pedido solo se confirma por webhook.
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && <p className="form-error">{error}</p>}

            <button className="continue" type="submit" disabled={loading}>
              {loading
                ? "Procesando..."
                : step === 3
                  ? `Confirmar y pagar / ${money(total)}`
                  : "Continuar"}
              <ChevronRight />
            </button>
          </form>
        </section>

        <aside className="order-summary">
          <small>Tu selección / {totalItems} piezas</small>
          {cart.map((item, i) => (
            <div className="summary-line" key={i}>
              <img src={item.product.image} alt={item.product.name} />
              <span>
                <b>{item.product.name}</b>
                <small>
                  {item.product.category} / x{item.quantity}
                </small>
              </span>
              <strong>{money(item.product.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-totals">
            <p>
              <span>Subtotal</span>
              {money(subtotal)}
            </p>
            <p>
              <span>Envío</span>
              {shippingRate === 0 ? "Gratis" : money(shippingRate)}
            </p>
            <b>
              <span>Total</span>
              {money(total)}
            </b>
          </div>
        </aside>
      </main>
    </div>
  );
}
