import { getSupabaseBrowserClient } from './supabase';
import { modules } from '@/app/dashboard/modules';
import type { UserProgress } from '@/types';
import type { User } from '@supabase/supabase-js';

function getInitialProgress(): UserProgress {
  return modules.reduce((acc, module) => {
    const lessonProgress = module.lessons?.reduce((lessonAcc, lesson) => {
      lessonAcc[lesson.title] = false;
      return lessonAcc;
    }, {} as { [title: string]: boolean });
    
    acc[module.id] = lessonProgress ?? {};
    return acc;
  }, {} as UserProgress);
}


export async function initializeUserDocument(user: User) {
  const supabase = getSupabaseBrowserClient();
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id, progress')
    .eq('id', user.id)
    .single();

  // 'PGRST116' é o código para 'Not a single row was found', o que é esperado para um novo usuário.
  // Se houver um erro, e NÃO for o erro esperado, nós o registramos e lançamos.
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user profile:', fetchError.message);
    throw fetchError;
  }

  // Se não houver um usuário existente, crie o documento de perfil.
  if (!existingUser) {
    const initialProgress = getInitialProgress();
    const { error: insertError } = await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      progress: initialProgress,
    });
    if (insertError) {
      console.error('Error creating user profile:', insertError.message);
      throw insertError;
    }
  } else {
    // Se o usuário já existe, verificamos se o progresso precisa ser atualizado com novos módulos/aulas.
    const existingProgress = existingUser.progress as UserProgress || {};
    const defaultProgress = getInitialProgress();
    let needsUpdate = false;
    
    // Deep merge para adicionar módulos/aulas ausentes sem sobrescrever o progresso existente.
    for (const moduleId in defaultProgress) {
      if (!existingProgress[moduleId]) {
        existingProgress[moduleId] = defaultProgress[moduleId];
        needsUpdate = true;
      } else {
        for (const lessonTitle in defaultProgress[moduleId]) {
          if (existingProgress[moduleId][lessonTitle] === undefined) {
            existingProgress[moduleId][lessonTitle] = false;
            needsUpdate = true;
          }
        }
      }
    }
    
    if(needsUpdate) {
        const { error: updateError } = await supabase
            .from('users')
            .update({ progress: existingProgress })
            .eq('id', user.id);
        
        if (updateError) {
            console.error('Error updating user progress with new lessons:', updateError.message);
            throw updateError;
        }
    }
  }
}

export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('users')
    .select('progress')
    .eq('id', uid)
    .single();

  if (error) {
    console.warn(`Could not get user progress for ${uid}:`, error.message);
    return null;
  }

  return data?.progress as UserProgress | null;
}

export async function setLessonCompleted(uid: string, moduleId: string, lessonTitle: string, completed: boolean) {
    const supabase = getSupabaseBrowserClient();
    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('progress')
        .eq('id', uid)
        .single();
    
    if (fetchError || !user) {
        console.error('Failed to fetch user for progress update', fetchError);
        throw new Error('Failed to fetch user for progress update');
    }

    const progress = (user.progress as UserProgress) || {};
    if (!progress[moduleId]) {
        progress[moduleId] = {};
    }
    progress[moduleId][lessonTitle] = completed;

    const { error: updateError } = await supabase
        .from('users')
        .update({ progress })
        .eq('id', uid);

    if (updateError) {
        console.error('Failed to update lesson progress', updateError);
        throw updateError;
    }
}
