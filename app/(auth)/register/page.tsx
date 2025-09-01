import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Polling App',
  description: 'Create a new account',
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-muted-foreground">
            Sign up to start creating and voting on polls
          </p>
        </div>
        
        {/* TODO: Add registration form component */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4 text-center text-muted-foreground">
            Registration form will be implemented here
          </div>
        </div>
      </div>
    </div>
  )
}
