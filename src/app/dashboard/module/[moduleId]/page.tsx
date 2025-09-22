

import { modules, type ModuleWithContent } from '@/app/dashboard/modules';
import { StarRating } from '@/components/dashboard/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Comments } from '@/components/dashboard/Comments';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId) as ModuleWithContent | undefined;

  if (!module) {
    return <div className="text-center">Módulo não encontrado.</div>;
  }

  const hasLessons = module.lessons && module.lessons.length > 0;

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="space-y-8">
        <div>
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o painel
            </Link>
          </Button>
          <header className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
            <p className="text-lg text-muted-foreground">{module.description}</p>
          </header>
        </div>


        <div className="grid gap-8">
          <div className="space-y-8">
            {hasLessons ? (
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {module.lessons?.map((lesson, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <Card className="mb-4 overflow-hidden">
                      <AccordionTrigger className="w-full">
                        <CardHeader className="flex-row items-center justify-between p-6">
                            <CardTitle className="text-left text-lg">Aula {index + 1}: {lesson.title}</CardTitle>
                        </CardHeader>
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent className="space-y-6">
                          <div className="overflow-hidden rounded-lg border">
                            <div className="flex h-full min-h-[400px] items-center justify-center bg-muted">
                              <p className="text-muted-foreground">Aqui vai o vídeo do Vimeo</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Avalie esta aula</h3>
                            <StarRating />
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Aula 1: Introdução ao Módulo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="overflow-hidden rounded-lg border">
                    <div className="flex h-full min-h-[400px] items-center justify-center bg-muted">
                      <p className="text-muted-foreground">Aqui vai o vídeo do Vimeo</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Avalie esta aula</h3>
                    <StarRating />
                  </div>
                </CardContent>
              </Card>
            )}

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
                          <material.Icon className="mr-3" />
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
    </div>
  );
}
