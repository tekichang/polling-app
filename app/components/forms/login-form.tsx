"use client"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useLoginForm } from "@/app/hooks/useLoginForm"

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
  const { email, password, setEmail, setPassword, handleSubmit } = useLoginForm()

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
