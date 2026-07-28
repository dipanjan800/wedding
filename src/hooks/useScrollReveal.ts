"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap-register";

/**
 * useScrollReveal — attaches a GSAP ScrollTrigger fade+slide reveal
 * to any element. Returns a ref to attach to the target element.
 *
 * @param options.delay     stagger delay in seconds (default 0)
 * @param options.y         vertical travel distance in px (default 48)
 * @param options.duration  animation duration in seconds (default 1.1)
 * @param options.start     ScrollTrigger start position (default "top 82%")
 */
export function useScrollReveal<T extends HTMLElement>(options?: {
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);
  const { delay = 0, y = 48, duration = 1.1, start = "top 82%" } = options ?? {};

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, y, duration, start]);

  return ref;
}

/**
 * useParallax — attaches a subtle GSAP parallax effect to an element.
 * Element moves at `speed` fraction of scroll distance within its trigger.
 *
 * @param speed  0.1 = very subtle, 0.3 = noticeable (default 0.15)
 */
export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * -100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
