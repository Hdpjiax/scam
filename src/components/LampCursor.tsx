"use client";

import { useEffect, useRef, useState } from "react";

function lerp(current: number, target: number, amount: number) {
  return current + (target - current) * amount;
}

export default function LampCursor() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const frame = useRef(0);
  const hasEntered = useRef(false);

  const finePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const active = ready && finePointer && !reducedMotion;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!fine.matches || reduced.matches) {
      setReady(false);
      return;
    }

    setReady(true);
    document.documentElement.classList.add("lamp-cursor-on");
    document.documentElement.classList.remove("lamp-cursor-paused");

    const root = document.documentElement;

    const setVars = (x: number, y: number) => {
      root.style.setProperty("--lamp-x", `${x}px`);
      root.style.setProperty("--lamp-y", `${y}px`);
      root.style.setProperty("--lamp-nx", `${(x / window.innerWidth) * 100}%`);
      root.style.setProperty("--lamp-ny", `${(y / window.innerHeight) * 100}%`);
    };

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.18);
      current.current.y = lerp(current.current.y, target.current.y, 0.18);
      setVars(current.current.x, current.current.y);
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    const pause = () => {
      document.documentElement.classList.add("lamp-cursor-paused");
      setVisible(false);
    };

    const resume = () => {
      document.documentElement.classList.remove("lamp-cursor-paused");
    };

    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      !!target.closest("input, textarea, select, [contenteditable='true']");

    const onMove = (event: PointerEvent) => {
      if (isField(event.target)) {
        pause();
        return;
      }
      resume();
      if (!hasEntered.current) {
        current.current = { x: event.clientX, y: event.clientY };
        hasEntered.current = true;
      }
      setVisible(true);
      target.current = { x: event.clientX, y: event.clientY };
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => {
      setVisible(false);
      hasEntered.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame.current);
      document.documentElement.classList.remove(
        "lamp-cursor-on",
        "lamp-cursor-paused",
      );
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`lamp-cursor${visible ? " show" : ""}${pressing ? " pressing" : ""}`}
      aria-hidden="true"
    >
      <span className="lamp-pool" />
    </div>
  );
}