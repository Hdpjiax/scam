"use client";

import { CSSProperties, useMemo, useState } from "react";
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
  Sparkles,
} from "lucide-react";
import { Product } from "../../../data/products";
import { useStore } from "../../../providers/StoreProvider";
import { money } from "../../../lib/utils";
import { Cart } from "../../../components/Drawers";
import { categorySlug } from "../../../lib/catalog";

const FALLBACK_REVIEWS_POOL = [
  {
    id: "f1",
    author_name: "Sarah K.",
    author_avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    content: "Absolutely gorgeous piece. The texture and finish are impeccable and it instantly elevated the quiet mood of my living room.",
    is_verified_purchase: true,
  },
  {
    id: "f2",
    author_name: "Daniel M.",
    author_avatar: "https://i.pravatar.cc/150?u=daniel",
    rating: 5,
    content: "Exceeded my expectations. The craftsmanship is wonderful, and the packaging was incredibly secure. Safe delivery to New York.",
    is_verified_purchase: true,
  },
  {
    id: "f3",
    author_name: "Elena R.",
    author_avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 4,
    content: "Elegant design and very solid materials. Took a few days to arrive but it was well worth the wait.",
    is_verified_purchase: true,
  }
];

const colorName = (hex: string) => {
  const map: Record<string, string> = {
    "#d8c7ad": "Natural",
    "#292723": "Charcoal",
    "#87907c": "Sage",
    "#e8e1d5": "Sand",
    "#2d2b29": "Basalt",
    "#e6dfd0": "Alabaster",
    "#b6a58d": "Oatmeal",
    "#9b6c4e": "Clay",
    "#ded1bf": "Cream",
    "#222220": "Obsidian",
    "#ccb78f": "Bronze",
    "#b77b55": "Terracotta",
    "#ddd5c8": "Linen",
    "#f2efe8": "Bone",
    "#6c4933": "Walnut",
    "#b39b7c": "Ash",
    "#ded8cb": "Parchment",
    "#8a7967": "Taupe",
    "#edeae3": "Chalk",
    "#252525": "Midnight Black",
    "#f3f1ec": "Pebble",
    "#20211f": "Slate",
    "#ded2bd": "Warm Linen",
    "#899082": "Olive",
    "#cab99e": "Mist",
    "#a66f52": "Copper",
    "#e1d4c1": "Off-White",
    "#1e1f1d": "Ink Black",
    "#d7d0c4": "Ivory",
    "#a85e40": "Rust",
    "#d6c2a7": "Warm Sand",
    "#171815": "Eclipse Black",
    "#d7aa67": "Solar Gold",
    "#b89163": "Oak",
    "#664a35": "Dark Oak",
    "#eeece5": "Cloud",
    "#9ca099": "Mist Grey"
  };
  return map[hex.toLowerCase()] || hex;
};

