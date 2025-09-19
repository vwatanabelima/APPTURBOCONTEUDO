'use server';

/**
 * @fileOverview Generates a prompt for creating a practical workflow using AI.
 *
 * - generatePracticalFlowPrompt - A function that generates the prompt.
 * - GeneratePracticalFlowPromptInput - The input type for the generatePracticalFlowPrompt function.
 * - GeneratePracticalFlowPromptOutput - The return type for the generatePracticalFlowPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticalFlowPromptInputSchema = z.object({
  topic: z.string().describe('The topic for the practical workflow.'),
});
export type GeneratePracticalFlowPromptInput = z.infer<
  typeof GeneratePracticalFlowPromptInputSchema
>;

const GeneratePracticalFlowPromptOutputSchema = z.object({
  prompt: z.string().describe('The generated prompt for the workflow.'),
});
export type GeneratePracticalFlowPromptOutput = z.infer<
  typeof GeneratePracticalFlowPromptOutputSchema
>;

export async function generatePracticalFlowPrompt(
  input: GeneratePracticalFlowPromptInput
): Promise<GeneratePracticalFlowPromptOutput> {
  return generatePracticalFlowPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticalFlowPromptPrompt',
  input: {schema: GeneratePracticalFlowPromptInputSchema},
  output: {schema: GeneratePracticalFlowPromptOutputSchema},
  prompt: `You are an AI prompt generator, skilled at creating prompts for users to create practical workflows.

  Generate a prompt for creating a practical workflow using AI on the following topic: {{{topic}}}. The prompt should guide the user towards a valuable tool for content creation.
  The prompt should include steps for how to use the tool to generate content.
  The prompt should encourage the user to be creative and experiment with the tool.
  The prompt should be clear, concise, and easy to understand.
  The prompt should be no more than 200 words.
  `,
});

const generatePracticalFlowPromptFlow = ai.defineFlow(
  {
    name: 'generatePracticalFlowPromptFlow',
    inputSchema: GeneratePracticalFlowPromptInputSchema,
    outputSchema: GeneratePracticalFlowPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
