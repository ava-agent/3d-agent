import { GeneratedPrompt } from './platform';

export interface GeneratePromptsRequest {
  userInput: string;
  imageBase64?: string;
  imageMimeType?: string;
  targetUse?: '3d-printing' | 'game-asset' | 'visualization';
}

export interface GeneratePromptsResponse {
  success: boolean;
  data?: {
    originalInput: string;
    detectedLanguage: 'zh' | 'en' | 'other';
    translatedInput?: string;
    prompts: GeneratedPrompt[];
    generatedAt: string;
  };
  error?: string;
}
