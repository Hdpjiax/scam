export type ProductType = {
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
};

export type OrderType = {
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
