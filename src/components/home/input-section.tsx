'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, Loader2, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <Card className="mx-auto w-full max-w-2xl p-6">
      <div className="space-y-4">
        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">描述你想要的3D模型</label>
          <Textarea
            placeholder="例如：一只蒸汽朋克风格的机械猫头鹰，黄铜材质，精密齿轮装饰..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
            maxLength={2000}
            className="resize-none"
          />
          <div className="text-right text-xs text-muted-foreground">
            {userInput.length} / 2000
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            参考图片 <span className="text-muted-foreground">(可选)</span>
          </label>

          {imageData ? (
            <div className="relative inline-block">
              <img
                src={imageData.previewUrl}
                alt="参考图片"
                className="h-32 w-32 rounded-lg border object-cover"
              />
              <button
                onClick={() => setImageData(null)}
                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="mt-1 text-xs text-muted-foreground truncate max-w-[128px]">
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
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                点击或拖拽上传参考图片
              </p>
              <p className="text-xs text-muted-foreground">
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

        {/* Platform Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">将为以下平台生成提示词：</span>
          <Badge variant="secondary">Meshy AI</Badge>
          <Badge variant="secondary">Tripo3D</Badge>
          <Badge variant="secondary">Luma AI</Badge>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || (!userInput.trim() && !imageData)}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI 正在生成提示词...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              生成提示词
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
