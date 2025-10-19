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
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o carregamento da autenticação terminou e não há usuário,
    // redireciona para o login.
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  // Enquanto o estado de autenticação está sendo verificado, exibe um spinner.
  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Se o carregamento terminou e há um usuário, renderiza o layout do painel.
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

  // Se o carregamento terminou, mas não há usuário, o useEffect já está
  // cuidando do redirecionamento. Retornar null evita renderizações indesejadas.
  return null;
}
