"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 mt-4"
    >
      {/* ── Primary CTA — ghost button with liquid gold fill ── */}
      <Link
        href="/#booking"
        id="hero-cta-primary"
        role="button"
        className="group relative overflow-hidden inline-flex items-center justify-center rounded-full border border-[#D4AF37]/60 hover:border-[#D4AF37] active:scale-[0.98] transition-all duration-700 whitespace-nowrap flex-shrink-0"
        style={{ padding: "14px 36px", minHeight: "48px" }}
      >
        {/*
         * Liquid fill — starts at 0% height from bottom, floods to 100% on hover.
         * Creates the "ink wash" premium button effect.
         */}
        <span
          className="absolute inset-0 rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background:
              "linear-gradient(to top, #B8962E, #D4AF37 60%, #E8CC78)",
          }}
        />

        {/* Ambient glow behind button */}
        <span className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-[#D4AF37]" />

        <span
          className="relative font-sans font-medium uppercase tracking-[0.22em] text-[#D4AF37] group-hover:text-[#08080A] transition-colors duration-500 pl-[0.22em] inline-block leading-none"
          style={{ fontSize: "11px" }}
        >
          Book Your Story
        </span>
      </Link>

      {/* ── Secondary text link ── */}
      <Link
        href="/#films"
        id="hero-cta-secondary"
        role="button"
        className="group relative inline-flex items-center justify-center gap-3 active:scale-[0.98] transition-transform duration-200 flex-shrink-0"
        style={{ padding: "14px 24px", minHeight: "48px" }}
      >
        <span
          className="font-sans font-light uppercase tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors duration-500 pl-[0.2em] inline-block leading-none"
          style={{ fontSize: "11px" }}
        >
          View Films
        </span>
        {/* Expanding gold underline */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-[60%] bg-[#D4AF37]/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </Link>
    </motion.div>
  );
}
