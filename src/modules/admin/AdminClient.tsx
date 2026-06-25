"use client";

import { useState, ChangeEvent, useEffect } from "react";
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
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Metric, OrderTable, ProductEditor, ProductPreviewModal, ReviewEditor } from "./AdminClient.parts";

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
  created_at?: string;
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
  category: "Decor",
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

  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
  });
  const [userFormError, setUserFormError] = useState("");

  const fetchAdminUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users", {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to load users:", data.error || res.statusText);
      }

      if (data.users) {
        setAdminUsers(data.users);
      } else {
        setAdminUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setAdminUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (tab === "users") {
      fetchAdminUsers();
    }
  }, [tab]);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    setUserFormError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingUser.id,
          name: userForm.name,
          email: userForm.email,
          phone: userForm.phone,
          role: userForm.role,
          password: userForm.password || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        notify("User updated successfully.");
        setEditingUser(null);
        fetchAdminUsers();
      } else {
        setUserFormError(data.error || "Failed to update user.");
      }
    } catch (err: any) {
      setUserFormError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const [isOrganizing, setIsOrganizing] = useState(false);
  const [organizeList, setOrganizeList] = useState<ProductType[]>([]);
  const [organizeSection, setOrganizeSection] = useState<string>("homepage");
  const [localRankInputs, setLocalRankInputs] = useState<Record<number, string>>({});
  const [organizeSearchQuery, setOrganizeSearchQuery] = useState("");
  const [layoutConfig, setLayoutConfig] = useState<{ homepage: number[]; category_orders: Record<string, number[]> }>(() => {
    const found = initialProducts.find(p => p.sku === 'NOM-LAYOUT');
    if (found && found.description) {
      try {
        return JSON.parse(found.description);
      } catch (e) {
        console.error("Failed parsing initial layout config:", e);
      }
    }
    return { homepage: [], category_orders: {} };
  });

  // Update organize list when section or layout changes
  useEffect(() => {
    if (!isOrganizing) {
      setOrganizeSearchQuery("");
      return;
    }
    setOrganizeSearchQuery("");
    
    let list: ProductType[] = [];
    if (organizeSection === "homepage") {
      list = products.filter(p => p.featured && p.sku !== 'NOM-LAYOUT');
      const order = layoutConfig.homepage || [];
      list.sort((a, b) => {
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA === -1 && idxB === -1) return 0;
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      });
    } else {
      list = products.filter(p => p.category === organizeSection && p.sku !== 'NOM-LAYOUT');
      const order = layoutConfig.category_orders?.[organizeSection] || [];
      list.sort((a, b) => {
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA === -1 && idxB === -1) return 0;
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      });
    }
    setOrganizeList(list);
    setLocalRankInputs({});
  }, [organizeSection, layoutConfig, products, isOrganizing]);

  const handleRankChange = (productId: number, currentIdx: number) => {
    const inputVal = localRankInputs[productId];
    if (inputVal === undefined || inputVal === "") return;
    
    let targetIdx = parseInt(inputVal, 10) - 1;
    if (isNaN(targetIdx)) return;
    
    if (targetIdx < 0) targetIdx = 0;
    if (targetIdx >= organizeList.length) targetIdx = organizeList.length - 1;
    
    if (targetIdx === currentIdx) return;
    
    const newList = [...organizeList];
    const [removed] = newList.splice(currentIdx, 1);
    newList.splice(targetIdx, 0, removed);
    
    setOrganizeList(newList);
    setLocalRankInputs({});
  };

  const handleAddToHomepage = (prodId: number) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    if (organizeList.some(p => p.id === prodId)) return;
    setOrganizeList([...organizeList, { ...prod, featured: true }]);
  };

  const handleRemoveFromHomepage = (prodId: number) => {
    setOrganizeList(organizeList.filter(p => p.id !== prodId));
  };

  const handleSaveOrder = async (orderedList: ProductType[]) => {
    setLoading(true);
    const nextConfig = { ...layoutConfig };
    const newOrder = orderedList.map(p => p.id);
    
    if (organizeSection === "homepage") {
      nextConfig.homepage = newOrder;
    } else {
      nextConfig.category_orders = {
        ...(nextConfig.category_orders || {}),
        [organizeSection]: newOrder
      };
    }
    
    const layoutProduct = products.find(p => p.sku === 'NOM-LAYOUT');
    let success = true;
    
    if (layoutProduct) {
      const { error } = await supabase
        .from("products")
        .update({ description: JSON.stringify(nextConfig) })
        .eq("id", layoutProduct.id);
      if (error) {
        console.error("Error updating system layout config", error);
        success = false;
      }
    } else {
      const maxId = products.reduce((max, x) => Math.max(max, x.id), 0);
      const nextId = maxId + 1;
      const { error } = await supabase
        .from("products")
        .insert({
          id: nextId,
          name: 'System Layout Config',
          slug: 'layout-config',
          category: 'System',
          sku: 'NOM-LAYOUT',
          description: JSON.stringify(nextConfig),
          price: 0,
          stock: 0,
          images: [],
          colors: [],
          featured: false
        });
      if (error) {
        console.error("Error creating system layout config", error);
        success = false;
      }
    }

    if (organizeSection === "homepage" && success) {
      const prevFeaturedIds = products.filter(p => p.featured && p.sku !== 'NOM-LAYOUT').map(p => p.id);
      const newFeaturedIds = orderedList.map(p => p.id);

      const toEnable = newFeaturedIds.filter(id => !prevFeaturedIds.includes(id));
      const toDisable = prevFeaturedIds.filter(id => !newFeaturedIds.includes(id));

      for (const id of toEnable) {
        const { error } = await supabase.from("products").update({ featured: true }).eq("id", id);
        if (error) console.error("Error setting featured: true for ID", id, error);
      }
      for (const id of toDisable) {
        const { error } = await supabase.from("products").update({ featured: false }).eq("id", id);
        if (error) console.error("Error setting featured: false for ID", id, error);
      }
    }

    if (success) {
      const { data: updatedProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if (updatedProducts) {
        setProducts(updatedProducts.map((p: any) => ({
          ...p,
          image: p.images?.[0] || "",
        })));
      }
      setLayoutConfig(nextConfig);
      notify("Layout display order saved successfully.");
      setIsOrganizing(false);
    } else {
      notify("Failed to save layout order.");
    }
    setLoading(false);
  };

  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "processing" || o.status === "shipped" || o.status === "delivered")
    .reduce((a, o) => a + o.total, 0);

  const filteredProducts = products.filter((p) => {
    if (p.sku === 'NOM-LAYOUT') return false;
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

  const [shippingOrderPrompt, setShippingOrderPrompt] = useState<{ orderId: string; status: string } | null>(null);
  const [shippingCarrier, setShippingCarrier] = useState("");
  const [shippingTrackingNumber, setShippingTrackingNumber] = useState("");

  const handleStatusChange = async (orderId: string, s: string) => {
    const old = [...orders];

    if (s === "cancelled") {
      setOrders(orders.filter((o) => o.id !== orderId));
      const { error } = await supabase.from("orders").delete().eq("id", orderId);
      if (error) {
        setOrders(old);
        notify("Error deleting order.");
      } else {
        notify(`Order #${orderId} was cancelled and deleted.`);
      }
      return;
    }

    if (s === "processing") {
      setShippingOrderPrompt({ orderId, status: s });
      setShippingCarrier("");
      setShippingTrackingNumber("");
      return;
    }

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
                  count={products.filter(p => p.sku !== 'NOM-LAYOUT').length}
                  note={`${products.filter((p) => p.sku !== 'NOM-LAYOUT' && (p.stock || 0) < 10).length} low stock`}
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
                  {products
                    .filter(p => p.sku !== 'NOM-LAYOUT')
                    .sort((a, b) => (a.stock || 0) - (b.stock || 0))
                    .slice(0, 5)
                    .map((p) => (
                      <div key={p.id}>
                        <img src={p.image || undefined} alt="" />
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
                  className="admin-secondary"
                  onClick={() => setIsOrganizing(!isOrganizing)}
                  style={{
                    background: isOrganizing ? "var(--clay)" : "var(--mineral)",
                    color: isOrganizing ? "var(--paper)" : "var(--copy)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer",
                    border: "1px solid var(--copy)",
                    marginLeft: "auto"
                  }}
                >
                  <SlidersHorizontal size={14} />
                  {isOrganizing ? "Exit Organizing" : "Organize Layout"}
                </button>

                <button
                  className="admin-primary"
                  onClick={() => setEdit({ ...blank, sku: "NOM-" + Math.random().toString(36).substring(2, 9).toUpperCase() })}
                  disabled={isOrganizing}
                >
                  <Plus />
                  New product
                </button>
              </div>
              {isOrganizing ? (
                <div className="admin-organize-panel" style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  padding: "24px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  marginTop: "20px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div>
                      <h2 style={{ fontSize: "16px", color: "var(--paper)", margin: 0, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Organize Display Order</h2>
                      <p style={{ margin: "5px 0 0", fontSize: "12px", opacity: 0.7 }}>
                        Rearrange products by section. Changes will apply independently to Homepage ("Principal") and Categories.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setIsOrganizing(false)}
                        style={{
                          background: "var(--mineral)",
                          color: "var(--copy)",
                          border: "1px solid var(--copy)",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveOrder(organizeList)}
                        disabled={loading}
                        style={{
                          background: "var(--clay)",
                          color: "var(--paper)",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: loading ? "not-allowed" : "pointer"
                        }}
                      >
                        {loading ? "Saving Order..." : "Save Layout Order"}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" }}>
                    <span style={{ fontSize: "13px", color: "var(--paper)", fontWeight: "600", textTransform: "uppercase" }}>Layout Section:</span>
                    <select
                      value={organizeSection}
                      onChange={(e) => setOrganizeSection(e.target.value)}
                      style={{
                        background: "var(--mineral)",
                        color: "var(--paper)",
                        border: "1px solid var(--copy)",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <option value="homepage">Principal (Homepage)</option>
                      <option value="Smart Home">Category: Smart Home</option>
                      <option value="Lighting">Category: Lighting</option>
                      <option value="Furniture">Category: Furniture</option>
                      <option value="Decor">Category: Decor</option>
                      <option value="Kitchen">Category: Kitchen</option>
                      <option value="Wellness">Category: Wellness</option>
                      <option value="Textiles">Category: Textiles</option>
                      <option value="Outdoor">Category: Outdoor</option>
                    </select>
                  </div>

                  {organizeSection === "homepage" && (
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", background: "rgba(255, 255, 255, 0.03)", padding: "12px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: "13px", opacity: 0.8, whiteSpace: "nowrap" }}>Add Product to Homepage:</span>
                      <div style={{ position: "relative", flex: 1, maxWidth: "350px" }}>
                        <input
                          type="text"
                          placeholder="Search by name, SKU or category..."
                          value={organizeSearchQuery}
                          onChange={(e) => setOrganizeSearchQuery(e.target.value)}
                          style={{
                            width: "100%",
                            background: "var(--mineral)",
                            color: "var(--paper)",
                            border: "1px solid var(--copy)",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            outline: "none"
                          }}
                        />
                        {organizeSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setOrganizeSearchQuery("")}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "var(--paper)",
                              opacity: 0.6,
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            ✕
                          </button>
                        )}
                        
                        {/* Search Results Dropdown */}
                        {organizeSearchQuery.trim() !== "" && (
                          <div style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            maxHeight: "250px",
                            overflowY: "auto",
                            background: "#1a1a1a",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "4px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
                            zIndex: 999,
                            marginTop: "6px"
                          }}>
                            {(() => {
                              const filtered = products.filter(p => {
                                if (p.sku === 'NOM-LAYOUT') return false;
                                if (organizeList.some(item => item.id === p.id)) return false;
                                const q = organizeSearchQuery.toLowerCase();
                                return (
                                  p.name.toLowerCase().includes(q) ||
                                  (p.sku && p.sku.toLowerCase().includes(q)) ||
                                  (p.category && p.category.toLowerCase().includes(q))
                                );
                              });
                              
                              if (filtered.length === 0) {
                                return (
                                  <div style={{ padding: "10px 12px", fontSize: "12px", color: "var(--paper)", opacity: 0.5 }}>
                                    No products found
                                  </div>
                                );
                              }
                              
                              return filtered.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => {
                                    handleAddToHomepage(p.id);
                                    setOrganizeSearchQuery("");
                                  }}
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "12px",
                                    color: "var(--paper)",
                                    cursor: "pointer",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    transition: "background 0.2s"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                  }}
                                >
                                  <div>
                                    <strong style={{ display: "block" }}>{p.name}</strong>
                                    <span style={{ fontSize: "10px", opacity: 0.6 }}>{p.category} | {p.sku}</span>
                                  </div>
                                  <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "3px", whiteSpace: "nowrap" }}>
                                    Add
                                  </span>
                                </div>
                              ));
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "50vh", overflowY: "auto", paddingRight: "10px" }}>
                    {organizeList.map((p, idx) => (
                      <div
                        key={p.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "12px 16px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "6px"
                        }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: "600", width: "30px", opacity: 0.5, color: "var(--paper)" }}>
                          #{idx + 1}
                        </span>
                        <img
                          src={p.image || undefined}
                          alt={p.name}
                          style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                        />
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: "13px", color: "var(--paper)", display: "block" }}>{p.name}</strong>
                          <span style={{ fontSize: "11px", opacity: 0.6, color: "var(--paper)" }}>{p.category} | {p.sku}</span>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "11px", opacity: 0.6 }}>Position:</span>
                          <input
                            type="number"
                            min="1"
                            max={organizeList.length}
                            value={localRankInputs[p.id] !== undefined ? localRankInputs[p.id] : idx + 1}
                            onChange={(e) => {
                              const val = e.target.value;
                              setLocalRankInputs(prev => ({ ...prev, [p.id]: val }));
                            }}
                            onBlur={() => handleRankChange(p.id, idx)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleRankChange(p.id, idx);
                              }
                            }}
                            style={{
                              width: "60px",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "#fff",
                              textAlign: "center",
                              borderRadius: "4px",
                              padding: "6px 8px",
                              fontSize: "13px"
                            }}
                          />
                          
                          {organizeSection === "homepage" && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFromHomepage(p.id)}
                              title="Remove from Homepage"
                              style={{
                                background: "rgba(224, 108, 117, 0.1)",
                                border: "1px solid rgba(224, 108, 117, 0.2)",
                                color: "#e06c75",
                                width: "32px",
                                height: "32px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "8px"
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {organizeList.length === 0 && (
                      <div style={{ padding: "40px 20px", textAlign: "center", opacity: 0.5 }}>
                        <p>No products in this section.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
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
                            <img src={p.image || undefined} alt="" />
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
              )}
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
            <div className="admin-users-panel">
              <div className="admin-toolbar" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px", background: "none", padding: 0 }}>
                <label htmlFor="user-search" style={{ margin: 0, width: "auto", flex: "1 1 200px", background: "var(--mineral)", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px" }}>
                  <Search size={16} />
                  <span className="sr-only">Search users</span>
                  <input
                    id="user-search"
                    placeholder="Search by name, email or phone..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    style={{ background: "none", border: "none", outline: "none", color: "inherit", width: "100%" }}
                  />
                </label>
              </div>

              {loadingUsers ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--paper)" }}>
                  <p>Loading users...</p>
                </div>
              ) : (
                <div className="product-table" role="table" aria-label="Customers">
                  <div className="table-row table-labels" role="row" style={{ gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr" }}>
                    <span>User</span>
                    <span>Email</span>
                    <span>Phone</span>
                    <span>Role</span>
                    <span style={{ textAlign: "right" }}>Actions</span>
                  </div>

                  {adminUsers
                    .filter((u) => {
                      const searchStr = `${u.name || ""} ${u.email || ""} ${u.phone || ""}`.toLowerCase();
                      return searchStr.includes(userQuery.toLowerCase());
                    })
                    .map((u) => (
                      <div key={u.id} className="table-row" role="row" style={{ gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr" }}>
                        <span className="product-cell">
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "var(--clay)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                            fontSize: "12px",
                            marginRight: "10px"
                          }}>
                            {u.name
                              ? u.name.split(" ").map((x: string) => x[0]).join("").slice(0, 2).toUpperCase()
                              : "CU"}
                          </div>
                          <b>{u.name || "Nōma Customer"}</b>
                        </span>
                        <span>{u.email}</span>
                        <span>{u.phone || <span style={{ opacity: 0.4 }}>—</span>}</span>
                        <span>
                          <em className={`status ${u.role === "admin" ? "paid" : "pending"}`}>
                            {u.role}
                          </em>
                        </span>
                        <span className="row-actions" style={{ justifyContent: "flex-end" }}>
                          <button
                            aria-label={`Edit ${u.name || u.email}`}
                            onClick={() => {
                              setEditingUser(u);
                              setUserForm({
                                name: u.name || "",
                                email: u.email || "",
                                phone: u.phone || "",
                                role: u.role || "customer",
                                password: "",
                              });
                              setUserFormError("");
                            }}
                          >
                            <Edit3 size={18} />
                          </button>
                        </span>
                      </div>
                    ))}

                  {adminUsers.filter((u) => {
                    const searchStr = `${u.name || ""} ${u.email || ""} ${u.phone || ""}`.toLowerCase();
                    return searchStr.includes(userQuery.toLowerCase());
                  }).length === 0 && (
                    <div className="no-data">
                      <Users />
                      <h2>No customers found</h2>
                      <p>Try refining your search query.</p>
                    </div>
                  )}
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

      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="product-editor-modal" style={{ width: "min(480px, 96vw)" }} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSaveUser}>
              <div className="editor-head">
                <div>
                  <small>Edit Customer Profile</small>
                  <h2>{editingUser.name || editingUser.email}</h2>
                </div>
                <button type="button" aria-label="Close editor" onClick={() => setEditingUser(null)}>
                  <X />
                </button>
              </div>

              <div className="editor-layout" style={{ display: "block" }}>
                <div className="editor-fields" style={{ width: "100%", padding: 0 }}>
                  {userFormError && (
                    <p className="form-error" role="alert" style={{ marginBottom: "20px", color: "#e06c75" }}>
                      {userFormError}
                    </p>
                  )}
                  
                  <div className="editor-form-grid" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Name
                      <input
                        required
                        value={userForm.name}
                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                        disabled={loading}
                      />
                    </label>

                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Email
                      <input
                        required
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        disabled={loading}
                      />
                    </label>

                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Phone
                      <input
                        value={userForm.phone}
                        onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                        disabled={loading}
                      />
                    </label>

                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Role
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                        disabled={loading}
                      >
                        <option value="customer">customer</option>
                        <option value="admin">admin</option>
                      </select>
                    </label>

                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      New Password (leave empty to keep unchanged)
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="editor-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  disabled={loading}
                  style={{
                    background: "var(--mineral)",
                    color: "var(--copy)",
                    border: "1px solid var(--copy)",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--clay)",
                    color: "var(--paper)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "600",
                  }}
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {shippingOrderPrompt && (
        <div className="modal-overlay" onClick={() => setShippingOrderPrompt(null)}>
          <div className="product-editor-modal" style={{ width: "min(420px, 96vw)" }} onClick={e => e.stopPropagation()}>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const { orderId, status } = shippingOrderPrompt;
              
              const targetOrder = orders.find(o => o.id === orderId);
              let notesJson: any = {};
              if (targetOrder && targetOrder.notes) {
                try {
                  notesJson = JSON.parse(targetOrder.notes);
                } catch (err) {
                  notesJson = { notes: targetOrder.notes };
                }
              }
              
              const updatedNotes = JSON.stringify({
                ...notesJson,
                shipping_carrier: shippingCarrier,
                shipping_tracking_number: shippingTrackingNumber,
              });

              const { error } = await supabase
                .from("orders")
                .update({
                  status,
                  notes: updatedNotes
                })
                .eq("id", orderId);

              if (error) {
                console.error("Error updating order tracking details:", error);
                notify("Error updating order shipping details.");
              } else {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status, notes: updatedNotes } : o));
                notify(`Order #${orderId} set to processing with shipping guide.`);
              }
              
              setLoading(false);
              setShippingOrderPrompt(null);
            }}>
              <div className="editor-head">
                <div>
                  <small>Shipping Details</small>
                  <h2>Order #{shippingOrderPrompt.orderId}</h2>
                </div>
                <button type="button" aria-label="Close" onClick={() => setShippingOrderPrompt(null)}>
                  <X />
                </button>
              </div>

              <div className="editor-layout" style={{ display: "block" }}>
                <div className="editor-fields" style={{ width: "100%", padding: 0 }}>
                  <p style={{ fontSize: "12px", opacity: 0.7, marginBottom: "16px" }}>
                    Please enter the shipping carrier and tracking guide number for this order.
                  </p>
                  
                  <div className="editor-form-grid" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Shipping Carrier (Paquetería)
                      <input
                        required
                        placeholder="e.g. DHL, FedEx, Estafeta, UPS"
                        value={shippingCarrier}
                        onChange={(e) => setShippingCarrier(e.target.value)}
                        disabled={loading}
                      />
                    </label>

                    <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      Tracking Number (Guía de Envío)
                      <input
                        required
                        placeholder="e.g. 1234567890"
                        value={shippingTrackingNumber}
                        onChange={(e) => setShippingTrackingNumber(e.target.value)}
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="editor-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setShippingOrderPrompt(null)}
                  disabled={loading}
                  style={{
                    background: "var(--mineral)",
                    color: "var(--copy)",
                    border: "1px solid var(--copy)",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--clay)",
                    color: "var(--paper)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "600",
                  }}
                >
                  {loading ? "Processing..." : "Set Processing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
