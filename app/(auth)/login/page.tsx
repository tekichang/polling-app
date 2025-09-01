import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Polling App',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        
        {/* TODO: Add login form component */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4 text-center text-muted-foreground">
            Login form will be implemented here
          </div>
        </div>
      </div>
    </div>
  )
}
