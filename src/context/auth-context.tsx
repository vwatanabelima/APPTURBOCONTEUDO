'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { initializeUserDocument } from '@/lib/database';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  supabase: SupabaseClient<Database>;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, supabase: getSupabaseBrowserClient() });

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a one-time check for the initial session.
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      if (currentUser) {
        await initializeUserDocument(supabase, currentUser);
      }
      setUser(currentUser);
      setLoading(false); // End loading after the first check
    };

    checkInitialSession();

    // This listener handles all subsequent auth events.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
         // Initialize on sign-in or token refresh to ensure profile exists
        await initializeUserDocument(supabase, currentUser);
      }
      setUser(currentUser);
       // Ensure loading is false after any auth event.
      if (loading) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, loading]); // Keep supabase in dependencies

  const value = {
    user,
    loading,
    supabase
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
