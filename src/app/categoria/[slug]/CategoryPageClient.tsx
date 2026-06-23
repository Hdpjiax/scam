"use client";

import { CSSProperties, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";
import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import { Cart } from "../../../components/Drawers";
import { Product } from "../../../data/products";
import { useStore } from "../../../providers/StoreProvider";
import { CategoryMeta, categories } from "../../../lib/catalog";

export default function CategoryPageClient({
  category,
  products,
}: {
  category: CategoryMeta;
  products: Product[];
}) {
  const { addToCart } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [sort, setSort] = useState("Curaduría NŌMA");
  const [toast, setToast] = useState("");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) =>
      sort === "Precio ascendente"
        ? a.price - b.price
        : sort === "Precio descendente"
          ? b.price - a.price
          : sort === "Disponibilidad"
            ? (b.stock ?? 0) - (a.stock ?? 0)
            : Number(b.featured ?? 0) - Number(a.featured ?? 0),
    );
  }, [products, sort]);

  const add = (product: Product) => {
    addToCart(product, 1);
    setToast(`${product.name} agregado al carrito.`);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <>
      <Header onCart={() => setDrawer(true)} />
      <main>
        <section
          className="category-hero"
          style={
            {
              "--category-image": `url(${category.image})`,
              "--category-accent": category.accent,
            } as CSSProperties
          }
        >
          <Link href="/" className="category-back">
            <ArrowLeft /> Volver a NŌMA
          </Link>
          <div>
            <span>{category.name}</span>
            <h1>{category.title}</h1>
            <p>{category.copy}</p>
          </div>
        </section>

        <section className="category-catalog" id="catalogo">
          <div className="section-top">
            <div>
              <p>{products.length} piezas curadas</p>
              <h2>
                Comprar
                <br />
                <em>{category.name}.</em>
              </h2>
            </div>
            <label className="category-sort">
              <SlidersHorizontal />
              Ordenar
              <select
                aria-label="Ordenar productos"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option>Curaduría NŌMA</option>
                <option>Precio ascendente</option>
                <option>Precio descendente</option>
                <option>Disponibilidad</option>
              </select>
            </label>
          </div>

          {sortedProducts.length ? (
            <div className="grid editorial-grid category-grid">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  p={product}
                  onAdd={() => add(product)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>Esta atmósfera aún está en curaduría.</h3>
              <p>Vuelve a la colección completa mientras llegan nuevas piezas.</p>
              <Link href="/">
                Ver tienda <ArrowRight />
              </Link>
            </div>
          )}
        </section>

        <section className="category-crosslinks">
          <p>Otras atmósferas</p>
          <div>
            {categories
              .filter((item) => item.slug !== category.slug)
              .slice(0, 4)
              .map((item) => (
                <Link href={`/categoria/${item.slug}`} key={item.slug}>
                  {item.name}
                  <ArrowRight />
                </Link>
              ))}
          </div>
        </section>
      </main>
      <div className={`cart-toast ${toast ? "show" : ""}`} role="status">
        {toast}
        <button onClick={() => setDrawer(true)}>Ver bolsa</button>
      </div>
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
