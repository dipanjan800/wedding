/**
 * Wedding & Pre-Wedding Portfolio Data
 * Central data source — all showcase sections consume this.
 * Replace placeholder gradient colours with real image paths when available.
 */

export type ProjectCategory =
  | "All"
  | "Wedding"
  | "Pre Wedding"
  | "Destination"
  | "Royal"
  | "Traditional"
  | "Candid"
  | "Cinematic Films";

export interface WeddingProject {
  id: string;
  slug: string;                  // used for /wedding/[slug] routing
  couple: string;                // e.g. "Aarav & Meera"
  location: string;
  date: string;                  // e.g. "February 2024"
  category: ProjectCategory;
  tags: ProjectCategory[];
  excerpt: string;               // short emotional tagline for card
  story: string;                 // longer narrative for project page
  thumbnailGradient: string;     // CSS gradient fallback (until real images added)
  heroGradient: string;          // hero gradient for project page
  featured: boolean;
  type: "wedding" | "prewedding";
  accolade?: string;             // optional award label
}

export const PROJECTS: WeddingProject[] = [
  // ── FEATURED WEDDINGS ──────────────────────────────────────────
  {
    id: "w1",
    slug: "aarav-meera-udaipur",
    couple: "Aarav & Meera",
    location: "Lake Palace, Udaipur",
    date: "February 2024",
    category: "Royal",
    tags: ["Wedding", "Royal", "Destination"],
    excerpt: "A royal lakeside ceremony where ancient tradition met the golden hour of Rajasthan.",
    story:
      "Amongst the marble corridors of a 400-year-old palace, Aarav and Meera exchanged vows as the sun dissolved into Lake Pichola. Every detail — from the hand-embroidered lehenga to the floating marigold mandap — told a story of heritage, love, and the quiet power of two families becoming one.",
    thumbnailGradient:
      "radial-gradient(ellipse 65% 55% at 60% 35%, rgba(212,175,55,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 20% 75%, rgba(59,12,22,0.5) 0%, transparent 55%), linear-gradient(155deg, #16100a 0%, #0c0a10 50%, #120810 100%)",
    heroGradient:
      "radial-gradient(ellipse 80% 60% at 55% 30%, rgba(212,175,55,0.18) 0%, transparent 60%), linear-gradient(160deg, #18110a 0%, #08080A 60%)",
    featured: true,
    type: "wedding",
    accolade: "Best Destination Wedding 2024",
  },
  {
    id: "w2",
    slug: "rohan-priya-mumbai",
    couple: "Rohan & Priya",
    location: "Taj Mahal Palace, Mumbai",
    date: "December 2023",
    category: "Cinematic Films",
    tags: ["Wedding", "Cinematic Films", "Candid"],
    excerpt: "An intimate rooftop ceremony above the city — where urban grandeur met whispered vows.",
    story:
      "With the Arabian Sea as their witness and the Gateway of India glowing in the distance, Rohan and Priya chose intimacy over spectacle. Their 40-person ceremony became the most emotionally resonant film in our archive.",
    thumbnailGradient:
      "radial-gradient(ellipse 55% 50% at 65% 40%, rgba(100,130,200,0.15) 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 15% 70%, rgba(20,15,35,0.6) 0%, transparent 55%), linear-gradient(140deg, #0a0c16 0%, #080810 50%, #0d0a12 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(100,130,200,0.12) 0%, transparent 60%), linear-gradient(160deg, #0a0c16 0%, #08080A 60%)",
    featured: true,
    type: "wedding",
  },
  {
    id: "w3",
    slug: "vikram-ananya-jaipur",
    couple: "Vikram & Ananya",
    location: "Samode Palace, Jaipur",
    date: "November 2023",
    category: "Traditional",
    tags: ["Wedding", "Traditional", "Royal"],
    excerpt: "Seven sacred rituals. One timeless love story set within painted Mughal archways.",
    story:
      "The Samode Palace's 475-year-old frescoes formed the backdrop for Vikram and Ananya's five-day celebration. Each ceremony was documented as a separate cinematic chapter — from the midnight Haldi to the dawn Pheras.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 55% 30%, rgba(180,90,40,0.18) 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 20% 75%, rgba(60,15,10,0.5) 0%, transparent 55%), linear-gradient(150deg, #14090a 0%, #0c0808 50%, #120a0a 100%)",
    heroGradient:
      "radial-gradient(ellipse 75% 55% at 50% 28%, rgba(180,90,40,0.14) 0%, transparent 60%), linear-gradient(160deg, #14090a 0%, #08080A 60%)",
    featured: true,
    type: "wedding",
    accolade: "Editor's Choice",
  },
  {
    id: "w4",
    slug: "arjun-kavya-goa",
    couple: "Arjun & Kavya",
    location: "Alila Diwa, Goa",
    date: "January 2024",
    category: "Destination",
    tags: ["Wedding", "Destination", "Candid"],
    excerpt: "Bare feet on white sand. Barefoot ceremony at golden dusk on the Konkan coast.",
    story:
      "Arjun and Kavya shed the formality of a traditional wedding and chose the Goan coastline as their sanctuary. The result is our most joyful film — full of laughter, ocean spray, and a ceremony that ended with dancing in the surf.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 60% 35%, rgba(40,170,160,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 55% at 15% 70%, rgba(10,25,30,0.55) 0%, transparent 55%), linear-gradient(150deg, #080e10 0%, #08080A 50%, #081010 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 55% 30%, rgba(40,170,160,0.10) 0%, transparent 60%), linear-gradient(160deg, #080e10 0%, #08080A 60%)",
    featured: true,
    type: "wedding",
  },
  {
    id: "w5",
    slug: "dev-ishaan-delhi",
    couple: "Dev & Ishaan",
    location: "The Leela Palace, New Delhi",
    date: "March 2024",
    category: "Royal",
    tags: ["Wedding", "Royal", "Cinematic Films"],
    excerpt: "A celebration of love without boundaries — a new chapter in royal Indian tradition.",
    story:
      "Dev and Ishaan's wedding was a landmark moment — a love story told with the same reverence and grandeur as any royal ceremony. Three days of rituals, music, and a cinematic film that has been viewed over two million times.",
    thumbnailGradient:
      "radial-gradient(ellipse 65% 50% at 58% 32%, rgba(160,80,200,0.13) 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 18% 72%, rgba(30,10,40,0.55) 0%, transparent 55%), linear-gradient(150deg, #0e0a14 0%, #08080A 50%, #0e0810 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 52% 28%, rgba(160,80,200,0.10) 0%, transparent 60%), linear-gradient(160deg, #0e0a14 0%, #08080A 60%)",
    featured: true,
    type: "wedding",
    accolade: "Most Viewed 2024",
  },
  {
    id: "w6",
    slug: "siddharth-aditi-varanasi",
    couple: "Siddharth & Aditi",
    location: "Ghats of Varanasi",
    date: "October 2023",
    category: "Candid",
    tags: ["Wedding", "Candid", "Cinematic Films"],
    excerpt: "Dawn on the Ganges. A ceremony as ancient as the river itself.",
    story:
      "Varanasi demands a different kind of filmmaking — quiet, observational, reverent. Siddharth and Aditi's sunrise ceremony on the Assi Ghat is the most spiritually profound project in our portfolio.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 52% 38%, rgba(230,160,50,0.18) 0%, transparent 50%), radial-gradient(ellipse 45% 55% at 18% 72%, rgba(50,20,5,0.55) 0%, transparent 55%), linear-gradient(150deg, #160e05 0%, #0c0805 50%, #08080A 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 48% 30%, rgba(230,160,50,0.14) 0%, transparent 60%), linear-gradient(160deg, #160e05 0%, #08080A 60%)",
    featured: false,
    type: "wedding",
  },

  // ── PRE-WEDDING SESSIONS ───────────────────────────────────────
  {
    id: "pw1",
    slug: "pre-kabir-zara-paris",
    couple: "Kabir & Zara",
    location: "Paris, France",
    date: "September 2023",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Destination"],
    excerpt: "Dawn beneath the Eiffel Tower. Fog, silence, and the first touch of gold light.",
    story:
      "We arrived at 5am to find the city still asleep. Kabir and Zara moved through an empty Paris like they owned it — which, for that hour, they did.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 55% 35%, rgba(180,200,230,0.12) 0%, transparent 55%), linear-gradient(150deg, #0a0c12 0%, #08080A 60%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(180,200,230,0.10) 0%, transparent 60%), linear-gradient(160deg, #0a0c12 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
  {
    id: "pw2",
    slug: "pre-neil-tara-kerala",
    couple: "Neil & Tara",
    location: "Backwaters, Kerala",
    date: "August 2023",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Candid"],
    excerpt: "Drifting through emerald backwaters at the hour when mist meets water.",
    story:
      "A houseboat drifting through Alleppey's labyrinth of waterways — Neil and Tara reading, laughing, and simply being together as the backwaters turned gold.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40,160,80,0.12) 0%, transparent 55%), linear-gradient(150deg, #080e0a 0%, #08080A 60%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 48% 32%, rgba(40,160,80,0.09) 0%, transparent 60%), linear-gradient(160deg, #080e0a 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
  {
    id: "pw3",
    slug: "pre-rishi-simran-scotland",
    couple: "Rishi & Simran",
    location: "Scottish Highlands",
    date: "July 2023",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Destination"],
    excerpt: "Ancient moorland, steel skies, and two people completely present with each other.",
    story:
      "The Highlands offered the kind of drama no studio could manufacture. Rishi and Simran wrapped in tartan against a Scottish winter — their warmth made the cold irrelevant.",
    thumbnailGradient:
      "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(140,160,180,0.12) 0%, transparent 55%), linear-gradient(150deg, #0a0c10 0%, #08080A 60%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(140,160,180,0.09) 0%, transparent 60%), linear-gradient(160deg, #0a0c10 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
  {
    id: "pw4",
    slug: "pre-vivaan-myra-rajasthan",
    couple: "Vivaan & Myra",
    location: "Sam Sand Dunes, Rajasthan",
    date: "December 2023",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Destination"],
    excerpt: "Silhouettes against an infinite horizon as the desert swallowed the sun.",
    story:
      "Forty minutes of perfect golden hour light on the Thar Desert. Vivaan and Myra barely spoke — they didn't need to. The silence said everything.",
    thumbnailGradient:
      "radial-gradient(ellipse 60% 50% at 55% 38%, rgba(220,160,40,0.18) 0%, transparent 50%), linear-gradient(150deg, #160e05 0%, #0c0805 60%, #08080A 100%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 52% 30%, rgba(220,160,40,0.14) 0%, transparent 60%), linear-gradient(160deg, #160e05 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
  {
    id: "pw5",
    slug: "pre-aditya-rhea-amsterdam",
    couple: "Aditya & Rhea",
    location: "Amsterdam Canals",
    date: "April 2024",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Destination"],
    excerpt: "Spring tulips, canal reflections, and a love story told in soft northern light.",
    story:
      "Amsterdam in April is a city in bloom. Aditya and Rhea cycled through Vondelpark at sunrise and stood on canal bridges as the city woke around them.",
    thumbnailGradient:
      "radial-gradient(ellipse 55% 50% at 52% 38%, rgba(200,170,230,0.12) 0%, transparent 55%), linear-gradient(150deg, #0c0a12 0%, #08080A 60%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(200,170,230,0.09) 0%, transparent 60%), linear-gradient(160deg, #0c0a12 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
  {
    id: "pw6",
    slug: "pre-karan-isha-mahabaleshwar",
    couple: "Karan & Isha",
    location: "Mahabaleshwar, Maharashtra",
    date: "June 2023",
    category: "Pre Wedding",
    tags: ["Pre Wedding", "Candid"],
    excerpt: "Monsoon mist rolling over the Sahyadri hills — romance in its most raw form.",
    story:
      "They wanted rain. We delivered an entire monsoon. Karan and Isha ran through strawberry fields while the Western Ghats disappeared into low cloud — the most alive we've ever seen two people.",
    thumbnailGradient:
      "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(60,140,80,0.13) 0%, transparent 55%), linear-gradient(150deg, #080e08 0%, #08080A 60%)",
    heroGradient:
      "radial-gradient(ellipse 70% 55% at 48% 32%, rgba(60,140,80,0.10) 0%, transparent 60%), linear-gradient(160deg, #080e08 0%, #08080A 60%)",
    featured: true,
    type: "prewedding",
  },
];

export const FEATURED_WEDDINGS = PROJECTS.filter(
  (p) => p.type === "wedding" && p.featured
);

export const PRE_WEDDING_PROJECTS = PROJECTS.filter(
  (p) => p.type === "prewedding"
);

export const ALL_CATEGORIES: ProjectCategory[] = [
  "All",
  "Wedding",
  "Pre Wedding",
  "Destination",
  "Royal",
  "Traditional",
  "Candid",
  "Cinematic Films",
];

export function getProjectBySlug(slug: string): WeddingProject | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
