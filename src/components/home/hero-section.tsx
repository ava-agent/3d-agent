import { Box } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-2">
        <Box className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          3D 模型生成助手
        </h1>
      </div>
      <p className="max-w-lg text-muted-foreground">
        输入描述或上传参考图片，AI 为你生成各平台优化的提示词，一键跳转生成3D模型
      </p>
    </div>
  );
}
