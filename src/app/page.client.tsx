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
  Star,
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
  initialReviews = [],
}: {
  initialProducts: Product[];
  initialReviews?: any[];
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
    setToast(`${product.name} added to cart.`);
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
            <p className="collection-code">NŌMA / COLLECTION 02</p>
            <h1>
              The intelligence
              <br />
              of <em>simplicity.</em>
            </h1>
            <p>
              Objects with presence. Technology without noise. A home that responds
              to you without seeking attention.
            </p>
            <a href="#atmospheres">
              Enter the collection <ArrowDown />
            </a>
          </div>
          <div className="hero-note">
            <span>NYC / 2026</span>
            <p>
              Serene design.
              <br />
              Invisible technology.
            </p>
          </div>
        </section>

        <ScrollReveal className="world-intro" id="atmospheres">
          <p>We do not sell isolated objects.</p>
          <h2>
            We create <em>atmospheres</em>
            <br />
            for better living.
          </h2>
        </ScrollReveal>

        <section
          ref={categoryStoriesRef}
          className="category-stories"
          aria-label="Shop by Atmosphere"
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
                View Collection <ArrowRight />
              </b>
            </TransitionLink>
          ))}
        </section>

        <section className="catalog" id="catalogo">
          <ScrollReveal className="section-top">
            <div>
              <p>Selected Objects</p>
              <h2>
                Featured
                <br />
                <em>Curation.</em>
              </h2>
            </div>
            <p>
              A curated selection of technology, light, matter, and wellness.
              The most exceptional pieces for your home.
            </p>
          </ScrollReveal>

          <div className="catalog-count" aria-live="polite">
            Showing {Math.min(limit, list.length)} of {list.length} featured pieces
          </div>

          {!list.length ? (
            <div className="no-results">
              <h3>We couldn't find that piece.</h3>
              <p>Try another keyword or return to the full selection.</p>
              <button
                onClick={() => {
                  setQ("");
                }}
              >
                View all
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
              Discover <span>{list.length - limit} more pieces</span>
            </button>
          )}
        </section>

        <section className="story">
          <ScrollReveal className="story-image" />
          <ScrollReveal className="story-copy" delay={120}>
            <p>Our Philosophy</p>
            <h2>
              Less noise.
              <br />
              <em>More home.</em>
            </h2>
            <p>
              Technology should disappear into the experience. Every object
              deserves a place, a purpose, and a story.
            </p>
            <TransitionLink href={`/categoria/${categorySlug("Smart Home")}`}>
              Discover NŌMA <ArrowRight />
            </TransitionLink>
          </ScrollReveal>
        </section>

        <ScrollReveal className="values" id="principios">
          <div>
            <Sparkles />
            <h3>Human Curation</h3>
            <p>We test every piece before inviting it into your home.</p>
          </div>
          <div>
            <Leaf />
            <h3>Responsible Choices</h3>
            <p>Conscious materials and plastic-free packaging.</p>
          </div>
          <div>
            <ShieldCheck />
            <h3>Genuine Warranty</h3>
            <p>Two years of support on the entire collection.</p>
          </div>
          <div>
            <Headphones />
            <h3>We are close</h3>
            <p>Personalized support Monday through Saturday.</p>
          </div>
        </ScrollReveal>

        {/* Community Reviews */}
        <section className="community-reviews" style={{ paddingBlock: "80px", borderTop: "1px solid var(--line)" }}>
          <ScrollReveal className="section-top" style={{ textAlign: "center", marginBottom: "48px" }}>
            <div>
              <p>Shared Experiences</p>
              <h2>
                Community
                <br />
                <em>Reviews.</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", paddingInline: "var(--page)", maxWidth: "1400px", margin: "0 auto" }}>
            {initialReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="review-card"
                style={{
                  background: "rgba(244, 241, 233, 0.03)",
                  border: "1px solid rgba(244, 241, 233, 0.08)",
                  borderRadius: "8px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s var(--ease), border-color 0.3s var(--ease)",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rev.rating ? "var(--clay)" : "none"}
                        stroke={i < rev.rating ? "var(--clay)" : "var(--copy)"}
                      />
                    ))}
                  </div>
                  <p style={{ fontStyle: "italic", fontSize: "15px", lineHeight: "1.6", color: "var(--paper)", opacity: 0.9, marginBottom: "24px", overflowWrap: "break-word" }}>
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid rgba(244, 241, 233, 0.05)", paddingTop: "16px" }}>
                  <img
                    src={rev.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.author_name)}&background=random`}
                    alt={rev.author_name}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <strong style={{ display: "block", fontSize: "14px", fontWeight: "600" }}>{rev.author_name}</strong>
                    <span style={{ display: "block", fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>
                      {rev.products?.name ? `Purchased ${rev.products.name}` : "Verified Customer"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </section>

        <ScrollReveal className="newsletter">
          <p>Letters from Home</p>
          <h2>
            One good idea.
            <br />
            <em>Once a month.</em>
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email">Email Address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
            />
            <button type="submit">
              Subscribe <ArrowRight />
            </button>
          </form>
        </ScrollReveal>
      </main>

      <Footer />

      <div className={`cart-toast ${toast ? "show" : ""}`} role="status">
        {toast}
        <button onClick={() => setDrawer(true)}>View Cart</button>
      </div>
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
