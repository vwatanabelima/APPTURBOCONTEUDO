'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getUserProgress, setModuleCompleted } from '@/lib/firestore';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { PracticalFlowModuleCard } from '@/components/dashboard/PracticalFlowModuleCard';
import { modules } from './modules';
import { useToast } from '@/hooks/use-toast';
import type { UserProgress } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserProgress(user.uid)
        .then((userProgress) => {
          if (userProgress) {
            setProgress(userProgress);
          }
        })
        .catch((error) => {
          console.error('Error fetching user progress:', error);
          toast({
            title: 'Erro ao carregar progresso',
            description: 'Não foi possível buscar seu progresso. Tente novamente mais tarde.',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [user, toast]);

  const handleToggleComplete = async (moduleId: string, completed: boolean) => {
    if (user) {
      try {
        await setModuleCompleted(user.uid, moduleId, completed);
        setProgress((prev) => ({
          ...prev,
          [moduleId]: completed,
        }));
        toast({
          title: 'Progresso salvo!',
          description: `Módulo ${completed ? 'marcado como concluído' : 'marcado como não concluído'}.`,
        });
      } catch (error) {
        console.error('Error updating progress:', error);
        toast({
          title: 'Erro ao salvar progresso',
          description: 'Não foi possível atualizar seu progresso. Tente novamente.',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading) {
     return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 fade-in">
        {modules.map((module) => (
          <div key={module.id} className="h-64 animate-pulse rounded-lg bg-card" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
      {modules.map((module) => {
        const isCompleted = progress ? !!progress[module.id] : false;
        if (module.id === 'module1') {
          return (
            <PracticalFlowModuleCard
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              onToggleComplete={handleToggleComplete}
            />
          );
        }
        return (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={isCompleted}
            onToggleComplete={handleToggleComplete}
          />
        );
      })}
    </div>
  );
}
