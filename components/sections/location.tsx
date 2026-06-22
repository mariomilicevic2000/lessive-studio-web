import { getTranslations } from "next-intl/server"
import Reveal from "@/components/ui/reveal"
import FacilityStatus from "@/components/ui/facility-status"
import LocationMap from "@/components/ui/location-map"
import CopyableAddress from "@/components/ui/copyable-address"

export default async function Location() {
  const t = await getTranslations("location")
  return (
    <section id="lokacija" className="w-full border-t-[1px] border-foreground bg-secondary">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/07/</div>

          {/* Content */}
          <Reveal className="space-y-8">
            <div className="space-y-3">
              <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{t("heading")}</h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            {/* Live facility status */}
            <div className="thin-border bg-background px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <FacilityStatus />
              <span className="annotation text-muted-foreground">{t("statusNote")}</span>
            </div>

            {/* Location specifications */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Address and hours */}
              <div className="thin-border bg-background p-6">
                <div className="annotation mb-4">{t("addressTitle")}</div>
                <div className="spec-table space-y-3">
                  <CopyableAddress />
                  <div className="pt-3 border-t-[1px] border-border">
                    <div className="text-muted-foreground mb-2">{t("hoursLabel")}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("dayMonFri")}</span>
                        <span className="text-foreground">08:00-18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("daySat")}</span>
                        <span className="text-foreground">08:00-14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("daySun")}</span>
                        <span className="text-foreground">{t("closed")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="thin-border bg-background p-6">
                <div className="annotation mb-4">{t("contactTitle")}</div>
                <div className="spec-table space-y-3">
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">{t("phoneLabel")}</div>
                    <div className="text-foreground font-medium">+385 21 123 456</div>
                  </div>
                  <div className="pt-3 border-t-[1px] border-border">
                    <div className="text-muted-foreground text-sm mb-1">{t("emailLabel")}</div>
                    <div className="text-foreground font-medium">info@lessive-tugare.hr</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="thin-border overflow-hidden bg-background">
              <LocationMap />
            </div>
            <p className="annotation text-muted-foreground">{t("mapNote")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
