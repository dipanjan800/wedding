import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import LenisProvider from "@/components/common/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Vows Cinema — Luxury Indian Wedding Photography & Films",
  description:
    "Award-winning luxury Indian wedding photography and cinematic filmmaking. We craft timeless love stories through the art of editorial photography and cinematic storytelling. India & Worldwide.",
  keywords: [
    "Indian wedding photography",
    "luxury wedding films",
    "cinematic wedding videography",
    "pre-wedding photography India",
    "destination wedding photographer",
    "award winning wedding filmmaker",
  ],
  openGraph: {
    title: "Royal Vows Cinema — Luxury Indian Wedding Photography & Films",
    description:
      "Award-winning luxury Indian wedding photography and cinematic filmmaking across India & Worldwide.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Vows Cinema",
    description: "Luxury Indian Wedding Photography & Cinematic Films.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#08080A] text-[#F7F6F3] antialiased overflow-x-hidden">
        <LenisProvider />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
