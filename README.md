# 3D Agent - 一站式3D模型生成助手

> 输入文字描述或上传参考图片，AI 自动生成针对各 3D 生成平台优化的提示词，一键复制并跳转到目标平台生成 3D 模型。

![3D Agent Homepage](/public/images/homepage-preview.png)

## 系统架构

![系统架构图](/public/images/architecture.png)

## 功能特性

- **智能提示词生成** — 基于智谱 GLM-4/GLM-4V，自动将中文描述转换为英文优化提示词
- **多平台支持** — 同时生成 Meshy AI、Tripo3D、Luma AI 三个平台的优化提示词
- **图片参考** — 支持上传参考图片，AI 会分析图片内容生成提示词
- **一键跳转** — 复制提示词并直接打开对应平台
- **历史记录** — 本地 + Supabase 双重持久化
- **暗黑模式** — 默认深色主题，支持明暗切换

## 支持的平台

| 平台 | 特点 | 输入类型 | 导出格式 |
|------|------|----------|----------|
| **Meshy AI** | 最适合3D打印，高质量网格 | 文字 + 图片 | GLB, FBX, OBJ, STL, 3MF |
| **Tripo3D** | 速度快，支持面数控制 | 文字 + 图片 | GLB, FBX, OBJ, USD, STL |
| **Luma AI** | 10秒生成，有免费额度 | 文字 | GLB, OBJ, FBX |

## 使用流程

![使用流程图](/public/images/user-flow.png)

1. 在首页输入你想要的 3D 模型描述（中英文均可）
2. 可选：上传参考图片
3. 点击「生成提示词」
4. 查看为三个平台生成的优化提示词
5. 点击「复制并打开平台」
6. 在目标平台粘贴提示词，生成 3D 模型

## 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **语言**: TypeScript (Strict Mode)
- **样式**: Tailwind CSS v4 + shadcn/ui + 自定义 Neon Forge 主题
- **AI**: 智谱 GLM-4/GLM-4V API (OpenAI SDK 兼容)
- **数据库**: Supabase (生成记录持久化)
- **部署**: Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/ava-agent/3d-agent.git
cd 3d-agent
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# Required: 智谱 GLM API Key (https://open.bigmodel.cn/)
GLM_API_KEY=your-glm-api-key

# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 项目结构

```
src/
├── app/                       # Next.js App Router
│   ├── api/generate-prompts/  # API 路由 - 提示词生成接口
│   ├── history/               # 历史记录页
│   ├── result/                # 结果展示页
│   ├── layout.tsx             # 根布局 (Outfit 字体、主题)
│   └── page.tsx               # 首页
├── components/
│   ├── home/                  # 首页组件 (Hero、输入表单)
│   ├── result/                # 结果页组件 (平台卡片)
│   ├── layout/                # 布局组件 (Header、Footer)
│   ├── shared/                # 共享组件 (复制按钮)
│   ├── providers.tsx          # 客户端 Provider (主题、Toast)
│   └── ui/                    # shadcn/ui 基础组件
├── lib/
│   ├── ai/                    # AI 引擎
│   │   ├── claude-client.ts   # 智谱 GLM API 客户端
│   │   ├── prompt-generator.ts # 提示词生成逻辑
│   │   └── system-prompt.ts   # 系统提示词模板
│   ├── hooks/                 # React Hooks
│   ├── storage/               # 本地存储
│   ├── supabase/              # Supabase 客户端
│   ├── constants.ts           # 平台配置常量
│   └── utils.ts               # 工具函数
└── types/                     # TypeScript 类型定义
```

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 设置环境变量 `GLM_API_KEY`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 部署完成

### Docker 部署

```bash
docker build -t 3d-agent .
docker run -p 3000:3000 -e GLM_API_KEY=your-key 3d-agent
```

## 开发命令

```bash
pnpm dev      # 启动开发服务器
pnpm build    # 生产构建
pnpm start    # 启动生产服务器
pnpm lint     # 代码检查
```

## 许可证

MIT
