'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImagePlus, Loader2, X, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGenerate } from '@/lib/hooks/use-generate';
import { saveToHistory } from '@/lib/storage/history';
import { SUPPORTED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from '@/lib/constants';

export function InputSection() {
  const router = useRouter();
  const { generate, isLoading } = useGenerate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userInput, setUserInput] = useState('');
  const [imageData, setImageData] = useState<{
    base64: string;
    mimeType: string;
    previewUrl: string;
    fileName: string;
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageFile = useCallback((file: File) => {
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('仅支持 JPG、PNG、WebP 格式的图片');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      toast.error(`图片大小不能超过 ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(',')[1];
      setImageData({
        base64,
        mimeType: file.type,
        previewUrl: dataUrl,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleImageFile(file);
    },
    [handleImageFile]
  );

  const handleSubmit = async () => {
    if (!userInput.trim() && !imageData) {
      toast.error('请输入描述或上传参考图片');
      return;
    }

    const result = await generate({
      userInput: userInput.trim(),
      imageBase64: imageData?.base64,
      imageMimeType: imageData?.mimeType,
    });

    if (result?.success && result.data) {
      saveToHistory(result, imageData?.previewUrl);
      sessionStorage.setItem('3d-agent-result', JSON.stringify(result.data));
      router.push('/result');
    } else {
      toast.error(result?.error || '生成失败，请重试');
    }
  };

  return (
    <div className="animate-fade-up delay-300 mx-auto w-full max-w-2xl">
      <div className="glass rounded-2xl p-6 sm:p-8 neon-border">
        <div className="space-y-5">
          {/* Text Input */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-foreground/90">
              描述你想要的 3D 模型
            </label>
            <Textarea
              placeholder="例如：一只蒸汽朋克风格的机械猫头鹰，黄铜材质，精密齿轮装饰..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
              maxLength={2000}
              className="resize-none rounded-xl border-border/50 bg-background/50 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
            <div className="text-right text-xs text-muted-foreground/60">
              {userInput.length} / 2000
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-foreground/90">
              参考图片 <span className="text-muted-foreground/60">(可选)</span>
            </label>

            {imageData ? (
              <div className="relative inline-block">
                <Image
                  src={imageData.previewUrl}
                  alt="参考图片"
                  width={128}
                  height={128}
                  className="h-28 w-28 rounded-xl border border-border/50 object-cover"
                  unoptimized
                />
                <button
                  onClick={() => setImageData(null)}
                  className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-lg transition-transform hover:scale-110"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="mt-1.5 text-xs text-muted-foreground/60 truncate max-w-[112px]">
                  {imageData.fileName}
                </p>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
                  isDragOver
                    ? 'border-primary bg-primary/5 scale-[1.01]'
                    : 'border-border/40 hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/10">
                  <ImagePlus className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  点击或拖拽上传参考图片
                </p>
                <p className="text-xs text-muted-foreground/50">
                  支持 JPG、PNG、WebP，最大 {MAX_IMAGE_SIZE_MB}MB
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept={SUPPORTED_IMAGE_TYPES.join(',')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
                e.target.value = '';
              }}
              className="hidden"
            />
          </div>

          {/* Platform Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground/60">
              将为以下平台生成：
            </span>
            <span className="inline-flex items-center rounded-md bg-neon-blue/10 px-2 py-0.5 text-xs font-medium text-neon-blue ring-1 ring-neon-blue/20">
              Meshy AI
            </span>
            <span className="inline-flex items-center rounded-md bg-neon-violet/10 px-2 py-0.5 text-xs font-medium text-neon-violet ring-1 ring-neon-violet/20">
              Tripo3D
            </span>
            <span className="inline-flex items-center rounded-md bg-neon-amber/10 px-2 py-0.5 text-xs font-medium text-neon-amber ring-1 ring-neon-amber/20">
              Luma AI
            </span>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || (!userInput.trim() && !imageData)}
            className="w-full rounded-xl bg-primary text-primary-foreground py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-40"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                AI 正在生成提示词...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4.5 w-4.5" />
                生成提示词
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
