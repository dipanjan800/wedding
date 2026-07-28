"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

// ─── Individual gallery panel ─────────────────────────────────────────────────
function GalleryPanel({
  gradient,
  aspect,
  delay = 0,
  label,
  overlayStrength = 0,
}: {
  gradient: string;
  aspect: string;
  delay?: number;
  label?: string;
  overlayStrength?: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Clip-path reveal — bottom to top wipe
  useEffect(() => {
    registerGSAP();
    const el = panelRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
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

  // Parallax
  useEffect(() => {
    registerGSAP();
    const img = imgRef.current;
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative overflow-hidden"
      style={{
        aspectRatio: aspect,
        borderRadius: "clamp(10px, 1.4vw, 18px)",
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.035)",
      }}
    >
      {/* Gradient background — oversized for parallax */}
      <div
        ref={imgRef}
        className="absolute will-change-transform"
        style={{
          inset: "-18%",
          background: gradient,
        }}
      />

      {/* Dark overlay for contrast */}
      {overlayStrength > 0 && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(8,8,10,${overlayStrength}) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Label */}
      {label && (
        <div
          className="absolute bottom-5 left-5 z-10"
          style={{
            padding: "4px 10px",
            background: "rgba(8,8,10,0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "1px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "8px",
              letterSpacing: "0.3em",
              color: "rgba(247,246,243,0.45)",
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main gallery ─────────────────────────────────────────────────────────────
export default function ProjectGallery({ project }: Props) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 36, start: "top 86%" });
  const editorialRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 82%", delay: 0.2 });

  const panels = [
    { gradient: project.heroGradient,       aspect: "3/2",   label: "The Ceremony",    delay: 0,    overlayStrength: 0.55 },
    { gradient: project.thumbnailGradient,  aspect: "2/3",   label: "The Couple",      delay: 0.12, overlayStrength: 0.4  },
    { gradient: project.thumbnailGradient,  aspect: "4/5",   label: "Details",         delay: 0,    overlayStrength: 0.45 },
    { gradient: project.heroGradient,       aspect: "1/1",   label: "Portraits",       delay: 0.14, overlayStrength: 0.5  },
    { gradient: project.thumbnailGradient,  aspect: "16/9",  label: "The Celebration", delay: 0,    overlayStrength: 0.5  },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0F0F13",
        paddingTop: "clamp(6rem, 14vh, 14rem)",
        paddingBottom: "clamp(6rem, 14vh, 14rem)",
      }}
      aria-label="Photo Gallery"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.1) 25%, rgba(212,175,55,0.1) 75%, transparent)",
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
        {/* ── Section header ── */}
        <div ref={headingRef} className="opacity-0 mb-16">
          <SectionEyebrow label="The Visual Story" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)",
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              color: "#F7F6F3",
            }}
          >
            Moments{" "}
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
              frozen in light.
            </em>
          </h2>
        </div>

        {/* ── Row 1: Large landscape + tall portrait ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 mb-5 xl:mb-6"
          style={{ gap: "clamp(0.75rem, 1.2vw, 1.25rem)" }}
        >
          <div className="md:col-span-7">
            <GalleryPanel {...panels[0]} />
          </div>
          <div className="md:col-span-5">
            <GalleryPanel {...panels[1]} />
          </div>
        </div>

        {/* ── Row 2: Square + square + editorial text ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 mb-5 xl:mb-6"
          style={{ gap: "clamp(0.75rem, 1.2vw, 1.25rem)" }}
        >
          <div className="md:col-span-4">
            <GalleryPanel {...panels[2]} />
          </div>
          <div className="md:col-span-4">
            <GalleryPanel {...panels[3]} />
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <div
              ref={editorialRef}
              className="opacity-0"
              style={{
                paddingLeft: "clamp(1.5rem, 2.5vw, 2.5rem)",
                borderLeft: "1px solid rgba(212,175,55,0.16)",
              }}
            >
              {/* Micro eyebrow */}
              <span
                className="font-sans font-light uppercase block mb-5"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.34em",
                  color: "rgba(212,175,55,0.35)",
                }}
              >
                Our approach
              </span>

              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)",
                  color: "rgba(247,246,243,0.45)",
                  lineHeight: 1.7,
                  letterSpacing: "-0.005em",
                }}
              >
                Every frame is composed with the same deliberate care as a
                painting — light, emotion, and story woven into a single image.
              </p>

              {/* Gold rule */}
              <div
                className="mt-8"
                style={{
                  width: "2.5rem",
                  height: "1px",
                  background: "rgba(212,175,55,0.25)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Row 3: Full-width ── */}
        <GalleryPanel {...panels[4]} />
      </div>
    </section>
  );
}
