"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Weddings", href: "/#weddings" },
  { label: "Pre-Wedding", href: "/#pre-wedding" },
  { label: "Films", href: "/#films" },
  { label: "Instagram", href: "/#instagram" },
  { label: "Contact", href: "/#booking" },
];

/**
 * Geometric mandala-diamond monogram mark.
 * Thin strokes, mathematically precise, inspired by Indian sacred geometry.
 * Uses the RV initials embedded in diamond/rhombus negative space.
 */
function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mark-gold" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A227" />
          <stop offset="0.5" stopColor="#F0D697" />
          <stop offset="1" stopColor="#B8962E" />
        </linearGradient>
      </defs>

      {/* Outer diamond */}
      <polygon
        points="17,1 33,17 17,33 1,17"
        stroke="url(#mark-gold)"
        strokeWidth="0.8"
        fill="none"
      />

      {/* Inner diamond rotated 45° — creates a sacred geometry frame */}
      <rect
        x="9.5"
        y="9.5"
        width="15"
        height="15"
        stroke="url(#mark-gold)"
        strokeWidth="0.6"
        fill="none"
        transform="rotate(45 17 17)"
        opacity="0.5"
      />

      {/* Center dot — focal point */}
      <circle cx="17" cy="17" r="1.5" fill="url(#mark-gold)" opacity="0.9" />

      {/* Four corner accent marks — cardinal points */}
      <line x1="17" y1="1" x2="17" y2="5.5" stroke="url(#mark-gold)" strokeWidth="0.8" />
      <line x1="17" y1="28.5" x2="17" y2="33" stroke="url(#mark-gold)" strokeWidth="0.8" />
      <line x1="1" y1="17" x2="5.5" y2="17" stroke="url(#mark-gold)" strokeWidth="0.8" />
      <line x1="28.5" y1="17" x2="33" y2="17" stroke="url(#mark-gold)" strokeWidth="0.8" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-[rgba(6,6,8,0.88)] backdrop-blur-[32px] border-b border-white/[0.05]"
          : "bg-transparent"
      )}
    >
      <nav 
        className="mx-auto h-[72px] flex items-center justify-between w-full"
        style={{
          maxWidth: "1600px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >

        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="transition-transform duration-700 group-hover:rotate-[22.5deg]">
            <LogoMark />
          </div>
          {/* Wordmark with thin separator */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-serif font-light text-[#F7F6F3] uppercase group-hover:text-[#D4AF37] transition-colors duration-500"
              style={{ fontSize: "13px", letterSpacing: "0.28em" }}
            >
              Royal
            </span>
            <span className="w-px h-3 bg-[#D4AF37]/30 self-center" />
            <span
              className="font-serif font-light text-[#F7F6F3] uppercase group-hover:text-[#D4AF37] transition-colors duration-500"
              style={{ fontSize: "13px", letterSpacing: "0.28em" }}
            >
              Vows
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <ul className="!hidden md:!flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="group relative block font-sans font-light uppercase text-white/50 hover:text-white/90 transition-colors duration-500"
                style={{ fontSize: "11px", letterSpacing: "0.16em" }}
              >
                {label}
                {/* Underline — expands from center */}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-[#D4AF37]/70 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Inquire CTA ── */}
        <Link
          href="/#booking"
          id="nav-inquire"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-[#D4AF37] text-[#08080A] font-sans font-semibold uppercase hover:bg-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] border border-transparent transition-all duration-500"
          style={{ fontSize: "10px", letterSpacing: "0.22em", padding: "10px 28px" }}
        >
          <span className="pl-[0.22em]">Inquire</span>
        </Link>

        {/* ── Mobile hamburger (strictly hidden on desktop) ── */}
        <button
          className="!flex md:!hidden flex-col justify-center gap-[6px] w-8 h-8 focus-visible:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "w-full h-px bg-white/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
              menuOpen && "rotate-45 translate-y-[7px]"
            )}
          />
          <span
            className={cn(
              "w-3/4 h-px bg-white/40 transition-all duration-500",
              menuOpen && "opacity-0 -translate-x-2"
            )}
          />
          <span
            className={cn(
              "w-full h-px bg-white/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
              menuOpen && "-rotate-45 -translate-y-[7px]"
            )}
          />
        </button>
      </nav>

      {/* ── Mobile drawer (strictly hidden on desktop) ── */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="md:!hidden overflow-hidden bg-[rgba(6,6,8,0.97)] backdrop-blur-[40px]"
      >
        <ul className="px-6 py-8 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -12 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-sans font-light uppercase text-white/50 hover:text-[#D4AF37] transition-colors duration-300"
                style={{ fontSize: "13px", letterSpacing: "0.16em" }}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
