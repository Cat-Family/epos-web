/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLICKEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
