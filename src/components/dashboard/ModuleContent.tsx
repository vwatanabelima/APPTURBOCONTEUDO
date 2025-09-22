'use client';

import React, { useState } from 'react';
import type { ModuleWithContent, Lesson, ComplementaryMaterial } from '@/app/dashboard/modules';
import { StarRating } from '@/components/dashboard/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Comments } from '@/components/dashboard/Comments';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

type ModuleContentProps = {
  module: Omit<ModuleWithContent, 'Icon' | 'lessons' | 'complementaryMaterials'> & {
    lessons?: Lesson[];
    complementaryMaterials?: (Omit<ComplementaryMaterial, 'iconName'> & { iconName: keyof typeof LucideIcons })[];
  };
};

const DynamicIcon = ({ name, ...props }: { name: keyof typeof LucideIcons } & LucideIcons.LucideProps) => {
  const Icon = LucideIcons[name];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
};


export default function ModuleContent({ module }: ModuleContentProps) {
  const initialLesson = module?.lessons?.[0] ?? { title: 'Introdução ao Módulo' };
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialLesson);
  
  const hasLessons = module.lessons && module.lessons.length > 0;
  const lessonList = hasLessons ? module.lessons : [initialLesson];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o painel
          </Link>
        </Button>
      </div>
      
      <div className="w-full">
        <div className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
            <p className="text-lg text-muted-foreground">{module.description}</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>{selectedLesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-hidden rounded-lg border">
                <div className="flex h-full min-h-[450px] items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Aqui vai o vídeo do Vimeo</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Avalie esta aula</h3>
                <StarRating />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aulas do Módulo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessonList.map((lesson, index) => (
                <Button
                  key={index}
                  variant={selectedLesson.title === lesson.title ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start text-left h-auto py-3')}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CheckCircle2 className={cn("mr-3 h-5 w-5 flex-shrink-0", selectedLesson.title === lesson.title ? "text-primary" : "text-muted-foreground")} />
                  <span className="flex-1">{lesson.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {module.complementaryMaterials && module.complementaryMaterials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Material Complementar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {module.complementaryMaterials.map((material, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={material.href} target="_blank">
                      <DynamicIcon name={material.iconName} className="mr-3" />
                      {material.title}
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          <Comments />
        </div>
      </div>
    </div>
  );
}
