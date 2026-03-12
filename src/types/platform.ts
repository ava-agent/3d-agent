export type PlatformId = 'meshy' | 'tripo' | 'luma' | 'combos';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  description: string;
  websiteUrl: string;
  createUrl: string;
  color: string;
  supportedInputs: ('text' | 'image')[];
  outputFormats: string[];
  maxPromptLength: number;
  features: string[];
}

export interface GeneratedPrompt {
  platformId: PlatformId;
  prompt: string;
  negativePrompt?: string;
  tips: string[];
  recommendedSettings: Record<string, string>;
  jumpUrl: string;
}
