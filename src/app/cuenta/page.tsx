"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  ArrowLeft,
  X,
  Plus,
  Trash2,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Package,
  Truck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useStore } from "../../providers/StoreProvider";
import { createClient } from "../../lib/supabase/client";
import { money } from "../../lib/utils";

const STEPS = [
  {
    key: "placed",
    label: "Order Placed",
    desc: "We've received your order and payment.",
    icon: ShoppingBag,
  },
  {
    key: "processing",
    label: "Processing",
    desc: "Your pieces are being prepared and packaged.",
    icon: Package,
  },
  {
    key: "shipped",
    label: "Shipped",
    desc: "Your package is in transit via insured carbon-neutral shipping.",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    desc: "Delivered. Enjoy your new atmosphere.",
    icon: CheckCircle2,
  },
];

const getActiveStepIndex = (status: string) => {
  if (status === "pending_payment" || status === "paid") return 0;
  if (status === "processing") return 1;
  if (status === "shipped") return 2;
  if (status === "delivered") return 3;
  return 0;
};

export default function AccountPage() {
  const router = useRouter();
  const { profile, user, loading: storeLoading, signOut, wishlist, toggleWishlist, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "payment" | "settings">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  // Settings states
  const [settingsForm, setSettingsForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState("");

  // Card states
  const [savedCard, setSavedCard] = useState<any | null>(null);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", holder: "", expiry: "" });
  const [cardFormError, setCardFormError] = useState("");

  const supabase = createClient();

  // Redirect if not logged in
  useEffect(() => {
    if (!storeLoading && !profile) {
      router.push("/login");
    }
  }, [profile, storeLoading, router]);

  // Load user data
  useEffect(() => {
    if (profile) {
      setSettingsForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: user?.user_metadata?.phone || user?.phone || "",
        password: "",
        confirmPassword: "",
      });

      // Load card
      const stored = localStorage.getItem(`noma-saved-card-v1-${profile.id}`);
      if (stored) {
        try {
          setSavedCard(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing saved card", e);
        }
      }
    }
  }, [profile, user]);

  // Load orders
  useEffect(() => {
    if (!profile) return;
    const profileId = profile.id;

    async function fetchOrders() {
      setLoadingOrders(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, order_items(*), shipping_addresses(*)")
          .eq("user_id", profileId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchOrders();
  }, [profile, supabase]);

  if (storeLoading || !profile) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ink)",
        color: "var(--paper)"
      }}>
        <div className="loader-spinner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>Loading space...</span>
        </div>
      </div>
    );
  }

  // Formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/\D/g, "").slice(0, 16);
    const parts: string[] = [];
    for (let i = 0; i < clean.length; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    setCardForm((prev) => ({ ...prev, number: parts.join(" ") }));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setCardForm((prev) => ({ ...prev, expiry: "" }));
      return;
    }
    const clean = val.replace(/\D/g, "");
    
    if (val.length < cardForm.expiry.length && cardForm.expiry.endsWith("/") && clean.length === 2) {
      setCardForm((prev) => ({ ...prev, expiry: clean.slice(0, 1) }));
      return;
    }

    if (clean.length > 2) {
      setCardForm((prev) => ({ ...prev, expiry: `${clean.slice(0, 2)}/${clean.slice(2, 4)}` }));
    } else if (clean.length === 2) {
      if (val.length < cardForm.expiry.length) {
        setCardForm((prev) => ({ ...prev, expiry: clean }));
      } else {
        setCardForm((prev) => ({ ...prev, expiry: `${clean}/` }));
      }
    } else {
      setCardForm((prev) => ({ ...prev, expiry: clean }));
    }
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCardFormError("");

    const cleanNum = cardForm.number.replace(/\D/g, "");
    if (cleanNum.length < 13 || cleanNum.length > 19) {
      setCardFormError("Please enter a valid credit card number.");
      return;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    if (sum % 10 !== 0) {
      setCardFormError("The card number is invalid (failed checksum check).");
      return;
    }

    if (cardForm.holder.trim().split(/\s+/).length < 2) {
      setCardFormError("Please enter cardholder full name (first and last name).");
      return;
    }

    const expiryMatch = cardForm.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      setCardFormError("Expiry date must be in MM/YY format.");
      return;
    }
    const month = parseInt(expiryMatch[1], 10);
    const year = parseInt("20" + expiryMatch[2], 10);
    if (month < 1 || month > 12) {
      setCardFormError("Invalid expiration month (must be 01-12).");
      return;
    }
    const now = new Date();
    const expiryDate = new Date(year, month, 1);
    if (expiryDate <= now) {
      setCardFormError("The card has expired or expiration date is invalid.");
      return;
    }

    let brand = "Card";
    if (cleanNum.startsWith("4")) brand = "Visa";
    else if (/^5[1-5]/.test(cleanNum)) brand = "MasterCard";
    else if (/^3[47]/.test(cleanNum)) brand = "Amex";

    const cardData = {
      number: cleanNum,
      holder: cardForm.holder.toUpperCase(),
      expiry: cardForm.expiry,
      brand,
    };

    localStorage.setItem(`noma-saved-card-v1-${profile.id}`, JSON.stringify(cardData));
    setSavedCard(cardData);
    setIsEditingCard(false);
    setCardForm({ number: "", holder: "", expiry: "" });
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsError("");
    setSettingsSuccess("");

    if (settingsForm.password && settingsForm.password.length < 8) {
      setSettingsError("Password must be at least 8 characters long.");
      setSettingsLoading(false);
      return;
    }

    if (settingsForm.password !== settingsForm.confirmPassword) {
      setSettingsError("Passwords do not match.");
      setSettingsLoading(false);
      return;
    }

    try {
      // 1. Update Profile (Name & Email)
      const { error: profileErr } = await supabase
        .from("profiles")
        .update({ name: settingsForm.name, email: settingsForm.email })
        .eq("id", profile.id);

      if (profileErr) throw profileErr;

      // 2. Update Auth (Email, Password, Phone Metadata)
      const authUpdates: any = {
        email: settingsForm.email,
        user_metadata: { name: settingsForm.name, phone: settingsForm.phone },
      };

      if (settingsForm.password) {
        authUpdates.password = settingsForm.password;
      }

      const { error: authErr } = await supabase.auth.updateUser(authUpdates);
      if (authErr) throw authErr;

      setSettingsSuccess("Profile settings updated successfully!");
      setSettingsForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err: any) {
      console.error("Settings update error:", err);
      setSettingsError(err.message || "Failed to update profile details.");
    } finally {
      setSettingsLoading(false);
    }
  };

  return (
    <div className="account-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "radial-gradient(circle at 18% 18%, rgba(157, 80, 55, 0.12), transparent 38%), #171815", color: "#ffffff" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          display: flex;
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 40px 24px;
          gap: 40px;
        }
        .dashboard-sidebar {
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dashboard-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255, 255, 255, 0.6);
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dashboard-tab-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #ffffff;
        }
        .dashboard-tab-btn.active {
          background: rgba(209, 184, 148, 0.1);
          color: #d1b894;
          border-color: rgba(209, 184, 148, 0.2);
        }
        .dashboard-content {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          min-height: 500px;
        }
        .dashboard-title-group {
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }
        .dashboard-title-group h2 {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 300;
          color: #ffffff;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .settings-label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
        .settings-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 12px;
          color: #ffffff;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        .settings-input:focus {
          border-color: #d1b894;
          background: rgba(255, 255, 255, 0.05);
          outline: none;
        }
        .settings-submit-btn {
          background: #d1b894;
          color: #171815;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
        }
        .settings-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(209, 184, 148, 0.2);
        }
        .dashboard-orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .d-order-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          padding: 20px;
        }
        .d-order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        .d-order-id {
          font-family: monospace;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }
        .d-order-meta {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 4px;
        }
        .d-order-total {
          text-align: right;
        }
        .d-order-price {
          font-size: 15px;
          font-weight: 600;
          color: #d1b894;
        }
        .timeline-steps {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 28px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }
        .timeline-steps::before {
          content: '';
          position: absolute;
          left: 10px;
          top: 14px;
          bottom: 14px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
        }
        .timeline-step {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .timeline-step-bullet {
          position: absolute;
          left: -28px;
          top: 2px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #171815;
          border: 2px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.3);
          z-index: 1;
        }
        .timeline-step.completed .timeline-step-bullet {
          background: #d1b894;
          border-color: #d1b894;
          color: #171815;
        }
        .timeline-step.active .timeline-step-bullet {
          background: #171815;
          border-color: #d1b894;
          color: #d1b894;
          box-shadow: 0 0 10px rgba(209, 184, 148, 0.3);
        }
        .timeline-step-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
        }
        .timeline-step.completed .timeline-step-title,
        .timeline-step.active .timeline-step-title {
          color: #ffffff;
        }
        .timeline-step-desc {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 3px;
          line-height: 1.4;
        }
        .d-order-details {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .d-order-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 6px 0;
          color: rgba(255, 255, 255, 0.85);
        }
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .wishlist-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wishlist-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .wishlist-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .wishlist-info {
          padding: 16px;
        }
        .wishlist-name {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .wishlist-price {
          font-size: 12px;
          color: #d1b894;
          margin-bottom: 12px;
        }
        .wishlist-actions {
          display: flex;
          gap: 10px;
        }
        .wishlist-action-btn {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 8px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .wishlist-action-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .wishlist-action-btn.primary {
          background: #d1b894;
          color: #171815;
          border: none;
          font-weight: 600;
        }
        .wishlist-action-btn.primary:hover {
          background: #cfa878;
        }
        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
            padding: 24px 16px;
            gap: 24px;
          }
          .dashboard-sidebar {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .dashboard-tab-btn {
            padding: 10px 16px;
            flex-shrink: 0;
          }
          .dashboard-content {
            padding: 20px;
          }
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      ` }} />

      {/* Header */}
      <header className="site-header" style={{
        padding: "24px 4%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <Link className="brand" href="/" aria-label="NŌMA, Home" style={{ textDecoration: "none" }}>
          NŌMA<span style={{ color: "#d1b894", fontSize: "10px", marginLeft: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>living spaces</span>
        </Link>
        <Link href="/" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          <ArrowLeft size={14} /> Back to Store
        </Link>
      </header>

      {/* Main Workspace */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <button
            className={`dashboard-tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag size={16} />
            Mis Pedidos
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart size={16} />
            Lista de Deseos
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === "payment" ? "active" : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            <CreditCard size={16} />
            Métodos de Pago
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={16} />
            Seguridad y Cuenta
          </button>
          <button
            className="dashboard-tab-btn"
            onClick={signOut}
            style={{ marginTop: "24px", color: "#e06c75" }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </aside>

        {/* Content Box */}
        <main className="dashboard-content">
          {/* Active Tab: MIS PEDIDOS */}
          {activeTab === "orders" && (
            <div>
              <div className="dashboard-title-group">
                <h2>Mis Pedidos</h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                  Track your purchases and view live order shipping details.
                </p>
              </div>

              {loadingOrders ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite", marginRight: "10px" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Syncing orders timeline...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ padding: "80px 20px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                  <ShoppingBag size={40} style={{ color: "rgba(209, 184, 148, 0.4)", marginBottom: "16px", marginInline: "auto" }} />
                  <h3 style={{ color: "#ffffff", fontSize: "16px", fontWeight: "400" }}>No purchases found</h3>
                  <p style={{ fontSize: "12px", maxWidth: "340px", margin: "8px auto 0", lineHeight: 1.5 }}>
                    You haven't ordered any pieces yet. Explore our cookware and living spaces collection.
                  </p>
                  <Link href="/" style={{ display: "inline-block", marginTop: "16px", background: "#d1b894", color: "#171815", padding: "10px 20px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
                    Explore Store
                  </Link>
                </div>
              ) : (
                <div className="dashboard-orders-list">
                  {orders.map((order) => {
                    const activeIndex = getActiveStepIndex(order.status);
                    const isExpanded = !!expandedOrders[order.id];
                    const dateStr = new Date(order.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });

                    return (
                      <div key={order.id} className="d-order-card">
                        <div className="d-order-header" onClick={() => toggleExpand(order.id)}>
                          <div>
                            <div className="d-order-id">{order.id}</div>
                            <div className="d-order-meta">{dateStr}</div>
                          </div>
                          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                            <div className="d-order-total">
                              <div className="d-order-price">{money(order.total)}</div>
                              <div className="d-order-meta">
                                {order.order_items?.length || 0} {(order.order_items?.length || 0) === 1 ? "item" : "items"}
                              </div>
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.4)" }}>
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </div>

                        {/* Collapsible details containing progress tracker */}
                        {isExpanded && (
                          <div className="d-order-details">
                            {/* Status Timeline */}
                            <h4 style={{ color: "#d1b894", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                              Order Status Timeline
                            </h4>
                            <div className="timeline-steps">
                              {STEPS.map((step, idx) => {
                                const StepIcon = step.icon;
                                const isCompleted = idx < activeIndex;
                                const isActive = idx === activeIndex;
                                let stepClass = "";
                                if (isCompleted) stepClass = "completed";
                                else if (isActive) stepClass = "active";

                                return (
                                  <div key={step.key} className={`timeline-step ${stepClass}`}>
                                    <div className="timeline-step-bullet">
                                      <StepIcon size={12} />
                                    </div>
                                    <div className="timeline-step-title">{step.label}</div>
                                    {isActive && <div className="timeline-step-desc">{step.desc}</div>}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Order Items */}
                            <h4 style={{ color: "#d1b894", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "24px", marginBottom: "12px" }}>
                              Order Items
                            </h4>
                            <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "6px", padding: "10px 16px" }}>
                              {order.order_items?.map((item: any) => (
                                <div key={item.id} className="d-order-item">
                                  <span>
                                    {item.product_name} <span style={{ opacity: 0.5 }}>x{item.quantity}</span>
                                  </span>
                                  <span>{money(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>

                            {/* Shipping info */}
                            {order.shipping_addresses?.[0] && (
                              <>
                                <h4 style={{ color: "#d1b894", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "20px", marginBottom: "8px" }}>
                                  Shipping Address
                                </h4>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                                  <div>{order.customer_name}</div>
                                  <div>{order.shipping_addresses[0].street}</div>
                                  <div>
                                    {order.shipping_addresses[0].city}, {order.shipping_addresses[0].state} {order.shipping_addresses[0].postal_code}
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Shipping tracking info */}
                            {(() => {
                              if (!order.notes) return null;
                              try {
                                const parsed = JSON.parse(order.notes);
                                if (parsed.shipping_carrier || parsed.shipping_tracking_number) {
                                  return (
                                    <>
                                      <h4 style={{ color: "#d1b894", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "20px", marginBottom: "8px" }}>
                                        Envío / Seguimiento
                                      </h4>
                                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, background: "rgba(209, 184, 148, 0.05)", border: "1px solid rgba(209, 184, 148, 0.1)", borderRadius: "6px", padding: "10px 14px" }}>
                                        {parsed.shipping_carrier && (
                                          <div>
                                            <strong>Paquetería:</strong> {parsed.shipping_carrier}
                                          </div>
                                        )}
                                        {parsed.shipping_tracking_number && (
                                          <div>
                                            <strong>Número de Guía:</strong> <code style={{ color: "#d1b894", background: "rgba(0,0,0,0.2)", padding: "2px 6px", borderRadius: "3px", fontSize: "11px" }}>{parsed.shipping_tracking_number}</code>
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  );
                                }
                              } catch (e) {
                                // Not JSON
                              }
                              return null;
                            })()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Active Tab: WISHLIST */}
          {activeTab === "wishlist" && (
            <div>
              <div className="dashboard-title-group">
                <h2>Mi Lista de Deseos</h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                  Curated pieces you've saved for future living space atmospheres.
                </p>
              </div>

              {wishlist.length === 0 ? (
                <div style={{ padding: "80px 20px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                  <Heart size={40} style={{ color: "rgba(209, 184, 148, 0.4)", marginBottom: "16px", marginInline: "auto" }} />
                  <h3 style={{ color: "#ffffff", fontSize: "16px", fontWeight: "400" }}>Your wishlist is empty</h3>
                  <p style={{ fontSize: "12px", maxWidth: "340px", margin: "8px auto 0", lineHeight: 1.5 }}>
                    Save pieces you love by tapping the heart icon on their details pages.
                  </p>
                  <Link href="/" style={{ display: "inline-block", marginTop: "16px", background: "#d1b894", color: "#171815", padding: "10px 20px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-card">
                      <img src={item.image} alt={item.name} />
                      <div className="wishlist-info">
                        <div className="wishlist-name">{item.name}</div>
                        <div className="wishlist-price">{money(item.price)}</div>
                        <div className="wishlist-actions">
                          <button
                            className="wishlist-action-btn primary"
                            onClick={() => {
                              addToCart(item, 1);
                              toggleWishlist(item);
                            }}
                          >
                            Add to Bag
                          </button>
                          <button
                            className="wishlist-action-btn"
                            aria-label="Remove item"
                            onClick={() => toggleWishlist(item)}
                            style={{ flex: "0 0 36px", padding: 0 }}
                          >
                            <Trash2 size={14} style={{ color: "#e06c75" }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Active Tab: SAVED CARDS */}
          {activeTab === "payment" && (
            <div>
              <div className="dashboard-title-group">
                <h2>Métodos de Pago</h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                  Manage credit and debit cards stored securely for quicker checkouts.
                </p>
              </div>

              {isEditingCard ? (
                <form onSubmit={handleSaveCard} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label className="settings-label">
                    Card Number
                    <input
                      type="text"
                      className="settings-input"
                      required
                      placeholder="•••• •••• •••• ••••"
                      value={cardForm.number}
                      onChange={handleCardNumberChange}
                    />
                  </label>

                  <label className="settings-label">
                    Cardholder Name
                    <input
                      type="text"
                      className="settings-input"
                      required
                      placeholder="e.g. Maya Chen"
                      value={cardForm.holder}
                      onChange={(e) => setCardForm((prev) => ({ ...prev, holder: e.target.value }))}
                    />
                  </label>

                  <label className="settings-label">
                    Expiration Date
                    <input
                      type="text"
                      className="settings-input"
                      required
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={handleCardExpiryChange}
                      style={{ width: "140px" }}
                    />
                  </label>

                  {cardFormError && (
                    <p style={{ color: "#e06c75", fontSize: "12px", margin: 0 }}>{cardFormError}</p>
                  )}

                  <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <button type="submit" className="settings-submit-btn">Save Card</button>
                    <button type="button" onClick={() => { setIsEditingCard(false); setCardFormError(""); }} style={{
                      background: "transparent",
                      color: "rgba(255, 255, 255, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "12px 24px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}>Cancel</button>
                  </div>
                </form>
              ) : savedCard ? (
                <div style={{
                  maxWidth: "400px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
                      {savedCard.brand} ending in •••• {savedCard.number.slice(-4)}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                      Expires {savedCard.expiry}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.8)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                    {savedCard.holder}
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "14px" }}>
                    <button type="button" onClick={() => {
                      setCardForm({
                        number: savedCard.number.replace(/(\d{4})/g, "$1 ").trim(),
                        holder: savedCard.holder,
                        expiry: savedCard.expiry
                      });
                      setIsEditingCard(true);
                    }} style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "#d1b894",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}>Edit Card</button>
                    <button type="button" onClick={() => {
                      localStorage.removeItem(`noma-saved-card-v1-${profile.id}`);
                      setSavedCard(null);
                    }} style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "#e06c75",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}>Remove</button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setIsEditingCard(true)} style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "24px",
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px dashed rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease"
                }}>
                  + Add a credit or debit card
                </button>
              )}
            </div>
          )}

          {/* Active Tab: SETTINGS */}
          {activeTab === "settings" && (
            <div>
              <div className="dashboard-title-group">
                <h2>Seguridad y Cuenta</h2>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                  Manage account details, email addresses, and your sign in password.
                </p>
              </div>

              <form onSubmit={handleUpdateSettings} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
                <div className="settings-grid">
                  <label className="settings-label">
                    Full Name
                    <input
                      type="text"
                      className="settings-input"
                      required
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </label>

                  <label className="settings-label">
                    Email Address
                    <input
                      type="email"
                      className="settings-input"
                      required
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </label>

                  <label className="settings-label">
                    Phone Number
                    <input
                      type="text"
                      className="settings-input"
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </label>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", marginTop: "10px" }}>
                  <h3 style={{ fontSize: "14px", color: "#d1b894", marginBottom: "16px", fontWeight: "500" }}>Change Password</h3>
                  <div className="settings-grid">
                    <label className="settings-label">
                      New Password (Optional)
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        className="settings-input"
                        value={settingsForm.password}
                        onChange={(e) => setSettingsForm((prev) => ({ ...prev, password: e.target.value }))}
                      />
                    </label>

                    <label className="settings-label">
                      Confirm New Password
                      <input
                        type="password"
                        placeholder="Re-enter password"
                        className="settings-input"
                        value={settingsForm.confirmPassword}
                        onChange={(e) => setSettingsForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                {settingsError && (
                  <p style={{ color: "#e06c75", fontSize: "12px", margin: 0 }}>{settingsError}</p>
                )}

                {settingsSuccess && (
                  <p style={{ color: "#2e7d32", fontSize: "12px", margin: 0 }}>{settingsSuccess}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={settingsLoading}
                    className="settings-submit-btn"
                  >
                    {settingsLoading ? "Saving Changes..." : "Save Settings"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  function toggleExpand(orderId: string) {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  }
}
