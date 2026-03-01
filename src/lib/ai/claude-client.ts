import OpenAI from 'openai';

let client: OpenAI | null = null;

export function getGLMClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GLM_API_KEY!,
      baseURL: 'https://open.bigmodel.cn/api/paas/v4',
    });
  }
  return client;
}
