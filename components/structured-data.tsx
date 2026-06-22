import { getTranslations } from "next-intl/server"
import { serviceOfferings, siteConfig } from "@/lib/site"
import { computeAggregate, type Review } from "@/lib/reviews"
import type { Locale } from "@/i18n/routing"

// Sitewide JSON-LD: a DryCleaningOrLaundry LocalBusiness (the most specific
// schema.org type for this trade) plus a WebSite node. The aggregate rating +
// reviews drive star rich-results; the FAQPage schema is emitted separately by
// the FAQ section so it stays next to its content.
export default async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" })
  const tReviews = await getTranslations({ locale, namespace: "reviews" })
  const description = t("description")
  const businessId = `${siteConfig.url}/#business`

  const reviews = tReviews.raw("items") as Review[]
  const aggregate = computeAggregate(reviews)

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": businessId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    image: `${siteConfig.url}/industrial_laundry_machines_wide.png`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    hasMap: `https://www.openstreetmap.org/?mlat=${siteConfig.geo.lat}&mlon=${siteConfig.geo.lng}#map=15/${siteConfig.geo.lat}/${siteConfig.geo.lng}`,
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.lat,
        longitude: siteConfig.geo.lng,
      },
      geoRadius: siteConfig.deliveryRadiusKm * 1000,
    },
    openingHoursSpecification: siteConfig.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge pranja i čišćenja",
      itemListElement: serviceOfferings.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.value,
      reviewCount: aggregate.count,
      bestRating: aggregate.best,
      worstRating: aggregate.worst,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: aggregate.best,
        worstRating: aggregate.worst,
      },
      reviewBody: r.quote,
    })),
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description,
    inLanguage: locale,
    publisher: { "@id": businessId },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
