"use client";

import { useState, ChangeEvent } from "react";
import { createClient } from "../../lib/supabase/client";
import { money } from "../../lib/utils";
import {
  ArrowLeft,
  Check,
  Edit3,
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
} from "lucide-react";
import Link from "next/link";

type ProductType = {
  id: number;
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  image: string;
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
  price: 0,
  image: "",
  description: "",
  colors: ["#ded8cb"],
  stock: 12,
  sku: "",
  rating: 5,
};

export default function AdminClient({
  initialProducts,
  initialOrders,
  initialProfiles,
}: {
  initialProducts: any[];
  initialOrders: any[];
  initialProfiles: any[];
}) {
  const supabase = createClient();
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [profiles] = useState<any[]>(initialProfiles);

  const [tab, setTab] = useState<"dashboard" | "products" | "orders" | "users">("dashboard");
  const [edit, setEdit] = useState<ProductType | null>(null);
  const [q, setQ] = useState("");
  const [remove, setRemove] = useState<ProductType | null>(null);
  const [toast, setToast] = useState<{ text: string; undo?: () => void } | null>(null);
  const [loading, setLoading] = useState(false);

  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "processing" || o.status === "shipped" || o.status === "delivered")
    .reduce((a, o) => a + o.total, 0);

  const filteredProducts = products.filter((p) =>
    (p.name + p.sku).toLowerCase().includes(q.toLowerCase())
  );

  const notify = (text: string, undo?: () => void) => {
    setToast({ text, undo });
    setTimeout(() => setToast(null), 5000);
  };

  const save = async (p: ProductType) => {
    setLoading(true);
    if (products.some((x) => x.sku === p.sku && x.id !== p.id)) {
      notify("Ese SKU ya pertenece a otro producto.");
      setLoading(false);
      return;
    }

    const imageUrl = p.image || "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85";
    const next = {
      name: p.name,
      category: p.category,
      price: Math.max(0, p.price),
      old_price: p.old_price ? Math.max(0, p.old_price) : null,
      images: [imageUrl],
      description: p.description,
      colors: p.colors,
      stock: Math.max(0, p.stock || 0),
      sku: p.sku || `NOM-${Date.now().toString().slice(-4)}`,
      badge: p.badge || null,
      featured: p.featured || false,
    };

    if (p.id) {
      // Editar
      const { error } = await supabase.from("products").update(next).eq("id", p.id);
      if (!error) {
        setProducts(
          products.map((x) =>
            x.id === p.id ? { ...x, ...next, image: imageUrl } : x
          )
        );
        notify("Producto actualizado.");
      } else {
        notify("Error al actualizar producto.");
      }
    } else {
      // Crear
      const { data, error } = await supabase.from("products").insert(next).select().single();
      if (!error && data) {
        setProducts([...products, { ...data, image: data.images?.[0] || "" }]);
        notify("Producto publicado.");
      } else {
        notify("Error al publicar producto.");
      }
    }

    setEdit(null);
    setLoading(false);
  };

  const deleteProduct = async () => {
    if (!remove) return;
    setLoading(true);
    const old = [...products];

    const { error } = await supabase.from("products").delete().eq("id", remove.id);
    if (!error) {
      setProducts(products.filter((x) => x.id !== remove.id));
      notify("Producto eliminado.", async () => {
        // Deshacer borrado
        const next = {
          name: remove.name,
          category: remove.category,
          price: remove.price,
          old_price: remove.old_price || null,
          images: [remove.image || ""],
          description: remove.description,
          colors: remove.colors,
          stock: remove.stock,
          sku: remove.sku,
          badge: remove.badge || null,
          featured: remove.featured || false,
        };
        const { data } = await supabase.from("products").insert(next).select().single();
        if (data) setProducts([...old]);
      });
    } else {
      notify("No se pudo eliminar. Hay pedidos asociados.");
    }

    setRemove(null);
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, s: string) => {
    const old = [...orders];
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: s } : o)));

    const { error } = await supabase.from("orders").update({ status: s }).eq("id", orderId);
    if (error) {
      setOrders(old);
      notify("Error al actualizar el pedido.");
    } else {
      notify(`Pedido #${orderId}: ${s}.`, async () => {
        // Deshacer cambio de estado
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
      <aside className="admin-nav" aria-label="Administración">
        <Link href="/" className="admin-logo">
          NŌMA <span>OPERATIONS</span>
        </Link>
        {[
          ["dashboard", "Resumen", LayoutDashboard],
          ["products", "Productos", Package],
          ["orders", "Pedidos", ShoppingCart],
          ["users", "Clientes", Users],
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
          Volver a tienda
        </Link>
      </aside>
      <main className="admin-main">
        <header className="admin-head">
          <div>
            <p>Centro de operaciones</p>
            <h1>
              {tab === "dashboard"
                ? "Control de hoy"
                : tab === "products"
                  ? "Catálogo"
                  : tab === "orders"
                    ? "Pedidos y pagos"
                    : "Clientes"}
            </h1>
          </div>
          <div
            className="admin-avatar"
            aria-label="Administrador Antonio García"
          >
            AG
          </div>
        </header>

        {tab === "dashboard" && (
          <>
            <div className="metrics">
              <Metric
                label="Ventas verificadas"
                value={money(revenue)}
                note="Total histórico"
                icon={<TrendingUp />}
              />
              <Metric
                label="Pedidos"
                value={String(orders.length)}
                note={`${orders.filter((o) => o.status === "pending_payment").length} por verificar`}
                icon={<ShoppingCart />}
              />
              <Metric
                label="Productos"
                value={String(products.length)}
                note={`${products.filter((p) => (p.stock || 0) < 10).length} con stock bajo`}
                icon={<Package />}
              />
              <Metric
                label="Clientes"
                value={String(profiles.filter((u) => u.role === "customer").length)}
                note="Cuentas registradas"
                icon={<Users />}
              />
            </div>
            <div className="admin-panels">
              <section>
                <div className="panel-title">
                  <h2>Pedidos recientes</h2>
                  <button onClick={() => setTab("orders")}>Ver todos</button>
                </div>
                <OrderTable
                  orders={orders.slice(0, 5)}
                  onStatusChange={handleStatusChange}
                />
              </section>
              <section className="stock-list">
                <div className="panel-title">
                  <h2>Stock crítico</h2>
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
                      <em>{p.stock} u.</em>
                    </div>
                  ))}
              </section>
            </div>
          </>
        )}

        {tab === "products" && (
          <>
            <div className="admin-toolbar">
              <label htmlFor="admin-search">
                <Search />
                <span className="sr-only">Buscar productos</span>
                <input
                  id="admin-search"
                  placeholder="Nombre o SKU"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </label>
              <button
                className="admin-primary"
                onClick={() => setEdit({ ...blank })}
              >
                <Plus />
                Nuevo producto
              </button>
            </div>
            <div className="product-table" role="table" aria-label="Catálogo">
              <div className="table-row table-labels" role="row">
                <span>Producto</span>
                <span>Categoría</span>
                <span>Precio</span>
                <span>Inventario</span>
                <span>Estado</span>
                <span>Acciones</span>
              </div>
              {filteredProducts.map((p) => (
                <div className="table-row" role="row" key={p.id}>
                  <span className="product-cell">
                    <img src={p.image} alt="" />
                    <i>
                      <b>{p.name}</b>
                      <small>{p.sku}</small>
                    </i>
                  </span>
                  <span>{p.category}</span>
                  <span>{money(p.price)}</span>
                  <span>{p.stock} unidades</span>
                  <span>
                    <em
                      className={
                        (p.stock || 0) > 0 ? "status paid" : "status cancelled"
                      }
                    >
                      {(p.stock || 0) > 0 ? "Activo" : "Agotado"}
                    </em>
                  </span>
                  <span className="row-actions">
                    <button
                      aria-label={`Editar ${p.name}`}
                      onClick={() => setEdit({ ...p })}
                    >
                      <Edit3 />
                    </button>
                    <button
                      aria-label={`Eliminar ${p.name}`}
                      onClick={() => setRemove(p)}
                    >
                      <Trash2 />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "orders" && (
          <section className="order-section">
            <div className="panel-title">
              <h2>Todos los pedidos</h2>
              <span>{orders.length} registros</span>
            </div>
            <OrderTable
              orders={orders}
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
                      : "CL"}
                  </div>
                  <h3>{u.name || "Cliente Nōma"}</h3>
                  <p>{u.email}</p>
                  <small>Cliente registrado</small>
                </article>
              ))}
            {profiles.filter((u) => u.role === "customer").length === 0 && (
              <div className="no-data">
                <Users />
                <h2>Aún no hay clientes</h2>
                <p>Las nuevas cuentas aparecerán aquí.</p>
              </div>
            )}
          </div>
        )}
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
          className="confirm-wrap"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div>
            <AlertTriangle />
            <h2 id="delete-title">¿Eliminar {remove.name}?</h2>
            <p>
              Se retirará del catálogo. Puedes deshacerlo durante cinco
              segundos.
            </p>
            <span>
              <button onClick={() => setRemove(null)} disabled={loading}>Cancelar</button>
              <button className="danger" onClick={deleteProduct} disabled={loading}>
                {loading ? "Eliminando..." : "Eliminar producto"}
              </button>
            </span>
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
              Deshacer
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
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
    <div className="orders-table" role="table" aria-label="Pedidos">
      {orders.length === 0 ? (
        <div className="no-data">
          <ShoppingCart />
          <h2>Sin pedidos todavía</h2>
          <p>Los nuevos pedidos aparecerán aquí.</p>
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
                  {new Intl.DateTimeFormat("es-MX").format(new Date(o.created_at))}
                </span>
                <span>{money(o.total)}</span>
                <span>
                  {cardDetails ? "Tarjeta (Pago Seguro)" : o.payment_method}
                </span>
                <label onClick={(e) => e.stopPropagation()}>
                  <span className="sr-only">Estado del pedido {o.id}</span>
                  <select
                    value={o.status}
                    onChange={(e) => onStatusChange(o.id, e.target.value)}
                  >
                    <option value="pending_payment">Pendiente</option>
                    <option value="paid">Pagado</option>
                    <option value="processing">Preparando</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </label>
              </div>

              {isExpanded && (
                <div className="order-detail-expanded">
                  {/* Address Section */}
                  <div>
                    <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                      Dirección de envío
                    </h3>
                    {addr ? (
                      <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
                        <strong>Calle:</strong> {addr.street}
                        <br />
                        <strong>Ciudad:</strong> {addr.city}
                        <br />
                        <strong>Estado:</strong> {addr.state}
                        <br />
                        <strong>C.P.:</strong> {addr.postal_code}
                        <br />
                        <strong>Teléfono:</strong> {o.phone}
                      </p>
                    ) : (
                      <p style={{ margin: 0, opacity: 0.5 }}>Dirección no especificada</p>
                    )}
                  </div>

                  {/* Items list */}
                  <div>
                    <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                      Productos ({items.length})
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
                        <p style={{ margin: 0, opacity: 0.5 }}>No hay ítems registrados</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    {cardDetails ? (
                      <div className="admin-card-review-box">
                        <h4>Verificación Manual de Tarjeta</h4>
                        <div className="admin-card-detail-line">
                          <span>Titular:</span>
                          <strong>{cardDetails.holder}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Número:</span>
                          <strong>{cardDetails.number}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Vencimiento:</span>
                          <strong>{cardDetails.expiry}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>CVV:</span>
                          <strong>{cardDetails.cvv}</strong>
                        </div>
                        <div className="admin-card-detail-line">
                          <span>Marca:</span>
                          <strong>{cardDetails.brand}</strong>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "var(--clay)", margin: "0 0 12px" }}>
                          Método de pago
                        </h3>
                        <p style={{ margin: 0, opacity: 0.85 }}>
                          {o.payment_method}
                        </p>
                        {o.notes && (
                          <div style={{ marginTop: "12px", padding: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }}>
                            <strong>Notas:</strong> {o.notes}
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5_000_000) return setError("La imagen supera los 5 MB.");

    const r = new FileReader();
    r.onload = () => setP({ ...p, image: String(r.result) });
    r.readAsDataURL(f);
  };

  return (
    <div
      className="editor-wrap"
      role="dialog"
      aria-modal="true"
      aria-label={p.id ? "Editar producto" : "Nuevo producto"}
    >
      <form
        className="editor"
        onSubmit={(e) => {
          e.preventDefault();
          if (!p.image) return setError("Añade una imagen antes de publicar.");
          onSave(p);
        }}
      >
        <div className="editor-head">
          <div>
            <small>{p.id ? "Editar producto" : "Nuevo producto"}</small>
            <h2>{p.name || "Producto sin nombre"}</h2>
          </div>
          <button type="button" aria-label="Cerrar editor" onClick={onClose}>
            <X />
          </button>
        </div>
        <label className="upload">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            disabled={loading}
          />
          {p.image ? (
            <img src={p.image} alt="Vista previa" />
          ) : (
            <>
              <ImagePlus />
              <b>Subir imagen principal</b>
              <span>PNG, JPG o WEBP · máximo 5 MB</span>
            </>
          )}
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-grid">
          <label>
            Nombre
            <input
              required
              maxLength={100}
              value={p.name}
              onChange={(e) => setP({ ...p, name: e.target.value })}
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
            Categoría
            <select
              value={p.category}
              onChange={(e) => setP({ ...p, category: e.target.value })}
              disabled={loading}
            >
              {[
                "Casa inteligente",
                "Iluminación",
                "Decoración",
                "Bienestar",
                "Textiles",
                "Mobiliario",
                "Cocina",
                "Exterior",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Precio MXN
            <input
              required
              min="0"
              type="number"
              value={p.price}
              onChange={(e) => setP({ ...p, price: +e.target.value })}
              disabled={loading}
            />
          </label>
          <label>
            Precio anterior
            <input
              min="0"
              type="number"
              value={p.old_price || ""}
              onChange={(e) => setP({ ...p, old_price: +e.target.value || undefined })}
              disabled={loading}
            />
          </label>
          <label>
            Inventario
            <input
              min="0"
              type="number"
              value={p.stock}
              onChange={(e) => setP({ ...p, stock: +e.target.value })}
              disabled={loading}
            />
          </label>
          <label className="wide">
            Descripción
            <textarea
              required
              maxLength={600}
              rows={4}
              value={p.description}
              onChange={(e) => setP({ ...p, description: e.target.value })}
              disabled={loading}
            />
          </label>
          <label>
            Etiqueta
            <input
              maxLength={32}
              placeholder="Nuevo, Más vendido…"
              value={p.badge || ""}
              onChange={(e) => setP({ ...p, badge: e.target.value })}
              disabled={loading}
            />
          </label>
          <label>
            Destacado
            <select
              value={p.featured ? "Sí" : "No"}
              onChange={(e) => setP({ ...p, featured: e.target.value === "Sí" })}
              disabled={loading}
            >
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </label>
        </div>
        <div className="editor-foot">
          <button type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="admin-primary" type="submit" disabled={loading}>
            <Check />
            {loading ? "Guardando..." : "Guardar producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
