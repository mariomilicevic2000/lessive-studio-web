"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useLenis } from "lenis/react"

const sections = [
  { id: "hero", number: "01", key: "hero" },
  { id: "usluge", number: "02", key: "services" },
  { id: "cjenik", number: "03", key: "pricing" },
  { id: "o-nama", number: "04", key: "about" },
  { id: "rezultati", number: "05", key: "results" },
  { id: "klijenti", number: "06", key: "clients" },
  { id: "lokacija", number: "07", key: "location" },
  { id: "faq", number: "08", key: "faq" },
  { id: "recenzije", number: "09", key: "reviews" },
  { id: "kontakt", number: "10", key: "contact" },
] as const

export default function ScrollSpy() {
  const t = useTranslations("nav")
  const lenis = useLenis()
  const [activeId, setActiveId] = useState<string>("hero")
  const ratiosRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let bestId = activeId
        let bestRatio = 0
        for (const [id, ratio] of ratiosRef.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }
        if (bestRatio > 0) setActiveId(bestId)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -15% 0px" },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeId])

  function handleClick(id: string) {
    const target = document.getElementById(id)
    if (!target) return
    if (lenis) {
      lenis.scrollTo(target, { offset: -88 })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      aria-label={t("services")}
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex mix-blend-difference"
    >
      <ol className="flex flex-col items-end gap-4">
        {sections.map((section) => {
          const isActive = section.id === activeId
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  className={`section-number text-white transition-all ${
                    isActive ? "text-lg opacity-100" : "text-sm opacity-65 group-hover:opacity-100"
                  }`}
                >
                  /{section.number}/
                </span>
                <span
                  className={`bg-white transition-all ${
                    isActive ? "h-[4px] w-14" : "h-[3px] w-7 group-hover:w-10"
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
