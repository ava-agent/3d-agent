'use client';

import { ExternalLink, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/shared/copy-button';
import { GeneratedPrompt, PlatformConfig } from '@/types/platform';

interface PlatformCardProps {
  prompt: GeneratedPrompt;
  platform: PlatformConfig;
}

const GLOW_MAP: Record<string, string> = {
  meshy: 'glow-blue',
  tripo: 'glow-violet',
  luma: 'glow-amber',
};

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

  const glowClass = GLOW_MAP[platform.id] || '';

  return (
    <div
      className={`glass flex flex-col overflow-hidden rounded-2xl platform-card hover:${glowClass}`}
      style={{ borderTop: `2px solid ${platform.color}` }}
    >
      <div className="flex-1 space-y-4 p-5">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: platform.color }}
          />
          <div>
            <h3 className="font-semibold text-lg leading-tight">{platform.name}</h3>
            <p className="text-xs text-muted-foreground">{platform.description}</p>
          </div>
        </div>

        <div className="h-px bg-border/50" />

        {/* Prompt */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/80">提示词</span>
            <CopyButton text={prompt.prompt} />
          </div>
          <div className="rounded-xl bg-background/50 p-3.5 text-sm leading-relaxed font-mono border border-border/30">
            {prompt.prompt}
          </div>
        </div>

        {/* Negative Prompt */}
        {prompt.negativePrompt && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">负面提示词</span>
              <CopyButton text={prompt.negativePrompt} />
            </div>
            <div className="rounded-xl bg-background/50 p-3.5 text-sm leading-relaxed font-mono text-muted-foreground border border-border/30">
              {prompt.negativePrompt}
            </div>
          </div>
        )}

        {/* Recommended Settings */}
        {Object.keys(prompt.recommendedSettings).length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground/80">推荐设置</span>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(prompt.recommendedSettings).map(([key, value]) => (
                <Badge
                  key={key}
                  variant="outline"
                  className="rounded-lg text-xs border-border/50"
                >
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {prompt.tips.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-neon-amber" />
              <span className="text-sm font-medium text-foreground/80">使用技巧</span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {prompt.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="mt-0.5 text-primary/60 shrink-0">›</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Output Formats */}
        <div className="text-xs text-muted-foreground/50">
          支持格式：{platform.outputFormats.join(' · ')}
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t border-border/30 p-4">
        <Button
          onClick={handleCopyAndOpen}
          className="w-full rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
          size="lg"
          style={{
            backgroundColor: platform.color,
            color: '#fff',
          }}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          复制并打开 {platform.name}
        </Button>
      </div>
    </div>
  );
}
