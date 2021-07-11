import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
});
