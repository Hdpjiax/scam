export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  description: string;
  colors: string[];
  stock?: number;
  sku?: string;
  rating?: number;
  featured?: boolean;
};
export const products: Product[] = [
  {
    id: 1,
    name: "Lámpara Aura",
    category: "Iluminación",
    price: 3290,
    oldPrice: 3890,
    badge: "Más vendido",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description:
      "Luz ambiental regulable que aprende de tus rutinas y transforma la atmósfera de cada espacio.",
    colors: ["#d8c7ad", "#292723", "#87907c"],
  },
  {
    id: 2,
    name: "Altavoz Nido",
    category: "Casa inteligente",
    price: 2490,
    badge: "Nuevo",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85",
    description:
      "Sonido envolvente y control doméstico en una pieza escultórica de tacto textil.",
    colors: ["#e8e1d5", "#2d2b29"],
  },
  {
    id: 3,
    name: "Difusor Bruma",
    category: "Bienestar",
    price: 1690,
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85",
    description:
      "Aromas programables, niebla silenciosa y una presencia serena para tus rituales diarios.",
    colors: ["#e6dfd0", "#b6a58d"],
  },
  {
    id: 4,
    name: "Jarrón Tierra 02",
    category: "Decoración",
    price: 1390,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
    description:
      "Cerámica artesanal de silueta orgánica, terminada a mano en pequeños lotes.",
    colors: ["#9b6c4e", "#ded1bf"],
  },
  {
    id: 5,
    name: "Luz Portal",
    category: "Iluminación",
    price: 2190,
    badge: "Edición limitada",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85",
    description:
      "Una luminaria portátil de líneas puras, con batería de larga duración.",
    colors: ["#222220", "#ccb78f"],
  },
  {
    id: 6,
    name: "Manta Sierra",
    category: "Textiles",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1583845112203-454c2254edab?auto=format&fit=crop&w=900&q=85",
    description:
      "Tejido grueso y suave en fibras recicladas. Calidez con intención.",
    colors: ["#b77b55", "#ddd5c8"],
  },
  {
    id: 7,
    name: "Sensor Calma",
    category: "Casa inteligente",
    price: 1190,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
    description:
      "Temperatura, humedad y calidad del aire en tiempo real, sin pantallas invasivas.",
    colors: ["#f2efe8"],
  },
  {
    id: 8,
    name: "Mesa Lateral Loma",
    category: "Mobiliario",
    price: 4990,
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a694?auto=format&fit=crop&w=900&q=85",
    description:
      "Madera certificada y uniones honestas para acompañarte durante años.",
    colors: ["#6c4933", "#b39b7c"],
  },
  {
    id: 9,
    name: "Sillón Nube",
    category: "Mobiliario",
    price: 12990,
    badge: "Icono Nōma",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85",
    description:
      "Volúmenes suaves y una sentada profunda para convertir cualquier rincón en refugio.",
    colors: ["#ded8cb", "#8a7967"],
    stock: 8,
    rating: 4.9,
    featured: true,
  },
  {
    id: 10,
    name: "Espejo Alba",
    category: "Decoración",
    price: 5490,
    image:
      "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=900&q=85",
    description: "Espejo orgánico de cuerpo entero con marco de madera sólida.",
    colors: ["#6c4933", "#222220"],
    stock: 12,
    rating: 4.8,
  },
  {
    id: 11,
    name: "Cámara Umbral",
    category: "Casa inteligente",
    price: 2890,
    badge: "Nuevo",
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=900&q=85",
    description:
      "Vigila tu entrada con imagen nítida, alertas privadas y diseño discreto.",
    colors: ["#edeae3", "#252525"],
    stock: 25,
    rating: 4.7,
  },
  {
    id: 12,
    name: "Termostato Círculo",
    category: "Casa inteligente",
    price: 3790,
    image:
      "https://images.unsplash.com/photo-1567769541715-8c71fe49fd43?auto=format&fit=crop&w=900&q=85",
    description:
      "Confort automático que aprende tus horarios y reduce el consumo energético.",
    colors: ["#f3f1ec", "#20211f"],
    stock: 15,
    rating: 4.9,
  },
  {
    id: 13,
    name: "Set Lino Arena",
    category: "Textiles",
    price: 2990,
    image:
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=85",
    description:
      "Ropa de cama de lino lavado, fresca, suave y cada día más bella.",
    colors: ["#ded2bd", "#899082"],
    stock: 18,
    rating: 4.8,
  },
  {
    id: 14,
    name: "Vela Bosque",
    category: "Bienestar",
    price: 790,
    badge: "Favorito",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    description:
      "Cedro, higo y tierra húmeda en cera vegetal de combustión limpia.",
    colors: ["#cab99e"],
    stock: 40,
    rating: 4.9,
  },
  {
    id: 15,
    name: "Organizador Arcilla",
    category: "Cocina",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
    description:
      "Orden modular para encimeras serenas y utensilios siempre a mano.",
    colors: ["#a66f52", "#e1d4c1"],
    stock: 22,
    rating: 4.6,
  },
  {
    id: 16,
    name: "Cafetera Ritual",
    category: "Cocina",
    price: 4290,
    badge: "Más vendido",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=85",
    description:
      "Café de especialidad, programación inteligente y una forma que merece quedarse a la vista.",
    colors: ["#1e1f1d", "#d7d0c4"],
    stock: 16,
    rating: 4.9,
    featured: true,
  },
  {
    id: 17,
    name: "Maceta Raíz",
    category: "Exterior",
    price: 1590,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85",
    description: "Maceta de terracota respirable con riego lento integrado.",
    colors: ["#a85e40", "#d6c2a7"],
    stock: 30,
    rating: 4.7,
  },
  {
    id: 18,
    name: "Lámpara Eclipse",
    category: "Iluminación",
    price: 6890,
    badge: "Edición limitada",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description:
      "Luz escultórica indirecta con escenas programables y atenuación sin parpadeo.",
    colors: ["#171815", "#d7aa67"],
    stock: 6,
    rating: 5,
    featured: true,
  },
  {
    id: 19,
    name: "Banco Cauce",
    category: "Mobiliario",
    price: 4790,
    image:
      "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85",
    description: "Roble macizo, bordes suaves y proporciones honestas.",
    colors: ["#b89163", "#664a35"],
    stock: 9,
    rating: 4.8,
  },
  {
    id: 20,
    name: "Purificador Aire Claro",
    category: "Casa inteligente",
    price: 5990,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=85",
    description:
      "Filtración silenciosa y lectura de aire en vivo para espacios de hasta 60 m².",
    colors: ["#eeece5", "#9ca099"],
    stock: 14,
    rating: 4.8,
  },
];
export const money = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
