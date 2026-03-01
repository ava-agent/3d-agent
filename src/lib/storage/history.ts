import { HistoryEntry } from '@/types/history';
import { GeneratePromptsResponse } from '@/types/api';
import { HISTORY_STORAGE_KEY, MAX_HISTORY_ENTRIES } from '@/lib/constants';

export function saveToHistory(
  response: GeneratePromptsResponse,
  imagePreviewUrl?: string
): HistoryEntry | null {
  if (!response.success || !response.data) return null;

  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    userInput: response.data.originalInput,
    hasImage: !!imagePreviewUrl,
    imagePreviewUrl,
    prompts: response.data.prompts,
    createdAt: response.data.generatedAt,
  };

  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    const entries: HistoryEntry[] = stored ? JSON.parse(stored) : [];
    const next = [entry, ...entries].slice(0, MAX_HISTORY_ENTRIES);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage quota exceeded - silently fail
  }

  return entry;
}
