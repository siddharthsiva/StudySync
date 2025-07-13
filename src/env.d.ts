/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY: string;
  // Add more env vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}