"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }: { className?: string }) {
  const tHeader = useTranslations("header")
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes can only resolve the active theme on the client, so we render a
  // stable, icon-free placeholder on the server to avoid a hydration mismatch.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={tHeader("theme")}
      title={tHeader("theme")}
      className={cn("p-2 hover:bg-secondary", className)}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : (
        <span className="h-5 w-5" />
      )}
    </Button>
  )
}
