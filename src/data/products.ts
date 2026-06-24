export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  imageHover?: string;
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
    name: "Aura Lamp",
    category: "Lighting",
    price: 165,
    oldPrice: 195,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description:
      "Dimmable ambient light that learns your routines and transforms the atmosphere of every space.",
    colors: ["#d8c7ad", "#292723", "#87907c"],
  },
  {
    id: 2,
    name: "Nest Speaker",
    category: "Smart Home",
    price: 125,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85",
    imageHover:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85&crop=focalpoint&fp-y=0.35",
    description:
      "Surround sound and smart home control in a sculptural textile-touch piece.",
    colors: ["#e8e1d5", "#2d2b29"],
  },
  {
    id: 3,
    name: "Mist Diffuser",
    category: "Wellness",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=900&q=85",
    description:
      "Programmable scents, quiet mist, and a serene presence for your daily rituals.",
    colors: ["#e6dfd0", "#b6a58d"],
  },
  {
    id: 4,
    name: "Clay Vase 02",
    category: "Decor",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
    description:
      "Artisanal organic silhouette ceramic, hand-finished in small batches.",
    colors: ["#9b6c4e", "#ded1bf"],
  },
  {
    id: 5,
    name: "Portal Light",
    category: "Lighting",
    price: 110,
    badge: "Limited Edition",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85",
    description:
      "A portable luminaire with clean lines and long-lasting battery life.",
    colors: ["#222220", "#ccb78f"],
  },
  {
    id: 6,
    name: "Sierra Throw",
    category: "Textiles",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1583845112203-454c2254edab?auto=format&fit=crop&w=900&q=85",
    description:
      "Thick, soft knit throw made from recycled fibers. Warmth with intention.",
    colors: ["#b77b55", "#ddd5c8"],
  },
  {
    id: 7,
    name: "Calm Sensor",
    category: "Smart Home",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85",
    description:
      "Real-time temperature, humidity, and air quality without invasive screens.",
    colors: ["#f2efe8"],
  },
  {
    id: 8,
    name: "Loma Side Table",
    category: "Furniture",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a694?auto=format&fit=crop&w=900&q=85",
    description:
      "Certified wood and honest joinery to accompany you during years.",
    colors: ["#6c4933", "#b39b7c"],
  },
  {
    id: 9,
    name: "Cloud Lounge Chair",
    category: "Furniture",
    price: 650,
    badge: "Nōma Icon",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85",
    description:
      "Soft volumes and deep seating to turn any corner into a sanctuary.",
    colors: ["#ded8cb", "#8a7967"],
    stock: 8,
    rating: 4.9,
    featured: true,
  },
  {
    id: 10,
    name: "Alba Mirror",
    category: "Decor",
    price: 275,
    image:
      "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=900&q=85",
    description: "Organic full-length mirror with a solid wood frame.",
    colors: ["#6c4933", "#222220"],
    stock: 12,
    rating: 4.8,
  },
  {
    id: 11,
    name: "Threshold Camera",
    category: "Smart Home",
    price: 145,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=900&q=85",
    description:
      "Watch your entryway with crystal clear video, private alerts, and a discreet design.",
    colors: ["#edeae3", "#252525"],
    stock: 25,
    rating: 4.7,
  },
  {
    id: 12,
    name: "Circle Thermostat",
    category: "Smart Home",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1567769541715-8c71fe49fd43?auto=format&fit=crop&w=900&q=85",
    description:
      "Automatic comfort that learns your schedule and reduces energy consumption.",
    colors: ["#f3f1ec", "#20211f"],
    stock: 15,
    rating: 4.9,
  },
  {
    id: 13,
    name: "Sand Linen Set",
    category: "Textiles",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=85",
    description:
      "Washed linen bedding, fresh, soft, and increasingly beautiful day by day.",
    colors: ["#ded2bd", "#899082"],
    stock: 18,
    rating: 4.8,
  },
  {
    id: 14,
    name: "Forest Candle",
    category: "Wellness",
    price: 39,
    badge: "Favorite",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    description:
      "Cedar, fig, and damp earth in clean-burning vegetable wax.",
    colors: ["#cab99e"],
    stock: 40,
    rating: 4.9,
  },
  {
    id: 15,
    name: "Clay Organizer",
    category: "Kitchen",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
    description:
      "Modular order for serene countertops and utensils always within reach.",
    colors: ["#a66f52", "#e1d4c1"],
    stock: 22,
    rating: 4.6,
  },
  {
    id: 16,
    name: "Ritual Coffee Maker",
    category: "Kitchen",
    price: 215,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=85",
    description:
      "Specialty coffee, smart programming, and a shape that deserves to stay in sight.",
    colors: ["#1e1f1d", "#d7d0c4"],
    stock: 16,
    rating: 4.9,
    featured: true,
  },
  {
    id: 17,
    name: "Root Planter",
    category: "Outdoor",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85",
    description: "Terracotta planter with integrated slow watering.",
    colors: ["#a85e40", "#d6c2a7"],
    stock: 30,
    rating: 4.7,
  },
  {
    id: 18,
    name: "Eclipse Lamp",
    category: "Lighting",
    price: 345,
    badge: "Limited Edition",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description:
      "Sculptural indirect lighting with programmable scenes and flicker-free dimming.",
    colors: ["#171815", "#d7aa67"],
    stock: 6,
    rating: 5,
    featured: true,
  },
  {
    id: 19,
    name: "Cauce Bench",
    category: "Furniture",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85",
    description: "Solid oak, smooth edges, and honest proportions.",
    colors: ["#b89163", "#664a35"],
    stock: 9,
    rating: 4.8,
  },
  {
    id: 20,
    name: "Claro Air Purifier",
    category: "Smart Home",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=85",
    description:
      "Quiet filtration and live air quality readings for spaces up to 650 sq ft.",
    colors: ["#eeece5", "#9ca099"],
    stock: 14,
    rating: 4.8,
  },
];

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
