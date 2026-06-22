import { getTranslations } from "next-intl/server"
import { Star } from "lucide-react"
import Reveal from "@/components/ui/reveal"
import ReviewsCarousel from "@/components/sections/reviews-carousel"
import { computeAggregate, type Review } from "@/lib/reviews"

function Stars({ rating, className }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          strokeWidth={1.5}
          fill={i < rounded ? "currentColor" : "none"}
        />
      ))}
    </div>
  )
}

export default async function Reviews() {
  const t = await getTranslations("reviews")
  const items = t.raw("items") as Review[]
  const aggregate = computeAggregate(items)

  return (
    <section id="recenzije" className="w-full border-t-[1px] border-foreground bg-secondary">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/09/</div>

          {/* Content */}
          <Reveal className="min-w-0 space-y-8">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            {/* Aggregate rating summary */}
            <div className="thin-border bg-background px-6 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="procedural-heading text-4xl md:text-5xl text-foreground">
                  {aggregate.value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
                <div className="space-y-1">
                  <Stars rating={aggregate.value} className="text-foreground" />
                  <div className="annotation text-muted-foreground">
                    {t("ratingLabel")} · {t("outOf")}
                  </div>
                </div>
              </div>
              <span className="annotation text-muted-foreground">{t("basedOn", { count: aggregate.count })}</span>
            </div>

            {/* Review carousel */}
            <ReviewsCarousel items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
