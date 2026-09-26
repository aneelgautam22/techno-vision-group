import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Techno Vision Group | Engineering, Consultancy & Construction",
    template: "%s | Techno Vision Group",
  },
  description:
    "Engineering consultancy, technical planning, project supervision and construction services in Nepal.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    siteName: "Techno Vision Group",
    title: "Techno Vision Group | Engineering, Consultancy & Construction",
    description:
      "Thoughtful engineering and purposeful construction, from concept to completion.",
    type: "website",
    locale: "en_NP",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
