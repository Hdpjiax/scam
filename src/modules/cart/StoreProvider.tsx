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
  ordersOpen: boolean;
  setOrdersOpen: (open: boolean) => void;
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
  const [ordersOpen, setOrdersOpen] = useState(false);

  const [wishlist, setWishlist] = useState<Product[]>([]);

  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync / load cart and wishlist based on user authentication status
  useEffect(() => {
    if (loading) return;

    const currentUserId = user ? user.id : "guest";
    const cartKey = user ? `noma-cart-v1-${user.id}` : "noma-cart-v1-guest";
    const wishKey = user ? `noma-wishlist-v1-${user.id}` : "noma-wishlist-v1-guest";

    let loadedCart = [];
    let loadedWish = [];

    try {
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) loadedCart = JSON.parse(storedCart);
    } catch (e) {
      console.error("Error loading cart", e);
    }

    try {
      const storedWish = localStorage.getItem(wishKey);
      if (storedWish) loadedWish = JSON.parse(storedWish);
    } catch (e) {
      console.error("Error loading wishlist", e);
    }

    setCart(loadedCart);
    setWishlist(loadedWish);
    setActiveUserId(currentUserId);
    setIsInitialized(true);
  }, [user, loading]);

  // Save cart
  useEffect(() => {
    if (!isInitialized) return;
    const currentUserId = user ? user.id : "guest";
    if (activeUserId !== currentUserId) return;

    const cartKey = user ? `noma-cart-v1-${user.id}` : "noma-cart-v1-guest";
    if (cart.length > 0) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } else {
      localStorage.removeItem(cartKey);
    }
  }, [cart, user, isInitialized, activeUserId]);

  // Save wishlist
  useEffect(() => {
    if (!isInitialized) return;
    const currentUserId = user ? user.id : "guest";
    if (activeUserId !== currentUserId) return;

    const wishKey = user ? `noma-wishlist-v1-${user.id}` : "noma-wishlist-v1-guest";
    if (wishlist.length > 0) {
      localStorage.setItem(wishKey, JSON.stringify(wishlist));
    } else {
      localStorage.removeItem(wishKey);
    }
  }, [wishlist, user, isInitialized, activeUserId]);

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
        ordersOpen,
        setOrdersOpen,
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
