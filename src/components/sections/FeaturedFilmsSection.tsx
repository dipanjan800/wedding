"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import FilmCard from "@/components/films/FilmCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FEATURED_FILMS, type FilmEntry } from "@/lib/studio-data";

// Dynamically import the overlay to avoid SSR issues with fixed positioning + GSAP
const FilmPlayerOverlay = dynamic(
  () => import("@/components/films/FilmPlayerOverlay"),
  { ssr: false }
);

export default function FeaturedFilmsSection() {
  const [activeFilm, setActiveFilm] = useState<FilmEntry | null>(null);
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, start: "top 84%" });
  const subRef = useScrollReveal<HTMLDivElement>({ y: 24, start: "top 84%", delay: 0.14 });

  // Layout: hero card (tall) on left, 2 landscape cards stacked on right
  const [heroFilm, ...stackFilms] = FEATURED_FILMS;

  return (
    <>
      <section
        id="films"
        className="relative bg-[#08080A] overflow-hidden"
        aria-label="Featured Films"
        style={{
          paddingTop: "clamp(7rem, 16vh, 18rem)",
          paddingBottom: "clamp(7rem, 16vh, 18rem)",
        }}
      >
        {/* ── Ambient glow ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-5%",
            left: "-8%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(184,150,46,0.05) 0%, transparent 62%)",
            filter: "blur(120px)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0%",
            right: "-6%",
            width: "35vw",
            height: "35vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(184,150,46,0.03) 0%, transparent 65%)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        {/* ── Top separator ── */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(212,175,55,0.14) 25%, rgba(212,175,55,0.14) 75%, transparent)",
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
          {/* ── Heading ── */}
          <div ref={headingRef} className="opacity-0 mb-5">
            <SectionEyebrow index="05" label="Featured Films" />
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "#F7F6F3",
              }}
            >
              Stories told{" "}
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
                in motion.
              </em>
            </h2>
          </div>

          {/* ── Subline ── */}
          <div
            ref={subRef}
            className="opacity-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16 lg:mb-20"
          >
            <p
              className="font-sans font-light"
              style={{
                fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
                letterSpacing: "0.04em",
                color: "rgba(247,246,243,0.22)",
                maxWidth: "30rem",
                lineHeight: 1.9,
              }}
            >
              Each film is a singular cinematic chapter — directed with the same
              deliberate care as a feature, edited to endure far beyond the day.
            </p>

            {/* Play all films CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <span
                className="font-sans font-light uppercase"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.32em",
                  color: "rgba(247,246,243,0.18)",
                }}
              >
                {FEATURED_FILMS.length} films in collection
              </span>
              <span
                style={{
                  display: "block",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.3)",
                }}
              />
              <span
                className="font-sans font-light uppercase"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.32em",
                  color: "rgba(212,175,55,0.35)",
                }}
              >
                Click to play
              </span>
            </div>
          </div>

          {/* ── Editorial 2+stack layout ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{ gap: "clamp(0.75rem, 1.2vw, 1.25rem)" }}
          >
            {/* Hero film — left, taller */}
            <div className="lg:col-span-7">
              <FilmCard
                film={heroFilm}
                variant="hero"
                delay={0}
                onPlay={setActiveFilm}
              />
            </div>

            {/* Stacked films — right */}
            <div
              className="lg:col-span-5 flex flex-col"
              style={{ gap: "clamp(0.75rem, 1.2vw, 1.25rem)" }}
            >
              {stackFilms.slice(0, 2).map((film, i) => (
                <FilmCard
                  key={film.id}
                  film={film}
                  variant="wide"
                  delay={0.12 + i * 0.1}
                  onPlay={setActiveFilm}
                />
              ))}
            </div>
          </div>

          {/* ── View all films CTA ── */}
          <div className="mt-20 flex justify-center">
            <a
              href="/#weddings"
              className="group relative inline-flex items-center gap-5 font-sans font-light"
              style={{ fontSize: "10px", letterSpacing: "0.28em" }}
            >
              <span
                className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
                style={{
                  width: "2rem",
                  background: "linear-gradient(to left, rgba(212,175,55,0.5), transparent)",
                }}
              />
              <span className="uppercase text-[rgba(247,246,243,0.28)] group-hover:text-[#D4AF37] transition-colors duration-500">
                View All Films
              </span>
              <span
                className="h-px block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12"
                style={{
                  width: "2rem",
                  background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)",
                }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── Film player overlay ── */}
      {activeFilm && (
        <FilmPlayerOverlay
          film={activeFilm}
          onClose={() => setActiveFilm(null)}
        />
      )}
    </>
  );
}
