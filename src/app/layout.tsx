import type { Metadata, Viewport } from "next";
import { Gloock, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gloock",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${gloock.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero-casa-noma-900.webp"
          fetchPriority="high"
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
