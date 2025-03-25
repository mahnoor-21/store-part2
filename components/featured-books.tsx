"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { books } from "@/data/books"

export function FeaturedBooks() {
  const [activeTab, setActiveTab] = useState("bestsellers")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: "bestsellers", label: "Bestsellers" },
    { id: "new", label: "New Releases" },
    { id: "fiction", label: "Fiction" },
    { id: "nonfiction", label: "Non-Fiction" },
  ]

  const filteredBooks = books
    .filter((book) => {
      if (activeTab === "bestsellers") return book.isBestseller
      if (activeTab === "new") return book.isNewRelease
      if (activeTab === "fiction")
        return book.genre === "Fiction" || book.genre === "Science Fiction" || book.genre === "Mystery"
      if (activeTab === "nonfiction")
        return book.genre === "Non-Fiction" || book.genre === "Biography" || book.genre === "History"
      return true
    })
    .slice(0, 8)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">Featured Books</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="min-w-[100px]"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background shadow-md"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[250px] max-w-[250px]"
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>

        <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background shadow-md"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/books">
          <Button variant="outline" size="lg">
            View All Books
          </Button>
        </Link>
      </div>
    </section>
  )
}

