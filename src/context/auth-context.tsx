'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient<Database>;
};

// @ts-ignore
const AuthContext = createContext<AuthContextType>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);

  // O listener onAuthStateChange é a forma mais confiável de manter o estado do usuário
  // sincronizado em toda a aplicação (abas, etc.).
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);


  const value = {
    user,
    supabase,
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
