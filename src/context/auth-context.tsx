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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificação inicial e síncrona da sessão.
    // Isso é mais rápido e menos propenso a condições de corrida.
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false); // Define o loading como falso aqui, após a primeira verificação.
    };

    checkInitialSession();

    // 2. O listener de onAuthStateChange cuida de TODAS as mudanças subsequentes.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        // Inicializa o documento do usuário se ele acabou de fazer login
        await initializeUserDocument(supabase, currentUser);
      }
      setUser(currentUser);
      
      // O loading já foi resolvido na verificação inicial, mas garantimos que ele permaneça falso.
      if (loading) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  // A dependência do 'supabase' garante que isso só rode uma vez.
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
