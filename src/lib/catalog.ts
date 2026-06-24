import { Product, products as seed } from "../data/products";
import { slugify } from "./utils";

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
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1800&q=88",
    accent: "#8c9785",
  },
  {
    name: "Lighting",
    slug: "lighting",
    title: "The architecture of light",
    copy: "Precise settings for reading, talking, resting, and celebrating.",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1800&q=88",
    accent: "#c39a61",
  },
  {
    name: "Furniture",
    slug: "furniture",
    title: "Shapes to slow down",
    copy: "Honest, tactile pieces made to accompany real life.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1800&q=88",
    accent: "#9d5037",
  },
  {
    name: "Decor",
    slug: "decor",
    title: "Matter with memory",
    copy: "Serene presence objects to complete a room without filling it with noise.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=88",
    accent: "#b57a55",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    title: "Rituals for the table",
    copy: "Tools and pieces that make daily moments more precise.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=88",
    accent: "#a66f52",
  },
  {
    name: "Wellness",
    slug: "wellness",
    title: "Pause, air, and texture",
    copy: "A selection to lower the day's volume without compromising on design.",
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=1800&q=88",
    accent: "#b6a58d",
  },
  {
    name: "Textiles",
    slug: "textiles",
    title: "Layers of calm",
    copy: "Fibers, weight, and touch to make rest feel designed.",
    image:
      "https://images.unsplash.com/photo-1583845112203-454c2254edab?auto=format&fit=crop&w=1800&q=88",
    accent: "#b77b55",
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    title: "The home continues outside",
    copy: "Pieces designed for patios, terraces, and balconies with their own life.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1800&q=88",
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
    "/assets/hero-casa-noma.png",
  imageHover: product.imageHover || product.images?.[1] || undefined,
  stock: product.stock ?? 12,
  sku: product.sku ?? `NOM-${String(index + 1).padStart(4, "0")}`,
  rating: Number(product.rating ?? 4.8),
  featured: Boolean(product.featured),
  colors: product.colors?.length ? product.colors : ["#ded8cb"],
});

export const seedProducts = () =>
  seed.map((product, index) => normalizeProduct(product, index));
