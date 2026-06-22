"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"
import { ChevronDown } from "lucide-react"
import { Link, usePathname } from "@/i18n/navigation"
import { locales, localeLabels, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// flagcdn ISO codes per UI locale (English shown with the UK flag).
const flagCode: Record<Locale, string> = { hr: "hr", en: "gb", de: "de", it: "it" }

function Flag({ locale }: { locale: Locale }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${flagCode[locale]}.svg`}
      alt=""
      width={18}
      height={13}
      className="h-[13px] w-[18px] shrink-0 border border-foreground/10 object-cover"
    />
  )
}

export default function LanguageSwitcher({
  className,
  variant = "list",
}: {
  className?: string
  variant?: "list" | "dropdown"
}) {
  const activeLocale = useLocale() as Locale
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  if (variant === "dropdown") {
    return (
      <div ref={containerRef} className={`relative ${className ?? ""}`}>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label={localeLabels[activeLocale]}
          className="flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 spec-table text-xs uppercase text-foreground transition-colors hover:border-foreground"
        >
          <Flag locale={activeLocale} />
          <span>{activeLocale}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] border border-foreground bg-background shadow-lg">
            {locales.map((locale) => {
              const isActive = locale === activeLocale
              return (
                <Link
                  key={locale}
                  href={pathname}
                  locale={locale}
                  hrefLang={locale}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-2 px-3 py-2 spec-table text-xs uppercase transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Flag locale={locale} />
                  <span>{localeLabels[locale]}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {locales.map((locale) => {
        const isActive = locale === activeLocale
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-label={localeLabels[locale]}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "flex items-center gap-2.5 border px-3 py-2.5 spec-table text-xs uppercase transition-colors",
              isActive
                ? "bg-foreground text-background border-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            <Flag locale={locale} />
            <span>{localeLabels[locale]}</span>
          </Link>
        )
      })}
    </div>
  )
}
