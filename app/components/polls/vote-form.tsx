"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { Loader2 } from "lucide-react"
import { handleVote } from "@/app/polls/actions"

interface VoteFormProps {
  pollOptions: { id: string; text: string }[]
  pollId: string
  onVoteSuccess: () => void
}

export function VoteForm({ pollOptions, pollId, onVoteSuccess }: VoteFormProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOption) {
      setError("Please select an option before submitting.")
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await handleVote(pollId, selectedOption)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onVoteSuccess()
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value)
    if (error) {
      setError(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={selectedOption ?? ""}
        onValueChange={handleOptionChange}
        className="space-y-2"
      >
        {pollOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
            <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
          </div>
        ))}
      </RadioGroup>

      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={!selectedOption || isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Voting..." : "Submit Vote"}
      </Button>
    </form>
  )
}
