import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECTS, getProjectBySlug } from "@/lib/portfolio-data";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectStory from "@/components/project/ProjectStory";
import ProjectFilm from "@/components/project/ProjectFilm";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectBehindScenes from "@/components/project/ProjectBehindScenes";
import ProjectClosingQuote from "@/components/project/ProjectClosingQuote";
import RelatedWeddings from "@/components/project/RelatedWeddings";

// ── Static params for SSG ───────────────────────────────────────────────────
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// ── SEO metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.couple} — ${project.location} | Royal Vows Cinema`,
    description: project.excerpt,
    openGraph: {
      title: `${project.couple} — ${project.location}`,
      description: project.excerpt,
      type: "article",
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function WeddingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Related projects: same type, different slug, up to 3
  const related = PROJECTS.filter(
    (p) => p.type === project.type && p.slug !== project.slug
  ).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://royalvowscinema.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Weddings",
        item: "https://royalvowscinema.com/#weddings",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.couple,
        item: `https://royalvowscinema.com/wedding/${project.slug}`,
      },
    ],
  };

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.couple} — ${project.location}`,
    description: project.excerpt,
    locationCreated: project.location,
    dateCreated: project.date,
    creator: {
      "@type": "Organization",
      name: "Royal Vows Cinema",
    },
  };

  return (
    <article aria-label={`${project.couple} — ${project.location}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, creativeWorkJsonLd]),
        }}
      />
      {/* ① Full-screen hero image */}
      <ProjectHero project={project} />

      {/* ② Story introduction */}
      <ProjectStory project={project} />

      {/* ③ Large editorial photo grid */}
      <ProjectGallery project={project} />

      {/* ④ Embedded wedding film placeholder */}
      <ProjectFilm project={project} />

      {/* ⑤ Behind-the-scenes moments */}
      <ProjectBehindScenes project={project} />

      {/* ⑥ Closing quote */}
      <ProjectClosingQuote project={project} />

      {/* ⑦ Related weddings */}
      <RelatedWeddings projects={related} currentType={project.type} />
    </article>
  );
}
