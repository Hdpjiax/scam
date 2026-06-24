"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Star } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { Cart } from "../../components/Drawers";

// Fallback de reseñas estáticas si falla la BD
const STATIC_REVIEWS = [
  {
    id: "1",
    author_name: "Valeria M.",
    author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    content: "La calidad de los materiales es excepcional. Llevaba tiempo buscando piezas de decoración que realmente aportaran calma al espacio, y NŌMA logró exactamente eso. El envío fue súper rápido y el empaque muy cuidadoso.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "2",
    author_name: "Carlos T.",
    author_avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    content: "Compré una lámpara para mi estudio y cambió completamente la atmósfera del lugar. El diseño es minimalista pero con mucha presencia. Definitivamente volveré a comprar.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "3",
    author_name: "Sofía R.",
    author_avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 4,
    content: "Hermosos productos. La atención al cliente fue muy amable cuando tuve una duda sobre las medidas de un mueble. Lo recomiendo.",
    is_verified_purchase: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "4",
    author_name: "Andrés G.",
    author_avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    rating: 5,
    content: "Minimalismo puro. Me encanta cómo cada pieza parece contar una historia. Los tonos neutros combinan con todo en mi departamento.",
    is_verified_purchase: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
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
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, []);

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
    : 0;

  return (
    <>
      <Header onCart={() => setDrawer(true)} />
      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="reviews-hero-content">
            <h1>Voces de nuestra comunidad</h1>
            <p>Descubre cómo nuestros objetos habitan y transforman los espacios de quienes confían en NŌMA.</p>

            <div className="reviews-stats-card">
              <div className="stats-main">
                <span className="big-rating">{averageRating.toFixed(1)}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`star-icon ${i < Math.round(averageRating) ? 'filled' : ''}`} />
                  ))}
                </div>
                <span className="total-count">Basado en {totalReviews} reseñas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-grid-section">
          <div className="reviews-masonry">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <img
                    src={review.author_avatar || `https://ui-avatars.com/api/?name=${review.author_name}&background=random`}
                    alt={review.author_name}
                    className="review-avatar"
                  />
                  <div>
                    <div className="review-author-name">
                      {review.author_name}
                      {review.is_verified_purchase && (
                        <span className="verified-badge" title="Compra Verificada">✓</span>
                      )}
                    </div>
                    <div className="review-date">
                      {new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(new Date(review.created_at))}
                    </div>
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`star-small ${i < review.rating ? 'filled' : ''}`} />
                  ))}
                </div>

                <p className="review-content">"{review.content}"</p>

                {review.product_id && (
                  <div className="review-product-link">
                    <Link href={`/producto/${review.product_id}`}>
                      Ver producto relacionado →
                    </Link>
                  </div>
                )}
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
