"use client";

import { useState, ChangeEvent } from "react";
import AdminProductPreview from "../../components/AdminProductPreview";
import { useCountUp } from "../../hooks/useCountUp";
import { createClient } from "../../lib/supabase/client";
import { money } from "../../lib/utils";
import {
  ArrowLeft,
  Check,
  Edit3,
  Eye,
  ImagePlus,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Users,
  X,
  TrendingUp,
  AlertTriangle,
  Star,
} from "lucide-react";
import Link from "next/link";

type ProductType = {
  id: number;
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  image: string;
  images?: string[] | null;
  description: string;
  colors: string[];
  stock: number;
  sku: string;
  rating?: number;
  badge?: string | null;
  featured?: boolean;
};

type OrderType = {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  status: string;
  payment_method: string;
  shipping_rate: number;
  total: number;
  notes?: string;
  created_at: string;
  order_items?: any[];
  shipping_addresses?: any;
};

const blank: ProductType = {
  id: 0,
  name: "",
  category: "Decoración",
  price: 1200,
  image: "",
  description: "",
  colors: ["#ded8cb"],
  stock: 12,
  sku: "NOM-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
  rating: 5,
};

const blankReview = {
  id: "",
  product_id: "" as any,
  author_name: "",
  author_avatar: "",
  rating: 5,
  content: "",
  is_verified_purchase: false,
};

