import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

export default async function Faq() {
  const t = await getTranslations("faq")
  const items = t.raw("items") as FaqItem[]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section id="faq" className="w-full border-t-[1px] border-foreground bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/08/</div>

          {/* Content */}
          <Reveal className="space-y-8 max-w-3xl">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            <div className="thin-border bg-card">
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b-[1px] border-border last:border-b-0 px-6"
                  >
                    <AccordionTrigger className="procedural-heading text-base md:text-lg text-foreground hover:no-underline py-5">
                      <span className="flex items-start gap-4">
                        <span className="section-number text-sm shrink-0 pt-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-0 md:pl-[2.75rem] pb-5">
                      <p className="text-base text-muted-foreground leading-relaxed">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="annotation text-muted-foreground pt-2 border-t-[1px] border-border">{t("footerNote")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
