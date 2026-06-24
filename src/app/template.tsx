"use client";

import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-template">{children}</div>;
}