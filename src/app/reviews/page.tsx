"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Star, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { Cart } from "../../components/Drawers";

const STATIC_REVIEWS = [
  {
    id: "1",
    author_name: "Valeria M.",
    author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    content: "The quality of the materials is exceptional. I had been looking for decorative pieces that really brought calm to the space for a long time, and NŌMA achieved exactly that. The shipping was super fast and the packaging very careful.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    products: {
      id: 4,
      name: "Clay Vase 02",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
      category: "Decor"
    }
  },
  {
    id: "2",
    author_name: "Carlos T.",
    author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    content: "I bought a lamp for my studio and it completely changed the atmosphere of the place. The design is minimalist but with a lot of presence. I will definitely buy again.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    products: {
      id: 1,
      name: "Aura Lamp",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
      category: "Lighting"
    }
  },
  {
    id: "3",
    author_name: "Sofía R.",
    author_avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 4,
    content: "Beautiful products. The customer service was very friendly when I had a question about the measurements of a furniture piece. Highly recommended.",
    is_verified_purchase: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    products: {
      id: 3,
      name: "Mist Diffuser",
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85",
      category: "Wellness"
    }
  },
  {
    id: "4",
    author_name: "Andrés G.",
    author_avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    rating: 5,
    content: "Pure minimalism. I love how each piece seems to tell a story. The neutral tones match everything in my apartment.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    products: {
      id: 8,
      name: "Loma Side Table",
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a694?auto=format&fit=crop&w=900&q=85",
      category: "Furniture"
    }
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>(STATIC_REVIEWS);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('reviews')
          .select('*, products(id, name, image, category)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const dbIds = new Set(data.map((r: any) => String(r.id)));
          const combined = [
            ...data,
            ...STATIC_REVIEWS.filter(r => !dbIds.has(String(r.id)))
          ];
          setReviews(combined);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
    : 5;

  return (
    <>
      <Header onCart={() => setDrawer(true)} />
      <main className="reviews-page" style={{ background: "var(--ink)", minHeight: "100vh", color: "var(--paper)" }}>
        
        {/* Immersive Header Section */}
        <section className="reviews-hero" style={{ padding: "80px 4% 40px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "32px" }}>
            <div>
              <small style={{ color: "#d1b894", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", fontSize: "12px" }}>Community Voices</small>
              <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", marginTop: "8px", fontFamily: "var(--font-serif)", color: "#ffffff", fontWeight: "300", letterSpacing: "-0.02em" }}>
                What our community says
              </h1>
              <p style={{ opacity: 0.7, fontSize: "15px", marginTop: "12px", maxWidth: "500px", lineHeight: "1.6" }}>
                Discover how our pieces inhabit and transform the spaces of those who trust NŌMA.
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
              <span style={{ fontSize: "12px", opacity: 0.5 }}>Based on {totalReviews} reviews</span>
            </div>
          </div>
        </section>

        {/* Clean, Horizontal Long Cards List */}
        <section style={{ padding: "60px 4%", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {reviews.map((review) => (
              <div 
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
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease"
                }}
              >
                {/* Author Info Column */}
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
                        {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(review.created_at))}
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

                {/* Review Body Column */}
                <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "#ffffff", opacity: 0.9 }}>
                    &ldquo;{review.content}&rdquo;
                  </p>

                  {review.products && (
                    <div style={{ 
                      marginTop: "16px", 
                      padding: "12px 16px", 
                      background: "rgba(255, 255, 255, 0.02)", 
                      border: "1px solid rgba(255, 255, 255, 0.05)", 
                      borderRadius: "8px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      gap: "16px" 
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img 
                          src={review.products.image} 
                          alt={review.products.name} 
                          style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover", border: "1px solid rgba(255,255,255,0.08)" }} 
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
                      <Link 
                        href={`/producto/${review.products.id}`}
                        style={{ 
                          fontSize: "11px", 
                          color: "#d1b894", 
                          textTransform: "uppercase", 
                          letterSpacing: "0.05em", 
                          fontWeight: "600", 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "4px",
                          transition: "color 0.2s ease"
                        }}
                        className="review-pdp-link"
                      >
                        Inspect <ArrowRight size={10} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Cart open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
