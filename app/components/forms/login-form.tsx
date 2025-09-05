"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { createClient } from "@/app/lib/supabase/client"
import { useRouter } from "next/navigation"

/**
 * Login form component for user authentication.
 * 
 * This component provides a user interface for signing in with email and password.
 * It handles form state, validation, authentication with Supabase, and navigation
 * upon successful login. The form includes proper error handling and user feedback.
 * 
 * @component
 * @returns {JSX.Element} Login form with email/password inputs and submit button
 * 
 * @example
 * // Use in a login page
 * function LoginPage() {
 *   return (
 *     <div className="container mx-auto max-w-md py-12">
 *       <LoginForm />
 *     </div>
 *   )
 * }
 */
export function LoginForm() {
  // Form state management
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Navigation and Supabase client setup
  const router = useRouter()
  const supabase = createClient()

  /**
   * Handles form submission for user login.
   * 
   * This function:
   * - Prevents default form submission behavior
   * - Attempts to authenticate the user with Supabase
   * - Handles authentication errors gracefully
   * - Redirects to dashboard on successful login
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Attempt to sign in with provided credentials
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // Handle authentication errors
      if (error) {
        console.error('Login error:', error)
        // TODO: Add user-facing error display (toast, alert, etc.)
        return
      }

      // Redirect to dashboard on successful authentication
      // The AuthContext will automatically update with the new user state
      router.push("/dashboard")
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected login error:', error)
      // TODO: Add user-facing error display
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
