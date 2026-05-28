import type { Metadata } from "next";
import { CustomCursor } from "@/components/custom-cursor";
import { UniverseTransitionProvider } from "@/components/universe-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "JMV Vision | Plateforme de mode et mannequins de luxe",
  description:
    "Une plateforme cinématique et futuriste dédiée aux portfolios mode, aux films runway et au casting haut de gamme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark h-full scroll-smooth antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full overflow-x-hidden bg-background text-foreground selection:bg-[#d9b166]/30 selection:text-white">
        <UniverseTransitionProvider>
          {children}
          <CustomCursor />
        </UniverseTransitionProvider>
      </body>
    </html>
  );
}
