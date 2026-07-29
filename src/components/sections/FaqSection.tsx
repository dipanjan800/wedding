"use client";

import { useState } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { FAQ_ITEMS } from "@/lib/studio-data";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#08080A] border-t border-white/[0.06] overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D4AF37]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div 
        className="mx-auto max-w-[1600px] relative z-10"
        style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}
      >
        
        {/* Section Header */}
        <div className="max-w-3xl" style={{ marginBottom: "96px" }}>
          <SectionEyebrow title="Curated Clarity" number="12" />
          <h2
            className="font-serif font-light text-white tracking-tight leading-[1.08] mt-4"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)" }}
          >
            Frequently Asked <span className="italic text-gold-gradient font-normal">Questions</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed" style={{ marginTop: "20px" }}>
            Everything you need to know about our commissioning process, international travel logistics, heirloom deliverables, and crew scaling.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="max-w-4xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "0 auto" }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-white/[0.03] border-[#D4AF37]/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    : "bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.025]"
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-center cursor-pointer group"
                  style={{ padding: "32px", gap: "24px", justifyContent: "space-between" }}
                >
                  <div className="flex items-center" style={{ gap: "24px" }}>
                    <span className="font-serif text-[#D4AF37] text-lg md:text-xl font-light opacity-60 group-hover:opacity-100 transition-opacity">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-light group-hover:text-[#F0D697] transition-colors duration-300">
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isOpen
                      ? "bg-[#D4AF37] border-[#D4AF37] text-[#08080A] rotate-180"
                      : "border-white/20 text-white/60 group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37]"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* FAQ Body — CSS Grid Smooth Heights */}
                <div className={`faq-body ${isOpen ? "open" : ""}`}>
                  <div className="faq-body-inner" style={{ padding: "0 32px 32px 32px" }}>
                    <div className="border-l border-[#D4AF37]/30" style={{ paddingLeft: "48px" }}>
                      <p className="font-sans font-light text-white/70 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting FAQ Footer note */}
        <div className="text-center max-w-md mx-auto rounded-2xl bg-white/[0.015] border border-white/10 backdrop-blur-md" style={{ margin: "40px auto 0 auto", padding: "24px" }}>
          <HelpCircle className="w-6 h-6 text-[#D4AF37]" style={{ margin: "0 auto 8px auto", display: "block" }} />
          <p className="font-sans text-xs text-white/60 font-light" style={{ marginBottom: "12px" }}>
            Have a custom request or multi-day royal itinerary?
          </p>
          <a
            href="#booking"
            className="font-sans text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/40 pb-0.5"
          >
            Schedule a Private Call with Director
          </a>
        </div>

      </div>
    </section>
  );
}
