"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex items-center gap-0 mt-11"
    >
      {/* ── Primary CTA — ghost button with liquid gold fill ── */}
      <Link
        href="/#booking"
        id="hero-cta-primary"
        className="group relative overflow-hidden flex items-center px-8 py-[14px] rounded-full border border-[#D4AF37]/45 hover:border-[#D4AF37]/80 transition-colors duration-700"
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
          className="relative font-sans font-light uppercase tracking-[0.2em] text-[#D4AF37] group-hover:text-[#08080A] transition-colors duration-500"
          style={{ fontSize: "11px" }}
        >
          Book Your Story
        </span>
      </Link>

      {/* ── Dot separator ── */}
      <span className="mx-6 w-[3px] h-[3px] rounded-full bg-white/20 flex-shrink-0" />

      {/* ── Secondary text link ── */}
      <Link
        href="/#films"
        id="hero-cta-secondary"
        className="group relative flex items-center gap-3"
      >
        <span
          className="font-sans font-light uppercase tracking-[0.2em] text-white/35 group-hover:text-white/70 transition-colors duration-500"
          style={{ fontSize: "11px" }}
        >
          View Films
        </span>
        {/* Expanding gold underline */}
        <span className="block h-px w-0 group-hover:w-6 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </Link>
    </motion.div>
  );
}
