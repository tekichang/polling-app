"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/lib/supabase/client"

export function useLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        // TODO: Add user-facing error display (toast, alert, etc.)
        return
      }

      router.push("/dashboard")
    } catch (error) {
      console.error('Unexpected login error:', error)
      // TODO: Add user-facing error display
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  }
}
