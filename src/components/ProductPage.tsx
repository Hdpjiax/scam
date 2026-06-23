import { useState } from "react";
import { useStore } from "../store";
import { money } from "../data/products";
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
export default function ProductPage({ id }: { id: number }) {
  const { products, cart, setCart } = useStore();
  const p = products.find((x) => x.id === id);
  const [qty, setQty] = useState(1),
    [fav, setFav] = useState(false);
  if (!p)
    return (
      <div className="access-denied">
        <h1>Producto no encontrado</h1>
        <a href="#/">Volver</a>
      </div>
    );
  const add = () => setCart([...cart, ...Array(qty).fill(p)]);
  return (
    <div className="pdp">
      <header className="pdp-top">
        <a href="#/">
          <ArrowLeft /> Volver
        </a>
        <a className="brand" href="#/" aria-label="Nōma, inicio">
          NŌMA<span>casa viva</span>
        </a>
        <a href="#/checkout">Bolsa ({cart.length})</a>
      </header>
      <main>
        <div className="pdp-gallery">
          <div className="pdp-main-img">
            <span>{p.badge}</span>
            <img src={p.image} alt={p.name} />
          </div>
          <div className="pdp-secondary">
            <img src={p.image} alt={`Detalle de ${p.name}`} />
            <div className="material-shot" />
          </div>
        </div>
        <section className="pdp-info">
          <small>
            {p.category} · {p.sku}
          </small>
          <h1>{p.name}</h1>
          <div className="rating">
            <span aria-label={`${p.rating} de 5 estrellas`}>
              {[1, 2, 3, 4, 5].map((x) => (
                <Star key={x} />
              ))}
            </span>
            {p.rating} · 38 reseñas
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
                key={c}
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="stock">
            <i />
            <span>
              <b>Disponible</b>
              {p.stock} unidades listas para envío
            </span>
          </div>
          <div className="pdp-buy">
            <div>
              <button
                aria-label="Reducir cantidad"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus />
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                aria-label="Aumentar cantidad"
                onClick={() => setQty(qty + 1)}
              >
                <Plus />
              </button>
            </div>
            <button onClick={add}>Añadir · {money(p.price * qty)}</button>
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
                <b>Entrega sin costo</b>2—5 días hábiles
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
              seleccionados, controles intuitivos y soporte personal desde
              México.
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
  );
}
