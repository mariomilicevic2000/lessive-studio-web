"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { workingHours } from "@/data/hours"

function isOpenAt(now: Date): boolean {
  const jsDay = now.getDay() // 0 = Sunday ... 6 = Saturday
  const index = jsDay === 0 ? 6 : jsDay - 1 // map to workingHours (0 = Monday ... 6 = Sunday)
  const today = workingHours[index]

  if (!today.open || !today.close) return false

  const [openH, openM] = today.open.split(":").map(Number)
  const [closeH, closeM] = today.close.split(":").map(Number)
  const minutesNow = now.getHours() * 60 + now.getMinutes()

  return minutesNow >= openH * 60 + openM && minutesNow < closeH * 60 + closeM
}

export default function FacilityStatus() {
  const t = useTranslations("facilityStatus")
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => setIsOpen(isOpenAt(new Date()))
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isOpen === null) {
    return (
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="spec-table text-muted-foreground">{t("checking")}</span>
      </div>
    )
  }

  const statusColor = isOpen ? "var(--status-open)" : "var(--status-closed)"

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span
          className="absolute h-full w-full rounded-full status-dot-pulse"
          style={{ backgroundColor: statusColor }}
        />
        <span
          className="relative h-3.5 w-3.5 rounded-full"
          style={{
            backgroundColor: statusColor,
            boxShadow: isOpen ? `0 0 10px 2px ${statusColor}` : "none",
          }}
        />
      </span>
      <span className="spec-table text-foreground">{isOpen ? t("open") : t("closed")}</span>
    </div>
  )
}
