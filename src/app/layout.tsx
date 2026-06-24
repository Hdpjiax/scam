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
  title: "NŌMA Home living",
  description: "Design & tech objects for a better living.",
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
