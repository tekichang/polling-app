"use client"

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your polling dashboard, {user.email}
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
