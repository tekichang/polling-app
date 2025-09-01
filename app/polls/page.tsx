import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polls - Polling App',
  description: 'Browse and vote on polls',
}

export default function PollsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Polls</h1>
            <p className="text-muted-foreground">
              Discover and participate in polls created by the community
            </p>
          </div>
          {/* TODO: Add create poll button */}
        </div>
        
        {/* TODO: Add polls grid/list component */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Poll cards will be displayed here
          </div>
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Poll cards will be displayed here
          </div>
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Poll cards will be displayed here
          </div>
        </div>
      </div>
    </div>
  )
}
