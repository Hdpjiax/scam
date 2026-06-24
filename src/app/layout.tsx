import type { Metadata, Viewport } from "next";
import AmbientLayer from "../components/AmbientLayer";
import FlyToCart from "../components/FlyToCart";
import LampCursor from "../components/LampCursor";
import ScrollProgress from "../components/ScrollProgress";
import { StoreProvider } from "../providers/StoreProvider";
import "../styles.css";
import "../styles/base.css";
import "../styles/commerce.css";
import "../styles/admin.css";
import "../styles/motion.css";
import "../styles/ambience.css";
import "../styles/checkout-forms.css";
import "../styles/account.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://noma-home.com'),
  title: "NŌMA | Home Living",
  description: "Minimalist design & smart tech objects for a premium home living experience.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "NŌMA | Home Living",
    description: "Minimalist design & smart tech objects for a premium home living experience.",
    url: "https://noma-home.com",
    siteName: "NŌMA",
    images: [
      {
        url: "/assets/hero-casa-noma-1600.webp",
        width: 1200,
        height: 630,
        alt: "NŌMA Home Living",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NŌMA | Home Living",
    description: "Minimalist design & smart tech objects for a premium home living experience.",
    images: ["/assets/hero-casa-noma-1600.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c1d19",
};

import GlobalDrawers from "../components/GlobalDrawers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero-casa-noma-900.webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <AmbientLayer />
          <ScrollProgress />
          <LampCursor />
          <FlyToCart />
          <GlobalDrawers />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
