"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"
import { Loader2 } from "lucide-react"
import { handleVote } from "@/app/polls/actions"

/**
 * Props for the VoteForm component.
 * 
 * @interface VoteFormProps
 * @property {Array<{id: string, text: string}>} pollOptions - Available poll options to choose from
 * @property {string} pollId - Unique identifier for the poll being voted on
 * @property {() => void} onVoteSuccess - Callback function called when vote is successfully submitted
 */
interface VoteFormProps {
  pollOptions: { id: string; text: string }[]
  pollId: string
  onVoteSuccess: () => void
}

/**
 * Vote form component for submitting poll votes.
 * 
 * This component provides a user interface for voting on polls. It displays
 * poll options as radio buttons, handles form submission, manages loading states,
 * and provides user feedback for errors and success states.
 * 
 * Features:
 * - Radio button selection for poll options
 * - Form validation (requires option selection)
 * - Loading state during vote submission
 * - Error handling and display
 * - Success callback integration
 * 
 * @param {VoteFormProps} props - Component props
 * @returns {JSX.Element} Vote form with radio options and submit button
 * 
 * @example
 * // Use in a poll detail page
 * function PollPage({ poll }) {
 *   const handleVoteSuccess = () => {
 *     // Refresh poll data or show success message
 *     console.log('Vote submitted successfully!')
 *   }
 * 
 *   return (
 *     <VoteForm
 *       pollOptions={poll.options}
 *       pollId={poll.id}
 *       onVoteSuccess={handleVoteSuccess}
 *     />
 *   )
 * }
 */
export function VoteForm({ pollOptions, pollId, onVoteSuccess }: VoteFormProps) {
  // Form state management
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Handles form submission for poll voting.
   * 
   * This function:
   * - Prevents default form submission
   * - Validates that an option is selected
   * - Calls the server action to record the vote
   * - Handles success and error states
   * - Manages loading state during submission
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that an option is selected before submission
    if (!selectedOption) {
      setError("Please select an option before submitting.")
      return
    }

    // Set loading state and clear any previous errors
    setIsLoading(true)
    setError(null)

    try {
      // Call server action to record the vote
      const result = await handleVote(pollId, selectedOption)

      // Handle server action response
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Vote was successful, call success callback
      setIsLoading(false)
      onVoteSuccess()
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error during vote submission:', error)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  /**
   * Handles radio button option selection changes.
   * 
   * This function updates the selected option and clears any error messages
   * when the user makes a new selection.
   * 
   * @param {string} value - The ID of the selected option
   * @returns {void}
   */
  const handleOptionChange = (value: string) => {
    setSelectedOption(value)
    
    // Clear error message when user makes a new selection
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
