import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { createOfflineDownloadMiddleware } from './scripts/offlineDownloadMiddleware.ts';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'basira-offline-download',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use(
          createOfflineDownloadMiddleware(
            path.resolve(server.config.root, 'dist/downloads/Basira-Offline.html'),
          ),
        );
      },
    },
  ],
  base: './',
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { target: 'es2022' },
});
