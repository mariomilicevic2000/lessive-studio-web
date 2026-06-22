"use client"

import { useCallback, useEffect, useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

type AutoplayPlugin = ReturnType<typeof Autoplay>

/**
 * Builds an embla Autoplay plugin that pauses the moment the user interacts
 * (drag, nav/dot click, or hover) and resumes only after the carousel has been
 * left untouched for `resumeDelay` ms.
 *
 * `stopOnInteraction: true` lets embla halt autoplay on drag natively; the
 * timer below adds the "resume when idle" behaviour and also covers the nav
 * buttons / dots (which live outside the drag viewport) and pointer-less hover.
 * Spread `interactionProps` onto the <Carousel> root.
 */
export function useAutoplayResume({
  delay,
  resumeDelay = 5000,
}: {
  delay: number
  resumeDelay?: number
}) {
  const pluginRef = useRef<AutoplayPlugin | null>(null)
  if (!pluginRef.current) {
    pluginRef.current = Autoplay({ delay, stopOnInteraction: true, stopOnMouseEnter: false })
  }

  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()
  const isHovering = useRef(false)

  const clearResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }, [])

  const scheduleResume = useCallback(() => {
    clearResume()
    resumeTimer.current = setTimeout(() => {
      // Stay paused while the pointer still rests on the carousel.
      if (!isHovering.current) pluginRef.current?.play()
    }, resumeDelay)
  }, [clearResume, resumeDelay])

  // Clear any pending resume on unmount.
  useEffect(() => clearResume, [clearResume])

  const onInteract = useCallback(() => {
    pluginRef.current?.stop()
    scheduleResume()
  }, [scheduleResume])

  const onMouseEnter = useCallback(() => {
    isHovering.current = true
    clearResume()
    pluginRef.current?.stop()
  }, [clearResume])

  const onMouseLeave = useCallback(() => {
    isHovering.current = false
    scheduleResume()
  }, [scheduleResume])

  return {
    plugin: pluginRef.current,
    interactionProps: {
      onPointerDownCapture: onInteract,
      onMouseEnter,
      onMouseLeave,
    },
  }
}
