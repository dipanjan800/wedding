"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap-register";

interface HeroVideoScrubberProps {
  videoSrc: string;
}

export default function HeroVideoScrubber({ videoSrc }: HeroVideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    registerGSAP();

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let scrollTriggerInstance: ReturnType<typeof ScrollTrigger.create> | null = null;

    const setup = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Ensure paused — playback is entirely scroll-driven
      video.pause();
      video.currentTime = 0;
      setVideoLoaded(true);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container.parentElement, // the outer 300vh section
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,                        // 1.2s of silky lag for luxury feel
        onUpdate: (self) => {
          const targetTime = self.progress * duration;
          video.currentTime = targetTime;
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      scrollTriggerInstance?.kill();
    };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Fallback: luxury gradient canvas shown until/if video loads */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: videoLoaded ? 0 : 1,
          background: `
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184, 150, 46, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 20% 70%, rgba(59, 12, 22, 0.5) 0%, transparent 55%),
            linear-gradient(160deg, #0d0b14 0%, #08080A 45%, #12080e 100%)
          `,
        }}
      />

      {/* Actual video element */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0 }}
          playsInline
          muted
          preload="auto"
          onError={() => setVideoError(true)}
          onLoadedMetadata={() => {}} // handled in useEffect
          aria-label="Cinematic Indian wedding film"
        >
          <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Subtle bokeh light orbs for fallback beauty */}
      {(!videoLoaded || videoError) && (
        <>
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              top: "20%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "pulse-orb 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              bottom: "30%",
              left: "25%",
              transform: "translate(-50%, 50%)",
              background:
                "radial-gradient(circle, rgba(180, 60, 80, 0.06) 0%, transparent 70%)",
              filter: "blur(80px)",
              animation: "pulse-orb 8s ease-in-out infinite 2s",
            }}
          />
        </>
      )}
    </div>
  );
}
