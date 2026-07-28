"use client";

import { useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FEATURED_ON, AWARD_ENTRIES, type AwardEntry } from "@/lib/studio-data";

// ─── Wordmark logo — elegant monochrome text treatment ────────────────────────
function LogoWordmark({
  entry,
  index,
  size = "normal",
}: {
  entry: AwardEntry;
  index: number;
  size?: "normal" | "small";
}) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: index * 0.07,
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
  }, [index]);

  const handleEnter = () => {
    if (elRef.current)
      gsap.to(elRef.current, {
        opacity: 1,
        y: -2,
        duration: 0.4,
        ease: "power2.out",
      });
  };

  const handleLeave = () => {
    if (elRef.current)
      gsap.to(elRef.current, {
        opacity: 0.18,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
  };

  return (
    <div
      ref={elRef}
      className="opacity-0 flex flex-col items-center gap-2 text-center"
      style={{
        opacity: 0.18,
        cursor: "default",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Wordmark */}
      <span
        className="font-sans font-light"
        style={{
          fontSize: size === "small"
            ? "clamp(0.85rem, 1.1vw, 1.05rem)"
            : "clamp(1rem, 1.4vw, 1.3rem)",
          letterSpacing:
            size === "small" ? "0.14em" : "0.08em",
          color: "#F7F6F3",
          lineHeight: 1.2,
        }}
      >
        {entry.name}
      </span>

      {/* Award category / year */}
      {entry.category && (
        <span
          className="font-sans font-light uppercase"
          style={{
            fontSize: "7.5px",
            letterSpacing: "0.3em",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          {entry.category}
          {entry.year ? ` · ${entry.year}` : ""}
        </span>
      )}
    </div>
  );
}

// ─── Horizontal separator with diamond ───────────────────────────────────────
function GoldSeparator() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = lineRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.4,
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
  }, []);

  return (
    <div
      ref={lineRef}
      className="flex items-center gap-4 my-16 lg:my-20"
      style={{ opacity: 0, transformOrigin: "center" }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.14))",
        }}
      />
      <svg viewBox="0 0 14 14" fill="none" style={{ width: "10px", flexShrink: 0 }}>
        <path d="M7 1L13 7L7 13L1 7L7 1Z" fill="rgba(212,175,55,0.28)" />
      </svg>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(to left, transparent, rgba(212,175,55,0.14))",
        }}
      />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function AwardsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, start: "top 84%" });
  const subRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 84%", delay: 0.14 });
  const featuredLabelRef = useScrollReveal<HTMLDivElement>({ y: 16, start: "top 88%", delay: 0 });
  const awardsLabelRef = useScrollReveal<HTMLDivElement>({ y: 16, start: "top 88%", delay: 0 });

  return (
    <section
      id="awards"
      className="relative bg-[#08080A] overflow-hidden"
      aria-label="Awards and Recognition"
      style={{
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

      {/* ── Ambient gold bloom — centred ── */}
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,150,46,0.04) 0%, transparent 65%)",
          filter: "blur(120px)",
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
        <div ref={headingRef} className="opacity-0 mb-5">
          <SectionEyebrow index="07" label="Awards & Recognition" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F7F6F3",
            }}
          >
            Recognised by{" "}
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
              the finest.
            </em>
          </h2>
        </div>

        {/* ── Subline ── */}
        <div
          ref={subRef}
          className="opacity-0 mb-16 lg:mb-20"
        >
          <p
            className="font-sans font-light"
            style={{
              fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
              letterSpacing: "0.04em",
              color: "rgba(247,246,243,0.22)",
              maxWidth: "30rem",
              lineHeight: 1.9,
            }}
          >
            Our work has been featured in leading wedding publications and
            recognised by international photography institutions.
          </p>
        </div>

        {/* ── Featured On ── */}
        <div ref={featuredLabelRef} className="opacity-0 mb-10">
          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.38em",
              color: "rgba(247,246,243,0.2)",
            }}
          >
            Featured On
          </span>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
        >
          {FEATURED_ON.map((entry, i) => (
            <LogoWordmark key={entry.id} entry={entry} index={i} size="normal" />
          ))}
        </div>

        {/* ── Divider ── */}
        <GoldSeparator />

        {/* ── Awards ── */}
        <div ref={awardsLabelRef} className="opacity-0 mb-10">
          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.38em",
              color: "rgba(247,246,243,0.2)",
            }}
          >
            Honours & Awards
          </span>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(2.5rem, 4vw, 5rem)" }}
        >
          {AWARD_ENTRIES.map((entry, i) => (
            <LogoWordmark key={entry.id} entry={entry} index={i} size="normal" />
          ))}
        </div>
      </div>
    </section>
  );
}
