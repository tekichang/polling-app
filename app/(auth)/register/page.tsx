import { Metadata } from 'next'
import { RegisterForm } from '@/app/components/forms/register-form'

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
        
        <RegisterForm />
      </div>
    </div>
  )
}
