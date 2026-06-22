import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import Reveal from "@/components/ui/reveal"
import ReferenceNumber from "@/components/ui/reference-number"
import QuickContacts from "@/components/ui/quick-contacts"

export default async function Contact() {
  const t = await getTranslations("contact")
  return (
    <section id="kontakt" className="w-full border-t-[1px] border-foreground bg-background">
      <div className="container px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 max-w-6xl">
          {/* Section number */}
          <div className="section-number text-right text-4xl md:text-6xl lg:text-7xl">/10/</div>

          {/* Content */}
          <Reveal className="space-y-8 max-w-2xl">
            <div className="space-y-3">
              <h2 id="contact-heading" className="procedural-heading text-2xl md:text-4xl text-foreground">
                {t("heading")}
              </h2>
              <p className="annotation text-muted-foreground">{t("annotation")}</p>
            </div>

            {/* Quick contact channels */}
            <div className="space-y-3">
              <span className="annotation text-muted-foreground">{t("directLabel")}</span>
              <QuickContacts />
            </div>

            {/* Form */}
            <form aria-labelledby="contact-heading" className="space-y-6 border-t-[1px] border-border pt-8">
              <ReferenceNumber />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="spec-table text-muted-foreground" htmlFor="name">
                    {t("nameLabel")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    className="w-full thin-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors spec-table"
                    placeholder={t("required")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="spec-table text-muted-foreground" htmlFor="email">
                    {t("emailLabel")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    className="w-full thin-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors spec-table"
                    placeholder={t("required")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="spec-table text-muted-foreground" htmlFor="phone">
                  {t("phoneLabel")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full thin-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors spec-table"
                  placeholder={t("optional")}
                />
              </div>

              <div className="space-y-2">
                <label className="spec-table text-muted-foreground" htmlFor="message">
                  {t("messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full thin-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors spec-table resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 spec-table transition-colors"
              >
                {t("submit")}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
