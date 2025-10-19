'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient<Database>;
  setUser: (user: User | null) => void; // Adicionado para permitir atualização manual
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Função para buscar a sessão atual e definir o usuário.
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    // Busca a sessão inicial quando o componente é montado.
    fetchSession();

    // O listener mantém o estado do usuário sincronizado entre abas/janelas.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Limpa a inscrição quando o componente é desmontado.
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);


  const value = {
    user,
    supabase,
    setUser, // Expondo a função setUser
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
