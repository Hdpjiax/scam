"use client";

import { useEffect, useMemo, useState, CSSProperties } from "react";
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
import ProductCard from "../components/ProductCard";
import { Cart } from "../components/Drawers";
import { useStore } from "../providers/StoreProvider";
import { Product } from "../data/products";
import Link from "next/link";

const worlds = [
  {
    name: "Casa inteligente",
    title: "Tecnología que desaparece",
    copy: "Control, bienestar y seguridad sin convertir tu casa en un laboratorio.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1500&q=88",
  },
  {
    name: "Mobiliario",
    title: "Formas para bajar el ritmo",
    copy: "Piezas honestas, táctiles y hechas para acompañar la vida real.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1500&q=88",
  },
  {
    name: "Iluminación",
    title: "La arquitectura de la luz",
    copy: "Atmósferas precisas para leer, conversar, descansar y celebrar.",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1500&q=88",
  },
];

export default function ShopClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { addToCart } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("Curaduría Nōma");
  const [limit, setLimit] = useState(8);
  const [light, setLight] = useState({ x: 50, y: 40 });

  const cats = useMemo(() => {
    return ["Todos", ...Array.from(new Set(initialProducts.map((p) => p.category)))];
  }, [initialProducts]);

  useEffect(() => setLimit(8), [q, cat, sort]);

  const list = useMemo(() => {
    return initialProducts
      .filter(
        (p) =>
          (cat === "Todos" || p.category === cat) &&
          (p.name + " " + p.category + " " + p.description)
            .toLowerCase()
            .includes(q.toLowerCase())
      )
      .sort((a, b) =>
        sort === "Precio ascendente"
          ? a.price - b.price
          : sort === "Precio descendente"
            ? b.price - a.price
            : Number(b.featured ?? 0) - Number(a.featured ?? 0)
      );
  }, [initialProducts, q, cat, sort]);

  const pick = (x: string) => {
    setCat(x);
    setTimeout(() => {
      document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const heroStyle = {
    "--light-x": `${light.x}%`,
    "--light-y": `${light.y}%`,
  } as CSSProperties;

  return (
    <>
      <Header
        onCart={() => setDrawer(true)}
        onSearch={setQ}
        onCategory={pick}
      />
      <main>
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
            <a href="#mundos">
              Entrar en la colección <ArrowDown />
            </a>
          </div>
          <div className="hero-note">
            <span>CDMX · 2026</span>
            <p>
              Diseño sereno.
              <br />
              Tecnología invisible.
            </p>
          </div>
        </section>

        <section className="world-intro" id="mundos">
          <p>No vendemos objetos aislados.</p>
          <h2>
            Creamos <em>atmósferas</em>
            <br />
            para vivir mejor.
          </h2>
        </section>

        <section className="worlds" aria-label="Colecciones curadas">
          {worlds.map((w, i) => (
            <article
              className="world"
              key={w.name}
              style={{ "--world-image": `url(${w.image})` } as CSSProperties}
            >
              <div className="world-copy">
                <span>
                  {String(i + 1).padStart(2, "0")} / {w.name}
                </span>
                <h2>{w.title}</h2>
                <p>{w.copy}</p>
                <button onClick={() => pick(w.name)}>
                  Explorar selección <ArrowRight />
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="catalog" id="catalogo">
          <div className="section-top">
            <div>
              <p>Objetos para quedarse</p>
              <h2>
                La colección
                <br />
                <em>completa.</em>
              </h2>
            </div>
            <p>
              Una selección viva de tecnología, luz, materia y bienestar. Menos
              opciones irrelevantes; mejores decisiones.
            </p>
          </div>

          <div className="catalog-tools">
            <button className="filter-toggle" aria-label="Filtros">
              <SlidersHorizontal />
              Filtrar
            </button>
            <div className="filters" aria-label="Categorías">
              {cats.map((x) => (
                <button
                  className={cat === x ? "active" : ""}
                  onClick={() => setCat(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
            <label>
              Ordenar
              <select
                aria-label="Ordenar productos"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Curaduría Nōma</option>
                <option>Precio ascendente</option>
                <option>Precio descendente</option>
              </select>
            </label>
          </div>

          <div className="catalog-count" aria-live="polite">
            Mostrando {Math.min(limit, list.length)} de {list.length} piezas
          </div>

          {!list.length ? (
            <div className="no-results">
              <h3>No encontramos esa pieza.</h3>
              <p>Prueba otra palabra o vuelve a la colección completa.</p>
              <button
                onClick={() => {
                  setQ("");
                  setCat("Todos");
                }}
              >
                Ver todo
              </button>
            </div>
          ) : (
            <div className="grid">
              {list.slice(0, limit).map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onAdd={() => addToCart(p, 1)}
                />
              ))}
            </div>
          )}

          {limit < list.length && (
            <button className="load-more" onClick={() => setLimit(limit + 8)}>
              Descubrir más <span>{list.length - limit} piezas</span>
            </button>
          )}
        </section>

        <section className="story">
          <div className="story-image" />
          <div className="story-copy">
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
            <a href="#principios">
              Conoce Nōma <ArrowRight />
            </a>
          </div>
        </section>

        <section className="values" id="principios">
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
        </section>

        <section className="newsletter">
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
            <button>
              Suscribirme <ArrowRight />
            </button>
          </form>
        </section>
      </main>

      <footer>
        <Link className="brand" href="/">
          NŌMA<span>casa viva</span>
        </Link>
        <nav aria-label="Explorar">
          <b>Explora</b>
          {cats.slice(1, 5).map((x) => (
            <a href="#catalogo" onClick={() => pick(x)} key={x}>
              {x}
            </a>
          ))}
        </nav>
        <nav aria-label="Ayuda">
          <b>Ayuda</b>
          <a href="mailto:hola@noma.mx">Contacto</a>
          <Link href="/checkout">Envíos y devoluciones</Link>
          <a href="#principios">Garantía</a>
        </nav>
        <nav aria-label="Administración">
          <b>Cuenta</b>
          <Link href="/admin">Panel de gestión</Link>
          <Link href="/login">Acceso y registro</Link>
        </nav>
        <small>© 2026 Nōma Casa Viva · Ciudad de México</small>
      </footer>

      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
