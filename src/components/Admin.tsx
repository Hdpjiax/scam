import { useState, ChangeEvent } from "react";
import { useStore, Order } from "../store";
import { Product, money } from "../data/products";
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
const blank: Product = {
  id: 0,
  name: "",
  category: "Decoración",
  price: 0,
  image: "",
  description: "",
  colors: ["#ded8cb"],
  stock: 0,
  sku: "",
  rating: 5,
};
export default function Admin() {
  const { products, setProducts, orders, setOrders, users, user } = useStore();
  const [tab, setTab] = useState<"dashboard" | "products" | "orders" | "users">(
      "dashboard",
    ),
    [edit, setEdit] = useState<Product | null>(null),
    [q, setQ] = useState(""),
    [remove, setRemove] = useState<Product | null>(null),
    [toast, setToast] = useState<{ text: string; undo?: () => void } | null>(
      null,
    );
  if (user?.role !== "admin")
    return (
      <div className="access-denied">
        <h1>Área privada</h1>
        <p>Inicia sesión como administrador para continuar.</p>
        <a href="#/login">Ir a acceso</a>
      </div>
    );
  const revenue = orders
      .filter((o) => o.status === "Pagado" || o.status === "Enviado")
      .reduce((a, o) => a + o.total, 0),
    filtered = products.filter((p) =>
      (p.name + p.sku).toLowerCase().includes(q.toLowerCase()),
    );
  const notify = (text: string, undo?: () => void) => {
    setToast({ text, undo });
    setTimeout(() => setToast(null), 5000);
  };
  const save = (p: Product) => {
    if (products.some((x) => x.sku === p.sku && x.id !== p.id))
      return notify("Ese SKU ya pertenece a otro producto.");
    const next = {
      ...p,
      price: Math.max(0, p.price),
      stock: Math.max(0, p.stock || 0),
      sku: p.sku || `NOM-${Date.now().toString().slice(-4)}`,
    };
    setProducts(
      p.id
        ? products.map((x) => (x.id === p.id ? next : x))
        : [...products, { ...next, id: Date.now() }],
    );
    setEdit(null);
    notify(p.id ? "Producto actualizado." : "Producto publicado.");
  };
  const deleteProduct = () => {
    if (!remove) return;
    const old = [...products];
    setProducts(products.filter((x) => x.id !== remove.id));
    setRemove(null);
    notify("Producto eliminado.", () => setProducts(old));
  };
  return (
    <div className="admin-shell">
      <aside className="admin-nav" aria-label="Administración">
        <a href="#/" className="admin-logo">
          NŌMA <span>OPERATIONS</span>
        </a>
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
        <a className="back-shop" href="#/">
          <ArrowLeft />
          Volver a tienda
        </a>
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
                note={`${orders.filter((o) => o.status === "Pendiente").length} por verificar`}
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
                value={String(
                  users.filter((u) => u.role === "customer").length,
                )}
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
                  all={orders}
                  setOrders={setOrders}
                  notify={notify}
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
              {filtered.map((p) => (
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
              all={orders}
              setOrders={setOrders}
              notify={notify}
            />
          </section>
        )}
        {tab === "users" && (
          <div className="user-grid">
            {users
              .filter((u) => u.role === "customer")
              .map((u) => (
                <article key={u.id}>
                  <div>
                    {u.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <h3>{u.name}</h3>
                  <p>{u.email}</p>
                  <small>Cliente registrado</small>
                </article>
              ))}
            {!users.some((u) => u.role === "customer") && (
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
        />
      )}{" "}
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
              <button onClick={() => setRemove(null)}>Cancelar</button>
              <button className="danger" onClick={deleteProduct}>
                Eliminar producto
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
  setOrders,
  all,
  notify,
}: {
  orders: Order[];
  setOrders: (o: Order[]) => void;
  all: Order[];
  notify: (x: string, u?: () => void) => void;
}) {
  const status = (id: string, s: Order["status"]) => {
    const old = [...all];
    setOrders(all.map((o) => (o.id === id ? { ...o, status: s } : o)));
    notify(`Pedido #${id}: ${s}.`, () => setOrders(old));
  };
  return (
    <div className="orders-table" role="table" aria-label="Pedidos">
      {orders.length === 0 ? (
        <div className="no-data">
          <ShoppingCart />
          <h2>Sin pedidos todavía</h2>
          <p>Los nuevos pedidos aparecerán aquí.</p>
        </div>
      ) : (
        orders.map((o) => (
          <div className="order-row" role="row" key={o.id}>
            <b>#{o.id}</b>
            <span>
              <strong>{o.customer}</strong>
              <small>{o.email}</small>
            </span>
            <span>
              {new Intl.DateTimeFormat("es-MX").format(new Date(o.date))}
            </span>
            <span>{money(o.total)}</span>
            <span>{o.payment}</span>
            <label>
              <span className="sr-only">Estado del pedido {o.id}</span>
              <select
                value={o.status}
                onChange={(e) =>
                  status(o.id, e.target.value as Order["status"])
                }
              >
                <option>Pendiente</option>
                <option>Pagado</option>
                <option>Enviado</option>
                <option>Cancelado</option>
              </select>
            </label>
          </div>
        ))
      )}
    </div>
  );
}
function ProductEditor({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [p, setP] = useState(product),
    [error, setError] = useState("");
  const file = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5_000_000) return setError("La imagen supera 5 MB.");
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
            onChange={file}
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
            />
          </label>
          <label>
            SKU
            <input
              maxLength={32}
              value={p.sku}
              onChange={(e) =>
                setP({ ...p, sku: e.target.value.toUpperCase() })
              }
            />
          </label>
          <label>
            Categoría
            <select
              value={p.category}
              onChange={(e) => setP({ ...p, category: e.target.value })}
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
            />
          </label>
          <label>
            Precio anterior
            <input
              min="0"
              type="number"
              value={p.oldPrice || ""}
              onChange={(e) =>
                setP({ ...p, oldPrice: +e.target.value || undefined })
              }
            />
          </label>
          <label>
            Inventario
            <input
              min="0"
              type="number"
              value={p.stock}
              onChange={(e) => setP({ ...p, stock: +e.target.value })}
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
            />
          </label>
          <label>
            Etiqueta
            <input
              maxLength={32}
              placeholder="Nuevo, Más vendido…"
              value={p.badge || ""}
              onChange={(e) => setP({ ...p, badge: e.target.value })}
            />
          </label>
          <label>
            Destacado
            <select
              value={p.featured ? "Sí" : "No"}
              onChange={(e) =>
                setP({ ...p, featured: e.target.value === "Sí" })
              }
            >
              <option>No</option>
              <option>Sí</option>
            </select>
          </label>
        </div>
        <div className="editor-foot">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="admin-primary">
            <Check />
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
}
