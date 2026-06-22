import Image from "next/image"
import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"

interface Stat {
  value: string
  label: string
}

export default async function About() {
  const t = await getTranslations("about")
  const stats = t.raw("stats") as Stat[]

  return (
    <section id="o-nama" className="w-full border-t-[1px] border-foreground bg-secondary">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/04/</div>

          {/* Content */}
          <Reveal className="space-y-10">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-stretch">
              {/* Documentary image */}
              <div className="relative aspect-square thin-border overflow-hidden">
                <Image
                  src="/industrial_control_system.webp"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover grayscale"
                />
              </div>

              {/* Stats grid */}
              <div className="thin-border bg-background grid grid-cols-2">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`p-6 md:p-8 ${index % 2 === 0 ? "border-r-[1px]" : ""} ${
                      index < stats.length - 2 ? "border-b-[1px]" : ""
                    } border-border`}
                  >
                    <div className="procedural-heading text-4xl md:text-5xl text-foreground mb-2">{stat.value}</div>
                    <div className="annotation text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{t("paragraph")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
