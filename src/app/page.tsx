import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SignatureExperienceSection from "@/components/sections/SignatureExperienceSection";
import FeaturedWeddingsSection from "@/components/sections/FeaturedWeddingsSection";
import PreWeddingSection from "@/components/sections/PreWeddingSection";
import FeaturedFilmsSection from "@/components/sections/FeaturedFilmsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import StatsSection from "@/components/sections/StatsSection";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";
import InstagramSection from "@/components/sections/InstagramSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      {/* ─── §01: Hero — Scroll-Controlled Cinematic Video ─── */}
      <HeroSection />

      {/* ─── §02: About the Studio ─── */}
      <AboutSection />

      {/* ─── §03: Signature Experience ─── */}
      <SignatureExperienceSection />

      {/* ─── §04: Featured Weddings ─── */}
      <FeaturedWeddingsSection />

      {/* ─── §05: Pre-Wedding Stories ─── */}
      <PreWeddingSection />

      {/* ─── §06: Featured Films ─── */}
      <FeaturedFilmsSection />

      {/* ─── §07: Client Testimonials ─── */}
      <TestimonialsSection />

      {/* ─── §08: Awards & Recognition ─── */}
      <AwardsSection />

      {/* ─── §09: Trusted By / Studio Stats ─── */}
      <StatsSection />

      {/* ─── §10: Luxury Booking Experience ─── */}
      <BookingSection />

      {/* ─── §11: Contact Information ─── */}
      <ContactSection />

      {/* ─── §12: Frequently Asked Questions ─── */}
      <FaqSection />

      {/* ─── §13: Instagram Showcase ─── */}
      <InstagramSection />

      {/* ─── §14: Final Call To Action ─── */}
      <CtaSection />
    </>
  );
}

