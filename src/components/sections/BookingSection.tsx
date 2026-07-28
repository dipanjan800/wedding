"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

const EVENT_TYPES = [
  "Royal Destination Wedding",
  "Grand Heritage Celebration",
  "Intimate Luxury Wedding",
  "Pre-Wedding Couture Story",
  "Multi-Day Celebration",
];

const BUDGET_RANGES = [
  "$15,000 – $30,000",
  "$30,000 – $60,000",
  "$60,000 – $100,000",
  "$100,000+",
];

const SERVICE_OPTIONS = [
  "Fine Art Photography",
  "Cinematic Feature Film",
  "4K HDR Drone Aerials",
  "Pre-Wedding Story Film",
  "Handcrafted Velvet Heirloom Albums",
];

const CONTACT_METHODS = ["WhatsApp", "Email", "Phone Call"];

interface FormData {
  brideName: string;
  groomName: string;
  email: string;
  phone: string;
  weddingDate: string;
  weddingLocation: string;
  eventType: string;
  estimatedBudget: string;
  services: string[];
  contactMethod: string;
  message: string;
}

export default function BookingSection() {
  const [formData, setFormData] = useState<FormData>({
    brideName: "",
    groomName: "",
    email: "",
    phone: "",
    weddingDate: "",
    weddingLocation: "",
    eventType: "",
    estimatedBudget: "",
    services: [],
    contactMethod: "WhatsApp",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const validateForm = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.brideName.trim()) errs.brideName = "Bride's name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.weddingDate.trim()) errs.weddingDate = "Wedding date is required";
    if (!formData.weddingLocation.trim()) errs.weddingLocation = "Wedding location is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Silent rejection if honeypot is filled by bot
    if (honeypot.trim() !== "") return;
    if (!validateForm()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="booking"
      className="relative bg-[#08080A] py-24 md:py-36 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#D4AF37]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-[#B8962E]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <SectionEyebrow title="Bespoke Commission" number="10" />
          <h2
            className="font-serif font-light text-white tracking-tight leading-[1.08] mt-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.8rem)" }}
          >
            Begin Your <span className="italic text-gold-gradient font-normal">Legacy Story</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg mt-6 leading-relaxed max-w-2xl">
            We limit our global commissions to 15 couples annually. Each film and photograph is meticulously crafted with absolute artistic devotion to your heritage.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE — Editorial Content & Status */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F0D697] text-xs font-sans tracking-widest uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Private Commissions 2025/2026
              </span>

              <h3 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-6">
                An Intimate, Uncompromised Cinematic Experience
              </h3>

              <p className="font-sans font-light text-white/55 text-sm md:text-base leading-relaxed mb-8">
                Your wedding isn't just an event; it's a monumental chapter in your family lineage. From Lake Como châteaux to Rajasthan palaces, our team brings discretion, editorial grace, and high-fidelity 4K cinematography to your celebration.
              </p>

              {/* Status Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-3 text-[#D4AF37] mb-1.5">
                    <Calendar className="w-4 h-4" />
                    <span className="font-sans text-xs tracking-wider uppercase text-white/80 font-medium">Availability</span>
                  </div>
                  <p className="font-serif text-lg text-white">4 Dates Remaining</p>
                  <p className="font-sans text-[11px] text-white/40 mt-0.5">2025/2026 Season</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-3 text-[#D4AF37] mb-1.5">
                    <Clock className="w-4 h-4" />
                    <span className="font-sans text-xs tracking-wider uppercase text-white/80 font-medium">Response Time</span>
                  </div>
                  <p className="font-serif text-lg text-white">Within 24 Hours</p>
                  <p className="font-sans text-[11px] text-white/40 mt-0.5">Concierge Review</p>
                </div>
              </div>
            </div>

            {/* Cinematic Image / Illustration Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#14141A] via-[#0F0F13] to-[#08080A] p-8 md:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Gold Filigree Line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-6" />

              <blockquote className="font-serif text-xl md:text-2xl text-white/90 font-light italic leading-snug mb-6">
                “They didn’t just film our wedding — they immortalized the way we looked at each other when no one else was watching.”
              </blockquote>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]">Aarav & Meera</p>
                  <p className="font-sans text-[11px] text-white/40">Lake Palace, Udaipur</p>
                </div>
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                  <ShieldCheck className="w-4 h-4" /> Verified Couple
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Luxury Booking Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl">
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 px-4 space-y-6"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-white font-light">
                      Your Story Has Begun
                    </h3>

                    <p className="font-sans text-white/70 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                      Thank you, <span className="text-[#D4AF37]">{formData.brideName}</span> & <span className="text-[#D4AF37]">{formData.groomName || "your partner"}</span>. Our studio director has received your inquiry and will personally contact you via {formData.contactMethod} within 24 hours.
                    </p>

                    <div className="pt-6 border-t border-white/10 max-w-xs mx-auto">
                      <p className="font-sans text-xs text-white/40 uppercase tracking-widest mb-1">Inquiry Reference</p>
                      <p className="font-mono text-sm text-[#F0D697]">RV-2025-{(Math.random() * 8999 + 1000).toFixed(0)}</p>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/40 pb-0.5"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-white/10 pb-4 mb-6">
                      <h3 className="font-serif text-2xl text-white font-light">Reservation Inquiry</h3>
                      <p className="font-sans text-xs text-white/40 uppercase tracking-widest mt-1">All details strictly confidential</p>
                    </div>

                    {/* Honeypot field — anti-spam bot trap */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website_url_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Row 1: Bride & Groom Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="lux-field">
                        <input
                          type="text"
                          id="brideName"
                          placeholder=" "
                          className="lux-input"
                          value={formData.brideName}
                          aria-invalid={Boolean(errors.brideName)}
                          aria-describedby={errors.brideName ? "brideName-error" : undefined}
                          onChange={(e) => {
                            setFormData({ ...formData, brideName: e.target.value });
                            if (errors.brideName) setErrors((prev) => ({ ...prev, brideName: undefined }));
                          }}
                        />
                        <label htmlFor="brideName" className="lux-label">Bride's Name *</label>
                        {errors.brideName && <span id="brideName-error" className="text-[10px] text-red-400 mt-1 block">{errors.brideName}</span>}
                      </div>

                      <div className="lux-field">
                        <input
                          type="text"
                          id="groomName"
                          placeholder=" "
                          className="lux-input"
                          value={formData.groomName}
                          onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                        />
                        <label htmlFor="groomName" className="lux-label">Groom's Name</label>
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="lux-field">
                        <input
                          type="email"
                          id="email"
                          placeholder=" "
                          className="lux-input"
                          value={formData.email}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                        />
                        <label htmlFor="email" className="lux-label">Email Address *</label>
                        {errors.email && <span id="email-error" className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
                      </div>

                      <div className="lux-field">
                        <input
                          type="tel"
                          id="phone"
                          placeholder=" "
                          className="lux-input"
                          value={formData.phone}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                        />
                        <label htmlFor="phone" className="lux-label">Phone / WhatsApp *</label>
                        {errors.phone && <span id="phone-error" className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Row 3: Wedding Date & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="lux-field">
                        <input
                          type="date"
                          id="weddingDate"
                          placeholder=" "
                          className="lux-input"
                          value={formData.weddingDate}
                          aria-invalid={Boolean(errors.weddingDate)}
                          aria-describedby={errors.weddingDate ? "weddingDate-error" : undefined}
                          onChange={(e) => {
                            setFormData({ ...formData, weddingDate: e.target.value });
                            if (errors.weddingDate) setErrors((prev) => ({ ...prev, weddingDate: undefined }));
                          }}
                        />
                        <label htmlFor="weddingDate" className="lux-label">Wedding Date *</label>
                        {errors.weddingDate && <span id="weddingDate-error" className="text-[10px] text-red-400 mt-1 block">{errors.weddingDate}</span>}
                      </div>

                      <div className="lux-field">
                        <input
                          type="text"
                          id="weddingLocation"
                          placeholder=" "
                          className="lux-input"
                          value={formData.weddingLocation}
                          aria-invalid={Boolean(errors.weddingLocation)}
                          aria-describedby={errors.weddingLocation ? "weddingLocation-error" : undefined}
                          onChange={(e) => {
                            setFormData({ ...formData, weddingLocation: e.target.value });
                            if (errors.weddingLocation) setErrors((prev) => ({ ...prev, weddingLocation: undefined }));
                          }}
                        />
                        <label htmlFor="weddingLocation" className="lux-label">Wedding Location / Venue *</label>
                        {errors.weddingLocation && <span id="weddingLocation-error" className="text-[10px] text-red-400 mt-1 block">{errors.weddingLocation}</span>}
                      </div>
                    </div>

                    {/* Row 4: Event Type & Budget Selects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="lux-field lux-select-wrap">
                        <select
                          id="eventType"
                          className="lux-select"
                          value={formData.eventType}
                          data-empty={!formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        >
                          <option value="" disabled hidden></option>
                          {EVENT_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-[#0F0F13] text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="eventType" className="lux-label">Event Type</label>
                      </div>

                      <div className="lux-field lux-select-wrap">
                        <select
                          id="estimatedBudget"
                          className="lux-select"
                          value={formData.estimatedBudget}
                          data-empty={!formData.estimatedBudget}
                          onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        >
                          <option value="" disabled hidden></option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b} className="bg-[#0F0F13] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="estimatedBudget" className="lux-label">Estimated Budget</label>
                      </div>
                    </div>

                    {/* Row 5: Services Required (Pills) */}
                    <div className="space-y-2 pt-2">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-white/50 block">
                        Services Required
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map((srv) => {
                          const active = formData.services.includes(srv);
                          return (
                            <button
                              type="button"
                              key={srv}
                              onClick={() => handleServiceToggle(srv)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 ${
                                active
                                  ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F0D697]"
                                  : "bg-white/[0.03] border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 6: Preferred Contact Method */}
                    <div className="space-y-2 pt-2">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-white/50 block">
                        Preferred Contact Method
                      </label>
                      <div className="flex items-center gap-6">
                        {CONTACT_METHODS.map((method) => (
                          <label key={method} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method}
                              checked={formData.contactMethod === method}
                              onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                              className="hidden"
                            />
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              formData.contactMethod === method ? "border-[#D4AF37]" : "border-white/20 group-hover:border-white/40"
                            }`}>
                              {formData.contactMethod === method && <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                            </span>
                            <span className="font-sans text-xs text-white/70 group-hover:text-white transition-colors">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Row 7: Message */}
                    <div className="lux-field">
                      <textarea
                        id="message"
                        placeholder=" "
                        className="lux-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      <label htmlFor="message" className="lux-label">Tell Us About Your Vision & Story</label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-[#B8962E] via-[#D4AF37] to-[#F0D697] p-px transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] mt-6"
                    >
                      <div className="w-full py-4 bg-[#08080A] rounded-[7px] flex items-center justify-center gap-3 transition-colors duration-500 group-hover:bg-transparent">
                        <span className="font-sans font-light uppercase tracking-[0.22em] text-xs text-white group-hover:text-[#08080A] transition-colors duration-500 font-medium">
                          {submitting ? "Processing..." : "Begin Your Story"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:text-[#08080A] transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
