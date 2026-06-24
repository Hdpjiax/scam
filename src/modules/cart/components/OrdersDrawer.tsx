"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Package, ShoppingBag, Truck, CheckCircle2, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useStore } from "../../../providers/StoreProvider";
import { createClient } from "../../../lib/supabase/client";
import { money } from "../../../lib/utils";

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

export function OrdersDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const supabase = createClient();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !profile) {
      if (!profile) setOrders([]);
      return;
    }

    const userId = profile.id;

    async function fetchOrders() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, order_items(*), shipping_addresses(*)")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [open, profile, supabase]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <>
      <div className={"scrim " + (open ? "show" : "")} onClick={onClose} />
      <aside
        className={"drawer " + (open ? "open" : "")}
        aria-hidden={!open}
        aria-label="Order Tracking"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 70 }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .orders-drawer-content {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .order-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 18px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .order-card:hover {
            border-color: rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
          }
          .order-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            cursor: pointer;
          }
          .order-id-label {
            font-size: 13px;
            font-weight: 600;
            color: #ffffff;
            font-family: monospace;
            letter-spacing: 0.05em;
          }
          .order-date-label {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 4px;
          }
          .order-total-label {
            text-align: right;
          }
          .order-total-price {
            font-size: 14px;
            font-weight: 600;
            color: #d1b894;
          }
          .order-items-count {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 4px;
          }
          .order-timeline-container {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px dashed rgba(255, 255, 255, 0.08);
          }
          .timeline-steps {
            display: flex;
            flex-direction: column;
            gap: 20px;
            position: relative;
            padding-left: 28px;
          }
          .timeline-steps::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 10px;
            bottom: 10px;
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
            transition: all 0.3s ease;
            z-index: 1;
          }
          .timeline-step.completed .timeline-step-bullet {
            background: #d1b894;
            border-color: #d1b894;
            color: #171815;
            box-shadow: 0 0 10px rgba(209, 184, 148, 0.2);
          }
          .timeline-step.active .timeline-step-bullet {
            background: #171815;
            border-color: #d1b894;
            color: #d1b894;
            box-shadow: 0 0 12px rgba(209, 184, 148, 0.3);
            animation: pulse-border 2s infinite;
          }
          @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0px rgba(209, 184, 148, 0.4); }
            70% { box-shadow: 0 0 0 8px rgba(209, 184, 148, 0); }
            100% { box-shadow: 0 0 0 0px rgba(209, 184, 148, 0); }
          }
          .timeline-step-connector {
            position: absolute;
            left: -19px;
            top: 22px;
            bottom: -22px;
            width: 2px;
            background: #d1b894;
            z-index: 0;
            display: none;
          }
          .timeline-step.completed .timeline-step-connector {
            display: block;
          }
          .timeline-step-title {
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.4);
            transition: color 0.3s ease;
          }
          .timeline-step.completed .timeline-step-title,
          .timeline-step.active .timeline-step-title {
            color: #ffffff;
          }
          .timeline-step-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 3px;
            line-height: 1.4;
          }
          .order-details-expanded {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 12px;
          }
          .order-item-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            color: rgba(255, 255, 255, 0.8);
          }
          .order-address-box {
            margin-top: 12px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.015);
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 6px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.5;
          }
          .orders-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin: auto;
            color: rgba(255, 255, 255, 0.5);
          }
          .orders-loader svg {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        ` }} />

        <div className="drawer-head">
          <div>
            <small>Track Purchases</small>
            <h2>My Orders</h2>
          </div>
          <button ref={closeRef} aria-label="Close orders" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="orders-drawer-content">
          {!profile ? (
            <div className="empty">
              <Clock size={40} style={{ color: "var(--clay)", marginBottom: "20px" }} />
              <h3>Sign in to track orders</h3>
              <p>Please log in to your account to view your past purchases and track shipping in real-time.</p>
              <Link href="/login" onClick={onClose} style={{
                display: "inline-block",
                background: "var(--clay)",
                color: "var(--paper)",
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "13px",
                marginTop: "16px"
              }}>
                Sign In
              </Link>
            </div>
          ) : loading ? (
            <div className="orders-loader">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Retrieving your order timeline...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty">
              <ShoppingBag size={40} style={{ color: "var(--clay)", marginBottom: "20px" }} />
              <h3>A space with potential</h3>
              <p>You haven't placed any orders yet. Explore our curated collections to start building your unique atmosphere.</p>
              <button onClick={onClose} style={{
                display: "inline-block",
                background: "var(--clay)",
                color: "var(--paper)",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontWeight: "600",
                fontSize: "13px",
                marginTop: "16px",
                cursor: "pointer"
              }}>
                Discover Collection
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const activeIndex = getActiveStepIndex(order.status);
              const isExpanded = !!expandedOrders[order.id];
              const dateStr = new Date(order.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div key={order.id} className="order-card">
                  <div className="order-card-header" onClick={() => toggleExpand(order.id)}>
                    <div>
                      <div className="order-id-label">{order.id}</div>
                      <div className="order-date-label">{dateStr}</div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <div className="order-total-label">
                        <div className="order-total-price">{money(order.total)}</div>
                        <div className="order-items-count">
                          {order.order_items?.length || 0} {(order.order_items?.length || 0) === 1 ? "item" : "items"}
                        </div>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.4)" }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Progress Tracker */}
                  <div className="order-timeline-container">
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
                            {/* Render connector line to next step if this step is completed */}
                            {idx < STEPS.length - 1 && idx < activeIndex && (
                              <div className="timeline-step-connector" />
                            )}
                            <div className="timeline-step-title">{step.label}</div>
                            {isActive && <div className="timeline-step-desc">{step.desc}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Collapsible Details */}
                  {isExpanded && (
                    <div className="order-details-expanded">
                      <h4 style={{ color: "#d1b894", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Order Items
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {order.order_items?.map((item: any) => (
                          <div key={item.id} className="order-item-row">
                            <span>
                              {item.product_name} <span style={{ opacity: 0.5 }}>x{item.quantity}</span>
                            </span>
                            <span>{money(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {order.shipping_addresses?.[0] && (
                        <>
                          <h4 style={{ color: "#d1b894", marginTop: "16px", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Billing Address
                          </h4>
                          <div className="order-address-box">
                            <div>{order.customer_name}</div>
                            <div>{order.shipping_addresses[0].street}</div>
                            <div>
                              {order.shipping_addresses[0].city}, {order.shipping_addresses[0].state} {order.shipping_addresses[0].postal_code}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
