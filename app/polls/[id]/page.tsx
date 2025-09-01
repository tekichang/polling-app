"use client"

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'
import { Loader2 } from 'lucide-react'

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOption) {
      setError('Please select an option before submitting.')
      return
    }
    
    setIsLoading(true)
    setError(null)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log(`Voted for option ${selectedOption} on poll ${params.id}`)
    setIsLoading(false)
    setHasVoted(true)
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value)
    if (error) {
      setError(null)
    }
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
                onValueChange={handleOptionChange}
                className="space-y-2"
              >
                {mockPoll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>

              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={!selectedOption || isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Voting...' : 'Submit Vote'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
