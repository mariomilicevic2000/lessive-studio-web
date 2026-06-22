import type { MetadataRoute } from "next"
import { locales } from "@/i18n/routing"
import { hreflangMap, localeUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // The hreflang language map shared by every entry (hr/en/de/it + x-default).
  const languages = hreflangMap

  // One homepage entry per locale, each declaring the full set of language
  // alternates so search engines serve the right language per region.
  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "hr" ? 1 : 0.9,
    alternates: { languages },
  }))
}
