'use client';

import React, { useState, useEffect, useTransition } from 'react';
import type { ModuleWithContent, Lesson, ComplementaryMaterial } from '@/app/dashboard/modules';
import { StarRating } from '@/components/dashboard/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Comments } from '@/components/dashboard/Comments';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { getUserProgress } from '@/lib/firestore';
import type { LessonProgress } from '@/types';
import { toggleLessonCompleted } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type ModuleContentProps = Omit<ModuleWithContent, 'Icon'>;


const DynamicIcon = ({ name, ...props }: { name: keyof typeof LucideIcons } & LucideIcons.LucideProps) => {
  const Icon = LucideIcons[name];

  if (!Icon) {
    return <LucideIcons.File className="mr-3" />;
  }

  return <Icon {...props} />;
};


export default function ModuleContent({ id, title, description, lessons, complementaryMaterials }: ModuleContentProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const initialLesson = lessons?.[0] ?? { title: 'Introdução ao Módulo' };
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialLesson);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});

  useEffect(() => {
    if (user) {
      getUserProgress(user.uid).then(progress => {
        if (progress && progress[id]) {
          setLessonProgress(progress[id]);
        }
      });
    }
  }, [user, id]);

  const handleToggleComplete = (lessonTitle: string) => {
    if (!user) return;
    const currentStatus = !!lessonProgress[lessonTitle];
    const newStatus = !currentStatus;

    startTransition(async () => {
      const result = await toggleLessonCompleted(user.uid, id, lessonTitle, newStatus);
      if (result.success) {
        setLessonProgress(prev => ({ ...prev, [lessonTitle]: newStatus }));
        toast({
          title: newStatus ? 'Aula concluída!' : 'Progresso desmarcado',
          description: `A aula "${lessonTitle}" foi atualizada.`,
          variant: 'success'
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar seu progresso. Tente novamente.',
          variant: 'destructive',
        });
      }
    });
  };
  
  const hasLessons = lessons && lessons.length > 0;
  const lessonList = hasLessons ? lessons : [initialLesson];
  const isLessonCompleted = !!lessonProgress[selectedLesson.title];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="mb-4">
        <Button asChild variant="ghost" className="pl-0">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o painel
          </Link>
        </Button>
      </div>
      
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{selectedLesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-hidden rounded-lg border">
               {selectedLesson.youtubeVideoId ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${selectedLesson.youtubeVideoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
              ) : (
                <div className="flex h-full min-h-[250px] sm:min-h-[450px] items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Vídeo não disponível</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Avalie esta aula</h3>
                <StarRating />
              </div>
              {hasLessons && (
                <Button 
                  onClick={() => handleToggleComplete(selectedLesson.title)}
                  disabled={isPending}
                  variant={isLessonCompleted ? 'default' : 'secondary'}
                  className={cn(
                    "w-full sm:w-auto",
                    isLessonCompleted && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {isLessonCompleted ? 'Aula Concluída' : 'Concluir Aula'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {hasLessons && (
          <Card>
            <CardHeader>
              <CardTitle>Aulas do Módulo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessonList.map((lesson, index) => {
                const isCompleted = !!lessonProgress[lesson.title];
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Button
                      variant={selectedLesson.title === lesson.title ? 'secondary' : 'ghost'}
                      className={cn('w-full justify-start text-left h-auto py-3 px-3')}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <CheckCircle2 className={cn("mr-3 h-5 w-5 flex-shrink-0", isCompleted ? "text-primary" : "text-muted-foreground")} />
                      <span className="flex-1 whitespace-normal">{lesson.title}</span>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {complementaryMaterials && complementaryMaterials.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Material Complementar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {complementaryMaterials.map((material, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto text-left"
                  asChild
                >
                  <Link href={material.href} target="_blank" className="flex items-center p-3">
                    <DynamicIcon name={material.iconName} className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-1 whitespace-normal">{material.title}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        <Comments />
      </div>
    </div>
  );
}
