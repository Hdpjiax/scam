"use client";

import { HTMLAttributes, ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  delay?: number;
  threshold?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  ...rest
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(delay, threshold);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}