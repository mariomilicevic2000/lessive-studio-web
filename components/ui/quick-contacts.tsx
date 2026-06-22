import Link from "next/link"
import { Phone, MessageSquare, MessageCircle, Send, Instagram } from "lucide-react"
import { getTranslations } from "next-intl/server"

// Muted tints of each channel's brand color, kept subtle to stay within the site's palette.
const channels = [
  { key: "call", href: "tel:+38521123456", icon: Phone, brandColor: "#2563EB" },
  { key: "sms", href: "sms:+38521123456", icon: MessageSquare, brandColor: "#06B6D4" },
  { key: "whatsapp", href: "https://wa.me/38521123456", icon: MessageCircle, brandColor: "#25D366" },
  { key: "viber", href: "viber://chat?number=%2B38521123456", icon: Send, brandColor: "#7360F2" },
  { key: "instagram", href: "https://instagram.com/lessivestudio", icon: Instagram, brandColor: "#E1306C" },
] as const

export default async function QuickContacts() {
  const t = await getTranslations("quickContacts")

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {channels.map((channel) => {
        const Icon = channel.icon
        const isExternal = channel.href.startsWith("http")
        return (
          <Link
            key={channel.key}
            href={channel.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            style={{ backgroundColor: `${channel.brandColor}14` }}
            className="thin-border flex flex-col items-center gap-2 px-3 py-4 text-center transition-colors hover:brightness-95"
          >
            <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            <span className="annotation text-foreground">{t(channel.key)}</span>
          </Link>
        )
      })}
    </div>
  )
}
