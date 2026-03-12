import { NextRequest, NextResponse } from 'next/server';
import { generatePrompts } from '@/lib/ai/prompt-generator';
import { GeneratePromptsRequest } from '@/types/api';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body: GeneratePromptsRequest = await request.json();

    if (!body.userInput && !body.imageBase64) {
      return NextResponse.json(
        { success: false, error: '请输入文字描述或上传参考图片' },
        { status: 400 }
      );
    }

    if (body.userInput && body.userInput.length > 2000) {
      return NextResponse.json(
        { success: false, error: '文字描述不能超过2000个字符' },
        { status: 400 }
      );
    }

    const result = await generatePrompts(body);

    // Save to Supabase (fire-and-forget, don't block the response)
    if (result.success && result.data) {
      supabase
        .from('agent_3d_generations')
        .insert({
          user_input: body.userInput || null,
          has_image: !!body.imageBase64,
          platform_prompts: result.data.prompts,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase insert error:', error.message);
        });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Prompt generation error:', error);
    return NextResponse.json(
      { success: false, error: '生成提示词时出错，请稍后重试' },
      { status: 500 }
    );
  }
}
