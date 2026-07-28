"use client";

import { useEffect, useRef, useCallback } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { type FilmEntry } from "@/lib/studio-data";

interface Props {
  film: FilmEntry;
  onClose: () => void;
}

export default function FilmPlayerOverlay({ film, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ── Entry animation ───────────────────────────────────────────────────
  useEffect(() => {
    registerGSAP();
    const overlay = overlayRef.current;
    const player = playerRef.current;
    const closeBtn = closeBtnRef.current;
    if (!overlay || !player || !closeBtn) return;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
      tl.fromTo(
        player,
        { scale: 0.94, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
        0.1
      );
      tl.fromTo(
        closeBtn,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.4
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  // ── Close handler with exit animation ────────────────────────────────
  const handleClose = useCallback(() => {
    registerGSAP();
    const overlay = overlayRef.current;
    const player = playerRef.current;
    if (!overlay || !player) return;

    gsap.to([player], {
      scale: 0.96,
      opacity: 0,
      y: -12,
      duration: 0.4,
      ease: "power2.in",
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.45,
      delay: 0.1,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  // ── ESC key ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(4,4,6,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        opacity: 0,
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${film.couple} Wedding Film`}
    >
      {/* ── Close button ── */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="absolute z-10 flex items-center gap-3 group focus-visible:outline-none"
        style={{
          top: "clamp(1.5rem, 3vh, 2.5rem)",
          right: "clamp(1.5rem, 3vw, 3rem)",
          opacity: 0,
        }}
        aria-label="Close film player"
      >
        <span
          className="font-sans font-light uppercase group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontSize: "9px", letterSpacing: "0.32em", color: "rgba(247,246,243,0.3)" }}
        >
          Close
        </span>
        {/* X icon */}
        <div
          className="flex-shrink-0 relative"
          style={{ width: "28px", height: "28px" }}
        >
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
            style={{
              width: "16px",
              height: "1px",
              background: "rgba(212,175,55,0.45)",
              transform: "translate(-50%,-50%) rotate(45deg)",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
            style={{
              width: "16px",
              height: "1px",
              background: "rgba(212,175,55,0.45)",
              transform: "translate(-50%,-50%) rotate(-45deg)",
            }}
          />
        </div>
      </button>

      {/* ── Player container ── */}
      <div
        ref={playerRef}
        className="relative w-full"
        style={{
          maxWidth: "min(1200px, 92vw)",
          opacity: 0,
        }}
      >
        {/* Film label */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <span
              className="font-sans font-light uppercase block mb-1"
              style={{ fontSize: "8px", letterSpacing: "0.34em", color: "rgba(212,175,55,0.45)" }}
            >
              {film.category}
            </span>
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                letterSpacing: "-0.015em",
                color: "#F7F6F3",
                lineHeight: 1.1,
              }}
            >
              {film.couple}
            </h2>
            <p
              className="font-sans font-light mt-1"
              style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(247,246,243,0.3)", textTransform: "uppercase" }}
            >
              {film.location}&ensp;·&ensp;{film.date}
            </p>
          </div>

          {/* Duration */}
          <span
            className="font-sans font-light flex-shrink-0"
            style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(247,246,243,0.2)" }}
          >
            {film.duration}
          </span>
        </div>

        {/* ── 16/9 video stage ── */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16/9",
            borderRadius: "clamp(12px, 1.8vw, 22px)",
            background: film.heroGradient,
            boxShadow:
              "0 60px 140px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,175,55,0.08)",
          }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.14,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
              zIndex: 2,
            }}
          />

          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 50%, rgba(4,4,6,0.55) 100%)",
              zIndex: 1,
            }}
          />

          {/* Placeholder: "film plays here" */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ padding: "clamp(2rem, 5vw, 4rem)" }}
          >
            <p
              className="font-serif italic mb-3"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                color: "rgba(247,246,243,0.3)",
                textAlign: "center",
                letterSpacing: "-0.01em",
              }}
            >
              Wedding film plays here
            </p>
            <p
              className="font-sans font-light uppercase"
              style={{
                fontSize: "8px",
                letterSpacing: "0.34em",
                color: "rgba(212,175,55,0.25)",
              }}
            >
              Replace with real video embed
            </p>
          </div>

          {/* Aspect corner marks — luxury detail */}
          {[
            { top: "12px", left: "12px", borderTop: "1px solid rgba(212,175,55,0.2)", borderLeft: "1px solid rgba(212,175,55,0.2)" },
            { top: "12px", right: "12px", borderTop: "1px solid rgba(212,175,55,0.2)", borderRight: "1px solid rgba(212,175,55,0.2)" },
            { bottom: "12px", left: "12px", borderBottom: "1px solid rgba(212,175,55,0.2)", borderLeft: "1px solid rgba(212,175,55,0.2)" },
            { bottom: "12px", right: "12px", borderBottom: "1px solid rgba(212,175,55,0.2)", borderRight: "1px solid rgba(212,175,55,0.2)" },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{ ...style, width: "20px", height: "20px", zIndex: 5 }}
            />
          ))}
        </div>

        {/* Excerpt caption */}
        <p
          className="mt-5 font-sans font-light text-center"
          style={{
            fontSize: "10.5px",
            letterSpacing: "0.08em",
            color: "rgba(247,246,243,0.18)",
            lineHeight: 1.8,
          }}
        >
          {film.excerpt}
        </p>
      </div>
    </div>
  );
}
