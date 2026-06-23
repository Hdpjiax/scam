import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { products as seed, Product } from "./data/products";
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
};
export type Order = {
  id: string;
  date: string;
  customer: string;
  email: string;
  total: number;
  status: "Pendiente" | "Pagado" | "Enviado" | "Cancelado";
  payment: "Tarjeta" | "Transferencia";
  items: { name: string; qty: number }[];
};
type Store = {
  products: Product[];
  setProducts: (p: Product[]) => void;
  cart: Product[];
  setCart: (p: Product[]) => void;
  users: User[];
  setUsers: (u: User[]) => void;
  orders: Order[];
  setOrders: (o: Order[]) => void;
  user: User | null;
  setUser: (u: User | null) => void;
};
const C = createContext<Store | null>(null);
const get = <T,>(k: string, f: T): T => {
  try {
    return JSON.parse(localStorage.getItem(k) || "") || f;
  } catch {
    return f;
  }
};
export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    get(
      "noma-products",
      seed.map((p, i) => ({
        ...p,
        stock: p.stock ?? 12,
        sku: p.sku ?? `NOM-${String(i + 1).padStart(4, "0")}`,
        rating: p.rating ?? 4.8,
      })),
    ),
  );
  const [cart, setCart] = useState<Product[]>(() => get("noma-cart", []));
  const [users, setUsers] = useState<User[]>(() =>
    get("noma-users", [
      {
        id: "admin",
        name: "Administrador",
        email: "admin@noma.mx",
        password: "admin123",
        role: "admin",
      },
    ]),
  );
  const [orders, setOrders] = useState<Order[]>(() => get("noma-orders", []));
  const [user, setUser] = useState<User | null>(() => get("noma-user", null));
  useEffect(
    () => localStorage.setItem("noma-products", JSON.stringify(products)),
    [products],
  );
  useEffect(
    () => localStorage.setItem("noma-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("noma-users", JSON.stringify(users)),
    [users],
  );
  useEffect(
    () => localStorage.setItem("noma-orders", JSON.stringify(orders)),
    [orders],
  );
  useEffect(
    () => localStorage.setItem("noma-user", JSON.stringify(user)),
    [user],
  );
  return (
    <C.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        users,
        setUsers,
        orders,
        setOrders,
        user,
        setUser,
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useStore = () => useContext(C)!;
