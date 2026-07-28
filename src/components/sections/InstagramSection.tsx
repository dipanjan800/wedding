"use client";

import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { INSTAGRAM_POSTS, STUDIO_CONTACT } from "@/lib/studio-data";
import { Heart, MessageCircle, ExternalLink } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}


export default function InstagramSection() {
  return (
    <section
      id="instagram"
      className="relative bg-[#0F0F13] py-24 md:py-36 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient radial lighting */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header with CTA Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <SectionEyebrow title="Editorial Gallery" number="13" />
            <h2
              className="font-serif font-light text-white tracking-tight leading-[1.08] mt-4"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)" }}
            >
              Instagram <span className="italic text-gold-gradient font-normal">Curations</span>
            </h2>
            <p className="font-sans font-light text-white/60 text-base md:text-lg mt-4 leading-relaxed">
              A daily stream of golden hour light, couture bridal moments, and behind-the-lens stories.
            </p>
          </div>

          <a
            href={STUDIO_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/15 hover:border-[#D4AF37]/50 text-white/80 hover:text-[#D4AF37] transition-all duration-500 group text-xs uppercase tracking-widest font-sans font-light"
          >
            <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Follow {STUDIO_CONTACT.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* 6-Grid Square Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={STUDIO_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-cell group rounded-2xl border border-white/10 overflow-hidden relative aspect-square block bg-[#08080A] shadow-xl"
            >
              {/* Gradient Placeholder Image with Subtle Zoom */}
              <div
                className="ig-img absolute inset-0 w-full h-full"
                style={{ background: post.gradient }}
              />

              {/* Fine Art Decorative Grain & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Default Subtle Title & Tag (Visible always) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                  {post.tag}
                </span>
                <p className="font-serif text-lg text-white font-light line-clamp-1">
                  {post.title}
                </p>
              </div>

              {/* Hover Full Reveal Overlay */}
              <div className="ig-overlay absolute inset-0 bg-[rgba(8,8,10,0.85)] backdrop-blur-md p-8 flex flex-col justify-between z-20">
                <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="flex items-center gap-1.5">
                    <InstagramIcon className="w-4 h-4" /> @royalvows.cinema
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>

                <div className="space-y-3">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    {post.tag}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-6 text-xs text-white/70 font-sans font-light pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-[#D4AF37]" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[#D4AF37]" /> {post.comments}
                    </span>
                  </div>
                </div>

                <span className="font-sans text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  View On Instagram →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
