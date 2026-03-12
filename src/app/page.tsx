import { HeroSection } from '@/components/home/hero-section';
import { InputSection } from '@/components/home/input-section';
import { PLATFORM_LIST } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="space-y-12">
        <HeroSection />
        <InputSection />

        {/* Platform Overview */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
              支持的平台
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_LIST.map((platform, i) => (
              <div
                key={platform.id}
                className={`animate-fade-up group glass rounded-xl p-5 platform-card`}
                style={{
                  animationDelay: `${400 + i * 100}ms`,
                  borderLeft: `2px solid ${platform.color}`,
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <h3 className="font-semibold">{platform.name}</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {platform.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {platform.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground/50">
                    {platform.outputFormats.join(' · ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
