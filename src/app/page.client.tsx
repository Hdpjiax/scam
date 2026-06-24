"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useRevealGroup } from "../hooks/useRevealGroup";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Headphones,
  Leaf,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import TransitionLink from "../components/TransitionLink";
import { Cart } from "../components/Drawers";
import { useStore } from "../providers/StoreProvider";
import { Product } from "../data/products";
import { categories, categorySlug } from "../lib/catalog";
import AdModal from "../components/AdModal";

export default function ShopClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { addToCart } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(8);
  const [light, setLight] = useState({ x: 50, y: 40 });
  const [toast, setToast] = useState("");

  const categoryStoriesRef = useRef<HTMLElement>(null);
  useRevealGroup(categoryStoriesRef, ".category-story", 90);

  useEffect(() => setLimit(8), [q]);

  const list = useMemo(() => {
    return initialProducts
      .filter(
        (p) =>
          p.featured &&
          (p.name + " " + p.category + " " + p.description)
            .toLowerCase()
            .includes(q.toLowerCase()),
      );
  }, [initialProducts, q]);

  const add = (product: Product) => {
    addToCart(product, 1);
    setToast(`${product.name} agregado al carrito.`);
    window.setTimeout(() => setToast(""), 2200);
  };

  const heroStyle = {
    "--light-x": `${light.x}%`,
    "--light-y": `${light.y}%`,
  } as CSSProperties;

  return (
    <>
      <Header onCart={() => setDrawer(true)} onSearch={setQ} />
      <main>
        <AdModal />
        <section
          className="hero"
          style={heroStyle}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setLight({
              x: ((e.clientX - r.left) / r.width) * 100,
              y: ((e.clientY - r.top) / r.height) * 100,
            });
          }}
        >
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/hero-casa-noma.png"
            aria-hidden="true"
          >
            <source
              src="https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-light" />
          <div className="hero-copy">
            <p className="collection-code">NŌMA / COLECCIÓN 02</p>
            <h1>
              La inteligencia
              <br />
              de <em>lo simple.</em>
            </h1>
            <p>
              Objetos con presencia. Tecnología sin ruido. Una casa que responde
              a ti sin pedir protagonismo.
            </p>
            <a href="#atmósferas">
              Entrar en la colección <ArrowDown />
            </a>
          </div>
          <div className="hero-note">
            <span>CDMX / 2026</span>
            <p>
              Diseño sereno.
              <br />
              Tecnología invisible.
            </p>
          </div>
        </section>

        <ScrollReveal className="world-intro" id="atmósferas">
          <p>No vendemos objetos aislados.</p>
          <h2>
            Creamos <em>atmósferas</em>
            <br />
            para vivir mejor.
          </h2>
        </ScrollReveal>

        <section
          ref={categoryStoriesRef}
          className="category-stories"
          aria-label="Comprar por atmósfera"
        >
          {categories.slice(0, 5).map((category, index) => (
            <TransitionLink
              className="category-story reveal-on-scroll"
              href={`/categoria/${category.slug}`}
              key={category.slug}
              style={
                {
                  "--category-image": `url(${category.image})`,
                  "--category-accent": category.accent,
                } as CSSProperties
              }
            >
              <span>{String(index + 1).padStart(2, "0")} / {category.name}</span>
              <h2>{category.title}</h2>
              <p>{category.copy}</p>
              <b>
                Ver colección <ArrowRight />
              </b>
            </TransitionLink>
          ))}
        </section>

        <section className="catalog" id="catalogo">
          <ScrollReveal className="section-top">
            <div>
              <p>Objetos seleccionados</p>
              <h2>
                Curaduría
                <br />
                <em>destacada.</em>
              </h2>
            </div>
            <p>
              Una curaduría seleccionada de tecnología, luz, materia y bienestar.
              Las piezas más excepcionales para tu hogar.
            </p>
          </ScrollReveal>

          <div className="catalog-count" aria-live="polite">
            Mostrando {Math.min(limit, list.length)} de {list.length} piezas destacadas
          </div>

          {!list.length ? (
            <div className="no-results">
              <h3>No encontramos esa pieza.</h3>
              <p>Prueba otra palabra o vuelve a la selección completa.</p>
              <button
                onClick={() => {
                  setQ("");
                }}
              >
                Ver todas
              </button>
            </div>
          ) : (
            <div className="grid editorial-grid">
              {list.slice(0, limit).map((p) => (
                <ProductCard key={p.id} p={p} onAdd={() => add(p)} />
              ))}
            </div>
          )}

          {limit < list.length && (
            <button
              className="load-more"
              onClick={() => setLimit(limit + 8)}
            >
              Descubrir más <span>{list.length - limit} piezas</span>
            </button>
          )}
        </section>

        <section className="story">
          <ScrollReveal className="story-image" />
          <ScrollReveal className="story-copy" delay={120}>
            <p>Nuestra forma de pensar</p>
            <h2>
              Menos ruido.
              <br />
              <em>Más hogar.</em>
            </h2>
            <p>
              La tecnología debe desaparecer en la experiencia. Cada objeto
              merece un lugar, una función y una historia.
            </p>
            <TransitionLink href={`/categoria/${categorySlug("Casa inteligente")}`}>
              Conoce NŌMA <ArrowRight />
            </TransitionLink>
          </ScrollReveal>
        </section>

        <ScrollReveal className="values" id="principios">
          <div>
            <Sparkles />
            <h3>Curaduría humana</h3>
            <p>Probamos cada pieza antes de invitarla a tu casa.</p>
          </div>
          <div>
            <Leaf />
            <h3>Elecciones responsables</h3>
            <p>Materiales conscientes y empaques sin plástico.</p>
          </div>
          <div>
            <ShieldCheck />
            <h3>Garantía real</h3>
            <p>Dos años de respaldo en toda la colección.</p>
          </div>
          <div>
            <Headphones />
            <h3>Estamos cerca</h3>
            <p>Atención personal de lunes a sábado.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="newsletter">
          <p>Cartas desde casa</p>
          <h2>
            Una idea buena.
            <br />
            <em>Una vez al mes.</em>
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email">Correo electrónico</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="tu@email.com"
            />
            <button type="submit">
              Suscribirme <ArrowRight />
            </button>
          </form>
        </ScrollReveal>
      </main>

      <Footer />

      <div className={`cart-toast ${toast ? "show" : ""}`} role="status">
        {toast}
        <button onClick={() => setDrawer(true)}>Ver bolsa</button>
      </div>
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
