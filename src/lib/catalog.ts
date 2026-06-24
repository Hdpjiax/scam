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
    name: "Casa inteligente",
    slug: "casa-inteligente",
    title: "Tecnología que desaparece",
    copy: "Control, bienestar y seguridad sin convertir tu casa en un laboratorio.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1800&q=88",
    accent: "#8c9785",
  },
  {
    name: "Iluminación",
    slug: "iluminacion",
    title: "La arquitectura de la luz",
    copy: "Atmósferas precisas para leer, conversar, descansar y celebrar.",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1800&q=88",
    accent: "#c39a61",
  },
  {
    name: "Mobiliario",
    slug: "mobiliario",
    title: "Formas para bajar el ritmo",
    copy: "Piezas honestas, táctiles y hechas para acompañar la vida real.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1800&q=88",
    accent: "#9d5037",
  },
  {
    name: "Decoración",
    slug: "decoracion",
    title: "Materia con memoria",
    copy: "Objetos de presencia serena para terminar una habitación sin llenarla de ruido.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=88",
    accent: "#b57a55",
  },
  {
    name: "Cocina",
    slug: "cocina",
    title: "Rituales para la mesa",
    copy: "Herramientas y piezas que vuelven más precisos los momentos cotidianos.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=88",
    accent: "#a66f52",
  },
  {
    name: "Bienestar",
    slug: "bienestar",
    title: "Pausa, aire y textura",
    copy: "Una selección para bajar el volumen del día sin renunciar al diseño.",
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=1800&q=88",
    accent: "#b6a58d",
  },
  {
    name: "Textiles",
    slug: "textiles",
    title: "Capas de calma",
    copy: "Fibras, peso y tacto para hacer que el descanso se sienta diseñado.",
    image:
      "https://images.unsplash.com/photo-1583845112203-454c2254edab?auto=format&fit=crop&w=1800&q=88",
    accent: "#b77b55",
  },
  {
    name: "Exterior",
    slug: "exterior",
    title: "La casa sigue afuera",
    copy: "Piezas pensadas para patios, terrazas y balcones con vida propia.",
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
