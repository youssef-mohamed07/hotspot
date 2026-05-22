import type { MetadataRoute } from "next";
import { audiences } from "@/i18n/audience";
import { locales, localizedPath } from "@/i18n/config";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    audiences.map((audience) => ({
      url: getSiteUrl(localizedPath(locale, audience)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "en" && audience === "b2b" ? 1 : 0.85,
      alternates: {
        languages: {
          en: getSiteUrl(localizedPath("en", audience)),
          ar: getSiteUrl(localizedPath("ar", audience)),
        },
      },
    }))
  );
}
