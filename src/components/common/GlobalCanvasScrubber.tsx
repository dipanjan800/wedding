"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap-register";

const FRAME_COUNT = 240;
const FRAME_DIGITS = 6; // e.g., 000001
const FRAME_PREFIX = "/hero-sequence/frame_";
const FRAME_EXTENSION = ".jpg";

const getFramePath = (index: number) => {
  return `${FRAME_PREFIX}${index.toString().padStart(FRAME_DIGITS, "0")}${FRAME_EXTENSION}`;
};

export default function GlobalCanvasScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    registerGSAP();

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Preload all images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
        initAnimation();
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = checkLoaded;
      img.onerror = () => {
        console.error("Failed to load frame", i);
        checkLoaded(); // Still count it so we don't hang
      };
      images.push(img);
    }

    let scrollTriggerInstance: ReturnType<typeof ScrollTrigger.create> | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const renderFrame = (index: number) => {
      if (!canvas || !ctx || !imagesRef.current[index]) return;

      const img = imagesRef.current[index];
      // Skip if image is broken
      if (!img.complete || img.naturalWidth === 0) return;
      
      // Calculate object-cover dimensions
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (relative to height)
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image (relative to width)
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      // Set actual canvas resolution to match pixel density for sharpness
      const dpr = window.devicePixelRatio || 1;
      // We limit to 2 to save performance on 3x/4x mobile screens
      const scale = Math.min(dpr, 2); 
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      // Force redraw the current frame if images are loaded
      if (imagesRef.current.length > 0) {
        const state = gsap.getProperty(container, "--frame-index") as number || 0;
        renderFrame(Math.round(state));
      }
    };

    const initAnimation = () => {
      handleResize(); // Initial sizing and first frame render

      // Create a dummy object to tween
      const sequence = { frame: 0 };

      // We animate the frame property on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body, // The full body scroll!
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Smooth scrubbing
        }
      });

      tl.to(sequence, {
        frame: FRAME_COUNT - 1,
        snap: "frame", // Snap to whole numbers
        ease: "none",
        onUpdate: () => {
          gsap.set(container, { "--frame-index": sequence.frame });
          renderFrame(sequence.frame);
        }
      });
      
      scrollTriggerInstance = tl.scrollTrigger || null;
    };

    // Handle resizes
    resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#08080A] pointer-events-none"
      style={{ zIndex: -10 }}
    >
      {/* Fallback gradient until loaded */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 z-0"
        style={{
          opacity: loaded ? 0 : 1,
          background: `
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184, 150, 46, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 20% 70%, rgba(59, 12, 22, 0.5) 0%, transparent 55%),
            linear-gradient(160deg, #0d0b14 0%, #08080A 45%, #12080e 100%)
          `,
        }}
      />
      
      {/* The Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-10"
        style={{ opacity: loaded ? 1 : 0 }}
        aria-label="Cinematic Indian wedding sequence"
      />
    </div>
  );
}
