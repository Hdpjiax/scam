"use client";

import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";

export default function Loading() {
  return (
    <>
      <Header onCart={() => {}} />
      <main className="fade-in-load">
        <section className="category-hero" style={{ background: "#282b25" }}>
          <div>
            <div className="skeleton" style={{ width: "120px", height: "14px", marginBottom: "16px", display: "block" }} />
            <div className="skeleton" style={{ width: "320px", height: "42px", marginBottom: "24px", display: "block" }} />
            <div className="skeleton" style={{ width: "240px", height: "18px", display: "block" }} />
          </div>
        </section>

        <section className="category-catalog">
          <div className="section-top" style={{ marginBottom: "40px" }}>
            <div>
              <div className="skeleton" style={{ width: "100px", height: "12px", marginBottom: "12px", display: "block" }} />
              <div className="skeleton" style={{ width: "200px", height: "28px", display: "block" }} />
            </div>
          </div>
          <div className="grid editorial-grid category-grid">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProductCard key={idx} loading={true} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
