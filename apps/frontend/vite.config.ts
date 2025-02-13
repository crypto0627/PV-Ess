import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'out',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
      }
    }
  }
})
