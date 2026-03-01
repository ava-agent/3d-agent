import { PlatformConfig } from '@/types/platform';

export const PLATFORMS: Record<string, PlatformConfig> = {
  meshy: {
    id: 'meshy',
    name: 'Meshy AI',
    description: '综合最佳，特别适合3D打印，支持文字和图片输入',
    websiteUrl: 'https://www.meshy.ai',
    createUrl: 'https://www.meshy.ai/create',
    color: '#3B82F6',
    supportedInputs: ['text', 'image'],
    outputFormats: ['GLB', 'FBX', 'OBJ', 'USDZ', 'STL', '3MF', 'BLEND'],
    maxPromptLength: 600,
    features: ['最适合3D打印', 'PBR材质', '四边面网格', '多种导出格式'],
  },
  tripo: {
    id: 'tripo',
    name: 'Tripo3D',
    description: '速度快质量好，支持精细面数控制和多版本模型',
    websiteUrl: 'https://www.tripo3d.ai',
    createUrl: 'https://www.tripo3d.ai/app/creation',
    color: '#8B5CF6',
    supportedInputs: ['text', 'image'],
    outputFormats: ['GLB', 'FBX', 'OBJ', 'USD', 'STL'],
    maxPromptLength: 1000,
    features: ['多版本模型', '面数控制', 'PBR材质', '智能拓扑'],
  },
  luma: {
    id: 'luma',
    name: 'Luma AI',
    description: '10秒极速生成，有免费额度，适合快速原型',
    websiteUrl: 'https://lumalabs.ai',
    createUrl: 'https://lumalabs.ai/genie?view=create',
    color: '#F59E0B',
    supportedInputs: ['text'],
    outputFormats: ['GLB', 'OBJ', 'FBX'],
    maxPromptLength: 500,
    features: ['10秒生成', '免费使用', '简单易用'],
  },
};

export const PLATFORM_LIST = Object.values(PLATFORMS);
export const MAX_IMAGE_SIZE_MB = 10;
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const HISTORY_STORAGE_KEY = '3d-agent-history';
export const MAX_HISTORY_ENTRIES = 50;
