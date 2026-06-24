"use client";

import ProductCard from "./ProductCard";
import { Product } from "../data/products";

type PreviewProduct = {
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

export default function AdminProductPreview({
  product,
}: {
  product: PreviewProduct;
}) {
  const preview: Product = {
    id: product.id || 0,
    name: product.name || "Producto sin nombre",
    category: product.category,
    price: product.price,
    oldPrice: product.old_price || undefined,
    image:
      product.image ||
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85",
    badge: product.badge || undefined,
    description: product.description || "Descripción del producto.",
    colors: product.colors?.length ? product.colors : ["#ded8cb"],
    stock: product.stock,
    sku: product.sku,
    rating: product.rating ?? 5,
    featured: product.featured,
  };

  return (
    <aside className="editor-preview-panel" aria-label="Vista previa en tienda">
      <div className="editor-preview-head">
        <small>Vista previa en tienda</small>
        <span>Así se verá en el catálogo</span>
      </div>
      <div className="editor-preview-stage">
        <ProductCard p={preview} preview />
      </div>
    </aside>
  );
}