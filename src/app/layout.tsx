import type { Metadata } from "next";
import { StoreProvider } from "../providers/StoreProvider";
import "../styles.css";

export const metadata: Metadata = {
  title: "Nōma Casa Viva",
  description: "Diseño, tecnología y objetos para habitar mejor.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#1c1d19",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Gloock&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
