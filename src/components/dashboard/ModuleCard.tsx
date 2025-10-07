
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Module } from '@/app/dashboard/modules';
import { Progress } from '@/components/ui/progress';

type ModuleCardProps = {
  module: Module;
  progress: number;
  priority?: boolean;
};

export function ModuleCard({ module, progress, priority = false }: ModuleCardProps) {
  const { Icon, title } = module;
  const isCompleted = progress === 100;
  
  let imageUrl: string;

  switch (module.id) {
    case 'module1':
      imageUrl = 'https://i.imgur.com/njvY0rC.png';
      break;
    case 'module2':
      imageUrl = 'https://i.imgur.com/eXXkI9v.png';
      break;
    case 'module3':
      imageUrl = 'https://i.imgur.com/6v1kzRN.png';
      break;
    case 'module4':
      imageUrl = 'https://i.imgur.com/DI41X2D.png';
      break;
    case 'module5':
      imageUrl = 'https://i.imgur.com/QgeiXKW.png';
      break;
    default:
      imageUrl = `https://picsum.photos/seed/${module.id}/300/533`;
      break;
  }

  return (
     <Link href={`/dashboard/module/${module.id}`} passHref legacyBehavior>
        <Card className="group relative block h-[444px] w-full cursor-pointer overflow-hidden rounded-lg border-none bg-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75"
            data-ai-hint="movie poster"
            priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/50 backdrop-blur-sm">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            </div>

            {isCompleted && (
            <div className="absolute top-2 right-2 p-0">
                <Badge variant="secondary" className="border-primary bg-primary/80 text-primary-foreground backdrop-blur-sm">
                Concluído
                </Badge>
            </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
            <Progress value={progress} className="h-1 bg-white/20" />
            </div>
        </Card>
    </Link>
  );
}
