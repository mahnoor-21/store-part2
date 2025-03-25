"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Club Organizer",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Chapters & Verses has transformed our book club experience. Their curated recommendations and excellent customer service make finding our monthly reads a joy rather than a chore.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Literature Professor",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "As someone who's particular about book editions and translations, I appreciate the detailed information provided for each title. The staff is knowledgeable and passionate about literature.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Avid Reader",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I've been a customer for years, and the personalized recommendations have introduced me to authors I might never have discovered otherwise. Their loyalty program is fantastic too!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">What Our Customers Say</h2>

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg bg-card p-8 shadow-md"
            >
              <Quote className="absolute -top-6 left-8 h-12 w-12 text-primary/20" />

              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-8 md:text-left">
                <div className="shrink-0">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <blockquote className="mb-4 text-lg italic">"{testimonials[current].quote}"</blockquote>
                  <div className="font-semibold">{testimonials[current].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    current === index ? "w-8 bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

