'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { initializeUserDocument } from '@/lib/database';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export default function LoginPage() {
  const { supabase, user, setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    });

    if (error) {
        console.error(error);
        toast({
            title: 'Erro no login',
            description: 'Credenciais inválidas. Por favor, verifique seu email e senha.',
            variant: 'destructive',
        });
        setIsSubmitting(false);
    } else if (data.user) {
        try {
            await initializeUserDocument(data.user);
            setUser(data.user); // Explicitamente atualiza o estado do usuário
            toast({
                title: 'Login bem-sucedido!',
                description: 'Redirecionando para o painel...',
                variant: 'success',
            });
            router.push('/dashboard');
            router.refresh(); 
        } catch (initError: any) {
            console.error('Falha ao inicializar perfil do usuário:', initError);
            if (initError?.message?.includes('violates row-level security policy')) {
                 toast({
                    title: 'Erro de Permissão no Banco de Dados',
                    description: 'Seu perfil não pôde ser criado devido a políticas de segurança. Verifique as políticas de "INSERT" na tabela "users" do seu painel Supabase.',
                    variant: 'destructive',
                    duration: 10000, // Show for longer
                });
            } else {
                toast({
                    title: 'Erro Pós-Login',
                    description: 'Seu login foi bem-sucedido, mas houve um erro ao configurar seu perfil.',
                    variant: 'destructive',
                });
            }
             // Importante: faça o logout para não deixar o usuário em um estado inconsistente
            await supabase.auth.signOut();
            setIsSubmitting(false);
        }
    }
  }
  
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
           <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Erro de Configuração do Supabase</AlertTitle>
            <AlertDescription>
              As variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` não foram encontradas. Por favor, configure seu arquivo `.env` ou as configurações de ambiente da sua plataforma de hospedagem.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Icons.logo className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold sm:text-3xl">Bem-vindo ao TurboConteúdo</CardTitle>
            <CardDescription>Faça login para turbinar seu conteúdo</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Senha</FormLabel>
                         <Link href="/reset-password" passHref className="text-sm text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Criado por <a href="https://www.instagram.com/watanabe.ia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">@watanabe.ia 🤖</a>
        </div>
      </div>
    </div>
  );
}
