import { getArkClient, getArkModel } from './ark-client';
import { SYSTEM_PROMPT } from './system-prompt';
import { GeneratePromptsRequest, GeneratePromptsResponse } from '@/types/api';
import { GeneratedPrompt, PlatformId } from '@/types/platform';
import { PLATFORMS } from '@/lib/constants';
import { ChatCompletionContentPart } from 'openai/resources/chat/completions';

interface ArkPlatformResult {
  prompt: string;
  negativePrompt?: string;
  tips: string[];
  recommendedSettings: Record<string, string>;
}

interface ArkPromptResult {
  detectedLanguage: 'zh' | 'en' | 'other';
  translatedInput: string | null;
  prompts: Record<string, ArkPlatformResult>;
}

export async function generatePrompts(
  request: GeneratePromptsRequest
): Promise<GeneratePromptsResponse> {
  const client = getArkClient();

  const contentParts: ChatCompletionContentPart[] = [];

  if (request.imageBase64 && request.imageMimeType) {
    contentParts.push({
      type: 'image_url',
      image_url: {
        url: `data:${request.imageMimeType};base64,${request.imageBase64}`,
      },
    });
    contentParts.push({
      type: 'text',
      text: request.userInput
        ? `The user wants to create a 3D model. They provided this image as reference and this description: "${request.userInput}". The target use is: ${request.targetUse || '3d-printing'}. Generate optimized prompts for each platform.`
        : `The user wants to create a 3D model based on this reference image. The target use is: ${request.targetUse || '3d-printing'}. Describe what you see and generate optimized prompts for each platform.`,
    });
  } else {
    contentParts.push({
      type: 'text',
      text: `The user wants to create a 3D model with this description: "${request.userInput}". The target use is: ${request.targetUse || '3d-printing'}. Generate optimized prompts for each platform.`,
    });
  }

  const model = getArkModel(!!request.imageBase64);

  const completion = await client.chat.completions.create({
    model,
    max_tokens: 2000,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: contentParts },
    ],
  });

  const responseText = completion.choices[0]?.message?.content || '';

  // Extract JSON from response in case the model wraps it in markdown code blocks.
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse model response as JSON');
  }

  const result: ArkPromptResult = JSON.parse(jsonMatch[0]);

  const platformIds: PlatformId[] = ['meshy', 'tripo', 'luma', 'combos'];
  const prompts: GeneratedPrompt[] = platformIds.map((id) => ({
    platformId: id,
    prompt: result.prompts[id].prompt,
    negativePrompt: result.prompts[id].negativePrompt,
    tips: result.prompts[id].tips,
    recommendedSettings: result.prompts[id].recommendedSettings,
    jumpUrl: PLATFORMS[id].createUrl,
  }));

  return {
    success: true,
    data: {
      originalInput: request.userInput,
      detectedLanguage: result.detectedLanguage,
      translatedInput: result.translatedInput ?? undefined,
      prompts,
      generatedAt: new Date().toISOString(),
    },
  };
}
