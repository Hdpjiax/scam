"use client";

import { CSSProperties } from "react";
import { usePathname } from "next/navigation";

const DISABLED_PREFIXES = ["/admin", "/checkout", "/login"];

export default function AmbientLayer() {
  const pathname = usePathname();
  const enabled = !DISABLED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!enabled) return null;

  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ambient-grain" />
      <div className="ambient-motes">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}