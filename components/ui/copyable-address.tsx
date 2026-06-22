"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Copy, Check, Navigation } from "lucide-react"
import { siteConfig } from "@/lib/site"

function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  const isIos = /iPhone|iPad|iPod/.test(ua)
  const isIpadOnMacUa = ua.includes("Macintosh") && navigator.maxTouchPoints > 1
  return isIos || isIpadOnMacUa
}

export default function CopyableAddress() {
  const t = useTranslations("location")
  const [copied, setCopied] = useState(false)

  const addressText = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}`
  const { lat, lng } = siteConfig.geo

  const directionsHref = isApplePlatform()
    ? `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(addressText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to fall back to.
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCopy}
        className="group flex w-full items-start gap-2 text-left"
        title={t("copyAddress")}
      >
        <div className="flex-1">
          <div className="text-foreground font-medium">{siteConfig.address.street}</div>
          <div className="text-muted-foreground">
            {siteConfig.address.postalCode} {siteConfig.address.locality}
          </div>
        </div>
        <span className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </span>
      </button>
      {copied && <p className="annotation text-muted-foreground">{t("addressCopied")}</p>}
      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 thin-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
      >
        <Navigation className="h-4 w-4" />
        {t("directionsLabel")}
      </a>
    </div>
  )
}
