
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
});

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/update-password`, // This page needs to be created
    });

    if (error) {
        console.error(error);
        toast({
            title: 'Erro',
            description: 'Não foi possível enviar o email de redefinição. Verifique o email e tente novamente.',
            variant: 'destructive',
        });
    } else {
        toast({
            title: 'Email enviado!',
            description: 'Verifique sua caixa de entrada para o link de redefinição de senha.',
        });
        setSubmitted(true);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4">
              <Icons.logo className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Redefinir Senha</CardTitle>
            <CardDescription>
              {submitted 
                ? 'Verifique seu email para continuar.' 
                : 'Insira seu email para receber um link de redefinição.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center">
                <p className="mb-4">Um email foi enviado para o endereço fornecido com as instruções.</p>
                <Button asChild>
                  <Link href="/login">Voltar para o Login</Link>
                </Button>
              </div>
            ) : (
              <>
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
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar link de redefinição'}
                    </Button>
                  </form>
                </Form>
                 <div className="mt-4 text-center text-sm">
                  Lembrou da senha?{' '}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Faça login
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Criado por <a href="https://www.instagram.com/watanabe.ia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">@watanabe.ia 🤖</a>
        </div>
      </div>
    </div>
  );
}
