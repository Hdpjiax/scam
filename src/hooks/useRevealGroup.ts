"use client";

import { RefObject, useEffect } from "react";

export function useRevealGroup(
  containerRef: RefObject<HTMLElement | null>,
  selector = ".reveal-on-scroll",
  staggerMs = 80,
) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * staggerMs}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(
            getComputedStyle(el).getPropertyValue("--reveal-delay") || "0",
            10,
          );
          window.setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [containerRef, selector, staggerMs]);
}