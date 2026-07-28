"use client";

import { motion } from "framer-motion";

/**
 * SplitReveal — animates each word in from below with a 3D spring.
 * perspectiveContainer wraps each word so rotateX stays per-word, not global.
 */
function SplitReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ perspective: "1200px", marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          <motion.span
            initial={{ y: "105%", opacity: 0, rotateX: 20 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            transition={{
              delay: delay + i * 0.1,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[980px] mx-auto select-none">

      {/* ── Eyebrow — gold rule + location label ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex items-center gap-5"
      >
        <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
        <span
          className="font-sans font-light uppercase tracking-[0.42em] text-[#D4AF37]/65"
          style={{ fontSize: "10px", letterSpacing: "0.42em" }}
        >
          India {"&"} Worldwide
        </span>
        <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
      </motion.div>

      {/* ── Main Headline ── */}
      <h1
        className="font-serif mb-10"
        style={{ lineHeight: 0.88 }}
      >
        {/*
         * Line 1 — "Luxury" in ultra-light italic at massive scale.
         * Weight contrast with Line 2 is the primary editorial gesture.
         */}
        <span
          className="block italic font-light tracking-[0.06em] text-[#F7F6F3]/90"
          style={{ fontSize: "clamp(3.8rem, 10.5vw, 10.5rem)" }}
        >
          <SplitReveal text="Luxury" delay={0.82} />
        </span>

        {/*
         * Line 2 — "Wedding Films" in bold, slightly smaller, gold gradient.
         * Sits closer to Line 1 via negative margin for typographic density.
         */}
        <span
          className="block font-semibold tracking-[-0.01em] mt-[-0.05em]"
          style={{
            fontSize: "clamp(2.6rem, 7vw, 7rem)",
            background:
              "linear-gradient(110deg, #B8962E 0%, #D4AF37 30%, #F0D697 55%, #D4AF37 75%, #B8962E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <SplitReveal text="Wedding Films" delay={1.08} />
        </span>
      </h1>

      {/* ── Thin gold rule — editorial separator ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.65, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-px mb-7 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />

      {/* ── Sub-headline ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans font-light text-white/40 leading-[1.75] max-w-[400px]"
        style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.08rem)", letterSpacing: "0.025em" }}
      >
        Crafting timeless Indian love stories through cinematic photography and filmmaking.
      </motion.p>
    </div>
  );
}
