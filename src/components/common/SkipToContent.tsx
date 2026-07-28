"use client";

/**
 * WCAG 2.2 AA compliant Skip-to-Content link for keyboard & screen reader accessibility.
 * Visually hidden until focused by Tab navigation.
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#08080A] focus:text-[#D4AF37] focus:border focus:border-[#D4AF37] focus:rounded-full focus:shadow-2xl font-sans text-xs uppercase tracking-widest transition-all outline-none"
    >
      Skip to main content
    </a>
  );
}
