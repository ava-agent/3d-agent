import { GeneratedPrompt } from './platform';

export interface HistoryEntry {
  id: string;
  userInput: string;
  hasImage: boolean;
  imagePreviewUrl?: string;
  prompts: GeneratedPrompt[];
  createdAt: string;
}
