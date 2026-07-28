import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/components/common/LenisProvider";
import ScrollToTop from "@/components/common/ScrollToTop";
import SkipToContent from "@/components/common/SkipToContent";

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
  metadataBase: new URL("https://royalvowscinema.com"),
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
    siteName: "Royal Vows Cinema",
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
  alternates: {
    canonical: "/",
  },
};

/** Schema.org Organization & LocalBusiness structured data for rich search results */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Royal Vows Cinema",
    description:
      "Award-winning luxury Indian wedding photography and cinematic filmmaking studio.",
    url: "https://royalvowscinema.com",
    foundingDate: "2014",
    areaServed: "Worldwide",
    knowsAbout: [
      "Wedding Photography",
      "Wedding Videography",
      "Cinematic Wedding Films",
      "Pre-Wedding Photography",
      "Destination Wedding Photography",
    ],
    sameAs: [
      "https://www.instagram.com/royalvows.cinema",
      "https://www.youtube.com/@royalvowscinema",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Royal Vows Cinema Atelier",
    image: "https://royalvowscinema.com/og-image.jpg",
    telephone: "+91 98765 43210",
    email: "concierge@royalvowscinema.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Taj Palace Enclave, Diplomatic Enclave",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110021",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5954",
      longitude: "77.1729",
    },
    url: "https://royalvowscinema.com",
    priceRange: "$$$$",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <meta name="theme-color" content="#08080A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08080A] text-[#F7F6F3] antialiased overflow-x-hidden">
        <SkipToContent />
        <LenisProvider />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

