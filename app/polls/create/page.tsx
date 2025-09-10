"use client"

import { createPoll } from '@/app/polls/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'

export default function CreatePollPage() {
  const [state, formAction] = useFormState(createPoll, null)
  
  return (
    <form action={formAction} className="container max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Create a new Poll</h1>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="What's your favorite color?" required />
      </div>
      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <Input id="description" name="description" placeholder="A short description of your poll." />
      </div>
      <div>
        <Label>Options</Label>
        <Input name="option" placeholder="Option 1" required />
        <Input name="option" placeholder="Option 2" required />
        {/* A more robust solution would allow adding more options dynamically */}
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      
      <Button type="submit">Create Poll</Button>
    </form>
  )
}