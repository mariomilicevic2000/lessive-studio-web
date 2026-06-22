import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import Pricing from "@/components/sections/pricing"
import About from "@/components/sections/about"
import CaseStudies from "@/components/sections/case-studies"
import ClientLogos from "@/components/sections/client-logos"
import Location from "@/components/sections/location"
import Faq from "@/components/sections/faq"
import Reviews from "@/components/sections/reviews"
import Contact from "@/components/sections/contact"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Services />
        <Pricing />
        <About />
        <CaseStudies />
        <ClientLogos />
        <Location />
        <Faq />
        <Reviews />
        <Contact />
      </main>
    </div>
  )
}
