
import { modules } from '@/app/dashboard/modules';
import { StarRating } from '@/components/dashboard/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Comments } from '@/components/dashboard/Comments';

const complementaryMaterials: any[] = [
];

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId);

  if (!module) {
    return <div className="text-center">Módulo não encontrado.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
          <p className="text-lg text-muted-foreground">{module.description}</p>
        </header>

        <div className="grid gap-8">
          <div className="space-y-8">
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

            <Card>
              <CardHeader>
                <CardTitle>Material Complementar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {complementaryMaterials.length > 0 ? (
                  complementaryMaterials.map((material, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={material.href}>
                        <material.Icon className="mr-3" />
                        {material.title}
                      </Link>
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum material complementar para esta aula.</p>
                )}
              </CardContent>
            </Card>

            <Comments />

          </div>
        </div>
      </div>
    </div>
  );
}
