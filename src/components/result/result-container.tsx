'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PlatformCard } from './platform-card';
import { GeneratePromptsResponse } from '@/types/api';
import { PLATFORMS } from '@/lib/constants';

type ResultData = NonNullable<GeneratePromptsResponse['data']>;

export function ResultContainer() {
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('3d-agent-result');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Original Input Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-muted/50 p-4">
        <div className="space-y-1 min-w-0">
          <p className="text-sm text-muted-foreground">原始输入</p>
          <p className="font-medium truncate">{data.originalInput || '(仅图片输入)'}</p>
          {data.translatedInput && (
            <p className="text-sm text-muted-foreground">
              翻译：{data.translatedInput}
            </p>
          )}
          <div className="flex gap-2">
            <Badge variant="outline">
              {data.detectedLanguage === 'zh'
                ? '中文'
                : data.detectedLanguage === 'en'
                  ? 'English'
                  : '其他'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            返回
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/')}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            重新生成
          </Button>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {data.prompts.map((prompt) => (
          <PlatformCard
            key={prompt.platformId}
            prompt={prompt}
            platform={PLATFORMS[prompt.platformId]}
          />
        ))}
      </div>
    </div>
  );
}
