import OpenAI from 'openai';

let client: OpenAI | null = null;

export const DEFAULT_ARK_BASE_URL = 'https://ark.cn-beijing.volces.com/api/plan/v3';
export const DEFAULT_ARK_CHAT_MODEL = 'doubao-seed-2-0-code-preview-260215';

export function getArkClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) {
      throw new Error('ARK_API_KEY is not configured');
    }

    client = new OpenAI({
      apiKey,
      baseURL: (process.env.ARK_BASE_URL || DEFAULT_ARK_BASE_URL).replace(/\/$/, ''),
    });
  }
  return client;
}

export function getArkModel(hasImage: boolean): string {
  if (hasImage) {
    return process.env.ARK_VISION_MODEL || process.env.ARK_CHAT_MODEL || DEFAULT_ARK_CHAT_MODEL;
  }
  return process.env.ARK_CHAT_MODEL || DEFAULT_ARK_CHAT_MODEL;
}
