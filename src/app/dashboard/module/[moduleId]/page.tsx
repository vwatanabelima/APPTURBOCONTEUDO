
import { modules } from '@/app/dashboard/modules';
import { StarRating } from '@/components/dashboard/StarRating';
import { Comments } from '@/components/dashboard/Comments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

            <Comments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
