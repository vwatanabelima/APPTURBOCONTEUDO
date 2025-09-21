import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Module } from '@/app/dashboard/modules';

type ModuleCardProps = {
  module: Module;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string, completed: boolean) => void;
};

export function ModuleCard({ module, isCompleted }: ModuleCardProps) {
  const { Icon, title, description } = module;

  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {isCompleted && (
          <Badge variant="secondary" className="border-primary text-primary">Concluído</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
