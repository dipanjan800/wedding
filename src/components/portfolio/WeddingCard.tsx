"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { type WeddingProject } from "@/lib/portfolio-data";

interface WeddingCardProps {
  project: WeddingProject;
  /** GSAP stagger delay offset in seconds */
  delay?: number;
  /** Grid variant — affects aspect ratio */
  variant?: "tall" | "wide" | "square";
}

const aspectMap = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-[4/5]",
};

export default function WeddingCard({
  project,
  delay = 0,
  variant = "square",
}: WeddingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);
  const [hovered, setHovered] = useState(false);

  // ── Scroll reveal — clip-path wipe ───────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 56, clipPath: "inset(6% 0% 0% 0% round 20px)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 1.4,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  // ── Hover — precise GSAP orchestration ──────────────────────────────
  const handleEnter = () => {
    setHovered(true);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1.05, duration: 1.1, ease: "power2.out" });
    // Darken the gradient overlay top region slightly on hover (NOT lighten)
    if (overlayRef.current)
      gsap.to(overlayRef.current, { "--overlay-mid": "0.62", duration: 0.6 });
    if (textRef.current)
      gsap.to(textRef.current, { y: -8, duration: 0.7, ease: "power3.out" });
    if (excerptRef.current)
      gsap.to(excerptRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
  };

  const handleLeave = () => {
    setHovered(false);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1, duration: 1.3, ease: "power2.out" });
    if (overlayRef.current)
      gsap.to(overlayRef.current, { "--overlay-mid": "0.5", duration: 0.8 });
    if (textRef.current)
      gsap.to(textRef.current, { y: 0, duration: 0.8, ease: "power2.out" });
    if (excerptRef.current)
      gsap.to(excerptRef.current, { opacity: 0, y: 6, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0"
      style={{ willChange: "transform" }}
    >
      <Link
        href={`/wedding/${project.slug}`}
        className="block relative overflow-hidden focus-visible:outline-none"
        style={{
          borderRadius: "clamp(12px, 1.6vw, 22px)",
          boxShadow:
            "0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label={`View ${project.couple} — ${project.location}`}
      >
        {/* ── Image / Gradient ── */}
        <div className={`relative overflow-hidden ${aspectMap[variant]}`}>
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ background: project.thumbnailGradient, transformOrigin: "center 60%" }}
          />

          {/* ── Layered gradient overlay for depth ── */}
          <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,10,0.97) 0%, rgba(8,8,10,0.55) 38%, rgba(8,8,10,0.08) 65%, transparent 100%)",
            }}
          />

          {/* ── Accolade badge — top left ── */}
          {project.accolade && (
            <div
              className="absolute top-5 left-5 z-10"
              style={{
                padding: "6px 12px",
                background: "rgba(8,8,10,0.55)",
                border: "1px solid rgba(212,175,55,0.28)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "3px",
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

          {/* ── Category — top right ── */}
          <div className="absolute top-5 right-5 z-10">
            <span
              className="font-sans font-light uppercase"
              style={{
                fontSize: "8px",
                letterSpacing: "0.28em",
                color: "rgba(247,246,243,0.35)",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* ── Gold accent line — revealed on hover, scaleX from left ── */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px origin-left"
            style={{
              background:
                "linear-gradient(to right, #D4AF37 0%, rgba(212,175,55,0.3) 70%, transparent 100%)",
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* ── Text Block ── */}
          <div
            ref={textRef}
            className="absolute bottom-0 left-0 right-0 z-10 will-change-transform"
            style={{ padding: "clamp(1.25rem, 2vw, 1.75rem)" }}
          >
            {/* Couple name */}
            <h3
              className="font-serif font-light mb-1.5"
              style={{
                fontSize: "clamp(1.15rem, 1.9vw, 1.65rem)",
                lineHeight: 1.05,
                color: "#F7F6F3",
                letterSpacing: "-0.015em",
              }}
            >
              {project.couple}
            </h3>

            {/* Location */}
            <p
              className="font-sans font-light mb-4"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(247,246,243,0.4)",
                textTransform: "uppercase",
              }}
            >
              {project.location}
            </p>

            {/* Excerpt — pre-positioned below, animates up on hover */}
            <p
              ref={excerptRef}
              className="font-sans font-light mb-4"
              style={{
                fontSize: "11.5px",
                color: "rgba(247,246,243,0.38)",
                letterSpacing: "0.01em",
                lineHeight: 1.7,
                opacity: 0,
                transform: "translateY(6px)",
              }}
            >
              {project.excerpt}
            </p>

            {/* Bottom meta row */}
            <div
              className="flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "12px" }}
            >
              <span
                className="font-sans font-light"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.24em",
                  color: "rgba(212,175,55,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {project.date}
              </span>

              <span
                className="font-sans font-light uppercase flex items-center gap-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.24em",
                  color: hovered ? "rgba(212,175,55,0.9)" : "rgba(247,246,243,0.18)",
                  transition: "color 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                View Story
                <svg
                  viewBox="0 0 16 8"
                  fill="none"
                  className="w-3.5"
                  style={{
                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
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
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
