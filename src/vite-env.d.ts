/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLICKEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
