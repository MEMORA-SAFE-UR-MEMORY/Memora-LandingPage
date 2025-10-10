// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://memora-official.com";
  const now = new Date().toISOString();

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/login", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
