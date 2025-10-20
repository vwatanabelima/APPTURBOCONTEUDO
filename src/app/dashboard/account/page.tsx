
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  password: z.string().min(6, { message: 'A nova senha deve ter pelo menos 6 caracteres.' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem.',
  path: ['confirmPassword'],
});

export default function AccountPage() {
  const { supabase, user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({
        password: values.password
    });

    if (error) {
        console.error('Error updating password:', error);
        toast({
            title: 'Erro ao atualizar senha',
            description: 'Não foi possível alterar sua senha. Tente novamente mais tarde.',
            variant: 'destructive',
        });
    } else {
        toast({
            title: 'Senha alterada com sucesso!',
            description: 'Sua senha foi atualizada.',
            variant: 'success',
        });
        form.reset();
    }
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6 sm:py-8">
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
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Minha Conta</h1>
                <p className="text-lg text-muted-foreground">Gerencie as informações da sua conta e segurança.</p>
            </header>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <KeyRound className="h-5 w-5 text-muted-foreground"/>
                        <CardTitle>Alterar Senha</CardTitle>
                    </div>
                    <CardDescription>
                        Para sua segurança, recomendamos o uso de uma senha forte e única.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nova Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Confirmar Nova Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                                {isSubmitting ? 'Salvando...' : 'Salvar Nova Senha'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
