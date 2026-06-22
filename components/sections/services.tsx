import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"
import ServicesCarousel from "@/components/sections/services-carousel"

interface StepContent {
  title: string
  description: string
  serviceTitle: string
  serviceDescription: string
}

const stepImages = [
  "/carts_unprocessed.webp",
  "/laundry_drum_chaotic.webp",
  "/sheet_folding.webp",
  "/carts_processed.webp",
]

export default async function Services() {
  const t = await getTranslations("services")
  const steps = t.raw("steps") as StepContent[]

  return (
    <section id="usluge" className="w-full border-t-[1px] border-foreground bg-background">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/02/</div>

          {/* Content */}
          <Reveal className="min-w-0 space-y-8">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            <ServicesCarousel
              steps={steps}
              images={stepImages}
              specTitle={t("specTitle")}
              serviceTypeLabel={t("serviceTypeLabel")}
              descriptionLabel={t("descriptionLabel")}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
