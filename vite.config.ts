import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const certAndKeySet = !!process.env.CERT_FILE && !!process.env.KEY_FILE;

// https://vitejs.dev/config/
export default defineConfig({
  server:  {
    https: certAndKeySet ? {
      cert: fs.readFileSync(process.env.CERT_FILE),
      key: fs.readFileSync(process.env.KEY_FILE)
    } : false,
    fs: {
      strict: true
    }
  },
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        swDest: './dist/sw.js'
      },
      manifest: {
        name: 'bimsua Answers',
        short_name: 'Answers!',
        description: 'Create and view multiple choice answers',
        theme_color: '#f3f4f6',
        icons: [
          {
            src: '/assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
});
