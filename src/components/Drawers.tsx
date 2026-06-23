"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "../providers/StoreProvider";
import { money } from "../lib/utils";

const FREE_SHIPPING_THRESHOLD = 1999;

export function Cart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQty, removeFromCart, lastAdded } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  const total = cart.reduce((a, item) => a + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((a, item) => a + item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div className={"scrim " + (open ? "show" : "")} onClick={onClose} />
      <aside
        className={"drawer " + (open ? "open" : "")}
        aria-hidden={!open}
        aria-label="Carrito"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-head">
          <div>
            <small>Compra segura</small>
            <h2>
              Tu selección <sup>{totalItems}</sup>
            </h2>
          </div>
          <button ref={closeRef} aria-label="Cerrar carrito" onClick={onClose}>
            <X />
          </button>
        </div>
        <p className="cart-announcer" aria-live="polite">
          {lastAdded ? `${lastAdded.name} agregado al carrito.` : ""}
        </p>
        {cart.length === 0 ? (
          <div className="empty">
            <ShoppingBag />
            <h3>Tu casa aún tiene espacio</h3>
            <p>
              Descubre objetos que hacen la vida diaria un poco más especial.
            </p>
            <button onClick={onClose}>Explorar colección</button>
          </div>
        ) : (
          <>
            <div className="shipping-progress">
              <span>
                {remaining === 0
                  ? "Envío gratis desbloqueado"
                  : `Te faltan ${money(remaining)} para envío gratis`}
              </span>
              <i>
                <b
                  style={{
                    transform: `scaleX(${Math.min(1, total / FREE_SHIPPING_THRESHOLD)})`,
                  }}
                />
              </i>
            </div>
            <div className="cart-list">
              {cart.map((item, i) => (
                <div
                  className={
                    "cart-line " +
                    (lastAdded?.id === item.product.id ? "recent" : "")
                  }
                  key={`${item.product.id}-${i}`}
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <small>{item.product.category}</small>
                    <h4>{item.product.name}</h4>
                    <span>{money(item.product.price)}</span>
                    <div className="qty" aria-label="Cantidad">
                      <button
                        aria-label="Reducir cantidad"
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      >
                        <Minus />
                      </button>
                      <b>{item.quantity}</b>
                      <button
                        aria-label="Aumentar cantidad"
                        disabled={item.quantity >= (item.product.stock ?? item.quantity)}
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label={`Eliminar ${item.product.name}`}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
            <div className="checkout">
              <div>
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </div>
              <p>Envío y pago se confirman en el siguiente paso.</p>
              <Link href="/checkout" onClick={onClose} className="drawer-checkout">
                Ir a pagar <ArrowRight />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
