"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { products } from "../../data/products";
import { createClient } from "../../lib/supabase/client";
import { useStore } from "../../providers/StoreProvider";

type ReviewRow = {
  id: string;
  product_id: number;
  author_name: string;
  author_avatar?: string;
  rating: number;
  content: string;
  is_verified_purchase: boolean;
  created_at: string;
  products?: {
    id: number;
    name: string;
    images?: string[];
    image?: string;
    category: string;
  } | null;
};

const fallbackReviews: ReviewRow[] = products.flatMap((product) =>
  (product.reviews || []).map((review) => ({
    id: `${product.id}-${review.id}`,
    product_id: product.id,
    author_name: review.author_name,
    author_avatar: review.author_avatar,
    rating: review.rating,
    content: review.title ? `${review.title}. ${review.content}` : review.content,
    is_verified_purchase: !!review.is_verified_purchase,
    created_at: review.created_at || new Date().toISOString(),
    products: {
      id: product.id,
      name: product.name,
      images: product.images,
      image: product.image,
      category: product.category,
    },
  })),
);

const reviewProductImage = (review: ReviewRow) =>
  review.products?.images?.[0] || review.products?.image || "/assets/hero-casa-noma-1600.webp";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRow[]>(fallbackReviews);
  const { setCartOpen, setWishlistOpen } = useStore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("reviews")
          .select("*, products(id, name, images, category)")
          .order("created_at", { ascending: false });

        if (!error && data?.length) {
          setReviews(data as ReviewRow[]);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 5;
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }, [reviews]);

  return (
    <>
      <Header onCart={() => setCartOpen(true)} onWishlist={() => setWishlistOpen(true)} />
      <main className="reviews-page" style={{ background: "var(--ink)", minHeight: "100vh", color: "var(--paper)" }}>
        <section className="reviews-hero" style={{ padding: "80px 4% 40px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "32px" }}>
            <div>
              <small style={{ color: "#d1b894", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", fontSize: "12px" }}>Community Voices</small>
              <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", marginTop: "8px", fontFamily: "var(--font-serif)", color: "#ffffff", fontWeight: "300", letterSpacing: "-0.02em" }}>
                What our community says
              </h1>
              <p style={{ opacity: 0.7, fontSize: "15px", marginTop: "12px", maxWidth: "500px", lineHeight: "1.6" }}>
                Discover {reviews.length} real notes from clients living with NŌMA pieces.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px 40px", borderRadius: "8px", backdropFilter: "blur(10px)", textAlign: "center", minWidth: "220px" }}>
              <div style={{ fontSize: "48px", fontWeight: "300", fontFamily: "var(--font-serif)", color: "#ffffff", lineHeight: 1 }}>
                {averageRating.toFixed(1)} <span style={{ fontSize: "18px", color: "#d1b894" }}>/ 5.0</span>
              </div>
              <div style={{ display: "flex", gap: "2px", justifyContent: "center", margin: "12px 0 6px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(averageRating) ? "#d1b894" : "none"} stroke="#d1b894" />
                ))}
              </div>
              <span style={{ fontSize: "12px", opacity: 0.5 }}>Based on {reviews.length} reviews</span>
            </div>
          </div>
        </section>

        <section style={{ padding: "60px 4%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: "980px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {reviews.map((review) => (
              <article
                key={review.id}
                className="review-card-long"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "12px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "24px",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease",
                }}
              >
                <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={review.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=random`}
                      alt={review.author_name}
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                    <div>
                      <strong style={{ fontSize: "14px", color: "#ffffff", display: "block" }}>{review.author_name}</strong>
                      <span style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px", display: "block" }}>
                        {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(review.created_at))}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "#d1b894" : "none"} stroke="#d1b894" />
                    ))}
                  </div>

                  {review.is_verified_purchase && (
                    <span style={{ fontSize: "10px", color: "#d1b894", background: "rgba(209, 184, 148, 0.08)", border: "1px solid rgba(209, 184, 148, 0.3)", padding: "2px 8px", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "3px", width: "fit-content" }}>
                      <Sparkles size={8} /> Verified Buyer
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "#ffffff", opacity: 0.9 }}>
                    &ldquo;{review.content}&rdquo;
                  </p>

                  {review.products && (
                    <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={reviewProductImage(review)}
                          alt={review.products.name}
                          loading="lazy"
                          style={{ width: "48px", height: "48px", borderRadius: "4px", objectFit: "cover", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                        <div>
                          <small style={{ display: "block", fontSize: "10px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {review.products.category}
                          </small>
                          <strong style={{ display: "block", fontSize: "13px", color: "#ffffff" }}>
                            {review.products.name}
                          </strong>
                        </div>
                      </div>
                      <Link href={`/producto/${review.products.id}`} className="review-pdp-link" style={{ fontSize: "11px", color: "#d1b894", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px", transition: "color 0.2s ease" }}>
                        Inspect <ArrowRight size={10} />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
