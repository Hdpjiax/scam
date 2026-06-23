"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  CheckCircle,
} from "lucide-react";
import { useStore } from "../../providers/StoreProvider";
import { money } from "../../lib/utils";

const MEXICAN_STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Ciudad de México",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Estado de México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas"
];

const PHONE_PREFIXES = [
  { code: "+52", label: "MX (+52)" },
  { code: "+1", label: "US (+1)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+57", label: "CO (+57)" },
  { code: "+54", label: "AR (+54)" },
  { code: "+56", label: "CL (+56)" },
  { code: "+51", label: "PE (+51)" },
  { code: "+58", label: "VE (+58)" },
];

const getMexicanStateByZip = (zip: string): string => {
  if (!zip || zip.length < 2) return "";
  const prefix = parseInt(zip.substring(0, 2), 10);
  if (isNaN(prefix)) return "";
  
  if (prefix >= 0 && prefix <= 16) return "Ciudad de México";
  if (prefix === 20) return "Aguascalientes";
  if (prefix >= 21 && prefix <= 22) return "Baja California";
  if (prefix === 23) return "Baja California Sur";
  if (prefix === 24) return "Campeche";
  if (prefix >= 29 && prefix <= 30) return "Chiapas";
  if (prefix >= 31 && prefix <= 33) return "Chihuahua";
  if (prefix >= 25 && prefix <= 27) return "Coahuila";
  if (prefix === 28) return "Colima";
  if (prefix >= 34 && prefix <= 35) return "Durango";
  if (prefix >= 36 && prefix <= 38) return "Guanajuato";
  if (prefix >= 39 && prefix <= 41) return "Guerrero";
  if (prefix >= 42 && prefix <= 43) return "Hidalgo";
  if (prefix >= 44 && prefix <= 49) return "Jalisco";
  if (prefix >= 50 && prefix <= 57) return "Estado de México";
  if (prefix >= 58 && prefix <= 61) return "Michoacán";
  if (prefix === 62) return "Morelos";
  if (prefix === 63) return "Nayarit";
  if (prefix >= 64 && prefix <= 67) return "Nuevo León";
  if (prefix >= 68 && prefix <= 71) return "Oaxaca";
  if (prefix >= 72 && prefix <= 75) return "Puebla";
  if (prefix === 76) return "Querétaro";
  if (prefix === 77) return "Quintana Roo";
  if (prefix >= 78 && prefix <= 79) return "San Luis Potosí";
  if (prefix >= 80 && prefix <= 82) return "Sinaloa";
  if (prefix >= 83 && prefix <= 85) return "Sonora";
  if (prefix === 86) return "Tabasco";
  if (prefix >= 87 && prefix <= 89) return "Tamaulipas";
  if (prefix === 90) return "Tlaxcala";
  if (prefix >= 91 && prefix <= 96) return "Veracruz";
  if (prefix === 97) return "Yucatán";
  if (prefix >= 98 && prefix <= 99) return "Zacatecas";
  
  return "";
};

