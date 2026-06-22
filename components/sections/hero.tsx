import Image from "next/image"
import { getTranslations } from "next-intl/server"

export default async function Hero() {
  const t = await getTranslations("hero")

  return (
    <section id="hero" className="w-full relative bg-background">
      {/* Full-bleed hero image establishing scale and infrastructure */}
      <div className="relative h-[52vh] md:h-[60vh] w-full overflow-hidden border-b-[1px] border-foreground">
        <Image
          src="/industrial_laundry_machines_wide.webp"
          alt={t("imageAlt")}
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9),rgba(0,0,0,0.15)_55%,transparent_70%)]" />

        {/* Centered tagline overlay, set in the site's mono/industrial type */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="procedural-heading text-3xl uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] md:text-5xl lg:text-6xl">
            {t("taglineMain")}
          </p>
          <p className="spec-table mt-3 text-base text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] md:mt-4 md:text-xl">
            {t("taglineSub")}
          </p>
        </div>
      </div>

      {/* Heading, value proposition and key facts — separated from the photo for legibility */}
      <div className="container px-6 py-10 md:py-14">
        <div className="flex items-start gap-4 md:gap-8">
          <span className="section-number min-w-[100px] md:min-w-[160px] text-4xl md:text-6xl lg:text-7xl">/01/</span>
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="procedural-heading hero-heading text-4xl md:text-6xl lg:text-7xl text-foreground">
                {t("h1")}
              </h1>
              <p className="text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed">
                {t("lead")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t-[1px] border-border">
              <div>
                <div className="annotation text-muted-foreground mb-1">{t("priorityLabel")}</div>
                <div className="spec-table text-foreground">{t("priorityValue")}</div>
              </div>
              <div>
                <div className="annotation text-muted-foreground mb-1">{t("radiusLabel")}</div>
                <div className="spec-table text-foreground">{t("radiusValue")}</div>
              </div>
              <div>
                <div className="annotation text-muted-foreground mb-1">{t("turnaroundLabel")}</div>
                <div className="spec-table text-foreground">{t("turnaroundValue")}</div>
              </div>
              <div>
                <div className="annotation text-muted-foreground mb-1">{t("experienceLabel")}</div>
                <div className="spec-table text-foreground">{t("experienceValue")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
