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
import { Product } from "../../data/products";
import { useStore } from "../../providers/StoreProvider";
import { money } from "../../lib/utils";
import { categorySlug } from "../../lib/catalog";
import { colorName } from "../catalog/color-names";
import { FALLBACK_REVIEWS_POOL } from "./product-detail.data";

export default function ProductPageClient({
  initialProduct,
  initialReviews = [],
}: {
  initialProduct: Product | null;
  initialReviews?: any[];
}) {
  const { cart, addToCart, toggleWishlist, isInWishlist, setCartOpen } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const productReviews = useMemo(() => {
    if (initialReviews.length > 0) return initialReviews;
    if (initialProduct?.reviews?.length) return initialProduct.reviews;
    return FALLBACK_REVIEWS_POOL;
  }, [initialProduct, initialReviews]);

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 5.0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  }, [productReviews]);

  const [selectedColor, setSelectedColor] = useState(() => {
    return initialProduct?.colors?.[0] || "";
  });

  const productImages = useMemo(() => {
    return initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : [initialProduct?.image].filter(Boolean) as string[];
  }, [initialProduct]);

  const [activeImage, setActiveImage] = useState(() => {
    return productImages[0] || initialProduct?.image || "";
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
  const fav = p ? isInWishlist(p.id) : false;
  const stock = p.stock ?? 0;
  const isOut = stock <= 0;
  const isLow = stock > 0 && stock <= 5;

  const selectedTotal = useMemo(() => money(p.price * qty), [p.price, qty]);

  const handleAdd = () => {
    if (isOut) return;
    addToCart(p, qty, colorName(selectedColor));
    setAdded(true);
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
          <button className="pdp-cart-link" onClick={() => setCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path></svg> ({cartCount})
          </button>
        </header>
        <main>
          <div className="pdp-gallery">
            <div className="pdp-main-img" style={{ position: "relative" }}>
              {p.badge && <span>{p.badge}</span>}
              <img
                src={activeImage}
                alt={p.name}
                data-fly-source={p.id}
                style={
                  { viewTransitionName: `product-${p.id}`, width: "100%", height: "100%", objectFit: "cover" } as CSSProperties
                }
              />
              
              {/* Premium Floating Thumbnail Selector */}
              {productImages.length > 1 && (
                <div 
                  className="no-scrollbar"
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    background: "rgba(28, 29, 25, 0.4)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    zIndex: 10,
                    maxWidth: "90%",
                    overflowX: "auto",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {productImages.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(imgUrl)}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "6px",
                        border: activeImage === imgUrl ? "2px solid #d1b894" : "1px solid rgba(255, 255, 255, 0.15)",
                        padding: 0,
                        overflow: "hidden",
                        background: "none",
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        flexShrink: 0,
                        transform: activeImage === imgUrl ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="pdp-secondary">
              <img 
                src={productImages[1] || productImages[0] || p.image} 
                alt={`Detail of ${p.name}`} 
                onClick={() => {
                  if (productImages[1]) {
                    setActiveImage(productImages[1]);
                  }
                }}
                style={{ 
                  cursor: productImages[1] ? "pointer" : "default",
                  transition: "opacity 0.3s ease",
                }}
              />
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
              <span>
                {averageRating} ({p.reviewCount || productReviews.length} Reviews)
              </span>
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
                onClick={() => p && toggleWishlist(p)}
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
                  {r.title && (
                    <h3 style={{ margin: "0 0 8px", fontSize: "16px", color: "#ffffff" }}>
                      {r.title}
                    </h3>
                  )}
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#ffffff", opacity: 0.95 }}>
                    {r.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
