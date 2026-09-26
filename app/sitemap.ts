import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "",
    "/about",
    "/services/engineering-consultancy",
    "/services/construction",
    "/projects",
    "/gallery",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({ url: new URL(path || "/", siteUrl).toString() }));
}
