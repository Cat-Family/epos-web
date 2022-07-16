import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/qy": {
  //       target: "https://2904084071.eicp.vip",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  plugins: [
    react(),
    ImportMetaEnvPlugin.vite({
      example: ".env",
    }),
  ],
});
