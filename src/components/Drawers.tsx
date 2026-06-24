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

export function Wishlist({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.colors?.[0] ? colorName(product.colors[0]) : undefined);
    toggleWishlist(product);
  };

  const colorName = (hex: string) => {
    const map: Record<string, string> = {
      "#d8c7ad": "Natural",
      "#292723": "Charcoal",
      "#87907c": "Sage",
      "#e8e1d5": "Sand",
      "#2d2b29": "Basalt",
      "#e6dfd0": "Alabaster",
      "#b6a58d": "Oatmeal",
      "#9b6c4e": "Clay",
      "#ded1bf": "Cream",
      "#222220": "Obsidian",
      "#ccb78f": "Bronze",
      "#b77b55": "Terracotta",
      "#ddd5c8": "Linen",
      "#f2efe8": "Bone",
      "#6c4933": "Walnut",
      "#b39b7c": "Ash",
      "#ded8cb": "Parchment",
      "#8a7967": "Taupe",
      "#edeae3": "Chalk",
      "#252525": "Midnight Black",
      "#f3f1ec": "Pebble",
      "#20211f": "Slate",
      "#ded2bd": "Warm Linen",
      "#899082": "Olive",
      "#cab99e": "Mist",
      "#a66f52": "Copper",
      "#e1d4c1": "Off-White",
      "#1e1f1d": "Ink Black",
      "#d7d0c4": "Ivory",
      "#a85e40": "Rust",
      "#d6c2a7": "Warm Sand",
      "#171815": "Eclipse Black",
      "#d7aa67": "Solar Gold",
      "#b89163": "Oak",
      "#664a35": "Dark Oak",
      "#eeece5": "Cloud",
      "#9ca099": "Mist Grey"
    };
    return map[hex.toLowerCase()] || hex;
  };

  return (
    <>
      <div className={"scrim " + (open ? "show" : "")} onClick={onClose} />
      <aside
        className={"drawer " + (open ? "open" : "")}
        aria-hidden={!open}
        aria-label="Wishlist"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-head">
          <div>
            <small>Favorites</small>
            <h2>
              Your Wishlist <sup>{wishlist.length}</sup>
            </h2>
          </div>
          <button ref={closeRef} aria-label="Close wishlist" onClick={onClose}>
            <X />
          </button>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--clay)", marginBottom: "20px" }}>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <h3>Nothing saved yet</h3>
            <p>
              Tap the heart icon on any piece you love to save it here for later.
            </p>
            <button onClick={onClose}>Discover collection</button>
          </div>
        ) : (
          <div className="cart-list" style={{ flex: 1 }}>
            {wishlist.map((item, i) => (
              <div className="cart-line" key={`${item.id}-${i}`}>
                <img src={item.image} alt={item.name} />
                <div>
                  <small>{item.category}</small>
                  <h4>{item.name}</h4>
                  <span>{money(item.price)}</span>
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    style={{
                      marginTop: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      background: "var(--ink)",
                      color: "var(--light)",
                      border: "0",
                      fontSize: "11px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
                <button
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => toggleWishlist(item)}
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}

