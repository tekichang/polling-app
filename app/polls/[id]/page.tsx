"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { VoteForm } from '@/app/components/polls/vote-form'

interface PollPageProps {
  params: {
    id: string
  }
}

const mockPoll = {
  id: '123',
  question: 'What is your favorite programming language?',
  options: [
    { id: '1', text: 'JavaScript' },
    { id: '2', text: 'Python' },
    { id: '3', text: 'TypeScript' },
    { id: '4', text: 'Rust' },
  ],
}

function ThankYouMessage() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Thank you for voting!</h2>
      <p className="text-muted-foreground">
        You can view the results after the poll closes.
      </p>
    </div>
  )
}

export default function PollPage({ params }: PollPageProps) {
  const [hasVoted, setHasVoted] = useState(false)

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>{mockPoll.question}</CardTitle>
          <CardDescription>
            Vote for your favorite option below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasVoted ? (
            <ThankYouMessage />
          ) : (
            <VoteForm 
              pollOptions={mockPoll.options}
              pollId={params.id}
              onVoteSuccess={() => setHasVoted(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
