'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type AuthContextType = {
  user: User | null;
  supabase: SupabaseClient<Database>;
  setUser: (user: User | null) => void;
  isAuthLoading: boolean; // Adicionado para rastrear o estado de carregamento
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Começa como true

  useEffect(() => {
    // Função para buscar a sessão atual e definir o usuário.
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsAuthLoading(false); // Termina o carregamento após a primeira verificação
    };

    // Busca a sessão inicial quando o componente é montado.
    fetchSession();

    // O listener mantém o estado do usuário sincronizado entre abas/janelas.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Se o usuário faz login/logout em outra aba, o estado de carregamento não precisa mudar.
      if (isAuthLoading) {
        setIsAuthLoading(false);
      }
    });

    // Limpa a inscrição quando o componente é desmontado.
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, isAuthLoading]);


  const value = {
    user,
    supabase,
    setUser,
    isAuthLoading,
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
