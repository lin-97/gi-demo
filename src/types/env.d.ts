// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_API_PREFIX: string;
  VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
