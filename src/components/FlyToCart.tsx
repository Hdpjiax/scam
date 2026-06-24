"use client";

import { useEffect, useRef } from "react";
import { useStore } from "../providers/StoreProvider";

export default function FlyToCart() {
  const { lastAdded, cartPulse } = useStore();
  const prevPulse = useRef(0);

  useEffect(() => {
    if (!lastAdded || cartPulse === prevPulse.current) return;
    prevPulse.current = cartPulse;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const source = document.querySelector(
      `[data-fly-source="${lastAdded.id}"]`,
    ) as HTMLElement | null;
    const target = document.querySelector(".icon.cart") as HTMLElement | null;
    if (!source || !target) return;

    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();

    const flyer = document.createElement("div");
    flyer.className = "fly-to-cart";
    flyer.innerHTML = `<img src="${lastAdded.image}" alt="" />`;
    flyer.style.left = `${from.left + from.width / 2}px`;
    flyer.style.top = `${from.top + from.height / 2}px`;
    document.body.appendChild(flyer);

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const animation = flyer.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(calc(-50% + ${dx * 0.55}px), calc(-50% + ${dy * 0.55}px)) scale(0.55)`,
          opacity: 0.92,
          offset: 0.55,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.12)`,
          opacity: 0,
        },
      ],
      { duration: 680, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
    );

    animation.onfinish = () => flyer.remove();
  }, [cartPulse, lastAdded]);

  return null;
}