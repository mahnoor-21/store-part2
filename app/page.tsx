import { BookHeart, BookOpen, ShoppingBag, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeaturedBooks } from "@/components/featured-books"
import { HeroSection } from "@/components/hero-section"
import { Testimonials } from "@/components/testimonials"
import { BookCategories } from "@/components/book-categories"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-all hover:border-primary hover:shadow-md">
            <BookOpen className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">Vast Collection</h3>
            <p className="text-muted-foreground">Over 10,000 titles across all genres</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-all hover:border-primary hover:shadow-md">
            <ShoppingBag className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p className="text-muted-foreground">On orders over $35</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-all hover:border-primary hover:shadow-md">
            <BookHeart className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">Member Rewards</h3>
            <p className="text-muted-foreground">Earn points with every purchase</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-all hover:border-primary hover:shadow-md">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold">New Releases</h3>
            <p className="text-muted-foreground">Fresh titles added weekly</p>
          </div>
        </div>
      </section>

      <BookCategories />
      <FeaturedBooks />
      <Testimonials />

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Join Our Community</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Subscribe to our newsletter and get exclusive offers, early access to new releases, and personalized
            recommendations.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

