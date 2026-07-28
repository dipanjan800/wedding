"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";

interface SectionEyebrowProps {
  /** Chapter number label, e.g. "01" */
  index?: string;
  number?: string;
  /** Short label text, e.g. "About the Studio" */
  label?: string;
  title?: string;
  /** Framer-free — uses GSAP. Delay in seconds for stagger. */
  delay?: number;
}

/**
 * Reusable section eyebrow — gold rule + chapter index + label.
 * Consistent across all non-hero sections.
 */
export default function SectionEyebrow({ index, number, label, title, delay = 0 }: SectionEyebrowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const displayIndex = index ?? number;
  const displayLabel = label ?? title ?? "";

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className="flex items-center gap-4 mb-8 opacity-0">
      {/* Left rule */}
      <span
        className="h-px flex-shrink-0"
        style={{
          width: "2.5rem",
          background: "linear-gradient(to right, transparent, rgba(212,175,55,0.6))",
        }}
      />

      {/* Chapter number */}
      {displayIndex && (
        <span
          className="font-sans font-light text-[#D4AF37]/50"
          style={{ fontSize: "10px", letterSpacing: "0.3em" }}
        >
          {displayIndex}
        </span>
      )}

      {/* Label */}
      <span
        className="font-sans font-light uppercase text-white/40"
        style={{ fontSize: "10px", letterSpacing: "0.34em" }}
      >
        {displayLabel}
      </span>
    </div>
  );
}
