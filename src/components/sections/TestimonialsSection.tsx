"use client";

import { useRef, useEffect, useState } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TESTIMONIALS, type TestimonialEntry } from "@/lib/studio-data";

// ─── Star rating using SVG diamonds ──────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 10 10"
          fill="none"
          style={{ width: "8px", height: "8px" }}
        >
          <path
            d="M5 1L6.5 4H9.5L7 6L8 9L5 7.5L2 9L3 6L0.5 4H3.5L5 1Z"
            fill={i < rating ? "rgba(212,175,55,0.75)" : "rgba(255,255,255,0.1)"}
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Individual testimonial card ──────────────────────────────────────────────
function TestimonialCard({
  entry,
  index,
}: {
  entry: TestimonialEntry;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Clip-path mask reveal — staggered
  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48, clipPath: "inset(8% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          delay: index * 0.14,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const handleEnter = () => {
    setHovered(true);
    if (cardRef.current)
      gsap.to(cardRef.current, { y: -5, duration: 0.7, ease: "power2.out" });
  };

  const handleLeave = () => {
    setHovered(false);
    if (cardRef.current)
      gsap.to(cardRef.current, { y: 0, duration: 0.9, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      className="opacity-0 flex flex-col h-full will-change-transform"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ cursor: "default" }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          padding: "40px",
          background: "rgba(247,246,243,0.02)",
          border: hovered
            ? "1px solid rgba(212,175,55,0.22)"
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "clamp(14px, 1.8vw, 22px)",
          boxShadow: hovered
            ? "0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.05)"
            : "0 16px 50px rgba(0,0,0,0.35)",
          transition:
            "border-color 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Opening quote mark ── */}
        <div className="flex-shrink-0" style={{ marginBottom: "24px" }}>
          <span
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              lineHeight: 0.8,
              color: "rgba(212,175,55,0.15)",
              fontStyle: "italic",
              userSelect: "none",
              display: "block",
            }}
          >
            &ldquo;
          </span>
        </div>

        {/* ── Pull quote — editorial centrepiece ── */}
        <blockquote
          className="font-serif font-light flex-1"
          style={{
            marginBottom: "32px",
            fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            color: "rgba(247,246,243,0.82)",
            fontStyle: "italic",
          }}
        >
          {entry.shortReview}
        </blockquote>

        {/* ── Divider ── */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
            marginBottom: "1.25rem",
            flexShrink: 0,
          }}
        />

        {/* ── Attribution row ── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Couple photo placeholder */}
          <div
            ref={photoRef}
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: entry.photoGradient,
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            }}
          />

          <div className="flex-1 min-w-0">
            <p
              className="font-serif font-light truncate"
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                color: "#F7F6F3",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: "3px",
              }}
            >
              {entry.couple}
            </p>
            <p
              className="font-sans font-light truncate"
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "rgba(247,246,243,0.3)",
                textTransform: "uppercase",
              }}
            >
              {entry.location}
            </p>
          </div>

          {/* Star rating */}
          <StarRating rating={entry.rating} />
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, start: "top 84%" });
  const subRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 84%", delay: 0.14 });

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      aria-label="Client Testimonials"
      style={{
        backgroundColor: "#0F0F13",
        paddingTop: "clamp(7rem, 16vh, 18rem)",
        paddingBottom: "clamp(7rem, 16vh, 18rem)",
      }}
    >
      {/* ── Top separator ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.14) 25%, rgba(212,175,55,0.14) 75%, transparent)",
        }}
      />

      {/* ── Ambient bloom ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-6%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.04) 0%, transparent 65%)",
          filter: "blur(110px)",
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
        {/* ── Heading ── */}
        <div ref={headingRef} className="opacity-0 mb-5">
          <SectionEyebrow index="06" label="Client Testimonials" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F7F6F3",
            }}
          >
            Words from{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                background:
                  "linear-gradient(110deg, #A0791E, #D4AF37 40%, #F0D697 62%, #D4AF37 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              those we've loved.
            </em>
          </h2>
        </div>

        {/* ── Subline + rating summary ── */}
        <div
          ref={subRef}
          className="opacity-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
          style={{ marginBottom: "80px" }}
        >
          <p
            className="font-sans font-light"
            style={{
              fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
              letterSpacing: "0.04em",
              color: "rgba(247,246,243,0.22)",
              maxWidth: "28rem",
              lineHeight: 1.9,
            }}
          >
            Every review is a window into a day we were honoured to witness.
            These are not edited excerpts — they are whole truths.
          </p>

          {/* Overall rating display */}
          <div className="hidden lg:flex items-center gap-4">
            <StarRating rating={5} />
            <span
              className="font-sans font-light"
              style={{
                fontSize: "9px",
                letterSpacing: "0.26em",
                color: "rgba(247,246,243,0.2)",
                textTransform: "uppercase",
              }}
            >
              5.0 · 500+ Reviews
            </span>
          </div>
        </div>

        {/* ── Cards grid — 3 columns ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          style={{ gap: "clamp(1rem, 1.6vw, 1.5rem)", alignItems: "stretch" }}
        >
          {TESTIMONIALS.map((entry, i) => (
            <TestimonialCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* ── Full review toggle hint ── */}
        <div className="mt-16 flex justify-center">
          <a
            href="/#testimonials"
            className="group relative inline-flex items-center gap-5 font-sans font-light"
            style={{ fontSize: "10px", letterSpacing: "0.28em" }}
          >
            <span
              className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
              style={{
                width: "2rem",
                background: "linear-gradient(to left, rgba(212,175,55,0.5), transparent)",
              }}
            />
            <span className="uppercase text-[rgba(247,246,243,0.28)] group-hover:text-[#D4AF37] transition-colors duration-500">
              Read All Reviews
            </span>
            <span
              className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
              style={{
                width: "2rem",
                background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)",
              }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
