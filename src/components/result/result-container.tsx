'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlatformCard } from './platform-card';
import { GeneratePromptsResponse } from '@/types/api';
import { PLATFORMS } from '@/lib/constants';

type ResultData = NonNullable<GeneratePromptsResponse['data']>;

function getStoredResult(): ResultData | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem('3d-agent-result');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function ResultContainer() {
  const router = useRouter();
  const [data] = useState<ResultData | null>(getStoredResult);

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data, router]);

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="shimmer h-24 rounded-2xl" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="shimmer h-96 rounded-2xl" />
          <div className="shimmer h-96 rounded-2xl" />
          <div className="shimmer h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Original Input Banner */}
      <div className="animate-fade-up glass rounded-2xl p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium text-foreground/70">原始输入</p>
            </div>
            <p className="font-semibold truncate text-lg">
              {data.originalInput || '(仅图片输入)'}
            </p>
            {data.translatedInput && (
              <p className="text-sm text-muted-foreground">
                翻译：{data.translatedInput}
              </p>
            )}
            <Badge
              variant="outline"
              className="rounded-lg text-xs border-primary/30 text-primary"
            >
              {data.detectedLanguage === 'zh'
                ? '中文 → English'
                : data.detectedLanguage === 'en'
                  ? 'English'
                  : '其他'}
            </Badge>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="rounded-lg border-border/50"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              返回
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="rounded-lg border-border/50"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              重新生成
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {data.prompts.map((prompt, i) => (
          <div
            key={prompt.platformId}
            className="animate-fade-up"
            style={{ animationDelay: `${100 + i * 150}ms` }}
          >
            <PlatformCard
              prompt={prompt}
              platform={PLATFORMS[prompt.platformId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
