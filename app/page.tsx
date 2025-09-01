import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Polling App
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create polls, gather opinions, and make decisions together. 
              A simple and powerful way to collect feedback from your community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/polls">Browse Polls</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/polls/create">Create Poll</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Create Polls</CardTitle>
              <CardDescription>
                Easily create polls with multiple options and descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/polls/create">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vote & Participate</CardTitle>
              <CardDescription>
                Vote on polls and see real-time results from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/polls">Browse Polls</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Results</CardTitle>
              <CardDescription>
                Monitor poll results and analyze community preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-24 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Ready to get started?</h2>
            <p className="text-muted-foreground">
              Join thousands of users creating and participating in polls
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
