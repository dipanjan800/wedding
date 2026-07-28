"use client";

import { useEffect, useRef } from "react";

let lenisInstance: InstanceType<typeof import("lenis").default> | null = null;

export function useLenis() {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

  useEffect(() => {
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;
      lenisInstance = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        lenisInstance = null;
      }
    };
  }, []);

  return lenisRef;
}

export function getLenis() {
  return lenisInstance;
}