const validateCardNumber = (num: string): boolean => {
  const clean = num.replace(/\D/g, "");
  if (clean.length < 13 || clean.length > 19) return false;
  
  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export default function CheckoutPage() {
  const { cart, profile } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // States
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", phonePrefix: "+52" });
  const [address, setAddress] = useState({
    street: "",
    postal_code: "",
    city: "",
    state: "Ciudad de México",
  });
  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardBrand, setCardBrand] = useState("Tarjeta");

  // Load profile data if logged in
  useEffect(() => {
    if (profile) {
      setGuest((prev) => ({
        ...prev,
        name: profile.name || prev.name,
        email: profile.email || prev.email,
      }));
    }
  }, [profile]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shippingRate = subtotal >= 1999 ? 0 : 199;
  const total = subtotal + shippingRate;

  // Format Card Number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/\D/g, "").slice(0, 16);
    
    // Detect brand
    if (clean.startsWith("4")) setCardBrand("Visa");
    else if (/^5[1-5]/.test(clean)) setCardBrand("MasterCard");
    else if (/^3[47]/.test(clean)) setCardBrand("Amex");
    else setCardBrand("Tarjeta");

    // Format with spaces
    const parts: string[] = [];
    for (let i = 0; i < clean.length; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    setCard((prev) => ({ ...prev, number: parts.join(" ") }));
  };

  // Format Expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 2) {
      setCard((prev) => ({ ...prev, expiry: `${clean.slice(0, 2)}/${clean.slice(2)}` }));
    } else {
      setCard((prev) => ({ ...prev, expiry: clean }));
    }
  };

  // Zip Code state autocomplete
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
    setAddress((prev) => {
      const nextZip = val;
      const state = getMexicanStateByZip(nextZip);
      
      let city = prev.city;
      if (state === "Ciudad de México") city = "Ciudad de México";
      else if (state === "Jalisco" && nextZip.startsWith("44")) city = "Guadalajara";
      else if (state === "Nuevo León" && nextZip.startsWith("64")) city = "Monterrey";
      else if (state === "Estado de México" && nextZip.startsWith("50")) city = "Toluca";

      return {
        ...prev,
        postal_code: nextZip,
        state: state || prev.state,
        city: city || prev.city
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Validate Card Number
    const rawCardNumber = card.number.replace(/\s/g, "");
    if (!validateCardNumber(rawCardNumber)) {
      setError("El número de tarjeta no es válido (Fallo en verificación Luhn).");
      setLoading(false);
      return;
    }

    // Validate Expiration format
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      setError("La fecha de vencimiento debe tener formato MM/AA.");
      setLoading(false);
      return;
    }

    // Validate CVV length
    if (card.cvv.length < 3) {
      setError("El código CVV es inválido (Mínimo 3 dígitos).");
      setLoading(false);
      return;
    }

    const customerDetails = profile
      ? { name: profile.name, email: profile.email, phone: `${guest.phonePrefix} ${guest.phone}` }
      : { name: guest.name, email: guest.email, phone: `${guest.phonePrefix} ${guest.phone}` };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          address,
          method: "Tarjeta",
          customer: customerDetails,
          card: {
            number: card.number,
            holder: card.holder,
            expiry: card.expiry,
            cvv: card.cvv,
            brand: cardBrand
          }
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
          <LockKeyhole /> Pago seguro express
        </span>
      </header>
      <main>
        <section className="checkout-form" style={{ paddingBlock: "50px" }}>
          <form onSubmit={handleSubmit}>
            
            {/* Contact details */}
            <div className="checkout-block">
              <small>Información básica</small>
              <h1>Contacto</h1>
              
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
                <div className="signed-checkout" style={{ marginBottom: "20px" }}>
                  Compras como <b>{profile.name}</b>
                  <span>{profile.email}</span>
                </div>
              )}

              <label>
                Teléfono
                <div className="phone-input-wrap">
                  <select
                    className="phone-prefix-select"
                    value={guest.phonePrefix}
                    onChange={(e) => setGuest({ ...guest, phonePrefix: e.target.value })}
                    aria-label="Prefijo telefónico de país"
                  >
                    {PHONE_PREFIXES.map((prefix) => (
                      <option key={prefix.code} value={prefix.code}>
                        {prefix.label}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="55 0000 0000"
                  />
                </div>
              </label>
            </div>

            {/* Delivery address details */}
            <div className="checkout-block" style={{ marginTop: "40px" }}>
              <small>Destino de entrega</small>
              <h1>Dirección de envío</h1>
              
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
                    onChange={handleZipChange}
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
                  {MEXICAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Payment / Visual Card details */}
            <div className="checkout-block" style={{ marginTop: "40px" }}>
              <small>Método de pago único</small>
              <h1>Pago seguro con tarjeta</h1>
              
              {/* Interactive Credit Card Simulator */}
              <div className="visual-card-container">
                <div className={`visual-card ${cardFlipped ? "flipped" : ""}`}>
                  
                  {/* Card Front */}
                  <div className="visual-card-front">
                    <div className="visual-card-row">
                      <div className="visual-card-logo-symbol">
                        NŌMA<span>casa viva</span>
                      </div>
                      <div className="visual-card-brand-logo">{cardBrand}</div>
                    </div>
                    <div className="visual-card-chip" />
                    <div className="visual-card-number">
                      {card.number || "•••• •••• •••• ••••"}
                    </div>
                    <div className="visual-card-info-row">
                      <div>
                        <span className="visual-card-label">Titular</span>
                        <div className="visual-card-value">
                          {card.holder || "Nombre del Titular"}
                        </div>
                      </div>
                      <div>
                        <span className="visual-card-label">Vence</span>
                        <div className="visual-card-value">{card.expiry || "MM/AA"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div className="visual-card-back">
                    <div className="visual-card-back-magnetic" />
                    <div className="visual-card-back-sig-area">
                      <div className="visual-card-back-sig-line" />
                      <div className="visual-card-back-cvv">{card.cvv || "•••"}</div>
                    </div>
                    <div className="visual-card-row" style={{ marginTop: "auto", padding: "0 24px 20px" }}>
                      <span className="visual-card-label" style={{ margin: 0 }}>
                        Firma autorizada
                      </span>
                      <small style={{ fontSize: "8px", opacity: 0.6 }}>NŌMA SECURE</small>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card form inputs */}
              <div className="card-inputs-grid">
                <label>
                  Nombre en la tarjeta
                  <input
                    required
                    value={card.holder}
                    onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                    placeholder="COMO APARECE EN LA TARJETA"
                    onFocus={() => setCardFlipped(false)}
                  />
                </label>
                <label>
                  Número de tarjeta
                  <input
                    required
                    value={card.number}
                    onChange={handleCardNumberChange}
                    placeholder="4111 2222 3333 4444"
                    onFocus={() => setCardFlipped(false)}
                  />
                </label>
                <div className="card-inputs-row">
                  <label>
                    Vencimiento
                    <input
                      required
                      value={card.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/AA"
                      onFocus={() => setCardFlipped(false)}
                    />
                  </label>
                  <label>
                    CVV
                    <input
                      required
                      type="password"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") })}
                      placeholder="•••"
                      onFocus={() => setCardFlipped(true)}
                      onBlur={() => setCardFlipped(false)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <p className="form-error" style={{ marginTop: "20px" }}>
                {error}
              </p>
            )}

            <button
              className="continue"
              type="submit"
              disabled={loading}
              style={{ marginTop: "40px", width: "100%", height: "54px" }}
            >
              {loading ? (
                "Procesando pago seguro..."
              ) : (
                <>
                  Confirmar y pagar / {money(total)}
                  <ChevronRight />
                </>
              )}
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
