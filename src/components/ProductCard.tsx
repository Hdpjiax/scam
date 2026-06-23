import { useState } from "react";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "../data/products";
import { money } from "../lib/utils";

export default function ProductCard({
  p,
  onAdd,
}: {
  p: Product;
  onAdd: () => void;
}) {
  const [fav, setFav] = useState(false);
  const productUrl = `/producto/${p.id}`;

  return (
    <article className="product">
      <div className="photo">
        <span className="product-index" aria-hidden="true">
          {String(p.id).padStart(2, "0")}
        </span>
        {p.badge && <span className="badge">{p.badge}</span>}
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
        <Link
          className="product-image-button"
          href={productUrl}
          aria-label={`Ver ${p.name}`}
        >
          <img loading="lazy" src={p.image} alt={p.name} />
        </Link>
        <button className="quick" onClick={onAdd}>
          <Plus /> Añadir rápido
        </button>
      </div>
      <div className="product-info">
        <Link href={productUrl} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <small>{p.category}</small>
          <h3>{p.name}</h3>
        </Link>
        <div>
          <strong>{money(p.price)}</strong>
          {p.oldPrice && <s>{money(p.oldPrice)}</s>}
          <span className="mini-rating">
            <Star /> {p.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
