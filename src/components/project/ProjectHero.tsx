"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

export default function ProjectHero({ project }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  // ── Entry animation ───────────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image scale-in from 1.1
      tl.fromTo(
        imageRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 2.4, ease: "power2.inOut" },
        0
      );

      // Overlay reveals: starts completely black, fades to cinematic state
      tl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 2.0 },
        0
      );

      // Category label slides up
      tl.fromTo(
        categoryRef.current,
        { opacity: 0, y: 14, letterSpacing: "0.6em" },
        { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 1.0 },
        0.6
      );

      // Couple name — character-by-character feel via blur
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 40, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3 },
        0.75
      );

      // Gold line extends
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power4.out" },
        1.1
      );

      // Meta info fades in
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.2
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Parallax on scroll ────────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const el = heroRef.current;
    const img = imageRef.current;
    if (!el || !img) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
      aria-label={`${project.couple} hero`}
    >
      {/* ── Background ── */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: project.heroGradient,
          transformOrigin: "center 40%",
        }}
      />

      {/* ── Cinematic black entry overlay (animated away) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#08080A", zIndex: 2 }}
      />

      {/* ── Permanent gradient vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,10,1) 0%, rgba(8,8,10,0.6) 35%, rgba(8,8,10,0.15) 68%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Top vignette for nav readability ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,10,0.55) 0%, transparent 28%)",
          zIndex: 1,
        }}
      />

      {/* ── Back link — left side of nav area ── */}
      <div
        className="absolute z-20 px-[clamp(1.5rem,5vw,5rem)]"
        style={{ top: "calc(var(--navbar-h, 5rem) + 1.5rem)" }}
      >
        <Link
          href="/#weddings"
          className="inline-flex items-center gap-3 group focus-visible:outline-none"
          aria-label="Back to all weddings"
        >
          <svg
            viewBox="0 0 20 10"
            fill="none"
            className="w-5 flex-shrink-0"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            <path
              d="M20 5H2M6 2L2 5L6 8"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-sans font-light uppercase group-hover:text-[#D4AF37]"
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "rgba(247,246,243,0.3)",
              transition: "color 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            All Weddings
          </span>
        </Link>
      </div>

      {/* ── Accolade badge ── */}
      {project.accolade && (
        <div
          className="absolute z-20"
          style={{
            top: "calc(var(--navbar-h, 5rem) + 1.5rem)",
            right: "clamp(1.5rem, 5vw, 5rem)",
            padding: "7px 16px",
            background: "rgba(8,8,10,0.5)",
            border: "1px solid rgba(212,175,55,0.25)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "2px",
          }}
        >
          <span
            className="font-sans font-light uppercase text-[#D4AF37]"
            style={{ fontSize: "8px", letterSpacing: "0.26em" }}
          >
            {project.accolade}
          </span>
        </div>
      )}

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[1600px] mx-auto"
        style={{
          zIndex: 3,
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 8vh, 8rem)",
        }}
      >
        {/* Category */}
        <span
          ref={categoryRef}
          className="font-sans font-light uppercase block"
          style={{
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: "rgba(212,175,55,0.55)",
            marginBottom: "1.25rem",
            opacity: 0,
          }}
        >
          {project.category}
        </span>

        {/* Couple name — the centrepiece */}
        <h1
          ref={nameRef}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#F7F6F3",
            marginBottom: "1.5rem",
            opacity: 0,
          }}
        >
          {project.couple}
        </h1>

        {/* Gold rule */}
        <span
          ref={lineRef}
          className="block origin-left"
          style={{
            height: "1px",
            width: "clamp(5rem, 10vw, 9rem)",
            background:
              "linear-gradient(to right, #D4AF37, rgba(212,175,55,0.08))",
            marginBottom: "1.75rem",
          }}
        />

        {/* Location · Date */}
        <div
          ref={metaRef}
          className="flex flex-wrap items-center gap-x-6 gap-y-1"
          style={{ opacity: 0 }}
        >
          <span
            className="font-sans font-light"
            style={{
              fontSize: "12px",
              letterSpacing: "0.14em",
              color: "rgba(247,246,243,0.4)",
              textTransform: "uppercase",
            }}
          >
            {project.location}
          </span>

          {/* Separator dot */}
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(212,175,55,0.3)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />

          <span
            className="font-sans font-light"
            style={{
              fontSize: "10px",
              letterSpacing: "0.24em",
              color: "rgba(212,175,55,0.4)",
              textTransform: "uppercase",
            }}
          >
            {project.date}
          </span>
        </div>
      </div>

      {/* ── Scroll indicator — bottom centre ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ bottom: "2rem", zIndex: 3 }}
      >
        <div
          className="w-px overflow-hidden"
          style={{ height: "52px", background: "rgba(255,255,255,0.07)" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, rgba(212,175,55,0.55))",
              animation: "scrollPulse 2.2s cubic-bezier(0.45,0,0.55,1) infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
