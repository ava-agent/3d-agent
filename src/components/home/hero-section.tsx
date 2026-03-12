'use client';

import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Floating geometric decorations */}
      <div className="absolute left-[12%] top-8 h-16 w-16 rounded-xl border border-neon-cyan/15 animate-float-delayed opacity-60" />
      <div
        className="absolute bottom-12 right-[15%] h-12 w-12 rounded-full border border-neon-violet/15 animate-float opacity-50"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute right-[8%] top-1/3 h-10 w-10 rotate-12 rounded-lg border border-neon-amber/15 animate-float opacity-40"
        style={{ animationDelay: '4s' }}
      />
      <div
        className="absolute left-[6%] top-2/3 h-6 w-6 rounded-md border border-neon-blue/20 animate-float opacity-30"
        style={{ animationDelay: '1s' }}
      />

      {/* Glow orbs */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-neon-cyan/5 blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-neon-violet/5 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-16 text-center sm:py-20">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI 驱动的 3D 提示词引擎</span>
        </div>

        <h1 className="animate-fade-up delay-100 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text">3D 模型生成</span>
          <br />
          <span className="text-foreground">智能助手</span>
        </h1>

        <p className="animate-fade-up delay-200 max-w-md text-base text-muted-foreground sm:text-lg">
          输入描述或上传参考图片，AI 为你生成各平台优化的提示词
          <br className="hidden sm:block" />
          一键跳转生成 3D 模型
        </p>
      </div>
    </div>
  );
}
