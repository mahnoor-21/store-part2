"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Heart, Settings } from "lucide-react"

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div>
                  {session.user.firstName} {session.user.lastName}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{session.user.email}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Your purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2">No orders yet</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
            <CardDescription>Books you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2">Your wishlist is empty</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Wishlist
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

