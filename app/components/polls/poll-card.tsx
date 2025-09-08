"use client"

import Link from "next/link"
import { Poll } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PollCardProps {
  poll: Poll
}

export function PollCard({ poll }: PollCardProps) {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)

  return (
    <Link href={`/polls/${poll.id}`} className="block h-full">
      <Card className="h-full transition-all hover:border-primary/60">
        <CardHeader>
          <CardTitle className="line-clamp-2">{poll.title}</CardTitle>
          {poll.description && (
            <CardDescription className="line-clamp-2">
              {poll.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <span className="text-sm">{option.text}</span>
                <span className="text-sm text-muted-foreground">
                  {option.votes} votes
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{totalVotes} total votes</span>
            <span>Created {new Date(poll.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
