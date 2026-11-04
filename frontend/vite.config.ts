import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5555',
        changeOrigin: true,
      },
      '/ws-queue': {
        target: 'http://localhost:5555',
        ws: true,
        changeOrigin: true,
      },
      '/ws-queue-raw': {
        target: 'http://localhost:5555',
        ws: true,
        changeOrigin: true,
      },
    },
  },
});

