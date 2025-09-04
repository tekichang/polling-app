"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function handleVote(pollId: string, optionId: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // 1. Verify User Authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "You must be logged in to vote." }
  }

  // 2. (Simulated) Record the Vote
  // In a real app, you would add database logic here to:
  // - Check if the user has already voted on this poll.
  // - If not, insert their vote into a 'votes' table.
  // - Update the vote count on the 'poll_options' table.
  
  console.log(`SERVER ACTION: User ${user.id} voted for option ${optionId} on poll ${pollId}`)

  // For now, we'll just return a success message.
  return { success: true }
}
