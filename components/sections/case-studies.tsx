import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"

interface CaseStudy {
  number: string
  category: string
  stat: string
  statLabel: string
  title: string
  description: string
}

export default async function CaseStudies() {
  const t = await getTranslations("caseStudies")
  const items = t.raw("items") as CaseStudy[]

  return (
    <section id="rezultati" className="w-full border-t-[1px] border-foreground bg-background">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/05/</div>

          {/* Content */}
          <Reveal className="space-y-10">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-border thin-border">
              {items.map((item) => (
                <div key={item.number} className="bg-background p-6 space-y-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="section-number text-xs">{item.number}</span>
                    <span className="annotation text-muted-foreground text-right">{item.category}</span>
                  </div>
                  <div className="procedural-heading text-4xl text-foreground">{item.stat}</div>
                  <div className="annotation text-muted-foreground">{item.statLabel}</div>
                  <div className="pt-3 border-t-[1px] border-border space-y-2">
                    <div className="text-foreground font-medium">{item.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
