import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Polling App',
  description: 'Your polling dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your polling dashboard
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO: Add dashboard widgets */}
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">My Polls</h3>
          <p className="text-muted-foreground">View and manage your created polls</p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="text-muted-foreground">See your recent voting activity</p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Quick Actions</h3>
          <p className="text-muted-foreground">Create a new poll or browse existing ones</p>
        </div>
      </div>
    </div>
  )
}
