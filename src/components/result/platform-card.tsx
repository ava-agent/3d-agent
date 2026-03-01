'use client';

import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CopyButton } from '@/components/shared/copy-button';
import { GeneratedPrompt, PlatformConfig } from '@/types/platform';

interface PlatformCardProps {
  prompt: GeneratedPrompt;
  platform: PlatformConfig;
}

export function PlatformCard({ prompt, platform }: PlatformCardProps) {
  const handleCopyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      toast.success('提示词已复制，正在打开平台...');
      window.open(prompt.jumpUrl, '_blank');
    } catch {
      toast.error('复制失败，请手动复制');
    }
  };

  return (
    <Card
      className="flex flex-col overflow-hidden"
      style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
    >
      <div className="p-5 flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{platform.name}</h3>
            <p className="text-xs text-muted-foreground">{platform.description}</p>
          </div>
        </div>

        <Separator />

        {/* Prompt */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">提示词</span>
            <CopyButton text={prompt.prompt} />
          </div>
          <div className="rounded-md bg-muted p-3 text-sm leading-relaxed font-mono">
            {prompt.prompt}
          </div>
        </div>

        {/* Negative Prompt */}
        {prompt.negativePrompt && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">负面提示词</span>
              <CopyButton text={prompt.negativePrompt} />
            </div>
            <div className="rounded-md bg-muted p-3 text-sm leading-relaxed font-mono text-muted-foreground">
              {prompt.negativePrompt}
            </div>
          </div>
        )}

        {/* Recommended Settings */}
        {Object.keys(prompt.recommendedSettings).length > 0 && (
          <div className="space-y-1.5">
            <span className="text-sm font-medium">推荐设置</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(prompt.recommendedSettings).map(([key, value]) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {prompt.tips.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-sm font-medium">使用技巧</span>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {prompt.tips.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary shrink-0">-</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Output Formats */}
        <div className="text-xs text-muted-foreground">
          支持格式：{platform.outputFormats.join(', ')}
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t p-4">
        <Button onClick={handleCopyAndOpen} className="w-full" size="lg">
          <ExternalLink className="mr-2 h-4 w-4" />
          复制提示词并打开 {platform.name}
        </Button>
      </div>
    </Card>
  );
}
