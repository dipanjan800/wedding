"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception silently to monitoring service if needed
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#08080A] text-center px-6 py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg space-y-6">
        <span className="inline-block font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
          An Unexpected Moment Occurred
        </span>

        <h1 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
          Uncompromised Elegance <br />
          <em className="font-normal italic text-white/60">Awaits Your Return</em>
        </h1>

        <p className="font-sans text-sm text-white/50 font-light leading-relaxed">
          We encountered a minor disturbance while loading this page. Our atelier has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#08080A] font-sans font-medium text-xs uppercase tracking-widest hover:bg-[#F0D697] transition-colors duration-300"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-sans font-light text-xs uppercase tracking-widest hover:border-[#D4AF37]/50 hover:text-white transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
