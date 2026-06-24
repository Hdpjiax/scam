"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DISABLED_PREFIXES = ["/admin", "/checkout", "/login"];

export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const enabled = !DISABLED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <i style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}