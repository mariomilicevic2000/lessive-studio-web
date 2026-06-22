"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/layout/language-switcher"
import ThemeToggle from "@/components/ui/theme-toggle"

const navItems = [
  { href: "#usluge", key: "services" },
  { href: "#cjenik", key: "pricing" },
  { href: "#o-nama", key: "about" },
  { href: "#rezultati", key: "results" },
  { href: "#lokacija", key: "location" },
  { href: "#faq", key: "faq" },
  { href: "#recenzije", key: "reviews" },
  { href: "#kontakt", key: "contact" },
] as const

export default function SiteHeader() {
  const t = useTranslations("nav")
  const tHeader = useTranslations("header")
  const tA11y = useTranslations("a11y")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] border-foreground bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between px-6 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:justify-normal">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          <span className="block h-3 w-3 shrink-0 bg-foreground" aria-hidden="true" />
          <span className="flex items-baseline gap-2">
            <span className="procedural-heading text-xl text-foreground tracking-tight">LESSIVE</span>
            <span className="annotation text-muted-foreground">STUDIO</span>
          </span>
        </Link>

        {/* Centered nav */}
        <nav aria-label={tA11y("primaryNav")} className="hidden md:flex gap-8 justify-self-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="spec-table text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* CTA + language + mobile trigger */}
        <div className="flex items-center justify-self-end gap-3">
          <ThemeToggle className="hidden md:inline-flex" />
          <LanguageSwitcher variant="dropdown" className="hidden md:flex" />
          <Button
            asChild
            className="hidden md:inline-flex bg-foreground text-background hover:bg-foreground/90 px-5 spec-table text-xs"
          >
            <Link href="#kontakt">{tHeader("cta")}</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2 hover:bg-secondary" size="icon">
                <span className="relative block h-5 w-5">
                  <Menu
                    className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                      isOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                      isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                    }`}
                  />
                </span>
                <span className="sr-only">{tHeader("menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[300px] max-w-[85vw] flex-col gap-0 border-l-[1px] border-foreground bg-background p-0"
            >
              <SheetTitle className="sr-only">{tHeader("menu")}</SheetTitle>
              <nav aria-label={tA11y("primaryNav")} className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-16 pb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="spec-table -mx-2 rounded-none px-2 py-3 text-base text-foreground transition-colors hover:bg-secondary active:bg-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="border-t-[1px] border-border px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="annotation text-muted-foreground">{tHeader("theme")}</span>
                  <ThemeToggle className="border border-border" />
                </div>
                <div className="annotation text-muted-foreground mb-3">{tHeader("language")}</div>
                <LanguageSwitcher className="flex-col items-stretch gap-2" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
