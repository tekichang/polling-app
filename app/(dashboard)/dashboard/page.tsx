"use client"

import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Dashboard page component for authenticated users.
 * 
 * This component provides the main dashboard interface for logged-in users.
 * It includes authentication protection, user-specific content, and navigation
 * to various polling features. The dashboard displays user information and
 * provides quick access to poll management features.
 * 
 * Features:
 * - Authentication protection (redirects to login if not authenticated)
 * - User-specific welcome message
 * - Quick access widgets for poll management
 * - Responsive grid layout for dashboard widgets
 * 
 * @component
 * @returns {JSX.Element | null} Dashboard page or null if not authenticated
 * 
 * @example
 * // This component is automatically rendered when navigating to /dashboard
 * // It requires the user to be authenticated via AuthContext
 */
export default function DashboardPage() {
  // Get current user from authentication context
  const { user } = useAuth()
  const router = useRouter()

  /**
   * Effect hook to handle authentication state changes.
   * 
   * This effect monitors the user authentication state and redirects
   * unauthenticated users to the login page. It runs whenever the
   * user state or router changes.
   */
  useEffect(() => {
    // Redirect to login if no user is authenticated
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Return null while redirecting or if no user (prevents flash of content)
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
