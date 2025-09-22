
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getUserProgress } from '@/lib/firestore';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { modules } from './modules';
import { useToast } from '@/hooks/use-toast';
import type { UserProgress, LessonProgress } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

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

  const getModuleProgress = (moduleId: string, lessonProgress: LessonProgress | undefined) => {
    const module = modules.find(m => m.id === moduleId);
    const totalLessons = module?.lessons?.length ?? 0;
    if (totalLessons === 0) return 0;

    const completedLessons = lessonProgress 
      ? Object.values(lessonProgress).filter(p => p).length 
      : 0;
      
    return (completedLessons / totalLessons) * 100;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">Módulos</h2>
        <div className="flex space-x-4 overflow-x-auto p-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="min-w-[280px] flex-shrink-0">
              <Skeleton className="h-[444px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
       <h2 className="text-2xl font-semibold tracking-tight">Módulos Disponíveis</h2>
       <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {modules.map((module) => {
            const moduleProgress = progress ? getModuleProgress(module.id, progress[module.id]) : 0;
            return (
              <CarouselItem key={module.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                  <ModuleCard module={module} progress={moduleProgress} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
