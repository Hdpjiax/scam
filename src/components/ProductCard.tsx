import { CSSProperties, useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "../data/products";
import { money } from "../lib/utils";
import { categorySlug } from "../lib/catalog";
import TransitionLink from "./TransitionLink";
import { useStore } from "../providers/StoreProvider";
import { colorName } from "../modules/catalog/color-names";

const optimizeCatalogImage = (src: string, width = 420) => {
  try {
    const url = new URL(src);
    if (url.hostname !== "images.unsplash.com") return src;
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", "65");
    return url.toString();
  } catch {
    return src;
  }
};

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
  const [loadHoverImage, setLoadHoverImage] = useState(false);
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
  const primaryImage = optimizeCatalogImage(p.image);
  const optimizedHoverImage = optimizeCatalogImage(hoverImage);

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
    <article
      className={`product${preview ? " product-preview" : ""}`}
      onMouseEnter={() => setLoadHoverImage(true)}
      onFocus={() => setLoadHoverImage(true)}
    >
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
            src={primaryImage}
            alt={p.name}
            data-fly-source={preview ? undefined : p.id}
            style={imageTransitionStyle}
          />
          <img
            className={
              "photo-hover" + (sameHoverImage ? " photo-hover-alt" : "")
            }
            loading="lazy"
            src={loadHoverImage || preview ? optimizedHoverImage : undefined}
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
