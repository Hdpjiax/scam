"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Product } from "../../../data/products";
import { useStore } from "../../../providers/StoreProvider";
import { money } from "../../../lib/utils";
import { Cart } from "../../../components/Drawers";
import { categorySlug } from "../../../lib/catalog";

export default function ProductPageClient({
  initialProduct,
}: {
  initialProduct: Product | null;
}) {
  const { cart, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [added, setAdded] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!initialProduct) {
    return (
      <div className="access-denied">
        <h1>Producto no encontrado</h1>
        <Link href="/">Volver a la tienda</Link>
      </div>
    );
  }

  const p = initialProduct;
  const stock = p.stock ?? 0;
  const isOut = stock <= 0;
  const isLow = stock > 0 && stock <= 5;

  const selectedTotal = useMemo(() => money(p.price * qty), [p.price, qty]);

  const handleAdd = () => {
    if (isOut) return;
    addToCart(p, qty);
    setAdded(true);
    setDrawer(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <div className="pdp">
        <header className="pdp-top">
          <Link href="/">
            <ArrowLeft /> Volver
          </Link>
          <Link className="brand" href="/" aria-label="NŌMA, inicio">
            NŌMA<span>casa viva</span>
          </Link>
          <button className="pdp-cart-link" onClick={() => setDrawer(true)}>
            Bolsa ({cartCount})
          </button>
        </header>
        <main>
          <div className="pdp-gallery">
            <div className="pdp-main-img">
              {p.badge && <span>{p.badge}</span>}
              <img src={p.image} alt={p.name} />
            </div>
            <div className="pdp-secondary">
              <img src={p.image} alt={`Detalle de ${p.name}`} />
              <div className="material-shot" />
            </div>
          </div>
          <section className="pdp-info">
            <small>
              <Link href={`/categoria/${categorySlug(p.category)}`}>{p.category}</Link>{" "}
              / {p.sku}
            </small>
            <h1>{p.name}</h1>
            <div className="rating">
              <span aria-label={`${p.rating} de 5 estrellas`}>
                {[1, 2, 3, 4, 5].map((x) => (
                  <Star key={x} className="filled-star" />
                ))}
              </span>
              {p.rating} / 38 reseñas
            </div>
            <div className="pdp-price">
              {money(p.price)} {p.oldPrice && <s>{money(p.oldPrice)}</s>}
            </div>
            <p>{p.description}</p>
            <div className="pdp-colors">
              <label>
                Color <b>Natural</b>
              </label>
              {p.colors.map((c, i) => (
                <button
                  aria-label={`Color ${i + 1}`}
                  key={`${c}-${i}`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className={`stock ${isOut ? "out" : isLow ? "low" : ""}`}>
              <i />
              <span>
                <b>{isOut ? "Agotado" : isLow ? "Últimas piezas" : "Disponible"}</b>
                {isOut
                  ? "Esta pieza volverá pronto."
                  : `${stock} unidades listas para envío`}
              </span>
            </div>
            <div className="pdp-buy">
              <div>
                <button
                  aria-label="Reducir cantidad"
                  disabled={qty <= 1 || isOut}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus />
                </button>
                <span aria-live="polite">{qty}</span>
                <button
                  aria-label="Aumentar cantidad"
                  disabled={qty >= stock || isOut}
                  onClick={() => setQty(Math.min(stock, qty + 1))}
                >
                  <Plus />
                </button>
              </div>
              <button disabled={isOut} className={added ? "added" : ""} onClick={handleAdd}>
                {isOut ? "Agotado" : added ? "Agregado" : `Añadir / ${selectedTotal}`}
              </button>
              <button
                aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
                aria-pressed={fav}
                onClick={() => setFav(!fav)}
              >
                <Heart />
              </button>
            </div>
            <div className="pdp-benefits">
              <div>
                <Truck />
                <span>
                  <b>Entrega sin costo</b>2-5 días hábiles
                </span>
              </div>
              <div>
                <ShieldCheck />
                <span>
                  <b>Dos años de garantía</b>Compra protegida
                </span>
              </div>
              <div>
                <Check />
                <span>
                  <b>30 días para decidir</b>Devolución sencilla
                </span>
              </div>
            </div>
            <details open>
              <summary>Detalles que importan</summary>
              <p>
                Diseñado para integrarse con naturalidad a tu espacio. Materiales
                seleccionados, controles intuitivos y soporte personal desde México.
              </p>
            </details>
            <details>
              <summary>Envíos y devoluciones</summary>
              <p>
                Envío asegurado a todo México. Puedes devolver la pieza en su
                empaque original durante los primeros 30 días.
              </p>
            </details>
          </section>
        </main>
        <section className="pdp-story">
          <small>Diseñado para la vida real</small>
          <h2>
            Más que un objeto,
            <br />
            <em>una nueva atmósfera.</em>
          </h2>
        </section>
      </div>
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
