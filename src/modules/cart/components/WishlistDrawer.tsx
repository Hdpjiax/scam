"use client";

import { useEffect, useRef } from "react";
import { Trash2, X } from "lucide-react";
import { useStore } from "../../../providers/StoreProvider";
import { money } from "../../../lib/utils";
import { colorName } from "../../catalog/color-names";

export function WishlistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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
