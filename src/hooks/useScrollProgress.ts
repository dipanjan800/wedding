"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function useElementScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const start = -rect.height;
      const end = window.innerHeight;
      const range = end - start;
      const current = -rect.top - start;
      setProgress(Math.max(0, Math.min(1, current / range)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}
