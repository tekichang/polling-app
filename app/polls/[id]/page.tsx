import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poll Details - Polling App',
  description: 'View and vote on this poll',
}

interface PollPageProps {
  params: {
    id: string
  }
}

export default function PollPage({ params }: PollPageProps) {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Poll Details</h1>
          <p className="text-muted-foreground">
            Poll ID: {params.id}
          </p>
        </div>
        
        {/* TODO: Add poll details and voting component */}
        <div className="rounded-lg border p-6">
          <div className="text-center text-muted-foreground">
            Poll details and voting interface will be implemented here
          </div>
        </div>
      </div>
    </div>
  )
}
