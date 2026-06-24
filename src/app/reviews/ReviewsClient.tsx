"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useStore } from "../../providers/StoreProvider";

interface Review {
  id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  content: string;
  is_verified_purchase: boolean;
  created_at: string;
  product_id?: string;
}

export default function ReviewsClient({
  reviews,
  averageRating,
  totalReviews,
}: {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}) {
  const { setCartOpen, setWishlistOpen } = useStore();

  return (
    <>
      <Header onCart={() => setCartOpen(true)} onWishlist={() => setWishlistOpen(true)} />
      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="reviews-hero-content">
            <h1>Voices from our community</h1>
            <p>
              Discover how our pieces inhabit and transform the spaces of clients
              who trust NŌMA.
            </p>

            <div className="reviews-stats-card">
              <div className="stats-main">
                <span className="big-rating">{averageRating.toFixed(1)}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${i < Math.round(averageRating) ? "filled" : ""}`}
                    />
                  ))}
                </div>
                <span className="total-count">Based on {totalReviews} reviews</span>
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
                    src={
                      review.author_avatar ||
                      `https://ui-avatars.com/api/?name=${review.author_name}&background=random`
                    }
                    alt={review.author_name}
                    className="review-avatar"
                  />
                  <div>
                    <div className="review-author-name">
                      {review.author_name}
                      {review.is_verified_purchase && (
                        <span className="verified-badge" title="Verified purchase">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="review-date">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(review.created_at))}
                    </div>
                  </div>
                </div>

                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-small ${i < review.rating ? "filled" : ""}`}
                    />
                  ))}
                </div>

                <p className="review-content">"{review.content}"</p>

                {review.product_id && (
                  <div className="review-product-link">
                    <Link href={`/producto/${review.product_id}`}>
                      View related product -&gt;
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
