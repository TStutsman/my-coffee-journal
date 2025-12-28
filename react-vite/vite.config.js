import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      //lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: {
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@context': resolve(__dirname, './src/context'),
      '@brews': resolve(__dirname, './src/features/brews'),
      '@coffees': resolve(__dirname, './src/features/coffees'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  }
}));
