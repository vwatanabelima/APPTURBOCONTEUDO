'use server';

import { generatePracticalFlowPrompt } from '@/ai/flows/generate-practical-flow-prompt';

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
