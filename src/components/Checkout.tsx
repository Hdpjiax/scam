import { useState } from "react";
import { useStore, Order } from "../store";
import { money } from "../data/products";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Landmark,
  LockKeyhole,
} from "lucide-react";
export default function Checkout() {
  const { cart, setCart, user, orders, setOrders } = useStore();
  const [step, setStep] = useState(1),
    [method, setMethod] = useState<"Tarjeta" | "Transferencia">("Tarjeta"),
    [done, setDone] = useState<Order | null>(null),
    [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const total = cart.reduce((a, p) => a + p.price, 0);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) return setStep(step + 1);
    const o: Order = {
      id: String(Date.now()).slice(-8),
      date: new Date().toISOString(),
      customer: user?.name || guest.name || "Invitado",
      email: user?.email || guest.email,
      total,
      status: method === "Tarjeta" ? "Pagado" : "Pendiente",
      payment: method,
      items: cart.map((p) => ({ name: p.name, qty: 1 })),
    };
    setOrders([o, ...orders]);
    setCart([]);
    setDone(o);
  };
  if (done)
    return (
      <div className="checkout-success">
        <div>
          <Check />
          <small>Pedido confirmado</small>
          <h1>
            Gracias por
            <br />
            <em>elegir bonito.</em>
          </h1>
          <p>
            Tu pedido <b>#{done.id}</b> está{" "}
            {done.status === "Pagado"
              ? "pagado y listo para prepararse"
              : "pendiente de verificación bancaria"}
            .
          </p>
          <a href="#/">Volver a la tienda</a>
        </div>
      </div>
    );
  if (!cart.length)
    return (
      <div className="access-denied">
        <h1>Tu bolsa está vacía</h1>
        <a href="#/">Explorar productos</a>
      </div>
    );
  return (
    <div className="checkout-page">
      <header>
        <a href="#/">
          <ArrowLeft /> Seguir comprando
        </a>
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
          <form onSubmit={submit}>
            {step === 1 && (
              <div className="checkout-block">
                <small>Paso 1 de 3</small>
                <h1>
                  ¿A dónde enviamos
                  <br />
                  tu confirmación?
                </h1>
                {!user && (
                  <>
                    <label>
                      Nombre completo
                      <input
                        required
                        value={guest.name}
                        onChange={(e) =>
                          setGuest({ ...guest, name: e.target.value })
                        }
                        placeholder="Nombre y apellidos"
                      />
                    </label>
                    <label>
                      Correo electrónico
                      <input
                        type="email"
                        required
                        value={guest.email}
                        onChange={(e) =>
                          setGuest({ ...guest, email: e.target.value })
                        }
                        placeholder="tu@email.com"
                      />
                    </label>
                  </>
                )}
                {user && (
                  <div className="signed-checkout">
                    Compras como <b>{user.name}</b>
                    <span>{user.email}</span>
                  </div>
                )}
                <label>
                  Teléfono
                  <input
                    required
                    value={guest.phone}
                    onChange={(e) =>
                      setGuest({ ...guest, phone: e.target.value })
                    }
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
                    placeholder="Calle, número exterior e interior"
                  />
                </label>
                <div className="two">
                  <label>
                    Código postal
                    <input required placeholder="00000" />
                  </label>
                  <label>
                    Ciudad
                    <input required placeholder="Ciudad" />
                  </label>
                </div>
                <label>
                  Estado
                  <select required>
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
                <div className="payment-methods">
                  <button
                    type="button"
                    className={method === "Tarjeta" ? "on" : ""}
                    onClick={() => setMethod("Tarjeta")}
                  >
                    <CreditCard />
                    <b>Tarjeta</b>
                    <span>Confirmación inmediata</span>
                  </button>
                  <button
                    type="button"
                    className={method === "Transferencia" ? "on" : ""}
                    onClick={() => setMethod("Transferencia")}
                  >
                    <Landmark />
                    <b>Transferencia</b>
                    <span>Verificación manual</span>
                  </button>
                </div>
                {method === "Tarjeta" ? (
                  <div className="safe-card">
                    <b>Procesamiento bancario seguro</b>
                    <p>
                      Este espacio está preparado para los campos cifrados de
                      Stripe o Mercado Pago. Nōma nunca almacena los datos
                      bancarios.
                    </p>
                  </div>
                ) : (
                  <div className="bank-data">
                    <b>Transferencia SPEI</b>
                    <p>Banco: STP · CLABE: 646 180 0000000000</p>
                    <small>
                      El pedido llegará al panel como pendiente para
                      verificarlo.
                    </small>
                  </div>
                )}
              </div>
            )}
            <button className="continue">
              {step === 3 ? `Confirmar · ${money(total)}` : "Continuar"}
              <ChevronRight />
            </button>
          </form>
        </section>
        <aside className="order-summary">
          <small>Tu selección · {cart.length} piezas</small>
          {cart.map((p, i) => (
            <div className="summary-line" key={i}>
              <img src={p.image} />
              <span>
                <b>{p.name}</b>
                <small>{p.category}</small>
              </span>
              <strong>{money(p.price)}</strong>
            </div>
          ))}
          <div className="summary-totals">
            <p>
              <span>Subtotal</span>
              {money(total)}
            </p>
            <p>
              <span>Envío</span>
              {total >= 1999 ? "Gratis" : money(199)}
            </p>
            <b>
              <span>Total</span>
              {money(total + (total >= 1999 ? 0 : 199))}
            </b>
          </div>
        </aside>
      </main>
    </div>
  );
}
