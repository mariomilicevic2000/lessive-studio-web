import { defineRouting } from "next-intl/routing"

export const locales = ["hr", "en", "de", "it"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "hr"

export const localeLabels: Record<Locale, string> = {
  hr: "Hrvatski",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Croatian (default) is served unprefixed at "/" to preserve existing
  // ranking; en/de/it are served at /en, /de, /it.
  localePrefix: "as-needed",
})
