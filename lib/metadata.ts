import type { Metadata } from "next";
import { site } from "@/data/site";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      type: "website",
      locale: "en_NP",
      ...(siteUrl ? { url: new URL(path, siteUrl).toString() } : {}),
    },
  };
}