export default function ProductPageClient({
  initialProduct,
  initialReviews = [],
}: {
  initialProduct: Product | null;
  initialReviews?: any[];
}) {
  const { cart, addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [added, setAdded] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const productReviews = useMemo(() => {
    if (initialReviews.length > 0) return initialReviews;
    return FALLBACK_REVIEWS_POOL;
  }, [initialReviews]);

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 5.0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  }, [productReviews]);

  const [selectedColor, setSelectedColor] = useState(() => {
    return initialProduct?.colors?.[0] || "";
  });

  if (!initialProduct) {
    return (
      <div className="access-denied">
        <h1>Product Not Found</h1>
        <Link href="/">Back to Shop</Link>
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
    addToCart(p, qty, colorName(selectedColor));
    setAdded(true);
    setDrawer(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <div className="pdp">
        <header className="pdp-top">
          <Link href="/">
            <ArrowLeft /> Back
          </Link>
          <Link className="brand" href="/" aria-label="NŌMA, Home">
            NŌMA<span>living spaces</span>
          </Link>
          <button className="pdp-cart-link" onClick={() => setDrawer(true)}>
            Bag ({cartCount})
          </button>
        </header>
        <main>
          <div className="pdp-gallery">
            <div className="pdp-main-img">
              {p.badge && <span>{p.badge}</span>}
              <img
                src={p.image}
                alt={p.name}
                data-fly-source={p.id}
                style={
                  { viewTransitionName: `product-${p.id}` } as CSSProperties
                }
              />
            </div>
            <div className="pdp-secondary">
              <img src={p.image} alt={`Detail of ${p.name}`} />
              <div className="material-shot" />
            </div>
          </div>
          <section className="pdp-info">
            <small>
              <Link href={`/categoria/${categorySlug(p.category)}`}>{p.category}</Link>{" "}
              / {p.sku}
            </small>
            <h1>{p.name}</h1>
            
            <a href="#reviews-section" className="product-rating-summary" style={{ textDecoration: "none" }}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(Number(averageRating)) ? "#d1b894" : "none"} stroke={i < Math.round(Number(averageRating)) ? "#d1b894" : "var(--border)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span>{averageRating} ({productReviews.length} Reviews)</span>
            </a>

            <div className="pdp-price">
              {money(p.price)} {p.oldPrice && <s>{money(p.oldPrice)}</s>}
            </div>
            <p>{p.description}</p>
            <div className="pdp-colors">
              <label>
                Color: <b>{colorName(selectedColor)}</b>
              </label>
              <div className="pdp-colors-list">
                {p.colors.map((c, i) => (
                  <button
                    aria-label={`Select Color ${colorName(c)}`}
                    key={`${c}-${i}`}
                    className={selectedColor === c ? "active" : ""}
                    onClick={() => setSelectedColor(c)}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
            <div className={`stock ${isOut ? "out" : isLow ? "low" : ""}`}>
              <i />
              <span>
                <b>{isOut ? "Out of Stock" : isLow ? "Only a few left" : "In Stock"}</b>
                {isOut
                  ? "This piece will return soon."
                  : `${stock} units ready to ship`}
              </span>
            </div>
            <div className="pdp-buy">
              <div>
                <button
                  aria-label="Reduce quantity"
                  disabled={qty <= 1 || isOut}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus />
                </button>
                <span aria-live="polite">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  disabled={qty >= stock || isOut}
                  onClick={() => setQty(Math.min(stock, qty + 1))}
                >
                  <Plus />
                </button>
              </div>
              <button
                disabled={isOut}
                className={added ? "added" : ""}
                onClick={handleAdd}
              >
                {isOut ? "Out of Stock" : added ? "Added" : `Add to Bag / ${selectedTotal}`}
              </button>
              <button
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={fav}
                onClick={() => setFav(!fav)}
              >
                <Heart />
              </button>
            </div>

            {/* Premium Specifications Table */}
            <div className="pdp-specifications" style={{ marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "30px" }}>
              <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#d1b894", margin: "0 0 20px" }}>
                Specifications & Materials
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px", fontSize: "13px", color: "#ffffff" }}>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                  <span style={{ opacity: 0.75, display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Origin</span>
                  <strong style={{ color: "#ffffff" }}>Sustainably Crafted</strong>
                </div>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                  <span style={{ opacity: 0.75, display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Dimensions</span>
                  <strong style={{ color: "#ffffff" }}>Standard Size</strong>
                </div>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                  <span style={{ opacity: 0.75, display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Material</span>
                  <strong style={{ color: "#ffffff" }}>Premium Organic Blends</strong>
                </div>
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                  <span style={{ opacity: 0.75, display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Finish</span>
                  <strong style={{ color: "#ffffff" }}>Matte Mineral Glaze</strong>
                </div>
              </div>
            </div>

            <div className="pdp-benefits" style={{ marginTop: "40px" }}>
              <div>
                <Truck />
                <span>
                  <b>Free shipping</b>On orders over $100
                </span>
              </div>
              <div>
                <ShieldCheck />
                <span>
                  <b>Two-year warranty</b>100% protected purchase
                </span>
              </div>
              <div>
                <Check />
                <span>
                  <b>30 days to decide</b>Simple and easy returns
                </span>
              </div>
            </div>

            <details open>
              <summary>Details that matter</summary>
              <p>
                Designed to blend naturally into your personal environment. Carefully chosen materials, 
                intuitive design controls, and dedicated support to guarantee your peace of mind.
              </p>
            </details>
            <details>
              <summary>Shipping & Returns</summary>
              <p>
                Insured carbon-neutral shipping. If you are not completely in love with the piece, 
                return it in its original packaging during the first 30 days for a full refund.
              </p>
            </details>
          </section>
        </main>
        
        <section className="pdp-story">
          <small>Designed for real life</small>
          <h2>
            More than an object,
            <br />
            <em>a new atmosphere.</em>
          </h2>
        </section>

        {/* Premium Reviews List Section */}
        <section id="reviews-section" className="pdp-reviews-panel" style={{ padding: "80px 4%", background: "rgba(255, 255, 255, 0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
              <div>
                <small style={{ color: "#d1b894", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600" }}>Community Voices</small>
                <h2 style={{ fontSize: "28px", marginTop: "8px", fontFamily: "var(--font-serif)", color: "#ffffff" }}>Customer Reviews</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "36px", fontWeight: "300", fontFamily: "var(--font-serif)", color: "#ffffff" }}>
                  {averageRating} <span style={{ fontSize: "16px", color: "#d1b894" }}>/ 5.0</span>
                </div>
                <div style={{ display: "flex", gap: "2px", justifyContent: "flex-end", marginTop: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.round(Number(averageRating)) ? "#d1b894" : "none"} stroke="#d1b894" />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {productReviews.map((r, i) => (
                <div 
                  key={r.id || i} 
                  style={{ 
                    padding: "24px", 
                    background: "rgba(255, 255, 255, 0.03)", 
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px", 
                    border: "1px solid rgba(255, 255, 255, 0.06)" 
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <img 
                      src={r.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=random`} 
                      alt={r.author_name} 
                      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <strong style={{ fontSize: "14px", color: "#ffffff" }}>{r.author_name}</strong>
                        {r.is_verified_purchase && (
                          <span style={{ fontSize: "10px", color: "#d1b894", background: "rgba(209, 184, 148, 0.08)", border: "1px solid rgba(209, 184, 148, 0.3)", padding: "2px 8px", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                            <Sparkles size={8} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={12}
                            fill={idx < r.rating ? "#d1b894" : "none"}
                            stroke="#d1b894"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#ffffff", opacity: 0.95 }}>
                    {r.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
