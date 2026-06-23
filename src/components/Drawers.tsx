"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X, ArrowRight, Trash2 } from "lucide-react";
import { useStore } from "../providers/StoreProvider";
import { money } from "../lib/utils";

export function Cart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQty, removeFromCart } = useStore();

  const total = cart.reduce((a, item) => a + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((a, item) => a + item.quantity, 0);

  return (
    <>
      <div className={"scrim " + (open ? "show" : "")} onClick={onClose} />
      <aside
        className={"drawer " + (open ? "open" : "")}
        aria-hidden={!open}
        aria-label="Carrito"
      >
        <div className="drawer-head">
          <div>
            <small>Compra segura</small>
            <h2>
              Tu selección <sup>{totalItems}</sup>
            </h2>
          </div>
          <button aria-label="Cerrar carrito" onClick={onClose}>
            <X />
          </button>
        </div>
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
            <div className="cart-list">
              {cart.map((item, i) => (
                <div className="cart-line" key={`${item.product.id}-${i}`}>
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
              <p>Envío calculado en el checkout</p>
              <Link href="/checkout" onClick={onClose} className="ds-primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Ir a pagar <ArrowRight />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
