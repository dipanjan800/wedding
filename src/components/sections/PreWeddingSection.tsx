"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { PRE_WEDDING_PROJECTS, type WeddingProject } from "@/lib/portfolio-data";

// ─── Individual horizontal card ──────────────────────────────────────────────
function PreWeddingCard({
  project,
  index,
}: {
  project: WeddingProject;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Scroll reveal — mask reveal from bottom (not x, avoids overflow)
  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          delay: index * 0.07,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  const handleEnter = () => {
    setHovered(true);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1.06, duration: 1.0, ease: "power2.out" });
    if (overlayRef.current)
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5 });
  };

  const handleLeave = () => {
    setHovered(false);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1, duration: 1.3, ease: "power2.out" });
    if (overlayRef.current)
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.7 });
  };

  return (
    <div
      ref={cardRef}
      className="group flex-shrink-0 opacity-0"
      style={{
        // Sized so ~2.8 cards peek on 1440px → strong scroll affordance
        width: "clamp(260px, 26vw, 360px)",
        willChange: "transform",
      }}
    >
      <Link
        href={`/wedding/${project.slug}`}
        className="block focus-visible:outline-none"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label={`View ${project.couple} — ${project.location}`}
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "clamp(10px, 1.4vw, 16px)",
            aspectRatio: "16 / 10",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
            marginBottom: "clamp(1rem, 2vh, 1.5rem)",
          }}
        >
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ background: project.thumbnailGradient, transformOrigin: "center 55%" }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,10,0.8) 0%, rgba(8,8,10,0.2) 40%, transparent 70%)",
            }}
          />

          {/* Hover overlay — darkens top region */}
          <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,10,0.25) 0%, transparent 50%)",
              opacity: 0,
            }}
          />

          {/* Location — bottom left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span
              className="font-sans font-light uppercase"
              style={{
                fontSize: "8px",
                letterSpacing: "0.28em",
                color: "rgba(247,246,243,0.45)",
              }}
            >
              {project.location}
            </span>
          </div>

          {/* Date — bottom right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span
              className="font-sans font-light uppercase"
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                color: "rgba(212,175,55,0.4)",
              }}
            >
              {project.date}
            </span>
          </div>

          {/* Gold border on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "clamp(10px, 1.4vw, 16px)",
              boxShadow: hovered
                ? "inset 0 0 0 1px rgba(212,175,55,0.3)"
                : "inset 0 0 0 1px transparent",
              transition: "box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        {/* ── Card meta ── */}
        <div style={{ paddingLeft: "2px", paddingRight: "2px" }}>
          <div className="flex items-baseline justify-between mb-2">
            <h3
              className="font-serif font-light"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                color: hovered ? "#F0D697" : "#F7F6F3",
                letterSpacing: "-0.012em",
                transition: "color 0.45s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {project.couple}
            </h3>

            {/* Thin right arrow appears on hover */}
            <svg
              viewBox="0 0 16 8"
              fill="none"
              className="flex-shrink-0"
              style={{
                width: "14px",
                color: "rgba(212,175,55,0.5)",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateX(0)" : "translateX(-6px)",
                transition:
                  "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <path
                d="M0 4H14M11 1L14 4L11 7"
                stroke="currentColor"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Excerpt — single line, clipped */}
          <p
            className="font-sans font-light"
            style={{
              fontSize: "11px",
              letterSpacing: "0.01em",
              color: "rgba(247,246,243,0.28)",
              lineHeight: 1.65,
              // Clamp to 2 lines
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {project.excerpt}
          </p>
        </div>
      </Link>
    </div>
  );
}

// ─── Momentum-based horizontal drag scroll ────────────────────────────────────
function HorizontalTrack() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velX = 0;
    let lastX = 0;
    let rafId: number;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.style.cursor = "grabbing";
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      velX = 0;
      cancelAnimationFrame(rafId);
    };

    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
      // Momentum glide
      const glide = () => {
        velX *= 0.92;
        if (Math.abs(velX) < 0.5) return;
        el.scrollLeft -= velX;
        rafId = requestAnimationFrame(glide);
      };
      rafId = requestAnimationFrame(glide);
    };

    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      velX = x - lastX;
      lastX = x;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="flex no-scrollbar select-none"
      style={{
        gap: "clamp(1rem, 1.8vw, 1.5rem)",
        overflowX: "auto",
        paddingBottom: "clamp(1rem, 2vh, 1.5rem)",
        // Left edge peek padding — aligns first card with section margin
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        scrollSnapType: "x proximity",
      }}
    >
      {PRE_WEDDING_PROJECTS.map((project, i) => (
        <div key={project.id} style={{ scrollSnapAlign: "start" }}>
          <PreWeddingCard project={project} index={i} />
        </div>
      ))}
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = document.querySelector("[data-scroll-track]") as HTMLDivElement;
    const bar = barRef.current;
    if (!track || !bar) return;

    const update = () => {
      const ratio =
        track.scrollLeft / (track.scrollWidth - track.clientWidth) || 0;
      bar.style.transform = `scaleX(${Math.min(ratio, 1)})`;
    };

    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="mt-8 mx-auto"
      style={{
        width: "clamp(4rem, 8vw, 8rem)",
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "1px",
      }}
    >
      <div
        ref={barRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, #B8962E, #D4AF37)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PreWeddingSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, start: "top 84%" });
  const subRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 84%", delay: 0.15 });

  return (
    <section
      id="pre-wedding"
      className="relative overflow-hidden"
      aria-label="Pre-Wedding Stories"
      style={{
        backgroundColor: "#0F0F13",
        paddingTop: "clamp(7rem, 16vh, 18rem)",
        paddingBottom: "clamp(7rem, 16vh, 18rem)",
      }}
    >
      {/* ── Top gold separator ── */}
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
          bottom: "-8%",
          left: "-4%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.04) 0%, transparent 65%)",
          filter: "blur(110px)",
        }}
      />

      {/* ── Constrained header ── */}
      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "1600px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <div
          ref={headingRef}
          className="opacity-0 mb-4"
        >
          <SectionEyebrow index="04" label="Pre-Wedding Stories" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F7F6F3",
            }}
          >
            Before the vows,{" "}
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
              the story begins.
            </em>
          </h2>
        </div>

        {/* Subline + drag hint row */}
        <div
          ref={subRef}
          className="opacity-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
          style={{ marginBottom: "64px" }}
        >
          <p
            className="font-sans font-light"
            style={{
              fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
              letterSpacing: "0.04em",
              color: "rgba(247,246,243,0.2)",
              maxWidth: "26rem",
              lineHeight: 1.9,
            }}
          >
            Intimate sessions captured in extraordinary places — where the
            couple simply exists, and we simply follow.
          </p>

          {/* Drag hint */}
          <div className="hidden lg:flex items-center gap-4">
            <span
              className="font-sans font-light uppercase"
              style={{
                fontSize: "9px",
                letterSpacing: "0.32em",
                color: "rgba(247,246,243,0.18)",
              }}
            >
              Drag to explore
            </span>
            <svg
              viewBox="0 0 40 10"
              fill="none"
              className="w-10"
              style={{ color: "rgba(212,175,55,0.25)" }}
            >
              <path
                d="M0 5H37M32 2L37 5L32 8"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Horizontal scroll track — full-bleed left edge ── */}
      <div
        className="relative z-10"
        style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)" }}
      >
        <div data-scroll-track="">
          <HorizontalTrack />
        </div>
        <div
          style={{
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          <ScrollProgress />
        </div>
      </div>
    </section>
  );
}
