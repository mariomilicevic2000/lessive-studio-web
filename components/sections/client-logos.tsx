import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"
import { clientLogosData } from "@/data/clients"

export default async function ClientLogos() {
  const t = await getTranslations("clientLogos")
  const loopItems = [...clientLogosData, ...clientLogosData]

  return (
    <section id="klijenti" className="w-full border-t-[1px] border-foreground bg-secondary">
      <div className="container px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl md:items-center">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-5xl lg:text-6xl">/06/</div>

          {/* Content */}
          <Reveal className="min-w-0 space-y-4">
            <span className="annotation text-muted-foreground">{t("annotation")}</span>

            <div className="thin-border bg-background overflow-hidden py-6">
              <div className="flex w-max gap-6 marquee-track hover:[animation-play-state:paused] md:gap-12">
                {loopItems.map((client, index) => (
                  <div key={`${client.name}-${index}`} className="flex shrink-0 items-center gap-3 px-2 md:px-4">
                    <span className="block h-5 w-5 shrink-0 border border-foreground md:h-6 md:w-6" aria-hidden="true" />
                    <span className="procedural-heading whitespace-nowrap text-sm tracking-tight text-foreground/80 md:text-base">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
