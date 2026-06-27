# 3D Agent Deployment Notes

## Current Status

- Public URL: `https://3d.rxcloud.group`
- Hosting: Vercel
- Framework: Next.js 16 App Router
- Data/AI: Volcengine Ark CodingPlan API and optional Supabase persistence

## Local Validation

```bash
pnpm install
pnpm test
pnpm lint
pnpm build
```

## Deployment Checklist

- Set `ARK_API_KEY`, `ARK_BASE_URL`, `ARK_CHAT_MODEL`, and `ARK_VISION_MODEL` in Vercel project secrets.
- Confirm optional Supabase URL/anon key before enabling history sync.
- Verify text prompt generation, image-reference generation, platform copy actions, and external jump URLs.
- Confirm `3d.rxcloud.group` domain, TLS, and canonical links after deployment.
