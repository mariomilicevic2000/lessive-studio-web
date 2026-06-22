"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useAutoplayResume } from "@/hooks/use-autoplay-resume"

interface StepContent {
  title: string
  description: string
  serviceTitle: string
  serviceDescription: string
}

interface ServicesCarouselProps {
  steps: StepContent[]
  images: string[]
  specTitle: string
  serviceTypeLabel: string
  descriptionLabel: string
}

export default function ServicesCarousel({
  steps,
  images,
  specTitle,
  serviceTypeLabel,
  descriptionLabel,
}: ServicesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const { plugin, interactionProps } = useAutoplayResume({ delay: 6000 })

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
      className="w-full"
      {...interactionProps}
    >
      <CarouselContent>
        {steps.map((step, index) => (
          <CarouselItem key={step.title}>
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="procedural-heading text-2xl md:text-4xl text-foreground">{step.title}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{step.description}</p>
                </div>

                {/* Technical specifications */}
                <div className="thin-border bg-card p-6 max-w-2xl">
                  <div className="annotation mb-3">{specTitle}</div>
                  <div className="grid gap-2 spec-table">
                    <div className="flex justify-between py-1 border-b-[1px] border-border">
                      <span className="text-muted-foreground">{serviceTypeLabel}</span>
                      <span className="text-foreground font-medium">{step.serviceTitle}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">{descriptionLabel}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">
                        {step.serviceDescription}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentary image */}
              <div className="relative aspect-[4/3] thin-border overflow-hidden">
                <Image src={images[index]} alt={step.title} fill className="object-cover grayscale" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              aria-label={step.title}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 transition-all ${
                index === activeIndex ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CarouselPrevious className="static inset-auto left-auto top-auto size-9 translate-x-0 translate-y-0 rounded-none border-foreground hover:bg-secondary" />
          <CarouselNext className="static inset-auto right-auto top-auto size-9 translate-x-0 translate-y-0 rounded-none border-foreground hover:bg-secondary" />
        </div>
      </div>
    </Carousel>
  )
}
