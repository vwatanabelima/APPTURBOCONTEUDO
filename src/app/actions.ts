'use server';

import { generatePracticalFlowPrompt } from '@/ai/flows/generate-practical-flow-prompt';
import { setLessonCompleted as setLessonCompletedInDb } from '@/lib/firestore';
import { revalidatePath } from 'next/cache';

export async function getPracticalFlowPrompt(topic: string) {
  try {
    const result = await generatePracticalFlowPrompt({ topic });
    if (result.prompt) {
        return { success: true, prompt: result.prompt };
    }
    return { success: false, error: 'Failed to generate prompt.' };
  } catch (error) {
    console.error('Error generating practical flow prompt:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function toggleLessonCompleted(uid: string, moduleId: string, lessonTitle: string, completed: boolean) {
  try {
    await setLessonCompletedInDb(uid, moduleId, lessonTitle, completed);
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/module/${moduleId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return { success: false, error: 'Failed to update progress.' };
  }
}
