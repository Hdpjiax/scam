"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "../providers/StoreProvider";
import { money } from "../lib/utils";

const FREE_SHIPPING_THRESHOLD = 100;

export function Cart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQty, removeFromCart, lastAdded } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = cart.reduce((a, item) => a + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((a, item) => a + item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div className={"scrim " + (open ? "show" : "")} onClick={onClose} />
      <aside
        className={"drawer " + (open ? "open" : "")}
        aria-hidden={!open}
        aria-label="Shopping Cart"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-head">
          <div>
            <small>Secure Checkout</small>
            <h2>
              Your Selection <sup>{totalItems}</sup>
            </h2>
          </div>
          <button ref={closeRef} aria-label="Close cart" onClick={onClose}>
            <X />
          </button>
        </div>
        <p className="cart-announcer" aria-live="polite">
          {lastAdded ? `${lastAdded.name} added to cart.` : ""}
        </p>
        {cart.length === 0 ? (
          <div className="empty">
            <ShoppingBag />
            <h3>Your space has room for more</h3>
            <p>
              Discover objects that make everyday life a little more special.
            </p>
            <button onClick={onClose}>Explore collection</button>
          </div>
        ) : (
          <>
            <div className="shipping-progress">
              <span>
                {remaining === 0
                  ? "Free shipping unlocked"
                  : `${money(remaining)} away from free shipping`}
              </span>
              <i>
                <b
                  style={{
                    transform: `scaleX(${Math.min(1, total / FREE_SHIPPING_THRESHOLD)})`,
                  }}
                />
              </i>
            </div>
            <div className="cart-list">
              {cart.map((item, i) => (
                <div
                  className={
                    "cart-line " +
                    (lastAdded?.id === item.product.id ? "recent" : "")
                  }
                  key={`${item.product.id}-${item.selectedColor || "none"}-${i}`}
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <small>{item.product.category}</small>
                    <h4>{item.product.name}</h4>
                    {item.selectedColor && (
                      <span className="cart-item-color" style={{ fontSize: "11px", opacity: 0.8, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        Color: <span style={{ color: "#d1b894", fontWeight: "600" }}>{item.selectedColor}</span>
                      </span>
                    )}
                    <span>{money(item.product.price)}</span>
                    <div className="qty" aria-label="Quantity">
                      <button
                        aria-label="Reduce quantity"
                        onClick={() => updateQty(item.product.id, item.quantity - 1, item.selectedColor)}
                      >
                        <Minus />
                      </button>
                      <b>{item.quantity}</b>
                      <button
                        aria-label="Increase quantity"
                        disabled={item.quantity >= (item.product.stock ?? item.quantity)}
                        onClick={() => updateQty(item.product.id, item.quantity + 1, item.selectedColor)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${item.product.name}`}
                    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
            <div className="checkout">
              <div>
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              <Link href="/checkout" onClick={onClose} className="drawer-checkout">
                Checkout <ArrowRight />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
