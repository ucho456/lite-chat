/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_MEASUREMENT_ID: string;
  readonly VITE_USE_EMULATOR: string;
  readonly VITE_TARO_EMAIL: string;
  readonly VITE_TARO_PASSWORD: string;
  readonly VITE_HANAKO_EMAIL: string;
  readonly VITE_HANAKO_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
