'use client';

import { useState } from 'react';
import { GeneratePromptsRequest, GeneratePromptsResponse } from '@/types/api';

export function useGenerate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(
    request: GeneratePromptsRequest
  ): Promise<GeneratePromptsResponse | null> {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const data: GeneratePromptsResponse = await res.json();

      if (!data.success) {
        setError(data.error || '生成失败');
        return null;
      }

      return data;
    } catch {
      setError('网络错误，请检查连接后重试');
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { generate, isLoading, error };
}
