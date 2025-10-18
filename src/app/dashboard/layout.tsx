'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Se não houver sessão ativa, redireciona para o login.
      if (!session) {
        router.push('/login');
      } else {
        // Se há uma sessão, podemos parar de carregar e mostrar o conteúdo.
        setLoading(false);
      }
    };

    checkSession();
  }, [user, supabase, router]);

  // Enquanto estiver verificando a sessão, exibe um spinner.
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Se o carregamento terminou e o usuário está autenticado, renderiza o layout.
  // A verificação `user` vindo do contexto adiciona uma camada extra de segurança.
  if (user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // Se o carregamento terminou, mas não há usuário, o useEffect já cuidou do redirecionamento.
  // Retornar null evita renderizações indesejadas antes do redirecionamento ser concluído.
  return null;
}
