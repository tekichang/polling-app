import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Poll - Polling App',
  description: 'Create a new poll for the community',
}

export default function CreatePollPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create a new poll</h1>
          <p className="text-muted-foreground">
            Share your question with the community and gather opinions
          </p>
        </div>
        
        {/* TODO: Add create poll form component */}
        <div className="rounded-lg border p-6">
          <div className="text-center text-muted-foreground">
            Poll creation form will be implemented here
          </div>
        </div>
      </div>
    </div>
  )
}
