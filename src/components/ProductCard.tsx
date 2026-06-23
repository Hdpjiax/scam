import { useState } from "react";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "../data/products";
import { money } from "../lib/utils";
import { categorySlug } from "../lib/catalog";

export default function ProductCard({
  p,
  onAdd,
}: {
  p: Product;
  onAdd: () => void;
}) {
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);
  const productUrl = `/producto/${p.id}`;

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

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
        <button className={`quick ${added ? "added" : ""}`} onClick={handleAdd}>
          <Plus /> {added ? "Agregado" : "Añadir rápido"}
        </button>
      </div>
      <div className="product-info">
        <Link href={productUrl}>
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
        <Link className="category-thread" href={`/categoria/${categorySlug(p.category)}`}>
          Ver atmósfera
        </Link>
      </div>
    </article>
  );
}
