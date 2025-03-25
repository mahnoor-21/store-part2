"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function BookCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const categories = [
    {
      name: "Fiction",
      description: "Explore imaginative worlds and compelling characters",
      color: "bg-blue-500",
      icon: "📚",
    },
    {
      name: "Non-Fiction",
      description: "Discover real-world knowledge and insights",
      color: "bg-green-500",
      icon: "🧠",
    },
    {
      name: "Mystery & Thriller",
      description: "Unravel suspenseful plots and twisting narratives",
      color: "bg-purple-500",
      icon: "🔍",
    },
    {
      name: "Science Fiction",
      description: "Journey through futuristic worlds and technologies",
      color: "bg-amber-500",
      icon: "🚀",
    },
    {
      name: "Biography",
      description: "Learn about remarkable lives and experiences",
      color: "bg-rose-500",
      icon: "👤",
    },
    {
      name: "Children's Books",
      description: "Magical stories for young readers",
      color: "bg-cyan-500",
      icon: "🧸",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Browse by Category</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore our extensive collection organized by genres to find exactly what you're looking for.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -5 }}
          >
            <div className={`absolute inset-0 opacity-10 ${category.color}`} />
            <div className="relative z-10 p-6">
              <div className="mb-4 text-4xl">{category.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{category.name}</h3>
              <p className="mb-4 text-muted-foreground">{category.description}</p>
              <Link href="/books">
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Explore
                  <motion.div animate={{ x: hoveredIndex === index ? 5 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

