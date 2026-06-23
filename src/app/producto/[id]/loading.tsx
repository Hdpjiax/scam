"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="pdp fade-in-load">
      <header className="pdp-top">
        <Link href="/">
          <ArrowLeft /> Volver
        </Link>
        <div className="brand">
          NŌMA<span>casa viva</span>
        </div>
        <button className="pdp-cart-link" disabled>
          Bolsa (0)
        </button>
      </header>
      <main>
        <div className="pdp-gallery">
          <div className="pdp-main-img skeleton" style={{ width: "100%", aspectRatio: 0.85 }} />
          <div className="pdp-secondary">
            <div className="skeleton" style={{ width: "100%", aspectRatio: 0.85 }} />
            <div className="material-shot skeleton" style={{ width: "100%", aspectRatio: 1 }} />
          </div>
        </div>
        <section className="pdp-info">
          <div className="skeleton" style={{ width: "150px", height: "12px", marginBottom: "16px", display: "block" }} />
          <div className="skeleton" style={{ width: "85%", height: "42px", marginBottom: "20px", display: "block" }} />
          <div className="skeleton" style={{ width: "200px", height: "16px", marginBottom: "24px", display: "block" }} />
          <div className="skeleton" style={{ width: "120px", height: "24px", marginBottom: "30px", display: "block" }} />
          <div className="skeleton" style={{ width: "100%", height: "60px", marginBottom: "24px", display: "block" }} />
          
          <div className="pdp-colors" style={{ marginBottom: "24px" }}>
            <div className="skeleton" style={{ width: "80px", height: "12px", marginBottom: "8px", display: "block" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <div className="skeleton" style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
              <div className="skeleton" style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
            </div>
          </div>

          <div className="skeleton" style={{ width: "200px", height: "24px", marginBottom: "32px", display: "block" }} />

          <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
            <div className="skeleton" style={{ width: "100px", height: "48px" }} />
            <div className="skeleton" style={{ width: "100%", height: "48px" }} />
            <div className="skeleton" style={{ width: "48px", height: "48px" }} />
          </div>
        </section>
      </main>
    </div>
  );
}
