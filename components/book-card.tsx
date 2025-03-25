"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, ShoppingCart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
  className?: string
}

export function BookCard({ book, className }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn("group relative rounded-lg border bg-card transition-all hover:shadow-md", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
        <Image
          src={book.coverImage || "/placeholder.svg?height=600&width=400"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {book.isNewRelease && (
          <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            New
          </div>
        )}

        {book.isBestseller && (
          <div className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
            Bestseller
          </div>
        )}

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="gap-1">
              <BookOpen className="h-4 w-4" />
              Preview
            </Button>
            <Button size="sm" className="gap-1">
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("h-3 w-3", i < book.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted")}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({book.reviewCount})</span>
        </div>

        <h3 className="line-clamp-1 font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">${book.price.toFixed(2)}</div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

