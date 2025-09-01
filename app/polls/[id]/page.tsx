"use client"

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'

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

export default function PollPage({ params }: PollPageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOption) {
      // TODO: Show an error message
      return
    }
    console.log(`Voted for option ${selectedOption} on poll ${params.id}`)
    setHasVoted(true)
  }

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
            <div className="text-center">
              <h2 className="text-2xl font-bold">Thank you for voting!</h2>
              <p className="text-muted-foreground">
                You can view the results after the poll closes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVote} className="space-y-6">
              <RadioGroup
                value={selectedOption ?? ''}
                onValueChange={setSelectedOption}
                className="space-y-2"
              >
                {mockPoll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button type="submit" className="w-full" disabled={!selectedOption}>
                Submit Vote
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
