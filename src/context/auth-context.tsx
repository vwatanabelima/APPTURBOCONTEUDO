
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { initializeUserDocument } from '@/lib/database';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getSupabaseBrowserClient is called inside useEffect, ensuring it runs only on the client.
    const supabaseClient = getSupabaseBrowserClient();
    setSupabase(supabaseClient);

    const checkUser = async () => {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        const currentUser = session?.user ?? null;
        if (currentUser) {
          // Pass the client instance to the database function
          await initializeUserDocument(supabaseClient, currentUser);
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser) {
        // Pass the client instance to the database function
        await initializeUserDocument(supabaseClient, currentUser);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
