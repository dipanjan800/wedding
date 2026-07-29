"use client";

import { motion } from "framer-motion";
import { Film, Calendar, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="relative bg-[#08080A] py-32 md:py-48 border-t border-white/[0.08] overflow-hidden flex items-center justify-center min-h-[80vh]"
    >
      {/* Large Cinematic Background Placeholder with Soft Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(212,175,55,0.18) 0%, rgba(15,15,19,0.85) 60%, #08080A 100%), linear-gradient(180deg, #08080A 0%, rgba(12,10,16,0.9) 50%, #08080A 100%)",
        }}
      />

      {/* Subtle Animated Gold Ambient Light Spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/[0.05] rounded-full blur-[180px] pointer-events-none" />


      <div className="mx-auto max-w-5xl px-6 md:px-12 text-center relative z-10 space-y-10">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F0D697] text-xs font-sans tracking-[0.25em] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5" /> The Royal Vows Experience
        </motion.div>

        {/* Breathtaking Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light text-white tracking-tight leading-[1.08]"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
        >
          Every Love Story Deserves To Be <span className="italic text-gold-gradient font-normal block sm:inline">Remembered Forever.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light text-white/60 text-base md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Dates for the upcoming 2025/2026 wedding season are strictly limited. Reserve your consultation today to begin crafting your heirloom collection.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: "24px", marginTop: "40px" }}
        >
          {/* Primary Button — Book Your Wedding */}
          <a
            href="#booking"
            className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-gradient-to-r from-[#B8962E] via-[#D4AF37] to-[#F0D697] p-px transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          >
            <div
              className="w-full bg-[#08080A] rounded-full flex items-center justify-center gap-3 transition-colors duration-500 group-hover:bg-transparent flex-shrink-0"
              style={{ padding: "14px 36px" }}
            >
              <Calendar className="w-4 h-4 text-[#D4AF37] group-hover:text-[#08080A] transition-colors duration-500" />
              <span className="font-sans font-light uppercase tracking-[0.22em] text-xs text-white group-hover:text-[#08080A] transition-colors duration-500 font-medium whitespace-nowrap pl-[0.22em]">
                Book Your Wedding
              </span>
            </div>
          </a>

          {/* Secondary Button — Watch Our Films */}
          <a
            href="#films"
            className="w-full sm:w-auto rounded-full border border-white/20 hover:border-[#D4AF37]/50 bg-white/[0.02] hover:bg-white/[0.06] text-white/80 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 font-sans font-light uppercase tracking-[0.22em] text-xs whitespace-nowrap flex-shrink-0"
            style={{ padding: "14px 36px" }}
          >
            <Film className="w-4 h-4 text-[#D4AF37]" />
            <span className="pl-[0.22em]">Watch Our Films</span>
          </a>
        </motion.div>

        {/* Small Footer Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-t border-white/[0.06] max-w-xs mx-auto text-center"
          style={{ marginTop: "64px", paddingTop: "48px" }}
        >
          <span className="font-serif text-sm tracking-widest uppercase text-white/40">
            Royal Vows Cinema — Est. 2014
          </span>
        </motion.div>

      </div>
    </section>
  );
}
