"use client";

import { useRef, useEffect } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { registerGSAP, gsap } from "@/lib/gsap-register";

// ─── Experience Steps Data ───────────────────────────────────────────────────
const STEPS = [
  {
    index: "01",
    title: "Discovery",
    description:
      "We begin with an intimate conversation — understanding your vision, your heritage, the nuances of your love story.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="0.9" />
        <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="0.9" />
        <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="0.9" />
        <line x1="3" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="0.9" />
        <line x1="18" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Planning",
    description:
      "A meticulous pre-production process — locations scouted, lighting blueprinted, timeline curated with cinematic intent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="0.9" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="0.9" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="0.9" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="0.9" />
        <line x1="7" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="0.9" />
        <line x1="7" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Pre Wedding",
    description:
      "Golden hour sessions in iconic Indian landscapes — editorial portraits that carry the quiet electricity of anticipation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="0.9" />
        <path d="M12 13 Q6 18 4 22 H20 Q18 18 12 13Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <line x1="9" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1 1.5" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Wedding Day",
    description:
      "Every ritual, every glance, every unguarded tear — captured with invisible presence and cinema-grade precision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 4 L14.5 9 L20 9.5 L16 13.5 L17 19 L12 16.3 L7 19 L8 13.5 L4 9.5 L9.5 9 Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
      </svg>
    ),
  },
  {
    index: "05",
    title: "Editing",
    description:
      "Six to eight weeks of obsessive post-production — colour grading, scoring, and story architecture worthy of a film premiere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="7" width="20" height="12" rx="1.5" stroke="currentColor" strokeWidth="0.9" />
        <line x1="7" y1="7" x2="7" y2="19" stroke="currentColor" strokeWidth="0.9" />
        <line x1="17" y1="7" x2="17" y2="19" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="0.9" />
        <line x1="12" y1="5.5" x2="12" y2="7" stroke="currentColor" strokeWidth="0.9" />
        <line x1="5" y1="13" x2="9" y2="13" stroke="currentColor" strokeWidth="0.9" />
        <line x1="15" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    index: "06",
    title: "Lifetime Memories",
    description:
      "Your film delivered as a private screening experience — 4K digital masters, heirloom print editions, and an archive preserved forever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 21 C7 17 3 14 3 9.5 A5.5 5.5 0 0 1 12 6 A5.5 5.5 0 0 1 21 9.5 C21 14 17 17 12 21Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <path d="M12 8 C10.5 9.5 10 11 12 13 C14 11 13.5 9.5 12 8Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </svg>
    ),
  },
] as const;

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          delay: (index % 3) * 0.1, // subtle stagger within each row
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  // Hover: lift + gold border glow
  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      y: -6,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col opacity-0"
      style={{ willChange: "transform" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Card body */}
      <div
        className="relative flex flex-col h-full p-8 transition-colors duration-700"
        style={{
          background: "rgba(15, 15, 19, 0.6)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.055)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Gold border glow on hover — CSS transition */}
        <div
          className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            border: "1px solid rgba(212,175,55,0.22)",
            boxShadow: "inset 0 0 40px rgba(212,175,55,0.04)",
          }}
        />

        {/* Chapter index */}
        <div className="flex items-start justify-between mb-7">
          <span
            className="font-serif italic"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1,
              color: "rgba(212,175,55,0.20)",
              letterSpacing: "-0.02em",
            }}
          >
            {step.index}
          </span>

          {/* Icon */}
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full text-[#D4AF37]/40 group-hover:text-[#D4AF37]/70 transition-colors duration-500"
            style={{ border: "1px solid rgba(212,175,55,0.15)" }}
          >
            {step.icon}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-serif font-light mb-4 group-hover:text-[#F0D697] transition-colors duration-500"
          style={{
            fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
            lineHeight: 1.15,
            color: "#F7F6F3",
            letterSpacing: "-0.01em",
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="font-sans font-light leading-relaxed"
          style={{
            fontSize: "clamp(0.85rem, 0.95vw, 0.97rem)",
            color: "rgba(247,246,243,0.38)",
            letterSpacing: "0.015em",
          }}
        >
          {step.description}
        </p>

        {/* Bottom connector line — shown on hover */}
        <div
          className="mt-8 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: "linear-gradient(to right, #D4AF37, rgba(212,175,55,0.1))",
          }}
        />
      </div>

      {/* Step connector arrow — only between cards, not after last */}
      {index < STEPS.length - 1 && (
        <div
          className="hidden xl:flex absolute -right-6 top-1/2 -translate-y-1/2 items-center justify-center z-10"
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ color: "rgba(212,175,55,0.25)" }}
          >
            <path
              d="M1 6 H11 M7 2 L11 6 L7 10"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SignatureHeading() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 36, start: "top 82%" });

  return (
    <div ref={ref} className="opacity-0 mb-20 lg:mb-28">
      <SectionEyebrow index="02" label="The Signature Experience" />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2
          className="font-serif font-light pb-2"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.8rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#F7F6F3",
            maxWidth: "560px",
          }}
        >
          A process refined across{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              display: "inline-block",
              paddingBottom: "0.25em",
              marginBottom: "-0.25em",
              paddingRight: "0.05em",
              background:
                "linear-gradient(110deg, #B8962E, #D4AF37 45%, #F0D697 65%, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            a decade of weddings.
          </em>
        </h2>

        <p
          className="font-sans font-light max-w-xs"
          style={{
            fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
            color: "rgba(247,246,243,0.35)",
            lineHeight: 1.75,
            letterSpacing: "0.02em",
          }}
        >
          From the first conversation to the final frame — every step is
          orchestrated with the same attention to detail as the wedding itself.
        </p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SignatureExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden"
      aria-label="Signature Experience"
      style={{
        backgroundColor: "#08080A",
        paddingTop: "clamp(6rem, 14vh, 16rem)",
        paddingBottom: "clamp(7rem, 16vh, 18rem)",
      }}
    >
      {/* Subtle ambient glow — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          right: "-5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.045) 0%, transparent 65%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "1600px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <SignatureHeading />

        {/*
         * Cards grid — 3 columns on desktop, 2 on tablet, 1 on mobile.
         * XL: connectors shown between cards in same row.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.index} step={step} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA nudge ── */}
        <SignatureCTA />
      </div>
    </section>
  );
}

// ─── Bottom CTA nudge ────────────────────────────────────────────────────────
function SignatureCTA() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 90%" });

  return (
    <div
      ref={ref}
      className="opacity-0 mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p
        className="font-serif italic font-light"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
          color: "rgba(247,246,243,0.35)",
          maxWidth: "380px",
        }}
      >
        "The difference between a record and a story is the hands it passes
        through."
      </p>

      <a
        href="/#booking"
        className="group flex items-center gap-4 font-sans font-light uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.22em", color: "rgba(212,175,55,0.7)" }}
      >
        <span className="group-hover:text-[#D4AF37] transition-colors duration-400">
          Begin Your Story
        </span>
        <span
          className="h-px w-8 group-hover:w-14 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "linear-gradient(to right, #D4AF37, transparent)" }}
        />
      </a>
    </div>
  );
}
