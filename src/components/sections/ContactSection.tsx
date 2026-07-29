"use client";

import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { STUDIO_CONTACT } from "@/lib/studio-data";
import { MapPin, Phone, Mail, MessageSquare, Compass, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}


export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0F0F13] border-t border-white/[0.06] overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div 
        className="mx-auto max-w-[1600px] relative z-10"
        style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}
      >
        
        {/* Section Header */}
        <div className="max-w-3xl" style={{ marginBottom: "80px" }}>
          <SectionEyebrow title="Studio Headquarters" number="11" />
          <h2
            className="font-serif font-light text-white tracking-tight leading-[1.08] mt-4"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)" }}
          >
            Connect With <span className="italic text-gold-gradient font-normal">Our Atelier</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed" style={{ marginTop: "20px" }}>
            Whether inquiring about dates or scheduling a private penthouse consultation in Delhi, our directors are at your service.
          </p>
        </div>

        {/* Apple-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLS — Contact Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            
            {/* Address */}
            <div className="sm:col-span-2 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[#D4AF37]/30 transition-all duration-500 group" style={{ padding: "32px" }}>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block" style={{ marginBottom: "4px" }}>Main Atelier</span>
              <h3 className="font-serif text-xl text-white font-light" style={{ marginBottom: "8px" }}>Studio Address</h3>
              <p className="font-sans text-sm text-white/60 font-light leading-relaxed">
                {STUDIO_CONTACT.address}
              </p>
            </div>

            {/* Direct Phone & WhatsApp */}
            <a
              href={`tel:${STUDIO_CONTACT.phoneRaw}`}
              className="rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col justify-between"
              style={{ padding: "24px" }}
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block" style={{ marginBottom: "4px" }}>Direct Line</span>
                <h3 className="font-serif text-xl text-white font-light" style={{ marginBottom: "4px" }}>Call Us</h3>
                <p className="font-sans text-sm text-white/70 font-light">{STUDIO_CONTACT.phone}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" style={{ marginTop: "16px" }}>
                <span>Call Studio</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              className="rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col justify-between"
              style={{ padding: "24px" }}
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block" style={{ marginBottom: "4px" }}>Email Inquiry</span>
                <h3 className="font-serif text-xl text-white font-light" style={{ marginBottom: "4px" }}>Write To Us</h3>
                <p className="font-sans text-sm text-white/70 font-light truncate">{STUDIO_CONTACT.email}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" style={{ marginTop: "16px" }}>
                <span>Send Email</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={STUDIO_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col justify-between"
              style={{ padding: "24px" }}
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" style={{ marginBottom: "20px" }}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block" style={{ marginBottom: "4px" }}>Instant Messaging</span>
                <h3 className="font-serif text-xl text-white font-light" style={{ marginBottom: "4px" }}>WhatsApp Concierge</h3>
                <p className="font-sans text-sm text-white/70 font-light">{STUDIO_CONTACT.whatsapp}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" style={{ marginTop: "16px" }}>
                <span>Start Chat</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Socials (Instagram & YouTube) */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between" style={{ padding: "24px" }}>
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block" style={{ marginBottom: "4px" }}>Social Channels</span>
                <h3 className="font-serif text-xl text-white font-light" style={{ marginBottom: "16px" }}>Follow Our Work</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a
                    href={STUDIO_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-[#D4AF37] transition-colors group"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-sans text-xs font-light">{STUDIO_CONTACT.instagram}</span>
                  </a>
                  <a
                    href={STUDIO_CONTACT.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-[#D4AF37] transition-colors group"
                  >
                    <YoutubeIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-sans text-xs font-light">{STUDIO_CONTACT.youtube}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS — Google Maps Luxury Card */}
          <div className="lg:col-span-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden min-h-[400px]" style={{ padding: "32px" }}>
            {/* Header info inside map card */}
            <div className="flex items-center justify-between z-10 relative" style={{ marginBottom: "16px" }}>
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span className="font-sans text-xs uppercase tracking-widest text-white/80">Atelier Coordinates</span>
              </div>
              <span className="font-mono text-xs text-[#F0D697] bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20" style={{ padding: "4px 10px" }}>
                {STUDIO_CONTACT.coordinates}
              </span>
            </div>

            {/* Embedded Luxury Dark Styled Map Placeholder / Iframe */}
            <div className="relative w-full flex-1 rounded-xl overflow-hidden border border-white/10 min-h-[280px]">
              <iframe
                title="Royal Vows Studio Location Map"
                src={STUDIO_CONTACT.googleMapsEmbed}
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-60" />
            </div>

            {/* Footer action inside map card */}
            <div className="flex items-center justify-between z-10 relative" style={{ marginTop: "16px", paddingTop: "8px" }}>
              <span className="font-sans text-xs text-white/50">Taj Palace Enclave, Diplomatic Enclave</span>
              <a
                href="https://maps.google.com/?q=Taj+Palace+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs text-[#D4AF37] hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>Get Directions</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
