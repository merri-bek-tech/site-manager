import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/admin",
  build: {
    assetsDir: "assets",
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
    APP_VERSION_URL: JSON.stringify(packageJson.homepage),
  },
})
