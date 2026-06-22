"use client"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Reveal from "@/components/ui/reveal"

interface PricingItem {
  name: string
  description: string
  price: string
  unit: string
}

interface PricingCategory {
  id: string
  name: string
  items: PricingItem[]
}

export default function Pricing() {
  const t = useTranslations("pricing")
  const categories = t.raw("categories") as PricingCategory[]

  return (
    <section id="cjenik" className="w-full border-t-[1px] border-foreground bg-background">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/03/</div>

          {/* Content */}
          <Reveal className="min-w-0 space-y-8">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            {/* Tabular pricing */}
            <Tabs defaultValue={categories[0]?.id} className="w-full">
              <div className="thin-border bg-card overflow-hidden">
                <div className="border-b-[1px] border-foreground p-3 md:p-6">
                  <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-none bg-transparent p-0 md:justify-center">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="spec-table flex-1 grow basis-[150px] justify-center rounded-none border border-foreground px-4 py-2.5 text-center text-foreground transition-colors data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=inactive]:bg-transparent md:flex-none md:grow-0 md:basis-auto md:px-5"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="m-0 p-4 sm:p-6 md:p-8">
                    <div className="spec-table">
                      {/* Table header — hidden on mobile, where rows reflow into stacked cards */}
                      <div className="hidden grid-cols-[1fr_auto_auto] gap-4 py-3 border-b-[1px] border-foreground sm:grid">
                        <div className="annotation">{t("itemHeader")}</div>
                        <div className="annotation text-right min-w-[100px]">{t("unitHeader")}</div>
                        <div className="annotation text-right min-w-[100px]">{t("priceHeader")}</div>
                      </div>

                      {/* Table rows */}
                      {category.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-2 py-4 border-b-[1px] border-border odd:bg-secondary/40 hover:bg-secondary transition-colors sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-start sm:gap-4"
                        >
                          <div className="min-w-0">
                            <div className="text-foreground font-medium mb-1">{item.name}</div>
                            {item.description && (
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            )}
                          </div>
                          {/* On mobile, unit + price share a row beneath the name; on sm+ they slot into the grid */}
                          <div className="flex items-baseline justify-between gap-4 sm:contents">
                            <div className="text-muted-foreground sm:text-right sm:min-w-[100px] sm:self-start sm:pt-[2px]">
                              {item.unit}
                            </div>
                            <div className="text-foreground font-medium text-right whitespace-nowrap sm:min-w-[100px] sm:self-start sm:pt-[2px]">
                              {item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>

            {/* Footer note */}
            <div className="annotation pt-4 border-t-[1px] border-border">{t("footerNote")}</div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
