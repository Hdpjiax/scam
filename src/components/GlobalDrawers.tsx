"use client";

import { useStore } from "../providers/StoreProvider";
import { Cart, Wishlist } from "./Drawers";

export default function GlobalDrawers() {
  const { cartOpen, setCartOpen, wishlistOpen, setWishlistOpen } = useStore();

  return (
    <>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      <Wishlist open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
