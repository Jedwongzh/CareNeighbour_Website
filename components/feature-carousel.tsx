"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

type FeatureSet = {
  image: string
  imageAlt: string
  features: {
    title: string
    description: string
  }[]
}

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isMobile = useMobile()

  const featureSets: FeatureSet[] = [
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CareNeighbor%20-%20Market%20Validation%20Posters%20V1.jpg-ZeNM7ZLCj3I78ZoQRMCvi3JZhL41as.jpeg",
      imageAlt: "CareNeighbor app features showing home screen, request care, and available caregivers",
      features: [
        {
          title: "Voice-Activated Requests",
          description: "Speak your needs—our AI transcribes and processes instantly.",
        },
        {
          title: "Quick Care Options",
          description: "Choose from pre-defined options for fast, targeted assistance.",
        },
        {
          title: "Real-Time Availability",
          description: "See and book available caregivers instantly based on location and skills.",
        },
      ],
    },
    {
      image: "/images/app-screens-2.jpeg",
      imageAlt: "CareNeighbor app features showing booking, caregiver profile, and location tracking",
      features: [
        {
          title: "Detailed Profiles",
          description: "Review qualifications, experience, and verified ratings at a glance.",
        },
        {
          title: "Flexible Scheduling",
          description: "Book short or long-term care with seamless, secure payment options.",
        },
        {
          title: "Live Tracking",
          description: "Monitor caregiver arrival with real-time location updates and ETA.",
        },
      ],
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === featureSets.length - 1 ? 0 : prev + 1))
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? featureSets.length - 1 : prev - 1))
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 500)
  }

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white/90"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
        </div>
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white/90"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        {/* Image Container - Adjusted height for mobile */}
        <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {featureSets.map((set, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex justify-center transition-opacity duration-500 ease-in-out ${
                index === activeIndex
                  ? isTransitioning
                    ? "opacity-0"
                    : "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={set.image || "/placeholder.svg"}
                alt={set.imageAlt}
                width={800}
                height={600}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {featureSets.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => {
                if (isTransitioning) return
                setIsTransitioning(true)
                setTimeout(() => {
                  setActiveIndex(index)
                  setTimeout(() => {
                    setIsTransitioning(false)
                  }, 500)
                }, 500)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features - Responsive grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {featureSets[activeIndex].features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col items-start space-y-3 rounded-lg border p-4 md:p-6 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-bold">{feature.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground text-left">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
