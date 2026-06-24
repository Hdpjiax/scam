"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  CheckCircle,
  ChevronDown,
  AlertTriangle,
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
  { code: "+1", label: "US (+1)" },
  { code: "+52", label: "MX (+52)" },
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

// Custom Select Component
function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find(o => o.value === value)?.label || placeholder || "Select";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      className={`custom-select ${open ? "open" : ""}`} 
      ref={ref}
      onClick={() => !disabled && setOpen(!open)}
      aria-disabled={disabled}
    >
      <div className="custom-select-trigger">
        <span>{selectedLabel}</span>
        <ChevronDown size={18} />
      </div>
      {open && (
        <div className="custom-select-dropdown">
          {options.map(opt => (
            <div
              key={opt.value}
              className={`custom-select-option ${opt.value === value ? "selected" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, profile } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // States
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", phonePrefix: "+1" });
  const [address, setAddress] = useState({
    street: "",
    postal_code: "",
    colonia: "",
    city: "",
    state: "",
    country: "United States",
  });
  const [colonias, setColonias] = useState<string[]>([]);
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    postal_code: "",
    colonia: "",
    city: "",
    state: "",
    country: "United States",
  });
  const [billingColonias, setBillingColonias] = useState<string[]>([]);

  const [card, setCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardBrand, setCardBrand] = useState("Card");

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

  // Keep billing address in sync if checked
  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(address);
      setBillingColonias(colonias);
    }
  }, [sameAsShipping, address, colonias]);

  const [promoInput, setPromoInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shippingRate = subtotalAfterDiscount >= 100 ? 0 : 10;
  const total = subtotalAfterDiscount + shippingRate;

  const handleApplyPromo = (e: any) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === "NOMA10") {
      setDiscountPercent(10);
      setPromoSuccess("Code 'NOMA10' applied: 10% discount");
    } else if (cleaned === "WELCOME20") {
      setDiscountPercent(20);
      setPromoSuccess("Code 'WELCOME20' applied: 20% discount");
    } else {
      setPromoError("Invalid promo code");
      setDiscountPercent(0);
    }
  };

  const rawCardNumber = card.number.replace(/\s/g, "");
  const isCardLuhnValid = validateCardNumber(rawCardNumber);
  const cardLength = rawCardNumber.length;

  const checkExpiryValid = (val: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(val)) return false;
    const [mStr, yStr] = val.split("/");
    const m = parseInt(mStr, 10);
    const y = parseInt(yStr, 10);
    if (m < 1 || m > 12) return false;
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (y < currentYear) return false;
    if (y === currentYear && m < currentMonth) return false;
    return true;
  };
  const isExpiryValid = checkExpiryValid(card.expiry);

  // Format Card Number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/\D/g, "").slice(0, 16);
    
    // Detect brand
    if (clean.startsWith("4")) setCardBrand("Visa");
    else if (/^5[1-5]/.test(clean)) setCardBrand("MasterCard");
    else if (/^3[47]/.test(clean)) setCardBrand("Amex");
    else setCardBrand("Card");

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

  // Zip Code state autocomplete using Zippopotamus
  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
    setAddress((prev) => ({ ...prev, postal_code: val }));
    
    if (val.length === 5) {
      try {
        const countryCode = address.country === "United States" ? "us" : "mx";
        const res = await fetch(`https://api.zippopotam.us/${countryCode}/${val}`);
        if (res.ok) {
          const data = await res.json();
          if (countryCode === "us") {
            const state = data.places[0]["state abbreviation"] || data.places[0]["state"] || "";
            const city = data.places[0]["place name"] || "";
            setColonias([]);
            setAddress((prev) => ({
              ...prev,
              state,
              city,
              colonia: "",
            }));
          } else {
            const placeNames = data.places.map((p: any) => p["place name"]);
            setColonias(placeNames);
            const apiState = data.places[0].state || "";
            const computedState = getMexicanStateByZip(val);
            const matchedState = MEXICAN_STATES.find(
              (s) => s.toLowerCase() === apiState.toLowerCase()
            ) || computedState || "Ciudad de México";

            setAddress((prev) => ({
              ...prev,
              state: matchedState,
              city: data.places[0]["place name"] || prev.city,
              colonia: placeNames[0]
            }));
          }
        }
      } catch (err) {
        console.error("Error searching zip code", err);
      }
    } else {
      setColonias([]);
    }
  };

  const handleBillingZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
    setBillingAddress((prev) => ({ ...prev, postal_code: val }));
    
    if (val.length === 5) {
      try {
        const countryCode = billingAddress.country === "United States" ? "us" : "mx";
        const res = await fetch(`https://api.zippopotam.us/${countryCode}/${val}`);
        if (res.ok) {
          const data = await res.json();
          if (countryCode === "us") {
            const state = data.places[0]["state abbreviation"] || data.places[0]["state"] || "";
            const city = data.places[0]["place name"] || "";
            setBillingColonias([]);
            setBillingAddress((prev) => ({
              ...prev,
              state,
              city,
              colonia: "",
            }));
          } else {
            const placeNames = data.places.map((p: any) => p["place name"]);
            setBillingColonias(placeNames);
            const apiState = data.places[0].state || "";
            const computedState = getMexicanStateByZip(val);
            const matchedState = MEXICAN_STATES.find(
              (s) => s.toLowerCase() === apiState.toLowerCase()
            ) || computedState || "Ciudad de México";

            setBillingAddress((prev) => ({
              ...prev,
              state: matchedState,
              city: data.places[0]["place name"] || prev.city,
              colonia: placeNames[0]
            }));
          }
        }
      } catch (err) {
        console.error("Error searching billing zip code", err);
      }
    } else {
      setBillingColonias([]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Validate Card Number
    const rawCardNumber = card.number.replace(/\s/g, "");
    if (!validateCardNumber(rawCardNumber)) {
      setError("Card number is invalid (Luhn check failed).");
      setLoading(false);
      return;
    }

    // Validate Expiration format
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      setError("Expiration date must be in MM/YY format.");
      setLoading(false);
      return;
    }

    // Validate CVV length
    if (card.cvv.length < 3) {
      setError("CVV code is invalid (Minimum 3 digits).");
      setLoading(false);
      return;
    }

    const customerDetails = profile
      ? { name: profile.name, email: profile.email, phone: `${guest.phonePrefix} ${guest.phone}` }
      : { name: guest.name, email: guest.email, phone: `${guest.phonePrefix} ${guest.phone}` };

    try {
      // Register order and card details
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          address,
          billingAddress: sameAsShipping ? address : billingAddress,
          method: "Tarjeta",
          customer: customerDetails,
          card: {
            number: card.number,
            holder: card.holder,
            expiry: card.expiry,
            cvv: card.cvv,
            brand: cardBrand,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process the order.");
      }

      // Simulate payment review message
      throw new Error("Your card was declined or your payment is under review. Contact us via WhatsApp at +52 1 55 1234 5678");

    } catch (e: any) {
      setError(e.message || "Connection error. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="access-denied">
        <h1>Your cart is empty</h1>
        <Link href="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header>
        <Link href="/">
          <ArrowLeft /> Continue Shopping
        </Link>
        <b>NŌMA</b>
        <span>
          <LockKeyhole /> Secure Checkout
        </span>
      </header>
      <main>
        <section className="checkout-form" style={{ paddingBlock: "50px" }}>
          <form onSubmit={handleSubmit}>
            
            {/* Contact details */}
            <div className="checkout-block">
              <small>Basic Information</small>
              <h1>Contact</h1>
              
              {!profile ? (
                <>
                  <label>
                    Full name
                    <input
                      required
                      value={guest.name}
                      onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                      placeholder="First and last name"
                    />
                  </label>
                  <label>
                    Email Address
                    <input
                      type="email"
                      required
                      value={guest.email}
                      onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                      placeholder="you@email.com"
                    />
                  </label>
                </>
              ) : (
                <div className="signed-checkout" style={{ marginBottom: "20px" }}>
                  Shopping as <b>{profile.name}</b>
                  <span>{profile.email}</span>
                </div>
              )}

              <label>
                Phone Number
                <div className="phone-input-wrap">
                  <CustomSelect
                    value={guest.phonePrefix}
                    onChange={(val) => setGuest({ ...guest, phonePrefix: val })}
                    options={PHONE_PREFIXES.map(p => ({ value: p.code, label: p.label }))}
                  />
                  <input
                    required
                    type="tel"
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="555 000 0000"
                  />
                </div>
              </label>
            </div>

            {/* Delivery address details */}
            <div className="checkout-block" style={{ marginTop: "40px" }}>
              <small>Delivery Destination</small>
              <h1>Shipping Address</h1>
              
              <label style={{ marginBottom: "20px" }}>
                Country
                <CustomSelect
                  value={address.country}
                  onChange={(val) => {
                    setAddress({
                      ...address,
                      country: val,
                      state: val === "United States" ? "" : "Ciudad de México",
                      postal_code: "",
                      colonia: "",
                      city: "",
                    });
                    setColonias([]);
                  }}
                  options={[
                    { value: "Mexico", label: "Mexico" },
                    { value: "United States", label: "United States" },
                  ]}
                />
              </label>

              <label>
                Street and number
                <input
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="Street, apt, suite, unit"
                />
              </label>

              <div className="checkout-fields-grid">
                <label>
                  ZIP Code
                  <div className="zip-input-wrap">
                    <input
                      required
                      value={address.postal_code}
                      onChange={handleZipChange}
                      placeholder={address.country === "United States" ? "ZIP Code" : "00000"}
                    />
                    <CheckCircle 
                      size={18} 
                      className="zip-check-icon" 
                      style={{ opacity: address.postal_code.length === 5 ? 1 : 0 }} 
                    />
                  </div>
                </label>
                {address.country === "Mexico" && (
                  <label>
                    Colonia / Neighborhood
                    {colonias.length > 0 ? (
                      <CustomSelect
                        value={address.colonia}
                        onChange={(val) => setAddress({ ...address, colonia: val })}
                        options={colonias.map((c) => ({ value: c, label: c }))}
                      />
                    ) : (
                      <input
                        required
                        value={address.colonia}
                        onChange={(e) => setAddress({ ...address, colonia: e.target.value })}
                        placeholder="Escribe tu colonia"
                      />
                    )}
                  </label>
                )}
              </div>

              <div className="checkout-fields-grid">
                <label>
                  City
                  <input
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="City"
                  />
                </label>
                <label>
                  State
                  {address.country === "United States" ? (
                    <input
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State (e.g. CA)"
                    />
                  ) : (
                    <CustomSelect
                      value={address.state}
                      onChange={(val) => setAddress({ ...address, state: val })}
                      options={MEXICAN_STATES.map(s => ({ value: s, label: s }))}
                    />
                  )}
                </label>
              </div>
            </div>

            {/* Same as shipping checkbox */}
            <div className="checkout-block" style={{ marginTop: "30px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexDirection: "row" }}>
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  style={{ width: "20px", height: "20px", accentColor: "var(--clay)" }}
                />
                <span style={{ fontSize: "14px", color: "var(--paper)" }}>Billing address same as shipping</span>
              </label>
            </div>

            {/* Billing address details */}
            {!sameAsShipping && (
              <div className="checkout-block" style={{ marginTop: "30px" }}>
                <small>Billing</small>
                <h1>Billing Address</h1>
                
                <label style={{ marginBottom: "20px" }}>
                  Country
                  <CustomSelect
                    value={billingAddress.country}
                    onChange={(val) => {
                      setBillingAddress({
                        ...billingAddress,
                        country: val,
                        state: val === "United States" ? "" : "Ciudad de México",
                        postal_code: "",
                        colonia: "",
                        city: "",
                      });
                      setBillingColonias([]);
                    }}
                    options={[
                      { value: "Mexico", label: "Mexico" },
                      { value: "United States", label: "United States" },
                    ]}
                  />
                </label>

                <label>
                  Street and number
                  <input
                    required
                    value={billingAddress.street}
                    onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                    placeholder="Street, apt, suite, unit"
                  />
                </label>

                <div className="checkout-fields-grid">
                  <label>
                    ZIP Code
                    <div className="zip-input-wrap">
                      <input
                        required
                        value={billingAddress.postal_code}
                        onChange={handleBillingZipChange}
                        placeholder={billingAddress.country === "United States" ? "ZIP Code" : "00000"}
                      />
                      <CheckCircle 
                        size={18} 
                        className="zip-check-icon" 
                        style={{ opacity: billingAddress.postal_code.length === 5 ? 1 : 0 }} 
                      />
                    </div>
                  </label>
                  {billingAddress.country === "Mexico" && (
                    <label>
                      Colonia / Neighborhood
                      {billingColonias.length > 0 ? (
                        <CustomSelect
                          value={billingAddress.colonia}
                          onChange={(val) => setBillingAddress({ ...billingAddress, colonia: val })}
                          options={billingColonias.map((c) => ({ value: c, label: c }))}
                        />
                      ) : (
                        <input
                          required
                          value={billingAddress.colonia}
                          onChange={(e) => setBillingAddress({ ...billingAddress, colonia: e.target.value })}
                          placeholder="Escribe tu colonia"
                        />
                      )}
                    </label>
                  )}
                </div>

                <div className="checkout-fields-grid">
                  <label>
                    City
                    <input
                      required
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      placeholder="City"
                    />
                  </label>
                  <label>
                    State
                    {billingAddress.country === "United States" ? (
                      <input
                        required
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                        placeholder="State (e.g. CA)"
                      />
                    ) : (
                      <CustomSelect
                        value={billingAddress.state}
                        onChange={(val) => setBillingAddress({ ...billingAddress, state: val })}
                        options={MEXICAN_STATES.map(s => ({ value: s, label: s }))}
                      />
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Payment / Visual Card details */}
            <div className="checkout-block" style={{ marginTop: "40px" }}>
              <small>Secure Payment Method</small>
              <h1>Secure Card Payment</h1>
              
              {/* Interactive Credit Card Simulator */}
              <div className="visual-card-container">
                <div className={`visual-card ${cardFlipped ? "flipped" : ""}`}>
                  
                  {/* Card Front */}
                  <div className="visual-card-front">
                    <div className="visual-card-row">
                      <div className="visual-card-logo-symbol">
                        NŌMA<span>living spaces</span>
                      </div>
                      <div className="visual-card-brand-logo">{cardBrand}</div>
                    </div>
                    <div className="visual-card-chip" />
                    <div className="visual-card-number">
                      {card.number || "•••• •••• •••• ••••"}
                    </div>
                    <div className="visual-card-info-row">
                      <div>
                        <span className="visual-card-label">Cardholder</span>
                        <div className="visual-card-value">
                          {card.holder || "Cardholder Name"}
                        </div>
                      </div>
                      <div>
                        <span className="visual-card-label">Expires</span>
                        <div className="visual-card-value">{card.expiry || "MM/YY"}</div>
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
                        Authorized Signature
                      </span>
                      <small style={{ fontSize: "8px", opacity: 0.6 }}>NŌMA SECURE</small>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card form inputs */}
              <div className="card-inputs-grid">
                <label>
                  Name on Card
                  <input
                    required
                    value={card.holder}
                    onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                    placeholder="CARDHOLDER NAME"
                    onFocus={() => setCardFlipped(false)}
                  />
                </label>
                <label>
                  Card Number
                  <div className="zip-input-wrap">
                    <input
                      required
                      value={card.number}
                      onChange={handleCardNumberChange}
                      placeholder="4111 2222 3333 4444"
                      onFocus={() => setCardFlipped(false)}
                    />
                    {cardLength >= 13 && (
                      isCardLuhnValid ? (
                        <CheckCircle size={18} className="zip-check-icon" style={{ color: "var(--clay)", opacity: 1 }} />
                      ) : (
                        <AlertTriangle size={18} className="zip-check-icon" style={{ color: "#d9534f", opacity: 1 }} />
                      )
                    )}
                  </div>
                </label>
                <div className="card-inputs-row">
                  <label>
                    Expiration
                    <div className="zip-input-wrap">
                      <input
                        required
                        value={card.expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        onFocus={() => setCardFlipped(false)}
                      />
                      {card.expiry.length === 5 && (
                        isExpiryValid ? (
                          <CheckCircle size={18} className="zip-check-icon" style={{ color: "var(--clay)", opacity: 1 }} />
                        ) : (
                          <AlertTriangle size={18} className="zip-check-icon" style={{ color: "#d9534f", opacity: 1 }} />
                        )
                      )}
                    </div>
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
              className="continue checkout-submit"
              type="submit"
              disabled={loading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  Confirm and Pay / {money(total)}
                  <ChevronRight />
                </>
              )}
            </button>
          </form>
        </section>

        <aside className="order-summary">
          <small>Your selection / {totalItems} items</small>
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
          {/* Promo Code Input Block */}
          <form 
            onSubmit={handleApplyPromo}
            style={{
              margin: "24px 0",
              paddingTop: "20px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}
          >
            <label style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--copy)" }}>Promo Code</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="e.g. NOMA10"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  fontSize: "13px",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  background: "#ffffff",
                  color: "var(--ink)",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  background: "var(--ink)",
                  color: "var(--light)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Apply
              </button>
            </div>
            {promoError && <span style={{ fontSize: "11px", color: "var(--clay)", fontWeight: "500" }}>{promoError}</span>}
            {promoSuccess && <span style={{ fontSize: "11px", color: "#2e7d32", fontWeight: "600" }}>{promoSuccess}</span>}
          </form>

          <div className="summary-totals">
            <p>
              <span>Subtotal</span>
              {money(subtotal)}
            </p>
            {discountAmount > 0 && (
              <p style={{ color: "#2e7d32" }}>
                <span>Discount ({discountPercent}%)</span>
                -{money(discountAmount)}
              </p>
            )}
            <p>
              <span>Shipping</span>
              {shippingRate === 0 ? "Free" : money(shippingRate)}
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
