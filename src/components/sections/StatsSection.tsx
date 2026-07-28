"use client";

import { useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { STUDIO_STATS, type StatEntry } from "@/lib/studio-data";

// ─── Animated counter stat ────────────────────────────────────────────────────
function StatItem({
  stat,
  index,
  isLast,
}: {
  stat: StatEntry;
  index: number;
  isLast: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    registerGSAP();
    const container = containerRef.current;
    const numEl = numberRef.current;
    if (!container || !numEl) return;

    const ctx = gsap.context(() => {
      // Container fade-up
      gsap.fromTo(
        container,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 86%",
            toggleActions: "play none none none",
            onEnter: () => {
              if (hasAnimated.current) return;
              hasAnimated.current = true;

              // CountUp animation — only fires once
              const target = { val: 0 };
              gsap.to(target, {
                val: stat.value,
                duration: 2.2,
                delay: 0.3 + index * 0.12,
                ease: "power2.out",
                onUpdate() {
                  if (numEl) {
                    numEl.textContent = Math.round(target.val).toString();
                  }
                },
              });
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index, stat.value]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center opacity-0"
      style={{ textAlign: "center" }}
    >
      {/* ── Number ── */}
      <div
        className="flex items-end justify-center mb-4"
        style={{ lineHeight: 1 }}
      >
        <span
          ref={numberRef}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(3.5rem, 6.5vw, 7rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            background:
              "linear-gradient(110deg, #A0791E 0%, #D4AF37 35%, #F0D697 55%, #D4AF37 75%, #B8962E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          0
        </span>
        <span
          className="font-serif font-light"
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3.8rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            paddingBottom: "0.2em",
            background:
              "linear-gradient(110deg, #A0791E 0%, #D4AF37 40%, #F0D697 60%, #D4AF37 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* ── Label ── */}
      <p
        className="font-sans font-light"
        style={{
          fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
          letterSpacing: "0.06em",
          color: "rgba(247,246,243,0.65)",
          marginBottom: "6px",
        }}
      >
        {stat.label}
      </p>

      {/* ── Sublabel ── */}
      {stat.sublabel && (
        <p
          className="font-sans font-light uppercase"
          style={{
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "rgba(247,246,243,0.22)",
          }}
        >
          {stat.sublabel}
        </p>
      )}

      {/* ── Right border separator (hidden on last item) ── */}
      {!isLast && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{
            width: "1px",
            height: "clamp(4rem, 8vh, 6rem)",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          }}
        />
      )}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function StatsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 36, start: "top 84%" });

  return (
    <section
      id="trusted-by"
      className="relative overflow-hidden"
      aria-label="Studio Statistics"
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

      {/* ── Centred ambient glow ── */}
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,150,46,0.05) 0%, transparent 65%)",
          filter: "blur(130px)",
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
        {/* ── Heading ── */}
        <div
          ref={headingRef}
          className="opacity-0 text-center mb-20 lg:mb-24"
        >
          <SectionEyebrow index="08" label="Trusted By" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F7F6F3",
            }}
          >
            Ten years of{" "}
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
              earned trust.
            </em>
          </h2>
        </div>

        {/* ── Stats row ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 relative"
          style={{ gap: "clamp(3rem, 5vw, 6rem)" }}
        >
          {STUDIO_STATS.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              index={i}
              isLast={i === STUDIO_STATS.length - 1}
            />
          ))}
        </div>

        {/* ── Bottom editorial note ── */}
        <div className="mt-24 flex flex-col items-center gap-4">
          {/* Ornamental diamond */}
          <svg viewBox="0 0 12 12" fill="none" style={{ width: "9px" }}>
            <path d="M6 1L11 6L6 11L1 6L6 1Z" fill="rgba(212,175,55,0.25)" />
          </svg>
          <p
            className="font-sans font-light text-center"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "rgba(247,246,243,0.15)",
              textTransform: "uppercase",
              maxWidth: "28rem",
            }}
          >
            Every number is a story. Every story is a life we were trusted to preserve.
          </p>
        </div>
      </div>
    </section>
  );
}
