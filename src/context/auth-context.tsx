'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { initializeUserDocument } from '@/lib/database';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  supabase: SupabaseClient<Database> | null;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, supabase: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser) {
        // Initialize user document on sign in if it doesn't exist
        if (event === 'SIGNED_IN') {
           await initializeUserDocument(supabase, currentUser);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    // Check initial session
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      
      if(currentUser) {
          // Ensure user document is there on first load
          await initializeUserDocument(supabase, currentUser);
      }
      setUser(currentUser);
      setLoading(false);
    }
    
    checkInitialSession();


    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

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
