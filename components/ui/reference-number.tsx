"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

function generateReference(): string {
  const now = new Date()
  const datePart = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .map((n, i) => (i === 0 ? String(n) : String(n).padStart(2, "0")))
    .join("")
  const randomPart = String(Math.floor(Math.random() * 900) + 100)
  return `RB-${datePart}-${randomPart}`
}

export default function ReferenceNumber() {
  const t = useTranslations("referenceNumber")
  const [reference, setReference] = useState<string | null>(null)

  useEffect(() => {
    setReference(generateReference())
  }, [])

  return (
    <div className="thin-border bg-secondary px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
      <span className="annotation text-muted-foreground">{t("label")}</span>
      <span className="spec-table text-foreground">{reference ?? "—"}</span>
    </div>
  )
}
