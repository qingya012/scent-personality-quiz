import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/scent-personality-quiz/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html' // 显式指定入口
    }
  }
});
