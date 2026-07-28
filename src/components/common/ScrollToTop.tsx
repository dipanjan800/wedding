"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { getLenis } from "@/hooks/useLenis";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 group flex items-center gap-2 p-3 rounded-full bg-[#08080A]/85 border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08080A] hover:scale-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-xs tracking-widest uppercase transition-all duration-500 group-hover:max-w-xs group-hover:pr-2 font-medium">
        Top
      </span>
    </button>
  );
}
