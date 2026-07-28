"use client";

/**
 * Luxury dark loading UI for Next.js App Router route transitions.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080A]">
      {/* Animated Monogram Logo */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        <svg
          className="w-full h-full animate-spin-slow"
          viewBox="0 0 34 34"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="17,1 33,17 17,33 1,17"
            stroke="#D4AF37"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          <rect
            x="9.5"
            y="9.5"
            width="15"
            height="15"
            stroke="#F0D697"
            strokeWidth="0.6"
            fill="none"
            transform="rotate(45 17 17)"
            opacity="0.4"
          />
          <circle cx="17" cy="17" r="1.5" fill="#D4AF37" />
        </svg>
      </div>

      <span
        className="font-serif font-light uppercase text-[#D4AF37] text-xs tracking-[0.3em] animate-pulse"
      >
        Royal Vows Cinema
      </span>
      <span
        className="font-sans font-light uppercase text-white/30 text-[9px] tracking-[0.2em] mt-2"
      >
        Preparing Experience...
      </span>
    </div>
  );
}
