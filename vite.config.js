import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Relative base (`./`) keeps assets working on project pages
 * (https://USER.github.io/watchimply/) and on the site root.
 * Combined with HashRouter, refreshes stay compatible with GitHub Pages.
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
