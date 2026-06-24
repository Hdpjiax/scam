import { CSSProperties, useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "../data/products";
import { money } from "../lib/utils";
import { categorySlug } from "../lib/catalog";
import TransitionLink from "./TransitionLink";

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
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);

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
  const hoverImage = p.imageHover || p.image;
  const sameHoverImage = hoverImage === p.image;

  const handleAdd = () => {
    onAdd?.();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
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
                ? `Quitar ${p.name} de favoritos`
                : `Añadir ${p.name} a favoritos`
            }
            aria-pressed={fav}
            onClick={() => setFav(!fav)}
          >
            <Heart />
          </button>
        )}
        <TransitionLink
          className="product-image-button"
          href={productUrl}
          aria-label={`Ver ${p.name}`}
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
            <Plus /> {added ? "Agregado" : "Añadir rápido"}
          </button>
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
          <span className="mini-rating">
            <Star /> {p.rating}
          </span>
        </div>
        {!preview && (
          <TransitionLink
            className="category-thread"
            href={`/categoria/${categorySlug(p.category)}`}
          >
            Ver atmósfera
          </TransitionLink>
        )}
      </div>
    </article>
  );
}