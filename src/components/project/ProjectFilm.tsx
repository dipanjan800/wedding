"use client";

import { useState, useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

export default function ProjectFilm({ project }: Props) {
  const [playing, setPlaying] = useState(false);
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 36, start: "top 86%" });
  const filmRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  // Reveal animation
  useEffect(() => {
    registerGSAP();
    const el = filmRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, clipPath: "inset(8% 0% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 87%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Play button subtle float animation
  useEffect(() => {
    registerGSAP();
    const btn = playBtnRef.current;
    if (!btn || playing) return;

    const ctx = gsap.context(() => {
      gsap.to(btn, {
        y: -6,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [playing]);

  return (
    <section
      className="relative bg-[#08080A] overflow-hidden"
      style={{
        paddingTop: "clamp(6rem, 14vh, 14rem)",
        paddingBottom: "clamp(6rem, 14vh, 14rem)",
      }}
      aria-label="Wedding Film"
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "-8%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.045) 0%, transparent 68%)",
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
        {/* ── Header ── */}
        <div ref={headingRef} className="opacity-0 mb-14">
          <SectionEyebrow label="The Wedding Film" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)",
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              color: "#F7F6F3",
            }}
          >
            A story told{" "}
            <em
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(110deg, #A0791E, #D4AF37 40%, #F0D697 62%, #D4AF37 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in motion.
            </em>
          </h2>
        </div>

        {/* ── Film player container ── */}
        <div
          ref={filmRef}
          className="relative opacity-0 overflow-hidden"
          style={{
            borderRadius: "clamp(14px, 2.2vw, 28px)",
            aspectRatio: "16 / 9",
            boxShadow:
              "0 50px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.07)",
            background: project.heroGradient,
          }}
        >
          {/* Film grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.18,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
              zIndex: 5,
            }}
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(8,8,10,0.5) 100%)",
              zIndex: 4,
              transition: "opacity 0.8s",
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Center gradient darkening */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,10,0.22) 0%, rgba(8,8,10,0.42) 100%)",
              zIndex: 3,
              transition: "opacity 0.6s",
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Film label — top left */}
          {!playing && (
            <div
              className="absolute z-10"
              style={{ top: "clamp(1rem, 2vw, 1.75rem)", left: "clamp(1rem, 2vw, 1.75rem)" }}
            >
              <span
                className="font-sans font-light uppercase"
                style={{
                  fontSize: "8.5px",
                  letterSpacing: "0.3em",
                  color: "rgba(212,175,55,0.45)",
                }}
              >
                {project.couple}&ensp;·&ensp;Official Film
              </span>
            </div>
          )}

          {/* Duration — bottom right */}
          {!playing && (
            <div
              className="absolute z-10"
              style={{
                bottom: "clamp(1rem, 2vw, 1.75rem)",
                right: "clamp(1rem, 2vw, 1.75rem)",
              }}
            >
              <span
                className="font-sans font-light"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "rgba(247,246,243,0.25)",
                }}
              >
                12 : 34
              </span>
            </div>
          )}

          {/* ── Play button ── */}
          {!playing && (
            <button
              ref={playBtnRef}
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center z-10 group/btn focus-visible:outline-none"
              aria-label="Play wedding film"
            >
              <div style={{ position: "relative" }}>
                {/* Outer pulsing ring */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: "clamp(110px, 12vw, 150px)",
                    height: "clamp(110px, 12vw, 150px)",
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.12)",
                    animation: "pulseRing 3s ease-out infinite",
                    pointerEvents: "none",
                  }}
                />

                {/* Inner button circle */}
                <div
                  className="flex items-center justify-center rounded-full group-hover/btn:scale-105 transition-transform duration-700"
                  style={{
                    width: "clamp(72px, 8vw, 96px)",
                    height: "clamp(72px, 8vw, 96px)",
                    background: "rgba(8,8,10,0.4)",
                    border: "1px solid rgba(212,175,55,0.32)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow:
                      "0 0 60px rgba(212,175,55,0.12), inset 0 0 30px rgba(212,175,55,0.04)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      color: "#D4AF37",
                      width: "clamp(16px, 2vw, 24px)",
                      marginLeft: "3px",
                    }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}

          {/* Playing state */}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <p
                  className="font-serif italic mb-4"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                    color: "rgba(247,246,243,0.4)",
                  }}
                >
                  Wedding film plays here
                </p>
                <p
                  className="font-sans font-light uppercase mb-8"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.32em",
                    color: "rgba(212,175,55,0.3)",
                  }}
                >
                  Replace with real video embed
                </p>
                <button
                  onClick={() => setPlaying(false)}
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    border: "1px solid rgba(212,175,55,0.18)",
                    color: "rgba(212,175,55,0.45)",
                    background: "transparent",
                    cursor: "pointer",
                    padding: "8px 20px",
                    borderRadius: "1px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    textTransform: "uppercase",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <p
          className="mt-7 font-sans font-light text-center"
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: "rgba(247,246,243,0.15)",
            textTransform: "uppercase",
          }}
        >
          Directed &amp; filmed by Royal Vows Cinema
        </p>
      </div>
    </section>
  );
}
