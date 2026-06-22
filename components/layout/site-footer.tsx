import Link from "next/link"

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t-[1px] border-foreground bg-background py-8">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="spec-table text-muted-foreground text-sm">© {currentYear} Lessive Studio Tugare</div>
          <div className="flex gap-6">
            <Link
              href="tel:+38521123456"
              className="spec-table text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              +385 21 123 456
            </Link>
            <Link
              href="mailto:info@lessive-tugare.hr"
              className="spec-table text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@lessive-tugare.hr
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
