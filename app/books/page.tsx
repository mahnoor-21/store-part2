"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BookOpen, Filter, Search } from "lucide-react"
import { books } from "@/data/books"

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
  ]

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre)

    return matchesSearch && matchesPrice && matchesGenre
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Explore Our Collection</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Browse through our carefully curated selection of books across various genres and discover your next favorite
          read.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <motion.div
          className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: showFilters ? 1 : [null, 1],
            height: showFilters ? "auto" : [null, "auto"],
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-semibold">Filters</h3>

            <div className="mb-6">
              <h4 className="mb-2 font-medium">Price Range</h4>
              <Slider
                defaultValue={[0, 50]}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Genres</h4>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGenres([...selectedGenres, genre])
                        } else {
                          setSelectedGenres(selectedGenres.filter((g) => g !== genre))
                        }
                      }}
                    />
                    <Label htmlFor={genre}>{genre}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-3">
          {filteredBooks.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

