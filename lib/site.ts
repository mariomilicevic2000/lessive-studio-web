// Single source of truth for business identity (NAP), geography and the
// keyword surface used across metadata and structured data. Keeping it here
// means the site's name/address/phone stay consistent everywhere search
// engines and humans read them — which is exactly what local SEO rewards.

export const siteConfig = {
  url: "https://lessive-tugare.hr",
  name: "Lessive Studio Tugare",
  legalName: "Lessive Studio Tugare",
  shortName: "Lessive Studio",
  // ~155 char meta description, keyword-dense but readable.
  description:
    "Industrijska praonica rublja u Tugarama kraj Omiša. Pranje posteljine i ručnika za apartmane i vile na Poljičkoj rivijeri, kemijsko čišćenje i poslovno pranje za hotele i restorane uz dostavu po Omišu, Dugom Ratu i Splitu.",
  telephone: "+385 21 123 456",
  telephoneHref: "tel:+38521123456",
  email: "info@lessive-tugare.hr",
  address: {
    street: "Trg poljičkih knezova 1",
    locality: "Tugare",
    region: "Splitsko-dalmatinska županija",
    postalCode: "21252",
    country: "HR",
  },
  geo: {
    lat: 43.47239427745686,
    lng: 16.65102507574296,
  },
  deliveryRadiusKm: 15,
  // Organization logo (square) and a representative photo, both used in JSON-LD
  // so Google can surface a logo and a primary image for the listing.
  logo: "/icon.svg",
  primaryImage: "/industrial_laundry_machines_wide.png",
  // BCP-47 codes the business communicates in — matches the UI locales.
  knowsLanguage: ["hr", "en", "de", "it"],
  // Verified public profiles. Drives the schema.org `sameAs` entity links.
  sameAs: ["https://instagram.com/lessivestudio"],
  // Places we want to rank for — used in areaServed + keywords.
  areaServed: [
    "Tugare",
    "Omiš",
    "Dugi Rat",
    "Stanići",
    "Mimice",
    "Krilo Jesenice",
    "Podstrana",
    "Split",
    "Poljica",
    "Poljička rivijera",
    "Splitsko-dalmatinska županija",
    "Dalmacija",
  ],
  keywords: [
    "praonica rublja Omiš",
    "praonica rublja Tugare",
    "industrijsko pranje rublja",
    "pranje posteljine za apartmane",
    "pranje ručnika apartmani",
    "praonica rublja Split",
    "kemijsko čišćenje Omiš",
    "pranje rublja za hotele",
    "pranje rublja za restorane",
    "praonica Poljica",
    "praonica Poljička rivijera",
    "pranje posteljine Dugi Rat",
    "dostava rublja Omiš Split",
    "ekološko pranje rublja",
    "pranje stolnjaka i salveta",
    "pranje radne odjeće i uniformi",
    "praonica za iznajmljivače",
    "professional laundry Omiš",
  ],
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],
  ogLocale: "hr_HR",
} as const

import type { Locale } from "@/i18n/routing"

// OpenGraph locale codes per UI locale.
export const ogLocales: Record<Locale, string> = {
  hr: "hr_HR",
  en: "en_US",
  de: "de_DE",
  it: "it_IT",
}

// Absolute URL for a locale's homepage. Croatian (default) is unprefixed at "/".
export function localeUrl(locale: Locale): string {
  return locale === "hr" ? siteConfig.url : `${siteConfig.url}/${locale}`
}

// hreflang map for <link rel="alternate"> — every locale plus x-default.
export const hreflangMap: Record<string, string> = {
  hr: localeUrl("hr"),
  en: localeUrl("en"),
  de: localeUrl("de"),
  it: localeUrl("it"),
  "x-default": localeUrl("hr"),
}

// Service offerings advertised in the LocalBusiness OfferCatalog.
export const serviceOfferings = [
  "Industrijsko pranje rublja",
  "Pranje posteljine i ručnika za apartmane",
  "Kemijsko čišćenje",
  "Poslovno pranje za hotele i restorane",
  "Ekološko pranje",
  "Preuzimanje i dostava rublja",
] as const
