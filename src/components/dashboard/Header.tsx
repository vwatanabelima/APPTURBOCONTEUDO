'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { LogOut, LifeBuoy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { Icons } from '@/components/icons';
import { Progress } from '@/components/ui/progress';
import { getUserProgress } from '@/lib/firestore';
import { modules } from '@/app/dashboard/modules';
import type { UserProgress, LessonProgress } from '@/types';


const calculateOverallProgress = (progress: UserProgress | null): number => {
    if (!progress) return 0;

    let totalLessons = 0;
    let completedLessons = 0;

    for (const moduleId of modules.map(m => m.id)) {
        const module = modules.find(m => m.id === moduleId);
        const moduleLessons = module?.lessons ?? [];
        totalLessons += moduleLessons.length;

        const moduleProgress = progress[moduleId];
        if (moduleProgress) {
            completedLessons += Object.values(moduleProgress).filter(p => p).length;
        }
    }

    if (totalLessons === 0) return 0;
    return (completedLessons / totalLessons) * 100;
};


export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [progress, setProgress] = useState<UserProgress | null>(null);

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
        });
    }
  }, [user]);

  const overallProgress = calculateOverallProgress(progress);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
        variant: 'success',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erro ao sair',
        description: 'Não foi possível fazer logout. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <Icons.logo className="h-6 w-6 text-primary" />
        <span className="">TurboConteúdo</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName ?? ''} />}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
             <DropdownMenuLabel>
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-medium leading-none text-muted-foreground">
                  Seu Progresso
                </p>
                <div className="flex items-center gap-2">
                   <Progress value={overallProgress} className="h-1.5" />
                   <span className="text-xs font-semibold">{Math.round(overallProgress)}%</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Suporte</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
