'use client';

import { useRouter } from 'next/navigation';
import { History, Trash2, ArrowRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHistory } from '@/lib/hooks/use-history';
import { PLATFORMS } from '@/lib/constants';

export default function HistoryPage() {
  const router = useRouter();
  const { entries, removeEntry, clearAll } = useHistory();

  const handleViewDetail = (entry: (typeof entries)[0]) => {
    const resultData = {
      originalInput: entry.userInput,
      detectedLanguage: 'zh' as const,
      prompts: entry.prompts,
      generatedAt: entry.createdAt,
    };
    sessionStorage.setItem('3d-agent-result', JSON.stringify(resultData));
    router.push('/result');
  };

  const handleClearAll = () => {
    clearAll();
    toast.success('已清空所有历史记录');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <History className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">生成历史</h1>
          </div>
          {entries.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="rounded-lg border-border/50 text-muted-foreground hover:text-destructive hover:border-destructive/50"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              清空
            </Button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="glass flex flex-col items-center gap-5 rounded-2xl p-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50">
              <Clock className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-semibold text-lg">还没有生成记录</p>
              <p className="mt-1 text-sm text-muted-foreground">
                去首页试试吧
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="rounded-lg"
            >
              前往首页
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="animate-fade-up glass rounded-xl p-4 platform-card"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground/60">
                        {new Date(entry.createdAt).toLocaleString('zh-CN')}
                      </span>
                      {entry.hasImage && (
                        <Badge
                          variant="outline"
                          className="rounded-md text-xs border-neon-violet/30 text-neon-violet"
                        >
                          含图片
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium truncate">
                      {entry.userInput || '(仅图片输入)'}
                    </p>
                    <div className="flex gap-1.5">
                      {entry.prompts.map((p) => (
                        <span
                          key={p.platformId}
                          className="rounded-md px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `${PLATFORMS[p.platformId]?.color}15`,
                            color: PLATFORMS[p.platformId]?.color,
                            border: `1px solid ${PLATFORMS[p.platformId]?.color}30`,
                          }}
                        >
                          {PLATFORMS[p.platformId]?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetail(entry)}
                      className="h-8 w-8 rounded-lg p-0 hover:bg-primary/10 hover:text-primary"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeEntry(entry.id);
                        toast.success('已删除');
                      }}
                      className="h-8 w-8 rounded-lg p-0 text-muted-foreground/50 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
