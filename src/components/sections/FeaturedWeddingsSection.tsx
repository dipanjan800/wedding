"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import WeddingCard from "@/components/portfolio/WeddingCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  PROJECTS,
  type ProjectCategory,
  type WeddingProject,
} from "@/lib/portfolio-data";

// Grid layout variants — staggered editorial aspect ratios
const VARIANTS: Array<"tall" | "wide" | "square"> = [
  "tall", "wide", "square", "tall", "square", "wide",
];

function FeaturedGrid({ projects }: { projects: WeddingProject[] }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.55,
              delay: (i % 3) * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <WeddingCard
              project={project}
              delay={(i % 3) * 0.07}
              variant={VARIANTS[i % VARIANTS.length]}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FeaturedWeddingsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS.filter((p) => p.type === "wedding")
      : PROJECTS.filter(
          (p) =>
            p.type === "wedding" &&
            p.tags.includes(activeCategory as ProjectCategory)
        );

  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, start: "top 84%" });
  const filterRef = useScrollReveal<HTMLDivElement>({ y: 20, start: "top 84%", delay: 0.18 });

  return (
    <section
      id="weddings"
      className="relative bg-[#08080A] overflow-hidden"
      aria-label="Featured Weddings"
      style={{
        paddingTop: "clamp(7rem, 16vh, 18rem)",
        paddingBottom: "clamp(7rem, 16vh, 18rem)",
      }}
    >
      {/* ── Ambient glow — upper right ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-6%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.055) 0%, transparent 62%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* ── Second ambient — lower left, cooler ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          left: "-10%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.025) 0%, transparent 65%)",
          filter: "blur(100px)",
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
        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="opacity-0"
          style={{ marginBottom: "48px" }}
        >
          <SectionEyebrow index="03" label="Featured Weddings" />
          <h2
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F7F6F3",
            }}
          >
            Every wedding,{" "}
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
              a distinct universe.
            </em>
          </h2>
        </div>

        {/* ── Subheading + filter row ── */}
        <div
          ref={filterRef}
          className="opacity-0 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
          style={{ marginBottom: "clamp(4rem, 8vw, 6rem)" }}
        >
          {/* Subheading — editorial lead text */}
          <p
            className="font-sans font-light"
            style={{
              fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
              letterSpacing: "0.04em",
              color: "rgba(247,246,243,0.22)",
              maxWidth: "28rem",
              lineHeight: 1.9,
            }}
          >
            Six couples. Six stories. Each ceremony documented as a singular
            cinematic chapter — unhurried, unscripted, unrepeatable.
          </p>

          {/* Filter */}
          <div className="lg:max-w-lg xl:max-w-xl flex-shrink-0">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        {/* ── Cards grid ── */}
        <FeaturedGrid projects={filteredProjects} />

        {/* ── View All CTA ── */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 flex justify-center"
          >
            <a
              href="/#weddings"
              className="group relative inline-flex items-center gap-5 font-sans font-light"
              style={{ fontSize: "10px", letterSpacing: "0.28em" }}
            >
              {/* Left decorative line */}
              <span
                className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
                style={{
                  width: "2rem",
                  background:
                    "linear-gradient(to left, rgba(212,175,55,0.5), transparent)",
                }}
              />
              <span
                className="uppercase text-[rgba(247,246,243,0.28)] group-hover:text-[#D4AF37] transition-colors duration-500"
              >
                View All Weddings
              </span>
              {/* Right decorative line */}
              <span
                className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
                style={{
                  width: "2rem",
                  background:
                    "linear-gradient(to right, rgba(212,175,55,0.5), transparent)",
                }}
              />
            </a>
          </motion.div>
        )}

        {/* ── Empty state ── */}
        {filteredProjects.length === 0 && (
          <div className="py-32 flex flex-col items-center gap-6">
            <span
              style={{
                display: "block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.3)",
              }}
            />
            <span
              className="font-serif italic"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                color: "rgba(247,246,243,0.15)",
              }}
            >
              No stories in this chapter yet.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
