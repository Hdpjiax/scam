"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useStore } from "../providers/StoreProvider";

const links = [
  "Casa inteligente",
  "Iluminación",
  "Mobiliario",
  "Decoración",
  "Cocina",
];

export default function Header({
  onCart,
  onSearch,
  onCategory,
}: {
  onCart: () => void;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
}) {
  const { cart, profile } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    document.querySelector("main")?.toggleAttribute("inert", menu);
    document.querySelector("footer")?.toggleAttribute("inert", menu);
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setMenu(false);
    addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      document.querySelector("main")?.removeAttribute("inert");
      document.querySelector("footer")?.removeAttribute("inert");
      removeEventListener("keydown", close);
    };
  }, [menu]);

  return (
    <>
      <a className="skip-link" href="#catalogo">
        Saltar al catálogo
      </a>
      <div className="announcement">
        Envío gratuito desde $1,999 <span aria-hidden="true">—</span>{" "}
        Devoluciones durante 30 días
      </div>
      <header className="site-header">
        <button
          className="icon mobile"
          aria-label="Abrir menú"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <Menu />
        </button>
        <Link className="brand" href="/" aria-label="Nōma, inicio">
          NŌMA<span>casa viva</span>
        </Link>
        <nav aria-label="Navegación principal">
          {links.map((x) => (
            <a key={x} href="#catalogo" onClick={() => onCategory(x)}>
              {x}
            </a>
          ))}
        </nav>
        <div className="actions">
          <button
            className="icon search-trigger"
            aria-label="Buscar"
            onClick={() => setSearch(!search)}
          >
            <Search />
          </button>
          <Link
            className="icon user-link"
            href={profile ? (profile.role === "admin" ? "/admin" : "/login") : "/login"}
            aria-label={profile ? `Cuenta de ${profile.name}` : "Iniciar sesión"}
          >
            <UserRound />
            <span>{profile ? profile.name.split(" ")[0] : ""}</span>
          </Link>
          <button className="icon" aria-label="Ver favoritos">
            <Heart />
          </button>
          <button
            className="icon cart"
            onClick={onCart}
            aria-label={`Abrir carrito, ${cartCount} productos`}
          >
            <ShoppingBag />
            <b aria-hidden="true">{cartCount}</b>
          </button>
        </div>
        {search && (
          <form className="header-search" onSubmit={(e) => e.preventDefault()}>
            <Search />
            <label htmlFor="global-search">Buscar en Nōma</label>
            <input
              id="global-search"
              autoFocus
              placeholder="Lámparas, textiles, muebles…"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button
              type="button"
              aria-label="Cerrar búsqueda"
              onClick={() => setSearch(false)}
            >
              <X />
            </button>
          </form>
        )}
      </header>
      <div
        className={"mobile-menu " + (menu ? "open" : "")}
        aria-hidden={!menu}
      >
        <div className="mobile-menu-head">
          <span>NŌMA</span>
          <button aria-label="Cerrar menú" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <p>Encuentra tu próxima pieza</p>
        <nav aria-label="Menú móvil">
          {links.map((x, i) => (
            <a
              href="#catalogo"
              onClick={() => {
                onCategory(x);
                setMenu(false);
              }}
              key={x}
            >
              <span>0{i + 1}</span>
              {x}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <Link href="/login" onClick={() => setMenu(false)}>
            Mi cuenta
          </Link>
          <button
            onClick={() => {
              setMenu(false);
              setSearch(true);
            }}
          >
            Buscar
          </button>
        </div>
      </div>
    </>
  );
}
