"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap-register";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { type WeddingProject } from "@/lib/portfolio-data";

interface Props {
  project: WeddingProject;
}

export default function ProjectStory({ project }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 87%", toggleActions: "play none none none" },
        }
      );

      // Pull quote — word-level stagger feel via blur
      gsap.fromTo(
        pullQuoteRef.current,
        { opacity: 0, y: 36, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, delay: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: pullQuoteRef.current, start: "top 87%", toggleActions: "play none none none" },
        }
      );

      // Decorative rule extends
      gsap.fromTo(
        ruleRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1, duration: 1.2, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: ruleRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      // Body content
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1.2, delay: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: bodyRef.current, start: "top 84%", toggleActions: "play none none none" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#08080A] overflow-hidden"
      aria-label="Story"
      style={{
        paddingTop: "clamp(6rem, 14vh, 14rem)",
        paddingBottom: "clamp(6rem, 14vh, 14rem)",
      }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "-6%",
          width: "38vw",
          height: "38vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.045) 0%, transparent 68%)",
          filter: "blur(90px)",
          zIndex: 0,
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
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start"
          style={{ gap: "clamp(3rem, 6vw, 7rem)" }}
        >
          {/* ── Left — pull quote ── */}
          <div className="lg:col-span-5">
            <div ref={eyebrowRef} className="opacity-0 mb-8">
              <SectionEyebrow label="The Story" />
            </div>

            <h2
              ref={pullQuoteRef}
              className="font-serif font-light opacity-0"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.9rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "rgba(247,246,243,0.9)",
                fontStyle: "italic",
              }}
            >
              &ldquo;{project.excerpt}&rdquo;
            </h2>

            {/* Vertical gold rule — decorative breathing element */}
            <div
              ref={ruleRef}
              className="mt-10 hidden lg:block opacity-100"
              style={{
                width: "1px",
                height: "clamp(5rem, 9vh, 8rem)",
                background:
                  "linear-gradient(to bottom, rgba(212,175,55,0.35), transparent)",
              }}
            />
          </div>

          {/* ── Right — full narrative ── */}
          <div ref={bodyRef} className="lg:col-span-7 opacity-0">
            {/* Tag pills */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans font-light uppercase"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.28em",
                    color: "rgba(212,175,55,0.6)",
                    border: "1px solid rgba(212,175,55,0.16)",
                    background: "rgba(212,175,55,0.04)",
                    padding: "5px 13px",
                    borderRadius: "1px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Prose body */}
            <p
              className="prose-luxury"
              style={{
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.95,
              }}
            >
              {project.story}
            </p>

            {/* Stats table */}
            <div
              className="mt-14 pt-10 grid grid-cols-3 gap-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
            >
              {[
                { label: "Location", value: project.location },
                { label: "Date", value: project.date },
                { label: "Category", value: project.category },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    className="font-sans font-light uppercase block mb-2"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.34em",
                      color: "rgba(247,246,243,0.2)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                      color: "rgba(247,246,243,0.7)",
                      fontWeight: 300,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
