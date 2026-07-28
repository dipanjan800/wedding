import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royalvowscinema.com";

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/wedding/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
