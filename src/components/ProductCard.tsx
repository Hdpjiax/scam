import { CSSProperties, useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "../data/products";
import { money } from "../lib/utils";
import { categorySlug } from "../lib/catalog";
import TransitionLink from "./TransitionLink";
import { useStore } from "../providers/StoreProvider";

export default function ProductCard({
  p,
  onAdd,
  loading = false,
  preview = false,
}: {
  p?: Product;
  onAdd?: () => void;
  loading?: boolean;
  preview?: boolean;
}) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const [showQuickColors, setShowQuickColors] = useState(false);
  const fav = p ? isInWishlist(p.id) : false;

  if (loading || !p) {
    return (
      <article className="product skeleton-card" aria-hidden="true">
        <div
          className="photo skeleton"
          style={{ width: "100%", aspectRatio: 0.78, borderRadius: 0 }}
        />
        <div className="product-info">
          <div
            className="skeleton skeleton-text"
            style={{
              width: "30%",
              height: "10px",
              marginTop: "8px",
              display: "block",
            }}
          />
          <div
            className="skeleton skeleton-text"
            style={{
              width: "80%",
              height: "20px",
              margin: "8px 0",
              display: "block",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="skeleton skeleton-text"
              style={{ width: "25%", height: "12px", display: "block" }}
            />
            <div
              className="skeleton skeleton-text"
              style={{ width: "15%", height: "12px", display: "block" }}
            />
          </div>
        </div>
      </article>
    );
  }

  const productUrl = `/producto/${p.id}`;
  const hoverImage = p.images?.[1] || p.imageHover || p.image;
  const sameHoverImage = hoverImage === p.image;

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

  const handleAdd = (e: any) => {
    e.stopPropagation();
    if (!p) return;
    if (p.colors && p.colors.length > 1) {
      setShowQuickColors(true);
    } else {
      onAdd?.();
      addToCart(p, 1, p.colors?.[0] ? colorName(p.colors[0]) : undefined);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1300);
    }
  };

  const imageTransitionStyle = {
    viewTransitionName: preview ? undefined : `product-${p.id}`,
  } as CSSProperties;

  return (
    <article className={`product${preview ? " product-preview" : ""}`}>
      <div className="photo">
        <span className="product-index" aria-hidden="true">
          {String(p.id).padStart(2, "0")}
        </span>
        {p.badge && <span className="badge">{p.badge}</span>}
        {!preview && (
          <button
            className={"wish " + (fav ? "active" : "")}
            aria-label={
              fav
                ? `Remove ${p.name} of favorite`
                : `Add ${p.name} of favorite`
            }
            aria-pressed={fav}
            onClick={() => toggleWishlist(p)}
          >
            <Heart />
          </button>
        )}
        <TransitionLink
          className="product-image-button"
          href={productUrl}
          aria-label={`View ${p.name}`}
        >
          <img
            className="photo-primary"
            loading={preview ? "eager" : "lazy"}
            src={p.image}
            alt={p.name}
            data-fly-source={preview ? undefined : p.id}
            style={imageTransitionStyle}
          />
          <img
            className={
              "photo-hover" + (sameHoverImage ? " photo-hover-alt" : "")
            }
            loading="lazy"
            src={hoverImage}
            alt=""
            aria-hidden="true"
          />
        </TransitionLink>
        {!preview && (
          <button
            className={`quick ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            <Plus /> {added ? "Added" : "Add to cart"}
          </button>
        )}

        {/* Glassmorphic Quick Color Presets Overlay */}
        {showQuickColors && p.colors && p.colors.length > 0 && (
          <div 
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(28, 29, 25, 0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              animation: "pageFadeIn 0.3s ease both"
            }}
          >
            <small style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--light)", marginBottom: "12px", opacity: 0.8 }}>
              Select Color
            </small>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              {p.colors.map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd?.();
                    addToCart(p, 1, colorName(c));
                    setAdded(true);
                    setShowQuickColors(false);
                    window.setTimeout(() => setAdded(false), 1300);
                  }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid #ffffff",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  title={colorName(c)}
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickColors(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--light)",
                fontSize: "11px",
                textDecoration: "underline",
                cursor: "pointer",
                opacity: 0.8
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="product-info">
        <TransitionLink href={productUrl}>
          <small>{p.category}</small>
          <h3>{p.name}</h3>
        </TransitionLink>
        <div>
          <strong>{money(p.price)}</strong>
          {p.oldPrice && <s>{money(p.oldPrice)}</s>}
          <span className="mini-rating" aria-label={`${p.rating} out of 5 stars`}>
            <Star /> {p.rating}
            {p.reviewCount ? <em>({p.reviewCount})</em> : null}
          </span>
        </div>
        {!preview && (
          <TransitionLink
            className="category-thread"
            href={`/categoria/${categorySlug(p.category)}`}
          >
            View atmosphere
          </TransitionLink>
        )}
      </div>
    </article>
  );
}
