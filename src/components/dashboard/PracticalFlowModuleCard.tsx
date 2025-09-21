
'use client';

import { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { getPracticalFlowPrompt } from '@/app/actions';
import type { Module } from '@/app/dashboard/modules';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type PracticalFlowModuleCardProps = {
  module: Module;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string, completed: boolean) => void;
};

export function PracticalFlowModuleCard({ module, isCompleted, onToggleComplete }: PracticalFlowModuleCardProps) {
  const { Icon, title, description } = module;
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGeneratePrompt = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    startTransition(async () => {
      const result = await getPracticalFlowPrompt(title);
      if (result.success && result.prompt) {
        setGeneratedPrompt(result.prompt);
        setIsDialogOpen(true);
        if (!isCompleted) {
          onToggleComplete(module.id, true);
        }
      } else {
        toast({
          title: 'Erro ao gerar prompt',
          description: result.error || 'Não foi possível se comunicar com a IA. Tente novamente.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="flex h-full flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGeneratePrompt} disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? 'Gerando...' : 'Gerar Prompt com IA'}
          </Button>
        </CardContent>
        <CardFooter>
          {isCompleted && (
            <Badge variant="secondary" className="border-primary text-primary">Concluído</Badge>
          )}
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prompt Gerado!</DialogTitle>
          <DialogDescription>
            Use este prompt como ponto de partida para sua criação.
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-invert mt-4 max-h-[60vh] overflow-y-auto rounded-md border bg-secondary/50 p-4 text-sm text-foreground">
          <p>{generatedPrompt}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
