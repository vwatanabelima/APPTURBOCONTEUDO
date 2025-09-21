
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Module } from '@/app/dashboard/modules';
import { cn } from '@/lib/utils';

type ModuleCardProps = {
  module: Module;
  isCompleted: boolean;
};

export function ModuleCard({ module, isCompleted }: ModuleCardProps) {
  const { Icon, title } = module;
  
  let imageUrl: string;

  switch (module.id) {
    case 'module2':
      imageUrl = 'https://i.imgur.com/rS08i1P.png';
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
    <Link href={`/dashboard/module/${module.id}`} passHref>
      <Card className="group relative block h-[444px] w-[250px] overflow-hidden rounded-lg border-none bg-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={533}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75"
          data-ai-hint="movie poster"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
           <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/50 backdrop-blur-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>

        {isCompleted && (
           <CardFooter className="absolute top-2 right-2 p-0">
            <Badge variant="secondary" className="border-primary bg-primary/80 text-primary-foreground backdrop-blur-sm">
              Concluído
            </Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
