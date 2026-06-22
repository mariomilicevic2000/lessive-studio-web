import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import MobileCallBar from "@/components/ui/mobile-call-bar"
import StructuredData from "@/components/structured-data"
import LenisProvider from "@/components/providers/lenis-provider"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollSpy from "@/components/ui/scroll-spy"
import { routing, type Locale } from "@/i18n/routing"
import { hreflangMap, localeUrl, ogLocales } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: "meta" })
  const url = localeUrl(locale)

  return {
    metadataBase: new URL("https://lessive-tugare.hr"),
    title: {
      default: t("title"),
      template: "%s | Lessive Studio Tugare",
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    applicationName: "Lessive Studio Tugare",
    authors: [{ name: "Lessive Studio Tugare" }],
    creator: "Lessive Studio Tugare",
    publisher: "Lessive Studio Tugare",
    category: "Laundry service",
    alternates: {
      canonical: url,
      languages: hreflangMap,
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url,
      siteName: "Lessive Studio Tugare",
      title: t("ogTitle"),
      description: t("description"),
      images: [
        {
          url: "/industrial_laundry_machines_wide.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: ["/industrial_laundry_machines_wide.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png" }],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "geo.region": "HR-21",
      "geo.placename": "Tugare, Omiš",
      "geo.position": "43.47239427745686;16.65102507574296",
      ICBM: "43.47239427745686, 16.65102507574296",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale)
  const messages = await getMessages()
  const tA11y = await getTranslations({ locale, namespace: "a11y" })

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <LenisProvider>
              <StructuredData locale={locale as Locale} />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:outline-none focus:ring-2 focus:ring-ring spec-table text-xs"
              >
                {tA11y("skipToContent")}
              </a>
              <div className="grain-overlay" aria-hidden="true" />
              <SiteHeader />
              <ScrollSpy />
              {children}
              <SiteFooter />
              <MobileCallBar />
            </LenisProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
