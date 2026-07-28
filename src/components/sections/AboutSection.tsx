"use client";

import { useRef, useEffect } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal, useParallax } from "@/hooks/useScrollReveal";
import { registerGSAP, gsap } from "@/lib/gsap-register";

// ─── Manifesto lines — each animates in individually ───────────────────────
const MANIFESTO = [
  {
    em: false,
    text: "Every wedding is singular.",
  },
  {
    em: true,
    text: "Every couple carries a story only they can tell.",
  },
  {
    em: false,
    text: "We don't simply record moments — we distil them into cinema.",
  },
  {
    em: false,
    text: "Timeless frames. Real emotion. Crafted with obsessive care.",
  },
];

// ─── Signature stats ────────────────────────────────────────────────────────
const STATS = [
  { value: "600+", label: "Weddings Filmed" },
  { value: "14",   label: "International Awards" },
  { value: "22",   label: "Destinations" },
];

// ─── AnimatedManifesto — GSAP staggered line reveal ─────────────────────────
function AnimatedManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".manifesto-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-5">
      {MANIFESTO.map((line, i) => (
        <p
          key={i}
          className="manifesto-line opacity-0"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.2rem, 2vw, 1.75rem)",
            lineHeight: 1.4,
            fontStyle: line.em ? "italic" : "normal",
            fontWeight: line.em ? 400 : 300,
            color: line.em ? "rgba(240,214,151,0.85)" : "rgba(247,246,243,0.6)",
            letterSpacing: line.em ? "-0.01em" : "0.005em",
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

// ─── Stats row ───────────────────────────────────────────────────────────────
function StatsRow() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 85%" });

  return (
    <div
      ref={ref}
      className="opacity-0 flex items-start gap-10 pt-10 border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      {STATS.map(({ value, label }) => (
        <div key={label} className="flex flex-col gap-1">
          <span
            className="font-serif italic"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "#D4AF37",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              color: "rgba(247,246,243,0.35)",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Image / Visual Placeholder ──────────────────────────────────────────────
function AboutVisual() {
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useParallax<HTMLDivElement>(0.12);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clip-path reveal on scroll — wipes up from bottom
  useEffect(() => {
    registerGSAP();
    const el = maskRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Subtle magnetic hover tilt
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      gsap.to(el, {
        rotateY: dx * 4,
        rotateX: -dy * 4,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ willChange: "transform" }}
    >
      {/* Reveal mask */}
      <div
        ref={maskRef}
        className="relative overflow-hidden"
        style={{
          borderRadius: "clamp(12px, 2vw, 24px)",
          clipPath: "inset(100% 0% 0% 0%)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08)",
          aspectRatio: "4 / 5",
        }}
      >
        {/* Parallax image wrapper */}
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{ top: "-15%", bottom: "-15%", height: "130%" }}
        >
          {/* Premium image placeholder — atmospheric gradient */}
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 60% 30%, rgba(212,175,55,0.13) 0%, transparent 55%),
                radial-gradient(ellipse 50% 60% at 25% 80%, rgba(59,12,22,0.45) 0%, transparent 55%),
                linear-gradient(155deg, #14100e 0%, #0c0a12 40%, #110810 75%, #08080A 100%)
              `,
            }}
          />

          {/* Decorative mandala/geometric overlay — gives Indian heritage feel */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0.06 }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-3/4 h-3/4"
              fill="none"
              aria-hidden="true"
            >
              {/* Concentric circles — sacred geometry */}
              {[180, 150, 120, 90, 60, 30].map((r) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  stroke="#D4AF37"
                  strokeWidth="0.6"
                />
              ))}
              {/* Radial lines — 12 divisions */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                return (
                  <line
                    key={i}
                    x1={200 + 30 * Math.cos(angle)}
                    y1={200 + 30 * Math.sin(angle)}
                    x2={200 + 180 * Math.cos(angle)}
                    y2={200 + 180 * Math.sin(angle)}
                    stroke="#D4AF37"
                    strokeWidth="0.4"
                  />
                );
              })}
              {/* Diamond at center */}
              <polygon
                points="200,182 218,200 200,218 182,200"
                stroke="#D4AF37"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          </div>

          {/* Caption overlay at bottom of image */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,10,0.8) 0%, transparent 100%)",
            }}
          >
            <span
              className="font-sans font-light uppercase text-white/30"
              style={{ fontSize: "9px", letterSpacing: "0.3em" }}
            >
              Place your signature image here
            </span>
            <span
              className="font-serif italic text-[#D4AF37]/40"
              style={{ fontSize: "11px" }}
            >
              ©Royal Vows
            </span>
          </div>
        </div>
      </div>

      {/* Gold accent frame — offset decorative border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          borderRadius: "clamp(12px, 2vw, 24px)",
          border: "1px solid rgba(212,175,55,0.12)",
          transform: "translate(12px, 12px)",
          zIndex: -1,
        }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  const headingRef = useScrollReveal<HTMLHeadingElement>({ y: 40, start: "top 80%" });
  const textColRef = useScrollReveal<HTMLDivElement>({ y: 0, start: "top 75%" });

  return (
    <section
      id="about"
      className="relative bg-[#08080A] overflow-hidden"
      aria-label="About the Studio"
      style={{ paddingTop: "clamp(6rem, 14vh, 16rem)", paddingBottom: "clamp(6rem, 14vh, 16rem)" }}
    >
      {/* Subtle ambient warm bloom — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.055) 0%, transparent 70%)",
          filter: "blur(80px)",
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
        {/*
         * Asymmetric editorial grid:
         * ┌─────────────────────────────────────┐
         * │  Text col (5 cols)  │ Image col (6) │
         * └─────────────────────────────────────┘
         * On mobile: stacks vertically (image first for visual impact)
         */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text Column ── */}
          <div
            ref={textColRef}
            className="opacity-0 lg:col-span-5 flex flex-col order-2 lg:order-1"
          >
            <SectionEyebrow index="01" label="About the Studio" />

            {/* Section heading */}
            <h2
              ref={headingRef}
              className="opacity-0 font-serif font-light mb-10"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#F7F6F3",
              }}
            >
              We craft{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background:
                    "linear-gradient(110deg, #B8962E, #D4AF37 40%, #F0D697 65%, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cinematic memories
              </em>
              , not merely photographs.
            </h2>

            {/* Manifesto */}
            <AnimatedManifesto />

            {/* Stats */}
            <StatsRow />
          </div>

          {/* ── RIGHT: Visual Column ── */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <AboutVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
