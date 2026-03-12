import { Box, Cpu, Globe, Layers, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const techStack = [
  {
    layer: '前端展示层',
    tech: 'Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui',
    detail: 'App Router, Neon Forge 自定义主题',
    icon: Layers,
  },
  {
    layer: 'AI 引擎层',
    tech: 'OpenAI SDK + GLM-4 / GLM-4V',
    detail: '多模态路由, System Prompt, 结构化输出',
    icon: Cpu,
  },
  {
    layer: '数据持久层',
    tech: 'Supabase + localStorage',
    detail: 'PostgreSQL (RLS), 浏览器本地存储',
    icon: Globe,
  },
];

const platforms = [
  {
    name: 'Meshy AI',
    color: '#3B82F6',
    desc: '最适合3D打印，高质量网格',
    formats: 'GLB, FBX, OBJ, STL, 3MF',
  },
  {
    name: 'Tripo3D',
    color: '#8B5CF6',
    desc: '速度快，支持面数控制',
    formats: 'GLB, FBX, OBJ, USD, STL',
  },
  {
    name: 'Luma AI',
    color: '#F59E0B',
    desc: '10秒生成，有免费额度',
    formats: 'GLB, OBJ, FBX',
  },
  {
    name: 'Combos',
    color: '#10B981',
    desc: 'AI游戏创作，3D概念变可玩游戏',
    formats: 'Web Game, 3D Platformer',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="space-y-12">
        {/* Hero */}
        <div className="animate-fade-up space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>关于 3D Agent</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">一站式 3D 模型生成助手</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            输入文字描述或上传参考图片，AI 自动生成针对各 3D 生成平台优化的提示词，
            一键复制并跳转到目标平台生成 3D 模型。
          </p>
        </div>

        {/* How it works */}
        <div className="animate-fade-up delay-100 space-y-6">
          <h2 className="text-xl font-semibold">使用流程</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { step: '1', title: '输入描述', desc: '输入中英文描述或上传参考图片', icon: Box },
              { step: '2', title: 'AI 生成', desc: 'GLM-4 自动优化为各平台专用提示词', icon: Zap },
              { step: '3', title: '一键跳转', desc: '复制提示词并打开目标平台生成模型', icon: Globe },
            ].map((item) => (
              <div key={item.step} className="glass rounded-xl p-5 neon-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="animate-fade-up delay-200 space-y-6">
          <h2 className="text-xl font-semibold">支持的平台</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="glass rounded-xl p-5 platform-card"
                style={{ borderLeft: `2px solid ${p.color}` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <h3 className="font-semibold">{p.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <p className="text-xs text-muted-foreground/50">{p.formats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Design */}
        <div className="animate-fade-up delay-300 space-y-6">
          <h2 className="text-xl font-semibold">AI Agent 设计</h2>
          <div className="glass rounded-xl p-6 neon-border space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              本项目采用 <strong className="text-foreground">Single-Turn Structured Output Agent</strong> 模式 —
              一种专门化的提示词工程 Agent 架构。平台知识直接嵌入 System Prompt（静态注入），
              根据输入类型动态路由到 GLM-4（文本）或 GLM-4V（视觉）模型，
              通过 JSON Schema 约束输出为结构化数据，一次 LLM 调用完成语言检测、翻译和三平台提示词优化。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: '知识注入', value: '静态嵌入 System Prompt' },
                { label: '推理模式', value: '单次调用 (非 ReAct)' },
                { label: '模型路由', value: '动态选择 GLM-4 / GLM-4V' },
                { label: '输出控制', value: 'JSON Schema 结构化' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground/60">{item.label}:</span>
                  <span className="text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="animate-fade-up space-y-6">
          <h2 className="text-xl font-semibold">技术架构</h2>
          <div className="space-y-3">
            {techStack.map((t) => (
              <div key={t.layer} className="glass rounded-xl p-5 platform-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <t.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{t.layer}</h3>
                    <p className="text-sm text-foreground/80">{t.tech}</p>
                    <p className="text-xs text-muted-foreground/60">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="animate-fade-up space-y-6">
          <h2 className="text-xl font-semibold">相关链接</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://github.com/ava-agent/3d-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 platform-card transition-colors hover:bg-muted/30"
            >
              <h3 className="font-semibold mb-1">GitHub 仓库</h3>
              <p className="text-sm text-muted-foreground">查看源代码、提交 Issue 或 PR</p>
            </a>
            <Link
              href="/"
              className="glass rounded-xl p-5 platform-card transition-colors hover:bg-muted/30"
            >
              <h3 className="font-semibold mb-1">开始使用</h3>
              <p className="text-sm text-muted-foreground">立即体验 AI 3D 提示词生成</p>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-sm text-muted-foreground/50 space-y-1">
          <p>3D Agent &middot; 由 <span className="gradient-text font-medium">GLM-4</span> 驱动</p>
          <p>
            <a
              href="https://3d.rxcloud.group"
              className="hover:text-primary transition-colors"
            >
              3d.rxcloud.group
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
