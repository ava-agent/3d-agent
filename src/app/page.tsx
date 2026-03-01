import { HeroSection } from '@/components/home/hero-section';
import { InputSection } from '@/components/home/input-section';
import { PLATFORM_LIST } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="space-y-10">
        <HeroSection />
        <InputSection />

        {/* Platform Overview */}
        <div className="space-y-4">
          <h2 className="text-center text-lg font-medium text-muted-foreground">
            支持的平台
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLATFORM_LIST.map((platform) => (
              <div
                key={platform.id}
                className="rounded-lg border p-4"
                style={{ borderLeftColor: platform.color, borderLeftWidth: 3 }}
              >
                <h3 className="font-semibold">{platform.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {platform.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {platform.features.map((f) => (
                    <Badge key={f} variant="outline" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  导出格式：{platform.outputFormats.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
