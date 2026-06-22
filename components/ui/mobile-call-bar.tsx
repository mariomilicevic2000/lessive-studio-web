import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function MobileCallBar() {
  const t = await getTranslations("mobileCallBar")
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid transform-gpu grid-cols-2 border-t-[1px] border-foreground bg-foreground text-background shadow-[0_-4px_12px_rgba(0,0,0,0.15)] [will-change:transform] pb-[env(safe-area-inset-bottom)] md:hidden">
      <Link
        href="tel:+38521123456"
        className="flex min-h-14 items-center justify-center gap-2 border-r border-background/20 py-4 spec-table active:bg-background/10"
      >
        <Phone className="h-4 w-4" strokeWidth={1.5} />
        {t("call")}
      </Link>
      <Link
        href="https://wa.me/38521123456"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 py-4 spec-table active:bg-background/10"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        {t("whatsapp")}
      </Link>
    </div>
  )
}
