"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useAutoplayResume } from "@/hooks/use-autoplay-resume"
import type { Review } from "@/lib/reviews"

function Stars({ rating, className }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5" strokeWidth={1.5} fill={i < rounded ? "currentColor" : "none"} />
      ))}
    </div>
  )
}

export default function ReviewsCarousel({ items }: { items: Review[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const { plugin, interactionProps } = useAutoplayResume({ delay: 7000 })

  useEffect(() => {
    if (!api) return
    setActiveIndex(api.selectedScrollSnap())
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()))
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[plugin]}
      className="w-full min-w-0"
      {...interactionProps}
    >
      <CarouselContent>
        {items.map((review, index) => (
          <CarouselItem key={index}>
            <figure className="thin-border bg-background flex min-h-[240px] flex-col justify-between gap-5 p-6 sm:min-h-[280px] sm:gap-6 sm:p-8 md:p-12">
              <Stars rating={review.rating} className="text-foreground" />
              <blockquote className="procedural-heading text-lg leading-snug text-foreground [overflow-wrap:anywhere] sm:text-xl md:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="pt-4 border-t-[1px] border-border">
                <div className="text-foreground font-medium">{review.author}</div>
                <div className="annotation text-muted-foreground">{review.location}</div>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-8">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {items.map((review, index) => (
            <button
              key={index}
              type="button"
              aria-label={review.author}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 shrink-0 transition-all ${
                index === activeIndex ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CarouselPrevious className="static inset-auto left-auto top-auto size-9 translate-x-0 translate-y-0 rounded-none border-foreground hover:bg-secondary" />
          <CarouselNext className="static inset-auto right-auto top-auto size-9 translate-x-0 translate-y-0 rounded-none border-foreground hover:bg-secondary" />
        </div>
      </div>
    </Carousel>
  )
}
