'use server';

/**
 * @fileOverview An AI agent to enhance pet photos for the gallery.
 *
 * - enhancePetPhoto - A function that enhances a pet photo using GenAI.
 * - EnhancePetPhotoInput - The input type for the enhancePetPhoto function.
 * - EnhancePetPhotoOutput - The return type for the enhancePetPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePetPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'The pet photo to enhance, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the example
    ),
});

export type EnhancePetPhotoInput = z.infer<typeof EnhancePetPhotoInputSchema>;

const EnhancePetPhotoOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe('The enhanced pet photo as a data URI.'),
});

export type EnhancePetPhotoOutput = z.infer<typeof EnhancePetPhotoOutputSchema>;

export async function enhancePetPhoto(
  input: EnhancePetPhotoInput
): Promise<EnhancePetPhotoOutput> {
  return enhancePetPhotoFlow(input);
}

const enhancePetPhotoPrompt = ai.definePrompt({
  name: 'enhancePetPhotoPrompt',
  input: {schema: EnhancePetPhotoInputSchema},
  output: {schema: EnhancePetPhotoOutputSchema},
  prompt: [
    {
      media: {url: '{{photoDataUri}}'},
    },
    {
      text: 'Enhance this pet photo to improve its visual quality, sharpness, and overall appeal. Make sure that the color tone align with warm peach cream (#FFF1E6) background and evokes a cozy and premium ambiance. The enhanced picture must have a consistent aspect ratio.',
    },
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const enhancePetPhotoFlow = ai.defineFlow(
  {
    name: 'enhancePetPhotoFlow',
    inputSchema: EnhancePetPhotoInputSchema,
    outputSchema: EnhancePetPhotoOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text:
            'Enhance this pet photo to improve its visual quality, sharpness, and overall appeal. Make sure that the color tone align with warm peach cream (#FFF1E6) background and evokes a cozy and premium ambiance. The enhanced picture must have a consistent aspect ratio.',
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {enhancedPhotoDataUri: media!.url};
  }
);
