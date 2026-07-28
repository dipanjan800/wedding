"use client";

import { motion } from "framer-motion";

/**
 * Luxury scroll indicator — Awwwards standard.
 * Mouse-scroll SVG (hollow rect + animated inner dot).
 * Inline/relative — positioned by parent layout, not absolute itself.
 * No text label. Premium brands never explain scroll cues.
 */
export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1.4, ease: "easeOut" }}
      className="flex items-center justify-center pointer-events-none"
      aria-label="Scroll to explore"
    >
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
        >
          {/* Mouse body */}
          <rect
            x="0.75"
            y="0.75"
            width="18.5"
            height="30.5"
            rx="9.25"
            stroke="#D4AF37"
            strokeWidth="0.9"
            opacity="0.4"
          />
          {/* Scroll dot — slides down + fades out */}
          <motion.circle
            cx="10"
            cy="9"
            r="2"
            fill="#D4AF37"
            animate={{ cy: [9, 18, 9], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
