"use client";

import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function Loading() {
  return (
    <div className="admin-shell fade-in-load">
      <aside className="admin-nav" aria-label="Administración">
        <div className="admin-logo">
          NŌMA <span>OPERATIONS</span>
        </div>
        {[
          ["dashboard", "Resumen", LayoutDashboard],
          ["products", "Productos", Package],
          ["orders", "Pedidos", ShoppingCart],
          ["users", "Clientes", Users],
        ].map(([id, label, Icon]: any, idx) => (
          <button className={idx === 0 ? "on" : ""} disabled key={id}>
            <Icon />
            <span>{label}</span>
          </button>
        ))}
        <Link className="back-shop" href="/">
          <ArrowLeft />
          Volver a tienda
        </Link>
      </aside>
      <main className="admin-main">
        <header className="admin-head">
          <div>
            <p>Centro de operaciones</p>
            <h1>Control de hoy</h1>
          </div>
          <div className="admin-avatar">AG</div>
        </header>

        <div className="metrics">
          {Array.from({ length: 4 }).map((_, idx) => (
            <article key={idx}>
              <div className="skeleton" style={{ width: "100px", height: "12px", marginBottom: "8px", display: "block" }} />
              <div className="skeleton" style={{ width: "130px", height: "28px", marginBottom: "8px", display: "block" }} />
              <div className="skeleton" style={{ width: "80px", height: "10px", display: "block" }} />
            </article>
          ))}
        </div>

        <div className="admin-panels">
          <section>
            <div className="panel-title">
              <h2>Pedidos recientes</h2>
            </div>
            <div className="orders-table">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1.5fr 1fr 100px 120px 140px",
                    alignItems: "center",
                    padding: "16px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="skeleton" style={{ width: "50px", height: "14px" }} />
                  <div>
                    <div className="skeleton" style={{ width: "120px", height: "14px", marginBottom: "4px", display: "block" }} />
                    <div className="skeleton" style={{ width: "140px", height: "10px", display: "block" }} />
                  </div>
                  <div className="skeleton" style={{ width: "80px", height: "14px" }} />
                  <div className="skeleton" style={{ width: "60px", height: "14px" }} />
                  <div className="skeleton" style={{ width: "90px", height: "14px" }} />
                  <div className="skeleton" style={{ width: "80px", height: "30px", borderRadius: "4px" }} />
                </div>
              ))}
            </div>
          </section>
          
          <section className="stock-list">
            <div className="panel-title">
              <h2>Stock crítico</h2>
            </div>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", paddingBlock: "8px" }}>
                <div className="skeleton" style={{ width: "40px", height: "40px", borderRadius: "4px" }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ width: "100px", height: "14px", marginBottom: "4px", display: "block" }} />
                  <div className="skeleton" style={{ width: "60px", height: "10px", display: "block" }} />
                </div>
                <div className="skeleton" style={{ width: "30px", height: "14px" }} />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
