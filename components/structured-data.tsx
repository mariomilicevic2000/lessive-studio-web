import { getTranslations } from "next-intl/server"
import { localeUrl, serviceOfferings, siteConfig } from "@/lib/site"
import { computeAggregate, type Review } from "@/lib/reviews"
import type { Locale } from "@/i18n/routing"

// Sitewide JSON-LD emitted as a single connected @graph so every node is linked
// by @id — the relationship-rich form Google rewards. Nodes:
//   #business   DryCleaningOrLaundry (the most specific LocalBusiness type)
//   #logo       Organization logo (ImageObject)
//   #primaryimage  the page's primary photo (ImageObject)
//   #website    WebSite, published by the business
//   #webpage    the (per-locale) homepage, part of the website
//   #breadcrumb BreadcrumbList for the homepage
// The aggregate rating + reviews drive star rich-results. FAQPage schema is
// emitted by the FAQ section so it stays next to its content, but it links back
// into this graph via isPartOf → #webpage.
export default async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" })
  const tReviews = await getTranslations({ locale, namespace: "reviews" })
  const tNav = await getTranslations({ locale, namespace: "nav" })
  const description = t("description")

  const pageUrl = localeUrl(locale)
  const businessId = `${siteConfig.url}/#business`
  const websiteId = `${siteConfig.url}/#website`
  const logoId = `${siteConfig.url}/#logo`
  const primaryImageId = `${siteConfig.url}/#primaryimage`
  const webpageId = `${pageUrl}#webpage`
  const breadcrumbId = `${pageUrl}#breadcrumb`

  const reviews = tReviews.raw("items") as Review[]
  const aggregate = computeAggregate(reviews)

  const logo = {
    "@type": "ImageObject",
    "@id": logoId,
    url: `${siteConfig.url}${siteConfig.logo}`,
    contentUrl: `${siteConfig.url}${siteConfig.logo}`,
    caption: siteConfig.name,
  }

  const primaryImage = {
    "@type": "ImageObject",
    "@id": primaryImageId,
    url: `${siteConfig.url}${siteConfig.primaryImage}`,
    contentUrl: `${siteConfig.url}${siteConfig.primaryImage}`,
    width: 1200,
    height: 630,
    caption: t("ogImageAlt"),
  }

  const localBusiness = {
    "@type": "DryCleaningOrLaundry",
    "@id": businessId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    image: { "@id": primaryImageId },
    logo: { "@id": logoId },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    knowsLanguage: siteConfig.knowsLanguage,
    sameAs: siteConfig.sameAs,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.telephone,
      email: siteConfig.email,
      areaServed: siteConfig.address.country,
      availableLanguage: siteConfig.knowsLanguage,
    },
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
          serviceType: service,
          provider: { "@id": businessId },
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
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description,
    inLanguage: locale,
    publisher: { "@id": businessId },
  }

  const webpage = {
    "@type": "WebPage",
    "@id": webpageId,
    url: pageUrl,
    name: t("title"),
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    primaryImageOfPage: { "@id": primaryImageId },
    breadcrumb: { "@id": breadcrumbId },
  }

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("hero"),
        item: pageUrl,
      },
    ],
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [logo, primaryImage, localBusiness, website, webpage, breadcrumb],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
