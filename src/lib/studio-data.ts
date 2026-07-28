/**
 * Studio Credibility Data
 * Used by: FeaturedFilmsSection, TestimonialsSection, AwardsSection, StatsSection
 * Replace placeholder gradients / text with real assets when available.
 */

// ─── Featured Films ───────────────────────────────────────────────────────────

export interface FilmEntry {
  id: string;
  slug: string;               // maps to /wedding/[slug] project page
  couple: string;
  location: string;
  date: string;
  duration: string;           // e.g. "12:34"
  category: string;
  excerpt: string;
  thumbnailGradient: string;
  heroGradient: string;
  featured: boolean;
}

export const FEATURED_FILMS: FilmEntry[] = [
  {
    id: "f1",
    slug: "aarav-meera-udaipur",
    couple: "Aarav & Meera",
    location: "Lake Palace, Udaipur",
    date: "February 2024",
    duration: "14:22",
    category: "Royal Wedding",
    excerpt: "A royal lakeside ceremony where ancient tradition met the golden hour of Rajasthan.",
    thumbnailGradient:
      "radial-gradient(ellipse 65% 55% at 60% 35%, rgba(212,175,55,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 20% 75%, rgba(59,12,22,0.5) 0%, transparent 55%), linear-gradient(155deg, #16100a 0%, #0c0a10 50%, #120810 100%)",
    heroGradient:
      "radial-gradient(ellipse 80% 60% at 55% 30%, rgba(212,175,55,0.18) 0%, transparent 60%), linear-gradient(160deg, #18110a 0%, #08080A 60%)",
    featured: true,
  },
  {
    id: "f2",
    slug: "dev-ishaan-delhi",
    couple: "Dev & Ishaan",
    location: "The Leela Palace, New Delhi",
    date: "March 2024",
    duration: "18:05",
    category: "Cinematic Film",
    excerpt: "A celebration of love without boundaries — a new chapter in royal Indian tradition.",
    thumbnailGradient:
      "radial-gradient(ellipse 65% 50% at 58% 32%, rgba(160,80,200,0.13) 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 18% 72%, rgba(30,10,40,0.55) 0%, transparent 55%), linear-gradient(150deg, #0e0a14 0%, #08080A 50%, #0e0810 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 52% 28%, rgba(160,80,200,0.10) 0%, transparent 60%), linear-gradient(160deg, #0e0a14 0%, #08080A 60%)",
    featured: true,
  },
  {
    id: "f3",
    slug: "arjun-kavya-goa",
    couple: "Arjun & Kavya",
    location: "Alila Diwa, Goa",
    date: "January 2024",
    duration: "10:48",
    category: "Destination Wedding",
    excerpt: "Bare feet on white sand. A ceremony at golden dusk on the Konkan coast.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 60% 35%, rgba(40,170,160,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 55% at 15% 70%, rgba(10,25,30,0.55) 0%, transparent 55%), linear-gradient(150deg, #080e10 0%, #08080A 50%, #081010 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 55% 30%, rgba(40,170,160,0.10) 0%, transparent 60%), linear-gradient(160deg, #080e10 0%, #08080A 60%)",
    featured: true,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface TestimonialEntry {
  id: string;
  couple: string;
  location: string;
  date: string;
  rating: number;
  review: string;
  shortReview: string;
  photoGradient: string;
}

export const TESTIMONIALS: TestimonialEntry[] = [
  {
    id: "t1",
    couple: "Aarav & Meera",
    location: "Lake Palace, Udaipur",
    date: "February 2024",
    rating: 5,
    shortReview: "They didn't just photograph our wedding — they documented our souls.",
    review:
      "Every frame from our Udaipur ceremony looked like it belonged in a museum. The team was invisible during the ceremony yet present in every photograph. We have never cried so much watching a film of ourselves.",
    photoGradient:
      "radial-gradient(ellipse 65% 55% at 60% 35%, rgba(212,175,55,0.28) 0%, transparent 55%), linear-gradient(155deg, #16100a 0%, #0c0a10 100%)",
  },
  {
    id: "t2",
    couple: "Rohan & Priya",
    location: "Taj Mahal Palace, Mumbai",
    date: "December 2023",
    rating: 5,
    shortReview: "The most beautiful thing we have ever watched. And we've watched it 47 times.",
    review:
      "We were initially worried about having cameras everywhere. Within an hour we forgot they existed entirely. The film they produced is the most precious thing we own.",
    photoGradient:
      "radial-gradient(ellipse 55% 50% at 65% 40%, rgba(100,130,200,0.18) 0%, transparent 55%), linear-gradient(140deg, #0a0c16 0%, #080810 100%)",
  },
  {
    id: "t3",
    couple: "Vivaan & Myra",
    location: "Sam Sand Dunes, Rajasthan",
    date: "December 2023",
    rating: 5,
    shortReview: "Worth every rupee. Worth every minute. Worth every tear.",
    review:
      "We chose a desert session and they understood light in a way I have never seen before. Every single image was a painting. Our parents still cannot believe these are real photographs from a real day.",
    photoGradient:
      "radial-gradient(ellipse 60% 50% at 55% 38%, rgba(220,160,40,0.22) 0%, transparent 50%), linear-gradient(150deg, #160e05 0%, #0c0805 100%)",
  },
];

// ─── Awards & Recognition ─────────────────────────────────────────────────────

export interface AwardEntry {
  id: string;
  name: string;
  shortName: string;
  category?: string;
  year?: string;
  type: "featured" | "award";
}

export const AWARDS: AwardEntry[] = [
  { id: "a1", name: "WeddingWire",                    shortName: "WeddingWire",  type: "featured" },
  { id: "a2", name: "WedMeGood",                      shortName: "WedMeGood",    type: "featured" },
  { id: "a3", name: "Canvera",                        shortName: "Canvera",      type: "featured" },
  { id: "a4", name: "The Knot",                       shortName: "The Knot",     type: "featured" },
  { id: "a5", name: "Vogue India",                    shortName: "Vogue India",  type: "featured" },
  { id: "a6", name: "Fearless Photographers",         shortName: "Fearless",     type: "award", category: "Top 50 India" },
  { id: "a7", name: "Top Wedding India",              shortName: "Top Wedding",  type: "award", category: "Best Cinematic Film", year: "2024" },
  { id: "a8", name: "International Photography Awards", shortName: "IPA",        type: "award", category: "Wedding Category", year: "2023" },
];

export const FEATURED_ON    = AWARDS.filter((a) => a.type === "featured");
export const AWARD_ENTRIES  = AWARDS.filter((a) => a.type === "award");

// ─── Studio Stats ─────────────────────────────────────────────────────────────

export interface StatEntry {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

export const STUDIO_STATS: StatEntry[] = [
  { id: "s1", value: 500, suffix: "+", label: "Luxury Weddings",     sublabel: "Documented" },
  { id: "s2", value: 10,  suffix: "+", label: "Years of Excellence", sublabel: "Est. 2014" },
  { id: "s3", value: 100, suffix: "%", label: "Client Satisfaction", sublabel: "5-Star Rated" },
  { id: "s4", value: 25,  suffix: "+", label: "Destination Weddings", sublabel: "12 Countries" },
];

// ─── Frequently Asked Questions ───────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How far in advance should we book?",
    answer: "We recommend booking 9 to 12 months in advance, especially for peak wedding seasons (October through March) and destination celebrations. Because we limit our commissions to 15 flagship weddings per year to ensure bespoke artistic attention, dates fill up rapidly.",
  },
  {
    id: "faq-2",
    question: "Do you travel internationally?",
    answer: "Absolutely. Over 40% of our commissions are destination weddings across Lake Como, Paris, Dubai, Bali, Thailand, and Rajasthan. Our core team is fully equipped with global travel visas and specialized logistics handlers to seamlessly shoot anywhere on Earth.",
  },
  {
    id: "faq-3",
    question: "How long until delivery?",
    answer: "Your initial high-resolution Teaser Trailer (60–90 seconds) is delivered within 7 to 10 days post-wedding. The complete heirloom collection — including the Master Feature Film, extended ceremony edits, and fully retouched high-res photographic gallery — is delivered within 8 to 12 weeks via a private encrypted digital portal and a handcrafted physical velvet box.",
  },
  {
    id: "faq-4",
    question: "How many photographers?",
    answer: "Our standard luxury team consists of 4 to 8 senior artisans, including 2 Master Lead Cinematographers, 2 Fine Art Lead Photographers, a dedicated Drone Pilot, and audio/lighting technicians. For grand multi-day royal weddings, we scale up to 12 specialists to ensure every angle is captured without obstruction.",
  },
  {
    id: "faq-5",
    question: "Drone coverage?",
    answer: "Yes, 4K HDR cinema-grade drone aerial coverage is integrated into all our primary wedding and pre-wedding experiences, subject to local aviation regulations and venue airspace permissions. We deploy licensed FAA/DGCA aerial directors.",
  },
  {
    id: "faq-6",
    question: "Payment schedule?",
    answer: "Our payment schedule is structured into three clear stages: a 40% retainer upon contract signing to lock your dates, 40% due 30 days prior to the wedding event, and the final 20% balance upon delivery of your complete digital gallery preview.",
  },
];

// ─── Instagram Showcase ───────────────────────────────────────────────────────

export interface InstagramPost {
  id: string;
  title: string;
  tag: string;
  likes: string;
  comments: string;
  gradient: string;
  aspectRatio?: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    title: "Golden hour in Udaipur",
    tag: "Lake Palace, Rajasthan",
    likes: "2.4k",
    comments: "148",
    gradient: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.3) 0%, rgba(15,15,19,0.95) 75%), linear-gradient(135deg, #2b1f0d, #08080a)",
  },
  {
    id: "ig-2",
    title: "Bridal detail & couture symmetry",
    tag: "The Leela Palace, Delhi",
    likes: "3.8k",
    comments: "210",
    gradient: "radial-gradient(circle at 30% 70%, rgba(240,214,151,0.25) 0%, rgba(15,15,19,0.95) 80%), linear-gradient(135deg, #1c1424, #08080a)",
  },
  {
    id: "ig-3",
    title: "Under the starlit mandates",
    tag: "Jagmandir Island",
    likes: "4.1k",
    comments: "312",
    gradient: "radial-gradient(circle at 50% 50%, rgba(184,150,46,0.3) 0%, rgba(8,8,10,0.98) 75%), linear-gradient(135deg, #121921, #08080a)",
  },
  {
    id: "ig-4",
    title: "Sunset vows along the coast",
    tag: "Alila Diwa, Goa",
    likes: "1.9k",
    comments: "98",
    gradient: "radial-gradient(circle at 60% 40%, rgba(40,170,160,0.25) 0%, rgba(8,8,10,0.95) 75%), linear-gradient(135deg, #091a1e, #08080a)",
  },
  {
    id: "ig-5",
    title: "Royal procession fireworks",
    tag: "Umaid Bhawan, Jodhpur",
    likes: "5.2k",
    comments: "420",
    gradient: "radial-gradient(circle at 40% 60%, rgba(212,175,55,0.35) 0%, rgba(15,15,19,0.95) 80%), linear-gradient(135deg, #231208, #08080a)",
  },
  {
    id: "ig-6",
    title: "Pure emotions captured in silk",
    tag: "Taj Falaknuma, Hyderabad",
    likes: "3.1k",
    comments: "185",
    gradient: "radial-gradient(circle at 75% 25%, rgba(240,214,151,0.28) 0%, rgba(8,8,10,0.95) 75%), linear-gradient(135deg, #1a0f1d, #08080a)",
  },
];

// ─── Contact Details ─────────────────────────────────────────────────────────

export const STUDIO_CONTACT = {
  address: "The Penthouse, Royal Vows Studio, Taj Palace Enclave, New Delhi 110021, India",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  email: "inquire@royalvows.com",
  whatsapp: "+91 98765 43210",
  whatsappUrl: "https://wa.me/919876543210",
  instagram: "@royalvows.cinema",
  instagramUrl: "https://instagram.com/royalvows.cinema",
  youtube: "Royal Vows Cinema",
  youtubeUrl: "https://youtube.com/@royalvows.cinema",
  coordinates: "28.5904° N, 77.1843° E",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.910972412852!2d77.17234!3d28.58988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d7bb372a6eb%3A0x868b44919597793d!2sTaj%20Palace%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

