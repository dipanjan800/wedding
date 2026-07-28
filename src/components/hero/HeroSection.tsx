"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";
import ScrollIndicator from "@/components/common/ScrollIndicator";
import { registerGSAP } from "@/lib/gsap-register";

// Dynamic import — prevents SSR issues with GSAP/video
const HeroVideoScrubber = dynamic(() => import("./HeroVideoScrubber"), {
  ssr: false,
});

const VIDEO_SRC = "/video/hero-cinematic.mp4";

// 300vh of scroll travel drives the full video duration
const HERO_SCROLL_HEIGHT = "300vh";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
  }, []);

  return (
    /*
     * Architecture:
     * ├── outer section (300vh) — scroll travel container
     * └── sticky inner (100vh) — locked viewport while scrolling
     *     ├── Video layer (scroll-scrubbed via GSAP)
     *     ├── Cinematic grade overlays (4 layers)
     *     ├── Film grain SVG texture
     *     ├── Hero content (text + CTA, centered)
     *     ├── Bottom edge details
     *     └── Scroll indicator
     */
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: HERO_SCROLL_HEIGHT }}
      aria-label="Cinematic Hero — Royal Vows Cinema"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── 1. Video Layer ── */}
        <HeroVideoScrubber videoSrc={VIDEO_SRC} />

        {/* ── 2. Cinematic Film Grade Overlays ── */}

        {/*
         * [A] Primary luminosity veil — dark canvas centre-weighted.
         * Keeps text legible without fully crushing the image.
         */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 20%, rgba(8,8,10,0.65) 80%, rgba(8,8,10,0.88) 100%)",
          }}
        />

        {/*
         * [B] Bottom-up dark curtain — anchors text and CTA.
         * Heavier than before; the bottom 40% of the frame is near-black.
         */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,10,0.97) 0%, rgba(8,8,10,0.72) 20%, rgba(8,8,10,0.25) 45%, transparent 65%)",
          }}
        />

        {/*
         * [C] Warm amber bloom — top-right corner.
         * Simulates golden-hour palace backlight from the Indian venue.
         * Creates cinematic color temperature split (warm light / cool shadow).
         */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 78% 18%, rgba(200, 145, 40, 0.20) 0%, rgba(180, 120, 20, 0.08) 45%, transparent 70%)",
          }}
        />

        {/*
         * [D] Cool charcoal shadow — bottom-left.
         * Counterbalances the warm bloom; lifts the cinematic grade quality.
         */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 10% 85%, rgba(20, 18, 35, 0.45) 0%, transparent 65%)",
          }}
        />

        {/* ── 3. Film Grain SVG Texture ── */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none mix-blend-soft-light"
          style={{
            opacity: 0.055,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* ── 4. Navbar gold rule (sits below the nav bar) ── */}
        <div
          className="absolute z-[4] pointer-events-none"
          style={{ top: "72px", left: 0, right: 0 }}
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-16">
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(212,175,55,0.18) 30%, rgba(212,175,55,0.18) 70%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ── 5. Hero Content — centered ── */}
        <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center">
          <HeroText />
          <HeroCTA />
        </div>

        {/* ── 6. Bottom Edge — Awards + Location bar ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[10] pointer-events-none">
          {/* Thin divider above bottom bar */}
          <div
            className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-16 mb-5"
          >
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent 100%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-[1600px] px-6 md:px-10 xl:px-16 pb-6 flex items-center justify-between">
            {/* Left — stat */}
            <div className="flex items-baseline gap-2">
              <span
                className="font-serif italic text-[#D4AF37]/50"
                style={{ fontSize: "18px", lineHeight: 1 }}
              >
                14
              </span>
              <span
                className="font-sans font-light uppercase text-white/30"
                style={{ fontSize: "9px", letterSpacing: "0.28em" }}
              >
                / International Awards
              </span>
            </div>

            {/* Centre — scroll indicator */}
            <ScrollIndicator />

            {/* Right — location */}
            <span
              className="font-sans font-light uppercase text-white/30"
              style={{ fontSize: "9px", letterSpacing: "0.28em" }}
            >
              Est. 2016
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
