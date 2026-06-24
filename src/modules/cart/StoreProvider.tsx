"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "../../lib/supabase/client";
import { Product } from "../../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

type StoreContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: number, selectedColor?: string) => void;
  updateQty: (productId: number, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  lastAdded: Product | null;
  cartPulse: number;
  signOut: () => Promise<void>;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [cartPulse, setCartPulse] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Cargar carrito inicial desde localStorage en el cliente
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("noma-cart-v1");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error("Error al cargar el carrito", e);
    }

    try {
      const storedWish = localStorage.getItem("noma-wishlist-v1");
      if (storedWish) {
        setWishlist(JSON.parse(storedWish));
      }
    } catch (e) {
      console.error("Error loading wishlist", e);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("noma-cart-v1", JSON.stringify(cart));
    } else {
      localStorage.removeItem("noma-cart-v1");
    }
  }, [cart]);

  // Guardar wishlist
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("noma-wishlist-v1", JSON.stringify(wishlist));
    } else {
      localStorage.removeItem("noma-wishlist-v1");
    }
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((x) => x.id === product.id);
      if (exists) {
        return prev.filter((x) => x.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((x) => x.id === productId);
  };

  // Escuchar cambios de autenticación
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(prof);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(prof);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const stock = product.stock ?? Number.MAX_SAFE_INTEGER;
    const safeQuantity = Math.max(1, Math.min(quantity, stock));
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: Math.min(stock, item.quantity + safeQuantity) }
            : item
        );
      }
      return [...prev, { product, quantity: safeQuantity, selectedColor }];
    });
    setLastAdded(product);
    setCartPulse((value) => value + 1);
    setCartOpen(true);
  };

  const removeFromCart = (productId: number, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQty = (productId: number, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock ?? quantity),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.href = "/";
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        user,
        profile,
        loading,
        lastAdded,
        cartPulse,
        signOut,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore debe usarse dentro de un StoreProvider");
  }
  return context;
};
