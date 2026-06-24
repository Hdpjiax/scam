"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TransitionLink from "./TransitionLink";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useStore } from "../providers/StoreProvider";
import { categories } from "../lib/catalog";

export default function Header({
  onCart,
  onSearch,
}: {
  onCart: () => void;
  onSearch?: (value: string) => void;
}) {
  const { cart, profile, cartPulse } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [pulse, setPulse] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navCategories = categories.slice(0, 5);

  useEffect(() => {
    if (!cartPulse) return;
    setPulse(true);
    const timer = window.setTimeout(() => setPulse(false), 520);
    return () => window.clearTimeout(timer);
  }, [cartPulse]);

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
        Skip to catalog
      </a>
      <div className="announcement">
        Free shipping on orders over $100 <span aria-hidden="true">/</span>{" "}
        30-day returns
      </div>
      <header className="site-header">
        <button
          className="icon mobile"
          aria-label="Open menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <Menu />
        </button>
        <TransitionLink className="brand" href="/" aria-label="NŌMA, home">
          NŌMA<span>living spaces</span>
        </TransitionLink>
        <nav aria-label="Main navigation" className="main-nav">
          <div className="nav-item-dropdown">
            <span className="nav-trigger">Collection</span>
            <div className="mega-menu">
              <div className="mega-menu-content">
                {categories.map((category) => (
                  <TransitionLink
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="mega-menu-card"
                  >
                    <div className="mega-menu-img-wrap">
                      <img src={category.image} alt={category.name} />
                    </div>
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.title}</p>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>
          <TransitionLink href="/reviews">Reviews</TransitionLink>
        </nav>
        <div className="actions">
          <button
            className="icon search-trigger"
            aria-label="Search"
            onClick={() => setSearch(!search)}
          >
            <Search />
          </button>
          <Link
            className="icon user-link"
            href={profile?.role === "admin" ? "/admin" : "/login"}
            aria-label={profile ? `${profile.name}'s account` : "Log in"}
          >
            <UserRound />
            <span>{profile ? profile.name.split(" ")[0] : ""}</span>
          </Link>
          <button className="icon" aria-label="View favorites">
            <Heart />
          </button>
          <button
            className={`icon cart ${pulse ? "pulse" : ""}`}
            onClick={onCart}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <ShoppingBag />
            <b aria-hidden="true">{cartCount}</b>
          </button>
        </div>
        {search && (
          <form className="header-search" onSubmit={(e) => e.preventDefault()}>
            <Search />
            <label htmlFor="global-search">Search NŌMA</label>
            <input
              id="global-search"
              autoFocus
              placeholder="Lamps, textiles, furniture..."
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <button
              type="button"
              aria-label="Close search"
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
          <button aria-label="Close menu" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <p>Find your next piece</p>
        <nav aria-label="Mobile menu">
          {categories.map((category, index) => (
            <Link
              href={`/categoria/${category.slug}`}
              onClick={() => setMenu(false)}
              key={category.slug}
            >
              <span>0{index + 1}</span>
              {category.name}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <Link href="/login" onClick={() => setMenu(false)}>
            My account
          </Link>
          <button
            onClick={() => {
              setMenu(false);
              setSearch(true);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
