"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

const BTS_MOMENTS = [
  {
    label: "Before dawn",
    caption:
      "The team arrives four hours before ceremony to capture the quiet hour — the world still, the couple almost ready.",
    aspect: "3/4",
  },
  {
    label: "Getting ready",
    caption:
      "Bridal preparations — where nervous energy transforms into radiant calm, one pin at a time.",
    aspect: "4/3",
  },
  {
    label: "Unseen moments",
    caption:
      "The tearful father. The laughing cousins. The quiet exchange before the doors open.",
    aspect: "3/4",
  },
  {
    label: "Golden hour",
    caption:
      "Forty minutes when light turns everything cinematic. We are always ready.",
    aspect: "4/3",
  },
];

function BTSCard({
  moment,
  project,
  index,
}: {
  moment: (typeof BTS_MOMENTS)[0];
  project: WeddingProject;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48, clipPath: "inset(6% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          delay: index * 0.1,
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
  }, [index]);

  const handleEnter = () => {
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1.07, duration: 1.0, ease: "power2.out" });
    if (labelRef.current)
      gsap.to(labelRef.current, { color: "#F0D697", duration: 0.4 });
  };

  const handleLeave = () => {
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1, duration: 1.3, ease: "power2.out" });
    if (labelRef.current)
      gsap.to(labelRef.current, { color: "rgba(247,246,243,0.6)", duration: 0.5 });
  };

  return (
    <div
      ref={cardRef}
      className="opacity-0 group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden mb-5"
        style={{
          aspectRatio: moment.aspect,
          borderRadius: "clamp(10px, 1.3vw, 16px)",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          ref={imgRef}
          className="absolute inset-0 will-change-transform"
          style={{ background: project.thumbnailGradient, transformOrigin: "center 55%" }}
        />

        {/* Bottom gradient for label legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,10,0.72) 0%, transparent 55%)",
          }}
        />

        {/* Gold border inset on hover */}
        <div
          className="absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"
          style={{
            borderRadius: "clamp(10px, 1.3vw, 16px)",
            boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.22)",
          }}
        />

        {/* BTS badge + moment number */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "7.5px",
              letterSpacing: "0.34em",
              color: "rgba(212,175,55,0.5)",
              background: "rgba(8,8,10,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "4px 8px",
              borderRadius: "1px",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            {String(index + 1).padStart(2, "0")} / BTS
          </span>
        </div>
      </div>

      {/* Caption block */}
      <div>
        <p
          ref={labelRef}
          className="font-serif italic mb-2"
          style={{
            fontSize: "clamp(1rem, 1.35vw, 1.2rem)",
            color: "rgba(247,246,243,0.6)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {moment.label}
        </p>
        <p
          className="font-sans font-light"
          style={{
            fontSize: "11.5px",
            color: "rgba(247,246,243,0.22)",
            lineHeight: 1.75,
            letterSpacing: "0.01em",
          }}
        >
          {moment.caption}
        </p>
      </div>
    </div>
  );
}

export default function ProjectBehindScenes({ project }: Props) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 36, start: "top 86%" });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0F0F13",
        paddingTop: "clamp(6rem, 14vh, 14rem)",
        paddingBottom: "clamp(6rem, 14vh, 14rem)",
      }}
      aria-label="Behind the Scenes"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.1) 25%, rgba(212,175,55,0.1) 75%, transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-8%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.04) 0%, transparent 68%)",
          filter: "blur(90px)",
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
        <div ref={headingRef} className="opacity-0 mb-16">
          <SectionEyebrow label="Behind the Scenes" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)",
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              color: "#F7F6F3",
            }}
          >
            The craft{" "}
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
              behind the art.
            </em>
          </h2>
        </div>

        {/* ── 2×2 masonry-style grid ── */}
        {/*
          Layout: alternating 3/4 and 4/3 aspects create natural visual rhythm.
          On mobile: single column. On sm: 2 columns matching pairs.
          The alternating tall/wide pattern avoids the "mismatched heights" problem
          by pairing opposites: card[0]=tall + card[1]=wide, card[2]=tall + card[3]=wide.
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          style={{ gap: "clamp(1.25rem, 2vw, 2rem)" }}
        >
          {BTS_MOMENTS.map((moment, i) => (
            <BTSCard key={moment.label} moment={moment} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
