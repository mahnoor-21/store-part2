"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Discover Your Next Favorite Book",
      description: "Explore our vast collection of bestsellers, classics, and hidden gems.",
      image: "/1.png?height=600&width=800",
      cta: "Browse Collection",
      link: "/books",
    },
    {
      title: "New Releases Every Week",
      description: "Stay updated with the latest and greatest in literature.",
      image: "/3.png?height=600&width=800",
      cta: "See New Arrivals",
      link: "/books",
    },
    {
      title: "Join Our Reading Community",
      description: "Connect with fellow book lovers and share your literary journey.",
      image: "/2.png?height=600&width=800",
      cta: "Sign Up Today",
      link: "/signup",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[500px] w-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            <div className="container relative z-20 mx-auto flex h-full items-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 20,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-white"
              >
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{slide.title}</h1>
                <p className="mb-6 text-lg md:text-xl">{slide.description}</p>
                <Link href={slide.link}>
                  <Button size="lg" className="gap-2">
                    {slide.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

