"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  projects: WeddingProject[];
  currentType: "wedding" | "prewedding";
}

function RelatedCard({ project, index }: { project: WeddingProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    registerGSAP();
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48, clipPath: "inset(8% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          delay: index * 0.12,
          ease: "power4.out",
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
    setHovered(true);
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1.05, duration: 0.9, ease: "power2.out" });
  };
  const handleLeave = () => {
    setHovered(false);
    if (imgRef.current)
      gsap.to(imgRef.current, { scale: 1, duration: 1.1, ease: "power2.out" });
  };

  return (
    <div ref={cardRef} className="group opacity-0">
      <Link
        href={`/wedding/${project.slug}`}
        className="block focus-visible:outline-none"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label={`View ${project.couple} — ${project.location}`}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden mb-5"
          style={{
            aspectRatio: "3/4",
            borderRadius: "clamp(10px, 1.4vw, 18px)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div
            ref={imgRef}
            className="absolute inset-0 will-change-transform"
            style={{ background: project.thumbnailGradient }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,10,0.8) 0%, transparent 55%)",
            }}
          />

          {/* Gold line on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              background: "linear-gradient(to right, #D4AF37, rgba(212,175,55,0.1))",
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
            }}
          />

          {/* Category label */}
          <div className="absolute bottom-5 left-5">
            <span
              className="font-sans font-light uppercase"
              style={{
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(212,175,55,0.5)",
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="px-1">
          <h3
            className="font-serif font-light mb-1 group-hover:text-[#F0D697] transition-colors duration-400"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              color: "#F7F6F3",
              letterSpacing: "-0.01em",
            }}
          >
            {project.couple}
          </h3>
          <p
            className="font-sans font-light"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "rgba(247,246,243,0.3)",
            }}
          >
            {project.location}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function RelatedWeddings({ projects, currentType }: Props) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 32, start: "top 85%" });

  if (projects.length === 0) return null;

  const label = currentType === "wedding" ? "More Weddings" : "More Pre-Wedding Stories";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0F0F13",
        paddingTop: "clamp(5rem, 12vh, 11rem)",
        paddingBottom: "clamp(5rem, 14vh, 14rem)",
      }}
      aria-label={label}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.1) 30%, rgba(212,175,55,0.1) 70%, transparent)",
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
        {/* Header row */}
        <div
          ref={headingRef}
          className="opacity-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <SectionEyebrow label={label} />
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F7F6F3",
              }}
            >
              Continue{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(110deg, #B8962E, #D4AF37 45%, #F0D697 65%, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                exploring.
              </em>
            </h2>
          </div>

          <Link
            href="/#weddings"
            className="group hidden lg:flex items-center gap-4 font-sans font-light uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "rgba(247,246,243,0.35)",
            }}
          >
            <span className="group-hover:text-[#D4AF37] transition-colors duration-400">
              View All
            </span>
            <span
              className="h-px w-8 group-hover:w-16 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background:
                  "linear-gradient(to right, rgba(212,175,55,0.6), transparent)",
              }}
            />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {projects.map((project, i) => (
            <RelatedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile "View All" CTA */}
        <div className="mt-12 flex justify-center lg:hidden">
          <Link
            href="/#weddings"
            className="group flex items-center gap-4 font-sans font-light uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "rgba(247,246,243,0.35)",
            }}
          >
            <span className="group-hover:text-[#D4AF37] transition-colors duration-400">
              View All Weddings
            </span>
            <span
              className="h-px w-8 group-hover:w-16 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background:
                  "linear-gradient(to right, rgba(212,175,55,0.6), transparent)",
              }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
