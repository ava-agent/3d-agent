'use client';

import { useRouter } from 'next/navigation';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">生成历史</h1>
          </div>
          {entries.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              清空
            </Button>
          )}
        </div>

        {entries.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 p-12 text-center">
            <History className="h-12 w-12 text-muted-foreground/50" />
            <div>
              <p className="font-medium">还没有生成记录</p>
              <p className="text-sm text-muted-foreground">
                去首页试试吧
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push('/')}>
              前往首页
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleString('zh-CN')}
                      </span>
                      {entry.hasImage && (
                        <Badge variant="secondary" className="text-xs">
                          含图片
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium truncate">
                      {entry.userInput || '(仅图片输入)'}
                    </p>
                    <div className="flex gap-1.5">
                      {entry.prompts.map((p) => (
                        <Badge
                          key={p.platformId}
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: PLATFORMS[p.platformId]?.color,
                          }}
                        >
                          {PLATFORMS[p.platformId]?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetail(entry)}
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
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
