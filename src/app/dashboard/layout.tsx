'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Apenas redireciona se o carregamento inicial terminou e não há usuário.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Enquanto estiver carregando, exibe um spinner para evitar piscar o conteúdo
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Se o carregamento terminou e há um usuário, renderiza o layout e o conteúdo.
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

  // Se o carregamento terminou e não há usuário, o useEffect já cuidou do redirecionamento.
  // Retornar null evita que qualquer conteúdo do painel seja renderizado antes do redirecionamento.
  return null;
}
