"use client";

import Link from "next/link";
import { STUDIO_CONTACT } from "@/lib/studio-data";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About Atelier", href: "/#about" },
  { label: "Featured Weddings", href: "/#weddings" },
  { label: "Pre-Wedding Stories", href: "/#pre-wedding" },
  { label: "Cinematic Films", href: "/#films" },
  { label: "Editorial Gallery", href: "/#instagram" },
  { label: "Reserve Commission", href: "/#booking" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * Geometric mandala-diamond monogram mark — identical to Navbar for brand consistency.
 */
function FooterMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="footer-gold" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A227" />
          <stop offset="0.5" stopColor="#F0D697" />
          <stop offset="1" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      <polygon
        points="17,1 33,17 17,33 1,17"
        stroke="url(#footer-gold)"
        strokeWidth="0.8"
        fill="none"
      />
      <rect
        x="9.5" y="9.5" width="15" height="15"
        stroke="url(#footer-gold)" strokeWidth="0.6" fill="none"
        transform="rotate(45 17 17)" opacity="0.5"
      />
      <circle cx="17" cy="17" r="1.5" fill="url(#footer-gold)" opacity="0.9" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#08080A] overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Gold top separator ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.2) 25%, rgba(212,175,55,0.2) 75%, transparent)",
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "1600px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingTop: "clamp(4rem, 10vh, 8rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
        }}
      >
        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-20">

          {/* ── Brand column ── */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="group inline-flex items-center gap-3 mb-6">
              <div className="transition-transform duration-700 group-hover:rotate-[22.5deg]">
                <FooterMark />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-serif font-light text-[#F7F6F3] uppercase group-hover:text-[#D4AF37] transition-colors duration-500"
                  style={{ fontSize: "12px", letterSpacing: "0.28em" }}
                >
                  Royal
                </span>
                <span className="w-px h-2.5 bg-[#D4AF37]/30 self-center" />
                <span
                  className="font-serif font-light text-[#F7F6F3] uppercase group-hover:text-[#D4AF37] transition-colors duration-500"
                  style={{ fontSize: "12px", letterSpacing: "0.28em" }}
                >
                  Vows
                </span>
              </div>
            </Link>

            <p
              className="font-sans font-light mb-8 max-w-[280px]"
              style={{
                fontSize: "clamp(0.82rem, 0.95vw, 0.9rem)",
                color: "rgba(247,246,243,0.3)",
                lineHeight: 1.75,
                letterSpacing: "0.01em",
              }}
            >
              Award-winning luxury Indian wedding photography and cinematic
              filmmaking. Crafting timeless love stories across India and
              worldwide.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href={STUDIO_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/30 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-500"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={STUDIO_CONTACT.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/30 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-500"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div className="lg:col-span-3 lg:col-start-6">
            <span
              className="font-sans font-light uppercase block mb-5"
              style={{
                fontSize: "9px",
                letterSpacing: "0.34em",
                color: "rgba(212,175,55,0.45)",
              }}
            >
              Navigation
            </span>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {FOOTER_NAV.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="footer-link font-sans font-light"
                      style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Contact column ── */}
          <div className="lg:col-span-4">
            <span
              className="font-sans font-light uppercase block mb-5"
              style={{
                fontSize: "9px",
                letterSpacing: "0.34em",
                color: "rgba(212,175,55,0.45)",
              }}
            >
              Get In Touch
            </span>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${STUDIO_CONTACT.email}`}
                className="footer-link font-sans font-light"
                style={{ fontSize: "12px", letterSpacing: "0.04em" }}
              >
                {STUDIO_CONTACT.email}
              </a>
              <a
                href={`tel:${STUDIO_CONTACT.phoneRaw}`}
                className="footer-link font-sans font-light"
                style={{ fontSize: "12px", letterSpacing: "0.04em" }}
              >
                {STUDIO_CONTACT.phone}
              </a>
              <p
                className="font-sans font-light"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "rgba(247,246,243,0.2)",
                  lineHeight: 1.7,
                  maxWidth: "240px",
                }}
              >
                {STUDIO_CONTACT.address}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar — thin gold separator + copyright ── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Copyright */}
          <p
            className="font-sans font-light"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(247,246,243,0.18)",
            }}
          >
            © {currentYear} Royal Vows Cinema. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="footer-link font-sans font-light"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Craft credit */}
          <span
            className="font-serif italic"
            style={{
              fontSize: "10px",
              color: "rgba(212,175,55,0.2)",
              letterSpacing: "0.04em",
            }}
          >
            Crafted with devotion
          </span>
        </div>
      </div>
    </footer>
  );
}
