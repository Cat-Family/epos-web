import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "APP_"]);
  return {
    // server: {
    //   proxy: {
    //     "/qy": {
    //       target: "https://2904084071.eicp.vip",
    //       changeOrigin: true,
    //     },
    //   },
    // },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react()],
  };
});
