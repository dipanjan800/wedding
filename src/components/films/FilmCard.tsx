"use client";

import { useRef, useEffect, useState } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { type FilmEntry } from "@/lib/studio-data";

interface FilmCardProps {
  film: FilmEntry;
  delay?: number;
  /** Layout variant: "hero" = tall 9/16, "wide" = 16/9 landscape */
  variant?: "hero" | "wide";
  onPlay: (film: FilmEntry) => void;
}

export default function FilmCard({
  film,
  delay = 0,
  variant = "wide",
  onPlay,
}: FilmCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // ── Scroll reveal — clip-path wipe ───────────────────────────────────
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
          duration: 1.5,
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

  // ── Play button float yoyo ────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const btn = playRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      gsap.to(btn, {
        y: -5,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    setHovered(true);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1.05, duration: 1.2, ease: "power2.out" });
    if (playRef.current)
      gsap.to(playRef.current, { scale: 1.12, duration: 0.7, ease: "power2.out" });
    if (glowRef.current)
      gsap.to(glowRef.current, { opacity: 1, duration: 0.6 });
  };

  const handleLeave = () => {
    setHovered(false);
    if (imageRef.current)
      gsap.to(imageRef.current, { scale: 1, duration: 1.4, ease: "power2.out" });
    if (playRef.current)
      gsap.to(playRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });
    if (glowRef.current)
      gsap.to(glowRef.current, { opacity: 0, duration: 0.7 });
  };

  const aspect = variant === "hero" ? "aspect-[3/4]" : "aspect-[16/9]";

  return (
    <div
      ref={cardRef}
      className="relative opacity-0 group"
      style={{ willChange: "transform" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Card link wrapper ── */}
      <button
        onClick={() => onPlay(film)}
        className="block w-full focus-visible:outline-none text-left"
        aria-label={`Play ${film.couple} wedding film`}
      >
        <div
          className={`relative overflow-hidden ${aspect}`}
          style={{
            borderRadius: "clamp(12px, 1.6vw, 22px)",
            boxShadow:
              "0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* ── Gradient background ── */}
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ background: film.thumbnailGradient, transformOrigin: "center 55%" }}
          />

          {/* ── Film grain ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.12,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
              zIndex: 2,
            }}
          />

          {/* ── Base gradient overlay ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.3) 45%, transparent 80%)",
              zIndex: 1,
            }}
          />

          {/* ── Hover gold glow ── */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
              zIndex: 1,
              opacity: 0,
            }}
          />

          {/* ── Gold border on hover ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "clamp(12px, 1.6vw, 22px)",
              boxShadow: hovered
                ? "inset 0 0 0 1px rgba(212,175,55,0.22)"
                : "inset 0 0 0 1px transparent",
              transition: "box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
              zIndex: 6,
            }}
          />

          {/* ── Category — top left ── */}
          <div
            className="absolute z-10"
            style={{ top: "clamp(1rem, 1.5vw, 1.25rem)", left: "clamp(1rem, 1.5vw, 1.25rem)" }}
          >
            <span
              className="font-sans font-light uppercase"
              style={{ fontSize: "8px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.45)" }}
            >
              {film.category}
            </span>
          </div>

          {/* ── Duration — top right ── */}
          <div
            className="absolute z-10"
            style={{ top: "clamp(1rem, 1.5vw, 1.25rem)", right: "clamp(1rem, 1.5vw, 1.25rem)" }}
          >
            <span
              className="font-sans font-light"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(247,246,243,0.22)" }}
            >
              {film.duration}
            </span>
          </div>

          {/* ── Play button — centre ── */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div ref={playRef} style={{ position: "relative" }}>
              {/* Outer pulsing ring */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "clamp(80px, 9vw, 110px)",
                  height: "clamp(80px, 9vw, 110px)",
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.1)",
                  animation: "pulseRing 3s ease-out infinite",
                  pointerEvents: "none",
                }}
              />
              {/* Inner glass button */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "clamp(56px, 6.5vw, 78px)",
                  height: "clamp(56px, 6.5vw, 78px)",
                  background: "rgba(8,8,10,0.45)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: hovered
                    ? "0 0 50px rgba(212,175,55,0.18), inset 0 0 20px rgba(212,175,55,0.06)"
                    : "0 0 30px rgba(212,175,55,0.08)",
                  transition: "box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{
                    color: "#D4AF37",
                    width: "clamp(14px, 1.6vw, 20px)",
                    marginLeft: "3px",
                  }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Bottom text block ── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 will-change-transform"
            style={{
              padding: "clamp(1rem, 2vw, 1.5rem)",
              transform: hovered ? "translateY(-5px)" : "translateY(0)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h3
              className="font-serif font-light mb-1"
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.55rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                color: "#F7F6F3",
              }}
            >
              {film.couple}
            </h3>
            <p
              className="font-sans font-light"
              style={{
                fontSize: "9.5px",
                letterSpacing: "0.18em",
                color: "rgba(247,246,243,0.38)",
                textTransform: "uppercase",
              }}
            >
              {film.location}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
