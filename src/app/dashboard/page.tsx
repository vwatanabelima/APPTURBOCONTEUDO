
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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

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
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Módulos</h2>
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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
      <div className="space-y-6 fade-in">
         <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Módulos Disponíveis</h2>
         <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {modules.map((module, index) => {
              const moduleProgress = progress ? getModuleProgress(module.id, progress[module.id]) : 0;
              return (
                <CarouselItem key={module.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                  <ModuleCard module={module} progress={moduleProgress} priority={index < 4} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>

      <div className="space-y-6 fade-in">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Você também pode gostar de:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Card className="relative group flex h-[444px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/50 bg-card/50 p-6 text-center shadow-none">
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">Em Breve</Badge>
            </div>
            <div className="mb-4 rounded-full bg-muted/80 p-4">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground">PROMPT Raiz - O criador de prompts e assistentes</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Desbloqueie o poder de criar seus próprios prompts e assistentes de IA personalizados.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