export default function AdminClient({
  initialProducts,
  initialOrders,
  initialProfiles,
  initialReviews,
}: {
  initialProducts: any[];
  initialOrders: any[];
  initialProfiles: any[];
  initialReviews: any[];
}) {
  const supabase = createClient();
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [profiles] = useState<any[]>(initialProfiles);
  const [reviews, setReviews] = useState<any[]>(initialReviews);

  const [tab, setTab] = useState<"dashboard" | "products" | "orders" | "users" | "reviews">("dashboard");
  const [edit, setEdit] = useState<ProductType | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [editReview, setEditReview] = useState<any | null>(null);
  const [preview, setPreview] = useState<ProductType | null>(null);
  const [q, setQ] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [orderQuery, setOrderQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [remove, setRemove] = useState<ProductType | null>(null);
  const [removeReview, setRemoveReview] = useState<any | null>(null);
  const [toast, setToast] = useState<{ text: string; undo?: () => void } | null>(null);
  const [loading, setLoading] = useState(false);

  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "processing" || o.status === "shipped" || o.status === "delivered")
    .reduce((a, o) => a + o.total, 0);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.name + p.sku).toLowerCase().includes(q.toLowerCase());
    const matchesCategory = catFilter === "All" || p.category === catFilter;
    const matchesStock = stockFilter === "All" || 
      (stockFilter === "In Stock" && (p.stock ?? 0) > 0) ||
      (stockFilter === "Out of Stock" && (p.stock ?? 0) <= 0);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = ((o.customer_name || "") + (o.email || "") + o.id).toLowerCase().includes(orderQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const notify = (text: string, undo?: () => void) => {
    setToast({ text, undo });
    setTimeout(() => setToast(null), 5000);
  };

  const save = async (p: ProductType) => {
    setLoading(true);
    if (products.some((x) => x.sku === p.sku && x.id !== p.id)) {
      notify("That SKU already belongs to another product.");
      setLoading(false);
      return;
    }

    const imageUrl = p.image || "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85";
    const generatedSlug = p.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + (p.sku ? p.sku.toLowerCase() : Math.random().toString(36).substring(2, 6));

    const next = {
      name: p.name,
      slug: generatedSlug,
      category: p.category,
      price: Math.max(p.price),
      old_price: p.old_price ? Math.max(0, p.old_price) : null,
      images: p.images && p.images.length > 0 ? p.images : [imageUrl],
      description: p.description,
      colors: p.colors,
      stock: Math.max(0, p.stock || 0),
      sku: p.sku || `NOM-${Date.now().toString().slice(-4)}`,
      badge: p.badge || null,
      featured: p.featured || false,
    };

    if (p.id) {
      // Edit
      const { error } = await supabase.from("products").update(next).eq("id", p.id);
      if (!error) {
        setProducts(
          products.map((x) =>
            x.id === p.id ? { ...x, ...next, image: next.images[0] || imageUrl, images: next.images } : x
          )
        );
        notify("Product updated.");
      } else {
        console.error("Error updating product:", error);
        notify(`Error updating product: ${error ? error.message : "Unknown error"}`);
      }
    } else {
      // Create
      const maxId = products.reduce((max, x) => Math.max(max, x.id), 0);
      const nextId = maxId + 1;
      const newProduct = { ...next, id: nextId };

      const { data, error } = await supabase.from("products").insert(newProduct).select().single();
      if (!error && data) {
        setProducts([...products, { ...data, image: data.images?.[0] || "", images: data.images }]);
        notify("Product published.");
      } else {
        console.error("Error publishing product:", error);
        notify(`Error publishing product: ${error ? error.message : "Unknown error"}`);
      }
    }

    setEdit(null);
    setLoading(false);
  };

  const deleteProduct = async () => {
    if (!remove) return;
    setLoading(true);
    try {
      const old = [...products];
      const { error } = await supabase.from("products").delete().eq("id", remove.id);
      if (!error) {
        setProducts(products.filter((x) => x.id !== remove.id));
        notify("Product deleted.", async () => {
          // Undo delete
          const next = {
            name: remove.name,
            category: remove.category,
            price: remove.price,
            old_price: remove.old_price || null,
            images: remove.images && remove.images.length > 0 ? remove.images : [remove.image || ""],
            description: remove.description,
            colors: remove.colors,
            stock: remove.stock,
            sku: remove.sku,
            badge: remove.badge || null,
            featured: remove.featured || false,
          };
          try {
            const { data } = await supabase.from("products").insert(next).select().single();
            if (data) setProducts([...old]);
          } catch (undoErr) {
            console.error("Error undoing deletion:", undoErr);
          }
        });
      } else {
        console.error("Error deleting product:", error);
        notify(`Could not delete: ${error.message || "Database constraint error"}`);
      }
    } catch (err: any) {
      console.error("Exception in deleteProduct:", err);
      notify(`Could not delete: ${err.message || "Unknown client error"}`);
    } finally {
      setRemove(null);
      setLoading(false);
    }
  };

  const saveReview = async (r: any) => {
    setLoading(true);
    const next = {
      product_id: r.product_id ? parseInt(r.product_id) : null,
      author_name: r.author_name,
      author_avatar: r.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=random`,
      rating: r.rating,
      content: r.content,
      is_verified_purchase: r.is_verified_purchase,
    };

    if (r.id) {
      // Edit
      const { error } = await supabase.from("reviews").update(next).eq("id", r.id);
      if (!error) {
        const productName = r.product_id ? products.find(p => p.id === parseInt(r.product_id))?.name : null;
        setReviews(
          reviews.map((x) =>
            x.id === r.id ? { ...x, ...next, products: productName ? { name: productName } : null } : x
          )
        );
        notify("Review updated.");
      } else {
        notify("Error updating review.");
      }
    } else {
      // Create
      const { data, error } = await supabase.from("reviews").insert(next).select().single();
      if (!error && data) {
        const productName = data.product_id ? products.find(p => p.id === data.product_id)?.name : null;
        setReviews([...reviews, { ...data, products: productName ? { name: productName } : null }]);
        notify("Review created.");
      } else {
        notify("Error creating review.");
      }
    }

    setEditReview(null);
    setLoading(false);
  };

  const deleteReviewFunc = async () => {
    if (!removeReview) return;
    setLoading(true);
    const { error } = await supabase.from("reviews").delete().eq("id", removeReview.id);
    if (!error) {
      setReviews(reviews.filter((x) => x.id !== removeReview.id));
      notify("Review deleted.");
    } else {
      notify("Error deleting review.");
    }
    setRemoveReview(null);
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, s: string) => {
    const old = [...orders];
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: s } : o)));

    const { error } = await supabase.from("orders").update({ status: s }).eq("id", orderId);
    if (error) {
      setOrders(old);
      notify("Error updating order.");
    } else {
      notify(`Order #${orderId}: ${s}.`, async () => {
        // Undo status change
        const oldOrder = old.find((o) => o.id === orderId);
        if (oldOrder) {
          await supabase.from("orders").update({ status: oldOrder.status }).eq("id", orderId);
          setOrders(old);
        }
      });
    }
  };

  return (
    <div className="admin-shell">
      <aside className="admin-nav" aria-label="Administration">
        <Link href="/" className="admin-logo">
          NŌMA <span>OPERATIONS</span>
        </Link>
        {[
          ["dashboard", "Overview", LayoutDashboard],
          ["products", "Products", Package],
          ["orders", "Orders", ShoppingCart],
          ["users", "Customers", Users],
          ["reviews", "Reviews", Star],
        ].map(([id, label, Icon]: any) => (
          <button
            aria-current={tab === id ? "page" : undefined}
            className={tab === id ? "on" : ""}
            onClick={() => setTab(id)}
            key={id}
          >
            <Icon />
            <span>{label}</span>
            {id === "products" && <b>{products.length}</b>}
            {id === "orders" && <b>{orders.length}</b>}
          </button>
        ))}
        <Link className="back-shop" href="/">
          <ArrowLeft />
          Back to store
        </Link>
      </aside>
      <main className="admin-main">
        <header className="admin-head">
          <div>
            <p>Operations Center</p>
            <h1>
              {tab === "dashboard"
                ? "Today's Overview"
                : tab === "products"
                  ? "Catalog"
                  : tab === "orders"
                    ? "Orders & Payments"
                    : tab === "reviews"
                      ? "Reviews"
                      : "Customers"}
            </h1>
          </div>
          <div
            className="admin-avatar"
            aria-label="Administrator Antonio García"
          >
            AG
          </div>
        </header>

        <div key={tab} className="admin-tab-panel">
          {tab === "dashboard" && (
            <>
              <div className="metrics">
                <Metric
                  label="Verified Sales"
                  count={revenue}
                  format={money}
                  note="Lifetime Total"
                  icon={<TrendingUp />}
                />
                <Metric
                  label="Orders"
                  count={orders.length}
                  note={`${orders.filter((o) => o.status === "pending_payment").length} to verify`}
                  icon={<ShoppingCart />}
                />
                <Metric
                  label="Products"
                  count={products.length}
                  note={`${products.filter((p) => (p.stock || 0) < 10).length} low stock`}
                  icon={<Package />}
                />
                <Metric
                  label="Customers"
                  count={profiles.filter((u) => u.role === "customer").length}
                  note="Registered Accounts"
                  icon={<Users />}
                />
              </div>
              <div className="admin-panels">
                <section>
                  <div className="panel-title">
                    <h2>Recent Orders</h2>
                    <button onClick={() => setTab("orders")}>View all</button>
                  </div>
                  <OrderTable
                    orders={orders.slice(0, 5)}
                    onStatusChange={handleStatusChange}
                  />
                </section>
                <section className="stock-list">
                  <div className="panel-title">
                    <h2>Critical Stock</h2>
                    <AlertTriangle />
                  </div>
                  {[...products]
                    .sort((a, b) => (a.stock || 0) - (b.stock || 0))
                    .slice(0, 5)
                    .map((p) => (
                      <div key={p.id}>
                        <img src={p.image} alt="" />
                        <span>
                          <b>{p.name}</b>
                          <small>{p.sku}</small>
                        </span>
                        <em>{p.stock} units</em>
                      </div>
                    ))}
                </section>
              </div>
            </>
          )}

          {tab === "products" && (
            <>
              <div className="admin-toolbar" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                <label htmlFor="admin-search" style={{ margin: 0, width: "auto", flex: "1 1 200px" }}>
                  <Search />
                  <span className="sr-only">Search products</span>
                  <input
                    id="admin-search"
                    placeholder="Name or SKU"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </label>

                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                  style={{
                    background: "var(--mineral)",
                    color: "var(--paper)",
                    border: "1px solid var(--copy)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Categories</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Smart Home">Smart Home</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Decor">Decor</option>
                  <option value="Furniture">Furniture</option>
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  style={{
                    background: "var(--mineral)",
                    color: "var(--paper)",
                    border: "1px solid var(--copy)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Stock</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <button
                  className="admin-primary"
                  onClick={() => setEdit({ ...blank, sku: "NOM-" + Math.random().toString(36).substring(2, 9).toUpperCase() })}
                  style={{ marginLeft: "auto" }}
                >
                  <Plus />
                  New product
                </button>
              </div>
              <div className="product-table" role="table" aria-label="Catalog">
                <div className="table-row table-labels" role="row">
                  <span>Product</span>
                  <span>Category</span>
                  <span>Price</span>
                  <span>Inventory</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {filteredProducts.map((p) => {
                  const productReviews = reviews.filter((r) => Number(r.product_id) === p.id);
                  const avgRating = productReviews.length
                    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                    : null;
                  const isExpanded = expandedProductId === p.id;

                  return (
                    <div
                      key={p.id}
                      className="product-item-wrapper"
                      style={{
                        background: isExpanded ? "rgba(255, 255, 255, 0.02)" : "transparent",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="table-row" role="row" style={{ borderBottom: "none" }}>
                        <span className="product-cell">
                          <img src={p.image} alt="" />
                          <i>
                            <b>{p.name}</b>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                              <small>{p.sku}</small>
                              {avgRating && (
                                <button 
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    padding: 0,
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '2px', 
                                    fontSize: '11px', 
                                    color: 'var(--clay)', 
                                    cursor: 'pointer' 
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedProductId(isExpanded ? null : p.id);
                                  }}
                                  title="View reviews"
                                >
                                  • <Star size={10} fill="var(--clay)" stroke="none" /> {avgRating} ({productReviews.length})
                                </button>
                              )}
                            </div>
                          </i>
                        </span>
                        <span>{p.category}</span>
                        <span>{money(p.price)}</span>
                        <span>{p.stock} units</span>
                        <span>
                          <em
                            className={
                              (p.stock || 0) > 0 ? "status paid" : "status cancelled"
                            }
                          >
                            {(p.stock || 0) > 0 ? "Active" : "Out of stock"}
                          </em>
                        </span>
                        <span className="row-actions">
                          {productReviews.length > 0 && (
                            <button
                              aria-label={`View reviews for ${p.name}`}
                              onClick={() => setExpandedProductId(isExpanded ? null : p.id)}
                            >
                              <Star size={18} fill={isExpanded ? "var(--clay)" : "none"} stroke={isExpanded ? "var(--clay)" : "currentColor"} />
                            </button>
                          )}
                          <button
                            aria-label={`Edit ${p.name}`}
                            onClick={() => setEdit({ ...p })}
                          >
                            <Edit3 />
                          </button>
                          <button
                            aria-label={`Preview ${p.name}`}
                            onClick={() => setPreview(p)}
                          >
                            <Eye />
                          </button>
                          <button
                            aria-label={`Delete ${p.name}`}
                            onClick={() => setRemove(p)}
                          >
                            <Trash2 />
                          </button>
                        </span>
                      </div>

                      {isExpanded && productReviews.length > 0 && (
                        <div 
                          className="product-reviews-expanded"
                          style={{
                            padding: "16px 24px 24px 80px",
                            background: "rgba(0, 0, 0, 0.15)",
                            borderTop: "1px dashed rgba(255, 255, 255, 0.05)",
                            animation: "orderExpand 300ms var(--ease) both",
                          }}
                        >
                          <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", textTransform: "uppercase", color: "var(--clay)", letterSpacing: "0.05em" }}>
                            Product Reviews ({productReviews.length})
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {productReviews.map((r) => (
                              <div key={r.id} style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "10px" }}>
                                <img 
                                  src={r.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=random`} 
                                  alt={r.author_name} 
                                  style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                                />
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <strong style={{ fontSize: "13px" }}>{r.author_name}</strong>
                                    <div style={{ display: "flex", gap: "2px" }}>
                                      {[...Array(5)].map((_, idx) => (
                                        <Star
                                          key={idx}
                                          size={12}
                                          fill={idx < r.rating ? "var(--clay)" : "none"}
                                          stroke={idx < r.rating ? "var(--clay)" : "var(--copy)"}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.85, lineHeight: "1.5" }}>{r.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {tab === "orders" && (
            <section className="order-section">
              <div className="panel-title" style={{ marginBottom: "20px" }}>
                <h2>All Orders</h2>
                <span>{filteredOrders.length} of {orders.length} records</span>
              </div>
              
              {/* Orders Toolbar */}
              <div className="admin-toolbar" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px", background: "none", padding: 0 }}>
                <label htmlFor="order-search" style={{ margin: 0, width: "auto", flex: "1 1 200px", background: "var(--mineral)", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px" }}>
                  <Search size={16} />
                  <span className="sr-only">Search orders</span>
                  <input
                    id="order-search"
                    placeholder="Customer name, email or Order ID"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    style={{ background: "none", border: "none", outline: "none", color: "inherit", width: "100%" }}
                  />
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    background: "var(--mineral)",
                    color: "var(--paper)",
                    border: "1px solid var(--copy)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="pending_payment">Pending Payment</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <OrderTable
                orders={filteredOrders}
                onStatusChange={handleStatusChange}
              />
            </section>
          )}

          {tab === "users" && (
            <div className="user-grid">
              {profiles
                .filter((u) => u.role === "customer")
                .map((u) => (
                  <article key={u.id}>
                    <div>
                      {u.name
                        ? u.name.split(" ").map((x: string) => x[0]).join("").slice(0, 2)
                        : "CU"}
                    </div>
                    <h3>{u.name || "Nōma Customer"}</h3>
                    <p>{u.email}</p>
                    <small>Registered Customer</small>
                  </article>
                ))}
              {profiles.filter((u) => u.role === "customer").length === 0 && (
                <div className="no-data">
                  <Users />
                  <h2>No customers yet</h2>
                  <p>New accounts will appear here.</p>
                </div>
              )}
            </div>
          )}

          {tab === "reviews" && (
            <div className="admin-reviews">
              <div className="admin-toolbar">
                <button
                  className="admin-primary"
                  onClick={() => setEditReview(blankReview)}
                >
                  <Plus />
                  New review
                </button>
              </div>

              {reviews.length > 0 ? (
                <div className="product-table">
                  <div className="table-row table-labels" style={{ gridTemplateColumns: "1.5fr 1fr 0.8fr 2fr 0.8fr" }}>
                    <span>Author</span>
                    <span>Product</span>
                    <span>Rating</span>
                    <span>Comment</span>
                    <span style={{ textAlign: "right" }}>Actions</span>
                  </div>
                  {reviews.map((r) => (
                    <div key={r.id} className="table-row" style={{ gridTemplateColumns: "1.5fr 1fr 0.8fr 2fr 0.8fr" }}>
                      <div className="product-cell">
                        <img
                          src={r.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=random`}
                          alt={r.author_name}
                          style={{ width: "36px", height: "36px", borderRadius: "50%" }}
                        />
                        <i>
                          <b>{r.author_name}</b>
                          {r.is_verified_purchase && <small style={{ color: "var(--clay)" }}>Verified purchase</small>}
                        </i>
                      </div>
                      <div>
                        {r.products?.name || <span style={{ opacity: 0.5 }}>Store General</span>}
                      </div>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(5)].map((_, idx) => (
                           <Star
                             key={idx}
                             size={14}
                             fill={idx < r.rating ? "var(--clay)" : "none"}
                             stroke={idx < r.rating ? "var(--clay)" : "var(--copy)"}
                           />
                        ))}
                      </div>
                      <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={r.content}>
                        {r.content}
                      </div>
                      <div className="row-actions" style={{ justifyContent: "flex-end" }}>
                        <button onClick={() => setEditReview(r)}>
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => setRemoveReview(r)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <Star />
                  <h2>No reviews yet</h2>
                  <p>Create your first review using the button above.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {edit && (
        <ProductEditor
          product={edit}
          onClose={() => setEdit(null)}
          onSave={save}
          loading={loading}
        />
      )}

      {remove && (
        <div
          className="confirm-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="confirm-modal">
            <AlertTriangle />
            <h2 id="delete-title">Delete {remove.name}?</h2>
            <p>
              It will be removed from the catalog. You can undo this action within five
              seconds.
            </p>
            <div className="confirm-actions">
              <button onClick={() => setRemove(null)} disabled={loading}>Cancel</button>
              <button className="danger" onClick={deleteProduct} disabled={loading}>
                {loading ? "Deleting..." : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <Check />
          {toast.text}
          {toast.undo && (
            <button
              onClick={() => {
                toast.undo?.();
                setToast(null);
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}
      {preview && <ProductPreviewModal product={preview} onClose={() => setPreview(null)} />}

      {editReview && (
        <ReviewEditor
          review={editReview}
          products={products}
          onClose={() => setEditReview(null)}
          onSave={saveReview}
          loading={loading}
        />
      )}

      {removeReview && (
        <div
          className="confirm-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-review-title"
        >
          <div className="confirm-modal">
            <AlertTriangle />
            <h2 id="delete-review-title">Delete review?</h2>
            <p>
              This action cannot be undone. The review by {removeReview.author_name} will be deleted.
            </p>
            <div className="confirm-actions">
              <button onClick={() => setRemoveReview(null)} disabled={loading}>Cancel</button>
              <button className="danger" onClick={deleteReviewFunc} disabled={loading}>
                {loading ? "Deleting..." : "Delete review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  count,
  format,
  note,
  icon,
}: {
  label: string;
  count: number;
  format?: (value: number) => string;
  note: string;
  icon: React.ReactNode;
}) {
  const animated = useCountUp(count, true, 900);
  const display = format ? format(animated) : String(animated);

  return (
    <article>
      <span>{label}</span>
      <strong>{display}</strong>
      <small>{note}</small>
      {icon}
    </article>
  );
}

function OrderTable({
  orders,
  onStatusChange,
}: {
  orders: OrderType[];
  onStatusChange: (orderId: string, s: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="orders-table" role="table" aria-label="Orders">
      {orders.length === 0 ? (
        <div className="no-data">
          <ShoppingCart />
          <h2>No orders yet</h2>
          <p>New orders will appear here.</p>
        </div>
      ) : (
        orders.map((o) => {
          const isExpanded = expandedId === o.id;

          // Parse card details from notes if present
          let cardDetails: any = null;
          if (o.notes) {
            try {
              const parsed = JSON.parse(o.notes);
              cardDetails = parsed.card_details || null;
            } catch (e) {
              // Not JSON or doesn't contain card details
            }
          }

          const addr = o.shipping_addresses;
          const items = o.order_items || [];

          return (
            <div
              key={o.id}
              className="order-item-wrapper"
              style={{
                background: isExpanded ? "rgba(255, 255, 255, 0.02)" : "transparent",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                className="order-row"
                role="row"
                onClick={() => setExpandedId(isExpanded ? null : o.id)}
              >
                <b>#{o.id}</b>
                <span>
                  <strong>{o.customer_name}</strong>
                  <small>{o.email}</small>
                </span>
                <span>
                  {new Intl.DateTimeFormat("en-US").format(new Date(o.created_at))}
                </span>
                <span>{money(o.total)}</span>
                <span>
                   {cardDetails && cardDetails.number ? (
                     <>
                       Card •••• {cardDetails.number.toString().slice(-4)}
                     </>
                   ) : o.payment_method}
                 </span>
                <label onClick={(e) => e.stopPropagation()}>
                  <span className="sr-only">Order status {o.id}</span>
                  <select
                    value={o.status}
                    onChange={(e) => onStatusChange(o.id, e.target.value)}
                  >
                    <option value="pending_payment">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </label>
              </div>

              {isExpanded && (
                <div className="order-detail-expanded">
                  {/* Address Section */}
                  <div>
                    <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                      Shipping Address
                    </h3>
                    {addr ? (
                      <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
                        <strong>Street:</strong> {addr.street}
                        <br />
                        <strong>City:</strong> {addr.city}
                        <br />
                        <strong>State:</strong> {addr.state}
                        <br />
                        <strong>Zip Code:</strong> {addr.postal_code}
                        <br />
                        <strong>Phone:</strong> {o.phone}
                      </p>
                    ) : (
                      <p style={{ margin: 0, opacity: 0.5 }}>Address not specified</p>
                    )}
                  </div>

                  {/* Items list */}
                  <div>
                    <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                      Products ({items.length})
                    </h3>
                    <div className="admin-order-items-list">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="admin-order-item-row">
                          <span>
                            {item.product_name} <b>x{item.quantity}</b>
                          </span>
                          <strong>{money(item.price * item.quantity)}</strong>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <p style={{ margin: 0, opacity: 0.5 }}>No items registered</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    {cardDetails ? (
                      <div className="admin-card-review-box">
                        <h4>Manual Card Verification</h4>
                        <div className="admin-card-detail-line">
                          <span>Cardholder:</span>
                          <strong>{cardDetails.holder}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Number:</span>
                          <strong>{cardDetails.number}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Expiry:</span>
                          <strong>{cardDetails.expiry}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>CVV:</span>
                          <strong>{cardDetails.cvv}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Brand:</span>
                          <strong>{cardDetails.brand}</strong>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                          Payment Method
                        </h3>
                        <p style={{ margin: 0, opacity: 0.85 }}>
                          {o.payment_method}
                        </p>
                        {o.notes && (
                          <div style={{ marginTop: "12px", padding: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }}>
                            <strong>Notes:</strong> {o.notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

function ProductEditor({
  product,
  onClose,
  onSave,
  loading,
}: {
  product: ProductType;
  onClose: () => void;
  onSave: (p: ProductType) => void;
  loading: boolean;
}) {
  const [p, setP] = useState(product);
  const [error, setError] = useState("");
  const [colors, setColors] = useState<string[]>(p.colors || ["#ded8cb"]);
  const [imagesList, setImagesList] = useState<string[]>(() => {
    return p.images || (p.image ? [p.image] : []);
  });
  const [loadingLocal, setLoadingLocal] = useState(false);

  // HTML5 Canvas compression helper
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve("");
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    });
  };

  // Chic pre-defined interior colors palette
  const PRESET_COLORS = [
    { hex: "#EAE6DF", name: "Off-White" },
    { hex: "#C2B8A3", name: "Warm Sand" },
    { hex: "#8C8275", name: "Earth Gray" },
    { hex: "#6E706E", name: "Sage Gray" },
    { hex: "#505A54", name: "Forest Green" },
    { hex: "#B29B82", name: "Clay Brown" },
    { hex: "#DCAE96", name: "Terracotta Blush" },
    { hex: "#9B7062", name: "Warm Terracotta" },
    { hex: "#4A3C31", name: "Espresso" },
    { hex: "#1E1F1D", name: "Charcoal" },
  ];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setLoadingLocal(true);
    setError("");

    try {
      const compressedUrls: string[] = [];
      for (const file of files) {
        if (file.size > 10_000_000) {
          setError("One of the images exceeds 10 MB limit.");
          continue;
        }
        const url = await compressImage(file);
        compressedUrls.push(url);
      }
      const updated = [...imagesList, ...compressedUrls];
      setImagesList(updated);
      setP({ ...p, images: updated, image: updated[0] || "" });
    } catch (err) {
      setError("Error compressing or loading file.");
    } finally {
      setLoadingLocal(false);
    }
  };

  const toggleColor = (hex: string) => {
    let nextColors;
    if (colors.includes(hex)) {
      // Don't allow empty colors list
      if (colors.length === 1) return;
      nextColors = colors.filter(c => c !== hex);
    } else {
      nextColors = [...colors, hex];
    }
    setColors(nextColors);
    setP({ ...p, colors: nextColors });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-editor-modal" style={{ width: "min(680px, 96vw)" }} onClick={e => e.stopPropagation()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (imagesList.length === 0) return setError("Add at least one image before publishing.");
            onSave({ ...p, colors, images: imagesList, image: imagesList[0] });
          }}
        >
          <div className="editor-head">
            <div>
              <small>{p.id ? "Edit product" : "New product"}</small>
              <h2>{p.name || "Unnamed Product"}</h2>
            </div>
            <button type="button" aria-label="Close editor" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="editor-layout" style={{ display: "block" }}>
            <div className="editor-fields" style={{ width: "100%", padding: 0 }}>
              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.03em" }}>Product Images</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
                  {imagesList.map((imgUrl, idx) => (
                    <div key={idx} style={{ position: "relative", width: "100px", height: "100px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <img src={imgUrl} alt={`Product ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button 
                        type="button" 
                        onClick={() => {
                          const updated = imagesList.filter((_, i) => i !== idx);
                          setImagesList(updated);
                          setP({ ...p, images: updated, image: updated[0] || "" });
                        }}
                        style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "10px", padding: 0 }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label style={{ width: "100px", height: "100px", borderRadius: "6px", border: "2px dashed rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "4px" }}>
                    <input
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      disabled={loading || loadingLocal}
                    />
                    <ImagePlus size={20} style={{ opacity: 0.6 }} />
                    <span style={{ fontSize: "10px", opacity: 0.6 }}>{loadingLocal ? "Loading..." : "Add Photos"}</span>
                  </label>
                </div>
              </div>
              {error && (
                <p className="form-error" role="alert" style={{ marginBottom: "20px" }}>
                  {error}
                </p>
              )}
              <div className="editor-form-grid" style={{ gap: "20px" }}>
                <label>
                  Name
                  <input
                    required
                    maxLength={100}
                    value={p.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      let randomPart = p.sku.split("-").pop();
                      if (!randomPart || p.sku.indexOf("-") === -1) {
                        randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
                      }
                      const sanitizedName = newName.toUpperCase().replace(/\s+/g, "");
                      setP({ ...p, name: newName, sku: `NOM-${sanitizedName}-${randomPart}` });
                    }}
                    disabled={loading}
                  />
                </label>
                <label>
                  SKU
                  <input
                    required
                    maxLength={32}
                    value={p.sku}
                    onChange={(e) => setP({ ...p, sku: e.target.value.toUpperCase() })}
                    disabled={loading}
                  />
                </label>
                <label>
                  Category
                  <select
                    value={p.category}
                    onChange={(e) => setP({ ...p, category: e.target.value })}
                    disabled={loading}
                  >
                    {[
                      "Smart Home",
                      "Lighting",
                      "Decor",
                      "Wellness",
                      "Textiles",
                      "Furniture",
                      "Kitchen",
                      "Outdoor",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Price USD
                  <input
                    required
                    type="number"
                    value={p.price || ""}
                    onChange={(e) => setP({ ...p, price: +e.target.value })}
                    disabled={loading}
                  />
                </label>
                <label>
                  Compare-at Price USD (optional)
                  <input
                    type="number"
                    value={p.old_price || ""}
                    onChange={(e) => setP({ ...p, old_price: e.target.value ? +e.target.value : null })}
                    disabled={loading}
                  />
                </label>
                <label>
                  Inventory
                  <input
                    min="0"
                    type="number"
                    value={p.stock}
                    onChange={(e) => setP({ ...p, stock: +e.target.value })}
                    disabled={loading}
                  />
                </label>
                <label className="wide">
                  Description
                  <textarea
                    required
                    maxLength={600}
                    rows={4}
                    value={p.description}
                    onChange={(e) => setP({ ...p, description: e.target.value })}
                    disabled={loading}
                  />
                </label>
                <label className="wide">
                  Badge selection
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px", marginBottom: "12px" }}>
                    {["None", "New", "Best Seller", "Limited Edition", "Nōma Icon", "Favorite"].map((badgeOption) => {
                      const valueToCompare = badgeOption === "None" ? "" : badgeOption;
                      const isSelected = (p.badge || "") === valueToCompare;
                      return (
                        <button
                          key={badgeOption}
                          type="button"
                          onClick={() => setP({ ...p, badge: valueToCompare })}
                          style={{
                            padding: "6px 12px",
                            background: isSelected ? "var(--clay)" : "transparent",
                            border: isSelected ? "1px solid var(--clay)" : "1px solid rgba(28, 29, 25, 0.2)",
                            borderRadius: "4px",
                            fontSize: "11px",
                            color: isSelected ? "#ffffff" : "#1c1d19",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                          }}
                        >
                          {badgeOption}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    maxLength={32}
                    placeholder="Or type custom badge..."
                    value={p.badge || ""}
                    onChange={(e) => setP({ ...p, badge: e.target.value })}
                    disabled={loading}
                  />
                </label>
                <label>
                  Featured
                  <select
                    value={p.featured ? "Yes" : "No"}
                    onChange={(e) => setP({ ...p, featured: e.target.value === "Yes" })}
                    disabled={loading}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>
                <label className="wide">
                  Color Palette (Toggle active colors)
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
                    {PRESET_COLORS.map((item) => {
                      const isActive = colors.includes(item.hex);
                      return (
                        <button
                          key={item.hex}
                          type="button"
                          onClick={() => toggleColor(item.hex)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 12px",
                            background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                            border: isActive ? "1px solid var(--clay)" : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            color: "var(--fg)",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              backgroundColor: item.hex,
                              border: "1px solid rgba(255,255,255,0.2)"
                            }}
                          />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </label>
              </div>
              <div className="editor-foot" style={{ marginTop: "30px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px" }}>
                <button type="button" onClick={onClose} disabled={loading}>
                  Cancel
                </button>
                <button className="admin-primary" type="submit" disabled={loading}>
                  <Check />
                  {loading ? "Saving..." : "Save product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Preview modal for viewing product as customer sees it
function ProductPreviewModal({
  product,
  onClose,
}: {
  product: ProductType | null;
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={e => e.stopPropagation()}>
        <div className="preview-modal-head">
          <div>
            <small>Product Preview</small>
          </div>
          <button type="button" aria-label="Close preview" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="preview-modal-body">
          <div className="preview-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="preview-details">
            <small>{product.category}</small>
            <h2>{product.name}</h2>
            {product.badge && (
              <span className="badge">
                {product.badge}
              </span>
            )}
            <div className="preview-price">
              <span>${product.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              {product.old_price && (
                <span>${product.old_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              )}
            </div>
            <p>{product.description}</p>
            <div className="preview-colors">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: color, width: '24px', height: '24px', display: 'inline-block', borderRadius: '50%', marginRight: '6px', border: '1px solid #333' }}
                />
              ))}
            </div>
            <div className="preview-stock">
              <i /> Stock: <b>{product.stock ?? 0} units</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewEditor({
  review,
  products,
  onClose,
  onSave,
  loading,
}: {
  review: any;
  products: ProductType[];
  onClose: () => void;
  onSave: (r: any) => void;
  loading: boolean;
}) {
  const [r, setR] = useState(review);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-editor-modal" style={{ width: "min(500px, 94vw)" }} onClick={e => e.stopPropagation()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(r);
          }}
        >
          <div className="editor-head">
            <div>
              <small>{r.id ? "Edit review" : "New review"}</small>
              <h2>{r.id ? "Edit review" : "Write review"}</h2>
            </div>
            <button type="button" aria-label="Close editor" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="editor-form-grid" style={{ gridTemplateColumns: "1fr" }}>
            <label>
              Author Name
              <input
                type="text"
                required
                value={r.author_name}
                onChange={(e) => setR({ ...r, author_name: e.target.value })}
                disabled={loading}
              />
            </label>

            <label>
              Author Avatar (optional, URL)
              <input
                type="url"
                value={r.author_avatar}
                onChange={(e) => setR({ ...r, author_avatar: e.target.value })}
                disabled={loading}
                placeholder="https://i.pravatar.cc/150..."
              />
            </label>

            <label>
              Rating (1 to 5 stars)
              <select
                value={r.rating}
                onChange={(e) => setR({ ...r, rating: parseInt(e.target.value) })}
                disabled={loading}
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n}>{n} stars</option>
                ))}
              </select>
            </label>

            <label>
              Related Product
              <select
                value={r.product_id || ""}
                onChange={(e) => setR({ ...r, product_id: e.target.value || null })}
                disabled={loading}
              >
                <option value="">None (General Store Review)</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Verified Purchase
              <select
                value={r.is_verified_purchase ? "Yes" : "No"}
                onChange={(e) => setR({ ...r, is_verified_purchase: e.target.value === "Yes" })}
                disabled={loading}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </label>

            <label>
              Comment
              <textarea
                required
                value={r.content}
                onChange={(e) => setR({ ...r, content: e.target.value })}
                disabled={loading}
                rows={4}
              />
            </label>
          </div>

          <div className="editor-foot">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="admin-primary" type="submit" disabled={loading}>
              <Check />
              {loading ? "Saving..." : "Save review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
