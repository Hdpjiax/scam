import { Product, products as seed } from "../../data/products";
import { slugify } from "../../lib/utils";

export type CategoryMeta = {
  name: string;
  slug: string;
  title: string;
  copy: string;
  image: string;
  accent: string;
};

export const categories: CategoryMeta[] = [
  {
    name: "Smart Home",
    slug: "smart-home",
    title: "Technology that disappears",
    copy: "Control, wellness, and security without turning your house into a lab.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/smart-home.jpg",
    accent: "#8c9785",
  },
  {
    name: "Lighting",
    slug: "lighting",
    title: "The architecture of light",
    copy: "Precise settings for reading, talking, resting, and celebrating.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/lighting.jpg",
    accent: "#c39a61",
  },
  {
    name: "Furniture",
    slug: "furniture",
    title: "Shapes to slow down",
    copy: "Honest, tactile pieces made to accompany real life.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/furniture.jpg",
    accent: "#9d5037",
  },
  {
    name: "Decor",
    slug: "decor",
    title: "Matter with memory",
    copy: "Serene presence objects to complete a room without filling it with noise.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/decor.jpg",
    accent: "#b57a55",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    title: "Rituals for the table",
    copy: "Tools and pieces that make daily moments more precise.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/kitchen.jpg",
    accent: "#a66f52",
  },
  {
    name: "Wellness",
    slug: "wellness",
    title: "Pause, air, and texture",
    copy: "A selection to lower the day's volume without compromising on design.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/wellness.jpg",
    accent: "#b6a58d",
  },
  {
    name: "Textiles",
    slug: "textiles",
    title: "Layers of calm",
    copy: "Fibers, weight, and touch to make rest feel designed.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/textiles.jpg",
    accent: "#b77b55",
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    title: "The home continues outside",
    copy: "Pieces designed for patios, terraces, and balconies with their own life.",
    image:
      "https://jfyqcttmdwhllvryntcc.supabase.co/storage/v1/object/public/noma-assets/categories/outdoor.jpg",
    accent: "#a85e40",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);

export const categorySlug = (category: string) =>
  categories.find((item) => item.name === category)?.slug || slugify(category);

export const normalizeProduct = (product: any, index = 0): Product => ({
  ...product,
  oldPrice: product.oldPrice ?? product.old_price,
  image:
    product.image ||
    product.images?.[0] ||
    categories.find((category) => category.name === product.category)?.image ||
    "/assets/hero-casa-noma-1600.webp",
  imageHover: product.imageHover || product.images?.[1] || undefined,
  stock: product.stock ?? 12,
  sku: product.sku ?? `NOM-${String(index + 1).padStart(4, "0")}`,
  rating: Number(product.rating ?? 4.8),
  reviewCount: Number(product.reviewCount ?? product.review_count ?? product.reviews?.length ?? 0),
  reviews: product.reviews ?? [],
  featured: Boolean(product.featured),
  colors: product.colors?.length ? product.colors : ["#ded8cb"],
});

export const seedProducts = () =>
  seed.map((product, index) => normalizeProduct(product, index));
