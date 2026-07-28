"use client";

import { useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

export default function ProjectClosingQuote({ project }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const lineLeftRef = useRef<HTMLSpanElement>(null);
  const lineRightRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Lines extend symmetrically
      tl.fromTo(
        lineLeftRef.current,
        { scaleX: 0, transformOrigin: "right" },
        { scaleX: 1, duration: 1.4 },
        0
      );
      tl.fromTo(
        lineRightRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.4 },
        0
      );

      // Quote mark — rises and fades in
      tl.fromTo(
        markRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0 },
        0.25
      );

      // Quote — slow blur-to-clear reveal
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 36, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
        0.45
      );

      // Attribution
      tl.fromTo(
        attributionRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#08080A] overflow-hidden"
      style={{
        paddingTop: "clamp(6rem, 16vh, 16rem)",
        paddingBottom: "clamp(6rem, 16vh, 16rem)",
      }}
      aria-label="Closing Quote"
    >
      {/* ── Centred ambient gold bloom ── */}
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,150,46,0.06) 0%, transparent 65%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto text-center"
        style={{
          maxWidth: "1100px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* ── Decorative rule row ── */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <span
            ref={lineLeftRef}
            className="h-px"
            style={{
              width: "clamp(4rem, 10vw, 10rem)",
              background:
                "linear-gradient(to left, rgba(212,175,55,0.4), transparent)",
            }}
          />
          <span
            ref={markRef}
            className="font-serif opacity-0"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
              lineHeight: 0.9,
              color: "rgba(212,175,55,0.18)",
              fontStyle: "italic",
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>
          <span
            ref={lineRightRef}
            className="h-px"
            style={{
              width: "clamp(4rem, 10vw, 10rem)",
              background:
                "linear-gradient(to right, rgba(212,175,55,0.4), transparent)",
            }}
          />
        </div>

        {/* ── Quote ── */}
        <blockquote
          ref={quoteRef}
          className="font-serif font-light opacity-0 mb-14"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 3.2rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            color: "rgba(247,246,243,0.88)",
            fontStyle: "italic",
          }}
        >
          {project.excerpt}
        </blockquote>

        {/* ── Attribution ── */}
        <div
          ref={attributionRef}
          className="flex flex-col items-center gap-4 opacity-0"
        >
          {/* Ornamental diamond */}
          <svg viewBox="0 0 12 12" fill="none" style={{ width: "10px" }}>
            <path
              d="M6 1L11 6L6 11L1 6L6 1Z"
              fill="rgba(212,175,55,0.3)"
            />
          </svg>

          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "9.5px",
              letterSpacing: "0.35em",
              color: "rgba(247,246,243,0.22)",
            }}
          >
            {project.couple}&ensp;—&ensp;{project.location}
          </span>

          <span
            className="font-sans font-light uppercase"
            style={{
              fontSize: "8.5px",
              letterSpacing: "0.3em",
              color: "rgba(212,175,55,0.3)",
            }}
          >
            {project.date}
          </span>
        </div>
      </div>
    </section>
  );
}
