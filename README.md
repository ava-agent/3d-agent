# 3D Agent - 一站式3D模型生成助手

> 输入文字描述或上传参考图片，AI 自动生成针对各 3D 生成平台优化的提示词，一键复制并跳转到目标平台生成 3D 模型。

**在线体验：[3d.rxcloud.group](https://3d.rxcloud.group)**

![3D Agent Homepage](/public/images/homepage-preview.png)

## 功能特性

- **智能提示词生成** — 基于智谱 GLM-4/GLM-4V，自动将中文描述转换为英文优化提示词
- **多平台支持** — 同时生成 Meshy AI、Tripo3D、Luma AI、Combos 四个平台的优化提示词
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
| **Combos** | AI游戏创作，3D概念变可玩游戏 | 文字 | Web Game, 3D Platformer |

## 使用流程

![使用流程图](/public/images/user-flow.png)

1. 在首页输入你想要的 3D 模型描述（中英文均可）
2. 可选：上传参考图片
3. 点击「生成提示词」
4. 查看为四个平台生成的优化提示词
5. 点击「复制并打开平台」
6. 在目标平台粘贴提示词，生成 3D 模型

---

## 技术架构

### 技术栈总览

![技术栈架构](/public/images/tech-stack.png)

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| **前端展示层** | Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui | App Router, Neon Forge 自定义主题 |
| **交互逻辑层** | Custom Hooks + Browser Storage | useGenerate, useHistory, sessionStorage |
| **API 服务层** | Next.js API Routes | 输入校验, 请求构建, JSON 解析, 错误处理 |
| **AI 引擎层** | OpenAI SDK + GLM-4/GLM-4V | 多模态路由, System Prompt, 结构化输出 |
| **数据持久层** | Supabase + localStorage | PostgreSQL (RLS), 浏览器本地存储 |

### AI Agent 设计

![AI Agent 设计架构](/public/images/ai-agent-design.png)

本项目采用 **Single-Turn Structured Output Agent** 模式 — 一种专门化的提示词工程 Agent 架构：

#### Agent 模式分析

| 特性 | 本项目方案 | 说明 |
|------|-----------|------|
| **知识注入** | Static Injection (非 RAG) | 平台知识直接嵌入 System Prompt，而非从向量数据库检索 |
| **推理模式** | Single-Turn (非 ReAct) | 单次 LLM 调用完成所有任务，无需迭代推理或工具调用 |
| **模型路由** | Dynamic Selection | 根据输入类型动态选择 GLM-4 (文本) 或 GLM-4V (视觉) |
| **输出控制** | JSON Schema Enforcement | 通过 System Prompt 约束输出为结构化 JSON |
| **多任务** | Multi-Task Single-Call | 语言检测、翻译、4平台优化在一次调用中完成 |

#### Agent Core 组件

**1. Input Router (输入路由)**

根据用户输入类型动态构建请求：

```
Has Image? ──YES──→ GLM-4V (vision) + multimodal content parts
             │
             NO───→ GLM-4 (text)  + text-only content
```

**2. System Prompt (系统提示词 — "专家人格")**

System Prompt 扮演 **"3D 模型提示词优化专家"** 角色，嵌入四个平台的领域知识：

| 平台 | 嵌入知识 | 约束条件 |
|------|---------|---------|
| **Meshy AI** | 材质描述、3D打印适配、PBR 渲染提示 | max 600 chars, 英文输出 |
| **Tripo3D** | 几何清晰度、拓扑质量、负面提示词生成 | max 1000 chars, 含 negative prompt |
| **Luma AI** | 简洁直接的描述，单一主体 | max 500 chars, 简短优先 |
| **Combos** | 游戏场景描述、角色、环境、玩法元素 | max 800 chars, 游戏化描述 |

**3. Language Pipeline (语言处理管线)**

```
用户输入 → 语言检测 (zh/en/other) → 中译英翻译 → 英文提示词生成
```

所有平台提示词以英文输出（平台要求），使用技巧以中文输出（用户界面语言）。

**4. Structured Output (结构化输出)**

通过 System Prompt 中的 JSON Schema 定义，强制 LLM 输出结构化数据：

```json
{
  "detectedLanguage": "zh",
  "translatedInput": "English translation",
  "prompts": {
    "meshy": { "prompt": "...", "tips": ["中文技巧"], "recommendedSettings": {} },
    "tripo": { "prompt": "...", "negativePrompt": "...", "tips": [], "recommendedSettings": {} },
    "luma":  { "prompt": "...", "tips": [], "recommendedSettings": {} }
  }
}
```

### Agent 执行流程

![Agent 执行流程](/public/images/agent-execution.png)

完整的 Agent 执行管线分为 8 个阶段：

| 阶段 | 名称 | 关键操作 |
|------|------|---------|
| 1 | **用户输入** | 文字描述 (≤2000 chars) + 可选参考图片 (JPG/PNG/WebP, ≤10MB) |
| 2 | **请求构建** | 根据是否有图片，构建多模态或纯文本 content parts |
| 3 | **模型路由** | 有图片 → GLM-4V, 无图片 → GLM-4 |
| 4 | **LLM 推理** | System Prompt + User Message → Chat Completions API (max_tokens=2000) |
| 5 | **响应解析** | Regex `/\{[\s\S]*\}/` 提取 JSON → `JSON.parse` → 类型化结果 |
| 6 | **结果映射** | 映射 platform IDs → 附加 jumpUrl → 构造标准化响应 |
| 7 | **并行持久化** | Supabase 异步写入 (fire-and-forget) + sessionStorage 存储 |
| 8 | **结果展示** | 4 张平台卡片 + 一键复制跳转 + 历史记录保存 |

**错误处理路径：**
- 输入校验失败 → HTTP 400
- LLM 调用异常 → HTTP 500
- JSON 解析失败 → throw Error
- Supabase 写入失败 → console.error (不阻塞主流程)

### 为什么不用 RAG / ReAct？

| 方案 | 适用场景 | 本项目不适用的原因 |
|------|---------|-------------------|
| **RAG** | 知识库频繁更新、海量文档检索 | 3 个平台的知识是静态的，直接嵌入 System Prompt 更高效 |
| **ReAct** | 需要多步工具调用、动态信息获取 | 提示词生成是单步任务，无需搜索或调用外部工具 |
| **Multi-Agent** | 复杂工作流需要多个专业 Agent 协作 | 单个 Expert Agent 足以覆盖所有平台优化 |
| **当前方案** | 领域知识固定、单步结构化输出 | ✅ 延迟最低、架构最简、知识可控 |

---

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
│   ├── about/                 # 关于页
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
│   │   ├── claude-client.ts   # 智谱 GLM API 客户端 (OpenAI SDK 兼容)
│   │   ├── prompt-generator.ts # Agent 核心：输入路由 + LLM 调用 + 响应解析
│   │   └── system-prompt.ts   # 系统提示词 (Expert Persona + 平台知识注入)
│   ├── hooks/                 # React Hooks (useGenerate, useHistory)
│   ├── storage/               # 本地存储 (历史持久化)
│   ├── supabase/              # Supabase 客户端 (生成记录)
│   ├── constants.ts           # 平台配置常量
│   └── utils.ts               # 工具函数
└── types/                     # TypeScript 类型定义
    ├── api.ts                 # API 请求/响应类型
    ├── platform.ts            # 平台配置 + 生成结果类型
    └── history.ts             # 历史记录类型
```

## 在线体验

| 地址 | 说明 |
|------|------|
| [3d.rxcloud.group](https://3d.rxcloud.group) | 自定义域名（推荐） |
| [3d-agent-ten.vercel.app](https://3d-agent-ten.vercel.app) | Vercel 默认域名 |

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 设置环境变量 `GLM_API_KEY`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 部署完成
5. （可选）绑定自定义域名，添加 DNS 记录：`A 3d.rxcloud.group 76.76.21.21`

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
