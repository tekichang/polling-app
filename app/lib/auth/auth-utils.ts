/**
 * Authentication utilities for the polling application.
 * 
 * This module provides server-side authentication functions that work with Supabase.
 * For client-side authentication, use the AuthContext and Supabase client directly.
 * 
 * @fileoverview Server-side authentication utilities using Supabase SSR
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { User } from '@supabase/supabase-js'

/**
 * Creates a server-side Supabase client with proper cookie handling.
 * This is essential for server-side authentication operations.
 * 
 * @returns {Object} Configured Supabase client for server-side operations
 */
async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Server-side cookie setting is handled by Next.js
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

/**
 * Signs in a user with email and password.
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{user: User | null, error: string | null}>} Authentication result
 * 
 * @example
 * const { user, error } = await signIn('user@example.com', 'password123')
 * if (error) {
 *   console.error('Sign in failed:', error)
 * } else {
 *   console.log('User signed in:', user.email)
 * }
 */
export async function signIn(email: string, password: string) {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    return {
      user: data.user,
      error: error?.message || null
    }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Signs up a new user with email and password.
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} name - User's display name (optional)
 * @returns {Promise<{user: User | null, error: string | null}>} Registration result
 * 
 * @example
 * const { user, error } = await signUp('newuser@example.com', 'password123', 'John Doe')
 * if (error) {
 *   console.error('Sign up failed:', error)
 * } else {
 *   console.log('User registered:', user.email)
 * }
 */
export async function signUp(email: string, password: string, name?: string) {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: name ? { full_name: name } : undefined
      }
    })
    
    return {
      user: data.user,
      error: error?.message || null
    }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Signs out the current user.
 * 
 * @returns {Promise<{error: string | null}>} Sign out result
 * 
 * @example
 * const { error } = await signOut()
 * if (error) {
 *   console.error('Sign out failed:', error)
 * } else {
 *   console.log('User signed out successfully')
 * }
 */
export async function signOut() {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { error } = await supabase.auth.signOut()
    
    return {
      error: error?.message || null
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

/**
 * Gets the current authenticated user from the server-side session.
 * 
 * @returns {Promise<User | null>} Current user or null if not authenticated
 * 
 * @example
 * const user = await getCurrentUser()
 * if (user) {
 *   console.log('Current user:', user.email)
 * } else {
 *   console.log('No user logged in')
 * }
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Middleware function to require authentication for protected routes.
 * Throws an error if no user is authenticated.
 * 
 * @returns {Promise<User>} Authenticated user
 * @throws {Error} If no user is authenticated
 * 
 * @example
 * try {
 *   const user = await requireAuth()
 *   // User is authenticated, proceed with protected operation
 * } catch (error) {
 *   // Redirect to login or show error
 *   redirect('/login')
 * }
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required. Please sign in to access this resource.')
  }
  
  return user
}
