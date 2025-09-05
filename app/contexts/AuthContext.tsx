"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { User } from "@supabase/supabase-js";

/**
 * Authentication context type definition.
 * 
 * @interface AuthContextType
 * @property {User | null} user - Current authenticated user or null if not logged in
 */
interface AuthContextType {
  user: User | null;
}

/**
 * Authentication context for managing user state across the application.
 * 
 * This context provides the current authenticated user to all components
 * that consume it. It automatically listens to Supabase auth state changes
 * and updates the user state accordingly.
 * 
 * @default { user: null }
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
});

/**
 * Props for the AuthProvider component.
 * 
 * @interface AuthProviderProps
 * @property {React.ReactNode} children - Child components to wrap with auth context
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication provider component that manages user state and auth state changes.
 * 
 * This component:
 * - Creates a Supabase client for client-side operations
 * - Listens to authentication state changes (login, logout, session refresh)
 * - Provides the current user state to all child components
 * - Automatically cleans up subscriptions on unmount
 * 
 * @param {AuthProviderProps} props - Component props
 * @returns {JSX.Element} Context provider wrapping children
 * 
 * @example
 * // Wrap your app with the AuthProvider
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourAppComponents />
 *     </AuthProvider>
 *   )
 * }
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    // This handles login, logout, session refresh, and token expiration
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Update user state based on the current session
      // If session exists, use the user from it; otherwise, set to null
      setUser(session?.user ?? null);
      
      // Optional: Log auth events for debugging
      console.log('Auth state changed:', event, session?.user?.email);
    });

    // Cleanup subscription on component unmount to prevent memory leaks
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * 
 * This hook provides easy access to the current user state from any component
 * that's wrapped with the AuthProvider. It should only be used within the
 * AuthProvider's component tree.
 * 
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * function MyComponent() {
 *   const { user } = useAuth()
 *   
 *   if (!user) {
 *     return <div>Please log in</div>
 *   }
 *   
 *   return <div>Welcome, {user.email}!</div>
 * }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
