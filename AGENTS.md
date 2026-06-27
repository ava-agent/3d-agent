# 3D Agent Maintenance Guide

## Project State

- Repository: `ava-agent/3d-agent`
- Public URL: `https://3d.rxcloud.group`
- Stack: Next.js 16, React 19, Tailwind CSS v4, Supabase, Volcengine Ark/OpenAI-compatible API
- Product: AI prompt generator for 3D model generation platforms.

## Before Editing

- Keep API keys in `.env.local` or deployment secrets; never commit filled credentials.
- Do not commit `.next/`, `.vercel/`, generated QA screenshots, or dependency folders.
- Validate both text-only and image-reference prompt generation after API changes.

## Useful Commands

- Install: `pnpm install`
- Develop: `pnpm dev`
- Type-check/test smoke: `pnpm test`
- Lint: `pnpm lint`
- Build: `pnpm build`

## Deployment Notes

- Vercel config is present in `vercel.json`.
- Public domain should stay aligned with `https://3d.rxcloud.group`.
- Required production secrets: `ARK_API_KEY`, `ARK_BASE_URL`, `ARK_CHAT_MODEL`, and `ARK_VISION_MODEL`; Supabase variables are optional unless persistence is enabled.
